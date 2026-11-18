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
  Mail,
  MapPin,
  Phone,
  PlayCircle,
  Sparkles,
  Trophy,
  Users,
  type LucideIcon,
} from "lucide-react";
import live from "@/data/live/ramapuram.json";
import { ramapuram as inst } from "@/data/institutions";
import type { Stat } from "@/types/institution";
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
import { HalfGlobe } from "./HalfGlobe";
import { AccordionGallery, AnimatedTestimonials, CardMarquee, ItemMarquee, MilestoneMarquee, ProcessStepper, StatBannerCarousel, LogoMarquee, ScrollProgress, SectionTabs } from "./LiveMotion";

type Img = { src: string; alt: string; width: number; height: number } | null;

const HERO_IMAGE = {
  src: "/assets/ramapuram/hero/ai-hero-btech-cutout.webp",
  alt: "Engineering student in a hard hat, with construction, robotics and computing imagery",
  width: 1200,
  height: 1887,
};

/** Option 2 uses SRM blue as the action colour instead of the red accent. */
const BLUE_THEME = {
  ...inst.theme,
  accent: inst.theme.brand,
  accentSoft: inst.theme.brandSoft,
  accentText: inst.theme.brand,
  accentOnDark: "#9cc3ff",
  onAccent: "#ffffff",
};

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

