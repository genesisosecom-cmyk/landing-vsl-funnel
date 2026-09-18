import { Hero } from "@/components/sections/Hero";
import { CtaBand } from "@/components/sections/CtaBand";
import { FounderCase } from "@/components/sections/FounderCase";
import { InsideLook } from "@/components/sections/InsideLook";
import { FormularioEnLanding } from "@/components/sections/FormularioEnLanding";
import { Program } from "@/components/sections/Program";
import { ResultsMosaic } from "@/components/sections/ResultsMosaic";
import { SiteFooter } from "@/components/sections/SiteFooter";
import type { Flujo } from "@/lib/atribucion";

/**
 * La landing, idéntica en los dos flujos del A/B.
 *
 * Lo único que cambia entre /formulario y /agenda es a dónde llevan los
 * botones y qué pasa después del formulario. El contenido es el mismo para
 * que la diferencia medida sea el mecanismo de conversión y nada más.
 */
export function Landing({ flujo, destinoFormulario }: { flujo: Flujo; destinoFormulario: string }) {
  // Los botones no navegan: bajan al formulario embebido, que es donde arranca
  // el flujo. Una sola pantalla de conversión para toda la página.
  const aplicarUrl = "#aplicar";

  return (
    <>
      <main>
        {/* El botón del hero es el primero: el de abajo del video. */}
        <Hero href={aplicarUrl} />

        <FounderCase />
        <CtaBand href={aplicarUrl} />

        <InsideLook />
        {/* Acá iba una banda de CTA; ahora el formulario va embebido de una. */}
        <FormularioEnLanding flujo={flujo} destino={destinoFormulario} />

        <Program />
        <CtaBand href={aplicarUrl} tono="blanco" />

        <ResultsMosaic />
        <CtaBand href={aplicarUrl} tono="blanco" />
      </main>
      <SiteFooter />
    </>
  );
}
