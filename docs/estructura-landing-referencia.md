# Estructura de la landing de referencia (VSL funnel)

Ingeniería inversa de la landing analizada, para replicar la **estructura** (no el copy ni los
assets) en una landing propia.

## 1. Mapa de secciones (orden exacto)

| # | Sección | Función en el funnel |
|---|---------|----------------------|
| 1 | **Hero + VSL** | Promesa, autoridad, video de venta |
| 2 | **CTA #1** | Primer punto de conversión (justo bajo el video) |
| 3 | **Prueba social A — testimonios en video** | Casos con cifras verificables |
| 4 | **CTA #2** | Cierre después de la prueba |
| 5 | **Demo "por dentro"** | Video/screenshot del producto real (baja el riesgo percibido) |
| 6 | **CTA #3** | |
| 7 | **Oferta — "Todo lo que recibís"** | Desglose numerado de entregables |
| 8 | **CTA #4** | |
| 9 | **Prueba social B — collage de capturas** | Prueba cruda (DMs, dashboards, métricas) |
| 10 | **CTA #5 (final)** | Último cierre, aislado sobre fondo limpio |

Patrón clave: **bloque de valor → prueba → CTA**, repetido. El mismo botón aparece 5 veces
con el mismo texto y estilo. No hay menú de navegación, ni links salientes, ni footer con
distracciones: una sola acción posible en toda la página.

## 2. Detalle por sección

### 1. Hero + VSL
- Logo/monograma centrado, pequeño + línea divisoria corta debajo.
- **H1** en 3 líneas, tipografía display pesada, con 2–3 palabras resaltadas en color de marca:
  `Cómo [lograr X] y [escalar a MÉTRICA] (sin [objeción principal])`.
  La objeción entre paréntesis es parte del titular.
- **Subheadline** 1 oración: prueba de autoridad con número duro en negrita + a quién sirve
  ("desde cero o si ya estás vendiendo") → cubre los dos segmentos de tráfico.
- **Reproductor de video** 16:9, esquinas redondeadas, sombra suave, controles nativos visibles
  (duración a la vista: transparencia > autoplay oculto).
- Sin formulario en el hero: el único elemento interactivo es el video y el botón.

### 2/4/6/8/10. CTA repetido
Componente único reutilizado: botón sólido verde, texto en mayúsculas con tracking amplio,
flecha `→`, radio ~10px, padding horizontal generoso, centrado. Mismo label siempre
("QUIERO ACCEDER AHORA →").

### 3. Prueba social A — testimonios en video
- Eyebrow pill: `CASOS REALES` (mayúsculas, letterspacing, píldora con borde verde).
- **H2**: `Resultados de mis clientes` (última palabra resaltada).
- Tarjetas horizontales (video vertical 9:16 a la izquierda + texto a la derecha), fondo blanco,
  radio ~20px, sombra suave. Anatomía de cada tarjeta:
  1. 5 estrellas
  2. `NOMBRE — PAÍS` en mayúsculas con letterspacing
  3. Línea de contexto en gris chico: `punto de partida → resultado · nicho`
  4. **Titular del caso** con la cifra resaltada: `De $15,000/mes a $300,000 en 50 días`
  5. Párrafo de 3–4 líneas con negritas en el giro de la historia
  6. **Chip de métrica** al pie: etiqueta gris en mayúsculas + valor en verde
     (`FACTURACIÓN MENSUAL  $96,000 USD`)
- Se repite la misma tarjeta 3+ veces; el formato idéntico hace comparables los casos.

### 5. Demo "por dentro"
Un solo bloque ancho: captura/video del producto real (comunidad, dashboard) con **overlay de
play grande y circular** y título quemado en la imagen (`Cómo funciona X desde adentro`).
Sin texto alrededor — la imagen es el argumento.

### 7. Oferta — "Todo lo que recibís"
- Eyebrow pill: `EL PROGRAMA`.
- **H2** con palabra resaltada + subcopy de 1 oración.
- 6 ítems en **zig-zag alternado** (texto izq/img der → img izq/texto der → …). Cada ítem:
  - Badge circular verde con el número (1…6)
  - Título con 1–3 palabras resaltadas
  - Párrafo de 2–3 líneas (beneficio, no feature)
  - Imagen/captura del entregable real al lado (ocupa ~45% del ancho)
- Las tarjetas se solapan visualmente con el borde de la imagen (la imagen "sale" de la tarjeta).

### 9. Prueba social B — collage
Grid tipo **masonry de 3 columnas** con capturas de distinto alto (mensajes, gráficos de ventas,
paneles). Sin texto, sin lightbox: volumen como prueba. Precedido por el mismo eyebrow
`CASOS REALES` y un H2 `Más casos reales de mis clientes`.

## 3. Sistema de diseño

