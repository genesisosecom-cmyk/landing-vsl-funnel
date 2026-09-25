# Tracking de la landing

## Qué mide y dónde queda

Cada lead deja rastro en tres lugares a la vez, y los tres se alimentan de la
misma cookie de atribución (`gen_atr`, first-touch, 90 días):

| Dónde | Para qué | Qué guarda |
| --- | --- | --- |
| **Meta** (píxel + Conversions API) | que los anuncios optimicen | `PageView`, `InitiateCheckout`, `Lead` (sólo calificados), `Schedule` |
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

La regla vive en `lib/calificacion.ts` y la aplican los tres lados que pueden
disparar el evento: el navegador, `/api/lead` y el webhook de citas. Si los
tres no coincidieran, alcanzaría con que uno disparara para que el evento
llegara igual.

En el flujo de agenda la pregunta la hace el formulario del calendario de GHL;
si no llega la respuesta, no califica. Ante la duda no se alimenta: una señal
de más es peor que una de menos.

## Los dos flujos del A/B

El reparto lo hace `/ir`: todos los anuncios apuntan ahí, la ruta sortea la
variante, la guarda en la cookie `gen_var` (90 días) y redirige con 307 sin
caché, pasando todos los parámetros al destino. La decisión de qué variante
gana se toma leyendo `/tracking`, no mirando el reparto de presupuesto de Meta.

**`/formulario`** — formulario propio embebido en la página. El POST a
`/api/lead` lleva los datos y la atribución juntos, así que no hay pieza
intermedia donde perder el origen. Se ve todo el recorrido: entró, tocó un
botón, empezó a completar, dejó los datos.

**`/agenda`** — calendario de GHL embebido, sin formulario previo. Los datos
los pide el formulario del propio calendario. Del recorrido dentro del iframe
no vemos nada: ese flujo tiene visitas, clicks y citas, pero no "empezó a
completar".

La atribución llega por dos caminos que se completan entre sí:

1. **Por GHL.** Los UTM viajan en la URL del iframe, GHL los guarda al crear el
   contacto, y el webhook de citas los lee de vuelta con `obtenerContacto`.
   Verificado con una reserva real: `utm_source`, `utm_medium`, `utm_campaign`,
   `utm_content` y `fbclid` llegan enteros. Tiene dos agujeros: no guarda `_fbp`
   ni `_fbc`, y **sólo escribe la atribución cuando crea el contacto** — si la
   persona ya estaba en el CRM queda la de aquella primera vez. Con una
   audiencia de retargeting, eso no es un caso raro.

2. **Por `/gracias`.** Después de reservar, GHL devuelve al visitante a nuestra
   página de agradecimiento con `?agendado=1`. Ahí volvemos a estar en nuestro
   dominio con la cookie intacta, y `AtribucionDeAgenda` manda la atribución de
   primera mano a `/api/agenda/atribucion`, que la pega a la cita. Ésta gana
   sobre la de GHL y la de GHL tapa los huecos.

El webhook y el aviso de gracias pueden llegar en cualquier orden, así que cada
uno busca al otro. Si el redirect trae el id del contacto —`?agendado=1&contact_id=…`—
la unión es exacta; si no, se cae a la cita sin atribuir más reciente dentro de
una ventana de diez minutos.

Un límite honesto: el webhook suele ganar la carrera, así que el `Lead` y el
`Schedule` que salen a Meta se arman con lo que haya en ese momento. La
atribución tardía corrige la fila del panel y los campos de GHL, no el evento
que ya salió — que igual matchea por mail y teléfono hasheados.

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
   la URL sin él, y entonces la cita queda sin atribución y el visitante lee el
   mensaje del formulario. Si GHL permite agregar el id del contacto, mejor
   todavía: `…/gracias/agenda?contact_id={{contact.id}}`, que hace exacta la
   unión con la cita.
3. Los campos personalizados ya existen; sus IDs están fijos en `lib/ghl.ts`.

## Base de datos

El esquema está en `docs/sql/tracking.sql`. Hoy vive en el proyecto de Supabase
`repuestos` con las tablas prefijadas `genesis_`, porque la organización llegó
al límite de proyectos gratuitos. Mudarlo a un proyecto propio es correr ese
SQL allá y cambiar las dos variables de entorno: el código no sabe en qué
proyecto está.
