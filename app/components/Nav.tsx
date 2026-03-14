"use client";
import Link from "next/link";
import { useState } from "react";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/90 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-heading font-bold text-xl tracking-tight">
          Vibe<span className="text-accent">Coding</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/program" className="text-white/70 hover:text-white transition-colors text-sm font-body">
            Program
          </Link>
          <Link href="/#modules" className="text-white/70 hover:text-white transition-colors text-sm font-body">
            Modules
          </Link>
          <Link href="/workshop" className="text-white/70 hover:text-white transition-colors text-sm font-body">
            Workshop
          </Link>
          <Link
            href="#"
            className="bg-accent hover:bg-blue-500 text-white text-sm font-semibold px-5 py-2 rounded-full transition-all hover:scale-105"
          >
            Enroll Now
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white/80 hover:text-white"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <div className="w-6 flex flex-col gap-1.5">
            <span className={`block h-0.5 bg-current transition-all ${open ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block h-0.5 bg-current transition-all ${open ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 bg-current transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#0A0A0A] border-t border-white/10 px-6 py-4 flex flex-col gap-4">
          <Link href="/program" className="text-white/70 hover:text-white transition-colors font-body" onClick={() => setOpen(false)}>Program</Link>
          <Link href="/#modules" className="text-white/70 hover:text-white transition-colors font-body" onClick={() => setOpen(false)}>Modules</Link>
          <Link href="/workshop" className="text-white/70 hover:text-white transition-colors font-body" onClick={() => setOpen(false)}>Workshop</Link>
          <Link href="#" className="bg-accent text-white font-semibold px-5 py-2.5 rounded-full text-center" onClick={() => setOpen(false)}>Enroll Now</Link>
        </div>
      )}
    </nav>
  );
}
