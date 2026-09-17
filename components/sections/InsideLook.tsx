import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VideoFrame } from "@/components/ui/VideoFrame";
import { insideLook } from "@/content/landing";

/**
 * Demo del producto por dentro. Es contenido, así que pasa a hueso: por debajo
 * del hero las secciones de contenido van sobre claro (manual 4.4).
 */
export function InsideLook() {
  return (
    <Section id="por-dentro" tono="hueso">
      <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <SectionHeading
          eyebrow={insideLook.eyebrow}
          title={insideLook.title}
          subtitle={insideLook.body}
        />
        <VideoFrame video={insideLook.video} className="w-full" />
      </div>
    </Section>
  );
}
