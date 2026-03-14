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

const COURSE_PRICE_SOL = 0.5;
// TODO: Replace with your actual Solana wallet address to receive payments
const RECIPIENT_ADDRESS = "So1endDq2YkqhipRh3WViPa8hdiSpxWy6z3Z6tMCpAo";
const SOLANA_RPC = "https://api.mainnet-beta.solana.com";

type Step = "account" | "wallet" | "payment" | "success";

interface SolanaProvider {
  isPhantom?: boolean;
  connect: (opts?: { onlyIfTrusted?: boolean }) => Promise<{ publicKey: { toString: () => string } }>;
  disconnect: () => Promise<void>;
  publicKey?: { toString: () => string } | null;
  signAndSendTransaction: (tx: Transaction) => Promise<{ signature: string }>;
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
  const [step, setStep] = useState<Step>("account");
  const [userEmail, setUserEmail] = useState("");
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [txSignature, setTxSignature] = useState<string | null>(null);
  const [connectStatus, setConnectStatus] = useState<"idle" | "connecting">("idle");
  const [payStatus, setPayStatus] = useState<"idle" | "paying">("idle");
  const [hasWallet, setHasWallet] = useState<boolean | null>(null);
  const [connectError, setConnectError] = useState("");
  const [payError, setPayError] = useState("");

  useEffect(() => {
    setHasWallet(!!getProvider());
  }, []);

  const handleAccountSignIn = useCallback((email: string) => {
    setUserEmail(email);
    setStep("wallet");
  }, []);

