/**
 * Contenido de la landing. Toda la página se arma desde acá:
 * ningún componente tiene copy ni rutas de assets hardcodeadas.
 *
 * Convención de resaltado: envolver en *asteriscos* las palabras que deben ir
 * en el color de acento dentro de un titular. Ej: "escalar a *$100k/mes*".
 *
 * TODO(contenido): todo lo marcado como PLACEHOLDER debe reemplazarse.
 */

export type Media = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Video = {
  /** "file" = mp4 propio · "embed" = YouTube/Vimeo/Loom (se carga recién al hacer click). */
  kind: "file" | "embed";
  /** Vacío = placeholder; el reproductor avisa que falta el video. */
  src: string;
  poster: Media;
  title: string;
  duration?: string;
};

export type Stat = {
  value: string;
  label: string;
};

export type StudentCase = {
  id: string;
  name: string;
  country: string;
  /** Línea de contexto: punto de partida → resultado · nicho. */
  context: string;
  /** Titular del caso, con la cifra entre *asteriscos*. */
  headline: string;
  body: string;
  metric: { label: string; value: string };
  video: Video;
};

export type Feature = {
  title: string;
  body: string;
  media: Media;
};

/* -------------------------------------------------------------------------- */
/* Marca y CTA                                                                 */
/* -------------------------------------------------------------------------- */

export const site = {
  brand: {
    name: "NOMBRE DE MARCA",
    logo: {
      src: "/placeholders/logo.svg",
      alt: "Logo PLACEHOLDER",
      width: 96,
      height: 48,
    } satisfies Media,
    tagline: "BAJADA DE LA MARCA",
  },
  seo: {
    title: "PLACEHOLDER — Titular de la landing",
    description: "PLACEHOLDER — descripción de 150 caracteres para buscadores y previews.",
  },
  /** Un único CTA en toda la página: mismo texto, mismo destino, 5 apariciones. */
  cta: {
    label: "Quiero acceder ahora",
    // TODO(contenido): URL real del checkout o del formulario de aplicación.
    href: "https://ejemplo.com/checkout",
  },
} as const;

/* -------------------------------------------------------------------------- */
/* 1. Hero + VSL                                                               */
/* -------------------------------------------------------------------------- */

export const hero = {
  /** Fórmula: resultado + *métrica* + (sin la objeción principal). */
  title: 'Cómo [lograr el resultado] y escalar a *[métrica]* (sin [objeción principal]).',
  subtitle:
    "PLACEHOLDER — una oración con la prueba de autoridad en número duro y a quién le sirve, tanto si empieza de cero como si ya está vendiendo.",
  video: {
    kind: "file",
    src: "",
    title: "Video de venta principal",
    duration: "12:57",
    poster: {
      src: "/placeholders/video-16x9.svg",
      alt: "PLACEHOLDER — portada del VSL",
      width: 1280,
      height: 720,
    },
  } satisfies Video,
};

/* -------------------------------------------------------------------------- */
/* 2. Prueba A — el caso del fundador (el testimonio más fuerte)               */
/* -------------------------------------------------------------------------- */

export const founderCase = {
  label: "Mi propio caso",
  title: "De *[punto de partida]* a *[resultado]*",
  intro:
    "PLACEHOLDER — 2 o 3 oraciones en primera persona: de dónde arrancó, qué cambió y en cuánto tiempo. Es la respuesta a “¿esto de verdad funciona?”, así que va antes que cualquier testimonio de alumnos.",
  /** Franja de métricas propias: 3 o 4, nunca más. */
  stats: [
    { value: "+$0.0M", label: "Facturado" },
    { value: "0", label: "Marcas propias" },
    { value: "0 meses", label: "Para el primer $100k" },
  ] satisfies Stat[],
  video: {
    kind: "file",
    src: "",
    title: "Caso del fundador",
    poster: {
      src: "/placeholders/video-16x9.svg",
      alt: "PLACEHOLDER — video del caso propio",
      width: 1280,
      height: 720,
    },
  } satisfies Video,
  /** Capturas propias: dashboards, facturación, marcas. */
  media: [
    { src: "/placeholders/shot-wide-1.svg", alt: "PLACEHOLDER — dashboard de ventas", width: 800, height: 500 },
    { src: "/placeholders/shot-wide-2.svg", alt: "PLACEHOLDER — facturación mensual", width: 800, height: 500 },
  ] satisfies Media[],
};

/* -------------------------------------------------------------------------- */
/* 3. Demo "por dentro"                                                        */
/* -------------------------------------------------------------------------- */

export const insideLook = {
  title: "Cómo funciona *[producto]* desde adentro",
  video: {
    kind: "file",
    src: "",
    title: "Recorrido por el producto",
    poster: {
      src: "/placeholders/inside-16x9.svg",
      alt: "PLACEHOLDER — captura del producto por dentro",
      width: 1280,
      height: 720,
    },
  } satisfies Video,
};

/* -------------------------------------------------------------------------- */
/* 4. Oferta — entregables                                                     */
/* -------------------------------------------------------------------------- */

