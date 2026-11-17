# SRM_NEWLP – Admissions 2027–28 landing pages

Four independent, student-focused admission landing pages:

| Route | Institution | 
|---|---|
| `/srmist-ramapuram` | SRM Institute of Science and Technology, Ramapuram |
| `/srmist-tiruchirappalli` | SRM Institute of Science and Technology, Tiruchirappalli |
| `/easwari-engineering-college` | Easwari Engineering College |
| `/srm-trp-engineering-college` | SRM TRP Engineering College |
| `/` | Campaign hub linking to the four pages |

Each page has all 15 required sections: hero, enquiry form, why choose us, programme explorer, placements, industry connect, infrastructure, academic excellence, scholarships, testimonials, campus life, admission process, FAQs, contact, and final CTA with footer. Each page has its own visual identity (see [docs/DESIGN-SYSTEMS.md](docs/DESIGN-SYSTEMS.md)).

## Stack

Next.js 16 (App Router, Cache Components, Turbopack) · React 19 · TypeScript · Tailwind CSS 4 · Motion (Framer Motion) · Lucide icons.

## Run

```bash
npm install
cp .env.example .env.local   # optional – defaults to CRM mock mode
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
npm run lint
```

## Project structure

```
src/
  app/
    srmist-ramapuram/            page.tsx (fonts + metadata) · opengraph-image.tsx
    srmist-tiruchirappalli/
    easwari-engineering-college/
    srm-trp-engineering-college/
    api/enquiry/route.ts         validated, spam-protected CRM proxy
    sitemap.ts · robots.ts · layout.tsx · page.tsx (hub)
  components/
    LandingPage.tsx              composes Hero → configured section order → Final CTA → Footer
    common/                      Header, Footer, CTAs, ThemeScope, Reveal, Counter, Media placeholders, GA4, JSON-LD
    admission/                   4 hero variants, Enquiry section, Why, Academics, Scholarships, Process, FAQ, Contact, Final CTA
    programmes/                  ProgrammeExplorer (tabs, search, department filters, details, enquire)
    placements/                  Placements (ledger / board), IndustryConnect
    campus/                      Gallery + lightbox, Infrastructure, CampusLife, Testimonials carousel
    forms/                       EnquiryForm
  data/institutions/             ramapuram.ts · tiruchirappalli.ts · easwari.ts · trp.ts  ← all content, theme & layout
  lib/                           enquiry validation, CRM adapter, UTM capture, analytics, SEO helpers
  types/institution.ts           content model (incl. Pending / verified flags)
public/img/<institution>/        official assets downloaded from the current admissions sites
docs/                            CRM integration · design systems · audit, asset checklist & confirmations
```

### Editing content

All copy, programmes, statistics, contact details, theme tokens, layout variants and section order live in
`src/data/institutions/<institution>.ts`. Content rules:

- Use only verified facts and record their source.
- Mark unverified programmes with `verified: false`, which shows a "Details to be confirmed" tag.
- Use `{ pending: "description" }` for missing images. It renders a hatched "Asset pending" placeholder.
- Leave `intake` undefined unless it has been officially confirmed.
- Set `contact.whatsapp` (E.164 digits, e.g. `9198XXXXXXXX`) to switch WhatsApp CTAs from the callback form to `wa.me`.

## Integrations

- **CRM:** [docs/CRM-INTEGRATION.md](docs/CRM-INTEGRATION.md). Currently in clearly labelled **mock mode**.
- **GA4:** set `NEXT_PUBLIC_GA4_ID` (or per-institution `NEXT_PUBLIC_GA4_ID_RMP|TRICHY|EEC|TRP`). Events:
  - `apply_now_click`, `enquiry_form_start`, `enquiry_form_submit`, `enquiry_form_error`
  - `whatsapp_click`, `phone_click`, `email_click`
  - `programme_view`, `programme_enquire`, `brochure_request`, `counselling_request`, `campus_visit_request`, `scholarship_explore`

  Every event carries `institution`. Personal data is never sent.
- **UTM:** first-touch `utm_*`, `gclid` and `fbclid` are attached to every enquiry.
- **SEO:** per-page metadata and canonical URL, generated Open Graph images, JSON-LD (`CollegeOrUniversity`, `WebPage`, `FAQPage`), sitemap and robots. Set `NEXT_PUBLIC_SITE_URL`.

## Before launch

See **[docs/CONTENT-AUDIT-AND-CONFIRMATIONS.md](docs/CONTENT-AUDIT-AND-CONFIRMATIONS.md)** for the full list of items the client must confirm and the per-institution asset checklist.
