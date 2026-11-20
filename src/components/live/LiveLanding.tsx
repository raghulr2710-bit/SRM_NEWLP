import Image from "next/image";
import type { CSSProperties } from "react";
import { BookOpen, GraduationCap, Phone } from "lucide-react";
import type { Institution, ThemeTokens } from "@/types/institution";
import type { LiveData, LiveImg } from "./types";
import { ThemeScope } from "@/components/common/ThemeScope";
import { EnquiryProvider, ENQUIRY_ANCHOR } from "@/components/common/EnquiryContext";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { FloatingControls } from "@/components/common/FloatingControls";
import { GoogleAnalytics } from "@/components/common/Analytics";
import { PhoneLink } from "@/components/common/Cta";
import { btn } from "@/components/common/buttons";
import { toFormProps } from "@/lib/form-props";
import { LiveCourses, type LiveCourse, type UgEligibility } from "./LiveCourses";
import type { Rgb } from "./HalfGlobe";
import { d, Heading, Pic, type Img } from "./parts";
import { defaultSections } from "./sections/default";
import type { SectionSet } from "./sections/types";
import { ScrollProgress, SectionTabs } from "./LiveMotion";


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
    /** corner radius for buttons (default: the card radius) */
    buttonRadius?: string;
    surfaceAlt?: string;
    line?: string;
    ink?: string;
    muted?: string;
  };
  /** Transparent cut-out; circle = disc behind the head, in % (cx/w of image width, top of image height). */
  heroImage: LiveImg & { circle: { cx: number; w: number; top: number } };
  globe?: { home: [number, number]; partners: boolean; base: Rgb; marker: Rgb; glow: Rgb };
  /** Hero background: pattern + optional faint campus photo (right side, fades to the left). */
  heroBg?: { pattern: "none" | "grid" | "dots" | "diagonal" | "plus" | "rings"; image?: string; position?: string; opacity?: number };
  /** Hide the one-line sub-heading under the hero headline. */
  hideHeroSubline?: boolean;
  /** Hide the looping accreditation logo strip in the hero. */
  hideHeroBadges?: boolean;
  /** Accreditation seal shown in the header next to the college logo (e.g. NAAC A+). */
  headerBadge?: LiveImg;
  /** Section tab bar colour (default: brand). */
  tabsTone?: "brand" | "hl";
  /** Campus-specific section designs (fallback: default design). */
  sections?: SectionSet;
}

/**
 * Live-content landing page (one template, per-institution identity).
 * Text and images come verbatim from each institution's live registration site via
 * src/data/live/<key>.json; sections with no content are left out.
 */
