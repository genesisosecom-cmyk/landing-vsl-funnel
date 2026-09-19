import type { Metadata } from "next";
import { AtribucionDeAgenda } from "@/components/analytics/AtribucionDeAgenda";
import { Logotipo } from "@/components/brand/Logotipo";
import { Semilla } from "@/components/brand/Semilla";
import { aplicar } from "@/content/landing";

export const metadata: Metadata = {
  title: "Gracias — Génesis OS",
  robots: { index: false, follow: false },
};

/**
 * El cierre de los dos flujos.
 *
 * Con ?agendado=1 —que es como lo llama el redirect del calendario de GHL—
 * además de cambiar el mensaje hace el trabajo invisible: manda la atribución
 * de esta visita para pegarla a la cita que acaba de entrar por el webhook.
 * Es el único momento del flujo de agenda en que volvemos a tener la cookie
 * del visitante a mano.
 */
export default async function Gracias({
  searchParams,
}: {
  searchParams: Promise<{ agendado?: string; contact_id?: string; contactId?: string }>;
}) {
  const { agendado, contact_id, contactId } = await searchParams;
  const vinoDeUnaCita = agendado === "1";
  const copia = vinoDeUnaCita ? aplicar.gracias.agendado : aplicar.gracias;

  return (
    <main className="tono-blanco flex min-h-screen flex-col items-center justify-center bg-tono text-texto">
      <div className="container-page flex flex-col items-center gap-6 py-16 text-center">
        <Logotipo tone="oscuro" className="text-[1.125rem]" />
        <Semilla variant="plana" className="h-12 w-auto" />

        <h1 className="max-w-2xl text-[2rem] leading-[1.1] text-titulo sm:text-[2.5rem]">
          {copia.titulo}
        </h1>
        <p className="max-w-prose text-texto">{copia.texto}</p>
      </div>

      {vinoDeUnaCita && <AtribucionDeAgenda contactId={contact_id ?? contactId} />}
    </main>
  );
}
