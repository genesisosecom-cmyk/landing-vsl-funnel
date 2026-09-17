import { Logotipo } from "@/components/brand/Logotipo";
import { site } from "@/content/landing";

/**
 * Barra con el logotipo plano (manual 4.4). Sin navegación y sin botón: la
 * página tiene una sola acción, y el manual pide un solo botón por pantalla.
 */
export function TopBar() {
  return (
    <div className="tono-negro sticky top-0 z-50 border-b border-linea bg-negro/85 backdrop-blur">
      <div className="container-page flex items-center justify-between py-4">
        <Logotipo tone="claro" className="text-[1.125rem]" />
        <span className="dato max-md:hidden">{site.brand.tagline}</span>
      </div>
    </div>
  );
}
