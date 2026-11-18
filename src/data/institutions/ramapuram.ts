import type { ImageAsset, Institution } from "@/types/institution";
import { aiImage, PENDING_SCHOLARSHIP } from "./helpers";

/**
 * SRMIST – Ramapuram
 * Source: https://registration.srmrmp.edu.in/ (full content migration 2026-11-18).
 * Programme titles, eligibility, placement profiles, rankings and contact details are copied
 * verbatim from the live admissions page. Official images were downloaded from the page's CDN
 * into public/assets/ramapuram/. Full inventory with source URLs: rmp-inventory.json (migration
 * scratchpad). AI images (aiImage) remain only where no official photo of that subject exists.
 */

const A = "/assets/ramapuram";
const img = (src: string, alt: string, width: number, height: number, objectPosition?: string): ImageAsset => ({
  src,
  alt,
  width,
  height,
  ...(objectPosition ? { objectPosition } : {}),
});

/* Eligibility text exactly as published (label "Eligibility Criteria -" removed). */
const ELIG_1 =
  "A 60% Minimum marks in Physics, Chemistry & Biology (PCM/PCB)";
const ELIG_2 =
  "A 60% Minimum marks in Physics, Chemistry & Maths (PCM/PMO)";
const ELIG_3 =
  "B.E/B.Tech (Any Stream) (except B. Tech in Biotechnology and specialisations, Food Technology and specialisations), Four year Bachelor’s Degree in Mathematics, MCA/ M.Sc (CSE, IT) (or) any equivalent degree in the above Disciplines with a minimum aggregate of 50%.";
const ELIG_4 =
  "B.E/B.Tech (Any Stream) (except B. Tech in Biotechnology and specialisations, Food Technology and specialisations), Four year Bachelor’s Degree in Mathematics, MCA/ M.Sc. (CSE, IT) (or) any equivalent degree in the above Disciplines with a minimum aggregate of 50%.";
const ELIG_5 =
  "Pass in 10+2 scheme of examination or any other equivalent examination conducted by any authority recognized by SRMIST with at least 50% aggregate marks in 10+2 level examination. Candidate can belong to any group of study (Science, Commerce, Fine Arts or any other stream). Candidates with UCEED score will be given preference.";
const ELIG_6 =
  "A pass in 10 + 2 (Higher Secondary) any group with a minimum aggregate of 50%";
const ELIG_7 =
  "A pass in 10 + 2 (Higher Secondary) with a minimum aggregate of 50% (or) A pass in Diploma in Engineering (10+3 or 10+2+2 Pattern) from a recognised government or competent authority with a minimum aggregate of 50%. Mandatory subjects : 10 + 2 (Higher Secondary) with Mathematics / Business Mathematics / Statistics / Business Statistics/ Allied Mathematics / Computer Science/ Computer Application as one of the core subjects.";
const ELIG_8 =
  "A pass in 10 + 2 (Higher Secondary) with a minimum aggregate of 50% (or) A pass in Diploma in Engineering (10+3 or 10+2+2 Pattern) from a recognised government or competent authority with a minimum aggregate of 50%. Mandatory subjects :1. Atleast one of Mathematics / Business Mathematics / Statistics / Allied Mathematics.";
const ELIG_9 =
  "10 + 2 (Higher Secondary) Any group (or) 10+3 Year Diploma. (Minimum Aggregate of 50%)";
const ELIG_10 =
  "1. A Pass in BCA / B.Sc. in Computer Science / B.Sc. in Information Technology / B.Sc in Computer Technology / Bachelor Degree in Computer Science Engineering or equivalent Degree from a University recognized / certified by UGC / SRMIST / AIU (OR) A Pass in B.Sc. / B.Com. / B.A. from University recognized/certified by UGC / SRMIST / AIU with Mathematics/ Business Mathematics/ Statistics/Business Statistics/Applied Mathematics at 10+2 Level or at Graduation Level. 2. A minimum aggregate of 50% in UG.";
const ELIG_11 =
  "A pass in any UG degree with a minimum aggregate of 50%.";
const ELIG_12 =
  "1. A pass in B.Sc Computer Science / BCA / B.Sc IT / B.Sc Mathematics / B.Sc Statistics/ B.Sc Physics/ B.Sc Electronics / B.Sc Triple major subjects with Computer Science as one of the Major subjects / Bachelor Degree in Computer Science Engineering or equivalent Degree from a University recognized / certified by UGC / SRMIST / AIU 2. A minimum aggregate of 50% in UG.";
const ELIG_13 =
  "A Pass in Higher Secondary Examination with Minimum eligibility of aggregate of 50% in +2 (Preference will be given to students without any break in study)";
const ELIG_14 =
  "1. A Bachelor's degree with minimum aggregate of 50%. 2. Admission will be done through SRM Joint Entrance Examination for Management (SRMJEEM) followed by a Personal Interview. Students with eligible entrance scores in CAT/XAT/MAT/GMAT/NMAT/CMAT/TANCET will be granted direct consideration for the personal interview. 3. Preference would be given to candidates with work experience.";
const ELIG_15 =
  "Passed 10th along with 3 years of diploma in relevant engineering or technology branch from a recognised DOTE Affiliated institution.";
const LAT =
  "Lateral Entry Programme: Candidates must have passed a 3 year Diploma in engineering/technology with aggregate of 60% in relevant specialization from a recognized university/college.";
const BIO =
  "NOTE: For B.Tech Programs offered by the Department of Biotechnology, Department of Genetic Engineering and Department of Biomedical Engineering – Minimum 60% aggregate in PCM / PMB/PCB/PCB or Z (Botany or Zoology). Students who have not studied Mathematics as one of the major subjects in +2 must undertake an additional 4 credit courses in Mathematics during the First Year of B.Tech. Students who have completed +2 under NIOS must have completed the 10th standard from regular schooling or vice-versa. Students who have not studied Chemistry should undergo a bridge course in Chemistry in the first year.";
const NEP =
  "Students can choose to add a 4th year to their education to obtain a B.A (Honors.) / B.Sc (Honors.) / B.C.A (Honors.) / B.Com (Honors.) degree in accordance with NEP regulations.";

const BADGES = {
  naac: img(`${A}/accreditation/naac.png`, "NAAC logo", 115, 111),
  mhrd: img(`${A}/accreditation/mhrd-ugc.png`, "MHRD-UGC logo", 79, 124),
  nirf: img(`${A}/accreditation/nirf.png`, "NIRF logo", 97, 124),
  the: img(`${A}/accreditation/times-higher-education.png`, "Times Higher Education logo", 195, 105),
  qs: img(`${A}/accreditation/qs.png`, "QS World University Rankings logo", 101, 96),
  shanghai: img(`${A}/accreditation/shanghai-ranking.png`, "Shanghai Ranking logo", 220, 70),
};

