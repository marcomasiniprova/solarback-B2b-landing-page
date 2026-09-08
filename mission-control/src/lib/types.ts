export type AgentStatus = "idle" | "working" | "error" | "paused";
export type AgentKind = "daily" | "live";

export type Agent = {
  slug: string;
  name: string;
  role: string;
  department: string;
  kind: AgentKind;
  tagline: string | null;
  description: string | null;
  avatar: string | null;
  status: AgentStatus;
  current_task: string | null;
  last_run_at: string | null;
  schedule_label: string | null;
  cron: string | null;
  today_count: number;
  color: string | null;
  sort: number;
  updated_at: string | null;
};

export type AgentRun = {
  id: number;
  agent_slug: string | null;
  started_at: string;
  finished_at: string | null;
  status: "running" | "ok" | "error";
  summary: string | null;
  items: number;
};

export type FeedItem = {
  id: number;
  ts: string;
  agent_slug: string | null;
  kind: string;
  message: string;
};

export type Approval = {
  id: number;
  agent_slug: string | null;
  kind: string;
  title: string;
  payload: Record<string, unknown>;
  status: "pending" | "approved" | "rejected";
  note: string | null;
  created_at: string;
  decided_at: string | null;
};

export type Asset = {
  id: number;
  agent_slug: string | null;
  kind: string | null;
  url: string;
  path: string | null;
  content_type: string | null;
  created_at: string;
};

export type OutreachMsg = {
  id: number;
  agent_slug: string | null;
  channel: "linkedin" | "instagram" | "email" | "whatsapp";
  contact_ref: string | null;
  contact_name: string | null;
  contact_url: string | null;
  direction: "out" | "in";
  message: string | null;
  status: string;
  ts: string;
};

export type Meeting = {
  id: number;
  agent_slug: string | null;
  channel: string | null;
  contact_name: string | null;
  contact_ref: string | null;
  when_at: string | null;
  status: "proposed" | "confirmed" | "done" | "cancelled";
  notes: string | null;
  created_at: string;
};

export type KpiFunnelRow = { stato: string; n: number };
export type KpiListe = {
  lista_target: number;
  cold_email_pronte: number;
  cold_call_con_telefono: number;
  persone: number;
  aziende_totali: number;
  email_titolare: number;
};

export type Snapshot = {
  agents: Agent[];
  runs: AgentRun[];
  feed: FeedItem[];
  kv: Record<string, unknown>;
  approvals: Approval[];
  assets: Asset[];
  outreach: OutreachMsg[];
  meetings: Meeting[];
  kpiFunnel: KpiFunnelRow[];
  kpiListe: KpiListe | null;
};

export type Mode = "live" | "sync" | "demo";
