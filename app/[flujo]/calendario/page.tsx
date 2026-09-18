import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import { Logotipo } from "@/components/brand/Logotipo";
import { aplicar } from "@/content/landing";

export const metadata: Metadata = {
  title: "Agendá tu llamada — Génesis OS",
  robots: { index: false, follow: false },
};

/**
 * Calendario de GoHighLevel. Solo existe en el flujo de agenda.
 *
 * El redirect al agradecimiento después de reservar se configura en el propio
 * calendario de GHL, no acá: la confirmación ocurre dentro del iframe.
 */
export default async function Calendario({ params }: { params: Promise<{ flujo: string }> }) {
  const { flujo } = await params;
  if (flujo !== "agenda") notFound();

  return (
    <main className="tono-blanco min-h-screen bg-tono text-texto">
      <div className="container-page flex flex-col items-center gap-8 py-12">
        <Logotipo tone="oscuro" className="text-[1.125rem]" />

        <header className="flex max-w-2xl flex-col items-center gap-3 text-center">
          <h1 className="text-[2rem] leading-[1.1] text-titulo sm:text-[2.5rem]">
            {aplicar.calendario.titulo}
          </h1>
          <p className="max-w-prose text-texto">{aplicar.calendario.intro}</p>
        </header>

        <iframe
          src={aplicar.calendario.url}
          title="Calendario de Génesis OS"
          scrolling="no"
          className="min-h-[760px] w-full max-w-[1040px] rounded-pieza border border-linea bg-pieza"
        />

        {/* Ajusta el alto del iframe al del calendario. */}
        <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="afterInteractive" />
      </div>
    </main>
  );
}
