import { Fragment, type ReactNode } from "react";

/**
 * Convierte "escalar a *$100k/mes*" en texto con las palabras entre asteriscos
 * pintadas en el color de acento. Usar `tone="ink"` cuando el texto es chico:
 * el verde claro no alcanza el contraste AA por debajo de 24px.
 */
export function highlight(text: string, tone: "head" | "ink" = "head"): ReactNode[] {
  const color = tone === "head" ? "text-accent-head" : "text-accent-ink";

  return text
    .split(/(\*[^*]+\*)/g)
    .filter(Boolean)
    .map((part, i) =>
      part.startsWith("*") && part.endsWith("*") ? (
        <span key={i} className={color}>
          {part.slice(1, -1)}
        </span>
      ) : (
        <Fragment key={i}>{part}</Fragment>
      ),
    );
}
