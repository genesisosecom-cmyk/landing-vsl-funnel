/**
 * Qué páginas entran a la medición.
 *
 * El panel vive en el mismo dominio que la landing, así que cada vez que se
 * abría /tracking se anotaba una visita y se mandaba un PageView al píxel:
 * cuarenta visitas nuestras mezcladas con las de la pauta, y la propia
 * herramienta de medir contaminando lo medido.
 */
const FUERA_DE_LA_MEDICION = ["/tracking"];

export function seMide(ruta: string): boolean {
  return !FUERA_DE_LA_MEDICION.some((p) => ruta === p || ruta.startsWith(`${p}/`));
}
