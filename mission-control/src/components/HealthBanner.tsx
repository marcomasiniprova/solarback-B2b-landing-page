"use client";
import { useEffect, useState } from "react";
import { ShieldAlert, ShieldCheck } from "lucide-react";
import { useData } from "@/lib/store";
import { isTodayRome, relTime } from "@/lib/utils";
import { Dot } from "./ui";

export default function HealthBanner() {
  const { data, error, mode } = useData();
  const [nowMs, setNowMs] = useState(0);
  useEffect(() => {
    const t0 = setTimeout(() => setNowMs(Date.now()), 0);
    const t = setInterval(() => setNowMs(Date.now()), 30_000);
    return () => { clearTimeout(t0); clearInterval(t); };
  }, []);
  const dayAgo = nowMs - 86_400_000;
  const errors = nowMs ? data.runs.filter((r) => r.status === "error" && Date.parse(r.started_at) > dayAgo) : [];
  const stale = nowMs ? data.agents.filter((a) => a.status === "working" && a.updated_at && nowMs - Date.parse(a.updated_at) > 2 * 3_600_000) : [];
  const today = data.runs.filter((r) => isTodayRome(r.started_at)).length;
  const last = data.runs[0];
  const lastAgent = last ? data.agents.find((a) => a.slug === last.agent_slug)?.name.replace("SOLAR - ", "") : null;
  const healthy = errors.length === 0 && stale.length === 0 && !error;
  const title = error ? "Problema di collegamento" : healthy ? "Sistema in salute" : "Attenzione";
  const msg = error
    ? `La dashboard non riesce a leggere il database: ${error}`
    : healthy
      ? last
        ? `Ultimo giro: ${lastAgent ?? "ruolo"} ${relTime(last.started_at)} (${last.status === "ok" ? "pulito" : last.status}). ${today} giri oggi, nessun errore nelle ultime 24 ore.`
        : "Squadra mappata e in attesa del collaudo, ruolo per ruolo. Il primo giro vero lo vedrai qui."
      : `${errors.length} giri in errore nelle ultime 24 ore${stale.length ? `, ${stale.length} ruoli fermi da più di 2 ore` : ""}. Apri le schede in rosso.`;
  return (
    <div className={`mb-8 flex items-start gap-4 rounded-card border p-5 ${healthy && !error ? "border-brand-500/30 bg-brand-500/8" : "border-err/40 bg-err/8"}`}>
      <div className="mt-0.5">{healthy && !error ? <ShieldCheck className="text-brand-400" size={22} /> : <ShieldAlert className="text-err" size={22} />}</div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-display font-bold text-ink">{title}</span>
          <span className="inline-flex items-center gap-1.5 text-xs text-ink-3"><Dot tone={healthy && !error ? "gold" : "err"} pulse={mode === "live"} /> {mode === "live" ? "controllo continuo" : mode === "sync" ? "controllo ogni 45 secondi" : "demo"}</span>
        </div>
        <p className="mt-1 text-sm leading-relaxed text-ink-2">{msg}</p>
      </div>
    </div>
  );
}
