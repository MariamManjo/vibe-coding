import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import pool from "@/lib/db";
import { createToken, sessionCookieOptions } from "@/lib/session";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json() as { email?: string; password?: string };

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
  }

  const { rows } = await pool.query(
    `SELECT id, email, password_hash FROM users WHERE email = $1`,
    [email.trim().toLowerCase()]
  );

  if (rows.length === 0) {
    return NextResponse.json({ error: "No account found with that email." }, { status: 401 });
  }

  const user = rows[0];
  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  const token = createToken({ userId: user.id, email: user.email });
  const res = NextResponse.json({ success: true, email: user.email });
  res.cookies.set(sessionCookieOptions(token));
  return res;
}
