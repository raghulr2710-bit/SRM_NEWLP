import {
  Award,
  BookOpen,
  Briefcase,
  Building2,
  Calendar,
  Camera,
  CheckCircle2,
  ClipboardList,
  FlaskConical,
  Globe2,
  GraduationCap,
  HelpCircle,
  Hourglass,
  Mail,
  MapPin,
  Medal,
  Phone,
  Sparkles,
  Star,
  Trophy,
  Users,
  type LucideIcon,
  UserPlus,
  Smartphone,
  Upload,
  Send,
} from "lucide-react";
import Image from "next/image";
import { Reveal } from "@/components/common/Reveal";
import { PhoneLink } from "@/components/common/Cta";
import { btn } from "@/components/common/buttons";
import { PromoVideo } from "../PromoVideo";
import { StatBannerCarousel } from "../LiveMotion";
import { Heading, PromoHeading, Value } from "../parts";
import type { LiveImg, LiveStat } from "../types";
import type { SectionProps, SectionSet } from "./types";
import { CampusCards, FaqAccordion, Marquee3D, ProfileTiltGrid, RankingTabs, SpotlightCard, WhyLayoutGrid } from "./tiruchirappalli.client";

/**
 * SRMIST Tiruchirappalli section designs – "research university": deep ocean blue,
 * amber highlight, structured grids, numbered labels. Overrides the default designs.
 */

const num = (i: number) => String(i + 1).padStart(2, "0");

