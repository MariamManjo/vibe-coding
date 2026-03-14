import { NextResponse } from "next/server";

const RPCS = [
  "https://api.mainnet-beta.solana.com",
  "https://rpc.ankr.com/solana",
  "https://solana-mainnet.g.alchemy.com/v2/demo",
];

export async function GET() {
  const body = JSON.stringify({
    jsonrpc: "2.0",
    id: 1,
    method: "getLatestBlockhash",
    params: [{ commitment: "finalized" }],
  });

  for (const rpc of RPCS) {
    try {
      const res = await fetch(rpc, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        signal: AbortSignal.timeout(8000),
      });
      const json = await res.json();
      const blockhash = json?.result?.value?.blockhash;
      if (blockhash) {
        return NextResponse.json({ blockhash });
      }
    } catch {
      // try next RPC
    }
  }

  return NextResponse.json(
    { error: "Unable to fetch blockhash from Solana network" },
    { status: 503 }
  );
}
