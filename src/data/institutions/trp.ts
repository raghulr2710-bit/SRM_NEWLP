import type { Institution } from "@/types/institution";
import { aiImage, group, PENDING_SCHOLARSHIP } from "./helpers";

/**
 * SRM TRP Engineering College, Tiruchirappalli
 * Source: https://apply.trp.srmtrichy.edu.in/ (content migrated 2026-11-18).
 * Official photographs and logos are mirrored from the live page into
 * public/assets/trp/. "Autonomous" is taken from the official logo artwork.
 * AICTE approval and Anna University affiliation are stated in "About TRP".
 * Inventory: scratchpad/scrape/trp-inventory.json.
 */

const A = "/assets/trp";

/** Verbatim from "Courses Offered" → UNDERGRADUATE tab. */
const UG_ELIG =
  "As per AICTE & Govt. of Tamil Nadu, Anna University, A Pass in Higher Secondary Examinations of (10+2) Curriculum with Mathematics, Physics and Chemistry is required.";
/** Verbatim from "Courses Offered" → POSTGRADUATE tab. */
const PG_ELIG = "As per AICTE and Anna University norms";

const CAMPUS = {
  infrastructure: { src: `${A}/campus/state-of-the-art-infrastructure.jpg`, width: 1032, height: 774 },
  library: { src: `${A}/infrastructure/hitech-library.jpeg`, width: 1820, height: 1365 },
  cultural: { src: `${A}/events/vibrant-campus-life-cultural-night.jpg`, width: 1024, height: 683 },
  green: { src: `${A}/campus/green-eco-friendly-campus.jpg`, width: 750, height: 330 },
  lab: { src: `${A}/infrastructure/research-lab-robotics.jpg`, width: 400, height: 300 },
} as const;

const BADGES = {
  aicte: { src: `${A}/accreditation/aicte.png`, alt: "AICTE", width: 84, height: 84 },
  anna: { src: `${A}/accreditation/anna-university.png`, alt: "Anna University", width: 84, height: 84 },
  nba: { src: `${A}/accreditation/nba.png`, alt: "National Board of Accreditation (NBA)", width: 84, height: 84 },
} as const;

const logo = (file: string, name: string, width: number, height: number) => ({
  name,
  image: { src: `${A}/recruiters/${file}`, alt: `${name} logo`, width, height },
});

