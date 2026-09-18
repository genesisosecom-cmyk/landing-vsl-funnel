import { Section } from "@/components/ui/Section";
import { TypeformEmbed } from "@/components/embed/TypeformEmbed";
import { highlight } from "@/lib/highlight";
import { aplicar } from "@/content/landing";
import type { Flujo } from "@/lib/atribucion";

/**
 * El formulario embebido dentro de la landing, debajo de "por dentro".
 *
 * Ocupa el lugar que antes tenía una banda de CTA: acá no hay click
 * intermedio, el visitante aplica sin salir de la página.
 */
export function FormularioEnLanding({ flujo, destino }: { flujo: Flujo; destino: string }) {
  return (
    <Section id="aplicar" tono="hueso">
      <div className="flex flex-col items-center gap-8">
        <h2 className="max-w-2xl text-center text-titulo">{highlight(aplicar.tituloEnLanding)}</h2>

        <TypeformEmbed
          flujo={flujo}
          origen="seccion"
          destino={destino}
          className="h-[620px] w-full max-w-[1040px] overflow-hidden rounded-pieza border border-linea bg-pieza"
        />
      </div>
    </Section>
  );
}
