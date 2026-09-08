import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";
import { supabaseAdmin, supabaseReader } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* ------------------------------------------------------------------
   /api/ingest — l'UNICO ponte agenti → dashboard.
   Auth: Authorization: Bearer <INGEST_KEY>. Scrive con service role.
   GET ?digest=1  → stato aggregato (per "leggere il mondo" a inizio giro)
   POST {op,...}  → run_start | run_finish | heartbeat | feed | kv_set |
                    persist_asset | approval_add | outreach_add | meeting_add | agent_update
   ------------------------------------------------------------------ */

type Json = Record<string, unknown>;
const TZ = "Europe/Rome";
const dayRome = (d: Date) => new Intl.DateTimeFormat("it-IT", { timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit" }).format(d);

function authorized(req: NextRequest): boolean {
  const key = process.env.INGEST_KEY;
  if (!key) return false;
  const h = req.headers.get("authorization") ?? "";
  const token = h.startsWith("Bearer ") ? h.slice(7).trim() : "";
  const a = Buffer.from(token), b = Buffer.from(key);
  return a.length === b.length && timingSafeEqual(a, b);
}
const bad = (msg: string, status = 400) => NextResponse.json({ ok: false, error: msg }, { status });
const str = (v: unknown, fallback = ""): string => (typeof v === "string" ? v : fallback);
const num = (v: unknown, fallback = 0): number => (typeof v === "number" && Number.isFinite(v) ? v : fallback);


export async function GET(req: NextRequest) {
  if (!process.env.INGEST_KEY) return bad("INGEST_KEY non configurata sul server", 503);
  if (!authorized(req)) return bad("non autorizzato", 401);
  const sb = supabaseAdmin() ?? supabaseReader();
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
    ok: true,
    ts: new Date().toISOString(),
    writer: Boolean(supabaseAdmin()),
    agents: agents.data ?? [],
    runs: runs.data ?? [],
    feed: feed.data ?? [],
    kv: kvMap,
    approvals_pending: approvals.data ?? [],
    meetings: meetings.data ?? [],
    kpi: { funnel: kpiFunnel.data ?? [], liste: kpiListe.data ?? null },
  });
}

