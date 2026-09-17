import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { proofCollage } from "@/content/landing";

/** Prueba cruda: capturas sin editar. El argumento acá es el volumen, no el detalle. */
export function ProofCollage() {
  return (
    <Section id="pruebas" tone="mint">
      <div className="flex flex-col gap-10">
        <SectionHeading label={proofCollage.label} title={proofCollage.title} />

        {/* Masonry con columnas CSS: respeta el alto original de cada captura. */}
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
          {proofCollage.images.map((image) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={image.src}
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              loading="lazy"
              className="w-full break-inside-avoid rounded-xl border border-hairline shadow-card"
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
