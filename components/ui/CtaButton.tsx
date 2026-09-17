import { site } from "@/content/landing";

type Props = {
  size?: "md" | "lg";
  className?: string;
};

/**
 * El único CTA de la página. Texto oscuro sobre verde: el blanco sobre este
 * verde no llega a 4.5:1.
 */
export function CtaButton({ size = "md", className = "" }: Props) {
  const sizing = size === "lg" ? "px-10 py-5 text-base" : "px-8 py-4 text-sm";

  return (
    <a
      href={site.cta.href}
      data-cta="primary"
      className={`inline-flex items-center justify-center gap-3 rounded-cta bg-accent font-display uppercase tracking-label text-ink shadow-cta transition hover:bg-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${sizing} ${className}`}
    >
      {site.cta.label}
      <span aria-hidden="true">&rarr;</span>
    </a>
  );
}
