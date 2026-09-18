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

export type Player = {
  /** ID del reproductor en VTurb, sin el prefijo "vid-". */
  id: string;
  /** Script del player: lo entrega VTurb junto con el embed. */
  scriptSrc: string;
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
  /** El ID es público: viaja al navegador en cualquier sitio que corra el píxel. */
  tracking: {
    metaPixelId: "29155340914068656",
  },
  /** Un único CTA en toda la página: mismo texto y destino, cinco apariciones. */
  cta: {
    label: "Quiero entrar a Génesis",
    href: "/aplicar",
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
  /** El VSL, alojado en VTurb. */
  player: {
    id: "6aaca34423e48c7b7d880451",
    scriptSrc:
      "https://scripts.converteai.net/f742aa68-fd02-43e3-862f-368d962ade9f/players/6aaca34423e48c7b7d880451/v4/player.js",
  } satisfies Player,
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
    src: "/manu.jpg",
    alt: "Manu Dominguez en su estudio",
    width: 1100,
    height: 1955,
  } satisfies Media,
  /** Captura del panel de suscripciones de la marca. */
  media: {
    src: "/tablero-suscripciones.jpg",
    alt: "Panel de suscripciones: 2.256 suscripciones activas y $157.468.800 de facturación en el mes",
    width: 2080,
    height: 1128,
  } satisfies Media,
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
      title: "Seguimiento *1:1* con Manu",
      body: "Sabés operar, lo que no sabés es cuál es el próximo paso, y hasta hoy lo venías adivinando solo con la plata de tu negocio como costo del error. Acá tenés al lado a alguien que ya hizo esta migración con su propia marca: dejás de probar a ciegas y de tener miedo a romper lo que hoy te factura.",
      media: {
        src: "/placeholders/feature-1.svg",
        alt: "PLACEHOLDER — captura del seguimiento 1:1",
        width: 720,
        height: 520,
      },
    },
    {
      title: "Rediseño del *producto* a ciclo de reposición",
      body: "No cambiás de producto ni tirás lo que construiste: el mismo producto que ya vendés pasa a volver solo cuando al cliente se le termina. Dejás de empezar de cero en cada venta y de pagar adquisición por un cliente que ya era tuyo.",
      media: {
        src: "/placeholders/feature-2.svg",
        alt: "PLACEHOLDER — captura del rediseño de producto",
        width: 720,
        height: 520,
      },
    },
    {
      title: "Llamadas *1:1* semanales",
      body: "El error que hoy descubrís a fin de mes, acá lo corregís a los siete días, con tus números arriba de la mesa y no con una sensación. Dejás de perder meses enteros yendo para el lado equivocado y de quedarte trabado esperando a que alguien te conteste.",
      media: {
        src: "/placeholders/feature-3.svg",
        alt: "PLACEHOLDER — captura de una llamada semanal",
        width: 720,
        height: 520,
      },
    },
    {
      title: "El sistema de *retención* y cobro recurrente",
      body: "El 1 del mes ya tenés facturación adentro antes de gastar un peso en pauta: la pauta pasa a sumar, no a sostenerte. Y si te bajan la cuenta un martes, no se termina el negocio — los suscriptores se siguen cobrando igual.",
      media: {
        src: "/placeholders/feature-4.svg",
        alt: "PLACEHOLDER — captura del sistema de cobro recurrente",
        width: 720,
        height: 520,
      },
    },
    {
      title: "Proyecciones de *stock* y reposición",
      body: "Una base que se cobra sola no sirve de nada si el mes que viene no tenés stock para entregarla: acá la reposición se calcula sobre tus suscriptores activos, no sobre corazonadas. Te sacás de encima el quiebre de stock y la entrega tarde, que es la forma más cara de perder un cliente que ya te pagaba todos los meses.",
      media: {
        src: "/placeholders/feature-5.svg",
        alt: "PLACEHOLDER — captura de la proyección de stock",
        width: 720,
        height: 520,
      },
    },
    {
      title: "Conversión de tu *base actual*",
      body: "Los clientes que ya te compraron una vez son la primera tanda de suscriptores, y no te cuestan un peso de pauta porque ya los pagaste. Empezás a cobrar recurrencia con la gente que ya tenés, en vez de esperar a que la pauta te traiga gente nueva.",
      media: {
        src: "/placeholders/feature-6.svg",
        alt: "PLACEHOLDER — captura de la conversión de la base",
        width: 720,
        height: 520,
      },
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
/* Página de aplicación (/aplicar) — las dos variantes del A/B               */
/* -------------------------------------------------------------------------- */

/** BORRADOR — copy de la página de conversión, a aprobar. */
export const aplicar = {
  formulario: {
    nombre: "Tu nombre y apellido",
    email: "Tu email",
    telefono: "Tu WhatsApp (con código de país)",
    enviar: "Continuar",
    enviando: "Enviando…",
    error: "No pudimos enviar tus datos. Probá de nuevo en un momento.",
  },
  /** Variante A: deja los datos y agenda en el momento. */
  agenda: {
    title: "Dejá tus datos y *agendá* la llamada",
    intro:
      "Son 30 minutos con Manu para ver tu marca, tus números y si el modelo de suscripción aplica a tu producto. Si no aplica, te lo decimos en la llamada.",
    tituloAgenda: "Elegí el horario que te quede mejor",
  },
  /** Variante B: deja los datos y lo contactamos. */
  contacto: {
    title: "Dejá tus datos y *te escribimos*",
    intro:
      "Te escribimos por WhatsApp para ver tu marca, tus números y si el modelo de suscripción aplica a tu producto. Si no aplica, te lo decimos ahí.",
    graciasTitulo: "Listo, ya tenemos tus datos",
    graciasTexto:
      "Te escribimos por WhatsApp en las próximas horas al número que dejaste. Revisá que sea el correcto.",
  },
  /** El calendario vive en GoHighLevel; el slug es el de la subcuenta. */
  calendario: {
    url: "https://api.leadconnectorhq.com/widget/bookings/genesis-os-consultoria",
  },
  legal:
    "Al enviar tus datos aceptás que nos pongamos en contacto con vos por WhatsApp, teléfono o email.",
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
