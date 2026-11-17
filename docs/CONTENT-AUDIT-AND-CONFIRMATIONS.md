# Content audit, asset checklist and items for client confirmation

Audit date: 17 Nov 2026. Sources were the four current registration pages only:

| Institution | Source audited | Main website |
|---|---|---|
| SRMIST Ramapuram | registration.srmrmp.edu.in | www.srmrmp.edu.in returned "Access Denied" to automated access |
| SRMIST Tiruchirappalli | registration.srmtrichy.edu.in | www.srmtrichy.edu.in returned no content |
| Easwari Engineering College | registration.srmeaswari.ac.in | srmeaswari.ac.in returned "Access Denied" |
| SRM TRP Engineering College | apply.trp.srmtrichy.edu.in | trp.srmtrichy.edu.in returned "Access Denied" |

Every fact on the new pages comes from these sources or from the official logo artwork. Unverified items are shown on the pages as **"Asset pending"** placeholders or **"To be confirmed"** tags.

## Audit findings on the current pages (fixed in the redesign)

- All four are Meritto-hosted forms. They expose internal CRM/admin fields in the page markup (e.g. "Counseled by", "Walk in Fee enable Date", "Select Waiting list", "Re-assign User", "Script Editor"). These are not used on the new pages.
- Forms are long (state, city, OTP, captcha, CRM fields) and dominate the first screen. The new form has 7 fields with inline validation.
- Key content is shown only as images: Easwari's "Steps to Apply" and accreditation logos, and recruiter logos without alt text. The new pages render content as text.
- Navigation issues: Easwari's UG and PG links both point to `#ug`, and "Need Assistance?" links go to `#`.
- Conflicting claims:
  - SRMIST pages headline "#1 University in India" while also stating "NIRF 11th". The "#1" claim is **omitted** pending confirmation.
  - Trichy shows "52 LPA highest package" (no year) next to a 20.7 LPA top student offer.
  - Trichy says "semester abroad in 9+ countries" in one place and "40+ countries" in another. **9+** is used.
  - Trichy's important-dates table is for 2025 intake. **Not shown.**
- Typos on the source pages ("SCINCES", "Fortune 5oo", "SHANGAI", "Located with in Trichy") are corrected or avoided.

---

## Items requiring client confirmation

### All four institutions
- [ ] **WhatsApp business number** for each institution. Until provided, WhatsApp buttons open the enquiry form with "Reach me on WhatsApp" pre-selected instead of a `wa.me` link.
- [ ] **CRM API details** (see docs/CRM-INTEGRATION.md). The site is in mock mode.
- [ ] **GA4 measurement ID(s)**: one shared property or one per institution.
- [ ] **Scholarship policy 2027–28**: categories, eligibility, benefits, process and terms. No amounts are shown until provided.
- [ ] **Approved student testimonials**: photo, name, programme, year, verbatim quote, consent, and video links where available.
- [ ] **Recruiter logos** cleared for use (names only are shown where verified).
- [ ] **MoU / industry partner list**, internship partners, industrial visits and workshops for the Industry Connect timeline.
- [ ] **Approved intake** per programme (shown only when supplied).
- [ ] **Official admission process steps** (current steps are labelled *Indicative*). Include TNEA counselling codes for Easwari and TRP if applicable.
- [ ] **Important dates** for 2027–28.
- [ ] **Brochure PDFs**. Brochure requests currently go through the enquiry form.
- [ ] **Social media URLs**, **privacy policy URL** and **terms URL** (the footer shows "link pending").
- [ ] Confirmation of **brand hex colours and fonts** against official guidelines (colours were sampled from logos).
- [ ] Placement figures: **batch / year** and **scope** (campus vs. group-wide) for every headline number. Placement % and average package where available.
- [ ] Consent from named students whose placement offers appear (names were already public on the official pages).
- [ ] Final consent / DND wording approved by legal.

### SRMIST – Ramapuram
- [ ] Postal address. "Bharathi Salai, Ramapuram, Chennai – 600 089" came from summarised content and is shown with an "Address to be confirmed" tag.
- [ ] Whether the 5700+ offers / 1100+ companies / 55 LPA figures are Ramapuram-specific or SRMIST-wide, and the batch year.
- [ ] Management programmes (BBA, MBA ×3), M.Tech durations and MCA eligibility. These are marked "Details to be confirmed".
- [ ] The documents and payment details in the process section (taken from summarised content; they match the Trichy page).
- [ ] Times Higher Education ranking details.
- [ ] Basis for the "#1 University in India" claim, if it is to be used.
- [ ] Placement records and testimonials (Rupali M, Mehul Choudhary, Pavani Sai, etc.). These appeared only in summarised content, so none are used.