/** Hero background patterns (all in the brand colour, very light). */
const HERO_PATTERN = {
  none: "",
  grid: "[background-image:linear-gradient(color-mix(in_srgb,var(--brand)_7%,transparent)_1px,transparent_1px),linear-gradient(90deg,color-mix(in_srgb,var(--brand)_7%,transparent)_1px,transparent_1px)] [background-size:24px_24px]",
  dots: "[background-image:radial-gradient(color-mix(in_srgb,var(--brand)_11%,transparent)_1.1px,transparent_1.3px)] [background-size:20px_20px]",
  diagonal: "[background-image:repeating-linear-gradient(135deg,color-mix(in_srgb,var(--brand)_8%,transparent)_0_1px,transparent_1px_14px)]",
  plus: "[background-size:26px_26px]",
  rings: "[background-image:repeating-radial-gradient(circle_at_88%_12%,transparent_0_26px,color-mix(in_srgb,var(--brand)_9%,transparent)_26px_27px)]",
} as const;

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
    ...(pal.buttonRadius ? { "--btn-radius": pal.buttonRadius } : {}),
  } as CSSProperties;
  const S = { ...defaultSections, ...site.sections };
  const sp = { live, globe: site.globe };
  const longHeadline = live.hero.headline.some((l) => l.length > 24);
  const ratio = HERO_IMAGE.height / HERO_IMAGE.width;
  const c = HERO_IMAGE.circle;
  /** concentric rings: grow by 7% / 14% of the image width, centred on the same point */
  const ring = (grow: number) => ({ left: `${c.cx - (c.w + grow) / 2}%`, width: `${c.w + grow}%`, top: `${c.top - grow / 2 / ratio}%` });

  return (
    <ThemeScope theme={theme} displayFont={fonts.display} bodyFont={fonts.body} fontClassName={fonts.className}>
      <div style={vars} className="live-page">
      <EnquiryProvider institution={inst.key}>
        <ScrollProgress />

        {/* Header */}
        <header className="relative z-50 border-b border-line bg-white">
          <div className="container-x flex h-[4.5rem] items-center justify-between gap-4">
            <div className="flex min-w-0 items-center gap-2 sm:gap-4">
              <a href="#top" className={`relative h-12 shrink-0 sm:w-40 ${site.headerBadge ? "w-28" : "w-32"}`} aria-label={`${live.meta.shortName} – back to top`}>
                <Pic img={live.logo as Img} sizes="160px" contain priority />
              </a>
              {site.headerBadge && (
                <span className="relative h-10 w-11 shrink-0 sm:h-12 sm:w-[4.5rem] sm:border-l sm:border-line sm:pl-4">
                  <span className="relative block h-full w-full">
                    <Pic img={site.headerBadge as Img} sizes="72px" contain priority />
                  </span>
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {phone && (
                <>
                  {/* helpline – highlighted */}
                  <PhoneLink
                    tel={phone.href.replace("tel:", "")}
                    location="header"
                    className="group hidden min-h-11 items-center gap-2.5 rounded-full bg-[var(--hl)]/20 py-1 pl-1 pr-4 ring-1 ring-[var(--hl)]/60 transition-colors hover:bg-[var(--hl)]/35 md:inline-flex"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-white">
                      <Phone aria-hidden="true" className="h-4 w-4" />
                    </span>
                    <span className="leading-tight">
                      <span className="block text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-brand">Admission Helpline</span>
                      <span className="block text-sm font-bold text-ink">{phone.display}</span>
                    </span>
                  </PhoneLink>
                  <PhoneLink
                    tel={phone.href.replace("tel:", "")}
                    location="header_mobile"
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--hl)] text-brand-ink md:hidden"
                  >
                    <Phone aria-hidden="true" className="h-5 w-5" />
                    <span className="sr-only">Call the admission helpline {phone.display}</span>
                  </PhoneLink>
                </>
              )}
              <a href="#top" className={`${btn.accent} !min-h-11 shrink-0 whitespace-nowrap text-sm sm:!px-5 ${site.headerBadge ? "!px-3" : "!px-4"}`}>
                Register Now
              </a>
            </div>
          </div>
        </header>

        <main id="main">
          <section id="top" className="relative isolate overflow-hidden bg-white">
            {/* Background: per-campus faint campus photo (optional) + pattern, fading softly at the edges */}
            {site.heroBg?.image && (
              <div aria-hidden="true" className="absolute inset-y-0 right-0 -z-20 w-full lg:w-[68%] [mask-image:linear-gradient(to_right,transparent,black_35%)]">
                <Image src={site.heroBg.image} alt="" fill sizes="70vw" className="object-cover blur-[1px]" style={{ objectPosition: site.heroBg.position ?? "center", opacity: site.heroBg.opacity ?? 0.16 }} />
              </div>
            )}
            <div aria-hidden="true" className={`absolute inset-0 -z-10 [background-position:center] [mask-image:radial-gradient(ellipse_90%_90%_at_50%_45%,black_40%,transparent_100%)] ${HERO_PATTERN[site.heroBg?.pattern ?? "grid"]}`} style={site.heroBg?.pattern === "plus" ? { backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='26' height='26'><path d='M13 8v10M8 13h10' stroke='${pal.brand}' stroke-opacity='0.22' stroke-width='1.4' stroke-linecap='round'/></svg>`)}")` } : undefined} />
            <div className={`container-x grid items-center gap-8 pt-8 lg:h-[calc(100svh-4.5rem)] lg:max-h-[52rem] lg:min-h-[36rem] lg:gap-5 lg:pb-0 lg:pt-4 ${longHeadline ? "lg:grid-cols-[minmax(0,1.6fr)_minmax(0,0.7fr)_minmax(0,0.9fr)]" : "lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.85fr)_minmax(0,0.95fr)]"}`}>
              <div className="min-w-0">
                <p className="hero-rise mb-4 inline-flex items-center gap-2 rounded-full bg-[var(--hl)] px-4 py-1.5 text-sm font-semibold text-brand-ink" style={d(0)}>
                  <span aria-hidden="true" className="h-2 w-2 animate-pulse rounded-full bg-brand" />
                  {live.hero.formHeading}
                </p>
                <h1 className={`hero-rise font-display text-[clamp(1.45rem,6.9vw,2rem)] font-bold leading-[1.15] tracking-[-0.025em] text-ink ${longHeadline ? "sm:text-[2.5rem] lg:text-[clamp(1.9rem,2.45vw,2.65rem)]" : "sm:text-[2.75rem] lg:text-[clamp(1.85rem,2.35vw,2.6rem)]"}`} style={d(0.08)}>
                  {/* short lines never wrap; long headlines (e.g. Easwari) keep 2 lines from lg up, wrap on phones */}
                  <span className={`block ${live.hero.headline[0].length <= 24 ? "whitespace-nowrap" : "text-balance lg:whitespace-nowrap"}`}>{live.hero.headline[0]}</span>
                  <span className={`block text-brand ${live.hero.headline[1].length <= 24 ? "whitespace-nowrap" : "text-balance lg:whitespace-nowrap"}`}>{live.hero.headline[1]}</span>
                </h1>
                {live.hero.text ? (
                  <p className="hero-rise mt-4 max-w-[32rem] text-[0.9375rem] leading-relaxed text-muted lg:text-base" style={d(0.14)}>
                    {live.hero.text}
                  </p>
                ) : site.hideHeroSubline ? null : (
                  <p className="hero-rise mt-4 inline-flex items-center gap-2 text-base font-semibold text-ink sm:text-lg" style={d(0.14)}>
                    <GraduationCap aria-hidden="true" className="h-5 w-5 text-accent-ink" />
                    {live.hero.button}
                  </p>
                )}
                <div className="hero-rise mt-6 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap" style={d(0.2)}>
                  <a href={has.admission ? "#admission" : "#top"} className={`${btn.accent} group whitespace-nowrap px-2 text-sm sm:px-6 sm:text-[0.95rem]`}>
                    Admission
                  </a>
                  <a href="#offer" className={`${btn.outline} whitespace-nowrap !border-[var(--hl)] !bg-[var(--hl)] px-2 text-sm !text-brand-ink sm:px-6 sm:text-[0.95rem] hover:!border-[var(--hl-deep)] hover:!bg-[var(--hl-deep)]`}>
                    Courses we offer
                  </a>
                </div>
                {/* Looping ranking / accreditation logo strip */}
                {badges.length > 0 && !site.hideHeroBadges && (
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

          <SectionTabs
            items={tabs}
            tone={site.tabsTone}
            aside={
              <>
                {phone && (
                  <PhoneLink
                    tel={phone.href.replace("tel:", "")}
                    location="tabbar"
                    className={`inline-flex min-h-10 items-center gap-2 whitespace-nowrap text-sm font-bold ${site.tabsTone === "hl" ? "text-brand-ink" : "text-white"}`}
                  >
                    <Phone aria-hidden="true" className={`h-4 w-4 ${site.tabsTone === "hl" ? "text-brand" : "text-[var(--hl)]"}`} />
                    {phone.display}
                  </PhoneLink>
                )}
                <a
                  href="#top"
                  className={`inline-flex min-h-10 items-center whitespace-nowrap rounded-[var(--btn-radius,var(--radius-card))] px-4 text-sm font-semibold transition-colors ${site.tabsTone === "hl" ? "bg-brand text-white hover:bg-brand-ink" : "bg-[var(--hl)] text-brand-ink hover:bg-[var(--hl-deep)]"}`}
                >
                  Register Now
                </a>
              </>
            }
          />

          {live.promo && <S.promo {...sp} />}
          {has.why && <S.why {...sp} />}

          {/* ===== 04. Programmes Offered ===== */}
          <section id="offer" className="py-12 lg:py-16 scroll-mt-10 bg-white">
            <div className="container-x">
              <Heading eyebrow="Programmes" Icon={BookOpen}>
                {live.programmes.heading}
              </Heading>
              <div>
                <LiveCourses items={live.programmes.items as LiveCourse[]} ugEligibility={ug} flabsUgNote={live.programmes.flabsUgNote} flabsStats={live.placements?.facultyStats} lateral={lateral} />
              </div>
            </div>
          </section>

          {live.stats1?.length ? <S.stats1 {...sp} /> : null}
          {has.placements && <S.placements {...sp} />}
          {has.recruiters && <S.recruiters {...sp} />}
          {has.collaborations && <S.collaborations {...sp} />}
          {has.rankings && <S.rankings {...sp} />}
          {live.stats2?.length ? <S.stats2 {...sp} /> : null}
          {live.highlightSlides?.length || live.facts?.length ? <S.highlights {...sp} /> : null}
          {has.testimonials && <S.testimonials {...sp} />}
          {has.campus && <S.campus {...sp} />}
          {has.admission && <S.admission {...sp} />}
          {has.faqs && <S.faqs {...sp} />}
          <S.contact {...sp} />
          <S.cta {...sp} />
        </main>

        <footer className="on-dark bg-brand-ink pb-24 pt-8 text-center text-sm text-white/70 lg:pb-8">
          <p>{live.contact.footer}</p>
        </footer>

        <FloatingControls
          institution={inst.key}
          applyUrl={inst.applyUrl}
          whatsapp={inst.contact.whatsapp}
          institutionName={inst.name}
          topClassName="fixed bottom-[5.5rem] right-[1.5625rem] z-40 hidden h-11 w-11 items-center justify-center rounded-full bg-brand text-[var(--hl)] shadow-[0_10px_24px_-10px_color-mix(in_srgb,var(--brand)_80%,transparent)] ring-4 ring-white/70 transition-colors hover:bg-brand-ink md:flex"
        />
        <GoogleAnalytics institution={inst.key} />
      </EnquiryProvider>
      </div>
    </ThemeScope>
  );
}
