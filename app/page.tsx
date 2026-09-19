import { redirect } from "next/navigation";

/**
 * La raíz entra por el repartidor, igual que los anuncios.
 *
 * Podría mandar directo a /formulario, pero entonces todo el tráfico que no
 * viene de un anuncio —el link de la bio, un mail, alguien que escribe el
 * dominio— se contaría como visita de esa variante y le inflaría el
 * denominador. El panel mostraría una conversión peor de la real para
 * formulario y el A/B quedaría sesgado por tráfico que nunca fue parte del
 * test.
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
  redirect(query ? `/ir?${query}` : "/ir");
}
