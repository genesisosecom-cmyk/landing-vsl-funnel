import { CapturaDeAtribucion } from "@/components/analytics/CapturaDeAtribucion";
import { CtaTracker } from "@/components/analytics/CtaTracker";
import { MetaPixel } from "@/components/analytics/MetaPixel";

/**
 * Las páginas que se miden.
 *
 * El grupo existe para dejar `/tracking` afuera. Estaba en el layout raíz, así
 * que abrir el panel anotaba una visita y mandaba un PageView al píxel: la
 * herramienta de medir metiéndose en lo medido, y nosotros entrando a los
 * públicos de retargeting.
 *
 * La otra forma era preguntar la ruta desde el cliente, y salía peor: obligaba
 * a que el píxel fuera un componente de cliente, y entonces el snippet se
 * inyecta recién después de hidratar en lugar de venir en el HTML. El que
 * rebota antes de que cargue el JS no contaba como PageView.
 *
 * El nombre entre paréntesis no aparece en la URL: /formulario sigue siendo
 * /formulario.
 */
export default function LayoutMedido({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <MetaPixel />
      <CtaTracker />
      <CapturaDeAtribucion />
    </>
  );
}
