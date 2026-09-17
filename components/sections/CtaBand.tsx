import { CtaButton } from "@/components/ui/CtaButton";

type Props = {
  /** Una línea de contexto: el botón nunca va solo en una banda vacía. */
  nota: string;
  tono?: "negro" | "hueso";
};

export function CtaBand({ nota, tono = "negro" }: Props) {
  const clase = tono === "hueso" ? "tono-hueso" : "tono-negro";

  return (
    <section className={`${clase} border-t border-linea bg-tono`}>
      <div className="container-page flex flex-wrap items-center justify-between gap-6 py-10">
        <p className="max-w-prose text-h3 font-medium text-titulo">{nota}</p>
        <CtaButton />
      </div>
    </section>
  );
}
