import { createHmac, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { esFlujo, type Atribucion } from "@/lib/atribucion";
import { upsertContacto } from "@/lib/ghl";
import { enviarEvento } from "@/lib/capi";

/**
 * Webhook de Typeform: acá entra cada aplicación completada.
 *
 * Es el único camino confiable para el lado servidor: el navegador puede
 * cerrarse ni bien envía, y el evento del browser lo bloquean iOS y los
 * bloqueadores. Con esto el contacto llega a GoHighLevel y el Lead a Meta
 * aunque el visitante desaparezca.
 */

/** Refs de los campos del formulario, leídos de su definición pública. */
const REFS = {
  nombre: "4ae702e4-ef9c-40a4-bf18-b4c0f0f547cc",
  telefono: "13a3cc4d-eb94-4d03-8382-edfe05ff94a8",
  instagram: "fbb97a4b-fdcf-4f8c-ab5a-240f8711402e",
} as const;

type Respuesta = {
  field?: { ref?: string; type?: string };
  type?: string;
  text?: string;
  email?: string;
  phone_number?: string;
  choice?: { label?: string };
};

/** Busca por ref; si el formulario cambió, cae al primer campo del tipo. */
function valor(respuestas: Respuesta[], ref: string, tipo: string): string | undefined {
  const porRef = respuestas.find((r) => r.field?.ref === ref);
  const elegida = porRef ?? respuestas.find((r) => r.field?.type === tipo);
  if (!elegida) return undefined;
  return elegida.text ?? elegida.email ?? elegida.phone_number ?? elegida.choice?.label;
}

function firmaValida(cuerpo: string, firma: string | null, secreto: string): boolean {
  if (!firma) return false;
  const esperada = `sha256=${createHmac("sha256", secreto).update(cuerpo).digest("base64")}`;
  const a = Buffer.from(esperada);
  const b = Buffer.from(firma);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function POST(pedido: Request) {
  const secreto = process.env.TYPEFORM_WEBHOOK_SECRET;
  const crudo = await pedido.text();

  if (!secreto || !firmaValida(crudo, pedido.headers.get("typeform-signature"), secreto)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const cuerpo = JSON.parse(crudo);
  const respuesta = cuerpo?.form_response ?? {};
  const respuestas: Respuesta[] = respuesta.answers ?? [];
  const ocultos: Record<string, string> = respuesta.hidden ?? {};

  const nombre = valor(respuestas, REFS.nombre, "short_text");
  const telefono = valor(respuestas, REFS.telefono, "phone_number");
  const instagram = valor(respuestas, REFS.instagram, "short_text");
  const email = valor(respuestas, "", "email");

  if (!nombre || !telefono) {
    console.error("[TYPEFORM-SIN-DATOS]", JSON.stringify({ nombre, telefono, respuestas }).slice(0, 500));
    return NextResponse.json({ ok: false, error: "faltan nombre o teléfono" }, { status: 422 });
  }

  const atribucion: Atribucion = {
    utmSource: ocultos.utm_source || undefined,
    utmMedium: ocultos.utm_medium || undefined,
    utmCampaign: ocultos.utm_campaign || undefined,
    utmContent: ocultos.utm_content || undefined,
    utmTerm: ocultos.utm_term || undefined,
    fbclid: ocultos.fbclid || undefined,
    fbp: ocultos.fbp || undefined,
    fbc: ocultos.fbc || undefined,
    landing: ocultos.flujo ? `/${ocultos.flujo}` : undefined,
  };

  const flujo = esFlujo(ocultos.flujo) ? ocultos.flujo : "formulario";

  const guardado = await upsertContacto({
    nombre,
    email,
    telefono,
    instagram,
    flujo,
    origen: ocultos.origen,
    atribucion,
  });

  if (!guardado.ok) {
    // El lead ya aplicó: queda en el log de Vercel con un prefijo buscable
    // para no perderlo si GHL rechaza el alta.
    console.error(
      "[LEAD-SIN-GUARDAR]",
      JSON.stringify({ nombre, email, telefono, instagram, flujo, atribucion, error: guardado.error }),
    );
  }

  const evento = await enviarEvento({
    nombre: "Lead",
    // El mismo id que generó el navegador: Meta deduplica los dos envíos.
    eventId: ocultos.event_id || `lead-${respuesta.token ?? Date.now()}`,
    email,
    telefono,
    atribucion,
    url: `https://www.genesisecom.com/${flujo}`,
    datos: { flujo, origen: ocultos.origen, content_name: `lead_${flujo}` },
  });

  if (!evento.ok) console.warn("[CAPI-LEAD]", evento.detalle);

  return NextResponse.json({ ok: true });
}
