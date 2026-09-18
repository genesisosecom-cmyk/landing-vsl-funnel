"use client";

import Script from "next/script";
import { aplicar } from "@/content/landing";

type Props = {
  nombre: string;
  email: string;
  telefono: string;
};

/**
 * Calendario de GoHighLevel, con los datos del lead ya cargados.
 *
 * El form_embed de GHL es el que ajusta la altura del iframe al alto real del
 * calendario; sin él queda cortado o con un hueco.
 */
export function AgendaGhl({ nombre, email, telefono }: Props) {
  const [primero, ...resto] = nombre.trim().split(/\s+/);
  const parametros = new URLSearchParams({
    first_name: primero ?? "",
    last_name: resto.join(" "),
    email,
    phone: telefono,
  });

  return (
    <div className="flex w-full flex-col gap-5">
      <h2 className="text-center text-titulo">{aplicar.agenda.tituloAgenda}</h2>

      <iframe
        src={`${aplicar.calendario.url}?${parametros.toString()}`}
        title="Calendario de Génesis OS"
        scrolling="no"
        className="min-h-[760px] w-full rounded-pieza border border-linea bg-pieza"
      />

      <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="afterInteractive" />
    </div>
  );
}
