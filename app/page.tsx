import { redirect } from "next/navigation";

/**
 * La raíz manda al flujo por defecto.
 *
 * Las dos landings del A/B viven en /formulario y /agenda, y Meta reparte
 * entre ellas. Nadie tiene que caer en una landing sin flujo asignado.
 */
export default function Raiz() {
  redirect("/formulario");
}
