import { Logotipo } from "@/components/brand/Logotipo";
import { CtaButton } from "@/components/ui/CtaButton";
import { VturbPlayer } from "@/components/ui/VturbPlayer";
import { highlight } from "@/lib/highlight";
import { hero } from "@/content/landing";

/**
 * Hero de la referencia: todo centrado en una columna — logo, título, bajada,
 * VSL y el botón. Sin navegación ni links salientes: una sola acción posible.
 *
 * El fondo no es blanco plano: lleva un halo cálido detrás del video y un
 * grano fino. Los dos son casi imperceptibles por separado; juntos hacen que
 * el video parezca apoyado sobre algo y no flotando en la nada.
 */
export function Hero({ href }: { href: string }) {
  return (
    <header className="tono-blanco relative overflow-hidden bg-tono text-texto">
      <span aria-hidden="true" className="grano" />
      {/* Una luz chica arriba, detrás del logo, y la grande detrás del video.
          Sobre el título, ninguna: ahí ensucia. */}
      <span
        aria-hidden="true"
        className="halo-claro left-1/2 top-0 h-[14rem] w-[28rem] -translate-x-1/2 -translate-y-1/2"
      />
      <span
        aria-hidden="true"
        className="halo left-1/2 top-[68%] h-[40rem] w-[64rem] -translate-x-1/2 -translate-y-1/2 opacity-60"
      />

      <div className="container-page relative flex flex-col items-center gap-5 pb-14 pt-9 text-center">
        <div className="flex flex-col items-center gap-4">
          <Logotipo tone="oscuro" className="text-[1.375rem]" />
          <span className="h-px w-12 bg-gradient-to-r from-transparent via-naranja to-transparent" />
        </div>

        {/* Tres líneas en desktop, no cuatro: a más de 3,25 rem el título se
            alarga y hunde el video debajo del pliegue. */}
        <h1 className="max-w-[30ch] text-[2.25rem] leading-[1.06] text-titulo sm:text-[2.75rem] lg:text-[3.25rem] xl:text-[3.5rem]">
          {highlight(hero.title, { subrayado: true })}
        </h1>

        <p className="max-w-[56ch] text-[1.125rem] leading-relaxed text-texto max-sm:text-[1rem]">{hero.body}</p>

        {/*
         * El marco del VSL: un aro de un píxel de luz naranja y una sombra
         * profunda. Es lo que lo convierte en el objeto de la página.
         * En pantallas grandes crece, pero sin empujar el botón fuera del
         * primer scroll.
         */}
        <div className="mt-2 w-full max-w-[42rem] rounded-[1.5rem] bg-negro p-[3px] shadow-marco xl:max-w-4xl">
          <VturbPlayer player={hero.player} className="rounded-[calc(1.5rem-3px)]" />
        </div>

        <CtaButton href={href} size="lg" className="mt-2" />
      </div>
    </header>
  );
}
