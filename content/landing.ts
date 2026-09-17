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
  title:
    "Cómo escalar tu marca de consumibles a *+$100M al mes* convirtiéndola a modelo de suscripción. Sin depender del CPA ni de más pauta.",
  body:
    "El mismo método que usé para superar +$3M USD con mis marcas, explicado para que lo puedas ejecutar si ya estás vendiendo un consumible.",
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
  eyebrow: "Mi caso",
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
  /**
   * Foto principal: carril analista (manual 3.1) — Manu explicando, con el
   * tablero al lado y el producto real sobre la mesa. Nunca autos ni fajos.
   */
  photo: {
    src: "/placeholders/foto-manu.svg",
    alt: "PLACEHOLDER — foto de Manu explicando el tablero",
    width: 900,
    height: 1100,
  } satisfies Media,
  /** Capturas propias: tableros, cohortes, facturación, suscriptores. */
  media: [
    { src: "/placeholders/caso-1.svg", alt: "PLACEHOLDER — tablero de suscripciones", width: 800, height: 500 },
    { src: "/placeholders/caso-2.svg", alt: "PLACEHOLDER — cohortes y churn", width: 800, height: 500 },
    { src: "/placeholders/caso-3.svg", alt: "PLACEHOLDER — facturación mensual", width: 800, height: 500 },
    { src: "/placeholders/caso-4.svg", alt: "PLACEHOLDER — suscriptores activos", width: 800, height: 500 },
  ] satisfies Media[],
};

/* -------------------------------------------------------------------------- */
/* 3. Demo "por dentro"                                                        */
/* -------------------------------------------------------------------------- */

export const insideLook = {
  eyebrow: "Por dentro",
  title: "Cómo funciona *Génesis OS* desde adentro",
  /** La primera va destacada a lo ancho; las otras en grilla. */
  media: [
    { src: "/placeholders/dentro-1.svg", alt: "PLACEHOLDER — el campus por dentro", width: 1280, height: 720 },
    { src: "/placeholders/dentro-2.svg", alt: "PLACEHOLDER — la comunidad", width: 800, height: 600 },
    { src: "/placeholders/dentro-3.svg", alt: "PLACEHOLDER — el tablero del alumno", width: 800, height: 600 },
    { src: "/placeholders/dentro-4.svg", alt: "PLACEHOLDER — las llamadas grabadas", width: 800, height: 600 },
  ] satisfies Media[],
};

/* -------------------------------------------------------------------------- */
/* 4. Oferta — entregables                                                     */
/* -------------------------------------------------------------------------- */

export const program = {
  eyebrow: "El programa",
  title: "Todo lo que *recibís*",
  subtitle:
    "Todo lo que te doy y aplico por vos para que puedas convertir tu marca de consumibles en modelo de suscripción, 100 % uno a uno conmigo.",
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

/**
 * Prueba social B — los resultados de los alumnos, todos juntos.
 *
 * Son capturas sin editar con su etiqueta de resultado: el argumento es el
 * volumen, no el detalle de cada una. Reemplaza a la vez las tarjetas de
 * testimonio y el collage que la referencia tenía separados.
 */
/**
 * Prueba social B — los resultados de los alumnos, todos juntos.
 *
 * Capturas sin editar y sin texto encima: el argumento es el volumen, no el
 * detalle de cada una. Reemplaza a la vez las tarjetas de testimonio y el
 * collage que la referencia tenía separados.
 */
export const results = {
  eyebrow: "Marcas",
  title: "Más casos de mis *clientes*",
  items: [
    {
      src: "/placeholders/resultado-1.svg",
      alt: "PLACEHOLDER — captura del resultado 1",
      width: 520,
      height: 520,
    },
    {
      src: "/placeholders/resultado-2.svg",
      alt: "PLACEHOLDER — captura del resultado 2",
      width: 520,
      height: 380,
    },
    {
      src: "/placeholders/resultado-3.svg",
      alt: "PLACEHOLDER — captura del resultado 3",
      width: 520,
      height: 640,
    },
    {
      src: "/placeholders/resultado-4.svg",
      alt: "PLACEHOLDER — captura del resultado 4",
      width: 520,
      height: 300,
    },
    {
      src: "/placeholders/resultado-5.svg",
      alt: "PLACEHOLDER — captura del resultado 5",
      width: 520,
      height: 460,
    },
    {
      src: "/placeholders/resultado-6.svg",
      alt: "PLACEHOLDER — captura del resultado 6",
      width: 520,
      height: 560,
    },
    {
      src: "/placeholders/resultado-7.svg",
      alt: "PLACEHOLDER — captura del resultado 7",
      width: 520,
      height: 340,
    },
    {
      src: "/placeholders/resultado-8.svg",
      alt: "PLACEHOLDER — captura del resultado 8",
      width: 520,
      height: 600,
    },
    {
      src: "/placeholders/resultado-9.svg",
      alt: "PLACEHOLDER — captura del resultado 9",
      width: 520,
      height: 420,
    },
    {
      src: "/placeholders/resultado-10.svg",
      alt: "PLACEHOLDER — captura del resultado 10",
      width: 520,
      height: 480,
    },
    {
      src: "/placeholders/resultado-11.svg",
      alt: "PLACEHOLDER — captura del resultado 11",
      width: 520,
      height: 360,
    },
    {
      src: "/placeholders/resultado-12.svg",
      alt: "PLACEHOLDER — captura del resultado 12",
      width: 520,
      height: 540,
    },
    {
      src: "/placeholders/resultado-13.svg",
      alt: "PLACEHOLDER — captura del resultado 13",
      width: 520,
      height: 400,
    },
    {
      src: "/placeholders/resultado-14.svg",
      alt: "PLACEHOLDER — captura del resultado 14",
      width: 520,
      height: 620,
    },
  ] satisfies Media[],
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
