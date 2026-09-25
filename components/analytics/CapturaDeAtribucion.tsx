"use client";

import { useEffect } from "react";
import { anotarEvento, atribucionDeLaUrl, leerCookie as cookie } from "@/lib/visita";
import {
  COOKIE_ATRIBUCION,
  DIAS_DE_VIDA,
  esFlujo,
  leerAtribucion,
  serializarAtribucion,
  type Atribucion,
} from "@/lib/atribucion";

/**
 * Guarda el origen de la visita en una cookie propia y la anota en el panel.
 *
 * Corre en el cliente porque necesita las cookies que deja el píxel (_fbp y
 * _fbc), que el servidor no ve en la primera carga. Solo escribe si la cookie
 * está vacía: first-touch.
 */
export function CapturaDeAtribucion() {
  useEffect(() => {
    const guardada = leerAtribucion(cookie(COOKIE_ATRIBUCION));
    const nueva: Atribucion = atribucionDeLaUrl();

    // Ya hay origen guardado y esta visita no trae uno nuevo: no se toca.
    const hayOrigenNuevo = Boolean(nueva.utmSource || nueva.fbclid);
    if (Object.keys(guardada).length > 0 && !hayOrigenNuevo) return;

    const limpia = Object.fromEntries(
      Object.entries({ ...guardada, ...nueva }).filter(([, v]) => v),
    ) as Atribucion;

    document.cookie = [
      `${COOKIE_ATRIBUCION}=${serializarAtribucion(limpia)}`,
      "path=/",
      `max-age=${DIAS_DE_VIDA * 24 * 60 * 60}`,
      "SameSite=Lax",
    ].join("; ");
  }, []);

  // La visita se anota aparte del first-touch: la cookie guarda el primer
  // origen una sola vez, pero cada llegada a la página es una fila del panel.
  // sessionStorage evita contar de nuevo al volver atrás o recargar.
  useEffect(() => {
    /*
     * Sólo cuenta como visita la landing. /gracias y /privacidad también montan
     * esto —el píxel tiene que disparar ahí— pero anotarlas sumaba una visita
     * de más al creativo cada vez que alguien convertía: el denominador del
     * embudo crecía justo con las conversiones.
     */
    const flujo = window.location.pathname.replace(/^\//, "").split("/")[0];
    if (!esFlujo(flujo)) return;

    try {
      if (sessionStorage.getItem("gen_visita_anotada")) return;
      sessionStorage.setItem("gen_visita_anotada", "1");
    } catch {
      /* modo privado: preferimos anotar de más antes que no anotar. */
    }

    // Los UTM los agrega anotarEvento para todos los eventos por igual.
    const a = leerAtribucion(cookie(COOKIE_ATRIBUCION));
    anotarEvento("visita", {
      flujo,
      detalle: { landing: window.location.pathname, referrer: a.referrer ?? "" },
    });
  }, []);

  return null;
}
