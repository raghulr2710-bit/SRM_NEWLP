import Image from "next/image";
import type { CSSProperties } from "react";
import {
  Award,
  Briefcase,
  Building2,
  Camera,
  ClipboardList,
  GraduationCap,
  HelpCircle,
  Hourglass,
  Landmark,
  Mail,
  MapPin,
  Phone,
  PlayCircle,
  Send,
  Smartphone,
  Trophy,
  Upload,
  UserPlus,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/common/Reveal";
import { PhoneLink } from "@/components/common/Cta";
import { btn } from "@/components/common/buttons";
import { PromoVideo } from "../PromoVideo";
import { Heading, Pic, PromoHeading, Value, type Img } from "../parts";
import type { LiveData, LiveImg } from "../types";
import { FocusGallery, SpotlightCard, TiltCard, TimelineRail, QuoteSlider, WhyShowcase } from "./easwari.client";
import type { SectionProps, SectionSet } from "./types";

/**
 * Easwari Engineering College section designs: warm, heritage, student-centric.
 * Maroon + Easwari yellow highlight; references from Motion Studio noted per section.
 */

const FACT_ICONS: Record<string, LucideIcon> = { Hourglass, Users, GraduationCap, Building2, Trophy, Award };
const STEP_ICONS: LucideIcon[] = [UserPlus, Smartphone, ClipboardList, Upload, Send];

/** Promo: video left, text right (PromoVideo kept). */
function EasPromo({ live }: SectionProps) {
  if (!live.promo) return null;
  const hasVideo = Boolean(live.promo.videoUrl);
  return (
    <section className="relative overflow-hidden bg-surface-alt py-12 lg:py-16">
      <div className={`container-x grid items-center gap-8 lg:gap-14 ${hasVideo ? "lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]" : "max-w-3xl"}`}>
        {live.promo.videoUrl && (
          <Reveal className="relative order-2 lg:order-1">
            <span aria-hidden="true" className="absolute -bottom-3 -left-3 h-2/3 w-2/3 rounded-[1.75rem] bg-[var(--hl)]/60 sm:-bottom-4 sm:-left-4" />
            <div className="relative rounded-[1.5rem] bg-white p-2 shadow-[0_30px_60px_-40px_rgba(60,10,20,0.5)] ring-1 ring-line">
              <PromoVideo url={live.promo.videoUrl} title={live.meta.videoTitle ?? live.meta.shortName} />
            </div>
          </Reveal>
        )}
        <Reveal delay={0.08} className="order-1 lg:order-2">
          <p className="eyebrow mb-4 inline-flex items-center gap-2 text-accent-ink">
            <Trophy aria-hidden="true" className="h-4 w-4" /> {live.meta.shortName}
          </p>
          <PromoHeading text={live.promo.heading} />
          <span aria-hidden="true" className="mt-5 block h-1 w-14 rounded-full bg-[var(--hl)]" />
          <p className="type-lead mt-5 text-muted">{live.promo.text}</p>
        </Reveal>
      </div>
    </section>
  );
}

/** Why: Motion Studio aceternity-components-direction-aware-hover — uniform photo grid. */
function EasWhy({ live }: SectionProps) {
  if (!live.why) return null;
  const items = live.why.items.filter((w): w is { title: string; image: LiveImg } => Boolean(w.image));
  if (!items.length) return null;
  return (
    <section id="why" className="scroll-mt-10 bg-white py-12 lg:py-16">
      <div className="container-x">
        <Heading wide intro={live.why.intro}>
          {live.why.heading}
        </Heading>
        <Reveal>
          <WhyShowcase items={items} />
        </Reveal>
      </div>
    </section>
  );
}

/** Stats band: maroon, label above, large left-aligned figures with yellow underline accents. */
function EasStats1({ live }: SectionProps) {
  if (!live.stats1?.length) return null;
  return (
    <section aria-label="Key figures" className="on-dark relative overflow-hidden bg-gradient-to-r from-[var(--brand-deep)] to-brand text-on-brand">
      <div aria-hidden="true" className="absolute inset-0 opacity-[0.07] [background-image:repeating-linear-gradient(135deg,white_0_1px,transparent_1px_18px)]" />
      <dl className="container-x relative grid gap-8 py-10 sm:grid-cols-3 sm:gap-6 lg:py-14">
        {live.stats1.map((s, i) => (
          <Reveal key={s.label} delay={0.08 * i} className="flex flex-col sm:border-l sm:border-white/15 sm:pl-6 sm:first:border-l-0 sm:first:pl-0">
            <dt className="text-[0.8125rem] font-semibold uppercase tracking-[0.16em] text-white/70">{s.label}</dt>
            <dd className="mt-2 font-display text-[2.5rem] font-semibold leading-none tracking-tight sm:text-5xl lg:text-6xl [&_[aria-hidden]>span]:text-[var(--hl)]">
              <Value v={s.value} label={s.label} />
            </dd>
            <span aria-hidden="true" className="mt-4 block h-1 w-16 rounded-full bg-[var(--hl)]" />
          </Reveal>
        ))}
      </dl>
    </section>
  );
}

type Profile = NonNullable<NonNullable<LiveData["placements"]>["profiles"]>[number];

function ProfileCard({ p }: { p: Profile }) {
  return (
    <article className="group flex h-full w-[17rem] flex-col overflow-hidden rounded-3xl sm:w-[19rem] border border-line bg-white text-center shadow-[0_18px_40px_-30px_rgba(60,10,20,0.5)] transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-[var(--hl)]">
      <div className="relative h-24 overflow-hidden bg-gradient-to-br from-brand to-[var(--brand-deep)] sm:h-28">
        <span aria-hidden="true" className="absolute inset-0 opacity-[0.12] [background-image:repeating-linear-gradient(135deg,white_0_1px,transparent_1px_12px)]" />
        <span aria-hidden="true" className="absolute -right-6 -top-8 h-28 w-28 rounded-full border-[0.75rem] border-[var(--hl)]/35" />
      </div>
      <span className="relative mx-auto -mt-16 h-32 w-32 overflow-hidden rounded-full bg-brand-soft ring-[5px] ring-white shadow-[0_14px_30px_-14px_rgba(60,10,20,0.6)]">
        <Pic img={p.photo as Img} sizes="128px" className="object-top" />
      </span>
      <div className="flex flex-1 flex-col items-center px-5 pb-6 pt-4">
        <h4 className="font-display text-xl font-semibold leading-tight text-ink">{p.name}</h4>
        {p.batch && <p className="mt-1.5 text-[0.8125rem] font-semibold uppercase tracking-[0.12em] text-brand">{p.batch}</p>}
        {p.department && <p className="mt-0.5 text-[0.8125rem] text-muted">{p.department}</p>}
        {p.company && <p className="mt-0.5 truncate text-[0.8125rem] font-semibold text-ink">{p.company}</p>}
        {p.ctc && (
          <div className="mt-auto pt-3.5">
            <span className="inline-block rounded-full bg-[var(--hl)] px-4 py-1.5 text-sm font-bold text-brand-ink">{p.ctc}</span>
          </div>
        )}
      </div>
    </article>
  );
}

/** One marquee row (CSS .marquee-track: pauses on hover/focus; reduced motion wraps). */
function MovingRow({ profiles, reverse = false, duplicateOnly = false }: { profiles: Profile[]; reverse?: boolean; duplicateOnly?: boolean }) {
  const style = { "--marquee-duration": `${Math.max(profiles.length * 6, 30)}s`, animationDirection: reverse ? "reverse" : undefined } as CSSProperties;
  return (
    <div
      aria-hidden={duplicateOnly || undefined}
      inert={duplicateOnly || undefined}
      className={`marquee relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)] motion-reduce:[mask-image:none] ${duplicateOnly ? "motion-reduce:hidden" : ""}`}
    >
      <ul className="marquee-track flex w-max gap-6 py-3 pr-6 motion-reduce:w-auto motion-reduce:justify-center" style={style}>
        {profiles.map((p, i) => (
          <li key={`a${i}`} className="shrink-0">
            <ProfileCard p={p} />
          </li>
        ))}
        {profiles.map((p, i) => (
          <li key={`b${i}`} aria-hidden="true" inert className="shrink-0 motion-reduce:hidden">
            <ProfileCard p={p} />
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Placements: Motion Studio magicui marquee — one auto-scrolling row of portrait cards (pauses on hover). */
function EasPlacements({ live }: SectionProps) {
  if (!live.placements) return null;
  const profiles = live.placements.profiles ?? [];
  return (
    <section id="placements" className="relative scroll-mt-10 overflow-hidden bg-white py-12 lg:py-16">
      <div className="container-x">
        <Heading eyebrow="Placements" Icon={Briefcase}>
          {live.placements.heading}
        </Heading>
        {live.placements.cards?.length ? (
          <ul className="mx-auto mb-8 grid max-w-5xl gap-4 md:grid-cols-3">
            {live.placements.cards.map((c, i) => (
              <Reveal as="li" key={c.title} delay={0.06 * i} className="rounded-2xl border-t-4 border-[var(--hl)] bg-surface-alt p-5">
                <h3 className="font-display text-base font-semibold text-ink">{c.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{c.text}</p>
              </Reveal>
            ))}
          </ul>
        ) : null}
      </div>
      {profiles.length ? (
        <div className="relative space-y-3">
          <h3 className="sr-only">Student placement profiles</h3>
          {profiles.length >= 5 ? (
            <MovingRow profiles={profiles} />
          ) : (
            <ul className="container-x flex flex-wrap justify-center gap-4">
              {profiles.map((p) => (
                <li key={p.name}>
                  <ProfileCard p={p} />
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : null}
    </section>
  );
}

/** Recruiters: logo grid with aceternity-components-hover-border-gradient style borders on hover. */
function EasRecruiters({ live }: SectionProps) {
  if (!live.recruiters) return null;
  const logos = live.recruiters.logos.filter((l) => l.logo);
  return (
    <section id="recruiters" className="scroll-mt-10 bg-surface-alt py-12 lg:py-16">
      <div className="container-x">
        <Heading>
          {live.recruiters.heading}
        </Heading>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {logos.map((l, i) => (
            <Reveal as="li" key={l.name} delay={0.03 * (i % 8)} className="group relative overflow-hidden rounded-xl bg-line p-px">
              <span
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 aspect-square w-[160%] -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-300 [background:conic-gradient(from_0deg,transparent_0deg,var(--brand)_70deg,var(--hl)_120deg,transparent_180deg,transparent_360deg)] group-hover:opacity-100 motion-safe:animate-spin motion-safe:[animation-duration:3.5s]"
              />
              <span className="relative block h-20 rounded-[11px] bg-white p-3">
                <span className="relative block h-full w-full">
                  <Pic img={l.logo} sizes="(min-width:1024px) 140px, (min-width:640px) 22vw, 45vw" contain />
                </span>
              </span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Collaborations: row of partner cards with aceternity-components-3d-card subtle tilt. */
function EasCollaborations({ live }: SectionProps) {
  if (!live.collaborations) return null;
  return (
    <section id="collaborations" className="scroll-mt-10 bg-white py-12 lg:py-16">
      <div className="container-x">
        <Heading>
          {live.collaborations.heading}
        </Heading>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
          {live.collaborations.items.map((c, i) => (
            <Reveal as="li" key={c.name} delay={0.05 * i} className="last:odd:col-span-2 sm:last:odd:col-span-1">
              <TiltCard className="flex h-full flex-col items-center rounded-2xl border border-line bg-white p-4 shadow-[0_18px_40px_-30px_rgba(60,10,20,0.45)] transition-[border-color] duration-300 hover:border-[var(--hl)] sm:p-5">
                <span className="relative block aspect-[449/153] w-full max-w-56 [transform:translateZ(28px)]">
                  {c.logo ? <Pic img={c.logo} sizes="(min-width:1024px) 220px, 45vw" contain /> : null}
                </span>
                <span aria-hidden="true" className="mt-4 block h-0.5 w-8 rounded-full bg-[var(--hl)]" />
                <p className="mt-2 text-center text-[0.8125rem] font-medium leading-snug text-muted [transform:translateZ(14px)]">{c.name}</p>
              </TiltCard>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Rankings: aceternity-components-card-spotlight cards (badge, or a lucide fallback icon). */
function EasRankings({ live }: SectionProps) {
  if (!live.rankings) return null;
  return (
    <section id="rankings" className="relative scroll-mt-10 bg-surface-alt py-12 lg:py-16">
      <div className="container-x">
        <Heading eyebrow="Recognition" Icon={Award}>
          {live.rankings.heading}
        </Heading>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {live.rankings.items.map((r, i) => (
            <Reveal as="li" key={i} delay={0.06 * i}>
              <SpotlightCard className="h-full rounded-2xl border border-line bg-white p-6 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-brand/30">
                <div className="flex items-start justify-between gap-4">
                  <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-surface-alt ring-1 ring-line">
                    {r.badge ? (
                      <span className="relative block h-14 w-14">
                        <Pic img={r.badge} sizes="56px" contain />
                      </span>
                    ) : (
                      <Landmark aria-hidden="true" className="h-8 w-8 text-brand" strokeWidth={1.5} />
                    )}
                  </span>
                  <span aria-hidden="true" className="font-display text-2xl font-semibold text-[var(--hl-deep)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-ink">{r.body}</h3>
                {r.title && r.title.trim().toLowerCase() !== r.body.trim().toLowerCase() && <p className="mt-0.5 text-sm font-semibold text-brand">{r.title}</p>}
                <span aria-hidden="true" className="mt-3 block h-0.5 w-10 rounded-full bg-[var(--hl)]" />
                <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-muted">{r.text}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Highlights (facts): magicui number-ticker style stat tiles with a yellow top rule. */
function EasHighlights({ live }: SectionProps) {
  if (!live.facts?.length) return null;
  return (
    <section aria-label="Highlights" className="bg-white py-12 lg:py-16">
      <ul className="container-x grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5">
        {live.facts.map((f, i) => {
          const Icon = FACT_ICONS[f.icon ?? ""] ?? Award;
          return (
            <Reveal
              as="li"
              key={f.label}
              delay={0.06 * i}
              className="first:col-span-2 lg:first:col-span-1 flex flex-col rounded-2xl border border-line border-t-4 border-t-[var(--hl)] bg-surface-alt p-5 lg:p-6"
            >
              <Icon aria-hidden="true" className="h-5 w-5 text-brand" strokeWidth={1.75} />
              <span className="mt-4 font-display text-3xl font-semibold leading-none tracking-tight text-brand lg:text-[2.5rem] [&_[aria-hidden]>span]:text-[var(--hl-ink)]">
                <Value v={f.value} label={f.label} />
              </span>
              <span className="mt-2 text-sm font-medium text-muted">{f.label}</span>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}

/** Testimonials: Motion Studio aceternity-components-animated-testimonials — one story at a time slider. */
function EasTestimonials({ live }: SectionProps) {
  if (!live.testimonials) return null;
  return (
    <section id="testimonials" className="relative scroll-mt-10 overflow-hidden bg-surface-alt py-12 lg:py-16">
      <div aria-hidden="true" className="absolute -right-24 top-10 h-72 w-72 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--hl)_25%,transparent),transparent_65%)]" />
      <div className="container-x relative">
        <Heading eyebrow="Student voices" Icon={PlayCircle}>
          {live.testimonials.heading}
        </Heading>
        <Reveal>
          <QuoteSlider items={live.testimonials.items} />
        </Reveal>
      </div>
    </section>
  );
}

/** Campus: focus-cards gallery (hover one, others blur/dim). */
function EasCampus({ live }: SectionProps) {
  if (!live.campus) return null;
  return (
    <section id="campus" className="scroll-mt-10 bg-white py-12 lg:py-16">
      <div className="container-x">
        <Heading eyebrow="Campus life" Icon={Camera}>
          {live.campus.heading}
        </Heading>
        <Reveal>
          <FocusGallery items={live.campus.items} />
        </Reveal>
      </div>
    </section>
  );
}

/** Admission: aceternity-components-timeline — horizontal numbered cards (desktop) / vertical scroll-filled timeline (mobile). */
function EasAdmission({ live }: SectionProps) {
  const steps = live.steps?.items ?? [];
  return (
    <section id="admission" className="relative scroll-mt-10 overflow-hidden bg-surface-alt py-12 lg:py-16">
      <div className="container-x">
        <Heading eyebrow="Admission process" Icon={ClipboardList}>
          Steps to follow
        </Heading>
        {steps.length ? (
          <TimelineRail className="lg:[&>span]:hidden">
            <ol className="relative space-y-4 lg:grid lg:space-y-0 lg:gap-4" style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}>
              <span aria-hidden="true" className="absolute left-[10%] right-[10%] top-[1.375rem] hidden h-0.5 bg-[repeating-linear-gradient(90deg,var(--brand)_0_8px,transparent_8px_14px)] opacity-40 lg:block" />
              {steps.map((s, i) => {
                const Icon = STEP_ICONS[i] ?? ClipboardList;
                return (
                  <Reveal as="li" key={s} delay={0.07 * i} className="relative pl-16 lg:flex lg:flex-col lg:items-center lg:pl-0 lg:text-center">
                    <span className="absolute left-0 top-1 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-brand font-display text-base font-semibold text-white ring-4 ring-surface-alt lg:static lg:top-auto">
                      {i + 1}
                    </span>
                    <div className="rounded-2xl border border-line bg-white p-4 shadow-[0_14px_30px_-26px_rgba(60,10,20,0.5)] lg:mt-5 lg:flex lg:w-full lg:flex-1 lg:flex-col lg:items-center lg:p-5">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--hl)]/30 text-[var(--hl-ink)]">
                        <Icon aria-hidden="true" className="h-5 w-5" />
                      </span>
                      <p className="mt-3 text-xs font-semibold uppercase tracking-[0.12em] text-brand">Step {i + 1}</p>
                      <h3 className="mt-1 font-display text-base font-semibold leading-snug text-ink">{s}</h3>
                    </div>
                  </Reveal>
                );
              })}
            </ol>
          </TimelineRail>
        ) : null}
        <div className="mt-8 flex justify-center">
          <a href="#top" className={`${btn.accent} whitespace-nowrap`}>
            Register Now
          </a>
        </div>
      </div>
    </section>
  );
}

/** FAQs: simple accordion cards, two columns on desktop, maroon plus icons. */
function EasFaqs({ live }: SectionProps) {
  if (!live.faqs) return null;
  const items = live.faqs.items;
  const half = Math.ceil(items.length / 2);
  const cols = [items.slice(0, half), items.slice(half)];
  return (
    <section id="faqs" className="scroll-mt-10 bg-white py-12 lg:py-16">
      <div className="container-x">
        <Heading eyebrow="FAQs" Icon={HelpCircle}>
          {live.faqs.heading}
        </Heading>
        <div className="mx-auto grid max-w-6xl gap-3 lg:grid-cols-2 lg:items-start lg:gap-4">
          {cols.map((col, c) => (
            <div key={c} className="space-y-3 lg:space-y-4">
              {col.map((f) => (
                <details key={f.q} className="group rounded-2xl border border-line bg-white transition-colors open:border-brand/30 open:bg-surface-alt">
                  <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-5 py-4 text-left font-display text-[0.98rem] font-semibold text-ink outline-none focus-visible:ring-2 focus-visible:ring-brand [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span aria-hidden="true" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand text-lg leading-none text-white transition-transform duration-300 group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="whitespace-pre-line px-5 pb-5 text-sm leading-relaxed text-muted">{f.a}</p>
                </details>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Contact: three cards (address / phone / email). */
function EasContact({ live }: SectionProps) {
  const card = "flex h-full flex-col rounded-2xl border border-line bg-white p-6 shadow-[0_14px_30px_-26px_rgba(60,10,20,0.45)]";
  const icon = "flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--hl)] text-brand-ink";
  return (
    <section id="contact" className="scroll-mt-10 bg-surface-alt py-12 lg:py-16">
      <div className="container-x">
        <Reveal className="mb-8 text-center">
          <h2 className="type-h2 font-display text-ink">Reach us</h2>
        </Reveal>
        <ul className="mx-auto grid max-w-5xl gap-4 md:grid-cols-3">
          <Reveal as="li" className={card}>
            <span className={icon}>
              <MapPin aria-hidden="true" className="h-5 w-5" />
            </span>
            <h3 className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-brand">Address</h3>
            <p className="mt-2 text-ink">{live.contact.address}</p>
            {live.contact.landmarks?.length ? <p className="mt-2 text-sm text-muted">Nearby: {live.contact.landmarks.join(" · ")}</p> : null}
          </Reveal>
          {live.contact.phones.length ? (
            <Reveal as="li" delay={0.06} className={card}>
              <span className={icon}>
                <Phone aria-hidden="true" className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-brand">Phone</h3>
              <div className="mt-1">
                {live.contact.phones.map((p) => (
                  <PhoneLink key={p.href} tel={p.href.replace("tel:", "")} location="contact" className="flex min-h-11 items-center font-semibold text-ink hover:text-brand">
                    {p.display}
                  </PhoneLink>
                ))}
              </div>
            </Reveal>
          ) : null}
          {live.contact.emails.length ? (
            <Reveal as="li" delay={0.12} className={card}>
              <span className={icon}>
                <Mail aria-hidden="true" className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-brand">Email</h3>
              <div className="mt-1">
                {live.contact.emails.map((e) => (
                  <a key={e} href={`mailto:${e}`} className="flex min-h-11 items-center break-all font-semibold text-ink hover:text-brand">
                    {e}
                  </a>
                ))}
              </div>
            </Reveal>
          ) : null}
        </ul>
      </div>
    </section>
  );
}

/** CTA: Easwari-yellow band with a maroon diagonal pattern. */
function EasCta({ live }: SectionProps) {
  return (
    <section className="relative bg-[var(--hl)] text-brand-ink">
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-y-0 right-0 w-full opacity-[0.14] [background-image:repeating-linear-gradient(135deg,var(--brand)_0_2px,transparent_2px_16px)] [mask-image:linear-gradient(90deg,transparent_20%,black)] sm:w-2/3" />
        <div className="absolute inset-y-0 left-0 w-1.5 bg-brand" />
      </div>
      <div className="container-x relative">
        {/* graduate (AI-generated illustration) standing on the band, rising above its top edge – desktop only */}
        <div aria-hidden="true" className="pointer-events-none absolute bottom-0 right-[15.5rem] hidden h-[calc(100%+4.5rem)] aspect-[800/1264] lg:block xl:right-[17rem]">
          {/* circle clipped at the band bottom so it never spills into the footer */}
          <span className="absolute -inset-x-[30%] bottom-0 top-[-10%] overflow-hidden">
            <span className="absolute bottom-[-38%] left-1/2 aspect-square w-[78%] -translate-x-1/2 rounded-full bg-brand/90" />
            <span className="absolute bottom-[-32%] left-1/2 aspect-square w-[92%] -translate-x-1/2 rounded-full border-2 border-dashed border-brand/30" />
          </span>
          <Image src={CTA_STUDENT} alt="" fill sizes="220px" className="object-contain object-bottom" />
        </div>
        <Reveal className="relative flex flex-col items-start gap-6 py-12 sm:flex-row sm:items-center sm:justify-between lg:py-14">
          <h2 className="type-h2 max-w-3xl font-display text-balance lg:max-w-[52%]">{live.ctaHeading}</h2>
          <a
            href="#top"
            className="relative inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-[var(--radius-card)] bg-brand px-6 text-[0.95rem] font-semibold text-white shadow-[0_12px_28px_-14px_color-mix(in_srgb,var(--brand)_90%,transparent)] transition-[background-color,transform] duration-200 hover:bg-brand-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand active:translate-y-px"
          >
            Register Now
          </a>
        </Reveal>
      </div>
    </section>
  );
}

const CTA_STUDENT = "/assets/easwari/students/ai-graduate-offer-cutout.webp";

/** easwari section designs (overrides of the default design). */
export const easwariSections: SectionSet = {
  promo: EasPromo,
  why: EasWhy,
  stats1: EasStats1,
  placements: EasPlacements,
  recruiters: EasRecruiters,
  collaborations: EasCollaborations,
  rankings: EasRankings,
  highlights: EasHighlights,
  testimonials: EasTestimonials,
  campus: EasCampus,
  admission: EasAdmission,
  faqs: EasFaqs,
  contact: EasContact,
  cta: EasCta,
};
