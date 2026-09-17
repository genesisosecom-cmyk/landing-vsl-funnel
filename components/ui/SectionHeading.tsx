import { highlight } from "@/lib/highlight";
import { Eyebrow } from "./Eyebrow";

type Props = {
  eyebrow?: string;
  /** Usar *asteriscos* para las palabras en el color de acento. */
  title: string;
  subtitle?: string;
  align?: "left" | "center";
};

export function SectionHeading({ eyebrow, title, subtitle, align = "left" }: Props) {
  const alineacion = align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <header className={`flex flex-col gap-4 ${alineacion}`}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="max-w-3xl text-titulo">{highlight(title)}</h2>
      {subtitle ? <p className="max-w-prose text-texto">{subtitle}</p> : null}
    </header>
  );
}
