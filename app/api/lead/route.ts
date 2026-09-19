import { NextResponse } from "next/server";
import { enviarEvento } from "@/lib/capi";
import { upsertContacto } from "@/lib/ghl";
import { guardarLead, registrarEvento } from "@/lib/db";
import { atribucionSegura, esFlujo } from "@/lib/atribucion";
import { site } from "@/content/landing";

/**
 * El formulario propio de la landing entra por acá.
 *
 * Orden deliberado: primero GoHighLevel, que es donde el lead se contacta y
 * por lo tanto lo único que no se puede perder; después la base del panel y
 * la Conversions API, que son medición. Si falla GHL igual respondemos ok y
 * dejamos el lead escrito en el log y en la base: preferimos un lead
 * recuperable a mano antes que un error en la cara del visitante.
 */

const LARGO_MAXIMO = 200;

function texto(valor: unknown): string | undefined {
  if (typeof valor !== "string") return undefined;
  const limpio = valor.trim().slice(0, LARGO_MAXIMO);
  return limpio || undefined;
}

export async function POST(pedido: Request) {
  const cuerpo = await pedido.json().catch(() => null);
  if (!cuerpo) return NextResponse.json({ ok: false, error: "cuerpo inválido" }, { status: 400 });

  const nombre = texto(cuerpo.nombre);
  const telefono = texto(cuerpo.telefono);
  const flujo = esFlujo(cuerpo.flujo) ? cuerpo.flujo : "formulario";

  if (!nombre || !telefono) {
    return NextResponse.json({ ok: false, error: "faltan nombre o teléfono" }, { status: 400 });
  }

  const email = texto(cuerpo.email);
  const instagram = texto(cuerpo.instagram);
  const facturacion = texto(cuerpo.facturacion);
  const frecuencia = texto(cuerpo.frecuencia);
  const origen = texto(cuerpo.origen);
  const eventId = texto(cuerpo.eventId);
  const visitaId = texto(cuerpo.visitaId);
  const atribucion = atribucionSegura(cuerpo.atribucion);

  const ip = pedido.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || undefined;
  const userAgent = pedido.headers.get("user-agent") ?? undefined;

  const ghl = await upsertContacto({
    nombre,
    email,
    telefono,
    instagram,
    facturacion,
    frecuencia,
    flujo,
    origen,
    atribucion,
  });

  if (!ghl.ok) {
    // Queda en los logs de Vercel con todo lo necesario para cargarlo a mano.
    console.error("[LEAD-SIN-GUARDAR]", ghl.error, JSON.stringify({ nombre, email, telefono, instagram }));
  }

  const capi = await enviarEvento({
    nombre: "Lead",
    eventId: eventId ?? `lead-${Date.now()}`,
    email,
    telefono,
    atribucion,
    ip,
    userAgent,
    url: `${site.url}/${flujo}`,
    datos: { content_name: `lead_${flujo}`, flujo, origen },
  });

  const leadId = await guardarLead({
    visitaId,
    flujo,
    origen,
    nombre,
    email,
    telefono,
    instagram,
    facturacion,
    frecuencia,
    atribucion,
    eventId,
    ghlContactId: ghl.ok ? ghl.contactId : undefined,
    ghlError: ghl.ok ? undefined : ghl.error,
    capiDetalle: capi.detalle,
    ip,
    userAgent,
  });

  if (leadId) {
    await registrarEvento({
      tipo: "lead",
      visitaId,
      leadId,
      flujo,
      detalle: { origen: origen ?? "", ghl: ghl.ok ? "ok" : "error" },
      ip,
      userAgent,
    });
  }

  return NextResponse.json({ ok: true });
}
