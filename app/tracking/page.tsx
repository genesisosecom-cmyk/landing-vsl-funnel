import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Acceso } from "@/components/tracking/Acceso";
import { Panel } from "@/components/tracking/Panel";
import { hayBase, listarEventos, listarLeads } from "@/lib/db";
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

  // Las dos consultas son independientes: van juntas para no encadenar esperas.
  const [leads, eventos] = await Promise.all([listarLeads(), listarEventos()]);

  return <Panel leads={leads} eventos={eventos} />;
}
