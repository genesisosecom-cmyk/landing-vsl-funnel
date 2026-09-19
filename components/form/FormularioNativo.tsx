"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { anotarEvento, atribucionDeLaVisita, idDeVisita } from "@/lib/visita";
import { aplicar } from "@/content/landing";
import { FlechaDeCta, clasesDeCta } from "@/components/ui/CtaButton";

const copia = aplicar.formulario;

type Props = {
  /** "formulario" o "agenda": el flujo del A/B. */
  flujo: string;
  /** Desde qué parte de la página se completó. */
  origen: string;
  /** A dónde va el visitante cuando termina. */
  destino: string;
  className?: string;
};

type Campos = {
  nombre: string;
  email: string;
  telefono: string;
  instagram: string;
  facturacion: string;
  frecuencia: string;
};

const VACIO: Campos = {
  nombre: "",
  email: "",
  telefono: "",
  instagram: "",
  facturacion: "",
  frecuencia: "",
};

const etiquetaCampo = "dato mb-2.5 block";
/*
 * Los campos van sobre hueso dentro de la tarjeta blanca: se distinguen del
 * fondo sin borde pesado, y al enfocar pasan a blanco con el aro naranja,
 * que es el único momento en que el naranja entra al formulario.
 */
const caja =
  "w-full rounded-xl border border-arena bg-hueso/70 px-4 py-3.5 text-cuerpo text-negro outline-none transition-all duration-200 placeholder:text-gris-claro hover:border-gris-claro focus:border-naranja focus:bg-blanco focus:ring-4 focus:ring-naranja/15";

/**
 * El formulario propio de la landing.
 *
 * Reemplaza al Typeform embebido. La ventaja no es estética: la atribución ya
 * vive en una cookie nuestra, así que en vez de empujarla como campos ocultos
 * hasta Typeform y esperar a que vuelva por webhook, viaja en el mismo POST
 * que los datos del lead. Menos piezas en el camino, menos formas de perderla.
 *
 * El event_id se genera acá y se usa dos veces: en el Lead del navegador y en
 * el del servidor. Meta los deduplica y cuenta uno solo.
 */
export function FormularioNativo({ flujo, origen, destino, className = "" }: Props) {
  const router = useRouter();
  const [campos, setCampos] = useState<Campos>(VACIO);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // El "empezó a completar" se anota una sola vez, en el primer campo tocado.
  const empezado = useRef(false);

  function cambiar(clave: keyof Campos, valor: string) {
    if (!empezado.current) {
      empezado.current = true;
      anotarEvento("form_iniciado", { flujo, detalle: { origen, campo: clave } });
    }
    setCampos((previos) => ({ ...previos, [clave]: valor }));
  }

  async function enviar(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    if (enviando) return;

    setEnviando(true);
    setError(null);

    const eventId =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `lead-${Date.now()}-${Math.random().toString(36).slice(2)}`;

    try {
      const respuesta = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...campos,
          flujo,
          origen,
          eventId,
          visitaId: idDeVisita(),
          atribucion: atribucionDeLaVisita(),
        }),
      });

      if (!respuesta.ok) throw new Error(`respuesta ${respuesta.status}`);

      window.fbq?.(
        "track",
        "Lead",
        { flujo, origen, content_name: `lead_${flujo}` },
        { eventID: eventId },
      );

      router.push(destino);
    } catch (fallo) {
      console.warn("[FORM]", (fallo as Error).message);
      setError(copia.error);
      setEnviando(false);
    }
  }

  return (
    <form onSubmit={enviar} noValidate={false} className={`flex flex-col gap-7 ${className}`}>
      <fieldset disabled={enviando} className="contents">
        <div className="grid gap-5 sm:grid-cols-2">
          <Texto
            id="nombre"
            etiqueta={copia.campos.nombre.etiqueta}
            placeholder={copia.campos.nombre.placeholder}
            autoComplete="name"
            valor={campos.nombre}
            onChange={(v) => cambiar("nombre", v)}
          />
          <Texto
            id="email"
            tipo="email"
            etiqueta={copia.campos.email.etiqueta}
            placeholder={copia.campos.email.placeholder}
            autoComplete="email"
            valor={campos.email}
            onChange={(v) => cambiar("email", v)}
          />
          <Texto
            id="telefono"
            tipo="tel"
            etiqueta={copia.campos.telefono.etiqueta}
            placeholder={copia.campos.telefono.placeholder}
            ayuda={copia.campos.telefono.ayuda}
            autoComplete="tel"
            valor={campos.telefono}
            onChange={(v) => cambiar("telefono", v)}
          />
          <Texto
            id="instagram"
            etiqueta={copia.campos.instagram.etiqueta}
            placeholder={copia.campos.instagram.placeholder}
            requerido={false}
            valor={campos.instagram}
            onChange={(v) => cambiar("instagram", v)}
          />
        </div>

        <Opciones
          nombre="facturacion"
          etiqueta={copia.facturacion.etiqueta}
          opciones={copia.facturacion.opciones}
          valor={campos.facturacion}
          onChange={(v) => cambiar("facturacion", v)}
        />

        <Opciones
          nombre="frecuencia"
          etiqueta={copia.frecuencia.etiqueta}
          opciones={copia.frecuencia.opciones}
          valor={campos.frecuencia}
          onChange={(v) => cambiar("frecuencia", v)}
        />

        {error && (
          <p role="alert" className="text-[0.9375rem] text-anotacion">
            {error}
          </p>
        )}

        <button
          type="submit"
          className={`${clasesDeCta("lg")} mt-1 w-full disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0`}
        >
          {enviando ? copia.enviando : copia.enviar}
          {!enviando && <FlechaDeCta />}
        </button>

        <p className="text-[0.8125rem] text-sutil">
          {copia.consentimiento}{" "}
          <Link href="/privacidad" className="text-acento underline underline-offset-2">
            política de privacidad
          </Link>
          .
        </p>
      </fieldset>
    </form>
  );
}

