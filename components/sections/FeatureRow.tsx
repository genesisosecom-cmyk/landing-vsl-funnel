import { highlight } from "@/lib/highlight";
import type { Feature } from "@/content/landing";

type Props = {
  feature: Feature;
  index: number;
};

/** Fila de entregable. El zig-zag sale del índice: los pares llevan el texto a la izquierda. */
export function FeatureRow({ feature, index }: Props) {
  const reversed = index % 2 === 1;

  return (
    <article className="grid overflow-hidden rounded-card bg-paper shadow-card lg:grid-cols-2">
      <div className={`flex flex-col justify-center gap-4 p-6 sm:p-8 ${reversed ? "lg:order-2" : ""}`}>
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent font-display text-xs text-ink">
          {index + 1}
        </span>
        <h3 className="text-xl leading-tight sm:text-2xl">{highlight(feature.title)}</h3>
        <p className="text-[0.95rem] leading-relaxed">{feature.body}</p>
      </div>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={feature.media.src}
        alt={feature.media.alt}
        width={feature.media.width}
        height={feature.media.height}
        loading="lazy"
        className={`h-full min-h-[240px] w-full object-cover ${reversed ? "lg:order-1" : ""}`}
      />
    </article>
  );
}
