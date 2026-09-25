import { Logotipo } from "@/components/brand/Logotipo";
import { Semilla } from "@/components/brand/Semilla";
import { Pasos } from "@/components/ui/Pasos";
import { aplicar } from "@/content/landing";

/**
 * El cierre, con dos mensajes.
 *
 * El del formulario es el del flujo normal. El de agendado lo ve quien reserva
 * una llamada en el calendario de GHL, que después del formulario le mandamos
 * por WhatsApp: GHL lo devuelve acá cuando termina.
 *
 * Antes esta pantalla también hacía trabajo invisible —mandaba la atribución de
 * la visita para pegarla a la cita, porque en el flujo de agenda era el único
 * momento en que volvíamos a tener la cookie a mano—. Ya no hace falta: la cita
 * se une al lead por el id de contacto de GHL, que es exacto.
 */
export function PantallaDeGracias({ agendado }: { agendado: boolean }) {
  const copia = agendado ? aplicar.gracias.agendado : aplicar.gracias;

  return (
    <main className="tono-blanco flex min-h-screen flex-col items-center justify-center bg-tono text-texto">
      <div className="container-page flex flex-col items-center gap-6 py-16 text-center">
        <Logotipo tone="oscuro" className="text-[1.125rem]" />
        <Semilla variant="plana" className="h-12 w-auto" />

        <h1 className="max-w-2xl text-[2rem] leading-[1.1] text-titulo sm:text-[2.5rem]">
          {copia.titulo}
        </h1>
        <p className="max-w-prose text-texto">{copia.texto}</p>

        <Pasos pasos={copia.pasos} />
      </div>
    </main>
  );
}
