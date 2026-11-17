import type { Institution } from "@/types/institution";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Gallery, ImmersiveGallery } from "./Gallery";

/** Section 07 – Infrastructure: immersive, scroll-linked horizontal photo gallery with lightbox. */
export function Infrastructure({ inst, index }: { inst: Institution; index: string }) {
  const s = inst.infrastructure;
  return (
    <section id="infrastructure" aria-labelledby="infra-title" className="bg-surface pb-[4.5rem] pt-[4.5rem] lg:pb-16 lg:pt-12">
      <ImmersiveGallery
        items={s.items}
        heading={<SectionHeading id="infra-title" index={index} eyebrow="Infrastructure" title={s.heading} intro={s.intro} />}
      />
    </section>
  );
}

/** Section 11 – Campus life: asymmetric photo mosaic with hover detail and lightbox. */
export function CampusLife({ inst, index }: { inst: Institution; index: string }) {
  const s = inst.campusLife;
  return (
    <section id="campus-life" aria-labelledby="campus-title" className="on-dark section-y overflow-hidden bg-brand-ink text-white">
      <div className="container-x">
        <SectionHeading id="campus-title" index={index} eyebrow="Campus life" title={s.heading} intro={s.intro} tone="dark" />
        <Gallery items={s.items.map((i) => ({ title: i.title, description: i.body, media: i.media }))} />
      </div>
    </section>
  );
}