**Color**
- Marco de página: casi negro (`#0a0a0a`) — la landing es una columna centrada sobre fondo oscuro.
- Fondos de sección alternados: blanco puro y verde menta muy claro (degradado sutil),
  separados por hairlines horizontales de 1px.
- Acento: verde brillante (`~#3ECF4C`) para CTA, números resaltados, badges, estrellas.
- Texto: casi negro para titulares, gris medio para cuerpo.

**Tipografía**
- Titulares: sans display muy pesada y algo condensada (estilo *Anton / Druk / Archivo Black*).
- Botones y eyebrows: mayúsculas, bold, tracking amplio, tamaño chico.
- Cuerpo: sans neutra (estilo *Inter / Manrope*), 16–17px, line-height ~1.6.

**Layout**
- Contenedor centrado, máx ~1100–1200px, gutters generosos.
- Ritmo vertical amplio (~80–120px de padding por sección).
- Radios: 10px (botones), 16–20px (tarjetas e imágenes).
- Sombras suaves y difusas, nunca bordes duros en tarjetas.
- Mobile: todo colapsa a 1 columna; el zig-zag pasa a imagen-arriba/texto-abajo.

## 4. Componentes a construir (reutilizables)

```
<CtaButton>          // el único botón, repetido
<SectionLabel>       // píldora de sección
<SectionHeading>     // eyebrow + H2 con resaltado + subcopy
<VideoFrame>         // 16:9 o 9:16, fachada con click para cargar
<MetricChip>         // etiqueta + cifra
<FeatureRow>         // entregable numerado, en zig-zag
<ResultsMosaic>      // mosaico de capturas con su etiqueta de resultado
<Section>            // envoltorio con tono (blanco / hueso / negro)
```

Con estos componentes se arma la página entera: es una landing de **datos**, no de maquetación
única — el contenido vive en arrays (`results.items[]`, `program.features[]`,
`founderCase.media[]`).

## 5. Lo que la referencia NO tiene (decidir antes de construir)

- Precio / planes visibles (la venta de precio ocurre después del click).
- FAQ / objeciones.
- Garantía explícita.
- Bloque "sobre mí" / autoridad del fundador (solo aparece implícito en el VSL).
- Escasez o urgencia (deadline, cupos).
- Footer legal, disclaimers de resultados, política de privacidad — **necesario** si se corre
  tráfico pago (Meta/Google exigen disclaimer cuando se muestran cifras de ingresos).
- Tracking: pixel, eventos de click en cada CTA, % de video visto.

## 6. Checklist de réplica

- [ ] Elegir el par de fuentes (display + cuerpo) y el color de acento propio.
- [ ] Definir el H1 con la fórmula `resultado + métrica + (sin objeción)`.
- [ ] Grabar/embedir el VSL y dejar la duración visible.
- [ ] 3 testimonios con el mismo esquema de campos (contexto → titular con cifra → párrafo → chip).
- [ ] 6 entregables en zig-zag, cada uno con captura real.
- [ ] 8–12 capturas para el collage.
- [ ] Un único CTA repetido 5 veces, con el mismo destino y el mismo texto.
- [ ] Footer con disclaimer de resultados.

## 7. Adaptación aplicada en esta implementación

La referencia usa el mismo formato de tarjeta para toda su prueba social. Acá hay dos tipos
de testimonio de peso distinto, así que los dos bloques se repartieron por objeción:

| Bloque | Contenido | Objeción que responde | Formato |
|--------|-----------|-----------------------|---------|
| Prueba A (slot 3) | Caso propio del fundador | "¿esto funciona?" | Bloque propio: foto de Manu + chips de métricas + capturas de tableros |
| Prueba B (slot 9) | Casos de alumnos | "¿me va a funcionar a mí?" | Mosaico de capturas, cada una con su etiqueta de resultado |

El caso propio va arriba porque es el testimonio más fuerte y porque la autoridad tiene que
existir antes de que los casos de alumnos signifiquen algo. No usa la tarjeta repetida: es un
solo caso y la tarjeta está diseñada para comparar varios entre sí.

Implementado en `components/sections/FounderCase.tsx` y `components/sections/ResultsMosaic.tsx`.
Para invertir el orden alcanza con permutar ambos componentes en `app/page.tsx`.

## 8. Implementación

La estructura de este documento es la que está implementada. Del Manual de Marca
Génesis OS se toman únicamente la tipografía y los colores:

| Referencia | Implementación |
|---|---|
| Acento verde neón | Naranja Génesis en rellenos, Brasa en texto sobre claro |
| Display condensada + Inter | Montserrat (lo que se lee) + Archivo (lo que se mide) |
| Fondos blanco y verde menta | Blanco y Hueso |
| Marco oscuro alrededor de la columna | Negro de marca |

Lo único que cambia respecto de la estructura descrita arriba es el reparto de
la prueba social de la sección 7.
