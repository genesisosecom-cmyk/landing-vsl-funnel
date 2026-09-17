import { Hero } from "@/components/sections/Hero";
import { CtaBand } from "@/components/sections/CtaBand";
import { FounderCase } from "@/components/sections/FounderCase";
import { InsideLook } from "@/components/sections/InsideLook";
import { Program } from "@/components/sections/Program";
import { StudentCases } from "@/components/sections/StudentCases";
import { ProofCollage } from "@/components/sections/ProofCollage";
import { SiteFooter } from "@/components/sections/SiteFooter";

/**
 * Orden del funnel. El patrón es siempre: bloque de valor → prueba → CTA.
 *
 * Los dos bloques de prueba social están separados a propósito:
 *   · FounderCase  (arriba) → "¿esto funciona?"        → el caso propio, el más fuerte.
 *   · StudentCases (abajo)  → "¿me va a funcionar a mí?" → casos de alumnos.
 *
 * Para invertirlos alcanza con intercambiar <FounderCase /> y <StudentCases />
 * acá: los componentes no dependen de su posición.
 */
export default function Page() {
  return (
    <main>
      <Hero />
      <CtaBand />

      <FounderCase />
      <CtaBand />

      <InsideLook />
      <CtaBand />

      <Program />
      <CtaBand />

      <StudentCases />
      <ProofCollage />
      <CtaBand tone="paper" />

      <SiteFooter />
    </main>
  );
}
