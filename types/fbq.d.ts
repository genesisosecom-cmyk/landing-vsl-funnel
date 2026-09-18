/** El píxel de Meta expone fbq() en window una vez que carga fbevents.js. */
declare global {
  interface Window {
    fbq?: (
      metodo: "init" | "track" | "trackCustom",
      evento: string,
      parametros?: Record<string, unknown>,
      opciones?: { eventID?: string },
    ) => void;
  }
}

export {};
