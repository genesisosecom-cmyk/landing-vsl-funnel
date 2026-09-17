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
        page: "1240px",
        prose: "66ch",
      },
      borderRadius: {
        pieza: "0.75rem",
      },
      backgroundImage: {
        /** Halo: Brasa al 55 % que se apaga hacia negro. Uno solo por pieza (manual 3.3). */
        halo: "radial-gradient(30% 48% at 18% 26%, rgba(194,65,12,0.55) 0%, rgba(194,65,12,0.12) 46%, rgba(11,11,11,0) 72%)",
        /** Degradado Semilla: Luz → Brasa a 160°. Solo en la Semilla, solo sobre negro. */
        semilla: "linear-gradient(160deg, #FFB35C 0%, #C2410C 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
