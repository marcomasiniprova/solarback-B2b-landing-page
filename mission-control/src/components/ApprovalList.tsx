"use client";
import { useState } from "react";
import { Check, X } from "lucide-react";
import type { Approval } from "@/lib/types";
import { useData } from "@/lib/store";
import { fmtDateTime } from "@/lib/utils";
import { Badge, Card, EmptyState } from "./ui";

const KIND: Record<string, string> = { post: "Post", carosello: "Carosello", video: "Video", blog: "Articolo", dm_template: "Template DM", other: "Altro" };

export default function ApprovalList({ items, showActions = true }: { items: Approval[]; showActions?: boolean }) {
  const { data, refetch } = useData();
  const [pin, setPin] = useState("");
  const [busy, setBusy] = useState<number | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const nameOf = (slug: string | null) => data.agents.find((a) => a.slug === slug)?.name.replace("SOLAR - ", "") ?? "Sistema";

  async function decide(id: number, decision: "approved" | "rejected") {
    setBusy(id); setMsg(null);
    try {
      const r = await fetch("/api/decide", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ id, decision, pin }) });
      const j = (await r.json()) as { ok?: boolean; error?: string };
      if (!r.ok || !j.ok) throw new Error(j.error || `HTTP ${r.status}`);
      setMsg(decision === "approved" ? "Approvato." : "Rifiutato.");
      await refetch();
    } catch (e) {
      setMsg(e instanceof Error ? e.message : String(e));
    } finally { setBusy(null); }
  }

  if (items.length === 0) return <EmptyState title="Niente in attesa" hint="Quando un ruolo prepara una bozza, la trovi qui con i pulsanti Approva / Rifiuta." />;
  return (
    <div className="space-y-3">
      {showActions && (
        <div className="flex flex-wrap items-center gap-3 rounded-xl border border-line bg-card-2 px-4 py-3 text-sm">
          <span className="text-ink-2">PIN di approvazione</span>
          <input value={pin} onChange={(e) => setPin(e.target.value)} type="password" inputMode="numeric" placeholder="••••" className="w-28 rounded-lg border border-line-strong bg-base px-3 py-1.5 text-ink outline-none focus:border-brand-500" />
          {msg && <span className="text-xs text-brand-200">{msg}</span>}
        </div>
      )}
      {items.map((a) => (
        <Card key={a.id} className="p-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="gold">{KIND[a.kind] ?? a.kind}</Badge>
                <span className="text-xs text-ink-3">{nameOf(a.agent_slug)} · {fmtDateTime(a.created_at)}</span>
                {a.status !== "pending" && <Badge tone={a.status === "approved" ? "ok" : "err"}>{a.status === "approved" ? "Approvato" : "Rifiutato"}{a.decided_at ? ` · ${fmtDateTime(a.decided_at)}` : ""}</Badge>}
              </div>
              <div className="mt-2 font-display font-bold text-ink">{a.title}</div>
              {typeof a.payload?.testo === "string" && <pre className="mt-2 whitespace-pre-wrap rounded-lg border border-line bg-base p-3 text-xs leading-relaxed text-ink-2">{a.payload.testo}</pre>}
              {typeof a.payload?.url === "string" && <a href={a.payload.url} target="_blank" rel="noreferrer" className="mt-2 inline-block text-xs font-semibold text-brand-400 underline-offset-2 hover:underline">Apri l’asset</a>}
              {a.note && <div className="mt-2 text-xs text-ink-3">Nota: {a.note}</div>}
            </div>
            {showActions && a.status === "pending" && (
              <div className="flex shrink-0 gap-2">
                <button disabled={busy === a.id} onClick={() => decide(a.id, "approved")} className="inline-flex items-center gap-1.5 rounded-lg bg-brand-500 px-3 py-2 text-sm font-bold text-deep transition-colors hover:bg-brand-400 disabled:opacity-50"><Check size={16} /> Approva</button>
                <button disabled={busy === a.id} onClick={() => decide(a.id, "rejected")} className="inline-flex items-center gap-1.5 rounded-lg border border-line-strong px-3 py-2 text-sm font-semibold text-ink-2 transition-colors hover:border-err hover:text-red-300 disabled:opacity-50"><X size={16} /> Rifiuta</button>
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}
