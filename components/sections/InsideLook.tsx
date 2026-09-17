import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { insideLook } from "@/content/landing";

/**
 * El producto por dentro. Tampoco lleva video: son capturas del campus, la
 * comunidad y el tablero. La primera va destacada a lo ancho.
 */
export function InsideLook() {
  const [destacada, ...resto] = insideLook.media;

  return (
    <Section id="por-dentro" tono="blanco">
      <div className="flex flex-col items-center gap-10">
        <SectionHeading label={insideLook.eyebrow} title={insideLook.title} />

        <img
          src={destacada.src}
          alt={destacada.alt}
          width={destacada.width}
          height={destacada.height}
          className="mx-auto w-full max-w-[1040px] rounded-pieza border border-linea"
        />

        <div className="grid mx-auto w-full max-w-[1040px] gap-5 sm:grid-cols-3">
          {resto.map((shot) => (
            <img
              key={shot.src}
              src={shot.src}
              alt={shot.alt}
              width={shot.width}
              height={shot.height}
              loading="lazy"
              className="mx-auto w-full max-w-[1040px] rounded-pieza border border-linea"
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
