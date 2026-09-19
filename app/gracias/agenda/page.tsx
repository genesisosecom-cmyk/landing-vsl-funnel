import type { Metadata } from "next";
import { PantallaDeGracias } from "@/components/sections/PantallaDeGracias";

export const metadata: Metadata = {
  title: "Tu llamada quedó agendada — Génesis OS",
  robots: { index: false, follow: false },
};

/**
 * El agradecimiento del flujo de agenda, con ruta propia.
 *
 * Existe como ruta y no como `/gracias?agendado=1` porque el destino lo carga
 * una persona en el panel de GoHighLevel, y una query se puede perder: basta
 * con que el campo la recorte o con que alguien copie la URL sin ella para que
 * la cita quede sin atribución y el visitante lea el mensaje del formulario.
 * Una ruta no se recorta.
 *
 * `/gracias?agendado=1` sigue funcionando igual, por si quedó configurada así.
 */
export default async function GraciasAgenda({
  searchParams,
}: {
  searchParams: Promise<{ contact_id?: string; contactId?: string }>;
}) {
  const { contact_id, contactId } = await searchParams;
  return <PantallaDeGracias agendado contactId={contact_id ?? contactId} />;
}
