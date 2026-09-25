import { aplicar } from "@/content/landing";

/**
 * Si el lead alimenta al píxel de Meta.
 *
 * Meta optimiza buscando más gente parecida a la que disparó el evento de
 * conversión. Mandarle un Lead por cada persona que completa el formulario le
 * enseña a traer más gente como el promedio de los que completan — y el
 * promedio, acá, factura por debajo del piso del programa.
 *
 * Así que el Lead se reserva para los que declaran facturación de 30M para
 * arriba. El resto entra igual a GoHighLevel y al panel: el lead existe y se
 * contacta, sólo que no le enseña nada al algoritmo.
 *
 * Sin respuesta no califica. Es el caso del flujo de agenda, donde la
 * pregunta la hace el formulario del calendario de GHL y puede no llegar:
 * ante la duda, no alimentar. Una señal de más es peor que una de menos.
 */
export function esLeadCalificado(facturacion: string | undefined | null): boolean {
  if (!facturacion) return false;

  const califican: readonly string[] = aplicar.formulario.facturacion.califican;
  return califican.includes(facturacion.trim());
}
