import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { proofCollage } from "@/content/landing";

/**
 * Prueba cruda: capturas sin editar, carril analista (manual 3.1). El argumento
 * es el volumen de tableros, no el detalle de cada uno.
 */
export function ProofCollage() {
  return (
    <Section id="pruebas" tono="hueso">
      <div className="flex flex-col gap-12">
        <SectionHeading eyebrow={proofCollage.eyebrow} title={proofCollage.title} />

        {/* Masonry con columnas CSS: respeta el alto original de cada captura. */}
        <div className="columns-2 gap-6 lg:columns-4 [&>*]:mb-6">
          {proofCollage.images.map((image) => (
            <img
              key={image.src}
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              loading="lazy"
              className="w-full break-inside-avoid rounded-pieza border border-linea"
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
