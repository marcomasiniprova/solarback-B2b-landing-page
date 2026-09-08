"use client";
import { AlertTriangle, Bot, CheckCircle2, Info, Sparkles, UserCheck } from "lucide-react";
import type { FeedItem } from "@/lib/types";
import { useData } from "@/lib/store";
import { fmtTimeShort, relTime } from "@/lib/utils";
import { Card, EmptyState, SectionTitle } from "./ui";

function icon(kind: string) {
  switch (kind) {
    case "error": return <AlertTriangle size={14} className="text-err" />;
    case "ok": case "done": return <CheckCircle2 size={14} className="text-brand-400" />;
    case "decision": return <UserCheck size={14} className="text-brand-400" />;
    case "system": return <Sparkles size={14} className="text-brand-500" />;
    case "run": return <Bot size={14} className="text-ink-3" />;
    default: return <Info size={14} className="text-ink-3" />;
  }
}

export default function FeedRail({ items, limit = 40, title = "Cosa succede", agentFilter }: { items?: FeedItem[]; limit?: number; title?: string; agentFilter?: string }) {
  const { data } = useData();
  const list = (items ?? data.feed).filter((f) => !agentFilter || f.agent_slug === agentFilter).slice(0, limit);
  const nameOf = (slug: string | null) => data.agents.find((a) => a.slug === slug)?.name.replace("SOLAR - ", "") ?? (slug ? slug : "Sistema");
  return (
    <div>
      <SectionTitle title={title} sub="Il flusso di attività della squadra" right={list[0] ? `ultimo: ${relTime(list[0].ts)}` : undefined} />
      <Card className="max-h-[720px] overflow-y-auto">
        {list.length === 0 ? (
          <div className="p-4"><EmptyState title="Ancora nessuna attività" hint="Quando un ruolo fa un giro, lo vedi qui in tempo reale." /></div>
        ) : (
          <ul className="divide-y divide-line">
            {list.map((f) => (
              <li key={f.id} className="flex gap-3 px-4 py-3">
                <div className="mt-0.5">{icon(f.kind)}</div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm leading-snug text-ink-2">{f.message}</div>
                  <div className="mt-1 flex items-center gap-2 text-[11px] text-ink-3">
                    <span className="font-semibold text-brand-400/90">{nameOf(f.agent_slug)}</span>
                    <span>·</span>
                    <span className="num">{fmtTimeShort(f.ts)}</span>
                    <span>·</span>
                    <span>{relTime(f.ts)}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