/* Promo – split layout: copy left, video right (default is a centred stack). */
function PromoSection({ live }: SectionProps) {
  if (!live.promo) return null;
  return (
    <section className="relative overflow-hidden bg-surface-alt py-12 lg:py-16">
      <div aria-hidden="true" className="absolute inset-y-0 right-0 hidden w-1/2 bg-[linear-gradient(90deg,transparent,color-mix(in_srgb,var(--brand)_6%,transparent))] lg:block" />
      <div className="container-x relative grid grid-cols-[minmax(0,1fr)] items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-14">
        <Reveal>
          <p className="eyebrow mb-4 inline-flex items-center gap-2 text-accent-ink">
            <Trophy aria-hidden="true" className="h-4 w-4" /> {live.meta.shortName}
          </p>
          <PromoHeading text={live.promo.heading} />
          <span aria-hidden="true" className="mt-5 block h-1 w-12 rounded-full bg-[var(--hl)]" />
          <p className="type-lead mt-5 max-w-xl text-muted">{live.promo.text}</p>
        </Reveal>
        {live.promo.videoUrl && (
          <Reveal delay={0.1} className="relative">
            <span aria-hidden="true" className="absolute -bottom-3 -right-3 h-2/3 w-2/3 rounded-[1.75rem] bg-[var(--hl)]/30" />
            <div className="relative rounded-[1.75rem] bg-white p-2 shadow-[0_30px_60px_-40px_rgba(10,20,50,0.45)] ring-1 ring-line">
              <PromoVideo url={live.promo.videoUrl} title={live.meta.videoTitle ?? live.meta.shortName} />
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}

/* Why – Motion Studio: aceternity-components-layout-grid (bento photo grid, tile expands on click / Enter). */
function WhySection({ live }: SectionProps) {
  if (!live.why) return null;
  const items = live.why.items.filter((w): w is { title: string; image: LiveImg } => !!w.image);
  if (!items.length) return null;
  return (
    <section id="why" className="scroll-mt-10 bg-white py-12 lg:py-16">
      <div className="container-x">
        <Heading wide intro={live.why.intro}>
          {live.why.heading}
        </Heading>
        <Reveal>
          <WhyLayoutGrid items={items} />
        </Reveal>
      </div>
    </section>
  );
}

/* Stats – light cards with count-up numbers (default is a dark band). */
function StatCards({ items, icons, tone }: { items: LiveStat[]; icons: LucideIcon[]; tone: "soft" | "white" }) {
  const soft = tone === "soft";
  return (
    <section aria-label="Key figures" className={`py-10 lg:py-12 ${soft ? "bg-brand-soft" : "bg-white"}`}>
      <dl className="container-x grid gap-3 sm:grid-cols-3 sm:gap-5">
        {items.map((s, i) => {
          const Icon = icons[i] ?? Award;
          return (
            <Reveal
              key={s.label}
              delay={0.08 * i}
              className={`relative flex items-center gap-4 overflow-hidden rounded-2xl border p-5 sm:flex-col sm:items-start sm:gap-0 sm:p-6 lg:p-7 ${soft ? "border-white bg-white shadow-[0_20px_40px_-34px_rgba(10,20,50,0.5)]" : "border-line bg-brand-soft/60"}`}
            >
              <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand to-[var(--hl)]" />
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand text-white sm:mb-5">
                <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <div className="flex min-w-0 flex-col-reverse">
                <dt className="mt-1 text-[0.8125rem] font-semibold uppercase tracking-[0.12em] text-muted sm:mt-2">{s.label}</dt>
                <dd className="font-display text-[2rem] font-semibold leading-none tracking-tight text-brand sm:text-[2.5rem] lg:text-5xl [&_[aria-hidden]>span]:text-[var(--hl-deep)]">
                  <Value v={s.value} label={s.label} />
                </dd>
              </div>
              <span aria-hidden="true" className="absolute bottom-3 right-4 hidden font-display text-sm font-semibold text-brand/25 sm:block">
                {num(i)}
              </span>
            </Reveal>
          );
        })}
      </dl>
    </section>
  );
}

function Stats1Section({ live }: SectionProps) {
  return live.stats1?.length ? <StatCards items={live.stats1} icons={[Briefcase, Building2, Trophy]} tone="soft" /> : null;
}

function Stats2Section({ live }: SectionProps) {
  return live.stats2?.length ? <StatCards items={live.stats2} icons={[Globe2, Users, FlaskConical]} tone="white" /> : null;
}

/* Placements – compact card row + Motion Studio: aceternity-components-3d-card (tilting profile grid). */
function PlacementsSection({ live }: SectionProps) {
  if (!live.placements) return null;
  const { cards, profiles } = live.placements;
  return (
    <section id="placements" className="scroll-mt-10 bg-white py-12 lg:py-16">
      <div className="container-x">
        <Heading eyebrow="Placements" Icon={Briefcase}>
          {live.placements.heading}
        </Heading>
        {cards?.length ? (
          <ul className="mb-8 grid gap-3 md:grid-cols-3 lg:mb-10">
            {cards.map((c, i) => {
              const Icon = [Trophy, Sparkles, Building2][i] ?? Trophy;
              return (
                <Reveal as="li" key={c.title} delay={0.06 * i} className="flex gap-4 rounded-2xl border border-line bg-surface-alt p-4 sm:p-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--hl)]/25 text-[var(--hl-ink)]">
                    <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-[0.98rem] font-semibold leading-snug text-ink">{c.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{c.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        ) : null}
        {profiles?.length ? (
          <>
            <h3 className="sr-only">Student placement profiles</h3>
            <Reveal>
              <ProfileTiltGrid profiles={profiles} />
            </Reveal>
          </>
        ) : null}
      </div>
    </section>
  );
}

/* Recruiters – Motion Studio: magicui-r-marquee-3d-json (tilted multi-column logo marquee). */
const STUDENT = { src: "/assets/tiruchirappalli/hero/hero-banner.webp", alt: "Smiling student with a laptop and backpack" };

function RecruitersSection({ live }: SectionProps) {
  if (!live.recruiters) return null;
  return (
    <section id="recruiters" className="relative scroll-mt-10 overflow-hidden bg-surface-alt pt-12 lg:pt-16">
      <div aria-hidden="true" className="absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--hl)_28%,transparent),transparent_65%)]" />
      <div className="container-x relative grid grid-cols-[minmax(0,1fr)] items-end gap-4 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-10">
        {/* left: heading + student (official Trichy hero cut-out) standing on the section edge */}
        <div className="flex min-w-0 flex-col">
          <Heading eyebrow={`${live.recruiters.logos.length} recruiters`} Icon={Building2} align="left">
            {live.recruiters.heading}
          </Heading>
          <div className="relative hidden h-[22rem] sm:block lg:h-[24rem]">
            <span aria-hidden="true" className="absolute bottom-0 left-[8%] aspect-square w-[62%] max-w-[19rem] translate-y-[18%] rounded-full bg-[var(--hl)]" />
            <span aria-hidden="true" className="absolute bottom-0 left-[4%] aspect-square w-[70%] max-w-[21.5rem] translate-y-[16%] rounded-full border-2 border-dashed border-brand/25" />
            <Image src={STUDENT.src} alt={STUDENT.alt} fill sizes="(min-width:1024px) 34vw, 60vw" className="object-contain object-[left_bottom]" />
          </div>
        </div>
        <Reveal className="min-w-0 pb-12 lg:pb-16">
          <Marquee3D logos={live.recruiters.logos} />
        </Reveal>
      </div>
    </section>
  );
}

/** Logo-wall normalisation: same visual area for every (trimmed) logo, height capped for square seals. */
function logoBox(w: number, h: number) {
  const ratio = w / h;
  const area = 8400; // px² at desktop size
  const height = Math.min(Math.sqrt(area / ratio), 64);
  return { width: Math.round(height * ratio), aspectRatio: `${w} / ${h}` };
}

/* Collaborations – Motion Studio: aceternity-components-card-spotlight (partner cards, cursor spotlight). No globe. */
function CollaborationsSection({ live }: SectionProps) {
  if (!live.collaborations) return null;
  const items = live.collaborations.items;
  return (
    <section id="collaborations" className="relative scroll-mt-10 overflow-hidden bg-white py-12 lg:py-16">
      <div aria-hidden="true" className="absolute inset-0 opacity-40 [background-image:linear-gradient(var(--line)_1px,transparent_1px),linear-gradient(90deg,var(--line)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div className="container-x relative">
        <Heading eyebrow="Global" Icon={Globe2}>
          {live.collaborations.heading}
        </Heading>
        <ul className="mx-auto grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          {items.map((c, i) => (
            <Reveal as="li" key={c.name} delay={0.04 * (i % 3)} className={i === items.length - 1 && items.length % 2 === 1 ? "col-span-2 sm:col-span-1" : ""}>
              <SpotlightCard className="h-full">
                <div className="flex h-full flex-col items-center gap-3 p-4 text-center sm:p-6">
                  {/* equal visual weight: every logo gets the same area (wide marks shorter, square seals taller, capped) */}
                  <span className="flex h-[4.5rem] w-full items-center justify-center">
                    {c.logo ? (
                      <span className="relative block max-w-full" style={logoBox(c.logo.width, c.logo.height)}>
                        <Image src={c.logo.src} alt={c.logo.alt} fill sizes="240px" className="object-contain" />
                      </span>
                    ) : (
                      <Globe2 aria-hidden="true" className="h-8 w-8 text-brand" />
                    )}
                  </span>
                  <span className="text-[0.8125rem] font-semibold leading-snug text-ink sm:text-sm">{c.name}</span>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* Rankings – Motion Studio: aceternity-components-tabs (one tab per ranking body). */
function RankingsSection({ live }: SectionProps) {
  if (!live.rankings) return null;
  return (
    <section id="rankings" className="relative scroll-mt-10 overflow-hidden bg-gradient-to-b from-surface-alt to-white py-12 lg:py-16">
      <div className="container-x relative">
        <Heading eyebrow="Recognition" Icon={Award}>
          {live.rankings.heading}
        </Heading>
        <Reveal>
          <RankingTabs items={live.rankings.items} />
        </Reveal>
      </div>
    </section>
  );
}

const FACT_ICONS: Record<string, LucideIcon> = { Calendar, Users, Trophy, Building2, Hourglass, Award, Medal, GraduationCap, Globe2, BookOpen, Briefcase, FlaskConical, Star, MapPin, Sparkles };

/* Highlights – banner slides kept; facts as a layout-grid-style 4×2 tile grid (no marquee). */
function HighlightsSection({ live }: SectionProps) {
  if (!live.highlightSlides?.length && !live.facts?.length) return null;
  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="container-x">
        {live.highlightSlides?.length ? (
          <Reveal className="mx-auto mb-8 max-w-5xl lg:mb-10">
            <StatBannerCarousel slides={live.highlightSlides} />
          </Reveal>
        ) : null}
        {live.facts?.length ? (
          <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
            {live.facts.map((f, i) => {
              const Icon = FACT_ICONS[f.icon ?? "Award"] ?? Award;
              const feature = i === 0;
              return (
                <Reveal
                  as="li"
                  key={`${f.label}-${i}`}
                  delay={0.04 * (i % 4)}
                  className={`group flex min-h-36 flex-col justify-between gap-4 rounded-2xl border p-4 transition-[border-color,transform] duration-300 hover:-translate-y-0.5 motion-reduce:hover:translate-y-0 sm:p-5 ${feature ? "border-transparent bg-[var(--brand-deep)] text-white" : "border-line bg-surface-alt hover:border-[var(--hl)]/70"}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${feature ? "bg-white/10 text-[var(--hl)]" : "bg-[var(--hl)]/25 text-[var(--hl-ink)]"}`}>
                      <Icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <span aria-hidden="true" className={`font-display text-xs font-semibold tracking-[0.14em] ${feature ? "text-white/50" : "text-muted"}`}>
                      {num(i)}
                    </span>
                  </div>
                  <div>
                    <p className={`font-display text-[1.75rem] font-bold leading-none tracking-tight sm:text-3xl ${feature ? "text-white" : "text-brand"}`}>
                      <Value v={f.value} label={f.label} />
                    </p>
                    <p className={`mt-2 text-[0.8125rem] font-medium leading-snug sm:text-sm ${feature ? "text-white/80" : "text-muted"}`}>{f.label}</p>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        ) : null}
      </div>
    </section>
  );
}

/* Campus – Motion Studio: aceternity-components-parallax-scroll (columns drift on scroll; plain grid on mobile). */
function CampusSection({ live }: SectionProps) {
  if (!live.campus) return null;
  return (
    <section id="campus" className="scroll-mt-10 overflow-hidden bg-surface-alt py-12 lg:py-16">
      <div className="container-x">
        <Heading eyebrow="Campus life" Icon={Camera}>
          {live.campus.heading}
        </Heading>
        <CampusCards items={live.campus.items} />
      </div>
    </section>
  );
}

/* Admission – Motion Studio: aceternity-components-timeline (vertical, numbered, staggered reveal)
   + Made Simple as a pinned checklist card. */
const STEP_ICONS: LucideIcon[] = [UserPlus, Smartphone, ClipboardList, Upload, Send];

function AdmissionSection({ live }: SectionProps) {
  const steps = live.steps?.items;
  const simple = live.madeSimple;
  if (!steps?.length && !simple?.items.length) return null;
  return (
    <section id="admission" className="relative scroll-mt-10 overflow-hidden bg-surface-alt py-12 lg:py-16">
      <div aria-hidden="true" className="absolute inset-0 opacity-60 [background-image:linear-gradient(color-mix(in_srgb,var(--brand)_6%,transparent)_1px,transparent_1px),linear-gradient(90deg,color-mix(in_srgb,var(--brand)_6%,transparent)_1px,transparent_1px)] [background-size:32px_32px] [mask-image:linear-gradient(to_bottom,black,transparent_75%)]" />
      <div className="container-x relative">
        <Heading eyebrow="Admission process" Icon={ClipboardList}>
          {steps?.length ? "Steps to follow" : "Keep these ready to apply"}
        </Heading>
        <div className="mx-auto grid max-w-5xl grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-start lg:gap-12">
          {steps?.length ? (
            <ol className="relative">
              {/* timeline rail */}
              <span aria-hidden="true" className="absolute bottom-8 left-[1.4rem] top-8 w-0.5 rounded-full bg-gradient-to-b from-brand via-brand/50 to-[var(--hl)] sm:left-[1.65rem]" />
              {steps.map((step, i) => {
                const Icon = STEP_ICONS[i] ?? CheckCircle2;
                return (
                  <Reveal as="li" key={step} delay={0.08 * i} className="relative flex items-center gap-4 pb-4 last:pb-0 sm:gap-5">
                    <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand font-display text-base font-semibold text-white ring-[6px] ring-surface-alt sm:h-14 sm:w-14 sm:text-lg">
                      {num(i)}
                    </span>
                    <div className="group flex min-w-0 flex-1 items-center gap-4 rounded-2xl border border-line bg-white px-4 py-3.5 shadow-[0_14px_30px_-26px_rgba(10,20,50,0.5)] transition-[transform,border-color] duration-300 hover:translate-x-1 hover:border-[var(--hl)]/70 sm:px-5 sm:py-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--hl)]/20 text-[var(--hl-ink)] transition-colors group-hover:bg-[var(--hl)] group-hover:text-brand-ink">
                        <Icon aria-hidden="true" className="h-5 w-5" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-brand">Step {i + 1}</span>
                        <span className="block font-display text-[1.02rem] font-semibold leading-snug text-ink">{step}</span>
                      </span>
                    </div>
                  </Reveal>
                );
              })}
            </ol>
          ) : null}

          {simple?.items.length ? (
            <Reveal className="overflow-hidden rounded-3xl border border-line bg-white shadow-[0_30px_60px_-45px_rgba(10,20,50,0.5)] lg:sticky lg:top-36">
              <div className="flex items-center justify-between gap-4 bg-[var(--brand-deep)] px-5 py-4 text-white sm:px-6">
                <div>
                  <h3 className="font-display text-lg font-semibold sm:text-xl">{simple.heading}</h3>
                  <p className="text-sm text-white/75">{simple.subheading}</p>
                </div>
                <ClipboardList aria-hidden="true" className="h-7 w-7 shrink-0 text-[var(--hl)]" strokeWidth={1.5} />
              </div>
              <ul className="divide-y divide-line">
                {simple.items.map((m) => {
                  const [title, detail] = m.split(" – ");
                  return (
                    <li key={m} className="flex items-center gap-3.5 px-5 py-3.5 sm:px-6">
                      <CheckCircle2 aria-hidden="true" className="h-5 w-5 shrink-0 text-brand" />
                      <span className="min-w-0 flex-1">
                        <span className="block text-[0.95rem] font-semibold leading-snug text-ink">{title}</span>
                        {detail && <span className="block text-sm text-muted">{detail}</span>}
                      </span>
                    </li>
                  );
                })}
              </ul>
              <div className="border-t border-line bg-surface-alt px-5 py-4 sm:px-6">
                <a href="#top" className={`${btn.brand} w-full`}>
                  Register Now
                </a>
              </div>
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}

/* FAQs – Motion Studio: motion-primitives-accordion; sticky heading left, accordion right. */
function FaqsSection({ live }: SectionProps) {
  if (!live.faqs) return null;
  return (
    <section id="faqs" className="scroll-mt-10 bg-surface-alt py-12 lg:py-16">
      <div className="container-x grid grid-cols-[minmax(0,1fr)] gap-2 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-14">
        <div className="lg:sticky lg:top-36 lg:self-start">
          <Heading eyebrow="FAQs" Icon={HelpCircle} align="left">
            {live.faqs.heading}
          </Heading>
          <span aria-hidden="true" className="-mt-4 hidden h-1 w-12 rounded-full bg-[var(--hl)] lg:block" />
        </div>
        <Reveal>
          <FaqAccordion items={live.faqs.items} />
        </Reveal>
      </div>
    </section>
  );
}

/* Contact – card with icon rows on a brand-soft background (no map for this campus). */
const CAMPUS_PHOTO = { src: "/assets/tiruchirappalli/campus/campus-entrance.webp", alt: "SRM Institutions Trichy campus entrance arch with students and college buses" };

function ContactSection({ live }: SectionProps) {
  const c = live.contact;
  const row = "flex min-h-11 items-start gap-4 py-4";
  const chip = "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand text-white";
  const label = "block text-xs font-semibold uppercase tracking-[0.12em] text-muted";
  return (
    <section id="contact" className="scroll-mt-10 bg-brand-soft py-12 lg:py-16">
      <div className="container-x">
        <Reveal className="mx-auto grid grid-cols-[minmax(0,1fr)] max-w-5xl overflow-hidden rounded-3xl bg-white shadow-[0_30px_60px_-45px_rgba(10,20,50,0.5)] ring-1 ring-line lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)]">
          <div className="relative flex min-h-56 flex-col justify-end gap-6 overflow-hidden bg-[var(--brand-deep)] p-6 text-white sm:p-8 lg:min-h-0">
            {/* campus entrance (frame from the institution's official video) under a brand overlay */}
            <Image src={CAMPUS_PHOTO.src} alt={CAMPUS_PHOTO.alt} fill sizes="(min-width:1024px) 36vw, 100vw" className="object-cover object-[30%_center]" />
            <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[var(--brand-deep)] via-[var(--brand-deep)]/75 to-[var(--brand-deep)]/25" />
            <span aria-hidden="true" className="absolute -bottom-16 -right-16 h-48 w-48 rounded-full border-[1.5rem] border-[var(--hl)]/30" />
            <div className="relative">
              <p className="eyebrow mb-2 text-[var(--hl)]">{live.meta.shortName}</p>
              <h2 className="type-h2 font-display text-white">Reach us</h2>
            </div>
            {c.map && (
              <span className="relative block aspect-[2/1] overflow-hidden rounded-xl">
                <Image src={c.map.src} alt={c.map.alt} fill sizes="(min-width:1024px) 30vw, 100vw" className="object-cover" />
              </span>
            )}
          </div>
          <div className="divide-y divide-line px-6 sm:px-8">
            <div className={row}>
              <span className={chip}>
                <MapPin aria-hidden="true" className="h-5 w-5" />
              </span>
              <span className="min-w-0">
                <span className={label}>Address</span>
                <span className="mt-1 block text-ink">{c.address}</span>
              </span>
            </div>
            {c.phones.map((p) => (
              <div key={p.href} className={row}>
                <span className={chip}>
                  <Phone aria-hidden="true" className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className={label}>Call</span>
                  <PhoneLink tel={p.href.replace("tel:", "")} location="contact" className="mt-0.5 inline-flex min-h-11 items-center font-semibold text-ink hover:text-brand">
                    {p.display}
                  </PhoneLink>
                </span>
              </div>
            ))}
            {c.emails.map((e) => (
              <div key={e} className={row}>
                <span className={chip}>
                  <Mail aria-hidden="true" className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className={label}>Email</span>
                  <a href={`mailto:${e}`} className="mt-0.5 inline-flex min-h-11 items-center break-all font-semibold text-ink hover:text-brand">
                    {e}
                  </a>
                </span>
              </div>
            ))}
            {c.landmarks?.length ? <p className="py-4 text-sm text-muted">Nearby: {c.landmarks.join(" · ")}</p> : null}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* CTA – deep-brand band with an amber button. */
function CtaSection({ live }: SectionProps) {
  const text = live.ctaHeading;
  const i = text.search(/#1\b|No\.\s?1\b/);
  return (
    <section className="relative bg-[var(--brand-deep)] text-white">
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:40px_40px]" />
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border-[2.5rem] border-[var(--hl)]/20" />
      </div>
      <div className="container-x relative">
        {/* student (AI-generated illustration) standing on the band, rising above its top edge – desktop only */}
        <div aria-hidden="true" className="pointer-events-none absolute bottom-0 right-[15rem] hidden h-[calc(100%+4.5rem)] aspect-[800/1188] lg:block xl:right-[17rem]">
          <span className="absolute -inset-x-[30%] bottom-0 top-[-10%] overflow-hidden">
            <span className="absolute bottom-[-36%] left-1/2 aspect-square w-[78%] -translate-x-1/2 rounded-full bg-[var(--hl)]" />
            <span className="absolute bottom-[-30%] left-1/2 aspect-square w-[92%] -translate-x-1/2 rounded-full border-2 border-dashed border-[var(--hl)]/50" />
          </span>
          <Image src={CTA_STUDENT} alt="" fill sizes="220px" className="object-contain object-bottom" />
        </div>
      <Reveal className="relative flex flex-col items-start gap-6 py-12 sm:flex-row sm:items-center sm:justify-between lg:py-14">
        <h2 className="type-h2 max-w-3xl font-display text-balance text-white lg:max-w-[52%]">
          {i < 0 ? (
            text
          ) : (
            <>
              {text.slice(0, i)}
              <span className="text-[var(--hl)]">{text.slice(i)}</span>
            </>
          )}
        </h2>
        <a
          href="#top"
          className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-[var(--btn-radius,var(--radius-card))] bg-[var(--hl)] px-6 text-[0.95rem] font-semibold text-brand-ink transition-[background-color,transform] duration-200 hover:bg-[var(--hl-deep)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/60 active:translate-y-px"
        >
          Register Now
        </a>
      </Reveal>
      </div>
    </section>
  );
}

const CTA_STUDENT = "/assets/tiruchirappalli/students/ai-student-books-cutout.webp";

/** tiruchirappalli section designs (overrides of the default design). */
export const tiruchirappalliSections: SectionSet = {
  promo: PromoSection,
  why: WhySection,
  stats1: Stats1Section,
  placements: PlacementsSection,
  recruiters: RecruitersSection,
  collaborations: CollaborationsSection,
  rankings: RankingsSection,
  stats2: Stats2Section,
  highlights: HighlightsSection,
  campus: CampusSection,
  admission: AdmissionSection,
  faqs: FaqsSection,
  contact: ContactSection,
  cta: CtaSection,
};
