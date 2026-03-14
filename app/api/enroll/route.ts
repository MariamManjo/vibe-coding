import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, walletAddress, txSignature } = body as {
      email?: string;
      walletAddress?: string;
      txSignature?: string;
    };

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }
    if (!walletAddress) {
      return NextResponse.json(
        { error: "Wallet address is required." },
        { status: 400 }
      );
    }
    if (!txSignature) {
      return NextResponse.json(
        { error: "Transaction signature is required." },
        { status: 400 }
      );
    }

    await pool.query(
      `INSERT INTO enrollments
         (email, wallet_address, tx_signature, product_name, amount_sol, enrolled_at)
       VALUES ($1, $2, $3, $4, $5, NOW())
       ON CONFLICT (tx_signature) DO UPDATE
         SET email = EXCLUDED.email`,
      [
        email.trim().toLowerCase(),
        walletAddress,
        txSignature,
        "Vibe Coding — Full 7-Week Program",
        0.01,
      ]
    );

    console.log("[enroll] saved:", { email: email.trim(), walletAddress, txSignature });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[enroll] error:", err);
    return NextResponse.json(
      { error: "Failed to save enrollment. Please try again." },
      { status: 500 }
    );
  }
}
