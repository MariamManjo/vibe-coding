"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
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

      // ── 1. Pre-flight validation ────────────────────────────────────────────
      const fromPubkey = new PublicKey(walletAddress);
      const toPubkey   = new PublicKey(RECIPIENT_ADDRESS);
      const lamports   = Math.round(COURSE_PRICE_SOL * LAMPORTS_PER_SOL);

      console.log("[pay:1] sender pubkey  :", fromPubkey.toString());
      console.log("[pay:1] recipient pubkey:", toPubkey.toString());
      console.log("[pay:1] network        :", NETWORK);
      console.log("[pay:1] balance (state):", balance, "SOL");
      console.log("[pay:1] amount lamports:", lamports, "(=", COURSE_PRICE_SOL, "SOL)");

      if (!fromPubkey) {
        throw new Error("No sender wallet connected.");
      }
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
      // Use a hardcoded devnet URL to guarantee the network — never mainnet.
      const connection = new Connection("https://api.devnet.solana.com", "confirmed");
      console.log("[pay:2] connection created: https://api.devnet.solana.com");

      // ── 3. Pre-payment balance snapshot (proves money actually moves) ───────
      const balanceBefore = await connection.getBalance(fromPubkey);
      console.log("[pay:3] balance before payment:", balanceBefore / LAMPORTS_PER_SOL, "SOL", `(${balanceBefore} lamports)`);

      if (balanceBefore < lamports + 5000) {
        throw new Error(
          `Insufficient balance: wallet has ${(balanceBefore / LAMPORTS_PER_SOL).toFixed(6)} SOL, ` +
          `need at least ${COURSE_PRICE_SOL} SOL + network fee.`
        );
      }

      // ── 4. Fresh blockhash directly from the RPC ───────────────────────────
      // Fetching directly from Connection guarantees a fresh blockhash every
      // time — no server-side cache can interfere here.
      const { blockhash, lastValidBlockHeight } =
        await connection.getLatestBlockhash("confirmed");
      console.log("[pay:4] blockhash           :", blockhash);
      console.log("[pay:4] lastValidBlockHeight:", lastValidBlockHeight);

      // ── 5. Build transaction ────────────────────────────────────────────────
      const transaction = new Transaction();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer        = fromPubkey;
      transaction.add(SystemProgram.transfer({ fromPubkey, toPubkey, lamports }));

      console.log("[pay:5] transaction built:", {
        feePayer        : transaction.feePayer?.toString(),
        recentBlockhash : transaction.recentBlockhash,
        instructionCount: transaction.instructions.length,
        from            : fromPubkey.toString(),
        to              : toPubkey.toString(),
        lamports,
      });

      // ── 6. Sign + send ──────────────────────────────────────────────────────
      // Primary path: provider.sendTransaction (Phantom handles sign + send).
      // Fallback:     manual signTransaction → sendRawTransaction (confirmed working).
      if (typeof provider.sendTransaction === "function") {
        console.log("[pay:6] calling provider.sendTransaction …");
        try {
          txSig = await provider.sendTransaction(transaction, connection);
          console.log("[pay:6] provider.sendTransaction ✓ signature:", txSig);
        } catch (sendErr: unknown) {
          if (isUserRejection(sendErr)) throw sendErr;   // bubble user cancel
          console.warn("[pay:6] provider.sendTransaction failed:", extractError(sendErr));
          console.log("[pay:6] falling back to signTransaction + sendRawTransaction …");
          const signedTx = await provider.signTransaction(transaction);
          txSig = await connection.sendRawTransaction(signedTx.serialize(), {
            skipPreflight: true,
          });
          console.log("[pay:6] sendRawTransaction ✓ signature:", txSig);
        }
      } else {
        console.log("[pay:6] provider.sendTransaction not found — using signTransaction + sendRawTransaction");
        const signedTx = await provider.signTransaction(transaction);
        txSig = await connection.sendRawTransaction(signedTx.serialize(), {
          skipPreflight: true,
        });
        console.log("[pay:6] sendRawTransaction ✓ signature:", txSig);
      }

      // ── 7. Confirm ──────────────────────────────────────────────────────────
      console.log("[pay:7] waiting for confirmation …");
      try {
        const confirmResult = await connection.confirmTransaction(
          { signature: txSig, blockhash, lastValidBlockHeight },
          "confirmed",
        );
        const confirmErr = confirmResult?.value?.err;
        if (confirmErr) {
          throw new Error("Transaction landed but was rejected on-chain: " + JSON.stringify(confirmErr));
        }
        console.log("[pay:7] confirmTransaction ✓", confirmResult?.value);
      } catch (confirmThrow) {
        // If confirmTransaction itself throws (polling timeout), fall back to status check
        console.warn("[pay:7] confirmTransaction threw — checking status directly:", confirmThrow);
        const status = await connection.getSignatureStatus(txSig, {
          searchTransactionHistory: true,
        });
        const conf       = status?.value?.confirmationStatus;
        const onChainErr = status?.value?.err;
        console.log("[pay:7] getSignatureStatus:", { confirmationStatus: conf, err: onChainErr ?? null });
        if (onChainErr) {
          throw new Error("Transaction rejected on-chain: " + JSON.stringify(onChainErr));
        }
        if (conf !== "confirmed" && conf !== "finalized") {
          throw new Error(
            "Transaction sent but not yet confirmed. Check Solscan: " +
            SOLSCAN_BASE + txSig + "?cluster=devnet"
          );
        }
      }

      // ── 8. Post-payment balance verification ───────────────────────────────
      const balanceAfter = await connection.getBalance(fromPubkey);
      console.log("[pay:8] balance after payment:", balanceAfter / LAMPORTS_PER_SOL, "SOL", `(${balanceAfter} lamports)`);
      console.log("[pay:8] actual deduction:", (balanceBefore - balanceAfter) / LAMPORTS_PER_SOL, "SOL");

      if (balanceAfter >= balanceBefore) {
        throw new Error(
          "Balance did not decrease after send — the transfer may not have executed. " +
          "Signature: " + txSig
        );
      }

      // ── 9. Success ──────────────────────────────────────────────────────────
      console.log("[pay:9] ✓ real transfer confirmed — full signature:", txSig);
      setTxSignature(txSig);
      setPayStatus("idle");
      setStep("success");
      // Refresh balance in state to reflect the deducted amount
      fetchBalance(walletAddress);

    } catch (err: unknown) {
      setPayStatus("idle");
      const msg = extractError(err);
      console.error("[pay:error] raw object:", err);
      console.error("[pay:error] message   :", msg);
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
            <SuccessCard txSignature={txSignature} walletAddress={walletAddress} />
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

function SuccessCard({
  txSignature,
  walletAddress,
}: {
  txSignature: string | null;
  walletAddress: string | null;
}) {
  const router = useRouter();
  const [mode, setMode]           = useState<"register" | "login">("register");
  const [email, setEmail]         = useState("");
  const [password, setPassword]   = useState("");
  const [showPw, setShowPw]       = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError]         = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      /* 1 — register or login */
      const endpoint = mode === "register" ? "/api/auth/register" : "/api/auth/login";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase(), password }),
      });
      const json = await res.json();

      if (!res.ok) {
        if (json.error === "email_exists") {
          setError("An account with this email already exists. Sign in instead.");
          setMode("login");
          setSubmitting(false);
          return;
        }
        throw new Error(json.error ?? "Authentication failed.");
      }

      /* 2 — attach confirmed purchase to account */
      if (txSignature && walletAddress) {
        await fetch("/api/purchase", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ txSignature, walletAddress }),
        });
      }

      /* 3 — redirect to account dashboard */
      router.push("/account");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setSubmitting(false);
    }
  };

  return (
    <div className="glass-card rounded-3xl p-7 md:p-9">
      <StepIndicator current={3} />

      {/* ── Confirmed hero ── */}
      <div className="text-center mb-6">
        <div className="relative inline-flex items-center justify-center mb-4">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #10B981, #059669)", boxShadow: "0 0 40px rgba(16,185,129,0.35)" }}
          >
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#0A0A0A] flex items-center justify-center text-[10px]">⛓</span>
        </div>
        <h2 className="font-heading font-bold text-2xl mb-1">Payment Confirmed</h2>
        <p className="text-[#10B981] text-xs font-mono">Verified on Solana Devnet</p>
      </div>

      {/* ── On-chain proof strip ── */}
      {txSignature && (
        <div className="bg-white/[0.025] border border-white/[0.07] rounded-xl px-4 py-2.5 mb-6 flex items-center justify-between gap-3">
          <span className="text-[#6B7280] text-[11px] font-mono truncate">
            {txSignature.slice(0, 18)}…{txSignature.slice(-8)}
          </span>
          <a
            href={`${SOLSCAN_BASE}${txSignature}?cluster=devnet`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-1 text-[10px] font-semibold text-[#3B82F6] hover:text-blue-400 transition-colors"
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Solscan
          </a>
        </div>
      )}

      {/* ── Auth form ── */}
      <div
        className="rounded-2xl p-5 mb-0"
        style={{ background: "linear-gradient(135deg, rgba(153,69,255,0.08), rgba(59,130,246,0.05))", border: "1px solid rgba(153,69,255,0.2)" }}
      >
        {/* tab toggle */}
        <div className="flex bg-white/[0.04] rounded-xl p-1 mb-5">
          {(["register", "login"] as const).map(m => (
            <button
              key={m}
              type="button"
              onClick={() => { setMode(m); setError(""); }}
              className="flex-1 py-2 rounded-lg text-xs font-heading font-bold transition-all"
              style={mode === m
                ? { background: "linear-gradient(135deg, #9945FF, #3B82F6)", color: "#fff" }
                : { color: "rgba(255,255,255,0.35)" }}
            >
              {m === "register" ? "Create Account" : "Sign In"}
            </button>
          ))}
        </div>

        <p className="text-white/40 text-xs font-body mb-4 leading-relaxed">
          {mode === "register"
            ? "Create an account to save your purchase and access your payment history."
            : "Sign in to attach this payment to your existing account."}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {/* email */}
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <input
              type="email"
              value={email}
              onChange={e => { setEmail(e.target.value); setError(""); }}
              placeholder="your@email.com"
              disabled={submitting}
              autoComplete="email"
              autoFocus
              required
              className="w-full bg-white/[0.06] border border-white/[0.1] focus:border-[#9945FF]/50 rounded-xl pl-9 pr-4 py-3 text-white text-sm font-body placeholder-white/20 outline-none transition-all disabled:opacity-50"
            />
          </div>

          {/* password */}
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <input
              type={showPw ? "text" : "password"}
              value={password}
              onChange={e => { setPassword(e.target.value); setError(""); }}
              placeholder={mode === "register" ? "Min. 8 characters" : "Your password"}
              disabled={submitting}
              autoComplete={mode === "register" ? "new-password" : "current-password"}
              required
              className="w-full bg-white/[0.06] border border-white/[0.1] focus:border-[#9945FF]/50 rounded-xl pl-9 pr-10 py-3 text-white text-sm font-body placeholder-white/20 outline-none transition-all disabled:opacity-50"
            />
            <button
              type="button"
              onClick={() => setShowPw(v => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/50 transition-colors"
              tabIndex={-1}
            >
              {showPw
                ? <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                : <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              }
            </button>
          </div>

          {/* error */}
          {error && (
            <div className="flex items-start gap-2 rounded-xl px-3 py-2.5" style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}>
              <svg className="w-3.5 h-3.5 text-red-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              </svg>
              <p className="text-red-400 text-xs font-body leading-snug">{error}</p>
            </div>
          )}

          {/* submit */}
          <button
            type="submit"
            disabled={submitting || !email.trim() || !password}
            className="w-full flex items-center justify-center gap-2 text-white font-heading font-bold text-sm px-4 py-3.5 rounded-xl transition-all hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed mt-1"
            style={{ background: "linear-gradient(135deg, #9945FF, #3B82F6)" }}
          >
            {submitting
              ? <><Spinner /> {mode === "register" ? "Creating account…" : "Signing in…"}</>
              : mode === "register" ? "Create Account & Save Purchase" : "Sign In & Save Purchase"
            }
          </button>
        </form>
      </div>
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
