/**
 * Base de datos del tracking (PostgREST de Supabase, por HTTPS).
 *
 * Es un cliente a mano, sin SDK, por la misma razón que lib/ghl.ts y
 * lib/capi.ts: son tres o cuatro consultas y así no entra una dependencia
 * nueva ni un pool de conexiones que en serverless da más problemas que otra
 * cosa.
 *
 * Todo lo de acá es opcional: si faltan las variables de entorno, la landing
 * sigue funcionando igual (el lead llega a GHL y a Meta), sólo se queda sin
 * panel. El tracking nunca puede ser el motivo de que un lead se pierda.
 */
import type { Atribucion, Flujo } from "./atribucion";

const URL_BASE = process.env.SUPABASE_URL;
const CLAVE = process.env.SUPABASE_SERVICE_KEY;

const TABLA_LEADS = "genesis_leads";
const TABLA_EVENTOS = "genesis_eventos";
/** Vista: el embudo ya contado por Postgres. Ver docs/sql/tracking.sql. */
const VISTA_RESUMEN = "genesis_resumen";

export function hayBase(): boolean {
  return Boolean(URL_BASE && CLAVE);
}

async function rest(camino: string, init: RequestInit = {}): Promise<Response | null> {
  if (!URL_BASE || !CLAVE) return null;

  try {
    return await fetch(`${URL_BASE}/rest/v1/${camino}`, {
      ...init,
      cache: "no-store",
      headers: {
        apikey: CLAVE,
        Authorization: `Bearer ${CLAVE}`,
        "Content-Type": "application/json",
        ...init.headers,
      },
    });
  } catch (error) {
    console.warn("[DB] inalcanzable:", (error as Error).message);
    return null;
  }
}

/** Los tipos de evento que el panel sabe leer. */
export const TIPOS_DE_EVENTO = ["visita", "cta_click", "form_iniciado", "lead", "cita"] as const;
export type TipoDeEvento = (typeof TIPOS_DE_EVENTO)[number];

export function esTipoDeEvento(valor: unknown): valor is TipoDeEvento {
  return TIPOS_DE_EVENTO.includes(valor as TipoDeEvento);
}

export type LeadGuardado = {
  visitaId?: string;
  flujo: Flujo;
  origen?: string;
  nombre?: string;
  email?: string;
  telefono?: string;
  instagram?: string;
  facturacion?: string;
  frecuencia?: string;
  atribucion: Atribucion;
  eventId?: string;
  ghlContactId?: string;
  ghlError?: string;
  capiDetalle?: string;
  /** Si disparó Lead a Meta. null cuando no se pudo saber. */
  calificado?: boolean;
  ip?: string;
  userAgent?: string;
  agendadoEn?: string;
  citaId?: string;
  citaInicio?: string;
};

function filaDeLead(lead: LeadGuardado) {
  const a = lead.atribucion ?? {};
  return {
    visita_id: lead.visitaId ?? null,
    flujo: lead.flujo,
    origen: lead.origen ?? null,
    nombre: lead.nombre ?? null,
    email: lead.email ?? null,
    telefono: lead.telefono ?? null,
    instagram: lead.instagram ?? null,
    facturacion: lead.facturacion ?? null,
    frecuencia: lead.frecuencia ?? null,
    utm_source: a.utmSource ?? null,
    utm_medium: a.utmMedium ?? null,
    utm_campaign: a.utmCampaign ?? null,
    utm_content: a.utmContent ?? null,
    utm_term: a.utmTerm ?? null,
    fbclid: a.fbclid ?? null,
    fbp: a.fbp ?? null,
    fbc: a.fbc ?? null,
    referrer: a.referrer ?? null,
    landing: a.landing ?? null,
    primera_visita: a.desde ?? null,
    event_id: lead.eventId ?? null,
    ghl_contact_id: lead.ghlContactId ?? null,
    ghl_error: lead.ghlError ?? null,
    capi_detalle: lead.capiDetalle ?? null,
    calificado: lead.calificado ?? null,
    ip: lead.ip ?? null,
    user_agent: lead.userAgent ?? null,
    agendado_en: lead.agendadoEn ?? null,
    cita_id: lead.citaId ?? null,
    cita_inicio: lead.citaInicio ?? null,
  };
}

