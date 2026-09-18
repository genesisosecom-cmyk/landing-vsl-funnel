import { NextResponse } from "next/server";
import { COOKIE_PANEL, DIAS_DE_SESION, claveCorrecta, valorDeSesion } from "@/lib/panel";

/** Entrada al panel: recibe la contraseña del formulario y deja la cookie. */
export async function POST(pedido: Request) {
  const datos = await pedido.formData().catch(() => null);
  const clave = datos?.get("clave");
  const origen = new URL(pedido.url).origin;

  if (typeof clave !== "string" || !claveCorrecta(clave)) {
    return NextResponse.redirect(`${origen}/tracking?error=1`, { status: 303 });
  }

  const respuesta = NextResponse.redirect(`${origen}/tracking`, { status: 303 });
  respuesta.cookies.set(COOKIE_PANEL, valorDeSesion() ?? "", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: DIAS_DE_SESION * 24 * 60 * 60,
  });

  return respuesta;
}
