/**
 * Atribución: de qué anuncio vino cada lead.
 *
 * Se captura en la primera visita y se guarda en una cookie propia, no en
 * sessionStorage: el lead pasa por el formulario y por el calendario de GHL, y
 * sin cookie el origen se pierde en el camino. Es first-touch — la primera
 * visita gana, porque es la que pagó el anuncio.
 */

export const COOKIE_ATRIBUCION = "gen_atr";
export const DIAS_DE_VIDA = 90;

/**
 * Los dos flujos del A/B. El reparto lo hace /ir, no Meta: todos los anuncios
 * apuntan a la misma URL y nosotros decidimos quién ve cuál.
 */
export const FLUJOS = ["formulario", "agenda"] as const;

/**
 * La variante asignada, para que el mismo visitante vea siempre la misma.
 *
 * Sin esto alguien que vuelve por un segundo click cae en la otra landing y
 * las dos columnas del panel dejan de medir lo que dicen medir.
 */
export const COOKIE_VARIANTE = "gen_var";
export type Flujo = (typeof FLUJOS)[number];

export function esFlujo(valor: string | undefined): valor is Flujo {
  return FLUJOS.includes(valor as Flujo);
}

export type Atribucion = {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  /** Click id de Meta: es lo que permite el match exacto con el anuncio. */
  fbclid?: string;
  /** Cookies del píxel; la Conversions API las necesita para atribuir. */
  fbp?: string;
  fbc?: string;
  referrer?: string;
  landing?: string;
  /** ISO de la primera visita. */
  desde?: string;
};

/** La cookie guarda JSON; si viene corrupta se ignora en vez de romper el envío. */
export function leerAtribucion(crudo: string | undefined): Atribucion {
  if (!crudo) return {};
  try {
    const dato = JSON.parse(decodeURIComponent(crudo));
    return typeof dato === "object" && dato !== null ? (dato as Atribucion) : {};
  } catch {
    return {};
  }
}

export function serializarAtribucion(atribucion: Atribucion): string {
  return encodeURIComponent(JSON.stringify(atribucion));
}

/**
 * Deshace el doble encodeado que llega en algunos clicks de Meta.
 *
 * El nombre del anuncio viaja en la URL encodeado por Meta, y hay navegaciones
 * —las del scraper de Facebook, y algunos clicks desde la app— donde llega
 * encodeado dos veces. El navegador decodifica una sola vez, así que lo que
 * queda guardado es `DOLOR+3+%7C+MARGEN` en lugar de `DOLOR 3 | MARGEN`, y el
 * panel ve dos creativos distintos donde hay uno solo.
 *
 * Se toca sólo lo que evidentemente quedó a medio decodificar: si el valor ya
 * trae espacios y nada que parezca un escape, se deja como está.
 */
export function normalizarUtm(valor: string | undefined): string | undefined {
  if (!valor) return valor;

  const aMedias = /%[0-9A-Fa-f]{2}/.test(valor) || (!valor.includes(" ") && valor.includes("+"));
  if (!aMedias) return valor;

  try {
    return decodeURIComponent(valor.replace(/\+/g, " ")) || valor;
  } catch {
    // Un % suelto —una campaña "50% OFF"— rompe decodeURIComponent: se deja.
    return valor;
  }
}

/**
 * Limpia una atribución que llegó de afuera.
 *
 * El cuerpo lo manda el navegador, así que sólo se copian las claves que
 * conocemos y se recorta el largo: nadie escribe una campaña de 500 caracteres
 * salvo para romper algo.
 */
export function atribucionSegura(crudo: unknown): Atribucion {
  const a = (typeof crudo === "object" && crudo !== null ? crudo : {}) as Record<string, unknown>;
  const texto = (valor: unknown): string | undefined => {
    if (typeof valor !== "string") return undefined;
    const limpio = valor.trim().slice(0, 200);
    return limpio || undefined;
  };

  return {
    utmSource: normalizarUtm(texto(a.utmSource)),
    utmMedium: normalizarUtm(texto(a.utmMedium)),
    utmCampaign: normalizarUtm(texto(a.utmCampaign)),
    utmContent: normalizarUtm(texto(a.utmContent)),
    utmTerm: normalizarUtm(texto(a.utmTerm)),
    fbclid: texto(a.fbclid),
    fbp: texto(a.fbp),
    fbc: texto(a.fbc),
    referrer: texto(a.referrer),
    landing: texto(a.landing),
    desde: texto(a.desde),
  };
}

/**
 * Combina dos atribuciones. Lo que venga en `encima` pisa, y los huecos los
 * tapa `base`.
 *
 * Se usa en el flujo de agenda: nuestra cookie es de primera mano y trae las
 * cookies del píxel, así que gana; lo que GHL haya guardado sirve para
 * completar lo que falte.
 */
export function fusionarAtribucion(base: Atribucion, encima: Atribucion): Atribucion {
  const salida: Atribucion = { ...base };

  for (const [clave, valor] of Object.entries(encima)) {
    if (valor) salida[clave as keyof Atribucion] = valor;
  }

  return salida;
}
