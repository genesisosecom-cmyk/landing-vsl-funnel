import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FeatureRow } from "./FeatureRow";
import { program } from "@/content/landing";

/** La oferta: seis entregables numerados, cada uno con su captura. */
export function Program() {
  return (
    <Section id="programa" tono="hueso">
      <div className="flex flex-col items-center gap-10">
        <SectionHeading
          label={program.eyebrow}
          title={program.title}
          subtitle={program.subtitle}
        />

        <div className="flex w-full flex-col gap-6">
          {program.features.map((feature, i) => (
            <FeatureRow key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </Section>
  );
}
