import type { Dato } from "@/content/landing";

/**
 * Ficha de métrica. La cifra grande, en Archivo, arriba; la etiqueta chica
 * abajo. Antes era una píldora con los dos en una línea y la cifra —que es lo
 * que vale— se leía al mismo tamaño que la etiqueta.
 */
export function MetricChip({ label, value }: Dato) {
  return (
    <div className="flex flex-col gap-1.5 rounded-xl border border-linea bg-hueso px-5 py-4">
      <span className="font-data text-[1.625rem] font-semibold leading-none tracking-[-0.02em] text-acento">
        {value}
      </span>
      <span className="dato">{label}</span>
    </div>
  );
}
