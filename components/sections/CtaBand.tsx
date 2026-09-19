import { CtaButton } from "@/components/ui/CtaButton";
import { Section, type Tono } from "@/components/ui/Section";

/**
 * Banda de conversión: el botón solo y centrado, como en la referencia.
 *
 * Va en negro con el halo de la Semilla detrás, siempre, sin importar qué
 * tono traiga la sección de arriba. El manual pide el negro como color
 * dominante y la página es casi toda clara: estas bandas son donde el negro
 * entra, y de paso marcan el ritmo — claro, claro, negro, claro, claro, negro.
 * El halo hace que el botón parezca iluminado desde atrás y no pegado sobre
 * un rectángulo.
 */
export function CtaBand({ href }: { href: string; tono?: Tono }) {
  return (
    <Section tono="negro" pad="chico" className="overflow-hidden text-center">
      <span
        aria-hidden="true"
        className="halo left-1/2 top-1/2 h-[22rem] w-[48rem] -translate-x-1/2 -translate-y-1/2"
      />
      <div className="relative">
        <CtaButton href={href} size="lg" />
      </div>
    </Section>
  );
}
