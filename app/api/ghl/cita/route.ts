import { NextResponse } from "next/server";
import { enviarEvento } from "@/lib/capi";
import { obtenerContacto } from "@/lib/ghl";
import { asociarEvento, atribucionEnEspera, guardarLead, registrarEvento } from "@/lib/db";
import { fusionarAtribucion } from "@/lib/atribucion";
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

  const cita = cuerpo?.appointment ?? cuerpo?.calendar ?? {};
  const inicio: string | undefined = cita?.startTime ?? cita?.start_time ?? undefined;

  /*
   * La llave de la cita. Se usa como eventId de Meta y como clave única en la
   * base, así que tiene que cumplir dos cosas a la vez: repetirse cuando GHL
   * reintenta el mismo webhook, y no repetirse nunca entre reservas distintas.
   *
   * Por eso no alcanza con `calendar.id`: en el payload de GHL ese campo puede
   * ser el id del calendario, que es el mismo para todas las reservas. Si lo
   * usáramos solo, la segunda cita chocaría con la primera y Meta las contaría
   * como una. Se prueba primero el id de la cita, y se compone con el contacto
   * y el horario, que entre los tres no colisionan.
   */
  const idCita: string =
    cita?.appointmentId ?? cuerpo?.appointmentId ?? cita?.id ?? cuerpo?.id ?? "";

  const clave =
    [idCita, contactId, inicio].filter(Boolean).join("-") ||
    `cita-${telefono ?? email ?? "desconocido"}-${Date.now()}`;

  /*
   * Las claves del payload, sin los valores: el primer webhook real dice qué
   * forma manda GHL de verdad, sin dejar datos personales en los logs.
   */
  console.info(
    "[GHL-CITA] claves:",
    Object.keys(cuerpo ?? {}).join(","),
    "| cita:",
    Object.keys(cita ?? {}).join(","),
  );

  /*
   * La atribución sale de dos lados. La de GHL es la que guardó al crear el
   * contacto: no trae las cookies del píxel y, si la persona ya existía en el
   * CRM, es la de aquella primera vez. La nuestra la deja la página de gracias
   * cuando GHL devuelve al visitante después de reservar, y esa es de primera
   * mano — por eso pisa, y la de GHL tapa los huecos.
   */
  const espera = await atribucionEnEspera();
  const atribucion = fusionarAtribucion(ficha?.atribucion ?? {}, espera?.atribucion ?? {});
  const url = `${site.url}/agenda`;

  // Primero el Lead: en este flujo el formulario del calendario es el
  // formulario, y sin este evento el conjunto de anuncios no tiene con qué
  // optimizar. Después el Schedule, que es la conversión de verdad.
  const capiLead = await enviarEvento({
    nombre: "Lead",
    eventId: `lead-${clave}`,
    email,
    telefono,
    atribucion,
    url,
    datos: { content_name: "lead_agenda", flujo: "agenda", origen: "calendario" },
  });

  const capiSchedule = await enviarEvento({
    nombre: "Schedule",
    eventId: `schedule-${clave}`,
    email,
    telefono,
    atribucion,
    url,
    datos: { content_name: "agenda_confirmada", flujo: "agenda" },
  });

  if (!capiLead.ok) console.warn("[CAPI-LEAD-AGENDA]", capiLead.detalle);
  if (!capiSchedule.ok) console.warn("[CAPI-SCHEDULE]", capiSchedule.detalle);

  const leadId = await guardarLead({
    visitaId: espera?.visitaId,
    flujo: "agenda",
    origen: "calendario",
    nombre,
    email,
    telefono,
    atribucion,
    eventId: `lead-${clave}`,
    ghlContactId: contactId,
    capiDetalle: `lead: ${capiLead.detalle} | schedule: ${capiSchedule.detalle}`,
    agendadoEn: new Date().toISOString(),
    citaId: clave,
    citaInicio: inicio,
  });

  if (leadId) {
    await registrarEvento({
      tipo: "cita",
      visitaId: espera?.visitaId,
      leadId,
      flujo: "agenda",
      detalle: { cita: clave, inicio: inicio ?? "" },
    });

    // La atribución que estaba esperando ya tiene cita: se le engancha.
    if (espera) await asociarEvento(espera.eventoId, leadId);
  }

  return NextResponse.json({ ok: true });
}
