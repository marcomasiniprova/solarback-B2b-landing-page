# reference.md · SOLAR - DATA ANALYST
Contratto: `.claude/skills/solar-ruolo-template/reference.md`. MC = `https://mission-control-production-d22b.up.railway.app`. Supabase project `dziylyrneqeamqzatdzo` (MCP `execute_sql`).

## Query
```sql
-- Q1 funnel
select stato, n from mc.kpi_funnel order by stato;
-- Q2 liste
select * from mc.kpi_liste;
-- Q3 giri di oggi per ruolo (ora italiana)
select agent_slug, count(*) as giri, count(*) filter (where status='ok') as ok, count(*) filter (where status='error') as errori, coalesce(sum(items),0) as item
from mc.agent_runs where (started_at at time zone 'Europe/Rome')::date = (now() at time zone 'Europe/Rome')::date group by 1 order by 1;
-- Q4 ruoli attesi oggi che NON hanno girato (esclusi 'paused')
select slug, name, schedule_label from mc.agents a where status <> 'paused'
  and not exists (select 1 from mc.agent_runs r where r.agent_slug = a.slug and (r.started_at at time zone 'Europe/Rome')::date = (now() at time zone 'Europe/Rome')::date);
-- Q5 bozze
select status, count(*) from mc.approvals group by status;
select count(*) as ferme_24h from mc.approvals where status='pending' and created_at < now() - interval '24 hours';
-- Q6 outreach e meeting di oggi
select channel, direction, count(*) from mc.outreach_msgs where (ts at time zone 'Europe/Rome')::date = (now() at time zone 'Europe/Rome')::date group by 1,2;
select status, count(*) from mc.meetings group by status;
-- Q7 nuovi titolari oggi (Scout)
select count(*) from public.leads_titolari where promossa and run_date = current_date;
```
## Formato `analyst:ultimo`
```json
{ "data": "2026-09-09", "sintesi": "…2 righe…", "kpi": { "lista_target": 6659, "email_titolare": 918, "interessati": 0, "qualificati": 0, "partner": 0, "meeting_aperti": 0 },
  "giri": { "solar-scout": {"giri":1,"ok":1,"errori":0,"item":12} }, "non_hanno_girato": [], "bozze": { "in_attesa": 3, "approvate_oggi": 1, "rifiutate_oggi": 0, "ferme_24h": 0 },
  "cosa_ha_funzionato": ["…"], "cosa_no": ["…"], "domani": ["…"], "kie": { "saldo": 9862, "aggiornato": "…" } }
```
## Formato `kie` (kv): `{ "saldo": 9862, "usati_mese": null, "pezzi_mese": null, "eur_per_credito": null, "aggiornato": "2026-09-09T18:00:00Z" }` (eur_per_credito = ricarica €/crediti quando Valerio lo comunica; altrimenti null = "da verificare" in dashboard).
