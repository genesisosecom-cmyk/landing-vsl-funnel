import { Semilla } from "./Semilla";

type Props = {
  /** claro = sobre negro · oscuro = sobre hueso o blanco. */
  tone?: "claro" | "oscuro";
  className?: string;
};

/**
 * Logotipo horizontal (manual 2.1): Semilla + GENESIS OS.
 *
 * Proporciones del manual: la Semilla mide 1,87 veces la altura de mayúsculas y
 * se separa de la palabra 0,55 de esa altura. Acá todo se deriva del font-size
 * del contenedor, así que escala con una sola clase.
 *
 * TODO(marca): el wordmark oficial está en curvas en Logo-Genesis-OS/marca/
 * (wordmark_blanco.svg / _negro.svg). Esto es la reconstrucción tipográfica
 * mientras no esté el archivo: misma familia, mismos pesos, mismo tracking.
 */
export function Logotipo({ tone = "claro", className = "" }: Props) {
  const texto = tone === "claro" ? "text-blanco" : "text-negro";

  return (
    <span
      className={`inline-flex items-center ${texto} ${className}`}
      style={{ gap: "0.385em" }}
    >
      <Semilla
        variant={tone === "claro" ? "principal" : "plana"}
        title="Génesis OS"
        className="w-auto shrink-0"
        style={{ height: "1.31em" }}
      />
      <span className="font-sans leading-none">
        <span className="font-light tracking-wordmark">GENESIS</span>
        <span className="font-semibold tracking-wordmark"> OS</span>
      </span>
    </span>
  );
}
