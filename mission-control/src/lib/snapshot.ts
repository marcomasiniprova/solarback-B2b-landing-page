import type { McClient } from "./supabase";
import type { Agent, AgentRun, Approval, Asset, FeedItem, KpiFunnelRow, KpiListe, Meeting, OutreachMsg, Snapshot } from "./types";

/** Legge tutto lo stato della dashboard dallo schema `mc` (sola lettura). */
export async function fetchSnapshot(sb: McClient): Promise<Snapshot> {
  const [agents, runs, feed, kv, approvals, assets, outreach, meetings, kpiFunnel, kpiListe] = await Promise.all([
    sb.from("agents").select("*").order("sort", { ascending: true }),
    sb.from("agent_runs").select("*").order("started_at", { ascending: false }).limit(300),
    sb.from("activity_feed").select("*").order("ts", { ascending: false }).limit(150),
    sb.from("kv").select("*"),
    sb.from("approvals").select("*").order("created_at", { ascending: false }).limit(200),
    sb.from("assets").select("*").order("created_at", { ascending: false }).limit(100),
    sb.from("outreach_msgs").select("*").order("ts", { ascending: false }).limit(200),
    sb.from("meetings").select("*").order("created_at", { ascending: false }).limit(100),
    sb.from("kpi_funnel").select("*"),
    sb.from("kpi_liste").select("*").maybeSingle(),
  ]);
  const core = [agents, runs, feed, kv, approvals, assets, outreach, meetings];
  const firstErr = core.find((r) => r.error)?.error;
  if (firstErr) throw new Error(firstErr.message);
  const kvMap: Record<string, unknown> = {};
  for (const row of (kv.data ?? []) as { key: string; value: unknown }[]) kvMap[row.key] = row.value;
  return {
    agents: (agents.data ?? []) as Agent[],
    runs: (runs.data ?? []) as AgentRun[],
    feed: (feed.data ?? []) as FeedItem[],
    kv: kvMap,
    approvals: (approvals.data ?? []) as Approval[],
    assets: (assets.data ?? []) as Asset[],
    outreach: (outreach.data ?? []) as OutreachMsg[],
    meetings: (meetings.data ?? []) as Meeting[],
    kpiFunnel: (kpiFunnel.error ? [] : (kpiFunnel.data ?? [])) as KpiFunnelRow[],
    kpiListe: (kpiListe.error ? null : (kpiListe.data ?? null)) as KpiListe | null,
  };
}
