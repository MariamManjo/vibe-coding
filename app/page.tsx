import Link from "next/link";
import Nav from "./components/Nav";
import SocialLinks from "./components/SocialLinks";
import Footer from "./components/Footer";

const steps = [
  {
    num: 1, week: "Week 1", tag: "Foundation",
    title: "Intro to AI & Vibe Coding",
    desc: "Understand the modern builder mindset, what AI tools can do, and how to think like a product creator from day one.",
    gradient: "from-blue-600/20 to-blue-900/10",
    accent: "#3B82F6",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6">
        <circle cx="16" cy="12" r="6" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M10 12c0-3.31 2.69-6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M16 18v3M13 21h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M12 15l-3 5M20 15l3 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
      </svg>
    ),
  },
  {
    num: 2, week: "Week 2", tag: "Core Skill",
    title: "Prompt Engineering",
    desc: "Learn to communicate with AI precisely — write prompts that produce real results, not generic outputs.",
    gradient: "from-violet-600/20 to-violet-900/10",
    accent: "#8B5CF6",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6">
        <rect x="4" y="8" width="16" height="10" rx="3" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M20 13h4a2 2 0 012 2v5a2 2 0 01-2 2H12l-3 3v-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 12h6M9 15h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    num: 3, week: "Week 3", tag: "Product",
    title: "Design Thinking → MVP",
    desc: "Turn any raw idea into a scoped, shippable product. Learn user-focused frameworks that real product teams use.",
    gradient: "from-cyan-600/20 to-cyan-900/10",
    accent: "#06B6D4",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6">
        <path d="M16 4l3 8h8l-6.5 5 2.5 8L16 20l-7 5 2.5-8L5 12h8z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    num: 4, week: "Week 4", tag: "Build",
    title: "Build MVP with AI Tools",
    desc: "Ship a real, working product using AI-first tools. No code required — just vision, prompts, and iteration.",
    gradient: "from-emerald-600/20 to-emerald-900/10",
    accent: "#10B981",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6">
        <path d="M16 4l2 6 6 1-4.5 4 1.5 6L16 18l-5 3 1.5-6L8 11l6-1z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
        <path d="M22 22l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="20" cy="20" r="4" stroke="currentColor" strokeWidth="1.8"/>
      </svg>
    ),
  },
  {
    num: 5, week: "Week 5", tag: "Automate",
    title: "Automation & Workflow",
    desc: "Stop doing things manually. Design workflows where AI handles the repetitive work so you can focus on what matters.",
    gradient: "from-orange-600/20 to-orange-900/10",
    accent: "#F59E0B",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6">
        <circle cx="16" cy="16" r="5" stroke="currentColor" strokeWidth="1.8"/>
        <circle cx="16" cy="16" r="2" fill="currentColor"/>
        <path d="M16 4v4M16 24v4M4 16h4M24 16h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M7.76 7.76l2.83 2.83M21.41 21.41l2.83 2.83M7.76 24.24l2.83-2.83M21.41 10.59l2.83-2.83" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    num: 6, week: "Week 6", tag: "Platforms",
    title: "Automation Platforms",
    desc: "Go deep on Make, Zapier, and n8n. Build multi-step automations that connect your tools and eliminate manual busywork.",
    gradient: "from-pink-600/20 to-pink-900/10",
    accent: "#EC4899",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6">
        <circle cx="8" cy="16" r="3" stroke="currentColor" strokeWidth="1.8"/>
        <circle cx="24" cy="8" r="3" stroke="currentColor" strokeWidth="1.8"/>
        <circle cx="24" cy="24" r="3" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M11 16h5l5-6M11 16h5l5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    num: 7, week: "Week 7", tag: "Ship It",
    title: "AI Workflows in Practice",
    desc: "Bring everything together. Build and ship your final AI-powered product — and graduate with something real and live.",
    gradient: "from-purple-600/20 to-purple-900/10",
    accent: "#A855F7",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6">
        <path d="M16 4c-1 4-4 6-8 7 0 8 4 13 8 17 4-4 8-9 8-17-4-1-7-3-8-7z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
        <path d="M12 16l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

const outcomes = [
  {
    title: "A working web app",
    msg: "From blank page to live URL in one session. You'll build and deploy a real working app — no stack knowledge needed.",
    bg: "linear-gradient(145deg, #060d1f 0%, #0b1a3a 100%)",
    bgFade: "rgba(11,26,58,0.98)",
    accent: "#3B82F6",
    glow: "rgba(59,130,246,0.4)",
    floatClass: "outcome-float-1",
    character: (
      <svg viewBox="0 0 100 120" fill="none" className="w-32 h-40">
        {/* Monitor body */}
        <rect x="8" y="18" width="84" height="62" rx="8" stroke="currentColor" strokeWidth="2.2" fill="currentColor" fillOpacity="0.06"/>
        {/* Browser bar */}
        <line x1="8" y1="34" x2="92" y2="34" stroke="currentColor" strokeWidth="1.8"/>
        {/* Traffic dots */}
        <circle cx="18" cy="26" r="3" fill="currentColor" opacity="0.9"/>
        <circle cx="28" cy="26" r="3" fill="currentColor" opacity="0.55"/>
        <circle cx="38" cy="26" r="3" fill="currentColor" opacity="0.3"/>
        {/* Eye sockets */}
        <rect x="22" y="44" width="18" height="16" rx="4" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="60" y="44" width="18" height="16" rx="4" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.5"/>
        {/* Pupils (cursor blink rects) */}
        <rect x="28" y="47" width="5" height="10" rx="2" fill="currentColor"/>
        <rect x="66" y="47" width="5" height="10" rx="2" fill="currentColor"/>
        {/* Smile (angle brackets) */}
        <path d="M35 68 Q50 77 65 68" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        {/* Stand */}
        <rect x="45" y="80" width="10" height="12" rx="3" fill="currentColor" fillOpacity="0.5"/>
        <rect x="30" y="90" width="40" height="5" rx="2.5" fill="currentColor" fillOpacity="0.3"/>
        {/* Antennae */}
        <line x1="35" y1="18" x2="30" y2="8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <circle cx="30" cy="7" r="2.5" fill="currentColor"/>
        <line x1="65" y1="18" x2="70" y2="8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <circle cx="70" cy="7" r="2.5" fill="currentColor"/>
        {/* Sparkles */}
        <circle cx="4" cy="44" r="2.5" fill="currentColor" opacity="0.5"/>
        <circle cx="97" cy="30" r="2" fill="currentColor" opacity="0.4"/>
        <circle cx="96" cy="68" r="1.5" fill="currentColor" opacity="0.3"/>
        <circle cx="3" cy="70" r="1.5" fill="currentColor" opacity="0.35"/>
      </svg>
    ),
  },
  {
    title: "An automated workflow",
    msg: "Your tools talk to each other while you sleep. Make, Zapier, n8n — set once, run forever. You just watch the magic happen.",
    bg: "linear-gradient(145deg, #0c0618 0%, #1a0d35 100%)",
    bgFade: "rgba(26,13,53,0.98)",
    accent: "#9945FF",
    glow: "rgba(153,69,255,0.4)",
    floatClass: "outcome-float-2",
    character: (
      <svg viewBox="0 0 100 120" fill="none" className="w-32 h-40">
        {/* Ghost body fill */}
        <path d="M18 52C18 27 32 8 50 8C68 8 82 27 82 52L82 94C82 97 79 99 76 96L68 89L60 96C58 98 55 98 53 96L50 93L47 96C45 98 42 98 40 96L32 89L24 96C21 99 18 97 18 94Z"
          fill="currentColor" fillOpacity="0.09" stroke="currentColor" strokeWidth="2"/>
        {/* Eyes */}
        <ellipse cx="37" cy="54" rx="7" ry="8" fill="currentColor" opacity="0.95"/>
        <ellipse cx="63" cy="54" rx="7" ry="8" fill="currentColor" opacity="0.95"/>
        <ellipse cx="38" cy="56" rx="3.5" ry="4" fill="#0c0618"/>
        <ellipse cx="64" cy="56" rx="3.5" ry="4" fill="#0c0618"/>
        <circle cx="40" cy="54" r="1.5" fill="currentColor" opacity="0.7"/>
        <circle cx="66" cy="54" r="1.5" fill="currentColor" opacity="0.7"/>
        {/* Circuit on body */}
        <circle cx="50" cy="74" r="4" stroke="currentColor" strokeWidth="1.8"/>
        <line x1="50" y1="74" x2="36" y2="82" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="50" y1="74" x2="64" y2="82" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="50" y1="70" x2="50" y2="62" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="36" cy="82" r="2.5" fill="currentColor" opacity="0.8"/>
        <circle cx="64" cy="82" r="2.5" fill="currentColor" opacity="0.8"/>
        <circle cx="50" cy="62" r="2" fill="currentColor" opacity="0.6"/>
        {/* Floating orbit nodes */}
        <circle cx="6" cy="30" r="3.5" stroke="currentColor" strokeWidth="1.5" opacity="0.7"/>
        <circle cx="95" cy="42" r="2.5" fill="currentColor" opacity="0.5"/>
        <circle cx="4" cy="68" r="2" fill="currentColor" opacity="0.4"/>
        <circle cx="96" cy="75" r="3" stroke="currentColor" strokeWidth="1.5" opacity="0.5"/>
        <circle cx="90" cy="20" r="2" fill="currentColor" opacity="0.35"/>
        <line x1="9.5" y1="30" x2="18" y2="52" stroke="currentColor" strokeWidth="1" opacity="0.25" strokeDasharray="3 3"/>
      </svg>
    ),
  },
  {
    title: "A shipped AI product",
    msg: "gm world 🚀 — a real thing, live on the internet, built by you. From zero to something people can actually use.",
    bg: "linear-gradient(145deg, #021510 0%, #052e1c 100%)",
    bgFade: "rgba(5,46,28,0.98)",
    accent: "#14F195",
    glow: "rgba(20,241,149,0.35)",
    floatClass: "outcome-float-3",
    character: (
      <svg viewBox="0 0 100 120" fill="none" className="w-32 h-40">
        {/* Rocket body */}
        <path d="M50 6C40 6 26 22 26 44L26 78C26 81 50 88 50 88C50 88 74 81 74 78L74 44C74 22 60 6 50 6Z"
          fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2.2"/>
        {/* Nose cone accent */}
        <path d="M50 6C44 6 36 14 32 24L68 24C64 14 56 6 50 6Z" fill="currentColor" fillOpacity="0.18"/>
        {/* Porthole (face circle) */}
        <circle cx="50" cy="44" r="15" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.07"/>
        {/* Eyes */}
        <circle cx="44" cy="42" r="4" fill="currentColor" opacity="0.95"/>
        <circle cx="56" cy="42" r="4" fill="currentColor" opacity="0.95"/>
        <circle cx="44" cy="42" r="1.8" fill="#021510"/>
        <circle cx="56" cy="42" r="1.8" fill="#021510"/>
        <circle cx="45.5" cy="40.5" r="1" fill="currentColor" opacity="0.7"/>
        <circle cx="57.5" cy="40.5" r="1" fill="currentColor" opacity="0.7"/>
        {/* Smile */}
        <path d="M44 50Q50 56 56 50" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        {/* Fins */}
        <path d="M26 64L13 82L26 78Z" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.25"/>
        <path d="M74 64L87 82L74 78Z" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.25"/>
        {/* Flames */}
        <path d="M38 88Q50 110 62 88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
        <path d="M42 88Q50 104 58 88" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
        <path d="M46 88Q50 98 54 88" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.7"/>
        {/* Stars */}
        <circle cx="7" cy="18" r="2.5" fill="currentColor" opacity="0.6"/>
        <circle cx="94" cy="12" r="2" fill="currentColor" opacity="0.5"/>
        <circle cx="5" cy="58" r="1.5" fill="currentColor" opacity="0.4"/>
        <circle cx="96" cy="62" r="2.5" fill="currentColor" opacity="0.55"/>
        <path d="M88 28L89.5 32.5L94 32.5L90.5 35.5L91.8 40L88 37.5L84.2 40L85.5 35.5L82 32.5L86.5 32.5Z"
          fill="currentColor" opacity="0.45"/>
      </svg>
    ),
  },
];

const modules = [
  {
    num: "01",
    title: "AI Foundations",
    tagline: "From curious to confident in AI",
    desc: "Understand how modern AI tools work, what they can and can't do, and how to adopt the builder mindset that turns ideas into products.",
    topics: ["What is generative AI", "Tools landscape overview", "Builder vs. consumer mindset", "Your first AI experiment"],
    duration: "2 hrs",
    level: "Beginner",
    gradient: "linear-gradient(135deg, #080d1a 0%, #0d1835 100%)",
    accent: "#3B82F6",
    hoverClass: "card-hover",
    icon: (
      <svg viewBox="0 0 44 44" fill="none" className="w-9 h-9">
        <circle cx="22" cy="22" r="9" stroke="currentColor" strokeWidth="2"/>
        <circle cx="22" cy="22" r="16" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 3" opacity="0.5"/>
        <circle cx="22" cy="6" r="3" fill="currentColor"/>
        <circle cx="22" cy="38" r="3" fill="currentColor"/>
        <circle cx="6" cy="22" r="3" fill="currentColor"/>
        <circle cx="38" cy="22" r="3" fill="currentColor"/>
      </svg>
    ),
  },
  {
    num: "02",
    title: "Prompt Engineering",
    tagline: "Talk to AI — and actually get results",
    desc: "Master the art of writing prompts that produce real, usable outputs. Learn frameworks used by professionals to get consistent results every time.",
    topics: ["Prompt anatomy & structure", "Context, role & constraints", "Iterative refinement", "Prompt templates library"],
    duration: "3 hrs",
    level: "Beginner",
    gradient: "linear-gradient(135deg, #0c0a20 0%, #1a1540 100%)",
    accent: "#8B5CF6",
    hoverClass: "card-hover card-hover-purple",
    icon: (
      <svg viewBox="0 0 44 44" fill="none" className="w-9 h-9">
        <rect x="4" y="10" width="22" height="14" rx="4" stroke="currentColor" strokeWidth="2"/>
        <path d="M26 17h6a4 4 0 014 4v8a4 4 0 01-4 4H14l-4 4v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10 16h10M10 20h7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.6"/>
      </svg>
    ),
  },
  {
    num: "03",
    title: "MVP Building with AI",
    tagline: "Ship a real product — no code needed",
    desc: "Go from blank page to live product. Use AI-first tools to design, prototype, and deploy a working MVP that you can show to real users.",
    topics: ["Idea → scoped product", "Wireframing with AI", "Building with no-code tools", "Deploying your MVP live"],
    duration: "4 hrs",
    level: "Intermediate",
    gradient: "linear-gradient(135deg, #021510 0%, #042b1d 100%)",
    accent: "#10B981",
    hoverClass: "card-hover card-hover-green",
    icon: (
      <svg viewBox="0 0 44 44" fill="none" className="w-9 h-9">
        <path d="M22 4l3 9h9l-7 5.5 2.5 9L22 22l-7.5 5.5 2.5-9L10 13h9z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M28 32l6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="26" cy="30" r="5.5" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
  },
  {
    num: "04",
    title: "Automation & Workflows",
    tagline: "Let AI do the repetitive work for you",
    desc: "Design and deploy automated workflows using Make, Zapier, and n8n. Connect your apps, eliminate manual tasks, and run on autopilot.",
    topics: ["Automation fundamentals", "Make / Zapier / n8n deep dive", "Multi-step workflow design", "Real automation templates"],
    duration: "3 hrs",
    level: "Intermediate",
    gradient: "linear-gradient(135deg, #150f00 0%, #2a1e00 100%)",
    accent: "#F59E0B",
    hoverClass: "card-hover card-hover-amber",
    icon: (
      <svg viewBox="0 0 44 44" fill="none" className="w-9 h-9">
        <circle cx="10" cy="22" r="5" stroke="currentColor" strokeWidth="2"/>
        <circle cx="34" cy="10" r="5" stroke="currentColor" strokeWidth="2"/>
        <circle cx="34" cy="34" r="5" stroke="currentColor" strokeWidth="2"/>
        <path d="M15 20L29 12M15 24L29 32" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M39 13v18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 2" opacity="0.5"/>
      </svg>
    ),
  },
];

const stats = [
  { value: "3x", label: "Hackathon Winner" },
  { value: "6+", label: "Startups Worked With" },
  { value: "5+", label: "Certificates" },
  { value: "2+", label: "Years Teaching AI & Design" },
];

const heroParticles = [
  { left: "7%",  top: "18%", size: 2.5, drift: "pdrift-a", color: "rgba(153,69,255,0.45)", delay: "0s" },
  { left: "14%", top: "72%", size: 2,   drift: "pdrift-b", color: "rgba(59,130,246,0.40)", delay: "0.8s" },
  { left: "22%", top: "38%", size: 1.5, drift: "pdrift-c", color: "rgba(20,241,149,0.35)", delay: "1.6s" },
  { left: "28%", top: "83%", size: 2,   drift: "pdrift-d", color: "rgba(153,69,255,0.30)", delay: "2.4s" },
  { left: "4%",  top: "52%", size: 3,   drift: "pdrift-c", color: "rgba(20,241,149,0.20)", delay: "1.8s" },
  { left: "38%", top: "10%", size: 2,   drift: "pdrift-b", color: "rgba(59,130,246,0.30)", delay: "3.2s" },
  { left: "62%", top: "7%",  size: 2.5, drift: "pdrift-c", color: "rgba(59,130,246,0.38)", delay: "0.2s" },
  { left: "72%", top: "22%", size: 2.5, drift: "pdrift-b", color: "rgba(59,130,246,0.40)", delay: "0.4s" },
  { left: "78%", top: "68%", size: 2,   drift: "pdrift-a", color: "rgba(20,241,149,0.35)", delay: "1.2s" },
  { left: "86%", top: "42%", size: 1.5, drift: "pdrift-c", color: "rgba(153,69,255,0.30)", delay: "2.0s" },
  { left: "93%", top: "78%", size: 2,   drift: "pdrift-d", color: "rgba(59,130,246,0.25)", delay: "3.6s" },
  { left: "96%", top: "30%", size: 2,   drift: "pdrift-a", color: "rgba(153,69,255,0.35)", delay: "0.6s" },
  { left: "55%", top: "88%", size: 2,   drift: "pdrift-d", color: "rgba(20,241,149,0.25)", delay: "1.4s" },
  { left: "46%", top: "92%", size: 1.5, drift: "pdrift-a", color: "rgba(153,69,255,0.20)", delay: "4.0s" },
];

const codeRain = [
  { char: "0",    left: "4%",  delay: "0s",    dur: "5.2s", opacity: "0.06" },
  { char: "{}",   left: "10%", delay: "1.3s",  dur: "7.1s", opacity: "0.05" },
  { char: "0",    left: "17%", delay: "0.5s",  dur: "6.0s", opacity: "0.08" },
  { char: "//",   left: "24%", delay: "2.2s",  dur: "8.4s", opacity: "0.05" },
  { char: "<>",   left: "31%", delay: "0.9s",  dur: "5.8s", opacity: "0.06" },
  { char: "null", left: "39%", delay: "3.1s",  dur: "9.2s", opacity: "0.04" },
  { char: "0",    left: "46%", delay: "1.6s",  dur: "6.7s", opacity: "0.07" },
  { char: "=>",   left: "53%", delay: "0.3s",  dur: "7.8s", opacity: "0.05" },
  { char: "0",    left: "60%", delay: "2.9s",  dur: "5.3s", opacity: "0.08" },
  { char: "true", left: "67%", delay: "1.1s",  dur: "8.1s", opacity: "0.04" },
  { char: "{}",   left: "74%", delay: "3.6s",  dur: "6.4s", opacity: "0.06" },
  { char: "0",    left: "81%", delay: "0.7s",  dur: "7.3s", opacity: "0.07" },
  { char: "//",   left: "88%", delay: "2.5s",  dur: "5.6s", opacity: "0.05" },
  { char: "0",    left: "94%", delay: "1.9s",  dur: "9.0s", opacity: "0.06" },
  { char: "<>",   left: "7%",  delay: "4.1s",  dur: "6.8s", opacity: "0.04" },
  { char: "0",    left: "35%", delay: "0.8s",  dur: "8.3s", opacity: "0.07" },
  { char: "fn()", left: "56%", delay: "2.3s",  dur: "7.0s", opacity: "0.04" },
  { char: "0",    left: "71%", delay: "4.6s",  dur: "5.5s", opacity: "0.08" },
  { char: "=>",   left: "14%", delay: "3.4s",  dur: "6.2s", opacity: "0.05" },
  { char: "0",    left: "42%", delay: "1.0s",  dur: "8.8s", opacity: "0.06" },
];

export default function Home() {
  const moduleScenes = [
    /* ── 01 AI Foundations: Neural network ──────── */
    <div key="s0" className="relative flex items-center justify-center overflow-hidden" style={{ height: "168px" }}>
      <div className="absolute w-28 h-28 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,0.2), transparent)", filter: "blur(22px)" }} />
      <svg viewBox="0 0 220 160" fill="none" className="w-full max-w-[280px] h-40">
        <line className="line-pulse-1" x1="110" y1="80" x2="34"  y2="28"  stroke="#3B82F6" strokeWidth="1.2" strokeDasharray="5 3"/>
        <line className="line-pulse-2" x1="110" y1="80" x2="186" y2="28"  stroke="#3B82F6" strokeWidth="1.2" strokeDasharray="5 3"/>
        <line className="line-pulse-3" x1="110" y1="80" x2="34"  y2="132" stroke="#3B82F6" strokeWidth="1.2" strokeDasharray="5 3"/>
        <line className="line-pulse-4" x1="110" y1="80" x2="186" y2="132" stroke="#3B82F6" strokeWidth="1.2" strokeDasharray="5 3"/>
        <circle cx="110" cy="80" r="24" fill="#3B82F6" fillOpacity="0.12" stroke="#3B82F6" strokeWidth="1.8"/>
        <circle cx="110" cy="80" r="16" fill="#3B82F6" fillOpacity="0.08"/>
        <text x="110" y="76" textAnchor="middle" fill="#3B82F6" fontSize="8" fontFamily="monospace" fontWeight="bold" opacity="0.9">AI</text>
        <text x="110" y="87" textAnchor="middle" fill="#3B82F6" fontSize="6" fontFamily="monospace" opacity="0.6">brain</text>
        <circle className="node-ping-1" cx="34"  cy="28"  r="18" fill="#0A0A0A" stroke="#3B82F6" strokeWidth="1.2"/>
        <text x="34"  y="25"  textAnchor="middle" fill="#3B82F6" fontSize="8"  fontFamily="monospace" opacity="0.85">GPT</text>
        <text x="34"  y="35"  textAnchor="middle" fill="#3B82F6" fontSize="6"  fontFamily="monospace" opacity="0.5">-4o</text>
        <circle className="node-ping-2" cx="186" cy="28"  r="18" fill="#0A0A0A" stroke="#3B82F6" strokeWidth="1.2"/>
        <text x="186" y="26"  textAnchor="middle" fill="#3B82F6" fontSize="7.5" fontFamily="monospace" opacity="0.85">Claude</text>
        <text x="186" y="36"  textAnchor="middle" fill="#3B82F6" fontSize="6"  fontFamily="monospace" opacity="0.5">3.5</text>
        <circle className="node-ping-3" cx="34"  cy="132" r="18" fill="#0A0A0A" stroke="#3B82F6" strokeWidth="1.2"/>
        <text x="34"  y="129" textAnchor="middle" fill="#3B82F6" fontSize="7"  fontFamily="monospace" opacity="0.85">DALL</text>
        <text x="34"  y="139" textAnchor="middle" fill="#3B82F6" fontSize="6"  fontFamily="monospace" opacity="0.5">·E 3</text>
        <circle className="node-ping-4" cx="186" cy="132" r="18" fill="#0A0A0A" stroke="#3B82F6" strokeWidth="1.2"/>
        <text x="186" y="129" textAnchor="middle" fill="#3B82F6" fontSize="7"  fontFamily="monospace" opacity="0.85">Midj.</text>
        <text x="186" y="139" textAnchor="middle" fill="#3B82F6" fontSize="6"  fontFamily="monospace" opacity="0.5">v6</text>
      </svg>
    </div>,

    /* ── 02 Prompt Engineering: Chat interface ───── */
    <div key="s1" className="flex flex-col gap-2.5 px-1 py-1 overflow-hidden" style={{ height: "168px" }}>
      {/* User bubble — static */}
      <div className="self-start max-w-[88%] bg-[#8B5CF6]/12 border border-[#8B5CF6]/25 rounded-2xl rounded-tl-sm px-3.5 py-2.5">
        <p className="text-[10px] font-mono text-[#8B5CF6]/85 leading-relaxed">
          &ldquo;Build me a SaaS landing page,<br />dark theme, add a pricing table.&rdquo;
        </p>
        <span className="text-[9px] text-[#8B5CF6]/35 mt-0.5 block">you →</span>
      </div>
      {/* Typing dots */}
      <div className="self-end flex items-center gap-1.5 bg-white/[0.04] border border-white/[0.07] rounded-full px-3 py-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]/60" style={{ animation: "blink-cur 0.9s step-end infinite" }} />
        <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]/60" style={{ animation: "blink-cur 0.9s step-end infinite 0.3s" }} />
        <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]/60" style={{ animation: "blink-cur 0.9s step-end infinite 0.6s" }} />
        <span className="text-[8px] text-white/20 ml-0.5 font-mono">AI</span>
      </div>
      {/* AI response — glowing loop */}
      <div className="ai-bubble-glow self-end max-w-[88%] bg-[#14F195]/08 border border-[#14F195]/20 rounded-2xl rounded-tr-sm px-3.5 py-2.5">
        <div className="flex items-center gap-1.5 mb-1">
          <span className="text-[#14F195] text-xs">✓</span>
          <span className="text-[10px] font-mono text-[#14F195]/90 font-semibold">Here&apos;s your landing page</span>
          <span className="blink-cur text-[#14F195] text-sm leading-none">▌</span>
        </div>
        <div className="text-[9px] font-mono text-white/35">landing.html · 312 lines · deployed</div>
      </div>
    </div>,

    /* ── 03 MVP Building: 3-stage pipeline ────────── */
    <div key="s2" className="relative flex flex-col items-center justify-center gap-3 overflow-hidden" style={{ height: "168px" }}>
      <div className="flex items-center gap-1">
        {/* Stage 1: Idea */}
        <div className="mvp-1 flex flex-col items-center gap-1.5">
          <div className="w-[60px] h-[60px] rounded-2xl border border-[#10B981]/30 bg-[#10B981]/10 flex items-center justify-center text-2xl">💡</div>
          <span className="text-[8px] font-mono text-[#10B981]/55 uppercase tracking-wider">Idea</span>
        </div>
        {/* Arrow 1 */}
        <div className="mvp-a1 flex items-center pb-4">
          <svg viewBox="0 0 28 10" className="w-7 h-2.5" fill="none">
            <path d="M0 5h23M18 1.5l5 3.5-5 3.5" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.45"/>
          </svg>
        </div>
        {/* Stage 2: Wireframe */}
        <div className="mvp-2 flex flex-col items-center gap-1.5">
          <div className="w-[60px] h-[60px] rounded-2xl border border-[#10B981]/30 bg-[#10B981]/10 flex items-center justify-center p-2.5">
            <svg viewBox="0 0 36 28" fill="none" className="w-full h-full">
              <rect x="1" y="1" width="34" height="6" rx="1.5" stroke="#10B981" strokeWidth="1.2" opacity="0.55"/>
              <rect x="1" y="10" width="15" height="17" rx="1.5" stroke="#10B981" strokeWidth="1.2" opacity="0.45"/>
              <rect x="19" y="10" width="16" height="8" rx="1.5" stroke="#10B981" strokeWidth="1.2" opacity="0.45"/>
              <rect x="19" y="20" width="16" height="7" rx="1.5" stroke="#10B981" strokeWidth="1.2" opacity="0.35"/>
            </svg>
          </div>
          <span className="text-[8px] font-mono text-[#10B981]/55 uppercase tracking-wider">Design</span>
        </div>
        {/* Arrow 2 */}
        <div className="mvp-a2 flex items-center pb-4">
          <svg viewBox="0 0 28 10" className="w-7 h-2.5" fill="none">
            <path d="M0 5h23M18 1.5l5 3.5-5 3.5" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.45"/>
          </svg>
        </div>
        {/* Stage 3: Live */}
        <div className="mvp-3 flex flex-col items-center gap-1.5 relative">
          <div className="w-[60px] h-[60px] rounded-2xl border border-[#10B981]/45 bg-[#10B981]/15 flex items-center justify-center relative"
            style={{ boxShadow: "0 0 18px rgba(16,185,129,0.28)" }}>
            <svg viewBox="0 0 26 26" fill="none" className="w-6 h-6">
              <path d="M13 2l2.3 7h7.2L17 13l2 7-6-4.5L7 20l2-7-5.5-4h7.2z" fill="#10B981" fillOpacity="0.65" stroke="#10B981" strokeWidth="1.2"/>
            </svg>
            <div className="absolute -top-2 -right-2 bg-[#10B981] text-[7px] font-mono font-black text-black px-1.5 py-0.5 rounded-full"
              style={{ boxShadow: "0 0 8px #10B981" }}>LIVE</div>
          </div>
          <span className="text-[8px] font-mono text-[#10B981]/55 uppercase tracking-wider">Shipped</span>
        </div>
      </div>
      {/* URL bar */}
      <div className="mvp-url w-full bg-black/40 border border-[#10B981]/12 rounded-xl px-3 py-1.5 flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-[#10B981]" style={{ boxShadow: "0 0 5px #10B981" }} />
        <span className="text-[9px] font-mono text-white/30 flex-1">your-mvp.vercel.app</span>
        <span className="text-[8px] font-mono text-[#10B981]/50">↑ deployed</span>
      </div>
    </div>,

    /* ── 04 Automation: Workflow nodes ────────────── */
    <div key="s3" className="relative flex flex-col items-center justify-center gap-3 overflow-hidden" style={{ height: "168px" }}>
      <svg viewBox="0 0 280 120" fill="none" className="w-full max-w-[300px]">
        {/* Connection lines */}
        <line className="line-pulse-2" x1="68" y1="55" x2="112" y2="55" stroke="#F59E0B" strokeWidth="1.2" strokeDasharray="4 3"/>
        <line className="line-pulse-3" x1="168" y1="55" x2="212" y2="55" stroke="#F59E0B" strokeWidth="1.2" strokeDasharray="4 3"/>
        {/* Vertical to bottom output */}
        <line className="line-pulse-4" x1="140" y1="85" x2="140" y2="108" stroke="#F59E0B" strokeWidth="1" strokeDasharray="3 3" opacity="0.4"/>
        {/* Node 1: Gmail */}
        <circle className="node-ping-1" cx="40"  cy="55" r="26" fill="#F59E0B" fillOpacity="0.1" stroke="#F59E0B" strokeWidth="1.2"/>
        <rect x="27" y="44" width="26" height="18" rx="3" stroke="#F59E0B" strokeWidth="1.2" strokeOpacity="0.8"/>
        <path d="M27 47l13 8 13-8" stroke="#F59E0B" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.8"/>
        <text x="40" y="73" textAnchor="middle" fill="#F59E0B" fontSize="7" fontFamily="monospace" opacity="0.55">Gmail</text>
        {/* Node 2: Make */}
        <circle className="node-ping-2" cx="140" cy="55" r="26" fill="#F59E0B" fillOpacity="0.15" stroke="#F59E0B" strokeWidth="1.6"
          style={{ filter: "drop-shadow(0 0 8px rgba(245,158,11,0.4))" }}/>
        <path d="M140 41v28M126 55h28" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="140" cy="55" r="5" fill="#F59E0B" fillOpacity="0.5"/>
        <text x="140" y="92" textAnchor="middle" fill="#F59E0B" fontSize="7" fontFamily="monospace" opacity="0.55">Make</text>
        {/* Node 3: Notion */}
        <circle className="node-ping-3" cx="240" cy="55" r="26" fill="#F59E0B" fillOpacity="0.1" stroke="#F59E0B" strokeWidth="1.2"/>
        <rect x="228" y="43" width="24" height="20" rx="2.5" stroke="#F59E0B" strokeWidth="1.2" strokeOpacity="0.8"/>
        <line x1="232" y1="49" x2="248" y2="49" stroke="#F59E0B" strokeWidth="1" strokeOpacity="0.7" strokeLinecap="round"/>
        <line x1="232" y1="53" x2="248" y2="53" stroke="#F59E0B" strokeWidth="1" strokeOpacity="0.7" strokeLinecap="round"/>
        <line x1="232" y1="57" x2="243" y2="57" stroke="#F59E0B" strokeWidth="1" strokeOpacity="0.5" strokeLinecap="round"/>
        <text x="240" y="92" textAnchor="middle" fill="#F59E0B" fontSize="7" fontFamily="monospace" opacity="0.55">Notion</text>
        {/* Traveling packet: SVG animateTransform, 70→210 in SVG units */}
        <circle cx="68" cy="55" r="4" fill="#F59E0B" style={{ filter: "drop-shadow(0 0 4px #F59E0B)" }}>
          <animateTransform attributeName="transform" type="translate"
            values="0,0; 172,0; 172,0" keyTimes="0; 0.82; 1"
            dur="2.8s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0; 1; 1; 0" keyTimes="0; 0.06; 0.82; 0.95" dur="2.8s" repeatCount="indefinite"/>
        </circle>
        {/* Output badge */}
        <rect x="82" y="108" width="116" height="14" rx="4" fill="#F59E0B" fillOpacity="0.08" stroke="#F59E0B" strokeWidth="0.8" strokeOpacity="0.3"/>
        <text x="140" y="118" textAnchor="middle" fill="#F59E0B" fontSize="6.5" fontFamily="monospace" opacity="0.55">↻ runs automatically · 24/7</text>
      </svg>
    </div>,
  ];

  /* ── Step card illustrations + hover reveal data ── */
  const stepExtras = [
    // Week 1 - Intro to AI: 4 tool tiles pulsing
    {
      skills: ["GPT-4o", "Claude 3.5", "Builder mindset"],
      illustration: (
        <div className="flex flex-wrap gap-2 items-center justify-center p-4 h-full">
          {[
            { name: "GPT-4o",  cls: "tile-1 node-ping-1", c: "#3B82F6" },
            { name: "Claude",  cls: "tile-2 node-ping-2", c: "#3B82F6" },
            { name: "DALL·E",  cls: "tile-3 node-ping-3", c: "#3B82F6" },
            { name: "Midj.",   cls: "tile-4 node-ping-4", c: "#3B82F6" },
          ].map(({ name, cls, c }) => (
            <div key={name} className={`${cls} flex flex-col items-center justify-center gap-1.5 w-[72px] h-[56px] rounded-xl border`}
              style={{ borderColor: c + "35", background: c + "0f" }}>
              <div className="w-4 h-4 rounded-md flex items-center justify-center" style={{ background: c + "30" }}>
                <div className="w-2 h-2 rounded-full" style={{ background: c, boxShadow: `0 0 5px ${c}` }}/>
              </div>
              <span className="text-[8px] font-mono" style={{ color: c, opacity: 0.75 }}>{name}</span>
            </div>
          ))}
        </div>
      ),
    },

    // Week 2 - Prompt Engineering: mini chat loop
    {
      skills: ["Prompt anatomy", "Context framing", "Iteration"],
      illustration: (
        <div className="flex flex-col justify-center gap-2 p-3 h-full">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-full bg-[#8B5CF6]/25 border border-[#8B5CF6]/40 flex-shrink-0 flex items-center justify-center text-[8px] font-mono text-[#8B5CF6]/80">U</div>
            <div className="flex-1 rounded-lg border border-[#8B5CF6]/25 bg-[#8B5CF6]/08 px-2.5 py-1.5 flex items-center gap-1">
              <span className="text-[9px] font-mono text-[#8B5CF6]/80">&ldquo;Design a SaaS dashboard&rdquo;</span>
              <span className="blink-cur text-[#8B5CF6] text-xs leading-none">▌</span>
            </div>
          </div>
          <div className="flex items-center gap-1 ml-7">
            {[0, 0.28, 0.56].map((d) => (
              <span key={d} className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]/55"
                style={{ animation: `blink-cur 0.85s step-end infinite ${d}s` }}/>
            ))}
          </div>
          <div className="ai-bubble-glow flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-full bg-[#14F195]/20 border border-[#14F195]/35 flex-shrink-0 flex items-center justify-center">
              <span className="text-[#14F195] text-[9px]">✓</span>
            </div>
            <div className="flex-1 rounded-lg border border-[#14F195]/20 bg-[#14F195]/06 px-2.5 py-1.5">
              <span className="text-[9px] font-mono text-[#14F195]/80">Dashboard ready · 318 lines</span>
            </div>
          </div>
        </div>
      ),
    },

    // Week 3 - Design Thinking → MVP: pipeline
    {
      skills: ["User research", "Problem framing", "MVP scoping"],
      illustration: (
        <div className="flex items-center justify-center gap-2 px-3 h-full">
          <div className="mvp-1 flex flex-col items-center gap-1">
            <div className="w-[52px] h-[52px] rotate-45 border border-[#06B6D4]/40 bg-[#06B6D4]/10 flex items-center justify-center">
              <span className="-rotate-45 text-xl">💡</span>
            </div>
            <span className="text-[8px] font-mono text-[#06B6D4]/55">Think</span>
          </div>
          <svg viewBox="0 0 24 8" className="w-5 h-2 mb-3" fill="none">
            <path d="M0 4h19M15 1.5l4 2.5-4 2.5" stroke="#06B6D4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.45"/>
          </svg>
          <div className="mvp-2 flex flex-col items-center gap-1">
            <div className="w-[52px] h-[52px] rounded-xl border border-[#06B6D4]/35 bg-[#06B6D4]/08 p-2">
              <svg viewBox="0 0 32 28" fill="none" className="w-full h-full">
                <rect x="1" y="1" width="30" height="5" rx="1.5" stroke="#06B6D4" strokeWidth="1.2" opacity="0.55"/>
                <rect x="1" y="9" width="12" height="18" rx="1.5" stroke="#06B6D4" strokeWidth="1.2" opacity="0.45"/>
                <rect x="16" y="9" width="15" height="8" rx="1.5" stroke="#06B6D4" strokeWidth="1.2" opacity="0.45"/>
                <rect x="16" y="19" width="15" height="8" rx="1.5" stroke="#06B6D4" strokeWidth="1.2" opacity="0.35"/>
              </svg>
            </div>
            <span className="text-[8px] font-mono text-[#06B6D4]/55">Design</span>
          </div>
          <svg viewBox="0 0 24 8" className="w-5 h-2 mb-3" fill="none">
            <path d="M0 4h19M15 1.5l4 2.5-4 2.5" stroke="#06B6D4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.45"/>
          </svg>
          <div className="mvp-3 flex flex-col items-center gap-1">
            <div className="relative w-[52px] h-[52px] rounded-xl border border-[#06B6D4]/50 bg-[#06B6D4]/15 flex items-center justify-center"
              style={{ boxShadow: "0 0 14px rgba(6,182,212,0.3)" }}>
              <span className="text-xl">🚀</span>
              <div className="absolute -top-1.5 -right-1.5 bg-[#06B6D4] text-[6px] font-mono font-black text-black px-1 py-0.5 rounded-full">MVP</div>
            </div>
            <span className="text-[8px] font-mono text-[#06B6D4]/55">Ship</span>
          </div>
        </div>
      ),
    },

    // Week 4 - Build MVP: sequential code lines
    {
      skills: ["No-code tools", "AI-first build", "Deploy live"],
      illustration: (
        <div className="flex flex-col justify-center gap-2 px-4 py-3 h-full">
          <div className="space-y-2">
            {[
              { w: "78%", cls: "vl-1", op: 0.65 },
              { w: "62%", cls: "vl-2", op: 0.55 },
              { w: "88%", cls: "vl-3", op: 0.65 },
              { w: "50%", cls: "vl-4", op: 0.45 },
              { w: "72%", cls: "vl-5", op: 0.55 },
            ].map(({ w, cls, op }, i) => (
              <div key={i} className={`${cls} h-1.5 rounded-full`}
                style={{ width: w, background: `linear-gradient(90deg, rgba(16,185,129,${op}), rgba(16,185,129,0.1))` }}/>
            ))}
          </div>
          <div className="vl-preview flex items-center gap-2 mt-1">
            <div className="w-2 h-2 rounded-full bg-[#10B981]" style={{ boxShadow: "0 0 5px #10B981" }}/>
            <span className="text-[9px] font-mono text-[#10B981]/70">building with AI</span>
            <span className="blink-cur text-[#10B981] text-xs leading-none">▌</span>
          </div>
        </div>
      ),
    },

    // Week 5 - Automation: spinning gear pair
    {
      skills: ["AI workflows", "Triggers & actions", "Smart routing"],
      illustration: (
        <div className="flex items-center justify-center h-full">
          <svg viewBox="0 0 130 90" fill="none" className="w-[170px]">
            {/* Large gear */}
            <g className="gear-cw" style={{ transformOrigin: "42px 48px" }}>
              <circle cx="42" cy="48" r="22" stroke="#F59E0B" strokeWidth="8" strokeDasharray="6 3.5" strokeOpacity="0.65"/>
              <circle cx="42" cy="48" r="9" fill="#F59E0B" fillOpacity="0.2" stroke="#F59E0B" strokeWidth="1.5"/>
              <circle cx="42" cy="48" r="4" fill="#F59E0B" fillOpacity="0.5"/>
            </g>
            {/* Small gear */}
            <g className="gear-ccw" style={{ transformOrigin: "82px 28px" }}>
              <circle cx="82" cy="28" r="13" stroke="#F59E0B" strokeWidth="6" strokeDasharray="4.5 3" strokeOpacity="0.5"/>
              <circle cx="82" cy="28" r="5" fill="#F59E0B" fillOpacity="0.2" stroke="#F59E0B" strokeWidth="1.2"/>
              <circle cx="82" cy="28" r="2.5" fill="#F59E0B" fillOpacity="0.5"/>
            </g>
            {/* Mesh point */}
            <circle cx="64" cy="38" r="3" fill="#F59E0B" fillOpacity="0.35" className="node-ping-3"/>
            <text x="42" y="78" textAnchor="middle" fill="#F59E0B" fontSize="7" fontFamily="monospace" opacity="0.45">automate</text>
            <text x="82" y="50" textAnchor="middle" fill="#F59E0B" fontSize="6.5" fontFamily="monospace" opacity="0.4">save time</text>
            {/* Arrow output */}
            <path d="M100 48h22M116 44l6 4-6 4" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.35"/>
            <text x="115" y="64" textAnchor="middle" fill="#F59E0B" fontSize="6" fontFamily="monospace" opacity="0.35">output</text>
          </svg>
        </div>
      ),
    },

    // Week 6 - Platforms: triangle network (Make/Zapier/n8n)
    {
      skills: ["Make", "Zapier", "n8n"],
      illustration: (
        <div className="flex items-center justify-center h-full">
          <svg viewBox="0 0 190 105" fill="none" className="w-[210px] max-w-full">
            <line className="line-pulse-1" x1="58" y1="30" x2="132" y2="30" stroke="#EC4899" strokeWidth="1" strokeDasharray="4 3"/>
            <line className="line-pulse-2" x1="46" y1="48" x2="82"  y2="86" stroke="#EC4899" strokeWidth="1" strokeDasharray="4 3"/>
            <line className="line-pulse-3" x1="144" y1="48" x2="108" y2="86" stroke="#EC4899" strokeWidth="1" strokeDasharray="4 3"/>
            {/* Make */}
            <circle className="node-ping-1" cx="44"  cy="30" r="20" fill="#EC4899" fillOpacity="0.1" stroke="#EC4899" strokeWidth="1.2"/>
            <text x="44"  y="27" textAnchor="middle" fill="#EC4899" fontSize="7.5" fontFamily="monospace" fontWeight="bold" opacity="0.9">Make</text>
            <text x="44"  y="37" textAnchor="middle" fill="#EC4899" fontSize="6"   fontFamily="monospace" opacity="0.5">⬡ ⬡</text>
            {/* Zapier */}
            <circle className="node-ping-2" cx="146" cy="30" r="20" fill="#EC4899" fillOpacity="0.1" stroke="#EC4899" strokeWidth="1.2"/>
            <text x="146" y="27" textAnchor="middle" fill="#EC4899" fontSize="7.5" fontFamily="monospace" fontWeight="bold" opacity="0.9">Zapier</text>
            <text x="146" y="37" textAnchor="middle" fill="#EC4899" fontSize="6"   fontFamily="monospace" opacity="0.5">⚡ ⚡</text>
            {/* n8n (center bottom, highlighted) */}
            <circle className="node-ping-3" cx="95"  cy="92" r="20" fill="#EC4899" fillOpacity="0.15" stroke="#EC4899" strokeWidth="1.6"
              style={{ filter: "drop-shadow(0 0 6px rgba(236,72,153,0.45))" }}/>
            <text x="95"  y="90" textAnchor="middle" fill="#EC4899" fontSize="10" fontFamily="monospace" fontWeight="bold" opacity="0.9">n8n</text>
            <text x="95"  y="100" textAnchor="middle" fill="#EC4899" fontSize="6"  fontFamily="monospace" opacity="0.5">open src</text>
            {/* Center routing dot */}
            <circle cx="95" cy="50" r="3" fill="#EC4899" fillOpacity="0.45" className="node-ping-4"/>
          </svg>
        </div>
      ),
    },

    // Week 7 - Ship It: floating rocket + LIVE badge
    {
      skills: ["Final product", "Live deploy", "Real users"],
      illustration: (
        <div className="flex flex-col items-center justify-center gap-2 h-full py-1">
          <div className="float-small relative">
            <div className="absolute inset-0 rounded-full blur-lg opacity-55"
              style={{ background: "radial-gradient(circle, rgba(168,85,247,0.6), transparent)" }}/>
            <svg viewBox="0 0 48 58" fill="none" className="relative w-9 h-11"
              style={{ filter: "drop-shadow(0 0 8px rgba(168,85,247,0.65))" }}>
              <path d="M24 3C24 3 13 14 13 30h22C35 14 24 3 24 3z" fill="#A855F7" fillOpacity="0.7" stroke="#A855F7" strokeWidth="1.5"/>
              <rect x="16" y="28" width="16" height="11" rx="2" fill="#A855F7" fillOpacity="0.45" stroke="#A855F7" strokeWidth="1.2"/>
              <path d="M17 39l-4 8h22l-4-8z" fill="#A855F7" fillOpacity="0.35" stroke="#A855F7" strokeWidth="1"/>
              <circle cx="24" cy="25" r="5" fill="#A855F7" fillOpacity="0.3" stroke="#A855F7" strokeWidth="1.5"/>
              <circle cx="24" cy="25" r="2.5" fill="#A855F7" opacity="0.75"/>
              <path d="M19 47c0 5 2.5 8.5 5 11 2.5-2.5 5-6 5-11z" fill="#14F195" fillOpacity="0.65" stroke="#14F195" strokeWidth="0.8"/>
            </svg>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-[#A855F7] text-[7px] font-mono font-black text-black px-2 py-0.5 rounded-full"
              style={{ boxShadow: "0 0 10px rgba(168,85,247,0.6)" }}>LIVE</div>
            <span className="text-[8px] font-mono text-[#A855F7]/55">your-app.vercel.app</span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white overflow-x-hidden">
      <Nav />

      {/* ── HERO ──────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20 overflow-hidden">

        {/* ── Layer 0: Rotating conic gradient background ── */}
        <div className="hero-bg-rotate absolute inset-[-50%] pointer-events-none">
          <div className="w-full h-full" style={{
            background: "conic-gradient(from 0deg at 50% 50%, rgba(153,69,255,0.07) 0deg, rgba(59,130,246,0.09) 90deg, rgba(20,241,149,0.05) 180deg, rgba(139,92,246,0.07) 270deg, rgba(153,69,255,0.07) 360deg)"
          }} />
        </div>

        {/* ── Layer 1: Dot grid texture ── */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }} />

        {/* ── Layer 2: Depth blobs ── */}
        <div className="blob-1 absolute top-[15%] left-[10%] w-[700px] h-[700px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(153,69,255,0.28) 0%, transparent 65%)", filter: "blur(90px)" }} />
        <div className="blob-2 absolute bottom-[10%] right-[8%] w-[750px] h-[750px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(59,130,246,0.25) 0%, transparent 65%)", filter: "blur(110px)" }} />
        <div className="blob-3 absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[350px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(20,241,149,0.08) 0%, transparent 65%)", filter: "blur(70px)" }} />

        {/* ── Layer 3: Glow wave rings (radar pings from centre) ── */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="glow-ring-1 absolute w-[220px] h-[220px] rounded-full"
            style={{ border: "1px solid rgba(153,69,255,0.4)" }} />
          <div className="glow-ring-2 absolute w-[220px] h-[220px] rounded-full"
            style={{ border: "1px solid rgba(59,130,246,0.3)" }} />
          <div className="glow-ring-3 absolute w-[220px] h-[220px] rounded-full"
            style={{ border: "1px solid rgba(20,241,149,0.2)" }} />
        </div>

        {/* ── Layer 4: Floating particles ── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {heroParticles.map((p, i) => (
            <div
              key={i}
              className={`${p.drift} absolute rounded-full`}
              style={{
                left: p.left,
                top: p.top,
                width: `${p.size}px`,
                height: `${p.size}px`,
                background: p.color,
                animationDelay: p.delay,
                boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
              }}
            />
          ))}
        </div>

        {/* ── Layer 5: Headline glow pulse ── */}
        <div className="headline-pulse absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[860px] h-[420px] rounded-full" style={{
            background: "radial-gradient(ellipse, rgba(153,69,255,0.14) 0%, rgba(59,130,246,0.10) 45%, transparent 72%)",
            filter: "blur(48px)",
          }} />
        </div>

        {/* ── Content ── */}
        <div className="relative z-10 max-w-5xl mx-auto">

          {/* Pre-headline badge */}
          <div className="inline-flex items-center gap-2 bg-white/[0.05] border border-[#9945FF]/25 rounded-full px-5 py-1.5 mb-8"
            style={{ boxShadow: "0 0 20px rgba(153,69,255,0.15)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#14F195] inline-block"
              style={{ boxShadow: "0 0 8px #14F195", animation: "hero-btn-glow 2s ease-in-out infinite" }} />
            <span className="text-white/55 text-xs font-mono uppercase tracking-widest">Vibe Coding Platform · Web3 Edition</span>
          </div>

          <h1 className="font-heading font-black text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.04] tracking-tight mb-3">
            Build Real AI Products.
          </h1>
          <h1 className="font-heading font-black text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.04] tracking-tight mb-8"
            style={{
              background: "linear-gradient(90deg, #9945FF 0%, #3B82F6 50%, #14F195 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
            From Zero.
          </h1>

          <p className="text-white/50 text-xl md:text-2xl font-body max-w-xl mx-auto mb-12 leading-relaxed">
            Taught by Mariam Manjavidze — hands-on program for complete beginners.
            No coding background needed.
          </p>

          {/* CTA button — premium Solana gradient + pulsing glow */}
          <Link
            href="/login"
            className="hero-cta-btn inline-flex items-center gap-3 text-white font-bold text-lg px-10 py-5 rounded-full transition-all duration-300 hover:scale-105 hover:brightness-110"
            style={{
              background: "linear-gradient(135deg, #9945FF 0%, #3B82F6 60%, #14F195 100%)",
            }}
          >
            <span>Start Learning</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>

          {/* Trust micro-copy */}
          <p className="text-white/20 text-xs font-mono mt-5 tracking-wide">0.01 SOL · Phantom Wallet · Instant Access</p>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-bounce absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/25 text-xs font-body">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
          scroll
        </div>
      </section>

      <div className="section-divider" />

      {/* ── WHAT IS VIBE CODING — animated scene ──────── */}
      <section className="py-24 px-6 relative overflow-hidden">
        {/* Ambient background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(153,69,255,0.07) 0%, transparent 65%)", filter: "blur(60px)" }} />
          <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(20,241,149,0.06) 0%, transparent 65%)", filter: "blur(60px)" }} />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">

          {/* Section label */}
          <p className="text-white/30 uppercase tracking-widest text-xs font-mono text-center mb-4">What is Vibe Coding</p>

          {/* Headline */}
          <h2 className="font-heading font-black text-4xl md:text-5xl text-center leading-tight mb-14">
            You describe it.{" "}
            <span style={{ background: "linear-gradient(90deg, #9945FF, #14F195)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              AI builds it.
            </span>
          </h2>

          {/* ═══ Scene ════════════════════════════════════════════ */}
          <div className="grid md:grid-cols-[1fr_96px_1fr] items-center gap-6 md:gap-4">

            {/* ── LEFT: Builder ── */}
            <div className="builder-glow rounded-3xl border border-[#9945FF]/20 bg-white/[0.03] p-6 flex flex-col items-center gap-5">

              {/* Builder avatar */}
              <div className="relative">
                <div className="absolute inset-[-12px] rounded-full blur-xl opacity-50"
                  style={{ background: "radial-gradient(circle, rgba(153,69,255,0.5), transparent)" }} />
                <svg viewBox="0 0 80 90" fill="none" className="relative w-16 h-[72px]">
                  {/* Head */}
                  <circle cx="40" cy="22" r="16" fill="url(#builderHead)" stroke="rgba(153,69,255,0.4)" strokeWidth="1.5"/>
                  {/* Eyes */}
                  <circle cx="33" cy="21" r="3" fill="white" opacity="0.9"/>
                  <circle cx="47" cy="21" r="3" fill="white" opacity="0.9"/>
                  <circle cx="34" cy="22" r="1.5" fill="#1a0a2e"/>
                  <circle cx="48" cy="22" r="1.5" fill="#1a0a2e"/>
                  <circle cx="34.5" cy="21" r="0.8" fill="white" opacity="0.6"/>
                  <circle cx="48.5" cy="21" r="0.8" fill="white" opacity="0.6"/>
                  {/* Smile */}
                  <path d="M34 28 Q40 33 46 28" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.7"/>
                  {/* Body */}
                  <rect x="22" y="42" width="36" height="32" rx="12" fill="url(#builderBody)" opacity="0.9"/>
                  {/* Arms */}
                  <rect x="10" y="44" width="14" height="10" rx="5" fill="url(#builderBody)" opacity="0.8"/>
                  <rect x="56" y="44" width="14" height="10" rx="5" fill="url(#builderBody)" opacity="0.8"/>
                  {/* Legs */}
                  <rect x="26" y="70" width="11" height="16" rx="5" fill="url(#builderBody)" opacity="0.7"/>
                  <rect x="43" y="70" width="11" height="16" rx="5" fill="url(#builderBody)" opacity="0.7"/>
                  <defs>
                    <linearGradient id="builderHead" x1="24" y1="6" x2="56" y2="38" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#c084fc"/><stop offset="1" stopColor="#9945FF"/>
                    </linearGradient>
                    <linearGradient id="builderBody" x1="22" y1="42" x2="58" y2="86" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#9945FF"/><stop offset="1" stopColor="#6e3bc4"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Label */}
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#9945FF]" style={{ boxShadow: "0 0 8px #9945FF" }} />
                <span className="text-white/50 text-xs font-mono uppercase tracking-widest">The Builder</span>
              </div>

              {/* Speech bubble */}
              <div className="speech-bob relative w-full">
                <div className="rounded-2xl border border-[#9945FF]/25 bg-[#9945FF]/[0.07] px-4 py-3 text-left">
                  {/* Bubble tail */}
                  <div className="absolute -top-2 left-8 w-4 h-4 rotate-45 border-l border-t border-[#9945FF]/25 bg-[#0A0A0A]" />
                  <p className="text-white/80 text-sm font-body leading-relaxed">
                    &ldquo;Make me a landing page with Solana vibes, dark mode, and a mint button.&rdquo;
                  </p>
                  <div className="mt-2 flex items-center gap-1.5">
                    <span className="text-[#9945FF] text-xs font-mono">typed by you</span>
                    <span className="blink-cur text-[#9945FF] text-sm font-mono">▌</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ── CENTRE: Symbol stream ── */}
            <div className="flex flex-col items-center justify-center gap-3 relative h-full min-h-[200px]">
              {/* Dashed connecting line */}
              <div className="absolute top-1/2 left-0 right-0 h-px -translate-y-1/2 hidden md:block"
                style={{ background: "linear-gradient(90deg, rgba(153,69,255,0.3), rgba(20,241,149,0.3))" }} />

              {/* Floating symbols */}
              <div className="relative flex flex-col items-center gap-4 z-10">
                {[
                  { sym: "</>",  cls: "vibe-sym-1", color: "#9945FF" },
                  { sym: "{ }",  cls: "vibe-sym-2", color: "#3B82F6" },
                  { sym: "fn()", cls: "vibe-sym-3", color: "#14F195" },
                  { sym: "0x",   cls: "vibe-sym-4", color: "#9945FF" },
                  { sym: "✦",    cls: "vibe-sym-5", color: "#14F195" },
                ].map(({ sym, cls, color }) => (
                  <span key={sym} className={`${cls} font-mono text-xs font-bold`}
                    style={{ color, textShadow: `0 0 10px ${color}` }}>
                    {sym}
                  </span>
                ))}
              </div>

              {/* Arrow */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:block">
                <svg viewBox="0 0 32 16" className="w-8 h-4" fill="none">
                  <path d="M0 8 H28 M22 2 L28 8 L22 14" stroke="url(#arrowG)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <defs>
                    <linearGradient id="arrowG" x1="0" y1="0" x2="32" y2="0" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#9945FF"/><stop offset="1" stopColor="#14F195"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>

            {/* ── RIGHT: AI generating ── */}
            <div className="ai-glow rounded-3xl border border-[#14F195]/15 bg-white/[0.03] p-6 flex flex-col items-center gap-5">

              {/* Ghost avatar */}
              <div className="relative outcome-float-2">
                <div className="absolute inset-[-10px] rounded-full blur-xl opacity-50"
                  style={{ background: "radial-gradient(circle, rgba(20,241,149,0.45), rgba(153,69,255,0.3), transparent)" }} />
                <svg viewBox="0 0 80 90" fill="none" className="relative w-16 h-[72px]"
                  style={{ filter: "drop-shadow(0 0 12px rgba(20,241,149,0.5))" }}>
                  <path d="M14 42C14 20 25 6 40 6C55 6 66 20 66 42L66 76C66 79 63 81 61 78L54 72L47 78C45 80 43 80 41 78L40 76L39 78C37 80 35 80 33 78L26 72L19 78C17 81 14 79 14 76Z"
                    fill="url(#aiGhost)" fillOpacity="0.95" stroke="rgba(20,241,149,0.3)" strokeWidth="1.5"/>
                  <ellipse cx="30" cy="43" rx="5.5" ry="6.5" fill="white" opacity="0.95"/>
                  <ellipse cx="50" cy="43" rx="5.5" ry="6.5" fill="white" opacity="0.95"/>
                  <ellipse cx="31" cy="45" rx="2.8" ry="3.2" fill="#001a0a"/>
                  <ellipse cx="51" cy="45" rx="2.8" ry="3.2" fill="#001a0a"/>
                  <circle cx="32" cy="43" r="1.2" fill="white" opacity="0.7"/>
                  <circle cx="52" cy="43" r="1.2" fill="white" opacity="0.7"/>
                  {/* Sparkles */}
                  <circle cx="68" cy="22" r="3.5" fill="#14F195" opacity="0.9" style={{ filter: "blur(0.5px)" }}/>
                  <circle cx="68" cy="22" r="1.5" fill="white"/>
                  <circle cx="74" cy="14" r="2" fill="#14F195" opacity="0.6"/>
                  <circle cx="62" cy="12" r="1.5" fill="#14F195" opacity="0.5"/>
                  <circle cx="72" cy="30" r="1" fill="white" opacity="0.4"/>
                  <defs>
                    <linearGradient id="aiGhost" x1="14" y1="6" x2="66" y2="90" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#14F195"/><stop offset="1" stopColor="#0a8a52"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Label */}
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#14F195]" style={{ boxShadow: "0 0 8px #14F195" }} />
                <span className="text-white/50 text-xs font-mono uppercase tracking-widest">AI Assistant</span>
              </div>

              {/* Terminal output */}
              <div className="w-full rounded-xl border border-white/[0.07] bg-black/40 overflow-hidden">
                {/* Terminal top bar */}
                <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/[0.06]">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]"/>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]"/>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]"/>
                  <span className="text-white/20 text-[10px] font-mono ml-2">generating...</span>
                </div>
                {/* Code lines */}
                <div className="p-3 font-mono text-[11px] leading-relaxed space-y-1">
                  <div className="vl-1 flex gap-2">
                    <span className="text-[#14F195]/60">1</span>
                    <span className="text-[#9945FF]/80">const</span>
                    <span className="text-white/70">page =</span>
                    <span className="text-[#14F195]/70">&ldquo;landing&rdquo;</span>
                  </div>
                  <div className="vl-2 flex gap-2">
                    <span className="text-[#14F195]/60">2</span>
                    <span className="text-[#3B82F6]/80">theme</span>
                    <span className="text-white/50">:</span>
                    <span className="text-[#14F195]/70">&ldquo;solana&rdquo;</span>
                  </div>
                  <div className="vl-3 flex gap-2">
                    <span className="text-[#14F195]/60">3</span>
                    <span className="text-[#3B82F6]/80">mode</span>
                    <span className="text-white/50">:</span>
                    <span className="text-[#9945FF]/70">&ldquo;dark&rdquo;</span>
                  </div>
                  <div className="vl-4 flex gap-2">
                    <span className="text-[#14F195]/60">4</span>
                    <span className="text-[#3B82F6]/80">button</span>
                    <span className="text-white/50">:</span>
                    <span className="text-[#14F195]/70">&ldquo;Mint NFT&rdquo;</span>
                  </div>
                  <div className="vl-5 flex items-center gap-2">
                    <span className="text-[#14F195]/60">5</span>
                    <span className="text-[#14F195]">✓</span>
                    <span className="text-[#14F195]/80">build()</span>
                    <span className="blink-cur text-[#14F195] text-sm">▌</span>
                  </div>
                </div>
                {/* Mini app preview card */}
                <div className="vl-preview mx-3 mb-3 rounded-lg overflow-hidden border border-[#14F195]/20">
                  <div className="flex items-center gap-1.5 px-2 py-1.5 bg-white/[0.04] border-b border-white/[0.06]">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/20"/>
                      <div className="w-1.5 h-1.5 rounded-full bg-white/20"/>
                      <div className="w-1.5 h-1.5 rounded-full bg-white/20"/>
                    </div>
                    <div className="flex-1 bg-white/[0.06] rounded text-[9px] font-mono text-white/30 px-2 py-0.5 text-center">
                      your-app.vercel.app
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#14F195]" style={{ boxShadow: "0 0 4px #14F195" }}/>
                      <span className="text-[#14F195] text-[9px] font-mono">LIVE</span>
                    </div>
                  </div>
                  <div className="p-3 text-center" style={{
                    background: "linear-gradient(135deg, rgba(153,69,255,0.15), rgba(20,241,149,0.08))"
                  }}>
                    <div className="text-[10px] font-heading font-bold text-white/80 mb-1">My Solana dApp</div>
                    <div className="inline-block text-[8px] font-mono bg-[#14F195]/15 border border-[#14F195]/30 text-[#14F195] px-2 py-0.5 rounded-full">
                      Mint NFT →
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom tagline */}
          <p className="text-center text-white/35 mt-10 font-mono text-sm tracking-wide">
            You focus on the idea.{" "}
            <span style={{ color: "#14F195", opacity: 0.7 }}>AI handles the rest.</span>
          </p>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── INSTRUCTOR ─────────────────────────────────── */}
      <section className="py-24 px-6 relative overflow-hidden">
        {/* Ambient orbs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(153,69,255,0.12) 0%, transparent 65%)", filter: "blur(60px)" }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(20,241,149,0.08) 0%, transparent 65%)", filter: "blur(60px)" }} />

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-14">

            {/* ── Photo column ── */}
            <div className="flex-shrink-0 flex flex-col items-center gap-5">
              {/* Spinning gradient ring + photo */}
              <div className="relative w-52 h-52 md:w-64 md:h-64">
                {/* Spinning conic gradient ring */}
                <div
                  className="ring-spin absolute inset-[-4px] rounded-full"
                  style={{ background: "conic-gradient(from 0deg, #9945FF, #14F195, #3B82F6, #9945FF)", padding: "3px" }}
                >
                  <div className="w-full h-full rounded-full bg-[#0A0A0A]" />
                </div>
                {/* Static glow pulse */}
                <div className="builder-photo-ring absolute inset-0 rounded-full" />
                {/* Photo */}
                <img
                  src="/mariam.jpg"
                  alt="Mariam Manjavidze"
                  className="relative z-10 w-full h-full rounded-full object-cover"
                />
                {/* Live indicator */}
                <div className="absolute bottom-3 right-3 z-20 flex items-center gap-1.5 bg-[#0d0d0d] border border-[#14F195]/30 rounded-full px-2.5 py-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#14F195]" style={{ boxShadow: "0 0 6px #14F195" }} />
                  <span className="text-[#14F195] text-[10px] font-body font-semibold">LIVE</span>
                </div>
              </div>

              {/* Mini on-chain credential card */}
              <div className="w-full max-w-[220px] bg-white/[0.03] border border-white/[0.08] rounded-2xl px-4 py-3.5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg,#9945FF,#14F195)" }}>
                    <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3">
                      <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="text-white/60 text-[10px] font-mono uppercase tracking-widest">Builder Registry</span>
                </div>
                <div className="space-y-1.5">
                  {[
                    { k: "Status", v: "Active Builder", accent: "#14F195" },
                    { k: "Stack", v: "AI + Design", accent: "#9945FF" },
                    { k: "Students", v: "0 → builders", accent: "#3B82F6" },
                  ].map(({ k, v, accent }) => (
                    <div key={k} className="flex items-center justify-between">
                      <span className="text-white/30 text-[10px] font-mono">{k}</span>
                      <span className="text-[10px] font-mono font-semibold" style={{ color: accent }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Content column ── */}
            <div className="flex-1 text-center md:text-left">

              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 bg-[#9945FF]/10 border border-[#9945FF]/20 rounded-full px-3.5 py-1.5 mb-5">
                <svg viewBox="0 0 14 14" fill="none" className="w-3.5 h-3.5 text-[#9945FF]">
                  <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.4"/>
                  <path d="M5 7l1.5 1.5L9 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-[#9945FF] text-xs font-body font-semibold uppercase tracking-widest">Your Instructor</span>
              </div>

              {/* Name + verified */}
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2 flex-wrap">
                <h2 className="font-heading font-black text-4xl md:text-5xl">Mariam Manjavidze</h2>
                <span
                  className="inline-flex items-center gap-1 text-[10px] font-body font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mt-1"
                  style={{ background: "rgba(20,241,149,0.12)", color: "#14F195", border: "1px solid rgba(20,241,149,0.25)" }}
                >
                  <svg viewBox="0 0 10 10" fill="none" className="w-2.5 h-2.5">
                    <path d="M2 5l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Verified
                </span>
              </div>

              {/* Role pills */}
              <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-6">
                {[
                  { label: "Builder", color: "#9945FF" },
                  { label: "Vibe Coder", color: "#14F195" },
                  { label: "UX/UI Maxi", color: "#3B82F6" },
                ].map(({ label, color }) => (
                  <span
                    key={label}
                    className="text-xs font-body font-semibold px-3 py-1 rounded-full border"
                    style={{ color, borderColor: color + "40", background: color + "12" }}
                  >
                    {label}
                  </span>
                ))}
              </div>

              {/* Bio — witty builder copy */}
              <p className="text-[#9CA3AF] font-body leading-relaxed mb-8 max-w-lg text-base">
                Tbilisi-based product designer who got tired of watching smart people feel locked out of tech. Spent years shipping products for startups — then AI tools changed everything.{" "}
                <span className="text-white/70">Now I teach complete beginners to build real AI products in 7 weeks.</span>{" "}
                No fluff. No gatekeeping. Just builds.
              </p>

              {/* Divider */}
              <div className="h-px mb-8"
                style={{ background: "linear-gradient(90deg, transparent, rgba(153,69,255,0.3), rgba(20,241,149,0.3), transparent)" }} />

              {/* Stats — "Proof of Work" */}
              <div className="mb-8">
                <p className="text-[10px] font-mono text-white/25 uppercase tracking-widest mb-4">// proof of work</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {stats.map((s, i) => {
                    const colors = ["#9945FF", "#14F195", "#3B82F6", "#F59E0B"];
                    return (
                      <div
                        key={s.label}
                        className="bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-center md:text-left"
                        style={{ borderColor: colors[i] + "20" }}
                      >
                        <div
                          className="font-heading font-black text-2xl mb-0.5"
                          style={{ color: colors[i] }}
                        >
                          {s.value}
                        </div>
                        <div className="text-white/40 text-[11px] font-body leading-tight">{s.label}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-8">
                {[
                  { label: "📍 Tbilisi, Georgia" },
                  { label: "🤖 AI Product Building" },
                  { label: "🎨 UX/UI" },
                  { label: "⚡ No-Code" },
                ].map(({ label }) => (
                  <span
                    key={label}
                    className="bg-white/[0.04] border border-white/10 text-white/50 hover:text-white/80 text-xs font-body px-3 py-1.5 rounded-full transition-colors cursor-default"
                  >
                    {label}
                  </span>
                ))}
              </div>

              {/* Social links */}
              <SocialLinks className="md:justify-start" />
            </div>

          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── 7-STEP JOURNEY ────────────────────────────── */}
      <section className="py-28 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              <span className="text-blue-400 text-xs font-body font-medium uppercase tracking-widest">7-Week Program</span>
            </div>
            <h2 className="font-heading font-bold text-4xl md:text-6xl leading-tight mb-5">
              Your Path From{" "}
              <span style={{ background: "linear-gradient(90deg, #3B82F6, #8B5CF6, #A855F7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Zero to Builder
              </span>
            </h2>
            <p className="text-[#9CA3AF] font-body text-lg max-w-2xl leading-relaxed">
              A structured 7-week journey — each week builds on the last, taking you from complete beginner to someone who ships real AI-powered products.
            </p>
          </div>

          {/* Cards grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {steps.map((step, idx) => (
              <div
                key={step.num}
                className={`relative group card-hover rounded-2xl border border-white/[0.08] p-6 overflow-hidden transition-all duration-300 cursor-pointer ${
                  step.num === 7 ? "sm:col-span-2 lg:col-span-1" : ""
                }`}
                style={{ background: `linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)` }}
              >
                {/* Top accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl opacity-60 group-hover:opacity-100 transition-opacity"
                  style={{ background: `linear-gradient(90deg, ${step.accent}, transparent)` }}
                />

                {/* Week badge + tag */}
                <div className="flex items-center justify-between mb-5">
                  <span
                    className="text-[10px] font-body font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full border"
                    style={{ color: step.accent, borderColor: step.accent + "40", background: step.accent + "12" }}
                  >
                    {step.week}
                  </span>
                  <span className="text-[10px] font-body text-white/25 uppercase tracking-widest">{step.tag}</span>
                </div>

                {/* Icon + number row */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: step.accent + "18", color: step.accent }}
                  >
                    {step.icon}
                  </div>
                  <span
                    className="font-heading font-black text-5xl leading-none opacity-10 select-none"
                    style={{ color: step.accent }}
                  >
                    {String(step.num).padStart(2, "0")}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-heading font-bold text-lg leading-snug mb-3 text-white">{step.title}</h3>

                {/* Interactive illustration panel */}
                <div className="relative rounded-xl border border-white/[0.06] bg-black/25 overflow-hidden" style={{ height: "112px" }}>
                  {/* Illustration (visible by default, fades out on hover) */}
                  <div className="absolute inset-0 group-hover:opacity-0 group-hover:-translate-y-1 transition-all duration-300">
                    {stepExtras[idx]?.illustration}
                  </div>
                  {/* Hover reveal: description + skill pills */}
                  <div className="absolute inset-0 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 p-3 flex flex-col justify-between">
                    <p className="text-[11px] font-body text-white/60 leading-relaxed">{step.desc}</p>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {stepExtras[idx]?.skills.map((s) => (
                        <span key={s} className="text-[8px] font-mono px-2 py-0.5 rounded-full border"
                          style={{ color: step.accent, borderColor: step.accent + "40", background: step.accent + "12" }}>
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  {/* Hover hint */}
                  <div className="absolute bottom-1.5 right-2 group-hover:opacity-0 transition-opacity duration-150">
                    <span className="text-[7px] font-mono text-white/15 tracking-widest">hover →</span>
                  </div>
                </div>

                {/* Progress dots */}
                <div className="flex gap-1 mt-4">
                  {Array.from({ length: 7 }).map((_, dotIdx) => (
                    <div
                      key={dotIdx}
                      className="h-0.5 flex-1 rounded-full transition-all duration-500"
                      style={{ background: dotIdx < step.num ? step.accent : "rgba(255,255,255,0.07)" }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* ── Journey CTA ── */}
          <div className="relative mt-16 flex flex-col items-center text-center">
            {/* Connecting thread from cards to CTA */}
            <div className="w-px h-12 mb-4"
              style={{ background: "linear-gradient(180deg, rgba(153,69,255,0.5), rgba(20,241,149,0.3))" }}/>

            {/* Glow halo behind button */}
            <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[420px] h-[120px] pointer-events-none"
              style={{ background: "radial-gradient(ellipse, rgba(153,69,255,0.18) 0%, rgba(20,241,149,0.09) 45%, transparent 70%)", filter: "blur(32px)" }}/>

            {/* Micro-headline */}
            <p className="text-white/25 text-xs font-mono uppercase tracking-[0.22em] mb-4 relative z-10">
              ready to start?
            </p>

            {/* Main CTA button */}
            <a href="#enroll"
              className="journey-cta-btn relative z-10 group/cta inline-flex items-center gap-3 font-heading font-bold text-xl text-white px-10 py-5 rounded-full transition-all duration-300 hover:scale-105 overflow-hidden"
              style={{ background: "linear-gradient(135deg, #9945FF 0%, #3B82F6 50%, #14F195 100%)" }}>
              {/* Shimmer sweep */}
              <span className="absolute inset-0 translate-x-[-110%] group-hover/cta:translate-x-[110%] transition-transform duration-700 skew-x-[-18deg]"
                style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)" }}/>
              {/* Rocket icon */}
              <svg className="w-5 h-5 relative z-10 group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5 transition-transform duration-300"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2l9.5-9.5a3.535 3.535 0 10-5-5L4.5 16.5z"/>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 5l4 4"/>
              </svg>
              <span className="relative z-10">Start the 7-Week Journey</span>
              <svg className="w-5 h-5 relative z-10 group-hover/cta:translate-x-1 transition-transform duration-300"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
              </svg>
            </a>

            {/* Social proof micro-copy */}
            <div className="relative z-10 mt-5 flex items-center gap-4">
              <div className="flex -space-x-2">
                {["#9945FF","#3B82F6","#14F195","#F59E0B","#EC4899"].map((c) => (
                  <div key={c} className="w-6 h-6 rounded-full border-2 border-[#0a0a0a]"
                    style={{ background: `radial-gradient(circle at 40% 35%, white 0%, ${c} 60%)` }}/>
                ))}
              </div>
              <span className="text-white/30 text-xs font-body">
                Join builders already shipping AI products
              </span>
            </div>

            {/* Week countdown row */}
            <div className="relative z-10 mt-6 flex items-center gap-2">
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div className="w-2 h-2 rounded-full"
                    style={{ background: `hsl(${260 + i * 15}, 80%, 65%)`,
                      boxShadow: `0 0 6px hsl(${260 + i * 15}, 80%, 65%)` }}/>
                  <span className="text-[8px] font-mono text-white/20">W{i+1}</span>
                </div>
              ))}
              <div className="ml-1 w-px h-4" style={{ background: "rgba(255,255,255,0.1)" }}/>
              <span className="text-[9px] font-mono text-white/20 ml-1">7 weeks · beginner → builder</span>
            </div>
          </div>

        </div>
      </section>

      <div className="section-divider" />

      {/* ── WHAT YOU WILL BUILD ────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-14">
            <p className="text-[#9CA3AF] uppercase tracking-widest text-xs font-body mb-3">Outcomes</p>
            <h2 className="font-heading font-bold text-4xl md:text-5xl mb-4">What You Will Build</h2>
            <p className="text-white/30 text-sm font-body font-mono">// hover to reveal</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {outcomes.map((item) => (
              <div
                key={item.title}
                className="group relative rounded-3xl border border-white/[0.07] overflow-hidden cursor-pointer h-80"
                style={{ background: item.bg }}
              >
                {/* Hover glow flood */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at 50% 40%, ${item.glow} 0%, transparent 68%)` }}
                />

                {/* Top accent line — appears on hover */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, transparent, ${item.accent}, transparent)` }}
                />

                {/* Character — floats at rest, jumps on hover */}
                <div
                  className={`${item.floatClass} absolute inset-0 flex items-center justify-center
                    transition-transform duration-500
                    group-hover:-translate-y-8 group-hover:scale-110`}
                  style={{ color: item.accent, filter: `drop-shadow(0 0 18px ${item.glow})` }}
                >
                  {item.character}
                </div>

                {/* Text — hidden at rest, slides up on hover */}
                <div
                  className="absolute bottom-0 left-0 right-0 px-6 pb-7 pt-10
                    translate-y-5 opacity-0
                    group-hover:translate-y-0 group-hover:opacity-100
                    transition-all duration-500 ease-out"
                  style={{ background: `linear-gradient(to top, ${item.bgFade} 60%, transparent)` }}
                >
                  <h3
                    className="font-heading font-bold text-lg mb-2"
                    style={{ color: item.accent }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-white/55 text-sm font-body leading-relaxed">{item.msg}</p>
                </div>

                {/* Tiny "hover me" label — visible at rest, hidden on hover */}
                <div
                  className="absolute bottom-4 left-0 right-0 flex justify-center
                    opacity-100 group-hover:opacity-0 transition-opacity duration-300"
                >
                  <span className="text-white/20 text-[10px] font-mono uppercase tracking-widest">hover me</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── IS THIS FOR YOU — Visual storytelling ───────── */}
      <section className="py-28 px-6 relative overflow-hidden">
        {/* Ambient orbs */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(153,69,255,0.1) 0%, transparent 65%)", filter: "blur(80px)" }} />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(20,241,149,0.08) 0%, transparent 65%)", filter: "blur(80px)" }} />

        {/* Code rain */}
        {codeRain.map((drop, i) => (
          <span
            key={i}
            className="code-drop absolute top-0 font-mono text-sm select-none pointer-events-none"
            style={{
              left: drop.left,
              animationDuration: drop.dur,
              animationDelay: drop.delay,
              color: `rgba(255,255,255,${drop.opacity})`,
            }}
          >
            {drop.char}
          </span>
        ))}

        <div className="max-w-5xl mx-auto relative z-10 text-center">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/[0.04] border border-white/10 rounded-full px-4 py-1.5 mb-10">
            <span className="text-white/40 text-xs font-mono uppercase tracking-widest">for absolute beginners</span>
          </div>

          {/* Headline — minimal */}
          <h2 className="font-heading font-black text-5xl md:text-7xl lg:text-8xl leading-none tracking-tight mb-4">
            No code.
          </h2>
          <h2 className="font-heading font-black text-5xl md:text-7xl lg:text-8xl leading-none tracking-tight mb-12"
            style={{ background: "linear-gradient(90deg, #9945FF, #14F195)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            Just vibes.
          </h2>

          {/* ── Visual trio ── */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 mb-16 max-w-3xl mx-auto items-center">

            {/* Col 1 — Code barrier (crossed out) */}
            <div className="relative group">
              <div className="rounded-2xl border border-white/[0.08] p-4 bg-white/[0.02] font-mono text-left overflow-hidden">
                <div className="text-[10px] md:text-xs text-white/25 leading-relaxed space-y-1">
                  <div><span className="text-[#9945FF]/40">if</span> <span className="text-white/20">(skill</span></div>
                  <div className="pl-2 text-white/15">=== &quot;coding&quot;</div>
                  <div className="text-white/20">{"{"}build(){" }"}</div>
                  <div className="text-white/15 pl-2">return app</div>
                  <div className="text-white/20">{"}"}</div>
                </div>
                {/* Animated X slash overlay */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <line className="slash-line" x1="8" y1="8" x2="92" y2="92" stroke="#ff4444" strokeWidth="3" strokeLinecap="round"/>
                  <line className="slash-line" x1="92" y1="8" x2="8" y2="92" stroke="#ff4444" strokeWidth="3" strokeLinecap="round" style={{ animationDelay: "0.3s" }}/>
                </svg>
              </div>
              <p className="text-white/20 text-[10px] font-mono uppercase tracking-widest mt-2">the old gate</p>
            </div>

            {/* Col 2 — AI Ghost bridge (center) */}
            <div className="flex flex-col items-center gap-3">
              {/* Arrows pointing inward then outward */}
              <div className="flex items-center gap-2 mb-1">
                <div className="h-px flex-1"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(153,69,255,0.6))" }} />
                <div className="w-1.5 h-1.5 rounded-full bg-[#9945FF]"
                  style={{ boxShadow: "0 0 8px #9945FF" }} />
                <div className="h-px flex-1"
                  style={{ background: "linear-gradient(90deg, rgba(20,241,149,0.6), transparent)" }} />
              </div>

              {/* Ghost character */}
              <div className="relative outcome-float-2">
                <div className="absolute inset-[-8px] rounded-full blur-xl opacity-60"
                  style={{ background: "radial-gradient(circle, rgba(153,69,255,0.5), rgba(20,241,149,0.3), transparent)" }} />
                <svg viewBox="0 0 80 90" fill="none" className="relative w-16 h-20 md:w-20 md:h-24"
                  style={{ filter: "drop-shadow(0 0 14px rgba(153,69,255,0.7))" }}>
                  <path d="M14 42C14 20 25 6 40 6C55 6 66 20 66 42L66 76C66 79 63 81 61 78L54 72L47 78C45 80 43 80 41 78L40 76L39 78C37 80 35 80 33 78L26 72L19 78C17 81 14 79 14 76Z"
                    fill="url(#ghostG2)" fillOpacity="0.95" stroke="rgba(153,69,255,0.5)" strokeWidth="1.5"/>
                  <ellipse cx="30" cy="43" rx="5.5" ry="6.5" fill="white" opacity="0.95"/>
                  <ellipse cx="50" cy="43" rx="5.5" ry="6.5" fill="white" opacity="0.95"/>
                  <ellipse cx="31" cy="45" rx="2.8" ry="3.2" fill="#1a0a2e"/>
                  <ellipse cx="51" cy="45" rx="2.8" ry="3.2" fill="#1a0a2e"/>
                  <circle cx="32" cy="43" r="1.2" fill="white" opacity="0.7"/>
                  <circle cx="52" cy="43" r="1.2" fill="white" opacity="0.7"/>
                  {/* Holding sparkle wand */}
                  <line x1="66" y1="55" x2="76" y2="38" stroke="#14F195" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="77" cy="36" r="4" fill="#14F195" opacity="0.9" style={{ filter: "blur(0.5px)" }}/>
                  <circle cx="77" cy="36" r="2" fill="white"/>
                  {/* Small sparkles from wand */}
                  <circle cx="73" cy="30" r="1.5" fill="#14F195" opacity="0.7"/>
                  <circle cx="80" cy="28" r="1" fill="#14F195" opacity="0.5"/>
                  <circle cx="75" cy="24" r="1" fill="white" opacity="0.4"/>
                  <defs>
                    <linearGradient id="ghostG2" x1="14" y1="6" x2="66" y2="90" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#9945FF"/>
                      <stop offset="1" stopColor="#6e3bc4"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              <span className="text-[10px] font-mono text-[#14F195]/60 uppercase tracking-widest">AI handles it</span>
            </div>

            {/* Col 3 — Shipped product (terminal) */}
            <div className="relative group">
              <div className="rounded-2xl border border-[#14F195]/15 p-4 bg-[#14F195]/[0.03] font-mono text-left overflow-hidden"
                style={{ boxShadow: "0 0 20px rgba(20,241,149,0.06)" }}>
                <div className="text-[10px] md:text-xs leading-relaxed space-y-1.5">
                  <div className="text-white/30">$ deploy</div>
                  <div className="text-[#14F195]/80">▸ building...</div>
                  <div className="text-[#14F195]/80">▸ optimising...</div>
                  <div className="flex items-center gap-1">
                    <span className="text-[#14F195]">✓</span>
                    <span className="text-[#14F195] font-bold">live!</span>
                  </div>
                  <div className="text-white/20 text-[9px]">your-app.com</div>
                </div>
                {/* Glow pulse */}
                <div className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{ background: "radial-gradient(circle at 50% 50%, rgba(20,241,149,0.05), transparent 70%)" }} />
              </div>
              <p className="text-white/20 text-[10px] font-mono uppercase tracking-widest mt-2">your product</p>
            </div>
          </div>

          {/* ── Stat pills ── */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {[
              { num: "0", label: "coding skills needed", color: "#9945FF", glow: "rgba(153,69,255,0.3)" },
              { num: "7", label: "weeks to ship",        color: "#3B82F6", glow: "rgba(59,130,246,0.3)" },
              { num: "1", label: "real product live",    color: "#14F195", glow: "rgba(20,241,149,0.3)" },
            ].map(({ num, label, color, glow }) => (
              <div
                key={num + label}
                className="flex items-center gap-3 bg-white/[0.03] border border-white/[0.07] rounded-2xl px-6 py-4"
                style={{ boxShadow: `0 0 20px ${glow}` }}
              >
                <span className="font-heading font-black text-3xl" style={{ color }}>{num}</span>
                <span className="text-white/50 text-sm font-body">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── MODULES ────────────────────────────────────── */}
      <section id="modules" className="py-28 px-6">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 bg-white/[0.05] border border-white/10 rounded-full px-4 py-1.5 mb-6">
              <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 text-white/60">
                <rect x="1" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
                <rect x="9" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
                <rect x="1" y="9" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
                <rect x="9" y="9" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
              <span className="text-white/50 text-xs font-body font-medium uppercase tracking-widest">Standalone Mini-Courses</span>
            </div>
            <h2 className="font-heading font-bold text-4xl md:text-6xl leading-tight mb-5">
              Pick One Topic.{" "}
              <span className="text-white/30">Learn it deeply.</span>
            </h2>
            <p className="text-[#9CA3AF] font-body text-lg max-w-2xl leading-relaxed">
              Each module is a self-contained mini-course you can take independently — no need to enroll in the full program. Start with what matters to you most.
            </p>
          </div>

          {/* Cards */}
          <div className="grid sm:grid-cols-2 gap-6">
            {modules.map((mod, idx) => (
              <div
                key={mod.title}
                className={`${mod.hoverClass} relative group rounded-2xl border border-white/[0.07] overflow-hidden flex flex-col`}
                style={{ background: mod.gradient }}
              >
                {/* Top accent bar */}
                <div className="h-[3px] w-full" style={{ background: `linear-gradient(90deg, ${mod.accent}, transparent 70%)` }} />

                <div className="p-7 flex flex-col gap-6 flex-1">
                  {/* Top row: module number ghost + standalone badge */}
                  <div className="flex items-start justify-between">
                    <span
                      className="font-heading font-black text-6xl leading-none select-none"
                      style={{ color: mod.accent, opacity: 0.12 }}
                    >
                      {mod.num}
                    </span>
                    <span
                      className="text-[10px] font-body font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full border mt-1"
                      style={{ color: mod.accent, borderColor: mod.accent + "40", background: mod.accent + "15" }}
                    >
                      Mini-Course
                    </span>
                  </div>

                  {/* Icon + title block */}
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: mod.accent + "18", color: mod.accent }}
                    >
                      {mod.icon}
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-xl leading-snug mb-1 text-white">{mod.title}</h3>
                      <p className="font-body text-sm" style={{ color: mod.accent + "CC" }}>{mod.tagline}</p>
                    </div>
                  </div>

                  {/* Animated scene */}
                  <div className="rounded-xl border border-white/[0.05] overflow-hidden" style={{ background: "rgba(0,0,0,0.25)" }}>
                    {moduleScenes[idx]}
                  </div>

                  {/* Footer: meta + CTA */}
                  <div className="mt-auto pt-4 border-t border-white/[0.06] flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1.5 text-xs text-white/40 font-body">
                        <svg viewBox="0 0 14 14" fill="none" className="w-3.5 h-3.5">
                          <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.4"/>
                          <path d="M7 4.5V7l2 1.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                        </svg>
                        {mod.duration}
                      </span>
                      <span
                        className="text-[10px] font-body px-2 py-0.5 rounded-full"
                        style={{ background: mod.accent + "15", color: mod.accent + "AA" }}
                      >
                        {mod.level}
                      </span>
                    </div>
                    <a
                      href="mailto:mariammanjavidze01@gmail.com"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold font-body px-4 py-2 rounded-xl transition-all hover:scale-105"
                      style={{ background: mod.accent + "18", color: mod.accent, border: `1px solid ${mod.accent}30` }}
                    >
                      Email Me →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── WORKSHOP BLOCK — animated org stories ──────── */}
      <section className="py-24 px-6 relative overflow-hidden">
        {/* Ambient */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[400px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 65%)", filter: "blur(70px)" }}/>
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[400px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(20,241,149,0.06) 0%, transparent 65%)", filter: "blur(70px)" }}/>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-14">
            <p className="text-white/30 uppercase tracking-widest text-xs font-mono mb-4">Teams &amp; Organizations</p>
            <h2 className="font-heading font-bold text-4xl md:text-5xl leading-tight mb-4">
              Bring Vibe Coding to Your{" "}
              <span style={{ background: "linear-gradient(90deg, #3B82F6, #9945FF, #14F195)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Organization
              </span>
            </h2>
            <p className="text-white/40 font-body text-base max-w-xl mx-auto">
              From classrooms to boardrooms — Mariam delivers hands-on AI programs that create real builders.
            </p>
          </div>

          {/* ── Story cards (2×2 grid) ── */}
          <div className="grid sm:grid-cols-2 gap-6 mb-12">

            {/* ── Card 1: University ── */}
            <div className="group card-hover relative rounded-3xl border border-[#3B82F6]/15 overflow-hidden"
              style={{ background: "linear-gradient(135deg, #060d1a 0%, #0b1835 100%)" }}>
              <div className="h-[3px] w-full" style={{ background: "linear-gradient(90deg, #3B82F6, transparent 60%)" }}/>
              <div className="p-6">
                {/* Header row */}
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded-full border border-[#3B82F6]/30 text-[#3B82F6]/80 bg-[#3B82F6]/10">University</span>
                  <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest">education</span>
                </div>
                {/* Animated classroom scene */}
                <div className="relative rounded-xl border border-[#3B82F6]/10 bg-black/30 overflow-hidden mb-5" style={{ height: "140px" }}>
                  {/* Classroom projector screen at top */}
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[120px] h-[50px] rounded-lg border border-[#3B82F6]/25 bg-[#3B82F6]/08 overflow-hidden">
                    {/* AI interface on screen */}
                    <div className="p-1.5 space-y-1">
                      <div className="vl-1 h-1 rounded-full w-3/4" style={{ background: "linear-gradient(90deg, rgba(59,130,246,0.6), transparent)" }}/>
                      <div className="vl-2 h-1 rounded-full w-1/2" style={{ background: "linear-gradient(90deg, rgba(59,130,246,0.5), transparent)" }}/>
                      <div className="vl-3 flex items-center gap-1">
                        <span className="text-[#3B82F6] text-[8px]">✓</span>
                        <div className="h-1 flex-1 rounded-full" style={{ background: "linear-gradient(90deg, rgba(20,241,149,0.5), transparent)" }}/>
                      </div>
                      <div className="vl-4 h-1 rounded-full w-2/3" style={{ background: "linear-gradient(90deg, rgba(59,130,246,0.4), transparent)" }}/>
                    </div>
                  </div>
                  {/* Student rows */}
                  <div className="absolute bottom-4 left-0 right-0 flex flex-col gap-2 items-center">
                    {[[5],[7],[9]].map((row, ri) => (
                      <div key={ri} className="flex gap-2.5">
                        {Array.from({ length: row[0] }).map((_, ci) => {
                          const pingClass = ["node-ping-1","node-ping-2","node-ping-3","node-ping-4"][(ri*3+ci)%4];
                          return (
                            <div key={ci} className={`${pingClass} flex flex-col items-center gap-0.5`}>
                              <div className="w-3 h-3 rounded-full border border-[#3B82F6]/35 bg-[#3B82F6]/15"/>
                              <div className="w-4 h-1.5 rounded-sm bg-[#3B82F6]/10"/>
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                  {/* Glow from screen */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-16 rounded-full pointer-events-none"
                    style={{ background: "radial-gradient(circle, rgba(59,130,246,0.15), transparent)", filter: "blur(10px)" }}/>
                </div>
                {/* Footer */}
                <h3 className="font-heading font-bold text-lg text-white mb-1">University Programs</h3>
                <p className="text-white/45 text-sm font-body mb-4">Guest lectures, semester integrations, and AI literacy workshops for students and faculty.</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-[#3B82F6]" style={{ boxShadow: "0 0 6px #3B82F6" }}/>
                    <span className="text-[#3B82F6]/70 text-xs font-mono">500+ students reached</span>
                  </div>
                  <span className="text-[9px] font-mono text-white/15 group-hover:text-white/40 transition-colors">contact →</span>
                </div>
              </div>
            </div>

            {/* ── Card 2: Startup ── */}
            <div className="group card-hover relative rounded-3xl border border-[#14F195]/12 overflow-hidden"
              style={{ background: "linear-gradient(135deg, #021510 0%, #042b1d 100%)" }}>
              <div className="h-[3px] w-full" style={{ background: "linear-gradient(90deg, #14F195, transparent 60%)" }}/>
              <div className="p-6">
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded-full border border-[#14F195]/30 text-[#14F195]/80 bg-[#14F195]/10">Startup</span>
                  <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest">product</span>
                </div>
                {/* Animated MVP launch scene */}
                <div className="relative rounded-xl border border-[#14F195]/10 bg-black/30 overflow-hidden mb-5" style={{ height: "140px" }}>
                  {/* Team at laptop (left) */}
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1">
                    {/* Two team members */}
                    <div className="flex gap-1.5 mb-1">
                      {[1,2,3].map((i) => (
                        <div key={i} className={`node-ping-${i} flex flex-col items-center gap-0.5`}>
                          <div className="w-4 h-4 rounded-full border border-[#14F195]/35 bg-[#14F195]/15"/>
                          <div className="w-5 h-2.5 rounded-sm bg-[#14F195]/10"/>
                        </div>
                      ))}
                    </div>
                    {/* Laptop */}
                    <div className="w-14 h-9 rounded-sm border border-[#14F195]/30 bg-[#14F195]/08 p-1">
                      <div className="space-y-0.5">
                        <div className="vl-1 h-0.5 rounded w-4/5" style={{ background: "rgba(20,241,149,0.5)" }}/>
                        <div className="vl-2 h-0.5 rounded w-3/5" style={{ background: "rgba(20,241,149,0.4)" }}/>
                        <div className="vl-3 h-0.5 rounded w-4/5" style={{ background: "rgba(20,241,149,0.5)" }}/>
                        <div className="vl-4 h-0.5 rounded w-2/5" style={{ background: "rgba(20,241,149,0.3)" }}/>
                      </div>
                    </div>
                    <span className="text-[7px] font-mono text-[#14F195]/40 mt-0.5">building...</span>
                  </div>
                  {/* Arrow → */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <svg viewBox="0 0 32 16" className="w-8 h-4" fill="none">
                      <path d="M0 8h26M20 3l6 5-6 5" stroke="#14F195" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.4"/>
                    </svg>
                  </div>
                  {/* Rocket + LIVE (right) */}
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5 float-small">
                    <svg viewBox="0 0 36 44" fill="none" className="w-8 h-9"
                      style={{ filter: "drop-shadow(0 0 8px rgba(20,241,149,0.6))" }}>
                      <path d="M18 2C18 2 9 11 9 24h18C27 11 18 2 18 2z" fill="#14F195" fillOpacity="0.65" stroke="#14F195" strokeWidth="1.4"/>
                      <rect x="11" y="22" width="14" height="10" rx="2" fill="#14F195" fillOpacity="0.4" stroke="#14F195" strokeWidth="1.2"/>
                      <path d="M13 32l-3 7h16l-3-7z" fill="#14F195" fillOpacity="0.3"/>
                      <circle cx="18" cy="19" r="4" fill="#14F195" fillOpacity="0.3" stroke="#14F195" strokeWidth="1.2"/>
                      <circle cx="18" cy="19" r="2" fill="#14F195" opacity="0.7"/>
                      <path d="M14 39c0 3.5 2 6 4 8 2-2 4-4.5 4-8z" fill="#9945FF" fillOpacity="0.7"/>
                    </svg>
                    <div className="bg-[#14F195] text-[7px] font-mono font-black text-black px-2 py-0.5 rounded-full"
                      style={{ boxShadow: "0 0 8px #14F195" }}>LIVE</div>
                  </div>
                  {/* Glow */}
                  <div className="absolute right-8 top-1/2 -translate-y-1/2 w-20 h-20 rounded-full pointer-events-none"
                    style={{ background: "radial-gradient(circle, rgba(20,241,149,0.15), transparent)", filter: "blur(14px)" }}/>
                </div>
                <h3 className="font-heading font-bold text-lg text-white mb-1">Startup Workshops</h3>
                <p className="text-white/45 text-sm font-body mb-4">Hands-on AI product sprints — teams go from zero to a working MVP in days, not months.</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-[#14F195]" style={{ boxShadow: "0 0 6px #14F195" }}/>
                    <span className="text-[#14F195]/70 text-xs font-mono">0 → MVP in 4 weeks</span>
                  </div>
                  <span className="text-[9px] font-mono text-white/15 group-hover:text-white/40 transition-colors">contact →</span>
                </div>
              </div>
            </div>

            {/* ── Card 3: Bootcamp ── */}
            <div className="group card-hover relative rounded-3xl border border-[#9945FF]/15 overflow-hidden"
              style={{ background: "linear-gradient(135deg, #0c0820 0%, #1a1240 100%)" }}>
              <div className="h-[3px] w-full" style={{ background: "linear-gradient(90deg, #9945FF, transparent 60%)" }}/>
              <div className="p-6">
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded-full border border-[#9945FF]/30 text-[#9945FF]/80 bg-[#9945FF]/10">Bootcamp</span>
                  <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest">intensive</span>
                </div>
                {/* Animated intensity meter scene */}
                <div className="relative rounded-xl border border-[#9945FF]/10 bg-black/30 overflow-hidden mb-5" style={{ height: "140px" }}>
                  {/* Day counter (left) */}
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 flex flex-col gap-2">
                    {[
                      { day: "Day 1", done: true,  cls: "vl-1" },
                      { day: "Day 2", done: true,  cls: "vl-3" },
                      { day: "Day 3", done: false, cls: "vl-5" },
                    ].map(({ day, done, cls }) => (
                      <div key={day} className={`${cls} flex items-center gap-2`}>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center text-[8px]`}
                          style={{ borderColor: done ? "#9945FF" : "#9945FF60", background: done ? "#9945FF25" : "transparent" }}>
                          {done ? <span className="text-[#9945FF]">✓</span> : <span className="text-[#9945FF]/40">○</span>}
                        </div>
                        <span className={`text-[9px] font-mono ${done ? "text-[#9945FF]/80" : "text-[#9945FF]/35"}`}>{day}</span>
                      </div>
                    ))}
                  </div>
                  {/* Energy bar (centre) */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
                    <div className="h-24 w-5 rounded-full border border-[#9945FF]/30 bg-black/40 overflow-hidden relative">
                      <div className="absolute bottom-0 left-0 right-0 rounded-full"
                        style={{ height: "68%", background: "linear-gradient(180deg, #9945FF, #14F195)", boxShadow: "0 0 10px rgba(153,69,255,0.5)", animation: "headline-pulse 2.5s ease-in-out infinite" }}/>
                    </div>
                    <span className="text-[8px] font-mono text-[#9945FF]/50">intensity</span>
                  </div>
                  {/* Lightning symbols (right) */}
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 flex flex-col gap-1.5">
                    {[
                      { cls: "node-ping-1", size: "text-lg" },
                      { cls: "node-ping-2", size: "text-sm" },
                      { cls: "node-ping-3", size: "text-base" },
                    ].map(({ cls, size }, i) => (
                      <span key={i} className={`${cls} ${size} text-[#9945FF]`}
                        style={{ filter: "drop-shadow(0 0 4px rgba(153,69,255,0.8))" }}>⚡</span>
                    ))}
                  </div>
                  {/* Ambient glow */}
                  <div className="absolute inset-0 pointer-events-none"
                    style={{ background: "radial-gradient(circle at 50% 50%, rgba(153,69,255,0.06), transparent 70%)" }}/>
                </div>
                <h3 className="font-heading font-bold text-lg text-white mb-1">AI Bootcamp</h3>
                <p className="text-white/45 text-sm font-body mb-4">Intensive 3-day immersive programs where participants build and ship real AI-powered products.</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-[#9945FF]" style={{ boxShadow: "0 0 6px #9945FF" }}/>
                    <span className="text-[#9945FF]/70 text-xs font-mono">3-day intensive program</span>
                  </div>
                  <span className="text-[9px] font-mono text-white/15 group-hover:text-white/40 transition-colors">contact →</span>
                </div>
              </div>
            </div>

            {/* ── Card 4: Corporate ── */}
            <div className="group card-hover relative rounded-3xl border border-[#F59E0B]/12 overflow-hidden"
              style={{ background: "linear-gradient(135deg, #150f00 0%, #2a1e00 100%)" }}>
              <div className="h-[3px] w-full" style={{ background: "linear-gradient(90deg, #F59E0B, transparent 60%)" }}/>
              <div className="p-6">
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded-full border border-[#F59E0B]/30 text-[#F59E0B]/80 bg-[#F59E0B]/10">Corporate</span>
                  <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest">enterprise</span>
                </div>
                {/* Animated workflow automation scene */}
                <div className="relative rounded-xl border border-[#F59E0B]/10 bg-black/30 overflow-hidden mb-5" style={{ height: "140px" }}>
                  {/* Before label */}
                  <div className="absolute top-3 left-4 flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500/60"/>
                    <span className="text-[8px] font-mono text-white/25">manual: 4hrs/day</span>
                  </div>
                  {/* After label */}
                  <div className="absolute top-3 right-4 flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" style={{ boxShadow: "0 0 5px #F59E0B" }}/>
                    <span className="text-[8px] font-mono text-[#F59E0B]/60">auto: 8 min</span>
                  </div>
                  {/* Workflow SVG */}
                  <svg viewBox="0 0 280 80" fill="none" className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[85%]">
                    {/* Lines */}
                    <line className="line-pulse-2" x1="54"  y1="40" x2="96"  y2="40" stroke="#F59E0B" strokeWidth="1" strokeDasharray="4 3"/>
                    <line className="line-pulse-3" x1="144" y1="40" x2="186" y2="40" stroke="#F59E0B" strokeWidth="1" strokeDasharray="4 3"/>
                    {/* Node 1: Email */}
                    <circle className="node-ping-1" cx="34"  cy="40" r="18" fill="#F59E0B" fillOpacity="0.1" stroke="#F59E0B" strokeWidth="1"/>
                    <rect x="24" y="33" width="20" height="14" rx="2" stroke="#F59E0B" strokeWidth="1" strokeOpacity="0.75"/>
                    <path d="M24 36l10 6 10-6" stroke="#F59E0B" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.75"/>
                    <text x="34" y="64" textAnchor="middle" fill="#F59E0B" fontSize="6" fontFamily="monospace" opacity="0.5">Email</text>
                    {/* Node 2: Automation hub */}
                    <circle className="node-ping-2" cx="120" cy="40" r="22" fill="#F59E0B" fillOpacity="0.14" stroke="#F59E0B" strokeWidth="1.4"
                      style={{ filter: "drop-shadow(0 0 6px rgba(245,158,11,0.4))" }}/>
                    <path d="M120 27v26M107 40h26" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round"/>
                    <circle cx="120" cy="40" r="4.5" fill="#F59E0B" fillOpacity="0.45"/>
                    <text x="120" y="72" textAnchor="middle" fill="#F59E0B" fontSize="6" fontFamily="monospace" opacity="0.5">Make</text>
                    {/* Node 3: Calendar */}
                    <circle className="node-ping-3" cx="206" cy="40" r="18" fill="#F59E0B" fillOpacity="0.1" stroke="#F59E0B" strokeWidth="1"/>
                    <rect x="196" y="31" width="20" height="18" rx="2" stroke="#F59E0B" strokeWidth="1" strokeOpacity="0.75"/>
                    <line x1="196" y1="36" x2="216" y2="36" stroke="#F59E0B" strokeWidth="0.8" strokeOpacity="0.6"/>
                    <line x1="200" y1="41" x2="212" y2="41" stroke="#F59E0B" strokeWidth="0.8" strokeOpacity="0.5"/>
                    <line x1="200" y1="44" x2="209" y2="44" stroke="#F59E0B" strokeWidth="0.8" strokeOpacity="0.35"/>
                    <text x="206" y="64" textAnchor="middle" fill="#F59E0B" fontSize="6" fontFamily="monospace" opacity="0.5">Calendar</text>
                    {/* Traveling packet */}
                    <circle cx="54" cy="40" r="4" fill="#F59E0B" style={{ filter: "drop-shadow(0 0 4px #F59E0B)" }}>
                      <animateTransform attributeName="transform" type="translate"
                        values="0,0; 152,0; 152,0" keyTimes="0; 0.82; 1"
                        dur="3s" repeatCount="indefinite"/>
                      <animate attributeName="opacity" values="0; 1; 1; 0" keyTimes="0; 0.06; 0.82; 0.96" dur="3s" repeatCount="indefinite"/>
                    </circle>
                  </svg>
                </div>
                <h3 className="font-heading font-bold text-lg text-white mb-1">Corporate Training</h3>
                <p className="text-white/45 text-sm font-body mb-4">Team AI adoption programs — employees learn to automate workflows and eliminate repetitive work.</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-[#F59E0B]" style={{ boxShadow: "0 0 6px #F59E0B" }}/>
                    <span className="text-[#F59E0B]/70 text-xs font-mono">60% time saved on avg</span>
                  </div>
                  <span className="text-[9px] font-mono text-white/15 group-hover:text-white/40 transition-colors">contact →</span>
                </div>
              </div>
            </div>

          </div>

          {/* CTA */}
          <div className="flex justify-center">
            <a href="mailto:mariammanjavidze01@gmail.com"
              className="hero-cta-btn inline-flex items-center gap-3 text-white font-bold text-lg px-10 py-5 rounded-full transition-all duration-300 hover:scale-105 hover:brightness-110"
              style={{ background: "linear-gradient(135deg, #3B82F6 0%, #9945FF 60%, #14F195 100%)" }}>
              <span>Get in Touch</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── FINAL CTA — Web3 meme block ────────────────── */}
      <section id="enroll" className="py-32 px-6 relative overflow-hidden">

        {/* Animated orbs */}
        <div className="cta-orb-1 absolute top-[-80px] left-[-80px] w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(153,69,255,0.22) 0%, transparent 70%)", filter: "blur(60px)" }} />
        <div className="cta-orb-2 absolute bottom-[-100px] right-[-60px] w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(20,241,149,0.14) 0%, transparent 70%)", filter: "blur(80px)" }} />
        <div className="cta-orb-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(59,130,246,0.1) 0%, transparent 65%)", filter: "blur(60px)" }} />

        {/* Dot-grid texture */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

        <div className="max-w-5xl mx-auto relative z-10">

          {/* ── Floating meme bubbles ── */}
          {/* Top-left */}
          <div className="float-bubble-1 hidden md:flex absolute -top-4 -left-6 items-center gap-2.5 bg-[#111] border border-white/10 rounded-2xl px-4 py-2.5 shadow-xl">
            <span className="text-xl">👻</span>
            <div>
              <p className="text-white text-xs font-semibold font-body">gm ser</p>
              <p className="text-white/40 text-[10px] font-body">wen ship?</p>
            </div>
          </div>
          {/* Top-right */}
          <div className="float-bubble-2 hidden md:flex absolute -top-8 -right-4 items-center gap-2.5 bg-[#111] border border-[#14F195]/20 rounded-2xl px-4 py-2.5 shadow-xl"
            style={{ boxShadow: "0 0 20px rgba(20,241,149,0.1)" }}>
            <span className="text-xl">🚀</span>
            <div>
              <p className="text-[#14F195] text-xs font-semibold font-body">just shipped</p>
              <p className="text-white/40 text-[10px] font-body">my first AI product</p>
            </div>
          </div>
          {/* Bottom-left */}
          <div className="float-bubble-3 hidden md:flex absolute -bottom-6 -left-2 items-center gap-2.5 bg-[#111] border border-[#9945FF]/20 rounded-2xl px-4 py-2.5 shadow-xl"
            style={{ boxShadow: "0 0 20px rgba(153,69,255,0.1)" }}>
            <span className="text-xl">🧠</span>
            <div>
              <p className="text-[#9945FF] text-xs font-semibold font-body">no code needed</p>
              <p className="text-white/40 text-[10px] font-body">just vibes + prompts</p>
            </div>
          </div>
          {/* Bottom-right */}
          <div className="float-bubble-4 hidden md:flex absolute -bottom-4 -right-6 items-center gap-2.5 bg-[#111] border border-white/10 rounded-2xl px-4 py-2.5 shadow-xl">
            <span className="text-xl">🔥</span>
            <div>
              <p className="text-white text-xs font-semibold font-body">LFG</p>
              <p className="text-white/40 text-[10px] font-body">wagmi fr fr</p>
            </div>
          </div>

          {/* ── Main card ── */}
          <div
            className="rounded-3xl border border-white/[0.08] overflow-hidden"
            style={{ background: "linear-gradient(135deg, #0d0d0d 0%, #111020 50%, #0a0f0a 100%)" }}
          >
            {/* Card top accent bar */}
            <div className="h-[2px]" style={{ background: "linear-gradient(90deg, #9945FF, #14F195, #3B82F6, #9945FF)", backgroundSize: "300%", animation: "gradient-shift 6s linear infinite" }} />

            <div className="px-8 md:px-16 py-16 md:py-20 text-center relative">

              {/* Terminal illustration — top decorative */}
              <div className="inline-flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] rounded-xl px-5 py-3 mb-8 font-mono text-xs text-left">
                <span className="text-[#14F195]">$</span>
                <span className="text-white/60">vibe-coding</span>
                <span className="text-[#9945FF]">--mode</span>
                <span className="text-[#14F195]">on</span>
                <span className="cursor-blink text-white/80 ml-1">▌</span>
              </div>

              {/* gm badge */}
              <div className="flex justify-center mb-6">
                <span className="inline-flex items-center gap-2 bg-[#9945FF]/10 border border-[#9945FF]/25 text-[#9945FF] text-xs font-body font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#14F195]" style={{ boxShadow: "0 0 6px #14F195" }} />
                  gm builders
                </span>
              </div>

              {/* Meme headline */}
              <h2 className="font-heading font-black text-4xl md:text-6xl lg:text-7xl leading-[1.05] mb-4 tracking-tight">
                <span className="text-white">ser, are you still</span>
                <br />
                <span style={{ background: "linear-gradient(90deg, #9945FF, #14F195)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  doing things manually?
                </span>
              </h2>

              {/* ngmi / wagmi line */}
              <p className="font-heading font-bold text-xl md:text-2xl text-white/30 mb-3 tracking-wide">
                ngmi.
              </p>
              <p className="text-[#9CA3AF] font-body text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-12">
                Real builders use AI. Join them — no coding background needed. 7 weeks. 1 shipped product. Lifetime access.
              </p>

              {/* ── Phantom-style ghost illustration ── */}
              <div className="flex justify-center mb-12">
                <div className="relative">
                  {/* Glow halo */}
                  <div className="absolute inset-0 rounded-full blur-2xl opacity-50"
                    style={{ background: "radial-gradient(circle, rgba(153,69,255,0.5), rgba(20,241,149,0.2), transparent)" }} />
                  <svg viewBox="0 0 120 120" fill="none" className="relative w-24 h-24 md:w-32 md:h-32" style={{ filter: "drop-shadow(0 0 20px rgba(153,69,255,0.6))" }}>
                    {/* Ghost body */}
                    <path d="M20 55 C20 30 38 12 60 12 C82 12 100 30 100 55 L100 95 C100 98 97 100 94 97 L84 90 L74 97 C72 99 68 99 66 97 L60 93 L54 97 C52 99 48 99 46 97 L36 90 L26 97 C23 100 20 98 20 95 Z"
                      fill="url(#ghostGrad)" opacity="0.95"/>
                    {/* Eyes */}
                    <ellipse cx="46" cy="52" rx="7" ry="8" fill="white" opacity="0.95"/>
                    <ellipse cx="74" cy="52" rx="7" ry="8" fill="white" opacity="0.95"/>
                    <ellipse cx="47" cy="54" rx="3.5" ry="4" fill="#1a0a2e"/>
                    <ellipse cx="75" cy="54" rx="3.5" ry="4" fill="#1a0a2e"/>
                    {/* Eye shine */}
                    <circle cx="49" cy="52" r="1.5" fill="white"/>
                    <circle cx="77" cy="52" r="1.5" fill="white"/>
                    {/* Floating sparkles */}
                    <circle cx="18" cy="30" r="2" fill="#14F195" opacity="0.8"/>
                    <circle cx="104" cy="35" r="1.5" fill="#9945FF" opacity="0.9"/>
                    <circle cx="108" cy="20" r="1" fill="#14F195" opacity="0.6"/>
                    <circle cx="12" cy="50" r="1" fill="#3B82F6" opacity="0.7"/>
                    <defs>
                      <linearGradient id="ghostGrad" x1="20" y1="12" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#9945FF"/>
                        <stop offset="1" stopColor="#6e3bc4"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>

              {/* CTA button */}
              <div className="flex flex-col items-center gap-5">
                <Link
                  href="/login"
                  className="glow-cta-btn inline-flex items-center gap-3 font-heading font-bold text-lg md:text-xl px-10 py-5 rounded-2xl transition-all hover:scale-105 text-[#0a0a0a]"
                  style={{ background: "linear-gradient(135deg, #14F195, #9945FF)", backgroundSize: "200%" }}
                >
                  <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5">
                    <path d="M3 10h14M10 3l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Start Building — LFG
                </Link>
                <p className="text-white/25 text-xs font-body font-mono tracking-wider">
                  wagmi. no prior coding needed. ser trust.
                </p>
                <a
                  href="mailto:mariammanjavidze01@gmail.com"
                  className="text-white/40 hover:text-white/70 text-sm font-body underline underline-offset-4 transition-colors"
                >
                  have questions? email me →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
