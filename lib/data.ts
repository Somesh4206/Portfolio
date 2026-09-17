export const SITE = {
  name: "Somesh M",
  role: "AI Developer • Full Stack Engineer • Cybersecurity Enthusiast",
  tagline: "Building intelligent systems.",
  description:
    "Somesh M is a Computer Science and Business Systems student and developer in India building AI-powered, full-stack and intelligent software systems — RAG applications, web platforms and mobile apps.",
  url: "https://somesh-m.vercel.app/",
  github: "https://github.com/Somesh4206/",
  linkedin: "https://www.linkedin.com/in/somesh4206/",
  leetcode: "https://leetcode.com/u/somesh-m/",
  hackerrank: "https://www.hackerrank.com/profile/someshm7662",
  /** Public contact address used ONLY for the visible "Email me" mailto link. */
  email: "someshm7662@gmail.com",
} as const;

export type ProjectLink = { label: string; href: string };

export type ProjectScreenshot = { src: string; width: number; height: number; alt: string };

export type Project = {
  id: string;
  index: string;
  name: string;
  tagline: string;
  description: string;
  problem: string;
  solution: string;
  contribution: string;
  stack: string[];
  features: string[];
  links: ProjectLink[];
  screenshots?: ProjectScreenshot[];
  visual: "skillvision" | "blueprint" | "diagnorax" | "jedu" | "support" | "game";
  note?: string;
};

