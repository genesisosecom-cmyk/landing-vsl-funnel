# Tracking de la landing

## Qué mide y dónde queda

Cada lead deja rastro en tres lugares a la vez, y los tres se alimentan de la
misma cookie de atribución (`gen_atr`, first-touch, 90 días):

| Dónde | Para qué | Qué guarda |
| --- | --- | --- |
| **Meta** (píxel + Conversions API) | que los anuncios optimicen | `PageView`, `InitiateCheckout`, `Lead`, `Schedule` |
| **GoHighLevel** | contactar al lead | contacto, tags, campos de UTM y las dos preguntas |
| **`/tracking`** (Supabase) | leer el embudo lead por lead | visita, clicks, formulario empezado, lead, cita |

El píxel y la Conversions API mandan el mismo `Lead` con el mismo `event_id`:
Meta los deduplica y cuenta uno solo. El del servidor existe porque el del
navegador se pierde entre el 20 % y el 40 % de las veces (iOS, Safari,
bloqueadores) y justo son los de abajo del embudo.

Nada de esto puede hacer fallar el envío de un lead: si la base no está
configurada o no responde, el lead igual llega a GHL y a Meta.

## Los dos flujos del A/B

**`/formulario`** — formulario propio embebido en la página. El POST a
`/api/lead` lleva los datos y la atribución juntos, así que no hay pieza
intermedia donde perder el origen. Se ve todo el recorrido: entró, tocó un
botón, empezó a completar, dejó los datos.

**`/agenda`** — calendario de GHL embebido, sin formulario previo. Los datos
los pide el formulario del propio calendario. La atribución viaja en la URL del
iframe (`?utm_source=…&fbclid=…`), GHL la guarda al crear el contacto, y el
webhook de citas la lee de vuelta con `obtenerContacto` para disparar `Lead` y
`Schedule`. Del recorrido dentro del iframe no vemos nada: ese flujo tiene
visitas, clicks y citas, pero no "empezó a completar".

## Configuración en Vercel

Ver `.env.example`. Las que hacen falta para el panel:

- `SUPABASE_URL` — `https://<ref>.supabase.co`
- `SUPABASE_SERVICE_KEY` — Supabase → Settings → API → `service_role`
- `TRACKING_PASSWORD` — la contraseña de `/tracking`

## Configuración en GoHighLevel

1. **Workflow de citas** → acción *Webhook*, POST a
   `https://www.genesisecom.com/api/ghl/cita?token=<GHL_WEBHOOK_SECRET>`.
   Sin esto el flujo de agenda no manda ninguna conversión a Meta.
2. **Calendario** → el redirect posterior a la reserva apunta a `/gracias`.
3. Los campos personalizados ya existen; sus IDs están fijos en `lib/ghl.ts`.

## Base de datos

El esquema está en `docs/sql/tracking.sql`. Hoy vive en el proyecto de Supabase
`repuestos` con las tablas prefijadas `genesis_`, porque la organización llegó
al límite de proyectos gratuitos. Mudarlo a un proyecto propio es correr ese
SQL allá y cambiar las dos variables de entorno: el código no sabe en qué
proyecto está.