function Texto({
  id,
  etiqueta,
  placeholder,
  ayuda,
  tipo = "text",
  autoComplete,
  requerido = true,
  valor,
  onChange,
}: {
  id: string;
  etiqueta: string;
  placeholder: string;
  ayuda?: string;
  tipo?: string;
  autoComplete?: string;
  requerido?: boolean;
  valor: string;
  onChange: (valor: string) => void;
}) {
  return (
    <div>
      <label htmlFor={id} className={etiquetaCampo}>
        {etiqueta}
      </label>
      <input
        id={id}
        name={id}
        type={tipo}
        inputMode={tipo === "tel" ? "tel" : undefined}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={requerido}
        value={valor}
        onChange={(e) => onChange(e.target.value)}
        aria-describedby={ayuda ? `${id}-ayuda` : undefined}
        className={caja}
      />
      {ayuda && (
        <p id={`${id}-ayuda`} className="mt-2 text-[0.8125rem] text-sutil">
          {ayuda}
        </p>
      )}
    </div>
  );
}

/**
 * Las dos preguntas de calificación.
 *
 * Radios y no un select: son pocas opciones, se leen todas de un vistazo y en
 * mobile un select nativo esconde justo la información que hace decidir.
 */
function Opciones({
  nombre,
  etiqueta,
  opciones,
  valor,
  onChange,
}: {
  nombre: string;
  etiqueta: string;
  opciones: readonly string[];
  valor: string;
  onChange: (valor: string) => void;
}) {
  return (
    <fieldset>
      <legend className={etiquetaCampo}>{etiqueta}</legend>
      <div className="flex flex-wrap gap-2.5">
        {opciones.map((opcion) => {
          const elegida = valor === opcion;
          return (
            <label
              key={opcion}
              className={`inline-flex cursor-pointer items-center gap-2 rounded-cta border px-4 py-3 text-[0.9375rem] transition-all duration-200 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brasa ${
                elegida
                  ? "border-negro bg-negro text-blanco shadow-[0_8px_18px_-10px_rgba(11,11,11,0.6)]"
                  : "border-arena bg-hueso/70 text-negro hover:border-gris-claro hover:bg-blanco"
              }`}
            >
              {elegida && (
                <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3.5 w-3.5 shrink-0 text-naranja">
                  <path d="M3 8.5l3 3 7-7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
              <input
                type="radio"
                name={nombre}
                value={opcion}
                required
                checked={elegida}
                onChange={() => onChange(opcion)}
                className="sr-only"
              />
              {opcion}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