export const PROJECTS: Project[] = [
  {
    id: "skillvision-ai",
    index: "01",
    name: "SkillVision AI",
    tagline: "Intelligent Career & Skill Intelligence System",
    description:
      "An AI-powered career copilot and placement platform — real-time resume parsing, ATS scoring, skill-gap analysis, milestone roadmaps, mock interviews, and AI job matching, powered by Google Gemini.",
    problem:
      "Job seekers can't see how their skills map to real roles, and generic career advice ignores what's actually on their resume.",
    solution:
      "SkillVision parses resumes into structured profiles, scores ATS compatibility, maps skill gaps against target roles, and generates milestone roadmaps, mock interviews, and matched job leads — with RAG retrieval grounding its guidance.",
    contribution:
      "Designed and built the platform — resume parsing and ATS scoring flows, skill radar and gap logic, roadmap and interview modules, job-matching engine, and RAG-grounded career guidance.",
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Express", "Google Gemini API"],
    features: [
      "ATS resume scoring (0–100) + parsing",
      "Skill radar + gap identification",
      "Milestone roadmaps + streaks",
      "Mock interview arena with AI critique",
      "AI job matching + application tracking",
      "RAG-based knowledge retrieval",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/Somesh4206/SkillVision" },
      { label: "Live Demo", href: "https://skillvisionai.onrender.com" },
    ],
    screenshots: [
      { src: "/projects/skillvision-ai/dashboard-preview.jpg", width: 1376, height: 768, alt: "SkillVision placement cockpit and analytics dashboard" },
      { src: "/projects/skillvision-ai/interview-preview.jpg", width: 1376, height: 768, alt: "SkillVision AI mock interview arena" },
      { src: "/projects/skillvision-ai/job-matcher-preview.jpg", width: 1376, height: 768, alt: "SkillVision AI job matching hub" },
    ],
    visual: "skillvision",
  },
  {
    id: "openblueprint",
    index: "02",
    name: "OpenBlueprint",
    tagline: "From Measurements to Intelligent Blueprints.",
    description:
      "An AI-powered architectural planning and preliminary blueprint generation platform for homes — plot dimensions in, editable floor plans out, with 2D editing, 3D visualization, cost estimation, and an AI design assistant.",
    problem:
      "Early-stage home planning is guesswork: room needs, plot constraints, light, ventilation, and cost are reasoned about separately, if at all.",
    solution:
      "OpenBlueprint turns natural-language requirements into structured constraints, generates five design strategies with a zone-based BSP layout engine, and offers a CAD-like 2D editor, clay-render 3D views, INR cost estimation, and a RAG knowledge assistant.",
    contribution:
      "Designed and built the platform — strategy generation, BSP-based layout logic, 2D editor tooling, 3D visualization, cost estimation, and the AI/RAG assistants.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "AI APIs", "3D Visualization"],
    features: [
      "5 strategies incl. Vastu-compliant + BSP engine",
      "CAD-like 2D editor + 45-item furniture library",
      "Clay-render 3D visualization",
      "INR cost estimator with 4 build grades",
      "Natural-language AI design assistant",
      "RAG architectural knowledge assistant + export",
    ],
    links: [{ label: "GitHub", href: "https://github.com/Somesh4206/OpenBlueprint" }],
    screenshots: [
      { src: "/projects/openblueprint/workspace-2d.png", width: 1440, height: 900, alt: "OpenBlueprint interactive 2D blueprint editor" },
      { src: "/projects/openblueprint/workspace-3d.png", width: 1440, height: 900, alt: "OpenBlueprint 3D home visualization" },
      { src: "/projects/openblueprint/cost-estimator.png", width: 1440, height: 900, alt: "OpenBlueprint construction cost estimator" },
    ],
    visual: "blueprint",
    note: "Preliminary layouts for exploration — not a substitute for a licensed architect.",
  },
  {
    id: "diagnorax",
    index: "03",
    name: "DiagnoraX",
    tagline: "Your Personal AI Health Companion",
    description:
      "An AI-powered health companion for symptom understanding, doctor discovery, prescription processing, medicine reminders, and lab-report analysis — begun as a React web app and converted to a Flutter mobile app. Built during a Machine Learning internship at Brainery Spot Technologies.",
    problem:
      "Health information is scattered across prescriptions, lab reports, and memory — hard to organize, easy to misunderstand.",
    solution:
      "DiagnoraX centralizes the everyday health workflow: an AI symptom checker with severity and next-step guidance, body-composition analysis, doctor recommendations, prescription OCR, interaction warnings, reminders, and report analysis — with Firebase auth and data throughout.",
    contribution:
      "Built DiagnoraX end-to-end during my ML internship — the React web app and its Flutter conversion, Firebase auth and Firestore data, and Gemini-powered assistance flows.",
    stack: ["Flutter", "Dart", "React", "Firebase", "Firestore", "Google Gemini API"],
    features: [
      "AI symptom checker + next-step guidance",
      "Doctor recommendation + body analysis",
      "Prescription OCR + medicine reminders",
      "Interaction warnings + lab-report analysis",
    ],
    links: [{ label: "GitHub", href: "https://github.com/Somesh4206/DiagnoraX-App" }],
    visual: "diagnorax",
    note: "A software project for organizing health information — not professional medical diagnosis.",
  },
  {
    id: "jeduai-connect",
    index: "04",
    name: "JeduAI Connect",
    tagline: "Smart Learning and Language Empowerment",
    description:
      "A multilingual educational platform that improves communication and learning through online classes, AI-assisted attendance, translation, and role-based access for students, teachers, and admins.",
    problem:
      "Language barriers and manual classroom admin slow down learning in multilingual classrooms.",
    solution:
      "JeduAI Connect pairs live classes with AI assistance — attendance automation, translation, and multilingual learning paths — coordinated across student, teacher, and admin roles.",
    contribution:
      "Designed the multi-role experience and built the Flutter client with Firebase-backed classes, attendance, and translation flows.",
    stack: ["Flutter", "Dart", "AI APIs", "Firebase"],
    features: [
      "Student / Teacher / Admin roles",
      "Online classes + AI-assisted attendance",
      "Translation + multilingual learning",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/Somesh4206/JeduAI" },
      { label: "Live Demo", href: "https://jeduai-connect.netlify.app" },
      { label: "Android APK", href: "https://drive.usercontent.google.com/download?id=1HthWUYS96OI2fh8-SLpyDQl20pb59Ltc&export=download&authuser=0&confirm=t&uuid=8970889b-7c4c-4eff-8266-c136ddc01e45&at=AMrWOn0yi_Wc8XpUL59xFWtqWWvB%3A1789634457840" },
    ],
    visual: "jedu",
  },
  {
    id: "applesupport-ai",
    index: "05",
    name: "AppleSupport AI",
    tagline: "AI Customer Support Intelligence",
    description:
      "An AI support-agent project that reconstructs customer-support conversations, retrieves relevant responses, classifies requests, and flags cases needing human escalation — with LLM evaluation and human validation.",
    problem:
      "Support teams drown in conversations with no systematic way to know what was asked, what worked, and what needs a human.",
    solution:
      "A retrieval pipeline over reconstructed conversations — TF-IDF baseline vs. embeddings, RAG retrieval, classification, and an explicit escalation policy, evaluated by LLMs and validated by humans.",
    contribution:
      "Built the conversation-reconstruction and retrieval pipeline, classification and escalation logic, and the evaluation harness.",
    stack: ["Python", "Jupyter Notebook", "RAG", "Embeddings", "TF-IDF", "LLM Evaluation"],
    features: [
      "Conversation reconstruction + classification",
      "TF-IDF baseline vs. embeddings",
      "RAG retrieval + escalation policy",
      "LLM evaluation + human validation",
    ],
    links: [{ label: "GitHub", href: "https://github.com/Somesh4206/hiver-support-agent/" }],
    visual: "support",
  },
  {
    id: "adventure-game",
    index: "06",
    name: "Adventure Game",
    tagline: "“The Archive” — full-stack text adventure",
    description:
      "A full-stack text adventure game, “The Archive,” with a Spring Boot backend, React frontend, MySQL database, and JWT authentication — three playable chapters, an achievements system, and a leaderboard. Live demo linked below.",
    problem:
      "Game feel alone doesn't make a product: accounts, persistent progress, and competition need real backend engineering behind the story.",
    solution:
      "A Java/Spring Boot API with JWT-secured accounts over MySQL, a React client rendering three story chapters, and achievement and leaderboard systems layered on top.",
    contribution:
      "Designed and built the full stack — API, schema, auth, game client, chapters, achievements, and leaderboard — and shipped a live demo.",
    stack: ["Java", "Spring Boot", "React", "JavaScript", "MySQL", "JWT"],
    features: [
      "Three playable story chapters",
      "JWT authentication + accounts",
      "Achievements system",
      "Leaderboard",
      "Deployed live demo",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/Somesh4206/adventure-game" },
      { label: "Live Demo", href: "https://adventure-game-navy.vercel.app" },
    ],
    visual: "game",
  },
];

