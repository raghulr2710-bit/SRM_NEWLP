import {
  Award,
  Briefcase,
  Building2,
  Camera,
  ClipboardList,
  CreditCard,
  FileSignature,
  Globe2,
  HelpCircle,
  Mail,
  MapPin,
  Phone,
  PlayCircle,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";
import { Reveal } from "@/components/common/Reveal";
import { PhoneLink } from "@/components/common/Cta";
import { btn } from "@/components/common/buttons";
import { ImmersiveGallery } from "@/components/campus/Gallery";
import { PromoVideo, ScrollTiltFrame } from "../PromoVideo";
import { HalfGlobe } from "../HalfGlobe";
import {
  AccordionGallery,
  AnimatedTestimonials,
  CardMarquee,
  ItemMarquee,
  MilestoneMarquee,
  ProcessStepper,
  StatBannerCarousel,
  LogoMarquee,
} from "../LiveMotion";
import { CtaBand, Heading, Pic, PromoHeading, StatBand, type Img } from "../parts";
import type { LiveImg } from "../types";
import type { SectionProps, SectionSet } from "./types";

/**
 * Default (Ramapuram) section designs. Every section receives the same props (the
 * institution's LiveData) and is only rendered when its content exists.
 */

const STEP_ICONS = ["UserPlus", "Smartphone", "ClipboardList", "Upload", "Send"];

export function PromoSection({ live }: SectionProps) {
  if (!live.promo) return null;
  return (
      <section className="relative overflow-hidden bg-surface-alt py-12 lg:py-16">
        <div className="container-x relative">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="eyebrow mb-4 inline-flex items-center gap-2 text-accent-ink">
              <Trophy aria-hidden="true" className="h-4 w-4" /> {live.meta.shortName}
            </p>
            <PromoHeading text={live.promo.heading} />
            <span aria-hidden="true" className="mx-auto mt-5 block h-1 w-12 rounded-full bg-[var(--hl)]" />
            <p className="type-lead mx-auto mt-5 max-w-2xl text-muted">{live.promo.text}</p>
          </Reveal>
          {live.promo.videoUrl && (
            <ScrollTiltFrame className="mx-auto mt-10 max-w-5xl lg:mt-12">
              <div className="rounded-[1.75rem] bg-white p-2 shadow-[0_30px_60px_-40px_rgba(10,20,50,0.45)] ring-1 ring-line">
                <PromoVideo url={live.promo.videoUrl} title={live.meta.videoTitle ?? live.meta.shortName} poster={live.promo.poster} />
              </div>
            </ScrollTiltFrame>
          )}
        </div>
      </section>
  );
}

export function WhySection({ live }: SectionProps) {
  if (!live.why) return null;
  const whyItems = live.why.items.filter((w) => w.image);
  return (
      <section id="why" className="scroll-mt-10 bg-white py-12 lg:py-0">
        <ImmersiveGallery
          stickyPad="justify-start! pt-28 pb-6"
          tileHeight="h-[min(54vh,34rem)]"
          uniform
          brand
          items={whyItems.map((w) => ({ title: w.title, media: w.image as LiveImg }))}
          heading={
            <Heading wide intro={live.why.intro}>
              {live.why.heading}
            </Heading>
          }
        />
      </section>
  );
}

export function Stats1Section({ live }: SectionProps) {
  return live.stats1?.length ? <StatBand items={live.stats1} icons={[Briefcase, Building2, Trophy]} /> : null;
}

export function PlacementsSection({ live }: SectionProps) {
  if (!live.placements) return null;
  return (
      <section id="placements" className="py-12 lg:py-16 relative scroll-mt-10 overflow-hidden bg-white">
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(60%_100%_at_50%_0%,color-mix(in_srgb,var(--brand)_7%,transparent),transparent_70%)]" />
        <div className="container-x relative">
          <Heading eyebrow="Placements" Icon={Briefcase}>
            {live.placements.heading}
          </Heading>
          {live.placements.cards?.length ? (
          <ul className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3 md:gap-0 md:divide-x md:divide-line">
            {live.placements.cards.map((c, i) => {
              const Icon = [Trophy, Sparkles, Building2][i] ?? Trophy;
              return (
                <Reveal as="li" key={c.title} delay={0.06 * i} className="text-center md:px-8">
                  <Icon aria-hidden="true" className="mx-auto h-6 w-6 text-brand" strokeWidth={1.75} />
                  <h3 className="mt-3 font-display text-base font-semibold text-ink">{c.title}</h3>
                  <p className="mx-auto mt-1.5 max-w-xs text-sm leading-relaxed text-muted">{c.text}</p>
                </Reveal>
              );
            })}
          </ul>
          ) : null}
          {live.placements.facultyStats?.items.length ? (
            <Reveal className="on-dark relative mx-auto mt-10 max-w-5xl overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-brand to-[var(--brand-deep)] px-6 py-8 text-white sm:px-10 lg:mt-12">
              <span aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:14px_14px] [mask-image:linear-gradient(to_right,black,transparent_70%)]" />
              <span aria-hidden="true" className="absolute -right-10 -top-14 h-40 w-40 rounded-full border-[1.25rem] border-[var(--hl)]/20" />
              <h3 className="relative text-center font-display text-lg font-semibold leading-snug sm:text-xl">
                <span className="eyebrow mb-2 block text-[var(--hl)]">Placements</span>
                {live.placements.facultyStats.heading}
              </h3>
              <dl className="relative mt-6 grid grid-cols-2 gap-x-4 gap-y-6 lg:grid-cols-4 lg:divide-x lg:divide-white/15">
                {live.placements.facultyStats.items.map((s) => (
                  <div key={s.label} className="flex flex-col-reverse text-center lg:px-4">
                    <dt className="mt-1.5 text-xs font-medium uppercase tracking-[0.12em] text-white/75 sm:text-[0.8125rem]">{s.label}</dt>
                    <dd className="font-display text-[1.875rem] font-semibold leading-none tracking-tight text-white sm:text-4xl">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          ) : null}
        </div>
        {live.placements.profiles?.length ? (
        <div className="relative mt-8">
          <h3 className="sr-only">Student placement profiles</h3>
          {(() => {
            const cards = live.placements.profiles.map((p) => (
              <article
                key={p.name}
                className="group flex h-full w-60 flex-col overflow-hidden rounded-2xl border border-line bg-white text-center transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-brand/25"
              >
                <div className="relative h-20 bg-gradient-to-br from-brand to-[var(--brand-deep)]">
                  <span aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:12px_12px]" />
                  <span aria-hidden="true" className="absolute -right-6 -top-8 h-24 w-24 rounded-full border-[10px] border-[var(--hl)]/30" />
                </div>
                <span className="relative mx-auto -mt-12 h-24 w-24 overflow-hidden rounded-full bg-brand-soft ring-4 ring-white shadow-[0_10px_24px_-12px_rgba(10,20,50,0.6)]">
                  <Pic img={p.photo as Img} sizes="96px" className="object-top" />
                </span>
                <div className="flex flex-1 flex-col px-4 pb-4 pt-3">
                  <h4 className="font-display text-[1.0625rem] font-semibold leading-tight text-ink">{p.name}</h4>
                  {p.batch && <p className="mt-1 text-xs font-semibold uppercase tracking-[0.1em] text-brand">{p.batch}</p>}
                  {p.department && <p className="mt-0.5 text-[0.8125rem] text-muted">{p.department}</p>}
                  <div className="mt-auto flex items-center justify-between gap-2 border-t border-line pt-3">
                    <span className="relative flex h-7 min-w-0 flex-1 items-center">
                      {p.companyLogo ? <Pic img={p.companyLogo} sizes="80px" contain className="!object-left" /> : p.company ? <span className="truncate text-left text-xs font-semibold text-ink">{p.company}</span> : null}
                    </span>
                    {p.ctc && <span className="whitespace-nowrap rounded-full bg-[var(--hl)] px-2.5 py-1 text-xs font-bold text-brand-ink">{p.ctc}</span>}
                  </div>
                </div>
              </article>
            ));
            return cards.length >= 6 ? (
              <ItemMarquee duration={Math.max(cards.length * 5, 30)}>{cards}</ItemMarquee>
            ) : (
              <ul className="container-x flex flex-wrap justify-center gap-5 py-3">
                {cards.map((c, i) => (
                  <Reveal as="li" key={i} delay={0.06 * i}>
                    {c}
                  </Reveal>
                ))}
              </ul>
            );
          })()}
        </div>
        ) : null}
      </section>
  );
}

export function RecruitersSection({ live }: SectionProps) {
  if (!live.recruiters) return null;
  return (
      <section id="recruiters" className="py-12 lg:py-16 scroll-mt-10 overflow-hidden bg-surface-alt">
        <div className="container-x">
          <Heading>
            {live.recruiters.heading}
          </Heading>
        </div>
        <LogoMarquee logos={live.recruiters.logos as { name: string; logo: Img }[]} />
      </section>
  );
}

export function CollaborationsSection({ live, globe }: SectionProps) {
  if (!live.collaborations) return null;
  return (
      <section id="collaborations" className="relative scroll-mt-10 overflow-hidden bg-surface-alt pt-12 lg:pt-16">
        <div className="container-x grid grid-cols-[minmax(0,1fr)] items-end gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-8">
          {/* left: heading + looping partner logos */}
          <div className="min-w-0 lg:self-center lg:pb-16">
            <Heading align="left">
              {live.collaborations.heading}
            </Heading>
            <div className="-mx-5 sm:mx-0">
              <CardMarquee compact duration={32} items={live.collaborations.items as { name: string; logo: Img }[]} />
            </div>
          </div>
          {/* right: rotating half-globe on the section's bottom edge */}
          <HalfGlobe
            className="!w-[88%] sm:!w-full lg:-ml-[14%] lg:!w-[128%] lg:max-w-none"
            {...(globe ? { home: globe.home, partners: globe.partners, baseColor: globe.base, markerColor: globe.marker, glowColor: globe.glow } : {})}
          />
        </div>
      </section>
  );
}

export function RankingsSection({ live }: SectionProps) {
  if (!live.rankings) return null;
  return (
      <section id="rankings" className="py-12 lg:py-16 relative scroll-mt-10 overflow-hidden bg-gradient-to-b from-white to-surface-alt">
        <div aria-hidden="true" className="absolute inset-0 opacity-[0.35] [background-image:radial-gradient(var(--line)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />
        <div className="container-x relative">
          <Heading eyebrow="Recognition" Icon={Award}>
            {live.rankings.heading}
          </Heading>
          <ul className="grid gap-3 sm:auto-rows-fr sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-5">
            {live.rankings.items.map((r, i) => {
              const body = r.body;
              return (
                <Reveal
                  as="li"
                  key={i}
                  delay={0.05 * (i % 3)}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white p-5 shadow-[0_1px_2px_rgba(10,20,50,0.04)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-brand/25 lg:p-6"
                >
                  <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-brand transition-transform duration-500 group-hover:scale-x-100" />
                  <div className="flex shrink-0 items-center justify-between gap-4">
                    <span className="flex h-16 w-24 items-center justify-center rounded-xl bg-surface-alt p-2.5 ring-1 ring-line transition-[transform,background-color] duration-300 group-hover:scale-[1.03] group-hover:bg-white">
                      <span className="relative h-full w-full">
                        {r.badge ? <Pic img={r.badge} sizes="96px" contain /> : <Award aria-hidden="true" className="absolute inset-0 m-auto h-7 w-7 text-brand" strokeWidth={1.5} />}
                      </span>
                    </span>
                    <span aria-hidden="true" className="hidden font-display text-3xl font-semibold text-brand/10 sm:inline transition-colors duration-300 group-hover:text-brand/20">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="min-w-0">
                  <h3 className="mt-4 font-display text-base font-semibold text-ink sm:mt-5">{body}</h3>
                  {r.title && r.title.trim().toLowerCase() !== body.trim().toLowerCase() && <p className="mt-1 text-sm font-semibold text-brand">{r.title}</p>}
                  <p className="mt-1.5 whitespace-pre-line text-sm leading-relaxed text-muted sm:mt-2">{r.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>
  );
}

export function Stats2Section({ live }: SectionProps) {
  return live.stats2?.length ? <StatBand items={live.stats2} icons={[Globe2, Users, Sparkles]} /> : null;
}

export function HighlightsSection({ live }: SectionProps) {
  return (
        <section className="bg-white py-12 lg:py-16">
          {/* highlight banners – full width */}
          {live.highlightSlides?.length ? (
            <div className="container-x mb-8">
              <Reveal className="mx-auto max-w-5xl">
                <StatBannerCarousel slides={live.highlightSlides} />
              </Reveal>
            </div>
          ) : null}
          {/* milestones – single auto-looping row */}
          {live.facts?.length ? <MilestoneMarquee items={live.facts.map((f) => ({ ...f, icon: f.icon ?? "Award" }))} /> : null}
        </section>
  );
}

export function TestimonialsSection({ live }: SectionProps) {
  if (!live.testimonials) return null;
  return (
      <section id="testimonials" className="relative scroll-mt-10 overflow-hidden bg-surface-alt py-12 lg:py-16">
        <div aria-hidden="true" className="absolute -right-24 top-10 h-72 w-72 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--hl)_25%,transparent),transparent_65%)]" />
        <div aria-hidden="true" className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--brand)_12%,transparent),transparent_65%)]" />
        <div className="container-x relative">
          <Heading eyebrow="Student voices" Icon={PlayCircle}>
            {live.testimonials.heading}
          </Heading>
          <AnimatedTestimonials items={live.testimonials.items} />
        </div>
      </section>
  );
}

export function CampusSection({ live }: SectionProps) {
  if (!live.campus) return null;
  return (
      <section id="campus" className="py-12 lg:py-16 scroll-mt-10 bg-white">
        <div className="container-x">
          <Heading eyebrow="Campus life" Icon={Camera}>
            {live.campus.heading}
          </Heading>
          <Reveal>
            <AccordionGallery items={live.campus.items} />
          </Reveal>
        </div>
      </section>
  );
}

export function AdmissionSection({ live }: SectionProps) {
  return (
      <section id="admission" className="relative scroll-mt-10 overflow-hidden bg-surface-alt py-12 lg:py-16">
        <div aria-hidden="true" className="absolute inset-0 opacity-50 [background-image:radial-gradient(color-mix(in_srgb,var(--brand)_12%,transparent)_1px,transparent_1.2px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,black,transparent_60%)]" />
        <div className="container-x relative">
          <Heading eyebrow="Admission process" Icon={ClipboardList} intro={live.steps?.intro}>
                {live.steps?.heading ?? "Steps to follow"}
              </Heading>
  
          {live.steps?.items.length ? (
          <Reveal className="rounded-3xl border border-line bg-white p-6 shadow-[0_30px_60px_-45px_rgba(10,20,50,0.45)] sm:p-8 lg:px-10 lg:py-10">
            <ProcessStepper steps={live.steps.items} icons={live.steps.icons ?? STEP_ICONS} />
          </Reveal>
          ) : null}
  
          {live.madeSimple?.items.length ? (
          <div className="mt-6 grid gap-4 lg:grid-cols-[15rem_minmax(0,1fr)_auto] lg:items-center lg:gap-6">
            <div>
              <h3 className="font-display text-xl font-semibold text-ink">{live.madeSimple.heading}</h3>
              <p className="mt-0.5 text-sm text-muted">{live.madeSimple.subheading}</p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-3">
              {live.madeSimple.items.map((m, i) => {
                const Icon = [Camera, FileSignature, CreditCard][i] ?? CreditCard;
                const [title, detail] = m.split(" – ");
                return (
                  <Reveal as="li" key={m} delay={0.06 * i} className="group flex h-full items-center gap-3 rounded-2xl border border-line bg-white p-4 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-[var(--hl)]/70">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--hl)]/25 text-[var(--hl-ink)] transition-colors group-hover:bg-[var(--hl)] group-hover:text-brand-ink">
                      <Icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold leading-snug text-ink">{title}</span>
                      {detail && <span className="block text-xs text-muted">{detail}</span>}
                    </span>
                  </Reveal>
                );
              })}
            </ul>
            <a href="#top" className={`${btn.accent} whitespace-nowrap`}>
              Register Now
            </a>
          </div>
          ) : null}
        </div>
      </section>
  );
}

export function FaqsSection({ live }: SectionProps) {
  if (!live.faqs) return null;
  return (
        <section id="faqs" className="scroll-mt-10 bg-white py-12 lg:py-16">
          <div className="container-x">
            <Heading eyebrow="FAQs" Icon={HelpCircle}>
              {live.faqs.heading}
            </Heading>
            <div className="mx-auto max-w-3xl divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white">
              {live.faqs.items.map((f) => (
                <details key={f.q} className="group">
                  <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left font-display text-[0.98rem] font-semibold text-ink transition-colors hover:bg-surface-alt">
                    {f.q}
                    <span aria-hidden="true" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-soft text-lg leading-none text-brand transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="whitespace-pre-line px-5 pb-5 text-sm leading-relaxed text-muted">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
  );
}

export function ContactSection({ live }: SectionProps) {
  return (
      <section id="contact" className="py-12 lg:py-16 scroll-mt-10 bg-white">
        <div className={`container-x grid gap-8 lg:items-center ${live.contact.map ? "lg:grid-cols-[1.2fr_1fr]" : "max-w-3xl"}`}>
          {live.contact.map && (
            <Reveal mask className="relative aspect-[2/1] overflow-hidden rounded-[var(--radius-card)] border border-line">
              <Pic img={live.contact.map} sizes="(min-width:1024px) 55vw, 100vw" />
            </Reveal>
          )}
          <div className="space-y-5">
            <h2 className="type-h2 font-display text-ink">Reach us</h2>
            <p className="flex gap-3 text-ink">
              <MapPin aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-accent-ink" />
              {live.contact.address}
            </p>
            {live.contact.phones.map((p) => (
              <PhoneLink key={p.href} tel={p.href.replace("tel:", "")} location="contact" className="flex min-h-11 items-center gap-3 font-semibold text-ink hover:text-brand">
                <Phone aria-hidden="true" className="h-5 w-5 text-accent-ink" />
                {p.display}
              </PhoneLink>
            ))}
            {live.contact.emails.map((e) => (
              <a key={e} href={`mailto:${e}`} className="flex min-h-11 items-center gap-3 break-all font-semibold text-ink hover:text-brand">
                <Mail aria-hidden="true" className="h-5 w-5 text-accent-ink" />
                {e}
              </a>
            ))}
            {live.contact.landmarks?.length ? <p className="text-sm text-muted">Nearby: {live.contact.landmarks.join(" · ")}</p> : null}
          </div>
        </div>
      </section>
  );
}

export function CtaSection({ live }: SectionProps) {
  return <CtaBand text={live.ctaHeading} student={live.ctaStudent} />;
}

export const defaultSections: Required<SectionSet> = {
  promo: PromoSection,
  why: WhySection,
  stats1: Stats1Section,
  placements: PlacementsSection,
  recruiters: RecruitersSection,
  collaborations: CollaborationsSection,
  rankings: RankingsSection,
  stats2: Stats2Section,
  highlights: HighlightsSection,
  testimonials: TestimonialsSection,
  campus: CampusSection,
  admission: AdmissionSection,
  faqs: FaqsSection,
  contact: ContactSection,
  cta: CtaSection,
};
