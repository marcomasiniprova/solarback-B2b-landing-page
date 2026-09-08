"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { CalendarClock, ChevronRight, Clock, Hash } from "lucide-react";
import type { Agent } from "@/lib/types";
import { fmtNext, kindLabel, nextCron, relTime, statusLabel } from "@/lib/utils";
import { Avatar, Badge, Card, Dot } from "./ui";

export default function AgentCard({ agent, index = 0 }: { agent: Agent; index?: number }) {
  const next = agent.status === "paused" ? null : nextCron(agent.cron);
  const tone = agent.status === "working" ? "gold" : agent.status === "error" ? "err" : agent.status === "paused" ? "warn" : "muted";
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04, duration: 0.35 }}>
      <Card className="group flex h-full flex-col p-5 transition-shadow hover:shadow-lift">
        <div className="flex items-start gap-4">
          <Avatar src={agent.avatar} alt={agent.name} size={56} />
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <div className="truncate font-display text-[15px] font-extrabold tracking-tight text-ink">{agent.name}</div>
                <div className="text-sm font-semibold text-brand-400">{agent.role}</div>
              </div>
              <Badge tone={tone}>
                <Dot tone={agent.status === "working" ? "gold" : agent.status === "error" ? "err" : agent.status === "paused" ? "warn" : "muted"} pulse={agent.status === "working"} />
                {statusLabel[agent.status] ?? agent.status}
              </Badge>
            </div>
            <div className="mt-1 flex flex-wrap gap-1.5">
              <Badge tone="muted">{agent.department}</Badge>
              <Badge tone={agent.kind === "live" ? "gold" : "muted"}>{agent.kind === "live" && <Dot tone="gold" pulse />}{kindLabel[agent.kind]}</Badge>
            </div>
          </div>
        </div>
        {agent.tagline && <div className="mt-3 text-xs italic text-ink-3">“{agent.tagline}”</div>}
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-2">{agent.current_task ? <span className="text-brand-100">{agent.current_task}</span> : agent.description}</p>
        <div className="mt-4 flex items-center justify-between border-t border-line pt-3 text-[12px] text-ink-3">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="inline-flex items-center gap-1.5"><Clock size={13} /> Ultimo: <b className="text-ink-2">{relTime(agent.last_run_at)}</b></span>
            <span className="inline-flex items-center gap-1.5"><CalendarClock size={13} /> Prossimo: <b className="text-ink-2">{agent.status === "paused" ? "in pausa" : fmtNext(next)}</b></span>
            <span className="inline-flex items-center gap-1.5"><Hash size={13} /> Oggi: <b className="num text-ink-2">{agent.today_count}</b></span>
          </div>
          <Link href={`/agenti/${agent.slug}`} className="inline-flex items-center gap-1 font-semibold text-brand-400 opacity-80 transition-opacity group-hover:opacity-100">
            Scheda <ChevronRight size={14} />
          </Link>
        </div>
      </Card>
    </motion.div>
  );
}
