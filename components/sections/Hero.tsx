import { Logotipo } from "@/components/brand/Logotipo";
import { CtaButton } from "@/components/ui/CtaButton";
import { VturbPlayer } from "@/components/ui/VturbPlayer";
import { highlight } from "@/lib/highlight";
import { hero } from "@/content/landing";

/**
 * Hero de la referencia: todo centrado en una columna — logo, título, bajada,
 * VSL y el botón. Sin navegación ni links salientes: una sola acción posible.
 */
export function Hero() {
  return (
    <header className="tono-blanco bg-tono text-texto">
      <div className="container-page flex flex-col items-center gap-5 pb-12 pt-8 text-center">
        <div className="flex flex-col items-center gap-3">
          <Logotipo tone="oscuro" className="text-[1.25rem]" />
          <span className="h-px w-10 bg-naranja" />
        </div>

        <h1 className="max-w-[30ch] text-[2.5rem] leading-[1.06] text-titulo sm:text-[2.75rem] lg:text-[3.25rem]">{highlight(hero.title)}</h1>

        <p className="max-w-prose text-texto">{hero.body}</p>

        {/* En pantallas grandes el VSL crece, pero sin empujar el botón fuera del primer scroll. */}
        <VturbPlayer player={hero.player} className="w-full max-w-[42rem] xl:max-w-4xl" />

        <CtaButton size="lg" />
      </div>
    </header>
  );
}
