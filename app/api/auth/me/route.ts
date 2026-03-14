import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import pool from "@/lib/db";

export async function GET() {
  const session = getSession();
  if (!session) {
    return NextResponse.json({ user: null }, { status: 401 });
  }
  const { rows } = await pool.query(
    `SELECT id, email, name, created_at FROM users WHERE id = $1`,
    [session.userId]
  );
  if (!rows.length) {
    return NextResponse.json({ user: null }, { status: 401 });
  }
  return NextResponse.json({ user: rows[0] });
}
