# Landing VSL

Landing de funnel VSL en Next.js (App Router) + Tailwind. Estructura basada en el
análisis de `docs/estructura-landing-referencia.md`; el contenido es todo placeholder.

## Correr

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build de producción
```

## Cómo se edita

**Todo el contenido vive en `content/landing.ts`.** Los componentes no tienen copy ni
rutas de assets adentro: para cambiar la página se edita ese archivo y nada más.

- Palabras en verde dentro de un titular: envolverlas en `*asteriscos*`.
- Imágenes y videos: reemplazar las rutas `/placeholders/*.svg` por assets reales en `public/`.
- Videos: `kind: "file"` para un mp4 propio, `kind: "embed"` para YouTube/Vimeo/Loom.
  Mientras `src` esté vacío, el reproductor muestra el cartel "Falta el video".
- Marca: el verde y las dos fuentes están en `tailwind.config.ts` y `app/layout.tsx`.

## Orden del funnel

Definido en `app/page.tsx`. El patrón es `bloque de valor → prueba → CTA`, con el mismo
botón repetido 5 veces.

1. Hero + VSL
2. **Caso propio del fundador** — responde "¿esto funciona?"
3. Demo del producto por dentro
4. Oferta: entregables numerados en zig-zag
5. **Casos de alumnos** + collage de capturas — responde "¿me va a funcionar a mí?"
6. Pie con descargo de resultados

Los dos bloques de prueba social están separados a propósito y son intercambiables:
alcanza con permutar `<FounderCase />` y `<StudentCases />` en `app/page.tsx`.

## Pendiente antes de publicar

- [ ] URL real del checkout en `site.cta.href`.
- [ ] Reemplazar todos los `PLACEHOLDER` de `content/landing.ts`.
- [ ] Assets reales (y pasar los `<img>` a `next/image` cuando dejen de ser SVG).
- [ ] Descargo de resultados redactado por alguien que lo valide legalmente.
- [ ] Pixel y evento de click sobre `[data-cta="primary"]`.
- [ ] Decidir si se suman precio, FAQ, garantía y urgencia (la referencia no los tiene).
