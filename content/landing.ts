/**
 * Contenido de la landing. Toda la página se arma desde acá: ningún componente
 * tiene copy ni rutas de assets adentro.
 *
 * Voz de marca (manual 1.3): rioplatense, de vos, directo. Frases cortas. El
 * número al frente. Los "sin" antes que los "con". Nunca grita: sin mayúsculas
 * de urgencia, sin emojis, sin signos de exclamación.
 *
 * Resaltado: envolver en *asteriscos* las palabras que van en naranja. El manual
 * (2.4) lo limita a palabras sueltas y grandes; nunca a texto corrido.
 *
 * Marcas de estado del copy:
 *   BORRADOR    — redactado a partir del manual de marca. Falta aprobación.
 *   PLACEHOLDER — falta el dato o el material real.
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

export type Dato = {
  /** Cifra: un solo dato por pieza, en blanco sobre negro o negro sobre hueso. */
  value: string;
  /** Etiqueta en Archivo, mayúsculas, gris cálido. */
  label: string;
};

export type StudentCase = {
  id: string;
  name: string;
  country: string;
  /** Contexto: punto de partida → resultado · nicho. */
  context: string;
  /** Titular del caso, con la cifra entre *asteriscos*. */
  headline: string;
  body: string;
  metric: Dato;
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
    name: "Génesis OS",
  },
  // TODO(contenido): reemplazar por el dominio definitivo cuando exista.
  url: "https://landing-vsl-funnel-v1.vercel.app",
  seo: {
    title: "Génesis OS — El mes arranca cobrado",
    description:
      "Marcas de consumibles que acumulan clientes en vez de volver a comprarlos. El modelo de suscripción aplicado sobre el producto que ya vendés.",
  },
  /** Un único CTA en toda la página: mismo texto y destino, cinco apariciones. */
  cta: {
    // TODO(contenido): URL real del checkout o del formulario de aplicación.
    label: "Quiero entrar a Génesis",
    href: "https://ejemplo.com/checkout",
  },
} as const;

/* -------------------------------------------------------------------------- */
/* 1. Hero + VSL                                                               */
/* -------------------------------------------------------------------------- */

export const hero = {
  /** H1 de dos líneas como máximo (manual 2.5). */
  title: "El mes arranca *cobrado*.",
  subtitle: "Marcas de consumibles que acumulan clientes en vez de volver a comprarlos.",
  body:
    "Génesis parte del producto que ya vendés, lo rediseña para que se cobre solo cada ciclo de reposición, y construye una base de suscriptores que aguanta el blanco y no depende de Meta.",
  video: {
    kind: "file",
    src: "",
    title: "Video de venta principal",
    duration: "12:57",
    poster: {
      src: "/placeholders/video-16x9.svg",
      alt: "PLACEHOLDER — portada del VSL: Manu explicando en el tablero",
      width: 1280,
      height: 720,
    },
  } satisfies Video,
};

/* -------------------------------------------------------------------------- */
/* 2. Prueba A — el caso propio (el testimonio más fuerte)                     */
/* -------------------------------------------------------------------------- */

export const founderCase = {
  eyebrow: "El caso propio",
  title: "El modelo lo corro en *mi propia marca*",
  /** BORRADOR — redactado con los datos de la sección 1.1 del manual. */
  body: [
    "Arranqué en Mar del Plata publicando en orgánico sobre e-commerce de consumibles. Sin pauta, sin setters y sin closers: el primer mes de Génesis facturó USD 15.000.",
    "Mientras el mercado vende “creá y escalá tu tienda”, yo opero una marca de consumibles por suscripción con 2.200 suscriptores activos y 1,28 % de churn. El modelo que enseño es el que uso.",
  ],
  datos: [
    { value: "2.200", label: "Suscriptores activos" },
    { value: "1,28 %", label: "Churn mensual" },
    { value: "USD 15.000", label: "Primer mes, sin pauta" },
  ] satisfies Dato[],
  video: {
    kind: "file",
    src: "",
    title: "El caso de Manu",
    poster: {
      src: "/placeholders/video-16x9.svg",
      alt: "PLACEHOLDER — Manu explicando el tablero de su marca",
      width: 1280,
      height: 720,
    },
  } satisfies Video,
  /** Capturas propias: tablero de suscripciones, cohortes, facturación. */
  media: [
    {
      src: "/placeholders/shot-wide-1.svg",
      alt: "PLACEHOLDER — tablero de suscripciones activas",
      width: 800,
      height: 500,
    },
    {
      src: "/placeholders/shot-wide-2.svg",
      alt: "PLACEHOLDER — cohortes y churn mensual",
      width: 800,
      height: 500,
    },
  ] satisfies Media[],
};

/* -------------------------------------------------------------------------- */
/* 3. Demo "por dentro"                                                        */
/* -------------------------------------------------------------------------- */

export const insideLook = {
  eyebrow: "Por dentro",
  title: "Cómo funciona *Génesis OS* desde adentro",
  body: "PLACEHOLDER — una línea sobre qué se ve en el recorrido: el campus, el tablero, la comunidad.",
  video: {
    kind: "file",
    src: "",
    title: "Recorrido por Génesis OS",
    poster: {
      src: "/placeholders/inside-16x9.svg",
      alt: "PLACEHOLDER — captura del programa por dentro",
      width: 1280,
      height: 720,
    },
  } satisfies Video,
};

