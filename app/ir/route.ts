import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { COOKIE_VARIANTE, DIAS_DE_VIDA, esFlujo, type Flujo } from "@/lib/atribucion";

/**
 * El repartidor del A/B.
 *
 * Todos los anuncios apuntan acá y desde acá se decide qué landing ve cada
 * visitante. La ventaja sobre repartir desde Meta es que el reparto es
 * nuestro: 50/50 de verdad, sin que el algoritmo le dé más presupuesto a la
 * variante que arranca mejor y arruine la comparación a los tres días. Y para
 * matar una variante no hay que tocar un solo anuncio.
 *
 * Tres cosas que no son opcionales acá:
 *
 * 1. Los parámetros pasan enteros al destino. Si se pierde `fbclid` en el
 *    salto, el píxel no puede armar la cookie _fbc y el lead queda sin
 *    anuncio. (_fbp y _fbc no viajan en la URL: son cookies nuestras del
 *    mismo dominio, así que el redirect no las toca.)
 *
 * 2. El redirect es 307 y sin caché. Un 301 lo cachea el navegador y el CDN,
 *    y a partir de ahí esa persona —o peor, todas— quedan clavadas en una
 *    variante para siempre.
 *
 * 3. La variante se guarda en cookie. El que vuelve tiene que ver la misma
 *    landing que la primera vez.
 */

export const dynamic = "force-dynamic";

/** Porcentaje que va a /formulario. El resto va a /agenda. */
function pesoFormulario(): number {
  const crudo = Number(process.env.REPARTO_FORMULARIO);
  if (!Number.isFinite(crudo)) return 50;
  return Math.min(100, Math.max(0, crudo));
}

function sortear(): Flujo {
  return Math.random() * 100 < pesoFormulario() ? "formulario" : "agenda";
}

export async function GET(pedido: Request) {
  const url = new URL(pedido.url);

  // ?v=agenda fuerza una variante, para poder probar las dos a mano.
  const forzado = url.searchParams.get("v") ?? undefined;
  url.searchParams.delete("v");

  const guardada = (await cookies()).get(COOKIE_VARIANTE)?.value;

  const flujo: Flujo = esFlujo(forzado)
    ? forzado
    : esFlujo(guardada)
      ? guardada
      : sortear();

  const destino = new URL(`/${flujo}`, url.origin);
  destino.search = url.searchParams.toString();

  const respuesta = NextResponse.redirect(destino, 307);

  respuesta.cookies.set(COOKIE_VARIANTE, flujo, {
    path: "/",
    maxAge: DIAS_DE_VIDA * 24 * 60 * 60,
    sameSite: "lax",
    secure: url.protocol === "https:",
  });

  // Sin esto el CDN puede servir el mismo destino a todo el mundo.
  respuesta.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
  respuesta.headers.set("X-Robots-Tag", "noindex, nofollow");

  return respuesta;
}
