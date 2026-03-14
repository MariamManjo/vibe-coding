"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";

const COURSE_PRICE_SOL = 0.01;
const RECIPIENT_ADDRESS =
  process.env.NEXT_PUBLIC_SOLANA_RECIPIENT_ADDRESS ??
  "GhgXp29MrWxzdU1pdjo7gbmm2QjTY4TE6iomsM4hv9Ct";
const NETWORK = "devnet";
const SOLSCAN_BASE = "https://solscan.io/tx/";

// We send the transaction ourselves to this RPC — guarantees devnet
// regardless of which network the user's Phantom is configured on.
const DEVNET_RPCS = [
  "https://api.devnet.solana.com",
  "https://rpc.ankr.com/solana_devnet",
];

async function fetchBlockhash(): Promise<{ blockhash: string; lastValidBlockHeight: number }> {
  const res = await fetch(`/api/blockhash`);
  if (!res.ok) throw new Error("Unable to reach the Solana network. Please try again.");
  const json = await res.json();
  if (!json.blockhash) throw new Error("Unable to reach the Solana network. Please try again.");
  return {
    blockhash: json.blockhash as string,
    lastValidBlockHeight: (json.lastValidBlockHeight as number) ?? 0,
  };
}

type Step = "connect" | "payment" | "success";
type ConnectMode = "wallet" | "email";

interface SolanaProvider {
  isPhantom?: boolean;
  connect: (opts?: { onlyIfTrusted?: boolean }) => Promise<{ publicKey: { toString: () => string } }>;
  disconnect: () => Promise<void>;
  publicKey?: { toString: () => string } | null;
  signTransaction: (tx: Transaction) => Promise<Transaction>;
  signAndSendTransaction?: (tx: Transaction) => Promise<{ signature: string }>;
}

declare global {
  interface Window {
    solana?: SolanaProvider;
    phantom?: { solana?: SolanaProvider };
  }
}

function shortenAddress(addr: string) {
  return addr.slice(0, 4) + "..." + addr.slice(-4);
}

function getProvider(): SolanaProvider | undefined {
  if (typeof window === "undefined") return undefined;
  return window.phantom?.solana ?? window.solana;
}

