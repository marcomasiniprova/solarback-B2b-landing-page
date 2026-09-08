"use client";
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { hasSupabase, supabaseBrowser } from "./supabase";
import type { Mode, Snapshot } from "./types";
import { fetchSnapshot } from "./snapshot";
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
    if (!hasSupabase) return;
    try {
      let snap: Snapshot | null = null;
      try {
        const r = await fetch("/api/snapshot", { cache: "no-store" });
        const j = (await r.json()) as { ok: boolean; snapshot?: Snapshot; error?: string };
        if (r.ok && j.ok && j.snapshot) snap = j.snapshot;
        else throw new Error(j.error || `HTTP ${r.status}`);
      } catch {
        const sb = supabaseBrowser();
        if (!sb) throw new Error("Supabase non configurato");
        snap = await fetchSnapshot(sb);
      }
      setData(snap);
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
