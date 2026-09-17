import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TestimonialCard } from "./TestimonialCard";
import { studentCases } from "@/content/landing";

/**
 * Prueba social B — alumnos.
 *
 * Va después del caso propio y de la oferta: responde la segunda objeción
 * ("¿me va a funcionar a mí?"), que solo aparece cuando ya creyeron en el modelo.
 */
export function StudentCases() {
  return (
    <Section id="alumnos" tono="blanco">
      <div className="flex flex-col items-center gap-10">
        <SectionHeading
          label={studentCases.eyebrow}
          title={studentCases.title}
          subtitle={studentCases.subtitle}
        />

        {/* Acotado: a todo el ancho del contenedor la línea de texto se pasa de largo. */}
        <div className="flex w-full max-w-[1040px] flex-col gap-6">
          {studentCases.items.map((item) => (
            <TestimonialCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </Section>
  );
}
