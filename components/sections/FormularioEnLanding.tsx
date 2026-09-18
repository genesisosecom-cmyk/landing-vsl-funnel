import { Section } from "@/components/ui/Section";
import { FormularioNativo } from "@/components/form/FormularioNativo";
import { CalendarioGhl } from "@/components/embed/CalendarioGhl";
import { highlight } from "@/lib/highlight";
import { aplicar } from "@/content/landing";
import type { Flujo } from "@/lib/atribucion";

/**
 * La pantalla de conversión, embebida dentro de la landing debajo de "por
 * dentro". Es el destino de todos los botones de la página: acá no hay click
 * intermedio, el visitante convierte sin salir.
 *
 * Es lo único que cambia entre los dos flujos del A/B:
 *
 *   /formulario → formulario propio, después lo contactamos nosotros.
 *   /agenda     → calendario de GHL directo, el lead elige horario solo.
 *
 * En agenda no hay formulario previo a propósito: dos formularios seguidos
 * (el nuestro y el del calendario) pedían los mismos datos dos veces y abrían
 * la puerta a que GHL creara dos contactos por un teléfono escrito distinto.
 */
export function FormularioEnLanding({ flujo, destino }: { flujo: Flujo; destino: string }) {
  const esAgenda = flujo === "agenda";

  return (
    // scroll-mt deja aire arriba cuando se llega por el ancla, en vez de pegar
    // el título contra el borde de la pantalla.
    <Section id="aplicar" tono="hueso" className="scroll-mt-6">
      <div className="flex flex-col items-center gap-8">
        <h2 className="max-w-2xl text-center text-titulo">
          {highlight(esAgenda ? aplicar.tituloAgendaEnLanding : aplicar.tituloEnLanding)}
        </h2>

        {esAgenda ? (
          <CalendarioGhl className="w-full max-w-[1040px] overflow-hidden rounded-pieza border border-linea bg-pieza" />
        ) : (
          <FormularioNativo
            flujo={flujo}
            origen="seccion"
            destino={destino}
            className="w-full max-w-[720px] rounded-pieza border border-linea bg-pieza p-8 max-sm:p-5"
          />
        )}
      </div>
    </Section>
  );
}