export const program = {
  label: "El programa",
  title: "Todo lo que *recibís*",
  subtitle: "PLACEHOLDER — una oración que resuma el conjunto de entregables y el acompañamiento.",
  /** Se muestran numerados y en zig-zag automático. 6 es el número de la referencia. */
  features: [
    {
      title: "Seguimiento *1:1* con el equipo",
      body: "PLACEHOLDER — describir el beneficio, no la feature: qué problema le saca de encima.",
      media: { src: "/placeholders/feature-1.svg", alt: "PLACEHOLDER", width: 720, height: 520 },
    },
    {
      title: "Llamadas *1:1*",
      body: "PLACEHOLDER — describir el beneficio, no la feature.",
      media: { src: "/placeholders/feature-2.svg", alt: "PLACEHOLDER", width: 720, height: 520 },
    },
    {
      title: "Llamadas *grupales* semanales",
      body: "PLACEHOLDER — describir el beneficio, no la feature.",
      media: { src: "/placeholders/feature-3.svg", alt: "PLACEHOLDER", width: 720, height: 520 },
    },
    {
      title: "Más de *15 horas* de contenido grabado",
      body: "PLACEHOLDER — describir el beneficio, no la feature.",
      media: { src: "/placeholders/feature-4.svg", alt: "PLACEHOLDER", width: 720, height: 520 },
    },
    {
      title: "Sistemas, recursos y *conexiones*",
      body: "PLACEHOLDER — describir el beneficio, no la feature.",
      media: { src: "/placeholders/feature-5.svg", alt: "PLACEHOLDER", width: 720, height: 520 },
    },
    {
      title: "Chat de *comunidad*",
      body: "PLACEHOLDER — describir el beneficio, no la feature.",
      media: { src: "/placeholders/feature-6.svg", alt: "PLACEHOLDER", width: 720, height: 520 },
    },
  ] satisfies Feature[],
};

/* -------------------------------------------------------------------------- */
/* 5. Prueba B — alumnos                                                       */
/* -------------------------------------------------------------------------- */

export const studentCases = {
  label: "Casos reales",
  title: "Resultados de mis *alumnos*",
  subtitle: "PLACEHOLDER — una oración que conecte el caso propio con el de ellos.",
  /** Mismo esquema de campos en todos: los hace comparables entre sí. */
  items: [
    {
      id: "alumno-1",
      name: "Nombre Apellido",
      country: "País",
      context: "Punto de partida → resultado · Nicho",
      headline: "De *[cifra inicial]* a *[cifra final]* en [tiempo]",
      body: "PLACEHOLDER — 3 o 4 líneas: dónde estaba trabado, qué cambió al aplicar el método y dónde está hoy.",
      metric: { label: "Facturación mensual", value: "$00,000 USD" },
      video: {
        kind: "file",
        src: "",
        title: "Testimonio en video",
        poster: { src: "/placeholders/video-9x16.svg", alt: "PLACEHOLDER", width: 405, height: 720 },
      },
    },
    {
      id: "alumno-2",
      name: "Nombre Apellido",
      country: "País",
      context: "Punto de partida → resultado · Nicho",
      headline: "De *[cifra inicial]* a *[cifra final]* en [tiempo]",
      body: "PLACEHOLDER — 3 o 4 líneas: dónde estaba trabado, qué cambió al aplicar el método y dónde está hoy.",
      metric: { label: "Ventas en 60 días", value: "$000,000 USD" },
      video: {
        kind: "file",
        src: "",
        title: "Testimonio en video",
        poster: { src: "/placeholders/video-9x16.svg", alt: "PLACEHOLDER", width: 405, height: 720 },
      },
    },
    {
      id: "alumno-3",
      name: "Nombre Apellido",
      country: "País",
      context: "Punto de partida → resultado · Nicho",
      headline: "De *[cifra inicial]* a *[cifra final]* en [tiempo]",
      body: "PLACEHOLDER — 3 o 4 líneas: dónde estaba trabado, qué cambió al aplicar el método y dónde está hoy.",
      metric: { label: "Profit mensual", value: "$00,000 USD" },
      video: {
        kind: "file",
        src: "",
        title: "Testimonio en video",
        poster: { src: "/placeholders/video-9x16.svg", alt: "PLACEHOLDER", width: 405, height: 720 },
      },
    },
  ] satisfies StudentCase[],
};

/** Capturas crudas de alumnos: mensajes, paneles, gráficos. 8–12 funciona bien. */
export const proofCollage = {
  label: "Casos reales",
  title: "Más resultados de *alumnos*",
  images: Array.from({ length: 9 }, (_, i) => ({
    src: `/placeholders/proof-${i + 1}.svg`,
    alt: `PLACEHOLDER — captura de resultado ${i + 1}`,
    width: 600,
    height: [420, 560, 340, 620, 400, 500, 360, 540, 460][i],
  })) satisfies Media[],
};

/* -------------------------------------------------------------------------- */
/* 6. Pie                                                                      */
/* -------------------------------------------------------------------------- */

export const footer = {
  /** Obligatorio si se corre tráfico pago mostrando cifras de facturación. */
  disclaimer:
    "PLACEHOLDER — descargo de resultados: los casos mostrados son reales pero no garantizan resultados. Los resultados dependen del esfuerzo, la experiencia previa y el mercado. Esta página no está afiliada a Meta, Google ni a ninguna otra plataforma.",
  links: [
    { label: "Términos y condiciones", href: "#" },
    { label: "Política de privacidad", href: "#" },
    { label: "Contacto", href: "#" },
  ],
};
