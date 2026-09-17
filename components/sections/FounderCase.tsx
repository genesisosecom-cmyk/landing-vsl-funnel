import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FranjaDeDatos } from "@/components/ui/FranjaDeDatos";
import { VideoFrame } from "@/components/ui/VideoFrame";
import { founderCase } from "@/content/landing";

/**
 * Prueba social A — el caso propio de Manu.
 *
 * Va arriba y no abajo con los alumnos porque responde la primera objeción
 * ("¿esto funciona?"). Formato propio, no la tarjeta repetida de testimonios:
 * es un solo caso y se sostiene con datos y capturas propias.
 *
 * Se queda sobre negro: es pieza de marca, no contenido educativo (manual 4.3).
 */
export function FounderCase() {
  return (
    <Section id="caso-propio" tono="negro">
      <div className="flex flex-col gap-12">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
          <VideoFrame video={founderCase.video} />

          <div className="flex flex-col gap-7">
            <SectionHeading eyebrow={founderCase.eyebrow} title={founderCase.title} />

            {founderCase.body.map((parrafo) => (
              <p key={parrafo.slice(0, 32)} className="max-w-prose text-texto">
                {parrafo}
              </p>
            ))}

            <FranjaDeDatos
              datos={founderCase.datos}
              tamano="chico"
              className="border-t border-linea pt-7"
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {founderCase.media.map((shot) => (
            <img
              key={shot.src}
              src={shot.src}
              alt={shot.alt}
              width={shot.width}
              height={shot.height}
              loading="lazy"
              className="w-full rounded-pieza border border-linea"
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
