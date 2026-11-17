import type { Institution } from "@/types/institution";
import { group, PENDING_SCHOLARSHIP } from "./helpers";

/**
 * SRMIST – Ramapuram
 * Source: https://registration.srmrmp.edu.in/ (audited 2026-11-17).
 * The main site www.srmrmp.edu.in blocked automated access, so facts that only
 * appeared there are marked as pending / to be confirmed.
 */

const ENG_UG = "60% minimum in Physics, Chemistry & Mathematics (PCM / PMO) in 10+2.";
const ENG_UG_BIO = "60% minimum in PCM / PCB or PMB / PCB in 10+2.";
const FLABS_ANY = "Pass in 10+2 (any group) with 50% aggregate.";

export const ramapuram: Institution = {
  key: "rmp",
  route: "/srmist-ramapuram",
  name: "SRM Institute of Science and Technology, Ramapuram",
  shortName: "SRMIST Ramapuram",
  legalLine: "Deemed to be University u/s 3 of UGC Act, 1956",
  city: "Chennai",
  logo: {
    src: "/img/rmp/logo.png",
    alt: "SRM Institute of Science & Technology, Chennai Ramapuram",
    width: 2294,
    height: 995,
  },
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
    title: "SRMIST Ramapuram Admissions 2027–28 | Engineering, Architecture, Liberal Arts",
    description:
      "Apply to SRM Institute of Science and Technology, Ramapuram, Chennai for 2027–28. Explore B.Tech, M.Tech, B.Arch, B.Des, B.Com, BCA, B.Sc and more. NAAC 'A++' accredited.",
    keywords: [
      "SRMIST Ramapuram admissions 2027",
      "SRM Ramapuram B.Tech",
      "SRM Chennai engineering admission",
      "SRM Ramapuram B.Arch",
    ],
  },

  hero: {
    eyebrow: "Admissions Open 2027–28 · Chennai",
    headline: ["Learn. Leap.", "Lead from Chennai."],
    body:
      "Engineering, architecture, design, commerce and the sciences at SRM Institute of Science and Technology, Ramapuram. A NAAC 'A++' accredited university with a placement record built over decades.",
    image: {
      src: "/img/rmp/students.webp",
      alt: "Two SRMIST engineering students in safety helmets",
      width: 534,
      height: 495,
    },
    secondaryImage: { pending: "Ramapuram campus photograph (wide, landscape)" },
    badges: [
      { src: "/img/rmp/rank-naac.png", alt: "NAAC", width: 115, height: 111 },
      { src: "/img/rmp/rank-mhrd.png", alt: "MHRD-UGC", width: 79, height: 124 },
      { src: "/img/rmp/rank-nirt.png", alt: "NIRF", width: 97, height: 124 },
      { src: "/img/rmp/rank-qs.png", alt: "QS", width: 101, height: 96 },
      { src: "/img/rmp/rank-the.png", alt: "Times Higher Education", width: 195, height: 105 },
      { src: "/img/rmp/rank-shanghai.png", alt: "Shanghai Ranking", width: 220, height: 70 },
    ],
    proof: [
      { value: 5700, suffix: "+", label: "Job offers" },
      { value: 1100, suffix: "+", label: "Companies visited" },
      { value: 55, suffix: " LPA", label: "Highest package" },
    ],
    proofNote: "Placement figures as published on the official Ramapuram admissions page. Batch year to be confirmed.",
  },

  enquiry: {
    heading: "Talk to Ramapuram admissions",
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
    levels: ["UG", "PG"],
    consent:
      "I authorise SRM Institute of Science and Technology, Ramapuram and its representatives to contact me about admissions by email, SMS, WhatsApp or call. This overrides DND/NDNC registration.",
    nextSteps: [
      "A counsellor calls you back on the number you share.",
      "You get guidance on programme choice and eligibility.",
      "When you are ready, you complete the application on the official portal.",
    ],
  },

  why: {
    heading: "A university that prepares you for the job, not just the exam",
    intro:
      "SRMIST combines strong academics with a placement culture that starts early. Here is what Ramapuram offers.",
    source: "registration.srmrmp.edu.in",
    items: [
      {
        title: "Academic reputation",
        body: "SRM Institute of Science and Technology is accredited by NAAC with the highest 'A++' grade and placed in Category 1 with 12B status by MHRD-UGC.",
      },
      {
        title: "Ranked nationally",
        body: "SRMIST is ranked 11th nationally in the universities category by NIRF, as stated on the official admissions page.",
      },
      {
        title: "Placement-led learning",
        body: "5700+ job offers and 1100+ companies visiting, with a highest package of 55 LPA published on the admissions page.",
      },
      {
        title: "Breadth of choice",
        body: "Engineering, architecture, design, liberal arts, commerce, computing and management on one campus.",
      },
      {
        title: "Industry-aligned specialisations",
        body: "B.Tech specialisations in AI & ML, cloud computing, cyber security, gaming technology, IoT and big data analytics, plus Computer Science and Business Systems (TCS).",
      },
      {
        title: "Located in Chennai",
        body: "Study in Ramapuram, Chennai, one of India's major technology and manufacturing cities.",
      },
    ],
  },

  programmes: {
    heading: "Find your programme",
    intro: "Every programme listed below appears on the official Ramapuram admissions page. Filter by level and school, or search by name.",
    footnote:
      "Eligibility summarised from the official admissions page. Approved intake is not shown until confirmed by the institution. Always check the final prospectus before applying.",
    items: [
      ...group(
        { degree: "B.Tech", level: "UG", department: "Engineering & Technology", duration: "4 years", eligibility: ENG_UG },
        [
          ["Biomedical Engineering", { eligibility: ENG_UG_BIO }],
          ["Biomedical Engineering with Specialization in Machine Intelligence", { eligibility: ENG_UG_BIO }],
          ["Biotechnology", { eligibility: ENG_UG_BIO }],
          "Civil Engineering",
          "Computer Science and Engineering",
          "Artificial Intelligence",
          "Computer Science and Engineering (Data Science)",
          "Computer Science and Business Systems (TCS)",
          "CSE with Specialization in Artificial Intelligence and Machine Learning",
          "CSE with Specialization in Cloud Computing",
          "CSE with Specialization in Gaming Technology",
          "CSE with Specialization in Big Data Analytics",
          "CSE with Specialization in Internet of Things",
          "CSE with Specialization in Cyber Security",
          "Electronics and Communication Engineering with Specialization in Data Science",
          "Electrical and Electronics Engineering",
          "Electronics and Communication Engineering",
          "Information Technology",
          "Mechanical Engineering",
          "Mechanical Engineering with Specialization in Artificial Intelligence and Machine Learning",
        ],
      ),
      ...group(
        {
          degree: "M.Tech",
          level: "PG",
          department: "Engineering & Technology",
          eligibility: "Minimum aggregate of 50% in the qualifying degree (programme-specific conditions apply).",
        },
        [
          "Computer Science and Engineering",
          "CSE with Specialization in AI and ML",
          "Data Science",
          "Cyber Security",
          "Electric Vehicle Technology",
          "Computer Aided Design",
          "Construction Engineering and Management",
          "Structural Engineering",
        ],
      ),
      ...group(
        {
          degree: "B.Arch",
          level: "UG",
          department: "Architecture & Design",
          duration: "5 years",
          eligibility:
            "50% aggregate in 10+2 with PCM, or 10+3 Diploma with Mathematics, plus the Council of Architecture aptitude test.",
        },
        ["Architecture"],
      ),
      ...group(
        {
          degree: "B.Des",
          level: "UG",
          department: "Architecture & Design",
          duration: "4 years",
          eligibility: "50% in 10+2 (any stream). UCEED score gets preference.",
        },
        ["Interior Design", "Industrial Design"],
      ),
      ...group(
        {
          degree: "M.Arch",
          level: "PG",
          department: "Architecture & Design",
          duration: "2 years",
          eligibility: "50% in B.Arch, plus PG NATA.",
        },
        ["Architecture and Construction Project Management"],
      ),
      ...group(
        { degree: "B.Com", level: "UG", department: "Liberal Arts & Business Studies", duration: "3 years", eligibility: FLABS_ANY },
        [
          "Commerce",
          "Corporate Secretaryship",
          "Accounting and Finance",
          "Information Systems and Management",
          "Professional Accounting",
          "Strategic Finance",
          "International Accounting & Finance",
          "Logistics",
          "Computer Applications",
          "Banking, Financial Services and Insurance",
          "Business Analytics",
          "Fintech",
          "Finance and Taxation (with CA coaching)",
        ],
      ),
      ...group(
        { degree: "B.A", level: "UG", department: "Liberal Arts & Business Studies", duration: "3 years", eligibility: FLABS_ANY },
        ["English", "Journalism and Mass Communication"],
      ),
      ...group(
        {
          degree: "BCA",
          level: "UG",
          department: "Liberal Arts & Business Studies",
          duration: "3 years",
          eligibility: "10+2 with Mathematics or computer-related subjects, or a Diploma in Engineering.",
        },
        ["Computer Applications", "Data Science", "Computer Applications with Specialization in Generative AI"],
      ),
      ...group(
        { degree: "B.Sc", level: "UG", department: "Liberal Arts & Business Studies", duration: "3 years", verified: true },
        [
          "Biotechnology",
          "Computer Science",
          "Computer Science with Specialization in Cyber Security",
          "Computer Science with Specialization in Artificial Intelligence and Machine Learning",
          "Computer Science with Specialization in Agentic AI",
          "Computer Science with Specialization in Data Science",
          "Mathematics with Specialization in Computational Finance",
          "Statistics",
          "Visual Communication",
          "Visual Communication with Specialization in Artificial Intelligence",
          "Artificial Intelligence and Animation",
          "Hotel and Hospitality Administration",
          ["Digital Film Technology", { eligibility: "40% aggregate in 10+2." }],
          "Fashion Designing",
          "Psychology",
        ],
      ),
      ...group(
        {
          degree: "M.A / M.Com",
          level: "PG",
          department: "Liberal Arts & Business Studies",
          duration: "2 years",
          eligibility: "UG degree with 50% (M.Com requires Commerce and Accountancy / Business Studies as major subjects).",
        },
        [
          ["English", { degree: "M.A" }],
          ["Commerce", { degree: "M.Com" }],
          ["Accounting and Finance", { degree: "M.Com" }],
        ],
      ),
      ...group(
        {
          degree: "MCA",
          level: "PG",
          department: "Liberal Arts & Business Studies",
          duration: "2 years",
          eligibility: "A pass in BCA / B.Sc Computer Science / B.Sc (full criteria to be confirmed).",
        },
        ["Computer Applications"],
      ),
      ...group(
        { degree: "BBA", level: "UG", department: "Management", verified: false, notes: "Listed in summary content only. Confirm before launch." },
        ["Business Administration", "Data Science"],
      ),
      ...group(
        {
          degree: "MBA",
          level: "PG",
          department: "Management",
          verified: false,
          eligibility: "Bachelor's degree with 50%, followed by SRMJEEM and interview (to be confirmed).",
          notes: "Listed in summary content only. Confirm before launch.",
        },
        ["Business Administration", "AI and Data Science", "Business Analytics"],
      ),
    ],
  },

  placements: {
    heading: "Placements that open doors",
    intro: "A placement culture that starts in your first year and peaks with offers from product, consulting and core engineering companies.",
    stats: [
      { value: 5700, suffix: "+", label: "Job offers" },
      { value: 1100, suffix: "+", label: "Companies visited" },
      { value: 55, suffix: " LPA", label: "Highest package" },
    ],
    scopeNote:
      "Figures as published on the official Ramapuram admissions page. Whether they are campus-specific or SRMIST-wide, and the batch year, are pending confirmation. Placement percentage and average package are not shown because they are not yet verified.",
    records: [],
    recordsNote: "Named student placement highlights will appear here once approved (with student consent).",
    recruiters: { pending: "Approved recruiter logos and names for SRMIST Ramapuram" },
    careerDevelopment: [
      { title: "Career Development", body: "Placement training and preparation integrated with the academic calendar. Details pending confirmation." },
      { title: "Internships", body: "International internship opportunities are referenced on the admissions page. Details pending confirmation." },
      { title: "Start-up support", body: "Support for innovation and start-ups is part of the campus offering." },
    ],
  },

  industry: {
    heading: "Industry, built into the curriculum",
    intro: "Specialisations co-designed with industry partners, and exposure that grows each year you study.",
    highlights: [
      {
        title: "Computer Science and Business Systems (TCS)",
        body: "A B.Tech programme offered in association with TCS, blending computer science with business.",
        source: "Programme list, official admissions page",
      },
      {
        title: "Semester abroad",
        body: "Semester abroad opportunities are referenced on the admissions page. Partner countries to be confirmed.",
        source: "Admissions page summary (to be confirmed)",
      },
      {
        title: "Innovation & start-ups",
        body: "Support for student innovation and start-ups.",
        source: "Admissions page summary (to be confirmed)",
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
    intro: "Laboratories, libraries and residential facilities for a full university experience.",
    items: [
      { title: "Advanced laboratories", description: "Engineering and research laboratories.", media: { pending: "Ramapuram laboratory photograph" } },
      { title: "Digital library", description: "Library and digital resources.", media: { pending: "Ramapuram library photograph" } },
      { title: "Smart classrooms", description: "Technology-enabled classrooms.", media: { pending: "Ramapuram classroom photograph" } },
      { title: "Hostels", description: "Hostel facilities on campus.", media: { pending: "Ramapuram hostel photograph" } },
      { title: "Sports facilities", description: "Indoor and outdoor sports.", media: { pending: "Ramapuram sports photograph" } },
      { title: "Innovation centre", description: "Spaces for innovation and start-ups.", media: { pending: "Ramapuram innovation centre photograph" } },
    ],
  },

  academics: {
    heading: "Recognised for academic excellence",
    intro: "Accreditations and rankings of SRM Institute of Science and Technology, as stated on the official admissions page.",
    caution:
      "The admissions page headline also says '#1 University in India', which conflicts with the NIRF rank shown here. That claim is left out until the institution confirms its basis.",
    accreditations: [
      {
        title: "NAAC 'A++'",
        body: "Accredited by NAAC with the highest 'A++' grade.",
        badge: { src: "/img/rmp/rank-naac.png", alt: "NAAC logo", width: 115, height: 111 },
        source: "registration.srmrmp.edu.in",
        verified: true,
      },
      {
        title: "Category 1 · 12B",
        body: "Placed in Category 1 with 12B status by MHRD-UGC.",
        badge: { src: "/img/rmp/rank-mhrd.png", alt: "MHRD logo", width: 79, height: 124 },
        source: "registration.srmrmp.edu.in",
        verified: true,
      },
      {
        title: "NIRF · 11th",
        body: "Ranked 11th nationally in the universities category by NIRF (2025, as stated).",
        badge: { src: "/img/rmp/rank-nirt.png", alt: "NIRF logo", width: 97, height: 124 },
        source: "registration.srmrmp.edu.in",
        verified: true,
      },
      {
        title: "QS World Rankings",
        body: "Stated as 'World ranking 1 among 46 Indian universities'.",
        badge: { src: "/img/rmp/rank-qs.png", alt: "QS logo", width: 101, height: 96 },
        source: "registration.srmrmp.edu.in",
        verified: true,
      },
      {
        title: "Shanghai Ranking 2023",
        body: "Stated as 'World ranking 1 among 15 Indian Universities'.",
        badge: { src: "/img/rmp/rank-shanghai.png", alt: "Shanghai Ranking logo", width: 220, height: 70 },
        source: "registration.srmrmp.edu.in",
        verified: true,
      },
      {
        title: "Times Higher Education",
        body: "Named on the admissions page as a ranking agency that ranks SRMIST. Rank details to be confirmed.",
        badge: { src: "/img/rmp/rank-the.png", alt: "Times Higher Education logo", width: 195, height: 105 },
        source: "registration.srmrmp.edu.in",
        verified: false,
      },
    ],
    image: { pending: "Faculty / research photograph, Ramapuram" },
  },

  scholarships: {
    heading: "Scholarships",
    intro: "Merit and need-based support helps more students take up their place. The 2027–28 scholarship policy has not been published on the admissions page yet.",
    items: [
      { category: "Merit scholarships", ...PENDING_SCHOLARSHIP },
      { category: "Sports & co-curricular", ...PENDING_SCHOLARSHIP },
      { category: "Other categories", ...PENDING_SCHOLARSHIP },
    ],
  },

  testimonials: {
    heading: "In their words",
    intro: "Stories from Ramapuram students and alumni.",
    items: [],
    pendingSlots: 3,
    note: "Approved testimonials (photo, quote and consent) are pending from the institution.",
  },

  campusLife: {
    heading: "Life at Ramapuram",
    intro: "Festivals, symposiums, clubs and sport. University life beyond the classroom.",
    items: [
      { title: "Cultural festivals", media: { pending: "Cultural festival photograph" } },
      { title: "Technical symposiums", media: { pending: "Technical symposium photograph" } },
      { title: "Sports", media: { pending: "Sports photograph" } },
      { title: "Student clubs", media: { pending: "Student club photograph" } },
      { title: "Innovation activities", media: { pending: "Hackathon / innovation photograph" } },
    ],
  },

  process: {
    heading: "How admission works",
    intro: "The journey from enquiry to confirmed seat.",
    indicative: true,
    steps: [
      { title: "Explore programmes", body: "Shortlist programmes using the explorer above." },
      { title: "Check eligibility", body: "Confirm subject and percentage requirements for your programme." },
      { title: "Apply online", body: "Register and complete the application on the official SRMIST portal." },
      { title: "Upload documents", body: "Keep your photograph and signature ready to upload." },
      { title: "Entrance / selection", body: "Selection follows the process for your programme (for example PG NATA for M.Arch)." },
      { title: "Counselling & confirmation", body: "Attend counselling and confirm admission by paying fees." },
    ],
    documents: ["Photograph: 200 × 230 px, max 5 MB", "Signature: 140 × 60 px, max 5 MB"],
    payment: "Net banking · Credit / Debit card · UPI · Wallet",
  },

  faqs: [
    {
      q: "What programmes are available at SRMIST Ramapuram?",
      a: "B.Tech (20 programmes and specialisations), M.Tech, B.Arch, B.Des, M.Arch, and liberal arts and business programmes including B.Com, B.A, BCA, B.Sc, M.A, M.Com and MCA. Use the programme explorer on this page to see them all.",
    },
    {
      q: "What is the eligibility for B.Tech?",
      a: "At least 60% in Physics, Chemistry and Mathematics in 10+2 (PCB / PMB variants apply to Biomedical and Biotechnology). Applicants must be at least 16 years 6 months old by 31 July of the 12th board year. Candidates with a gap of more than 3 years after 10+2 are not eligible.",
    },
    {
      q: "How do I apply?",
      a: "Click 'Apply Now' to register on the official SRMIST Ramapuram application portal. You can also submit an enquiry here and a counsellor will guide you.",
    },
    {
      q: "What documents do I need?",
      a: "For the online application, keep a photograph (200 × 230 px, up to 5 MB) and signature (140 × 60 px, up to 5 MB) ready. The counsellor will confirm the documents needed at admission.",
    },
    {
      q: "Are scholarships available?",
      a: "Scholarship details for 2027–28 are not yet published here. Please ask an admission counsellor for the current policy.",
    },
    {
      q: "How can I contact the admission office?",
      a: "Call toll-free 1800 102 1525 or email helpdesk@srmrmp.edu.in.",
    },
    {
      q: "Can I visit the campus?",
      a: "Yes. Submit an enquiry and choose 'Plan a campus visit', and the admissions team will contact you to arrange it.",
    },
    {
      q: "How can I speak with a counsellor?",
      a: "Use 'Talk to a counsellor' anywhere on this page, or call the toll-free number.",
    },
  ],

  contact: {
    address: "Bharathi Salai, Ramapuram, Chennai – 600 089, Tamil Nadu, India",
    addressVerified: false,
    phones: [{ label: "Toll-free", display: "1800 102 1525", tel: "18001021525" }],
    emails: ["helpdesk@srmrmp.edu.in"],
    whatsapp: null,
    mapQuery: "SRM Institute of Science and Technology Ramapuram Chennai",
  },

  finalCta: {
    headline: "Your future starts at Ramapuram.",
    body: "Applications for 2027–28 are open. Apply today, or speak to a counsellor first.",
  },

  footer: {
    tagline: "Learn · Leap · Lead",
    social: [],
    privacyUrl: null,
    termsUrl: null,
  },
};