export type SkillItem = { name: string; blurb: string };

export const SKILL_CLUSTERS: { title: string; items: SkillItem[] }[] = [
  {
    title: "Languages",
    items: [
      { name: "Python", blurb: "APIs, ML pipelines, automation" },
      { name: "Java", blurb: "OOP, DSA, coursework depth" },
      { name: "JavaScript", blurb: "Interactive web interfaces" },
      { name: "Dart", blurb: "Flutter app development" },
    ],
  },
  {
    title: "AI / ML",
    items: [
      { name: "Machine Learning", blurb: "Models, evaluation, iteration" },
      { name: "Generative AI", blurb: "LLM-powered product features" },
      { name: "RAG", blurb: "Retrieval over real knowledge" },
      { name: "LLM APIs", blurb: "Gemini and friends in prod" },
    ],
  },
  {
    title: "Development",
    items: [
      { name: "React", blurb: "Component-driven interfaces" },
      { name: "Flutter", blurb: "Cross-platform mobile apps" },
      { name: "Express", blurb: "Lightweight service backends" },
      { name: "Firebase", blurb: "Auth, Firestore, hosting" },
      { name: "Tailwind CSS", blurb: "Design systems in code" },
    ],
  },
  {
    title: "Tools",
    items: [
      { name: "Git", blurb: "Version control, collaboration" },
      { name: "Docker", blurb: "Reproducible environments" },
    ],
  },
];

export const EXPERIENCE = [
  {
    period: "2026",
    role: "Machine Learning Intern",
    org: "Brainery Spot Technologies",
    detail:
      "ML-focused development — designed and built DiagnoraX, an AI-powered health companion, during the internship.",
  },
  {
    period: "2025",
    role: "Full Stack Development Intern",
    org: "Nandha Info Tech",
    detail:
      "Frontend and backend web development modules — practical experience building and shipping web applications.",
  },
];

export const CERTIFICATIONS = [
  { title: "Python Programming", org: "Course certification" },
  { title: "Programming in Java", org: "NPTEL" },
  { title: "Introduction to Generative AI", org: "Coursera" },
  { title: "Introduction to IoT and Digital Transformation", org: "NASSCOM" },
  { title: "Becoming an Agentforce Champion", org: "Salesforce · 2025" },
  { title: "Becoming an Agentforce Champion", org: "Salesforce · 2026" },
];

export const MILESTONES = [
  { value: "100+", label: "DSA problems solved" },
  { value: "100-day", label: "LeetCode streak" },
  { value: "02", label: "Engineering internships" },
  { value: "06", label: "Shipped projects" },
  { value: "RAG", label: "AI retrieval workflows" },
];

export const NAV = [
  { n: "01", label: "Home", href: "/#home" },
  { n: "02", label: "About", href: "/#about" },
  { n: "03", label: "Work", href: "/#work" },
  { n: "04", label: "Experience", href: "/#experience" },
  { n: "05", label: "Contact", href: "/#contact" },
] as const;
