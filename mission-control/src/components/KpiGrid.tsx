"use client";
import { BadgeCheck, Building2, CalendarCheck2, Handshake } from "lucide-react";
import { useData } from "@/lib/store";
import { Stat } from "./ui";

export default function KpiGrid() {
  const { data } = useData();
  const f = Object.fromEntries(data.kpiFunnel.map((r) => [r.stato, r.n]));
  const contatti = f["Contatto"] ?? 0;
  const trattativa = (f["Interessato"] ?? 0) + (f["Qualificato"] ?? 0);
  const partner = f["Partner"] ?? 0;
  const meetings = data.meetings.filter((m) => m.status === "proposed" || m.status === "confirmed").length;
  const pending = data.approvals.filter((a) => a.status === "pending").length;
  const liste = data.kpiListe;
  return (
    <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <Stat label="Lista Target" value={<span className="num">{(liste?.lista_target ?? contatti).toLocaleString("it-IT")}</span>} sub={liste ? `${liste.email_titolare.toLocaleString("it-IT")} con email del titolare · ${liste.cold_call_con_telefono.toLocaleString("it-IT")} con telefono` : "aziende in target, dal DB"} icon={<Building2 size={18} />} />
      <Stat label="In trattativa" value={<span className="num">{trattativa.toLocaleString("it-IT")}</span>} sub={`Interessati + Qualificati · ${partner} Partner`} icon={<Handshake size={18} />} />
      <Stat label="Meeting fissati" value={<span className="num">{meetings}</span>} sub="Dagli squali di LinkedIn e Instagram" icon={<CalendarCheck2 size={18} />} />
      <Stat label="Bozze da approvare" value={<span className="num">{pending}</span>} sub={pending ? "Aspettano il tuo OK" : "Niente in attesa"} icon={<BadgeCheck size={18} />} />
    </div>
  );
}
