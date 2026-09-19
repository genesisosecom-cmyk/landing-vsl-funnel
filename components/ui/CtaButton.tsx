import { site } from "@/content/landing";

type Props = {
  href: string;
  size?: "md" | "lg";
  className?: string;
};

/**
 * Las clases del CTA, compartidas con el botón del formulario para que los dos
 * sean exactamente el mismo objeto: mismo degradado, misma sombra, mismo hover.
 *
 * Naranja Génesis con texto negro: el blanco sobre este naranja no llega a
 * 4,5:1. En hover pasa a Brasa, donde el blanco sí contrasta.
 *
 * El degradado es vertical y de apenas 5 % de diferencia: da volumen al botón
 * sin que parezca un botón de 2012. La sombra lleva un brillo interior arriba
 * por el mismo motivo.
 */
export function clasesDeCta(size: "md" | "lg" = "md"): string {
  // En mobile el label entra justo: sin bajar padding y cuerpo se parte en dos líneas.
  const tamano =
    size === "lg"
      ? "px-11 py-[1.375rem] text-[0.9375rem] max-sm:px-6 max-sm:py-4 max-sm:text-[0.8125rem]"
      : "px-8 py-4 text-[0.875rem] max-sm:px-6 max-sm:text-[0.8125rem]";

  return `group inline-flex items-center justify-center gap-3 rounded-cta bg-cta font-data font-semibold uppercase tracking-dato text-negro shadow-cta transition-all duration-300 ease-suave hover:-translate-y-0.5 hover:bg-cta-hover hover:text-blanco hover:shadow-cta-hover active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brasa ${tamano}`;
}

/** La flecha del CTA: se corre un poco a la derecha en hover, como invitando. */
export function FlechaDeCta() {
  return (
    <span
      aria-hidden="true"
      className="inline-block transition-transform duration-300 ease-suave group-hover:translate-x-1"
    >
      &rarr;
    </span>
  );
}

/** El único CTA de la página, repetido con el mismo texto y destino. */
export function CtaButton({ href, size = "md", className = "" }: Props) {
  return (
    <a href={href} data-cta="primary" className={`${clasesDeCta(size)} ${className}`}>
      {site.cta.label}
      <FlechaDeCta />
    </a>
  );
}
