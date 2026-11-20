import {
  ArrowRight,
  Award,
  BadgeCheck,
  BookOpen,
  Briefcase,
  Building2,
  Camera,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  PlayCircle,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/common/Reveal";
import { PhoneLink } from "@/components/common/Cta";
import { PromoVideo } from "../PromoVideo";
import { Heading, Pic, Value, type Img, CtaStudent } from "../parts";
import type { LiveImg } from "../types";
import type { SectionProps, SectionSet } from "./types";
import { TrpFlipCard, TrpParallaxCampus, TrpQuoteCarousel, TrpStickyWhy, TrpTiltProfile, TrpVelocityLogos } from "./trp.client";

/**
 * SRM TRP Engineering College section designs: modern, hands-on, industry-ready engineering.
 * Logo indigo-purple + yellow highlight, Plus Jakarta Sans headings. Each section re-implements
 * a Motion Studio reference (named above each component); client motion lives in ./trp.client.tsx.
 */

const focusRing = "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--hl)]";
const gridPattern =
  "[background-image:linear-gradient(rgba(255,255,255,0.9)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.9)_1px,transparent_1px)] [background-size:44px_44px]";

/* Promo — full-width video with a text card overlapping its bottom-left on desktop (stacked on
   mobile); replaces the default `aceternity-components-container-scroll-animation` frame. */
function TrpPromo({ live }: SectionProps) {
  if (!live.promo) return null;
  const video = live.promo.videoUrl;
  const badges = (live.rankings?.items ?? []).filter((r) => r.badge);
  return (
    <>
      {/* 1 — About: one brand panel, heading left · copy + approval badges right */}
      <section className="relative bg-surface-alt pt-12 lg:pt-16">
        <div className="container-x">
          <Reveal className="on-dark relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand via-brand to-[var(--brand-deep)] p-6 text-white shadow-[0_40px_80px_-50px_color-mix(in_srgb,var(--brand-deep)_80%,transparent)] sm:p-10 lg:p-12">
            <span aria-hidden="true" className={`absolute inset-0 opacity-[0.07] ${gridPattern}`} />
            <span aria-hidden="true" className="absolute -right-16 -top-20 h-64 w-64 rounded-full border-[2.5rem] border-[var(--hl)]/15" />
            <div className="relative grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:items-center lg:gap-14">
              <div>
                <p className="eyebrow mb-3 inline-flex items-center gap-2 text-[var(--hl)]">
                  <Trophy aria-hidden="true" className="h-4 w-4" /> {live.meta.shortName}
                </p>
                <h2 className="type-h2 font-display text-white">{live.promo.heading}</h2>
                <span aria-hidden="true" className="mt-4 block h-1 w-12 rounded-full bg-[var(--hl)]" />
              </div>
              <div className="lg:border-l lg:border-white/15 lg:pl-14">
                <p className="text-[0.98rem] leading-relaxed text-white/80">{live.promo.text}</p>
                {badges.length ? (
                  <ul className="mt-6 flex flex-wrap items-center gap-3" aria-label="Approvals and accreditations">
                    {badges.map((r) => (
                      <li key={r.body} className="flex items-center gap-2.5 rounded-full bg-white/10 py-1.5 pl-1.5 pr-4 ring-1 ring-white/15">
                        <span className="relative h-9 w-9 overflow-hidden rounded-full bg-white p-1">
                          <span className="relative block h-full w-full">
                            <Pic img={r.badge} sizes="36px" contain />
                          </span>
                        </span>
                        <span className="text-sm font-semibold text-white">{r.body}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2 — Video: its own section, large centred film (Magic UI hero-video-dialog) */}
      {video ? (
        <section className="relative bg-surface-alt py-10 lg:py-14">
          <div className="container-x">
            <Reveal className="mx-auto max-w-5xl">
              <div className="rounded-[1.75rem] bg-white p-2 shadow-[0_40px_80px_-50px_color-mix(in_srgb,var(--brand-deep)_70%,transparent)] ring-1 ring-line">
                <PromoVideo url={video} title={live.meta.videoTitle ?? live.meta.shortName} poster="/assets/trp/promo/video-poster.webp" />
              </div>
            </Reveal>
          </div>
        </section>
      ) : (
        <div className="bg-surface-alt pb-12 lg:pb-16" />
      )}
    </>
  );
}

/* Why — `aceternity-components-sticky-scroll-reveal` (see TrpStickyWhy). */
function TrpWhy({ live }: SectionProps) {
  if (!live.why) return null;
  const items = live.why.items.filter((w): w is { title: string; image: LiveImg } => Boolean(w.image));
  if (!items.length) return null;
  return (
    <section id="why" className="scroll-mt-10 bg-white py-12 lg:py-16">
      <div className="container-x">
        <Heading wide intro={live.why.intro}>
          {live.why.heading}
        </Heading>
        <TrpStickyWhy items={items} />
      </div>
    </section>
  );
}

/* Stats 1 — three large metric cards straddling the lower edge of a brand band. */
function TrpStats1({ live }: SectionProps) {
  if (!live.stats1?.length) return null;
  const icons: LucideIcon[] = [BadgeCheck, Briefcase, Trophy];
  return (
    <section aria-label="Key figures" className="relative bg-white py-10 lg:py-14">
      <div aria-hidden="true" className="on-dark absolute inset-x-0 top-0 h-full overflow-hidden sm:h-[55%] bg-gradient-to-br from-brand to-[var(--brand-deep)]">
        <span className={`absolute inset-0 opacity-[0.08] ${gridPattern}`} />
        <span className="absolute -right-16 -top-16 h-56 w-56 rounded-full border-[2.25rem] border-[var(--hl)]/20" />
      </div>
      <dl className="container-x relative grid gap-4 sm:grid-cols-3 lg:gap-6">
        {live.stats1.map((s, i) => {
          const Icon = icons[i] ?? Award;
          return (
            <Reveal
              key={s.label}
              delay={0.08 * i}
              className="relative overflow-hidden rounded-[1.5rem] border border-line bg-white p-6 shadow-[0_30px_60px_-35px_color-mix(in_srgb,var(--brand-deep)_55%,transparent)] lg:p-8"
            >
              <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1.5 bg-[var(--hl)]" />
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-col-reverse">
                  <dt className="mt-3 text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-muted">{s.label}</dt>
                  <dd className="font-display text-[2.5rem] font-bold leading-none tracking-tight text-brand lg:text-[3.5rem] [&_[aria-hidden]>span]:text-[var(--hl-deep)]">
                    <Value v={s.value} label={s.label} />
                  </dd>
                </div>
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-soft text-brand">
                  <Icon aria-hidden="true" className="h-6 w-6" strokeWidth={1.75} />
                </span>
              </div>
            </Reveal>
          );
        })}
      </dl>
    </section>
  );
}

/* Placements — `reactbits-components-tilted-card` (see TrpTiltProfile). */
function TrpPlacements({ live }: SectionProps) {
  if (!live.placements) return null;
  const profiles = live.placements.profiles ?? [];
  return (
    <section id="placements" className="relative scroll-mt-10 overflow-hidden bg-white py-12 lg:py-16">
      <div className="container-x">
        <Heading eyebrow="Placements" Icon={Briefcase}>
          {live.placements.heading}
        </Heading>
        {live.placements.cards?.length ? (
          <ul className="mx-auto mb-10 grid max-w-5xl gap-4 md:grid-cols-3">
            {live.placements.cards.map((c) => (
              <li key={c.title} className="rounded-2xl border border-line p-5">
                <h3 className="font-display text-base font-semibold text-ink">{c.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{c.text}</p>
              </li>
            ))}
          </ul>
        ) : null}
        {profiles.length ? (
          <>
            <h3 className="sr-only">Student placement profiles</h3>
            {/* mobile: one large card at a time, swipe for the rest (snap); sm+: grid */}
            <ul
              aria-label="Student placement profiles"
              className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:mx-auto sm:grid sm:max-w-5xl sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4 lg:gap-6"
            >
              {profiles.map((p, i) => (
                <Reveal as="li" key={p.name} delay={0.07 * i} className="w-[78%] shrink-0 snap-center sm:w-auto">

                  <TrpTiltProfile name={p.name} company={p.company} ctc={p.ctc} photo={p.photo as Img} department={p.department} companyLogo={p.companyLogo as Img | null} />
                </Reveal>
              ))}
            </ul>
          </>
        ) : null}
      </div>
    </section>
  );
}

/* Recruiters — `magicui-docs-components-scroll-based-velocity` (see TrpVelocityLogos). */
function TrpRecruiters({ live }: SectionProps) {
  if (!live.recruiters) return null;
  return (
    <section id="recruiters" className="scroll-mt-10 overflow-hidden bg-surface-alt py-12 lg:py-16">
      <div className="container-x">
        <Heading>
          {live.recruiters.heading}
        </Heading>
      </div>
      <TrpVelocityLogos logos={live.recruiters.logos as { name: string; logo: Img }[]} />
    </section>
  );
}

/* Rankings — `reactbits-r-flipcard-js-css-json` (see TrpFlipCard). */
function TrpRankings({ live }: SectionProps) {
  if (!live.rankings) return null;
  return (
    <section id="rankings" className="relative scroll-mt-10 overflow-hidden bg-white py-12 lg:py-16">
      <div className="container-x">
        <Heading eyebrow="Recognition" Icon={Award}>
          {live.rankings.heading}
        </Heading>
        <ul className={`mx-auto grid gap-4 sm:grid-cols-2 lg:gap-6 ${live.rankings.items.length === 4 ? "max-w-6xl lg:grid-cols-4" : "max-w-5xl lg:grid-cols-3"}`}>
          {live.rankings.items.map((r, i) => (
            <Reveal as="li" key={i} delay={0.06 * i}>
              <TrpFlipCard badge={r.badge} body={r.body} text={r.text} index={i} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* Highlights (facts) — bento: one large brand tile + four smaller tiles, count-up numbers. */
const FACT_ICONS: Record<string, LucideIcon> = { Award, BookOpen, Briefcase, Building2, GraduationCap };

function TrpHighlights({ live }: SectionProps) {
  const facts = live.facts ?? [];
  if (!facts.length) return null;
  return (
    <section aria-label="Highlights" className="bg-surface-alt py-12 lg:py-16">
      <ul className="container-x grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:grid-rows-2">
        {facts.map((f, i) => {
          const Icon = FACT_ICONS[f.icon ?? ""] ?? Award;
          const numeric = /^\D?\d/.test(f.value);
          if (i === 0) {
            return (
              <Reveal
                as="li"
                key={f.label}
                className="on-dark relative col-span-2 flex min-h-56 flex-col justify-between overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-brand to-[var(--brand-deep)] p-6 text-white sm:p-8 lg:row-span-2 lg:min-h-0"
              >
                <span aria-hidden="true" className={`absolute inset-0 opacity-[0.08] ${gridPattern} [mask-image:radial-gradient(circle_at_bottom_right,black,transparent_75%)]`} />
                <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20">
                  <Icon aria-hidden="true" className="h-6 w-6 text-[var(--hl)]" strokeWidth={1.75} />
                </span>
                <div className="relative mt-10">
                  <p className="font-display text-[4rem] font-bold leading-none tracking-tight sm:text-[5.5rem] [&_[aria-hidden]>span]:text-[var(--hl)]">
                    <Value v={f.value} label={f.label} />
                  </p>
                  <p className="mt-3 text-base font-semibold text-white/85 sm:text-lg">{f.label}</p>
                </div>
              </Reveal>
            );
          }
          return (
            <Reveal
              as="li"
              key={f.label}
              delay={0.06 * i}
              className="group flex min-h-40 flex-col justify-between rounded-[1.5rem] border border-line bg-white p-5 transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-brand/30 sm:p-6"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--hl-soft)] text-[var(--hl-ink)] transition-colors group-hover:bg-[var(--hl)] group-hover:text-brand-ink">
                <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <div className="mt-6">
                <p className={`font-display font-bold leading-none tracking-tight text-brand ${numeric ? "text-[2.5rem] sm:text-5xl" : "break-words text-lg sm:text-2xl"}`}>
                  <Value v={f.value} label={f.label} />
                </p>
                <p className="mt-2 text-[0.8125rem] font-medium leading-snug text-muted sm:text-sm">{f.label}</p>
              </div>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}

/* Testimonials — Apple-cards-style snap carousel (`motion-primitives-carousel`, see TrpQuoteCarousel). */
function TrpTestimonials({ live }: SectionProps) {
  if (!live.testimonials) return null;
  return (
    <section id="testimonials" className="relative scroll-mt-10 overflow-hidden bg-white py-12 lg:py-16">
      <div className="container-x">
        <Heading eyebrow={live.testimonials.items.some((t) => t.quote) ? "Student voices" : "Our alumni"} Icon={live.testimonials.items.some((t) => t.quote) ? PlayCircle : GraduationCap}>
          {live.testimonials.heading}
        </Heading>
        <TrpQuoteCarousel items={live.testimonials.items} />
      </div>
    </section>
  );
}

/* Campus — static bento (aceternity layout-grid): one feature photo + four tiles (see TrpParallaxCampus). */
function TrpCampus({ live }: SectionProps) {
  if (!live.campus) return null;
  return (
    <section id="campus" className="scroll-mt-10 overflow-hidden bg-surface-alt py-12 lg:pb-24 lg:pt-16">
      <div className="container-x">
        <Heading eyebrow="Campus life" Icon={Camera}>
          {live.campus.heading}
        </Heading>
        <TrpParallaxCampus items={live.campus.items} />
      </div>
    </section>
  );
}

/* Contact — split card: address / phone / email on the left, quick "Register Now" panel right. */
function TrpContact({ live }: SectionProps) {
  const c = live.contact;
  const row = "flex min-h-11 items-center gap-4";
  const tile = "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand";
  return (
    <section id="contact" className="scroll-mt-10 bg-white py-12 lg:py-16">
      <div className="container-x">
        <Reveal className="mx-auto grid grid-cols-[minmax(0,1fr)] max-w-5xl overflow-hidden rounded-[1.75rem] border border-line bg-white shadow-[0_40px_80px_-60px_color-mix(in_srgb,var(--brand-deep)_70%,transparent)] lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)]">
          <div className="space-y-4 p-6 sm:p-8 lg:p-10">
            <h2 className="type-h2 mb-6 font-display text-ink">Reach us</h2>
            <p className="flex gap-4 text-ink">
              <span className={tile}>
                <MapPin aria-hidden="true" className="h-5 w-5" />
              </span>
              <span className="pt-2.5 leading-relaxed">{c.address}</span>
            </p>
            {c.phones.map((p) => (
              <PhoneLink key={p.href} tel={p.href.replace("tel:", "")} location="contact" className={`${row} rounded-xl font-semibold text-ink hover:text-brand ${focusRing}`}>
                <span className={tile}>
                  <Phone aria-hidden="true" className="h-5 w-5" />
                </span>
                {p.display}
              </PhoneLink>
            ))}
            {c.emails.map((e) => (
              <a key={e} href={`mailto:${e}`} className={`${row} break-all rounded-xl font-semibold text-ink hover:text-brand ${focusRing}`}>
                <span className={tile}>
                  <Mail aria-hidden="true" className="h-5 w-5" />
                </span>
                {e}
              </a>
            ))}
            {c.landmarks?.length ? <p className="pt-2 text-sm text-muted">Nearby: {c.landmarks.join(" · ")}</p> : null}
          </div>
          <div className="on-dark relative flex flex-col justify-between gap-8 overflow-hidden bg-gradient-to-br from-brand to-[var(--brand-deep)] p-6 text-white sm:p-8 lg:p-10">
            <span aria-hidden="true" className={`absolute inset-0 opacity-[0.08] ${gridPattern}`} />
            <span aria-hidden="true" className="absolute -bottom-20 -right-20 h-56 w-56 rounded-full border-[2.25rem] border-[var(--hl)]/20" />
            <div className="relative">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20">
                <GraduationCap aria-hidden="true" className="h-6 w-6 text-[var(--hl)]" strokeWidth={1.75} />
              </span>
              <p className="eyebrow mt-6 text-white/70">{live.meta.shortName}</p>
              <h3 className="mt-2 font-display text-2xl font-semibold leading-tight sm:text-[1.75rem]">{live.hero.formHeading}</h3>
            </div>
            <a
              href="#top"
              className={`relative inline-flex min-h-12 items-center justify-center gap-2 self-start rounded-[var(--radius-card)] bg-[var(--hl)] px-6 text-[0.95rem] font-semibold text-brand-ink transition-[background-color,transform] duration-200 hover:bg-[var(--hl-deep)] active:translate-y-px focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/70`}
            >
              Register Now
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* CTA — brand gradient band with a subtle grid pattern and a yellow button. */
function TrpCta({ live }: SectionProps) {
  return (
    <section className="on-dark relative bg-gradient-to-br from-brand via-brand to-[var(--brand-deep)] text-white">
      <span aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <span className={`absolute inset-0 opacity-[0.09] ${gridPattern} [mask-image:linear-gradient(to_right,transparent,black_35%,black)]`} />
        <span className="absolute inset-x-0 bottom-0 h-[2px] bg-[var(--hl)]" />
      </span>
      <div className="container-x relative">
      <CtaStudent src="/assets/trp/students/ai-student-blueprint-cutout.webp" ratio="800 / 1067" circle="bg-[var(--hl)]" ring="border-[var(--hl)]/50" edge />
      <Reveal className="relative flex flex-col items-start gap-6 py-12 lg:py-16">
        <h2 className="type-h2 max-w-2xl text-balance font-display lg:max-w-[52%]">{live.ctaHeading}</h2>
        <a
          href="#top"
          className="group inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-[var(--radius-card)] bg-[var(--hl)] px-7 text-[0.95rem] font-semibold text-brand-ink shadow-[0_14px_30px_-16px_color-mix(in_srgb,var(--hl)_90%,transparent)] transition-[background-color,transform] duration-200 hover:bg-[var(--hl-deep)] active:translate-y-px focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/70"
        >
          Register Now
          <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-200 motion-safe:group-hover:translate-x-0.5" />
        </a>
      </Reveal>
      </div>
    </section>
  );
}

/** trp section designs (overrides of the default design). */
export const trpSections: SectionSet = {
  promo: TrpPromo,
  why: TrpWhy,
  stats1: TrpStats1,
  placements: TrpPlacements,
  recruiters: TrpRecruiters,
  rankings: TrpRankings,
  highlights: TrpHighlights,
  testimonials: TrpTestimonials,
  campus: TrpCampus,
  contact: TrpContact,
  cta: TrpCta,
};