function Pic({ img, className = "", sizes, contain = false, priority = false }: { img: Img; className?: string; sizes: string; contain?: boolean; priority?: boolean }) {
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
  const i = text.indexOf("#1");
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
    <section aria-label="Key figures" className="on-dark bg-gradient-to-br from-brand to-[#0a3f82] text-on-brand">
      <dl className="container-x grid grid-cols-1 divide-y divide-white/10 py-3 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:py-12 lg:py-14">
        {items.map((s, i) => {
          const Icon = icons[i] ?? Award;
          return (
            <Reveal key={s.label} delay={0.08 * i} className="flex items-center gap-4 py-4 sm:flex-col sm:gap-0 sm:py-0 sm:text-center">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/[0.07] ring-1 ring-white/15 sm:mb-4">
                <Icon aria-hidden="true" className="h-5 w-5 text-[#f2c14e]" strokeWidth={1.75} />
              </span>
              <div className="flex flex-col-reverse">
                <dt className="mt-1.5 text-[0.8125rem] font-medium uppercase tracking-[0.14em] text-white/70 sm:mt-3">{s.label}</dt>
                <dd className="font-display text-[2rem] font-semibold leading-none tracking-tight sm:text-[2.75rem] lg:text-5xl [&_[aria-hidden]>span]:text-[#f2c14e]">
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
    <section className="relative overflow-hidden bg-[#f2c14e] text-brand-ink">
      <div aria-hidden="true" className="absolute -right-20 -top-20 h-64 w-64 rounded-full border-[2.5rem] border-white/30" />
      <div aria-hidden="true" className="absolute -bottom-24 left-[30%] h-48 w-48 rounded-full border-[1.75rem] border-brand/10" />
      <Reveal className="container-x relative flex flex-col items-start gap-6 py-12 sm:flex-row sm:items-center sm:justify-between lg:py-14">
        <h2 className="type-h2 font-display">{text}</h2>
        <a
          href="#top"
          className="group inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-[var(--radius-card)] bg-brand px-6 text-[0.95rem] font-semibold text-white shadow-[0_12px_28px_-14px_rgba(11,79,160,0.9)] transition-[background-color,transform] duration-200 hover:bg-brand-ink active:translate-y-px"
        >
          Register Now
        </a>
      </Reveal>
    </section>
  );
}

const TABS = [
  { id: "why", label: "Why SRM", icon: "Sparkles" },
  { id: "offer", label: "Programmes", icon: "BookOpen" },
  { id: "placements", label: "Placements", icon: "Briefcase" },
  { id: "collaborations", label: "Industry Connect", icon: "Globe2" },
  { id: "rankings", label: "Academics", icon: "Award" },
  { id: "testimonials", label: "Testimonials", icon: "PlayCircle" },
  { id: "campus", label: "Campus Life", icon: "Camera" },
  { id: "admission", label: "Admission", icon: "ClipboardList" },
  { id: "contact", label: "Contact", icon: "MapPin" },
]
/** The live page's two highlight banners, rebuilt as real text (wording verbatim from the images). */
const HIGHLIGHT_SLIDES = [
  {
    parts: [{ text: "Empowering Scholars with" }, { text: "1000+", big: true, value: 1000, suffix: "+" }, { text: "Research Publications", accent: true }],
    image: { src: "/assets/ramapuram/campus/research-scholars-people.webp", alt: "Two SRMIST students in safety helmets", width: 502, height: 471 },
  },
  {
    parts: [{ text: "Successful" }, { text: "2306+", big: true, value: 2306, suffix: "+" }, { text: "Placement offers with above" }, { text: "50+LPA", big: true }],
    image: { src: "/assets/ramapuram/campus/placement-offers-people.webp", alt: "Two professionals shaking hands", width: 570, height: 492 },
  },
];

/** Campus life – official photos from srmrmp.edu.in (campus-life page) and the admissions page. */
const CAMPUS_GALLERY = [
  { src: "/assets/ramapuram/events/karthigai-deepam-2026.webp", alt: "Staff and students lighting rows of lamps for Karthigai Deepam on campus", width: 1280, height: 960, title: "Karthigai Deepam ’26", tag: "Festivals" },
  { src: "/assets/ramapuram/events/campus-event-stage.png", alt: "Large group of students in red T-shirts celebrating on a stage", width: 900, height: 400, title: "Campus events", tag: "Student life" },
  { src: "/assets/ramapuram/events/christmas-celebration-2025.webp", alt: "Faculty and staff with Santa Claus at the Christmas celebration", width: 1382, height: 735, title: "Christmas Celebration 2025", tag: "Celebrations" },
  { src: "/assets/ramapuram/campus/why-vibrant-campus-life.png", alt: "Students on stage at an \"Epoch\" event", width: 800, height: 800, title: "Vibrant Campus Life", tag: "Culturals" },
  { src: "/assets/ramapuram/events/yellow-day.webp", alt: "Students in yellow celebrating Yellow Day outside the Admin Block", width: 1024, height: 1024, title: "Yellow Day", tag: "Theme days" },
  { src: "/assets/ramapuram/events/campus-event-celebration.jpg", alt: "Students and staff in traditional dress around a floral pookalam", width: 602, height: 338, title: "Festival celebrations", tag: "Traditions" },
  { src: "/assets/ramapuram/campus/basketball-court.jpg", alt: "Student playing basketball on the campus court", width: 900, height: 400, title: "Sports", tag: "Sports" },
];

/** Names of the ranking / accreditation bodies whose logos appear on each card (live-page order). */
const RANK_BODY = ["NAAC", "MHRD – UGC", "NIRF 2025", "Times Higher Education", "QS World University Rankings", "Shanghai Ranking 2023"];
const MILESTONE_ICON_NAMES = ["Calendar", "Users", "Trophy", "Building2", "Hourglass", "Award", "Medal", "GraduationCap"];

/**
 * SRMIST Ramapuram – Option 2.
 * Same content and section order as https://registration.srmrmp.edu.in/ (text verbatim, official
 * images; the hero student visual is an AI-generated illustration – no on-page label, per client request). Data: src/data/live/ramapuram.json.
 */
export function RamapuramLive({ fonts }: { fonts: { className: string; display: string; body: string } }) {
  const ug = live.programmes.ugEligibility as unknown as UgEligibility;
  const lateral = live.programmes.lateralEntry as unknown as { eligibility: string; programmes: string[] };
  const phone = live.contact.phones[0];
  const badges = live.rankings.items.map((r) => r.badge).filter(Boolean) as NonNullable<Img>[];

  return (
    <ThemeScope theme={BLUE_THEME} displayFont={fonts.display} bodyFont={fonts.body} fontClassName={fonts.className}>
      <EnquiryProvider institution={inst.key}>
        <ScrollProgress />

        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur-md">
          <div className="container-x flex h-[4.5rem] items-center justify-between gap-4">
            <a href="#top" className="relative h-12 w-40 shrink-0" aria-label="SRMIST Ramapuram – back to top">
              <Pic img={live.logo as Img} sizes="160px" contain priority />
            </a>
            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center gap-1">
                {[
                  ["#offer", "Courses we offer"],
                  ["#why", "Why SRM"],
                  ["#placements", "Placements"],
                  ["#offer", "Eligibility"],
                ].map(([href, l]) => (
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
              className="absolute inset-0 -z-10 [background-image:linear-gradient(rgba(11,79,160,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(11,79,160,0.07)_1px,transparent_1px)] [background-size:24px_24px] [background-position:center] [mask-image:radial-gradient(ellipse_90%_90%_at_50%_45%,black_40%,transparent_100%)]"
            />
            <div className="container-x grid items-center gap-8 pt-8 lg:h-[calc(100svh-4.5rem)] lg:max-h-[52rem] lg:min-h-[36rem] lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.85fr)_minmax(0,0.95fr)] lg:gap-5 lg:pb-0 lg:pt-4">
              <div className="min-w-0">
                <p className="hero-rise mb-4 inline-flex items-center gap-2 rounded-full bg-[#f2c14e] px-4 py-1.5 text-sm font-semibold text-brand-ink" style={d(0)}>
                  <span aria-hidden="true" className="h-2 w-2 animate-pulse rounded-full bg-brand" />
                  {live.hero.formHeading}
                </p>
                <h1 className="hero-rise font-display text-[clamp(1.6rem,7.4vw,2rem)] font-bold leading-[1.15] tracking-[-0.025em] text-ink sm:text-[2.75rem] lg:text-[clamp(1.85rem,2.35vw,2.6rem)]" style={d(0.08)}>
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
                  <a href="#offer" className={`${btn.outline} whitespace-nowrap px-2 text-sm sm:px-6 sm:text-[0.95rem] hover:border-[#f2c14e] hover:!bg-[#f2c14e] hover:!text-brand-ink`}>
                    Courses we offer
                  </a>
                </div>
                {/* Looping ranking / accreditation logo strip */}
                <div className="hero-rise marquee relative mt-8 max-w-[30rem] overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)] motion-reduce:[mask-image:none]" style={d(0.28)}>
                  <ul className="marquee-track flex w-max items-center gap-8 py-1 motion-reduce:w-auto motion-reduce:flex-wrap motion-reduce:gap-5" style={{ "--marquee-duration": "22s" } as CSSProperties} aria-label="Rankings and accreditations">
                    {[...badges, ...badges].map((b, i) => (
                      <li key={`${b.src}-${i}`} aria-hidden={i >= badges.length || undefined} className={`relative h-11 w-16 shrink-0 ${i >= badges.length ? "motion-reduce:hidden" : ""}`}>
                        <Image src={b.src} alt={b.alt} fill sizes="64px" className="object-contain" />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="hero-rise relative mx-auto w-full max-w-[19rem] self-end sm:max-w-md lg:h-full lg:max-w-none" style={d(0.1)}>
                {/* Column box (size container) → an inner box with the image's exact aspect ratio, so the circle is always
                    positioned relative to the student himself, never to empty letterbox space. */}
                <div className="relative aspect-[1200/1490] [container-type:size] lg:aspect-auto lg:h-full">
                  <div
                    className="absolute bottom-0 left-1/2 aspect-[1200/1887] -translate-x-1/2"
                    style={{ width: "min(100cqw, calc(100cqh * 1200 / 1887))" }}
                  >
                    {/* brand circle locked behind the student's head */}
                    <div aria-hidden="true" className="absolute left-1/2 top-[-6.45%] aspect-square w-[94%] -translate-x-1/2 rounded-full border border-dashed border-brand/25" />
                    <div aria-hidden="true" className="absolute left-1/2 top-[-4.23%] aspect-square w-[87%] -translate-x-1/2 rounded-full border-2 border-[#d9a520]/30" />
                    <div aria-hidden="true" className="absolute left-1/2 top-[-2%] aspect-square w-[80%] -translate-x-1/2 rounded-full bg-[#d9a520] shadow-[0_30px_80px_-30px_rgba(217,165,32,0.7)]" />
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

          <SectionTabs items={TABS} />

          {/* ===== 02. Enquiry Form – in the hero (right column, first viewport) ===== */}

          {/* ===== 03. Why Choose Us ===== */}
          <section className="relative overflow-hidden bg-surface-alt py-12 lg:py-16">
            <div className="container-x relative">
              <Reveal className="mx-auto max-w-3xl text-center">
                <p className="eyebrow mb-4 inline-flex items-center gap-2 text-accent-ink">
                  <Trophy aria-hidden="true" className="h-4 w-4" /> SRM IST, Ramapuram
                </p>
                <PromoHeading text={live.promo.heading} />
                <span aria-hidden="true" className="mx-auto mt-5 block h-1 w-12 rounded-full bg-[#f2c14e]" />
                <p className="type-lead mx-auto mt-5 max-w-2xl text-muted">{live.promo.text}</p>
              </Reveal>
              <ScrollTiltFrame className="mx-auto mt-10 max-w-5xl lg:mt-12">
                <div className="rounded-[1.75rem] bg-white p-2 shadow-[0_30px_60px_-40px_rgba(10,20,50,0.45)] ring-1 ring-line">
                  <PromoVideo url={live.promo.videoUrl} title="SRM IST Ramapuram Campus" />
                </div>
              </ScrollTiltFrame>
            </div>
          </section>

          <section id="why" className="scroll-mt-10 bg-white py-12 lg:py-0">
            <ImmersiveGallery
              stickyPad="justify-start! pt-28 pb-6"
              tileHeight="h-[min(54vh,34rem)]"
              uniform
              brand
              items={live.why.items.filter((w) => w.image).map((w) => ({ title: w.title, media: w.image as NonNullable<Img> }))}
              heading={
                <Heading wide intro={live.why.intro}>
                  {live.why.heading}
                </Heading>
              }
            />
          </section>

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
          <StatBand items={live.stats1} icons={[Briefcase, Building2, Trophy]} />

          <section id="placements" className="py-12 lg:py-16 relative scroll-mt-10 overflow-hidden bg-white">
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(60%_100%_at_50%_0%,rgba(11,79,160,0.07),transparent_70%)]" />
            <div className="container-x relative">
              <Heading eyebrow="Placements" Icon={Briefcase}>
                {live.placements.heading}
              </Heading>
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
            </div>
            <div className="relative mt-8">
              <h3 className="sr-only">Student placement profiles</h3>
              <ItemMarquee duration={Math.max(live.placements.profiles.length * 5, 30)}>
                {live.placements.profiles.map((p) => (
                  <article
                    key={p.name}
                    className="group flex h-full w-60 flex-col overflow-hidden rounded-2xl border border-line bg-white text-center transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-brand/25"
                  >
                    <div className="relative h-20 bg-gradient-to-br from-brand to-[#0a3f82]">
                      <span aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:12px_12px]" />
                      <span aria-hidden="true" className="absolute -right-6 -top-8 h-24 w-24 rounded-full border-[10px] border-[#f2c14e]/30" />
                    </div>
                    <span className="relative mx-auto -mt-12 h-24 w-24 overflow-hidden rounded-full bg-brand-soft ring-4 ring-white shadow-[0_10px_24px_-12px_rgba(10,20,50,0.6)]">
                      <Pic img={p.photo as Img} sizes="96px" className="object-top" />
                    </span>
                    <div className="flex flex-1 flex-col px-4 pb-4 pt-3">
                      <h4 className="font-display text-[1.0625rem] font-semibold leading-tight text-ink">{p.name}</h4>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.1em] text-brand">{p.batch}</p>
                      <p className="mt-0.5 text-[0.8125rem] text-muted">{p.department}</p>
                      <div className="mt-auto flex items-center justify-between gap-2 border-t border-line pt-3">
                        <span className="relative h-7 w-20">{p.companyLogo && <Pic img={p.companyLogo as Img} sizes="80px" contain />}</span>
                        <span className="whitespace-nowrap rounded-full bg-[#f2c14e] px-2.5 py-1 text-xs font-bold text-brand-ink">{p.ctc}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </ItemMarquee>
            </div>
          </section>

          <section id="recruiters" className="py-12 lg:py-16 scroll-mt-10 overflow-hidden bg-surface-alt">
            <div className="container-x">
              <Heading eyebrow={`${live.recruiters.logos.length} recruiters`} Icon={Building2}>
                {live.recruiters.heading}
              </Heading>
            </div>
            <LogoMarquee logos={live.recruiters.logos as { name: string; logo: Img }[]} />
          </section>

          {/* ===== 06. Industry Connect – global academic collaborations ===== */}
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
              <HalfGlobe className="!w-[88%] sm:!w-full lg:-ml-[14%] lg:!w-[128%] lg:max-w-none" />
            </div>
          </section>

          {/* 07. Infrastructure – no separate content on the live page yet (photos are in Why Choose Us) */}

          {/* ===== 08. Academic Excellence – rankings, accreditations, figures ===== */}
          <section id="rankings" className="py-12 lg:py-16 relative scroll-mt-10 overflow-hidden bg-gradient-to-b from-white to-surface-alt">
            <div aria-hidden="true" className="absolute inset-0 opacity-[0.35] [background-image:radial-gradient(var(--line)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />
            <div className="container-x relative">
              <Heading eyebrow="Recognition" Icon={Award}>
                {live.rankings.heading}
              </Heading>
              <ul className="grid gap-3 sm:auto-rows-fr sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-5">
                {live.rankings.items.map((r, i) => {
                  const body = RANK_BODY[i] ?? "";
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
                            <Pic img={r.badge as Img} sizes="96px" contain />
                          </span>
                        </span>
                        <span aria-hidden="true" className="hidden font-display text-3xl font-semibold text-brand/10 sm:inline transition-colors duration-300 group-hover:text-brand/20">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <div className="min-w-0">
                      <h3 className="font-display text-base font-semibold text-ink sm:mt-5">{body}</h3>
                      {r.title && <p className="mt-1 text-sm font-semibold text-brand">{r.title}</p>}
                      <p className="mt-1.5 whitespace-pre-line text-sm leading-relaxed text-muted sm:mt-2">{r.text}</p>
                      </div>
                    </Reveal>
                  );
                })}
              </ul>
            </div>
          </section>

          <StatBand items={live.stats2} icons={[Globe2, Users, Sparkles]} />

          <section className="bg-white py-12 lg:py-16">
            {/* highlight banners – full width */}
            <div className="container-x">
              <Reveal className="mx-auto max-w-5xl">
                <StatBannerCarousel slides={HIGHLIGHT_SLIDES} />
              </Reveal>
            </div>
            {/* milestones – single auto-looping row */}
            <div className="mt-8">
              <MilestoneMarquee items={live.facts.map((f, i) => ({ ...f, icon: MILESTONE_ICON_NAMES[i] ?? "Award" }))} />
            </div>
          </section>

          {/* 09. Scholarships – not published on the live page yet */}

          {/* ===== 10. Student Testimonials ===== */}
          <section id="testimonials" className="relative scroll-mt-10 overflow-hidden bg-surface-alt py-12 lg:py-16">
            <div aria-hidden="true" className="absolute -right-24 top-10 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(242,193,78,0.25),transparent_65%)]" />
            <div aria-hidden="true" className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(11,79,160,0.12),transparent_65%)]" />
            <div className="container-x relative">
              <Heading eyebrow="Student voices" Icon={PlayCircle}>
                {live.testimonials.heading}
              </Heading>
              <AnimatedTestimonials items={live.testimonials.items} />
            </div>
          </section>

          {/* ===== 11. Campus Life ===== */}
          <section id="campus" className="py-12 lg:py-16 scroll-mt-10 bg-white">
            <div className="container-x">
              <Heading eyebrow="Campus life" Icon={Camera}>
                {live.campus.heading}
              </Heading>
              <Reveal>
                <AccordionGallery items={CAMPUS_GALLERY} />
              </Reveal>
            </div>
          </section>

          {/* ===== 12. Admission Process ===== */}
          <section id="admission" className="relative scroll-mt-10 overflow-hidden bg-surface-alt py-12 lg:py-16">
            <div aria-hidden="true" className="absolute inset-0 opacity-50 [background-image:radial-gradient(rgba(11,79,160,0.12)_1px,transparent_1.2px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,black,transparent_60%)]" />
            <div className="container-x relative">
              <Heading eyebrow="Admission process" Icon={ClipboardList}>
                Steps to follow
              </Heading>

              <Reveal className="rounded-3xl border border-line bg-white p-6 shadow-[0_30px_60px_-45px_rgba(10,20,50,0.45)] sm:p-8 lg:px-10 lg:py-10">
                <ProcessStepper steps={live.steps.items} icons={["UserPlus", "Smartphone", "ClipboardList", "Upload", "Send"]} />
              </Reveal>

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
                      <Reveal as="li" key={m} delay={0.06 * i} className="group flex h-full items-center gap-3 rounded-2xl border border-line bg-white p-4 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-[#f2c14e]/70">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f2c14e]/25 text-[#7a5a00] transition-colors group-hover:bg-[#f2c14e] group-hover:text-brand-ink">
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
            </div>
          </section>

          {/* 13. FAQs – not published on the live page yet */}

          {/* ===== 14. Contact Information ===== */}
          <section id="contact" className="py-12 lg:py-16 scroll-mt-10 bg-white">
            <div className="container-x grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
              <Reveal mask className="relative aspect-[2/1] overflow-hidden rounded-[var(--radius-card)] border border-line">
                <Pic img={live.contact.map as Img} sizes="(min-width:1024px) 55vw, 100vw" />
              </Reveal>
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
                <p className="text-sm text-muted">Nearby: {live.contact.landmarks.join(" · ")}</p>
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
          topClassName="fixed bottom-5 right-5 z-40 hidden h-11 w-11 items-center justify-center rounded-full bg-brand text-[#f2c14e] shadow-[0_10px_24px_-10px_rgba(11,79,160,0.8)] ring-4 ring-white/70 transition-colors hover:bg-brand-ink md:flex"
        />
        <GoogleAnalytics institution={inst.key} />
      </EnquiryProvider>
    </ThemeScope>
  );
}
