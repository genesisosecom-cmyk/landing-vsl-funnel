# Landing Génesis OS

Landing de funnel VSL en Next.js (App Router) + Tailwind, construida sobre el
**Manual de Marca Génesis OS v2.0** y optimizada para desktop.

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
- Videos: `kind: "file"` para un mp4 propio, `kind: "embed"` para YouTube/Vimeo/Loom.
  Con `src` vacío el reproductor muestra el cartel "Falta el video".
- Imágenes: reemplazar las rutas `/placeholders/*.svg` por assets reales.
- Marcas en el copy: `BORRADOR` = redactado desde el manual, falta aprobación ·
  `PLACEHOLDER` = falta el dato o el material real.

## El manual, aplicado

| Regla del manual | Dónde vive |
|---|---|
| Paleta y proporción Negro 55 · Hueso 30 · Grises 10 · Naranja 5 | `tailwind.config.ts` + tonos en `app/globals.css` |
| Naranja solo en palabras sueltas y grandes; Brasa cuando va sobre claro | `lib/highlight.tsx` y la variable `--acento` por sección |
| Jerarquía tipográfica (H1 64/1.05/−1,5 %, H2, cuerpo, caption, cifra) | `fontSize` en `tailwind.config.ts` |
| Semilla: intersección de dos círculos, R = 34, centros en x = 30 y 70 | `components/brand/Semilla.tsx` |
| Halo: Brasa 55 % que se apaga hacia negro, uno solo por pieza, con la Semilla en el centro | `components/brand/Halo.tsx`, usado solo en el hero |
| Campo de semillas: retícula al tresbolillo, 12 % con algunas al 28 %, nunca detrás de texto | `components/brand/CampoDeSemillas.tsx`, como separador |
| Hero 4.4: negro con halo, eyebrow naranja, H1 de dos líneas, un botón naranja con texto negro, franja de datos con cifra en blanco | `components/sections/Hero.tsx` |
| Por debajo del hero, el contenido pasa a hueso | `app/page.tsx` |
| El usuario cierra la pieza en naranja | `components/sections/SiteFooter.tsx` |

### Dos desvíos del manual, a confirmar

1. **Archivo en lugar de JetBrains Mono.** El manual asigna JetBrains Mono a "lo
   que se mide" (captions, datos, etiquetas). Las tipografías entregadas fueron
   Montserrat y Archivo, así que Archivo ocupa ese rol. Si la decisión es
   mantener JetBrains Mono, se cambia solo en `app/layout.tsx`.
2. **Wordmark tipografiado.** El manual dice que GENESIS OS es un dibujo en
   curvas y que no se tipea. `components/brand/Logotipo.tsx` lo reconstruye con
   la familia, los pesos y el tracking correctos como provisorio: reemplazar por
   `wordmark_blanco.svg` / `_negro.svg` de `Logo-Genesis-OS/marca/`.

### Contraste

Todo el texto pasa WCAG AA salvo los captions en Gris cálido (4,2:1), que es el
color que el manual asigna a captions y etiquetas. Si se quiere AA estricto en
esos 12 px, el reemplazo es `#6B6461`.

## Tipografías

Montserrat y Archivo van self-hosted como variables subseteadas a latin +
latin-ext (`public/fonts/*.woff2`): 145 KB entre las dos contra 1,37 MB de los
`.ttf` originales. Se cargan con `next/font/local`, sin pedidos a Google Fonts.

## Orden del funnel

Definido en `app/page.tsx`. El patrón es `bloque de valor → prueba → CTA`, con un
solo botón por pantalla.

1. Barra con el logotipo
2. Hero + VSL sobre negro, con halo y franja de datos
3. **Caso propio de Manu** — responde "¿esto funciona?"
4. Demo del producto por dentro
5. Oferta: seis entregables
6. **Casos de alumnos** + collage de tableros — responde "¿me va a funcionar a mí?"
7. Cierre y pie con descargo de resultados

Los dos bloques de prueba social son intercambiables: alcanza con permutar
`<FounderCase />` y `<StudentCases />` en `app/page.tsx`.

## Desktop

Optimizada a 1440 × 900: el hero entra completo en el primer scroll, incluida la
franja de datos. Verificada sin overflow horizontal a 1920, 1440, 1366 y 390.

- Contenedor de 1240 px con fondos a sangre completa.
- Los entregables van en grilla de dos columnas en vez de seis filas en zig-zag:
  la misma información en la mitad de alto (la sección pasó de 3.056 a 1.984 px).
- Las bandas de CTA llevan una línea de contexto al lado del botón, para no ser
  franjas vacías.

## Pendiente antes de publicar

- [ ] URL real del checkout en `site.cta.href`.
- [ ] Aprobar el copy marcado `BORRADOR` y completar los `PLACEHOLDER`.
- [ ] Assets reales (y pasar los `<img>` a `next/image` cuando dejen de ser SVG).
- [ ] Reemplazar el wordmark por el SVG en curvas de la carpeta de marca.
- [ ] Descargo de resultados redactado por alguien que lo valide legalmente.
- [ ] Pixel y evento de click sobre `[data-cta="primary"]`.
- [ ] Decidir si se suman precio, FAQ, garantía y urgencia.
