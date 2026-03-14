import Nav from "../components/Nav";
import SocialLinks from "../components/SocialLinks";
import Footer from "../components/Footer";

const lectures = [
  {
    num: 1,
    title: "Intro to AI & Vibe Coding",
    desc: "Understand the AI landscape and what vibe coding means. Get oriented with the tools you'll use throughout.",
    tools: ["Claude", "ChatGPT", "Cursor"],
    accentFrom: "#3B82F6",
    accentTo: "#60A5FA",
  },
  {
    num: 2,
    title: "Prompt Engineering Basics",
    desc: "Master the art of writing prompts that get results. This single skill unlocks everything else.",
    tools: ["Claude", "ChatGPT", "Prompting"],
    accentFrom: "#8B5CF6",
    accentTo: "#A78BFA",
  },
  {
    num: 3,
    title: "Design Thinking → MVP",
    desc: "Learn to go from raw idea to a scoped buildable project. No fluff — just a clear framework that works.",
    tools: ["Figma", "Notion", "MVP Framework"],
    accentFrom: "#10B981",
    accentTo: "#34D399",
  },
  {
    num: 4,
    title: "Build MVP with AI Tools",
    desc: "Build a real working product from scratch using AI. You will ship something by the end of this lecture.",
    tools: ["Cursor", "v0", "Replit", "Claude"],
    accentFrom: "#F59E0B",
    accentTo: "#FBD24D",
  },
  {
    num: 5,
    title: "Automation & Workflow",
    desc: "Identify what to automate and design your first workflow. Connect your tools so they work while you sleep.",
    tools: ["Make", "Zapier", "Webhooks"],
    accentFrom: "#EC4899",
    accentTo: "#F472B6",
  },
  {
    num: 6,
    title: "Automation Platforms",
    desc: "Go deep on Make, Zapier and n8n side by side. Know exactly when to use each one.",
    tools: ["Make", "Zapier", "n8n"],
    accentFrom: "#06B6D4",
    accentTo: "#22D3EE",
  },
  {
    num: 7,
    title: "AI Workflows in Practice",
    desc: "Build your final AI-powered product end to end. You leave with something real and shipped.",
    tools: ["All tools combined"],
    accentFrom: "#3B82F6",
    accentTo: "#8B5CF6",
  },
];

export default function ProgramPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white overflow-x-hidden">
      <Nav />

      {/* ── HERO ──────────────────────────────────────── */}
      <section className="pt-40 pb-24 px-6 text-center relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.12) 0%, transparent 70%)" }}
        />
        <div className="relative max-w-4xl mx-auto">
          <p className="text-[#9CA3AF] uppercase tracking-widest text-xs font-body mb-4">Full Curriculum</p>
          <h1 className="font-heading font-bold text-5xl md:text-7xl leading-tight mb-6">
            Vibe Coding &amp; AI Product Building
          </h1>
          <p className="text-[#9CA3AF] text-xl font-body max-w-2xl mx-auto mb-10">
            7 lectures. Hands-on. Built for complete beginners.
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-2 bg-[#3B82F6] hover:bg-blue-400 text-white font-semibold text-lg px-8 py-4 rounded-full transition-all hover:scale-105"
            style={{ boxShadow: "0 0 32px rgba(59,130,246,0.4)" }}
          >
            Enroll Now →
          </a>
        </div>
      </section>

      <div
        className="h-px mx-6"
        style={{ background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.4), rgba(139,92,246,0.4), transparent)" }}
      />

      {/* ── LECTURE CARDS ─────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto space-y-5">
          {lectures.map((lecture) => (
            <div
              key={lecture.num}
              className="card-hover relative bg-white/[0.04] border border-white/10 rounded-2xl p-8 overflow-hidden group"
              style={{ borderLeft: `3px solid ${lecture.accentFrom}` }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                style={{ background: `radial-gradient(ellipse at 0% 50%, ${lecture.accentFrom}15 0%, transparent 60%)` }}
              />
              <div className="relative flex items-start gap-6">
                <div
                  className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-heading font-bold text-lg text-white"
                  style={{ background: `linear-gradient(135deg, ${lecture.accentFrom}, ${lecture.accentTo})` }}
                >
                  {lecture.num}
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="font-heading font-bold text-2xl mb-3">{lecture.title}</h2>
                  <p className="text-[#9CA3AF] font-body leading-relaxed mb-5">{lecture.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {lecture.tools.map((tool) => (
                      <span
                        key={tool}
                        className="text-xs font-body font-medium px-3 py-1 rounded-full border"
                        style={{
                          background: `${lecture.accentFrom}15`,
                          borderColor: `${lecture.accentFrom}30`,
                          color: lecture.accentFrom,
                        }}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div
        className="h-px mx-6"
        style={{ background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.4), rgba(139,92,246,0.4), transparent)" }}
      />

      {/* ── BOTTOM CTA ────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading font-bold text-4xl md:text-6xl mb-6">
            Ready to ship your{" "}
            <span style={{
              background: "linear-gradient(90deg, #3B82F6, #8B5CF6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              first AI product?
            </span>
          </h2>
          <p className="text-[#9CA3AF] text-xl font-body mb-10">
            Get in touch and join the next cohort.
          </p>
          <SocialLinks />
        </div>
      </section>

      <Footer />
    </main>
  );
}
