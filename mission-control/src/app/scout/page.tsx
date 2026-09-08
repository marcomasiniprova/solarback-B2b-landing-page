"use client";
import PageHeader from "@/components/PageHeader";
import FeedRail from "@/components/FeedRail";
import { useData } from "@/lib/store";
import { Card, EmptyState, Kicker, SectionTitle, Stat } from "@/components/ui";

type Ultimo = { quando?: string; nuovi_titolari?: number; nuove_email?: number; costo_usd?: number; attore?: string; note?: string };

export default function Page() {
  const { data } = useData();
  const l = data.kpiListe;
  const u = data.kv["scout:ultimo"] as Ultimo | undefined;
  return (
    <div className="mx-auto max-w-[1100px]">
      <PageHeader title="Scout" sub="Chi trova le aziende: il database vivo di SolarBack, ogni mattina più ricco." />
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Aziende in Lista Target" value={<span className="num">{l ? l.lista_target.toLocaleString("it-IT") : "—"}</span>} sub={l ? `su ${l.aziende_totali.toLocaleString("it-IT")} totali` : "dal DB"} />
        <Stat label="Email del titolare" value={<span className="num">{l ? l.email_titolare.toLocaleString("it-IT") : "—"}</span>} sub="decisori nominativi" />
        <Stat label="Pronte per cold email" value={<span className="num">{l ? l.cold_email_pronte.toLocaleString("it-IT") : "—"}</span>} sub="verificate, in lista" />
        <Stat label="Con telefono" value={<span className="num">{l ? l.cold_call_con_telefono.toLocaleString("it-IT") : "—"}</span>} sub="per le call di Valerio" />
      </div>
      <SectionTitle title="Ultimo giro dello Scout" />
      {u ? (
        <Card className="p-5">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div><Kicker>Nuovi titolari</Kicker><div className="num mt-1 font-display text-xl font-bold text-ink">{u.nuovi_titolari ?? "—"}</div></div>
            <div><Kicker>Nuove email</Kicker><div className="num mt-1 font-display text-xl font-bold text-ink">{u.nuove_email ?? "—"}</div></div>
            <div><Kicker>Costo giro</Kicker><div className="num mt-1 font-display text-xl font-bold text-ink">{typeof u.costo_usd === "number" ? `${u.costo_usd.toFixed(2)} $` : "—"}</div></div>
            <div><Kicker>Attore</Kicker><div className="mt-1 font-display text-sm font-bold text-ink">{u.attore ?? "—"}</div></div>
          </div>
          {u.note && <p className="mt-3 text-sm text-ink-2">{u.note}</p>}
        </Card>
      ) : <EmptyState title="Lo Scout non ha ancora fatto un giro" hint="Registro attori: docs/18. Cap di spesa per giro." />}
      <div className="mt-10"><FeedRail title="Attività dello Scout" agentFilter="solar-scout" limit={30} /></div>
    </div>
  );
}
