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
    "Cómo escalar tu marca de consumibles a *+$100M al mes* convirtiéndola a modelo de suscripción.",
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
    "Arranqué en Mar del Plata publicando en orgánico sobre e-commerce de consumibles. Sin pauta, sin setters y sin closers: el primer mes de Génesis facturó $150.000.000.",
    "Mientras el mercado vende “creá y escalá tu tienda”, yo opero una marca de consumibles por suscripción con 2.256 suscriptores activos y 1,28 % de churn. El modelo que enseño es el que uso.",
  ],
  datos: [
    { value: "2.256", label: "Suscriptores activos" },
    { value: "1,28 %", label: "Churn mensual" },
    { value: "$150.000.000", label: "Primer mes, sin pauta" },
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
 * Capturas sin editar y sin texto encima: el argumento es el volumen, no el
 * detalle de cada una. Los archivos viven en public/resultados/; para sumar
 * una captura alcanza con dejarla ahí y agregarla a este array.
 */
export const results = {
  eyebrow: "Marcas",
  title: "Más casos de mis *clientes*",
  /**
   * El tablero mensual va destacado a lo ancho: tiene doce métricas y dentro de
   * una columna del mosaico no se lee ninguna.
   */
  featured: {
    src: "/resultados/prueba-social-4.jpg",
    alt: "Tablero mensual: $271,5 M de facturación, $92,7 M de ganancia y 34,14 % de margen",
    width: 1468,
    height: 680,
  } satisfies Media,
  items: [
    {
      src: "/resultados/prueba-social-1.jpg",
      alt: "Tablero de tienda: 15 órdenes, $1,2 M de facturación y $229,6 K de ganancia",
      width: 1238,
      height: 807,
    },
    {
      src: "/resultados/prueba-social-2.jpg",
      alt: "Ventas en vivo: $1,5 M totales y 23 pedidos en el día",
      width: 1188,
      height: 841,
    },
    {
      src: "/resultados/prueba-social-3.jpg",
      alt: "Ventas de siete días: $50,4 M totales y 900 pedidos",
      width: 1183,
      height: 844,
    },
    {
      src: "/resultados/prueba-social-5.jpg",
      alt: "Ventas en vivo: $1,9 M totales, 23 pedidos y 31 visitantes",
      width: 1180,
      height: 846,
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
