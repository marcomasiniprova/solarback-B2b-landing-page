"use client";
import { useEffect, useState } from "react";
import { useData } from "@/lib/store";
import { fmtClock, fmtDateLong } from "@/lib/utils";
import { Badge, Dot } from "./ui";

export default function LiveBadge() {
  const { mode } = useData();
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    const t0 = setTimeout(() => setNow(new Date()), 0);
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => { clearTimeout(t0); clearInterval(t); };
  }, []);
  const label = mode === "live" ? "Live" : mode === "sync" ? "Sync" : "Demo";
  return (
    <div className="flex items-center gap-4">
      <div className="text-right">
        <div className="num font-display text-lg font-bold text-ink">{now ? fmtClock(now) : "--:--:--"}</div>
        <div className="text-xs text-ink-3">{now ? fmtDateLong(now) : ""}</div>
      </div>
      <Badge tone={mode === "live" ? "live" : mode === "sync" ? "muted" : "warn"} className="px-3 py-1.5 text-xs">
        <Dot tone={mode === "live" ? "gold" : mode === "sync" ? "muted" : "warn"} pulse={mode === "live"} />
        {label}
      </Badge>
    </div>
  );
}
