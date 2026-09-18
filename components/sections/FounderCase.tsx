import Image from "next/image";
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
          {/* La foto es un vertical 9:16; recortada a 4:5 equilibra con el texto
              y deja la cara completa con aire arriba. */}
          <Image
            src={founderCase.photo.src}
            alt={founderCase.photo.alt}
            width={founderCase.photo.width}
            height={founderCase.photo.height}
            sizes="(min-width: 1024px) 480px, 90vw"
            className="aspect-[4/5] w-full rounded-pieza border border-linea object-cover max-lg:max-w-md max-lg:self-center"
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

        {/* La captura ya viene con su propio marco negro, así que no lleva borde. */}
        <Image
          src={founderCase.media.src}
          alt={founderCase.media.alt}
          width={founderCase.media.width}
          height={founderCase.media.height}
          sizes="(min-width: 1120px) 1040px, 92vw"
          className="mx-auto h-auto w-full max-w-[1040px] rounded-pieza"
        />
      </div>
    </Section>
  );
}
