import { Semilla } from "./Semilla";

/**
 * Campo de semillas (manual 3.3): Semillas planas en retícula al tresbolillo,
 * naranja al 12 % con algunas al 28 %. Sirve de separador; nunca va detrás de
 * texto corrido, por eso acá es una franja sin contenido encima.
 */
export function CampoDeSemillas({ className = "" }: { className?: string }) {
  const filas = [0, 1, 2];
  const columnas = Array.from({ length: 18 }, (_, i) => i);

  return (
    <div aria-hidden="true" className={`flex flex-col gap-6 overflow-hidden py-8 ${className}`}>
      {filas.map((fila) => (
        <div key={fila} className="flex justify-center gap-10" style={{ marginLeft: fila % 2 ? "2.5rem" : 0 }}>
          {columnas.map((col) => (
            <Semilla
              key={col}
              variant="plana"
              className="h-5 w-auto shrink-0"
              style={{ opacity: (fila * 7 + col * 5) % 11 === 0 ? 0.28 : 0.12 }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
