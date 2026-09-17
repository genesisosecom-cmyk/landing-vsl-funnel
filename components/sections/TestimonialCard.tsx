import { MetricChip } from "@/components/ui/MetricChip";
import { Stars } from "@/components/ui/Stars";
import { VideoFrame } from "@/components/ui/VideoFrame";
import { highlight } from "@/lib/highlight";
import type { StudentCase } from "@/content/landing";

/**
 * Tarjeta de caso, con el esquema de campos de la referencia: estrellas, nombre
 * y país, línea de contexto, titular con la cifra, cuerpo y chip de métrica.
 * Idéntico en todas: es lo que hace comparables los casos entre sí.
 */
export function TestimonialCard({ item }: { item: StudentCase }) {
  return (
    <article className="grid gap-6 rounded-pieza bg-pieza p-5 shadow-pieza sm:grid-cols-[minmax(0,220px)_1fr] sm:p-6">
      <VideoFrame
        video={item.video}
        ratio="9/16"
        // Al apilarse en mobile, un 9:16 a ancho completo ocupa toda la pantalla.
        className="mx-auto w-full max-w-[200px] sm:max-w-none"
      />

      <div className="flex flex-col justify-center gap-3">
        <Stars />

        <div className="flex flex-col gap-1">
          <h3 className="font-data text-dato font-semibold uppercase tracking-dato text-titulo">
            {item.name} &mdash; {item.country}
          </h3>
          <p className="text-[0.8125rem] text-sutil">{item.context}</p>
        </div>

        <p className="font-sans text-h3 font-medium text-titulo">{highlight(item.headline)}</p>

        <p className="max-w-prose text-texto">{item.body}</p>

        <div className="pt-1">
          <MetricChip {...item.metric} />
        </div>
      </div>
    </article>
  );
}
