"use client";

import { useState } from "react";
import { aplicar } from "@/content/landing";
import type { Variante } from "@/lib/atribucion";
import { AgendaGhl } from "./AgendaGhl";

type Estado = "formulario" | "enviando" | "listo";

/**
 * Formulario de la página de aplicación.
 *
 * Es propio y no el embed de GHL a propósito: así el envío pasa por nuestro
 * servidor y el evento Lead se puede disparar por las dos vías (navegador y
 * Conversions API) con el mismo eventId. Con el iframe de GHL el envío no se
 * ve desde la página y el evento habría que adivinarlo.
 *
 * La atribución no viaja en el formulario: está en una cookie propia que el
 * navegador manda sola en el POST.
 */
export function FormularioLead({ variante }: { variante: Variante }) {
  const [estado, setEstado] = useState<Estado>("formulario");
  const [error, setError] = useState<string | null>(null);
  const [datos, setDatos] = useState({ nombre: "", email: "", telefono: "" });

  async function enviar(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setEstado("enviando");
    setError(null);

    // Mismo id en el evento del navegador y en el del servidor: Meta deduplica.
    const eventId =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `lead-${Date.now()}-${Math.random().toString(36).slice(2)}`;

    try {
      const respuesta = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...datos, eventId }),
      });

      if (!respuesta.ok) throw new Error(String(respuesta.status));

      window.fbq?.("track", "Lead", { variante, content_name: `lead_${variante}` }, { eventID: eventId });
      setEstado("listo");
    } catch {
      setError(aplicar.formulario.error);
      setEstado("formulario");
    }
  }

  if (estado === "listo") {
    return variante === "agenda" ? (
      <AgendaGhl {...datos} />
    ) : (
      <div className="flex flex-col items-center gap-3 rounded-pieza border border-linea bg-pieza p-10 text-center">
        <h2 className="text-titulo">{aplicar.contacto.graciasTitulo}</h2>
        <p className="max-w-prose text-texto">{aplicar.contacto.graciasTexto}</p>
      </div>
    );
  }

  const campo =
    "w-full rounded-cta border border-linea bg-pieza px-4 py-3.5 text-cuerpo text-titulo outline-none placeholder:text-sutil focus:border-naranja";

  return (
    <form onSubmit={enviar} className="flex w-full max-w-md flex-col gap-3">
      <input
        type="text"
        name="name"
        autoComplete="name"
        required
        minLength={2}
        placeholder={aplicar.formulario.nombre}
        className={campo}
        value={datos.nombre}
        onChange={(e) => setDatos({ ...datos, nombre: e.target.value })}
      />
      <input
        type="email"
        name="email"
        autoComplete="email"
        required
        placeholder={aplicar.formulario.email}
        className={campo}
        value={datos.email}
        onChange={(e) => setDatos({ ...datos, email: e.target.value })}
      />
      <input
        type="tel"
        name="tel"
        autoComplete="tel"
        required
        placeholder={aplicar.formulario.telefono}
        className={campo}
        value={datos.telefono}
        onChange={(e) => setDatos({ ...datos, telefono: e.target.value })}
      />

      {error ? <p className="text-[0.875rem] text-anotacion">{error}</p> : null}

      <button
        type="submit"
        disabled={estado === "enviando"}
        className="mt-1 inline-flex items-center justify-center gap-3 rounded-cta bg-naranja px-8 py-4 font-data text-[0.875rem] font-semibold uppercase tracking-dato text-negro transition-colors hover:bg-brasa hover:text-blanco disabled:opacity-60"
      >
        {estado === "enviando" ? aplicar.formulario.enviando : aplicar.formulario.enviar}
        <span aria-hidden="true">&rarr;</span>
      </button>

      <p className="text-[0.75rem] leading-relaxed text-sutil">{aplicar.legal}</p>
    </form>
  );
}
