import { Fragment, type ReactNode } from "react";

/**
 * Convierte "El mes arranca *cobrado*" en texto con las palabras entre
 * asteriscos en el color de acento de la sección: Naranja Génesis sobre negro,
 * Brasa sobre hueso (manual 2.4 — el naranja no tiene contraste sobre claro).
 *
 * El manual lo limita a palabras sueltas y grandes; no usar en texto corrido.
 *
 * Con `subrayado` la palabra lleva además un trazo naranja tenue por debajo.
 * Es para el título del hero, donde hay una sola frase de acento y el trazo la
 * hace mirar primero; repetido en cada tarjeta sería ruido.
 */
export function highlight(text: string, opciones: { subrayado?: boolean } = {}): ReactNode[] {
  const clase = opciones.subrayado ? "text-acento subrayado" : "text-acento";

  return text
    .split(/(\*[^*]+\*)/g)
    .filter(Boolean)
    .map((part, i) =>
      part.startsWith("*") && part.endsWith("*") ? (
        <span key={i} className={clase}>
          {part.slice(1, -1)}
        </span>
      ) : (
        <Fragment key={i}>{part}</Fragment>
      ),
    );
}
