import { highlight } from "@/lib/highlight";
import type { Feature } from "@/content/landing";

/**
 * Entregable numerado, sólo texto.
 *
 * El número va dos veces: chico y naranja, para contar; y enorme y casi
 * invisible en la esquina, para dar textura editorial a una tarjeta que si no
 * es un bloque de texto sobre blanco. En hover la tarjeta se despega un poco,
 * que es la única animación que se permite la sección.
 */
export function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  const numero = String(index + 1).padStart(2, "0");

  return (
    <article className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-pieza border border-linea/70 bg-pieza p-10 shadow-pieza transition-all duration-300 ease-suave hover:-translate-y-1 hover:border-naranja/30 hover:shadow-[0_30px_70px_-30px_rgba(11,11,11,0.35),0_0_40px_-12px_rgba(240,100,30,0.35)] max-sm:p-7">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-1 -top-3 select-none font-data text-[6rem] font-bold leading-none tracking-[-0.06em] text-hueso transition-colors duration-300 group-hover:text-naranja/10"
      >
        {numero}
      </span>

      <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-naranja font-data text-[0.75rem] font-semibold text-negro shadow-[0_6px_14px_-6px_rgba(194,65,12,0.7)]">
        {index + 1}
      </span>
      <h3 className="relative text-[1.375rem] text-titulo">{highlight(feature.title)}</h3>
      <p className="relative text-texto">{feature.body}</p>
    </article>
  );
}
