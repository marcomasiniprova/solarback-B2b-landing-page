import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { timingSafeEqual } from "node:crypto";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Approvazione umana dalla dashboard (protetta da DECIDE_PIN). Scrive via la funzione sicura mc.ingest. */
export async function POST(req: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL, anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, key = process.env.INGEST_KEY;
  if (!url || !anon || !key) return NextResponse.json({ ok: false, error: "server non configurato" }, { status: 503 });
  let body: { id?: number; decision?: string; note?: string; pin?: string };
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false, error: "JSON non valido" }, { status: 400 }); }
  const pin = process.env.DECIDE_PIN;
  if (pin) {
    const given = Buffer.from(String(body.pin ?? "")), want = Buffer.from(pin);
    if (given.length !== want.length || !timingSafeEqual(given, want)) return NextResponse.json({ ok: false, error: "PIN errato" }, { status: 401 });
  }
  const id = Number(body.id);
  const decision = body.decision === "rejected" ? "rejected" : body.decision === "approved" ? "approved" : null;
  if (!Number.isFinite(id) || !decision) return NextResponse.json({ ok: false, error: "id o decision non validi" }, { status: 400 });
  const sb = createClient(url, anon, { db: { schema: "mc" }, auth: { persistSession: false } });
  const { data, error } = await sb.rpc("ingest", { p_key: key, p_op: "decide", p: { id, decision, note: body.note ?? null } });
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json(data ?? { ok: true });
}
