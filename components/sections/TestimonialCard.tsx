import { VideoFrame } from "@/components/ui/VideoFrame";
import { highlight } from "@/lib/highlight";
import type { StudentCase } from "@/content/landing";

/**
 * Tarjeta de caso. Arranca por el dato y no por cinco estrellas: la marca dice
 * "data antes que humo" y "el número al frente" (manual 1.2 y 1.3). El esquema
 * de campos es idéntico en todas, que es lo que hace comparables los casos.
 */
export function TestimonialCard({ item }: { item: StudentCase }) {
  return (
    <article className="grid gap-8 rounded-pieza border border-linea bg-pieza p-6 sm:grid-cols-[minmax(0,220px)_1fr]">
      <VideoFrame
        video={item.video}
        ratio="9/16"
        // Al apilarse en mobile, un 9:16 a ancho completo ocupa toda la pantalla.
        className="mx-auto w-full max-w-[200px] sm:max-w-none"
      />

      <div className="flex flex-col justify-center gap-4">
        <div className="flex flex-col gap-1.5">
          <span className="font-sans text-[1.75rem] font-semibold leading-none tracking-[-0.02em] text-acento">
            {item.metric.value}
          </span>
          <span className="dato">{item.metric.label}</span>
        </div>

        <h3 className="text-titulo">{highlight(item.headline)}</h3>

        <p className="max-w-prose text-texto">{item.body}</p>

        <footer className="flex flex-col gap-0.5 border-t border-linea pt-4">
          <span className="font-sans text-[0.9375rem] font-semibold text-titulo">
            {item.name}
          </span>
          <span className="dato">
            {item.country} · {item.context}
          </span>
        </footer>
      </div>
    </article>
  );
}
