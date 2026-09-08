"use client";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("rounded-card border border-line bg-card shadow-card", className)}>{children}</div>;
}
export function Kicker({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-3", className)}>{children}</div>;
}
export function SectionTitle({ title, sub, right }: { title: string; sub?: string; right?: ReactNode }) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4">
      <div>
        <h2 className="font-display text-lg font-bold text-ink">{title}</h2>
        {sub && <p className="text-sm text-ink-3">{sub}</p>}
      </div>
      {right && <div className="text-xs text-ink-3">{right}</div>}
    </div>
  );
}
type BadgeTone = "gold" | "muted" | "warn" | "err" | "ok" | "live";
export function Badge({ tone = "muted", children, className }: { tone?: BadgeTone; children: ReactNode; className?: string }) {
  const tones: Record<BadgeTone, string> = {
    gold: "border-brand-500/35 bg-brand-500/12 text-brand-200",
    muted: "border-line-strong bg-card-2 text-ink-2",
    warn: "border-warn/40 bg-warn/10 text-brand-100",
    err: "border-err/40 bg-err/10 text-red-300",
    ok: "border-brand-500/35 bg-brand-500/12 text-brand-200",
    live: "border-brand-500/35 bg-brand-500/12 text-brand-200",
  };
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold", tones[tone], className)}>
      {children}
    </span>
  );
}
export function Dot({ tone = "gold", pulse = false }: { tone?: "gold" | "muted" | "err" | "warn"; pulse?: boolean }) {
  const c = { gold: "bg-brand-500", muted: "bg-ink-3", err: "bg-err", warn: "bg-warn" }[tone];
  return (
    <span className="relative inline-flex h-2 w-2">
      {pulse && <span className={cn("absolute inline-flex h-full w-full animate-ping rounded-full opacity-60", c)} />}
      <span className={cn("relative inline-flex h-2 w-2 rounded-full", c)} />
    </span>
  );
}
export function Stat({ label, value, sub, icon }: { label: string; value: ReactNode; sub?: ReactNode; icon?: ReactNode }) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <Kicker>{label}</Kicker>
        {icon && <span className="text-brand-500">{icon}</span>}
      </div>
      <div className="num mt-3 font-display text-4xl font-extrabold tracking-tight text-ink">{value}</div>
      {sub && <div className="mt-2 text-xs text-ink-3">{sub}</div>}
    </Card>
  );
}
export function EmptyState({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="rounded-card border border-dashed border-line-strong px-6 py-10 text-center">
      <div className="font-display text-sm font-semibold text-ink-2">{title}</div>
      {hint && <div className="mt-1 text-xs text-ink-3">{hint}</div>}
    </div>
  );
}
export function Avatar({ src, alt, size = 56, className }: { src?: string | null; alt: string; size?: number; className?: string }) {
  const [failed, setFailed] = useState(false);
  const url = !src || failed ? "/avatars/default.png" : src;
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={url} alt={alt} width={size} height={size} onError={() => setFailed(true)} className={cn("shrink-0 rounded-2xl border border-line-strong bg-card-2 object-contain p-1", className)} />;
}
export function Table({ head, children }: { head: string[]; children: ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-card border border-line">
      <table className="w-full text-sm">
        <thead className="bg-card-2 text-left">
          <tr>{head.map((h) => <th key={h} className="px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-3">{h}</th>)}</tr>
        </thead>
        <tbody className="divide-y divide-line">{children}</tbody>
      </table>
    </div>
  );
}