const PHOTOS = {
  studentsAtCampus: img(
    `${A}/campus/why-placement-fortune-500.jpg`,
    "SRM IST Ramapuram students outside the SRM Institute of Science & Technology building",
    700,
    467,
  ),
  chennai: img(`${A}/campus/why-chennai-city.jpg`, "Chennai Central railway station, Chennai", 1000, 434),
  semesterAbroad: img(`${A}/campus/why-semester-abroad.jpg`, "Student smiling at a desk", 1597, 1789, "50% 30%"),
  internships: img(
    `${A}/campus/why-international-internships.jpg`,
    "SRM IST students at the Petronas Towers, Kuala Lumpur, on the India–Malaysia International Immersion and Internship Programme, October 2023",
    780,
    1040,
  ),
  innovation: img(`${A}/campus/why-innovation-startups.jpg`, "Student testing a sensor glove prototype in a lab", 2560, 1709),
  campusLife: img(`${A}/campus/why-vibrant-campus-life.png`, "Students walking the ramp on stage at the Epoch event", 800, 800),
  hostel: img(`${A}/infrastructure/hostel.jpg`, "SRM IST Ramapuram student on campus", 2560, 1709, "60% 40%"),
  building: img(`${A}/infrastructure/state-of-the-art-infrastructure.jpg`, "Multi-storey academic building at SRM IST Ramapuram", 320, 400),
  celebration: img(`${A}/events/campus-event-celebration.jpg`, "Students and faculty in traditional dress around a floral pookalam at a campus celebration", 602, 338),
  stage: img(`${A}/events/campus-event-stage.png`, "Students in matching red T-shirts celebrating on stage at a campus event", 900, 400),
  basketball: img(`${A}/campus/basketball-court.jpg`, "Student going up for a lay-up on the campus basketball court", 900, 400),
};

const logo = (file: string, name: string, width: number, height: number) => img(`${A}/${file}`, `${name} logo`, width, height);
const CO = {
  microsoft: logo("recruiters/microsoft.png", "Microsoft", 110, 55),
  interact: logo("placements/company-interact.jpg", "Interact", 200, 200),
  juspay: logo("placements/company-juspay.png", "Juspay", 137, 83),
  morgan: logo("recruiters/morgan-stanley.png", "Morgan Stanley", 151, 30),
  oracle: logo("placements/company-oracle-fs.png", "Oracle Financial Services", 137, 83),
  packy: logo("placements/company-packy.png", "Packy", 137, 83),
  jpmorgan: logo("placements/company-jpmorgan.png", "JPMorgan Chase", 137, 83),
  booking: logo("placements/company-booking-holdings.png", "Booking Holdings", 137, 83),
};
const placed = (name: string, file: string, company: string, w = 135, h = 135) =>
  img(`${A}/placements/${file}`, `${name}, placed at ${company}`, w, h);

const RECRUITER_LOGOS = [
  { name: "Code Nation", image: img(`${A}/recruiters/code-nation.png`, "Code Nation logo", 118, 29) },
  { name: "Wells Fargo", image: img(`${A}/recruiters/wells-fargo.png`, "Wells Fargo logo", 50, 54) },
  { name: "Adobe", image: img(`${A}/recruiters/adobe.png`, "Adobe logo", 113, 31) },
  { name: "Microsoft", image: img(`${A}/recruiters/microsoft.png`, "Microsoft logo", 110, 55) },
  { name: "Amazon", image: img(`${A}/recruiters/amazon.png`, "Amazon logo", 129, 40) },
  { name: "SquadCast", image: img(`${A}/recruiters/squadcast.png`, "SquadCast logo", 146, 77) },
  { name: "ReverseLab", image: img(`${A}/recruiters/reverselab.png`, "ReverseLab logo", 87, 61) },
  { name: "Arm", image: img(`${A}/recruiters/arm.png`, "Arm logo", 126, 84) },
  { name: "TCS", image: img(`${A}/recruiters/tcs.png`, "TCS logo", 128, 52) },
  { name: "MaxLinear", image: img(`${A}/recruiters/maxlinear.png`, "MaxLinear logo", 123, 55) },
  { name: "Intel", image: img(`${A}/recruiters/intel.png`, "Intel logo", 90, 90) },
  { name: "Western Digital", image: img(`${A}/recruiters/western-digital.png`, "Western Digital logo", 119, 37) },
  { name: "HyperVerge", image: img(`${A}/recruiters/hyperverge.png`, "HyperVerge logo", 80, 80) },
  { name: "Richpanel", image: img(`${A}/recruiters/richpanel.png`, "Richpanel logo", 144, 45) },
  { name: "Arista", image: img(`${A}/recruiters/arista.png`, "Arista logo", 123, 70) },
  { name: "Google", image: img(`${A}/recruiters/google.png`, "Google logo", 99, 34) },
  { name: "Atlassian", image: img(`${A}/recruiters/atlassian.png`, "Atlassian logo", 141, 18) },
  { name: "Autodesk", image: img(`${A}/recruiters/autodesk.png`, "Autodesk logo", 165, 93) },
  { name: "Commvault", image: img(`${A}/recruiters/commvault.png`, "Commvault logo", 144, 39) },
  { name: "Kaleyra", image: img(`${A}/recruiters/kaleyra.png`, "Kaleyra logo", 107, 49) },
  { name: "Infosys", image: img(`${A}/recruiters/infosys.png`, "Infosys logo", 103, 40) },
  { name: "CTS", image: img(`${A}/recruiters/cts.png`, "CTS logo", 138, 25) },
  { name: "Wipro", image: img(`${A}/recruiters/wipro.png`, "Wipro logo", 75, 60) },
  { name: "Capgemini", image: img(`${A}/recruiters/capgemini.png`, "Capgemini logo", 135, 32) },
  { name: "Morgan Stanley", image: img(`${A}/recruiters/morgan-stanley.png`, "Morgan Stanley logo", 151, 30) },
  { name: "Tech Mahindra", image: img(`${A}/recruiters/tech-mahindra.png`, "Tech Mahindra logo", 130, 38) },
  { name: "Cloudera", image: img(`${A}/recruiters/cloudera.png`, "Cloudera logo", 129, 17) },
  { name: "AB InBev", image: img(`${A}/recruiters/ab-inbev.png`, "AB InBev logo", 145, 51) },
  { name: "L&T", image: img(`${A}/recruiters/l-and-t.png`, "L&T logo", 165, 45) },
  { name: "AiDash", image: img(`${A}/recruiters/aidash.png`, "AiDash logo", 137, 22) },
];

