"use client";
import Link from "next/link";

export default function Nav() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: "rgba(10,10,10,0.75)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="font-heading font-bold text-xl tracking-tight transition-all duration-300 hover:drop-shadow-[0_0_12px_rgba(153,69,255,0.7)]"
        >
          Vibe<span className="text-accent">Coding</span>
        </Link>

        {/* Single CTA */}
        <Link
          href="/start"
          className="relative overflow-hidden text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-200 hover:scale-105 hover:shadow-[0_0_20px_rgba(153,69,255,0.5)]"
          style={{
            background: "linear-gradient(135deg, #9945FF 0%, #3B82F6 60%, #14F195 100%)",
            backgroundSize: "200% 200%",
            animation: "nav-cta-shift 4s ease infinite",
          }}
        >
          <span className="relative z-10">Start Building →</span>
        </Link>

      </div>

      <style>{`
        @keyframes nav-cta-shift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </nav>
  );
}
