import type { Metadata } from "next";
import { Logotipo } from "@/components/brand/Logotipo";
import { Semilla } from "@/components/brand/Semilla";
import { aplicar } from "@/content/landing";

export const metadata: Metadata = {
  title: "Gracias — Génesis OS",
  robots: { index: false, follow: false },
};

export default function Gracias() {
  return (
    <main className="tono-blanco flex min-h-screen flex-col items-center justify-center bg-tono text-texto">
      <div className="container-page flex flex-col items-center gap-6 py-16 text-center">
        <Logotipo tone="oscuro" className="text-[1.125rem]" />
        <Semilla variant="plana" className="h-12 w-auto" />

        <h1 className="max-w-2xl text-[2rem] leading-[1.1] text-titulo sm:text-[2.5rem]">
          {aplicar.gracias.titulo}
        </h1>
        <p className="max-w-prose text-texto">{aplicar.gracias.texto}</p>
      </div>
    </main>
  );
}
