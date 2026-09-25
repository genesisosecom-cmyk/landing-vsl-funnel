import type { Metadata } from "next";
import Link from "next/link";
import { Logotipo } from "@/components/brand/Logotipo";
import { privacidad } from "@/content/landing";

export const metadata: Metadata = {
  title: "Política de privacidad — Génesis OS",
  description: "Qué datos recolectamos en genesisecom.com, para qué los usamos y cómo pedir que los borremos.",
};

export default function Privacidad() {
  return (
    <main className="tono-blanco min-h-screen bg-tono text-texto">
      <div className="mx-auto flex w-full max-w-[720px] flex-col gap-10 px-8 py-16 max-sm:px-5">
        <header className="flex flex-col gap-5">
          <Link href="/" className="self-start">
            <Logotipo tone="oscuro" className="text-[1.125rem]" />
          </Link>

          <h1 className="text-[2rem] leading-[1.15] text-titulo sm:text-[2.5rem]">
            {privacidad.titulo}
          </h1>
          <p className="dato">Última actualización: {privacidad.actualizado}</p>
          <p className="text-cuerpo">{privacidad.intro}</p>
        </header>

        {privacidad.secciones.map((seccion) => (
          <section key={seccion.titulo} className="flex flex-col gap-3 border-t border-linea pt-8">
            <h2 className="font-sans text-[1.25rem] font-medium text-titulo">{seccion.titulo}</h2>
            {seccion.cuerpo.map((parrafo) => (
              <p key={parrafo} className="leading-relaxed">
                {parrafo}
              </p>
            ))}
          </section>
        ))}
      </div>
    </main>
  );
}
