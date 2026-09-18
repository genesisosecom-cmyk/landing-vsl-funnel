/**
 * Identidad del visitante, del lado del navegador.
 *
 * Es un uuid propio en una cookie de primera parte. No identifica a la
 * persona: sirve para coser lo que pasa antes del formulario (vio la página,
 * tocó un botón, empezó a escribir) con el lead que llega después. Sin esto el
 * panel sólo podría mostrar los que completaron, que es justo la mitad
 * aburrida del embudo.
 */
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
