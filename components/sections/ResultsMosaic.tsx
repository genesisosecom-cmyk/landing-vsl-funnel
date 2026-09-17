import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { results } from "@/content/landing";

/**
 * Prueba social B — todos los resultados juntos.
 *
 * Mosaico de capturas sin editar, cada una con su etiqueta de resultado
 * arriba. Va sobre negro porque las capturas son oscuras: sobre claro el
 * mosaico se lee como un parche de manchas negras.
 */
export function ResultsMosaic() {
  return (
    <Section id="resultados" tono="negro">
      <div className="flex flex-col items-center gap-10">
        <SectionHeading
          label={results.eyebrow}
          title={results.title}
          subtitle={results.subtitle}
        />

        {/* Masonry con columnas CSS: cada captura conserva su alto original. */}
        <div className="w-full columns-1 gap-3 sm:columns-2 lg:columns-3 xl:columns-4 [&>*]:mb-3">
          {results.items.map((item) => (
            <figure key={item.id} className="break-inside-avoid">
              <figcaption className="mb-1.5 font-sans text-[0.875rem] font-semibold text-titulo">
                {item.label}
              </figcaption>
              <img
                src={item.image.src}
                alt={item.image.alt}
                width={item.image.width}
                height={item.image.height}
                loading="lazy"
                className="w-full rounded-lg border border-linea"
              />
            </figure>
          ))}
        </div>
      </div>
    </Section>
  );
}
