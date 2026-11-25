import type { ImageAsset, Institution } from "@/types/institution";
import { aiImage, group, PENDING_SCHOLARSHIP } from "./helpers";

/**
 * Easwari Engineering College (SRM Easwari), Ramapuram, Chennai
 * Source: https://registration.srmeaswari.ac.in/ (migrated 2026-11-18).
 * All copy marked verbatim, programme titles, eligibility, placement profiles,
 * testimonials, recruiter / collaboration logos and photographs are taken from
 * that page. Official images are stored under public/assets/easwari/.
 * "Autonomous Institution, Affiliated to Anna University" is taken from the
 * official logo artwork.
 */

const SRC = "https://registration.srmeaswari.ac.in/";
const A = "/assets/easwari";

/** Eligibility text, verbatim from the UNDERGRADUATE / POSTGRADUATE tabs. */
const UG_ELIG =
  "As per AICTE & Govt. of Tamil Nadu in Anna University, a Pass in Higher Secondary Examinations of (10+2) Curriculum with Mathematics, Physics, and Chemistry is Required.";
const PG_ELIG = "As per AICTE and Anna University norms";

const img = (src: string, alt: string, width: number, height: number, extra?: Partial<ImageAsset>): ImageAsset => ({
  src,
  alt,
  width,
  height,
  ...extra,
});

const OFFICIAL = {
  hero: img(`${A}/hero/hero-bg.webp`, "Easwari student studying at a library desk", 1000, 521, { objectPosition: "45% center" }),
  chennai: img(`${A}/campus/chennai-city.jpg`, "Chennai Central railway station", 433, 433),
  greenCampus: img(`${A}/campus/city-green-campus.jpg`, "Galileo Block surrounded by trees on the Easwari campus", 500, 500),
  automobileLab: img(`${A}/infrastructure/automobile-engineering-lab.jpg`, "Automobile Engineering laboratory", 500, 500),
  computerLab: img(`${A}/infrastructure/computer-lab.jpg`, "Student celebrating while working on a laptop in the computer lab", 500, 500),
  ciLab: img(`${A}/infrastructure/control-and-instrumentation-lab.jpg`, "Control and Instrumentation laboratory", 500, 500),
  campusLife: img(`${A}/students/vibrant-campus-life.jpg`, "Students performing live music on stage at a campus event", 400, 400),
  clubs: img(`${A}/students/student-clubs.jpg`, "Large group of students celebrating in a lecture hall", 367, 367),
  placementMnc: img(`${A}/students/placement-top-mncs.jpg`, "Easwari student in a suit", 400, 400),
};

const achiever = (
  name: string,
  file: string,
  size: number,
  ctc: string,
  stipend?: string,
) => ({
  name,
  package: `${ctc} LPA`,
  stipend,
  designation: "intern - Software Development Engineer",
  batch: "2025",
  photo: img(`${A}/placements/${file}`, name, size, size),
});

const recruiter = (name: string, file: string, width: number, height: number) => ({
  name,
  image: img(`${A}/recruiters/${file}`, `${name} logo`, width, height),
});

const RECRUITERS = [
  recruiter("Amazon", "amazon.jpg", 200, 72),
  recruiter("Google", "google.jpg", 200, 72),
  recruiter("Capgemini", "capgemini.webp", 200, 72),
  recruiter("Microsoft", "microsoft.webp", 200, 72),
  recruiter("Wipro", "wipro.jpg", 206, 75),
  recruiter("Zoho", "zoho.jpg", 200, 72),
  recruiter("IBM", "ibm.jpg", 200, 72),
  recruiter("Infosys", "infosys.jpg", 200, 72),
  recruiter("Renault Nissan", "renault-nissan.jpg", 927, 618),
  recruiter("Tech Mahindra", "tech-mahindra.png", 1024, 290),
  recruiter("L&T Infotech", "lt-infotech.webp", 200, 72),
  recruiter("Autodesk", "autodesk.webp", 256, 256),
  recruiter("Tata Consultancy Services", "tcs.jpg", 206, 75),
  recruiter("PayPal", "paypal.webp", 200, 72),
  recruiter("Cognizant", "cognizant.webp", 200, 72),
  recruiter("HCL", "hcl.webp", 200, 72),
];

