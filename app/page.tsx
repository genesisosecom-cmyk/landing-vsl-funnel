import { TopBar } from "@/components/sections/TopBar";
import { Hero } from "@/components/sections/Hero";
import { CtaBand } from "@/components/sections/CtaBand";
import { FounderCase } from "@/components/sections/FounderCase";
import { InsideLook } from "@/components/sections/InsideLook";
import { Program } from "@/components/sections/Program";
import { StudentCases } from "@/components/sections/StudentCases";
import { ProofCollage } from "@/components/sections/ProofCollage";
import { CampoDeSemillas } from "@/components/brand/CampoDeSemillas";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { ctaBands } from "@/content/landing";

/**
 * Orden del funnel: bloque de valor → prueba → CTA.
 *
 * Los dos bloques de prueba social están separados por objeción:
 *   · FounderCase  (arriba) → "¿esto funciona?"          → el caso propio de Manu.
 *   · StudentCases (abajo)  → "¿me va a funcionar a mí?" → casos de alumnos.
 * Para invertirlos alcanza con intercambiarlos acá.
 *
 * Tonos según la proporción del manual (Negro 55 · Hueso 30): hero y caso propio
 * sobre negro, todo el contenido sobre hueso, cierre y pie de vuelta en negro.
 */
export default function Page() {
  return (
    <>
      <TopBar />
      <main>
        <Hero />
        <FounderCase />
        <CtaBand nota={ctaBands.hero} tono="negro" />

        <InsideLook />
        <Program />
        <CtaBand nota={ctaBands.programa} tono="hueso" />

        <StudentCases />
        <ProofCollage />

        <div className="tono-negro border-t border-linea bg-negro">
          <CampoDeSemillas />
        </div>
        <CtaBand nota={ctaBands.cierre} tono="negro" />
      </main>
      <SiteFooter />
    </>
  );
}
