import type { ReactNode } from "react";

export type Tono = "blanco" | "hueso" | "negro";

type Props = {
  id?: string;
  tono?: Tono;
  /** "chico" es para las bandas de CTA, que solo llevan el botón. */
  pad?: "normal" | "chico";
  className?: string;
  children: ReactNode;
};

/** Literales a propósito: Tailwind purga las clases que no ve escritas tal cual. */
const CLASES: Record<Tono, string> = {
  blanco: "tono-blanco",
  hueso: "tono-hueso",
  negro: "tono-negro",
};

/**
 * Cada sección declara su tono y se separa de la anterior con un divisor que
 * se desvanece en los bordes: la línea de lado a lado cortaba la página en
 * franjas, y el ojo se frenaba en cada una.
 */
export function Section({ id, tono = "blanco", pad = "normal", className = "", children }: Props) {
  return (
    <section id={id} className={`${CLASES[tono]} relative bg-tono text-texto ${className}`}>
      <span aria-hidden="true" className="divisor" />
      <div className={`container-page relative ${pad === "chico" ? "py-16" : "section-pad"}`}>
        {children}
      </div>
    </section>
  );
}
