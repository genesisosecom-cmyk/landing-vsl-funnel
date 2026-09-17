import type { Config } from "tailwindcss";

/**
 * Design tokens de la landing. Cambiar la marca = cambiar `accent` y las fuentes
 * en app/layout.tsx. Nada más debería tocarse para un rebrand.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0a0a0a",
        frame: "#0a0a0a",
        paper: "#ffffff",
        mint: "#eef5ef",
        /**
         * Tres verdes por contraste, no por capricho:
         * - DEFAULT: solo rellenos (botón, badges, estrellas) — texto oscuro encima.
         * - head:    texto verde de 24px+ en negrita (AA large sobre blanco).
         * - ink:     texto verde chico (AA normal sobre blanco).
         */
        accent: {
          DEFAULT: "#3ecf4c",
          hover: "#35bf43",
          head: "#22a03a",
          ink: "#1a8230",
          50: "#eafaec",
        },
        body: "#565c63",
        hairline: "#e6e9e6",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        page: "1180px",
        prose: "620px",
      },
      borderRadius: {
        card: "1.25rem",
        cta: "0.625rem",
      },
      boxShadow: {
        card: "0 18px 50px -24px rgba(10, 10, 10, 0.25)",
        cta: "0 10px 24px -10px rgba(47, 184, 65, 0.7)",
      },
      letterSpacing: {
        label: "0.18em",
      },
    },
  },
  plugins: [],
};

export default config;
