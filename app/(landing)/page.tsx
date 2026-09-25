import { redirect } from "next/navigation";

/**
 * La raíz manda a la landing.
 *
 * Antes pasaba por `/ir` para no sesgar el A/B: el tráfico que no venía de un
 * anuncio —el link de la bio, un mail, alguien que escribe el dominio— tenía
 * que repartirse igual que el pago. Sin A/B ese motivo desapareció y el salto
 * de más sólo costaba tiempo.
 *
 * Los parámetros se copian a propósito: un redirect pelado los tira, y quien
 * llegue con utm_source o fbclid perdería el origen antes de que la landing
 * alcance a leerlo.
 */
export default async function Raiz({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const parametros = new URLSearchParams();

  for (const [clave, valor] of Object.entries(await searchParams)) {
    for (const v of Array.isArray(valor) ? valor : [valor]) {
      if (v !== undefined) parametros.append(clave, v);
    }
  }

  const query = parametros.toString();
  redirect(query ? `/formulario?${query}` : "/formulario");
}
