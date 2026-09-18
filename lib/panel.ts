import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Acceso al panel de tracking.
 *
 * Una contraseña y una cookie firmada, nada más: el panel es para el equipo,
 * no hay usuarios ni roles que administrar. La cookie no guarda la contraseña
 * sino un HMAC, así que leerla no sirve para entrar a otro lado, y la
 * comparación es en tiempo constante para no filtrar el valor a fuerza de
 * medir respuestas.
 */
export const COOKIE_PANEL = "gen_panel";
export const DIAS_DE_SESION = 30;

function firma(clave: string): string {
  return createHmac("sha256", clave).update("panel-genesis").digest("hex");
}

/** El valor que va en la cookie cuando la contraseña es correcta. */
export function valorDeSesion(): string | null {
  const clave = process.env.TRACKING_PASSWORD;
  return clave ? firma(clave) : null;
}

export function claveCorrecta(intento: string): boolean {
  const clave = process.env.TRACKING_PASSWORD;
  if (!clave) return false;

  const a = Buffer.from(firma(intento));
  const b = Buffer.from(firma(clave));
  return a.length === b.length && timingSafeEqual(a, b);
}

export function sesionValida(cookie: string | undefined): boolean {
  const esperado = valorDeSesion();
  if (!esperado || !cookie) return false;

  const a = Buffer.from(cookie);
  const b = Buffer.from(esperado);
  return a.length === b.length && timingSafeEqual(a, b);
}
