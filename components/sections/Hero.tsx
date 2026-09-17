import { Halo } from "@/components/brand/Halo";
import { Semilla } from "@/components/brand/Semilla";
import { CtaButton } from "@/components/ui/CtaButton";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { FranjaDeDatos } from "@/components/ui/FranjaDeDatos";
import { VideoFrame } from "@/components/ui/VideoFrame";
import { highlight } from "@/lib/highlight";
import { hero } from "@/content/landing";

/**
 * Hero según el manual 4.4: fondo negro con halo, eyebrow naranja, título de dos
 * líneas, un solo botón y la franja de datos con la cifra en blanco.
 *
 * Dos columnas y una franja a lo ancho abajo: así el título, el VSL, el botón y
 * los tres datos entran completos en 1440 × 900, sin scroll.
 */
export function Hero() {
  return (
    <header className="tono-negro relative overflow-hidden bg-negro text-texto">
      <div className="container-page relative py-14">
        {/* El halo se ancla al contenedor, no a la sección: si no, en pantallas
            anchas se despega de la Semilla que tiene que tener en el centro. */}
        <Halo className="-inset-x-40 inset-y-0" />

        <div className="relative grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.12fr)]">
          <div className="flex flex-col items-start gap-5">
            {/* La Semilla encendida va en el centro del halo (manual 3.3). */}
            <Semilla variant="principal" className="h-16 w-auto" title="Génesis OS" />

            <Eyebrow>{hero.eyebrow}</Eyebrow>

            <h1 className="max-w-[12ch] text-titulo">{highlight(hero.title)}</h1>

            <p className="max-w-prose text-h3 font-medium text-blanco">{hero.subtitle}</p>

            <p className="max-w-prose text-texto">{hero.body}</p>

            <CtaButton className="mt-1" />
          </div>

          <VideoFrame video={hero.video} className="w-full" />
        </div>

        <FranjaDeDatos datos={hero.datos} className="relative mt-12 border-t border-linea pt-8" />
      </div>
    </header>
  );
}
