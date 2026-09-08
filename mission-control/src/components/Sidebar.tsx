"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BadgeCheck, BarChart3, Images, LayoutGrid, MessagesSquare, PenLine, Radar } from "lucide-react";
import { useData } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Avatar, Dot } from "./ui";
import { LogoMark } from "./Logo";

const NAV = [
  { href: "/", label: "Mission Control", icon: LayoutGrid },
  { href: "/approvazioni", label: "Approvazioni", icon: BadgeCheck, badge: "pending" as const },
  { href: "/contenuti", label: "Contenuti", icon: Images },
  { href: "/outreach", label: "Outreach", icon: MessagesSquare },
  { href: "/scout", label: "Scout", icon: Radar },
  { href: "/blog", label: "Blog", icon: PenLine },
  { href: "/analisi", label: "Analisi", icon: BarChart3 },
];

export default function Sidebar() {
  const path = usePathname();
  const { data, mode } = useData();
  const pending = data.approvals.filter((a) => a.status === "pending").length;
  return (
    <aside className="sticky top-0 hidden h-dvh w-[264px] shrink-0 flex-col border-r border-line bg-base-2 md:flex">
      <div className="flex items-center gap-3 px-5 pb-5 pt-6">
        <LogoMark size={38} />
        <div>
          <div className="font-display text-lg font-extrabold leading-tight text-ink">SolarBack</div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-500">Mission Control</div>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto px-3">
        <ul className="space-y-1">
          {NAV.map(({ href, label, icon: Icon, badge }) => {
            const active = path === href || (href !== "/" && path.startsWith(href));
            const count = badge === "pending" ? pending : 0;
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors",
                    active ? "bg-brand-500/12 text-brand-100 shadow-ring" : "text-ink-2 hover:bg-card-2 hover:text-ink"
                  )}
                >
                  <Icon size={18} className={active ? "text-brand-400" : "text-ink-3"} />
                  <span className="flex-1">{label}</span>
                  {count > 0 && <span className="num rounded-full bg-brand-500 px-2 py-0.5 text-[11px] font-bold text-deep">{count}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="mt-6 px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-3">Squadra</div>
        <ul className="mt-2 space-y-0.5">
          {data.agents.map((a) => {
            const href = `/agenti/${a.slug}`;
            const active = path === href;
            return (
              <li key={a.slug}>
                <Link href={href} className={cn("flex items-center gap-2.5 rounded-lg px-3 py-1.5 text-[13px] transition-colors", active ? "bg-brand-500/12 text-brand-100" : "text-ink-2 hover:bg-card-2 hover:text-ink")}>
                  <Avatar src={a.avatar} alt={a.name} size={22} className="rounded-md" />
                  <span className="flex-1 truncate">{a.name.replace("SOLAR - ", "")}</span>
                  <Dot tone={a.status === "working" ? "gold" : a.status === "error" ? "err" : "muted"} pulse={a.status === "working"} />
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="border-t border-line px-5 py-4">
        <div className="flex items-center gap-2 rounded-xl border border-line bg-card px-3 py-2">
          <Dot tone={mode === "live" ? "gold" : mode === "sync" ? "muted" : "warn"} pulse={mode === "live"} />
          <div>
            <div className="text-xs font-semibold text-ink">{mode === "live" ? "Collegata live" : mode === "sync" ? "Sincronizzazione" : "Modalità demo"}</div>
            <div className="text-[11px] text-ink-3">{mode === "live" ? "Aggiornamenti in tempo reale" : mode === "sync" ? "Poll ogni 45 secondi" : "Nessun database"}</div>
          </div>
        </div>
        <div className="mt-3 text-[11px] text-ink-3">artec AI · SolarBack</div>
      </div>
    </aside>
  );
}
