import { NextResponse } from "next/server";

// Force Next.js to never cache this route — each blockhash must be fresh
export const dynamic = "force-dynamic";
export const revalidate = 0;

const NETWORK = process.env.SOLANA_NETWORK ?? "devnet";

const RPC_ENDPOINTS: Record<string, string[]> = {
  devnet: [
    "https://api.devnet.solana.com",
    "https://rpc.ankr.com/solana_devnet",
  ],
};

export async function GET() {
  const rpcs = RPC_ENDPOINTS[NETWORK] ?? RPC_ENDPOINTS.devnet;

  const body = JSON.stringify({
    jsonrpc: "2.0",
    id: 1,
    method: "getLatestBlockhash",
    params: [{ commitment: "confirmed" }],
  });

  for (const rpc of rpcs) {
    try {
      const res = await fetch(rpc, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        signal: AbortSignal.timeout(8000),
      });
      const json = await res.json();
      const blockhash = json?.result?.value?.blockhash;
      const lastValidBlockHeight = json?.result?.value?.lastValidBlockHeight;
      if (blockhash) {
        return NextResponse.json({ blockhash, lastValidBlockHeight, network: NETWORK });
      }
    } catch {
      // try next RPC
    }
  }

  return NextResponse.json(
    { error: `Unable to fetch blockhash from ${NETWORK}` },
    { status: 503 }
  );
}
