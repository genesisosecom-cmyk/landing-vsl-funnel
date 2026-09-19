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

        {/* La línea la traía la navegación que había acá abajo; sin ella el
            descargo quedaba pegado al logo. */}
        <p className="max-w-prose border-t border-linea pt-8 text-[0.8125rem] leading-relaxed text-sutil">
          {footer.disclaimer}
        </p>
      </div>
    </footer>
  );
}
