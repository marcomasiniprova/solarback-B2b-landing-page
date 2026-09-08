import type { Snapshot } from "./types";

const now = new Date().toISOString();
const a = (slug: string, name: string, role: string, department: string, kind: "daily" | "live", tagline: string, description: string, schedule_label: string, cron: string, sort: number, status: "idle" | "paused" = "idle") => ({
  slug, name, role, department, kind, tagline, description, avatar: `/avatars/${slug}.svg`, status, current_task: null, last_run_at: null,
  schedule_label, cron, today_count: 0, color: "#d9a441", sort, updated_at: now,
});

/** Snapshot statico: serve solo a vedere la dashboard senza DB (modalità Demo). */
export const demoSnapshot: Snapshot = {
  agents: [
    a("solar-content-strategist", "SOLAR - CONTENT STRATEGIST", "Il cervello dei contenuti", "Contenuti", "daily", "La mente del team", "Legge i numeri veri e decide il piano contenuti del giorno.", "Ogni mattina alle 07:30", "30 5 * * *", 10),
    a("solar-caroselli", "SOLAR - CAROSELLI", "I post che fanno salvare", "Contenuti", "daily", "La mano che fa salvare", "Trasforma il piano in caroselli on-brand, pronti da approvare.", "Ogni mattina alle 08:00", "0 6 * * *", 20),
    a("solar-video", "SOLAR - VIDEO", "La macchina dei video", "Contenuti", "daily", "Il regista", "Un video short al giorno nato dal piano. Solo dopo collaudo.", "Ogni mattina alle 08:30", "30 6 * * *", 30),
    a("solar-blog", "SOLAR - BLOG", "L'autorità scritta", "Contenuti", "daily", "La penna", "Un articolo SEO a settimana, bozza da approvare.", "Lunedì alle 09:00 (in pausa)", "0 7 * * 1", 40, "paused"),
    a("solar-linkedin", "SOLAR - LINKEDIN DM OUTREACH", "Lo squalo di LinkedIn", "Outreach", "live", "Sempre attivo", "Contatta i titolari, presidia la inbox, fissa meeting.", "Sempre live: ogni ora 08-20", "0 6-18 * * *", 50),
    a("solar-instagram", "SOLAR - INSTAGRAM DM OUTREACH", "Lo squalo di Instagram", "Outreach", "live", "Sempre attivo", "Stessa missione su Instagram.", "Sempre live: ogni ora 08-20", "30 6-18 * * *", 60),
    a("solar-scout", "SOLAR - SCOUT", "Il cercatore", "Dati", "daily", "Chi trova le aziende", "Trova nuove aziende e titolari in target e arricchisce il DB.", "Ogni mattina alle 07:00", "0 5 * * *", 70),
    a("solar-data-analyst", "SOLAR - DATA ANALYST", "I numeri, ogni sera", "Dati", "daily", "Chi chiude la giornata", "Chiude la giornata con KPI e funnel.", "Ogni sera alle 20:00", "0 18 * * *", 80),
  ],
  runs: [],
  feed: [{ id: 1, ts: now, agent_slug: null, kind: "system", message: "Modalità demo: nessun database collegato." }],
  kv: {},
  approvals: [],
  assets: [],
  outreach: [],
  meetings: [],
  kpiFunnel: [],
  kpiListe: null,
};
