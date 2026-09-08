"use client";
import { Coins, Cpu, Wallet } from "lucide-react";
import { useData } from "@/lib/store";
import { Card, Kicker, SectionTitle } from "./ui";

type Fisso = { voce: string; note?: string; eur_mese?: number | null };
type Costi = { fissi?: Fisso[]; nota?: string };
type Kie = { saldo?: number | null; usati_mese?: number | null; pezzi_mese?: number | null; eur_per_credito?: number | null; aggiornato?: string };

/** Costi fissi dichiarati da Valerio (8/9). Le voci senza numero restano "da verificare". */
const DEFAULT_FISSI: Fisso[] = [
  { voce: "Unipile (LinkedIn + Instagram)", note: "Piano fisso, non a consumo", eur_mese: 49 },
  { voce: "OmniSocials (scheduler social)", note: "Circa 10 $/mese", eur_mese: 9.2 },
  { voce: "Railway (hosting dashboard)", note: "Circa 5 $/mese", eur_mese: 4.6 },
  { voce: "Supabase (database)", note: "Progetto solarback, 10 $/mese", eur_mese: 9.2 },
  { voce: "Kie AI (ricarica crediti)", note: "Circa 50 $/mese di crediti", eur_mese: 46 },
  { voce: "Claude (abbonamento)", note: "Il team gira sulla tua subscription", eur_mese: null },
];

export default function CostPanel() {
  const { data } = useData();
  const costi = (data.kv["costi"] as Costi | undefined) ?? {};
  const kie = (data.kv["kie"] as Kie | undefined) ?? {};
  const fissi = costi.fissi?.length ? costi.fissi : DEFAULT_FISSI;
  const certi = fissi.filter((f) => typeof f.eur_mese === "number");
  const stima = certi.reduce((s, f) => s + (f.eur_mese ?? 0), 0);
  const eurCredito = typeof kie.eur_per_credito === "number" ? kie.eur_per_credito : null;
  const kieEur = eurCredito !== null && typeof kie.usati_mese === "number" ? kie.usati_mese * eurCredito : null;
  const mese = new Intl.DateTimeFormat("it-IT", { month: "long", year: "numeric" }).format(new Date());
  return (
    <div className="mb-8">
      <SectionTitle title="Quanto costa il team" sub="Fissi dichiarati + consumo Kie del mese. Le voci senza numero non sono incluse." right={`Uso di ${mese}`} />
      <Card className="overflow-hidden">
        <div className="grid grid-cols-1 divide-y divide-line md:grid-cols-3 md:divide-x md:divide-y-0">
          <div className="bg-brand-500/6 p-5">
            <div className="flex items-center justify-between"><Kicker>Stima al mese</Kicker><Wallet size={16} className="text-brand-500" /></div>
            <div className="num mt-3 font-display text-3xl font-extrabold text-ink">{stima.toLocaleString("it-IT", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €</div>
            <div className="mt-2 text-xs text-ink-3">{certi.length} voci certe{fissi.length - certi.length ? ` · ${fissi.length - certi.length} da verificare` : ""}</div>
          </div>
          <div className="p-5">
            <div className="flex items-center justify-between"><Kicker>Crediti Kie usati</Kicker><Cpu size={16} className="text-brand-500" /></div>
            <div className="num mt-3 font-display text-3xl font-extrabold text-ink">{typeof kie.usati_mese === "number" ? kie.usati_mese.toLocaleString("it-IT") : "—"}</div>
            <div className="mt-2 text-xs text-ink-3">{typeof kie.saldo === "number" ? `${kie.saldo.toLocaleString("it-IT")} crediti di saldo` : "saldo: lo aggiorna il Data Analyst"}{typeof kie.pezzi_mese === "number" ? ` · ${kie.pezzi_mese} pezzi generati` : ""}</div>
          </div>
          <div className="p-5">
            <div className="flex items-center justify-between"><Kicker>Kie in euro</Kicker><Coins size={16} className="text-brand-500" /></div>
            <div className="num mt-3 font-display text-3xl font-extrabold text-ink">{kieEur !== null ? `${kieEur.toLocaleString("it-IT", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €` : "—"}</div>
            <div className="mt-2 text-xs text-ink-3">{eurCredito !== null ? `a ${eurCredito.toLocaleString("it-IT", { maximumFractionDigits: 4 })} €/credito` : "€/credito: da verificare sulla ricarica"}</div>
          </div>
        </div>
        <div className="border-t border-line p-5">
          <Kicker className="mb-3">Costi fissi mensili</Kicker>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {fissi.map((f) => (
              <div key={f.voce} className="flex items-center justify-between rounded-xl border border-line bg-card-2 px-4 py-3">
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold text-ink">{f.voce}</div>
                  {f.note && <div className="text-xs text-ink-3">{f.note}</div>}
                </div>
                <div className="num ml-3 shrink-0 font-display text-sm font-bold text-brand-200">{typeof f.eur_mese === "number" ? `${f.eur_mese.toLocaleString("it-IT", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €/mese` : "da verificare"}</div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
