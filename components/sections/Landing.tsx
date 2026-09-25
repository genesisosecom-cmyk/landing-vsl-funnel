import { Hero } from "@/components/sections/Hero";
import { Navbar } from "@/components/sections/Navbar";
import { CtaBand } from "@/components/sections/CtaBand";
import { FounderCase } from "@/components/sections/FounderCase";
import { FormularioEnLanding } from "@/components/sections/FormularioEnLanding";
import { Program } from "@/components/sections/Program";
import { ResultsMosaic } from "@/components/sections/ResultsMosaic";
import { SiteFooter } from "@/components/sections/SiteFooter";

/**
 * La landing.
 *
 * Hubo una segunda variante con el calendario de GHL embebido en lugar del
 * formulario. Se dio de baja: sólo nuestro formulario puede preguntar la
 * facturación antes de convertir, que es lo que decide si el lead alimenta al
 * píxel.
 */
export function Landing() {
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
        <FormularioEnLanding destino="/gracias" />

        <Program />
        <CtaBand href={aplicarUrl} />

        <ResultsMosaic />
        <CtaBand href={aplicarUrl} />
      </main>
      <SiteFooter />
    </>
  );
}
