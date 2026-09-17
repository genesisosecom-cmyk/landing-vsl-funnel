import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VideoFrame } from "@/components/ui/VideoFrame";
import { insideLook } from "@/content/landing";

/** Demo del producto por dentro: baja el riesgo percibido antes de la oferta. */
export function InsideLook() {
  return (
    <Section id="por-dentro" tono="blanco">
      <div className="flex flex-col items-center gap-10">
        <SectionHeading
          label={insideLook.eyebrow}
          title={insideLook.title}
          subtitle={insideLook.body}
        />
        <VideoFrame video={insideLook.video} className="w-full max-w-4xl" />
      </div>
    </Section>
  );
}