/* -------------------------------------------------------------------------- */
/* 4. Oferta — entregables                                                     */
/* -------------------------------------------------------------------------- */

export const program = {
  eyebrow: "El programa",
  title: "Todo lo que *recibís*",
  subtitle: "PLACEHOLDER — una oración que resuma el conjunto de entregables y el acompañamiento.",
  /** Numerados y en zig-zag automático. */
  features: [
    {
      title: "Seguimiento *1:1* con Manu y el equipo",
      body: "PLACEHOLDER — el beneficio, no la feature: qué problema le saca de encima al dueño de marca.",
      media: { src: "/placeholders/feature-1.svg", alt: "PLACEHOLDER", width: 720, height: 520 },
    },
    {
      title: "Rediseño del *producto* a ciclo de reposición",
      body: "PLACEHOLDER — el beneficio, no la feature.",
      media: { src: "/placeholders/feature-2.svg", alt: "PLACEHOLDER", width: 720, height: 520 },
    },
    {
      title: "Llamadas *grupales* semanales",
      body: "PLACEHOLDER — el beneficio, no la feature.",
      media: { src: "/placeholders/feature-3.svg", alt: "PLACEHOLDER", width: 720, height: 520 },
    },
    {
      title: "El sistema de *retención* y cobro recurrente",
      body: "PLACEHOLDER — el beneficio, no la feature.",
      media: { src: "/placeholders/feature-4.svg", alt: "PLACEHOLDER", width: 720, height: 520 },
    },
    {
      title: "Proveedores, *logística* y reposición",
      body: "PLACEHOLDER — el beneficio, no la feature.",
      media: { src: "/placeholders/feature-5.svg", alt: "PLACEHOLDER", width: 720, height: 520 },
    },
    {
      title: "Comunidad de *dueños de marca*",
      body: "PLACEHOLDER — el beneficio, no la feature.",
      media: { src: "/placeholders/feature-6.svg", alt: "PLACEHOLDER", width: 720, height: 520 },
    },
  ] satisfies Feature[],
};

/* -------------------------------------------------------------------------- */
/* 5. Prueba B — alumnos                                                       */
/* -------------------------------------------------------------------------- */

export const studentCases = {
  eyebrow: "Casos reales",
  title: "Las marcas que *ya lo están corriendo*",
  subtitle: "PLACEHOLDER — una oración que conecte el caso propio con el de ellos.",
  /** Mismo esquema de campos en todos: el formato fijo los hace comparables. */
  items: [
    {
      id: "alumno-1",
      name: "Nombre Apellido",
      country: "Ciudad, País",
      context: "Compra única → suscripción · Nicho",
      headline: "De *[cifra inicial]* a *[cifra final]* en [tiempo]",
      body: "PLACEHOLDER — 3 o 4 líneas: dónde estaba trabado, qué cambió al aplicar el modelo y dónde está hoy. El número al frente.",
      metric: { value: "$00.000", label: "Facturación mensual" },
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
      country: "Ciudad, País",
      context: "Compra única → suscripción · Nicho",
      headline: "De *[cifra inicial]* a *[cifra final]* en [tiempo]",
      body: "PLACEHOLDER — 3 o 4 líneas: dónde estaba trabado, qué cambió al aplicar el modelo y dónde está hoy. El número al frente.",
      metric: { value: "000", label: "Suscriptores activos" },
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
      country: "Ciudad, País",
      context: "Compra única → suscripción · Nicho",
      headline: "De *[cifra inicial]* a *[cifra final]* en [tiempo]",
      body: "PLACEHOLDER — 3 o 4 líneas: dónde estaba trabado, qué cambió al aplicar el modelo y dónde está hoy. El número al frente.",
      metric: { value: "0,00 %", label: "Churn mensual" },
      video: {
        kind: "file",
        src: "",
        title: "Testimonio en video",
        poster: { src: "/placeholders/video-9x16.svg", alt: "PLACEHOLDER", width: 405, height: 720 },
      },
    },
  ] satisfies StudentCase[],
};

/** Capturas crudas: tableros, cohortes, mensajes. Carril analista, cero autos (manual 3.1). */
export const proofCollage = {
  eyebrow: "Sin edición",
  title: "Los tableros, como están",
  images: Array.from({ length: 8 }, (_, i) => ({
    src: `/placeholders/proof-${i + 1}.svg`,
    alt: `PLACEHOLDER — captura de tablero ${i + 1}`,
    width: 600,
    height: [420, 560, 340, 620, 400, 500, 360, 540][i],
  })) satisfies Media[],
};

/* -------------------------------------------------------------------------- */
/* 6. Pie                                                                      */
/* -------------------------------------------------------------------------- */

export const footer = {
  /** Obligatorio si se corre tráfico pago mostrando cifras de facturación. */
  disclaimer:
    "PLACEHOLDER — descargo de resultados: los casos mostrados son reales y no garantizan resultados. Dependen del producto, del mercado y del trabajo de cada marca. Esta página no está afiliada a Meta, Google ni a ninguna otra plataforma.",
  links: [
    { label: "Términos y condiciones", href: "#" },
    { label: "Política de privacidad", href: "#" },
    { label: "Contacto", href: "#" },
  ],
  usuario: "@manudomzz",
};
