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

type WalletStatus = "idle" | "connecting" | "connected" | "paying" | "success" | "error";

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
  const [status, setStatus] = useState<WalletStatus>("idle");
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [txSignature, setTxSignature] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [hasWallet, setHasWallet] = useState<boolean | null>(null);

  useEffect(() => {
    const provider = getProvider();
    setHasWallet(!!provider);
    if (provider?.publicKey) {
      setWalletAddress(provider.publicKey.toString());
      setStatus("connected");
    }
  }, []);

  const connectWallet = useCallback(async () => {
    const provider = getProvider();
    if (!provider) {
      window.open("https://phantom.app/", "_blank");
      return;
    }
    try {
      setStatus("connecting");
      setErrorMsg("");
      const resp = await provider.connect();
      setWalletAddress(resp.publicKey.toString());
      setStatus("connected");
    } catch {
      setStatus("idle");
      setErrorMsg("Wallet connection was cancelled.");
    }
  }, []);

  const disconnectWallet = useCallback(async () => {
    const provider = getProvider();
    if (provider) await provider.disconnect();
    setWalletAddress(null);
    setStatus("idle");
    setTxSignature(null);
    setErrorMsg("");
  }, []);

  const purchaseCourse = useCallback(async () => {
    const provider = getProvider();
    if (!provider || !walletAddress) return;
    try {
      setStatus("paying");
      setErrorMsg("");

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
      setStatus("success");
    } catch (err: unknown) {
      setStatus("connected");
      const msg = err instanceof Error ? err.message : "Transaction failed.";
      if (msg.toLowerCase().includes("reject") || msg.toLowerCase().includes("cancel") || msg.toLowerCase().includes("user")) {
        setErrorMsg("Transaction was cancelled.");
      } else {
        setErrorMsg(msg);
      }
    }
  }, [walletAddress]);

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
          {status === "success" ? (
            <SuccessCard txSignature={txSignature} />
          ) : (
            <PurchaseCard
              status={status}
              walletAddress={walletAddress}
              hasWallet={hasWallet}
              errorMsg={errorMsg}
              onConnect={connectWallet}
              onDisconnect={disconnectWallet}
              onPurchase={purchaseCourse}
            />
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}

function PurchaseCard({
  status,
  walletAddress,
  hasWallet,
  errorMsg,
  onConnect,
  onDisconnect,
  onPurchase,
}: {
  status: WalletStatus;
  walletAddress: string | null;
  hasWallet: boolean | null;
  errorMsg: string;
  onConnect: () => void;
  onDisconnect: () => void;
  onPurchase: () => void;
}) {
  const isConnected = status === "connected" || status === "paying";

  return (
    <div className="glass-card rounded-3xl p-8 md:p-10">
      <div className="text-center mb-8">
        <div
          className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-5"
          style={{ background: "linear-gradient(135deg, #3B82F6, #8B5CF6)" }}
        >
          <SolanaIcon />
        </div>
        <h1 className="font-heading font-bold text-3xl mb-2">Enroll with Solana</h1>
        <p className="text-[#9CA3AF] font-body text-sm">
          Connect your wallet to purchase the course
        </p>
      </div>

      <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[#9CA3AF] font-body text-sm">Vibe Coding — Full Program</span>
          <span className="text-xs bg-[#3B82F6]/20 text-[#3B82F6] border border-[#3B82F6]/30 px-2 py-0.5 rounded-full font-body">
            1 seat
          </span>
        </div>
        <div className="flex items-end gap-2">
          <span className="font-heading font-bold text-4xl">{COURSE_PRICE_SOL} SOL</span>
          <span className="text-[#9CA3AF] font-body text-sm mb-1">one-time</span>
        </div>
        <div className="mt-3 pt-3 border-t border-white/10 flex flex-col gap-1.5">
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

      {isConnected && walletAddress && (
        <div className="flex items-center justify-between bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <span className="text-sm font-body text-white/80">Wallet connected</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-mono text-[#9CA3AF]">{shortenAddress(walletAddress)}</span>
            <button
              onClick={onDisconnect}
              className="text-xs text-[#9CA3AF] hover:text-white transition-colors underline underline-offset-2"
            >
              Disconnect
            </button>
          </div>
        </div>
      )}

      {errorMsg && (
        <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-4 text-sm text-red-400 font-body">
          <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          </svg>
          {errorMsg}
        </div>
      )}

      {!isConnected ? (
        <button
          onClick={onConnect}
          disabled={status === "connecting"}
          className="w-full flex items-center justify-center gap-3 bg-[#3B82F6] hover:bg-blue-400 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-base px-6 py-4 rounded-2xl transition-all hover:scale-[1.02]"
          style={{ boxShadow: "0 0 32px rgba(59,130,246,0.35)" }}
        >
          {status === "connecting" ? (
            <>
              <Spinner />
              Connecting…
            </>
          ) : hasWallet === false ? (
            <>
              <SolanaIcon small />
              Install Phantom Wallet
            </>
          ) : (
            <>
              <SolanaIcon small />
              Connect Solana Wallet
            </>
          )}
        </button>
      ) : (
        <button
          onClick={onPurchase}
          disabled={status === "paying"}
          className="w-full flex items-center justify-center gap-3 text-white font-semibold text-base px-6 py-4 rounded-2xl transition-all hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed animated-gradient-bg"
          style={{ boxShadow: "0 0 32px rgba(59,130,246,0.35)" }}
        >
          {status === "paying" ? (
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
      )}

      <p className="text-center text-[#9CA3AF] text-xs font-body mt-5">
        Supports Phantom, Backpack &amp; any Solana wallet
        <br />
        Questions?{" "}
        <a href="mailto:mariammanjavidze01@gmail.com" className="text-[#3B82F6] hover:underline">
          Email Mariam
        </a>
      </p>
    </div>
  );
}

function SuccessCard({ txSignature }: { txSignature: string | null }) {
  return (
    <div className="glass-card rounded-3xl p-8 md:p-10 text-center">
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

function SolanaIcon({ small }: { small?: boolean }) {
  const size = small ? "w-5 h-5" : "w-7 h-7";
  return (
    <svg className={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M4.06 17.12a.74.74 0 0 1 .52-.21h16.24a.37.37 0 0 1 .26.63l-2.77 2.77a.74.74 0 0 1-.52.21H1.55a.37.37 0 0 1-.26-.63l2.77-2.77zm0-13.01a.74.74 0 0 1 .52-.21h16.24a.37.37 0 0 1 .26.63L18.31 7.3a.74.74 0 0 1-.52.21H1.55a.37.37 0 0 1-.26-.63l2.77-2.77zm16.24 6.5a.74.74 0 0 0-.52-.21H3.54a.37.37 0 0 0-.26.63l2.77 2.77a.74.74 0 0 0 .52.21h16.24a.37.37 0 0 0 .26-.63l-2.77-2.77z" />
    </svg>
  );
}
