import Link from "next/link";
import { Logotipo } from "@/components/brand/Logotipo";
import { Semilla } from "@/components/brand/Semilla";
import { footer } from "@/content/landing";

/**
 * El pie. La Semilla grande y casi apagada a la derecha es la única
 * decoración: en negro, a ese tamaño, es la marca respirando al final.
 */
export function SiteFooter() {
  return (
    <footer className="tono-negro relative overflow-hidden bg-negro">
      <span aria-hidden="true" className="divisor" />
      <Semilla
        variant="mono"
        className="pointer-events-none absolute -bottom-24 right-[4%] h-[26rem] w-auto text-naranja opacity-[0.07]"
      />

      <div className="container-page relative flex flex-col gap-10 py-16">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <Logotipo tone="claro" className="text-[1.25rem]" />
          {/* El usuario cierra la pieza en naranja (manual 4.3). */}
          <span className="font-data text-dato font-medium uppercase tracking-dato text-naranja">
            {footer.usuario}
          </span>
        </div>

        <div className="flex flex-col gap-5 border-t border-linea pt-8">
          <p className="max-w-prose text-[0.8125rem] leading-relaxed text-sutil">
            {footer.disclaimer}
          </p>

          {/* Meta pide poder llegar a la política desde donde se piden los datos. */}
          <Link
            href="/privacidad"
            className="dato self-start transition-colors duration-200 hover:text-blanco"
          >
            Política de privacidad
          </Link>
        </div>
      </div>
    </footer>
  );
}
