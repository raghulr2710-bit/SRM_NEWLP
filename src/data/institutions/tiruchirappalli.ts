import type { ImageAsset, Institution } from "@/types/institution";
import { aiImage, PENDING_SCHOLARSHIP } from "./helpers";

/**
 * SRMIST – Tiruchirappalli
 * Source of truth: https://registration.srmtrichy.edu.in/ (live page, re-read 2026-11-18).
 * Programme titles, eligibility, placement profiles, recruiter logos and figures are copied
 * verbatim from that page; official images are mirrored in /public/assets/tiruchirappalli/.
 * Full extraction inventory: trichy-inventory.json (content migration hand-off).
 */

const A = "/assets/tiruchirappalli";
const img = (path: string, alt: string, width: number, height: number, extra: Partial<ImageAsset> = {}): ImageAsset => ({
  src: `${A}/${path}`,
  alt,
  width,
  height,
  ...extra,
});
/**
 * Image published on the official admissions page that is evidently stock photography
 * (not a photograph of this campus or its students) – flagged so it renders as illustrative.
 */
const stock = (path: string, alt: string): ImageAsset => img(path, alt, 252, 252, { illustrative: true });

const D_FLABS = "FLABS (formerly Faculty of Science and Humanities)";
const D_MGMT = "College of Management";
const D_CET = "College of Engineering & Technology";
const D_DIPLOMA = "Diploma Courses";
const D_MAHS = "Medicine and Allied Health Sciences";
const D_WPP = "Working Professional Program";
const NL2 = "\n\n";
/* Eligibility text shared by several programmes – copied verbatim from the live page. */
/** B.Com Commerce (General) (+6 more) */
const EL_01 =
  "10 + 2 (Higher Secondary) with Commerce, Accountancy . (Minimum Aggregate of 50%)";
/** B.A English (+1 more) */
const EL_02 =
  "A pass in 10 + 2 (Higher Secondary) any group with a minimum aggregate of 50%";
/** BCA Data Science (+1 more) */
const EL_03 =
  "10 + 2 (Higher Secondary) with Mathematics mandatory or Computer Science with Mathematics. (Minimum Aggregate of 50%)";
/** B.Sc Computer Science (+7 more) */
const EL_04 =
  "11 + 2 (Higher Secondary) with Mathematics mandatory or Computer Science with Mathematics. (Minimum Aggregate of 50%)";
/** B.Sc Hotel and Hospitality Administration (+1 more) */
const EL_05 =
  "10 + 2 (Higher Secondary) Any Group. (Minimum aggregate of 35%)";
/** M.Sc Computer Science W/S in Cybersecurity (+4 more) */
const EL_06 =
  "1. A pass in B.Sc Computer Science / BCA / B.Sc IT / B.Sc Mathematics / B.Sc Statistics/ B.Sc Physics/ B.Sc Electronics / B.Voc Data Science and Analytics/ B.Sc Computer System and Design/ B.Sc Triple major subjects with Computer Science as one of the Major subjects / Bachelor Degree in Computer Science Engineering or equivalent Degree from a University recognized / certified by UGC / SRMIST / AIU\n2. A minimum aggregate of 50% in UG.";
/** MBA Master of Business Administration (+2 more) */
const EL_07 =
  "1. A Bachelor's degree with minimum aggregate of 50%.\n2. Admission will be done through SRM Joint Entrance Examination for Management (SRMJEEM) followed by a Personal Interview. Students with eligible entrance scores in CAT/XAT/MAT/GMAT/NMAT/CMAT/TANCET will be granted direct consideration for the personal interview.\n3. Preference would be given to candidates with work experience.";
/** B.Tech Artificial Intelligence (+1 more) */
const EL_08 =
  "A 60% Minimum marks in Physics, Chemistry & Maths (PCM/PMO).";
/** B.Tech Biotechnology with specialization in Food Technology (+1 more) */
const EL_09 =
  "A 60% Minimum marks in Physics, Chemistry & Maths/Biology (PCM/PCB)";
/** B.Tech Civil Engineering (+17 more) */
const EL_10 =
  "A 60% Minimum marks in Physics, Chemistry & Maths (PCM/PMO)";
/** M.Tech Computer Science and Engineering (+2 more) */
const EL_11 =
  "Four year Bachelor’s Degree in Engineering/ Mathematics or Statistics (except B.Tech -Biotechnology, Food Technology and its specialisations), (or) MCA (or) M.Sc (CSE / IT) (or) its equivalent with a minimum aggregate of 50%";
/** B.Sc Medical Radiology and Imaging Technology (+1 more) */
const EL_12 =
  "Candidate shall be completed the age of 17 years on or before 31st December of the year of admission to the course.\nThe Maximum age limit for admission is 30 years on or before 31st December of the year of admission to the course.\nHe/She has passed the H.S.C / (10+2) or equivalent Examination from a recognized board / University in India with Minimum aggregate of 60 % Marks in Physics, Chemistry and Biology/ Botany + Zoology provided the candidate has passed in each subject separately.\nCandidate who have studied abroad and have passed the equivalent qualification as determined by the association of Indian Universites as per the guidelines to dertermine the eligibility and must have passed in the subjects Physics, Chemistry and Biology / Botany + Zoology and English up to 12th standard level.\nThe qualifying Examinations passed by FN/PIO/CIWGC Students should be considered equivalent to Eligibility Examinations by the Association of Indian Universities / Academic Council.";
/** M.P.T Pediatrics and Neonatal Science (+5 more) */
const EL_13 =
  "1. Candidate must have passed the Bachelor of Physiotherapy on regular mode from the recognized University with passmarks (50%). Admissions on the basis of entrance examination by the respective University.Post graduate entrance criteria requires to be compulsory registered member of NCAHP\n2. He/she has to furnish at the time of submission of application form, a certificate of physical fitness from a registered medical practitioner and two references from persons other than relatives testifying to satisfactory general character.\n3. Admission to Masters of Physiotherapy course shall be made on the basis of eligibility and an entrance test to be conducted for the purpose at the State/ University level. No candidate will be admitted on any ground unless he/she has appeared in the admission test and interview.\na) Entrance test, to be conducted by the university/State government as per the syllabus.\nb) Successful candidates based on written test will be called for the interview and shall have to face an interview board. The board will include the Head of the Department of Physiotherapy (Chairman of the Board) and other members as per the policy of institute/ university, whose recommendations shall be final for the selection of the students.\nc) During subsequent counselling (s) the seat will be allotted as per the merit of the candidate depending on the availability of seats on that particular day.\nd) Candidate who fails to attend the Medical Examination/ Physical fitness on the notified date(s) will forfeit the claim for admission.";
/** M.O.T Mental Health (+3 more) */
const EL_14 =
  "1. The Candidates should have passed the Bachelor of Occupational Therapy (BOT) Degree or equivalent (4 years + 6 months of internship on or before 31st May of that academic year) from a UGC recognized University in India (on campus full time program)\n2. Minimum 50% aggregate of marks or CGPA of 5.0 in qualifying examination.\n3. Age: Minimum age limit is 21 years on or before 31st December of year of Admission.\n4. Candidates who have passed Bachelor of Occupational Therapy (BOT) from other than SRM Institute of Science and Technology shall obtain Migration Certificate from Parent University.";
const QUALIFYING_EXAM =
  "Qualifying examination: Applicant should have passed in Higher secondary examination (10, +2 pattern) or appearing in Higher Secondary examination in the current academic year with a minimum of 60% aggregate ( 3 subjects) in Physics (mandatory) , Mathematics (mandatory) and at least one of Chemistry / Biotechnology / Biology / Computer Science / Information Technology / Informatics Practices / Engineering Graphics / Botany and (or) Zoology as major subjects in regular subjects in regular stream from any board within India , CBSE , ISCE , Matriculation , IB or NIOS";
const BIO_NOTE =
  "NOTE: For B.Tech Programs offered by the Department of Biotechnology, Department of Genetic Engineering and Department of Biomedical Engineering – Minimum 60% aggregate in PCM / PMB/PCB/PCB or Z (Botany or Zoology). Students who have not studied Mathematics as one of the major subjects in +2 must undertake an additional 4 credit courses in Mathematics during the First Year of B.Tech. Students who have completed +2 under NIOS must have completed the 10th standard from regular schooling or vice-versa. Students who have not studied Chemistry should undergo a bridge course in Chemistry in the first year.";
const LATERAL =
  "Lateral entry programme – Eligibility Criteria: Candidates must have passed a 3 year Diploma in engineering/technology with aggregate of 60% in relevant specialization from a recognized university/college.";
const HONOURS =
  "* Students can choose to add a 4th year to their education to obtain a B.A (Honors.) / B.Sc (Honors.) / B.C.A (Honors.) / B.Com (Honors.) degree in accordance with NEP regulations.";
const logo = (file: string, name: string, width: number, height: number) => ({
  name,
  image: img(`recruiters/${file}`, `${name} logo`, width, height),
});

const placed = (
  name: string,
  programme: string,
  pkg: string,
  photo: [string, number, number],
  company: string,
  companyLogo: string,
) => ({
  name,
  programme,
  package: pkg,
  batch: "2026",
  company,
  photo: img(`placements/${photo[0]}`, `${name}, placed at ${company}`, photo[1], photo[2]),
  companyLogo: img(`placements/${companyLogo}`, `${company} logo`, 200, 100),
});

