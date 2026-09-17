import type { ReactNode } from "react";

type Props = {
  id?: string;
  /** "paper" = blanco · "mint" = verde muy claro. Se alternan a lo largo de la página. */
  tone?: "paper" | "mint";
  className?: string;
  children: ReactNode;
};

export function Section({ id, tone = "paper", className = "", children }: Props) {
  const bg = tone === "mint" ? "bg-gradient-to-b from-mint to-paper" : "bg-paper";

  return (
    <section id={id} className={`border-t border-hairline ${bg} ${className}`}>
      <div className="container-page section-pad">{children}</div>
    </section>
  );
}
