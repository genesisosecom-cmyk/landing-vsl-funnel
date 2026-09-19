import { highlight } from "@/lib/highlight";
import type { Feature } from "@/content/landing";

/**
 * Entregable numerado, sólo texto.
 *
 * Antes cada uno era una fila en zig-zag con una captura al lado. Sin imagen el
 * zig-zag no tiene nada que alternar y deja media tarjeta vacía, así que los
 * seis pasan a ser tarjetas en dos columnas: se leen de corrido y la sección
 * deja de ocupar tres pantallas.
 */
export function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  return (
    <article className="flex h-full flex-col gap-4 rounded-pieza bg-pieza p-10 shadow-pieza max-sm:p-7">
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-naranja font-data text-[0.7rem] font-semibold text-negro">
        {index + 1}
      </span>
      <h3 className="text-titulo">{highlight(feature.title)}</h3>
      <p className="text-texto">{feature.body}</p>
    </article>
  );
}
