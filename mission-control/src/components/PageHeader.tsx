"use client";
import LiveBadge from "./LiveBadge";

export default function PageHeader({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-ink md:text-4xl">{title}</h1>
        {sub && <p className="mt-1 text-sm text-ink-2 md:text-base">{sub}</p>}
      </div>
      <LiveBadge />
    </div>
  );
}
