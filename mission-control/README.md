# SolarBack · Mission Control

Dashboard live del team di agenti AI di SolarBack. Replica il framework verificato (guida Rivolio, `docs/21`), vestito dark + oro.

## Architettura (3 pezzi disaccoppiati)
1. **Supabase** = fonte unica di verità. Schema dedicato **`mc`** (agents, agent_runs, activity_feed, kv, approvals, assets, outreach_msgs, meetings + viste `kpi_funnel`/`kpi_liste` che leggono `public` solo in aggregato). Lettura pubblica con anon key (RLS), scrittura solo service role. Tutte le tabelle in `supabase_realtime`.
2. **Dashboard** (questa app, Next.js su Railway) = legge in realtime (fetch iniziale + canale Realtime + poll 45s) e mostra la squadra. Nessuna logica agenti nella UI.
3. **Agenti** = routine cron (Claude Code Remote) agganciate a sessioni operative. Scrivono SOLO via `POST /api/ingest` con `Authorization: Bearer <INGEST_KEY>`.

## Contratto `/api/ingest`
- `GET ?digest=1` → stato aggregato (agenti, giri, feed, kv, bozze in attesa, meeting, KPI).
- `POST {op, ...}`: `run_start{agent,task}` · `heartbeat{agent,task?}` · `run_finish{agent,run_id?,esito,summary,items}` · `feed{agent?,kind,message}` · `kv_set{key,value}` · `approval_add{agent,kind,title,payload}` · `outreach_add{agent,channel,contact_*,direction,message,status}` · `meeting_add{agent,channel,contact_name,when_at,status,notes}` · `agent_update{agent,...}` · `persist_asset{agent,kind,path,url|dataURI,content_type}`.
- Regola: ogni giro **inizia con `run_start` e finisce SEMPRE con `run_finish`**.
- `POST /api/decide {id, decision, pin}` = approvazione umana (protetta da `DECIDE_PIN`). `POST /api/publish` = 501 finché il Publisher non è collegato.

## Avatar
Render 3D presi online: **Fluent UI Emoji** (Microsoft, licenza MIT) in `public/avatars/*.png`; fallback SVG on-brand.

## Env (mai nel repo)
`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `INGEST_KEY`, `DECIDE_PIN`.

## Sviluppo e collaudo
```
npm run dev
BASE_URL=http://localhost:3000 node scripts/shot.mjs          # screenshot Playwright
BASE_URL=... INGEST_KEY=... node scripts/e2e.mjs               # giro end-to-end
```
## Deploy
Railway, root directory `mission-control`, branch `mission-control`. Build `next build`, start `next start`.
