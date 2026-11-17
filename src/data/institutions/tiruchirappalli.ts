import type { Institution } from "@/types/institution";
import { group, PENDING_SCHOLARSHIP } from "./helpers";

/**
 * SRMIST – Tiruchirappalli
 * Source: https://registration.srmtrichy.edu.in/ (read verbatim, 2026-11-17).
 */

const BTECH = "60% minimum in PCM / PMO in 10+2 (Physics & Mathematics mandatory).";
const BTECH_BIO = "60% minimum in PCM / PMB / PCB / PCZ in 10+2 (bridge-course rules apply).";
const SCI_MATHS = "10+2 with Mathematics (or Computer Science with Mathematics), 50% aggregate.";
const COMMERCE = "10+2 with Commerce and Accountancy, 50% aggregate.";
const ANY_50 = "10+2 in any group, 50% aggregate.";
const AHS_60 = "60% in PCB in 10+2. Age 17–30.";
const AHS_50 = "50% in PCB in 10+2. Age 17–30.";
const M_AHS = "Relevant UG degree with 50% or CGPA 5.0. Minimum age 21.";

export const tiruchirappalli: Institution = {
  key: "trichy",
  route: "/srmist-tiruchirappalli",
  name: "SRM Institute of Science and Technology, Tiruchirappalli",
  shortName: "SRMIST Tiruchirappalli",
  legalLine: "SRM Institute of Science and Technology · Tiruchirappalli campus",
  city: "Tiruchirappalli",
  logo: {
    src: "/img/trichy/logo.png",
    alt: "SRM Institute of Science and Technology, Tiruchirappalli",
    width: 197,
    height: 92,
  },
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
    title: "SRMIST Tiruchirappalli Admissions 2027–28 | B.Tech, Allied Health, MBA",
    description:
      "Apply to SRM Institute of Science and Technology, Tiruchirappalli for 2027–28. B.Tech, M.Tech, Medicine & Allied Health Sciences, MBA, B.Sc, BCA, B.Com and more.",
    keywords: [
      "SRMIST Trichy admissions 2027",
      "SRM Trichy B.Tech",
      "SRM Tiruchirappalli allied health sciences",
      "SRM Trichy MBA",
    ],
  },

  hero: {
    eyebrow: "Admissions Open 2027–28 · Tiruchirappalli",
    headline: ["Achieve career success", "before you graduate."],
    body:
      "Step into your future at SRM Institute of Science and Technology, Tiruchirappalli. Experience the best of placement and academic excellence on the Trichy–Chennai highway near Samayapuram.",
    image: {
      src: "/img/trichy/banner.webp",
      alt: "Student holding a laptop, ready for campus",
      width: 1000,
      height: 1000,
    },
    proof: [
      { value: 5700, suffix: "+", label: "Job offers" },
      { value: 1100, suffix: "+", label: "Companies visited" },
      { value: 52, suffix: " LPA", label: "Highest package" },
    ],
    proofNote: "As published on the official Tiruchirappalli admissions page. Batch year and campus scope to be confirmed.",
  },

  enquiry: {
    heading: "Get a call from a Trichy counsellor",
    body: "Tell us what you would like to study. We will help with programme choice, eligibility and the application.",
    faculties: {
      label: "Faculty / College",
      options: [
        "Engineering and Technology",
        "FLABS (formerly Science and Humanities)",
        "Hotel Management",
        "Management",
        "Medicine and Allied Health Sciences",
        "Working Professional",
      ],
    },
    levels: ["UG", "PG"],
    consent:
      "I authorise SRM Institute of Science and Technology, Tiruchirappalli and its representatives to contact me with updates and notifications via email, SMS, WhatsApp or call. This will override DND/NDNC.",
    nextSteps: [
      "A counsellor from the Tiruchirappalli campus calls you.",
      "You get guidance on programme, eligibility and entrance requirements.",
      "You complete your application on the official portal.",
    ],
  },

  why: {
    heading: "Why SRM IST Tiruchirappalli",
    intro: "What students value about the Trichy campus, as listed by the institution.",
    source: "registration.srmtrichy.edu.in",
    items: [
      { title: "Fortune 500 placements", body: "Students placed in top companies in India and abroad." },
      { title: "Semester abroad", body: "Semester abroad programme in 9+ countries." },
      { title: "Foreign language coaching", body: "Language coaching to prepare you for global careers." },
      { title: "Innovation & start-ups", body: "Support for student innovation and start-ups." },
      { title: "Fully equipped hostels", body: "Residential facilities on campus." },
      { title: "Vibrant campus life", body: "Art, cultural events and a diverse community." },
      { title: "Located in Trichy", body: "On the Trichy–Chennai highway near Samayapuram." },
      { title: "State-of-the-art infrastructure", body: "Modern academic and residential infrastructure." },
      { title: "Professional clubs", body: "Clubs that build technical and professional skills." },
      { title: "Research labs", body: "Part of SRMIST's 200+ research labs." },
    ],
  },

  programmes: {
    heading: "Programmes for 2027–28",
    intro:
      "Engineering, allied health sciences, management, computing, commerce and humanities. Every programme below is listed on the official Tiruchirappalli admissions page.",
    footnote:
      "Eligibility paraphrased from the official admissions page. Where duration is not shown, it has not been confirmed for 2027–28. Approved intake will be shown once verified.",
    items: [
      ...group(
        { degree: "B.Tech", level: "UG", department: "Engineering & Technology", duration: "4 years", eligibility: BTECH },
        [
          "Artificial Intelligence",
          "Artificial Intelligence and Future Technologies",
          ["Biomedical Engineering", { eligibility: BTECH_BIO }],
          ["Biotechnology", { eligibility: BTECH_BIO }],
          ["Biotechnology with specialisation in Food Technology", { eligibility: BTECH_BIO }],
          ["Food Technology", { eligibility: BTECH_BIO }],
          "Civil Engineering",
          "Computer Science and Engineering",
          "CSE with specialisation in AI and Machine Learning",
          "CSE with specialisation in Big Data Analytics",
          "CSE with specialisation in Block Chain Technology",
          "Computer Science and Business Systems (TCS)",
          "CSE with specialisation in Cyber Security",
          "Computer Science and Engineering (Data Science)",
          "CSE with specialisation in Medical Engineering",
          "CSE with specialisation in Internet of Things",
          "Electronics and Communication Engineering",
          "ECE with specialisation in Data Science",
          "Electronics Engineering (VLSI Design and Technology)",
          "Electrical and Electronics Engineering",
          "Information Technology",
          "Mechanical Engineering",
          "Mechanical Engineering with specialisation in AI and Machine Learning",
          "Software Product Engineering",
        ],
      ),
      ...group(
        {
          degree: "M.Tech",
          level: "PG",
          department: "Engineering & Technology",
          eligibility: "Relevant four-year bachelor's degree, MCA or M.Sc (CSE/IT), with 50%.",
        },
        [
          "Computer Science and Engineering",
          "AI and Machine Learning",
          "Biotechnology",
          [
            "Embedded Systems and VLSI Design",
            { eligibility: "B.E/B.Tech in EEE/ECE/CSE/IT/ICE/EIE or M.Sc Electronics / Physics (Electronics), with 50%." },
          ],
        ],
      ),
      ...group(
        { degree: "B.Sc", level: "UG", department: "Medicine & Allied Health Sciences", duration: "4 years (3 + 1 internship)", eligibility: AHS_60 },
        [
          "Cardiac Care Technology",
          "Cardio Perfusion Technology",
          "Medical Radiology and Imaging Technology",
          "Medical Laboratory Science",
          "Anaesthesia and Operation Theatre Technology",
          "Physician Associates",
          "Dialysis Therapy Technology",
          ["Critical Care Technology", { eligibility: AHS_50 }],
          ["Emergency Medical Technologist (Paramedics)", { eligibility: AHS_50 }],
          ["Respiratory Technology", { eligibility: AHS_50 }],
          ["Nutrition and Dietetics (Honours)", { duration: "4 years incl. 6-month internship", eligibility: "50% in 10+2. Age 17–30." }],
          ["Optometry", { duration: "5 years (4 + 1)", eligibility: "50% in PCB or PCM in 10+2." }],
        ],
      ),
      ...group(
        { degree: "Bachelor", level: "UG", department: "Medicine & Allied Health Sciences", duration: "5 years (4 + 1)" },
        [
          ["Occupational Therapy (BOT)", { degree: "BOT", eligibility: "50% in PCB with a pass in English. NEET required." }],
          ["Physiotherapy (BPT)", { degree: "BPT", eligibility: "50% in PCB. NEET required. Minimum age 17." }],
        ],
      ),
      ...group(
        { degree: "Master", level: "PG", department: "Medicine & Allied Health Sciences", duration: "2 years", eligibility: M_AHS },
        [
          ["Physiotherapy (MPT), 7 specialisations", { degree: "MPT", eligibility: "BPT with 50%. University / State entrance test and interview." }],
          ["Occupational Therapy (M.O.T), 4 specialisations", { degree: "M.O.T", eligibility: "BOT with 50% or CGPA 5.0. Minimum age 21." }],
          ["Optometry", { eligibility: "60% or CGPA 6.0. Minimum age 21." }],
          "Anaesthesia and OT Technology",
          ["Dialysis Therapy (M.DT)", { degree: "M.DT" }],
          "Nutrition and Dietetics",
          "Advance Care Paramedics",
          ["Critical Care Technology", { degree: "M.Sc" }],
          ["Medical Radiography and Imaging Technology (M.RIT)", { degree: "M.RIT" }],
          ["Medical Laboratory Sciences (M.MLS)", { degree: "M.MLS" }],
          ["Respiratory Technology (M.RT)", { degree: "M.RT" }],
          ["Cardiovascular Sciences (Echocardiography)", { degree: "M.Sc" }],
          ["Perfusion Technology (Cardiothoracic Surgery)", { degree: "M.Sc" }],
        ],
      ),
      ...group({ degree: "BBA", level: "UG", department: "Management", eligibility: "50% aggregate in 10+2." }, ["Business Administration"]),
      ...group(
        {
          degree: "MBA",
          level: "PG",
          department: "Management",
          eligibility: "Bachelor's degree with 50%. SRMJEEM and personal interview; CAT / XAT / MAT / GMAT / NMAT / CMAT / TANCET scores considered.",
        },
        ["Business Administration", "Health Care & Hospital Management", "Business Analytics"],
      ),
      ...group(
        { degree: "B.Com", level: "UG", department: "Liberal Arts & Business Studies", eligibility: COMMERCE },
        [
          "General Commerce",
          ["Information Systems and Management", { eligibility: ANY_50 }],
          "Accounting & Finance",
          "Honours & Logistics",
          "Business Analytics",
          "International Accounting and Finance",
          "Banking, Financial Services and Insurance (BFSI)",
          "Computer Applications",
        ],
      ),
      ...group(
        { degree: "B.A", level: "UG", department: "Liberal Arts & Business Studies", eligibility: ANY_50 },
        ["English", "Journalism and Mass Communication"],
      ),
      ...group(
        { degree: "BCA", level: "UG", department: "Liberal Arts & Business Studies", eligibility: SCI_MATHS },
        ["Data Science", "Computer Applications"],
      ),
      ...group(
        { degree: "B.Sc", level: "UG", department: "Liberal Arts & Business Studies", eligibility: SCI_MATHS },
        [
          "Computer Science",
          "Computer Science with specialisation in Cyber Security",
          "Computer Science with specialisation in AI & Machine Learning",
          "Computer Science with specialisation in Agentic AI",
          "Visual Communication",
          "Visual Communication & Artificial Intelligence",
          "Psychology",
          "Biotechnology",
          ["Hotel and Hospitality Administration", { eligibility: "10+2 in any group, 35% aggregate." }],
          ["Fintech", { eligibility: "10+2 in any group, 35% aggregate." }],
        ],
      ),
      ...group(
        { degree: "M.Sc", level: "PG", department: "Liberal Arts & Business Studies", eligibility: "Relevant UG degree (B.Sc CS, BCA, B.Sc IT, B.Sc Maths etc.) with 50%." },
        [
          "Computer Science",
          "Computer Science with specialisation in Cybersecurity",
          "Computer Science with specialisation in AI and Machine Learning",
          "Computer Science with specialisation in Full Stack Development",
          "Applied Data Science",
        ],
      ),
      ...group(
        { degree: "M.Com", level: "PG", department: "Liberal Arts & Business Studies", eligibility: "UG with Commerce and Accountancy / Business Studies as major, 50%." },
        ["Commerce", "Accounting and Finance"],
      ),
      ...group(
        { degree: "MCA", level: "PG", department: "Liberal Arts & Business Studies", eligibility: "BCA / B.Sc CS / B.Sc IT, or B.Sc / B.Com / B.A with Mathematics." },
        ["Computer Applications", "Generative AI"],
      ),
      ...group(
        { degree: "Diploma", level: "Diploma", department: "Hotel Management", eligibility: "SSLC pass." },
        ["Hotel Management & Catering Science"],
      ),
      ...group(
        { degree: "Part-time", level: "UG", department: "Working Professionals" },
        [
          ["Electrical and Electronics Engineering (Part Time)", { degree: "B.Tech" }],
          ["Mechanical Engineering (Part Time)", { degree: "B.Tech" }],
          ["Computer Science and Engineering (Part Time)", { degree: "B.Tech" }],
        ],
      ),
      ...group(
        { degree: "Part-time", level: "PG", department: "Working Professionals" },
        [
          ["Computer Science and Engineering (Part Time)", { degree: "M.Tech" }],
          ["AI and ML (Part Time)", { degree: "M.Tech" }],
          ["Cyber Security (Part Time)", { degree: "M.Tech" }],
          ["Business Administration (Part Time)", { degree: "MBA" }],
        ],
      ),
    ],
  },

  placements: {
    heading: "Outstanding placement record",
    intro: "Students placed in top companies in India and abroad, including Fortune 500 recruiters.",
    stats: [
      { value: 5700, suffix: "+", label: "Job offers" },
      { value: 1100, suffix: "+", label: "Companies visited" },
      { value: 52, suffix: " LPA", label: "Highest package" },
    ],
    scopeNote:
      "Headline figures as published on the official Tiruchirappalli admissions page. The page does not state the year or whether they are campus-specific or SRMIST-wide, so treat them as institution-level until confirmed. Placement percentage and average package are not published.",
    records: [
      { name: "Akila L", programme: "B.Tech ECE", package: "20.7 LPA", batch: "2026" },
      { name: "Amarnath C", programme: "B.Tech CSE (AI&ML)", package: "18 LPA", batch: "2026" },
      { name: "Logeshwari S", programme: "B.Tech ECE", package: "14 LPA", batch: "2026" },
      { name: "Meghavarshini M", programme: "B.Tech CSE (AI&ML)", package: "12.35 LPA", batch: "2026" },
      { name: "Sridevi S", programme: "B.Tech CSE (AI&ML)", package: "12 LPA", batch: "2026" },
      { name: "Bharath Kumar K", programme: "B.Tech CSE (AI&ML)", package: "12 LPA", batch: "2026" },
    ],
    recordsNote: "Department-specific: individual B.Tech student offers, 2026 batch, Tiruchirappalli campus, as published.",
    recruiters: {
      names: [
        "Microsoft", "Amazon", "Google", "Adobe", "Intel", "Atlassian", "Autodesk", "Arista",
        "ARM", "Western Digital", "Cloudera", "Commvault", "Codenation", "MaxLinear", "HyperVerge",
        "TCS", "Infosys", "Wipro", "Capgemini", "CTS", "Tech Mahindra", "L&T", "AB InBev", "Kaleyra",
      ],
      note: "Recruiter names taken from the logo labels on the official admissions page. Logos will be shown once usage is approved.",
    },
    careerDevelopment: [
      { title: "Foreign language coaching", body: "Language training that supports overseas study and global roles." },
      { title: "Professional clubs", body: "Hands-on clubs that build portfolios before placement season." },
      { title: "Start-up support", body: "Support for innovation and student start-ups." },
    ],
  },

  industry: {
    heading: "Connected to industry and the world",
    intro: "Exposure that goes beyond the campus, from global semesters to industry-designed programmes.",
    highlights: [
      {
        title: "Semester abroad in 9+ countries",
        body: "Spend a semester at a partner institution overseas.",
        source: "Why SRM IST Tiruchirappalli, official admissions page",
      },
      {
        title: "Computer Science and Business Systems (TCS)",
        body: "A B.Tech programme offered with TCS.",
        source: "Programme list, official admissions page",
      },
      {
        title: "Software Product Engineering",
        body: "A B.Tech built around how modern software products are designed and shipped.",
        source: "Programme list, official admissions page",
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
    intro: "Residential, academic and dining facilities on the Tiruchirappalli campus.",
    items: [
      {
        title: "Hostels",
        description: "Fully equipped hostel rooms with study desks.",
        media: { src: "/img/trichy/hostel.png", alt: "Hostel room with two study desks and storage", width: 1024, height: 1024 },
      },
      {
        title: "Computer laboratories",
        description: "Computing labs for hands-on practice.",
        media: { src: "/img/trichy/gallery-4.png", alt: "Students working in a computer laboratory", width: 252, height: 252 },
      },
      {
        title: "Dining",
        description: "Spacious campus dining hall.",
        media: { src: "/img/trichy/gallery-1.png", alt: "Campus dining hall with high timber roof", width: 252, height: 252 },
      },
      { title: "Research labs", description: "Research laboratories.", media: { pending: "Trichy research laboratory photograph" } },
      { title: "Library", description: "Central library.", media: { pending: "Trichy library photograph" } },
      { title: "Sports", description: "Sports facilities.", media: { pending: "Trichy sports facilities photograph" } },
    ],
  },

  academics: {
    heading: "Accreditations & rankings",
    intro: "SRM Institute of Science and Technology accreditations and rankings, as stated on the official admissions page.",
    caution:
      "The admissions page also uses the line '#1 University in India', which conflicts with the NIRF rank. It is left out until the institution confirms the basis.",
    accreditations: [
      { title: "NAAC 'A++'", body: "Accredited by NAAC with the highest 'A++' grade.", source: "registration.srmtrichy.edu.in", verified: true },
      { title: "Category 1 · 12B", body: "Placed in Category 1 with 12B status by MHRD-UGC.", source: "registration.srmtrichy.edu.in", verified: true },
      { title: "NIRF 2024 · 11th", body: "Ranked 11th nationally in the universities category by NIRF in 2024.", source: "registration.srmtrichy.edu.in", verified: true },
      { title: "2nd in ARIIA", body: "Ranked 2nd in ARIIA, as stated on the admissions page.", source: "registration.srmtrichy.edu.in", verified: true },
      { title: "QS I-GAUGE Platinum", body: "Honoured with the Platinum Rating by QS I-GAUGE.", source: "Official admissions page banner", verified: true },
      { title: "Shanghai Ranking 2023", body: "Stated as 'World ranking 1 among 15 Indian Universities'.", source: "registration.srmtrichy.edu.in", verified: true },
    ],
    facts: [
      { value: 1985, label: "Established", decimals: 0 },
      { value: 52000, suffix: "+", label: "Students" },
      { value: 3200, suffix: "+", label: "Faculty" },
      { value: 200, suffix: "+", label: "Research labs" },
      { value: 950, suffix: "+", label: "International students" },
    ],
    factsNote: "SRMIST institution-wide figures, as published on the admissions page.",
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
    note: "Approved testimonials (photo, quote and consent) are pending from the institution.",
  },

  campusLife: {
    heading: "Campus life in Trichy",
    intro: "Art and cultural events, professional clubs and a diverse community, in a city with centuries of history.",
    items: [
      {
        title: "Student community",
        body: "A diverse, welcoming community.",
        media: { src: "/img/trichy/gallery-5.png", alt: "Students relaxing together on campus steps", width: 252, height: 252 },
      },
      {
        title: "Trichy, the city",
        body: "Home to the iconic Rockfort.",
        media: { src: "/img/trichy/gallery-2.png", alt: "Rockfort temple, Tiruchirappalli", width: 252, height: 252 },
      },
      { title: "Art & cultural events", media: { pending: "Trichy cultural event photograph" } },
      { title: "Professional clubs", media: { pending: "Trichy club activity photograph" } },
      { title: "Sports", media: { pending: "Trichy sports photograph" } },
    ],
  },

  process: {
    heading: "Admission made simple",
    intro: "From first enquiry to confirmed seat.",
    indicative: true,
    steps: [
      { title: "Explore programmes", body: "Choose from engineering, allied health, management and more." },
      { title: "Check eligibility", body: "Each programme lists its subject and percentage requirements." },
      { title: "Apply online", body: "Register on the official SRMIST Tiruchirappalli portal." },
      { title: "Keep documents ready", body: "Upload your photograph and signature with the application." },
      { title: "Entrance / selection", body: "For example SRMJEEM + interview for MBA, NEET for BPT and BOT." },
      { title: "Counselling & confirmation", body: "Confirm your seat by paying the fee." },
    ],
    documents: ["Photograph: 200 × 230 px, max 5 MB", "Signature: 140 × 60 px, max 5 MB"],
    payment: "Net banking · Credit / Debit card · UPI · Wallet",
  },

  faqs: [
    {
      q: "What programmes are offered at SRMIST Tiruchirappalli?",
      a: "B.Tech (24 programmes), M.Tech, Medicine & Allied Health Sciences (B.Sc, BPT, BOT and masters), BBA, MBA, B.Com, B.A, BCA, B.Sc, M.Sc, M.Com, MCA, a Diploma in Hotel Management and part-time programmes for working professionals.",
    },
    {
      q: "What is the eligibility for B.Tech?",
      a: "10+2 with at least 60% aggregate in three subjects. Physics and Mathematics are mandatory, plus one of Chemistry, Biotechnology, Biology, Computer Science, IT, Informatics Practices, Engineering Graphics, Botany or Zoology.",
    },
    {
      q: "Which entrance exams are required?",
      a: "MBA: SRMJEEM followed by a personal interview (CAT, XAT, MAT, GMAT, NMAT, CMAT and TANCET scores are considered). BPT and BOT: NEET. MPT and MOT: university / State entrance test and interview. Ask a counsellor for other programmes.",
    },
    {
      q: "How can I apply?",
      a: "Click 'Apply Now' to register on the official SRMIST Tiruchirappalli portal, or submit an enquiry here for counsellor support.",
    },
    {
      q: "What documents are required?",
      a: "Keep a photograph (200 × 230 px, max 5 MB) and signature (140 × 60 px, max 5 MB) ready. Fees can be paid by net banking, credit/debit card, UPI or wallet.",
    },
    {
      q: "Are scholarships available?",
      a: "Scholarship details for 2027–28 are not yet published here. A counsellor can share the current policy.",
    },
    {
      q: "How do I contact the admission office?",
      a: "Call toll-free 1800 202 4565 or email helpdesk@ist.srmtrichy.edu.in.",
    },
    {
      q: "Can I visit the campus?",
      a: "Yes. Submit an enquiry with 'Plan a campus visit' and the team will schedule it. The campus is in SRM Nagar on the Trichy–Chennai highway near Samayapuram.",
    },
  ],

  contact: {
    address: "SRM Nagar, Trichy – Chennai Highways, near Samayapuram, Trichy – 621105, Tamil Nadu, India",
    addressVerified: true,
    phones: [{ label: "Toll-free", display: "1800 202 4565", tel: "18002024565" }],
    emails: ["helpdesk@ist.srmtrichy.edu.in"],
    whatsapp: null,
    mapQuery: "SRM Institute of Science and Technology Tiruchirappalli Samayapuram",
  },

  finalCta: {
    headline: "Start your career story in Trichy.",
    body: "Admissions for 2027–28 are open. Apply online, or talk to a counsellor first.",
  },

  footer: {
    tagline: "Learn · Leap · Lead",
    social: [],
    privacyUrl: null,
    termsUrl: null,
  },
};
