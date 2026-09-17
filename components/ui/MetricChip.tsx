import type { Dato } from "@/content/landing";

/** Chip de métrica al pie de cada caso: etiqueta en gris, cifra en el acento. */
export function MetricChip({ label, value }: Dato) {
  return (
    <div className="inline-flex flex-wrap items-baseline gap-x-3 gap-y-1 rounded-lg border border-linea bg-hueso px-4 py-2.5">
      <span className="dato">{label}</span>
      <span className="font-sans text-[0.9375rem] font-semibold text-acento">{value}</span>
    </div>
  );
}
