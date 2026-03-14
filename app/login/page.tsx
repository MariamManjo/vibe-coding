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
const SOLSCAN_BASE = "https://solscan.io/tx/?cluster=devnet";

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

  useEffect(() => {
    // Only detect whether the extension exists — do NOT auto-advance
    setHasWallet(!!getProvider());
  }, []);

  const connectWallet = useCallback(async () => {
    const provider = getProvider();
    if (!provider) return;
    try {
      setConnectStatus("connecting");
      setConnectError("");
      // Always prompt the Phantom popup by explicitly calling connect()
      const resp = await provider.connect();
      setWalletAddress(resp.publicKey.toString());
      setConnectStatus("idle");
      setStep("payment");
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

      setTxSignature(txSig);
      setPayStatus("idle");
      setStep("success");
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

        <div className="relative z-10 w-full max-w-lg">
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
    { n: 1, label: "Sign In" },
    { n: 2, label: "Payment" },
    { n: 3, label: "Done" },
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
                style={active ? { background: "linear-gradient(135deg, #3B82F6, #8B5CF6)" } : undefined}
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
    // Open Phantom's email wallet creation in a new tab
    window.open("https://phantom.app/", "_blank");
  };

  return (
    <div className="glass-card rounded-3xl p-8 md:p-10">
      <StepIndicator current={currentStep} />

      <div className="text-center mb-7">
        <div
          className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-5"
          style={{ background: "linear-gradient(135deg, #4C44C6, #9945FF)" }}
        >
          <PhantomIcon large />
        </div>
        <h1 className="font-heading font-bold text-3xl mb-2">Sign in with Solana</h1>
        <p className="text-[#9CA3AF] font-body text-sm leading-relaxed">
          Use your Phantom wallet to sign in securely.
        </p>
      </div>

      {/* Tab switcher */}
      <div className="flex bg-white/[0.05] rounded-xl p-1 mb-6">
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
        <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-5 text-sm text-red-400 font-body">
          <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          </svg>
          {errorMsg}
        </div>
      )}

      {mode === "wallet" ? (
        <div className="flex flex-col gap-3">
          {/* Still detecting — skeleton button so nothing flashes incorrectly */}
          {hasWallet === null && (
            <div className="w-full h-14 rounded-2xl bg-white/[0.06] animate-pulse" />
          )}

          {/* Phantom IS installed — real connection */}
          {hasWallet === true && (
            <button
              onClick={onConnect}
              disabled={connectStatus === "connecting"}
              className="w-full flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-base px-6 py-4 rounded-2xl transition-all hover:scale-[1.02]"
              style={{ background: "linear-gradient(135deg, #4C44C6, #9945FF)", boxShadow: "0 0 32px rgba(153,69,255,0.45)" }}
            >
              {connectStatus === "connecting" ? (
                <>
                  <Spinner />
                  Opening Phantom…
                </>
              ) : (
                <>
                  <PhantomIcon />
                  Connect Phantom Wallet
                </>
              )}
            </button>
          )}

          {/* Phantom NOT installed — install only, no fake connect button */}
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
                <PhantomIcon />
                Install Phantom Wallet →
              </a>
              <p className="text-center text-[#9CA3AF] text-xs font-body">
                After installing, refresh this page to connect.
              </p>
            </div>
          )}
        </div>
      ) : (
        <div>
          {emailSent ? (
            <div className="text-center">
              <div
                className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4"
                style={{ background: "linear-gradient(135deg, #10B981, #059669)" }}
              >
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="font-heading font-semibold text-white mb-2">Check your browser tab</p>
              <p className="text-[#9CA3AF] text-sm font-body mb-5 leading-relaxed">
                We opened <span className="text-[#9945FF]">phantom.app</span> for you.
                Create your wallet there using your email <span className="text-white">{email}</span>, then come back and connect.
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
                {emailLoading ? (
                  <>
                    <Spinner />
                    Opening Phantom…
                  </>
                ) : (
                  "Create Wallet with Email →"
                )}
              </button>
            </form>
          )}
        </div>
      )}

      <div className="flex items-center gap-3 mt-6">
        <div className="flex-1 h-px bg-white/10" />
        <span className="text-white/30 text-xs font-body">secure &amp; non-custodial</span>
        <div className="flex-1 h-px bg-white/10" />
      </div>

      <p className="text-center text-[#9CA3AF] text-xs font-body mt-4">
        Questions?{" "}
        <a href="mailto:mariammanjavidze01@gmail.com" className="text-[#3B82F6] hover:underline">
          Email Mariam
        </a>
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
}: {
  walletAddress: string;
  payStatus: "idle" | "paying";
  errorMsg: string;
  onPurchase: () => void;
  onDisconnect: () => void;
  currentStep: 1 | 2 | 3;
}) {
  return (
    <div className="glass-card rounded-3xl p-7 md:p-9">
      <StepIndicator current={currentStep} />

      {/* ── Signed-in row ── */}
      <div className="flex items-center justify-between bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 mb-6">
        <div className="flex items-center gap-2.5">
          <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
          <span className="text-sm font-body text-white/55">Signed in</span>
          <span className="text-sm font-mono text-white/90">{shortenAddress(walletAddress)}</span>
        </div>
        <button onClick={onDisconnect}
          className="text-xs text-white/30 hover:text-white transition-colors underline underline-offset-2">
          Sign out
        </button>
      </div>

      {/* ── Product header ── */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <p className="text-white/35 text-[11px] font-mono uppercase tracking-widest mb-1">Order Summary</p>
          <h2 className="font-heading font-bold text-xl leading-tight text-white">
            Vibe Coding — Full 7-Week Program
          </h2>
        </div>
        <div className="text-right ml-4 flex-shrink-0">
          <p className="font-heading font-bold text-3xl text-white leading-none">{COURSE_PRICE_SOL} SOL</p>
          <p className="text-white/30 text-[11px] font-body mt-0.5">one-time · lifetime access</p>
        </div>
      </div>

      {/* ── What you get ── */}
      <div className="bg-white/[0.035] border border-white/[0.07] rounded-2xl p-4 mb-5">
        <p className="text-white/30 text-[10px] font-mono uppercase tracking-widest mb-3">What&apos;s included</p>
        <div className="grid grid-cols-1 gap-2">
          {[
            { icon: "🎓", text: "7 hands-on lectures" },
            { icon: "🚀", text: "Real product you ship" },
            { icon: "♾️", text: "Lifetime access" },
          ].map(({ icon, text }) => (
            <div key={text} className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
                style={{ background: "rgba(20,241,149,0.1)", border: "1px solid rgba(20,241,149,0.2)" }}>
                {icon}
              </div>
              <span className="text-white/70 text-sm font-body">{text}</span>
              <svg className="w-4 h-4 text-[#14F195] flex-shrink-0 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          ))}
        </div>
      </div>

      {/* ── Transaction flow ── */}
      <div className="bg-white/[0.025] border border-white/[0.06] rounded-2xl p-4 mb-5">
        <p className="text-white/30 text-[10px] font-mono uppercase tracking-widest mb-3">Transaction Preview</p>
        <div className="flex items-center gap-3">
          {/* From */}
          <div className="flex-1 bg-black/30 border border-white/[0.08] rounded-xl p-3 min-w-0">
            <p className="text-white/30 text-[9px] font-mono uppercase tracking-widest mb-1.5">From</p>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-6 rounded-lg flex-shrink-0 flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #4C44C6, #9945FF)" }}>
                <PhantomIcon />
              </div>
              <span className="text-white/60 text-xs font-body truncate">Your Wallet</span>
            </div>
            <p className="text-[#9945FF] text-[10px] font-mono truncate">{shortenAddress(walletAddress)}</p>
          </div>

          {/* Arrow + amount */}
          <div className="flex flex-col items-center gap-1 flex-shrink-0">
            <span className="text-white/50 text-[10px] font-mono font-bold">{COURSE_PRICE_SOL} SOL</span>
            <div className="flex items-center gap-0.5">
              <div className="w-4 h-px bg-gradient-to-r from-[#9945FF] to-[#14F195]" />
              <svg className="w-3 h-3 text-[#14F195]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
              </svg>
            </div>
            <span className="text-white/20 text-[8px] font-mono">devnet</span>
          </div>

          {/* To */}
          <div className="flex-1 bg-black/30 border border-[#14F195]/15 rounded-xl p-3 min-w-0">
            <p className="text-white/30 text-[9px] font-mono uppercase tracking-widest mb-1.5">To</p>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-6 rounded-lg flex-shrink-0 flex items-center justify-center text-sm"
                style={{ background: "linear-gradient(135deg, #9945FF22, #14F19522)", border: "1px solid #14F19530" }}>
                🎓
              </div>
              <span className="text-white/60 text-xs font-body truncate">Vibe Coding</span>
            </div>
            <p className="text-[#14F195] text-[10px] font-mono truncate">{shortenAddress(RECIPIENT_ADDRESS)}</p>
          </div>
        </div>

        {/* Network strip */}
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/[0.05]">
          <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-amber-400/70 text-[10px] font-mono uppercase tracking-widest">Solana Devnet</span>
          <span className="text-white/20 text-[10px] font-body ml-auto">Switch Phantom → Devnet before paying</span>
        </div>
      </div>

      {/* ── Error ── */}
      {errorMsg && (
        <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-4 text-sm text-red-400 font-body">
          <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          </svg>
          {errorMsg}
        </div>
      )}

      {/* ── Pay button ── */}
      <button
        onClick={onPurchase}
        disabled={payStatus === "paying"}
        className="w-full flex items-center justify-center gap-3 text-white font-heading font-bold text-base px-6 py-4 rounded-2xl transition-all hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed"
        style={{
          background: "linear-gradient(135deg, #9945FF 0%, #3B82F6 55%, #14F195 100%)",
          boxShadow: payStatus === "paying"
            ? "none"
            : "0 0 28px rgba(153,69,255,0.4), 0 0 56px rgba(20,241,149,0.12)",
        }}
      >
        {payStatus === "paying" ? (
          <>
            <Spinner />
            Confirming on-chain…
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Pay {COURSE_PRICE_SOL} SOL — Enroll Now
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </>
        )}
      </button>

      {/* ── Trust footer ── */}
      <div className="flex items-center justify-center gap-4 mt-4">
        <div className="flex items-center gap-1.5 text-white/25 text-[10px] font-body">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          Non-custodial
        </div>
        <div className="w-px h-3 bg-white/10" />
        <div className="flex items-center gap-1.5 text-white/25 text-[10px] font-body">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
          </svg>
          We never hold your keys
        </div>
        <div className="w-px h-3 bg-white/10" />
        <div className="flex items-center gap-1.5 text-white/25 text-[10px] font-body">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Instant on-chain confirmation
        </div>
      </div>
    </div>
  );
}

function SuccessCard({ txSignature }: { txSignature: string | null }) {
  return (
    <div className="glass-card rounded-3xl p-8 md:p-10 text-center">
      <StepIndicator current={3} />
      <div
        className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6"
        style={{ background: "linear-gradient(135deg, #10B981, #059669)" }}
      >
        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 className="font-heading font-bold text-3xl mb-3">You&apos;re enrolled!</h2>
      <p className="text-[#9CA3AF] font-body mb-4 leading-relaxed">
        Payment confirmed on-chain. Welcome to Vibe Coding —<br />check your email for next steps.
      </p>
      <span className="inline-flex items-center gap-1.5 text-xs font-body px-3 py-1 rounded-full border mb-6 bg-amber-500/20 text-amber-400 border-amber-500/30">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
        {NETWORK}
      </span>
      {txSignature && (
        <div className="block mb-8">
          <a
            href={`${SOLSCAN_BASE}${txSignature}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs text-[#3B82F6] hover:underline font-mono"
          >
            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            {txSignature.slice(0, 16)}…{txSignature.slice(-8)}
          </a>
        </div>
      )}
      <Link
        href="/"
        className="block w-full bg-[#3B82F6] hover:bg-blue-400 text-white font-semibold px-6 py-4 rounded-2xl transition-all hover:scale-[1.02] text-center"
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
