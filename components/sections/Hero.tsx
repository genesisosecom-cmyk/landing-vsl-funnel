import { CtaButton } from "@/components/ui/CtaButton";
import { VideoFrame } from "@/components/ui/VideoFrame";
import { highlight } from "@/lib/highlight";
import { hero, site } from "@/content/landing";

export function Hero() {
  return (
    <header className="bg-paper">
      <div className="container-page flex flex-col items-center gap-8 pb-12 pt-10 text-center sm:pt-14">
        <div className="flex flex-col items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={site.brand.logo.src}
            alt={site.brand.logo.alt}
            width={site.brand.logo.width}
            height={site.brand.logo.height}
          />
          <span className="font-display text-[0.65rem] uppercase tracking-label text-body">
            {site.brand.tagline}
          </span>
          <span className="h-px w-10 bg-accent" />
        </div>

        <h1 className="max-w-3xl text-3xl leading-[1.12] sm:text-4xl lg:text-5xl">
          {highlight(hero.title)}
        </h1>

        <p className="max-w-prose text-base leading-relaxed">{hero.subtitle}</p>

        <VideoFrame video={hero.video} className="w-full max-w-3xl" />

        {/* CTA dentro del primer scroll: el resto de la página son cinco repeticiones del mismo botón. */}
        <CtaButton size="lg" />
      </div>
    </header>
  );
}
