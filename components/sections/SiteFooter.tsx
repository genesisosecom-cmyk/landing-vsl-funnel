import Link from "next/link";
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
        <div className="flex flex-col gap-4 border-t border-linea pt-8">
          <p className="max-w-prose text-[0.8125rem] leading-relaxed text-sutil">
            {footer.disclaimer}
          </p>

          {/* Meta pide poder llegar a la política desde donde se piden los datos. */}
          <Link href="/privacidad" className="dato self-start hover:text-blanco">
            Política de privacidad
          </Link>
        </div>
      </div>
    </footer>
  );
}
