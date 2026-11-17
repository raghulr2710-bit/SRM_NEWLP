import type { Institution } from "@/types/institution";
import { group, PENDING_SCHOLARSHIP } from "./helpers";

/**
 * SRM TRP Engineering College, Tiruchirappalli
 * Source: https://apply.trp.srmtrichy.edu.in/ (audited 2026-11-17).
 * "Autonomous" is taken from the official logo artwork. AICTE approval and
 * Anna University affiliation are stated in the page text.
 */

const UG_ELIG =
  "As per AICTE, Govt. of Tamil Nadu and Anna University: a pass in 10+2 with Mathematics, Physics and Chemistry.";
const PG_ELIG = "As per AICTE and Anna University norms.";

export const trp: Institution = {
  key: "trp",
  route: "/srm-trp-engineering-college",
  name: "SRM TRP Engineering College",
  shortName: "SRM TRP",
  legalLine: "Autonomous · Approved by AICTE · Affiliated to Anna University",
  city: "Tiruchirappalli",
  logo: {
    src: "/img/trp/logo.jpg",
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
      "Start your journey at SRM TRP Engineering College, a place for learning, discovery, innovation and expression. Join an institute that will upskill your talent and back it with a 99% placement record.",
    image: {
      src: "/img/trp/hero.webp",
      alt: "Smiling SRM TRP student holding a notebook",
      width: 1022,
      height: 1367,
    },
    secondaryImage: {
      src: "/img/trp/sl-1.jpg",
      alt: "SRM TRP Engineering College main building and lawn",
      width: 1032,
      height: 774,
    },
    badges: [
      { src: "/img/trp/hero-logo1.png", alt: "AICTE", width: 84, height: 84 },
      { src: "/img/trp/hero-logo2.png", alt: "Anna University", width: 84, height: 84 },
      { src: "/img/trp/hero-logo3.png", alt: "NBA", width: 84, height: 84 },
    ],
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
      "I authorise SRM TRP Engineering College and its representatives to contact me via email, SMS, WhatsApp or call. This overrides DND/NDNC registration.",
    nextSteps: [
      "An SRM TRP counsellor calls you back.",
      "You get advice on programme, eligibility and lateral entry.",
      "You register on the official application portal.",
    ],
  },

  why: {
    heading: "Why TRP",
    intro: "A student-focused engineering college that continues the legacy of the SRM Group of Institutions.",
    source: "apply.trp.srmtrichy.edu.in",
    items: [
      { title: "State-of-the-art infrastructure", body: "Modern academic buildings on a large campus off NH 45." },
      { title: "HiTech library", body: "A well-stocked library for study and research." },
      { title: "Fully equipped research labs", body: "Hands-on labs, including robotics and automation." },
      { title: "Vibrant campus life", body: "Cultural nights, clubs and events across the year." },
      { title: "Green & eco-friendly campus", body: "Tree-lined avenues and open green spaces." },
      { title: "Lateral entry available", body: "Diploma holders can join UG programmes through lateral entry." },
    ],
  },

  programmes: {
    heading: "Pick your branch",
    intro: "Eight UG and six PG / research programmes, as listed on the official admissions page.",
    footnote:
      "Programme duration and approved intake are not published on the admissions page. They will be shown once the college confirms them. Lateral entry is available for UG programmes.",
    items: [
      ...group(
        { degree: "B.E", level: "UG", department: "Computing", eligibility: UG_ELIG },
        [
          "Computer Science and Engineering",
          "Computer Science and Engineering (Artificial Intelligence and Machine Learning)",
        ],
      ),
      ...group(
        { degree: "B.Tech", level: "UG", department: "Computing", eligibility: UG_ELIG },
        ["Artificial Intelligence and Data Science", "Information Technology"],
      ),
      ...group(
        { degree: "B.E", level: "UG", department: "Electrical & Electronics", eligibility: UG_ELIG },
        ["Electrical and Electronics Engineering", "Electronics and Communication Engineering"],
      ),
      ...group(
        { degree: "B.E", level: "UG", department: "Core Engineering", eligibility: UG_ELIG },
        ["Civil Engineering", "Mechanical Engineering"],
      ),
      ...group(
        { degree: "M.E", level: "PG", department: "Engineering (PG)", eligibility: PG_ELIG },
        ["Thermal Engineering", "VLSI Design"],
      ),
      ...group(
        { degree: "MBA", level: "PG", department: "Management", eligibility: PG_ELIG },
        ["Master of Business Administration"],
      ),
      ...group(
        { degree: "M.S (Research) / Ph.D", level: "Research", department: "Research", eligibility: PG_ELIG },
        ["Electronics and Communication Engineering", "Mechanical Engineering", "Physics"],
      ),
    ],
  },

  placements: {
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
    records: [
      { name: "Giftson Tensingh T", company: "IDP India Education", package: "8 LPA+" },
      { name: "Lohitha A M K", company: "TCS", package: "7 LPA" },
      { name: "Vetriveeran G", company: "Kinaxis India", package: "6.12 LPA" },
      { name: "Satya Narayanan A", company: "My Captain", package: "5 LPA" },
    ],
    recordsNote: "Individual placement records as published (CTC). Department and batch to be confirmed.",
    recruiters: { pending: "Approved recruiter logos and names for SRM TRP" },
    careerDevelopment: [
      { title: "Interview avenues", body: "90+ interview avenues for students." },
      { title: "Research labs", body: "Fully equipped labs for project-based learning." },
      { title: "Upskilling", body: "Programmes designed to upskill your talent for industry." },
    ],
  },

  industry: {
    heading: "Learning by doing",
    intro: "Practical, lab-first learning that prepares you for real engineering work.",
    highlights: [
      {
        title: "Robotics & automation lab",
        body: "Hands-on work with robotic arms and automation hardware.",
        source: "Campus photography, official admissions page",
      },
      {
        title: "Research programmes",
        body: "M.S (Research) and Ph.D in ECE, Mechanical Engineering and Physics.",
        source: "Programme list, official admissions page",
      },
      {
        title: "SRM Group legacy",
        body: "Part of the SRM Group of Institutions, led by Dr. R. Shivakumar, Chairman of the Ramapuram and Trichy campuses.",
        source: "About, official admissions page",
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
        title: "Research labs",
        description: "Fully equipped labs including robotics and automation.",
        media: { src: "/img/trp/sl-5.jpg", alt: "Student working with a robotic arm in the lab", width: 400, height: 300 },
      },
      {
        title: "HiTech library",
        description: "Quiet study among departmental collections.",
        media: { src: "/img/trp/sl-2.jpeg", alt: "Two students reading together in the library", width: 1820, height: 1365 },
      },
      {
        title: "Campus",
        description: "State-of-the-art academic buildings.",
        media: { src: "/img/trp/sl-1.jpg", alt: "Main academic building with lawn in front", width: 1032, height: 774 },
      },
      {
        title: "Green & eco-friendly",
        description: "Palm-lined avenues and green open spaces.",
        media: { src: "/img/trp/sl-4.jpg", alt: "Aerial view of the palm-lined campus entrance", width: 750, height: 330 },
      },
      { title: "Hostels", description: "Residential facilities.", media: { pending: "SRM TRP hostel photograph" } },
      { title: "Sports", description: "Sports facilities.", media: { pending: "SRM TRP sports photograph" } },
    ],
  },

  academics: {
    heading: "Approved. Affiliated. Autonomous.",
    intro: "Recognitions and approvals for SRM TRP Engineering College.",
    accreditations: [
      {
        title: "AICTE approved",
        body: "Approved by the All India Council for Technical Education (AICTE), New Delhi.",
        badge: { src: "/img/trp/hero-logo1.png", alt: "AICTE logo", width: 84, height: 84 },
        source: "About, official admissions page",
        verified: true,
      },
      {
        title: "Anna University",
        body: "Affiliated to Anna University, Chennai.",
        badge: { src: "/img/trp/hero-logo2.png", alt: "Anna University logo", width: 84, height: 84 },
        source: "About, official admissions page",
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
        badge: { src: "/img/trp/hero-logo3.png", alt: "NBA logo", width: 84, height: 84 },
        source: "Official admissions page",
        verified: false,
      },
    ],
    image: {
      src: "/img/trp/sl-2.jpeg",
      alt: "Students studying in the SRM TRP library",
      width: 1820,
      height: 1365,
    },
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
    note: "Alumni details as published on the official admissions page. Approved photos, full quotes and videos are pending.",
    items: [
      { name: "Abirami R", programme: "B.E ECE", year: "2018–2022", role: "Relationship Manager, City Union Bank" },
      { name: "Shanawaz Khan", programme: "Mechanical Engineering", year: "2017–2021", role: "System Engineer, Infosys" },
      { name: "R. Santhosh Babu", programme: "B.E ECE", year: "2015–2019", role: "Associate, Cognizant Technology" },
      { name: "Sathish Kumar", programme: "B.E. Mechanical Engineering", year: "2016–2020", role: "Systems Engineer, Infosys Ltd., Chennai" },
      { name: "Rathish S", programme: "B.E. Mechanical Engineering", year: "2016–2020", role: "Cricket Analyst, Kadamba Technologies" },
      { name: "Krishna Harini R", programme: "B.E. Mechanical Engineering", year: "2018–2022", role: "Relationship Manager Trainee, City Union Bank" },
    ],
  },

  campusLife: {
    heading: "Campus life at TRP",
    intro: "Big stages, bold performances and a campus community that shows up.",
    items: [
      {
        title: "Cultural nights",
        body: "Inter-institution cultural events across the SRM Trichy group.",
        media: { src: "/img/trp/sl-3.jpg", alt: "Students performing a dance on stage at a cultural event", width: 1024, height: 683 },
      },
      {
        title: "Innovation",
        body: "Robotics and lab projects.",
        media: { src: "/img/trp/sl-5.jpg", alt: "Student with a robotic arm", width: 400, height: 300 },
      },
      {
        title: "Green campus",
        body: "Space to think and breathe.",
        media: { src: "/img/trp/sl-4.jpg", alt: "Aerial view of campus entrance", width: 750, height: 330 },
      },
      { title: "Technical symposiums", media: { pending: "SRM TRP symposium photograph" } },
      { title: "Sports", media: { pending: "SRM TRP sports photograph" } },
    ],
  },

  process: {
    heading: "Your admission, step by step",
    intro: "Indicative steps. The exact process follows Anna University / TNEA and college policy.",
    indicative: true,
    steps: [
      { title: "Explore programmes", body: "Choose from 8 UG and 6 PG / research programmes." },
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
      a: "As per AICTE, Govt. of Tamil Nadu and Anna University: a pass in 10+2 with Mathematics, Physics and Chemistry. Lateral entry is available.",
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
    address: "NH 45, Mannachanallur Taluk, Tiruchirappalli District, Irungalur, Tamil Nadu – 621105",
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
    image: {
      src: "/img/trp/sl-4.jpg",
      alt: "Aerial view of the SRM TRP campus entrance",
      width: 750,
      height: 330,
    },
  },

  footer: {
    tagline: "Technology is the religion for all.",
    social: [],
    privacyUrl: null,
    termsUrl: null,
  },
};
