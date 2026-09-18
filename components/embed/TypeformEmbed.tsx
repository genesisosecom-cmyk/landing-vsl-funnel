"use client";

import { Widget } from "@typeform/embed-react";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { COOKIE_ATRIBUCION, leerAtribucion } from "@/lib/atribucion";
import { site } from "@/content/landing";

type Props = {
  /** A dónde va el visitante cuando termina el formulario. */
  destino: string;
  /** "formulario" o "agenda": el flujo del A/B, viaja como campo oculto. */
  flujo: string;
  /** "boton" o "seccion": desde qué parte de la página llegó. */
  origen: string;
  className?: string;
};

function cookie(nombre: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  return document.cookie
    .split("; ")
    .find((c) => c.startsWith(`${nombre}=`))
    ?.split("=")
    .slice(1)
    .join("=");
}

/**
 * Formulario de Typeform embebido.
 *
 * Los campos ocultos llevan la atribución hasta la respuesta: sin esto el lead
 * llega a GoHighLevel sin saber de qué anuncio vino.
 *
 * El event_id se genera acá y también viaja oculto. Cuando el webhook de
 * Typeform dispare el Lead del servidor va a usar ese mismo id, así Meta lo
 * deduplica contra el que disparamos en onSubmit.
 */
export function TypeformEmbed({ destino, flujo, origen, className = "" }: Props) {
  const router = useRouter();

  const { ocultos, eventId } = useMemo(() => {
    const a = leerAtribucion(cookie(COOKIE_ATRIBUCION));
    const id =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `lead-${Date.now()}-${Math.random().toString(36).slice(2)}`;

    return {
      eventId: id,
      ocultos: {
        utm_source: a.utmSource ?? "",
        utm_medium: a.utmMedium ?? "",
        utm_campaign: a.utmCampaign ?? "",
        utm_content: a.utmContent ?? "",
        utm_term: a.utmTerm ?? "",
        fbclid: a.fbclid ?? "",
        fbp: a.fbp ?? "",
        fbc: a.fbc ?? "",
        flujo,
        origen,
        event_id: id,
      },
    };
  }, [flujo, origen]);

  return (
    <Widget
      id={site.typeform.id}
      hidden={ocultos}
      className={className}
      onSubmit={() => {
        window.fbq?.(
          "track",
          "Lead",
          { flujo, origen, content_name: `lead_${flujo}` },
          { eventID: eventId },
        );
        router.push(destino);
      }}
    />
  );
}
