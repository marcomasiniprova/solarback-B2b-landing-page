"use client";
import PageHeader from "@/components/PageHeader";
import ApprovalList from "@/components/ApprovalList";
import { useData } from "@/lib/store";
import { Card, EmptyState, Kicker, SectionTitle } from "@/components/ui";
import { fmtDateTime } from "@/lib/utils";

type Piano = { data?: string; tema?: string; angolo?: string; hook?: string[]; note?: string; formati?: string[] };

export default function Page() {
  const { data } = useData();
  const piano = data.kv["piano:oggi"] as Piano | undefined;
  const items = data.approvals.filter((a) => ["post", "carosello", "video"].includes(a.kind));
  const assets = data.assets.slice(0, 24);
  return (
    <div className="mx-auto max-w-[1100px]">
      <PageHeader title="Contenuti" sub="Piano del giorno, caroselli e video: prima in attesa, poi pubblicati." />
      <SectionTitle title="Piano di oggi" sub="Lo scrive SOLAR - CONTENT STRATEGIST ogni mattina" />
      {piano ? (
        <Card className="p-5">
          <div className="flex flex-wrap gap-6">
            <div><Kicker>Tema</Kicker><div className="mt-1 font-display font-bold text-ink">{piano.tema ?? "—"}</div></div>
            <div><Kicker>Angolo</Kicker><div className="mt-1 text-ink-2">{piano.angolo ?? "—"}</div></div>
            {piano.formati && <div><Kicker>Formati</Kicker><div className="mt-1 text-ink-2">{piano.formati.join(", ")}</div></div>}
          </div>
          {piano.hook?.length ? <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-ink-2">{piano.hook.map((h) => <li key={h}>{h}</li>)}</ul> : null}
          {piano.note && <p className="mt-3 text-xs text-ink-3">{piano.note}</p>}
        </Card>
      ) : <EmptyState title="Nessun piano per oggi" hint="Quando il Content Strategist fa il suo giro, il piano compare qui." />}
      <div className="mt-10"><SectionTitle title="Bozze contenuti" right={`${items.length}`} /><ApprovalList items={items} /></div>
      <div className="mt-10">
        <SectionTitle title="Asset prodotti" right={`${assets.length}`} />
        {assets.length === 0 ? <EmptyState title="Nessun asset ancora" hint="Immagini e video salvati dai ruoli compaiono qui." /> : (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {assets.map((as) => (
              <a key={as.id} href={as.url} target="_blank" rel="noreferrer" className="group overflow-hidden rounded-card border border-line bg-card">
                {as.content_type?.startsWith("image/") ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={as.url} alt={as.kind ?? "asset"} className="aspect-square w-full object-cover transition-transform group-hover:scale-[1.02]" />
                ) : <div className="flex aspect-square items-center justify-center text-xs text-ink-3">{as.content_type ?? "file"}</div>}
                <div className="px-3 py-2 text-[11px] text-ink-3">{as.kind ?? "asset"} · {fmtDateTime(as.created_at)}</div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
