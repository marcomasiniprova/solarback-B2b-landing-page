"use client";
import PageHeader from "@/components/PageHeader";
import { useData } from "@/lib/store";
import { Badge, Card, EmptyState, Kicker, SectionTitle, Table } from "@/components/ui";
import { fmtDateTime } from "@/lib/utils";

type Report = { data?: string; sintesi?: string; cosa_ha_funzionato?: string[]; cosa_no?: string[]; domani?: string[] };
const ORDER = ["Contatto", "Interessato", "Qualificato", "Partner", "Perso", "Escluso"];

export default function Page() {
  const { data } = useData();
  const rep = data.kv["analyst:ultimo"] as Report | undefined;
  const rows = [...data.kpiFunnel].sort((a, b) => (ORDER.indexOf(a.stato) === -1 ? 99 : ORDER.indexOf(a.stato)) - (ORDER.indexOf(b.stato) === -1 ? 99 : ORDER.indexOf(b.stato)));
  const max = Math.max(1, ...rows.map((r) => r.n));
  const runs = data.runs.slice(0, 40);
  const nameOf = (slug: string | null) => data.agents.find((a) => a.slug === slug)?.name.replace("SOLAR - ", "") ?? "—";
  return (
    <div className="mx-auto max-w-[1100px]">
      <PageHeader title="Analisi" sub="I numeri veri: funnel Contatto → Interessato → Qualificato → Partner e i giri della squadra." />
      <SectionTitle title="Funnel" sub="Dal database, in tempo reale" />
      {rows.length === 0 ? <EmptyState title="Funnel non disponibile" hint="La vista kpi_funnel non risponde." /> : (
        <Card className="p-5">
          <div className="space-y-3">
            {rows.map((r) => (
              <div key={r.stato} className="grid grid-cols-[120px_1fr_80px] items-center gap-3 text-sm">
                <div className="font-semibold text-ink-2">{r.stato}</div>
                <div className="h-3 overflow-hidden rounded-full bg-card-2"><div className="h-full rounded-full bg-brand-500" style={{ width: `${Math.max(2, (r.n / max) * 100)}%` }} /></div>
                <div className="num text-right font-display font-bold text-ink">{r.n.toLocaleString("it-IT")}</div>
              </div>
            ))}
          </div>
        </Card>
      )}
      <div className="mt-10">
        <SectionTitle title="Riepilogo del Data Analyst" sub="Ogni sera alle 20:00" />
        {rep ? (
          <Card className="p-5">
            <div className="flex items-center gap-3"><Kicker>Report</Kicker><span className="text-xs text-ink-3">{rep.data ?? ""}</span></div>
            {rep.sintesi && <p className="mt-2 text-sm text-ink-2">{rep.sintesi}</p>}
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
              {[["Cosa ha funzionato", rep.cosa_ha_funzionato], ["Cosa no", rep.cosa_no], ["Domani", rep.domani]].map(([t, list]) => (
                <div key={t as string}><Kicker>{t as string}</Kicker><ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ink-2">{((list as string[] | undefined) ?? []).map((x) => <li key={x}>{x}</li>)}</ul></div>
              ))}
            </div>
          </Card>
        ) : <EmptyState title="Nessun report ancora" hint="Il Data Analyst chiude la giornata alle 20:00, dopo il collaudo." />}
      </div>
      <div className="mt-10">
        <SectionTitle title="Tutti i giri" right={`${runs.length} recenti`} />
        {runs.length === 0 ? <EmptyState title="Nessun giro registrato" /> : (
          <Table head={["Quando", "Ruolo", "Esito", "Riepilogo", "Item"]}>
            {runs.map((r) => (
              <tr key={r.id} className="align-top">
                <td className="num whitespace-nowrap px-4 py-3 text-ink-2">{fmtDateTime(r.started_at)}</td>
                <td className="px-4 py-3 font-semibold text-ink">{nameOf(r.agent_slug)}</td>
                <td className="px-4 py-3"><Badge tone={r.status === "ok" ? "ok" : r.status === "error" ? "err" : "gold"}>{r.status === "ok" ? "Pulito" : r.status === "error" ? "Errore" : "In corso"}</Badge></td>
                <td className="px-4 py-3 text-ink-2">{r.summary ?? "—"}</td>
                <td className="num px-4 py-3 text-ink-2">{r.items}</td>
              </tr>
            ))}
          </Table>
        )}
      </div>
    </div>
  );
}
