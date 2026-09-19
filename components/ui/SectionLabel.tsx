/**
 * Píldora de sección. Lleva un punto naranja adelante —la Semilla en miniatura—
 * para que la etiqueta sea de la marca y no una píldora genérica.
 */
export function SectionLabel({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center gap-2.5 rounded-full border border-naranja/25 bg-naranja/[0.07] py-1.5 pl-3.5 pr-4 font-data text-dato font-medium uppercase tracking-dato text-acento">
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-naranja shadow-[0_0_8px_rgba(240,100,30,0.7)]" />
      {children}
    </span>
  );
}