export const tiruchirappalli: Institution = {
  key: "trichy",
  route: "/srmist-tiruchirappalli",
  name: "SRM Institute of Science and Technology, Tiruchirappalli",
  shortName: "SRMIST Tiruchirappalli",
  legalLine: "SRM Institute of Science and Technology · Tiruchirappalli campus",
  city: "Tiruchirappalli",
  logo: img("logo/srmist-tiruchirappalli-logo.png", "SRM Institute of Science and Technology, Tiruchirappalli", 197, 92),
  logoOnDark: true,
  applyUrl: "https://registration.srmtrichy.edu.in/",
  brochureUrl: null,

  theme: {
    brand: "#0b1f73",
    brandInk: "#070f3d",
    brandSoft: "#eef1fb",
    accent: "#d9a21b",
    accentSoft: "#fbf3df",
    accentText: "#8a6100",
    accentOnDark: "#e9b23a",
    onBrand: "#ffffff",
    onAccent: "#1a1300",
    surface: "#ffffff",
    surfaceAlt: "#f3f4f8",
    ink: "#0d1330",
    muted: "#4b5168",
    line: "#dde1ec",
    radiusCard: "14px",
  },

  layout: {
    hero: "geometric",
    why: "bento",
    placements: "board",
    programmes: "grid",
    order: [
      "enquiry",
      "placements",
      "why",
      "programmes",
      "industry",
      "academics",
      "infrastructure",
      "campusLife",
      "scholarships",
      "testimonials",
      "process",
      "faqs",
      "contact",
    ],
  },

  seo: {
    title: "SRMIST Tiruchirappalli Admissions 2027 | B.Tech, Allied Health, MBA",
    description:
      "Apply to SRM Institute of Science and Technology, Tiruchirappalli. Admissions open 2027 for B.Tech, M.Tech, Medicine & Allied Health Sciences, MBA, BBA, B.Sc, BCA, B.Com and more.",
    keywords: [
      "SRMIST Trichy admissions 2027",
      "SRM Trichy B.Tech",
      "SRM Tiruchirappalli allied health sciences",
      "SRM Trichy MBA",
    ],
  },

  hero: {
    eyebrow: "Step into your Future · Admissions Open 2027",
    headline: ["Achieve Career Success", "before you Graduate!"],
    body:
      "Experience the best in placements alongside academic excellence. SRM IST, Tiruchirappalli is a place for learning, discovery, innovation, expression, and discourse.",
    // The live hero artwork (assets/tiruchirappalli/hero/hero-banner.webp) is a cut-out model shot, not a campus
    // photograph, so the landscape illustrative image is kept until approved campus photography is supplied.
    image: aiImage("trichy", "hero", "Two engineering students building a robotic arm prototype in an innovation lab", "70% center"),
    proof: [
      { value: 5700, suffix: "+", label: "Job Offers" },
      { value: 1100, suffix: "+", label: "Companies Visited" },
      { value: 52, suffix: " LPA", label: "Highest Package" },
    ],
    proofNote: "As published on the official Tiruchirappalli admissions page. Batch year and campus scope to be confirmed.",
  },

  enquiry: {
    heading: "Get a call from a Trichy counsellor",
    body: "Tell us what you would like to study. We will help with programme choice, eligibility and the application.",
    faculties: {
      label: "Faculty / College",
      // Options of the official form's "Select Faculty/College" field, verbatim and in order.
      options: [
        "Engineering and Technology",
        "FLABS (formerly Science and Humanities)",
        "Hotel Management",
        "Management",
        "Medicine and Allied Health Sciences",
        "Working Professional",
        "Science and Humanities",
      ],
    },
    levels: ["UG", "PG", "Diploma"],
    consent:
      "I authorise SRM Institute Of Science And Technology, Tiruchirapalli & its representatives to contact me with updates and notifications via Email/SMS/What'sApp/Call. This will override DND/NDNC.",
    nextSteps: [
      "A counsellor from the Tiruchirappalli campus calls you.",
      "You get guidance on programme, eligibility and entrance requirements.",
      "You complete your application on the official portal.",
    ],
  },

  why: {
    // Official "why" tiles are 252 px stock photographs, so the larger illustrative image is kept here.
    image: aiImage("trichy", "clubs", "Students in a coding club discussing a project on a large screen"),
    heading: "Why SRM IST Tiruchirappalli",
    intro: "Experience the best of Placement & Academic Excellence",
    source: "registration.srmtrichy.edu.in – “Why SRM IST Tiruchirappalli” blocks (titles verbatim, with the image published beside each)",
    videoUrl: "https://www.youtube.com/embed/CFXUxcX2BM0",
    videoTitle: "SRM IST, Tiruchirappalli – official video from the admissions page",
    // Tile images are the ones published beside each title; most are stock photography (flagged illustrative).
    items: [
      {
        title: "Placement in the Fortune 500 companies",
        body: "Students placed in Top Companies in India & Abroad",
        media: stock("campus/why-fortune-500-placements.png", "Students working at computers – image published with “Placement in the Fortune 500 companies”"),
      },
      {
        title: "Semester Abroad Program in 9+ countries",
        body: "",
        media: stock("campus/why-semester-abroad.png", "Students in discussion – image published with “Semester Abroad Program”"),
      },
      {
        title: "Foreign Language Coaching",
        body: "",
        media: stock("campus/why-foreign-language-coaching.png", "Two students taking notes – image published with “Foreign Language Coaching”"),
      },
      {
        title: "Support for Innovation & Start-ups",
        body: "",
        media: stock("campus/why-innovation-start-ups.png", "Person using a VR headset – image published with “Support for Innovation & Start-ups”"),
      },
      {
        title: "Fully Equipped Hostel Facilities",
        body: "",
        media: img("infrastructure/hostel.png", "Hostel room with two study desks and storage, SRMIST Tiruchirappalli", 1024, 1024),
      },
      {
        title: "Vibrant Campus Life",
        body: "",
        media: stock("campus/why-vibrant-campus-life.png", "Students with a guitar on campus steps – image published with “Vibrant Campus Life”"),
      },
      {
        title: "Located within Trichy",
        body: "SRM Nagar Trichy – Chennai Highways, near Samayapuram.",
        media: img("campus/why-located-in-trichy.png", "Rockfort temple, Tiruchirappalli", 252, 252),
      },
      {
        title: "State-of-the-Art Infrastructure",
        body: "",
        media: img("infrastructure/state-of-the-art-infrastructure.png", "Campus dining hall with high timber roof, SRMIST Tiruchirappalli", 252, 252),
      },
      { title: "Professional Clubs", body: "", media: stock("campus/why-semester-abroad.png", "Students in discussion – image published with “Professional Clubs”") },
      { title: "Research Labs", body: "200+ Research Labs", media: stock("campus/why-fortune-500-placements.png", "Students working at computers – image published with “Research Labs”") },
      { title: "Art and Cultural Events", body: "", media: stock("campus/why-vibrant-campus-life.png", "Students with a guitar on campus steps – image published with “Art and Cultural Events”") },
      { title: "Diverse Community", body: "", media: stock("campus/why-foreign-language-coaching.png", "Two students taking notes – image published with “Diverse Community”") },
    ],
  },

  programmes: {
    heading: "Courses We Offer",
    intro:
      "Every programme listed on the official SRM IST Tiruchirappalli admissions page – FLABS, Management, Engineering & Technology, Diploma, Medicine and Allied Health Sciences and the Working Professional Program – with eligibility exactly as published.",
    footnote:
      "* Students can choose to add a 4th year to their education to obtain a B.A (Honors.) / B.Sc (Honors.) / B.C.A (Honors.) / B.Com (Honors.) degree in accordance with NEP regulations. Eligibility is reproduced verbatim from the official admissions page; where a duration is not shown it is not published there. Approved intake will be shown once verified.",
    items: [
      // FLABS (formerly Faculty of Science and Humanities)
      { degree: "B.Com", name: "Commerce (General)", level: "UG", department: D_FLABS, eligibility: EL_01, notes: HONOURS, verified: true },
      { degree: "B.Com", name: "Information Systems and Management", level: "UG", department: D_FLABS, eligibility: "10 + 2 (Higher Secondary) with Any Group. (Minimum Aggregate of 50%)", notes: HONOURS, verified: true },
      { degree: "B.Com", name: "Accounting & Finance", level: "UG", department: D_FLABS, eligibility: EL_01, notes: [HONOURS, "Also offered in the Second Shift."].join(NL2), verified: true },
      { degree: "B.Com", name: "(Honours) & Logistics", level: "UG", department: D_FLABS, eligibility: EL_01, notes: HONOURS, verified: true },
      { degree: "B.Com", name: "Business Analytics", level: "UG", department: D_FLABS, eligibility: EL_01, notes: HONOURS, verified: true },
      { degree: "B.Com", name: "International Accounting and Finance", level: "UG", department: D_FLABS, eligibility: EL_01, notes: HONOURS, verified: true },
      { degree: "B.Com", name: "Banking, Financial Services and Insurance (BFSI)", level: "UG", department: D_FLABS, eligibility: EL_01, notes: HONOURS, verified: true },
      { degree: "B.Com", name: "Computer Applications", level: "UG", department: D_FLABS, eligibility: EL_01, notes: HONOURS, verified: true },
      { degree: "B.A", name: "English", level: "UG", department: D_FLABS, eligibility: EL_02, notes: HONOURS, verified: true },
      { degree: "B.A", name: "Journalism and Mass Communication", level: "UG", department: D_FLABS, eligibility: EL_02, notes: HONOURS, verified: true },
      { degree: "BCA", name: "Data Science", level: "UG", department: D_FLABS, eligibility: EL_03, notes: HONOURS, verified: true },
      { degree: "BCA", name: "Computer Applications", level: "UG", department: D_FLABS, eligibility: EL_03, notes: HONOURS, verified: true },
      { degree: "B.Sc", name: "Computer Science", level: "UG", department: D_FLABS, eligibility: EL_04, notes: [HONOURS, "Also offered in the Second Shift."].join(NL2), verified: true },
      { degree: "B.Sc", name: "Computer Science with specialization in Cyber Security", level: "UG", department: D_FLABS, eligibility: EL_04, notes: HONOURS, verified: true },
      { degree: "B.Sc", name: "Computer Science with specialization in Artificial Intelligence & Machine Learning", level: "UG", department: D_FLABS, eligibility: EL_04, notes: HONOURS, verified: true },
      { degree: "B.Sc", name: "Computer Science with specialization in Agentic AI", level: "UG", department: D_FLABS, eligibility: EL_04, notes: [HONOURS, "Also offered in the Second Shift."].join(NL2), verified: true },
      { degree: "B.Sc", name: "Visual Communication", level: "UG", department: D_FLABS, eligibility: EL_04, notes: HONOURS, verified: true },
      { degree: "B.Sc", name: "Visual Communication & Artificial Intelligence", level: "UG", department: D_FLABS, eligibility: EL_04, notes: HONOURS, verified: true },
      { degree: "B.Sc", name: "Psychology", level: "UG", department: D_FLABS, eligibility: EL_04, notes: HONOURS, verified: true },
      { degree: "B.Sc", name: "Biotechnology", level: "UG", department: D_FLABS, eligibility: EL_04, notes: HONOURS, verified: true },
      { degree: "B.Sc", name: "Hotel and Hospitality Administration", level: "UG", department: D_FLABS, eligibility: EL_05, notes: HONOURS, verified: true },
      { degree: "B.Sc", name: "Fintech", level: "UG", department: D_FLABS, eligibility: EL_05, notes: HONOURS, verified: true },
      { degree: "M.Sc", name: "Computer Science W/S in Cybersecurity", level: "PG", department: D_FLABS, eligibility: EL_06, verified: true },
      { degree: "M.Sc", name: "Computer Science W/S in Artificial Intelligence and Machine Learning", level: "PG", department: D_FLABS, eligibility: EL_06, notes: "Also offered in the Second Shift.", verified: true },
      { degree: "M.Sc", name: "Computer Science W/S in Full Stack Development", level: "PG", department: D_FLABS, eligibility: EL_06, verified: true },
      { degree: "M.Sc", name: "Computer Science", level: "PG", department: D_FLABS, eligibility: EL_06, verified: true },
      { degree: "M.Sc", name: "Applied Data Science", level: "PG", department: D_FLABS, eligibility: EL_06, verified: true },
      { degree: "M.Com", name: "Commerce", level: "PG", department: D_FLABS, eligibility: "1. A pass in any UG degree with Commerce and Accountancy / Business studies as major subjects.\n2. A minimum aggregate of 50% in UG", verified: true },
      { degree: "M.Com", name: "Accounting and Finance", level: "PG", department: D_FLABS, eligibility: "1. A pass in any UG degree with Commerce and Accountancy / Business studies as major subjects.\n2. A minimum aggregate of 50% in UG.", verified: true },
      { degree: "MCA", name: "Computer Applications", level: "PG", department: D_FLABS, eligibility: "a) Passed B.C.A / B.Sc. in Computer Science / B.Sc. in Information Technology / B.Sc in Computer Technology / Bachelor Degree in Computer Science Engineering or equivalent Degree from a University recognized / certified by UGC / SRMIST / AIU OR b) Passed B.Sc. / B.Com. / B.A. from University recognized/certified by UGC / SRMIST / AIU with Mathematics at 10+2 Level or at Graduation Level. c) The Minimum Percentage of Marks / CGPA prescribed by SRMIST. d ) Notwithstanding the above, actual Admissions will also be based on the rules and regulations of the UGC / AICTE / Competent authorities.", verified: true },
      { degree: "MCA", name: "Generative AI", level: "PG", department: D_FLABS, eligibility: "A) A Pass in BCA / B.Sc. in Computer Science / B.Sc. in Information Technology / B.Sc in Computer Technology / Bachelor Degree in Computer Science Engineering or equivalent Degree from a University recognized / certified by UGC / SRMIST / AIU\nB) A Pass in B.Sc. / B.Com. / B.A. from University recognized/certified by UGC / SRMIST / AIU with Mathematics/ Business Mathematics/ Statistics/Business Statistics/Applied Mathematics at 10+2 Level or at Graduation Level.", verified: true },
      // College of Management
      { degree: "BBA", name: "Bachelor of Business Administration", level: "UG", department: D_MGMT, eligibility: "A Pass in Higher Secondary Examination or Equivalent (Academic or Vocational Stream ) with a Minimum eligibility of aggregate of 50% in +2 (Preference will be given to students without any break in study and students who secures aggregate of 60 % of Marks in +2)", notes: "Also offered in the Second Shift.", verified: true },
      { degree: "MBA", name: "Master of Business Administration", level: "PG", department: D_MGMT, eligibility: EL_07, verified: true },
      { degree: "MBA", name: "Health Care & Hospital Management", level: "PG", department: D_MGMT, eligibility: EL_07, verified: true },
      { degree: "MBA", name: "Business Analytics", level: "PG", department: D_MGMT, eligibility: EL_07, verified: true },
      // College of Engineering & Technology
      { degree: "B.Tech", name: "Artificial Intelligence", level: "UG", department: D_CET, duration: "4 Years", eligibility: EL_08, lateralEntry: true, notes: [QUALIFYING_EXAM, LATERAL].join(NL2), verified: true },
      { degree: "B.Tech", name: "Artificial Intelligence and Future Technologies", level: "UG", department: D_CET, duration: "4 Years", eligibility: EL_08, lateralEntry: true, notes: [QUALIFYING_EXAM, LATERAL].join(NL2), verified: true },
      { degree: "B.Tech", name: "Biomedical Engineering", level: "UG", department: D_CET, duration: "4 Years", eligibility: "A 60% Minimum marks in Physics, Chemistry & Maths (PCM/PCB)", lateralEntry: true, notes: [QUALIFYING_EXAM, BIO_NOTE, LATERAL].join(NL2), verified: true },
      { degree: "B.Tech", name: "Biotechnology", level: "UG", department: D_CET, duration: "4 Years", eligibility: "A 60% Minimum marks in Physics, Chemistry & Biology (PCM/PCB)", lateralEntry: true, notes: [QUALIFYING_EXAM, BIO_NOTE, LATERAL].join(NL2), verified: true },
      { degree: "B.Tech", name: "Biotechnology with specialization in Food Technology", level: "UG", department: D_CET, duration: "4 Years", eligibility: EL_09, lateralEntry: true, notes: [QUALIFYING_EXAM, BIO_NOTE, LATERAL].join(NL2), verified: true },
      { degree: "B.Tech", name: "Food Technology", level: "UG", department: D_CET, duration: "4 Years", eligibility: EL_09, notes: QUALIFYING_EXAM, verified: true },
      { degree: "B.Tech", name: "Civil Engineering", level: "UG", department: D_CET, duration: "4 Years", eligibility: EL_10, notes: QUALIFYING_EXAM, verified: true },
      { degree: "B.Tech", name: "Computer Science and Engineering", level: "UG", department: D_CET, duration: "4 Years", eligibility: EL_10, lateralEntry: true, notes: [QUALIFYING_EXAM, LATERAL].join(NL2), verified: true },
      { degree: "B.Tech", name: "Computer Science and Engineering with specialization in Artificial Intelligence and Machine Learning", level: "UG", department: D_CET, duration: "4 Years", eligibility: EL_10, lateralEntry: true, notes: [QUALIFYING_EXAM, LATERAL].join(NL2), verified: true },
      { degree: "B.Tech", name: "Computer Science and Engineering with specialization in Big Data Analytics", level: "UG", department: D_CET, duration: "4 Years", eligibility: EL_10, lateralEntry: true, notes: [QUALIFYING_EXAM, LATERAL].join(NL2), verified: true },
      { degree: "B.Tech", name: "Computer Science and Engineering with specialization in Block Chain Technology", level: "UG", department: D_CET, duration: "4 Years", eligibility: EL_10, lateralEntry: true, notes: [QUALIFYING_EXAM, LATERAL].join(NL2), verified: true },
      { degree: "B.Tech", name: "Computer Science and Business Systems (TCS)", level: "UG", department: D_CET, duration: "4 Years", eligibility: EL_10, lateralEntry: true, notes: [QUALIFYING_EXAM, LATERAL].join(NL2), verified: true },
      { degree: "B.Tech", name: "Computer Science and Engineering with specialization in Cyber Security", level: "UG", department: D_CET, duration: "4 Years", eligibility: EL_10, lateralEntry: true, notes: [QUALIFYING_EXAM, LATERAL].join(NL2), verified: true },
      { degree: "B.Tech", name: "Computer Science and Engineering (Data Science)", level: "UG", department: D_CET, duration: "4 Years", eligibility: EL_10, lateralEntry: true, notes: [QUALIFYING_EXAM, LATERAL].join(NL2), verified: true },
      { degree: "B.Tech", name: "Computer Science and Engineering with specialization in Medical Engineering", level: "UG", department: D_CET, duration: "4 Years", eligibility: EL_10, lateralEntry: true, notes: [QUALIFYING_EXAM, LATERAL].join(NL2), verified: true },
      { degree: "B.Tech", name: "Computer Science and Engineering with specialization in Internet of Things", level: "UG", department: D_CET, duration: "4 Years", eligibility: EL_10, lateralEntry: true, notes: [QUALIFYING_EXAM, LATERAL].join(NL2), verified: true },
      { degree: "B.Tech", name: "Electronics and Communication Engineering", level: "UG", department: D_CET, duration: "4 Years", eligibility: EL_10, lateralEntry: true, notes: [QUALIFYING_EXAM, LATERAL].join(NL2), verified: true },
      { degree: "B.Tech", name: "Electronics and Communication Engineering with specialization in Data Science", level: "UG", department: D_CET, duration: "4 Years", eligibility: EL_10, lateralEntry: true, notes: [QUALIFYING_EXAM, LATERAL].join(NL2), verified: true },
      { degree: "B.Tech", name: "Electronics Engineering (VLSI Design and Technology)", level: "UG", department: D_CET, duration: "4 Years", eligibility: EL_10, notes: QUALIFYING_EXAM, verified: true },
      { degree: "B.Tech", name: "Electrical and Electronics Engineering", level: "UG", department: D_CET, duration: "4 Years", eligibility: EL_10, lateralEntry: true, notes: [QUALIFYING_EXAM, LATERAL].join(NL2), verified: true },
      { degree: "B.Tech", name: "Information Technology", level: "UG", department: D_CET, duration: "4 Years", eligibility: EL_10, lateralEntry: true, notes: [QUALIFYING_EXAM, LATERAL].join(NL2), verified: true },
      { degree: "B.Tech", name: "Mechanical Engineering", level: "UG", department: D_CET, duration: "4 Years", eligibility: EL_10, lateralEntry: true, notes: [QUALIFYING_EXAM, LATERAL].join(NL2), verified: true },
      { degree: "B.Tech", name: "Mechanical Engineering with specialization in Artificial Intelligence and Machine Learning", level: "UG", department: D_CET, duration: "4 Years", eligibility: EL_10, notes: QUALIFYING_EXAM, verified: true },
      { degree: "B.Tech", name: "Software Product Engineering", level: "UG", department: D_CET, duration: "4 Years", eligibility: EL_10, lateralEntry: true, notes: [QUALIFYING_EXAM, LATERAL].join(NL2), verified: true },
      { degree: "M.Tech", name: "Computer Science and Engineering", level: "PG", department: D_CET, eligibility: EL_11, verified: true },
      { degree: "M.Tech", name: "Artificial Intelligence and Machine Learning", level: "PG", department: D_CET, eligibility: EL_11, verified: true },
      { degree: "M.Tech", name: "Embedded Systems and VLSI Design", level: "PG", department: D_CET, eligibility: "B.E / B.Tech. in EEE / ECE / CSE / IT / ICE / EIE (or) M.Sc. (Electronics / Applied Electronics) (or) M.Sc. (Physics – Specialisation in Electronics) (or) its equivalent degree in the above Disciplines with a minimum aggregate of 50%", verified: true },
      { degree: "M.Tech", name: "Biotechnology", level: "PG", department: D_CET, eligibility: EL_11, verified: true },
      // Diploma Courses
      { degree: "Diploma", name: "Hotel Management & Catering Science", level: "Diploma", department: D_DIPLOMA, eligibility: "A Pass in SSLC", verified: true },
      // Medicine and Allied Health Sciences
      { degree: "B.Sc", name: "Cardiac Care Technology", level: "UG", department: D_MAHS, duration: "4 Years (3 Years + 1 Year Internship)", eligibility: "Candidate shall be completed the age of 17 years on or before 31st December of the year of admission to the course.\nThe Maximum age limit for admission is 30 years on or before 31st December of the year of admission to the course.\nHe/She has passed the H.S.C / (10+2) or equivalent Examination from a recognized board / University in India with Minimum aggregate of 60 % Marks in Physics, Chemistry and Biology/ Botany + Zoology / Biotechnology , provided the candidate has passed in each subject separately.\nCandidate who have studied abroad and have passed the equivalent qualification as determined by the association of Indian Universites as per the guidelines to determine the eligibility and must have passed in the subjects Physics, Chemistry and Biology / Botany + Zoology / Biotechnology and English up to 12th standard level.\nThe qualifying Examinations passed by FN/PIO/CIWGC Students should be considered equivalent to Eligibility Examinations by the Association of Indian Universities / Academic Council.", verified: true },
      { degree: "B.Sc", name: "Cardio Perfusion Technology", level: "UG", department: D_MAHS, duration: "4 Years (3 Years + 1 Year Internship)", eligibility: "Candidate shall be completed the age of 17 years on or before 31st December of the year of admission to the course.\nThe Maximum age limit for admission is 30 years on or before 31st December of the year of admission to the course.\nHe/She has passed the H.S.C / (10+2) or equivalent Examination from a recognized board / University in India with Minimum aggregate of 60 % Marks in Physics, Chemistry and Biology/ Botany + Zoology/ Biotechnology , provided the candidate has passed in each subject separately.\nCandidate who have studied abroad and have passed the equivalent qualification as determined by the association of Indian Universites as per the guidelines to dertermine the eligibility and must have passed in the subjects Physics, Chemistry and Biology / Botany + Zoology / Biotechnology and English up to 12th standard level.\nThe qualifying Examinations passed by FN/PIO/CIWGC Students should be considered equivalent to Eligibility Examinations by the Association of Indian Universities / Academic Council.", verified: true },
      { degree: "B.Sc", name: "Medical Radiology and Imaging Technology", level: "UG", department: D_MAHS, duration: "4 Years (3 Years + 1 Year Internship)", eligibility: EL_12, verified: true },
      { degree: "B.Sc", name: "Medical Laboratory Science", level: "UG", department: D_MAHS, duration: "4 Years (3 Years + 1 Year Internship)", eligibility: "Candidate shall be completed the age of 17 years on or before 31st December of the year of admission to the course.\nThe Maximum age limit for admission is 30 years on or before 31st December of the year of admission to the course.\nHe/She has passed the H.S.C / (10+2) or equivalent Examination from a recognized board / University in India with Minimum aggregate of 60 % Marks in Physics, Chemistry and Biology/ Botany + Zoology provided the candidate has passed in each subject separately.\nCandidate who have studied abroad and have passed the equivalent qualification as determined by the association of Indian Universites as per the guidelines to dertermine the eligibility and must have passed in the subjects Physics, Chemistry and Biology / Botany + Zoology and English up to 12th standard level.\nThe qualifying Examinations passed by FN/PIO/CIWGC Students should be considered equivalent to Eligibility Examinations by the Association of Indian Universities / Academic Council..", verified: true },
      { degree: "B.Sc", name: "Anaesthesia and Operation Theatre Technology", level: "UG", department: D_MAHS, duration: "4 Years (3 Years + 1 Year Internship)", eligibility: "Candidate shall be completed the age of 17 years on or before 31st December of the year of admission to the course.\nThe Maximum age limit for admission is 30 years on or before 31st December of the year of admission to the course.\nHe/She has passed the H.S.C / (10+2) or equivalent Examination from a recognized board / University in India with Minimum aggregate of 60 % Marks in Physics, Chemistry and Biology/ Botany + Zoology / Biotechnology , provided the candidate has passed in each subject separately.\nCandidate who have studied abroad and have passed the equivalent qualification as determined by the association of Indian Universites as per the guidelines to dertermine the eligibility and must have passed in the subjects Physics, Chemistry and Biology / Botany + Zoology / Biotechnology and English up to 12th standard level.\nThe qualifying Examinations passed by FN/PIO/CIWGC Students should be considered equivalent to Eligibility Examinations by the Association of Indian Universities / Academic Council.", verified: true },
      { degree: "B.Sc", name: "Physician Associates", level: "UG", department: D_MAHS, duration: "4 Years (3 Years + 1 Year Internship)", eligibility: "Candidate shall be completed the age of 17 years on or before 31st December of the year of admission to the course.\nThe Maximum age limit for admission is 30 years on or before 31st December of the year of admission to the course.\nHe/She has passed the H.S.C / (10+2) or equivalent Examination from a recognized board / University in India with Minimum aggregate of 60 % Marks in Physics, Chemistry and Biology/ Botany + Zoology / Biotechnology , provided the candidate has passed in a Biotechnology , provided the candidate has passed in each subject separately.\nCandidate who have studied abroad and have passed the equivalent qualification as determined by the association of Indian Universites as per the guidelines to dertermine the eligibility and must have passed in the subjects Physics, Chemistry and Biology / Botany + Zoology / Biotechnology and English up to 12th standard level.\nThe qualifying Examinations passed by FN/PIO/CIWGC Students should be considered equivalent to Eligibility Examinations by the Association of Indian Universities / Academic Council.", verified: true },
      { degree: "B.Sc", name: "Dialysis Therapy Technology", level: "UG", department: D_MAHS, duration: "4 Years (3 Years + 1 Year Internship)", eligibility: EL_12, verified: true },
      { degree: "B.Sc", name: "Critical Care Technology", level: "UG", department: D_MAHS, duration: "4 Years (3 Years + 1 Year Internship)", eligibility: "Age : Minimum age limit is 17 years and maximum age limit is 30 years on or before 31st December of the year of Admission\nQualification : HSC / 10+2 / Plus two or equivalent with English, Physics, Chemistry, Biology / Botany & Zoology / Biotechnology from a recognized Board/University in India\nPercentage of Marks : Minimum 50 % aggregate of marks in PCB\nCandidates who studied abroad should possess equivalent qualification as determined by Association of Indian Universities. The qualifying examination passed by FN/PIO/CIWGC students should be considered equivalent to eligibility examination by the Association", verified: true },
      { degree: "B.Sc", name: "Optometry", level: "UG", department: D_MAHS, duration: "5 Years (4 Years + 1 Year Internship)", eligibility: "Age: Completion of 17 years on or before 31st December of year of Admission\nQualification: HSC / 10+2 / Plus two or equivalent with English, Physics, Chemistry and Mathematics / Biology / Botany & Zoology\nPercentage of Marks: Minimum 50 % aggregate of marks in PCB / PCM\nCandidate must possess both Physical and Mental fitness to undergo the academic course and does not suffer from any intellectual disability or contagious disease", verified: true },
      { degree: "B.Sc", name: "Emergency Medical Technologist (Paramedics)", level: "UG", department: D_MAHS, duration: "4 Years (3 Years + 1 Year Internship)", eligibility: "Age : Minimum age limit is 17 years and maximum age limit is 30 years on or before 31st December of year of Admission.\nQualification : HSC / 10+2 / Plus two or equivalent with English, Physics, Chemistry, Biology / Botany & Zoology / Biotechnology has passed in each subject Separately.\nPercentage of Marks : Minimum 50 % aggregate of marks in PCB.\nCandidates who studied abroad should possess equivalent qualification as determined by Association of Indian Universities. The qualifying examination passed by FN/PIO/CIWGC students should be considered equivalent to eligibility examination by the Association of Indian Universities/ Academic Council.", verified: true },
      { degree: "B.Sc", name: "Nutrition and Dietetics (Honours)", level: "UG", department: D_MAHS, duration: "4 Years (includes 6 Months Internship)", eligibility: "Age : Minimum age limit is 17 years and the maximum age limit is 30 years on or before 31st December of the year of Admission\nQualification : HSC / 10+2 / Plus two or equivalent with English, Physics, Chemistry and Biology / Botany & Zoology / Biotechnology / Nutrition / Home Science from a recognized Board/University in India\nPercentage of Marks : Minimum 50 % aggregate of marks in Physics, Chemistry and Biology/Botany & Zoology/ Biotechnology/Nutrition/Home Science\nCandidates who studied abroad should possess equivalent qualifications as determined by the Association of Indian Universities. The qualifying examination passed by FN/PIO/CIWGC students should be considered equivalent to eligibility examination by the Association of Indian University as per the guidelines/ Academic Council.", verified: true },
      { degree: "B.Sc", name: "Respiratory Technology", level: "UG", department: D_MAHS, duration: "4 Years (3 Years + 1 Year Internship)", eligibility: "Age : Minimum age limit is 17 years and maximum age limit is 30 years on or before 31st December of year of Admission\nQualification : HSC / 10+2 / Plus two or equivalent with English, Physics, Chemistry, Biology / Botany & Zoology / Biotechnology\nPercentage of Marks : Minimum 50 % aggregate of marks in PCB\nCandidates who studied abroad should possess equivalent qualification as determined by Association of Indian Universities. The qualifying examination passed by FN/PIO/CIWGC students should be considered equivalent to eligibility examination by the Association of Indian Universities/Academic Council.", verified: true },
      { degree: "Bachelor", name: "Bachelor of Occupational Therapy", level: "UG", department: D_MAHS, duration: "5 Years (4 Years + 1 Year Internship)", eligibility: "1. Candidate must have passed Senior Secondary (10+2) or equivalent with Physics, Chemistry & Biology (or Botany & Zoology) with 50 % aggregate with English pass. However, in respect of the candidates belonging to Scheduled Castes, Scheduled Tribes, or Other Backward Classes (NCL), the minimum marks obtained in Physics, Chemistry,and Biology are taken together in the qualifying examination shall be 40 % marks instead of 50% marks for Unreserved and General -EWS Candidates. In respect of PwBD/PwD candidates, the minimum marks in the qualifying examination in Physics, Chemistry, and Biology (or Botany & Zoology ) taken together shall be 40 % instead of 50%. English pass required for all categories.\n2.The candidate must have appeared in the National Eligibility Entrance Test (NEET) conducted by National Testing Agency (NTA) for the academic year of the admission. However, there shall be no minimum qualifying marks or cut-off percentile requirement for application for the admission.\n3. Admission on the basis of NEET Merit /Marks (with no cut-off marks or cut-off percentile for application) of the academic year of the admission.", verified: true },
      { degree: "Bachelor", name: "Bachelor of Physiotherapy", level: "UG", department: D_MAHS, duration: "5 Years (4 Years + 1 Year Internship)", eligibility: "1. He/she must have passed the Higher Secondary (10+2) or equivalent examination by recognised any Indian board or a duly constituted Board or National Open School with pass marks with minimum 50% in aggregate of physics, chemistry and biology (botany & zoology),\n2. No candidate will be admitted on any ground unless he/she has appeared in the NEET examination.\n3. Admission to Bachelor of Physiotherapy program shall be made on the basis of NEET examination (with no cut-off marks or cut-off percentile for application) of the academic year of the admission. Eligibility (minimum 50% with physics, chemistry and biology) and merit list based on 10+2 passing marks.\n4. Candidates who have studied abroad and have passed the equivalent qualification as determined by the Association of Indian Universities and Equivalence Committee of the NCAHP, and must fulfil the criteria as per points 1-3 above.\n5. He/she should have attained the age of 17 years as on - current year, as on the date of admission.\n6. He/she has to furnish at the time of submission of application form, a certificate of Physical fitness from an Authorized Medical Attendant to ascertain that the candidate does not have any physical disability as per the guideline mentioned below.\n7. Guidelines regarding admission of students with “Specified Disabilities” under the Rights of Persons with Disabilities Act, 2016 with respect to admission in BPT Course", verified: true },
      { degree: "M.P.T", name: "Pediatrics and Neonatal Science", level: "PG", department: D_MAHS, duration: "2 Years", eligibility: EL_13, verified: true },
      { degree: "M.P.T", name: "Obstetrics and Gynaecology Science", level: "PG", department: D_MAHS, duration: "2 Years", eligibility: "1. The Candidates should have passed the Bachelor of Physiotherapy (BPT) Degree or equivalent (4 years + 6 months of compulsory internship on or before 31st May of that academic year) from a UGC recognized University in India (on campus full time program)\n2. Minimum 55% aggregate of marks or CGPA of 5.5 in qualifying examination\n3. A candidate shall, at the time of admission, submit to the Head of the Institution, a Certificate of Medical Fitness from an authorized Medical Officer certifying that the candidate is fit to undergo the academic program\n4. Candidates who have completed Bachelor of Physiotherapy (BPT) Degrees in other country Universities should obtain eligibility/ Equivalent certificates from this University before admission\n5. The Candidates who have passed a Bachelor of Physiotherapy (BPT) from other than SRM Institute of Science and Technology shall obtain a Migration Certificate from Parent University", verified: true },
      { degree: "M.P.T", name: "Community Rehabilitation", level: "PG", department: D_MAHS, duration: "2 Years", eligibility: EL_13, verified: true },
      { degree: "M.P.T", name: "Musculoskeletal Science", level: "PG", department: D_MAHS, duration: "2 Years", eligibility: EL_13, verified: true },
      { degree: "M.P.T", name: "NeuroScience", level: "PG", department: D_MAHS, duration: "2 Years", eligibility: EL_13, verified: true },
      { degree: "M.P.T", name: "Cardio Pulmonary Science", level: "PG", department: D_MAHS, duration: "2 Years", eligibility: EL_13, verified: true },
      { degree: "M.P.T", name: "Sports Science", level: "PG", department: D_MAHS, duration: "2 Years", eligibility: EL_13, verified: true },
      { degree: "M.O.T", name: "Mental Health", level: "PG", department: D_MAHS, eligibility: EL_14, verified: true },
      { degree: "M.O.T", name: "Neurosciences", level: "PG", department: D_MAHS, eligibility: EL_14, verified: true },
      { degree: "M.O.T", name: "Musculoskeletal Sciences", level: "PG", department: D_MAHS, eligibility: EL_14, verified: true },
      { degree: "M.O.T", name: "Paediatrics & Neonatology", level: "PG", department: D_MAHS, eligibility: EL_14, verified: true },
      { degree: "Master", name: "Master of Optometry", level: "PG", department: D_MAHS, duration: "2 Years", eligibility: "1. Age : Minimum age limit is 21 years on or before 31th December of the year of admission to the course.\n2. Qualification : Bachelor of Optometry or equivalent (3 years + 1 year of internship) from a UGC recognized University.\n3. Percentage of Marks :Minimum 60% aggregate of marks or CGPA of 6.0 in qualifying examination. Candidate must possess both Physical and Mental fitness to undergo the academic course and does not suffer from any intellectual disability or contagious disease.", verified: true },
      { degree: "Master", name: "Masters of Anaesthesia and Operation Theatre Technology", level: "PG", department: D_MAHS, duration: "2 Years", eligibility: "Age : Minimum age limit is 21 years and Maximum age limit is 28 year on or before 31st December of Admission year.\nQualification : B.Sc Operation Theatre and Anesthesia Technology, B.Sc Anesthesia Technology (3 years + 1 year internship)\nPercentage of Marks : Minimum 50 % aggregate of marks or CGPA of 5.0 in qualifying examination\nCandidates who are physically fit and mentally sound to undergo the academic course and does not suffer from any intellectual disability or contagious disease.", verified: true },
      { degree: "M.DT", name: "Master of Dialysis Therapy (M.DT)", level: "PG", department: D_MAHS, duration: "2 Years", eligibility: "Age : Minimum age limit is 21 years and Maximum age limit is 28 years on or before 31st December of Admission year.\nQualification : B.Sc Renal Dialysis Technology / B.Sc Dialysis Technology ( 3 years +1 year internship)\nPercentage of Marks : Minimum 50 % aggregate of marks or CGPA of 5.0 in qualifying examination.\nCandidates who are physically fit and mentally sound to undergo the academic course and does not suffer from any intellectual disability or contagious disease.", verified: true },
      { degree: "M.RIT", name: "Master of Medical Radiography and Imaging Technology (M.RIT)", level: "PG", department: D_MAHS, duration: "2 Years", eligibility: "Candidate shall have completed full time education in B.Sc. in Medical Radiology & Imaging Technology/B.Sc. Medical Technology Radio diagnosis and Imaging/ B.Sc. Radiological Technology/B.Sc. in Radiography/B.Sc. Medical Technology (X-ray)/B.Sc. Medical Imaging Technology/B.Sc. Radiology and Imaging Technology with a minimum 50% marks in B.Sc. from a UGC recognized University. Medium of Education: English\nMinimum 50% aggregate of marks or CGPA of 5.0 in qualifying examination.\nAge: Minimum age limit is 21 years on or before 31st December of year of Admission.\nCandidates have to fulfill the medical standards required for admission as set out by the admission committee.", verified: true },
      { degree: "Master", name: "Master of Nutrition and Dietetics", level: "PG", department: D_MAHS, duration: "2 Years", eligibility: "Age : Minimum age limit is 21 years and Maximum age limit is 28 years on or before 31st December of Admission year.\nQualification : B.Sc Nutrition and dietetics and Food Service Management / Food Science and Nutrition / B.Sc Clinical Nutrition and Dietetics /B.Sc Food Service Management and Dietetics / Home science with majors in Nutrition and dietetics / Human science with majors in Nutrition and dietetics/Clinical Nutrition with Majors in Nutrition and Dietetics.\nPercentage of Marks : Minimum 50 % aggregate of marks or CGPA of 5.0 in qualifying examination Incase of students from foreign universities, they should have qualification recognized as equivalent to an undergraduate degree.\nCandidates who are physically fit and mentally sound to undergo the academic course and does not suffer from any intellectual disability or contagious disease.", verified: true },
      { degree: "M.MLS", name: "Master of Medical Laboratory Sciences(M.MLS)", level: "PG", department: D_MAHS, duration: "2 Years", eligibility: "Candidate shall have passed a B.Sc. Medical Laboratory technology from a UGC recognized University.\nMedium of Education: English.\nMinimum 50% aggregate of marks or CGPA of 5.0 in qualifying examination.\nAge: Minimum age limit is 21 years on or before 31st December of year of Admission.\nIn case of students from foreign Universities, they should have qualifications recognized as equivalent to an Undergraduate degree.\nCandidates have to fulfill the medical standards required for admission as set out by the admission committee.", verified: true },
      { degree: "M.RT", name: "Master of Respiratory Technology (M.RT)", level: "PG", department: D_MAHS, duration: "2 Years", eligibility: "Candidate shall have passed B.Sc. in Respiratory Therapy 3.5 years to 4 years (regular mode) from a UGC recognized University.\nMedium of Education: English.\nMinimum 50% aggregate of marks or CGPA of 5.0 in qualifying examination.\nAge: Minimum age limit is 21 years on or before 31st December of year of Admission.\nIn case of students from foreign Universities, they should have qualifications recognized as equivalent to an Undergraduate degree.\nCandidates have to fulfill the medical standards required for admission as set out by the admission committee.", verified: true },
      { degree: "Master", name: "Master of Advance care Paramedics", level: "PG", department: D_MAHS, duration: "2 Years", eligibility: "Candidate shall have passed a B.Sc. AECT/TCM/ETCT/Critical care Technology/Anaesthesia Technology (regular mode) from a UGC-recognized University.\nMedium of Education: English\nMinimum 50% aggregate of marks in qualifying examination.\nAge: Minimum age limit is 21 years Maximum age limit is 28 years on or before 31st December of year of Admission.\nIn case of students from foreign Universities, they should have qualifications recognized as equivalent to an Undergraduate degree.\nCandidates have to fulfill the medical standards required for admission as set out by the admission committee.", verified: true },
      { degree: "M.Sc", name: "Cardiovascular Sciences (Echocardiography)", level: "PG", department: D_MAHS, duration: "2 Years", eligibility: "Age limit: Completed the age of 21 years on or before 31st December of the year of admission to the program.\nUnder-graduate degree from a recognized University with minimum 50% marks or CGPA of 5.0.\nIn case of students from foreign Universities, they should have qualifications recognised as equivalent to an Under-graduate degree.\nQualifying degree: B.Sc. in Cardiac Care Technology.", verified: true },
      { degree: "M.Sc", name: "Perfusion Technology (Cardiothoracic Surgery)", level: "PG", department: D_MAHS, duration: "2 Years", eligibility: "Age limit: Completed the age of 21 years on or before 31st December of the year of admission to the program.\nUnder-graduate degree from a recognized University with minimum 50% marks or CGPA of 5.0.\nIn case of students from foreign Universities, they should have qualifications recognised as equivalent to an Under-graduate degree.\nQualifying degree: B.Sc. Cardio Perfusion Technology/ B.Sc. Cardiac Care Technology/ B.Sc. Anaesthesia Technology/ B.Sc. Critical Care Technology/B.Sc. Respiratory Care Technology.", verified: true },
      { degree: "M.Sc", name: "Critical Care Technology", level: "PG", department: D_MAHS, duration: "2 Years", eligibility: "1. Age: Minimum age limit is 21 years and Maximum age limit is 28 years on or before 31st December of Admission year.\n2. Qualification: B.Sc Critical Care Technology / Operation Theatre and Anaesthesia Technology / Anaesthesia Technology / Emergency and Trauma Care / Respiratory Care Technology / Cardiac Care Technology / Physician Assistant / Cardio Perfusion Technology / Renal Dialysis Technology / Physician Assistant (3 years + 1 year internship) from recognized Institution.\n3. Percentage of Marks: Minimum 50% aggregate of marks or CGPA of 5.0 in qualifying examination.\n4. Candidates who are physically fit and mentally sound to undergo the academic course and do not suffer from any intellectual disability or contagious disease", verified: true },
      // Working Professional Program
      { degree: "B.Tech", name: "Electrical and Electronics Engineering - Part Time", level: "UG", department: D_WPP, verified: true },
      { degree: "B.Tech", name: "Mechanical Engineering - Part Time", level: "UG", department: D_WPP, verified: true },
      { degree: "B.Tech", name: "Computer Science and Engineering - Part Time", level: "UG", department: D_WPP, verified: true },
      { degree: "M.Tech", name: "Computer Science and Engineering - Part Time", level: "PG", department: D_WPP, verified: true },
      { degree: "M.Tech", name: "Artificial Intelligence and Machine Learning - Part Time", level: "PG", department: D_WPP, verified: true },
      { degree: "M.Tech", name: "Cyber Security - Part Time", level: "PG", department: D_WPP, verified: true },
      { degree: "MBA", name: "Business Administration - Part Time", level: "PG", department: D_WPP, verified: true },
    ],
  },

  placements: {
    image: aiImage("trichy", "core-lab", "Students assembling a drone in a mechatronics lab"),
    heading: "Placements at SRM IST Tiruchirappalli",
    intro: "Students placed in Top Companies in India & Abroad",
    stats: [
      { value: 5700, suffix: "+", label: "Job Offers" },
      { value: 1100, suffix: "+", label: "Companies Visited" },
      { value: 52, suffix: " LPA", label: "Highest Package" },
    ],
    scopeNote:
      "Headline figures as published on the official Tiruchirappalli admissions page. The page does not state the year or whether they are campus-specific or SRMIST-wide, so treat them as institution-level until confirmed. Placement percentage and average package are not published.",
    records: [
      placed("Akila L", "B.Tech - ECE", "20.7 LPA", ["akila-l.png", 352, 368], "Optum", "logo-optum.png"),
      placed("Logeshwari S", "B.Tech - ECE", "14 LPA", ["logeshwari-s.png", 384, 468], "Barclays", "logo-barclays.png"),
      placed("Amarnath C", "B.Tech - CSE (AI&ML)", "18 LPA", ["amarnath-c.png", 231, 231], "Evernorth Health Services", "logo-evernorth.png"),
      placed("Meghavarshini M", "B.Tech - CSE (AI&ML)", "12.35 LPA", ["meghavarshini-m.png", 207, 266], "Commonwealth Bank of Australia", "logo-commonwealth.png"),
      placed("Sridevi S", "B.Tech - CSE (AI&ML)", "12 LPA", ["sridevi-s.jpg", 413, 531], "Airspan", "logo-airspan.png"),
      placed("Bharath Kumar K", "B.Tech - CSE (AI&ML)", "12 LPA", ["bharath-kumar-k.png", 340, 399], "potpie.ai", "logo-potpie.png"),
      placed("Shri Raam AC", "B.Tech - CSE (AI&ML)", "12 LPA", ["shri-raam-ac.jpg", 200, 200], "Tomoro.tech", "logo-tomoro.png"),
      placed("Sripathi Tejavardhan", "B.Tech - CSE (AI&ML)", "12 LPA", ["sripathi-tejavardhan.png", 360, 379], "CME Group", "logo-cme-group.png"),
    ],
    recordsNote:
      "Individual offers exactly as published on the official admissions page (2026 batch, CTC as stated). Company names are read from the logo shown on each profile card.",
    recruiters: {
      names: [
        "Codenation", "Wells Fargo", "Adobe", "Microsoft", "Amazon", "SquadCast", "ReverseLab", "Arm", "TCS", "MaxLinear",
        "Intel", "Western Digital", "HyperVerge", "Richpanel", "Arista", "Google", "Atlassian", "Autodesk", "Commvault", "Kaleyra",
        "Infosys", "Cognizant", "Wipro", "Capgemini", "Morgan Stanley", "Tech Mahindra", "Cloudera", "AB InBev", "Larsen & Toubro", "AiDash",
      ],
      logos: [
        logo("codenation.png", "Codenation", 118, 29),
        logo("wells.png", "Wells Fargo", 50, 54),
        logo("adobe.png", "Adobe", 113, 31),
        logo("microsoft.png", "Microsoft", 110, 55),
        logo("amazon.png", "Amazon", 129, 40),
        logo("squad.png", "SquadCast", 146, 77),
        logo("reverselab.png", "ReverseLab", 87, 61),
        logo("arm.png", "Arm", 126, 84),
        logo("tcs.png", "TCS", 128, 52),
        logo("maxlinear.png", "MaxLinear", 123, 55),
        logo("intel.png", "Intel", 90, 90),
        logo("westerndigit.png", "Western Digital", 119, 37),
        logo("hyperverge.png", "HyperVerge", 80, 80),
        logo("rich.png", "Richpanel", 144, 45),
        logo("arista.png", "Arista", 123, 70),
        logo("google.png", "Google", 99, 34),
        logo("atlassian.png", "Atlassian", 141, 18),
        logo("autodesk.png", "Autodesk", 165, 93),
        logo("commvault.png", "Commvault", 144, 39),
        logo("kaleyra.png", "Kaleyra", 107, 49),
        logo("infosys.png", "Infosys", 103, 40),
        logo("cts.png", "Cognizant", 138, 25),
        logo("wipro.png", "Wipro", 75, 60),
        logo("capgemini.png", "Capgemini", 135, 32),
        logo("morgan.png", "Morgan Stanley", 151, 30),
        logo("techmahindra.png", "Tech Mahindra", 130, 38),
        logo("cloudera.png", "Cloudera", 129, 17),
        logo("abinbev.png", "AB InBev", 145, 51),
        logo("landt.png", "Larsen & Toubro", 165, 45),
        logo("aida.png", "AiDash", 137, 22),
      ],
      note: "Official logos shown under “Top Placements in the Fortune 500 Companies” on the Tiruchirappalli admissions page, in the published order.",
    },
    careerDevelopment: [
      {
        title: "Outstanding Placement Record",
        body: "Graduates have consistently secured placements with top companies across diverse sectors.",
      },
      {
        title: "Impeccable Statistics",
        body: "SRM IST displays the best professional outcomes for students with impeccable placement records each year!",
      },
      { title: "Students Placed In Reputed Organizations", body: "Students placed in Top Companies in India & Abroad" },
    ],
  },

  industry: {
    image: aiImage("trichy", "industry", "Students touring a technology company office with an industry mentor"),
    heading: "Connected to industry and the world",
    intro: "Exposure that goes beyond the campus, as listed on the official admissions page.",
    highlights: [
      {
        title: "Semester Abroad Program in 9+ countries",
        body: "Gain global exposure with Semester abroad programs in 40+ countries.",
        source: "“Why SRM IST Tiruchirappalli” and “Gain global exposure” sections, official admissions page (the two figures differ as published)",
      },
      {
        title: "Computer Science and Business Systems (TCS)",
        body: "B.Tech programme listed under the College of Engineering & Technology, with lateral entry.",
        source: "Programme list, official admissions page",
      },
      {
        title: "Foreign Language Coaching",
        body: "Listed among the reasons to choose SRM IST Tiruchirappalli.",
        source: "“Why SRM IST Tiruchirappalli”, official admissions page",
      },
    ],
    timeline: [
      { phase: "Year 1", title: "Professional clubs & workshops", body: "Workshop calendar pending.", pending: true },
      { phase: "Year 2", title: "Industrial visits", body: "Approved visit list pending.", pending: true },
      { phase: "Year 3", title: "Internships & semester abroad", body: "Partner list pending.", pending: true },
      { phase: "Year 4", title: "Industry projects & placement", body: "MoU list pending.", pending: true },
    ],
  },

  infrastructure: {
    heading: "Campus infrastructure",
    intro: "Residential, academic, dining and sports facilities on the Tiruchirappalli campus.",
    items: [
      {
        title: "Fully Equipped Hostel Facilities",
        description: "Hostel room with study desks and storage.",
        media: img("infrastructure/hostel.png", "Hostel room with two study desks and storage, SRMIST Tiruchirappalli", 1024, 1024),
      },
      {
        title: "State-of-the-Art Infrastructure",
        description: "Spacious dining hall under a high timber roof.",
        media: img("infrastructure/state-of-the-art-infrastructure.png", "Campus dining hall with high timber roof, SRMIST Tiruchirappalli", 252, 252),
      },
      {
        title: "Sports",
        description: "Cricket practice nets on campus.",
        media: img("campus/campus-you-will-love-2.png", "Students at the cricket practice nets, SRMIST Tiruchirappalli", 580, 580),
      },
      {
        title: "Gym",
        description: "Campus gym with multi-station equipment.",
        media: img("campus/campus-you-will-love-3.png", "Campus gym with multi-station weight equipment, SRMIST Tiruchirappalli", 580, 580),
      },
      {
        title: "Research Labs",
        description: "200+ Research Labs across SRMIST.",
        media: stock("campus/why-fortune-500-placements.png", "Students working at computers – image published with “Research Labs” on the admissions page"),
      },
      {
        title: "Computer laboratories",
        description: "Computing labs for hands-on practice.",
        media: aiImage("trichy", "cs-lab", "Students discussing data visualisations in an AI and data science lab"),
      },
      { title: "Library", description: "Central library.", media: aiImage("trichy", "library", "Open-plan digital library with students using laptops") },
    ],
  },

  academics: {
    heading: "Rankings & Accreditations",
    intro: "SRM Institute of Science and Technology accreditations and rankings, as stated on the official admissions page.",
    caution:
      "The admissions page also uses the lines 'Ranked as the #1 University in India' and 'SRM IST Ranked India's No.1 University', which conflict with the NIRF rank. They are left out until the institution confirms the basis.",
    accreditations: [
      {
        title: "Highest 'A++' Grade",
        body: "SRM Institute of Science and Technology has been accredited by NAAC with the highest 'A++' grade.",
        badge: img("accreditation/naac-a-plus-plus.png", "NAAC logo", 115, 111),
        source: "registration.srmtrichy.edu.in",
        verified: true,
      },
      {
        title: "12 B Status by MHRD-UGC",
        body: "SRM IST is placed in Category 1 with 12 B status by MHRD-UGC.",
        badge: img("accreditation/mhrd-ugc-12b.png", "MHRD, Govt of India emblem", 79, 124),
        source: "registration.srmtrichy.edu.in",
        verified: true,
      },
      {
        title: "NIRF 2024 · 11th",
        body: "SRMIST has been ranked 11th nationally under universities category by NIRF (National Institutional Ranking Framework) in 2024.",
        badge: img("accreditation/nirf.png", "NIRF – National Institutional Ranking Framework logo", 97, 124),
        source: "registration.srmtrichy.edu.in",
        verified: true,
      },
      {
        title: "QS (UK) & Times Higher Education (UK)",
        body: "SRMIST is regularly gets ranked by world ranking agencies like QS (UK) and Times Higher Education (UK)",
        badge: img("accreditation/times-higher-education.png", "Times Higher Education World University Rankings logo", 195, 105),
        source: "registration.srmtrichy.edu.in",
        verified: true,
      },
      {
        title: "QS World University Rankings",
        body: "World ranking 1 among 46 Indian universities.",
        badge: img("accreditation/qs-world-ranking.png", "QS World University Rankings logo", 101, 96),
        source: "registration.srmtrichy.edu.in",
        verified: true,
      },
      {
        title: "Shanghai Ranking 2023",
        body: "SHANGAI Ranking – 2023 World ranking 1 among 15 Indian Universities",
        badge: img("accreditation/shanghai-ranking.png", "Shanghai Ranking logo", 220, 70),
        source: "registration.srmtrichy.edu.in",
        verified: true,
      },
      { title: "2nd in ARIIA", body: "2nd in ARIIA, as stated on the admissions page.", source: "registration.srmtrichy.edu.in", verified: true },
      {
        title: "QS I-GAUGE Platinum",
        body: "Honored with the Platinum Rating by QS I-Gauge.",
        source: "Campus carousel banner, official admissions page",
        verified: true,
      },
    ],
    facts: [
      { value: 1985, label: "Established", decimals: 0 },
      { value: 52000, suffix: "+", label: "Students" },
      { value: 17, label: "Institution" },
      { value: 4, label: "Decades" },
      { value: 40, suffix: "+", label: "Years of experience in education" },
      { value: 950, suffix: "+", label: "International Students" },
      { value: 3200, suffix: "+", label: "Faculty" },
      { value: 200, suffix: "+", label: "Research Labs" },
    ],
    factsNote: "SRMIST institution-wide figures, as published on the admissions page.",
    collaborationsHeading: "Gain global exposure with Semester abroad programs in 40+ countries",
    collaborations: [
      { name: "Massachusetts Institute of Technology", logo: img("events/semester-abroad-1.png", "Massachusetts Institute of Technology logo", 810, 308) },
      { name: "National University of Singapore", logo: img("events/semester-abroad-2.png", "NUS – National University of Singapore logo", 493, 215) },
      { name: "Birmingham City University", logo: img("events/semester-abroad-3.png", "Birmingham City University logo", 686, 210) },
      { name: "Illinois Tech", logo: img("events/semester-abroad-5.svg", "Illinois Tech logo", 531, 130) },
      { name: "Tsinghua University", logo: img("events/semester-abroad-4.png", "Tsinghua University seal", 917, 449) },
      { name: "National Taipei University of Technology", logo: img("events/semester-abroad-6.png", "Taipei Tech – National Taipei University of Technology logo", 350, 56) },
      { name: "UC Davis", logo: img("events/semester-abroad-7.svg", "UC Davis logo", 100, 16) },
      { name: "La Trobe University", logo: img("events/semester-abroad-8.svg", "La Trobe University logo", 452, 153) },
      { name: "Harvard Medical School", logo: img("events/semester-abroad-9.svg", "Harvard Medical School logo", 291, 75) },
    ],
  },

  scholarships: {
    heading: "Scholarships",
    intro: "The 2027–28 scholarship policy for the Tiruchirappalli campus has not been published on the admissions page yet. Speak to a counsellor for current options.",
    items: [
      { category: "Merit scholarships", ...PENDING_SCHOLARSHIP },
      { category: "Sports & cultural", ...PENDING_SCHOLARSHIP },
      { category: "Other categories", ...PENDING_SCHOLARSHIP },
    ],
  },

  testimonials: {
    heading: "Student stories",
    intro: "Hear from students and alumni of the Tiruchirappalli campus.",
    items: [],
    pendingSlots: 3,
    note: "The official admissions page publishes no testimonials. Approved testimonials (photo, quote and consent) are pending from the institution.",
  },

  campusLife: {
    heading: "A Campus That You Will Love",
    intro: "Life on the Tiruchirappalli campus and in the city, from the official admissions page.",
    items: [
      {
        title: "On campus",
        media: img("campus/campus-you-will-love-1.png", "Students walking through an academic block corridor, SRMIST Tiruchirappalli", 580, 580),
      },
      {
        title: "Located within Trichy",
        body: "SRM Nagar Trichy – Chennai Highways, near Samayapuram.",
        media: img("campus/why-located-in-trichy.png", "Rockfort temple, Tiruchirappalli", 252, 252),
      },
      {
        title: "Annual Sports Meet",
        body: "Department of Physical Education & Sports.",
        media: img("campus/campus-you-will-love-4.png", "Students and faculty at the annual sports meet, SRMIST Tiruchirappalli", 580, 580),
      },
      {
        title: "Sports courts",
        media: img("campus/campus-you-will-love-5.png", "Outdoor sports court on the SRMIST Tiruchirappalli campus", 580, 580),
      },
      {
        title: "Art and Cultural Events",
        media: stock("campus/why-vibrant-campus-life.png", "Students with a guitar on campus steps – image published with “Art and Cultural Events”"),
      },
      {
        title: "Professional Clubs",
        media: stock("campus/why-semester-abroad.png", "Students in discussion – image published with “Professional Clubs”"),
      },
      {
        title: "Diverse Community",
        media: stock("campus/why-foreign-language-coaching.png", "Two students taking notes – image published with “Diverse Community”"),
      },
    ],
  },

  process: {
    heading: "Made Simple",
    intro: "Keep documents ready – register, upload and pay online.",
    indicative: true,
    steps: [
      { title: "Register", body: "Register on the official application form (Admissions Open 2027)." },
      { title: "Keep documents ready", body: "Photograph Image: 200 X 230 px, 5 MB. Signature Image: 140 X 60 px, 5 MB." },
      { title: "Pay online", body: "Net banking | Credit / Debit Card | UPI | Wallet" },
      {
        title: "Entrance / selection",
        body: "Where the programme requires it – for example SRMJEEM and a Personal Interview for MBA, NEET for BPT and BOT, and an entrance test and interview for M.P.T.",
      },
    ],
    documents: ["Photograph Image: 200 X 230 px, 5 MB", "Signature Image: 140 X 60 px, 5 MB"],
    payment: "Net banking | Credit / Debit Card | UPI | Wallet",
    // The live page carries an "Important Dates" table, but it is hidden (class "d-none") and lists 2025 dates
    // ending with "Reporting Date at Directorate of Research"; it is kept in the inventory, not rendered here.
  },

  faqs: [
    {
      q: "What programmes are offered at SRMIST Tiruchirappalli?",
      a: "Programmes under FLABS (formerly Faculty of Science and Humanities), the College of Management, the College of Engineering & Technology, Diploma Courses, Medicine and Allied Health Sciences and the Working Professional Program – B.Com, B.A, BCA, B.Sc, M.Sc, M.Com, MCA, BBA, MBA, B.Tech, M.Tech, a Diploma in Hotel Management & Catering Science, allied health bachelor's and master's degrees and part-time programmes.",
    },
    {
      q: "What is the eligibility for B.Tech?",
      a: "Applicant should have passed in Higher secondary examination (10, +2 pattern) or appearing in Higher Secondary examination in the current academic year with a minimum of 60% aggregate ( 3 subjects) in Physics (mandatory) , Mathematics (mandatory) and at least one of Chemistry / Biotechnology / Biology / Computer Science / Information Technology / Informatics Practices / Engineering Graphics / Botany and (or) Zoology as major subjects in regular subjects in regular stream from any board within India , CBSE , ISCE , Matriculation , IB or NIOS",
    },
    {
      q: "Is lateral entry available for B.Tech?",
      a: "Yes, for the B.Tech programmes listed under the Lateral Entry Programme. Candidates must have passed a 3 year Diploma in engineering/technology with aggregate of 60% in relevant specialization from a recognized university/college.",
    },
    {
      q: "Which entrance exams are required?",
      a: "MBA: Admission will be done through SRM Joint Entrance Examination for Management (SRMJEEM) followed by a Personal Interview; students with eligible entrance scores in CAT/XAT/MAT/GMAT/NMAT/CMAT/TANCET will be granted direct consideration for the personal interview. BPT and BOT: NEET. M.P.T: entrance test and interview. Each programme's eligibility lists its requirements.",
    },
    {
      q: "Can I add an Honours year to my degree?",
      a: "Students can choose to add a 4th year to their education to obtain a B.A (Honors.) / B.Sc (Honors.) / B.C.A (Honors.) / B.Com (Honors.) degree in accordance with NEP regulations.",
    },
    {
      q: "How can I apply?",
      a: "Click 'Apply Now' to register on the official SRMIST Tiruchirappalli portal, or submit an enquiry here for counsellor support.",
    },
    {
      q: "What documents are required?",
      a: "Keep a Photograph Image (200 X 230 px, 5 MB) and a Signature Image (140 X 60 px, 5 MB) ready. Fees can be paid by Net banking, Credit / Debit Card, UPI or Wallet.",
    },
    {
      q: "Are scholarships available?",
      a: "Scholarship details are not published on the admissions page. A counsellor can share the current policy.",
    },
    {
      q: "Where is the campus and how do I contact the admission office?",
      a: "SRM Nagar Trichy – Chennai Highways, near Samayapuram, Trichy-621105 Tamil Nadu, India. Call toll-free 18002024565 or email helpdesk@ist.srmtrichy.edu.in.",
    },
  ],

  contact: {
    address: "SRM Nagar Trichy – Chennai Highways, near Samayapuram, Trichy-621105 Tamil Nadu, India.",
    addressVerified: true,
    phones: [{ label: "Toll Free", display: "1800 202 4565", tel: "18002024565" }],
    emails: ["helpdesk@ist.srmtrichy.edu.in"],
    whatsapp: null,
    mapQuery: "SRM Institute of Science and Technology Tiruchirappalli Samayapuram",
  },

  finalCta: {
    headline: "Start your career story in Trichy.",
    body: "Admissions Open 2027. Apply online, or talk to a counsellor first.",
    image: img("campus/campus-you-will-love-1.png", "Students on the SRMIST Tiruchirappalli campus", 580, 580),
  },

  footer: {
    tagline: "Learn · Leap · Lead",
    social: [],
    privacyUrl: null,
    termsUrl: null,
  },
};
