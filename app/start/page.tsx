"use client";

import { useState } from "react";
import Link from "next/link";
import Nav from "@/app/components/Nav";

const MAIL = "mariammanjavidze01@gmail.com";

const paths = [
  {
    id: "full",
    accent: "#9945FF",
    accentB: "#3B82F6",
    badge: "0.01 SOL",
    badgeBg: "rgba(153,69,255,0.15)",
    badgeColor: "#9945FF",
    recommended: true,
    icon: (
      <svg viewBox="0 0 44 44" fill="none" className="w-11 h-11">
        <path d="M22 3C22 3 11 14 11 26h22C33 14 22 3 22 3z"
          fill="#9945FF" fillOpacity="0.5" stroke="#9945FF" strokeWidth="1.5"/>
        <rect x="13" y="24" width="18" height="11" rx="3"
          fill="#9945FF" fillOpacity="0.3" stroke="#9945FF" strokeWidth="1.2"/>
        <path d="M16 35l-3 8h18l-3-8z" fill="#3B82F6" fillOpacity="0.45"/>
        <circle cx="22" cy="21" r="4.5" fill="#9945FF" fillOpacity="0.35" stroke="#9945FF" strokeWidth="1.2"/>
        <circle cx="22" cy="21" r="2" fill="#9945FF" opacity="0.95"/>
      </svg>
    ),
    title: "Full 7-Week Program",
    subtitle: "Zero → Builder",
    desc: "A structured journey from complete beginner to shipping real AI-powered products. Each week builds on the last.",
    details: ["7 structured weeks", "Live project builds", "Prompt engineering", "Ship a real MVP"],
    cta: "full",
  },
  {
    id: "modules",
    accent: "#3B82F6",
    accentB: "#14F195",
    badge: "Flexible",
    badgeBg: "rgba(59,130,246,0.15)",
    badgeColor: "#3B82F6",
    recommended: false,
    icon: (
      <svg viewBox="0 0 44 44" fill="none" className="w-11 h-11">
        <rect x="4" y="4" width="16" height="16" rx="3.5"
          fill="#3B82F6" fillOpacity="0.35" stroke="#3B82F6" strokeWidth="1.4"/>
        <rect x="24" y="4" width="16" height="16" rx="3.5"
          fill="#3B82F6" fillOpacity="0.18" stroke="#3B82F6" strokeWidth="1.4"/>
        <rect x="4" y="24" width="16" height="16" rx="3.5"
          fill="#3B82F6" fillOpacity="0.18" stroke="#3B82F6" strokeWidth="1.4"/>
        <rect x="24" y="24" width="16" height="16" rx="3.5"
          fill="#3B82F6" fillOpacity="0.35" stroke="#3B82F6" strokeWidth="1.4"/>
        <circle cx="12" cy="12" r="3.5" fill="#3B82F6" opacity="0.85"/>
        <circle cx="32" cy="32" r="3.5" fill="#14F195" opacity="0.75"/>
        <path d="M22 14v16M14 22h16" stroke="#3B82F6" strokeWidth="1.2"
          strokeLinecap="round" opacity="0.4"/>
      </svg>
    ),
    title: "Individual Modules",
    subtitle: "Pick & Learn",
    desc: "Choose exactly what interests you. Pick specific topics, learn at your own pace, skip what you already know.",
    details: ["Choose any topic", "Self-paced", "Standalone lessons", "Mix & match freely"],
    cta: "email",
  },
  {
    id: "org",
    accent: "#14F195",
    accentB: "#F59E0B",
    badge: "Custom",
    badgeBg: "rgba(20,241,149,0.12)",
    badgeColor: "#14F195",
    recommended: false,
    icon: (
      <svg viewBox="0 0 44 44" fill="none" className="w-11 h-11">
        <circle cx="22" cy="12" r="6"
          fill="#14F195" fillOpacity="0.3" stroke="#14F195" strokeWidth="1.4"/>
        <circle cx="8" cy="32" r="5"
          fill="#14F195" fillOpacity="0.2" stroke="#14F195" strokeWidth="1.2"/>
        <circle cx="36" cy="32" r="5"
          fill="#14F195" fillOpacity="0.2" stroke="#14F195" strokeWidth="1.2"/>
        <path d="M22 18v5M22 23L9 32M22 23l13 9"
          stroke="#14F195" strokeWidth="1.3" strokeLinecap="round"/>
        <circle cx="22" cy="12" r="2.5" fill="#14F195" opacity="0.9"/>
        <circle cx="8"  cy="32" r="2"   fill="#14F195" opacity="0.7"/>
        <circle cx="36" cy="32" r="2"   fill="#14F195" opacity="0.7"/>
      </svg>
    ),
    title: "Organization / Team",
    subtitle: "Scale AI Skills",
    desc: "Custom AI programs for universities, startups, and corporations. Tailored curriculum, group sessions, flexible format.",
    details: ["Custom curriculum", "Group sessions", "University & corporate", "Tailored pricing"],
    cta: "email",
  },
];

