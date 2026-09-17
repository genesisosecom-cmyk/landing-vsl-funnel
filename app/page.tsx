import { Hero } from "@/components/sections/Hero";
import { CtaBand } from "@/components/sections/CtaBand";
import { FounderCase } from "@/components/sections/FounderCase";
import { InsideLook } from "@/components/sections/InsideLook";
import { Program } from "@/components/sections/Program";
import { StudentCases } from "@/components/sections/StudentCases";
import { ProofCollage } from "@/components/sections/ProofCollage";
import { SiteFooter } from "@/components/sections/SiteFooter";

/**
 * Estructura de la landing de referencia: bloque de valor → prueba → CTA, con
 * el mismo botón repetido cinco veces y secciones alternando blanco y hueso.
 *
 * El único ajuste sobre la referencia es el reparto de la prueba social:
 *   · FounderCase  (arriba) → "¿esto funciona?"          → el caso propio de Manu.
 *   · StudentCases (abajo)  → "¿me va a funcionar a mí?" → casos de alumnos.
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

        <StudentCases />
        <ProofCollage />
        <CtaBand tono="blanco" />
      </main>
      <SiteFooter />
    </>
  );
}
