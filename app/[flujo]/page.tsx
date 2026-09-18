import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Landing } from "@/components/sections/Landing";
import { FLUJOS, esFlujo } from "@/lib/atribucion";
import { site } from "@/content/landing";

export const metadata: Metadata = {
  title: site.seo.title,
  description: site.seo.description,
};

/** Las dos landings se generan estáticas; cualquier otra ruta es 404. */
export function generateStaticParams() {
  return FLUJOS.map((flujo) => ({ flujo }));
}

export default async function LandingPorFlujo({
  params,
}: {
  params: Promise<{ flujo: string }>;
}) {
  const { flujo } = await params;
  if (!esFlujo(flujo)) notFound();

  return <Landing flujo={flujo} />;
}
