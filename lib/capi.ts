import { createHash } from "node:crypto";
import type { Atribucion } from "./atribucion";
import { site } from "@/content/landing";

/**
 * Conversions API de Meta: los eventos importantes, desde el servidor.
 *
 * El evento del navegador se pierde entre el 20 % y el 40 % de las veces (iOS,
 * Safari, bloqueadores) y justo son los de abajo del embudo. Este manda el
 * mismo evento con el mismo eventId: Meta deduplica y queda el que llegó.
 *
 * El mail y el teléfono van hasheados en SHA-256, que es lo que Meta exige y
 * lo que le permite matchear al usuario sin recibir el dato en claro.
 */
const VERSION_API = "v21.0";

type EventoCapi = {
  nombre: "Lead" | "Schedule";
  eventId: string;
  email?: string;
  telefono?: string;
  atribucion?: Atribucion;
  /** IP y user agent del visitante: mejoran el match, no son opcionales de facto. */
  ip?: string;
  userAgent?: string;
  url?: string;
  datos?: Record<string, unknown>;
};

function hash(valor: string | undefined): string | undefined {
  if (!valor) return undefined;
  return createHash("sha256").update(valor.trim().toLowerCase()).digest("hex");
}

/** El teléfono se normaliza a solo dígitos antes de hashear, como pide Meta. */
function hashTelefono(telefono: string | undefined): string | undefined {
  if (!telefono) return undefined;
  const digitos = telefono.replace(/\D/g, "");
  return digitos ? createHash("sha256").update(digitos).digest("hex") : undefined;
}

export async function enviarEvento(evento: EventoCapi): Promise<{ ok: boolean; detalle: string }> {
  const token = process.env.META_CAPI_TOKEN;
  const pixelId = site.tracking.metaPixelId;

  // Sin token no se manda nada: el evento del navegador sigue funcionando igual.
  if (!token) return { ok: false, detalle: "META_CAPI_TOKEN sin configurar" };

  const a = evento.atribucion ?? {};
  const userData = Object.fromEntries(
    Object.entries({
      em: hash(evento.email),
      ph: hashTelefono(evento.telefono),
      fbp: a.fbp,
      fbc: a.fbc,
      client_ip_address: evento.ip,
      client_user_agent: evento.userAgent,
    }).filter(([, v]) => v),
  );

  const cuerpo = {
    data: [
      {
        event_name: evento.nombre,
        event_time: Math.floor(Date.now() / 1000),
        event_id: evento.eventId,
        event_source_url: evento.url,
        action_source: "website",
        user_data: userData,
        custom_data: evento.datos ?? {},
      },
    ],
  };

  try {
    const respuesta = await fetch(
      `https://graph.facebook.com/${VERSION_API}/${pixelId}/events?access_token=${token}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cuerpo),
      },
    );

    const dato = await respuesta.json().catch(() => ({}));
    return respuesta.ok
      ? { ok: true, detalle: `eventos recibidos: ${dato?.events_received ?? "?"}` }
      : { ok: false, detalle: `Meta ${respuesta.status}: ${JSON.stringify(dato).slice(0, 200)}` };
  } catch (error) {
    return { ok: false, detalle: `Meta inalcanzable: ${(error as Error).message}` };
  }
}
