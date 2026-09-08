"use client";
import { useData } from "@/lib/store";
import { isTodayRome } from "@/lib/utils";
import AgentCard from "./AgentCard";
import { Card, Kicker } from "./ui";

const DEPT: Record<string, string> = {
  Contenuti: "Ideano, producono e mettono in fila i contenuti del brand.",
  Outreach: "Gli squali: sempre live, portano meeting qualificati.",
  Dati: "Trovano le aziende e chiudono la giornata con i numeri veri.",
};
const ORDER = ["Contenuti", "Outreach", "Dati"];

export default function TeamGrid() {
  const { data } = useData();
  const depts = Array.from(new Set(data.agents.map((a) => a.department))).sort((a, b) => (ORDER.indexOf(a) === -1 ? 99 : ORDER.indexOf(a)) - (ORDER.indexOf(b) === -1 ? 99 : ORDER.indexOf(b)));
  const giriOggi = data.runs.filter((r) => isTodayRome(r.started_at)).length;
  const pending = data.approvals.filter((a) => a.status === "pending").length;
  return (
    <div>
      <Card className="mb-6 p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="font-display text-base font-bold text-ink">Il team SolarBack</div>
            <p className="mt-1 max-w-2xl text-sm text-ink-2">Una squadra che lavora ogni giorno per un obiettivo solo: riempire l’agenda degli installatori fotovoltaici partner. Ogni ruolo ha il suo mestiere, ognuno riporta a te.</p>
          </div>
          <Kicker className="text-brand-400">{pending ? `${pending} in attesa del tuo OK` : "tutto in attesa del prossimo giro"}</Kicker>
        </div>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-xs text-ink-3">
          <span><b className="num text-ink">{data.agents.length}</b> membri</span>
          <span><b className="num text-ink">{depts.length}</b> reparti</span>
          <span><b className="num text-ink">{giriOggi}</b> giri oggi</span>
          <span><b className="num text-ink">{pending}</b> in attesa del tuo OK</span>
        </div>
      </Card>
      {depts.map((d) => {
        const members = data.agents.filter((a) => a.department === d);
        return (
          <section key={d} className="mb-8">
            <div className="mb-3 flex items-end justify-between">
              <div>
                <div className="font-display text-sm font-bold text-brand-200">Reparto {d}</div>
                <div className="text-xs text-ink-3">{DEPT[d] ?? ""}</div>
              </div>
              <div className="text-xs text-ink-3">{members.length} membri</div>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {members.map((a, i) => <AgentCard key={a.slug} agent={a} index={i} />)}
            </div>
          </section>
        );
      })}
    </div>
  );
}
