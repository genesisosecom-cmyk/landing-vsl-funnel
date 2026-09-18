import { CtaButton } from "@/components/ui/CtaButton";
import { Section, type Tono } from "@/components/ui/Section";

/** Banda de conversión: el botón solo y centrado, como en la referencia. */
export function CtaBand({ href, tono = "hueso" }: { href: string; tono?: Tono }) {
  return (
    <Section tono={tono} pad="chico" className="text-center">
      <CtaButton href={href} size="lg" />
    </Section>
  );
}