export const ramapuram: Institution = {
  key: "rmp",
  route: "/srmist-ramapuram",
  name: "SRM Institute of Science and Technology, Ramapuram",
  shortName: "SRMIST Ramapuram",
  legalLine: "Deemed to be University u/s 3 of UGC Act, 1956",
  city: "Chennai",
  logo: img(`${A}/logo/srmist-ramapuram-logo.png`, "SRM Institute of Science & Technology, Chennai Ramapuram", 2294, 995),
  applyUrl: "https://registration.srmrmp.edu.in/",
  brochureUrl: null,

  theme: {
    brand: "#0b4fa0",
    brandInk: "#0a1b3d",
    brandSoft: "#eaf1fb",
    accent: "#c8102e",
    accentSoft: "#fdecee",
    accentText: "#c8102e",
    accentOnDark: "#ff8d9c",
    onBrand: "#ffffff",
    onAccent: "#ffffff",
    surface: "#ffffff",
    surfaceAlt: "#f4f6fa",
    ink: "#0b1426",
    muted: "#4a5568",
    line: "#dfe4ec",
    radiusCard: "4px",
  },

  layout: {
    hero: "editorial",
    why: "list",
    placements: "ledger",
    programmes: "grid",
    order: [
      "enquiry",
      "why",
      "programmes",
      "placements",
      "industry",
      "infrastructure",
      "academics",
      "scholarships",
      "testimonials",
      "campusLife",
      "process",
      "faqs",
      "contact",
    ],
  },

  seo: {
    title: "SRMIST Ramapuram Admissions 2027 | Engineering, Architecture, Liberal Arts, Management",
    description:
      "Registrations open for 2027 at SRM Institute of Science and Technology, Ramapuram, Chennai. B.Tech, M.Tech, B.Arch, B.Des, B.Com, BCA, B.Sc, BBA, MBA, MCA, M.Sc and more. NAAC 'A++' accredited.",
    keywords: [
      "SRMIST Ramapuram admissions 2027",
      "SRM Ramapuram B.Tech",
      "SRM Chennai engineering admission",
      "SRM Ramapuram B.Arch",
      "SRM Ramapuram MBA",
    ],
  },

  hero: {
    eyebrow: "Registrations Open for 2027 · Chennai",
    headline: ["Shape Your Future,", "Land Your Dream Job"],
    body:
      "Experience the best in placements alongside academic excellence. SRM IST, Ramapuram is a place for learning, discovery, innovation, expression, and discourse.",
    image: aiImage("rmp", "hero", "Engineering students walking together along a tree-lined university walkway at golden hour", "60% center"),
    badges: [BADGES.naac, BADGES.mhrd, BADGES.nirf, BADGES.the, BADGES.qs, BADGES.shanghai],
    proof: [
      { value: 5700, suffix: "+", label: "Job Offers" },
      { value: 1100, suffix: "+", label: "Companies Visited" },
      { value: 55, suffix: " LPA", label: "Highest Package" },
    ],
    proofNote: "Placement figures as published on the official Ramapuram admissions page. Batch year to be confirmed.",
  },

  enquiry: {
    heading: "Admissions Open 2027",
    body: "Share a few details and an admission counsellor will call you back about programmes, eligibility and next steps.",
    faculties: {
      label: "Faculty / College",
      options: [
        "Engineering and Technology",
        "FLABS (formerly Science and Humanities)",
        "Management",
        "Architecture",
        "Working Professional",
      ],
    },
    levels: ["UG", "PG", "Diploma"],
    consent:
      "I authorise SRM Institute Of Science And Technology, Ramapuram & its representatives to contact me with updates and notifications via Email/SMS/What'sApp/Call. This will override DND/NDNC.",
    nextSteps: [
      "A counsellor calls you back on the number you share.",
      "You get guidance on programme choice and eligibility.",
      "When you are ready, you complete the application on the official portal.",
    ],
  },

  why: {
    videoUrl: "https://www.youtube.com/watch?v=YxMB6limtf0",
    videoTitle: "SRMIST Ramapuram – admissions video",
    image: PHOTOS.studentsAtCampus,
    heading: "Why SRM IST Ramapuram",
    intro:
      "We focus on the enlightenment and enhancement of the students. We offer various facilities for the benefits of the students to make the learning environment a better place for them.",
    source: "registration.srmrmp.edu.in",
    items: [
      {
        title: "Placement in the Fortune 500 companies", media: { src: "/assets/ramapuram/campus/why-placement-fortune-500.jpg", alt: "Placement in the Fortune 500 companies", width: 700, height: 467 },
        body: "5700+ Job Offers, 1100+ Companies Visited and a Highest Package of 55 LPA.",
      },
      { title: "Safely located within Chennai city", media: { src: "/assets/ramapuram/campus/why-chennai-city.jpg", alt: "SRMIST Ramapuram campus in Chennai city", width: 1000, height: 434 }, body: "Bharathi Salai, Ramapuram, Chennai – 600 089. Tamil Nadu India." },
      { title: "Semester Abroad Program in 9+ countries", media: { src: "/assets/ramapuram/campus/why-semester-abroad.jpg", alt: "Semester Abroad Program", width: 1597, height: 1789 }, body: "" },
      { title: "International Internships", media: { src: "/assets/ramapuram/campus/why-international-internships.jpg", alt: "International Internships", width: 780, height: 1040 }, body: "" },
      { title: "Support for Innovation & Start-ups", media: { src: "/assets/ramapuram/campus/why-innovation-startups.jpg", alt: "Support for Innovation & Start-ups", width: 2560, height: 1709 }, body: "" },
      { title: "Vibrant Campus Life", media: { src: "/assets/ramapuram/campus/why-vibrant-campus-life.png", alt: "Vibrant campus life at SRMIST Ramapuram", width: 800, height: 800 }, body: "" },
      { title: "Fully Equipped Hostel Facilities", body: "" },
      { title: "State-of-the-Art Infrastructure", body: "" },
    ],
  },

  programmes: {
    heading: "Courses We Offer and Eligibility Criteria",
    intro:
      "Every programme listed below appears on the official Ramapuram admissions page, with eligibility as published. Filter by level and faculty, or search by name.",
    footnote:
      "B.Tech (regular stream): Resident Indian. Non-Resident Indian (NRI), holders of PIO or OCI card issued by Government of India should apply under International student application form only. Should have attained the age of 16 years and 6 months on the 31st July of the calendar year in which the 12th Board examination is to be held. Students with year gap of more than 3 years after 10+2 are not eligible for admission. Eligibility norms are as published on the official admissions page; approved intake is not shown until confirmed by the institution.",
    items: [
      { name: "Biomedical Engineering", degree: "B.Tech", level: "UG", department: "Engineering", duration: "4 years", eligibility: ELIG_1, notes: [LAT, BIO].join(" "), lateralEntry: true, verified: true },
      { name: "Biomedical Engineering with Specialization in Machine Intelligence", degree: "B.Tech", level: "UG", department: "Engineering", duration: "4 years", eligibility: ELIG_1, notes: BIO, verified: true },
      { name: "Biotechnology", degree: "B.Tech", level: "UG", department: "Engineering", duration: "4 years", eligibility: ELIG_1, notes: [LAT, BIO].join(" "), lateralEntry: true, verified: true },
      { name: "Civil Engineering", degree: "B.Tech", level: "UG", department: "Engineering", duration: "4 years", eligibility: ELIG_2, notes: LAT, lateralEntry: true, verified: true },
      { name: "Computer Science and Engineering", degree: "B.Tech", level: "UG", department: "Engineering", duration: "4 years", eligibility: ELIG_2, notes: LAT, lateralEntry: true, verified: true },
      { name: "Artificial Intelligence", degree: "B.Tech", level: "UG", department: "Engineering", duration: "4 years", eligibility: ELIG_2, notes: LAT, lateralEntry: true, verified: true },
      { name: "Computer Science and Engineering (Data Science)", degree: "B.Tech", level: "UG", department: "Engineering", duration: "4 years", eligibility: ELIG_2, verified: true },
      { name: "Computer Science and Business systems (TCS)", degree: "B.Tech", level: "UG", department: "Engineering", duration: "4 years", eligibility: ELIG_2, notes: LAT, lateralEntry: true, verified: true },
      { name: "Computer Science and Engineering with Specialization in Artificial Intelligence and Machine Learning", degree: "B.Tech", level: "UG", department: "Engineering", duration: "4 years", eligibility: ELIG_2, notes: LAT, lateralEntry: true, verified: true },
      { name: "Computer Science and Engineering with Specialization in Cloud Computing", degree: "B.Tech", level: "UG", department: "Engineering", duration: "4 years", eligibility: ELIG_2, notes: LAT, lateralEntry: true, verified: true },
      { name: "Computer Science and Engineering with Specialization in Gaming Technology", degree: "B.Tech", level: "UG", department: "Engineering", duration: "4 years", eligibility: ELIG_2, notes: LAT, lateralEntry: true, verified: true },
      { name: "Computer Science and Engineering with Specialization in Big data Analytics", degree: "B.Tech", level: "UG", department: "Engineering", duration: "4 years", eligibility: ELIG_2, notes: LAT, lateralEntry: true, verified: true },
      { name: "Computer Science and Engineering with Specialization in Internet Of Things", degree: "B.Tech", level: "UG", department: "Engineering", duration: "4 years", eligibility: ELIG_2, notes: LAT, lateralEntry: true, verified: true },
      { name: "Computer Science and Engineering with Specialization in Cyber Security", degree: "B.Tech", level: "UG", department: "Engineering", duration: "4 years", eligibility: ELIG_2, notes: LAT, lateralEntry: true, verified: true },
      { name: "Electronics and Communications Engineering with specialization in Data Science", degree: "B.Tech", level: "UG", department: "Engineering", duration: "4 years", eligibility: ELIG_2, notes: LAT, lateralEntry: true, verified: true },
      { name: "Electrical and Electronics Engineering", degree: "B.Tech", level: "UG", department: "Engineering", duration: "4 years", eligibility: ELIG_2, notes: LAT, lateralEntry: true, verified: true },
      { name: "Electronics and Communication Engineering", degree: "B.Tech", level: "UG", department: "Engineering", duration: "4 years", eligibility: ELIG_2, notes: LAT, lateralEntry: true, verified: true },
      { name: "Information Technology", degree: "B.Tech", level: "UG", department: "Engineering", duration: "4 years", eligibility: ELIG_2, notes: LAT, lateralEntry: true, verified: true },
      { name: "Mechanical Engineering", degree: "B.Tech", level: "UG", department: "Engineering", duration: "4 years", eligibility: ELIG_2, notes: LAT, lateralEntry: true, verified: true },
      { name: "Mechanical Engineering with Specialization in Artificial Intelligence and Machine Learning", degree: "B.Tech", level: "UG", department: "Engineering", duration: "4 years", eligibility: ELIG_2, verified: true },
      { name: "Computer Science and Engineering", degree: "M.Tech", level: "PG", department: "Engineering", eligibility: ELIG_3, notes: "Full Time", verified: true },
      { name: "Computer Science and Engineering with Specialization in Artificial Intelligence and Machine Learning", degree: "M.Tech", level: "PG", department: "Engineering", eligibility: ELIG_4, notes: "Full Time", verified: true },
      { name: "Data Science", degree: "M.Tech", level: "PG", department: "Engineering", eligibility: "B.E/B.Tech. (Any Stream) (except B. Tech in Biotechnology and specializations, Food Technology and specialisations), MCA/MSc Maths, Statistics, IT, Computer Science, Physics, Chemistry (or) any equivalent degree in the above disciplines with a minimum aggregate of 50%.", notes: "Full Time", verified: true },
      { name: "Cyber Security", degree: "M.Tech", level: "PG", department: "Engineering", eligibility: "BE/BTech (Any Stream) (or) MCA/MSc – in Maths/Statistics/IT/Computer Science (or) its equivalent with a minimum aggregate of 50%", notes: "Full Time", verified: true },
      { name: "Electric Vehicle Technology", degree: "M.Tech", level: "PG", department: "Engineering", eligibility: "Eligibility for this B.E/B.Tech. in Automobile, Mechanical, EEE, EIE, ECE, Mechatronics, Manufacturing Engineering, M.Sc. (Physics, Electronics) (or) any equivalent degree in the above Disciplines with a minimum aggregate of 50%.", notes: "Full Time", verified: true },
      { name: "Computer Aided Design", degree: "M.Tech", level: "PG", department: "Engineering", eligibility: "Eligibility for this M.Tech Program is a basic degree or equivalent in B.E / B.Tech. in Mechanical Engineering / Production Engineering / Automobile Engineering. / Aerospace / Aeronautical Engineering (or) AMIE (Mech) / AMAeSI(Aero) / IMechE (or) any equivalent degree in the above Disciplines with a minimum aggregate of 50%", notes: "Full Time", verified: true },
      { name: "Construction Engineering and Management", degree: "M.Tech", level: "PG", department: "Engineering", eligibility: "Eligibility for this M.Tech Program is a basic degree or equivalent in B.E / B.Tech. in Civil / Civil Infrastructure Engineering / Architectural Engineering (or) B.Arch. (or) its equivalent degree in the above Disciplines with a minimum aggregate of 50%", notes: "Full Time", verified: true },
      { name: "Structural Engineering", degree: "M.Tech", level: "PG", department: "Engineering", eligibility: "Eligibility for this M.Tech Program is a basic degree or equivalent in B.E / B.Tech. in Civil / Civil Infrastructure Engineering / Architectural Engineering (or) its equivalent degree in the above Disciplines with a minimum aggregate of 50%", notes: "Full Time", verified: true },
      { name: "Architecture", degree: "B.Arch", level: "UG", department: "Architecture", duration: "5 years", eligibility: "Pass in 10+2 scheme of examination with at least 50% aggregate marks in Physics, Chemistry and Mathematics and also at least 50% marks in aggregate of the 10+2 level examination or passed 10+3 Diploma Examination with Mathematics as compulsory subject with at least 50% marks in aggregate. Qualify an Aptitude Test in Architecture conducted by the Council of Architecture or by a competent authority of the Central Government or the respective State Government complying with the admission norms prescribed by the Council of Architecture / competent authority. Eligibility norms will be aligned as per the norms amended by the Council of Architecture from time to time.", verified: true },
      { name: "Interior Design", degree: "B.Des", level: "UG", department: "Architecture", duration: "4 years", eligibility: ELIG_5, verified: true },
      { name: "Industrial Design", degree: "B.Des", level: "UG", department: "Architecture", duration: "4 years", eligibility: ELIG_5, verified: true },
      { name: "Architecture and Construction Project Management", degree: "M.Arch", level: "PG", department: "Architecture", duration: "2 years", eligibility: "50% aggregate in the Bachelor of Architecture degree program or any other equivalent qualification recognized by the Council of Architecture / competent authority. Qualify in Post Graduate Entrance Test in Architecture (PG NATA) conducted by the Council of Architecture or by a competent authority of the Central Government or the respective State Government complying with the admission norms prescribed by the Council of Architecture / Competent Authority. Eligibility norms will be aligned as per the norms amended by the Council of Architecture from time to time.", verified: true },
      { name: "Commerce", degree: "B.Com", level: "UG", department: "Liberal Arts and Business Studies", duration: "3 years", eligibility: ELIG_6, notes: NEP, verified: true },
      { name: "Corporate Secretaryship", degree: "B.Com", level: "UG", department: "Liberal Arts and Business Studies", duration: "3 years", eligibility: ELIG_6, notes: NEP, verified: true },
      { name: "Accounting and Finance", degree: "B.Com", level: "UG", department: "Liberal Arts and Business Studies", duration: "3 years", eligibility: ELIG_6, notes: NEP, verified: true },
      { name: "Information Systems and Management", degree: "B.Com", level: "UG", department: "Liberal Arts and Business Studies", duration: "3 years", eligibility: ELIG_6, notes: NEP, verified: true },
      { name: "Professional Accounting", degree: "B.Com", level: "UG", department: "Liberal Arts and Business Studies", duration: "3 years", eligibility: ELIG_6, notes: NEP, verified: true },
      { name: "Strategic Finance", degree: "B.Com", level: "UG", department: "Liberal Arts and Business Studies", duration: "3 years", eligibility: ELIG_6, notes: NEP, verified: true },
      { name: "International Accounting & Finance", degree: "B.Com", level: "UG", department: "Liberal Arts and Business Studies", duration: "3 years", eligibility: ELIG_6, notes: NEP, verified: true },
      { name: "Logistics", degree: "B.Com", level: "UG", department: "Liberal Arts and Business Studies", duration: "3 years", eligibility: ELIG_6, notes: NEP, verified: true },
      { name: "Computer Applications", degree: "B.Com", level: "UG", department: "Liberal Arts and Business Studies", duration: "3 years", eligibility: ELIG_6, notes: NEP, verified: true },
      { name: "Banking, Financial Services and Insurance", degree: "B.Com", level: "UG", department: "Liberal Arts and Business Studies", duration: "3 years", eligibility: ELIG_6, notes: NEP, verified: true },
      { name: "Business Analytics", degree: "B.Com", level: "UG", department: "Liberal Arts and Business Studies", duration: "3 years", eligibility: ELIG_6, notes: NEP, verified: true },
      { name: "Fintech", degree: "B.Com", level: "UG", department: "Liberal Arts and Business Studies", duration: "3 years", eligibility: ELIG_6, notes: NEP, verified: true },
      { name: "Finance and Taxation (embedded with Coaching for Chartered Accountant (CA))", degree: "B.Com", level: "UG", department: "Liberal Arts and Business Studies", duration: "3 years", eligibility: ELIG_6, notes: NEP, verified: true },
      { name: "English", degree: "B.A", level: "UG", department: "Liberal Arts and Business Studies", duration: "3 years", eligibility: ELIG_6, notes: NEP, verified: true },
      { name: "Journalism and Mass Communications", degree: "B.A", level: "UG", department: "Liberal Arts and Business Studies", duration: "3 years", eligibility: ELIG_6, notes: NEP, verified: true },
      { name: "Computer applications", degree: "BCA", level: "UG", department: "Liberal Arts and Business Studies", duration: "3 years", eligibility: "10 + 2 (Higher Secondary) with Mathematics / Business Mathematics / Statistics / Business Statistics/ Allied Mathematics / Computer Science/ Computer Application/ as one of the core subjects. (OR) Diploma in Engineering (10+3 / 10+2+2 Pattern) recognized by the Government / Competent Authority.", notes: NEP, verified: true },
      { name: "Data Science", degree: "BCA", level: "UG", department: "Liberal Arts and Business Studies", duration: "3 years", eligibility: ELIG_7, notes: NEP, verified: true },
      { name: "Computer Applications with Specialization in Generative AI", degree: "BCA", level: "UG", department: "Liberal Arts and Business Studies", duration: "3 years", eligibility: ELIG_7, notes: NEP, verified: true },
      { name: "Biotechnology", degree: "B.Sc", level: "UG", department: "Liberal Arts and Business Studies", duration: "3 years", eligibility: "A pass in 10 + 2 (Higher Secondary) with a minimum aggregate of 50% Mandatory subjects :1. Biology 2. Atleast one of Physics/ Chemistry/ Computer Science/ Mathematics/ Psychology or any Life Science subjects.", notes: NEP, verified: true },
      { name: "Computer science", degree: "B.Sc", level: "UG", department: "Liberal Arts and Business Studies", duration: "3 years", eligibility: ELIG_8, notes: NEP, verified: true },
      { name: "Computer Science with Specialization in Cyber Security", degree: "B.Sc", level: "UG", department: "Liberal Arts and Business Studies", duration: "3 years", eligibility: ELIG_8, notes: NEP, verified: true },
      { name: "Computer Science With Specialization in Artificial Intelligence and Machine Learning", degree: "B.Sc", level: "UG", department: "Liberal Arts and Business Studies", duration: "3 years", eligibility: ELIG_8, notes: NEP, verified: true },
      { name: "Computer Science with Specialization in Agentic AI", degree: "B.Sc", level: "UG", department: "Liberal Arts and Business Studies", duration: "3 years", eligibility: ELIG_8, notes: NEP, verified: true },
      { name: "Computer with Specialization in Data Science", degree: "B.Sc", level: "UG", department: "Liberal Arts and Business Studies", duration: "3 years", eligibility: ELIG_8, notes: NEP, verified: true },
      { name: "Mathematics with Specialization in Computational Finance", degree: "B.Sc", level: "UG", department: "Liberal Arts and Business Studies", duration: "3 years", eligibility: "A pass in 10 + 2 (Higher Secondary) with a minimum aggregate of 50%. Mandatory subjects :1. Atleast one of Mathematics / Business Mathematics / Statistics / Business Statistics / Allied Mathematics.", notes: NEP, verified: true },
      { name: "Statistics", degree: "B.Sc", level: "UG", department: "Liberal Arts and Business Studies", duration: "3 years", eligibility: "A pass in 10 + 2 (Higher Secondary) with a minimum aggregate of 50% Mandatory subjects : Atleast one of Mathematics / Statistics.", notes: NEP, verified: true },
      { name: "Visual Communication", degree: "B.Sc", level: "UG", department: "Liberal Arts and Business Studies", duration: "3 years", eligibility: ELIG_9, notes: NEP, verified: true },
      { name: "Visual Communication with Specialization in Artificial Intelligence", degree: "B.Sc", level: "UG", department: "Liberal Arts and Business Studies", duration: "3 years", eligibility: ELIG_9, notes: NEP, verified: true },
      { name: "Artificial Intelligence and Animation", degree: "B.Sc", level: "UG", department: "Liberal Arts and Business Studies", duration: "3 years", eligibility: ELIG_9, notes: NEP, verified: true },
      { name: "Hotel and Hospitality Administration", degree: "B.Sc", level: "UG", department: "Liberal Arts and Business Studies", duration: "3 years", eligibility: ELIG_9, notes: NEP, verified: true },
      { name: "Digital Film Technology", degree: "B.Sc", level: "UG", department: "Liberal Arts and Business Studies", duration: "3 years", eligibility: "10 + 2 (Higher Secondary) with Any Group. (Minimum aggregate of 40%)", notes: NEP, verified: true },
      { name: "Fashion designing", degree: "B.Sc", level: "UG", department: "Liberal Arts and Business Studies", duration: "3 years", eligibility: ELIG_6, notes: NEP, verified: true },
      { name: "Psychology", degree: "B.Sc", level: "UG", department: "Liberal Arts and Business Studies", duration: "3 years", eligibility: ELIG_6, notes: NEP, verified: true },
      { name: "English", degree: "M.A", level: "PG", department: "Liberal Arts and Business Studies", duration: "2 years", eligibility: "A pass in B.A (English) with a minimum aggregate of 50% in UG.", verified: true },
      { name: "Commerce", degree: "M.Com", level: "PG", department: "Liberal Arts and Business Studies", duration: "2 years", eligibility: "1. A pass in any UG degree with Commerce and Accountancy / Business studies as major subjects. 2. A minimum aggregate of 50% in UG", verified: true },
      { name: "Accounting and Finance", degree: "M.Com", level: "PG", department: "Liberal Arts and Business Studies", duration: "2 years", eligibility: "1. A pass in any UG degree with Commerce and Accountancy / Business studies as major subjects. 2. A minimum aggregate of 50% in UG.", verified: true },
      { name: "Computer applications", degree: "MCA", level: "PG", department: "Liberal Arts and Business Studies", duration: "2 years", eligibility: ELIG_10, verified: true },
      { name: "Computer Application with Specialization Generative AI", degree: "MCA", level: "PG", department: "Liberal Arts and Business Studies", duration: "2 years", eligibility: ELIG_10, verified: true },
      { name: "Biotechnology", degree: "M.Sc", level: "PG", department: "Liberal Arts and Business Studies", duration: "2 years", eligibility: "1. A pass in one of B.Sc. Biotechnology (or) B.Sc. Biology (or) B.Sc. Microbiology (or) B.Sc. Biochemistry (or) B.Sc Medical Lab Technology (or)B.Sc. Agriculture (or) B.Sc. Physics (or) B.Sc. Botany (or) B.Sc. Zoology (or) B.Sc. Chemistry (or) B.Tech. Biotech (or) MBBS (or) BDS (or) BVSC (or) Genetics (or) any UG course with Biotechnology as one of the subjects. 2. A minimum aggregate of 50% in UG.", verified: true },
      { name: "Fashion Design", degree: "M.Sc", level: "PG", department: "Liberal Arts and Business Studies", duration: "2 years", eligibility: ELIG_11, verified: true },
      { name: "Applied Data science", degree: "M.Sc", level: "PG", department: "Liberal Arts and Business Studies", duration: "2 years", eligibility: "1. A pass in B.Sc Computer Science / BCA / B.Sc IT / B.Sc Mathematics / B.Sc Statistics/ B.Sc Physics/ B.Sc Electronics / B.Voc Data Science and Analytics/ B.Sc Computer System and Design/ B.Sc Triple major subjects with Computer Science as one of the Major subjects / Bachelor Degree in Computer Science Engineering or equivalent Degree from a University recognized / certified by UGC / SRMIST / AIU 2. A minimum aggregate of 50% in UG.", verified: true },
      { name: "Visual communication", degree: "M.Sc", level: "PG", department: "Liberal Arts and Business Studies", duration: "2 years", eligibility: ELIG_11, verified: true },
      { name: "Computer Science", degree: "M.Sc", level: "PG", department: "Liberal Arts and Business Studies", duration: "2 years", eligibility: ELIG_12, verified: true },
      { name: "Computer Science with specialization in Cyber Security", degree: "M.Sc", level: "PG", department: "Liberal Arts and Business Studies", duration: "2 years", eligibility: ELIG_12, verified: true },
      { name: "Computer Science with specialization in Artificial Intelligence and Machine Learning", degree: "M.Sc", level: "PG", department: "Liberal Arts and Business Studies", duration: "2 years", eligibility: ELIG_12, verified: true },
      { name: "Practical English and Life Skills", degree: "Executive PG Diploma", level: "Diploma", department: "Liberal Arts and Business Studies", verified: true },
      { name: "Business Administration", degree: "BBA", level: "UG", department: "Management", duration: "3 years", eligibility: ELIG_13, verified: true },
      { name: "Data Science", degree: "BBA", level: "UG", department: "Management", duration: "3 years", eligibility: ELIG_13, verified: true },
      { name: "Business Administration", degree: "MBA", level: "PG", department: "Management", duration: "2 years", eligibility: ELIG_14, verified: true },
      { name: "Artificial Intelligence and Data Science", degree: "MBA", level: "PG", department: "Management", duration: "2 years", eligibility: ELIG_14, verified: true },
      { name: "Business Analytics", degree: "MBA", level: "PG", department: "Management", duration: "2 years", eligibility: ELIG_14, verified: true },
      { name: "Deep Tech and Leadership", degree: "Executive PG Diploma", level: "Diploma", department: "Management", verified: true },
      { name: "AI Based Healthcare Management", degree: "Executive PG Diploma", level: "Diploma", department: "Management", verified: true },
      { name: "Civil Engineering (Part Time)", degree: "B.Tech", level: "UG", department: "Working Professional Courses", eligibility: ELIG_15, notes: "Working Professional Course (Part Time)", verified: true },
      { name: "Electrical & Electronics Engineering (Part Time)", degree: "B.Tech", level: "UG", department: "Working Professional Courses", eligibility: ELIG_15, notes: "Working Professional Course (Part Time)", verified: true },
      { name: "Mechanical Engineering (Part Time)", degree: "B.Tech", level: "UG", department: "Working Professional Courses", eligibility: ELIG_15, notes: "Working Professional Course (Part Time)", verified: true },
      { name: "Structural Engineering (Part Time)", degree: "M.Tech", level: "PG", department: "Working Professional Courses", eligibility: ELIG_15, notes: "Working Professional Course (Part Time)", verified: true },
      { name: "Computer Science and Engineering (Part Time)", degree: "M.Tech", level: "PG", department: "Working Professional Courses", eligibility: ELIG_3, notes: "Working Professional Course (Part Time)", verified: true },
      { name: "Computer Science and Engineering W/S in Artificial Intelligence and Machine Learning (Part Time)", degree: "M.Tech", level: "PG", department: "Working Professional Courses", eligibility: ELIG_4, notes: "Working Professional Course (Part Time)", verified: true },
      { name: "Artificial Intelligence and Data Science (Part Time)", degree: "M.Tech", level: "PG", department: "Working Professional Courses", eligibility: "B.E./B.Tech. (any stream) (or) MCA/MSc – in Maths/Statistics/IT/Computer Science/Physics/Chemistry (or) its equivalent with a minimum aggregate of 50%.", notes: "Working Professional Course (Part Time)", verified: true },
    ],
  },

  placements: {
    image: aiImage("rmp", "cs-lab", "Students collaborating at computers in a computer science lab"),
    heading: "Placements at SRM IST Ramapuram",
    intro: "Graduates have consistently secured placements with top companies across diverse sectors. Students placed in Top Companies in India & Abroad.",
    stats: [
      { value: 5700, suffix: "+", label: "Job Offers" },
      { value: 1100, suffix: "+", label: "Companies Visited" },
      { value: 55, suffix: " LPA", label: "Highest Package" },
    ],
    scopeNote:
      "Figures as published on the official Ramapuram admissions page. Whether they are campus-specific or SRMIST-wide, and the batch year, are pending confirmation. Placement percentage and average package are not shown because they are not published.",
    records: [
      { name: "Rupali M", programme: "CSE", batch: "2026", package: "55 LPA", company: "Microsoft", companyLogo: CO.microsoft, photo: placed("Rupali M", "rupali-m.png", "Microsoft") },
      { name: "Prajol D", programme: "B.TECH - CSE", batch: "2026", package: "50 LPA", company: "Interact", companyLogo: CO.interact, photo: placed("Prajol D", "prajol-d.jpg", "Interact", 218, 222) },
      { name: "Shreya Pandey", programme: "B.TECH - CSE(CS)", batch: "2026", package: "27 LPA", company: "Juspay", companyLogo: CO.juspay, photo: placed("Shreya Pandey", "shreya-pandey.png", "Juspay") },
      { name: "S Abirami", programme: "B.TECH - CSE", batch: "2026", package: "25 LPA", company: "Morgan Stanley", companyLogo: CO.morgan, photo: placed("S Abirami", "s-abirami.png", "Morgan Stanley") },
      { name: "Vikash P", programme: "B.TECH - CSBS", batch: "2026", package: "26 LPA", company: "Oracle Financial Services", companyLogo: CO.oracle, photo: placed("Vikash P", "vikash-p.png", "Oracle Financial Services") },
      { name: "U Sanjaykumar", programme: "B.TECH - CSE", batch: "2026", package: "26 LPA", company: "Oracle Financial Services", companyLogo: CO.oracle, photo: placed("U Sanjaykumar", "u-sanjaykumar.png", "Oracle Financial Services") },
      { name: "R Mohan", programme: "B.TECH - CSE(AIML)", batch: "2026", package: "22 LPA", company: "Packy", companyLogo: CO.packy, photo: placed("R Mohan", "r-mohan.png", "Packy") },
      { name: "J Pooja", programme: "B.TECH - CSE - AIML", batch: "2026", package: "20 LPA", company: "JPMorgan Chase", companyLogo: CO.jpmorgan, photo: placed("J Pooja", "j-pooja.png", "JPMorgan Chase") },
      { name: "Ivin Poly", programme: "B.TECH - CSE(CC)", batch: "2026", package: "20 LPA", company: "Booking Holdings", companyLogo: CO.booking, photo: placed("Ivin Poly", "ivin-poly.png", "Booking Holdings") },
      { name: "Anushka Bhattacharji", programme: "B.TECH - CSE(AIML)", batch: "2027", package: "20 LPA", company: "JPMorgan Chase", companyLogo: CO.jpmorgan, photo: placed("Anushka Bhattacharji", "anushka-bhattacharji.png", "JPMorgan Chase") },
    ],
    recordsNote:
      "Student profiles, photos and CTCs exactly as published under \"Students Placed In Reputed Organizations\" on the official Ramapuram admissions page. Company names are read from the logo shown on each card.",
    recruiters: {
      names: RECRUITER_LOGOS.map((l) => l.name),
      logos: RECRUITER_LOGOS,
      note: "Top Placements in the Fortune 500 Companies – recruiter logos as published on the official Ramapuram admissions page.",
    },
    careerDevelopment: [
      { title: "Outstanding Placement Record", body: "Graduates have consistently secured placements with top companies across diverse sectors." },
      { title: "Impeccable Statistics", body: "SRM IST displays the best professional outcomes for students with impeccable placement records each year!" },
      { title: "Students Placed In Reputed Organizations", body: "Students placed in Top Companies in India & Abroad" },
    ],
  },

  industry: {
    image: PHOTOS.innovation,
    heading: "Industry, built into the curriculum",
    intro: "Industry-linked programmes, international internships and support for innovation, as listed on the official admissions page.",
    highlights: [
      {
        title: "Computer Science and Business Systems (TCS)",
        body: "A B.Tech programme listed on the admissions page as Computer Science and Business systems (TCS).",
        source: "Programme list, official admissions page",
      },
      {
        title: "Semester Abroad Program in 9+ countries",
        body: "Listed under 'Why SRM IST Ramapuram'. Partner countries to be confirmed.",
        source: "Official admissions page",
      },
      {
        title: "International Internships",
        body: "Pictured on the admissions page: the India–Malaysia International Immersion and Internship Programme (October 2023).",
        source: "Official admissions page",
      },
      {
        title: "Support for Innovation & Start-ups",
        body: "Listed under 'Why SRM IST Ramapuram'.",
        source: "Official admissions page",
      },
    ],
    timeline: [
      { phase: "Year 1", title: "Foundations & technical clubs", body: "Workshops and club activity. Calendar pending.", pending: true },
      { phase: "Year 2", title: "Industrial visits", body: "Approved industrial visit list pending.", pending: true },
      { phase: "Year 3", title: "Internships", body: "Internship partners pending verification.", pending: true },
      { phase: "Year 4", title: "Industry projects & placements", body: "MoU and project partner list pending.", pending: true },
    ],
  },

  infrastructure: {
    heading: "Spaces that make learning practical",
    intro: "Infrastructure, hostels, research labs and sport, as featured on the official admissions page.",
    items: [
      { title: "State-of-the-Art Infrastructure", description: "", media: PHOTOS.building },
      { title: "Fully Equipped Hostel Facilities", description: "", media: PHOTOS.hostel },
      { title: "200+ Research Labs", description: "", media: aiImage("rmp", "core-lab", "Students working with oscilloscopes and test rigs in an engineering lab") },
      { title: "Sports", description: "", media: PHOTOS.basketball },
    ],
  },

  academics: {
    heading: "Rankings & Accreditations",
    intro: "Accreditations and rankings of SRM Institute of Science and Technology, as stated on the official admissions page.",
    caution:
      "The admissions page headline also says '#1 University in India', which conflicts with the NIRF rank shown here. That claim is left out until the institution confirms its basis.",
    accreditations: [
      {
        title: "Highest 'A++' Grade",
        body: "SRM Institute of Science and Technology has been accredited by NAAC with the highest 'A++' grade.",
        badge: BADGES.naac,
        source: "registration.srmrmp.edu.in",
        verified: true,
      },
      {
        title: "12 B Status by MHRD-UGC",
        body: "SRM IST is placed in Category 1 with 12 B status by MHRD-UGC.",
        badge: BADGES.mhrd,
        source: "registration.srmrmp.edu.in",
        verified: true,
      },
      {
        title: "NIRF · 11th",
        body: "SRMIST has been ranked 11th nationally under universities category by NIRF (National Institutional Ranking Framework) in 2025.",
        badge: BADGES.nirf,
        source: "registration.srmrmp.edu.in",
        verified: true,
      },
      {
        title: "QS World Ranking",
        body: "World ranking 1 among 46 Indian universities.",
        badge: BADGES.qs,
        source: "registration.srmrmp.edu.in",
        verified: true,
      },
      {
        title: "Shanghai Ranking 2023",
        body: "SHANGAI Ranking – 2023 World ranking 1 among 15 Indian Universities",
        badge: BADGES.shanghai,
        source: "registration.srmrmp.edu.in",
        verified: true,
      },
      {
        title: "Times Higher Education",
        body: "SRMIST is regularly gets ranked by world ranking agencies like QS (UK) and Times Higher Education (UK)",
        badge: BADGES.the,
        source: "registration.srmrmp.edu.in",
        verified: true,
      },
    ],
    facts: [
      { value: 950, suffix: "+", label: "International Students" },
      { value: 3200, suffix: "+", label: "Faculty" },
      { value: 200, suffix: "+", label: "Research Labs" },
      { value: 52000, suffix: "+", label: "Students" },
      { value: 17, label: "Institution" },
      { value: 40, suffix: "+", label: "Years of experience in education" },
    ],
    factsNote:
      "As published on the official admissions page, which also lists: Established 1985 · 4 Decades · A++ NAAC Accreditation · 2nd in ARIIA. These appear to be SRMIST-wide figures; campus-specific scope to be confirmed.",
    image: aiImage("rmp", "research", "Researcher and faculty mentor examining samples in a research lab"),
    collaborationsHeading: "Global Academic Collaborations",
    collaborations: [
      { name: "Massachusetts Institute of Technology", logo: img(`${A}/accreditation/collab-mit.png`, "Massachusetts Institute of Technology logo", 810, 308) },
      { name: "National University of Singapore", logo: img(`${A}/accreditation/collab-nus.png`, "National University of Singapore logo", 810, 308) },
      { name: "Birmingham City University", logo: img(`${A}/accreditation/collab-birmingham-city-university.png`, "Birmingham City University logo", 810, 308) },
      { name: "Tsing Hua University", logo: img(`${A}/accreditation/collab-tsing-hua-university.png`, "Tsing Hua University logo", 1181, 449) },
      { name: "Illinois Tech", logo: img(`${A}/accreditation/collab-illinois-tech.svg`, "Illinois Tech logo", 531, 130) },
      { name: "Taipei Tech – National Taipei University of Technology", logo: img(`${A}/accreditation/collab-taipei-tech.png`, "Taipei Tech – National Taipei University of Technology logo", 350, 56) },
      { name: "UC Davis", logo: img(`${A}/accreditation/collab-uc-davis.svg`, "UC Davis logo", 100, 16) },
      { name: "La Trobe University", logo: img(`${A}/accreditation/collab-la-trobe-university.svg`, "La Trobe University logo", 452, 153) },
      { name: "Harvard Medical School", logo: img(`${A}/accreditation/collab-harvard-medical-school.svg`, "Harvard Medical School logo", 291, 75) },
    ],
  },

  scholarships: {
    heading: "Scholarships",
    intro: "Merit and need-based support helps more students take up their place. The 2027 scholarship policy has not been published on the admissions page yet.",
    items: [
      { category: "Merit scholarships", ...PENDING_SCHOLARSHIP },
      { category: "Sports & co-curricular", ...PENDING_SCHOLARSHIP },
      { category: "Other categories", ...PENDING_SCHOLARSHIP },
    ],
  },

  testimonials: {
    heading: "Student Testimonials",
    intro: "Video stories from Ramapuram students and alumni, as published on the official admissions page.",
    items: [
      {
        name: "Mehul Choudhary",
        programme: "SRM IST Ramapuram Alumni",
        role: "Fractal Analytics - 14.25 LPA",
        videoUrl: "https://www.youtube.com/watch?v=LUkqSZpU3a0",
      },
      {
        name: "Amishra Arun",
        programme: "III Year ECE",
        achievement: "SRM IST Ramapuram Student",
        videoUrl: "https://www.youtube.com/watch?v=V65gxjqGMPM",
      },
      {
        name: "Pavani Sai",
        programme: "SRM IST Ramapuram Alumni",
        role: "Adobe - 41 LPA",
        videoUrl: "https://www.youtube.com/watch?v=hSEw_VAbxRA",
      },
    ],
    note: "Video testimonials as published on the official admissions page. No written quotes or portrait photos are published.",
  },

  campusLife: {
    heading: "A Campus That You Will Love",
    intro: "Festivals, events, sport and international exposure. University life beyond the classroom.",
    items: [
      { title: "Vibrant Campus Life", media: PHOTOS.campusLife },
      { title: "Campus celebrations", media: PHOTOS.celebration },
      { title: "Student events", media: PHOTOS.stage },
      { title: "International Internships", media: PHOTOS.internships },
      { title: "Semester Abroad Program in 9+ countries", media: PHOTOS.semesterAbroad },
      { title: "Support for Innovation & Start-ups", media: PHOTOS.innovation },
      { title: "Safely located within Chennai city", media: PHOTOS.chennai },
    ],
  },

  process: {
    heading: "Steps to follow",
    intro: "Made Simple. Keep documents ready.",
    indicative: false,
    steps: [
      { title: "Register Yourself", body: "" },
      { title: "Verify Mobile", body: "" },
      { title: "Fill Enquiry Form", body: "" },
      { title: "Upload required documents", body: "Photograph Image: 200 X 230 px, 5 MB. Signature Image: 140 X 60 px, 5 MB." },
      { title: "Submit Enquiry form", body: "" },
    ],
    documents: ["Photograph Image: 200 X 230 px, 5 MB", "Signature Image: 140 X 60 px, 5 MB"],
    payment: "Net banking | Credit / Debit Card | UPI | Wallet",
  },

  faqs: [
    {
      q: "What programmes are available at SRMIST Ramapuram?",
      a: "Engineering (B.Tech, M.Tech), Architecture (B.Arch, B.Des, M.Arch), Liberal Arts and Business Studies (B.Com, B.A, BCA, B.Sc, M.A, M.Com, MCA, M.Sc and an Executive PG Diploma), Management (BBA, MBA and Executive PG Diplomas), Working Professional Courses (part-time B.Tech and M.Tech) and B.Tech lateral entry. Use the programme explorer on this page to see them all.",
    },
    {
      q: "What is the eligibility for B.Tech?",
      a: "Applicant should have passed in Higher secondary examination (10, +2 pattern) or appearing in Higher Secondary examination in the current academic year with a minimum of 60% aggregate (3 subjects) in Physics (mandatory), Mathematics (mandatory) and at least one of Chemistry / Biotechnology / Biology / Computer Science / Information Technology / Informatics Practices / Engineering Graphics / Botany and (or) Zoology as major subjects in regular subjects in regular stream from any board within India, CBSE, ISCE, Matriculation, IB or NIOS. Should have attained the age of 16 years and 6 months on the 31st July of the calendar year in which the 12th Board examination is to be held. Students with year gap of more than 3 years after 10+2 are not eligible for admission.",
    },
    {
      q: "Can GCE A-level or IB students apply for B.Tech?",
      a: "Yes. GCE A-level: Physics and Mathematics as compulsory subjects along with one of the Chemistry/ Biotechnology/ Biology/ Computer Science/ Information Technology/ Informatics Practices/ Engineering Graphics as major subjects (equivalent to Advanced Placement level in each subject) in any International schools within India. International Baccalaureate: IB diploma or IB certificate 2 subjects in HL (equivalent to Advanced Placement level or Honors) and 1 subject in SL is mandatory – Maths at HL for all B.Tech programs (Biology at HL for Biotech, Biotech (Genetic/Regenerative) and Biomedical).",
    },
    {
      q: "Is lateral entry available for B.Tech?",
      a: "Yes, for the B.Tech programmes marked 'Lateral entry' in the explorer. Candidates must have passed a 3 year Diploma in engineering/technology with aggregate of 60% in relevant specialization from a recognized university/college.",
    },
    {
      q: "How do I apply?",
      a: "Register Yourself, Verify Mobile, Fill Enquiry Form, Upload required documents and Submit Enquiry form on the official SRMIST Ramapuram application portal ('Apply Now'). You can also submit an enquiry here and a counsellor will guide you.",
    },
    {
      q: "What documents do I need?",
      a: "For the online application, keep a Photograph Image (200 X 230 px, 5 MB) and Signature Image (140 X 60 px, 5 MB) ready. Payment can be made by Net banking, Credit / Debit Card, UPI or Wallet.",
    },
    {
      q: "Are scholarships available?",
      a: "Scholarship details for 2027 are not published on the admissions page. Please ask an admission counsellor for the current policy.",
    },
    {
      q: "How can I contact the admission office?",
      a: "Call 1800 102 1525 or email helpdesk@srmrmp.edu.in.",
    },
  ],

  contact: {
    address: "Bharathi Salai, Ramapuram, Chennai – 600 089. Tamil Nadu India",
    addressVerified: true,
    phones: [{ label: "Toll-free", display: "1800 102 1525", tel: "18001021525" }],
    emails: ["helpdesk@srmrmp.edu.in"],
    whatsapp: null,
    mapQuery: "SRM Institute of Science and Technology Ramapuram Chennai",
  },

  finalCta: {
    headline: "Your future starts at Ramapuram.",
    body: "Registrations are open for 2027. Apply today, or speak to a counsellor first.",
    image: PHOTOS.stage,
  },

  footer: {
    tagline: "Learn · Leap · Lead",
    social: [],
    privacyUrl: null,
    termsUrl: null,
  },
};
