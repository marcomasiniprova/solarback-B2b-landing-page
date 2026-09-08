"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { CalendarClock, ChevronRight, Clock, Hash } from "lucide-react";
import type { Agent } from "@/lib/types";
import { fmtNext, kindLabel, nextCron, relTime } from "@/lib/utils";
import { Avatar, Badge, Dot } from "./ui";

export type StatusView = { label: string; tone: "gold" | "muted" | "warn" | "err" | "live"; dot: "gold" | "muted" | "warn" | "err"; pulse: boolean };
export function statusOf(a: Agent): StatusView {
  if (a.status === "working") return { label: "Al lavoro", tone: "gold", dot: "gold", pulse: true };
  if (a.status === "error") return { label: "Errore", tone: "err", dot: "err", pulse: false };
  if (a.status === "paused") return { label: "In pausa", tone: "warn", dot: "warn", pulse: false };
  if (a.kind === "live") return { label: "Live", tone: "live", dot: "gold", pulse: true };
  return { label: "In attesa", tone: "muted", dot: "muted", pulse: false };
}

export default function AgentCard({ agent, index = 0 }: { agent: Agent; index?: number }) {
  const next = agent.status === "paused" ? null : nextCron(agent.cron);
  const st = statusOf(agent);
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04, duration: 0.35 }} className="h-full">
      <Link href={`/agenti/${agent.slug}`} className="group flex h-full flex-col rounded-card border border-line bg-card p-5 shadow-card transition-all hover:-translate-y-0.5 hover:border-line-strong hover:shadow-lift">
        <div className="flex items-start gap-3.5">
          <Avatar src={agent.avatar} alt={agent.name} size={44} live={agent.status === "working"} />
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="truncate font-display text-[15px] font-bold tracking-tight text-ink">{agent.name}</div>
                <div className="font-display text-[13px] font-semibold text-brand-400">{agent.role}</div>
              </div>
              <Badge tone={st.tone} className="shrink-0"><Dot tone={st.dot} pulse={st.pulse} />{st.label}</Badge>
            </div>
            {agent.tagline && <div className="mt-1 text-xs italic text-ink-3">“{agent.tagline}”</div>}
            <div className="mt-2 flex flex-wrap gap-1.5">
              <Badge tone="muted">{agent.department}</Badge>
              <Badge tone="muted">{agent.schedule_label ?? kindLabel[agent.kind]}</Badge>
            </div>
          </div>
        </div>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-2">{agent.current_task ? <span className="text-brand-100">{agent.current_task}</span> : agent.description}</p>
        <div className="mt-4 flex items-center justify-between border-t border-line pt-3 text-[12px] text-ink-3">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="inline-flex items-center gap-1.5"><Clock size={13} /> Ultimo: <b className="text-ink-2">{relTime(agent.last_run_at)}</b></span>
            <span className="inline-flex items-center gap-1.5"><CalendarClock size={13} /> Prossimo: <b className="text-ink-2">{agent.status === "paused" ? "in pausa" : fmtNext(next)}</b></span>
            <span className="inline-flex items-center gap-1.5"><Hash size={13} /> Oggi: <b className="num text-ink-2">{agent.today_count}</b></span>
          </div>
          <ChevronRight size={16} className="shrink-0 text-ink-3 transition-all group-hover:translate-x-0.5 group-hover:text-brand-400" />
        </div>
      </Link>
    </motion.div>
  );
}
