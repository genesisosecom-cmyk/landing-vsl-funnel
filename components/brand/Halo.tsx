/**
 * Halo (manual 3.3): degradado radial de Brasa al 55 % que se apaga hacia negro.
 * Un solo halo por pieza — en esta landing vive únicamente en el hero.
 */
export function Halo({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 bg-halo ${className}`}
    />
  );
}
