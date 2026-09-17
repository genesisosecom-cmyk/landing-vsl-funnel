"use client";

import { useState } from "react";
import type { Video } from "@/content/landing";

type Props = {
  video: Video;
  ratio?: "16/9" | "9/16";
  className?: string;
};

/**
 * Reproductor con fachada: hasta el click solo se carga la portada, no el
 * iframe. El control de play va en hueso y negro, no en naranja: el naranja
 * está reservado para el único botón de la pantalla (manual 2.4).
 */
export function VideoFrame({ video, ratio = "16/9", className = "" }: Props) {
  const [playing, setPlaying] = useState(false);
  const missing = video.src.trim() === "";
  const aspect = ratio === "9/16" ? "aspect-[9/16]" : "aspect-video";

  return (
    <div
      className={`relative overflow-hidden rounded-pieza border border-linea bg-negro ${aspect} ${className}`}
    >
      {playing && !missing ? (
        video.kind === "embed" ? (
          <iframe
            src={video.src}
            title={video.title}
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <video
            src={video.src}
            poster={video.poster.src}
            controls
            autoPlay
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          />
        )
      ) : (
        <>
          {/* Placeholder: pasar a next/image cuando las portadas sean reales. */}
          <img
            src={video.poster.src}
            alt={video.poster.alt}
            width={video.poster.width}
            height={video.poster.height}
            className="absolute inset-0 h-full w-full object-cover"
          />

          <button
            type="button"
            onClick={() => setPlaying(true)}
            disabled={missing}
            aria-label={missing ? `${video.title} — falta cargar el video` : `Reproducir: ${video.title}`}
            className="group absolute inset-0 flex items-center justify-center transition-colors hover:bg-negro/15 disabled:cursor-not-allowed"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-hueso transition-transform group-hover:scale-105">
              <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6 fill-negro" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>

          {video.duration ? (
            <span className="dato absolute bottom-3 right-3 rounded bg-negro/85 px-2 py-1 text-blanco">
              {video.duration}
            </span>
          ) : null}

          {missing ? (
            <span className="dato absolute left-3 top-3 rounded bg-negro/85 px-2 py-1 text-naranja">
              Falta el video
            </span>
          ) : null}
        </>
      )}
    </div>
  );
}
