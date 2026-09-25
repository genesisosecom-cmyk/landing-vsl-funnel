import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Acceso } from "@/components/tracking/Acceso";
import { Panel } from "@/components/tracking/Panel";
import { eventosDeVisitas, hayBase, listarLeads, listarResumen } from "@/lib/db";
import { COOKIE_PANEL, sesionValida } from "@/lib/panel";

export const metadata: Metadata = {
  title: "Tracking — Génesis OS",
  robots: { index: false, follow: false },
};

/** Los números tienen que ser los de ahora, no los del último build. */
export const dynamic = "force-dynamic";

export default async function Tracking({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const galletas = await cookies();

  if (!sesionValida(galletas.get(COOKIE_PANEL)?.value)) {
    return <Acceso error={Boolean(error)} />;
  }

  if (!hayBase()) {
    return (
      <Acceso
        mensaje="Falta configurar SUPABASE_URL y SUPABASE_SERVICE_KEY en Vercel. Sin eso el panel no tiene de dónde leer."
      />
    );
  }

  // El embudo sale ya sumado de la base; los leads, fila por fila.
  const [leads, resumen] = await Promise.all([listarLeads(), listarResumen()]);

  // La línea de tiempo se pide después porque depende de qué visitas hay que mirar.
  const eventos = await eventosDeVisitas(leads.map((l) => l.visita_id));

  return <Panel leads={leads} eventos={eventos} resumen={resumen} />;
}
