import Script from "next/script";
import type { Player } from "@/content/landing";

type Props = {
  player: Player;
  className?: string;
};

/**
 * Reproductor de VTurb.
 *
 * El embed original crea el <script> a mano y lo cuelga del <head>; acá lo carga
 * next/script con afterInteractive, que hace lo mismo pero una sola vez y sin
 * bloquear el primer render.
 *
 * El div de adentro es el placeholder del propio VTurb: reserva el 16:9 con
 * padding-top para que la página no salte cuando el reproductor se monta.
 */
export function VturbPlayer({ player, className = "" }: Props) {
  return (
    <div className={`overflow-hidden rounded-pieza ${className}`}>
      <vturb-smartplayer
        id={`vid-${player.id}`}
        style={{ display: "block", margin: "0 auto", width: "100%" }}
      >
        <div
          className="vturb-player-placeholder"
          style={{
            position: "relative",
            width: "100%",
            padding: "56.25% 0 0",
            zIndex: 0,
            backgroundColor: "black",
          }}
        />
      </vturb-smartplayer>

      <Script id={`vturb-${player.id}`} src={player.scriptSrc} strategy="afterInteractive" />
    </div>
  );
}
