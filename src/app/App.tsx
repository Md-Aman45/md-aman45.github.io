import { useState, useEffect, useMemo, useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { Card } from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import { Label } from "./components/ui/label";
import { Progress } from "./components/ui/progress";
import {
  Moon, Sun, Download, Github, Linkedin, Mail,
  Code, Database, Cloud, Wrench, GitBranch, Palette, Home, Layers,
  GraduationCap, Award, Target, Heart, Briefcase, Calendar,
  CheckCircle2, ExternalLink, CheckCircle, Phone, MapPin,
  Send, MessageSquare, Twitter, ChevronUp, ArrowRight,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface TabContent {
  description: string;
  tags: string[];
  stats: [string, string, string, string];
  bullets: string[];
}

interface Project {
  title: string;
  subtitle: string;
  leftColor: string;
  leftItems: { num: string; label: string }[];
  tabs: { design: TabContent; deploy: TabContent; monitor: TabContent };
  github: string;
  live: string;
  docs?: string;
}

// ─── Navigation ───────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "code", label: "Code" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

const BOTTOM_TABS = [
  { id: "home", label: "Home", icon: Home },
  { id: "projects", label: "Projects", icon: Layers },
  { id: "code", label: "Code", icon: Code },
  { id: "contact", label: "Contact", icon: Mail },
];

// ─── Projects Data ───────────────────────────────────────────────────────────

const PROJECTS: Project[] = [
  {
    title: "Interview AI",
    subtitle: "GenAI mock interview platform",
    leftColor: "from-violet-900 to-slate-900",
    leftItems: [
      { num: "01", label: "Gemini API (Resume Analysis)" },
      { num: "02", label: "Groq (Voice Interview)" },
      { num: "03", label: "Web Speech API" },
      { num: "04", label: "MongoDB + JWT Auth" },
      { num: "05", label: "React.js Frontend" },
    ],
    tabs: {
      design: {
        description: "Full-stack AI interview prep platform — users upload a resume PDF and job description to receive a personalized report with match score (0-100), skill gap analysis, 5 role-specific questions, and a 5-day prep plan via Google Gemini with strict JSON schema validation.",
        tags: ["Node.js", "Express.js", "React.js", "MongoDB", "Gemini API", "Groq API", "JWT", "Web Speech API"],
        stats: ["Match score 0–100", "Skill gap analysis", "5 tech questions", "5-day prep plan"],
        bullets: [
          "Gemini API generates personalized report with match score, skill gaps, and behavioral questions",
          "Groq (llama-3.3-70b) powers voice mock interviews — AI speaks, user responds via mic, evaluated in <1s",
          "30-minute session limit with auto-summary if time exceeded on any answer submission",
        ],
      },
      deploy: {
        description: "Node.js/Express backend with MongoDB, JWT auth, and monthly usage limits enforced via dedicated UsageLimits collection — 20 reports, 15 PDFs, 10 mock sessions per user per month.",
        tags: ["Node.js", "MongoDB", "JWT", "Express.js", "React.js"],
        stats: ["20 reports/month", "15 PDF uploads", "10 mock sessions", "Live usage counter"],
        bullets: [
          "Rate-limiting middleware enforces per-user monthly quotas with live UI counter",
          "UsageLimits MongoDB collection tracks reports, PDFs, and mock sessions independently",
          "Session startedAt timestamp stored in DB, backend auto-ends session on timeout",
        ],
      },
      monitor: {
        description: "SpeechSynthesis API for AI voice output, SpeechRecognition for user mic input, Groq evaluates each answer returning score/10, detailed feedback, and ideal answer hint in under 1 second.",
        tags: ["SpeechSynthesis", "SpeechRecognition", "Groq API", "Real-time AI"],
        stats: ["<1s AI evaluation", "Score out of 10", "Ideal answer hints", "Voice + text modes"],
        bullets: [
          "Browser SpeechSynthesis speaks each question aloud — no external TTS needed",
          "SpeechRecognition captures user answer and sends to Groq for instant scoring",
          "Full feedback per answer: score, what went wrong, and ideal answer hint",
        ],
      },
    },
    github: "https://github.com/Md-Aman45/Interview_ai",
    live: "#",
  },
  {
    title: "GrowthAffinity",
    subtitle: "Live MLM production platform",
    leftColor: "from-purple-900 to-slate-900",
    leftItems: [
      { num: "01", label: "API Gateway" },
      { num: "02", label: "Microservices" },
      { num: "03", label: "Redis Cache & Queues" },
      { num: "04", label: "MongoDB" },
      { num: "05", label: "AWS EC2 + Nginx" },
    ],
    tabs: {
      design: {
        description: "Production MLM platform with binary tree placement for left/right referrals and 30-level income generation logic — live at growthaffinitymarketing.com with real users and real transactions.",
        tags: ["Node.js", "MongoDB", "Redis", "API Gateway", "Microservices", "JWT", "RBAC"],
        stats: ["Live production app", "Real users", "30-level income logic", "Binary tree referrals"],
        bullets: [
          "Binary tree referral engine with 30-level commission and Business Volume (BV) calculation",
          "JWT cookie auth with RBAC and centralized error handling across all microservices",
          "Admin dashboard: top-up/withdrawal approval, KYC handling, secure route protection",
        ],
      },
      deploy: {
        description: "AWS EC2 with Nginx reverse proxy, GitHub Actions CI/CD pipeline, Docker containerisation, and Next.js SSR frontend for SEO-critical pages — zero-downtime production releases.",
        tags: ["AWS EC2", "Nginx", "Docker", "GitHub Actions", "Next.js", "CI/CD"],
        stats: ["AWS EC2 hosted", "Nginx reverse proxy", "GitHub Actions CI/CD", "Next.js SSR"],
        bullets: [
          "Docker containerized microservices deployed on AWS EC2 with Nginx",
          "GitHub Actions pipeline for zero-downtime production releases",
          "Next.js SSR frontend for SEO performance on critical landing pages",
        ],
      },
      monitor: {
        description: "Redis caching on leaderboards, centralized error handling, real-time commission audit trails, matching income based on subtree BV, and status/rank reward systems.",
        tags: ["Redis Queues", "Centralized Logging", "AWS CloudWatch"],
        stats: ["Centralized errors", "Queue health checks", "Commission audits", "BV matching income"],
        bullets: [
          "Matching income system based on left/right subtree Business Volume comparison",
          "Status/rank reward system based on direct referrals and team performance",
          "Full audit trail for every commission, referral, and withdrawal transaction",
        ],
      },
    },
    github: "#",
    live: "https://growthaffinitymarketing.com/auth/login",
    docs: "https://drive.google.com/file/d/1TIrWwywBRmeiYyTMt9r7KwDP62wGdS1m/view",
  },
  {
    title: "Finance Dashboard API",
    subtitle: "Backend REST API with RBAC",
    leftColor: "from-emerald-900 to-slate-900",
    leftItems: [
      { num: "01", label: "Node.js / Express.js" },
      { num: "02", label: "MongoDB + Aggregation" },
      { num: "03", label: "JWT + 3-Tier RBAC" },
      { num: "04", label: "Soft Delete + Pagination" },
      { num: "05", label: "Analytics Pipelines" },
    ],
    tabs: {
      design: {
        description: "Complete REST API backend with clean layered architecture — Routes → Controllers → Services → Models — keeping HTTP logic, business logic, and database concerns fully separated.",
        tags: ["Node.js", "Express.js", "MongoDB", "JWT"],
        stats: ["Clean layered arch", "3-tier RBAC", "Soft delete", "Aggregation pipelines"],
        bullets: [
          "JWT auth with Admin/Analyst/Viewer RBAC enforced at route and data query level",
          "Financial transaction CRUD: soft delete, pagination, filter by type/category/date",
          "MongoDB aggregation pipelines for income, expenses, net balance, and monthly trends",
        ],
      },
      deploy: {
        description: "Node.js/Express app with MongoDB, structured with domain-driven folder layout. Routes are registered per domain, middleware handles auth, rate-limiting, and error normalization.",
        tags: ["Node.js", "MongoDB", "Express.js", "Middleware"],
        stats: ["Domain-driven layout", "Auth middleware", "Error normalized", "Rate-limited"],
        bullets: [
          "Middleware pipeline: auth → RBAC → rate-limit → controller → error handler",
          "MongoDB query filtering at data level — Analyst only sees permitted categories",
          "Centralized error handler normalizes all errors to consistent JSON response shape",
        ],
      },
      monitor: {
        description: "Dashboard analytics endpoint returns income, expenses, net balance, and monthly trend data via single aggregation call — optimized for dashboard rendering.",
        tags: ["MongoDB Aggregation", "Dashboard API", "Analytics"],
        stats: ["Single agg query", "Monthly trends", "Net balance calc", "Category breakdown"],
        bullets: [
          "Single aggregation pipeline returns all dashboard metrics in one DB call",
          "Monthly trend array supports chart rendering on the frontend",
          "Category breakdown supports pie-chart data with totals per category",
        ],
      },
    },
    github: "https://github.com/Md-Aman45/finance-dashboard",
    live: "#",
  },
  {
    title: "Microservices — Spring Boot",
    subtitle: "Java microservices architecture",
    leftColor: "from-orange-900 to-slate-900",
    leftItems: [
      { num: "01", label: "Movie Catalog Service" },
      { num: "02", label: "Rating Data Service" },
      { num: "03", label: "Movie Info Service" },
      { num: "04", label: "Eureka Discovery" },
      { num: "05", label: "Spring Cloud Config" },
    ],
    tabs: {
      design: {
        description: "Multi-service Spring Boot system (Movie Catalog, Rating Data, Movie Info) as independent applications with Eureka service discovery and RESTful inter-service communication.",
        tags: ["Java", "Spring Boot", "Eureka", "Spring Cloud Config", "REST APIs"],
        stats: ["3 independent services", "Eureka discovery", "Inter-service REST", "Cloud Config"],
        bullets: [
          "Movie Catalog aggregates data from Rating + Movie Info services via REST calls",
          "Eureka service discovery — services register and find each other dynamically",
          "Spring Cloud Config Server for environment-specific centralized config management",
        ],
      },
      deploy: {
        description: "Each Spring Boot service deploys independently with its own port. Eureka Server runs as a registry; Spring Cloud Config serves environment configs from a Git-backed config repo.",
        tags: ["Spring Boot", "Eureka Server", "Spring Cloud Config", "Git Config"],
        stats: ["Independent deploy", "Git-backed config", "Dynamic registry", "Env-specific config"],
        bullets: [
          "Services register on startup with Eureka — no hardcoded URLs between services",
          "Spring Cloud Config pulls config from Git repo per active profile (dev/prod)",
          "Fault-tolerant patterns handle downstream service failures gracefully",
        ],
      },
      monitor: {
        description: "Fault-tolerant inter-service communication with documented failure scenarios, recovery strategies, and Spring Boot Actuator health endpoints on each service.",
        tags: ["Spring Actuator", "Fault Tolerance", "Circuit Breaker"],
        stats: ["Health endpoints", "Failure docs", "Recovery patterns", "Actuator metrics"],
        bullets: [
          "Documented failure scenarios for each service with recovery playbooks",
          "Spring Boot Actuator exposes /health and /metrics per service",
          "Graceful degradation when downstream service is unavailable",
        ],
      },
    },
    github: "https://github.com/Md-Aman45/Microservices/tree/main/Main%2FLevel-1",
    live: "#",
    docs: "https://drive.google.com/file/d/1vVI0ErN4bA2xXjZyD8rcdUsu8YzroBxd/view",
  },
  {
    title: "Tradeflow",
    subtitle: "Stock trading platform",
    leftColor: "from-blue-900 to-slate-900",
    leftItems: [
      { num: "01", label: "Spring Boot API" },
      { num: "02", label: "JWT + RBAC" },
      { num: "03", label: "PostgreSQL DB" },
      { num: "04", label: "Docker Compose" },
      { num: "05", label: "Flutter App" },
    ],
    tabs: {
      design: {
        description: "Production-grade stock trading REST API with complete trading flow — JWT auth, wallet management, portfolio tracking, buy/sell orders, and transaction history built with Java Spring Boot.",
        tags: ["Java", "Spring Boot", "Spring Security", "PostgreSQL", "Docker", "Flutter"],
        stats: ["Complete trading flow", "JWT + RBAC", "Role: USER/ADMIN", "Global error handling"],
        bullets: [
          "Role-based access control (USER/ADMIN) with Spring Security and JWT",
          "Wallet management, portfolio tracking, and full buy/sell order history",
          "Flutter mobile app with real-time stock updates via WebSocket",
        ],
      },
      deploy: {
        description: "Containerized full application with Docker and Docker Compose with PostgreSQL for one-command deployment. Flutter mobile app targets Android/iOS with real-time data.",
        tags: ["Docker", "Docker Compose", "PostgreSQL", "Flutter", "WebSocket"],
        stats: ["One-command deploy", "Docker Compose", "Zero config setup", "Android + iOS"],
        bullets: [
          "Docker Compose bundles Spring Boot API + PostgreSQL for one-command startup",
          "Global exception handling for clean, consistent API responses",
          "Flutter mobile client in development with WebSocket real-time updates",
        ],
      },
      monitor: {
        description: "Spring Boot Actuator for health checks, structured logging for audit trails, and PostgreSQL query optimization for high-frequency trading data access patterns.",
        tags: ["Spring Actuator", "PostgreSQL", "Structured Logging"],
        stats: ["Health endpoints", "Audit logging", "Query optimized", "Consistent errors"],
        bullets: [
          "Spring Boot Actuator exposes health and metrics endpoints",
          "Transaction audit logs for every buy/sell/wallet operation",
          "PostgreSQL indexing on portfolio and order tables for fast queries",
        ],
      },
    },
    github: "https://github.com/Md-Aman45/Tradeflow",
    live: "#",
  },
];

// ─── Experience Data ──────────────────────────────────────────────────────────

const EXPERIENCES = [
  {
    title: "Freelance Full-Stack Developer",
    company: "Self-Employed — Remote",
    location: "Remote",
    period: "Jan 2024 – Present",
    type: "Freelance",
    accentColor: "from-emerald-500 to-cyan-500",
    typeColor: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300",
    description: "Building and shipping production REST APIs, LLM integrations, and real-time AI pipelines across 4+ client projects.",
    achievements: [
      "Built and maintained production REST APIs across 4 client projects in Python and Node.js serving 500+ users — secure auth, content workflows, and data pipelines",
      "Integrated AI APIs (Groq llama-3.3-70b, Gemini) with prompt engineering and structured JSON output validation for AI-generated content pipelines",
      "Worked with PostgreSQL and MongoDB for user data; built background tasks and async jobs to support content delivery pipelines",
      "Deployed and maintained containerized backend services using Docker on AWS — troubleshooting bugs and resolving performance issues across live production environments",
      "Participated in CI/CD workflows, code reviews, and maintained technical documentation following security and scalable API design best practices",
    ],
    technologies: ["Node.js", "Python", "PostgreSQL", "MongoDB", "Docker", "AWS EC2", "Groq API", "Gemini API", "GitHub Actions"],
  },
];

const CERTIFICATIONS = [
  {
    title: "Deloitte Australia — Technology Job Simulation",
    issuer: "Forage",
    date: "April 2026",
    focus: "Coding & Development",
    href: "https://forage.com",
  },
];

// ─── Skills Data ──────────────────────────────────────────────────────────────

const SKILL_CATEGORIES = [
  {
    title: "Backend",
    icon: Database,
    color: "from-emerald-500 to-teal-500",
    skills: [{ name: "Node.js / Express.js", level: 90 }, { name: "Java / Spring Boot", level: 85 }, { name: "Python / FastAPI", level: 82 }, { name: "REST API Design", level: 92 }, { name: "Microservices / API Gateway", level: 83 }],
  },
  {
    title: "AI / GenAI",
    icon: Code,
    color: "from-purple-500 to-pink-500",
    skills: [{ name: "Groq API (llama-3.3-70b)", level: 88 }, { name: "Google Gemini API", level: 85 }, { name: "Prompt Engineering", level: 90 }, { name: "Web Speech API", level: 85 }, { name: "LangChain (familiar)", level: 65 }],
  },
  {
    title: "Frontend",
    icon: Palette,
    color: "from-blue-500 to-cyan-500",
    skills: [{ name: "React.js / Next.js", level: 85 }, { name: "TypeScript", level: 83 }, { name: "Tailwind CSS", level: 90 }, { name: "Flutter / Dart", level: 72 }, { name: "HTML5 / CSS3", level: 92 }],
  },
  {
    title: "Database",
    icon: Database,
    color: "from-orange-500 to-amber-500",
    skills: [{ name: "MongoDB", level: 88 }, { name: "PostgreSQL", level: 83 }, { name: "Redis (cache & queues)", level: 85 }, { name: "MySQL", level: 78 }, { name: "DynamoDB (familiar)", level: 62 }],
  },
  {
    title: "Cloud & DevOps",
    icon: Cloud,
    color: "from-orange-500 to-red-500",
    skills: [{ name: "AWS (EC2, S3, RDS)", level: 82 }, { name: "Docker / Docker Compose", level: 87 }, { name: "GitHub Actions CI/CD", level: 85 }, { name: "Linux / Ubuntu", level: 80 }, { name: "Eureka + Spring Cloud", level: 75 }],
  },
  {
    title: "Core CS",
    icon: Wrench,
    color: "from-teal-500 to-cyan-500",
    skills: [{ name: "Data Structures & Algorithms", level: 88 }, { name: "System Design (HLD/LLD)", level: 80 }, { name: "OOP & SOLID Principles", level: 87 }, { name: "Microservices Architecture", level: 82 }, { name: "TCP/IP & Networking", level: 75 }],
  },
];

const RECENT_PROBLEMS = [
  { name: "Princess String with Special Operations II", lang: "Java", date: "6/17/2026", difficulty: "Hard" },
  { name: "Princess String with Special Operations I", lang: "Java", date: "6/16/2026", difficulty: "Medium" },
  { name: "Delete the Middle Node of a Linked List", lang: "C++", date: "6/15/2026", difficulty: "Medium" },
  { name: "Merge Intervals", lang: "Java", date: "6/14/2026", difficulty: "Medium" },
  { name: "Maximum Subarray", lang: "Java", date: "6/13/2026", difficulty: "Easy" },
];

// ─── LeetCode Live API ────────────────────────────────────────────────────────

const LC_USERNAME = "AmanOps";
const LC_API = "https://alfa-leetcode-api.onrender.com";

interface LCDifficulty { easy: number; medium: number; hard: number }
interface LCHeatDay { date: string; count: number }
interface LCSubmission { title: string; status: string; lang: string; submittedAt: string }
interface LCStats {
  totalSolved: number;
  ranking: number | null;
  difficulty: LCDifficulty;
  streak: number;
  totalActiveDays: number | null;
  contestRating: number | null;
  contestAttend: number | null;
  heatmap: LCHeatDay[];
  recent: LCSubmission[];
  source: "live" | "partial" | "fallback";
}

function lcLastNDays(n: number) {
  return Array.from({ length: n }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (n - i - 1));
    return d.toISOString().slice(0, 10);
  });
}
function lcFallbackHeatmap(): LCHeatDay[] {
  return Array.from({ length: 112 }, (_, i) => ({ date: `d-${i}`, count: [0,1,2,3,4][(i*7+3)%5] }));
}
function lcReadNum(v: unknown) { const n = Number(v); return Number.isFinite(n) ? n : 0; }
function lcReadDifficulty(raw: unknown): LCDifficulty {
  const r = (raw ?? {}) as Record<string, unknown>;
  const d = { easy: lcReadNum(r.easySolved), medium: lcReadNum(r.mediumSolved), hard: lcReadNum(r.hardSolved) };
  if (d.easy || d.medium || d.hard) return d;
  const lists = [r.totalSubmissions, (r.matchedUserStats as Record<string,unknown>|undefined)?.acSubmissionNum];
  for (const list of lists) {
    if (!Array.isArray(list)) continue;
    for (const item of list as Array<Record<string,unknown>>) {
      const lbl = String(item.difficulty ?? "").toLowerCase();
      if (lbl === "easy") d.easy = lcReadNum(item.count);
      if (lbl === "medium") d.medium = lcReadNum(item.count);
      if (lbl === "hard") d.hard = lcReadNum(item.count);
    }
    if (d.easy || d.medium || d.hard) break;
  }
  return d;
}
function lcParseCalendar(raw: unknown): LCHeatDay[] {
  const r = (raw ?? {}) as Record<string, unknown>;
  const cal = r.submissionCalendar ?? r.calendar;
  let parsed: Record<string, number> = {};
  try { parsed = typeof cal === "string" ? JSON.parse(cal || "{}") : ((cal ?? {}) as Record<string,number>); } catch { parsed = {}; }
  return lcLastNDays(112).map(date => {
    const sec = Math.floor(new Date(`${date}T00:00:00Z`).getTime() / 1000);
    return { date, count: lcReadNum(parsed[String(sec)] ?? parsed[date]) };
  });
}
function lcComputeStreak(hm: LCHeatDay[]) {
  let s = 0;
  for (let i = hm.length - 1; i >= 0; i--) { if (hm[i].count > 0) s++; else if (s > 0) break; }
  return s;
}
const lcFallback: LCStats = {
  totalSolved: 455, ranking: 236167,
  difficulty: { easy: 213, medium: 190, hard: 52 },
  streak: 258, totalActiveDays: 258, contestRating: 2012, contestAttend: 11,
  heatmap: lcFallbackHeatmap(),
  recent: [
    { title: "Process String with Special Operations II", status: "Accepted", lang: "Java", submittedAt: "6/17/2026" },
    { title: "Process String with Special Operations I", status: "Accepted", lang: "Java", submittedAt: "6/16/2026" },
    { title: "Delete Middle Node of Linked List", status: "Accepted", lang: "Java", submittedAt: "6/15/2026" },
  ],
  source: "fallback",
};
async function fetchLC(path: string, ms = 9000) {
  const ctrl = new AbortController();
  const t = window.setTimeout(() => ctrl.abort(), ms);
  try {
    const res = await fetch(`${LC_API}${path}`, { cache: "no-store", signal: ctrl.signal });
    if (!res.ok) throw new Error(`${res.status}`);
    return await res.json() as unknown;
  } finally { window.clearTimeout(t); }
}
async function fetchLCStats(): Promise<LCStats> {
  const [pr, fp, cr, co, re] = await Promise.allSettled([
    fetchLC(`/${LC_USERNAME}`), fetchLC(`/${LC_USERNAME}/profile`),
    fetchLC(`/${LC_USERNAME}/calendar`), fetchLC(`/${LC_USERNAME}/contest`),
    fetchLC(`/${LC_USERNAME}/submission`),
  ]);
  const ok = [pr, fp, cr, co, re].filter(r => r.status === "fulfilled").length;
  if (ok === 0) return lcFallback;
  const full = fp.status === "fulfilled" ? fp.value as Record<string,unknown> : {};
  const cal  = cr.status === "fulfilled" ? cr.value as Record<string,unknown> : full;
  const cont = co.status === "fulfilled" ? co.value as Record<string,unknown> : {};
  const recP = re.status === "fulfilled" ? re.value as Record<string,unknown> : full;
  const diff = lcReadDifficulty(full);
  const hm   = lcParseCalendar(cal);
  const rawList = Array.isArray(recP.submission) ? recP.submission
    : Array.isArray(recP.recentSubmissions) ? recP.recentSubmissions : [];
  return {
    totalSolved: lcReadNum(full.totalSolved) || diff.easy + diff.medium + diff.hard || lcFallback.totalSolved,
    ranking: lcReadNum(full.ranking) || null,
    difficulty: { easy: diff.easy || lcFallback.difficulty.easy, medium: diff.medium || lcFallback.difficulty.medium, hard: diff.hard || lcFallback.difficulty.hard },
    streak: lcReadNum(cal.streak) || lcComputeStreak(hm) || lcFallback.streak,
    totalActiveDays: lcReadNum(cal.totalActiveDays) || null,
    contestRating: cont.contestRating ? Math.round(lcReadNum(cont.contestRating)) : null,
    contestAttend: lcReadNum(cont.contestAttend) || null,
    heatmap: hm.some(d => d.count > 0) ? hm : lcFallback.heatmap,
    recent: rawList.length ? rawList.slice(0, 3).map((item: unknown) => {
      const row = item as Record<string,unknown>;
      const ts = row.timestamp ?? row.submitTime;
      return {
        title: String(row.title ?? row.titleSlug ?? "Recent problem"),
        status: String(row.statusDisplay ?? row.status ?? "Submitted"),
        lang: String(row.lang ?? row.language ?? "Code"),
        submittedAt: ts && !isNaN(Number(ts)) ? new Date(Number(ts)*1000).toLocaleDateString() : "Recent",
      };
    }) : lcFallback.recent,
    source: ok === 5 ? "live" : "partial",
  };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 68;
  window.scrollTo({ top: y, behavior: "smooth" });
}

