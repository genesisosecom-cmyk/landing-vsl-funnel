import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VideoFrame } from "@/components/ui/VideoFrame";
import { founderCase } from "@/content/landing";

/**
 * Prueba social A — el caso propio del fundador.
 *
 * Va acá arriba y no abajo con los alumnos porque responde la primera objeción
 * ("¿esto funciona?"). Formato propio, no la tarjeta repetida de testimonios:
 * es un solo caso y se sostiene con métricas + capturas propias.
 */
export function FounderCase() {
  return (
    <Section id="caso-propio" tone="paper">
      <div className="flex flex-col gap-10">
        <SectionHeading label={founderCase.label} title={founderCase.title} />

        <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_1fr]">
          <VideoFrame video={founderCase.video} />

          <div className="flex flex-col gap-6">
            <p className="text-base leading-relaxed">{founderCase.intro}</p>

            <dl className="grid grid-cols-3 gap-3">
              {founderCase.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-card border border-hairline bg-mint/50 px-3 py-4 text-center"
                >
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="flex flex-col gap-1">
                    <span className="font-display text-xl text-accent-ink sm:text-2xl">
                      {stat.value}
                    </span>
                    <span className="font-display text-[0.6rem] uppercase tracking-label text-body">
                      {stat.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {founderCase.media.map((shot) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={shot.src}
              src={shot.src}
              alt={shot.alt}
              width={shot.width}
              height={shot.height}
              loading="lazy"
              className="w-full rounded-card border border-hairline shadow-card"
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
