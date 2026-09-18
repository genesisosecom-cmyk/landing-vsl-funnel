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

/** Los dos flujos del A/B. Cada uno es una URL distinta y Meta reparte entre ellas. */
export const FLUJOS = ["formulario", "agenda"] as const;
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
