import Nav from "../components/Nav";
import SocialLinks from "../components/SocialLinks";
import Footer from "../components/Footer";

const formats = [
  {
    title: "University Guest Lecture",
    desc: "Bring cutting-edge AI product skills to your students. A single session that shifts how they think about building — from theory to real tools.",
    accent: "#3B82F6",
    gradient: "linear-gradient(135deg, #0d1b3e 0%, #16213e 100%)",
    hoverClass: "card-hover",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <path d="M24 6 L44 16 L24 26 L4 16 Z" stroke="#3B82F6" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M12 21 L12 34 C12 34 16 40 24 40 C32 40 36 34 36 34 L36 21" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="44" y1="16" x2="44" y2="30" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Startup Workshop",
    desc: "Move faster without hiring. Teach your entire team to prototype, automate, and ship using AI — in a single focused workshop day.",
    accent: "#8B5CF6",
    gradient: "linear-gradient(135deg, #12082e 0%, #1e1045 100%)",
    hoverClass: "card-hover card-hover-purple",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <path d="M24 6 C24 6 36 10 38 22 C40 34 30 42 24 44 C18 42 8 34 10 22 C12 10 24 6 24 6Z"
          stroke="#8B5CF6" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M17 24 L21 28 L31 18" stroke="#8B5CF6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "AI Bootcamp",
    desc: "Add an AI-native module to your existing bootcamp. We design a standalone vibe coding track that graduates students employers actually want.",
    accent: "#10B981",
    gradient: "linear-gradient(135deg, #051a0f 0%, #0a2818 100%)",
    hoverClass: "card-hover card-hover-green",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <rect x="8" y="26" width="8" height="14" rx="2" stroke="#10B981" strokeWidth="2.5" />
        <rect x="20" y="18" width="8" height="22" rx="2" stroke="#10B981" strokeWidth="2.5" />
        <rect x="32" y="10" width="8" height="30" rx="2" stroke="#10B981" strokeWidth="2.5" />
        <path d="M10 22 L24 14 L38 6" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 2" />
      </svg>
    ),
  },
  {
    title: "Corporate Training",
    desc: "Future-proof your workforce with AI upskilling at scale. From executive briefings to department-wide programs that fit your culture.",
    accent: "#F59E0B",
    gradient: "linear-gradient(135deg, #1a1000 0%, #2d1f00 100%)",
    hoverClass: "card-hover card-hover-amber",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <rect x="8" y="12" width="32" height="26" rx="3" stroke="#F59E0B" strokeWidth="2.5" />
        <line x1="8" y1="20" x2="40" y2="20" stroke="#F59E0B" strokeWidth="2" />
        <circle cx="24" cy="8" r="3" stroke="#F59E0B" strokeWidth="2" />
        <line x1="24" y1="11" x2="24" y2="12" stroke="#F59E0B" strokeWidth="2" />
        <rect x="14" y="26" width="8" height="6" rx="1" fill="#F59E0B" opacity="0.4" />
        <rect x="26" y="26" width="8" height="6" rx="1" fill="#F59E0B" opacity="0.4" />
      </svg>
    ),
  },
];

const steps = [
  { num: "01", title: "Book a call", desc: "Tell us about your team, goals, and timeline. A 30-minute conversation is all we need." },
  { num: "02", title: "We design the session together", desc: "We tailor the workshop format, content, and exercises to your specific context and audience." },
  { num: "03", title: "We deliver it to your team", desc: "A live, hands-on session that leaves your team with real skills and real things built." },
];

