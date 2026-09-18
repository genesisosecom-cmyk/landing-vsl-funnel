import { NextResponse } from "next/server";
import { enviarEvento } from "@/lib/capi";

/**
 * Webhook de GoHighLevel para "cita agendada".
 *
 * El Schedule sale de acá y no del navegador porque el calendario es un iframe
 * de GHL: no podemos ver la confirmación desde nuestra página. El workflow de
 * GHL le pega a esta ruta y el evento llega igual aunque el visitante cierre
 * la pestaña.
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

  const email: string | undefined = cuerpo?.email ?? cuerpo?.contact?.email;
  const telefono: string | undefined = cuerpo?.phone ?? cuerpo?.contact?.phone;
  // El id de la cita hace de eventId: si GHL reintenta, Meta deduplica.
  const idCita: string =
    cuerpo?.appointment?.id ?? cuerpo?.id ?? `cita-${email ?? "sin-email"}-${Date.now()}`;

  const evento = await enviarEvento({
    nombre: "Schedule",
    eventId: `schedule-${idCita}`,
    email,
    telefono,
    url: "https://www.genesisecom.com/aplicar",
    datos: { content_name: "agenda_confirmada" },
  });

  if (!evento.ok) console.warn("[CAPI-SCHEDULE]", evento.detalle);

  return NextResponse.json({ ok: true });
}
