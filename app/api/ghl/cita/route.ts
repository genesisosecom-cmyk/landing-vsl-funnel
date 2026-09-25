import { NextResponse } from "next/server";
import { enviarEvento } from "@/lib/capi";
import { obtenerContacto } from "@/lib/ghl";
import {
  anotarCita,
  atribucionDeFila,
  guardarLead,
  leadDelContacto,
  registrarEvento,
} from "@/lib/db";
import { FLUJO, fusionarAtribucion } from "@/lib/atribucion";
import { site } from "@/content/landing";

/**
 * Webhook de GoHighLevel para "cita agendada".
 *
 * Con un solo flujo, la cita ya no es una puerta de entrada: el lead entró por
 * el formulario de la landing, lo escribimos por WhatsApp y la llamada se
 * agenda después. Así que esta ruta no crea leads, los completa.
 *
 * Por eso **acá no sale ningún Lead**. Lo dispara el formulario, y sólo si la
 * facturación declarada califica. Si además lo mandáramos desde acá, la misma
 * persona contaría dos veces en Meta —dos `event_id` distintos, nada que
 * deduplicar— y encima haría calificar por la puerta de atrás a alguien que el
 * formulario había dejado afuera.
 *
 * El Schedule sí sale siempre: no es el evento por el que se optimiza, y es la
 * única forma de saber cuántas llamadas agendadas trajo cada creativo.
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

  // De quién es esta cita. La unión es por identidad, no por ventana de tiempo.
  const lead = await leadDelContacto({ contactId, email, telefono });

  /*
   * La atribución de la fila del lead es la mejor que tenemos: es de primera
   * mano y trae _fbp y _fbc, que GHL no guarda. La de GHL tapa los huecos —y es
   * todo lo que hay cuando la cita no corresponde a ningún lead nuestro.
   */
  const atribucion = fusionarAtribucion(ficha?.atribucion ?? {}, lead ? atribucionDeFila(lead) : {});
  const url = `${site.url}${lead?.landing ?? `/${FLUJO}`}`;

  const capi = await enviarEvento({
    nombre: "Schedule",
    eventId: `schedule-${clave}`,
    email,
    telefono,
    atribucion,
    url,
    datos: { content_name: "agenda_confirmada", flujo: lead?.flujo ?? FLUJO },
  });

  if (!capi.ok) console.warn("[CAPI-SCHEDULE]", capi.detalle);

  const detalle = { cita: clave, inicio: inicio ?? "" };

  if (lead) {
    /*
     * `anotarCita` no escribe si la fila ya tenía una cita, y devuelve si
     * escribió. Con eso, el reintento del webhook no duplica el evento de la
     * línea de tiempo, y una reprogramación no se cuenta como una llamada nueva.
     */
    const anotada = await anotarCita(lead.id, {
      citaId: clave,
      inicio,
      capiDetalle: `schedule: ${capi.detalle}`,
    });

    if (anotada) {
      await registrarEvento({
        tipo: "cita",
        visitaId: lead.visita_id ?? undefined,
        leadId: lead.id,
        flujo: lead.flujo,
        detalle,
      });
    } else {
      console.info("[GHL-CITA] el lead ya tenía cita anotada:", lead.id);
    }

    return NextResponse.json({ ok: true, lead: lead.id, anotada });
  }

  /*
   * Nadie en la base con ese contacto: alguien agendó sin pasar por la landing
   * —le mandamos el link nosotros, vino de otro lado—. Se guarda para que la
   * llamada exista en el panel, sin Lead y sin marcarla como calificada: no
   * sabemos de dónde vino ni qué factura, y una señal inventada es peor que
   * ninguna.
   */
  const leadId = await guardarLead({
    flujo: FLUJO,
    origen: "calendario",
    nombre,
    facturacion: ficha?.facturacion,
    email,
    telefono,
    atribucion,
    ghlContactId: contactId,
    capiDetalle: `schedule: ${capi.detalle}`,
    agendadoEn: new Date().toISOString(),
    citaId: clave,
    citaInicio: inicio,
  });

  if (leadId) {
    await registrarEvento({ tipo: "cita", leadId, flujo: FLUJO, detalle });
  }

  return NextResponse.json({ ok: true, lead: leadId, nuevo: true });
}
