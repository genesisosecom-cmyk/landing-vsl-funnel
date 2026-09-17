import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MetricChip } from "@/components/ui/MetricChip";
import { founderCase } from "@/content/landing";

/**
 * Prueba social A — el caso propio de Manu.
 *
 * Va en el primer bloque de prueba y no abajo con los alumnos porque responde
 * la primera objeción ("¿esto funciona?"). Sin video: la foto y las capturas
 * de los tableros son la prueba.
 */
export function FounderCase() {
  return (
    <Section id="mi-caso" tono="blanco">
      <div className="flex flex-col items-center gap-12">
        <SectionHeading label={founderCase.eyebrow} title={founderCase.title} />

        <div className="grid w-full items-center gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <img
            src={founderCase.photo.src}
            alt={founderCase.photo.alt}
            width={founderCase.photo.width}
            height={founderCase.photo.height}
            className="w-full rounded-pieza border border-linea object-cover max-lg:max-w-md max-lg:self-center"
          />

          <div className="flex flex-col gap-5">
            {founderCase.body.map((parrafo) => (
              <p key={parrafo.slice(0, 32)} className="text-texto">
                {parrafo}
              </p>
            ))}

            <div className="flex flex-wrap gap-3 pt-1">
              {founderCase.datos.map((dato) => (
                <MetricChip key={dato.label} {...dato} />
              ))}
            </div>
          </div>
        </div>

        <div className="grid mx-auto w-full max-w-[1040px] gap-5 sm:grid-cols-2">
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
