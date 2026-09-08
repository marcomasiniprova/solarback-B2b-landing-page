"use client";
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { hasSupabase, supabaseBrowser } from "./supabase";
import type { Agent, AgentRun, Approval, Asset, FeedItem, KpiFunnelRow, KpiListe, Meeting, Mode, OutreachMsg, Snapshot } from "./types";
import { demoSnapshot } from "./demo";

type Ctx = {
  data: Snapshot;
  mode: Mode;
  lastSync: Date | null;
  error: string | null;
  refetch: () => Promise<void>;
};

const EMPTY: Snapshot = { agents: [], runs: [], feed: [], kv: {}, approvals: [], assets: [], outreach: [], meetings: [], kpiFunnel: [], kpiListe: null };
const DataContext = createContext<Ctx | null>(null);

/**
 * Il cuore del "live": fetch iniziale + canale Supabase Realtime sullo schema `mc`
 * + poll di sicurezza ogni 45s. Se mancano le chiavi, modalità demo (snapshot statico).
 */
export function DataProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<Snapshot>(hasSupabase ? EMPTY : demoSnapshot);
  const [mode, setMode] = useState<Mode>(hasSupabase ? "sync" : "demo");
  const [lastSync, setLastSync] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);
  const realtimeOk = useRef(false);

  const refetch = useCallback(async () => {
    const sb = supabaseBrowser();
    if (!sb) return;
    try {
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
      setData({
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
      });
      setLastSync(new Date());
      setError(null);
      setMode(realtimeOk.current ? "live" : "sync");
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
  }, []);

  useEffect(() => {
    const sb = supabaseBrowser();
    if (!sb) return;
    const first = setTimeout(() => void refetch(), 0);
    let debounce: ReturnType<typeof setTimeout> | null = null;
    const bump = () => {
      if (debounce) clearTimeout(debounce);
      debounce = setTimeout(() => void refetch(), 300);
    };
    const channel = sb
      .channel("mission-control")
      .on("postgres_changes", { event: "*", schema: "mc" }, bump)
      .subscribe((status) => {
        realtimeOk.current = status === "SUBSCRIBED";
        setMode(status === "SUBSCRIBED" ? "live" : "sync");
      });
    const poll = setInterval(() => void refetch(), 45_000);
    return () => {
      clearTimeout(first);
      clearInterval(poll);
      if (debounce) clearTimeout(debounce);
      void sb.removeChannel(channel);
    };
  }, [refetch]);

  const value = useMemo(() => ({ data, mode, lastSync, error, refetch }), [data, mode, lastSync, error, refetch]);
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData(): Ctx {
  const c = useContext(DataContext);
  if (!c) throw new Error("useData va usato dentro <DataProvider>");
  return c;
}
