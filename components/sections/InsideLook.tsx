import { Section } from "@/components/ui/Section";
import { VideoFrame } from "@/components/ui/VideoFrame";
import { highlight } from "@/lib/highlight";
import { insideLook } from "@/content/landing";

/** Demo del producto por dentro: baja el riesgo percibido antes de la oferta. */
export function InsideLook() {
  return (
    <Section id="por-dentro" tone="paper">
      <div className="flex flex-col items-center gap-8 text-center">
        <h2 className="max-w-2xl text-3xl leading-[1.1] sm:text-4xl">
          {highlight(insideLook.title)}
        </h2>
        <VideoFrame video={insideLook.video} className="w-full max-w-4xl" />
      </div>
    </Section>
  );
}
