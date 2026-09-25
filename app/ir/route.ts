import { NextResponse } from "next/server";

/**
 * La puerta de entrada de los anuncios.
 *
 * Acá vivía el repartidor del A/B entre `/formulario` y `/agenda`. El test se
 * cerró a favor del formulario propio, así que hoy esto es un redirect y nada
 * más. Sigue existiendo porque todos los anuncios publicados apuntan a esta
 * URL: cambiarla en Meta es trabajo manual sobre pauta corriendo, y no gana
 * nada. Un anuncio nuevo puede apuntar directo a /formulario.
 *
 * Lo que no es opcional: los parámetros pasan enteros al destino. Si se pierde
 * `fbclid` en el salto, el píxel no puede armar la cookie _fbc y el lead queda
 * sin anuncio. (_fbp y _fbc no viajan en la URL: son cookies nuestras del mismo
 * dominio, así que el redirect no las toca.)
 *
 * Y sigue siendo 307 sin caché: un 301 lo guardan el navegador y el CDN, y si
 * algún día hay que volver a repartir desde acá, el redirect viejo queda
 * clavado en máquinas que no controlamos.
 */

export const dynamic = "force-dynamic";

export async function GET(pedido: Request) {
  const url = new URL(pedido.url);

  // `?v=` era para forzar una variante a mano. Ya no hay variantes; se limpia
  // para que no quede colgado en la URL de la landing.
  url.searchParams.delete("v");

  const destino = new URL("/formulario", url.origin);
  destino.search = url.searchParams.toString();

  const respuesta = NextResponse.redirect(destino, 307);

  respuesta.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
  respuesta.headers.set("X-Robots-Tag", "noindex, nofollow");

  return respuesta;
}
