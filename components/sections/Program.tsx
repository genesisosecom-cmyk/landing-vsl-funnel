import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FeatureCard } from "./FeatureCard";
import { program } from "@/content/landing";

/** La oferta: seis entregables numerados, sólo texto. */
export function Program() {
  return (
    <Section id="programa" tono="hueso" className="overflow-hidden">
      {/* Dos luces en esquinas opuestas, para que la grilla no flote en un
          fondo plano. */}
      <span aria-hidden="true" className="halo-claro -left-40 top-10 h-[34rem] w-[34rem]" />
      <span aria-hidden="true" className="halo-claro -right-40 bottom-0 h-[34rem] w-[34rem]" />
      <div className="relative flex flex-col items-center gap-10">
        <SectionHeading
          label={program.eyebrow}
          title={program.title}
          subtitle={program.subtitle}
        />

        <div className="grid w-full gap-6 lg:grid-cols-2">
          {program.features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </Section>
  );
}
