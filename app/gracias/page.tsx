import type { Metadata } from "next";
import { PantallaDeGracias } from "@/components/sections/PantallaDeGracias";

export const metadata: Metadata = {
  title: "Gracias — Génesis OS",
  robots: { index: false, follow: false },
};

/** El cierre del flujo de formulario. La agenda tiene su propia ruta. */
export default async function Gracias({
  searchParams,
}: {
  searchParams: Promise<{ agendado?: string; contact_id?: string; contactId?: string }>;
}) {
  const { agendado, contact_id, contactId } = await searchParams;

  return (
    <PantallaDeGracias agendado={agendado === "1"} contactId={contact_id ?? contactId} />
  );
}
