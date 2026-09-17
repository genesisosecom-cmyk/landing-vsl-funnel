import type { ReactNode } from "react";

type Props = {
  id?: string;
  /** Negro 55 · Hueso 30 es la proporción del manual (2.4). */
  tono?: "negro" | "hueso";
  className?: string;
  children: ReactNode;
};

export function Section({ id, tono = "negro", className = "", children }: Props) {
  // Literales a propósito: Tailwind purga las clases de @layer components que no
  // encuentra escritas tal cual, y `tono-${tono}` no las deja ver.
  const clase = tono === "hueso" ? "tono-hueso" : "tono-negro";

  return (
    <section id={id} className={`${clase} border-t border-linea bg-tono text-texto ${className}`}>
      <div className="container-page section-pad">{children}</div>
    </section>
  );
}
