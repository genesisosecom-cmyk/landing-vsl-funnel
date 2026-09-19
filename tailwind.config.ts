import type { Config } from "tailwindcss";

/**
 * Tokens del Manual de Marca Génesis OS v2.0.
 * Ningún valor de color ni de tipografía se define fuera de este archivo.
 *
 * Proporción de uso (manual 2.4): Negro 55 · Hueso y blanco 30 · Grises 10 · Naranja 5.
 * El naranja se nota porque es poco: solo Semilla, acentos, subrayados y botones.
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
        negro: "#0B0B0B",
        carbon: "#2E2E2E",
        blanco: "#FFFFFF",
        hueso: "#F4F2EF",
        arena: "#E6E2DD",
        /** Naranja Génesis: acentos sobre oscuro y fondo de botón. Nunca texto corrido. */
        naranja: "#F0641E",
        /** Brasa: el naranja legible sobre claro, y el hover del botón. */
        brasa: "#C2410C",
        /** Luz: extremo claro del degradado de la Semilla. Nunca sola. */
        luz: "#FFB35C",
        gris: {
          calido: "#7A7370",
          claro: "#BDB7B2",
        },
        anotacion: "#D42A2A",
      },
      fontFamily: {
        /** Todo lo que se lee. Es la fuente del logotipo. */
        sans: ["var(--font-montserrat)", "system-ui", "sans-serif"],
        /** Todo lo que se mide: etiquetas, datos, captions, numeración. */
        data: ["var(--font-archivo)", "ui-monospace", "monospace"],
      },
      fontSize: {
        // Jerarquía del manual 2.5, en los valores de pantalla.
        h1: ["4rem", { lineHeight: "1.05", letterSpacing: "-0.015em" }],
        h2: ["1.875rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        h3: ["1.375rem", { lineHeight: "1.25", letterSpacing: "-0.01em" }],
        cuerpo: ["1.0625rem", { lineHeight: "1.6" }],
        cifra: ["6rem", { lineHeight: "1", letterSpacing: "-0.02em" }],
        dato: ["0.75rem", { lineHeight: "1.4", letterSpacing: "0.1em" }],
      },
      letterSpacing: {
        dato: "0.1em",
        wordmark: "0.13em",
      },
      maxWidth: {
        page: "1320px",
        prose: "66ch",
      },
      borderRadius: {
        pieza: "1.25rem",
        cta: "0.625rem",
      },
      boxShadow: {
        pieza: "0 18px 50px -24px rgba(11, 11, 11, 0.25)",
        "pieza-alta": "0 30px 70px -30px rgba(11, 11, 11, 0.35)",
        /** Para fotos y capturas: más larga y con un toque cálido. */
        foto: "0 40px 90px -40px rgba(11, 11, 11, 0.45), 0 12px 30px -20px rgba(194, 65, 12, 0.25)",
        /** El marco del VSL: sombra profunda más un aro de luz naranja tenue. */
        marco: "0 50px 120px -40px rgba(11, 11, 11, 0.6), 0 0 0 1px rgba(240, 100, 30, 0.25), 0 0 80px -20px rgba(240, 100, 30, 0.35)",
        cta: "0 14px 30px -12px rgba(194, 65, 12, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.28)",
        "cta-hover": "0 20px 40px -14px rgba(194, 65, 12, 0.65), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
      },
      backgroundImage: {
        /** El botón: naranja arriba, apenas más oscuro abajo. Da volumen sin verse plástico. */
        cta: "linear-gradient(180deg, #F0641E 0%, #E4581A 100%)",
        "cta-hover": "linear-gradient(180deg, #D04A10 0%, #C2410C 100%)",
      },
      transitionTimingFunction: {
        suave: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
