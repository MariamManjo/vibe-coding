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
  sendTransaction: (
    tx: Transaction,
    connection: Connection,
    opts?: { skipPreflight?: boolean; preflightCommitment?: string }
  ) => Promise<string>;
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

/** Extract a human-readable message from any thrown value, including
 *  Phantom's non-standard error objects that have non-enumerable properties. */
function extractError(err: unknown): string {
  if (!err) return "Unknown error (empty throw)";
  if (typeof err === "string") return err;
  if (err instanceof Error) return err.message;
  if (typeof err === "object") {
    // Phantom errors have non-enumerable .message and .code
    const e = err as Record<string, unknown>;
    const msg  = typeof e["message"] === "string" ? e["message"] : null;
    const code = e["code"] !== undefined ? String(e["code"]) : null;
    if (msg) return code ? `${msg} (code ${code})` : msg;
    // Try serialising all own property names (catches non-enumerable ones)
    try {
      const full = JSON.stringify(err, Object.getOwnPropertyNames(err));
      if (full && full !== "{}") return full;
    } catch { /* ignore */ }
    // Try toString as last resort
    const s = String(err);
    if (s !== "[object Object]") return s;
  }
  return "Unexpected error — check console for details";
}

/** Returns true if the error represents a deliberate user cancellation. */
function isUserRejection(err: unknown): boolean {
  if (!err || typeof err !== "object") return false;
  const e = err as Record<string, unknown>;
  const code = Number(e["code"]);
  const msg  = String(e["message"] ?? "").toLowerCase();
  return (
    code === 4001 ||
    msg.includes("reject") ||
    msg.includes("cancel") ||
    msg.includes("denied") ||
    msg.includes("dismiss") ||
    msg.includes("user rejected")
  );
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

    let txSig: string | null = null;

    try {
      setPayStatus("paying");
      setPayError("");

      // ── Pre-flight validation ───────────────────────────────────────────────
      const fromPubkey = new PublicKey(walletAddress);
      const toPubkey   = new PublicKey(RECIPIENT_ADDRESS);
      const lamports   = Math.round(COURSE_PRICE_SOL * LAMPORTS_PER_SOL);

      console.log("[pay:1] sender pubkey  :", fromPubkey.toString());
      console.log("[pay:1] recipient pubkey:", toPubkey.toString());
      console.log("[pay:1] network        :", NETWORK);
      console.log("[pay:1] current balance:", balance, "SOL");
      console.log("[pay:1] amount lamports:", lamports, "(=", COURSE_PRICE_SOL, "SOL)");

      if (fromPubkey.toString() === toPubkey.toString()) {
        throw new Error("Sender and recipient are the same address. Payment blocked.");
      }
      if (toPubkey.toString() !== "GhgXp29MrWxzdU1pdjo7gbmm2QjTY4TE6iomsM4hv9Ct") {
        throw new Error(`Recipient mismatch — expected treasury, got ${toPubkey.toString()}`);
      }
      if (NETWORK !== "devnet") {
        throw new Error(`Wrong network: expected devnet, got ${NETWORK}`);
      }
      if (lamports !== 10_000_000) {
        throw new Error(`Wrong amount: expected 10000000 lamports, got ${lamports}`);
      }
      console.log("[pay:1] ✓ all pre-flight checks passed");

      // ── 2. Devnet connection ────────────────────────────────────────────────
      let connection!: Connection;
      let connectedRpc = "";
      for (const rpc of DEVNET_RPCS) {
        try {
          const candidate = new Connection(rpc, "confirmed");
          await candidate.getVersion();
          connection   = candidate;
          connectedRpc = rpc;
          console.log("[pay:2] RPC healthy:", rpc);
          break;
        } catch (probeErr) {
          console.warn("[pay:2] RPC unreachable, trying next:", rpc, probeErr);
        }
      }
      if (!connection) {
        console.warn("[pay:2] all probes failed — using fallback");
        connection   = new Connection(DEVNET_RPCS[0], "confirmed");
        connectedRpc = DEVNET_RPCS[0];
      }

      // ── 3. Blockhash ────────────────────────────────────────────────────────
      const { blockhash, lastValidBlockHeight } = await fetchBlockhash();
      console.log("[pay:3] blockhash           :", blockhash);
      console.log("[pay:3] lastValidBlockHeight:", lastValidBlockHeight);
      console.log("[pay:3] rpc                 :", connectedRpc);

      // ── 4. Build transaction ────────────────────────────────────────────────
      const transaction = new Transaction({
        recentBlockhash: blockhash,
        feePayer: fromPubkey,
      }).add(SystemProgram.transfer({ fromPubkey, toPubkey, lamports }));

      console.log("[pay:4] transaction built:", {
        feePayer:    fromPubkey.toString(),
        recentBlockhash: blockhash,
        instructions: transaction.instructions.length,
        fromPubkey:  fromPubkey.toString(),
        toPubkey:    toPubkey.toString(),
        lamports,
      });

      // ── 5. Sign + send ──────────────────────────────────────────────────────
      // Try provider.sendTransaction first (Phantom ≥ 0.9).
      // If that method is unavailable or throws immediately (no Phantom popup),
      // fall back to the signTransaction + sendRawTransaction path which is
      // confirmed working on this setup.
      if (typeof provider.sendTransaction === "function") {
        console.log("[pay:5] trying provider.sendTransaction …");
        try {
          txSig = await provider.sendTransaction(transaction, connection, {
            skipPreflight: true,
          });
          console.log("[pay:5] provider.sendTransaction result:", txSig);
        } catch (sendErr: unknown) {
          const sendErrMsg = extractError(sendErr);
          console.warn("[pay:5] provider.sendTransaction failed:", sendErrMsg, sendErr);
          // Re-throw user cancellations immediately
          if (isUserRejection(sendErr)) throw sendErr;
          // Otherwise fall back to manual sign + broadcast
          console.log("[pay:5] falling back to signTransaction + sendRawTransaction …");
          const signedTx = await provider.signTransaction(transaction);
          txSig = await connection.sendRawTransaction(signedTx.serialize(), {
            skipPreflight: true,
          });
          console.log("[pay:5] sendRawTransaction result:", txSig);
        }
      } else {
        console.log("[pay:5] provider.sendTransaction unavailable — using signTransaction + sendRawTransaction");
        const signedTx = await provider.signTransaction(transaction);
        txSig = await connection.sendRawTransaction(signedTx.serialize(), {
          skipPreflight: true,
        });
        console.log("[pay:5] sendRawTransaction result:", txSig);
      }

      // ── 6. Confirm ──────────────────────────────────────────────────────────
      let confirmed = false;
      try {
        const confirmResult = await connection.confirmTransaction(
          { signature: txSig, blockhash, lastValidBlockHeight },
          "confirmed",
        );
        console.log("[pay:6] confirmTransaction result:", confirmResult);
        confirmed = true;
      } catch (confirmErr) {
        console.warn("[pay:6] confirmTransaction threw — falling back to status check:", confirmErr);
        const status = await connection.getSignatureStatus(txSig, {
          searchTransactionHistory: true,
        });
        const conf = status?.value?.confirmationStatus;
        const onChainErr = status?.value?.err;
        console.log("[pay:6] getSignatureStatus result:", { confirmationStatus: conf, err: onChainErr ?? null });
        if (conf === "confirmed" || conf === "finalized") {
          confirmed = true;
        } else if (onChainErr) {
          throw new Error("Transaction rejected on-chain: " + JSON.stringify(onChainErr));
        } else {
          throw new Error(
            "Transaction sent but could not be confirmed within the block window. " +
            "Check Solscan: " + SOLSCAN_BASE + txSig + "?cluster=devnet"
          );
        }
      }

      if (confirmed) {
        console.log("[pay:7] ✓ enrollment confirmed — signature:", txSig);
        setTxSignature(txSig);
        setPayStatus("idle");
        setStep("success");
        if (walletAddress) fetchBalance(walletAddress);
      }

    } catch (err: unknown) {
      setPayStatus("idle");
      const msg = extractError(err);
      console.error("[pay:error] raw error object:", err);
      console.error("[pay:error] extracted message:", msg);
      setPayError(msg);
    }
  }, [walletAddress, balance, fetchBalance]);

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

  return (
    <div className="glass-card rounded-3xl overflow-hidden">

      {/* ── Top bar: title + network badge ── */}
      <div className="flex items-center justify-between px-7 pt-7 pb-0">
        <div>
          <StepIndicator current={currentStep} />
        </div>
        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono" style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.25)", color: "#FCD34D" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          Solana Devnet
        </span>
      </div>

      {/* ── Amount hero ── */}
      <div className="flex flex-col items-center py-7 px-7">
        <p className="text-white/35 text-[11px] font-mono uppercase tracking-widest mb-3">Send Payment</p>
        <div className="relative flex items-end justify-center gap-2 mb-2">
          <span className="font-heading font-bold text-white leading-none" style={{ fontSize: "clamp(2.8rem, 8vw, 3.8rem)" }}>
            {COURSE_PRICE_SOL}
          </span>
          <span className="font-heading font-bold text-white/50 pb-1" style={{ fontSize: "clamp(1.2rem, 3vw, 1.6rem)" }}>
            SOL
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-lg flex items-center justify-center text-xs" style={{ background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.25)" }}>
            🎓
          </div>
          <span className="text-white/45 text-xs font-body">Vibe Coding — Full 7-Week Program</span>
        </div>
      </div>

      {/* ── FROM and TO wallet cards ── */}
      <div className="px-7 pb-0">
        <div className="relative">

          {/* FROM card */}
          <div className="rounded-2xl p-4 mb-0.5" style={{ background: "linear-gradient(135deg, rgba(153,69,255,0.1), rgba(153,69,255,0.04))", border: "1px solid rgba(153,69,255,0.2)" }}>
            <p className="text-white/35 text-[9px] font-mono uppercase tracking-widest mb-3">From</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center" style={{ background: "linear-gradient(135deg, #4C44C6, #9945FF)", boxShadow: "0 0 16px rgba(153,69,255,0.3)" }}>
                  <PhantomIcon />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-white font-body font-semibold text-sm">Your Wallet</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <span className="text-[#9945FF] text-[11px] font-mono">{walletAddress.slice(0, 6)}...{walletAddress.slice(-6)}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white/30 text-[9px] font-mono uppercase tracking-wider mb-1">Balance</p>
                {(balanceStatus === "idle" || balanceStatus === "loading") && (
                  <div className="h-4 w-20 rounded bg-white/10 animate-pulse" />
                )}
                {balanceStatus === "loaded" && balance !== null && (
                  <p className={`font-mono font-bold text-sm ${insufficient ? "text-red-400" : "text-[#14F195]"}`}>
                    {balance.toFixed(4)} <span className="text-xs font-normal opacity-60">SOL</span>
                  </p>
                )}
                {balanceStatus === "error" && (
                  <p className="text-white/25 text-xs font-body italic">—</p>
                )}
              </div>
            </div>
          </div>

          {/* Connector arrow */}
          <div className="flex items-center justify-center my-0.5 relative z-10">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "rgba(10,10,20,0.95)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <svg className="w-4 h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>

          {/* TO card */}
          <div className="rounded-2xl p-4" style={{ background: "linear-gradient(135deg, rgba(20,241,149,0.07), rgba(20,241,149,0.02))", border: "1px solid rgba(20,241,149,0.18)" }}>
            <p className="text-white/35 text-[9px] font-mono uppercase tracking-widest mb-3">To</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center text-xl" style={{ background: "linear-gradient(135deg, rgba(20,241,149,0.15), rgba(153,69,255,0.1))", border: "1px solid rgba(20,241,149,0.2)" }}>
                  🎓
                </div>
                <div>
                  <span className="text-white font-body font-semibold text-sm block mb-0.5">Vibe Coding</span>
                  <span className="text-[#14F195] text-[11px] font-mono">{RECIPIENT_ADDRESS.slice(0, 6)}...{RECIPIENT_ADDRESS.slice(-6)}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white/30 text-[9px] font-mono uppercase tracking-wider mb-1">Receives</p>
                <p className="font-mono font-bold text-sm text-white/80">
                  {COURSE_PRICE_SOL} <span className="text-xs font-normal opacity-60">SOL</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Summary rows ── */}
      <div className="mx-7 mt-4 rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
        {[
          {
            label: "Product",
            value: <span className="text-white/70 text-xs font-body">Vibe Coding · Full 7-Week Program</span>,
          },
          {
            label: "Network",
            value: (
              <span className="flex items-center gap-1.5 text-amber-400 text-xs font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                Solana Devnet
              </span>
            ),
          },
          {
            label: "Amount",
            value: <span className="font-mono font-bold text-white text-sm">{COURSE_PRICE_SOL} SOL</span>,
          },
          {
            label: "Est. balance after",
            value: estimatedRemaining !== null
              ? <span className="font-mono text-sm text-white/60">{estimatedRemaining.toFixed(4)} SOL</span>
              : <div className="h-3 w-20 rounded bg-white/10 animate-pulse" />,
          },
        ].map(({ label, value }, i, arr) => (
          <div
            key={label}
            className="flex items-center justify-between px-4 py-3"
            style={{ borderBottom: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}
          >
            <span className="text-white/35 text-xs font-body">{label}</span>
            {value}
          </div>
        ))}
      </div>

      {/* ── Warnings ── */}
      <div className="px-7 mt-4 space-y-3">
        {insufficient && (
          <div className="flex items-start gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-sm text-red-400 font-body">
            <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            </svg>
            Insufficient balance. Get devnet SOL at{" "}
            <a href="https://faucet.solana.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-red-300">faucet.solana.com</a>.
          </div>
        )}
        {errorMsg && (
          <div className="flex items-start gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-sm text-red-400 font-body">
            <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            </svg>
            {errorMsg}
          </div>
        )}
      </div>

      {/* ── Send Payment CTA ── */}
      <div className="px-7 pt-5 pb-2">
        <button
          onClick={onPurchase}
          disabled={payStatus === "paying"}
          className="w-full flex items-center justify-center gap-3 text-white font-heading font-bold text-base px-6 py-4 rounded-2xl transition-all hover:scale-[1.015] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
          style={{
            background: "linear-gradient(135deg, #9945FF 0%, #3B82F6 50%, #14F195 100%)",
            boxShadow: payStatus === "paying" ? "none" : "0 0 40px rgba(153,69,255,0.35), 0 0 80px rgba(20,241,149,0.08)",
          }}
        >
          {payStatus === "paying" ? (
            <>
              <Spinner />
              Broadcasting to Solana…
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              Send Payment · {COURSE_PRICE_SOL} SOL
            </>
          )}
        </button>
      </div>

      {/* ── Disconnect + trust strip ── */}
      <div className="flex items-center justify-between px-7 py-5">
        <div className="flex items-center gap-3 text-white/20 text-[10px] font-body">
          <span>Non-custodial</span>
          <span className="w-px h-3 bg-white/10" />
          <span>Instant settlement</span>
        </div>
        <button onClick={onDisconnect} className="text-[11px] text-white/20 hover:text-white/50 transition-colors underline underline-offset-2 font-body">
          Disconnect wallet
        </button>
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
