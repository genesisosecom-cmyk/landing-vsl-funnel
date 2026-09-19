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
  const [primero, ...resto] = founderCase.body;

  return (
    <Section id="mi-caso" tono="blanco" className="overflow-hidden">
      <div className="relative flex flex-col items-center gap-14">
        <SectionHeading label={founderCase.eyebrow} title={founderCase.title} />

        <div className="grid w-full items-center gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          {/*
           * La foto es un vertical 9:16; recortada a 4:5 equilibra con el texto
           * y deja la cara completa con aire arriba. Detrás, un marco en arena
           * corrido unos píxeles: da profundidad sin recurrir a una sombra
           * enorme, y es el mismo gesto de "pieza apoyada" del hero.
           */}
          <div className="relative max-lg:max-w-md max-lg:self-center max-lg:justify-self-center">
            {/* La luz cae desde arriba a la izquierda de la foto. */}
            <span
              aria-hidden="true"
              className="halo-claro -left-24 -top-24 h-[28rem] w-[28rem]"
            />
            <span
              aria-hidden="true"
              className="absolute -inset-2 translate-x-3 translate-y-3 rounded-pieza bg-hueso"
            />
            <Image
              src={founderCase.photo.src}
              alt={founderCase.photo.alt}
              width={founderCase.photo.width}
              height={founderCase.photo.height}
              sizes="(min-width: 1024px) 480px, 90vw"
              className="relative aspect-[4/5] w-full rounded-pieza object-cover shadow-foto"
            />
          </div>

          <div className="flex flex-col gap-5">
            {/* El primer párrafo va un punto más grande y más oscuro: es el que
                lleva la cifra de los USD 3 M y el que decide si siguen leyendo. */}
            <p className="text-[1.1875rem] leading-relaxed text-titulo">{primero}</p>
            {resto.map((parrafo) => (
              <p key={parrafo.slice(0, 32)} className="text-texto">
                {parrafo}
              </p>
            ))}

            <div className="grid gap-3 pt-3 sm:grid-cols-3">
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
          className="mx-auto h-auto w-full max-w-[1040px] rounded-pieza shadow-foto"
        />
      </div>
    </Section>
  );
}
