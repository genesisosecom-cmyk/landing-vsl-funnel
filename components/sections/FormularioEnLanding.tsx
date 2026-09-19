import { Section } from "@/components/ui/Section";
import { FormularioNativo } from "@/components/form/FormularioNativo";
import { CalendarioGhl } from "@/components/embed/CalendarioGhl";
import { highlight } from "@/lib/highlight";
import { aplicar } from "@/content/landing";
import type { Flujo } from "@/lib/atribucion";

/**
 * La pantalla de conversión, embebida dentro de la landing. Es el destino de
 * todos los botones de la página: acá no hay click intermedio, el visitante
 * convierte sin salir.
 *
 * Es lo único que cambia entre los dos flujos del A/B:
 *
 *   /formulario → formulario propio, después lo contactamos nosotros.
 *   /agenda     → calendario de GHL directo, el lead elige horario solo.
 *
 * En agenda no hay formulario previo a propósito: dos formularios seguidos
 * (el nuestro y el del calendario) pedían los mismos datos dos veces y abrían
 * la puerta a que GHL creara dos contactos por un teléfono escrito distinto.
 *
 * La tarjeta lleva un halo tenue detrás: es la única de la página que se
 * apoya sobre luz, y es la que importa.
 */
export function FormularioEnLanding({ flujo, destino }: { flujo: Flujo; destino: string }) {
  const esAgenda = flujo === "agenda";

  return (
    // scroll-mt deja aire arriba cuando se llega por el ancla, en vez de pegar
    // el título contra el borde de la pantalla.
    <Section id="aplicar" tono="hueso" className="scroll-mt-6 overflow-hidden">
      <span
        aria-hidden="true"
        className="halo left-1/2 top-[55%] h-[36rem] w-[64rem] -translate-x-1/2 -translate-y-1/2 opacity-60"
      />

      <div className="relative flex flex-col items-center gap-10">
        <h2 className="max-w-2xl text-center text-titulo">
          {highlight(esAgenda ? aplicar.tituloAgendaEnLanding : aplicar.tituloEnLanding)}
        </h2>

        {/* El filo de luz en el borde superior de la tarjeta: la luz de la
            sección "cayendo" sobre ella. */}
        <div className={`relative w-full ${esAgenda ? "max-w-[1040px]" : "max-w-[720px]"}`}>
          <span aria-hidden="true" className="filo z-10" />
          {esAgenda ? (
            <CalendarioGhl className="w-full overflow-hidden rounded-pieza border border-linea/70 bg-pieza shadow-pieza-alta" />
          ) : (
            <FormularioNativo
              flujo={flujo}
              origen="seccion"
              destino={destino}
              className="w-full rounded-pieza border border-linea/70 bg-pieza p-10 shadow-pieza-alta max-sm:p-6"
            />
          )}
        </div>
      </div>
    </Section>
  );
}
