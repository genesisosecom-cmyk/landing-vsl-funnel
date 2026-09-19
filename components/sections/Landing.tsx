import { Hero } from "@/components/sections/Hero";
import { Navbar } from "@/components/sections/Navbar";
import { CtaBand } from "@/components/sections/CtaBand";
import { FounderCase } from "@/components/sections/FounderCase";
import { FormularioEnLanding } from "@/components/sections/FormularioEnLanding";
import { Program } from "@/components/sections/Program";
import { ResultsMosaic } from "@/components/sections/ResultsMosaic";
import { SiteFooter } from "@/components/sections/SiteFooter";
import type { Flujo } from "@/lib/atribucion";

/**
 * La landing, idéntica en los dos flujos del A/B.
 *
 * Lo único que cambia entre /formulario y /agenda es qué hay embebido en la
 * sección de conversión: nuestro formulario o el calendario de GHL. El
 * contenido es el mismo para que la diferencia medida sea el mecanismo de
 * conversión y nada más.
 */
export function Landing({ flujo }: { flujo: Flujo }) {
  // Los botones no navegan: bajan al formulario embebido, que es donde arranca
  // el flujo. Una sola pantalla de conversión para toda la página.
  const aplicarUrl = "#aplicar";

  return (
    <>
      <Navbar href={aplicarUrl} />
      <main>
        {/* El botón del hero es el primero: el de abajo del video. */}
        <Hero href={aplicarUrl} />

        <FounderCase />
        <CtaBand href={aplicarUrl} />

        {/* Antes acá iba "por dentro", con capturas del campus. Se sacó: eran
            placeholders y era la última sección antes de convertir. */}
        <FormularioEnLanding flujo={flujo} destino="/gracias" />

        <Program />
        <CtaBand href={aplicarUrl} />

        <ResultsMosaic />
        <CtaBand href={aplicarUrl} />
      </main>
      <SiteFooter />
    </>
  );
}
