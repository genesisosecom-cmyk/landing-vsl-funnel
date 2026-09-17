import { Fragment, type ReactNode } from "react";

/**
 * Convierte "El mes arranca *cobrado*" en texto con las palabras entre
 * asteriscos en el color de acento de la sección: Naranja Génesis sobre negro,
 * Brasa sobre hueso (manual 2.4 — el naranja no tiene contraste sobre claro).
 *
 * El manual lo limita a palabras sueltas y grandes; no usar en texto corrido.
 */
export function highlight(text: string): ReactNode[] {
  return text
    .split(/(\*[^*]+\*)/g)
    .filter(Boolean)
    .map((part, i) =>
      part.startsWith("*") && part.endsWith("*") ? (
        <span key={i} className="text-acento">
          {part.slice(1, -1)}
        </span>
      ) : (
        <Fragment key={i}>{part}</Fragment>
      ),
    );
}
