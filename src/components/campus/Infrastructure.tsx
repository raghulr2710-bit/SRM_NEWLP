import type { Institution } from "@/types/institution";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Gallery } from "./Gallery";

/** Section 07 – Infrastructure (image-led mosaic with lightbox). */
export function Infrastructure({ inst, index }: { inst: Institution; index: string }) {
  const s = inst.infrastructure;
  return (
    <section id="infrastructure" aria-labelledby="infra-title" className="section-y bg-surface">
      <div className="container-x">
        <SectionHeading id="infra-title" index={index} eyebrow="Infrastructure" title={s.heading} intro={s.intro} />
        <Gallery variant="mosaic" items={s.items} />
      </div>
    </section>
  );
}

/** Section 11 – Campus life (horizontal photo strip, swipeable on mobile). */
export function CampusLife({ inst, index }: { inst: Institution; index: string }) {
  const s = inst.campusLife;
  return (
    <section id="campus-life" aria-labelledby="campus-title" className="on-dark section-y overflow-hidden bg-brand-ink text-white">
      <div className="container-x">
        <SectionHeading id="campus-title" index={index} eyebrow="Campus life" title={s.heading} intro={s.intro} tone="dark" />
        <Gallery
          variant="strip"
          tone="dark"
          items={s.items.map((i) => ({ title: i.title, description: i.body, media: i.media }))}
        />
      </div>
    </section>
  );
}
