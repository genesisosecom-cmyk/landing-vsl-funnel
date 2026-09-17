import { site } from "@/content/landing";

type Props = {
  size?: "md" | "lg";
  className?: string;
};

/**
 * El único CTA de la página, repetido cinco veces con el mismo texto y destino.
 * Naranja Génesis con texto negro: el blanco sobre este naranja no llega a 4,5:1.
 */
export function CtaButton({ size = "md", className = "" }: Props) {
  const sizing = size === "lg" ? "px-10 py-5 text-[0.9375rem]" : "px-8 py-4 text-[0.875rem]";

  return (
    <a
      href={site.cta.href}
      data-cta="primary"
      className={`inline-flex items-center justify-center gap-3 rounded-cta bg-naranja font-data font-semibold uppercase tracking-dato text-negro shadow-cta transition-colors hover:bg-brasa hover:text-blanco focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brasa ${sizing} ${className}`}
    >
      {site.cta.label}
      <span aria-hidden="true">&rarr;</span>
    </a>
  );
}
