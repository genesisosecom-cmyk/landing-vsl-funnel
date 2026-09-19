/**
 * Identidad del visitante, del lado del navegador.
 *
 * Es un uuid propio en una cookie de primera parte. No identifica a la
 * persona: sirve para coser lo que pasa antes del formulario (vio la página,
 * tocó un botón, empezó a escribir) con el lead que llega después. Sin esto el
 * panel sólo podría mostrar los que completaron, que es justo la mitad
 * aburrida del embudo.
 */
import { COOKIE_ATRIBUCION, leerAtribucion, type Atribucion } from "./atribucion";

export const COOKIE_VISITA = "gen_vid";
export const DIAS_DE_VIDA_VISITA = 90;

export function leerCookie(nombre: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  return document.cookie
    .split("; ")
    .find((c) => c.startsWith(`${nombre}=`))
    ?.split("=")
    .slice(1)
    .join("=");
}

export function escribirCookie(nombre: string, valor: string, dias: number): void {
  if (typeof document === "undefined") return;
  const seguro = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${nombre}=${valor}; Max-Age=${dias * 24 * 60 * 60}; Path=/; SameSite=Lax${seguro}`;
}

function nuevoId(): string {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

/** Lee el id de visita y lo crea si todavía no existe. */
export function idDeVisita(): string {
  const guardado = leerCookie(COOKIE_VISITA);
  if (guardado) return guardado;

  const id = nuevoId();
  escribirCookie(COOKIE_VISITA, id, DIAS_DE_VIDA_VISITA);
  return id;
}

/**
 * Manda un evento al panel sin bloquear nada.
 *
 * keepalive para que sobreviva si el click cambia de página: si no, el
 * cta_click se pierde justo cuando el navegador empieza a navegar.
 */
export function anotarEvento(
  tipo: string,
  datos: { flujo?: string; detalle?: Record<string, unknown> } = {},
): void {
  const cuerpo = JSON.stringify({ tipo, visitaId: idDeVisita(), ...datos });

  try {
    fetch("/api/evento", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: cuerpo,
      keepalive: true,
    }).catch(() => {});
  } catch {
    /* el tracking nunca rompe la página */
  }
}

/**
 * La atribución de esta visita, sin depender de quién corrió primero.
 *
 * `CapturaDeAtribucion` escribe la cookie en un efecto, y los componentes que
 * están más arriba en el árbol —el calendario, por ejemplo— corren su efecto
 * antes. En una visita nueva desde un anuncio eso significaba leer la cookie
 * todavía vacía y perder el origen justo en el click que lo trae.
 *
 * Así que si la cookie ya tiene algo se respeta (es first-touch y gana), y si
 * está vacía se arma con lo que hay en la URL de ahora mismo.
 */
export function atribucionDeLaVisita(): Atribucion {
  const guardada = leerAtribucion(leerCookie(COOKIE_ATRIBUCION));
  const base = Object.keys(guardada).length > 0 ? guardada : atribucionDeLaUrl();

  /*
   * _fbp y _fbc las escribe el píxel, y el píxel carga después que nosotros:
   * va con strategy="afterInteractive", así que el efecto que guarda la
   * atribución corre antes de que fbevents.js llegue a escribirlas. En una
   * visita nueva eso hacía que _fbp no entrara nunca a la cookie de primera
   * visita, y como es first-touch tampoco se corregía después.
   *
   * Por eso se releen acá, al momento de mandar: no son datos de origen que
   * haya que congelar, son identificadores de este navegador, y el valor
   * bueno es el de ahora. _fbp es de las mejores señales de coincidencia que
   * tiene Meta, así que perderla sale caro.
   */
  const fbp = leerCookie("_fbp");
  const fbc = leerCookie("_fbc");

  return { ...base, fbp: fbp ?? base.fbp, fbc: fbc ?? base.fbc };
}

/** Lo que se puede leer de la URL y de las cookies del píxel en esta carga. */
export function atribucionDeLaUrl(): Atribucion {
  if (typeof window === "undefined") return {};

  const parametros = new URLSearchParams(window.location.search);
  const fbclid = parametros.get("fbclid") ?? undefined;

  return {
    utmSource: parametros.get("utm_source") ?? undefined,
    utmMedium: parametros.get("utm_medium") ?? undefined,
    utmCampaign: parametros.get("utm_campaign") ?? undefined,
    utmContent: parametros.get("utm_content") ?? undefined,
    utmTerm: parametros.get("utm_term") ?? undefined,
    fbclid,
    fbp: leerCookie("_fbp"),
    // _fbc la arma el píxel a partir del fbclid, pero puede tardar: si no está
    // todavía, la construimos con el formato que espera Meta.
    fbc: leerCookie("_fbc") ?? (fbclid ? `fb.1.${Date.now()}.${fbclid}` : undefined),
    referrer: document.referrer || undefined,
    landing: window.location.pathname,
    desde: new Date().toISOString(),
  };
}
