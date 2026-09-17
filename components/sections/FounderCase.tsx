import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MetricChip } from "@/components/ui/MetricChip";
import { VideoFrame } from "@/components/ui/VideoFrame";
import { founderCase } from "@/content/landing";

/**
 * Prueba social A — el caso propio de Manu.
 *
 * Va en el primer bloque de prueba y no abajo con los alumnos porque responde
 * la primera objeción ("¿esto funciona?"). Formato propio, no la tarjeta
 * repetida de testimonios: es un solo caso y se sostiene con datos y capturas.
 */
export function FounderCase() {
  return (
    <Section id="caso-propio" tono="blanco">
      <div className="flex flex-col items-center gap-10">
        <SectionHeading label={founderCase.eyebrow} title={founderCase.title} />

        <article className="grid w-full items-center gap-8 rounded-pieza bg-pieza p-6 shadow-pieza md:grid-cols-2">
          <VideoFrame video={founderCase.video} />

          <div className="flex flex-col justify-center gap-4">
            {founderCase.body.map((parrafo) => (
              <p key={parrafo.slice(0, 32)} className="text-texto">
                {parrafo}
              </p>
            ))}

            <div className="flex flex-wrap gap-3 pt-2">
              {founderCase.datos.map((dato) => (
                <MetricChip key={dato.label} {...dato} />
              ))}
            </div>
          </div>
        </article>

        <div className="grid w-full gap-6 md:grid-cols-2">
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
