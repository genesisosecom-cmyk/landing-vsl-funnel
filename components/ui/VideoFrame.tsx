"use client";

import { useState } from "react";
import type { Video } from "@/content/landing";

type Props = {
  video: Video;
  /** Vertical para testimonios, horizontal para el VSL y la demo. */
  ratio?: "16/9" | "9/16";
  className?: string;
};

/**
 * Reproductor con fachada: hasta el click solo se carga la portada, no el
 * iframe. Es lo que mantiene liviano el primer render con varios videos
 * en la misma página.
 */
export function VideoFrame({ video, ratio = "16/9", className = "" }: Props) {
  const [playing, setPlaying] = useState(false);
  const missing = video.src.trim() === "";
  const aspect = ratio === "9/16" ? "aspect-[9/16]" : "aspect-video";

  return (
    <div
      className={`relative overflow-hidden rounded-card bg-ink shadow-card ${aspect} ${className}`}
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
          // eslint-disable-next-line jsx-a11y/media-has-caption
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
          {/* Placeholder: reemplazar por next/image cuando las portadas sean reales. */}
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
            className="group absolute inset-0 flex items-center justify-center bg-ink/10 transition hover:bg-ink/20 disabled:cursor-not-allowed"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-paper/95 shadow-lg transition group-hover:scale-105 sm:h-20 sm:w-20">
              <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7 fill-ink" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>

          {video.duration ? (
            <span className="absolute bottom-3 right-3 rounded bg-ink/80 px-2 py-1 font-display text-xs text-paper">
              {video.duration}
            </span>
          ) : null}

          {missing ? (
            <span className="absolute left-3 top-3 rounded bg-ink/80 px-2 py-1 font-display text-[0.65rem] uppercase tracking-label text-paper">
              Falta el video
            </span>
          ) : null}
        </>
      )}
    </div>
  );
}
