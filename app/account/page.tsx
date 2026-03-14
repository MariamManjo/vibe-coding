"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

const SOLSCAN_BASE = "https://solscan.io/tx/";

interface User {
  id: number;
  email: string;
  name: string | null;
  created_at: string;
}

interface Purchase {
  id: number;
  wallet_address: string;
  tx_signature: string;
  product_name: string;
  amount_sol: string;
  network: string;
  access_unlocked: boolean;
  created_at: string;
}

export default function AccountPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [user, setUser]               = useState<User | null>(null);
  const [loading, setLoading]         = useState(true);
  const [purchases, setPurchases]     = useState<Purchase[]>([]);
  const [purchLoading, setPurchLoading] = useState(true);
  const [saveStatus, setSaveStatus]   = useState<"idle" | "saving" | "saved" | "error">("idle");

  const sig    = searchParams.get("sig");
  const wallet = searchParams.get("wallet");

  /* ── fetch current user ── */
  useEffect(() => {
    fetch("/api/auth/me")
      .then(r => r.json())
      .then(d => {
        if (!d.user) { router.push("/login"); return; }
        setUser(d.user);
      })
      .catch(() => router.push("/login"))
      .finally(() => setLoading(false));
  }, [router]);

  /* ── save purchase after auth ── */
  const savePurchase = useCallback(async () => {
    if (!sig || !wallet) return;
    setSaveStatus("saving");
    try {
      const res = await fetch("/api/purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ txSignature: sig, walletAddress: wallet }),
      });
      if (!res.ok) throw new Error();
      setSaveStatus("saved");
      router.replace("/account");
    } catch {
      setSaveStatus("error");
    }
  }, [sig, wallet, router]);

  /* ── fetch purchase history ── */
  const fetchPurchases = useCallback(async () => {
    setPurchLoading(true);
    try {
      const res = await fetch("/api/purchase");
      if (!res.ok) throw new Error();
      const json = await res.json();
      setPurchases(json.purchases ?? []);
    } finally {
      setPurchLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!user) return;
    if (sig && wallet && saveStatus === "idle") {
      savePurchase();
    } else {
      fetchPurchases();
    }
  }, [user, sig, wallet, saveStatus, savePurchase, fetchPurchases]);

  useEffect(() => {
    if (saveStatus === "saved") fetchPurchases();
  }, [saveStatus, fetchPurchases]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-[#9945FF] animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-12">

        {/* ── Profile header ── */}
        <div className="glass-card rounded-3xl p-6 mb-6 flex items-center gap-4">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #9945FF, #3B82F6)" }}
          >
            {user.email[0].toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-heading font-bold text-base leading-tight truncate">
              {user.name ?? user.email.split("@")[0]}
            </p>
            <p className="text-white/40 text-sm font-body truncate">{user.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="text-xs text-white/30 hover:text-white/60 transition-colors font-body border border-white/10 hover:border-white/20 rounded-lg px-3 py-1.5"
          >
            Sign out
          </button>
        </div>

        {/* ── Save status banner ── */}
        {saveStatus === "saving" && (
          <div className="rounded-2xl px-4 py-3 mb-5 flex items-center gap-2.5" style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)" }}>
            <div className="w-4 h-4 rounded-full border-2 border-[#3B82F6]/30 border-t-[#3B82F6] animate-spin flex-shrink-0" />
            <p className="text-[#3B82F6] text-sm font-body">Attaching purchase to your account…</p>
          </div>
        )}
        {saveStatus === "error" && (
          <div className="rounded-2xl px-4 py-3 mb-5" style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}>
            <p className="text-red-400 text-sm font-body">Could not attach purchase. Please contact support.</p>
          </div>
        )}

        {/* ── Access unlocked card ── */}
        {purchases.length > 0 && (
          <div
            className="rounded-3xl p-6 mb-6"
            style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.12), rgba(16,185,129,0.04))", border: "1px solid rgba(16,185,129,0.25)" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center text-xl flex-shrink-0"
                style={{ background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.25)" }}
              >
                🎓
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-heading font-bold text-base leading-tight">Vibe Coding</p>
                <p className="text-white/40 text-xs font-body">Full 7-Week Program</p>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full flex-shrink-0" style={{ background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.25)" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                <span className="text-[#10B981] text-[10px] font-mono font-semibold">Access Unlocked</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Lectures", value: "7 hands-on" },
                { label: "Duration", value: "7 weeks" },
                { label: "Access", value: "Lifetime" },
              ].map(({ label, value }) => (
                <div key={label} className="rounded-xl px-3 py-2.5 text-center" style={{ background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.12)" }}>
                  <p className="text-[#10B981]/60 text-[9px] font-mono uppercase tracking-wider">{label}</p>
                  <p className="text-white text-xs font-semibold mt-0.5">{value}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Payment history ── */}
        <div className="glass-card rounded-3xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/[0.06] flex items-center justify-between">
            <p className="font-heading font-bold text-base">Payment History</p>
            <span className="text-white/30 text-xs font-mono">{purchases.length} record{purchases.length !== 1 ? "s" : ""}</span>
          </div>

          {purchLoading ? (
            <div className="px-6 py-10 flex justify-center">
              <div className="w-6 h-6 rounded-full border-2 border-white/20 border-t-[#9945FF] animate-spin" />
            </div>
          ) : purchases.length === 0 ? (
            <div className="px-6 py-10 text-center">
              <p className="text-white/30 text-sm font-body">No purchases yet.</p>
            </div>
          ) : (
            <div className="divide-y divide-white/[0.05]">
              {purchases.map(p => (
                <div key={p.id} className="px-6 py-5">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="font-semibold text-sm leading-tight">{p.product_name}</p>
                      <p className="text-white/40 text-xs font-body mt-0.5">
                        {new Date(p.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0 ml-4">
                      <p className="font-heading font-bold text-base text-[#10B981]">{p.amount_sol} SOL</p>
                      <div className="flex items-center justify-end gap-1 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        <span className="text-amber-400/60 text-[10px] font-mono capitalize">{p.network}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2.5 rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    {/* Status */}
                    <div className="flex items-center justify-between">
                      <span className="text-white/35 text-[11px] font-mono uppercase tracking-wider">Status</span>
                      <span className={`text-xs font-semibold ${p.access_unlocked ? "text-[#10B981]" : "text-amber-400"}`}>
                        {p.access_unlocked ? "✓ Confirmed on-chain" : "Pending"}
                      </span>
                    </div>
                    {/* Wallet */}
                    <div className="flex items-center justify-between">
                      <span className="text-white/35 text-[11px] font-mono uppercase tracking-wider">Wallet</span>
                      <span className="text-xs font-mono text-white/60">
                        {p.wallet_address.slice(0, 8)}…{p.wallet_address.slice(-6)}
                      </span>
                    </div>
                    {/* Signature + Solscan */}
                    <div className="flex items-center justify-between">
                      <span className="text-white/35 text-[11px] font-mono uppercase tracking-wider">Signature</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[#6B7280] text-[11px] font-mono">
                          {p.tx_signature.slice(0, 10)}…{p.tx_signature.slice(-6)}
                        </span>
                        <a
                          href={`${SOLSCAN_BASE}${p.tx_signature}?cluster=${p.network}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#3B82F6] hover:text-blue-400 transition-colors"
                        >
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          Solscan
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 text-center">
          <Link href="/" className="text-white/30 text-sm hover:text-white/60 transition-colors font-body">
            ← Back to home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
