import { highlight } from "@/lib/highlight";
import { SectionLabel } from "./SectionLabel";

type Props = {
  label?: string;
  /** Usar *asteriscos* para las palabras en verde. */
  title: string;
  subtitle?: string;
  align?: "center" | "left";
};

export function SectionHeading({ label, title, subtitle, align = "center" }: Props) {
  const alignment = align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <header className={`flex flex-col gap-4 ${alignment}`}>
      {label ? <SectionLabel>{label}</SectionLabel> : null}
      <h2 className="max-w-3xl text-3xl leading-[1.1] sm:text-4xl lg:text-[2.75rem]">
        {highlight(title)}
      </h2>
      {subtitle ? <p className="max-w-prose text-base leading-relaxed">{subtitle}</p> : null}
    </header>
  );
}
