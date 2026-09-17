import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { results } from "@/content/landing";

/**
 * Prueba social B — todos los resultados juntos.
 *
 * Solo capturas, sin etiquetas ni texto encima: lo que convence es el volumen.
 * Van con next/image porque son JPG de 1200 px que se muestran a 400: sin
 * optimizar son casi medio mega de descarga al pedo.
 */
export function ResultsMosaic() {
  return (
    <Section id="resultados" tono="hueso">
      <div className="flex flex-col items-center gap-10">
        <SectionHeading label={results.eyebrow} title={results.title} />

        <Image
          src={results.featured.src}
          alt={results.featured.alt}
          width={results.featured.width}
          height={results.featured.height}
          sizes="(min-width: 1120px) 1040px, 92vw"
          priority={false}
          className="h-auto mx-auto w-full max-w-[1040px] rounded-lg border border-linea"
        />

        {/* Masonry con columnas CSS: cada captura conserva su alto original. */}
        <div className="mx-auto w-full max-w-[1040px] columns-1 gap-4 sm:columns-2 [&>*]:mb-4">
          {results.items.map((image) => (
            <Image
              key={image.src}
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              sizes="(min-width: 1120px) 512px, (min-width: 640px) 45vw, 90vw"
              className="h-auto w-full break-inside-avoid rounded-lg border border-linea"
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
