"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, CalendarClock, Clock, Hash, ListChecks, ShieldCheck, Sparkles, Wrench } from "lucide-react";
import { useData } from "@/lib/store";
import { agentSpecs } from "@/lib/agentSpecs";
import { fmtDateTime, fmtNext, kindLabel, nextCron, relTime, statusLabel } from "@/lib/utils";
import LiveBadge from "@/components/LiveBadge";
import FeedRail from "@/components/FeedRail";
import { Avatar, Badge, Card, Dot, EmptyState, Kicker, SectionTitle, Table } from "@/components/ui";

export default function AgentPage() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug ?? "";
  const { data } = useData();
  const agent = data.agents.find((a) => a.slug === slug);
  const spec = agentSpecs[slug];
  if (!agent) {
    return (
      <div className="mx-auto max-w-[1100px]">
        <Link href="/" className="inline-flex items-center gap-1 text-sm text-ink-3 hover:text-ink"><ArrowLeft size={14} /> Mission Control</Link>
        <div className="mt-6"><EmptyState title="Ruolo non trovato" hint={`Nessun agente con slug “${slug}”.`} /></div>
      </div>
    );
  }
  const runs = data.runs.filter((r) => r.agent_slug === agent.slug).slice(0, 30);
  const next = agent.status === "paused" ? null : nextCron(agent.cron);
  const tone = agent.status === "working" ? "gold" : agent.status === "error" ? "err" : agent.status === "paused" ? "warn" : "muted";
  return (
    <div className="mx-auto max-w-[1100px]">
      <Link href="/" className="inline-flex items-center gap-1 text-sm text-ink-3 hover:text-ink"><ArrowLeft size={14} /> Mission Control</Link>
      <Card className="mt-4 p-6">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="flex items-start gap-5">
            <Avatar src={agent.avatar} alt={agent.name} size={84} />
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="font-display text-2xl font-extrabold tracking-tight text-ink">{agent.name}</h1>
                <Badge tone={tone}><Dot tone={agent.status === "working" ? "gold" : agent.status === "error" ? "err" : agent.status === "paused" ? "warn" : "muted"} pulse={agent.status === "working"} />{statusLabel[agent.status]}</Badge>
                <Badge tone={agent.kind === "live" ? "gold" : "muted"}>{kindLabel[agent.kind]}</Badge>
              </div>
              <div className="mt-1 text-sm font-semibold text-brand-400">{agent.role}</div>
              <p className="mt-2 max-w-2xl text-sm text-ink-2">{agent.description}</p>
            </div>
          </div>
          <LiveBadge />
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4 border-t border-line pt-5 md:grid-cols-4">
          <div><Kicker><Clock size={12} className="mr-1 inline" />Ultimo giro</Kicker><div className="mt-1 font-display font-bold text-ink">{relTime(agent.last_run_at)}</div></div>
          <div><Kicker><CalendarClock size={12} className="mr-1 inline" />Prossimo</Kicker><div className="mt-1 font-display font-bold text-ink">{agent.status === "paused" ? "in pausa" : fmtNext(next)}</div></div>
          <div><Kicker>Cadenza</Kicker><div className="mt-1 font-display font-bold text-ink">{agent.schedule_label ?? "—"}</div></div>
          <div><Kicker><Hash size={12} className="mr-1 inline" />Prodotto oggi</Kicker><div className="num mt-1 font-display font-bold text-ink">{agent.today_count}</div></div>
        </div>
      </Card>

      {spec && (
        <Card className="mt-6 overflow-hidden">
          <div className="border-b border-line bg-brand-500/6 p-5">
            <div className="flex items-center gap-2 font-display font-bold text-ink"><Sparkles size={16} className="text-brand-500" /> Come lavora</div>
            <p className="mt-2 text-sm leading-relaxed text-ink-2">{spec.comeLavora}</p>
            <div className="mt-2 text-xs text-brand-200">Stato: {spec.stato}</div>
          </div>
          <div className="grid grid-cols-1 divide-y divide-line md:grid-cols-2 md:divide-x md:divide-y-0">
            <div className="p-5">
              <Kicker className="mb-3"><Wrench size={12} className="mr-1 inline" />Tool collegati</Kicker>
              <ul className="space-y-2">
                {spec.tools.map((t) => (
                  <li key={t.name} className="flex gap-3 text-sm"><Badge tone="gold" className="shrink-0">{t.name}</Badge><span className="text-ink-2">{t.desc}</span></li>
                ))}
              </ul>
            </div>
            <div className="p-5">
              <Kicker className="mb-3">Skill</Kicker>
              <ul className="list-disc space-y-1.5 pl-5 text-sm text-ink-2">{spec.skill.map((s) => <li key={s}>{s}</li>)}</ul>
            </div>
            <div className="p-5">
              <Kicker className="mb-3"><ListChecks size={12} className="mr-1 inline" />Il suo giro, passo per passo</Kicker>
              <ol className="space-y-2.5">
                {spec.giro.map((g, i) => (
                  <li key={g.t} className="flex gap-3 text-sm">
                    <span className="num mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-500 text-[11px] font-bold text-deep">{i + 1}</span>
                    <span><b className="text-ink">{g.t}</b> <span className="text-ink-3">·</span> <span className="text-ink-2">{g.d}</span></span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="p-5">
              <Kicker className="mb-3"><ShieldCheck size={12} className="mr-1 inline" />Regole dure</Kicker>
              <ul className="space-y-1.5 text-sm text-ink-2">{spec.regole.map((r) => <li key={r} className="flex gap-2"><ShieldCheck size={14} className="mt-0.5 shrink-0 text-brand-500" />{r}</li>)}</ul>
            </div>
          </div>
        </Card>
      )}

      <div className="mt-8">
        <SectionTitle title="Storico giri" right={`${runs.length} registrati`} />
        {runs.length === 0 ? <EmptyState title="Nessun giro ancora" hint="Il primo giro lo lanciamo insieme, in collaudo." /> : (
          <Table head={["Quando", "Esito", "Riepilogo", "Item"]}>
            {runs.map((r) => (
              <tr key={r.id} className="align-top">
                <td className="num whitespace-nowrap px-4 py-3 text-ink-2">{fmtDateTime(r.started_at)}</td>
                <td className="px-4 py-3"><Badge tone={r.status === "ok" ? "ok" : r.status === "error" ? "err" : "gold"}>{r.status === "ok" ? "Pulito" : r.status === "error" ? "Errore" : "In corso"}</Badge></td>
                <td className="px-4 py-3 text-ink-2">{r.summary ?? "—"}</td>
                <td className="num px-4 py-3 text-ink-2">{r.items}</td>
              </tr>
            ))}
          </Table>
        )}
      </div>
      <div className="mt-8"><FeedRail title="Attività del ruolo" agentFilter={agent.slug} limit={30} /></div>
    </div>
  );
}
