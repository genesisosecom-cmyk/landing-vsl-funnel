import { NextResponse, type NextRequest } from "next/server";
import { COOKIE_VARIANTE, DIAS_DE_VIDA, esVariante } from "@/lib/atribucion";

/**
 * Reparte el A/B de la página de aplicación: mitad agenda, mitad contacto.
 *
 * El reparto se hace acá y no con dos ad sets en Meta apuntando a dos URLs,
 * porque ahí Meta reparte por audiencia y el test mide el algoritmo en vez de
 * las dos páginas. La cookie fija la variante por visitante.
 *
 * Además de la cookie manda la variante en un header: la cookie recién existe
 * en el pedido siguiente, y la página tiene que renderizar bien la primera vez.
 */
export function middleware(request: NextRequest) {
  const yaAsignada = request.cookies.get(COOKIE_VARIANTE)?.value;

  if (esVariante(yaAsignada)) return NextResponse.next();

  const variante = Math.random() < 0.5 ? "agenda" : "contacto";
  const headers = new Headers(request.headers);
  headers.set("x-variante", variante);

  const respuesta = NextResponse.next({ request: { headers } });
  respuesta.cookies.set(COOKIE_VARIANTE, variante, {
    path: "/",
    maxAge: DIAS_DE_VIDA * 24 * 60 * 60,
    sameSite: "lax",
  });

  return respuesta;
}

export const config = { matcher: ["/aplicar"] };
