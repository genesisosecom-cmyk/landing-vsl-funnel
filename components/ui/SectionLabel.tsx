/** Píldora de sección, como en la referencia. Texto en Archivo y color de acento. */
export function SectionLabel({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-naranja/35 bg-naranja/10 px-4 py-1.5 font-data text-dato font-medium uppercase tracking-dato text-acento">
      {children}
    </span>
  );
}
