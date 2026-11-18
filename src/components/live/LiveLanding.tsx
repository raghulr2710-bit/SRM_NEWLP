import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import {
  Award,
  BookOpen,
  Briefcase,
  Building2,
  Camera,
  ClipboardList,
  CreditCard,
  FileSignature,
  Globe2,
  GraduationCap,
  HelpCircle,
  Mail,
  MapPin,
  Phone,
  PlayCircle,
  Sparkles,
  Trophy,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { Institution, Stat, ThemeTokens } from "@/types/institution";
import type { LiveData, LiveImg } from "./types";
import { ThemeScope } from "@/components/common/ThemeScope";
import { EnquiryProvider, ENQUIRY_ANCHOR } from "@/components/common/EnquiryContext";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { FloatingControls } from "@/components/common/FloatingControls";
import { GoogleAnalytics } from "@/components/common/Analytics";
import { Reveal } from "@/components/common/Reveal";
import { Counter } from "@/components/common/Counter";
import { PhoneLink } from "@/components/common/Cta";
import { btn } from "@/components/common/buttons";
import { ImmersiveGallery } from "@/components/campus/Gallery";
import { PromoVideo, ScrollTiltFrame } from "./PromoVideo";
import { toFormProps } from "@/lib/form-props";
import { LiveCourses, type LiveCourse, type UgEligibility } from "./LiveCourses";
import { HalfGlobe, type Rgb } from "./HalfGlobe";
import { AccordionGallery, AnimatedTestimonials, CardMarquee, ItemMarquee, MilestoneMarquee, ProcessStepper, StatBannerCarousel, LogoMarquee, ScrollProgress, SectionTabs } from "./LiveMotion";

type Img = LiveImg | null;

/** Per-institution identity: palette, hero visual, globe. Content lives in LiveData. */
export interface LiveSiteConfig {
  inst: Institution;
  data: LiveData;
  palette: {
    brand: string;
    brandInk: string;
    brandSoft: string;
    /** darker brand for gradients */
    brandDeep: string;
    /** pale brand tints for the highlight-banner card */
    brandTint: string;
    brandTint2: string;
    /** highlight colour (gold on Ramapuram) + deeper shade for the hero circle */
    hl: string;
    hlDeep: string;
    hlSoft: string;
    /** readable text on hl-soft backgrounds */
    hlInk: string;
    accentOnDark: string;
    surfaceAlt?: string;
    line?: string;
    ink?: string;
    muted?: string;
  };
  /** Transparent cut-out; circle = disc behind the head, in % (cx/w of image width, top of image height). */
  heroImage: LiveImg & { circle: { cx: number; w: number; top: number } };
  globe?: { home: [number, number]; partners: boolean; base: Rgb; marker: Rgb; glow: Rgb };
}

const d = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

/** "5700+" → { value: 5700, suffix: "+" }; non-numeric values (e.g. "A++") return null. */
function toStat(v: string, label: string): Stat | null {
  const m = v.trim().match(/^(#?)([\d,]+(?:\.\d+)?)(.*)$/);
  if (!m) return null;
  return { prefix: m[1] || undefined, value: Number(m[2].replace(/,/g, "")), suffix: m[3] || undefined, label };
}
function Value({ v, label }: { v: string; label: string }) {
  const s = toStat(v, label);
  return s ? <Counter stat={s} /> : <>{v}</>;
}

function Pic({ img, className = "", sizes, contain = false, priority = false }: { img: Img | undefined; className?: string; sizes: string; contain?: boolean; priority?: boolean }) {
  if (!img) return null;
  return <Image src={img.src} alt={img.alt} fill sizes={sizes} preload={priority} className={`${contain ? "object-contain" : "object-cover"} ${className}`} />;
}

function Heading({ children, intro, eyebrow, Icon, light = false, wide = false, align = "center" }: { children: ReactNode; intro?: ReactNode; eyebrow?: string; Icon?: LucideIcon; light?: boolean; wide?: boolean; align?: "center" | "left" }) {
  return (
    <Reveal className={`mb-8 lg:mb-10 ${align === "left" ? "text-left" : "mx-auto text-center"} ${wide ? "max-w-5xl" : "max-w-3xl"}`}>
      {eyebrow && (
        <p className={`eyebrow mb-3 inline-flex items-center gap-2 ${light ? "text-white/75" : "text-accent-ink"}`}>
          {Icon && <Icon aria-hidden="true" className="h-4 w-4" />}
          {eyebrow}
        </p>
      )}
      <h2 className={`type-h2 font-display text-balance ${light ? "text-white" : "text-ink"}`}>{children}</h2>
      {intro && <div className={`type-lead mx-auto mt-4 ${wide ? "max-w-4xl text-balance" : "max-w-2xl"} ${light ? "text-white/75" : "text-muted"}`}>{intro}</div>}
    </Reveal>
  );
}

function PromoHeading({ text }: { text: string }) {
  const i = text.search(/#1\b|No\.\s?1\b/);
  return (
    <h2 className="type-h2 font-display text-balance text-ink">
      {i < 0 ? text : (
        <>
          {text.slice(0, i)}
          <span className="text-brand">{text.slice(i)}</span>
        </>
      )}
    </h2>
  );
}

function StatBand({ items, icons }: { items: { value: string; label: string }[]; icons: LucideIcon[] }) {
  return (
    <section aria-label="Key figures" className="on-dark bg-gradient-to-br from-brand to-[var(--brand-deep)] text-on-brand">
      <dl className="container-x grid grid-cols-1 divide-y divide-white/10 py-3 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:py-12 lg:py-14">
        {items.map((s, i) => {
          const Icon = icons[i] ?? Award;
          return (
            <Reveal key={s.label} delay={0.08 * i} className="flex items-center gap-4 py-4 sm:flex-col sm:gap-0 sm:py-0 sm:text-center">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/[0.07] ring-1 ring-white/15 sm:mb-4">
                <Icon aria-hidden="true" className="h-5 w-5 text-[var(--hl)]" strokeWidth={1.75} />
              </span>
              <div className="flex flex-col-reverse">
                <dt className="mt-1.5 text-[0.8125rem] font-medium uppercase tracking-[0.14em] text-white/70 sm:mt-3">{s.label}</dt>
                <dd className="font-display text-[2rem] font-semibold leading-none tracking-tight sm:text-[2.75rem] lg:text-5xl [&_[aria-hidden]>span]:text-[var(--hl)]">
                  <Value v={s.value} label={s.label} />
                </dd>
              </div>
            </Reveal>
          );
        })}
      </dl>
    </section>
  );
}

function CtaBand({ text }: { text: string }) {
  return (
    <section className="relative overflow-hidden bg-[var(--hl)] text-brand-ink">
      <div aria-hidden="true" className="absolute -right-20 -top-20 h-64 w-64 rounded-full border-[2.5rem] border-white/30" />
      <div aria-hidden="true" className="absolute -bottom-24 left-[30%] h-48 w-48 rounded-full border-[1.75rem] border-brand/10" />
      <Reveal className="container-x relative flex flex-col items-start gap-6 py-12 sm:flex-row sm:items-center sm:justify-between lg:py-14">
        <h2 className="type-h2 font-display">{text}</h2>
        <a
          href="#top"
          className="group inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-[var(--radius-card)] bg-brand px-6 text-[0.95rem] font-semibold text-white shadow-[0_12px_28px_-14px_color-mix(in_srgb,var(--brand)_90%,transparent)] transition-[background-color,transform] duration-200 hover:bg-brand-ink active:translate-y-px"
        >
          Register Now
        </a>
      </Reveal>
    </section>
  );
}

const STEP_ICONS = ["UserPlus", "Smartphone", "ClipboardList", "Upload", "Send"];

/**
 * Live-content landing page (one template, per-institution identity).
 * Text and images come verbatim from each institution's live registration site via
 * src/data/live/<key>.json; sections with no content are left out.
 */
export function LiveLanding({ site, fonts }: { site: LiveSiteConfig; fonts: { className: string; display: string; body: string } }) {
  const { inst, data: live, palette: pal, heroImage: HERO_IMAGE } = site;
  const ug = live.programmes.ugEligibility as UgEligibility | undefined;
  const lateral = live.programmes.lateralEntry;
  const phone = live.contact.phones[0];
  const badges = (live.rankings?.items ?? []).map((r) => r.badge).filter(Boolean) as LiveImg[];
  const whyItems = (live.why?.items ?? []).filter((w) => w.image);
  const has = {
    why: whyItems.length > 2,
    placements: !!(live.placements?.cards?.length || live.placements?.profiles?.length),
    recruiters: !!live.recruiters?.logos.length,
    collaborations: !!live.collaborations?.items.length,
    rankings: !!live.rankings?.items.length,
    testimonials: !!live.testimonials?.items.length,
    campus: !!live.campus?.items.length,
    admission: !!(live.steps?.items.length || live.madeSimple?.items.length),
    faqs: !!live.faqs?.items.length,
  };
  const tabs = [
    has.why && { id: "why", label: live.meta.whyLabel, icon: "Sparkles" },
    { id: "offer", label: "Programmes", icon: "BookOpen" },
    has.placements && { id: "placements", label: "Placements", icon: "Briefcase" },
    has.collaborations && { id: "collaborations", label: "Industry Connect", icon: "Globe2" },
    has.rankings && { id: "rankings", label: "Academics", icon: "Award" },
    has.testimonials && { id: "testimonials", label: "Testimonials", icon: "PlayCircle" },
    has.campus && { id: "campus", label: "Campus Life", icon: "Camera" },
    has.admission && { id: "admission", label: "Admission", icon: "ClipboardList" },
    has.faqs && { id: "faqs", label: "FAQs", icon: "HelpCircle" },
    { id: "contact", label: "Contact", icon: "MapPin" },
  ].filter(Boolean) as { id: string; label: string; icon: string }[];
  const theme: ThemeTokens = {
    ...inst.theme,
    brand: pal.brand,
    brandInk: pal.brandInk,
    brandSoft: pal.brandSoft,
    accent: pal.brand,
    accentSoft: pal.brandSoft,
    accentText: pal.brand,
    accentOnDark: pal.accentOnDark,
    onBrand: "#ffffff",
    onAccent: "#ffffff",
    surface: "#ffffff",
    surfaceAlt: pal.surfaceAlt ?? inst.theme.surfaceAlt,
    line: pal.line ?? inst.theme.line,
    ink: pal.ink ?? inst.theme.ink,
    muted: pal.muted ?? inst.theme.muted,
  };
  const vars = {
    "--brand-deep": pal.brandDeep,
    "--brand-tint": pal.brandTint,
    "--brand-tint-2": pal.brandTint2,
    "--hl": pal.hl,
    "--hl-deep": pal.hlDeep,
    "--hl-soft": pal.hlSoft,
    "--hl-ink": pal.hlInk,
  } as CSSProperties;
  const ratio = HERO_IMAGE.height / HERO_IMAGE.width;
  const c = HERO_IMAGE.circle;
  /** concentric rings: grow by 7% / 14% of the image width, centred on the same point */
  const ring = (grow: number) => ({ left: `${c.cx - (c.w + grow) / 2}%`, width: `${c.w + grow}%`, top: `${c.top - grow / 2 / ratio}%` });

  return (
    <ThemeScope theme={theme} displayFont={fonts.display} bodyFont={fonts.body} fontClassName={fonts.className}>
      <div style={vars}>
      <EnquiryProvider institution={inst.key}>
        <ScrollProgress />

        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur-md">
          <div className="container-x flex h-[4.5rem] items-center justify-between gap-4">
            <a href="#top" className="relative h-12 w-40 shrink-0" aria-label={`${live.meta.shortName} – back to top`}>
              <Pic img={live.logo as Img} sizes="160px" contain priority />
            </a>
            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center gap-1">
                {(
                  [
                    ["#offer", "Courses we offer"],
                    has.why && ["#why", live.meta.whyLabel],
                    has.placements && ["#placements", "Placements"],
                    ["#offer", "Eligibility"],
                  ].filter(Boolean) as [string, string][]
                ).map(([href, l]) => (
                  <li key={l}>
                    <a href={href} className="inline-flex min-h-11 items-center px-3 text-[0.92rem] font-medium text-ink/80 transition-colors hover:text-brand">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="flex items-center gap-2">
              {phone && (
                <PhoneLink tel={phone.href.replace("tel:", "")} location="header" className="hidden min-h-11 items-center gap-2 px-3 text-sm font-semibold text-ink hover:text-brand md:inline-flex" icon>
                  {phone.display}
                </PhoneLink>
              )}
              <a href="#top" className={`${btn.accent} !min-h-11 shrink-0 whitespace-nowrap !px-4 text-sm sm:!px-5`}>
                Register Now
              </a>
            </div>
          </div>
        </header>

        <main id="main">
          <section id="top" className="relative isolate overflow-hidden bg-white">
            {/* Background: small box grid only (24px cells), fading softly at the edges */}
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 [background-image:linear-gradient(color-mix(in_srgb,var(--brand)_7%,transparent)_1px,transparent_1px),linear-gradient(90deg,color-mix(in_srgb,var(--brand)_7%,transparent)_1px,transparent_1px)] [background-size:24px_24px] [background-position:center] [mask-image:radial-gradient(ellipse_90%_90%_at_50%_45%,black_40%,transparent_100%)]"
            />
            <div className="container-x grid items-center gap-8 pt-8 lg:h-[calc(100svh-4.5rem)] lg:max-h-[52rem] lg:min-h-[36rem] lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.85fr)_minmax(0,0.95fr)] lg:gap-5 lg:pb-0 lg:pt-4">
              <div className="min-w-0">
                <p className="hero-rise mb-4 inline-flex items-center gap-2 rounded-full bg-[var(--hl)] px-4 py-1.5 text-sm font-semibold text-brand-ink" style={d(0)}>
                  <span aria-hidden="true" className="h-2 w-2 animate-pulse rounded-full bg-brand" />
                  {live.hero.formHeading}
                </p>
                <h1 className="hero-rise font-display text-[clamp(1.45rem,6.9vw,2rem)] font-bold leading-[1.15] tracking-[-0.025em] text-ink sm:text-[2.75rem] lg:text-[clamp(1.85rem,2.35vw,2.6rem)]" style={d(0.08)}>
                  <span className="block whitespace-nowrap">{live.hero.headline[0]}</span>
                  <span className="block whitespace-nowrap text-brand">{live.hero.headline[1]}</span>
                </h1>
                <p className="hero-rise mt-4 inline-flex items-center gap-2 text-base font-semibold text-ink sm:text-lg" style={d(0.14)}>
                  <GraduationCap aria-hidden="true" className="h-5 w-5 text-accent-ink" />
                  {live.hero.button}
                </p>
                <div className="hero-rise mt-6 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap" style={d(0.2)}>
                  <a href="#top" className={`${btn.accent} group whitespace-nowrap px-2 text-sm sm:px-6 sm:text-[0.95rem]`}>
                    Register Now
                  </a>
                  <a href="#offer" className={`${btn.outline} whitespace-nowrap px-2 text-sm sm:px-6 sm:text-[0.95rem] hover:border-[var(--hl)] hover:!bg-[var(--hl)] hover:!text-brand-ink`}>
                    Courses we offer
                  </a>
                </div>
                {/* Looping ranking / accreditation logo strip */}
                {badges.length > 0 && (
                <div className="hero-rise marquee relative mt-8 max-w-[30rem] overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)] motion-reduce:[mask-image:none]" style={d(0.28)}>
                  <ul className="marquee-track flex w-max items-center gap-8 py-1 motion-reduce:w-auto motion-reduce:flex-wrap motion-reduce:gap-5" style={{ "--marquee-duration": "22s" } as CSSProperties} aria-label="Rankings and accreditations">
                    {[...badges, ...badges].map((b, i) => (
                      <li key={`${b.src}-${i}`} aria-hidden={i >= badges.length || undefined} className={`relative h-11 w-16 shrink-0 ${i >= badges.length ? "motion-reduce:hidden" : ""}`}>
                        <Image src={b.src} alt={b.alt} fill sizes="64px" className="object-contain" />
                      </li>
                    ))}
                  </ul>
                </div>
                )}
              </div>

              <div className="hero-rise relative mx-auto w-full max-w-[19rem] self-end sm:max-w-md lg:h-full lg:max-w-none" style={d(0.1)}>
                {/* Column box (size container) → an inner box with the image's exact aspect ratio, so the circle is always
                    positioned relative to the student himself, never to empty letterbox space. */}
                <div className="relative [container-type:size] lg:!aspect-auto lg:h-full" style={{ aspectRatio: `${HERO_IMAGE.width} / ${Math.round(HERO_IMAGE.height * 0.79)}` }}>
                  <div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2"
                    style={{ aspectRatio: `${HERO_IMAGE.width} / ${HERO_IMAGE.height}`, width: `min(100cqw, calc(100cqh * ${HERO_IMAGE.width} / ${HERO_IMAGE.height}))` }}
                  >
                    {/* brand circle locked behind the student's head */}
                    <div aria-hidden="true" className="absolute aspect-square rounded-full border border-dashed border-brand/25" style={ring(14)} />
                    <div aria-hidden="true" className="absolute aspect-square rounded-full border-2 border-[var(--hl-deep)]/30" style={ring(7)} />
                    <div aria-hidden="true" className="absolute aspect-square rounded-full bg-[var(--hl-deep)] shadow-[0_30px_80px_-30px_color-mix(in_srgb,var(--hl-deep)_70%,transparent)]" style={ring(0)} />
                    <Image src={HERO_IMAGE.src} alt={HERO_IMAGE.alt} fill preload sizes="(min-width:1024px) 32vw, 90vw" className="object-contain" />
                  </div>
                </div>
              </div>

              <div
                id={ENQUIRY_ANCHOR}
                className="hero-rise relative z-10 -mt-8 scroll-mt-10 rounded-[var(--radius-card)] border border-line bg-white p-4 lg:mt-0 shadow-[0_40px_90px_-40px_rgba(8,15,40,0.45)] sm:p-5"
                style={d(0.2)}
              >
                <h2 className="text-center font-display text-base text-ink">{live.hero.formHeading}</h2>
                <p className="mb-3 text-center text-xs text-muted">Application Form 2027</p>
                <EnquiryForm {...toFormProps(inst)} variant="hero" dense />
              </div>
            </div>
          </section>

          <SectionTabs items={tabs} />

          {/* ===== 02. Enquiry Form – in the hero (right column, first viewport) ===== */}

          {/* ===== 03. Why Choose Us ===== */}
          {live.promo && (
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
                    <PromoVideo url={live.promo.videoUrl} title={live.meta.videoTitle ?? live.meta.shortName} />
                  </div>
                </ScrollTiltFrame>
              )}
            </div>
          </section>
          )}

          {has.why && live.why && (
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
          )}

          {/* ===== 04. Programmes Offered ===== */}
          <section id="offer" className="py-12 lg:py-16 scroll-mt-10 bg-white">
            <div className="container-x">
              <Heading eyebrow="Programmes" Icon={BookOpen}>
                {live.programmes.heading}
              </Heading>
              <div>
                <LiveCourses items={live.programmes.items as LiveCourse[]} ugEligibility={ug} flabsUgNote={live.programmes.flabsUgNote} lateral={lateral} />
              </div>
            </div>
          </section>

          {/* ===== 05. Placement Highlights ===== */}
          {live.stats1?.length ? <StatBand items={live.stats1} icons={[Briefcase, Building2, Trophy]} /> : null}

          {has.placements && live.placements && (
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
          )}

          {has.recruiters && live.recruiters && (
          <section id="recruiters" className="py-12 lg:py-16 scroll-mt-10 overflow-hidden bg-surface-alt">
            <div className="container-x">
              <Heading eyebrow={`${live.recruiters.logos.length} recruiters`} Icon={Building2}>
                {live.recruiters.heading}
              </Heading>
            </div>
            <LogoMarquee logos={live.recruiters.logos as { name: string; logo: Img }[]} />
          </section>
          )}

          {/* ===== 06. Industry Connect – global academic collaborations ===== */}
          {has.collaborations && live.collaborations && (
          <section id="collaborations" className="relative scroll-mt-10 overflow-hidden bg-surface-alt pt-12 lg:pt-16">
            <div className="container-x grid items-end gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-8">
              {/* left: heading + looping partner logos */}
              <div className="min-w-0 lg:self-center lg:pb-16">
                <Heading eyebrow="Global" Icon={Globe2} align="left">
                  {live.collaborations.heading}
                </Heading>
                <div className="-mx-5 sm:mx-0">
                  <CardMarquee compact duration={32} items={live.collaborations.items as { name: string; logo: Img }[]} />
                </div>
              </div>
              {/* right: rotating half-globe on the section's bottom edge */}
              <HalfGlobe
                className="!w-[88%] sm:!w-full lg:-ml-[14%] lg:!w-[128%] lg:max-w-none"
                {...(site.globe ? { home: site.globe.home, partners: site.globe.partners, baseColor: site.globe.base, markerColor: site.globe.marker, glowColor: site.globe.glow } : {})}
              />
            </div>
          </section>
          )}

          {/* 07. Infrastructure – no separate content on the live page yet (photos are in Why Choose Us) */}

          {/* ===== 08. Academic Excellence – rankings, accreditations, figures ===== */}
          {has.rankings && live.rankings && (
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
                      className="group relative flex h-full items-start gap-4 overflow-hidden rounded-2xl border border-line bg-white p-4 shadow-[0_1px_2px_rgba(10,20,50,0.04)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-brand/25 sm:flex-col sm:items-stretch sm:gap-0 sm:p-5 lg:p-6"
                    >
                      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-brand transition-transform duration-500 group-hover:scale-x-100" />
                      <div className="flex shrink-0 items-center justify-between gap-4">
                        <span className="flex h-14 w-20 items-center sm:h-16 sm:w-24 justify-center rounded-xl bg-surface-alt p-2.5 ring-1 ring-line transition-[transform,background-color] duration-300 group-hover:scale-[1.03] group-hover:bg-white">
                          <span className="relative h-full w-full">
                            {r.badge ? <Pic img={r.badge} sizes="96px" contain /> : <Award aria-hidden="true" className="absolute inset-0 m-auto h-7 w-7 text-brand" strokeWidth={1.5} />}
                          </span>
                        </span>
                        <span aria-hidden="true" className="hidden font-display text-3xl font-semibold text-brand/10 sm:inline transition-colors duration-300 group-hover:text-brand/20">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <div className="min-w-0">
                      <h3 className="font-display text-base font-semibold text-ink sm:mt-5">{body}</h3>
                      {r.title && r.title.trim().toLowerCase() !== body.trim().toLowerCase() && <p className="mt-1 text-sm font-semibold text-brand">{r.title}</p>}
                      <p className="mt-1.5 whitespace-pre-line text-sm leading-relaxed text-muted sm:mt-2">{r.text}</p>
                      </div>
                    </Reveal>
                  );
                })}
              </ul>
            </div>
          </section>
          )}

          {live.stats2?.length ? <StatBand items={live.stats2} icons={[Globe2, Users, Sparkles]} /> : null}

          {live.highlightSlides?.length || live.facts?.length ? (
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
          ) : null}

          {/* 09. Scholarships – not published on the live page yet */}

          {/* ===== 10. Student Testimonials ===== */}
          {has.testimonials && live.testimonials && (
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
          )}

          {/* ===== 11. Campus Life ===== */}
          {has.campus && live.campus && (
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
          )}

          {/* ===== 12. Admission Process ===== */}
          {has.admission && (
          <section id="admission" className="relative scroll-mt-10 overflow-hidden bg-surface-alt py-12 lg:py-16">
            <div aria-hidden="true" className="absolute inset-0 opacity-50 [background-image:radial-gradient(color-mix(in_srgb,var(--brand)_12%,transparent)_1px,transparent_1.2px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,black,transparent_60%)]" />
            <div className="container-x relative">
              <Heading eyebrow="Admission process" Icon={ClipboardList}>
                Steps to follow
              </Heading>

              {live.steps?.items.length ? (
              <Reveal className="rounded-3xl border border-line bg-white p-6 shadow-[0_30px_60px_-45px_rgba(10,20,50,0.45)] sm:p-8 lg:px-10 lg:py-10">
                <ProcessStepper steps={live.steps.items} icons={STEP_ICONS} />
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
          )}

          {/* ===== 13. FAQs ===== */}
          {has.faqs && live.faqs && (
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
          )}

          {/* ===== 14. Contact Information ===== */}
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
          {/* ===== 15. Final CTA ===== */}
          <CtaBand text={live.ctaHeading} />
        </main>

        <footer className="on-dark bg-brand-ink pb-24 pt-8 text-center text-sm text-white/70 lg:pb-8">
          <p>{live.contact.footer}</p>
        </footer>

        <FloatingControls
          institution={inst.key}
          applyUrl={inst.applyUrl}
          whatsapp={inst.contact.whatsapp}
          institutionName={inst.name}
          topClassName="fixed bottom-5 right-5 z-40 hidden h-11 w-11 items-center justify-center rounded-full bg-brand text-[var(--hl)] shadow-[0_10px_24px_-10px_color-mix(in_srgb,var(--brand)_80%,transparent)] ring-4 ring-white/70 transition-colors hover:bg-brand-ink md:flex"
        />
        <GoogleAnalytics institution={inst.key} />
      </EnquiryProvider>
      </div>
    </ThemeScope>
  );
}
