import { redirect } from "next/navigation";

/**
 * La raíz manda al flujo por defecto, arrastrando la query.
 *
 * Las dos landings del A/B viven en /formulario y /agenda, y Meta reparte
 * entre ellas. Nadie tiene que caer en una landing sin flujo asignado.
 *
 * Los parámetros se copian a propósito: un redirect pelado los tira, y quien
 * llegue a la raíz con utm_source o fbclid —un link de la bio, un mail, un
 * anuncio mal cargado— perdería el origen antes de que la landing alcance a
 * leerlo.
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
