import { Logotipo } from "@/components/brand/Logotipo";
import { footer } from "@/content/landing";

export function SiteFooter() {
  return (
    <footer className="tono-negro border-t border-linea bg-negro">
      <div className="container-page flex flex-col gap-10 py-14">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <Logotipo tone="claro" className="text-[1.125rem]" />
          {/* El usuario cierra la pieza en naranja (manual 4.3). */}
          <span className="font-data text-dato font-medium uppercase tracking-dato text-naranja">
            {footer.usuario}
          </span>
        </div>

        <p className="max-w-prose text-[0.8125rem] leading-relaxed text-sutil">
          {footer.disclaimer}
        </p>

        <nav className="flex flex-wrap gap-x-8 gap-y-2 border-t border-linea pt-8">
          {footer.links.map((link) => (
            <a key={link.label} className="dato hover:text-blanco" href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
