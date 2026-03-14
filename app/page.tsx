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
    gradient: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)",
    accentColor: "#3B82F6",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <rect x="4" y="10" width="40" height="28" rx="4" stroke="#3B82F6" strokeWidth="2.5" />
        <line x1="4" y1="18" x2="44" y2="18" stroke="#3B82F6" strokeWidth="2.5" />
        <circle cx="10" cy="14" r="1.5" fill="#3B82F6" />
        <circle cx="16" cy="14" r="1.5" fill="#3B82F6" />
        <circle cx="22" cy="14" r="1.5" fill="#3B82F6" />
        <rect x="12" y="24" width="24" height="3" rx="1.5" fill="#3B82F6" opacity="0.5" />
        <rect x="16" y="31" width="16" height="3" rx="1.5" fill="#3B82F6" opacity="0.3" />
      </svg>
    ),
  },
  {
    title: "An automated workflow",
    gradient: "linear-gradient(135deg, #120a1f 0%, #2d1b4e 100%)",
    accentColor: "#8B5CF6",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <circle cx="10" cy="24" r="5" stroke="#8B5CF6" strokeWidth="2.5" />
        <circle cx="38" cy="12" r="5" stroke="#8B5CF6" strokeWidth="2.5" />
        <circle cx="38" cy="36" r="5" stroke="#8B5CF6" strokeWidth="2.5" />
        <line x1="15" y1="22" x2="33" y2="14" stroke="#8B5CF6" strokeWidth="2" strokeDasharray="3 2" />
        <line x1="15" y1="26" x2="33" y2="34" stroke="#8B5CF6" strokeWidth="2" strokeDasharray="3 2" />
      </svg>
    ),
  },
  {
    title: "A shipped AI product",
    gradient: "linear-gradient(135deg, #051a0f 0%, #0a3320 100%)",
    accentColor: "#10B981",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <path d="M24 4 L28 18 L42 18 L31 27 L35 42 L24 33 L13 42 L17 27 L6 18 L20 18 Z"
          stroke="#10B981" strokeWidth="2.5" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const modules = [
  {
    title: "AI Foundations",
    desc: "Understand how AI works and how to think like a builder",
    gradient: "linear-gradient(135deg, #1a1a2e, #16213e)",
    accent: "#3B82F6",
    hoverClass: "card-hover",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <circle cx="20" cy="20" r="8" stroke="#3B82F6" strokeWidth="2" />
        <circle cx="20" cy="20" r="14" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="4 3" />
        <circle cx="20" cy="6" r="2.5" fill="#3B82F6" />
        <circle cx="20" cy="34" r="2.5" fill="#3B82F6" />
        <circle cx="6" cy="20" r="2.5" fill="#3B82F6" />
        <circle cx="34" cy="20" r="2.5" fill="#3B82F6" />
      </svg>
    ),
  },
  {
    title: "Prompt Engineering",
    desc: "Learn to communicate with AI — the most important skill",
    gradient: "linear-gradient(135deg, #0f0c29, #302b63)",
    accent: "#8B5CF6",
    hoverClass: "card-hover card-hover-purple",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <path d="M20 4 L24 16 L36 16 L26 23 L30 36 L20 29 L10 36 L14 23 L4 16 L16 16 Z"
          stroke="#8B5CF6" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "MVP Building with AI",
    desc: "Turn any idea into a real working product",
    gradient: "linear-gradient(135deg, #0a1a0a, #0d2b0d)",
    accent: "#10B981",
    hoverClass: "card-hover card-hover-green",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <path d="M20 4 L26 14 L38 14 L28 22 L32 34 L20 26 L8 34 L12 22 L2 14 L14 14 Z"
          stroke="#10B981" strokeWidth="2" strokeLinejoin="round" />
        <path d="M20 34 L20 38 M16 38 L24 38" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Automation & Workflows",
    desc: "Connect tools, build workflows, ship your first automation",
    gradient: "linear-gradient(135deg, #1a1000, #2d1f00)",
    accent: "#F59E0B",
    hoverClass: "card-hover card-hover-amber",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <circle cx="8" cy="20" r="4" stroke="#F59E0B" strokeWidth="2" />
        <circle cx="32" cy="8" r="4" stroke="#F59E0B" strokeWidth="2" />
        <circle cx="32" cy="32" r="4" stroke="#F59E0B" strokeWidth="2" />
        <line x1="12" y1="18" x2="28" y2="10" stroke="#F59E0B" strokeWidth="1.5" />
        <line x1="12" y1="22" x2="28" y2="30" stroke="#F59E0B" strokeWidth="1.5" />
        <line x1="36" y1="11" x2="36" y2="29" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="3 2" />
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

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white overflow-x-hidden">
      <Nav />

      {/* ── HERO ──────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20 overflow-hidden">
        <div
          className="blob-1 absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-20 pointer-events-none"
          style={{ background: "radial-gradient(circle, #3B82F6 0%, transparent 70%)", filter: "blur(80px)" }}
        />
        <div
          className="blob-2 absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full opacity-15 pointer-events-none"
          style={{ background: "radial-gradient(circle, #8B5CF6 0%, transparent 70%)", filter: "blur(100px)" }}
        />

        <div className="relative z-10 max-w-5xl mx-auto">
          <h1 className="font-heading font-bold text-5xl md:text-7xl lg:text-8xl leading-[1.05] tracking-tight mb-6">
            Build Real AI Products.{" "}
            <span style={{
              background: "linear-gradient(90deg, #3B82F6, #8B5CF6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              From Zero.
            </span>
          </h1>
          <p className="text-[#9CA3AF] text-xl md:text-2xl font-body max-w-2xl mx-auto mb-10 leading-relaxed">
            Taught by Mariam Manjavidze — hands-on program for complete beginners.
            No coding background needed.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 bg-[#3B82F6] hover:bg-blue-400 text-white font-semibold text-lg px-8 py-4 rounded-full transition-all hover:scale-105"
            style={{ boxShadow: "0 0 32px rgba(59,130,246,0.45)" }}
          >
            Start Learning →
          </Link>
        </div>

        <div className="scroll-bounce absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 text-xs font-body">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
          scroll
        </div>
      </section>

      <div className="section-divider" />

      {/* ── WHAT IS VIBE CODING ────────────────────────── */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#9CA3AF] uppercase tracking-widest text-xs font-body mb-8">What is Vibe Coding</p>
          <p className="font-heading font-semibold text-3xl md:text-5xl leading-tight text-white/90">
            Vibe coding is building products by{" "}
            <span style={{
              background: "linear-gradient(90deg, #3B82F6, #8B5CF6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              describing what you want to AI
            </span>
            {" "}— and letting it write the code.
            You focus on the idea. AI handles the rest.
          </p>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── INSTRUCTOR ─────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-14">
            {/* Photo */}
            <div className="flex-shrink-0">
              <img
                src="/mariam.jpg"
                alt="Mariam Manjavidze"
                className="photo-ring w-52 h-52 md:w-64 md:h-64 rounded-full object-cover border-4 border-[#3B82F6]"
              />
            </div>

            {/* Content */}
            <div className="flex-1 text-center md:text-left">
              <p className="text-[#9CA3AF] text-sm font-body mb-1">Hello I Am</p>
              <h2 className="font-heading font-bold text-4xl md:text-5xl mb-2">Mariam Manjavidze</h2>
              <p className="text-[#3B82F6] font-heading font-semibold text-lg mb-6">
                Vibe Coder · UX/UI Designer
              </p>
              <p className="text-[#9CA3AF] font-body leading-relaxed mb-8 max-w-lg">
                Product designer based in Tbilisi, Georgia.
                I teach Vibe Coding and AI product building —
                helping complete beginners ship real products with AI tools.
              </p>

              <div className="border-t border-dashed border-white/15 mb-8" />

              <div className="grid grid-cols-2 gap-5 mb-8">
                {stats.map((s) => (
                  <div key={s.label}>
                    <div className="font-heading font-bold text-3xl text-white">{s.value}</div>
                    <div className="text-[#9CA3AF] text-sm font-body">{s.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-8">
                {["Tbilisi, Georgia", "AI Product Building", "UX/UI"].map((tag) => (
                  <span
                    key={tag}
                    className="bg-white/[0.06] border border-white/15 text-[#9CA3AF] text-xs font-body px-3 py-1.5 rounded-full"
                  >
                    {tag}
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
            {steps.map((step) => (
              <div
                key={step.num}
                className={`relative group card-hover rounded-2xl border border-white/[0.08] p-6 overflow-hidden transition-all duration-300 ${
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

                {/* Content */}
                <h3 className="font-heading font-bold text-lg leading-snug mb-2 text-white">{step.title}</h3>
                <p className="text-[#9CA3AF] text-sm font-body leading-relaxed">{step.desc}</p>

                {/* Progress dots */}
                <div className="flex gap-1 mt-5">
                  {Array.from({ length: 7 }).map((_, dotIdx) => (
                    <div
                      key={dotIdx}
                      className="h-0.5 flex-1 rounded-full transition-all"
                      style={{ background: dotIdx < step.num ? step.accent : "rgba(255,255,255,0.08)" }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── WHAT YOU WILL BUILD ────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#9CA3AF] uppercase tracking-widest text-xs font-body mb-3">Outcomes</p>
          <h2 className="font-heading font-bold text-4xl md:text-5xl mb-16">What You Will Build</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {outcomes.map((item) => (
              <div
                key={item.title}
                className="card-hover relative rounded-2xl p-8 border border-white/10 overflow-hidden"
                style={{ background: item.gradient }}
              >
                <div className="mb-6">{item.icon}</div>
                <h3 className="font-heading font-bold text-2xl" style={{ color: item.accentColor }}>
                  {item.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── IS THIS FOR YOU ────────────────────────────── */}
      <section className="py-24 px-6 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#9CA3AF] uppercase tracking-widest text-xs font-body mb-8">Is This For You?</p>
          <h2 className="font-heading font-bold text-4xl md:text-6xl leading-tight mb-8">
            You don&apos;t need to know how to code.
            <br />
            <span className="text-[#9CA3AF] font-medium text-3xl md:text-4xl">
              You don&apos;t need a tech background.
            </span>
          </h2>
          <p className="text-[#9CA3AF] text-xl font-body leading-relaxed mb-16">
            You just need an idea and the will to build it.
          </p>
          <div className="grid sm:grid-cols-3 gap-6 text-center">
            {[
              { highlight: "0 coding skills needed", sub: "Start from absolute zero" },
              { highlight: "7 hands-on lectures", sub: "Learn by building real things" },
              { highlight: "1 real product shipped", sub: "Graduate with something live" },
            ].map((item) => (
              <div key={item.highlight} className="bg-white/[0.04] border border-white/10 rounded-2xl p-6">
                <div
                  className="font-heading font-bold text-xl mb-2"
                  style={{
                    background: "linear-gradient(90deg, #3B82F6, #8B5CF6)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {item.highlight}
                </div>
                <p className="text-[#9CA3AF] text-sm font-body">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── MODULES ────────────────────────────────────── */}
      <section id="modules" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#9CA3AF] uppercase tracking-widest text-xs font-body mb-3">Pick Your Path</p>
          <h2 className="font-heading font-bold text-4xl md:text-5xl mb-16">Or Learn One Topic at a Time</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {modules.map((mod) => (
              <div
                key={mod.title}
                className={`${mod.hoverClass} border border-white/10 rounded-2xl p-8 flex flex-col gap-5`}
                style={{ background: mod.gradient }}
              >
                <div>{mod.icon}</div>
                <div>
                  <h3 className="font-heading font-bold text-xl mb-2" style={{ color: mod.accent }}>
                    {mod.title}
                  </h3>
                  <p className="text-[#9CA3AF] text-sm font-body leading-relaxed">{mod.desc}</p>
                </div>
                <a
                  href="mailto:mariammanjavidze01@gmail.com"
                  className="self-start text-sm font-semibold px-4 py-2 rounded-full border transition-all hover:scale-105"
                  style={{ borderColor: mod.accent + "50", color: mod.accent }}
                >
                  Email Me →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── WORKSHOP BLOCK ─────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-[#9CA3AF] uppercase tracking-widest text-xs font-body mb-4">
              Teams & Organizations
            </p>
            <h2 className="font-heading font-bold text-4xl md:text-5xl">
              Bring Vibe Coding to Your Organization
            </h2>
          </div>

          {/* 4 glassmorphism cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { emoji: "🎓", title: "University", desc: "Guest lectures & semester integrations" },
              { emoji: "🚀", title: "Startup", desc: "Hands-on AI product workshops" },
              { emoji: "⚡", title: "Bootcamp", desc: "Intensive multi-day AI programs" },
              { emoji: "🏢", title: "Corporate", desc: "Team training & AI adoption sessions" },
            ].map((item) => (
              <div
                key={item.title}
                className="glass-card rounded-2xl p-5 text-center hover:-translate-y-1 transition-all duration-300"
              >
                <div className="text-3xl mb-3">{item.emoji}</div>
                <div className="font-heading font-bold text-sm text-white mb-1">{item.title}</div>
                <div className="text-[#9CA3AF] text-xs font-body leading-snug">{item.desc}</div>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <a
              href="mailto:mariammanjavidze01@gmail.com"
              className="inline-flex items-center gap-2 bg-[#3B82F6] hover:bg-blue-400 text-white font-semibold text-lg px-8 py-4 rounded-full transition-all hover:scale-105"
              style={{ boxShadow: "0 0 24px rgba(59,130,246,0.4)" }}
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── FINAL CTA ──────────────────────────────────── */}
      <section className="py-32 px-6">
        <div
          className="max-w-5xl mx-auto rounded-3xl py-24 px-8 text-center animated-gradient-bg"
          style={{ boxShadow: "0 0 80px rgba(59,130,246,0.25)" }}
        >
          <h2 className="font-heading font-bold text-5xl md:text-7xl leading-tight mb-10 text-white">
            Ready to build your first AI product?
          </h2>
          <div className="flex flex-col items-center gap-4">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 bg-white text-[#1d4ed8] font-bold text-xl px-10 py-5 rounded-full transition-all hover:scale-105 hover:shadow-2xl"
            >
              Start Learning →
            </Link>
            <a
              href="mailto:mariammanjavidze01@gmail.com"
              className="text-white/60 hover:text-white text-sm font-body underline underline-offset-4 transition-colors"
            >
              Have questions? Email me
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
