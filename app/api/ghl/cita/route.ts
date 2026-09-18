import { NextResponse } from "next/server";
import { enviarEvento } from "@/lib/capi";
import { obtenerContacto } from "@/lib/ghl";
import { guardarLead, registrarEvento } from "@/lib/db";
import { site } from "@/content/landing";

/**
 * Webhook de GoHighLevel para "cita agendada".
 *
 * En el flujo de agenda esta ruta es la única fuente de leads: el visitante
 * completa el formulario del calendario, que vive dentro del iframe de GHL, y
 * nosotros no vemos nada de eso desde la página. Por eso acá se dispara el
 * Lead además del Schedule: sin eso Meta no recibe ninguna conversión de ese
 * lado del A/B y deja de optimizar por él.
 *
 * La atribución se lee del contacto en GHL, no del webhook: los UTM viajan en
 * la URL del iframe, GHL los guarda al crear el contacto y `obtenerContacto`
 * los trae de vuelta. Es el puente entre el anuncio y la agenda.
 *
 * Se valida con un token en la URL: los webhooks de GHL no van firmados.
 */
export async function POST(pedido: Request) {
  const esperado = process.env.GHL_WEBHOOK_SECRET;
  const recibido = new URL(pedido.url).searchParams.get("token");

  if (!esperado || recibido !== esperado) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const cuerpo = await pedido.json().catch(() => ({}));

  const contactId: string | undefined = cuerpo?.contact_id ?? cuerpo?.contactId ?? cuerpo?.contact?.id;
  const ficha = contactId ? await obtenerContacto(contactId) : null;
  const contacto = (ficha?.contacto ?? {}) as Record<string, string | undefined>;

  const email = cuerpo?.email ?? cuerpo?.contact?.email ?? contacto.email;
  const telefono = cuerpo?.phone ?? cuerpo?.contact?.phone ?? contacto.phone;
  const nombre =
    cuerpo?.full_name ??
    cuerpo?.contact?.name ??
    [contacto.firstName, contacto.lastName].filter(Boolean).join(" ") ??
    undefined;

  // El id de la cita hace de eventId: si GHL reintenta, Meta deduplica y el
  // índice único de cita_id evita la fila repetida en la base.
  const cita = cuerpo?.appointment ?? cuerpo?.calendar ?? {};
  const idCita: string = cita?.id ?? cuerpo?.id ?? `cita-${telefono ?? email ?? "desconocido"}`;
  const inicio: string | undefined = cita?.startTime ?? cita?.start_time ?? undefined;

  const atribucion = ficha?.atribucion ?? {};
  const url = `${site.url}/agenda`;

  // Primero el Lead: en este flujo el formulario del calendario es el
  // formulario, y sin este evento el conjunto de anuncios no tiene con qué
  // optimizar. Después el Schedule, que es la conversión de verdad.
  const capiLead = await enviarEvento({
    nombre: "Lead",
    eventId: `lead-${idCita}`,
    email,
    telefono,
    atribucion,
    url,
    datos: { content_name: "lead_agenda", flujo: "agenda", origen: "calendario" },
  });

  const capiSchedule = await enviarEvento({
    nombre: "Schedule",
    eventId: `schedule-${idCita}`,
    email,
    telefono,
    atribucion,
    url,
    datos: { content_name: "agenda_confirmada", flujo: "agenda" },
  });

  if (!capiLead.ok) console.warn("[CAPI-LEAD-AGENDA]", capiLead.detalle);
  if (!capiSchedule.ok) console.warn("[CAPI-SCHEDULE]", capiSchedule.detalle);

  const leadId = await guardarLead({
    flujo: "agenda",
    origen: "calendario",
    nombre,
    email,
    telefono,
    atribucion,
    eventId: `lead-${idCita}`,
    ghlContactId: contactId,
    capiDetalle: `lead: ${capiLead.detalle} | schedule: ${capiSchedule.detalle}`,
    agendadoEn: new Date().toISOString(),
    citaId: idCita,
    citaInicio: inicio,
  });

  if (leadId) {
    await registrarEvento({
      tipo: "cita",
      leadId,
      flujo: "agenda",
      detalle: { cita: idCita, inicio: inicio ?? "" },
    });
  }

  return NextResponse.json({ ok: true });
}