### SRMIST – Tiruchirappalli
- [ ] Batch year for 5700+ / 1100+ / 52 LPA, and whether they are campus-specific.
- [ ] Programme durations (stated only for B.Tech and the allied-health programmes).
- [ ] Recruiter labels "Morgan", "Rich", "Squad", "Reverselab", "AIDA" and "Wells" from logo alt text. Only unambiguous names are shown.
- [ ] Testimonials (none on the current page).
- [ ] 2027–28 dates (the current page shows 2025 dates).
- [ ] "SRMJEE Number" field on the current form: should the new form collect it?

### Easwari Engineering College
- [ ] NBA accredited programmes, NAAC grade and NIRF rank band. The current page shows these as logos only.
- [ ] Programme duration and intake.
- [ ] Department grouping used in the explorer (Core Engineering, Computing, etc.). This is an editorial grouping and can be renamed to match official departments.
- [ ] Period covered by "1424+ students placed" and "432 companies visited".
- [ ] Star achievers: the page shows both a stipend and a CTC for an "intern – SDE" role. Confirm how to describe these offers.
- [ ] Full testimonial quotes. Only paraphrased summaries exist; no quotes are shown.
- [ ] "Global Academic" partner logos (Illinois Tech, Taipei Tech, UC Davis, La Trobe, Harvard Medical School). The nature of each relationship is not stated, so they are **not** shown.
- [ ] Recruiter list "Major Recruiters 2024–2025" (logos only on the current page).
- [ ] Helpdesk email domain `helpdesk@eec.srmrmp.edu.in`: confirm it is correct for Easwari.

### SRM TRP Engineering College
- [ ] Batch / year for 99% placements, 580+ offers, 35 LPA and 90+ interview avenues.
- [ ] NBA accredited programmes (NBA logo shown on the current page).
- [ ] Programme durations and intake. Lateral entry details.
- [ ] Recruiter names (the current page has logos with filenames only).
- [ ] Testimonial quotes and photos (names, programmes and roles are published).

---

## Asset checklist (per institution)

Legend: ✅ in use from the official site · ⏳ placeholder shown · ➖ not applicable

| Asset | Ramapuram | Tiruchirappalli | Easwari | SRM TRP |
|---|---|---|---|---|
| Official logo | ✅ `rmp/logo.png` | ✅ `trichy/logo.png` (white-on-dark) | ✅ `eec/logo.png` | ✅ `trp/logo.jpg` |
| Hero student image | ✅ cropped from official banner | ✅ `trichy/banner.webp` | ✅ `eec/up-image.png` | ✅ `trp/hero.webp` |
| Wide campus photograph | ⏳ | ⏳ | ✅ Galileo Block | ✅ main building / aerial |
| Laboratories | ⏳ | ✅ computer lab | ✅ automobile, computer, C&I | ✅ robotics lab |
| Library | ⏳ | ⏳ | ⏳ | ✅ |
| Smart classrooms | ⏳ | ➖ | ➖ | ➖ |
| Hostels | ⏳ | ✅ | ⏳ | ⏳ |
| Sports facilities | ⏳ | ⏳ | ⏳ | ⏳ |
| Innovation / research centre | ⏳ | ⏳ | ➖ | ✅ (robotics) |
| Dining | ➖ | ✅ | ➖ | ➖ |
| Cultural festival | ⏳ | ⏳ | ✅ live music | ✅ dance night |
| Technical symposium | ⏳ | ➖ | ⏳ | ⏳ |
| Student clubs / community | ⏳ | ✅ | ✅ | ➖ |
| Accreditation badges | ✅ NAAC, MHRD, NIRF, QS, THE, Shanghai | ➖ (text only) | ✅ NBA, NAAC, NIRF (details pending) | ✅ AICTE, Anna Univ., NBA |
| Faculty / research photo | ⏳ | ➖ | ✅ class group | ✅ library |
| Student testimonial photos | ⏳ ×3 | ⏳ ×3 | ⏳ (initials shown) | ⏳ (initials shown) |
| Testimonial videos | ⏳ | ⏳ | ⏳ | ⏳ |
| Recruiter logos | ⏳ | names only | ⏳ | ⏳ |
| Brochure PDF | ⏳ | ⏳ | ⏳ | ⏳ |
| Open Graph image | ✅ generated | ✅ generated | ✅ generated | ✅ generated |

Images not used because they are generic stock (not campus-specific): Trichy `gallery3` and `gallery7`.
