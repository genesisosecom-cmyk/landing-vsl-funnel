import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";
import { COOKIE_ATRIBUCION, COOKIE_VARIANTE, esVariante, leerAtribucion } from "@/lib/atribucion";
import { upsertContacto } from "@/lib/ghl";
import { enviarEvento } from "@/lib/capi";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(pedido: Request) {
  const cuerpo = await pedido.json().catch(() => null);

  const nombre = String(cuerpo?.nombre ?? "").trim();
  const email = String(cuerpo?.email ?? "").trim();
  const telefono = String(cuerpo?.telefono ?? "").trim();
  const eventId = String(cuerpo?.eventId ?? "").trim();

  if (nombre.length < 2 || !EMAIL.test(email) || telefono.replace(/\D/g, "").length < 8) {
    return NextResponse.json({ ok: false, error: "datos incompletos" }, { status: 400 });
  }

  const galletas = await cookies();
  const cabeceras = await headers();

  const atribucion = leerAtribucion(galletas.get(COOKIE_ATRIBUCION)?.value);
  // Respaldo: si el script de captura no alcanzó a leerlas, las toma de acá.
  atribucion.fbp ??= galletas.get("_fbp")?.value;
  atribucion.fbc ??= galletas.get("_fbc")?.value;

  const cookieVariante = galletas.get(COOKIE_VARIANTE)?.value;
  const variante = esVariante(cookieVariante) ? cookieVariante : "contacto";

  const guardado = await upsertContacto({ nombre, email, telefono, variante, atribucion });

  if (!guardado.ok) {
    // El lead ya hizo su parte: no se le muestra un error, pero queda en el log
    // de Vercel con un prefijo buscable para no perderlo.
    console.error(
      "[LEAD-SIN-GUARDAR]",
      JSON.stringify({ nombre, email, telefono, variante, atribucion, error: guardado.error }),
    );
  }

  const evento = await enviarEvento({
    nombre: "Lead",
    eventId,
    email,
    telefono,
    atribucion,
    ip: cabeceras.get("x-forwarded-for")?.split(",")[0]?.trim(),
    userAgent: cabeceras.get("user-agent") ?? undefined,
    url: `https://www.genesisecom.com/aplicar`,
    datos: { variante, content_name: `lead_${variante}` },
  });

  if (!evento.ok) console.warn("[CAPI-LEAD]", evento.detalle);

  return NextResponse.json({ ok: true, variante });
}
