import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";
import { supabaseAdmin } from "@/lib/supabase";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Approvazione umana dalla dashboard: sblocca (o rifiuta) una bozza. Protetta da DECIDE_PIN. */
export async function POST(req: NextRequest) {
  const sb = supabaseAdmin();
  if (!sb) return NextResponse.json({ ok: false, error: "SUPABASE_SERVICE_ROLE_KEY mancante sul server" }, { status: 503 });
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
  const { data: a, error } = await sb.from("approvals").update({ status: decision, note: body.note ?? null, decided_at: new Date().toISOString() }).eq("id", id).select("title, agent_slug").single();
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  await sb.from("activity_feed").insert({ agent_slug: a.agent_slug, kind: "decision", message: `Valerio ha ${decision === "approved" ? "approvato" : "rifiutato"}: ${a.title}` });
  return NextResponse.json({ ok: true });
}
