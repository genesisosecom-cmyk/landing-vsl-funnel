"use client";

import { useEffect } from "react";
import { atribucionDeLaVisita, idDeVisita } from "@/lib/visita";

/**
 * Le manda al servidor la atribución de una cita recién reservada.
 *
 * Es el único momento del flujo de agenda en que volvemos a estar en nuestro
 * dominio con la cookie del visitante a mano: GHL lo devuelve acá después de
 * reservar, y hasta entonces todo ocurrió dentro de su iframe.
 *
 * Si el redirect de GHL trae el id del contacto, va también: con eso la unión
 * del lado del servidor es exacta en vez de por proximidad de tiempo.
 *
 * Una sola vez por reserva. Si la persona recarga la página de gracias no se
 * vuelve a mandar, porque si no estaría pisando la atribución de la cita
 * siguiente con la suya.
 */
export function AtribucionDeAgenda({ contactId }: { contactId?: string }) {
  useEffect(() => {
    const marca = "gen_cita_avisada";

    try {
      if (sessionStorage.getItem(marca)) return;
      sessionStorage.setItem(marca, "1");
    } catch {
      /* en modo privado se manda igual: perder la atribución es peor. */
    }

    fetch("/api/agenda/atribucion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        visitaId: idDeVisita(),
        contactId,
        atribucion: atribucionDeLaVisita(),
      }),
      keepalive: true,
    }).catch(() => {});
  }, [contactId]);

  return null;
}