/** Devuelve el id de la fila, o null si no hay base configurada o falló. */
export async function guardarLead(lead: LeadGuardado): Promise<string | null> {
  const respuesta = await rest(TABLA_LEADS, {
    method: "POST",
    headers: { Prefer: "return=representation" },
    body: JSON.stringify(filaDeLead(lead)),
  });

  if (!respuesta) return null;

  const dato = await respuesta.json().catch(() => null);
  if (!respuesta.ok) {
    console.warn("[DB] no se pudo guardar el lead:", JSON.stringify(dato).slice(0, 200));
    return null;
  }

  return Array.isArray(dato) ? (dato[0]?.id ?? null) : null;
}

export async function registrarEvento(evento: {
  tipo: TipoDeEvento;
  visitaId?: string;
  leadId?: string;
  flujo?: string;
  detalle?: Record<string, unknown>;
  ip?: string;
  userAgent?: string;
}): Promise<void> {
  await rest(TABLA_EVENTOS, {
    method: "POST",
    body: JSON.stringify({
      tipo: evento.tipo,
      visita_id: evento.visitaId ?? null,
      lead_id: evento.leadId ?? null,
      flujo: evento.flujo ?? null,
      detalle: evento.detalle ?? {},
      ip: evento.ip ?? null,
      user_agent: evento.userAgent ?? null,
    }),
  });
}

/** Fila tal cual sale de la base, para el panel. */
export type FilaLead = ReturnType<typeof filaDeLead> & { id: string; creado_en: string };

export type FilaEvento = {
  id: number;
  creado_en: string;
  visita_id: string | null;
  lead_id: string | null;
  tipo: string;
  flujo: string | null;
  detalle: Record<string, unknown>;
};

export async function listarLeads(limite = 300): Promise<FilaLead[]> {
  const respuesta = await rest(`${TABLA_LEADS}?select=*&order=creado_en.desc&limit=${limite}`);
  if (!respuesta?.ok) return [];
  return (await respuesta.json().catch(() => [])) as FilaLead[];
}

/** Una fila del embudo ya sumado: un tipo de evento, en un flujo, para un creativo. */
export type FilaResumen = {
  tipo: string;
  flujo: string;
  utm_campaign: string;
  utm_content: string;
  /** Eventos, contando repeticiones (dos cargas de la misma persona son dos). */
  eventos: number;
  /** Visitantes distintos: es lo que se lee como embudo. */
  visitas: number;
};

/**
 * El embudo, contado en la base.
 *
 * Antes el panel se traía los eventos crudos y los sumaba en memoria, y eso
 * tenía un techo que no se veía: PostgREST devuelve 1000 filas como máximo,
 * pida lo que pida el cliente. Con 1300 eventos el panel mostraba el último
 * tramo de tráfico y el primer día entero simplemente no existía, sin ningún
 * aviso de que faltaba algo.
 *
 * Ahora la cuenta la hace Postgres y vuelve una fila por tipo/flujo/creativo:
 * son decenas, y crecen con la cantidad de anuncios, no con la de visitas.
 */
export async function listarResumen(): Promise<FilaResumen[]> {
  const respuesta = await rest(`${VISTA_RESUMEN}?select=*`);
  if (!respuesta?.ok) return [];
  return (await respuesta.json().catch(() => [])) as FilaResumen[];
}

/**
 * Los eventos de visitas concretas, para la línea de tiempo de cada lead.
 *
 * Se piden por id en lugar de traer los últimos N: son los recorridos de los
 * leads que el panel muestra, y así ninguno queda sin su línea de tiempo por
 * haber caído del otro lado del corte.
 */
