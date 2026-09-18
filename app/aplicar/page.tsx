import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import { Logotipo } from "@/components/brand/Logotipo";
import { FormularioLead } from "@/components/aplicar/FormularioLead";
import { highlight } from "@/lib/highlight";
import { COOKIE_VARIANTE, esVariante, type Variante } from "@/lib/atribucion";
import { aplicar } from "@/content/landing";

export const metadata: Metadata = {
  title: "Aplicar — Génesis OS",
  // La página de conversión no tiene por qué estar en buscadores.
  robots: { index: false, follow: false },
};

async function varianteAsignada(): Promise<Variante> {
  const cabeceras = await headers();
  // El header lo pone el middleware en la primera visita, cuando la cookie
  // todavía no existe en el pedido.
  const delHeader = cabeceras.get("x-variante") ?? undefined;
  if (esVariante(delHeader)) return delHeader;

  const galletas = await cookies();
  const deCookie = galletas.get(COOKIE_VARIANTE)?.value;
  return esVariante(deCookie) ? deCookie : "contacto";
}

export default async function Aplicar() {
  const variante = await varianteAsignada();
  const copy = variante === "agenda" ? aplicar.agenda : aplicar.contacto;

  return (
    <main className="tono-blanco min-h-screen bg-tono text-texto">
      <div className="container-page flex flex-col items-center gap-8 py-12">
        <Logotipo tone="oscuro" className="text-[1.125rem]" />

        <header className="flex max-w-2xl flex-col items-center gap-4 text-center">
          <h1 className="text-[2rem] leading-[1.1] text-titulo sm:text-[2.5rem]">
            {highlight(copy.title)}
          </h1>
          <p className="max-w-prose text-texto">{copy.intro}</p>
        </header>

        <FormularioLead variante={variante} />
      </div>
    </main>
  );
}
