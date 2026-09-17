/**
 * Eyebrow en Archivo, mayúsculas, tracking +10 %, en el acento de la sección
 * (manual 4.4). Sin píldora ni contenedor: el manual no los usa.
 */
export function Eyebrow({ children }: { children: string }) {
  return (
    <span className="font-data text-dato font-medium uppercase tracking-dato text-acento">
      {children}
    </span>
  );
}
