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
            {modules.map((mod) => (
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

                  {/* Description */}
                  <p className="text-[#9CA3AF] text-sm font-body leading-relaxed">{mod.desc}</p>

                  {/* Topics list */}
                  <ul className="space-y-2">
                    {mod.topics.map((t) => (
                      <li key={t} className="flex items-center gap-2.5 text-sm font-body text-white/70">
                        <span
                          className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ background: mod.accent + "20" }}
                        >
                          <svg viewBox="0 0 10 10" fill="none" className="w-2.5 h-2.5" style={{ color: mod.accent }}>
                            <path d="M2 5l2.5 2.5L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </span>
                        {t}
                      </li>
                    ))}
                  </ul>

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

      {/* ── FINAL CTA — Web3 meme block ────────────────── */}
      <section className="py-32 px-6 relative overflow-hidden">

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
