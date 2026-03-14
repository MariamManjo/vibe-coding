import { NextRequest, NextResponse } from "next/server";

const RPC_ENDPOINTS: Record<string, string[]> = {
  mainnet: [
    "https://api.mainnet-beta.solana.com",
    "https://rpc.ankr.com/solana",
    "https://solana-mainnet.g.alchemy.com/v2/demo",
  ],
  devnet: [
    "https://api.devnet.solana.com",
    "https://rpc.ankr.com/solana_devnet",
  ],
  testnet: [
    "https://api.testnet.solana.com",
  ],
};

export async function GET(req: NextRequest) {
  const network = req.nextUrl.searchParams.get("network") ?? "mainnet";
  const rpcs = RPC_ENDPOINTS[network] ?? RPC_ENDPOINTS.mainnet;

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
      if (blockhash) {
        return NextResponse.json({ blockhash, network });
      }
    } catch {
      // try next RPC
    }
  }

  return NextResponse.json(
    { error: `Unable to fetch blockhash from ${network}` },
    { status: 503 }
  );
}
