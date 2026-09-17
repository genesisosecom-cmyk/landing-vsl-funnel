import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { proofCollage } from "@/content/landing";

/** Prueba cruda: capturas sin editar. El argumento es el volumen, no el detalle. */
export function ProofCollage() {
  return (
    <Section id="pruebas" tono="hueso">
      <div className="flex flex-col items-center gap-10">
        <SectionHeading label={proofCollage.eyebrow} title={proofCollage.title} />

        {/* Masonry con columnas CSS: respeta el alto original de cada captura. */}
        <div className="w-full columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
          {proofCollage.images.map((image) => (
            <img
              key={image.src}
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              loading="lazy"
              className="w-full break-inside-avoid rounded-xl border border-linea"
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
