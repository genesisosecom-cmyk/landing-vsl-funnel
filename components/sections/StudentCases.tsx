import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TestimonialCard } from "./TestimonialCard";
import { studentCases } from "@/content/landing";

/**
 * Prueba social B — alumnos.
 *
 * Va después del caso propio y de la oferta: responde la segunda objeción
 * ("¿me va a funcionar a mí?"), que solo aparece cuando ya creyeron en el
 * modelo. Sobre hueso, que es el carril del contenido con datos (manual 4.3).
 */
export function StudentCases() {
  return (
    <Section id="alumnos" tono="hueso">
      <div className="flex flex-col gap-12">
        <SectionHeading
          eyebrow={studentCases.eyebrow}
          title={studentCases.title}
          subtitle={studentCases.subtitle}
        />

        {/* Ancho acotado: a 1240 px la línea de texto se iba a 100 caracteres. */}
        <div className="flex w-full max-w-[1040px] flex-col gap-6">
          {studentCases.items.map((item) => (
            <TestimonialCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </Section>
  );
}
