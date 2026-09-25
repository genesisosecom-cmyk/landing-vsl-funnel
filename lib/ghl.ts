import type { Atribucion, Flujo } from "./atribucion";

/**
 * Cliente de GoHighLevel (API v2).
 *
 * Los IDs de campo personalizado están fijos porque son los de la subcuenta.
 * Todos son de tipo TEXT a propósito, incluidas las dos preguntas de
 * calificación: si fueran de opciones, agregar una opción en el formulario
 * haría fallar el upsert entero y el lead se perdería por un detalle de copy.
 *
 * `attributionSource` es además el objeto nativo de GHL y se ve en la ficha del
 * contacto. Ojo: GHL sólo lo escribe cuando crea el contacto; en un upsert
 * sobre uno que ya existe lo ignora. Por eso los UTM viajan también como campos
 * personalizados, que sí se actualizan siempre.
 */
const API = "https://services.leadconnectorhq.com";
const VERSION = "2021-07-28";

const CAMPOS = {
  utmSource: "YxZa5BCAAF7ZGtGh6NGi",
  utmMedium: "IDPD042sOkASJteoto0q",
  utmContent: "DiZhk2Muz63v09gwbus6",
  utmCampaign: "dGZwyGyeuKrDc75tsxy9",
  fbclid: "NVEpWUap2lMPSbypWMGX",
  instagram: "MGWoZYcdmDS3gEnaemMC",
  facturacion: "zeD4nDQ1JwWR8PsjSKIy",
  frecuencia: "CMWq225YOq7IAjWfE9Zi",
} as const;

export type Lead = {
  nombre: string;
  email?: string;
  telefono: string;
  /** Instagram: lo pide el formulario y sirve para identificar al lead. */
  instagram?: string;
  /** Las dos preguntas de calificación, tal cual las eligió el lead. */
  facturacion?: string;
  frecuencia?: string;
  flujo: Flujo;
  /** Desde qué parte de la página se abrió el formulario. */
  origen?: string;
  atribucion: Atribucion;
};

export type ResultadoGhl = { ok: true; contactId: string } | { ok: false; error: string };

export async function upsertContacto(lead: Lead): Promise<ResultadoGhl> {
  const token = process.env.GHL_TOKEN;
  const locationId = process.env.GHL_LOCATION_ID;

  if (!token || !locationId) {
    return { ok: false, error: "Faltan GHL_TOKEN o GHL_LOCATION_ID" };
  }

  const { atribucion: a } = lead;
  const [nombre, ...resto] = lead.nombre.trim().split(/\s+/);

  const cuerpo = {
    locationId,
    firstName: nombre,
    lastName: resto.join(" ") || undefined,
    email: lead.email,
    phone: lead.telefono,
    source: "Landing VSL",
    tags: ["landing-vsl", `flujo-${lead.flujo}`, lead.origen ? `origen-${lead.origen}` : ""].filter(Boolean),
    customFields: [
      { id: CAMPOS.utmSource, value: a.utmSource ?? "" },
      { id: CAMPOS.utmMedium, value: a.utmMedium ?? "" },
      { id: CAMPOS.utmContent, value: a.utmContent ?? "" },
      { id: CAMPOS.utmCampaign, value: a.utmCampaign ?? "" },
      { id: CAMPOS.fbclid, value: a.fbclid ?? "" },
      { id: CAMPOS.instagram, value: lead.instagram ?? "" },
      { id: CAMPOS.facturacion, value: lead.facturacion ?? "" },
      { id: CAMPOS.frecuencia, value: lead.frecuencia ?? "" },
    ].filter((c) => c.value),
    attributionSource: {
      url: a.landing ? `https://www.genesisecom.com${a.landing}` : undefined,
      campaign: a.utmCampaign,
      utmSource: a.utmSource,
      utmMedium: a.utmMedium,
      utmContent: a.utmContent,
      utmTerm: a.utmTerm,
      fbclid: a.fbclid,
      referrer: a.referrer,
      medium: a.utmMedium,
      sessionSource: a.fbclid ? "Paid Social" : a.utmSource,
    },
  };

  try {
    const respuesta = await fetch(`${API}/contacts/upsert`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Version: VERSION,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cuerpo),
    });

    const dato = await respuesta.json().catch(() => ({}));

    if (!respuesta.ok) {
      return { ok: false, error: `GHL ${respuesta.status}: ${JSON.stringify(dato).slice(0, 200)}` };
    }

    return { ok: true, contactId: dato?.contact?.id ?? "" };
  } catch (error) {
    return { ok: false, error: `GHL inalcanzable: ${(error as Error).message}` };
  }
}

/**
 * Trae un contacto de GHL.
 *
 * Lo usa el webhook de citas: cuando alguien agenda desde el calendario
 * embebido, el contacto lo crea GHL con lo que el visitante escribió en su
 * formulario, y la atribución queda guardada del lado de ellos. Leerla de acá
 * es la única forma de saber de qué anuncio venía esa agenda.
 */
export async function obtenerContacto(
  contactId: string,
): Promise<{
  contacto: Record<string, unknown>;
  atribucion: Atribucion;
  /** Lo que haya respondido en el formulario del calendario, si lo pregunta. */
  facturacion?: string;
} | null> {
  const token = process.env.GHL_TOKEN;
  if (!token || !contactId) return null;

  try {
    const respuesta = await fetch(`${API}/contacts/${contactId}`, {
      headers: { Authorization: `Bearer ${token}`, Version: VERSION },
      cache: "no-store",
    });

    if (!respuesta.ok) return null;

    const dato = await respuesta.json().catch(() => ({}));
    const contacto = dato?.contact ?? {};
    // GHL devuelve el histórico: la primera entrada es el primer toque.
    const fuente = Array.isArray(contacto.attributions) ? contacto.attributions[0] : contacto.attributionSource;

    const atribucion: Atribucion = {
      utmSource: fuente?.utmSource ?? undefined,
      utmMedium: fuente?.utmMedium ?? undefined,
      utmCampaign: fuente?.campaign ?? fuente?.utmCampaign ?? undefined,
      utmContent: fuente?.utmContent ?? undefined,
      utmTerm: fuente?.utmTerm ?? undefined,
      fbclid: fuente?.fbclid ?? undefined,
      referrer: fuente?.referrer ?? undefined,
      landing: fuente?.url ?? undefined,
    };

    const campos = Array.isArray(contacto.customFields) ? contacto.customFields : [];
    const facturacion = campos.find(
      (c: { id?: string }) => c?.id === CAMPOS.facturacion,
    )?.value;

    return { contacto, atribucion, facturacion: facturacion || undefined };
  } catch {
    return null;
  }
}
