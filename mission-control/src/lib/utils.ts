import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
export const TZ = "Europe/Rome";

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export function fmtClock(d: Date): string {
  return new Intl.DateTimeFormat("it-IT", { timeZone: TZ, hour: "2-digit", minute: "2-digit", second: "2-digit" }).format(d);
}
export function fmtDateLong(d: Date): string {
  return cap(new Intl.DateTimeFormat("it-IT", { timeZone: TZ, weekday: "long", day: "numeric", month: "long" }).format(d));
}
export function fmtDateTime(iso?: string | null): string {
  if (!iso) return "—";
  const d = new Date(iso);
  return new Intl.DateTimeFormat("it-IT", { timeZone: TZ, day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" }).format(d);
}
export function fmtTimeShort(iso?: string | null): string {
  if (!iso) return "—";
  return new Intl.DateTimeFormat("it-IT", { timeZone: TZ, hour: "2-digit", minute: "2-digit" }).format(new Date(iso));
}
export function relTime(iso?: string | null): string {
  if (!iso) return "mai";
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.round(diff / 60000);
  if (m < 1) return "adesso";
  if (m < 60) return `${m} min fa`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h} ${h === 1 ? "ora" : "ore"} fa`;
  const d = Math.round(h / 24);
  if (d === 1) return "ieri";
  return `${d} giorni fa`;
}
export function isTodayRome(iso?: string | null): boolean {
  if (!iso) return false;
  const f = new Intl.DateTimeFormat("it-IT", { timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit" });
  return f.format(new Date(iso)) === f.format(new Date());
}

/* ---------- cron (UTC) → prossimo giro ---------- */
function field(expr: string, min: number, max: number): (n: number) => boolean {
  if (expr === "*") return () => true;
  const parts = expr.split(",");
  const preds = parts.map((p) => {
    const [range, stepStr] = p.split("/");
    const step = stepStr ? parseInt(stepStr, 10) : 1;
    let lo = min, hi = max;
    if (range !== "*") {
      const [a, b] = range.split("-");
      lo = parseInt(a, 10);
      hi = b !== undefined ? parseInt(b, 10) : lo;
    }
    return (n: number) => n >= lo && n <= hi && (n - lo) % step === 0;
  });
  return (n: number) => preds.some((f) => f(n));
}
/** Calcola la prossima occorrenza di un cron a 5 campi (interpretato in UTC). Cerca fino a 8 giorni. */
export function nextCron(cron?: string | null, from: Date = new Date()): Date | null {
  if (!cron) return null;
  const f = cron.trim().split(/\s+/);
  if (f.length !== 5) return null;
  try {
    const [mi, ho, dom, mon, dow] = [field(f[0], 0, 59), field(f[1], 0, 23), field(f[2], 1, 31), field(f[3], 1, 12), field(f[4], 0, 6)];
    const t = new Date(from.getTime());
    t.setUTCSeconds(0, 0);
    t.setUTCMinutes(t.getUTCMinutes() + 1);
    const limit = from.getTime() + 8 * 86400000;
    while (t.getTime() < limit) {
      if (mon(t.getUTCMonth() + 1) && dom(t.getUTCDate()) && dow(t.getUTCDay()) && ho(t.getUTCHours()) && mi(t.getUTCMinutes())) return t;
      t.setUTCMinutes(t.getUTCMinutes() + 1);
    }
  } catch { return null; }
  return null;
}
export function fmtNext(d: Date | null): string {
  if (!d) return "—";
  const dayF = new Intl.DateTimeFormat("it-IT", { timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit" });
  const today = dayF.format(new Date());
  const tomorrow = dayF.format(new Date(Date.now() + 86400000));
  const day = dayF.format(d);
  const hm = new Intl.DateTimeFormat("it-IT", { timeZone: TZ, hour: "2-digit", minute: "2-digit" }).format(d);
  if (day === today) return `oggi ${hm}`;
  if (day === tomorrow) return `domani ${hm}`;
  const wd = new Intl.DateTimeFormat("it-IT", { timeZone: TZ, weekday: "short" }).format(d);
  return `${wd} ${hm}`;
}

export const statusLabel: Record<string, string> = {
  idle: "In attesa",
  working: "Al lavoro",
  error: "Errore",
  paused: "In pausa",
};
export const kindLabel: Record<string, string> = { daily: "Giornaliero", live: "Sempre live" };
