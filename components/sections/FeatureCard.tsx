import { highlight } from "@/lib/highlight";
import type { Feature } from "@/content/landing";

type Props = {
  feature: Feature;
  index: number;
};

/**
 * Tarjeta de entregable: captura arriba, texto abajo.
 *
 * La referencia usa filas en zig-zag a lo ancho. En desktop eso son seis filas
 * de ~500 px y obliga a scrollear la oferta entera; en dos columnas la misma
 * información entra en la mitad de alto y se compara de un vistazo.
 * La numeración va en Archivo, la fuente de lo que se cuenta.
 */
export function FeatureCard({ feature, index }: Props) {
  return (
    <article className="flex flex-col overflow-hidden rounded-pieza border border-linea bg-pieza">
      <img
        src={feature.media.src}
        alt={feature.media.alt}
        width={feature.media.width}
        height={feature.media.height}
        loading="lazy"
        className="aspect-[16/10] w-full border-b border-linea object-cover"
      />

      <div className="flex flex-col gap-3 p-8">
        <span className="font-data text-dato font-medium tracking-dato text-acento">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="text-titulo">{highlight(feature.title)}</h3>
        <p className="max-w-prose text-texto">{feature.body}</p>
      </div>
    </article>
  );
}
