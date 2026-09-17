import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { results } from "@/content/landing";

/**
 * Prueba social B — todos los resultados juntos.
 *
 * Solo capturas, sin etiquetas ni texto encima: lo que convence es el volumen.
 */
export function ResultsMosaic() {
  return (
    <Section id="resultados" tono="hueso">
      <div className="flex flex-col items-center gap-10">
        <SectionHeading label={results.eyebrow} title={results.title} />

        {/* Masonry con columnas CSS: cada captura conserva su alto original. */}
        <div className="w-full columns-2 gap-4 lg:columns-3 xl:columns-4 [&>*]:mb-4">
          {results.items.map((image) => (
            <img
              key={image.src}
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              loading="lazy"
              className="w-full break-inside-avoid rounded-lg border border-linea"
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