const collaboration = (name: string, file: string) => ({
  name,
  logo: img(`${A}/events/${file}`, `${name} logo`, 449, 153),
});

export const easwari: Institution = {
  key: "eec",
  route: "/easwari-engineering-college",
  name: "Easwari Engineering College",
  shortName: "SRM Easwari",
  legalLine: "An Autonomous Institution · Affiliated to Anna University",
  city: "Chennai",
  logo: {
    src: `${A}/logo/eec-logo.png`,
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
      "SRM Easwari, Chennai is a place for learning, discovery, innovation, expression, and discourse, with 29 years of excellence behind it.",
    image: OFFICIAL.hero,
    secondaryImage: OFFICIAL.greenCampus,
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
      "I authorise SRM Easwari Engineering College & its representatives to contact me with updates and notifications via Email/SMS/What'sApp/Call. This will override DND/NDNC.",
    nextSteps: [
      "Our admissions team reviews your enquiry.",
      "A counsellor calls to discuss programme and eligibility.",
      "You complete registration on the official portal.",
    ],
  },

  why: {
    videoUrl: "https://www.youtube.com/watch?v=7iD44Vk4epQ",
    videoTitle: "SRM Easwari Engineering College",
    heading: "Why SRM Easwari, Chennai",
    intro:
      "Pursuing the philosophy of continuous learning, the Institution prepares the students to score creditably in the Academic sessions and also encourages them to develop their interpersonal skills and attitudes to approach life with confidence.",
    source: SRC,
    image: { ...OFFICIAL.chennai, caption: "Safely located within Chennai City" },
    // Titles verbatim from "Why SRM EEC ?". The live page publishes titles and photos only; bodies are short descriptions of those photos.
    items: [
      { title: "Safely located within Chennai City", body: "Study in Ramapuram, with Chennai's industries and opportunities close by." },
      { title: "State-of-the-Art Infrastructure", body: "Labs for automobile engineering, computing, and control & instrumentation." },
      { title: "Semester Abroad Program", body: "Opportunities to study a semester overseas." },
      { title: "Vibrant campus life", body: "Live music and cultural events on campus." },
      { title: "Green & Eco Friendly Campus", body: "A tree-lined campus in the city." },
      { title: "Placement in Top MNC’s", body: "1424+ students placed, with a 2025 highest package of 51 LPA." },
      { title: "Students Clubs", body: "Clubs that bring students together beyond the classroom." },
      { title: "Support for Innovation & Start - ups", body: "Encouragement for student innovation and entrepreneurship." },
    ],
  },

  programmes: {
    heading: "Courses Offered",
    intro: "Fifteen undergraduate and eight postgraduate programmes, as listed on the official admissions page.",
    footnote:
      "Programme duration, approved intake and lateral entry are not published on the admissions page. They will be added once the college confirms them.",
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
        {
          degree: "Ph.D.",
          level: "Research",
          department: "Research",
          eligibility: PG_ELIG,
          notes: "Listed under the Postgraduate tab on the admissions page.",
        },
        ["Available in all Disciplines"],
      ),
    ],
  },

  placements: {
    image: OFFICIAL.placementMnc,
    heading: "2025 Record Setting Placements With Highest Package of 51 LPA from Top Companies",
    intro: "2025 was a record-setting year at SRM Easwari, with a highest package of 51 LPA from top companies.",
    stats: [
      { value: 51, suffix: " LPA", label: "Highest package (2025)" },
      { value: 1424, suffix: "+", label: "Students placed" },
      { value: 432, label: "Companies visited" },
      { value: 16, suffix: "K+", label: "Alumni" },
    ],
    scopeNote:
      "Institution-wide figures as published on the official admissions page. The 51 LPA highest package is for 2025. The period for 'students placed' and 'companies visited' is not stated. Placement percentage and average package are not published.",
    // "Our Star Achievers", in the order shown on the live page.
    records: [
      achiever("Radhika Swaminathan", "radhika-swaminathan.png", 154, "30"),
      achiever("Mohammed Anees", "mohammed-anees.png", 151, "40", "55000 / month"),
      achiever("NARAYANA BHARATHRAJ", "narayana-bharathraj.png", 163, "40", "55000 / month"),
      achiever("Bhaarat Krishnan", "bhaarat-krishnan.png", 159, "40", "55000 / month"),
      achiever("Pranev SS", "pranev-ss.png", 161, "47", "1,45,000 / month"),
      achiever("Shreenidhi Balaji", "shreenidhi-balaji.png", 151, "47", "1,45,000 / month"),
    ],
    recordsNote:
      "Our Star Achievers, 2025 batch, as published (CTC and internship stipend). The admissions page does not name the companies or departments.",
    recruiters: {
      names: RECRUITERS.map((r) => r.name),
      logos: RECRUITERS,
      note: "Major Recruiters 2024-2025, as shown on the official admissions page.",
    },
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
        source: "Courses Offered, official admissions page",
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
      { title: "Automobile Engineering lab", description: "Hands-on automotive engineering laboratory.", media: OFFICIAL.automobileLab },
      { title: "Computer lab", description: "Computing facilities for programming and projects.", media: OFFICIAL.computerLab },
      { title: "Control & Instrumentation lab", description: "Instrumentation and control systems laboratory.", media: OFFICIAL.ciLab },
      { title: "Green campus", description: "Academic blocks set among mature trees.", media: OFFICIAL.greenCampus },
      { title: "Library", description: "Central library.", media: OFFICIAL.hero },
      { title: "Hostels & sports", description: "Residential and sports facilities.", media: aiImage("eec", "hostel", "Students relaxing in a hostel common room") },
    ],
  },

  academics: {
    heading: "Accreditation & Ranking in 2025",
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
        badge: img(`${A}/accreditation/nba.png`, "NBA logo", 171, 170),
        source: "Accreditation & Ranking in 2025, admissions page",
        verified: false,
      },
      {
        title: "NAAC",
        body: "National Assessment and Accreditation Council. Grade to be confirmed.",
        badge: img(`${A}/accreditation/naac.png`, "NAAC logo", 185, 169),
        source: "Accreditation & Ranking in 2025, admissions page",
        verified: false,
      },
      {
        title: "NIRF",
        body: "National Institutional Ranking Framework. Rank band to be confirmed.",
        badge: img(`${A}/accreditation/nirf.webp`, "NIRF logo", 170, 170),
        source: "Accreditation & Ranking in 2025, admissions page",
        verified: false,
      },
    ],
    facts: [
      { value: 29, label: "Years of Excellence" },
      { value: 16, suffix: "K+", label: "Alumni" },
      { value: 1424, suffix: "+", label: "Students Placed" },
      { value: 432, label: "Companies Visited" },
    ],
    factsNote: "As published on the official admissions page.",
    image: OFFICIAL.clubs,
    collaborationsHeading: "Global Academic Celebration",
    // Order and logos as on the live page; names read from the logo artwork.
    collaborations: [
      collaboration("Harvard Medical School", "harvard-medical-school.png"),
      collaboration("National Taipei University of Technology", "taipei-tech.png"),
      collaboration("UC Davis", "uc-davis.png"),
      collaboration("La Trobe University", "la-trobe-university.png"),
      collaboration("Illinois Tech", "illinois-tech.png"),
    ],
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
    heading: "Alumni Testimonials",
    intro: "Where Easwari graduates have gone, in their own words, as shared on the official admissions page.",
    note: "Quotes, names and photos as published on the official admissions page.",
    items: [
      {
        name: "Aswanth Ram A S",
        programme: "M.S. in Electrical & Computer Engg. Illinois Institute of Technology,Chicago",
        quote:
          "Easwari Engineering college, a place where I was able to connect and build my career, and the reason why I am here now with multiple PhD offers from ivy leagues in USA.",
        photo: img(`${A}/testimonials/aswanth-ram-a-s.png`, "Aswanth Ram A S", 254, 203),
      },
      {
        name: "Kishore V",
        programme: "B.E. Electrical and Electronics Engineering",
        year: "2017",
        role: "Engineer, Sosaley Technologies",
        quote:
          "Easwari Engineering College is probably one of the best college in Chennai, I am a 2017 passed out student and I did my B.E, Electrical and Electronics Engineering (EEE) here, The EEE dept.",
        photo: img(`${A}/testimonials/kishore-v.png`, "Kishore V", 216, 247),
      },
      {
        name: "Kisshore Kumar S",
        programme: "Alumnus",
        role: "EAS Niche HCM Team: Data Conversion Workday",
        quote:
          "Easwari Engineering College, has provided various opportunities to excel in academics through live projects, assignments and industry exposure through field work which has enhanced my managerial skill",
        photo: img(`${A}/testimonials/kisshore-kumar-s.png`, "Kisshore Kumar S", 121, 122),
      },
      {
        name: "Mr Sathish Thyagarajan",
        programme: "MBA",
        role: "Principal Business Analyst (Banking Domain)",
        quote: "MBA programme in SRM Eeswari was taught in a way that encourages students to think critically.",
        photo: img(`${A}/testimonials/sathish-thyagarajan.png`, "Sathish Thyagarajan", 163, 143),
      },
      {
        name: "Mr. Venky",
        programme: "Mechanical Engineering",
        quote:
          "Mechanical Engineering department had a vision to improve the competitiveness and knowledge of the students through conducting continuous knowledge transfer with industrial and academic experts.",
        photo: img(`${A}/testimonials/venky.jpg`, "Venky", 427, 427),
      },
    ],
  },

  campusLife: {
    heading: "Campus life",
    intro: "Concerts, clubs and a community that keeps the campus busy all year.",
    items: [
      { title: "Vibrant campus life", body: "Live music and cultural nights.", media: OFFICIAL.campusLife },
      { title: "Students Clubs", body: "Clubs that bring classes together.", media: OFFICIAL.clubs },
      { title: "Placement in Top MNC’s", body: "Preparing for placements in top MNCs.", media: OFFICIAL.placementMnc },
      { title: "Technical symposiums", media: aiImage("eec", "symposium", "Students presenting a research poster to judges") },
      { title: "Sports", media: aiImage("eec", "sports", "College cricket match on a green ground") },
    ],
  },

  process: {
    heading: "Steps to Apply",
    intro: "Five steps to complete your application on the official Easwari portal.",
    indicative: false,
    // Step labels verbatim from the official "Steps to Apply" graphic.
    steps: [
      { title: "Register Yourself", body: "Step 1" },
      { title: "Verify Mobile No. & Email-ID", body: "Step 2" },
      { title: "Fill Application Form", body: "Step 3" },
      { title: "Upload Required Documents", body: "Step 4" },
      { title: "Submit Application Form", body: "Step 5" },
    ],
  },

  faqs: [
    {
      q: "Which programmes does Easwari Engineering College offer?",
      a: "15 UG programmes (B.E. and B.Tech., including Robotics and Automation, Artificial Intelligence and Data Science, Cyber Security and Computer Science and Business System with TCS partnership) and 8 PG options (M.E., MBA, MCA and Ph.D. in all disciplines).",
    },
    {
      q: "What is the eligibility for B.E. / B.Tech.?",
      a: `${UG_ELIG} PG eligibility: ${PG_ELIG}.`,
    },
    {
      q: "Is the college autonomous?",
      a: "Yes. Easwari Engineering College is an autonomous institution affiliated to Anna University.",
    },
    {
      q: "How do I apply?",
      a: "Register yourself on the official Easwari portal, verify your mobile number and email ID, fill the application form, upload the required documents and submit the application form. Transfer admissions can also be enquired about through the portal.",
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
    address: "Bharathi Salai, Ramapuram, Chennai - 600089, Tamil Nadu.",
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
    image: { ...OFFICIAL.greenCampus, alt: "Easwari campus" },
  },

  footer: {
    tagline: "Inspiring you towards excellence and a bright future.",
    social: [],
    privacyUrl: null,
    termsUrl: null,
  },
};
