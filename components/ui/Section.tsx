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

export function Section({ id, tono = "blanco", pad = "normal", className = "", children }: Props) {
  return (
    <section
      id={id}
      className={`${CLASES[tono]} border-t border-linea bg-tono text-texto ${className}`}
    >
      <div className={`container-page ${pad === "chico" ? "py-12" : "section-pad"}`}>{children}</div>
    </section>
  );
}
