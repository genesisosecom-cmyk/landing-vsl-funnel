import type { Metadata } from "next";
import { Landing } from "@/components/sections/Landing";
import { site } from "@/content/landing";

export const metadata: Metadata = {
  title: site.seo.title,
  description: site.seo.description,
};

/**
 * La landing.
 *
 * Vive en `/formulario` y no en la raíz porque así la conocen los anuncios
 * publicados, el redirect del calendario de GHL y el dominio verificado en
 * Meta. Mudarla a `/` es un cambio de URL para ganar estética, y no se hace con
 * pauta corriendo.
 */
export default function LandingFormulario() {
  return <Landing />;
}
