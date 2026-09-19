import { highlight } from "@/lib/highlight";
import { SectionLabel } from "./SectionLabel";

type Props = {
  label?: string;
  /** Usar *asteriscos* para las palabras en el color de acento. */
  title: string;
  subtitle?: string;
  align?: "center" | "left";
};

export function SectionHeading({ label, title, subtitle, align = "center" }: Props) {
  const alineacion = align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <header className={`flex flex-col gap-5 ${alineacion}`}>
      {label ? <SectionLabel>{label}</SectionLabel> : null}
      <h2 className="max-w-3xl text-titulo">{highlight(title)}</h2>
      {subtitle ? <p className="max-w-prose text-[1.125rem] leading-relaxed text-texto">{subtitle}</p> : null}
    </header>
  );
}