export default function LoginPage() {
  const [step, setStep] = useState<Step>("connect");
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [txSignature, setTxSignature] = useState<string | null>(null);
  const [connectStatus, setConnectStatus] = useState<"idle" | "connecting">("idle");
  const [payStatus, setPayStatus] = useState<"idle" | "paying">("idle");
  const [hasWallet, setHasWallet] = useState<boolean | null>(null);
  const [connectError, setConnectError] = useState("");
  const [payError, setPayError] = useState("");
  const [balance, setBalance] = useState<number | null>(null);
  const [balanceStatus, setBalanceStatus] = useState<"idle" | "loading" | "loaded" | "error">("idle");

  useEffect(() => {
    // Only detect whether the extension exists — do NOT auto-advance
    setHasWallet(!!getProvider());
  }, []);

  const fetchBalance = useCallback(async (address: string) => {
    setBalanceStatus("loading");
    setBalance(null);
    try {
      const conn = new Connection(DEVNET_RPCS[0], "confirmed");
      const lamports = await conn.getBalance(new PublicKey(address));
      const sol = lamports / LAMPORTS_PER_SOL;
      setBalance(sol);
      setBalanceStatus("loaded");
      console.log("[balance] fetched:", sol, "SOL for", address);
    } catch (err) {
      console.error("[balance] fetch failed:", err);
      setBalanceStatus("error");
    }
  }, []);

  const connectWallet = useCallback(async () => {
    const provider = getProvider();
    if (!provider) return;
    try {
      setConnectStatus("connecting");
      setConnectError("");
      // Always prompt the Phantom popup by explicitly calling connect()
      const resp = await provider.connect();
      const addr = resp.publicKey.toString();
      setWalletAddress(addr);
      setConnectStatus("idle");
      setStep("payment");
      fetchBalance(addr);
    } catch {
      setConnectStatus("idle");
      setConnectError("Connection was cancelled. Please try again.");
    }
  }, []);

  const disconnectWallet = useCallback(async () => {
    const provider = getProvider();
    if (provider) await provider.disconnect();
    setWalletAddress(null);
    setStep("connect");
    setPayError("");
    setConnectError("");
  }, []);

  const purchaseCourse = useCallback(async () => {
    const provider = getProvider();
    if (!provider || !walletAddress) return;

    // Tracks the signature so we can verify on-chain even if confirmTransaction throws
    let txSig: string | null = null;

    try {
      setPayStatus("paying");
      setPayError("");

      const fromPubkey = new PublicKey(walletAddress);
      const toPubkey   = new PublicKey(RECIPIENT_ADDRESS);
      const lamports   = Math.round(COURSE_PRICE_SOL * LAMPORTS_PER_SOL);

      // ── 1. Create a working devnet Connection ──────────────────────────────
      // Try each RPC in order; log success/failure for each attempt.
      // If every probe fails we still fall back to the primary — it may recover
      // by the time the transaction is sent (transient devnet hiccup).
      let connection!: Connection;
      let connectedRpc = "";
      for (const rpc of DEVNET_RPCS) {
        try {
          const candidate = new Connection(rpc, "confirmed");
          await candidate.getVersion();          // lightweight health probe
          connection  = candidate;
          connectedRpc = rpc;
          console.log("[solana] RPC connected:", rpc);
          break;
        } catch (probeErr) {
          console.error("[solana] RPC unreachable, trying next:", rpc, probeErr);
        }
      }
      if (!connection) {
        console.warn("[solana] all RPC probes failed — using primary as fallback");
        connection  = new Connection(DEVNET_RPCS[0], "confirmed");
        connectedRpc = DEVNET_RPCS[0];
      }

      // ── 2. Fetch a fresh blockhash ─────────────────────────────────────────
      const { blockhash, lastValidBlockHeight } = await fetchBlockhash();
      console.log("[solana] blockhash fetched:", blockhash, "via", connectedRpc);

      // ── 3. Build the transfer transaction ─────────────────────────────────
      const transaction = new Transaction({
        recentBlockhash: blockhash,
        feePayer: fromPubkey,
      }).add(SystemProgram.transfer({ fromPubkey, toPubkey, lamports }));

      // ── 4. Phantom signs only — does NOT broadcast ─────────────────────────
      const signedTx = await provider.signTransaction(transaction);

      // ── 5. We broadcast to devnet ourselves ───────────────────────────────
      // skipPreflight: true avoids a false "Blockhash not found" preflight
      // rejection caused by RPC node desync on the public devnet cluster.
      txSig = await connection.sendRawTransaction(signedTx.serialize(), {
        skipPreflight: true,
      });
      console.log("[solana] transaction sent:", txSig);

      // ── 6. Confirm with block-height strategy ─────────────────────────────
      // If confirmTransaction throws (e.g. block-height window expired while
      // waiting) we fall back to a direct status check — the tx may have already
      // landed even though the polling timed out.
      try {
        await connection.confirmTransaction(
          { signature: txSig, blockhash, lastValidBlockHeight },
          "confirmed",
        );
        console.log("[solana] transaction confirmed:", txSig);
      } catch (confirmErr) {
        console.warn("[solana] confirmTransaction threw — checking status directly:", confirmErr);
        const status = await connection.getSignatureStatus(txSig, {
          searchTransactionHistory: true,
        });
        const conf = status?.value?.confirmationStatus;
        console.log("[solana] status check result:", conf, status?.value?.err ?? "no error");
        if (conf === "confirmed" || conf === "finalized") {
          console.log("[solana] transaction confirmed via status check:", txSig);
          // falls through to success
        } else if (status?.value?.err) {
          throw new Error("Transaction rejected on-chain: " + JSON.stringify(status.value.err));
        } else {
          throw new Error("Transaction could not be confirmed — check Solscan with signature: " + txSig);
        }
      }

      console.log("[solana] enrollment confirmed — full signature:", txSig);
      setTxSignature(txSig);
      setPayStatus("idle");
      setStep("success");
      if (walletAddress) fetchBalance(walletAddress);
    } catch (err: unknown) {
      setPayStatus("idle");
      console.error("[payment error]", err);
      const code    = (err as { code?: number })?.code;
      const rawMsg  = err instanceof Error
        ? err.message
        : String((err as { message?: string })?.message ?? JSON.stringify(err));
      const msg = rawMsg.toLowerCase();

      const isRejected =
        code === 4001 ||
        msg.includes("reject") ||
        msg.includes("cancel") ||
        msg.includes("denied") ||
        msg.includes("dismiss") ||
        msg.includes("closed");
      const isNetwork =
        code === -32603 ||
        msg.includes("reach") ||
        msg.includes("network") ||
        msg.includes("blockhash") ||
        msg.includes("fetch") ||
        msg.includes("rpc") ||
        msg.includes("timeout");

      if (isRejected) {
        setPayError("Transaction was cancelled. Please try again.");
      } else if (isNetwork) {
        setPayError("Could not connect to Solana Devnet. Check your internet and try again.");
      } else {
        setPayError("Payment failed. Please try again.");
      }
    }
  }, [walletAddress]);

  const stepNumber = { connect: 1, payment: 2, success: 3 } as const;

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white overflow-x-hidden">
      <Nav />

      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20 pb-12">
        <div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-15 pointer-events-none"
          style={{ background: "radial-gradient(circle, #3B82F6 0%, transparent 70%)", filter: "blur(80px)" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(circle, #8B5CF6 0%, transparent 70%)", filter: "blur(100px)" }}
        />

        <div className="relative z-10 w-full max-w-xl">
          {step === "connect" && (
            <ConnectCard
              connectStatus={connectStatus}
              hasWallet={hasWallet}
              errorMsg={connectError}
              onConnect={connectWallet}
              currentStep={stepNumber[step]}
            />
          )}
          {step === "payment" && walletAddress && (
            <PaymentCard
              walletAddress={walletAddress}
              payStatus={payStatus}
              errorMsg={payError}
              onPurchase={purchaseCourse}
              onDisconnect={disconnectWallet}
              currentStep={stepNumber[step]}
              balance={balance}
              balanceStatus={balanceStatus}
            />
          )}
          {step === "success" && (
            <SuccessCard txSignature={txSignature} />
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}

function StepIndicator({ current }: { current: 1 | 2 | 3 }) {
  const steps = [
    { n: 1, label: "Review" },
    { n: 2, label: "Approve" },
    { n: 3, label: "Access" },
  ];
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {steps.map((s, i) => {
        const done = s.n < current;
        const active = s.n === current;
        return (
          <div key={s.n} className="flex items-center gap-2">
            <div className="flex flex-col items-center gap-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  done ? "bg-[#10B981] text-white" : active ? "text-white" : "bg-white/10 text-white/40"
                }`}
                style={active ? { background: "linear-gradient(135deg, #9945FF, #3B82F6)" } : undefined}
              >
                {done ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                ) : s.n}
              </div>
              <span className={`text-[10px] font-body ${active ? "text-white/80" : done ? "text-[#10B981]" : "text-white/30"}`}>
                {s.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`w-10 h-px mb-4 ${s.n < current ? "bg-[#10B981]" : "bg-white/10"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function ConnectCard({
  connectStatus,
  hasWallet,
  errorMsg,
  onConnect,
  currentStep,
}: {
  connectStatus: "idle" | "connecting";
  hasWallet: boolean | null;
  errorMsg: string;
  onConnect: () => void;
  currentStep: 1 | 2 | 3;
}) {
  const [mode, setMode] = useState<ConnectMode>("wallet");
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setEmailLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setEmailLoading(false);
    setEmailSent(true);
    window.open("https://phantom.app/", "_blank");
  };

  return (
    <div className="glass-card rounded-3xl p-7 md:p-9">
      <StepIndicator current={currentStep} />

      {/* ── Product you're purchasing ── */}
      <div
        className="rounded-2xl p-5 mb-6"
        style={{ background: "linear-gradient(135deg, rgba(153,69,255,0.10) 0%, rgba(59,130,246,0.10) 50%, rgba(20,241,149,0.06) 100%)", border: "1px solid rgba(153,69,255,0.25)" }}
      >
        <p className="text-white/35 text-[10px] font-mono uppercase tracking-widest mb-3">You&apos;re purchasing</p>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #9945FF22, #14F19522)", border: "1px solid rgba(153,69,255,0.3)" }}
            >
              🎓
            </div>
            <div>
              <p className="font-heading font-bold text-white text-base leading-tight">Vibe Coding</p>
              <p className="text-white/50 text-xs font-body mt-0.5">Full 7-Week Program</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-heading font-bold text-2xl text-white">{COURSE_PRICE_SOL} SOL</p>
            <p className="text-white/30 text-[10px] font-body">one-time</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { icon: "🎓", label: "7 Lectures" },
            { icon: "🚀", label: "Ship a Product" },
            { icon: "♾️", label: "Lifetime Access" },
          ].map(({ icon, label }) => (
            <div key={label} className="flex items-center gap-1.5 bg-white/[0.04] rounded-lg px-2.5 py-2">
              <span className="text-sm">{icon}</span>
              <span className="text-white/60 text-[11px] font-body leading-tight">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Network badge ── */}
      <div className="flex items-center gap-2 mb-5">
        <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full px-3 py-1">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-amber-400 text-[11px] font-mono">Solana Devnet</span>
        </div>
        <span className="text-white/20 text-[11px] font-body">· Non-custodial · Instant settlement</span>
      </div>

      {/* ── Connect divider ── */}
      <div className="flex items-center gap-3 mb-5">
        <div className="flex-1 h-px bg-white/10" />
        <span className="text-white/30 text-xs font-body">Connect wallet to continue</span>
        <div className="flex-1 h-px bg-white/10" />
      </div>

      {/* ── Tab switcher ── */}
      <div className="flex bg-white/[0.05] rounded-xl p-1 mb-5">
        <button
          onClick={() => { setMode("wallet"); setEmailSent(false); }}
          className={`flex-1 text-sm font-body font-medium py-2 rounded-lg transition-all ${
            mode === "wallet" ? "bg-white/10 text-white" : "text-white/40 hover:text-white/60"
          }`}
        >
          I have a wallet
        </button>
        <button
          onClick={() => setMode("email")}
          className={`flex-1 text-sm font-body font-medium py-2 rounded-lg transition-all ${
            mode === "email" ? "bg-white/10 text-white" : "text-white/40 hover:text-white/60"
          }`}
        >
          Create with email
        </button>
      </div>

      {errorMsg && (
        <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-4 text-sm text-red-400 font-body">
          <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          </svg>
          {errorMsg}
        </div>
      )}

      {mode === "wallet" ? (
        <div className="flex flex-col gap-3">
          {hasWallet === null && (
            <div className="w-full h-14 rounded-2xl bg-white/[0.06] animate-pulse" />
          )}
          {hasWallet === true && (
            <button
              onClick={onConnect}
              disabled={connectStatus === "connecting"}
              className="w-full flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-base px-6 py-4 rounded-2xl transition-all hover:scale-[1.02]"
              style={{ background: "linear-gradient(135deg, #4C44C6, #9945FF)", boxShadow: "0 0 32px rgba(153,69,255,0.45)" }}
            >
              {connectStatus === "connecting" ? <><Spinner />Opening Phantom…</> : <><PhantomIcon />Connect Phantom Wallet</>}
            </button>
          )}
          {hasWallet === false && (
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-xl px-4 py-3 text-sm text-amber-400 font-body">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                </svg>
                Phantom not detected. Install it to continue.
              </div>
              <a
                href="https://phantom.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-3 text-white font-semibold text-base px-6 py-4 rounded-2xl transition-all hover:scale-[1.02]"
                style={{ background: "linear-gradient(135deg, #4C44C6, #9945FF)", boxShadow: "0 0 32px rgba(153,69,255,0.35)" }}
              >
                <PhantomIcon />Install Phantom Wallet →
              </a>
              <p className="text-center text-[#9CA3AF] text-xs font-body">After installing, refresh this page to connect.</p>
            </div>
          )}
        </div>
      ) : (
        <div>
          {emailSent ? (
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4" style={{ background: "linear-gradient(135deg, #10B981, #059669)" }}>
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="font-heading font-semibold text-white mb-2">Check your browser tab</p>
              <p className="text-[#9CA3AF] text-sm font-body mb-5 leading-relaxed">
                We opened <span className="text-[#9945FF]">phantom.app</span> for you. Create your wallet there, then come back and connect.
              </p>
              <button
                onClick={() => { setEmailSent(false); setMode("wallet"); setEmail(""); }}
                className="w-full bg-[#3B82F6] hover:bg-blue-400 text-white font-semibold px-6 py-3.5 rounded-2xl transition-all hover:scale-[1.02] text-sm"
              >
                I created my wallet — Connect now →
              </button>
            </div>
          ) : (
            <form onSubmit={handleEmailSubmit} className="flex flex-col gap-3">
              <p className="text-[#9CA3AF] text-sm font-body text-center mb-1">
                Enter your email and we&apos;ll help you create a free Solana wallet.
              </p>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full bg-white/[0.06] border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm font-body focus:outline-none focus:border-[#9945FF] focus:ring-1 focus:ring-[#9945FF] transition-colors"
              />
              <button
                type="submit"
                disabled={emailLoading || !email.trim()}
                className="w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm px-6 py-3.5 rounded-2xl transition-all hover:scale-[1.02]"
                style={{ background: "linear-gradient(135deg, #4C44C6, #9945FF)" }}
              >
                {emailLoading ? <><Spinner />Opening Phantom…</> : "Create Wallet with Email →"}
              </button>
            </form>
          )}
        </div>
      )}

      <p className="text-center text-[#6B7280] text-xs font-body mt-5">
        Questions?{" "}
        <a href="mailto:mariammanjavidze01@gmail.com" className="text-[#3B82F6] hover:underline">Email Mariam</a>
      </p>
    </div>
  );
}

function PaymentCard({
  walletAddress,
  payStatus,
  errorMsg,
  onPurchase,
  onDisconnect,
  currentStep,
  balance,
  balanceStatus,
}: {
  walletAddress: string;
  payStatus: "idle" | "paying";
  errorMsg: string;
  onPurchase: () => void;
  onDisconnect: () => void;
  currentStep: 1 | 2 | 3;
  balance: number | null;
  balanceStatus: "idle" | "loading" | "loaded" | "error";
}) {
  const insufficient = balanceStatus === "loaded" && balance !== null && balance < COURSE_PRICE_SOL;
  const estimatedRemaining =
    balanceStatus === "loaded" && balance !== null
      ? Math.max(0, balance - COURSE_PRICE_SOL - 0.000005)
      : null;

  const BalanceCell = ({ value }: { value: number | null }) => {
    if (balanceStatus === "idle" || balanceStatus === "loading") {
      return (
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-20 rounded bg-white/10 animate-pulse" />
        </div>
      );
    }
    if (balanceStatus === "error" || value === null) {
      return <span className="text-white/30 text-xs italic font-body">Unable to fetch</span>;
    }
    return (
      <span className={`font-mono font-semibold text-sm ${insufficient ? "text-red-400" : "text-[#14F195]"}`}>
        {value.toFixed(4)} SOL
      </span>
    );
  };

  return (
    <div className="glass-card rounded-3xl p-7 md:p-9">
      <StepIndicator current={currentStep} />

      {/* ── Title ── */}
      <div className="mb-5">
        <h2 className="font-heading font-bold text-white text-xl leading-tight mb-0.5">Transaction Review</h2>
        <p className="text-white/35 text-xs font-body">Review all details before authorizing payment on-chain</p>
      </div>

      {/* ── Sender → Recipient cards ── */}
      <div className="flex items-stretch gap-0 mb-4 rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
        {/* Sender card */}
        <div className="flex-1 px-4 py-4" style={{ background: "linear-gradient(135deg, rgba(153,69,255,0.08), rgba(153,69,255,0.03))" }}>
          <p className="text-white/30 text-[9px] font-mono uppercase tracking-widest mb-3">Paying From</p>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center" style={{ background: "linear-gradient(135deg, #4C44C6, #9945FF)" }}>
              <PhantomIcon />
            </div>
            <div>
              <p className="text-white/80 text-xs font-body font-medium leading-tight">Your Wallet</p>
              <p className="text-white/35 text-[10px] font-body">Phantom · Devnet</p>
            </div>
          </div>
          <p className="text-[#9945FF] text-[11px] font-mono mb-2">{shortenAddress(walletAddress)}</p>
          <div className="pt-2" style={{ borderTop: "1px solid rgba(153,69,255,0.12)" }}>
            <p className="text-white/30 text-[9px] font-mono uppercase tracking-wider mb-1">Available Balance</p>
            <BalanceCell value={balance} />
          </div>
        </div>

        {/* Transfer arrow */}
        <div className="flex flex-col items-center justify-center px-3 bg-white/[0.02]" style={{ borderLeft: "1px solid rgba(255,255,255,0.05)", borderRight: "1px solid rgba(255,255,255,0.05)" }}>
          <p className="text-white font-mono font-bold text-xs mb-2">{COURSE_PRICE_SOL} SOL</p>
          <div className="flex flex-col items-center gap-1">
            <div className="w-px h-4" style={{ background: "linear-gradient(to bottom, #9945FF, #3B82F6)" }} />
            <div className="w-px h-4" style={{ background: "linear-gradient(to bottom, #3B82F6, #14F195)" }} />
            <svg className="w-3.5 h-3.5 text-[#14F195]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        {/* Recipient card */}
        <div className="flex-1 px-4 py-4" style={{ background: "linear-gradient(135deg, rgba(20,241,149,0.06), rgba(20,241,149,0.02))" }}>
          <p className="text-white/30 text-[9px] font-mono uppercase tracking-widest mb-3">Paying To</p>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center text-base" style={{ background: "rgba(20,241,149,0.12)", border: "1px solid rgba(20,241,149,0.2)" }}>
              🎓
            </div>
            <div>
              <p className="text-white/80 text-xs font-body font-medium leading-tight">Vibe Coding</p>
              <p className="text-white/35 text-[10px] font-body">Treasury Wallet</p>
            </div>
          </div>
          <p className="text-[#14F195] text-[11px] font-mono mb-2">{shortenAddress(RECIPIENT_ADDRESS)}</p>
          <div className="pt-2" style={{ borderTop: "1px solid rgba(20,241,149,0.12)" }}>
            <p className="text-white/30 text-[9px] font-mono uppercase tracking-wider mb-1">You receive</p>
            <p className="text-white/60 text-[10px] font-body">Full 7-Week Program</p>
          </div>
        </div>
      </div>

      {/* ── Full transaction breakdown table ── */}
      <div className="rounded-2xl overflow-hidden mb-5" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="bg-white/[0.03] px-4 py-2.5" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <p className="text-white/35 text-[10px] font-mono uppercase tracking-widest">Transaction Details</p>
        </div>
        <div className="divide-y divide-white/[0.05]">

          {/* Transaction type */}
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-white/40 text-xs font-body">Transaction Type</span>
            <div className="flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono" style={{ background: "rgba(59,130,246,0.12)", border: "1px solid rgba(59,130,246,0.25)", color: "#93C5FD" }}>
                Course Enrollment
              </span>
            </div>
          </div>

          {/* Network */}
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-white/40 text-xs font-body">Network</span>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-amber-400 text-xs font-mono">Solana Devnet</span>
            </div>
          </div>

          {/* Amount to pay */}
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-white/40 text-xs font-body">Amount to Pay</span>
            <span className="font-mono font-bold text-white text-sm">{COURSE_PRICE_SOL} SOL</span>
          </div>

          {/* Available balance */}
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-white/40 text-xs font-body">Available Balance</span>
            <BalanceCell value={balance} />
          </div>

          {/* Paying from */}
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-white/40 text-xs font-body">Paying From</span>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg, #4C44C6, #9945FF)" }}>
                <PhantomIcon />
              </div>
              <span className="text-[#9945FF] text-xs font-mono">{shortenAddress(walletAddress)}</span>
            </div>
          </div>

          {/* Paying to */}
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-white/40 text-xs font-body">Paying To</span>
            <div className="flex items-center gap-2">
              <span className="text-sm">🎓</span>
              <span className="text-[#14F195] text-xs font-mono">{shortenAddress(RECIPIENT_ADDRESS)}</span>
              <span className="text-white/25 text-[10px] font-body">Vibe Coding</span>
            </div>
          </div>

          {/* Estimated remaining */}
          <div className="flex items-center justify-between px-4 py-3" style={{ background: "rgba(255,255,255,0.015)" }}>
            <span className="text-white/40 text-xs font-body">Est. Remaining Balance</span>
            {estimatedRemaining !== null ? (
              <span className="font-mono text-sm text-white/70">
                {estimatedRemaining.toFixed(4)} SOL
              </span>
            ) : (
              <div className="h-3 w-20 rounded bg-white/10 animate-pulse" />
            )}
          </div>

        </div>
      </div>

      {/* ── You unlock ── */}
      <div className="bg-white/[0.025] border border-white/[0.05] rounded-2xl p-4 mb-5">
        <p className="text-white/30 text-[10px] font-mono uppercase tracking-widest mb-3">You unlock after payment</p>
        <div className="grid grid-cols-3 gap-2">
          {[
            { icon: "🎓", label: "7 Lectures" },
            { icon: "🚀", label: "Ship a Product" },
            { icon: "♾️", label: "Lifetime Access" },
          ].map(({ icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-1.5 px-2 py-3 rounded-xl text-center" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
              <span className="text-lg">{icon}</span>
              <span className="text-white/50 text-[10px] font-body leading-tight">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Connected wallet row ── */}
      <div className="flex items-center justify-between bg-white/[0.03] border border-white/[0.07] rounded-xl px-4 py-2.5 mb-5">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
          <span className="text-white/40 text-xs font-body">Connected</span>
          <span className="text-white/80 text-xs font-mono">{shortenAddress(walletAddress)}</span>
        </div>
        <button onClick={onDisconnect} className="text-[11px] text-white/25 hover:text-white/60 transition-colors underline underline-offset-2">
          Disconnect
        </button>
      </div>

      {/* ── Insufficient balance warning ── */}
      {insufficient && (
        <div className="flex items-start gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-4 text-sm text-red-400 font-body">
          <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          </svg>
          Insufficient balance — you need at least {COURSE_PRICE_SOL} SOL. Get devnet SOL from{" "}
          <a href="https://faucet.solana.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-red-300">faucet.solana.com</a>.
        </div>
      )}

      {/* ── Error ── */}
      {errorMsg && (
        <div className="flex items-start gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-4 text-sm text-red-400 font-body">
          <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          </svg>
          {errorMsg}
        </div>
      )}

      {/* ── Sign & Authorize button ── */}
      <button
        onClick={onPurchase}
        disabled={payStatus === "paying"}
        className="w-full flex items-center justify-center gap-3 text-white font-heading font-bold text-base px-6 py-4 rounded-2xl transition-all hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed"
        style={{
          background: "linear-gradient(135deg, #9945FF 0%, #3B82F6 55%, #14F195 100%)",
          boxShadow: payStatus === "paying" ? "none" : "0 0 32px rgba(153,69,255,0.4), 0 0 64px rgba(20,241,149,0.1)",
        }}
      >
        {payStatus === "paying" ? (
          <>
            <Spinner />
            Broadcasting to Solana…
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Sign &amp; Authorize Payment · {COURSE_PRICE_SOL} SOL
          </>
        )}
      </button>

      {/* ── Trust strip ── */}
      <div className="flex items-center justify-center gap-3 mt-4 text-white/20 text-[10px] font-body">
        <span>Non-custodial</span>
        <span className="w-px h-3 bg-white/10" />
        <span>We never hold your keys</span>
        <span className="w-px h-3 bg-white/10" />
        <span>Instant settlement</span>
      </div>
    </div>
  );
}

function SuccessCard({ txSignature }: { txSignature: string | null }) {
  return (
    <div className="glass-card rounded-3xl p-7 md:p-9">
      <StepIndicator current={3} />

      {/* ── Access unlocked hero ── */}
      <div className="text-center mb-7">
        <div
          className="relative inline-flex items-center justify-center w-20 h-20 rounded-full mb-5"
          style={{ background: "linear-gradient(135deg, #10B981, #059669)", boxShadow: "0 0 40px rgba(16,185,129,0.35)" }}
        >
          <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
          </svg>
        </div>
        <h2 className="font-heading font-bold text-3xl mb-2">Access Unlocked</h2>
        <p className="text-white/50 font-body text-sm leading-relaxed">
          Payment confirmed on-chain. Welcome to Vibe Coding.
        </p>
      </div>

      {/* ── What you now have ── */}
      <div className="rounded-2xl overflow-hidden mb-5" style={{ border: "1px solid rgba(16,185,129,0.2)" }}>
        <div className="bg-[#10B98108] px-4 py-2.5 border-b border-[#10B98115]">
          <p className="text-[#10B981]/60 text-[10px] font-mono uppercase tracking-widest">Your access includes</p>
        </div>
        <div className="divide-y divide-[#10B98110]">
          {[
            { icon: "🎓", title: "7 Hands-On Lectures", desc: "Build real features every week, guided by Mariam" },
            { icon: "🚀", title: "Ship a Real Product", desc: "Launch something you designed and built yourself" },
            { icon: "♾️", title: "Lifetime Access", desc: "Revisit all materials any time, forever" },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="flex items-start gap-3 px-4 py-3.5">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-base flex-shrink-0 mt-0.5"
                style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }}
              >
                {icon}
              </div>
              <div>
                <p className="text-white text-sm font-semibold leading-tight">{title}</p>
                <p className="text-white/40 text-xs font-body mt-0.5 leading-relaxed">{desc}</p>
              </div>
              <svg className="w-4 h-4 text-[#10B981] flex-shrink-0 mt-1 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          ))}
        </div>
      </div>

      {/* ── Transaction proof ── */}
      {txSignature && (
        <div className="bg-white/[0.025] border border-white/[0.07] rounded-2xl px-4 py-3.5 mb-5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-white/30 text-[10px] font-mono uppercase tracking-widest">Payment Proof</p>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span className="text-amber-400/70 text-[10px] font-mono">Solana Devnet</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#6B7280] text-[11px] font-mono">{txSignature.slice(0, 16)}…{txSignature.slice(-8)}</span>
            <a
              href={`${SOLSCAN_BASE}${txSignature}?cluster=devnet`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#3B82F6] hover:text-blue-400 transition-colors"
            >
              <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              View on Solscan
            </a>
          </div>
        </div>
      )}

      {/* ── Next step note ── */}
      <div className="flex items-start gap-2.5 bg-[#3B82F608] border border-[#3B82F620] rounded-xl px-4 py-3 mb-5">
        <svg className="w-4 h-4 text-[#3B82F6] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        <p className="text-white/50 text-xs font-body leading-relaxed">
          Check your email for onboarding details and your first lecture link from Mariam.
        </p>
      </div>

      {/* ── CTA ── */}
      <Link
        href="/"
        className="block w-full text-center font-semibold text-white px-6 py-3.5 rounded-2xl transition-all hover:scale-[1.02]"
        style={{ background: "linear-gradient(135deg, #9945FF, #3B82F6)" }}
      >
        Back to Home
      </Link>
    </div>
  );
}

function Spinner() {
  return (
    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}

function PhantomIcon({ large }: { large?: boolean }) {
  const size = large ? "w-7 h-7" : "w-5 h-5";
  return (
    <svg className={size} viewBox="0 0 128 128" fill="none">
      <rect width="128" height="128" rx="32" fill="url(#ph-icon)" />
      <defs>
        <linearGradient id="ph-icon" x1="0" y1="0" x2="128" y2="128" gradientUnits="userSpaceOnUse">
          <stop stopColor="#534BB1" />
          <stop offset="1" stopColor="#551BF9" />
        </linearGradient>
      </defs>
      <path
        d="M110.4 64.8C110.4 40.5 90.6 21 66 21c-25.5 0-45 20.7-45 45.3 0 8.9 2.5 17.2 6.9 24.2 1.1 1.8 3.2 2.7 5.3 2.3l4.8-1c2.5-.5 4.2-2.9 3.7-5.4-.1-.6-.2-1.1-.2-1.7 0-6.2 5-11.2 11.2-11.2 6.2 0 11.2 5 11.2 11.2 0 .8-.1 1.5-.2 2.3-.4 2.4 1.1 4.7 3.5 5.3l5.2 1.3c.7.2 1.4.2 2.1 0 6.5-1.9 12.1-5.8 16.1-11C104.8 78.4 110.4 72 110.4 64.8z"
        fill="white"
        fillOpacity="0.9"
      />
      <circle cx="53" cy="62" r="5" fill="#534BB1" />
      <circle cx="75" cy="62" r="5" fill="#534BB1" />
    </svg>
  );
}
