# Design systems – four independent identities

All four pages share accessible, reusable components. Each institution gets its own identity from
**tokens** (colour, radius, fonts), **layout variants**, **section order** and **copy**. All of these are
set in its data file under `src/data/institutions/`.

Brand colours were sampled from the official logo artwork on each institution's current admissions site.
Hex codes were not published in any stylesheet, so please confirm them against the official brand guidelines.

| | SRMIST Ramapuram | SRMIST Tiruchirappalli | Easwari Engineering College | SRM TRP Engineering College |
|---|---|---|---|---|
| Route | `/srmist-ramapuram` | `/srmist-tiruchirappalli` | `/easwari-engineering-college` | `/srm-trp-engineering-college` |
| Direction | Editorial institutional | Geometric, campus-led | Heritage, elegant, structured | Bold poster, energetic |
| Brand | SRM blue `#0B4FA0` (logo) | Deep indigo `#0B1F73` (logo) | Maroon `#6B1F25` (logo wordmark) | Navy `#1E2C5C` (logo wordmark) |
| Ink / dark | Navy `#0A1B3D` | `#070F3D` | `#2A0D10` | `#0E1533` |
| Accent | SRM red `#C8102E` | Seal gold `#D9A21B` | Seal teal `#127066` | Emblem green `#1F8A4C` |
| Accent text on light / dark | `#C8102E` / `#FF8D9C` | `#8A6100` / `#E9B23A` | `#127066` / `#7FD1C4` | `#17703D` / `#6FD39A` |
| Surface | White / `#F4F6FA` | White / `#F3F4F8` | Cream `#FFFDF9` / `#F7F1E8` | White / `#F2F4F1` |
| Display font | Fraunces (serif) | Space Grotesk | DM Serif Display | Archivo (heavy, uppercase hero) |
| Body font | Inter | Manrope | Source Sans 3 | Archivo |
| Corner radius | 4px (crisp) | 14px (soft geometric) | 2px (classical) | 0 (hard-edged poster) |
| Header | White | Deep indigo (logo is white-on-dark) | White | White |
| Hero | Editorial split, navy panel, ranking badges | Indigo grid field, rotated gold frame, student cut-out | Cream, arched portrait windows, heritage italic tagline | Full-bleed campus photo, outlined poster type, approval badges, stat bar |
| Why choose us | Numbered editorial list, sticky title | Bento grid | Numbered list + Chennai image | Bento grid |
| Placements | Light "ledger" | Dark scoreboard | Light ledger | Dark scoreboard |
| Programmes | Card grid | Card grid | Ruled rows (structured) | Card grid |
| Section order | Classic (programmes before placements) | Placements first (career-led) | Accreditation early (trust-led) | Placements then programmes (outcome-led) |

## Shared rules

- **Contrast:** accent colours that fail 4.5:1 as text use `accentText` (light) / `accentOnDark` (dark) via the `text-accent-ink` utility and the `.on-dark` scope.
- **Touch targets:** at least 44px on interactive controls. Mobile bottom bar with Apply / WhatsApp.
- **Motion:** 0.25–0.6 s ease-out reveals and count-ups. No autoplay. `prefers-reduced-motion` is respected (CSS and `MotionConfig reducedMotion="user"`).
- **Focus:** visible 3px accent outline, skip link, focus-trapped lightbox and mobile menu (Esc closes).
- **Placeholders:** hatched "Asset pending" boxes and dashed "To be confirmed" tags make every gap visible to reviewers.

## 2027–28 redesign: hero, imagery and motion

- **Split hero:** copy (60%) with an enquiry form card, "Start Your Admission Journey" (40%), visible in the first
  desktop viewport. On mobile the order is announcement → headline → body → CTAs → highlights → photo → full-width form.
  Identities: Ramapuram uses a light serif layout where the photo fades in from the right; Trichy uses dark navy with a grid
  and a full-bleed photo; Easwari uses warm cream with the photo in a curved panel; TRP uses a dark, bold uppercase layout
  with a diagonal photo cut.
- **Type scale (clamp):** hero 30→50 px, section heading 24→36 px, sub-heading 19→22 px, body 15→17 px
  (`.type-hero`, `.type-h2`, `.type-h3`, `.type-lead` in `globals.css`).
- **Motion system** (patterns referenced from the Motion Studio catalogue and adapted, not copied):
  - Hero: a single staggered rise for the copy and form, plus a one-time photo uncover.
  - Section images: mask-wipe reveal with a slight zoom settle (`<Reveal mask>`).
  - Header: a spring-animated shared-layout indicator for the active section (motion.dev "tab select").
  - Infrastructure: a pinned, scroll-linked horizontal gallery on desktop (motion.dev "scroll horizontal gallery"),
    and a swipeable snap row on touch screens and with reduced motion.
  - Placements: count-up figures, plus a recruiter marquee that pauses on hover/focus and is static with reduced motion.
  - Testimonials: snap carousel with mouse drag, arrows and position dots.
  - Industry and admission timelines: the connecting rule draws in on scroll.
  - FAQ: height-animated accordion.
  - Everything respects `prefers-reduced-motion`. Animations use only transform, opacity and clip-path.
