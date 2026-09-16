export const SITE = {
  name: "Somesh M",
  role: "AI Developer • Full Stack Engineer • Cybersecurity Enthusiast",
  tagline: "Building intelligent systems.",
  description:
    "Somesh M is a Computer Science and Business Systems student and developer building AI-powered, full-stack and intelligent software systems.",
  url: "https://somesh-m.netlify.app/",
  github: "https://github.com/Somesh4206/",
  linkedin: "https://www.linkedin.com/in/somesh4206/",
  leetcode: "https://leetcode.com/u/somesh-m/",
  hackerrank: "https://www.hackerrank.com/profile/someshm7662",
} as const;

export type ProjectLink = { label: string; href: string };

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
      "An AI-powered platform that helps users understand their skills, analyze resumes, discover career paths, and generate personalized learning journeys.",
    problem:
      "Job seekers can't see how their skills map to real roles, and generic career advice ignores what's actually on their resume.",
    solution:
      "SkillVision combines resume analysis, an ATS scanner and builder, skill-gap detection, and RAG-based knowledge retrieval to turn a resume into a guided career plan.",
    contribution:
      "Designed and built the platform — career analysis flows, skill-gap logic, learning-path generation, resume tooling, and RAG retrieval.",
    stack: ["Python", "React", "RAG", "LLM APIs", "REST APIs", "Vector Retrieval"],
    features: [
      "AI career analysis",
      "Skill-gap identification",
      "Personalized learning paths",
      "Resume analysis",
      "ATS resume scanner + builder",
      "RAG-based knowledge retrieval",
    ],
    links: [{ label: "GitHub", href: "https://github.com/Somesh4206/SkillVision-AI" }],
    visual: "skillvision",
  },
  {
    id: "openblueprint",
    index: "02",
    name: "OpenBlueprint",
    tagline: "From Measurements to Intelligent Blueprints.",
    description:
      "An AI-assisted architectural planning platform for residential layouts — from plot measurements and room requirements to 2D blueprints, 3D visualization, and cost estimation.",
    problem:
      "Early-stage home planning is guesswork: room needs, plot constraints, light, ventilation, and cost are reasoned about separately, if at all.",
    solution:
      "OpenBlueprint runs a guided pipeline — measurements → requirements → AI analysis → design strategies → 2D blueprint → 3D view → cost estimate — using zone-based spatial planning and architectural rules to draft preliminary layouts.",
    contribution:
      "Designed the planning pipeline, zone-based spatial logic, strategy system (space, ventilation, open-plan, privacy, Vastu), and the blueprint-to-cost UX.",
    stack: ["React", "TypeScript", "AI APIs", "3D Visualization", "REST APIs"],
    features: [
      "Plot → requirements → AI analysis flow",
      "5 design strategies incl. Vastu-compliant",
      "Zone-based spatial planning",
      "2D blueprint + 3D visualization",
      "Cost estimation + AI assistant + export",
    ],
    links: [],
    visual: "blueprint",
    note: "Preliminary layouts for exploration — not a substitute for a licensed architect.",
  },
  {
    id: "diagnorax",
    index: "03",
    name: "DiagnoraX",
    tagline: "Your Personal AI Health Companion",
    description:
      "An AI-powered health companion for symptom understanding, doctor discovery, prescription processing, medicine reminders, and lab-report analysis. Built during a Machine Learning internship at Brainery Spot Technologies.",
    problem:
      "Health information is scattered across prescriptions, lab reports, and memory — hard to organize, easy to misunderstand.",
    solution:
      "DiagnoraX centralizes the everyday health workflow: an AI symptom checker with severity and next-step guidance, doctor recommendations, prescription OCR, interaction warnings, reminders, and report analysis.",
    contribution:
      "Built DiagnoraX end-to-end during my ML internship — React/Vite frontend, Firebase auth and data, Express services, and Gemini-powered assistance flows.",
    stack: ["React", "Vite", "Tailwind CSS", "Firebase", "Firestore", "Express", "Google Gemini API"],
    features: [
      "AI symptom checker + next-step guidance",
      "Doctor recommendation + emergency alerts",
      "Prescription OCR + medicine reminders",
      "Interaction warnings + lab-report analysis",
    ],
    links: [],
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
    links: [],
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
    stack: ["Python", "RAG", "Embeddings", "TF-IDF", "LLM Evaluation", "REST APIs"],
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
    tagline: "A small playable experiment",
    description:
      "A compact game project — kept deliberately small next to the main AI systems work.",
    problem: "—",
    solution: "A focused build to practice game logic and interaction.",
    contribution: "Designed and implemented the game.",
    stack: ["JavaScript"],
    features: ["Playable game loop", "Interactive scenes"],
    links: [{ label: "GitHub", href: "https://github.com/Somesh4206/adventure-game" }],
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
  { n: "01", label: "Home", href: "#home" },
  { n: "02", label: "About", href: "#about" },
  { n: "03", label: "Work", href: "#work" },
  { n: "04", label: "Experience", href: "#experience" },
  { n: "05", label: "Contact", href: "#contact" },
] as const;
