import { Hero } from "@/components/sections/Hero";
import { CtaBand } from "@/components/sections/CtaBand";
import { FounderCase } from "@/components/sections/FounderCase";
import { InsideLook } from "@/components/sections/InsideLook";
import { Program } from "@/components/sections/Program";
import { ResultsMosaic } from "@/components/sections/ResultsMosaic";
import { SiteFooter } from "@/components/sections/SiteFooter";

/**
 * Estructura de la landing de referencia: bloque de valor → prueba → CTA, con
 * el mismo botón repetido cinco veces y las secciones alternando blanco y hueso.
 *
 * El ajuste sobre la referencia es el reparto de la prueba social:
 *   · FounderCase   (arriba) → "¿esto funciona?"          → el caso propio de Manu.
 *   · ResultsMosaic (abajo)  → "¿me va a funcionar a mí?" → resultados de alumnos.
 * Para invertirlos alcanza con intercambiarlos acá.
 */
export default function Page() {
  return (
    <>
      <main>
        {/* El botón del hero es el primero de los cinco: el de abajo del video. */}
        <Hero />

        <FounderCase />
        <CtaBand />

        <InsideLook />
        <CtaBand />

        <Program />
        <CtaBand tono="blanco" />

        <ResultsMosaic />
        <CtaBand tono="blanco" />
      </main>
      <SiteFooter />
    </>
  );
}