export async function POST(req: NextRequest) {
  if (!process.env.INGEST_KEY) return bad("INGEST_KEY non configurata sul server", 503);
  if (!authorized(req)) return bad("non autorizzato", 401);
  const sb = supabaseAdmin();
  if (!sb) return bad("SUPABASE_SERVICE_ROLE_KEY mancante: la dashboard può leggere ma non scrivere", 503);
  let body: Json;
  try { body = (await req.json()) as Json; } catch { return bad("JSON non valido"); }
  const op = str(body.op);
  const agent = str(body.agent);
  const now = new Date();

  const feed = async (agent_slug: string | null, kind: string, message: string) => {
    await sb.from("activity_feed").insert({ agent_slug, kind, message });
  };
  const ensureAgent = async (slug: string) => {
    const { data } = await sb.from("agents").select("slug").eq("slug", slug).maybeSingle();
    if (!data) await sb.from("agents").insert({ slug, name: slug.toUpperCase().replace(/-/g, " "), role: "Ruolo nuovo", department: "Team" });
  };

  try {
    switch (op) {
      case "run_start": {
        if (!agent) return bad("agent mancante");
        await ensureAgent(agent);
        const task = str(body.task, "giro in corso");
        const { data: run, error } = await sb.from("agent_runs").insert({ agent_slug: agent, status: "running", summary: task }).select("id").single();
        if (error) throw error;
        await sb.from("agents").update({ status: "working", current_task: task, updated_at: now.toISOString() }).eq("slug", agent);
        await feed(agent, "run", `Inizia il giro: ${task}`);
        return NextResponse.json({ ok: true, run_id: run.id });
      }
      case "heartbeat": {
        if (!agent) return bad("agent mancante");
        const patch: Json = { status: "working", updated_at: now.toISOString() };
        if (body.task) patch.current_task = str(body.task);
        await sb.from("agents").update(patch).eq("slug", agent);
        return NextResponse.json({ ok: true });
      }
      case "run_finish": {
        if (!agent) return bad("agent mancante");
        const esito = str(body.esito, "ok") === "error" ? "error" : "ok";
        const summary = str(body.summary, esito === "ok" ? "giro completato" : "giro in errore");
        const items = Math.max(0, Math.round(num(body.items)));
        let runId = typeof body.run_id === "number" ? body.run_id : null;
        if (runId === null) {
          const { data: open } = await sb.from("agent_runs").select("id").eq("agent_slug", agent).eq("status", "running").order("started_at", { ascending: false }).limit(1).maybeSingle();
          runId = open?.id ?? null;
        }
        if (runId !== null) {
          await sb.from("agent_runs").update({ status: esito, summary, items, finished_at: now.toISOString() }).eq("id", runId);
        } else {
          await sb.from("agent_runs").insert({ agent_slug: agent, status: esito, summary, items, finished_at: now.toISOString() });
        }
        const { data: a } = await sb.from("agents").select("last_run_at, today_count").eq("slug", agent).maybeSingle();
        const sameDay = a?.last_run_at ? dayRome(new Date(a.last_run_at as string)) === dayRome(now) : false;
        const today_count = (sameDay ? num(a?.today_count) : 0) + items;
        await sb.from("agents").update({ status: esito === "ok" ? "idle" : "error", current_task: null, last_run_at: now.toISOString(), today_count, updated_at: now.toISOString() }).eq("slug", agent);
        await feed(agent, esito === "ok" ? "ok" : "error", `${esito === "ok" ? "Giro chiuso" : "Giro in errore"}: ${summary}${items ? ` (${items} item)` : ""}`);
        return NextResponse.json({ ok: true, run_id: runId, today_count });
      }
      case "feed": {
        const message = str(body.message);
        if (!message) return bad("message mancante");
        await feed(agent || null, str(body.kind, "info"), message);
        return NextResponse.json({ ok: true });
      }
      case "kv_set": {
        const key = str(body.key);
        if (!key) return bad("key mancante");
        const { error } = await sb.from("kv").upsert({ key, value: body.value ?? null, updated_at: now.toISOString() });
        if (error) throw error;
        return NextResponse.json({ ok: true });
      }
      case "approval_add": {
        const title = str(body.title);
        if (!title) return bad("title mancante");
        const { data, error } = await sb.from("approvals").insert({ agent_slug: agent || null, kind: str(body.kind, "other"), title, payload: (body.payload as Json) ?? {} }).select("id").single();
        if (error) throw error;
        await feed(agent || null, "info", `Bozza in attesa del tuo OK: ${title}`);
        return NextResponse.json({ ok: true, id: data.id });
      }
      case "outreach_add": {
        const channel = str(body.channel);
        if (!["linkedin", "instagram", "email", "whatsapp"].includes(channel)) return bad("channel non valido");
        const { error } = await sb.from("outreach_msgs").insert({
          agent_slug: agent || null, channel, contact_ref: str(body.contact_ref) || null, contact_name: str(body.contact_name) || null,
          contact_url: str(body.contact_url) || null, direction: str(body.direction, "out") === "in" ? "in" : "out", message: str(body.message) || null, status: str(body.status, "sent"),
        });
        if (error) throw error;
        return NextResponse.json({ ok: true });
      }
      case "meeting_add": {
        const { data, error } = await sb.from("meetings").insert({
          agent_slug: agent || null, channel: str(body.channel) || null, contact_name: str(body.contact_name) || null, contact_ref: str(body.contact_ref) || null,
          when_at: str(body.when_at) || null, status: ["proposed", "confirmed", "done", "cancelled"].includes(str(body.status)) ? str(body.status) : "proposed", notes: str(body.notes) || null,
        }).select("id").single();
        if (error) throw error;
        await feed(agent || null, "ok", `Meeting ${str(body.status, "proposto")}: ${str(body.contact_name, "contatto")}${body.when_at ? ` · ${str(body.when_at)}` : ""}`);
        return NextResponse.json({ ok: true, id: data.id });
      }
      case "agent_update": {
        if (!agent) return bad("agent mancante");
        const allowed = ["name", "role", "department", "kind", "tagline", "description", "avatar", "status", "schedule_label", "cron", "color", "sort", "current_task"];
        const patch: Json = { updated_at: now.toISOString() };
        for (const k of allowed) if (k in body) patch[k] = body[k];
        const { error } = await sb.from("agents").update(patch).eq("slug", agent);
        if (error) throw error;
        return NextResponse.json({ ok: true });
      }
      case "persist_asset": {
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
        if (upErr) throw upErr;
        const { data: pub } = sb.storage.from("mc-assets").getPublicUrl(path);
        const url = pub.publicUrl;
        await sb.from("assets").insert({ agent_slug: agent || null, kind: str(body.kind) || null, url, path, content_type: contentType });
        return NextResponse.json({ ok: true, url });
      }
      default:
        return bad(`op sconosciuta: ${op || "(vuota)"}`);
    }
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
