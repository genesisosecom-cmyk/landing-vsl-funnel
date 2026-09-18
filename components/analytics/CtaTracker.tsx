"use client";

import { useEffect } from "react";
import { anotarEvento } from "@/lib/visita";

/**
 * Dispara InitiateCheckout cuando alguien hace click en el CTA, y lo anota en
 * el panel de tracking.
 *
 * Va por delegación en document en vez de un onClick en el botón: así CtaButton
 * sigue siendo un componente de servidor y cualquier CTA que se agregue después
 * queda medido sin tocar nada.
 *
 * Manda la posición del botón en content_name (cta_1 es el del hero, cta_5 el
 * del cierre): es lo que después permite ver desde qué punto de la página
 * convierte la gente. Va por posición y no por sección porque las bandas de
 * CTA no tienen id propio.
 */
export function CtaTracker() {
  useEffect(() => {
    function alClickear(evento: MouseEvent) {
      const destino = evento.target as HTMLElement | null;
      const cta = destino?.closest?.('[data-cta="primary"]');
      if (!cta) return;

      const posicion = Array.from(document.querySelectorAll('[data-cta="primary"]')).indexOf(cta) + 1;
      window.fbq?.("track", "InitiateCheckout", { content_name: `cta_${posicion}` });

      anotarEvento("cta_click", {
        flujo: window.location.pathname.replace(/^\//, "").split("/")[0],
        detalle: { posicion },
      });
    }

    // capture: el evento se registra aunque algo más cancele el click después.
    document.addEventListener("click", alClickear, { capture: true });
    return () => document.removeEventListener("click", alClickear, { capture: true });
  }, []);

  return null;
}