export const trp: Institution = {
  key: "trp",
  route: "/srm-trp-engineering-college",
  name: "SRM TRP Engineering College",
  shortName: "SRM TRP",
  legalLine: "Autonomous · Approved by AICTE · Affiliated to Anna University",
  city: "Tiruchirappalli",
  logo: {
    src: `${A}/logo/srm-trp-logo.jpg`,
    alt: "SRM TRP Engineering College, Tiruchirappalli",
    width: 500,
    height: 203,
  },
  applyUrl: "https://apply.trp.srmtrichy.edu.in/",
  brochureUrl: null,

  theme: {
    brand: "#1e2c5c",
    brandInk: "#0e1533",
    brandSoft: "#ebeef7",
    accent: "#18763f",
    accentSoft: "#e5f4ec",
    accentText: "#17703d",
    accentOnDark: "#6fd39a",
    onBrand: "#ffffff",
    onAccent: "#ffffff",
    surface: "#ffffff",
    surfaceAlt: "#f2f4f1",
    ink: "#0e1533",
    muted: "#4a5166",
    line: "#dfe3e8",
    radiusCard: "0px",
  },

  layout: {
    hero: "poster",
    why: "bento",
    placements: "board",
    programmes: "grid",
    order: [
      "enquiry",
      "placements",
      "programmes",
      "why",
      "industry",
      "infrastructure",
      "testimonials",
      "campusLife",
      "academics",
      "scholarships",
      "process",
      "faqs",
      "contact",
    ],
  },

  seo: {
    title: "SRM TRP Engineering College Admissions 2027–28 | B.E., B.Tech, M.E., MBA",
    description:
      "Apply to SRM TRP Engineering College, Tiruchirappalli for 2027–28. Autonomous, AICTE approved and affiliated to Anna University. 99% placements, 580+ offers.",
    keywords: [
      "SRM TRP Engineering College admissions 2027",
      "SRM TRP Trichy",
      "engineering colleges in Trichy",
      "SRM TRP B.E. admission",
    ],
  },

  hero: {
    eyebrow: "Admissions Open 2027–28 · Tiruchirappalli",
    headline: ["Skills that", "get you hired."],
    body:
      "SRM TRP is a place for learning, discovery, innovation and expression. Join the premier institute that will upskill your talent.",
    // The live hero visual is a transparent student cut-out (public/assets/trp/hero/hero-student.webp),
    // not a landscape campus photograph, so the illustrative landscape is kept here.
    image: aiImage("trp", "hero", "Energetic group of engineering students high-fiving outside a colourful college building", "70% center"),
    secondaryImage: { ...CAMPUS.infrastructure, alt: "SRM TRP Engineering College main academic building and lawn" },
    badges: [BADGES.aicte, BADGES.anna, BADGES.nba],
    proof: [
      { value: 99, suffix: "%", label: "Placements" },
      { value: 580, suffix: "+", label: "Placement offers" },
      { value: 35, suffix: " LPA", label: "Maximum package" },
    ],
    proofNote: "As published on the official admissions page. Batch / year to be confirmed.",
  },

  enquiry: {
    heading: "Ask SRM TRP admissions",
    body: "Tell us your interests. Our team will call you with programme advice, eligibility and lateral entry details.",
    levels: ["UG", "PG"],
    consent:
      "I authorise SRM TRP Engineering College & its representatives to contact me with updates and notifications via Email/SMS/What'sApp/Call. This will override DND/NDNC.",
    nextSteps: [
      "An SRM TRP counsellor calls you back.",
      "You get advice on programme, eligibility and lateral entry.",
      "You register on the official application portal.",
    ],
  },

  why: {
    videoUrl: "https://www.youtube.com/watch?v=7lbKue2Z_PQ",
    videoTitle: "SRM TRP Engineering College – Admission Open",
    image: { ...CAMPUS.infrastructure, alt: "SRM TRP Engineering College academic building with lawn in front" },
    heading: "Why TRP?",
    intro: "A student-focused engineering college that continues the legacy of the SRM Group of Institutions.",
    source: "“Why TRP?” slider, apply.trp.srmtrichy.edu.in",
    // Titles verbatim from the live "Why TRP?" slider (no body copy is published there);
    // bodies describe the official photograph shown with each title.
    items: [
      { title: "State-of-the-Art Infrastructure", media: { src: "/assets/trp/campus/state-of-the-art-infrastructure.jpg", alt: "SRM TRP academic blocks around open lawns", width: 1032, height: 774 }, body: "Multi-storey academic blocks set around open lawns on the Irungalur campus." },
      { title: "HiTech Library", media: { src: "/assets/trp/infrastructure/hitech-library.jpeg", alt: "Students reading together in the SRM TRP library", width: 1820, height: 1365 }, body: "Students reading together among the library's departmental collections." },
      { title: "Fully Equipped Research labs", media: { src: "/assets/trp/infrastructure/research-lab-robotics.jpg", alt: "Student working with a robotic arm in the research lab", width: 400, height: 300 }, body: "Hands-on lab work, including robotic arms and automation hardware." },
      { title: "Vibrant Campus Life", media: { src: "/assets/trp/events/vibrant-campus-life-cultural-night.jpg", alt: "Students performing on stage at a cultural night", width: 1024, height: 683 }, body: "Student dance troupes on stage at SRM cultural nights." },
      { title: "Green & Eco Friendly Campus", media: { src: "/assets/trp/campus/green-eco-friendly-campus.jpg", alt: "Palm-lined avenue at the SRM TRP campus entrance", width: 750, height: 330 }, body: "Palm-lined avenues and green open spaces at the campus entrance." },
    ],
  },

  programmes: {
    heading: "Pick your branch",
    intro: "Eight undergraduate and six postgraduate programmes, as listed under “Courses Offered” on the official admissions page.",
    footnote:
      "Programme duration and approved intake are not published on the admissions page. They will be shown once the college confirms them. Lateral entry is available for UG programmes.",
    items: [
      ...group(
        { degree: "B.E", level: "UG", department: "Core Engineering", eligibility: UG_ELIG },
        [["Civil Engineering", { lateralEntry: true }]],
      ),
      ...group(
        { degree: "B.E", level: "UG", department: "Computing", eligibility: UG_ELIG },
        [
          ["Computer Science and Engineering", { lateralEntry: true }],
          ["Computer Science and Engineering (Artificial Intelligence and Machine Learning)", { lateralEntry: true }],
        ],
      ),
      ...group(
        { degree: "B.E", level: "UG", department: "Electrical & Electronics", eligibility: UG_ELIG },
        [
          ["Electrical and Electronics Engineering", { lateralEntry: true }],
          ["Electronics and Communication Engineering", { lateralEntry: true }],
        ],
      ),
      ...group(
        { degree: "B.E", level: "UG", department: "Core Engineering", eligibility: UG_ELIG },
        [["Mechanical Engineering", { lateralEntry: true }]],
      ),
      ...group(
        { degree: "B.Tech", level: "UG", department: "Computing", eligibility: UG_ELIG },
        [
          ["Artificial Intelligence and Data Science", { lateralEntry: true }],
          ["Information Technology", { lateralEntry: true }],
        ],
      ),
      ...group(
        { degree: "MBA", level: "PG", department: "Management", eligibility: PG_ELIG },
        ["Master of Business Administration"],
      ),
      ...group(
        { degree: "M.E", level: "PG", department: "Engineering (PG)", eligibility: PG_ELIG },
        ["Thermal Engineering", "VLSI Design"],
      ),
      ...group(
        {
          degree: "M.S (Research) / Ph.D",
          level: "PG",
          department: "Research",
          eligibility: PG_ELIG,
          notes: "Listed under the POSTGRADUATE tab on the official admissions page.",
        },
        ["Electronics and Communication Engineering", "Mechanical Engineering", "Physics"],
      ),
    ],
  },

  placements: {
    image: aiImage("trp", "cs-lab", "Students building an IoT project with microcontroller boards"),
    heading: "99% placements. Real offers.",
    intro: "Strong placement support with 90+ interview avenues for students.",
    stats: [
      { value: 99, suffix: "%", label: "Placements" },
      { value: 90, suffix: "+", label: "Interview avenues" },
      { value: 580, suffix: "+", label: "Placement offers" },
      { value: 35, suffix: " LPA", label: "Maximum package" },
    ],
    scopeNote:
      "Institution-wide figures as published on the official admissions page. The batch / year is not stated and must be confirmed. Average package is not published.",
    // "Placement Records" – in the order and spelling published on the live page.
    records: [
      {
        name: "GIFTSON TENSINGH.T",
        company: "IDP India Education",
        package: "8 LPA+",
        photo: { src: `${A}/placements/giftson-tensingh-t.jpg`, alt: "Giftson Tensingh T", width: 479, height: 719 },
      },
      {
        name: "VETRIVEERAN.G",
        company: "Kinaxis India",
        package: "6.12 LPA",
        photo: { src: `${A}/placements/vetriveeran-g.jpg`, alt: "Vetriveeran G", width: 342, height: 513 },
      },
      {
        name: "LOHITHA.A.M.K",
        company: "TCS",
        package: "7 LPA",
        photo: { src: `${A}/placements/lohitha-a-m-k.jpg`, alt: "Lohitha A M K", width: 193, height: 290 },
      },
      {
        name: "Satya Narayanan.A",
        company: "My Captain",
        package: "5 LPA",
        photo: { src: `${A}/placements/satya-narayanan-a.jpg`, alt: "Satya Narayanan A", width: 193, height: 290 },
      },
    ],
    recordsNote: "Individual placement records as published (CTC). Department and batch are not stated on the official page.",
    // "Our major Recruiters" – logos in the order published on the live page.
    recruiters: {
      names: [
        "Amazon",
        "Google",
        "Arista",
        "Atlassian",
        "Wipro",
        "Zoho",
        "IBM",
        "Infosys",
        "Renault Nissan",
        "Tech Mahindra",
        "Wells Fargo",
        "Autodesk",
        "Tata Consultancy Services",
        "Honeywell",
        "Cognizant",
      ],
      logos: [
        logo("amazon.jpg", "Amazon", 200, 72),
        logo("google.jpg", "Google", 200, 72),
        logo("arista.jpg", "Arista", 200, 72),
        logo("atlassian.jpg", "Atlassian", 200, 72),
        logo("wipro.jpg", "Wipro", 206, 75),
        logo("zoho.jpg", "Zoho", 200, 72),
        logo("ibm.jpg", "IBM", 200, 72),
        logo("infosys.jpg", "Infosys", 200, 72),
        logo("renault-nissan.jpg", "Renault Nissan", 927, 618),
        logo("tech-mahindra.png", "Tech Mahindra", 1024, 290),
        logo("wells-fargo.png", "Wells Fargo", 2048, 2048),
        logo("autodesk.webp", "Autodesk", 256, 256),
        logo("tcs.jpg", "Tata Consultancy Services", 206, 75),
        logo("honeywell.png", "Honeywell", 250, 63),
        logo("cognizant.png", "Cognizant", 227, 70),
      ],
      note: "“Our major Recruiters”, as published on the official admissions page.",
    },
    careerDevelopment: [
      { title: "Interview avenues", body: "90+ interview avenues for students." },
      { title: "Research labs", body: "Fully equipped research labs for project-based learning." },
      { title: "Upskilling", body: "Join the premier institute that will upskill your talent." },
    ],
  },

  industry: {
    image: aiImage("trp", "industry", "Students in safety helmets on an industrial visit to a manufacturing plant"),
    heading: "Learning by doing",
    intro: "Practical, lab-first learning that prepares you for real engineering work.",
    highlights: [
      {
        title: "Robotics & automation lab",
        body: "Hands-on work with robotic arms and automation hardware.",
        source: "“Fully Equipped Research labs” photograph, official admissions page",
      },
      {
        title: "Research programmes",
        body: "M.S (Research) and Ph.D in ECE, Mechanical Engineering and Physics.",
        source: "Courses Offered, official admissions page",
      },
      {
        title: "SRM Group legacy",
        body: "Headed by Dr. R. Shivakumar M.D., Ph.D., Chairman, Ramapuram and Trichy Campuses.",
        source: "About TRP, official admissions page",
      },
    ],
    timeline: [
      { phase: "Year 1", title: "Workshops & clubs", body: "Workshop calendar pending.", pending: true },
      { phase: "Year 2", title: "Industrial visits", body: "Visit list pending.", pending: true },
      { phase: "Year 3", title: "Internships", body: "Internship partners pending.", pending: true },
      { phase: "Year 4", title: "Industry projects & placement", body: "MoU list pending.", pending: true },
    ],
  },

  infrastructure: {
    heading: "Built for hands-on engineering",
    intro: "Labs, library and a green campus on NH 45.",
    items: [
      {
        title: "Fully Equipped Research labs",
        description: "Hands-on labs, including robotics and automation.",
        media: { ...CAMPUS.lab, alt: "Student working with a robotic arm in the research lab" },
      },
      {
        title: "HiTech Library",
        description: "Quiet study among departmental collections.",
        media: { ...CAMPUS.library, alt: "Two students reading together in the HiTech Library" },
      },
      {
        title: "State-of-the-Art Infrastructure",
        description: "Multi-storey academic blocks around open lawns.",
        media: { ...CAMPUS.infrastructure, alt: "Main academic building with lawn in front" },
      },
      {
        title: "Green & Eco Friendly Campus",
        description: "Palm-lined avenues and green open spaces.",
        media: { ...CAMPUS.green, alt: "Aerial view of the palm-lined campus entrance" },
      },
    ],
  },

  academics: {
    heading: "Approved. Affiliated. Autonomous.",
    // Verbatim "About TRP" text from the live page.
    intro:
      "SRM TRP Engineering College is headed by Dr. R. Shivakumar M.D., Ph.D. Chairman, Ramapuram and Trichy Campuses. The institution continues the blazing glory in the field of education, deservedly bequeathing it from SRM Group of Institutions. It is approved by All India Council for Technical Education (AICTE), New Delhi and affiliated to Anna University, Chennai.",
    accreditations: [
      {
        title: "AICTE approved",
        body: "Approved by All India Council for Technical Education (AICTE), New Delhi.",
        badge: { ...BADGES.aicte, alt: "AICTE logo" },
        source: "About TRP, official admissions page",
        verified: true,
      },
      {
        title: "Anna University",
        body: "Affiliated to Anna University, Chennai.",
        badge: { ...BADGES.anna, alt: "Anna University logo" },
        source: "About TRP, official admissions page",
        verified: true,
      },
      {
        title: "Autonomous",
        body: "An autonomous institution.",
        source: "Official college logo",
        verified: true,
      },
      {
        title: "NBA",
        body: "NBA mark displayed on the official admissions page. Accredited programmes to be confirmed.",
        badge: { ...BADGES.nba, alt: "NBA logo" },
        source: "About TRP badge row, official admissions page",
        verified: false,
      },
    ],
    image: { ...CAMPUS.library, alt: "Students studying in the SRM TRP HiTech Library" },
  },

  scholarships: {
    heading: "Scholarships",
    intro: "Scholarship details for 2027–28 are not yet published on the admissions page. Talk to a counsellor about current options.",
    items: [
      { category: "Merit scholarships", ...PENDING_SCHOLARSHIP },
      { category: "Government schemes", ...PENDING_SCHOLARSHIP },
      { category: "Other categories", ...PENDING_SCHOLARSHIP },
    ],
  },

  testimonials: {
    heading: "Alumni in the industry",
    intro: "SRM TRP graduates now working across banking, IT and sports analytics.",
    note: "Each quote is the alumnus's answer to “One word about trpec:”, as published on the official admissions page.",
    // Order, names, roles and quotes as published in the live "Testimonials" slider.
    items: [
      {
        name: "Abirami R",
        programme: "B.E, ECE",
        year: "2018-2022",
        role: "Relationship Manager in City Union Bank",
        quote: "Pathway for Success",
        photo: { src: `${A}/testimonials/abirami-r.jpg`, alt: "Abirami R", width: 601, height: 902 },
      },
      {
        name: "Shanawaz Khan",
        programme: "Mechanical Engineering",
        year: "2017-2021",
        role: "System Engineer in Infosys",
        quote: "The place where I got different opportunity to explore myself",
        photo: { src: `${A}/testimonials/shanawaz-khan.jpg`, alt: "Shanawaz Khan", width: 853, height: 1280 },
      },
      {
        name: "R.Santhosh babu",
        programme: "B.E, ECE",
        year: "2015 - 2019",
        role: "Present designation Associate in Cognizant technology",
        quote: "The place where I got my new friends",
        photo: { src: `${A}/testimonials/r-santhosh-babu.jpg`, alt: "R. Santhosh Babu", width: 853, height: 1280 },
      },
      {
        name: "Sathish Kumar",
        programme: "B.E. Mechanical Engineering",
        year: "2016-2020",
        role: "Systems Engineer in Infosys Ltd., Chennai",
        quote: "The place where I gained life time friends",
        photo: { src: `${A}/testimonials/sathish-kumar.jpg`, alt: "Sathish Kumar", width: 719, height: 1077 },
      },
      {
        name: "Rathish. S",
        programme: "B.E. Mechanical Engineering",
        year: "2016-2020",
        role: "Cricket Analyst in Kadamba Technologies",
        quote: "Place where I made friends for life",
        photo: { src: `${A}/testimonials/rathish-s.jpg`, alt: "Rathish S", width: 821, height: 1231 },
      },
      {
        name: "Krishna Harini R",
        programme: "B.E. Mechanical Engineering",
        year: "2018-2022",
        role: "Relationship Manager Trainee, City Union Bank",
        quote: "Extremely important in shaping my future",
        photo: { src: `${A}/testimonials/krishna-harini-r.jpg`, alt: "Krishna Harini R", width: 853, height: 1280 },
      },
    ],
  },

  campusLife: {
    heading: "Campus life at TRP",
    intro: "Big stages, bold performances and a campus community that shows up.",
    items: [
      {
        title: "Vibrant Campus Life",
        body: "Cultural nights on the SRM stage.",
        media: { ...CAMPUS.cultural, alt: "Students performing a dance on stage at a cultural event" },
      },
      {
        title: "Fully Equipped Research labs",
        body: "Robotics and lab projects.",
        media: { ...CAMPUS.lab, alt: "Student with a robotic arm in the research lab" },
      },
      {
        title: "Green & Eco Friendly Campus",
        body: "Space to think and breathe.",
        media: { ...CAMPUS.green, alt: "Aerial view of the campus entrance" },
      },
    ],
  },

  process: {
    heading: "Your admission, step by step",
    intro: "Indicative steps. The exact process follows Anna University / TNEA and college policy.",
    indicative: true,
    steps: [
      { title: "Explore programmes", body: "Choose from 8 undergraduate and 6 postgraduate programmes." },
      { title: "Check eligibility", body: "UG: 10+2 with Mathematics, Physics and Chemistry. Lateral entry available." },
      { title: "Register online", body: "Register on the official portal with your mobile number (OTP) and email." },
      { title: "Complete documentation", body: "Submit the documents requested by the admissions office." },
      { title: "Review / counselling", body: "Admission review and counselling." },
      { title: "Confirm admission", body: "Confirm your seat as instructed." },
    ],
  },

  faqs: [
    {
      q: "Which programmes are available at SRM TRP?",
      a: "UG: B.E in Civil, CSE, CSE (AI & ML), EEE, ECE and Mechanical Engineering; B.Tech in AI & Data Science and IT. PG: MBA, M.E Thermal Engineering, M.E VLSI Design, and M.S (Research) / Ph.D in ECE, Mechanical Engineering and Physics.",
    },
    {
      q: "What is the eligibility for UG programmes?",
      a: "As per AICTE & Govt. of Tamil Nadu, Anna University, a pass in Higher Secondary Examinations of (10+2) curriculum with Mathematics, Physics and Chemistry is required. Lateral entry is available.",
    },
    {
      q: "What is the eligibility for PG programmes?",
      a: "As per AICTE and Anna University norms.",
    },
    {
      q: "Is SRM TRP approved and affiliated?",
      a: "Yes. SRM TRP Engineering College is approved by AICTE, New Delhi, and affiliated to Anna University, Chennai. It is an autonomous institution.",
    },
    {
      q: "How do I apply?",
      a: "Click 'Apply Now' to register on the official SRM TRP portal, or submit an enquiry here and a counsellor will call you.",
    },
    {
      q: "What documents are required?",
      a: "The admissions office will confirm the document list at counselling. Call the helpline to prepare in advance.",
    },
    {
      q: "Are scholarships available?",
      a: "Scholarship details for 2027–28 are not yet published here. Ask a counsellor for the current options.",
    },
    {
      q: "How do I contact admissions?",
      a: "Call toll-free 1800 202 2535 or 0431-2258947, or email helpdesk@trp.srmtrichy.edu.in.",
    },
    {
      q: "Can I visit the campus?",
      a: "Yes. The campus is on NH 45 at Irungalur, Mannachanallur Taluk, Tiruchirappalli. Submit an enquiry with 'Plan a campus visit' to arrange it.",
    },
  ],

  contact: {
    address: "NH 45, Mannachanallur Taluk, Tiruchirappalli District, Irungalur, Tamil Nadu 621105",
    addressVerified: true,
    phones: [
      { label: "Toll-free", display: "1800 202 2535", tel: "18002022535" },
      { label: "Office", display: "0431-2258947", tel: "+914312258947" },
    ],
    emails: ["helpdesk@trp.srmtrichy.edu.in"],
    whatsapp: null,
    mapQuery: "SRM TRP Engineering College Irungalur Tiruchirappalli",
  },

  finalCta: {
    headline: "Your future starts here.",
    body: "Admissions for 2027–28 are open. Apply now or speak to a counsellor.",
    image: { ...CAMPUS.green, alt: "Aerial view of the SRM TRP campus entrance" },
  },

  footer: {
    tagline: "Technology is the religion for all.",
    social: [],
    privacyUrl: null,
    termsUrl: null,
  },
};
