import { NextResponse } from "next/server";
import { esTipoDeEvento, registrarEvento } from "@/lib/db";
import { esFlujo } from "@/lib/atribucion";

/**
 * Baliza de eventos de la landing: visita, click en CTA, formulario empezado.
 *
 * Es pública por necesidad —la dispara el navegador— así que no confía en
 * nada de lo que recibe: el tipo tiene que estar en la lista blanca, el id de
 * visita tiene que ser un uuid y el detalle se recorta. Lo peor que puede
 * hacer alguien que la descubra es ensuciar su propia fila del panel.
 */
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function ipDe(pedido: Request): string | undefined {
  return pedido.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || undefined;
}

/** Sólo texto corto: el detalle es para etiquetas, no para cargar payloads. */
function detalleLimpio(crudo: unknown): Record<string, unknown> {
  if (typeof crudo !== "object" || crudo === null) return {};

  return Object.fromEntries(
    Object.entries(crudo as Record<string, unknown>)
      .slice(0, 10)
      .map(([clave, valor]) => [
        clave.slice(0, 40),
        typeof valor === "string"
          ? valor.slice(0, 120)
          : typeof valor === "number"
            ? valor
            : String(valor).slice(0, 120),
      ]),
  );
}

export async function POST(pedido: Request) {
  const cuerpo = await pedido.json().catch(() => null);

  if (!cuerpo || !esTipoDeEvento(cuerpo.tipo)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const visitaId =
    typeof cuerpo.visitaId === "string" && UUID.test(cuerpo.visitaId) ? cuerpo.visitaId : undefined;

  await registrarEvento({
    tipo: cuerpo.tipo,
    visitaId,
    flujo: esFlujo(cuerpo.flujo) ? cuerpo.flujo : undefined,
    detalle: detalleLimpio(cuerpo.detalle),
    ip: ipDe(pedido),
    userAgent: pedido.headers.get("user-agent")?.slice(0, 400) ?? undefined,
  });

  return NextResponse.json({ ok: true });
}