export async function eventosDeVisitas(visitas: (string | null)[]): Promise<FilaEvento[]> {
  const unicas = [...new Set(visitas.filter((v): v is string => Boolean(v)))];
  if (unicas.length === 0) return [];

  // En tandas para no armar una URL de kilómetros; las tandas van en paralelo.
  const tandas: string[][] = [];
  for (let i = 0; i < unicas.length; i += 50) tandas.push(unicas.slice(i, i + 50));

  const respuestas = await Promise.all(
    tandas.map((tanda) =>
      rest(
        `${TABLA_EVENTOS}?select=*&visita_id=in.(${tanda.join(",")})&order=creado_en.desc&limit=1000`,
      ),
    ),
  );

  const filas = await Promise.all(
    respuestas.map(async (r) => (r?.ok ? ((await r.json().catch(() => [])) as FilaEvento[]) : [])),
  );

  return filas.flat();
}

/* -------------------------------------------------------------------------- */
/* Citas                                                                       */
/* -------------------------------------------------------------------------- */

/**
 * El lead al que corresponde una cita de GoHighLevel.
 *
 * Con un solo flujo, la cita nunca es el primer contacto: el visitante dejó sus
 * datos en la landing, y la llamada se agenda después, cuando ya lo escribimos
 * por WhatsApp. Así que la cita se pega a una fila que ya existe.
 *
 * Antes esto era un heurístico con ventana de cinco minutos —la cita sin
 * atribuir más reciente— porque en el flujo de agenda la reserva y el aviso de
 * la página de gracias llegaban casi juntos y sin nada en común. Ese heurístico
 * una vez se llevó la fila equivocada. Ahora la unión es por identidad: el id
 * de contacto de GHL, que guardamos al crear el lead, y si falta, el mail o el
 * teléfono. Y ya no hay ventana: entre el formulario y la llamada pueden pasar
 * días, que es justamente lo normal.
 */
export async function leadDelContacto(claves: {
  contactId?: string;
  email?: string;
  telefono?: string;
}): Promise<FilaLead | null> {
  const filtros = [
    claves.contactId && `ghl_contact_id=eq.${encodeURIComponent(claves.contactId)}`,
    claves.email && `email=ilike.${encodeURIComponent(claves.email)}`,
    claves.telefono && `telefono=eq.${encodeURIComponent(claves.telefono)}`,
  ].filter(Boolean) as string[];

  for (const filtro of filtros) {
    const respuesta = await rest(
      `${TABLA_LEADS}?select=*&${filtro}&order=creado_en.desc&limit=1`,
    );
    if (!respuesta?.ok) continue;

    const filas = (await respuesta.json().catch(() => [])) as FilaLead[];
    if (filas[0]) return filas[0];
  }

  return null;
}

/** La atribución guardada en una fila, para volver a mandarla a Meta. */
export function atribucionDeFila(fila: FilaLead): Atribucion {
  const texto = (v: string | null | undefined) => v || undefined;

  return {
    utmSource: texto(fila.utm_source),
    utmMedium: texto(fila.utm_medium),
    utmCampaign: texto(fila.utm_campaign),
    utmContent: texto(fila.utm_content),
    utmTerm: texto(fila.utm_term),
    fbclid: texto(fila.fbclid),
    fbp: texto(fila.fbp),
    fbc: texto(fila.fbc),
    referrer: texto(fila.referrer),
    landing: texto(fila.landing),
    desde: texto(fila.primera_visita),
  };
}

/**
 * Anota la cita en la fila del lead.
 *
 * Sólo escribe si la fila todavía no tenía cita, y devuelve si escribió. Eso
 * hace que el reintento del webhook de GHL —que reintenta— no vuelva a anotar
 * el mismo evento en la línea de tiempo. A Meta el reintento no le molesta: el
 * `event_id` es el mismo y lo deduplica.
 */
export async function anotarCita(
  id: string,
  cita: { citaId: string; inicio?: string; capiDetalle?: string },
): Promise<boolean> {
  const respuesta = await rest(`${TABLA_LEADS}?id=eq.${id}&cita_id=is.null`, {
    method: "PATCH",
    headers: { Prefer: "return=representation" },
    body: JSON.stringify({
      agendado_en: new Date().toISOString(),
      cita_id: cita.citaId,
      cita_inicio: cita.inicio ?? null,
      capi_detalle: cita.capiDetalle ?? null,
    }),
  });

  if (!respuesta?.ok) return false;

  const filas = (await respuesta.json().catch(() => [])) as unknown[];
  return filas.length > 0;
}
