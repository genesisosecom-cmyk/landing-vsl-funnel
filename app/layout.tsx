import type { Metadata } from "next";
import localFont from "next/font/local";
import { site } from "@/content/landing";
import "./globals.css";

/**
 * Las dos familias del manual (2.5), self-hosted como variables subseteadas a
 * latin + latin-ext: 145 KB entre las dos contra 1,37 MB de los .ttf originales.
 *
 * Montserrat = todo lo que se lee. Archivo = todo lo que se mide (el rol que el
 * manual le da a JetBrains Mono; ver nota en README).
 */
const montserrat = localFont({
  src: "../public/fonts/Montserrat-var.woff2",
  weight: "100 900",
  variable: "--font-montserrat",
  display: "swap",
});

const archivo = localFont({
  src: "../public/fonts/Archivo-var.woff2",
  weight: "100 900",
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  title: site.seo.title,
  description: site.seo.description,
  openGraph: {
    title: site.seo.title,
    description: site.seo.description,
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${montserrat.variable} ${archivo.variable}`}>
      <body>{children}</body>
    </html>
  );
}
