"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { atribucionDeLaVisita } from "@/lib/visita";
import { aplicar } from "@/content/landing";

/**
 * El calendario de GoHighLevel, embebido en la landing.
 *
 * En el flujo de agenda no hay formulario previo: el visitante elige horario y
 * completa los datos en el formulario del propio calendario, que es el que
 * crea el contacto en GHL.
 *
 * Por eso la atribución tiene que viajar en la URL del iframe: es lo único que
 * cruza hacia el lado de GHL. Sin estos parámetros el contacto se crea sin
 * origen y la agenda queda sin anuncio.
 *
 * El src se arma en el cliente porque la atribución sólo existe ahí. Hasta que
 * monta se muestra el marco vacío: cargar el iframe dos veces (una sin UTM y
 * otra con) haría que GHL registre la primera visita sin atribución.
 */
export function CalendarioGhl({ className = "" }: { className?: string }) {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    const a = atribucionDeLaVisita();
    const url = new URL(aplicar.calendario.url);

    const parametros: Record<string, string | undefined> = {
      utm_source: a.utmSource,
      utm_medium: a.utmMedium,
      utm_campaign: a.utmCampaign,
      utm_content: a.utmContent,
      utm_term: a.utmTerm,
      fbclid: a.fbclid,
    };

    for (const [clave, valor] of Object.entries(parametros)) {
      if (valor) url.searchParams.set(clave, valor);
    }

    setSrc(url.toString());
  }, []);

  return (
    <div className={className}>
      {src && (
        <iframe
          src={src}
          title="Calendario de Génesis OS"
          scrolling="no"
          // Lo trae el snippet que genera GHL: el calendario puede cobrar seña.
          allow="payment"
          className="h-full min-h-[760px] w-full"
        />
      )}
      {/* Ajusta el alto del iframe al del calendario. */}
      <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="afterInteractive" />
    </div>
  );
}
