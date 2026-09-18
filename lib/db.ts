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

/** Los eventos de las visitas que aparecen en el panel, para armar la línea de tiempo. */
export async function listarEventos(limite = 2000): Promise<FilaEvento[]> {
  const respuesta = await rest(`${TABLA_EVENTOS}?select=*&order=creado_en.desc&limit=${limite}`);
  if (!respuesta?.ok) return [];
  return (await respuesta.json().catch(() => [])) as FilaEvento[];
}
