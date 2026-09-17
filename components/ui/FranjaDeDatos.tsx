import type { Dato } from "@/content/landing";

type Props = {
  datos: Dato[];
  /** grande = franja del hero · chico = dentro de una tarjeta. */
  tamano?: "grande" | "chico";
  className?: string;
};

/**
 * Franja de datos (manual 4.4): la cifra en el color de título, la etiqueta en
 * Archivo gris cálido. Un dato por columna, sin adornos.
 */
export function FranjaDeDatos({ datos, tamano = "grande", className = "" }: Props) {
  const cifra = tamano === "grande" ? "text-[2rem]" : "text-[1.5rem]";
  // Literales: Tailwind no ve las clases armadas por interpolación.
  const columnas =
    { 1: "grid-cols-1", 2: "grid-cols-2", 3: "grid-cols-3" }[datos.length] ?? "grid-cols-4";

  return (
    <dl className={`grid ${columnas} gap-x-8 gap-y-6 max-sm:grid-cols-1 ${className}`}>
      {datos.map((d) => (
        <div key={d.label} className="flex flex-col gap-1.5">
          <dd
            className={`font-sans font-semibold leading-none tracking-[-0.02em] text-titulo ${cifra}`}
          >
            {d.value}
          </dd>
          <dt className="dato">{d.label}</dt>
        </div>
      ))}
    </dl>
  );
}
