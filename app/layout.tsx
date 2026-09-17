import type { Metadata } from "next";
import { Anton, Inter } from "next/font/google";
import { site } from "@/content/landing";
import "./globals.css";

// Par tipográfico: display pesada para titulares + grotesca neutra para cuerpo.
// Para cambiar la marca, reemplazar solo estas dos fuentes.
const display = Anton({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const bodyFont = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-body",
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
    <html lang="es" className={`${display.variable} ${bodyFont.variable}`}>
      <body>
        {/* La página es una columna clara centrada sobre el marco oscuro. */}
        <div className="mx-auto w-full max-w-[1280px] overflow-hidden bg-paper sm:my-6 sm:rounded-2xl">
          {children}
        </div>
      </body>
    </html>
  );
}
