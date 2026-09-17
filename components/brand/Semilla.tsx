/**
 * La Semilla (manual 2.1).
 *
 * No es una elipse: es la intersección exacta de dos círculos de radio R con
 * los centros separados 1,18 R. Sobre caja de 100, R = 34 y los centros van en
 * x = 30 y x = 70, lo que da una lente de 28 × 55 centrada.
 */
const LENTE = "M50 22.5 A34 34 0 0 1 50 77.5 A34 34 0 0 1 50 22.5 Z";

import type { CSSProperties } from "react";

type Props = {
  /**
   * principal = degradado Luz → Brasa con halo; solo sobre negro y a 48 px o más.
   * plana = Naranja Génesis sólido; fondos claros y tamaños chicos.
   * mono = una tinta, toma el color del texto.
   */
  variant?: "principal" | "plana" | "mono";
  className?: string;
  style?: CSSProperties;
  title?: string;
};

export function Semilla({ variant = "plana", className = "", style, title }: Props) {
  const id = `semilla-${variant}`;

  return (
    <svg
      viewBox="30 16 40 68"
      className={className}
      style={style}
      role={title ? "img" : "presentation"}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {variant === "principal" ? (
        <defs>
          <linearGradient id={`${id}-grad`} x1="0" y1="0" x2="0.35" y2="1">
            <stop offset="0%" stopColor="#FFB35C" />
            <stop offset="100%" stopColor="#C2410C" />
          </linearGradient>
          {/* Halo: desenfoque del 7 % del alto de la caja, opacidad 85 %. */}
          <filter id={`${id}-halo`} x="-80%" y="-40%" width="260%" height="180%">
            <feGaussianBlur stdDeviation="4.8" />
          </filter>
        </defs>
      ) : null}

      {variant === "principal" ? (
        <path d={LENTE} fill="#C2410C" opacity="0.85" filter={`url(#${id}-halo)`} />
      ) : null}

      <path
        d={LENTE}
        fill={
          variant === "principal"
            ? `url(#${id}-grad)`
            : variant === "plana"
              ? "#F0641E"
              : "currentColor"
        }
      />
    </svg>
  );
}
