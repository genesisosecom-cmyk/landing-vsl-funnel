"use client";

import { useEffect, useState } from "react";
import { Logotipo } from "@/components/brand/Logotipo";
import { Semilla } from "@/components/brand/Semilla";
import { CtaButton } from "@/components/ui/CtaButton";

/**
 * La barra fija. Discreta a propósito: no existe mientras se ve el hero, que
 * ya tiene el logo centrado y el botón grande; aparece deslizándose recién
 * cuando el visitante scrolleó lo suficiente como para que esos dos hayan
 * quedado arriba. Desde ahí, el botón lo acompaña hasta el final.
 *
 * Es vidrio esmerilado sobre lo que haya debajo, con un hilo de luz naranja
 * en el borde de abajo. Sobre las bandas negras se ve como una lámina clara;
 * sobre las secciones claras, casi desaparece.
 */
const UMBRAL = 160;

export function Navbar({ href }: { href: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let pedido = 0;

    function alScrollear() {
      // Un frame por scroll, no un render por píxel.
      if (pedido) return;
      pedido = requestAnimationFrame(() => {
        setVisible(window.scrollY > UMBRAL);
        pedido = 0;
      });
    }

    alScrollear();
    window.addEventListener("scroll", alScrollear, { passive: true });
    return () => {
      window.removeEventListener("scroll", alScrollear);
      if (pedido) cancelAnimationFrame(pedido);
    };
  }, []);

  return (
    <div
      inert={!visible}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-suave ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-full opacity-0"
      }`}
    >
      {/* 88 % de blanco y no menos: con más transparencia el título de la
          sección se leía a través de la barra. El desenfoque queda para que lo
          que pasa por detrás se insinúe, no para que se lea. */}
      <div className="relative bg-blanco/[0.88] shadow-[0_12px_32px_-26px_rgba(11,11,11,0.45)] backdrop-blur-md">
        <div className="container-page flex h-16 items-center justify-between gap-4 max-sm:h-14">
          <a href="#" aria-label="Volver arriba" className="tono-blanco flex items-center">
            {/* En mobile el nombre no entra junto al botón: queda la Semilla sola. */}
            <Logotipo tone="oscuro" className="text-[1.0625rem] max-sm:hidden" />
            <Semilla variant="plana" title="Génesis OS" className="h-7 w-auto sm:hidden" />
          </a>
          <CtaButton
            href={href}
            size="md"
            nombre="barra"
            className="whitespace-nowrap max-sm:px-5 max-sm:py-3 max-sm:text-[0.75rem]"
          />
        </div>

        {/* El hilo de luz del borde inferior. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(230, 226, 221, 0.9) 20%, rgba(240, 100, 30, 0.45) 50%, rgba(230, 226, 221, 0.9) 80%, transparent 100%)",
          }}
        />
      </div>
    </div>
  );
}
