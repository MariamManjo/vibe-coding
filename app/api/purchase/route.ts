import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { txSignature, walletAddress } = body as {
    txSignature?: string;
    walletAddress?: string;
  };

  if (!txSignature || !walletAddress) {
    return NextResponse.json({ error: "Missing txSignature or walletAddress" }, { status: 400 });
  }

  try {
    await pool.query(
      `INSERT INTO purchases
         (user_email, user_name, user_image, wallet_address, tx_signature,
          product_name, amount_sol, network, access_unlocked, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, TRUE, NOW())
       ON CONFLICT (tx_signature) DO UPDATE
         SET user_email = EXCLUDED.user_email,
             user_name  = EXCLUDED.user_name,
             user_image = EXCLUDED.user_image`,
      [
        session.user.email,
        session.user.name ?? null,
        session.user.image ?? null,
        walletAddress,
        txSignature,
        "Vibe Coding — Full 7-Week Program",
        0.01,
        "devnet",
      ]
    );
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[purchase] error:", err);
    return NextResponse.json({ error: "Failed to save purchase" }, { status: 500 });
  }
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { rows } = await pool.query(
      `SELECT id, wallet_address, tx_signature, product_name, amount_sol,
              network, access_unlocked, created_at
       FROM purchases
       WHERE user_email = $1
       ORDER BY created_at DESC`,
      [session.user.email]
    );
    return NextResponse.json({ purchases: rows });
  } catch (err) {
    console.error("[purchase] GET error:", err);
    return NextResponse.json({ error: "Failed to fetch purchases" }, { status: 500 });
  }
}
