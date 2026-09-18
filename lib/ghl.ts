import type { Atribucion, Variante } from "./atribucion";

/**
 * Cliente de GoHighLevel (API v2).
 *
 * Los IDs de campo personalizado están fijos porque son los que ya existen en
 * la subcuenta: utm_source, utm_medium y utm_content. El resto del origen
 * (campaña, fbclid, referrer) va en `attributionSource`, que es el objeto
 * nativo de GHL y se ve en la ficha del contacto sin crear campos nuevos.
 */
const API = "https://services.leadconnectorhq.com";
const VERSION = "2021-07-28";

const CAMPOS = {
  utmSource: "YxZa5BCAAF7ZGtGh6NGi",
  utmMedium: "IDPD042sOkASJteoto0q",
  utmContent: "DiZhk2Muz63v09gwbus6",
} as const;

export type Lead = {
  nombre: string;
  email: string;
  telefono: string;
  variante: Variante;
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
    tags: ["landing-vsl", `variante-${lead.variante}`],
    customFields: [
      { id: CAMPOS.utmSource, value: a.utmSource ?? "" },
      { id: CAMPOS.utmMedium, value: a.utmMedium ?? "" },
      { id: CAMPOS.utmContent, value: a.utmContent ?? "" },
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
