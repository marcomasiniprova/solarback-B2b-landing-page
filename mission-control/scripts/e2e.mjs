// Collaudo end-to-end del contratto agenti → dashboard.
// Uso: BASE_URL=https://... INGEST_KEY=... node scripts/e2e.mjs
const BASE = process.env.BASE_URL || "http://localhost:3000";
const KEY = process.env.INGEST_KEY;
if (!KEY) { console.error("INGEST_KEY mancante"); process.exit(1); }
const H = { "content-type": "application/json", authorization: `Bearer ${KEY}` };
const post = async (body) => { const r = await fetch(`${BASE}/api/ingest`, { method: "POST", headers: H, body: JSON.stringify(body) }); const j = await r.json(); console.log(body.op, r.status, JSON.stringify(j).slice(0, 160)); if (!r.ok) throw new Error(`${body.op} → ${r.status}`); return j; };
const health = await (await fetch(`${BASE}/api/health`)).json(); console.log("health", health);
const agent = "solar-data-analyst";
const { run_id } = await post({ op: "run_start", agent, task: "Collaudo end-to-end" });
await post({ op: "heartbeat", agent, task: "Collaudo: scrivo feed e kv" });
await post({ op: "feed", agent, kind: "info", message: "Collaudo: il contratto agenti → dashboard funziona." });
await post({ op: "kv_set", key: "collaudo:ultimo", value: { quando: new Date().toISOString(), esito: "ok" } });
const { id } = await post({ op: "approval_add", agent, kind: "other", title: "Collaudo: bozza di prova (puoi rifiutarla)", payload: { testo: "Questa è una bozza di collaudo generata dallo script e2e." } });
await post({ op: "run_finish", agent, run_id, esito: "ok", summary: "Collaudo end-to-end completato", items: 1 });
const d = await (await fetch(`${BASE}/api/ingest?digest=1`, { headers: H })).json();
console.log("digest: agenti", d.agents?.length, "· giri", d.runs?.length, "· feed", d.feed?.length, "· bozze in attesa", d.approvals_pending?.length, "· approval id", id);
if (!d.ok || !d.agents?.length) throw new Error("digest non valido");
console.log("E2E OK");
