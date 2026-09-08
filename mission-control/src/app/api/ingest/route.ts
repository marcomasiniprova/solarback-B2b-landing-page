import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { timingSafeEqual } from "node:crypto";
import { supabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* ------------------------------------------------------------------
   /api/ingest — l'UNICO ponte agenti → dashboard.
   Auth: Authorization: Bearer <INGEST_KEY>.
   Scrittura: funzione sicura nel DB `mc.ingest(key, op, payload)` (verifica la chiave, gira come postgres),
   quindi NON dipende dalla service role key. Solo `persist_asset` (Storage) richiede la service role.
   GET ?digest=1 → stato aggregato. POST {op,...} → run_start | heartbeat | run_finish | feed | kv_set |
   approval_add | outreach_add | meeting_add | agent_update | persist_asset
   ------------------------------------------------------------------ */

type Json = Record<string, unknown>;

function bearer(req: NextRequest): string {
  const h = req.headers.get("authorization") ?? "";
  return h.startsWith("Bearer ") ? h.slice(7).trim() : "";
}
function authorized(token: string): boolean {
  const key = process.env.INGEST_KEY;
  if (!key) return false;
  const a = Buffer.from(token), b = Buffer.from(key);
  return a.length === b.length && timingSafeEqual(a, b);
}
const bad = (msg: string, status = 400) => NextResponse.json({ ok: false, error: msg }, { status });
const str = (v: unknown, fallback = ""): string => (typeof v === "string" ? v : fallback);

function readerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL, anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) return null;
  return createClient(url, anon, { db: { schema: "mc" }, auth: { persistSession: false } });
}

export async function GET(req: NextRequest) {
  if (!process.env.INGEST_KEY) return bad("INGEST_KEY non configurata sul server", 503);
  if (!authorized(bearer(req))) return bad("non autorizzato", 401);
  const sb = readerClient();
  if (!sb) return bad("Supabase non configurato", 503);
  const [agents, runs, feed, kv, approvals, meetings, kpiFunnel, kpiListe] = await Promise.all([
    sb.from("agents").select("*").order("sort"),
    sb.from("agent_runs").select("*").order("started_at", { ascending: false }).limit(60),
    sb.from("activity_feed").select("*").order("ts", { ascending: false }).limit(60),
    sb.from("kv").select("*"),
    sb.from("approvals").select("*").eq("status", "pending").order("created_at", { ascending: false }).limit(50),
    sb.from("meetings").select("*").order("created_at", { ascending: false }).limit(30),
    sb.from("kpi_funnel").select("*"),
    sb.from("kpi_liste").select("*").maybeSingle(),
  ]);
  const kvMap: Json = {};
  for (const r of (kv.data ?? []) as { key: string; value: unknown }[]) kvMap[r.key] = r.value;
  return NextResponse.json({
    ok: true, ts: new Date().toISOString(), writer: true, storage: Boolean(supabaseAdmin()),
    agents: agents.data ?? [], runs: runs.data ?? [], feed: feed.data ?? [], kv: kvMap,
    approvals_pending: approvals.data ?? [], meetings: meetings.data ?? [],
    kpi: { funnel: kpiFunnel.data ?? [], liste: kpiListe.data ?? null },
  });
}

export async function POST(req: NextRequest) {
  if (!process.env.INGEST_KEY) return bad("INGEST_KEY non configurata sul server", 503);
  const token = bearer(req);
  if (!authorized(token)) return bad("non autorizzato", 401);
  let body: Json;
  try { body = (await req.json()) as Json; } catch { return bad("JSON non valido"); }
  const op = str(body.op);
  if (!op) return bad("op mancante");

  if (op === "persist_asset") {
    const sb = supabaseAdmin();
    if (!sb) return bad("persist_asset richiede SUPABASE_SERVICE_ROLE_KEY su Railway (Storage). Le altre op funzionano.", 503);
    const path = str(body.path);
    if (!path) return bad("path mancante");
    let bytes: Buffer; let contentType = str(body.content_type, "application/octet-stream");
    const src = str(body.url);
    if (src.startsWith("data:")) {
      const m = /^data:([^;,]+)?(;base64)?,([\s\S]*)$/.exec(src);
      if (!m) return bad("data URI non valido");
      contentType = m[1] || contentType;
      bytes = m[2] ? Buffer.from(m[3], "base64") : Buffer.from(decodeURIComponent(m[3]), "utf8");
    } else if (src.startsWith("http")) {
      const r = await fetch(src);
      if (!r.ok) return bad(`download fallito: HTTP ${r.status}`, 502);
      contentType = r.headers.get("content-type") || contentType;
      bytes = Buffer.from(await r.arrayBuffer());
    } else return bad("url mancante (http o data URI)");
    const { error: upErr } = await sb.storage.from("mc-assets").upload(path, bytes, { contentType, upsert: true });
    if (upErr) return NextResponse.json({ ok: false, error: upErr.message }, { status: 500 });
    const { data: pub } = sb.storage.from("mc-assets").getPublicUrl(path);
    await sb.from("assets").insert({ agent_slug: str(body.agent) || null, kind: str(body.kind) || null, url: pub.publicUrl, path, content_type: contentType });
    return NextResponse.json({ ok: true, url: pub.publicUrl });
  }

  const sb = readerClient();
  if (!sb) return bad("Supabase non configurato", 503);
  const { data, error } = await sb.rpc("ingest", { p_key: token, p_op: op, p: body });
  if (error) {
    const status = /non autorizzato/i.test(error.message) ? 401 : /sconosciuta|mancante|non valid/i.test(error.message) ? 400 : 500;
    return NextResponse.json({ ok: false, error: error.message }, { status });
  }
  return NextResponse.json(data ?? { ok: true });
}
