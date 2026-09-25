import type { Metadata } from "next";
import { PantallaDeGracias } from "@/components/sections/PantallaDeGracias";

export const metadata: Metadata = {
  title: "Gracias — Génesis OS",
  robots: { index: false, follow: false },
};

/**
 * El cierre del formulario.
 *
 * `?agendado=1` sigue reconocido por si quedó configurado así en GHL: el que
 * reserva una llamada tiene su mensaje propio, y su ruta propia en
 * /gracias/agenda.
 */
export default async function Gracias({
  searchParams,
}: {
  searchParams: Promise<{ agendado?: string }>;
}) {
  const { agendado } = await searchParams;

  return <PantallaDeGracias agendado={agendado === "1"} />;
}
