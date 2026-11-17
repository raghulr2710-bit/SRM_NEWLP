import type { Institution } from "@/types/institution";
import { aiImage, group, PENDING_SCHOLARSHIP } from "./helpers";

/**
 * Easwari Engineering College (SRM Easwari), Ramapuram, Chennai
 * Source: https://registration.srmeaswari.ac.in/ (audited 2026-11-17).
 * "Autonomous Institution, Affiliated to Anna University" is taken from the
 * official logo artwork. srmeaswari.ac.in blocked automated access.
 */

const UG_ELIG =
  "As per AICTE & Govt. of Tamil Nadu norms: a pass in 10+2 with Mathematics, Physics and Chemistry.";
const PG_ELIG = "As per AICTE and Anna University norms.";

export const easwari: Institution = {
  key: "eec",
  route: "/easwari-engineering-college",
  name: "Easwari Engineering College",
  shortName: "SRM Easwari",
  legalLine: "An Autonomous Institution · Affiliated to Anna University",
  city: "Chennai",
  logo: {
    src: "/img/eec/logo.png",
    alt: "Easwari Engineering College, Ramapuram, Chennai",
    width: 301,
    height: 119,
  },
  applyUrl: "https://registration.srmeaswari.ac.in/",
  brochureUrl: null,

  theme: {
    brand: "#6b1f25",
    brandInk: "#2a0d10",
    brandSoft: "#f6ebe8",
    accent: "#127066",
    accentSoft: "#e3f2ef",
    accentText: "#127066",
    accentOnDark: "#7fd1c4",
    onBrand: "#ffffff",
    onAccent: "#ffffff",
    surface: "#fffdf9",
    surfaceAlt: "#f7f1e8",
    ink: "#23161a",
    muted: "#5b4d50",
    line: "#e8ddd2",
    radiusCard: "2px",
  },

  layout: {
    hero: "heritage",
    why: "list",
    placements: "ledger",
    programmes: "rows",
    order: [
      "enquiry",
      "why",
      "academics",
      "programmes",
      "placements",
      "testimonials",
      "industry",
      "infrastructure",
      "campusLife",
      "scholarships",
      "process",
      "faqs",
      "contact",
    ],
  },

  seo: {
    title: "Easwari Engineering College Admissions 2027–28 | B.E., B.Tech, M.E., MBA, MCA",
    description:
      "Apply to Easwari Engineering College (SRM Easwari), Ramapuram, Chennai for 2027–28. An autonomous institution affiliated to Anna University. 15 UG and 8 PG programmes.",
    keywords: [
      "Easwari Engineering College admissions 2027",
      "SRM Easwari B.E.",
      "Easwari Engineering College Ramapuram",
      "engineering colleges in Chennai",
    ],
  },

  hero: {
    eyebrow: "Registration Open for 2027–28",
    headline: ["Engineer your future", "in the heart of Chennai."],
    body:
      "SRM Easwari, Ramapuram is a place for learning, discovery, innovation, expression and discourse, with 29 years of engineering education behind it.",
    image: aiImage("eec", "hero", "Smiling engineering students on the steps of an academic building on a green campus", "65% center"),
    secondaryImage: {
      src: "/img/eec/green-campus.jpg",
      alt: "Galileo Block surrounded by trees on the Easwari campus",
      width: 500,
      height: 500,
    },
    proof: [
      { value: 51, suffix: " LPA", label: "Highest package, 2025" },
      { value: 1424, suffix: "+", label: "Students placed" },
      { value: 432, label: "Companies visited" },
    ],
    proofNote: "As published on the official admissions page. The year for students placed and companies visited is not stated.",
  },

  enquiry: {
    heading: "Begin your Easwari application",
    body: "Ask us anything about programmes, eligibility or counselling, and our admissions team will get back to you.",
    levels: ["UG", "PG"],
    consent:
      "I consent to Easwari Engineering College and its representatives contacting me by email, SMS, WhatsApp or call about admissions. This overrides DND/NDNC registration.",
    nextSteps: [
      "Our admissions team reviews your enquiry.",
      "A counsellor calls to discuss programme and eligibility.",
      "You complete registration on the official portal.",
    ],
  },

  why: {
    heading: "Why SRM EEC",
    intro: "An established engineering college focused on continuous learning and on building students' interpersonal skills and attitudes.",
    source: "registration.srmeaswari.ac.in",
    image: {
      src: "/img/eec/s1.jpg",
      alt: "Chennai Central railway station",
      width: 433,
      height: 433,
      caption: "Safely located within Chennai city",
    },
    items: [
      { title: "Safely located within Chennai city", body: "Study in Ramapuram, with Chennai's industries and opportunities close by." },
      { title: "State-of-the-art infrastructure", body: "Labs for automobile engineering, computing, and control & instrumentation." },
      { title: "Semester abroad programme", body: "Opportunities to study a semester overseas." },
      { title: "Placement in top MNCs", body: "1424+ students placed, with a 2025 highest package of 51 LPA." },
      { title: "Student clubs", body: "Clubs and a vibrant campus life beyond the classroom." },
      { title: "Support for innovation & start-ups", body: "Encouragement for student innovation and entrepreneurship." },
      { title: "Green & eco-friendly campus", body: "A tree-lined campus in the city." },
    ],
  },

  programmes: {
    heading: "Programmes offered",
    intro: "Fifteen undergraduate and eight postgraduate programmes, as listed on the official admissions page.",
    footnote:
      "Programme duration and approved intake are not published on the admissions page. They will be added once the college confirms them.",
    items: [
      ...group(
        { degree: "B.E.", level: "UG", department: "Core Engineering", eligibility: UG_ELIG },
        [
          "Automobile Engineering",
          "Civil Engineering",
          "Mechanical Engineering",
          "Robotics and Automation",
        ],
      ),
      ...group(
        { degree: "B.E.", level: "UG", department: "Electrical & Electronics", eligibility: UG_ELIG },
        ["Electrical and Electronics Engineering", "Electronics and Communication Engineering"],
      ),
      ...group(
        { degree: "B.E.", level: "UG", department: "Computing", eligibility: UG_ELIG },
        [
          "Computer Science and Design",
          "Computer Science and Engineering",
          "Computer Science and Engineering (Artificial Intelligence and Machine Learning)",
          "Computer Science and Engineering (Cyber Security)",
        ],
      ),
      ...group(
        { degree: "B.Tech.", level: "UG", department: "Computing", eligibility: UG_ELIG },
        [
          "Artificial Intelligence and Data Science",
          ["Computer Science and Business System (with TCS partnership)", { notes: "Offered in partnership with TCS." }],
          "Information Technology",
        ],
      ),
      ...group(
        { degree: "B.E. / B.Tech.", level: "UG", department: "Life Sciences", eligibility: UG_ELIG },
        [
          ["Bio Medical Engineering", { degree: "B.E." }],
          ["Bio Technology", { degree: "B.Tech." }],
        ],
      ),
      ...group(
        { degree: "M.E.", level: "PG", department: "Engineering (PG)", eligibility: PG_ELIG },
        [
          "Communication Systems",
          "Computer Science and Engineering",
          "Embedded System Technologies",
          "Engineering Design",
          "Structural Engineering",
        ],
      ),
      ...group(
        { degree: "MBA / MCA", level: "PG", department: "Management & Computer Applications", eligibility: PG_ELIG },
        [
          ["Master of Business Administration", { degree: "MBA" }],
          ["Master of Computer Application", { degree: "MCA" }],
        ],
      ),
      ...group(
        { degree: "Ph.D.", level: "Research", department: "Research" },
        ["Available in all disciplines"],
      ),
    ],
  },

  placements: {
    image: aiImage("eec", "cs-lab", "Students pair-programming in a bright computer lab"),
    heading: "Record-setting placements",
    intro: "2025 was a record-setting year at SRM Easwari, with a highest package of 51 LPA from top companies.",
    stats: [
      { value: 51, suffix: " LPA", label: "Highest package (2025)" },
      { value: 1424, suffix: "+", label: "Students placed" },
      { value: 432, label: "Companies visited" },
      { value: 16, suffix: "K+", label: "Alumni" },
    ],
    scopeNote:
      "Institution-wide figures as published on the official admissions page. The 51 LPA highest package is for 2025. The period for 'students placed' and 'companies visited' is not stated. Placement percentage and average package are not published.",
    records: [
      { name: "Pranev SS", programme: "Intern, Software Development Engineer", package: "47 LPA", batch: "2025" },
      { name: "Shreenidhi Balaji", programme: "Intern, Software Development Engineer", package: "47 LPA", batch: "2025" },
      { name: "Mohammed Anees", programme: "Intern, Software Development Engineer", package: "40 LPA", batch: "2025" },
      { name: "Narayana Bharathraj", programme: "Intern, Software Development Engineer", package: "40 LPA", batch: "2025" },
      { name: "Bhaarat Krishnan", programme: "Intern, Software Development Engineer", package: "40 LPA", batch: "2025" },
      { name: "Radhika Swaminathan", programme: "Intern, Software Development Engineer", package: "30 LPA", batch: "2025" },
    ],
    recordsNote: "Star achievers, 2025 batch, as published (CTC). Department-level details to be confirmed.",
    recruiters: { pending: "Approved recruiter logos, Major Recruiters 2024–2025" },
    careerDevelopment: [
      { title: "Live projects", body: "Alumni credit live projects and field work for their industry readiness." },
      { title: "Semester abroad", body: "Global exposure through the semester abroad programme." },
      { title: "Start-up support", body: "Support for innovation and start-ups on campus." },
    ],
  },

  industry: {
    image: aiImage("eec", "industry", "Student shaking hands with a corporate mentor after a mock interview"),
    heading: "Industry connect",
    intro: "Programmes and opportunities that connect classroom learning to real industry work.",
    highlights: [
      {
        title: "TCS partnership",
        body: "B.Tech. Computer Science and Business System is offered with TCS.",
        source: "Programme list, official admissions page",
      },
      {
        title: "Semester abroad programme",
        body: "Study a semester overseas. Partner institutions to be confirmed.",
        source: "Why SRM EEC, official admissions page",
      },
      {
        title: "Innovation & start-ups",
        body: "Support for student innovation and start-up ventures.",
        source: "Why SRM EEC, official admissions page",
      },
    ],
    timeline: [
      { phase: "Year 1", title: "Clubs & technical workshops", body: "Workshop calendar pending.", pending: true },
      { phase: "Year 2", title: "Industrial visits", body: "Visit list pending.", pending: true },
      { phase: "Year 3", title: "Internships & live projects", body: "Internship partners pending.", pending: true },
      { phase: "Year 4", title: "Industry projects & placement", body: "MoU list pending.", pending: true },
    ],
  },

  infrastructure: {
    heading: "Labs and learning spaces",
    intro: "Hands-on laboratories across disciplines on a green city campus.",
    items: [
      {
        title: "Automobile Engineering lab",
        description: "Hands-on automotive engineering laboratory.",
        media: { src: "/img/eec/automobile-lab.jpg", alt: "Automobile Engineering laboratory", width: 500, height: 500 },
      },
      {
        title: "Computer lab",
        description: "Computing facilities for programming and projects.",
        media: { src: "/img/eec/computer-lab.jpg", alt: "Student celebrating while working on a laptop in the computer lab", width: 500, height: 500 },
      },
      {
        title: "Control & Instrumentation lab",
        description: "Instrumentation and control systems laboratory.",
        media: { src: "/img/eec/ci-lab.jpg", alt: "Control and Instrumentation laboratory", width: 500, height: 500 },
      },
      {
        title: "Green campus",
        description: "Academic blocks set among mature trees.",
        media: { src: "/img/eec/green-campus.jpg", alt: "Galileo Block among trees", width: 500, height: 500 },
      },
      { title: "Library", description: "Central library.", media: aiImage("eec", "library", "Students studying together in a bright library hall") },
      { title: "Hostels & sports", description: "Residential and sports facilities.", media: aiImage("eec", "hostel", "Students relaxing in a hostel common room") },
    ],
  },

  academics: {
    heading: "Accreditation & ranking",
    intro: "An autonomous institution affiliated to Anna University. These accreditation and ranking marks appear on the official admissions page under 'Accreditation & Ranking in 2025'.",
    caution: "The admissions page shows these marks as logos only. Grades, ranks and accredited programmes are to be confirmed before they are written out.",
    accreditations: [
      {
        title: "Autonomous",
        body: "An autonomous institution affiliated to Anna University, Chennai.",
        source: "Official college logo",
        verified: true,
      },
      {
        title: "NBA",
        body: "National Board of Accreditation. Accredited programmes to be confirmed.",
        badge: { src: "/img/eec/badge-nba.png", alt: "NBA logo", width: 171, height: 170 },
        source: "Accreditation & Ranking in 2025, admissions page",
        verified: false,
      },
      {
        title: "NAAC",
        body: "National Assessment and Accreditation Council. Grade to be confirmed.",
        badge: { src: "/img/eec/badge-r2.png", alt: "NAAC logo", width: 185, height: 169 },
        source: "Accreditation & Ranking in 2025, admissions page",
        verified: false,
      },
      {
        title: "NIRF",
        body: "National Institutional Ranking Framework. Rank band to be confirmed.",
        badge: { src: "/img/eec/badge-nirf.webp", alt: "NIRF logo", width: 170, height: 170 },
        source: "Accreditation & Ranking in 2025, admissions page",
        verified: false,
      },
    ],
    facts: [
      { value: 29, label: "Years of excellence" },
      { value: 16, suffix: "K+", label: "Alumni" },
      { value: 15, label: "UG programmes" },
      { value: 8, label: "PG programmes" },
    ],
    factsNote: "As published on the official admissions page.",
    image: {
      src: "/img/eec/s3.jpg",
      alt: "A class of Easwari students gathered in a lecture hall",
      width: 367,
      height: 367,
    },
  },

  scholarships: {
    heading: "Scholarships",
    intro: "Scholarship information for 2027–28 has not been published on the admissions page yet. Ask a counsellor about the current options.",
    items: [
      { category: "Merit scholarships", ...PENDING_SCHOLARSHIP },
      { category: "Government schemes", ...PENDING_SCHOLARSHIP },
      { category: "Other categories", ...PENDING_SCHOLARSHIP },
    ],
  },

  testimonials: {
    heading: "Alumni who went further",
    intro: "Where Easwari graduates have gone, as shared on the official admissions page.",
    note: "Summaries of alumni experiences shared on the official admissions page. Full approved quotes, photos and video are pending.",
    items: [
      {
        name: "Aswanth Ram A S",
        programme: "M.S. Electrical & Computer Engineering, Illinois Institute of Technology",
        achievement: "Reports multiple PhD offers from leading US universities.",
      },
      {
        name: "Kishore V",
        programme: "B.E. Electrical and Electronics Engineering",
        year: "2017",
        role: "Engineer, Sosaley Technologies",
        achievement: "Calls Easwari one of the best colleges in Chennai.",
      },
      {
        name: "Kisshore Kumar S",
        programme: "Alumnus",
        role: "EAS Niche HCM Team, Data Conversion (Workday)",
        achievement: "Credits live projects, assignments and field work for his industry exposure.",
      },
      {
        name: "Sathish Thyagarajan",
        programme: "MBA",
        role: "Principal Business Analyst (Banking domain)",
      },
      {
        name: "Venky",
        programme: "Mechanical Engineering",
      },
    ],
  },

  campusLife: {
    heading: "Campus life",
    intro: "Concerts, clubs and a community that keeps the campus busy all year.",
    items: [
      {
        title: "Vibrant campus life",
        body: "Live music and cultural nights.",
        media: { src: "/img/eec/s2.jpg", alt: "Students performing live music on stage at a campus event", width: 400, height: 400 },
      },
      {
        title: "Student clubs",
        body: "Clubs that bring classes together.",
        media: { src: "/img/eec/s3.jpg", alt: "Large group of students celebrating in a lecture hall", width: 367, height: 367 },
      },
      {
        title: "Career ready",
        body: "Preparing for placements in top MNCs.",
        media: { src: "/img/eec/s4.jpg", alt: "Easwari student in a suit", width: 400, height: 400 },
      },
      { title: "Technical symposiums", media: aiImage("eec", "symposium", "Students presenting a research poster to judges") },
      { title: "Sports", media: aiImage("eec", "sports", "College cricket match on a green ground") },
    ],
  },

  process: {
    heading: "Steps to apply",
    intro: "The official 'Steps to Apply' graphic is being converted to text. Until then, these are the indicative steps.",
    indicative: true,
    steps: [
      { title: "Explore programmes", body: "Choose from 15 UG and 8 PG programmes." },
      { title: "Check eligibility", body: "UG: 10+2 with Mathematics, Physics and Chemistry, as per AICTE & Govt. of Tamil Nadu norms." },
      { title: "Register online", body: "Register on the official portal with your mobile number and email." },
      { title: "Complete documentation", body: "Submit the documents requested by the admissions office." },
      { title: "Review & counselling", body: "Admissions review and counselling." },
      { title: "Confirm admission", body: "Confirm your seat as instructed by the admissions office." },
    ],
  },

  faqs: [
    {
      q: "Which programmes does Easwari Engineering College offer?",
      a: "15 UG programmes (B.E. and B.Tech., including Robotics and Automation, AI & Data Science, Cyber Security and Computer Science and Business System with TCS) and 8 PG options (M.E., MBA, MCA and Ph.D. in all disciplines).",
    },
    {
      q: "What is the eligibility for B.E. / B.Tech.?",
      a: "As per AICTE & Govt. of Tamil Nadu norms: a pass in 10+2 with Mathematics, Physics and Chemistry. PG eligibility follows AICTE and Anna University norms.",
    },
    {
      q: "Is the college autonomous?",
      a: "Yes. Easwari Engineering College is an autonomous institution affiliated to Anna University.",
    },
    {
      q: "How do I apply?",
      a: "Click 'Apply Now' to register on the official Easwari portal. Transfer admissions can also be enquired about through the portal.",
    },
    {
      q: "What documents are required?",
      a: "The admissions office will confirm the document list during counselling. Please call the helpline if you want to prepare in advance.",
    },
    {
      q: "Are scholarships available?",
      a: "Scholarship information for 2027–28 is not yet published here. Ask a counsellor for the current policy.",
    },
    {
      q: "How can I contact admissions?",
      a: "Call +91 89396 28204 or toll-free 1800 103 2535, or email helpdesk@eec.srmrmp.edu.in.",
    },
    {
      q: "Can I visit the campus?",
      a: "Yes. The campus is on Bharathi Salai, Ramapuram, Chennai. Submit an enquiry with 'Plan a campus visit' and we will arrange it.",
    },
  ],

  contact: {
    address: "Bharathi Salai, Ramapuram, Chennai – 600089, Tamil Nadu",
    addressVerified: true,
    phones: [
      { label: "Admissions", display: "+91 89396 28204", tel: "+918939628204" },
      { label: "Toll-free", display: "1800 103 2535", tel: "18001032535" },
    ],
    emails: ["helpdesk@eec.srmrmp.edu.in"],
    whatsapp: null,
    mapQuery: "Easwari Engineering College Ramapuram Chennai",
  },

  finalCta: {
    headline: "Your future starts here.",
    body: "Registration for 2027–28 is open. Take the first step today.",
    image: {
      src: "/img/eec/green-campus.jpg",
      alt: "Easwari campus",
      width: 500,
      height: 500,
    },
  },

  footer: {
    tagline: "Inspiring you towards excellence and a bright future.",
    social: [],
    privacyUrl: null,
    termsUrl: null,
  },
};
