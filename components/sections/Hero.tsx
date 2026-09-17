import { Logotipo } from "@/components/brand/Logotipo";
import { CtaButton } from "@/components/ui/CtaButton";
import { VideoFrame } from "@/components/ui/VideoFrame";
import { highlight } from "@/lib/highlight";
import { hero } from "@/content/landing";

/**
 * Hero de la referencia: todo centrado en una columna — logo, título, bajada,
 * VSL y el botón. Sin navegación ni links salientes: una sola acción posible.
 */
export function Hero() {
  return (
    <header className="tono-blanco bg-tono text-texto">
      <div className="container-page flex flex-col items-center gap-6 pb-12 pt-10 text-center">
        <div className="flex flex-col items-center gap-4">
          <Logotipo tone="oscuro" className="text-[1.25rem]" />
          <span className="h-px w-10 bg-naranja" />
        </div>

        <h1 className="max-w-[16ch] text-titulo">{highlight(hero.title)}</h1>

        <p className="max-w-prose text-texto">{hero.body}</p>

        <VideoFrame video={hero.video} className="w-full max-w-[46rem]" />

        <CtaButton size="lg" />
      </div>
    </header>
  );
}
