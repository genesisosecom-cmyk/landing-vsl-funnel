import { highlight } from "@/lib/highlight";
import type { Feature } from "@/content/landing";

type Props = {
  feature: Feature;
  index: number;
};

/**
 * Fila de entregable en zig-zag, como en la referencia: el índice decide de qué
 * lado va el texto, y la captura llega al borde de la tarjeta.
 */
export function FeatureRow({ feature, index }: Props) {
  const invertida = index % 2 === 1;

  return (
    <article className="grid overflow-hidden rounded-pieza bg-pieza shadow-pieza lg:grid-cols-2">
      <div className={`flex flex-col justify-center gap-4 p-10 ${invertida ? "lg:order-2" : ""}`}>
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-naranja font-data text-[0.7rem] font-semibold text-negro">
          {index + 1}
        </span>
        <h3 className="text-titulo">{highlight(feature.title)}</h3>
        <p className="max-w-prose text-texto">{feature.body}</p>
      </div>

      <img
        src={feature.media.src}
        alt={feature.media.alt}
        width={feature.media.width}
        height={feature.media.height}
        loading="lazy"
        className={`h-full min-h-[260px] w-full object-cover ${invertida ? "lg:order-1" : ""}`}
      />
    </article>
  );
}
