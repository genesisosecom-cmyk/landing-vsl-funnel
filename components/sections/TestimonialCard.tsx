import { MetricChip } from "@/components/ui/MetricChip";
import { Stars } from "@/components/ui/Stars";
import { VideoFrame } from "@/components/ui/VideoFrame";
import { highlight } from "@/lib/highlight";
import type { StudentCase } from "@/content/landing";

/**
 * Tarjeta de alumno. Los seis campos van siempre en el mismo orden: el formato
 * fijo es lo que hace comparables los casos entre sí.
 */
export function TestimonialCard({ item }: { item: StudentCase }) {
  return (
    <article className="grid gap-6 rounded-card bg-paper p-5 shadow-card sm:grid-cols-[minmax(0,220px)_1fr] sm:p-6">
      <VideoFrame
        video={item.video}
        ratio="9/16"
        // Al apilarse en mobile, un 9:16 a ancho completo ocupa toda la pantalla.
        className="mx-auto w-full max-w-[200px] sm:max-w-none"
      />

      <div className="flex flex-col justify-center gap-3">
        <Stars />

        <div className="flex flex-col gap-1">
          <h3 className="font-display text-sm uppercase tracking-label text-ink">
            {item.name} &mdash; {item.country}
          </h3>
          <p className="text-xs text-body">{item.context}</p>
        </div>

        <p className="text-xl leading-tight sm:text-2xl">
          <span className="font-display text-ink">{highlight(item.headline)}</span>
        </p>

        <p className="text-[0.95rem] leading-relaxed">{item.body}</p>

        <div className="pt-1">
          <MetricChip label={item.metric.label} value={item.metric.value} />
        </div>
      </div>
    </article>
  );
}
