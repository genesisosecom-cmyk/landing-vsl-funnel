# Landing Génesis OS

Landing de funnel VSL en Next.js (App Router) + Tailwind.

**Estructura de la landing de referencia** (con un solo ajuste, ver abajo) y del
**Manual de Marca Génesis OS v2.0** únicamente la tipografía y los colores.

- Estructura: `docs/estructura-landing-referencia.md`
- Contenido: `content/landing.ts` (única fuente de verdad)

## Correr

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build de producción
```

## Cómo se edita

**Todo el contenido vive en `content/landing.ts`.** Los componentes no tienen copy
ni rutas de assets adentro: para cambiar la página se edita ese archivo.

- Palabras en el color de acento: envolverlas en `*asteriscos*`. El acento se
  resuelve solo según la sección (Naranja sobre negro, Brasa sobre hueso).
- El VSL del hero está en VTurb: en `hero.player` van el ID del reproductor y
  la URL de su script, los dos datos que VTurb entrega con el embed.
- Mosaico de resultados: las capturas viven en `public/resultados/`. Para sumar
  una, dejarla ahí y agregarla al array `results.items` con su ancho y alto
  reales; el masonry la acomoda solo. `results.featured` es la que va destacada
  a lo ancho, para una captura con mucho detalle.
- Imágenes: reemplazar las rutas `/placeholders/*.svg` por assets reales.
- Marcas en el copy: `BORRADOR` = redactado desde el manual, falta aprobación ·
  `PLACEHOLDER` = falta el dato o el material real.

## Qué se toma del manual, y qué no

Del manual se aplican **solo dos cosas**: las tipografías y la paleta. El layout
es el de la landing de referencia.

| Del manual | Dónde vive |
|---|---|
| Paleta completa (Naranja, Brasa, Luz, Negro, Hueso, Arena, grises) | `tailwind.config.ts` |
| Naranja para rellenos; Brasa para el naranja legible sobre claro | tonos en `app/globals.css` + `lib/highlight.tsx` |
| Montserrat para lo que se lee, Archivo para lo que se mide | `app/layout.tsx` |
| Jerarquía tipográfica (H1 64/1.05/−1,5 %, H2, cuerpo, caption) | `fontSize` en `tailwind.config.ts` |
| Semilla y logotipo, como logo de la página | `components/brand/` |

**No se aplican** (son decisiones de layout, no de marca): la proporción de uso
Negro 55 / Hueso 30, el hero de la sección 4.4, el halo, el campo de semillas,
la barra con el logotipo y la franja de datos. La página es clara y centrada,
como la referencia.

### Dos desvíos sobre las fuentes

1. **Archivo en lugar de JetBrains Mono.** El manual asigna JetBrains Mono a "lo
   que se mide" (captions, datos, etiquetas, botones). Las tipografías
   entregadas fueron Montserrat y Archivo, así que Archivo ocupa ese rol. Para
   volver a JetBrains Mono alcanza con cambiar la fuente en `app/layout.tsx`.
2. **Wordmark tipografiado.** El manual dice que GENESIS OS es un dibujo en
   curvas y que no se tipea. `components/brand/Logotipo.tsx` lo reconstruye con
   la familia, los pesos y el tracking correctos, como provisorio hasta tener el
   archivo: reemplazar por `wordmark_blanco.svg` / `_negro.svg` de
   `Logo-Genesis-OS/marca/`.

### Contraste

Todo el texto pasa WCAG AA. Los captions sobre claro van en Gris cálido, el
color que el manual les asigna: 4,2:1 en 12 px, apenas por debajo de AA. Es la
única excepción y es una decisión de la paleta, no del código; si se quiere AA
estricto ahí, el reemplazo más cercano es `#6B6461` en `--sutil`.

## Tipografías

Montserrat y Archivo van self-hosted como variables subseteadas a latin +
latin-ext (`public/fonts/*.woff2`): 145 KB entre las dos contra 1,37 MB de los
`.ttf` originales. Se cargan con `next/font/local`, sin pedidos a Google Fonts.

## Las dos landings del A/B

El reparto lo hace Meta mandando cada anuncio a una URL distinta; la app no
sortea nada.

| Ruta | Qué es |
|---|---|
| `/` | Redirige a `/formulario` |
| `/formulario` · `/agenda` | La misma landing, con distinto mecanismo de conversión |
| `/gracias` | Cierre de los dos flujos |
| `/tracking` | Panel interno, con contraseña |

Los cuatro botones de la landing bajan con scroll a la sección `#aplicar`, que
está debajo de "por dentro" en lugar de una banda de CTA. No navegan: el flujo
arranca ahí.

Lo único que cambia entre los dos flujos es qué hay embebido en esa sección:

- **`/formulario`** → formulario propio → `/gracias`. Lo contactamos nosotros.
- **`/agenda`** → calendario de GHL directo → `/gracias` (redirect configurado
  en el propio calendario). Los datos los pide el formulario del calendario.

En agenda no hay formulario previo a propósito: dos formularios seguidos pedían
los mismos datos dos veces y abrían la puerta a que GHL creara dos contactos por
un teléfono escrito distinto.

## Orden del funnel

Definido en `app/page.tsx`. Es el de la referencia: `bloque de valor → prueba →
CTA`, con el mismo botón repetido cinco veces y las secciones alternando blanco
y hueso.

1. Hero centrado: logo, título, bajada y VSL
2. CTA
3. **Mi caso** — responde "¿esto funciona?". Foto de Manu, métricas y capturas
   de sus tableros. Sin video.
4. CTA
5. **Génesis OS por dentro** — capturas del campus, la comunidad y el tablero.
   Sin video.
6. CTA
7. Oferta: seis entregables en zig-zag
8. CTA
9. **Resultados de alumnos** — mosaico de capturas, sin etiquetas ni texto
   encima. Responde "¿me va a funcionar a mí?"
10. CTA de cierre y pie con descargo de resultados

El ajuste sobre la referencia es el reparto de la prueba social: la referencia
usa el mismo formato de tarjeta en los dos bloques y un collage aparte; acá el
de arriba es el caso propio y el de abajo es un único mosaico con todo junto.

El VSL del hero, servido por VTurb, es el único video de la página.

Los dos bloques de prueba social son intercambiables: alcanza con permutar
`<FounderCase />` y `<ResultsMosaic />` en `app/page.tsx`.

## Layout

Secciones a sangre completa con un contenedor de 1320 px: la página ocupa todo
el ancho de la ventana. El hero entra completo, con el botón, en 1920 × 1080.
Verificada sin overflow horizontal a 1920, 1440, 1366 y 390.

## Pendiente antes de publicar

- [ ] URL real del checkout en `site.cta.href`.
- [ ] Aprobar el copy marcado `BORRADOR` y completar los `PLACEHOLDER`.
- [ ] Assets reales (y pasar los `<img>` a `next/image` cuando dejen de ser SVG;
      el mosaico de resultados ya lo usa).
- [ ] Reemplazar el wordmark por el SVG en curvas de la carpeta de marca.
- [ ] Descargo de resultados redactado por alguien que lo valide legalmente.
- [x] Píxel de Meta (`components/analytics/MetaPixel.tsx`, ID en `site.tracking`).
- [x] Evento de click: `InitiateCheckout` con la posición del botón
      (`components/analytics/CtaTracker.tsx`).
- [x] Destino del CTA: `/aplicar`.
- [x] Dos landings (`/formulario` y `/agenda`), lead a GoHighLevel y atribución
      por anuncio.
- [x] Formulario propio en `/formulario` y calendario de GHL embebido en
      `/agenda`.
- [x] Panel de tracking en `/tracking`, lead por lead (ver `docs/tracking.md`).
- [ ] `SUPABASE_URL`, `SUPABASE_SERVICE_KEY` y `TRACKING_PASSWORD` en Vercel.
- [ ] `META_CAPI_TOKEN` en Vercel: sin él los eventos de servidor no salen.
- [ ] Webhook de citas: crear el workflow en GHL apuntando a
      `/api/ghl/cita?token=$GHL_WEBHOOK_SECRET`. Sin eso el flujo de agenda no
      manda ninguna conversión a Meta.
- [ ] Decidir si se suman precio, FAQ, garantía y urgencia.

## Medición

| Momento | Evento | Cómo |
|---|---|---|
| Carga de la landing | `PageView` | navegador |
| Click en cualquier CTA | `InitiateCheckout` con la posición del botón | navegador |
| Formulario enviado (`/formulario`) | `Lead` con flujo y origen | navegador **y** servidor (`/api/lead`), mismo `event_id` |
| Cita agendada (`/agenda`) | `Lead` + `Schedule` | servidor, desde el webhook de GHL |

La atribución se captura en la primera visita (`utm_*`, `fbclid`, `_fbp`) en una
cookie propia de 90 días. En el flujo de formulario viaja en el mismo POST que
los datos del lead; en el de agenda viaja en la URL del iframe del calendario y
se recupera leyendo el contacto de GHL. En GoHighLevel queda en el
`attributionSource` del contacto y en los campos `utm_source`, `utm_medium`,
`utm_content`, `utm_campaign` y `fbclid`.

El detalle completo del tracking está en `docs/tracking.md`.

**Ojo con una particularidad de GHL:** el `attributionSource` se escribe solo al
crear el contacto; en un contacto que ya existía, GHL lo ignora. Los campos
personalizados sí se actualizan siempre, así que el nombre del anuncio
(`utm_content`) queda al día en todos los casos.

### UTMs en Meta

En cada anuncio, en "Parámetros de URL":

```
utm_source=meta&utm_medium=paid&utm_campaign={{campaign.name}}&utm_content={{ad.name}}&utm_term={{adset.name}}
```

Meta agrega el `fbclid` por su cuenta.
