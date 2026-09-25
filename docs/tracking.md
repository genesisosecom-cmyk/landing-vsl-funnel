# Tracking de la landing

## Qué mide y dónde queda

Cada lead deja rastro en tres lugares a la vez, y los tres se alimentan de la
misma cookie de atribución (`gen_atr`, first-touch, 90 días):

| Dónde | Para qué | Qué guarda |
| --- | --- | --- |
| **Meta** (píxel + Conversions API) | que los anuncios optimicen | `PageView`, `InitiateCheckout`, `Lead` (sólo calificados), `Schedule` (llamada agendada) |
| **GoHighLevel** | contactar al lead | contacto, tags, campos de UTM y las dos preguntas |
| **`/tracking`** (Supabase) | leer el embudo lead por lead | visita, clicks, formulario empezado, lead, cita |

El píxel y la Conversions API mandan el mismo `Lead` con el mismo `event_id`:
Meta los deduplica y cuenta uno solo. El del servidor existe porque el del
navegador se pierde entre el 20 % y el 40 % de las veces (iOS, Safari,
bloqueadores) y justo son los de abajo del embudo.

Nada de esto puede hacer fallar el envío de un lead: si la base no está
configurada o no responde, el lead igual llega a GHL y a Meta.

## Qué lead alimenta al píxel

El `Lead` sale **sólo si la facturación declarada es de 30M para arriba**
(`aplicar.formulario.facturacion.califican`, en `content/landing.ts`).

No es un capricho: Meta optimiza buscando más gente parecida a la que disparó
el evento. De los primeros seis leads, cinco facturaban por debajo del piso del
programa, y el píxel aprendió de esos cinco a traer más gente como ellos.

El lead descalificado **entra igual** a GoHighLevel y al panel — existe y se
contacta. Lo único que no hace es enseñarle nada al algoritmo. La columna
`calificado` de `genesis_leads` guarda la decisión, y el panel mide la
conversión sobre calificados, no sobre leads totales.

La regla vive en `lib/calificacion.ts` y la aplican los dos lados que disparan
el evento: el navegador y `/api/lead`. Los dos usan la misma función porque si
no coincidieran, alcanzaría con que uno disparara para que el evento llegara
igual — deduplicar no sirve de nada cuando el que sobra es el único que salió.

## El flujo

Uno solo: la landing con el formulario propio embebido.

`/ir` es la URL que tienen los anuncios publicados y hoy sólo redirige a
`/formulario`, pasando todos los parámetros enteros. `/agenda` también redirige
ahí. El POST a `/api/lead` lleva los datos y la atribución juntos, así que no hay
pieza intermedia donde perder el origen, y se ve todo el recorrido: entró, tocó
un botón, empezó a completar, dejó los datos.

Hubo un A/B contra `/agenda`, que embebía el calendario de GHL sin formulario
previo. Se cerró: dentro del iframe no se podía preguntar la facturación antes de
convertir —así que ningún lead de esa variante podía calificar— ni ver nada del
recorrido. Las filas viejas siguen en la base y el panel las sigue mostrando: la
lista de flujos sale de los datos, no de una constante.

## La llamada agendada

La llamada se agenda después del formulario, en el calendario de GHL que le
mandamos por WhatsApp. El workflow de GHL avisa a `/api/ghl/cita` y esa ruta
**completa la fila del lead**: no crea una nueva.

La unión es por identidad —el `ghl_contact_id` que guardamos al crear el lead, y
si falta, el mail o el teléfono— y no tiene ventana de tiempo: entre el
formulario y la llamada pueden pasar días, que es lo normal. Antes esto era un
heurístico con ventana de cinco minutos, porque en el flujo de agenda la reserva
y el aviso de la página de gracias llegaban casi juntos y sin nada en común; ese
heurístico una vez se llevó la fila equivocada.

