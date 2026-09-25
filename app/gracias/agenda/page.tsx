import type { Metadata } from "next";
import { PantallaDeGracias } from "@/components/sections/PantallaDeGracias";

export const metadata: Metadata = {
  title: "Tu llamada quedó agendada — Génesis OS",
  robots: { index: false, follow: false },
};

/**
 * El agradecimiento de quien reserva una llamada.
 *
 * Es el redirect que tiene configurado el calendario de GHL. Ya no es el cierre
 * de una variante de la landing —esa se dio de baja—, pero la llamada se sigue
 * agendando en ese calendario después del WhatsApp, así que la pantalla tiene
 * que existir y decir lo que corresponde.
 *
 * Es una ruta y no `/gracias?agendado=1` porque el destino lo carga una persona
 * en el panel de GHL, y una query se puede perder: basta con que el campo la
 * recorte o con que alguien copie la URL sin ella para que el visitante lea el
 * mensaje del formulario después de haber reservado.
 */
export default function GraciasAgenda() {
  return <PantallaDeGracias agendado />;
}