export default function WorkshopPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white overflow-x-hidden">
      <Nav />

      {/* ── HERO ──────────────────────────────────────── */}
      <section className="pt-40 pb-24 px-6 text-center relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(139,92,246,0.12) 0%, transparent 70%)" }}
        />
        <div className="relative max-w-4xl mx-auto">
          <p className="text-[#9CA3AF] uppercase tracking-widest text-xs font-body mb-4">For Organizations</p>
          <h1 className="font-heading font-bold text-5xl md:text-7xl leading-tight mb-6">
            Bring Vibe Coding{" "}
            <span style={{
              background: "linear-gradient(90deg, #3B82F6, #8B5CF6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              to Your Organization
            </span>
          </h1>
          <p className="text-[#9CA3AF] text-xl font-body max-w-2xl mx-auto mb-10">
            Custom workshops for universities, startups and companies.
          </p>
          <SocialLinks />
        </div>
      </section>

      <div
        className="h-px mx-6"
        style={{ background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.4), rgba(139,92,246,0.4), transparent)" }}
      />

      {/* ── FORMAT CARDS ──────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#9CA3AF] uppercase tracking-widest text-xs font-body mb-3">Workshop Formats</p>
          <h2 className="font-heading font-bold text-4xl md:text-5xl mb-16">Built for your context</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {formats.map((fmt) => (
              <div
                key={fmt.title}
                className={`${fmt.hoverClass} border border-white/10 rounded-2xl p-8`}
                style={{ background: fmt.gradient }}
              >
                <div className="mb-5">{fmt.icon}</div>
                <h3 className="font-heading font-bold text-2xl mb-3" style={{ color: fmt.accent }}>
                  {fmt.title}
                </h3>
                <p className="text-[#9CA3AF] font-body leading-relaxed">{fmt.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div
        className="h-px mx-6"
        style={{ background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.4), rgba(139,92,246,0.4), transparent)" }}
      />

      {/* ── HOW IT WORKS ──────────────────────────────── */}
      <section className="py-24 px-6 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#9CA3AF] uppercase tracking-widest text-xs font-body mb-3">The Process</p>
          <h2 className="font-heading font-bold text-4xl md:text-5xl mb-16">Simple to get started</h2>
          <div className="grid sm:grid-cols-3 gap-10 relative">
            <div
              className="absolute top-8 left-1/4 right-1/4 h-px hidden sm:block"
              style={{ background: "linear-gradient(90deg, rgba(59,130,246,0.3), rgba(139,92,246,0.3))" }}
            />
            {steps.map((item) => (
              <div key={item.num} className="relative text-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 font-heading font-bold text-xl text-white"
                  style={{ background: "linear-gradient(135deg, #3B82F6, #8B5CF6)", boxShadow: "0 0 20px rgba(59,130,246,0.3)" }}
                >
                  {item.num}
                </div>
                <h3 className="font-heading font-bold text-xl mb-3">{item.title}</h3>
                <p className="text-[#9CA3AF] font-body text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div
        className="h-px mx-6"
        style={{ background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.4), rgba(139,92,246,0.4), transparent)" }}
      />

      {/* ── CTA ───────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading font-bold text-4xl md:text-6xl mb-6">
            Let&apos;s build something{" "}
            <span style={{
              background: "linear-gradient(90deg, #3B82F6, #8B5CF6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              together.
            </span>
          </h2>
          <p className="text-[#9CA3AF] text-xl font-body mb-10">
            Reach out directly — we&apos;ll design the right session for your team.
          </p>
          <SocialLinks />
        </div>
      </section>

      <div
        className="h-px mx-6"
        style={{ background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.4), rgba(139,92,246,0.4), transparent)" }}
      />

      {/* ── INSTRUCTOR MINI ───────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-8 flex flex-col sm:flex-row items-center gap-8 text-center sm:text-left">
            <img
              src="/mariam.jpg"
              alt="Mariam Manjavidze"
              className="w-24 h-24 rounded-full object-cover border-2 border-[#3B82F6] flex-shrink-0"
              style={{ boxShadow: "0 0 20px rgba(59,130,246,0.3)" }}
            />
            <div>
              <p className="text-[#9CA3AF] text-xs font-body mb-1">Your Instructor</p>
              <h3 className="font-heading font-bold text-2xl mb-1">Mariam Manjavidze</h3>
              <p className="text-[#3B82F6] font-heading font-medium text-sm mb-3">
                Vibe Coder · UX/UI Designer
              </p>
              <p className="text-[#9CA3AF] text-sm font-body leading-relaxed">
                Product designer based in Tbilisi, Georgia — helping beginners ship real products with AI tools.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
