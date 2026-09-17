import { CtaButton } from "@/components/ui/CtaButton";
import { Section } from "@/components/ui/Section";

/** Banda de conversión reutilizada entre secciones. */
export function CtaBand({ tone = "mint" }: { tone?: "paper" | "mint" }) {
  return (
    <Section tone={tone} className="text-center">
      <CtaButton size="lg" />
    </Section>
  );
}
