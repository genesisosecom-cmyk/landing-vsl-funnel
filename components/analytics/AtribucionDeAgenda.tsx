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
 * Manda siempre. El no repetir lo resuelve el servidor, que descarta un aviso
 * de la misma visita dentro de la ventana: un candado en sessionStorage era
 * por pestaña, y bastaba con haber abierto esta página antes en esa misma
 * pestaña para que la reserva de verdad nunca avisara.
 */
export function AtribucionDeAgenda({ contactId }: { contactId?: string }) {
  useEffect(() => {
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
