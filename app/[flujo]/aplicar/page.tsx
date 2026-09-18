import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Logotipo } from "@/components/brand/Logotipo";
import { TypeformEmbed } from "@/components/embed/TypeformEmbed";
import { FLUJOS, esFlujo } from "@/lib/atribucion";
import { aplicar } from "@/content/landing";

export const metadata: Metadata = {
  title: "Aplicar — Génesis OS",
  // Las páginas del flujo no tienen por qué estar en buscadores.
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  return FLUJOS.map((flujo) => ({ flujo }));
}

export default async function Aplicar({ params }: { params: Promise<{ flujo: string }> }) {
  const { flujo } = await params;
  if (!esFlujo(flujo)) notFound();

  const destino = flujo === "agenda" ? "/agenda/calendario" : "/gracias";

  return (
    <main className="tono-blanco min-h-screen bg-tono text-texto">
      <div className="container-page flex flex-col items-center gap-8 py-12">
        <Logotipo tone="oscuro" className="text-[1.125rem]" />

        <header className="flex max-w-2xl flex-col items-center gap-3 text-center">
          <h1 className="text-[2rem] leading-[1.1] text-titulo sm:text-[2.5rem]">
            {aplicar.titulo}
          </h1>
          <p className="max-w-prose text-texto">{aplicar.intro}</p>
        </header>

        <TypeformEmbed
          flujo={flujo}
          origen="boton"
          destino={destino}
          className="h-[640px] w-full max-w-[900px] overflow-hidden rounded-pieza border border-linea bg-pieza"
        />
      </div>
    </main>
  );
}
