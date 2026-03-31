import { NextRequest, NextResponse } from "next/server";

/*
  Lightweight in-memory waitlist for local dev.
  Replace with Supabase for production:

  import { createClient } from "@supabase/supabase-js";
  const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);
*/

const waitlist: string[] = [];

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  if (!email || typeof email !== "string" || !email.includes("@")) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const existing = waitlist.indexOf(email);
  if (existing !== -1) {
    return NextResponse.json({ position: existing + 1 });
  }

  waitlist.push(email);

  /*
    Supabase version:
    const { count } = await supabase.from("waitlist").select("*", { count: "exact", head: true });
    await supabase.from("waitlist").insert({ email });
    return NextResponse.json({ position: (count ?? 0) + 1 });
  */

  return NextResponse.json({ position: waitlist.length });
}