De ahí sale un `Schedule` —nunca un `Lead`, ver arriba— con la atribución
guardada en la fila del lead, que es de primera mano y trae `_fbp` y `_fbc`. Lo
que GHL tenga guardado del contacto tapa los huecos.

Dos casos que el webhook maneja solo:

- **GHL reintenta** el mismo aviso: la fila sólo se escribe si todavía no tenía
  cita, así que el evento de la línea de tiempo no se duplica. A Meta el
  reintento no le molesta, el `event_id` es el mismo.
- **Agendó alguien que nunca pasó por la landing** (le mandamos el link, vino de
  otro lado): se guarda la fila para que la llamada exista en el panel, sin
  `Lead` y sin marcarla como calificada. No sabemos de dónde vino ni qué factura,
  y una señal inventada es peor que ninguna.

## Cómo cuenta el panel

Los números del embudo salen de la vista `genesis_resumen`, no de los eventos
crudos. El motivo es un techo que no se veía: PostgREST devuelve **1000 filas
como máximo**, pida lo que pida el cliente, así que el panel contaba sobre los
últimos 1000 eventos y el tráfico más viejo desaparecía en silencio. Con 1313
eventos ya se estaba comiendo el primer día entero de pauta.

Contando en la base, el panel trae una fila por tipo/flujo/creativo: crecen con
la cantidad de anuncios, no con la de visitas.

Dos cosas que conviene tener claras al leerlo:

- **Cada paso cuenta personas distintas, no repeticiones.** Alguien que recarga
  tres veces es una visita, no tres. Antes eran tres, y la conversión salía más
  baja de lo que era.
- **Los eventos uno por uno se piden sólo para los leads listados**
  (`eventosDeVisitas`), que es para lo único que hacen falta: la línea de tiempo
  de cada fila.

`/tracking` no se mide a sí mismo (`lib/medicion.ts`): abrir el panel no anota
una visita ni manda un `PageView` al píxel. Antes sí, y eran cuarenta visitas
nuestras mezcladas con las de la pauta.

Un detalle del nombre del creativo: hay clicks —los del scraper de Facebook,
algunos desde la app— donde los UTM llegan encodeados dos veces y el navegador
decodifica una sola, así que lo que se guardaba era `DOLOR+3+%7C+MARGEN` en vez
de `DOLOR 3 | MARGEN` y el panel abría dos filas para el mismo anuncio.
`normalizarUtm` lo deshace al capturar y también al leer, para que las filas
viejas se junten con las nuevas.

## Configuración en Vercel

Ver `.env.example`. Las que hacen falta para el panel:

- `SUPABASE_URL` — `https://<ref>.supabase.co`
- `SUPABASE_SERVICE_KEY` — Supabase → Settings → API → `service_role`
- `TRACKING_PASSWORD` — la contraseña de `/tracking`

## Configuración en GoHighLevel

1. **Workflow de citas** → acción *Webhook*, POST a
   `https://www.genesisecom.com/api/ghl/cita?token=<GHL_WEBHOOK_SECRET>`.
   Sin esto el flujo de agenda no manda ninguna conversión a Meta.
2. **Calendario** → el redirect posterior a la reserva apunta a
   `https://www.genesisecom.com/gracias/agenda`. Es una ruta y no una query a
   propósito: `?agendado=1` se pierde si el campo lo recorta o si alguien copia
   la URL sin él, y entonces el que acaba de reservar lee el mensaje del
   formulario. Ya no hace falta pasarle el id del contacto: la cita se une al
   lead del lado del servidor.
3. Los campos personalizados ya existen; sus IDs están fijos en `lib/ghl.ts`.

## Base de datos

El esquema está en `docs/sql/tracking.sql`. Hoy vive en el proyecto de Supabase
`repuestos` con las tablas prefijadas `genesis_`, porque la organización llegó
al límite de proyectos gratuitos. Mudarlo a un proyecto propio es correr ese
SQL allá y cambiar las dos variables de entorno: el código no sabe en qué
proyecto está.
