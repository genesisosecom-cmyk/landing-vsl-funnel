import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FeatureRow } from "./FeatureRow";
import { program } from "@/content/landing";

/** La oferta: qué recibe exactamente, con una captura real por entregable. */
export function Program() {
  return (
    <Section id="programa" tone="paper">
      <div className="flex flex-col gap-10">
        <SectionHeading label={program.label} title={program.title} subtitle={program.subtitle} />

        <div className="flex flex-col gap-6">
          {program.features.map((feature, i) => (
            <FeatureRow key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </Section>
  );
}
