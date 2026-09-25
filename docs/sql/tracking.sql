-- Esquema del panel de tracking. Ya está aplicado en la base actual; queda acá
-- para poder rehacerlo en otro proyecto de Supabase sin reconstruirlo de memoria.
--
-- RLS activada y sin políticas a propósito: nadie entra con la anon key, sólo
-- el servidor de la landing con la service key.

create table if not exists public.genesis_leads (
  id uuid primary key default gen_random_uuid(),
  creado_en timestamptz not null default now(),
  -- Identifica al visitante desde la primera carga, antes de que deje datos.
  visita_id uuid,
  flujo text not null,
  origen text,

  nombre text,
  email text,
  telefono text,
  instagram text,
  facturacion text,
  frecuencia text,

  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,
  fbclid text,
  fbp text,
  fbc text,
  referrer text,
  landing text,
  primera_visita timestamptz,

  -- Mismo id que se manda al píxel y a la Conversions API: permite auditar
  -- la deduplicación desde acá.
  event_id text,

  ghl_contact_id text,
  ghl_error text,
  capi_detalle text,

  ip text,
  user_agent text,

  agendado_en timestamptz,
  cita_id text,
  cita_inicio timestamptz
);

create index if not exists genesis_leads_creado_en_idx on public.genesis_leads (creado_en desc);
create index if not exists genesis_leads_visita_idx on public.genesis_leads (visita_id);
-- Si GHL reintenta el webhook de la cita, la fila no se duplica.
create unique index if not exists genesis_leads_cita_idx on public.genesis_leads (cita_id) where cita_id is not null;

create table if not exists public.genesis_eventos (
  id bigint generated always as identity primary key,
  creado_en timestamptz not null default now(),
  visita_id uuid,
  lead_id uuid references public.genesis_leads (id) on delete set null,
  -- visita | cta_click | form_iniciado | lead | cita
  tipo text not null,
  flujo text,
  detalle jsonb not null default '{}'::jsonb,
  ip text,
  user_agent text
);

create index if not exists genesis_eventos_creado_en_idx on public.genesis_eventos (creado_en desc);
create index if not exists genesis_eventos_visita_idx on public.genesis_eventos (visita_id);
create index if not exists genesis_eventos_lead_idx on public.genesis_eventos (lead_id);

alter table public.genesis_leads enable row level security;
alter table public.genesis_eventos enable row level security;

-- Las tablas nuevas heredan permisos para anon/authenticated en Supabase.
revoke all on public.genesis_leads from anon, authenticated;
revoke all on public.genesis_eventos from anon, authenticated;

-- El embudo, ya sumado.
--
-- El panel lo contaba trayéndose los eventos crudos, y ahí había un techo que
-- no se veía: PostgREST devuelve 1000 filas como máximo, pida lo que pida el
-- cliente. Con 1300 eventos el panel mostraba el último tramo de tráfico y el
-- primer día entero no existía, sin ningún aviso de que faltaba algo.
--
-- Una fila por tipo/flujo/creativo: crecen con la cantidad de anuncios, no con
-- la de visitas. `visitas` cuenta personas distintas, que es como se lee el
-- embudo; `eventos` cuenta repeticiones incluidas.
create or replace view public.genesis_resumen
with (security_invoker = true) as
select
  e.tipo,
  coalesce(e.flujo, '') as flujo,
  coalesce(e.detalle->>'utm_campaign', '') as utm_campaign,
  coalesce(e.detalle->>'utm_content', '') as utm_content,
  count(*)::int as eventos,
  count(distinct e.visita_id)::int as visitas
from public.genesis_eventos e
group by 1, 2, 3, 4;

revoke all on public.genesis_resumen from anon, authenticated;
grant select on public.genesis_resumen to service_role;
