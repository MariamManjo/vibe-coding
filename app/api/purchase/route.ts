import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import pool from "@/lib/db";

export async function POST(req: NextRequest) {
  const session = getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json() as { txSignature?: string; walletAddress?: string };
  const { txSignature, walletAddress } = body;

  if (!txSignature || !walletAddress) {
    return NextResponse.json({ error: "Missing txSignature or walletAddress" }, { status: 400 });
  }

  try {
    await pool.query(
      `INSERT INTO purchases
         (user_id, user_email, wallet_address, tx_signature,
          product_name, amount_sol, network, access_unlocked, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, TRUE, NOW())
       ON CONFLICT (tx_signature) DO UPDATE
         SET user_id    = EXCLUDED.user_id,
             user_email = EXCLUDED.user_email`,
      [
        session.userId,
        session.email,
        walletAddress,
        txSignature,
        "Vibe Coding — Full 7-Week Program",
        0.01,
        "devnet",
      ]
    );
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[purchase] POST error:", err);
    return NextResponse.json({ error: "Failed to save purchase" }, { status: 500 });
  }
}

export async function GET() {
  const session = getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { rows } = await pool.query(
      `SELECT id, wallet_address, tx_signature, product_name, amount_sol,
              network, access_unlocked, created_at
       FROM purchases
       WHERE user_id = $1
       ORDER BY created_at DESC`,
      [session.userId]
    );
    return NextResponse.json({ purchases: rows });
  } catch (err) {
    console.error("[purchase] GET error:", err);
    return NextResponse.json({ error: "Failed to fetch purchases" }, { status: 500 });
  }
}
