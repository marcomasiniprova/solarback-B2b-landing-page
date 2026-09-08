"use client";
import PageHeader from "@/components/PageHeader";
import { useData } from "@/lib/store";
import { Badge, Card, EmptyState, SectionTitle, Stat, Table } from "@/components/ui";
import { fmtDateTime, isTodayRome } from "@/lib/utils";

export default function Page() {
  const { data } = useData();
  const today = data.outreach.filter((m) => isTodayRome(m.ts));
  const out = today.filter((m) => m.direction === "out").length;
  const inn = today.filter((m) => m.direction === "in").length;
  const meetings = data.meetings.filter((m) => m.status === "proposed" || m.status === "confirmed");
  return (
    <div className="mx-auto max-w-[1100px]">
      <PageHeader title="Outreach" sub="Gli squali: LinkedIn e Instagram, sempre live. Messaggi, risposte, meeting." />
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Stat label="Messaggi inviati oggi" value={<span className="num">{out}</span>} sub="Entro i volumi approvati" />
        <Stat label="Risposte oggi" value={<span className="num">{inn}</span>} sub="Dalla inbox" />
        <Stat label="Meeting aperti" value={<span className="num">{meetings.length}</span>} sub="Proposti + confermati" />
      </div>
      <SectionTitle title="Meeting" right={`${data.meetings.length} totali`} />
      {data.meetings.length === 0 ? <EmptyState title="Nessun meeting ancora" hint="Quando uno squalo fissa un appuntamento, compare qui." /> : (
        <Table head={["Quando", "Contatto", "Canale", "Stato", "Note"]}>
          {data.meetings.map((m) => (
            <tr key={m.id}>
              <td className="num whitespace-nowrap px-4 py-3 text-ink-2">{fmtDateTime(m.when_at)}</td>
              <td className="px-4 py-3 font-semibold text-ink">{m.contact_name ?? m.contact_ref ?? "—"}</td>
              <td className="px-4 py-3 text-ink-2">{m.channel ?? "—"}</td>
              <td className="px-4 py-3"><Badge tone={m.status === "confirmed" ? "ok" : m.status === "cancelled" ? "err" : "gold"}>{m.status}</Badge></td>
              <td className="px-4 py-3 text-ink-2">{m.notes ?? "—"}</td>
            </tr>
          ))}
        </Table>
      )}
      <div className="mt-10">
        <SectionTitle title="Ultimi messaggi" right={`${data.outreach.length}`} />
        {data.outreach.length === 0 ? <EmptyState title="Nessun messaggio ancora" hint="I DM inviati e ricevuti compaiono qui, in tempo reale." /> : (
          <Card className="divide-y divide-line">
            {data.outreach.slice(0, 60).map((m) => (
              <div key={m.id} className="flex gap-3 px-4 py-3 text-sm">
                <Badge tone={m.direction === "in" ? "gold" : "muted"} className="h-fit shrink-0">{m.direction === "in" ? "↓ ricevuto" : "↑ inviato"}</Badge>
                <div className="min-w-0 flex-1">
                  <div className="text-ink">{m.contact_name ?? m.contact_ref ?? "—"} <span className="text-xs text-ink-3">· {m.channel} · {fmtDateTime(m.ts)} · {m.status}</span></div>
                  {m.message && <div className="mt-1 text-ink-2">{m.message}</div>}
                </div>
              </div>
            ))}
          </Card>
        )}
      </div>
    </div>
  );
}
