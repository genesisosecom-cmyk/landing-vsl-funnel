import type { DetailedHTMLProps, HTMLAttributes } from "react";

/**
 * <vturb-smartplayer> es un custom element que define el script del reproductor
 * de VTurb. TypeScript no lo conoce, así que se declara acá.
 */
declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "vturb-smartplayer": DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}