  const connectWallet = useCallback(async () => {
    const provider = getProvider();
    if (!provider) {
      window.open("https://phantom.app/", "_blank");
      return;
    }
    try {
      setConnectStatus("connecting");
      setConnectError("");
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
    setStep("wallet");
    setPayError("");
    setConnectError("");
  }, []);

  const purchaseCourse = useCallback(async () => {
    const provider = getProvider();
    if (!provider || !walletAddress) return;
    try {
      setPayStatus("paying");
      setPayError("");

      const connection = new Connection(SOLANA_RPC, "confirmed");
      const fromPubkey = new PublicKey(walletAddress);
      const toPubkey = new PublicKey(RECIPIENT_ADDRESS);
      const lamports = Math.round(COURSE_PRICE_SOL * LAMPORTS_PER_SOL);
      const { blockhash } = await connection.getLatestBlockhash();

      const transaction = new Transaction({
        recentBlockhash: blockhash,
        feePayer: fromPubkey,
      }).add(SystemProgram.transfer({ fromPubkey, toPubkey, lamports }));

      const { signature } = await provider.signAndSendTransaction(transaction);
      setTxSignature(signature);
      setPayStatus("idle");
      setStep("success");
    } catch (err: unknown) {
      setPayStatus("idle");
      const msg = err instanceof Error ? err.message : "Transaction failed.";
      if (msg.toLowerCase().includes("reject") || msg.toLowerCase().includes("cancel") || msg.toLowerCase().includes("user")) {
        setPayError("Transaction was cancelled.");
      } else {
        setPayError(msg);
      }
    }
  }, [walletAddress]);

  const stepNumber: Record<Step, 1 | 2 | 3 | 4> = {
    account: 1,
    wallet: 2,
    payment: 3,
    success: 4,
  };

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

        <div className="relative z-10 w-full max-w-md">
          {step === "account" && (
            <AccountCard onSignIn={handleAccountSignIn} />
          )}
          {step === "wallet" && (
            <WalletCard
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
              userEmail={userEmail}
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

function StepIndicator({ current }: { current: 1 | 2 | 3 | 4 }) {
  const steps = [
    { n: 1, label: "Sign In" },
    { n: 2, label: "Wallet" },
    { n: 3, label: "Payment" },
    { n: 4, label: "Done" },
  ];
  return (
    <div className="flex items-center justify-center gap-1.5 mb-8">
      {steps.map((s, i) => {
        const done = s.n < current;
        const active = s.n === current;
        return (
          <div key={s.n} className="flex items-center gap-1.5">
            <div className="flex flex-col items-center gap-1">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  done
                    ? "bg-[#10B981] text-white"
                    : active
                    ? "text-white"
                    : "bg-white/10 text-white/40"
                }`}
                style={active ? { background: "linear-gradient(135deg, #3B82F6, #8B5CF6)" } : undefined}
              >
                {done ? (
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  s.n
                )}
              </div>
              <span className={`text-[10px] font-body whitespace-nowrap ${active ? "text-white/80" : done ? "text-[#10B981]" : "text-white/30"}`}>
                {s.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`w-8 h-px mb-4 ${s.n < current ? "bg-[#10B981]" : "bg-white/10"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function AccountCard({ onSignIn }: { onSignIn: (email: string) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email.trim()) { setError("Please enter your email."); return; }
    if (!password.trim()) { setError("Please enter your password."); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    onSignIn(email.trim());
  };

  return (
    <div className="glass-card rounded-3xl p-8 md:p-10">
      <StepIndicator current={1} />

      <div className="text-center mb-8">
        <div
          className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-5"
          style={{ background: "linear-gradient(135deg, #3B82F6, #8B5CF6)" }}
        >
          <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <h1 className="font-heading font-bold text-3xl mb-2">Sign in</h1>
        <p className="text-[#9CA3AF] font-body text-sm">
          Sign in to your VibeCoding account to continue
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-body text-white/70 mb-1.5">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            className="w-full bg-white/[0.06] border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm font-body focus:outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-body text-white/70 mb-1.5">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              className="w-full bg-white/[0.06] border border-white/15 rounded-xl px-4 py-3 pr-11 text-white placeholder-white/30 text-sm font-body focus:outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
            >
              {showPassword ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-sm text-red-400 font-body">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            </svg>
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-[#3B82F6] hover:bg-blue-400 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-base px-6 py-4 rounded-2xl transition-all hover:scale-[1.02] mt-1"
          style={{ boxShadow: "0 0 32px rgba(59,130,246,0.35)" }}
        >
          {loading ? (
            <>
              <Spinner />
              Signing in…
            </>
          ) : (
            "Sign In →"
          )}
        </button>
      </form>

      <p className="text-center text-[#9CA3AF] text-xs font-body mt-5">
        Questions?{" "}
        <a href="mailto:mariammanjavidze01@gmail.com" className="text-[#3B82F6] hover:underline">
          Email Mariam
        </a>
      </p>
    </div>
  );
}

function WalletCard({
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
  currentStep: 1 | 2 | 3 | 4;
}) {
  return (
    <div className="glass-card rounded-3xl p-8 md:p-10">
      <StepIndicator current={currentStep} />

      <div className="text-center mb-8">
        <div
          className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-5"
          style={{ background: "linear-gradient(135deg, #3B82F6, #8B5CF6)" }}
        >
          <SolanaIcon />
        </div>
        <h1 className="font-heading font-bold text-3xl mb-2">Connect your wallet</h1>
        <p className="text-[#9CA3AF] font-body text-sm leading-relaxed">
          Sign in with your Solana wallet to continue.<br />
          Works with Phantom, Backpack &amp; more.
        </p>
      </div>

      {errorMsg && (
        <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-5 text-sm text-red-400 font-body">
          <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          </svg>
          {errorMsg}
        </div>
      )}

      <button
        onClick={onConnect}
        disabled={connectStatus === "connecting"}
        className="w-full flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-base px-6 py-4 rounded-2xl transition-all hover:scale-[1.02]"
        style={{ background: "linear-gradient(135deg, #4C44C6, #9945FF)", boxShadow: "0 0 32px rgba(153,69,255,0.4)" }}
      >
        {connectStatus === "connecting" ? (
          <>
            <Spinner />
            Connecting to Phantom…
          </>
        ) : (
          <>
            <PhantomIcon />
            Connect Phantom Wallet
          </>
        )}
      </button>

      {hasWallet === false && (
        <p className="text-center text-[#9CA3AF] text-xs font-body mt-3">
          Don&apos;t have Phantom?{" "}
          <a href="https://phantom.app" target="_blank" rel="noopener noreferrer" className="text-[#9945FF] hover:underline">
            Install it here →
          </a>
        </p>
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
  userEmail,
  payStatus,
  errorMsg,
  onPurchase,
  onDisconnect,
  currentStep,
}: {
  walletAddress: string;
  userEmail: string;
  payStatus: "idle" | "paying";
  errorMsg: string;
  onPurchase: () => void;
  onDisconnect: () => void;
  currentStep: 1 | 2 | 3 | 4;
}) {
  return (
    <div className="glass-card rounded-3xl p-8 md:p-10">
      <StepIndicator current={currentStep} />

      <div className="flex flex-col gap-2 mb-6">
        {userEmail && (
          <div className="flex items-center gap-2.5 bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5">
            <svg className="w-3.5 h-3.5 text-[#10B981] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-xs font-body text-white/60">Signed in as</span>
            <span className="text-xs font-body text-white/90 truncate">{userEmail}</span>
          </div>
        )}
        <div className="flex items-center justify-between bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5">
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <span className="text-xs font-body text-white/60">Wallet</span>
            <span className="text-xs font-mono text-white/90">{shortenAddress(walletAddress)}</span>
          </div>
          <button
            onClick={onDisconnect}
            className="text-xs text-[#9CA3AF] hover:text-white transition-colors underline underline-offset-2"
          >
            Change
          </button>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="font-heading font-bold text-2xl mb-1">Complete your purchase</h2>
        <p className="text-[#9CA3AF] font-body text-sm">One-time payment — lifetime access</p>
      </div>

      <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[#9CA3AF] font-body text-sm">Vibe Coding — Full Program</span>
          <span className="text-xs bg-[#3B82F6]/20 text-[#3B82F6] border border-[#3B82F6]/30 px-2 py-0.5 rounded-full font-body">
            1 seat
          </span>
        </div>
        <div className="flex items-end gap-2 mb-4">
          <span className="font-heading font-bold text-4xl">{COURSE_PRICE_SOL} SOL</span>
          <span className="text-[#9CA3AF] font-body text-sm mb-1">one-time</span>
        </div>
        <div className="border-t border-white/10 pt-3 flex flex-col gap-1.5">
          {["7 hands-on lectures", "Real product you ship", "Lifetime access"].map((f) => (
            <div key={f} className="flex items-center gap-2 text-sm text-[#9CA3AF] font-body">
              <svg className="w-4 h-4 text-[#10B981] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              {f}
            </div>
          ))}
        </div>
      </div>

      {errorMsg && (
        <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-4 text-sm text-red-400 font-body">
          <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          </svg>
          {errorMsg}
        </div>
      )}

      <button
        onClick={onPurchase}
        disabled={payStatus === "paying"}
        className="w-full flex items-center justify-center gap-3 text-white font-semibold text-base px-6 py-4 rounded-2xl transition-all hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed animated-gradient-bg"
        style={{ boxShadow: "0 0 32px rgba(59,130,246,0.35)" }}
      >
        {payStatus === "paying" ? (
          <>
            <Spinner />
            Confirming payment…
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Pay {COURSE_PRICE_SOL} SOL — Enroll Now
          </>
        )}
      </button>

      <p className="text-center text-[#9CA3AF] text-xs font-body mt-5">
        Transaction is signed by your wallet — we never hold your keys
      </p>
    </div>
  );
}

function SuccessCard({ txSignature }: { txSignature: string | null }) {
  return (
    <div className="glass-card rounded-3xl p-8 md:p-10 text-center">
      <StepIndicator current={4} />

      <div
        className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6"
        style={{ background: "linear-gradient(135deg, #10B981, #059669)" }}
      >
        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 className="font-heading font-bold text-3xl mb-3">You&apos;re enrolled!</h2>
      <p className="text-[#9CA3AF] font-body mb-6 leading-relaxed">
        Payment confirmed on-chain. Welcome to Vibe Coding —<br />check your email for next steps.
      </p>
      {txSignature && (
        <a
          href={`https://solscan.io/tx/${txSignature}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs text-[#3B82F6] hover:underline font-mono mb-8"
        >
          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          {txSignature.slice(0, 16)}…{txSignature.slice(-8)}
        </a>
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

function SolanaIcon() {
  return (
    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4.06 17.12a.74.74 0 0 1 .52-.21h16.24a.37.37 0 0 1 .26.63l-2.77 2.77a.74.74 0 0 1-.52.21H1.55a.37.37 0 0 1-.26-.63l2.77-2.77zm0-13.01a.74.74 0 0 1 .52-.21h16.24a.37.37 0 0 1 .26.63L18.31 7.3a.74.74 0 0 1-.52.21H1.55a.37.37 0 0 1-.26-.63l2.77-2.77zm16.24 6.5a.74.74 0 0 0-.52-.21H3.54a.37.37 0 0 0-.26.63l2.77 2.77a.74.74 0 0 0 .52.21h16.24a.37.37 0 0 0 .26-.63l-2.77-2.77z" />
    </svg>
  );
}

function PhantomIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 128 128" fill="none">
      <rect width="128" height="128" rx="32" fill="url(#ph-grad)" />
      <defs>
        <linearGradient id="ph-grad" x1="0" y1="0" x2="128" y2="128" gradientUnits="userSpaceOnUse">
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