function LeetCodeSection() {
  const [stats, setStats] = useState<LCStats>(lcFallback);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetchLCStats()
      .then(data => { if (active) { setStats(data); setFailed(data.source === "fallback"); } })
      .catch(() => { if (active) { setStats(lcFallback); setFailed(true); } })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const visibleHM = useMemo(() => stats.heatmap.slice(-70), [stats.heatmap]);
  const maxCount  = useMemo(() => Math.max(1, ...visibleHM.map(d => d.count)), [visibleHM]);
  const total = stats.totalSolved || stats.difficulty.easy + stats.difficulty.medium + stats.difficulty.hard;
  const accepted = stats.difficulty.easy + stats.difficulty.medium + stats.difficulty.hard;
  const pct = Math.min(100, Math.round((accepted / Math.max(total, 1)) * 100));

  return (
    <div className="grid md:grid-cols-2 gap-8 mb-8">
      {/* ── LeetCode Live Card ── */}
      <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.6, ease: [0.22,1,0.36,1] }} whileHover={{ y: -5, transition: { type: "spring", stiffness: 280, damping: 18 } }}>
        <Card className="p-6 bg-white dark:bg-gray-800 border-emerald-100 dark:border-gray-700 flex flex-col hover:shadow-[0_8px_30px_rgba(16,185,129,0.12)] hover:border-emerald-200 dark:hover:border-emerald-700 hover:-translate-y-1 transition-all duration-300">
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-white text-sm" style={{ backgroundColor: "#f89f1b" }}>LC</div>
              <div>
                <p className="font-bold dark:text-white text-sm leading-tight">LeetCode</p>
                <a href="https://leetcode.com/u/AmanOps/" target="_blank" rel="noopener noreferrer"
                  className="text-[11px] text-gray-400 hover:text-orange-500 transition-colors">@AmanOps</a>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {!loading && (
                <span className={`text-[10px] px-2 py-0.5 rounded-full border ${failed ? "border-red-200 text-red-400" : stats.source === "live" ? "border-emerald-200 text-emerald-500" : "border-yellow-200 text-yellow-500"}`}>
                  {failed ? "cached" : stats.source === "live" ? "● live" : "● partial"}
                </span>
              )}
              <Badge className="bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 text-xs">Knight 🏅</Badge>
            </div>
          </div>

          {/* Solved ring + rank */}
          <div className="flex justify-center mb-5">
            <a href="https://leetcode.com/u/AmanOps/" target="_blank" rel="noopener noreferrer"
              className="relative group cursor-pointer">
              {/* Conic ring */}
              <div className="w-32 h-32 rounded-full flex items-center justify-center"
                style={{ background: `conic-gradient(#f89f1b ${pct * 3.6}deg, #f3f4f6 0deg)` }}>
                <div className="w-24 h-24 rounded-full bg-white dark:bg-gray-800 flex flex-col items-center justify-center">
                  <span className="text-[9px] text-gray-400 uppercase tracking-widest">Solved</span>
                  {loading
                    ? <div className="w-10 h-6 bg-gray-200 dark:bg-gray-600 rounded animate-pulse mt-1" />
                    : <span className="text-2xl font-bold dark:text-white group-hover:text-orange-500 transition-colors">{total}</span>
                  }
                  <span className="text-[10px] font-semibold" style={{ color: "#f89f1b" }}>{pct}%</span>
                </div>
              </div>
              <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] text-gray-400 whitespace-nowrap flex items-center gap-0.5 group-hover:text-orange-400 transition-colors">
                {loading ? "Loading..." : stats.ranking ? `Rank #${stats.ranking.toLocaleString()} · Top 2.41%` : "Active DSA"}
                <ExternalLink className="h-2.5 w-2.5" />
              </span>
            </a>
          </div>

          {/* Difficulty boxes */}
          <div className="grid grid-cols-3 gap-2 mt-8 mb-4">
            {[
              { label: "Easy",   value: loading ? "…" : String(stats.difficulty.easy),   bg: "bg-emerald-50 dark:bg-emerald-900/30", text: "text-emerald-600 dark:text-emerald-400" },
              { label: "Medium", value: loading ? "…" : String(stats.difficulty.medium), bg: "bg-yellow-50 dark:bg-yellow-900/30",   text: "text-yellow-600 dark:text-yellow-400" },
              { label: "Hard",   value: loading ? "…" : String(stats.difficulty.hard),   bg: "bg-red-50 dark:bg-red-900/30",         text: "text-red-500 dark:text-red-400" },
            ].map(d => (
              <div key={d.label} className={`${d.bg} rounded-xl p-3 text-center`}>
                <div className={`font-bold text-lg ${d.text} ${loading ? "animate-pulse" : ""}`}>{d.value}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{d.label}</div>
              </div>
            ))}
          </div>

          {/* Stats 2×2 */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            {[
              { icon: "🔥", label: "Max Streak",      value: loading ? "…" : `${stats.streak}d` },
              { icon: "⭐", label: "Contest Rating",  value: loading ? "…" : stats.contestRating ? String(stats.contestRating) : "2,012" },
              { icon: "🏅", label: "Level",           value: "Knight" },
              { icon: "🏆", label: "Contests",        value: loading ? "…" : stats.contestAttend ? String(stats.contestAttend) : "11" },
            ].map(s => (
              <div key={s.label} className={`bg-gray-50 dark:bg-gray-700/60 rounded-xl p-3 ${loading ? "animate-pulse" : ""}`}>
                <div className="text-base mb-0.5">{s.icon}</div>
                <div className="font-bold text-sm dark:text-white">{s.value}</div>
                <div className="text-[11px] text-gray-500 dark:text-gray-400">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Difficulty bars */}
          <div className="space-y-2 mt-auto">
            {[
              { label: "Easy",   count: stats.difficulty.easy,   color: "bg-emerald-500" },
              { label: "Medium", count: stats.difficulty.medium, color: "bg-yellow-500" },
              { label: "Hard",   count: stats.difficulty.hard,   color: "bg-red-500" },
            ].map(b => (
              <div key={b.label} className="flex items-center gap-2">
                <span className="text-[11px] text-gray-500 w-12">{b.label}</span>
                <div className="flex-1 h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${b.color}`}
                    initial={{ width: 0 }}
                    whileInView={{ width: loading ? "0%" : `${(b.count / Math.max(1, total)) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
                <span className="text-[11px] text-gray-400 w-7 text-right">
                  {loading ? "…" : `${Math.round((b.count / Math.max(1, total)) * 100)}%`}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* ── Heatmap + Recent ── */}
      <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.6, ease: [0.22,1,0.36,1] }}
        className="flex flex-col gap-6">
        {/* Heatmap card */}
        <Card className="p-6 bg-white dark:bg-gray-800 border-emerald-100 dark:border-gray-700 hover:shadow-[0_4px_20px_rgba(16,185,129,0.10)] hover:border-emerald-200 dark:hover:border-emerald-700 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <p className="font-semibold dark:text-white">Consistency map</p>
            <span className="text-xs text-gray-400">Last 70 days · LeetCode</span>
          </div>
          <div className="grid gap-1" style={{ gridTemplateColumns: "repeat(14, minmax(0,1fr))" }}>
            {(loading ? lcFallback.heatmap.slice(-70) : visibleHM).map((day, i) => (
              <motion.div
                key={day.date}
                title={`${day.date}: ${day.count} submissions`}
                className={`aspect-square rounded-[3px] ${loading ? "animate-pulse bg-gray-200 dark:bg-gray-700" : day.count === 0 ? "bg-gray-100 dark:bg-gray-700/60" : "bg-emerald-400"}`}
                style={{ opacity: loading ? 1 : day.count === 0 ? 0.4 : 0.35 + (day.count / maxCount) * 0.65 }}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: loading ? 1 : day.count === 0 ? 0.4 : 0.35 + (day.count / maxCount) * 0.65 }}
                viewport={{ once: true }}
                transition={{ duration: 0.2, delay: i * 0.003 }}
              />
            ))}
          </div>
          <div className="flex items-center gap-2 mt-3 justify-end">
            <span className="text-xs text-gray-400">Less</span>
            {["bg-gray-100 dark:bg-gray-700", "bg-emerald-200", "bg-emerald-400", "bg-emerald-600"].map((c, i) => (
              <div key={i} className={`w-3 h-3 rounded-sm ${c}`} />
            ))}
            <span className="text-xs text-gray-400">More</span>
          </div>
        </Card>

        {/* Recent accepted */}
        <Card className="p-6 bg-white dark:bg-gray-800 border-emerald-100 dark:border-gray-700 hover:shadow-[0_4px_20px_rgba(16,185,129,0.10)] hover:border-emerald-200 dark:hover:border-emerald-700 transition-all duration-300 flex-1">
          <p className="font-semibold dark:text-white mb-4">Recent Accepted Problems</p>
          <div className="space-y-3">
            {(loading ? lcFallback.recent : stats.recent).map((s, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 * i }}
                className={`flex items-start gap-2.5 p-3 rounded-lg border border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/30 hover:border-emerald-200 dark:hover:border-emerald-700 hover:bg-emerald-50/30 dark:hover:bg-emerald-900/10 transition-all ${loading ? "animate-pulse" : ""}`}>
                <Code className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium dark:text-white truncate">{s.title}</p>
                  <div className="flex flex-wrap items-center gap-2 mt-1.5">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${s.status === "Accepted" ? "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400" : "bg-yellow-100 text-yellow-600"}`}>
                      {s.status}
                    </span>
                    <span className="text-[11px] text-gray-400">{s.lang}</span>
                    <span className="text-[11px] text-gray-300 dark:text-gray-600">·</span>
                    <span className="text-[11px] text-gray-400">{s.submittedAt}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

function ProjectsCarousel() {
  const [current, setCurrent] = useState(0);
  const [tab, setTab] = useState<"design" | "deploy" | "monitor">("design");
  const [dir, setDir] = useState(1);
  const total = PROJECTS.length;

  function go(next: number) {
    setDir(next > current ? 1 : -1);
    setCurrent(next);
    setTab("design");
  }
  function prev() { go((current - 1 + total) % total); }
  function next() { go((current + 1) % total); }

  const project = PROJECTS[current];
  const c = project.tabs[tab];

  return (
    <div className="relative">
      {/* Slide counter + dots */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          {PROJECTS.map((p, i) => (
            <button key={i} onClick={() => go(i)}
              className={`transition-all duration-300 rounded-full ${i === current ? "w-6 h-2.5 bg-emerald-500" : "w-2.5 h-2.5 bg-gray-300 dark:bg-gray-600 hover:bg-emerald-300"}`}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">{current + 1} / {total}</span>
          <button onClick={prev}
            className="w-9 h-9 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:border-emerald-400 hover:text-emerald-600 transition-all">
            <ArrowRight className="h-4 w-4 rotate-180" />
          </button>
          <button onClick={next}
            className="w-9 h-9 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:border-emerald-400 hover:text-emerald-600 transition-all">
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Card */}
      <motion.div
        key={current}
        initial={{ opacity: 0, x: dir * 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="grid md:grid-cols-2 rounded-2xl overflow-hidden shadow-xl border border-white/10">
          {/* Left dark panel */}
          <div className={`bg-gradient-to-br ${project.leftColor} p-7 flex flex-col min-h-[420px]`}>
            <span className="text-[11px] text-gray-400 uppercase tracking-[0.15em] mb-4">{project.subtitle}</span>
            <h3 className="text-2xl font-bold text-white leading-snug mb-6">{project.title}</h3>
            <div className="mt-auto divide-y divide-white/10">
              {project.leftItems.map(item => (
                <div key={item.num} className="flex items-center gap-4 py-3 hover:bg-white/5 rounded-lg px-2 -mx-2 transition-colors">
                  <span className="text-gray-500 text-sm font-mono w-7 flex-shrink-0">{item.num}</span>
                  <span className="text-gray-300 text-sm">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right content panel */}
          <div className="bg-white dark:bg-gray-900 p-7 flex flex-col">
            {/* Tabs */}
            <div className="flex gap-5 border-b border-gray-200 dark:border-gray-700 mb-5">
              {(["design", "deploy", "monitor"] as const).map(t => (
                <button key={t} onClick={() => setTab(t)}
                  className={`pb-3 text-[11px] uppercase tracking-[0.15em] font-semibold transition-colors border-b-2 -mb-px ${
                    tab === t ? "border-emerald-500 text-emerald-600" : "border-transparent text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  }`}>
                  {t}
                </button>
              ))}
            </div>

            <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">{c.description}</p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {c.tags.map(tag => (
                  <span key={tag} className="text-xs px-2.5 py-1 bg-gray-100 dark:bg-gray-800 rounded text-gray-600 dark:text-gray-400">{tag}</span>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-2 mb-4">
                {c.stats.map((s, i) => (
                  <div key={i} className="bg-gray-50 dark:bg-gray-800 rounded-lg px-3 py-2.5">
                    <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">{s}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 mb-5">
                {c.bullets.map((b, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600 dark:text-gray-400 leading-snug">{b}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-2 mt-auto pt-2">
              {project.live && project.live !== "#" ? (
                <a href={project.live} target="_blank" rel="noopener noreferrer">
                  <Button size="sm" className="gap-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg">
                    <ExternalLink className="h-3.5 w-3.5" />Live Demo
                  </Button>
                </a>
              ) : (
                <Button size="sm" className="gap-2 bg-gray-200 dark:bg-gray-700 text-gray-400 rounded-lg cursor-not-allowed" disabled>
                  <ExternalLink className="h-3.5 w-3.5" />Coming Soon
                </Button>
              )}
              {project.github && project.github !== "#" ? (
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  <Button size="sm" variant="outline" className="gap-2 dark:border-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                    <Github className="h-3.5 w-3.5" />GitHub
                  </Button>
                </a>
              ) : (
                <Button size="sm" variant="outline" className="gap-2 dark:border-gray-700 text-gray-400 rounded-lg cursor-not-allowed" disabled>
                  <Github className="h-3.5 w-3.5" />Private
                </Button>
              )}
              {project.docs && (
                <a href={project.docs} target="_blank" rel="noopener noreferrer">
                  <Button size="sm" variant="outline" className="gap-2 dark:border-gray-700 dark:text-gray-300 rounded-lg hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700 dark:hover:bg-emerald-900/20">
                    <ExternalLink className="h-3.5 w-3.5" />Docs
                  </Button>
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Keyboard hint */}
      <p className="text-center text-xs text-gray-400 mt-4">Use arrows to navigate · {total} projects</p>
    </div>
  );
}

function ExperienceCard({ exp, index }: { exp: typeof EXPERIENCES[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: [0.22,1,0.36,1], delay: 0.08 * index }}
      whileHover={{ y: -5, transition: { type: "spring", stiffness: 280, damping: 18 } }}
      className="group"
    >
      <div className="relative bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-7
        hover:border-emerald-300 dark:hover:border-emerald-700
        hover:shadow-[0_4px_24px_rgba(16,185,129,0.10)]
        transition-all duration-300 hover:-translate-y-1">

        {/* Emerald left accent bar — appears on hover */}
        <div className="absolute left-0 top-6 bottom-6 w-[3px] rounded-full bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Top row */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
          <div className="flex items-start gap-4">
            {/* Icon */}
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-100 dark:border-emerald-800 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Briefcase className="h-4.5 w-4.5 text-emerald-600 dark:text-emerald-400" style={{ width: 18, height: 18 }} />
            </div>
            <div>
              <h3 className="text-base font-bold dark:text-white leading-snug">{exp.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{exp.company}</p>
            </div>
          </div>
          <span className="flex-shrink-0 text-xs font-medium border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1.5 text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 whitespace-nowrap">
            {exp.period}
          </span>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-100 dark:bg-gray-800 mb-4 ml-14" />

        {/* Bullet achievements */}
        <div className="space-y-2.5 ml-14">
          {exp.achievements.map((a, i) => (
            <div key={i} className="flex items-start gap-3">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{a}</span>
            </div>
          ))}
        </div>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mt-5 pt-4 border-t border-gray-100 dark:border-gray-800 ml-14">
          {exp.technologies.map(t => (
            <span key={t} className="text-xs px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800/50 group-hover:border-emerald-200 dark:group-hover:border-emerald-700 transition-colors">{t}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState("");
  const [typedRole, setTypedRole] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const ROLES = ["Backend Developer", "AI/LLM Engineer", "Java Spring Boot Dev", "Problem Solver"];

  useEffect(() => {
    const current = ROLES[roleIndex];
    const delay = isDeleting ? 50 : charIndex === current.length ? 1500 : 80;
    const timer = setTimeout(() => {
      if (!isDeleting && charIndex < current.length) {
        setTypedRole(current.slice(0, charIndex + 1));
        setCharIndex(c => c + 1);
      } else if (!isDeleting && charIndex === current.length) {
        setIsDeleting(true);
      } else if (isDeleting && charIndex > 0) {
        setTypedRole(current.slice(0, charIndex - 1));
        setCharIndex(c => c - 1);
      } else {
        setIsDeleting(false);
        setRoleIndex(r => (r + 1) % ROLES.length);
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, roleIndex]);
  const [cursor, setCursor] = useState({ x: -100, y: -100 });
  const [cursorVisible, setCursorVisible] = useState(false);
  const [cursorHovered, setCursorHovered] = useState(false);
  const isNavigating = useRef(false);

  // Custom cursor tracking + hover expansion
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setCursor({ x: e.clientX, y: e.clientY });
      setCursorVisible(true);
      const el = e.target as HTMLElement;
      setCursorHovered(!!el.closest("button, a, [role='button'], input, textarea, select, label"));
    };
    const onLeave = () => { setCursorVisible(false); setCursorHovered(false); };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  // Scroll-based active section detection + scroll-to-top visibility
  useEffect(() => {
    const onScroll = () => {
      setShowScrollTop(window.scrollY > 400);
      if (isNavigating.current) return;
      const scrollY = window.scrollY + 80;
      const sections = NAV_ITEMS.map(({ id }) => ({
        id,
        top: document.getElementById(id)?.offsetTop ?? 0,
      }));
      for (let i = sections.length - 1; i >= 0; i--) {
        if (scrollY >= sections[i].top) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // init on mount
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function navClick(id: string) {
    setActiveSection(id);
    isNavigating.current = true;
    scrollToSection(id);
    setTimeout(() => { isNavigating.current = false; }, 900);
  }

  // Scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  const diffColors: Record<string, string> = {
    Easy: "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 dark:text-emerald-400",
    Medium: "text-yellow-600 bg-yellow-50 dark:bg-yellow-900/30 dark:text-yellow-400",
    Hard: "text-red-600 bg-red-50 dark:bg-red-900/30 dark:text-red-400",
  };

  return (
    <div className={isDark ? "dark" : ""}>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-cyan-50 to-teal-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-colors duration-300 cursor-none">

        {/* Scroll progress bar */}
        <motion.div className="fixed left-0 top-0 z-[9998] h-[3px] origin-left bg-gradient-to-r from-emerald-400 to-cyan-400 shadow-[0_0_8px_rgba(16,185,129,0.6)]" style={{ scaleX }} />

        {/* Custom cursor — emerald dot + trailing ring */}
        {/* Dot: instant tracking */}
        <div
          className="fixed top-0 left-0 z-[9999] pointer-events-none hidden md:block rounded-full"
          style={{
            width: cursorHovered ? 10 : 7,
            height: cursorHovered ? 10 : 7,
            backgroundColor: "#10b981",
            transform: `translate(${cursor.x - (cursorHovered ? 5 : 3.5)}px, ${cursor.y - (cursorHovered ? 5 : 3.5)}px)`,
            transition: "width 0.2s ease, height 0.2s ease, transform 0s",
            opacity: cursorVisible ? 1 : 0,
            boxShadow: "0 0 8px rgba(16,185,129,0.6)",
          }}
        />
        {/* Ring: lags behind + expands on hover */}
        <div
          className="fixed top-0 left-0 z-[9999] pointer-events-none hidden md:block rounded-full"
          style={{
            width: cursorHovered ? 44 : 30,
            height: cursorHovered ? 44 : 30,
            border: "1.5px solid #10b981",
            transform: `translate(${cursor.x - (cursorHovered ? 22 : 15)}px, ${cursor.y - (cursorHovered ? 22 : 15)}px)`,
            transition: "transform 0.12s ease-out, width 0.25s ease, height 0.25s ease, opacity 0.2s",
            opacity: cursorVisible ? 0.7 : 0,
          }}
        />

        {/* Grid overlay */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.04]">
          <div className="w-full h-full" style={{ backgroundImage: "linear-gradient(to right,#000 1px,transparent 1px),linear-gradient(to bottom,#000 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
        </div>

        {/* ── Top Navigation ────────────────────────────────────────────── */}
        <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-emerald-100 dark:border-gray-800 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <button onClick={() => navClick("home")} className="flex items-center gap-2.5 cursor-pointer">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
                  MA
                </div>
                <span className="font-semibold text-base dark:text-white hidden sm:block">MD Aman</span>
              </button>

              {/* Desktop nav items */}
              <div className="hidden md:flex items-center gap-0.5">
                {NAV_ITEMS.map(({ id, label }) => (
                  <button key={id} onClick={() => navClick(id)}
                    className={`relative px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      activeSection === id
                        ? "bg-emerald-500 text-white"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800"
                    }`}>
                    {label}
                  </button>
                ))}
              </div>

              {/* Right actions — visible on all screen sizes */}
              <div className="flex items-center gap-1">
                {/* v1 Portfolio — icon only on mobile, full label on sm+ */}
                <a href="https://md-aman45.github.io/portfolio.github.io/" target="_blank" rel="noopener noreferrer" title="View v1 Portfolio">
                  <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5 px-2 sm:px-2.5 border-dashed border-emerald-300 dark:border-emerald-700 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20">
                    <ExternalLink className="h-3 w-3 flex-shrink-0" />
                    <span className="hidden sm:inline">v1 Portfolio</span>
                  </Button>
                </a>

                {/* Dark mode toggle */}
                <Button variant="outline" size="icon" onClick={() => setIsDark(d => !d)}
                  className="h-8 w-8 dark:border-gray-700 dark:text-gray-300">
                  {isDark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
                </Button>

                {/* GitHub — always visible */}
                <a href="https://github.com/Md-Aman45" target="_blank" rel="noopener noreferrer" title="GitHub">
                  <Button variant="outline" size="icon" className="h-8 w-8 dark:border-gray-700 dark:text-gray-300">
                    <Github className="h-3.5 w-3.5" />
                  </Button>
                </a>

                {/* Resume */}
                <Button variant="outline" size="sm" className="flex gap-1.5 h-8 text-xs dark:border-gray-700 dark:text-gray-300 px-2 sm:px-2.5" asChild>
                  <a href="/src/imports/MD_Aman_CV_v5.pdf" download="MD_Aman_CV.pdf">
                    <Download className="h-3 w-3 flex-shrink-0" />
                    <span className="hidden xs:inline sm:inline">Resume</span>
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </nav>

        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section id="home" className="relative min-h-[90vh] flex items-center pb-16 md:pb-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22,1,0.36,1] }}>
                <Badge className="mb-4 bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
                  Available for Opportunities
                </Badge>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-5 bg-gradient-to-r from-emerald-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent">
                  MD Aman
                </h1>
                <h2 className="text-xl sm:text-2xl mb-5 text-gray-700 dark:text-gray-300 font-medium flex items-center gap-1">
                  <span>{typedRole}</span>
                  <span className="inline-block w-0.5 h-6 bg-emerald-500 animate-pulse" />
                </h2>
                <p className="text-base text-gray-600 dark:text-gray-400 mb-7 leading-relaxed max-w-lg">
                  Backend & Full-Stack Developer shipping production systems in Node.js, Java, and Python. Passionate about LLM integrations, real-time pipelines, and systems that run at scale on AWS.
                </p>
                <div className="flex flex-wrap gap-1.5 mb-7">
                  {["Java", "Spring Boot", "Node.js", "Python", "Docker", "AWS", "Redis"].map((tech, i) => (
                    <motion.div key={tech} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 * i }}>
                      <Badge variant="outline" className="bg-white/60 dark:bg-gray-800/60 dark:text-gray-200 dark:border-gray-600">{tech}</Badge>
                    </motion.div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3 mb-7">
                  <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 gap-2 rounded-xl" onClick={() => navClick("projects")}>
                    View Projects <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline" className="dark:border-gray-600 dark:text-gray-200 rounded-xl" onClick={() => navClick("contact")}>
                    Get in Touch
                  </Button>
                </div>
                <div className="flex gap-3">
                  {[
                    { Icon: Github, href: "https://github.com/Md-Aman45", label: "GitHub" },
                    { Icon: Linkedin, href: "https://www.linkedin.com/in/md-aman-7941a0355/", label: "LinkedIn" },
                    { Icon: Mail, href: "mailto:aman9534577@gmail.com", label: "Email" },
                  ].map(({ Icon, href, label }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                      <Button size="icon" variant="ghost" className="hover:bg-emerald-100 dark:hover:bg-gray-800 dark:text-gray-300 rounded-full hover:scale-110 transition-transform">
                        <Icon className="h-4 w-4" />
                      </Button>
                    </a>
                  ))}
                </div>
              </motion.div>

              {/* Floating visual */}
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}
                className="relative hidden lg:flex items-center justify-center h-[460px]">
                <motion.div animate={{ y: [0, -18, 0], rotate: [0, 5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-10 right-10 w-28 h-28 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-3xl shadow-2xl transform rotate-12 opacity-90" />
                <motion.div animate={{ y: [0, 18, 0], rotate: [0, -5, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute bottom-16 left-10 w-36 h-36 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-3xl shadow-2xl transform -rotate-12 opacity-90" />
                <motion.div animate={{ y: [0, -14, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 bg-gray-900/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-2xl p-5 z-10 border border-white/10">
                  <div className="flex items-center gap-1.5 mb-3">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                    <span className="ml-2 text-[10px] text-gray-500 font-mono">app.tsx</span>
                  </div>
                  <div className="font-mono text-[11px] space-y-1.5 leading-relaxed">
                    <p><span className="text-purple-400">const</span> <span className="text-blue-300">dev</span> <span className="text-white">= {"{"}</span></p>
                    <p className="pl-4"><span className="text-emerald-300">name</span><span className="text-white">:</span> <span className="text-yellow-300">"MD Aman"</span><span className="text-white">,</span></p>
                    <p className="pl-4"><span className="text-emerald-300">stack</span><span className="text-white">:</span> <span className="text-yellow-300">"MERN"</span><span className="text-white">,</span></p>
                    <p className="pl-4"><span className="text-emerald-300">open</span><span className="text-white">:</span> <span className="text-orange-400">true</span></p>
                    <p><span className="text-white">{"}"}</span></p>
                  </div>
                </motion.div>
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute border-4 border-emerald-200/40 rounded-full" style={{ width: 380, height: 380 }} />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats bar */}
        <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-y border-emerald-100 dark:border-gray-800 py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              {[
                { value: "5+", label: "Projects Built" },
                { value: "839+", label: "DSA Problems (LC+GFG)" },
                { value: "8.5", label: "CGPA" },
                { value: "90%", label: "Class XII Score" },
              ].map((s, i) => (
                <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.5, ease: [0.22,1,0.36,1], delay: 0.08 * i }}>
                  <div className="text-3xl font-bold text-emerald-600 mb-1">{s.value}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ── About ────────────────────────────────────────────────────── */}
        <section id="about" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <Badge className="mb-4 bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">About Me</Badge>
              <h2 className="text-4xl sm:text-5xl font-bold mb-5">
                Backend engineer who ships{" "}
                <span className="bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">real production systems</span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
                Graduating May 2026 (SGPA 8.89) with production experience shipping live applications using Node.js, Python, Java, and AWS — from LLM pipelines to microservices.
              </p>
            </motion.div>

            {/* Education */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold mb-7 dark:text-white">Education</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { degree: "B.Sc (BCA) – Computer Applications", institution: "Patna College, Patna University", location: "Patna, Bihar", period: "2023 – May 2026", score: "SGPA: 8.89 / 10", icon: GraduationCap },
                  { degree: "Class XII · Patna Collegiate", institution: "Patna Collegiate, Patna", location: "Patna, Bihar", period: "2021 – 2023", score: "79.80%", icon: Award },
                ].map((edu, i) => {
                  const Icon = edu.icon;
                  return (
                    <motion.div key={edu.degree} initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.6, ease: [0.22,1,0.36,1], delay: 0.1 * i }}>
                      <Card className="p-6 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-emerald-100 dark:border-gray-700 hover:shadow-lg transition-shadow">
                        <div className="flex items-start gap-4">
                          <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                            <Icon className="h-5 w-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold mb-1 dark:text-white">{edu.degree}</h4>
                            <p className="text-emerald-600 text-sm font-medium mb-0.5">{edu.institution}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{edu.location}</p>
                            <div className="flex items-center justify-between">
                              <Badge variant="outline" className="text-xs dark:border-gray-600 dark:text-gray-300">{edu.period}</Badge>
                              <span className="text-sm font-bold text-emerald-600">{edu.score}</span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Strengths */}
            <div className="mb-14">
              <h3 className="text-2xl font-bold mb-7 dark:text-white">Key Strengths</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { title: "Backend & Full-Stack", desc: "Production APIs in Node.js, Java, Python, and React/Next.js — REST design, microservices, JWT/RBAC, and AWS EC2 deployments serving real users.", icon: Target },
                  { title: "DSA & Problem Solving", desc: "839+ problems across LeetCode (455) and GFG (384). Knight on LeetCode, 258-day max streak, Contest Rating 2,012.", icon: Award },
                  { title: "AI / LLM Integration", desc: "Building real-time voice pipelines with Groq, Gemini, and Web Speech API — sub-second mic-to-TTS latency in production.", icon: Heart },
                ].map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 * i }}>
                      <Card className="p-6 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-emerald-100 dark:border-gray-700 hover:shadow-lg hover:-translate-y-1 transition-all">
                        <Icon className="h-7 w-7 text-emerald-600 mb-3" />
                        <h4 className="font-semibold mb-2 dark:text-white">{s.title}</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{s.desc}</p>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Quote */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Card className="p-10 text-center bg-gradient-to-br from-emerald-500 to-cyan-500 border-0">
                <blockquote className="text-2xl font-medium text-white mb-3">
                  "Code is like humor. When you have to explain it, it&apos;s bad."
                </blockquote>
                <p className="text-emerald-100 text-sm">— Cory House</p>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* ── Experience ────────────────────────────────────────────────── */}
        <section id="experience" className="py-20 bg-white/30 dark:bg-gray-900/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="mb-14">
              <p className="text-sm text-emerald-600 font-semibold uppercase tracking-widest mb-3">Experience</p>
              <h2 className="text-4xl sm:text-5xl font-bold dark:text-white leading-tight">
                Production delivery<br />across freelance systems<br />and DevOps work.
              </h2>
            </motion.div>
            <div className="max-w-3xl space-y-6">
              {EXPERIENCES.map((exp, i) => <ExperienceCard key={exp.title} exp={exp} index={i} />)}
            </div>

            {/* Certifications */}
            <div className="max-w-3xl mt-10">
              <h3 className="text-lg font-bold dark:text-white mb-4 flex items-center gap-2">
                <Award className="h-5 w-5 text-emerald-500" /> Certifications
              </h3>
              {CERTIFICATIONS.map(cert => (
                <a key={cert.title} href={cert.href} target="_blank" rel="noopener noreferrer">
                  <div className="flex items-start gap-4 p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:border-emerald-300 dark:hover:border-emerald-700 hover:shadow-[0_4px_20px_rgba(16,185,129,0.10)] transition-all duration-300 group">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 flex items-center justify-center flex-shrink-0">
                      <Award className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold dark:text-white text-sm group-hover:text-emerald-600 transition-colors">{cert.title}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Issued by {cert.issuer} · {cert.date}</p>
                      <p className="text-xs text-gray-400 mt-0.5">Focus: {cert.focus}</p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-gray-300 group-hover:text-emerald-500 transition-colors flex-shrink-0 mt-1" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── Projects ─────────────────────────────────────────────────── */}
        <section id="projects" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="mb-14">
              <p className="text-sm text-emerald-600 font-semibold uppercase tracking-widest mb-3">Projects</p>
              <h2 className="text-4xl sm:text-5xl font-bold dark:text-white leading-tight">
                Cinematic case studies<br />for systems that actually shipped.
              </h2>
            </motion.div>
            <ProjectsCarousel />
          </div>
        </section>

        {/* ── Code ─────────────────────────────────────────────────────── */}
        <section id="code" className="py-20 bg-white/30 dark:bg-gray-900/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="mb-14">
              <p className="text-sm text-emerald-600 font-semibold uppercase tracking-widest mb-3">Coding</p>
              <h2 className="text-4xl sm:text-5xl font-bold dark:text-white leading-tight">
                LeetCode performance<br />snapshot.
              </h2>
            </motion.div>

            {/* Live LeetCode + Heatmap/Recent */}
            <LeetCodeSection />

            {/* GFG Card */}
            <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.7, ease: [0.22,1,0.36,1] }} whileHover={{ y: -5, transition: { type: "spring", stiffness: 260, damping: 18 } }}>
              <Card className="p-6 bg-white dark:bg-gray-800 border-emerald-100 dark:border-gray-700 hover:shadow-[0_8px_30px_rgba(16,185,129,0.12)] hover:border-emerald-200 dark:hover:border-emerald-700 transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-white text-sm" style={{ backgroundColor: "#2f8d46" }}>GFG</div>
                    <div>
                      <p className="font-bold dark:text-white text-sm leading-tight">GeeksforGeeks</p>
                      <a href="https://www.geeksforgeeks.org/profile/amanstack" target="_blank" rel="noopener noreferrer"
                        className="text-[11px] text-gray-400 hover:text-green-600 transition-colors">@amanstack</a>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-xs">Inst. Rank #2 🏫</Badge>
                </div>

                <div className="grid md:grid-cols-[auto_1fr] gap-8 items-start">
                  {/* Donut */}
                  <a href="https://www.geeksforgeeks.org/profile/amanstack" target="_blank" rel="noopener noreferrer"
                    className="group flex flex-col items-center">
                    <div className="w-32 h-32 rounded-full flex items-center justify-center"
                      style={{ background: `conic-gradient(#2f8d46 ${Math.round((384/600)*100) * 3.6}deg, #f3f4f6 0deg)` }}>
                      <div className="w-24 h-24 rounded-full bg-white dark:bg-gray-800 flex flex-col items-center justify-center">
                        <span className="text-[9px] text-gray-400 uppercase tracking-widest">Solved</span>
                        <span className="text-2xl font-bold dark:text-white group-hover:text-green-600 transition-colors">384</span>
                        <span className="text-[10px] font-semibold text-green-600">64%</span>
                      </div>
                    </div>
                    <span className="mt-2 text-[10px] text-gray-400 flex items-center gap-0.5 group-hover:text-green-500 transition-colors">
                      Score 1297 · Rank #2 <ExternalLink className="h-2.5 w-2.5" />
                    </span>
                  </a>

                  {/* Right stats */}
                  <div className="space-y-4">
                    {/* Difficulty boxes */}
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { label: "Easy",   count: "163", bg: "bg-emerald-50 dark:bg-emerald-900/30", text: "text-emerald-600 dark:text-emerald-400" },
                        { label: "Medium", count: "179", bg: "bg-yellow-50 dark:bg-yellow-900/30",   text: "text-yellow-600 dark:text-yellow-400" },
                        { label: "Hard",   count: "31",  bg: "bg-red-50 dark:bg-red-900/30",         text: "text-red-500 dark:text-red-400" },
                      ].map(d => (
                        <div key={d.label} className={`${d.bg} rounded-xl p-3 text-center`}>
                          <div className={`font-bold text-lg ${d.text}`}>{d.count}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">{d.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Stats row */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { icon: "🔥", label: "Longest Streak", value: "140d" },
                        { icon: "📚", label: "Coding Score",   value: "1,297" },
                        { icon: "🏫", label: "Inst. Rank",     value: "#2" },
                        { icon: "✅", label: "POTDs Solved",   value: "160" },
                      ].map(s => (
                        <div key={s.label} className="bg-gray-50 dark:bg-gray-700/60 rounded-xl p-3">
                          <div className="text-base mb-0.5">{s.icon}</div>
                          <div className="font-bold text-sm dark:text-white">{s.value}</div>
                          <div className="text-[11px] text-gray-500 dark:text-gray-400">{s.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Difficulty bars */}
                    <div className="space-y-2">
                      {[
                        { label: "Easy",   count: 163, total: 384, color: "bg-emerald-500" },
                        { label: "Medium", count: 179, total: 384, color: "bg-yellow-500" },
                        { label: "Hard",   count: 31,  total: 384, color: "bg-red-500" },
                      ].map(b => (
                        <div key={b.label} className="flex items-center gap-2">
                          <span className="text-[11px] text-gray-500 w-12">{b.label}</span>
                          <div className="flex-1 h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                            <motion.div
                              className={`h-full rounded-full ${b.color}`}
                              initial={{ width: 0 }}
                              whileInView={{ width: `${(b.count / b.total) * 100}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            />
                          </div>
                          <span className="text-[11px] text-gray-400 w-7 text-right">{Math.round((b.count/b.total)*100)}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* ── Skills ───────────────────────────────────────────────────── */}
        <section id="skills" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="text-center mb-14">
              <Badge className="mb-4 bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">Skills & Expertise</Badge>
              <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                Tech Stack &{" "}
                <span className="bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">Proficiencies</span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                A snapshot of my technical toolkit across frontend, backend, infrastructure, and tooling.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
              {SKILL_CATEGORIES.map((cat, i) => {
                const Icon = cat.icon;
                return (
                  <motion.div key={cat.title} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.6, ease: [0.22,1,0.36,1], delay: 0.07 * i }} whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } }}>
                    <Card className="p-6 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-emerald-100 dark:border-gray-700 hover:shadow-[0_8px_30px_rgba(16,185,129,0.15)] hover:border-emerald-300 dark:hover:border-emerald-600 hover:-translate-y-1.5 transition-all duration-300 h-full group">
                      <div className="flex items-center gap-3 mb-5">
                        <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${cat.color} flex items-center justify-center`}>
                          <Icon className="h-4 w-4 text-white" />
                        </div>
                        <h3 className="font-bold dark:text-white">{cat.title}</h3>
                      </div>
                      <div className="space-y-3">
                        {cat.skills.map((skill, j) => (
                          <div key={skill.name}>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium dark:text-gray-300">{skill.name}</span>
                              <span className="text-xs text-emerald-600 font-semibold">{skill.level}%</span>
                            </div>
                            <Progress value={skill.level} className="h-1.5 group-hover:[&>div]:bg-emerald-500 transition-all" />
                          </div>
                        ))}
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            {/* Always growing banner */}
            <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.7, ease: [0.22,1,0.36,1] }}>
              <Card className="p-10 bg-gradient-to-br from-emerald-500 to-cyan-500 border-0 text-center">
                <GitBranch className="h-9 w-9 mx-auto mb-4 text-white" />
                <h3 className="text-2xl font-bold text-white mb-2">Always Learning, Always Growing</h3>
                <p className="text-emerald-100 mb-5 max-w-xl mx-auto text-sm">
                  Technology evolves fast — so do I. Constantly shipping side projects, contributing to open source, and exploring new stacks.
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {["690+ LeetCode Streak Days", "Knight Rated · 2012", "GFG Institute Rank #2"].map(tag => (
                    <Badge key={tag} className="bg-white/20 text-white border-white/30 px-4 py-1.5">{tag}</Badge>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* ── Contact ──────────────────────────────────────────────────── */}
        <section id="contact" className="py-20 bg-white/30 dark:bg-gray-900/30 pb-24 md:pb-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-start">

              {/* ── Left: headline + contact info ── */}
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.6, ease: [0.22,1,0.36,1] }}>
                <p className="text-sm text-emerald-600 font-semibold uppercase tracking-widest mb-4">Contact</p>
                <h2 className="text-4xl sm:text-5xl font-bold dark:text-white leading-tight mb-4">
                  Let's build systems<br />that survive<br />real traffic.
                </h2>
                <p className="text-gray-500 dark:text-gray-400 mb-10 leading-relaxed">
                  Available for backend, full-stack, DevOps, and AI integration opportunities where shipping production-quality software matters.
                </p>

                {/* Info rows */}
                <div className="space-y-4 mb-10">
                  {[
                    { icon: Mail,   label: "EMAIL",    value: "aman9534577@gmail.com",  href: "mailto:aman9534577@gmail.com" },
                    { icon: MapPin, label: "LOCATION", value: "Patna, Bihar, India",     href: "#" },
                    { icon: Github, label: "GITHUB",   value: "github.com/Md-Aman45",   href: "https://github.com/Md-Aman45" },
                  ].map(info => {
                    const Icon = info.icon;
                    return (
                      <a key={info.label} href={info.href} target={info.href !== "#" ? "_blank" : undefined} rel="noopener noreferrer"
                        className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/60 dark:bg-gray-900/60 hover:border-emerald-300 dark:hover:border-emerald-700 hover:bg-white dark:hover:bg-gray-800 transition-all duration-200 group">
                        <div className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/30 transition-colors">
                          <Icon className="h-4 w-4 text-gray-500 dark:text-gray-400 group-hover:text-emerald-600 transition-colors" />
                        </div>
                        <div>
                          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">{info.label}</p>
                          <p className="text-sm font-medium dark:text-white">{info.value}</p>
                        </div>
                      </a>
                    );
                  })}
                </div>

                {/* Social quick links */}
                <div className="flex flex-wrap gap-3">
                  {[
                    { label: "Email",    href: "mailto:aman9534577@gmail.com", icon: Mail,    color: "bg-emerald-500 hover:bg-emerald-600 text-white" },
                    { label: "LinkedIn", href: "https://www.linkedin.com/in/md-aman-7941a0355/", icon: Linkedin, color: "bg-blue-600 hover:bg-blue-700 text-white" },
                    { label: "LeetCode", href: "https://leetcode.com/u/AmanOps/", icon: Code,     color: "bg-orange-500 hover:bg-orange-600 text-white" },
                  ].map(s => {
                    const Icon = s.icon;
                    return (
                      <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
                        <button className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${s.color}`}>
                          <Icon className="h-4 w-4" />{s.label}
                        </button>
                      </a>
                    );
                  })}
                </div>
              </motion.div>

              {/* ── Right: minimal form ── */}
              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.6, ease: [0.22,1,0.36,1] }}>
                <form onSubmit={e => {
                  e.preventDefault();
                  if (!formData.name || !formData.email || !formData.message) {
                    setFormError("Please fill in Name, Email and Message.");
                    return;
                  }
                  setFormError("");
                  const text = `Hi Aman! 👋\n\nName: ${formData.name}\nEmail: ${formData.email}${formData.subject ? `\nSubject: ${formData.subject}` : ""}\n\nMessage:\n${formData.message}`;
                  window.open(`https://wa.me/917858925358?text=${encodeURIComponent(text)}`, "_blank");
                  setFormSubmitted(true);
                  setFormData({ name: "", email: "", subject: "", message: "" });
                }} className="space-y-4">

                  {formSubmitted && (
                    <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4">
                      <CheckCircle className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                      <p className="text-sm text-emerald-700 dark:text-emerald-400">
                        WhatsApp opened! <button type="button" className="underline font-medium ml-1" onClick={() => setFormSubmitted(false)}>Send another</button>
                      </p>
                    </div>
                  )}
                  {formError && (
                    <p className="text-sm text-red-500 bg-red-50 dark:bg-red-900/20 border border-red-200 rounded-xl px-4 py-3">{formError}</p>
                  )}

                  {/* Name + Email row */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Name</label>
                      <input type="text" placeholder="Your name" value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-emerald-400 dark:focus:border-emerald-500 focus:ring-2 focus:ring-emerald-400/20 transition-all text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email</label>
                      <input type="email" placeholder="you@company.com" value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-emerald-400 dark:focus:border-emerald-500 focus:ring-2 focus:ring-emerald-400/20 transition-all text-sm" />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Message</label>
                    <textarea rows={6} placeholder="Tell me about the role, project, or system you want to build."
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-emerald-400 dark:focus:border-emerald-500 focus:ring-2 focus:ring-emerald-400/20 transition-all text-sm resize-none" />
                  </div>

                  {/* Send button + privacy note */}
                  <div className="flex items-center justify-between gap-4">
                    <button type="submit" disabled={formSubmitted}
                      className="flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-60 text-white font-semibold rounded-xl transition-all text-sm">
                      <Send className="h-4 w-4" />
                      {formSubmitted ? "Message Sent!" : "Send message"}
                    </button>
                    <p className="text-xs text-gray-400 flex items-center gap-1.5">
                      <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                      Privacy-friendly contact.
                    </p>
                  </div>
                </form>
              </motion.div>

            </div>
          </div>
        </section>

        {/* ── Footer ───────────────────────────────────────────────────── */}
        <footer className="border-t border-emerald-100 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 gap-4">
            <div className="flex flex-col items-center sm:items-start gap-1">
              <p className="text-sm text-gray-500 dark:text-gray-400">© 2026 Md Aman. Built with React & Tailwind CSS.</p>
              <a href="https://md-aman45.github.io/portfolio.github.io/" target="_blank" rel="noopener noreferrer"
                className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1">
                <ArrowRight className="h-3 w-3 rotate-180" />
                View Previous Version (v1)
              </a>
            </div>
            <div className="flex items-center gap-4">
              {[
                { href: "https://github.com/Md-Aman45", label: "GitHub" },
                { href: "https://www.linkedin.com/in/md-aman-7941a0355/", label: "LinkedIn" },
                { href: "mailto:aman9534577@gmail.com", label: "Email" },
              ].map(({ href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="text-xs text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  {label}
                </a>
              ))}
            </div>
          </div>
        </footer>

        {/* ── Mobile Bottom Tab Bar ─────────────────────────────────────── */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-2xl">
          <div className="grid grid-cols-4">
            {BOTTOM_TABS.map(({ id, label, icon: Icon }) => (
              <button key={id} onClick={() => navClick(id)}
                className={`flex flex-col items-center justify-center py-3 gap-1 transition-colors ${
                  activeSection === id
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-gray-500 dark:text-gray-400"
                }`}>
                <Icon className={`h-5 w-5 transition-transform ${activeSection === id ? "scale-110" : ""}`} />
                <span className="text-[10px] font-medium">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Scroll to top button ──────────────────────────────────────── */}
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-20 md:bottom-8 right-5 z-50 w-11 h-11 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg flex items-center justify-center transition-colors"
            aria-label="Scroll to top"
          >
            <ChevronUp className="h-5 w-5" />
          </motion.button>
        )}
      </div>
    </div>
  );
}