export default function StartPage() {
  const [selected, setSelected] = useState<string | null>(null);

  const selectedPath = paths.find((p) => p.id === selected);

  return (
    <div className="min-h-screen text-white" style={{ background: "#080810" }}>
      {/* Ambient bg */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(153,69,255,0.10) 0%, transparent 65%)", filter: "blur(80px)" }}/>
        <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(20,241,149,0.07) 0%, transparent 65%)", filter: "blur(80px)" }}/>
        <div className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "28px 28px" }}/>
      </div>

      <Nav />

      <main className="relative z-10 min-h-[calc(100vh-80px)] flex flex-col items-center justify-center px-6 py-20">

        {/* Header */}
        <div className="text-center mb-12 max-w-xl">
          <p className="text-white/25 text-xs font-mono uppercase tracking-[0.2em] mb-4">
            choose your path
          </p>
          <h1 className="font-heading font-bold text-3xl md:text-4xl leading-tight mb-3">
            How do you want to{" "}
            <span style={{
              background: "linear-gradient(90deg, #9945FF, #3B82F6, #14F195)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text"
            }}>
              learn?
            </span>
          </h1>
          <p className="text-white/35 text-sm font-body">
            Pick the format that fits your goal. You can always reach out to change later.
          </p>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-3 gap-5 w-full max-w-4xl mb-10">
          {paths.map((path) => {
            const isSelected = selected === path.id;
            return (
              <button
                key={path.id}
                onClick={() => setSelected(isSelected ? null : path.id)}
                className="relative text-left rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 focus:outline-none group"
                style={{
                  background: isSelected
                    ? `linear-gradient(145deg, ${path.accent}14 0%, ${path.accentB}0a 100%)`
                    : "linear-gradient(145deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))",
                  borderColor: isSelected ? path.accent : "rgba(255,255,255,0.08)",
                  boxShadow: isSelected
                    ? `0 0 32px ${path.accent}30, 0 0 64px ${path.accent}12, inset 0 1px 0 ${path.accent}25`
                    : "none",
                }}
              >
                {/* Recommended badge */}
                {path.recommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="text-[8px] font-mono font-black uppercase tracking-widest px-3 py-1 rounded-full text-black"
                      style={{ background: "linear-gradient(90deg, #9945FF, #14F195)" }}>
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Top accent bar */}
                <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(90deg, ${path.accent}, ${path.accentB}, transparent)`,
                    opacity: isSelected ? 1 : 0.25,
                  }}/>

                {/* Selected check */}
                <div className={`absolute top-4 right-4 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${isSelected ? "scale-100 opacity-100" : "scale-75 opacity-0"}`}
                  style={{ borderColor: path.accent, background: `${path.accent}25` }}>
                  <svg viewBox="0 0 12 10" fill="none" className="w-3 h-2.5">
                    <path d="M1 5l3.5 3.5L11 1" stroke={path.accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>

                {/* Icon + badge row */}
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2.5 rounded-xl border"
                    style={{ background: `${path.accent}12`, borderColor: `${path.accent}30` }}>
                    {path.icon}
                  </div>
                  <span className="text-[9px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full"
                    style={{ color: path.badgeColor, background: path.badgeBg, border: `1px solid ${path.accent}30` }}>
                    {path.badge}
                  </span>
                </div>

                {/* Title + subtitle */}
                <h3 className="font-heading font-bold text-base leading-snug text-white mb-0.5">{path.title}</h3>
                <p className="text-[10px] font-mono mb-3" style={{ color: path.accent }}>{path.subtitle}</p>

                {/* Description */}
                <p className="text-white/45 text-xs font-body leading-relaxed mb-4">{path.desc}</p>

                {/* Detail chips */}
                <div className="flex flex-wrap gap-1.5">
                  {path.details.map((d) => (
                    <span key={d} className="text-[8px] font-mono px-2 py-0.5 rounded-full border"
                      style={{ color: `${path.accent}bb`, borderColor: `${path.accent}25`, background: `${path.accent}0c` }}>
                      {d}
                    </span>
                  ))}
                </div>
              </button>
            );
          })}
        </div>

        {/* CTA area */}
        <div
          className="flex flex-col items-center gap-4 transition-all duration-500"
          style={{ opacity: selected ? 1 : 0, transform: selected ? "translateY(0)" : "translateY(12px)", pointerEvents: selected ? "auto" : "none" }}
        >
          {selectedPath && (
            <>
              {selectedPath.cta === "full" ? (
                <Link href="/login"
                  className="inline-flex items-center gap-3 font-heading font-bold text-lg text-white px-10 py-4 rounded-full transition-all duration-300 hover:scale-105 hover:brightness-110"
                  style={{
                    background: "linear-gradient(135deg, #9945FF 0%, #3B82F6 55%, #14F195 100%)",
                    boxShadow: "0 0 36px rgba(153,69,255,0.45), 0 0 72px rgba(20,241,149,0.14)",
                  }}>
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2l9.5-9.5a3.535 3.535 0 10-5-5L4.5 16.5z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 5l4 4"/>
                  </svg>
                  Connect Wallet &amp; Enroll
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
                  </svg>
                </Link>
              ) : (
                <a href={`mailto:${MAIL}?subject=${encodeURIComponent(
                    selectedPath.id === "modules"
                      ? "Interest: Individual Modules"
                      : "Interest: Organization / Team Training"
                  )}`}
                  className="inline-flex items-center gap-3 font-heading font-bold text-lg text-white px-10 py-4 rounded-full transition-all duration-300 hover:scale-105 hover:brightness-110"
                  style={{
                    background: `linear-gradient(135deg, ${selectedPath.accent} 0%, ${selectedPath.accentB} 100%)`,
                    boxShadow: `0 0 36px ${selectedPath.accent}44, 0 0 72px ${selectedPath.accentB}18`,
                  }}>
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                  Email Mariam
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
                  </svg>
                </a>
              )}

              <p className="text-white/20 text-xs font-mono">
                {selectedPath.cta === "full"
                  ? "0.01 SOL · Phantom Wallet · Instant Access"
                  : `mariammanjavidze01@gmail.com · Usually replies within 24h`}
              </p>
            </>
          )}
        </div>

        {/* Back link */}
        <Link href="/" className="mt-10 text-white/20 hover:text-white/50 text-xs font-mono transition-colors">
          ← back to home
        </Link>

      </main>
    </div>
  );
}
