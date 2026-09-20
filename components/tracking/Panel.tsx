"use client";

import { useMemo, useState } from "react";
import type { FilaEvento, FilaLead } from "@/lib/db";
import { FLUJOS, type Flujo } from "@/lib/atribucion";

/**
 * Panel de tracking, lead por lead.
 *
 * Arriba el embudo de cada flujo del A/B —visitas, clicks, formularios
 * empezados, leads, citas— que es la lectura del test. Abajo la tabla, donde
 * cada fila se abre y muestra de qué anuncio vino ese lead en concreto y qué
 * hizo antes de dejar los datos.
 *
 * Todo el filtrado es en memoria: son cientos de filas, no millones, y así el
 * panel responde sin ida y vuelta al servidor.
 */

const FORMATO_FECHA = new Intl.DateTimeFormat("es-AR", {
  day: "2-digit",
  month: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "America/Argentina/Buenos_Aires",
});

function fecha(iso: string | null | undefined): string {
  return iso ? FORMATO_FECHA.format(new Date(iso)) : "—";
}

type Filtro = "todos" | Flujo;

export function Panel({ leads, eventos }: { leads: FilaLead[]; eventos: FilaEvento[] }) {
  const [filtro, setFiltro] = useState<Filtro>("todos");
  const [abierto, setAbierto] = useState<string | null>(null);

  const visibles = useMemo(
    () => (filtro === "todos" ? leads : leads.filter((l) => l.flujo === filtro)),
    [leads, filtro],
  );

  const embudos = useMemo(() => FLUJOS.map((f) => embudoDe(f, leads, eventos)), [leads, eventos]);

  // El embudo por creativo: con varios anuncios corriendo, es el cruce que
  // decide cuál se apaga. El que no trae visitas no aparece.
  const creativos = useMemo(() => porCreativo(leads, eventos), [leads, eventos]);

  // Los eventos de una visita se agrupan una vez y no en cada fila abierta.
  const porVisita = useMemo(() => {
    const mapa = new Map<string, FilaEvento[]>();
    for (const evento of eventos) {
      if (!evento.visita_id) continue;
      const lista = mapa.get(evento.visita_id) ?? [];
      lista.push(evento);
      mapa.set(evento.visita_id, lista);
    }
    return mapa;
  }, [eventos]);

  return (
    <main className="tono-blanco min-h-screen bg-tono text-texto">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-10 px-8 py-10 max-sm:px-4">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="dato">Génesis OS</p>
            <h1 className="text-[2rem] leading-tight text-titulo">Tracking</h1>
          </div>
          <p className="text-[0.875rem] text-sutil">
            {leads.length} leads · {eventos.length} eventos registrados
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-2">
          {embudos.map((embudo) => (
            <Embudo key={embudo.flujo} {...embudo} />
          ))}
        </section>

        {creativos.length > 0 && (
          <section className="flex flex-col gap-4">
            <h2 className="dato">Por creativo</h2>

            <div className="overflow-x-auto rounded-pieza border border-linea">
              <table className="w-full border-collapse text-left text-[0.875rem]">
                <thead>
                  <tr className="border-b border-linea bg-hueso">
                    {["Anuncio", "Campaña", "Visitas", "Clicks", "Empezó", "Leads", "Citas", "Conv."].map(
                      (titulo) => (
                        <th key={titulo} className="dato whitespace-nowrap px-4 py-3">
                          {titulo}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody>
                  {creativos.map((c) => (
                    <tr key={`${c.campana}/${c.anuncio}`} className="border-b border-linea last:border-0">
                      <td className="px-4 py-3 text-titulo">{c.anuncio}</td>
                      <td className="px-4 py-3 text-sutil">{c.campana}</td>
                      <td className="px-4 py-3 font-data">{c.visitas}</td>
                      <td className="px-4 py-3 font-data">{c.clicks}</td>
                      <td className="px-4 py-3 font-data">{c.empezados}</td>
                      <td className="px-4 py-3 font-data text-titulo">{c.leads}</td>
                      <td className="px-4 py-3 font-data">{c.citas}</td>
                      <td className="px-4 py-3 font-data text-acento">
                        {c.visitas > 0 ? `${((c.leads / c.visitas) * 100).toFixed(1)}%` : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        <section className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            {(["todos", ...FLUJOS] as Filtro[]).map((opcion) => (
              <button
                key={opcion}
                type="button"
                onClick={() => setFiltro(opcion)}
                className={`rounded-cta border px-4 py-2 font-data text-[0.75rem] uppercase tracking-dato transition-colors ${
                  filtro === opcion
                    ? "border-brasa bg-brasa text-blanco"
                    : "border-linea text-sutil hover:border-brasa"
                }`}
              >
                {opcion}
              </button>
            ))}
          </div>

          <div className="overflow-x-auto rounded-pieza border border-linea">
            <table className="w-full border-collapse text-left text-[0.875rem]">
              <thead>
                <tr className="border-b border-linea bg-hueso">
                  {["Fecha", "Flujo", "Nombre", "Contacto", "Campaña", "Anuncio", "Factura", "GHL", "Cita"].map(
                    (titulo) => (
                      <th key={titulo} className="dato whitespace-nowrap px-4 py-3">
                        {titulo}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {visibles.length === 0 && (
                  <tr>
                    <td colSpan={9} className="px-4 py-10 text-center text-sutil">
                      Todavía no hay leads con este filtro.
                    </td>
                  </tr>
                )}

                {visibles.map((lead) => (
                  <Fila
                    key={lead.id}
                    lead={lead}
                    eventos={lead.visita_id ? (porVisita.get(lead.visita_id) ?? []) : []}
                    abierto={abierto === lead.id}
                    alAbrir={() => setAbierto(abierto === lead.id ? null : lead.id)}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}

type DatosEmbudo = {
  flujo: Flujo;
  visitas: number;
  clicks: number;
  empezados: number;
  leads: number;
  citas: number;
};

function embudoDe(flujo: Flujo, leads: FilaLead[], eventos: FilaEvento[]): DatosEmbudo {
  const delFlujo = eventos.filter((e) => e.flujo === flujo);
  const leadsDelFlujo = leads.filter((l) => l.flujo === flujo);

  return {
    flujo,
    visitas: delFlujo.filter((e) => e.tipo === "visita").length,
    clicks: delFlujo.filter((e) => e.tipo === "cta_click").length,
    empezados: delFlujo.filter((e) => e.tipo === "form_iniciado").length,
    leads: leadsDelFlujo.length,
    citas: leadsDelFlujo.filter((l) => l.cita_id).length,
  };
}

type FilaCreativo = {
  anuncio: string;
  campana: string;
  visitas: number;
  clicks: number;
  empezados: number;
  leads: number;
  citas: number;
};

/**
 * Agrupa el embudo por anuncio.
 *
 * Los eventos traen el creativo en `detalle`; los leads, en su propia columna.
 * Se cuentan por separado y se juntan por el par campaña/anuncio, que es lo
 * que identifica un creativo cuando el mismo nombre se reusa entre campañas.
 */
function porCreativo(leads: FilaLead[], eventos: FilaEvento[]): FilaCreativo[] {
  const filas = new Map<string, FilaCreativo>();

  const traer = (anuncio: string, campana: string) => {
    const clave = `${campana}/${anuncio}`;
    const existente = filas.get(clave);
    if (existente) return existente;

    const nueva: FilaCreativo = { anuncio, campana, visitas: 0, clicks: 0, empezados: 0, leads: 0, citas: 0 };
    filas.set(clave, nueva);
    return nueva;
  };

  const texto = (valor: unknown) => (typeof valor === "string" && valor ? valor : "");

  for (const evento of eventos) {
    const anuncio = texto(evento.detalle?.utm_content);
    const campana = texto(evento.detalle?.utm_campaign);
    // Sin anuncio no vino de pauta: es tráfico directo y no entra a la tabla.
    if (!anuncio) continue;

    const fila = traer(anuncio, campana);
    if (evento.tipo === "visita") fila.visitas += 1;
    if (evento.tipo === "cta_click") fila.clicks += 1;
    if (evento.tipo === "form_iniciado") fila.empezados += 1;
  }

  for (const lead of leads) {
    if (!lead.utm_content) continue;
    const fila = traer(lead.utm_content, lead.utm_campaign ?? "");
    fila.leads += 1;
    if (lead.cita_id) fila.citas += 1;
  }

  return [...filas.values()].sort((a, b) => b.visitas - a.visitas || b.leads - a.leads);
}

function Embudo({ flujo, visitas, clicks, empezados, leads, citas }: DatosEmbudo) {
  // En el flujo de agenda no hay formulario propio: el paso "empezó" no existe
  // porque ocurre dentro del iframe de GHL, donde no vemos nada.
  const pasos: [string, number][] = [
    ["Visitas", visitas],
    ["Clicks CTA", clicks],
    ...(flujo === "agenda" ? [] : ([["Empezó", empezados]] as [string, number][])),
    ["Leads", leads],
    ["Citas", citas],
  ];

  const conversion = visitas > 0 ? ((leads / visitas) * 100).toFixed(1) : "—";

  return (
    <div className="rounded-pieza border border-linea p-6">
      <div className="mb-4 flex items-baseline justify-between">
        <h2 className="font-data text-[0.875rem] uppercase tracking-dato text-titulo">/{flujo}</h2>
        <p className="text-[0.875rem] text-sutil">
          conversión <span className="text-acento">{conversion}%</span>
        </p>
      </div>

      <dl className="grid grid-cols-2 gap-4 sm:grid-cols-5">
        {pasos.map(([etiqueta, valor]) => (
          <div key={etiqueta} className="flex flex-col justify-between">
            <dt className="dato">{etiqueta}</dt>
            <dd className="font-data text-[1.5rem] text-titulo">{valor}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function Fila({
  lead,
  eventos,
  abierto,
  alAbrir,
}: {
  lead: FilaLead;
  eventos: FilaEvento[];
  abierto: boolean;
  alAbrir: () => void;
}) {
  return (
    <>
      <tr
        onClick={alAbrir}
        className="cursor-pointer border-b border-linea transition-colors hover:bg-hueso"
      >
        <td className="whitespace-nowrap px-4 py-3">{fecha(lead.creado_en)}</td>
        <td className="px-4 py-3">{lead.flujo}</td>
        <td className="px-4 py-3 text-titulo">{lead.nombre ?? "—"}</td>
        <td className="px-4 py-3">
          <span className="block">{lead.telefono ?? "—"}</span>
          <span className="block text-sutil">{lead.email ?? lead.instagram ?? ""}</span>
        </td>
        <td className="px-4 py-3">{lead.utm_campaign ?? "—"}</td>
        <td className="px-4 py-3">{lead.utm_content ?? "—"}</td>
        <td className="px-4 py-3">{lead.facturacion ?? "—"}</td>
        <td className="px-4 py-3">
          {lead.ghl_contact_id ? (
            <span className="text-acento">ok</span>
          ) : (
            <span className="text-anotacion">{lead.ghl_error ? "error" : "—"}</span>
          )}
        </td>
        <td className="whitespace-nowrap px-4 py-3">{lead.cita_inicio ? fecha(lead.cita_inicio) : "—"}</td>
      </tr>

      {abierto && (
        <tr className="border-b border-linea bg-hueso">
          <td colSpan={9} className="px-4 py-6">
            <div className="grid gap-8 lg:grid-cols-2">
              <Detalle lead={lead} />
              <Linea eventos={eventos} />
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

function Detalle({ lead }: { lead: FilaLead }) {
  const filas: [string, string | null][] = [
    ["utm_source", lead.utm_source],
    ["utm_medium", lead.utm_medium],
    ["utm_campaign", lead.utm_campaign],
    ["utm_content", lead.utm_content],
    ["utm_term", lead.utm_term],
    ["fbclid", lead.fbclid],
    ["fbp", lead.fbp],
    ["fbc", lead.fbc],
    ["referrer", lead.referrer],
    ["landing", lead.landing],
    ["primera visita", lead.primera_visita ? fecha(lead.primera_visita) : null],
    ["frecuencia", lead.frecuencia],
    ["instagram", lead.instagram],
    ["origen en la página", lead.origen],
    ["event_id (Meta)", lead.event_id],
    ["contacto GHL", lead.ghl_contact_id],
    ["error GHL", lead.ghl_error],
    ["Conversions API", lead.capi_detalle],
  ];

  return (
    <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-[0.8125rem]">
      {filas.map(([etiqueta, valor]) => (
        <div key={etiqueta} className="contents">
          <dt className="dato whitespace-nowrap">{etiqueta}</dt>
          <dd className="break-all text-titulo">{valor || <span className="text-sutil">—</span>}</dd>
        </div>
      ))}
    </dl>
  );
}

const NOMBRE_EVENTO: Record<string, string> = {
  visita: "Entró a la página",
  cta_click: "Tocó un botón",
  form_iniciado: "Empezó a completar",
  lead: "Dejó sus datos",
  cita: "Agendó",
};

function Linea({ eventos }: { eventos: FilaEvento[] }) {
  if (eventos.length === 0) {
    return (
      <p className="text-[0.8125rem] text-sutil">
        Sin eventos previos. Pasa cuando el lead llega desde el calendario de GHL, donde el recorrido
        ocurre dentro del iframe y no lo vemos.
      </p>
    );
  }

  // De la base vienen del más nuevo al más viejo; la línea de tiempo se lee al revés.
  const ordenados = [...eventos].reverse();

  return (
    <ol className="flex flex-col gap-3 text-[0.8125rem]">
      {ordenados.map((evento) => (
        <li key={evento.id} className="flex gap-4">
          <span className="whitespace-nowrap text-sutil">{fecha(evento.creado_en)}</span>
          <span className="text-titulo">
            {NOMBRE_EVENTO[evento.tipo] ?? evento.tipo}
            {detalleLegible(evento.detalle) && (
              <span className="text-sutil"> · {detalleLegible(evento.detalle)}</span>
            )}
          </span>
        </li>
      ))}
    </ol>
  );
}

function detalleLegible(detalle: Record<string, unknown>): string {
  return Object.entries(detalle ?? {})
    .filter(([, valor]) => valor !== "" && valor != null)
    .map(([clave, valor]) => `${clave}: ${valor}`)
    .join(" · ");
}
