import { site } from "@/content/landing";

/**
 * El único botón de la página (manual 4.4): naranja con texto negro, uno por
 * pantalla. Sin mayúsculas de urgencia — la marca no grita (manual 1.3).
 */
export function CtaButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={site.cta.href}
      data-cta="primary"
      className={`inline-flex items-center gap-3 rounded-pieza bg-naranja px-8 py-4 font-sans text-[1.0625rem] font-semibold text-negro transition-colors hover:bg-brasa hover:text-blanco focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-naranja ${className}`}
    >
      {site.cta.label}
      <span aria-hidden="true" className="font-data">
        &rarr;
      </span>
    </a>
  );
}
