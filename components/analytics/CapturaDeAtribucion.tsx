"use client";

import { useEffect } from "react";
import { anotarEvento } from "@/lib/visita";
import {
  COOKIE_ATRIBUCION,
  DIAS_DE_VIDA,
  leerAtribucion,
  serializarAtribucion,
  type Atribucion,
} from "@/lib/atribucion";

function cookie(nombre: string): string | undefined {
  return document.cookie
    .split("; ")
    .find((c) => c.startsWith(`${nombre}=`))
    ?.split("=")
    .slice(1)
    .join("=");
}

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
    const parametros = new URLSearchParams(window.location.search);
    const fbclid = parametros.get("fbclid") ?? undefined;

    const nueva: Atribucion = {
      utmSource: parametros.get("utm_source") ?? undefined,
      utmMedium: parametros.get("utm_medium") ?? undefined,
      utmCampaign: parametros.get("utm_campaign") ?? undefined,
      utmContent: parametros.get("utm_content") ?? undefined,
      utmTerm: parametros.get("utm_term") ?? undefined,
      fbclid,
      fbp: cookie("_fbp"),
      // _fbc la arma el píxel a partir del fbclid, pero puede tardar: si no
      // está todavía, la construimos con el formato que espera Meta.
      fbc: cookie("_fbc") ?? (fbclid ? `fb.1.${Date.now()}.${fbclid}` : undefined),
      referrer: document.referrer || undefined,
      landing: window.location.pathname,
      desde: new Date().toISOString(),
    };

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
    try {
      if (sessionStorage.getItem("gen_visita_anotada")) return;
      sessionStorage.setItem("gen_visita_anotada", "1");
    } catch {
      /* modo privado: preferimos anotar de más antes que no anotar. */
    }

    const a = leerAtribucion(cookie(COOKIE_ATRIBUCION));
    anotarEvento("visita", {
      flujo: window.location.pathname.replace(/^\//, "").split("/")[0],
      detalle: {
        landing: window.location.pathname,
        utm_source: a.utmSource ?? "",
        utm_campaign: a.utmCampaign ?? "",
        utm_content: a.utmContent ?? "",
        referrer: a.referrer ?? "",
      },
    });
  }, []);

  return null;
}
