import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TestimonialCard } from "./TestimonialCard";
import { studentCases } from "@/content/landing";

/**
 * Prueba social B — alumnos.
 *
 * Va después del caso propio y de la oferta: responde la segunda objeción
 * ("¿me va a funcionar a mí?"), que solo aparece cuando ya creyeron en el método.
 */
export function StudentCases() {
  return (
    <Section id="alumnos" tone="paper">
      <div className="flex flex-col gap-10">
        <SectionHeading
          label={studentCases.label}
          title={studentCases.title}
          subtitle={studentCases.subtitle}
        />

        <div className="flex flex-col gap-6">
          {studentCases.items.map((item) => (
            <TestimonialCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </Section>
  );
}
