import { NextResponse } from "next/server";
import { atribucionSegura } from "@/lib/atribucion";
import {
  citaSinAtribucion,
  completarAtribucion,
  detalleDeAtribucion,
  registrarEvento,
} from "@/lib/db";
import type { Atribucion } from "@/lib/atribucion";

/**
 * La atribución de una cita, mandada por la página de gracias.
 *
 * En el flujo de agenda la reserva ocurre dentro del iframe de GHL, así que la
 * cita nos llega por webhook sin nada nuestro. La atribución de GHL sirve,
 * pero tiene dos agujeros: no guarda las cookies del píxel, y sólo la escribe
 * cuando crea el contacto — si la persona ya estaba en el CRM, queda la de la
 * primera vez. Con una audiencia de retargeting eso no es un caso raro.
 *
 * Después de reservar, GHL manda al visitante de vuelta a /gracias. Ahí
 * volvemos a estar en nuestro dominio con la cookie intacta, y esta ruta la
 * pega a la cita que acaba de entrar.
 *
 * El webhook y este aviso pueden llegar en cualquier orden: si la cita ya está,
 * se completa; si todavía no, queda el evento esperando y el webhook lo levanta.
 */
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Si la atribución no trae ninguna señal de origen no tiene nada que aportar,
 * y pegarla a una cita sería borrarle la que ya tenía. Pasa cuando alguien
 * llega a /gracias sin haber pasado por la landing: un link guardado, una
 * recarga desde otro dispositivo. Mejor no tocar nada.
 */
function tieneOrigen(a: Atribucion): boolean {
  return Boolean(a.utmSource || a.utmCampaign || a.utmContent || a.fbclid || a.fbp || a.fbc);
}

export async function POST(pedido: Request) {
  const cuerpo = await pedido.json().catch(() => null);
  const visitaId = typeof cuerpo?.visitaId === "string" ? cuerpo.visitaId : "";

  if (!UUID.test(visitaId)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const atribucion = atribucionSegura(cuerpo?.atribucion);
  const ip = pedido.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || undefined;
  const userAgent = pedido.headers.get("user-agent")?.slice(0, 400) ?? undefined;

  // Si el redirect de GHL trajo el id del contacto, la unión es exacta.
  const contactId =
    typeof cuerpo?.contactId === "string" && /^[A-Za-z0-9_-]{1,64}$/.test(cuerpo.contactId)
      ? cuerpo.contactId
      : undefined;

  if (!tieneOrigen(atribucion)) {
    return NextResponse.json({ ok: true, unida: false, sinOrigen: true });
  }

  const leadId = await citaSinAtribucion(contactId);

  if (leadId) {
    // La cita ya dejó su propio evento al entrar por el webhook: acá sólo se
    // completa la fila, sin duplicar la línea de tiempo.
    await completarAtribucion(leadId, visitaId, atribucion);
    return NextResponse.json({ ok: true, unida: true });
  }

  // Todavía no llegó el webhook: queda esperando a que lo levante.
  await registrarEvento({
    tipo: "cita",
    visitaId,
    flujo: "agenda",
    detalle: detalleDeAtribucion(atribucion),
    ip,
    userAgent,
  });

  return NextResponse.json({ ok: true, unida: false });
}
