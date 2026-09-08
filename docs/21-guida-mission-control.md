# Mission Control per team di AI Agent — Framework end-to-end (da Rivolio a SolarBack)

Guida tecnica completa per replicare la dashboard "Mission Control" di Rivolio su un nuovo business (SolarBack). È basata sul codice REALE della dashboard Rivolio (`mission-control/`), non su ipotesi. Chi legge questo documento deve poter costruire tutto da zero: dashboard bella e live + team di agenti AI che la abitano e la aggiornano da soli.

Il concetto in una riga: **ogni agente è una routine (cron) che si sveglia, fa il suo giro, e scrive il risultato in un unico database; la dashboard legge quel database in tempo reale e mostra la squadra viva.**

---

## 1. STACK (verificato dal codice)

- **Next.js** (App Router, cartella `src/app`) + **React** + **TypeScript**
- **Tailwind CSS v4** (`@tailwindcss/postcss`, token via `@theme inline` in `globals.css`) + `tailwind-merge` + `clsx`
- **framer-motion** (animazioni, transizioni, il "feel" vivo)
- **lucide-react** (icone)
- **@supabase/supabase-js** (database Postgres gestito + realtime)
- Font self-hosted (Rivolio: Inter + Space Grotesk; SolarBack: **Manrope**)
- Deploy su **Railway** (`next build` / `next start`)
- Collaudo visivo con **Playwright** (screenshot delle pagine)

`package.json` scripts: `dev: next dev`, `build: next build`, `start: next start`, `lint: eslint`.

---

## 2. ARCHITETTURA A 3 PEZZI

1. **Il database (Supabase)** = la fonte unica di verità. Tutto ciò che gli agenti fanno finisce qui.
2. **La dashboard (Next.js su Railway)** = legge il DB in realtime e lo mostra. Non contiene logica di business degli agenti: è una vetrina + un pannello di approvazione.
3. **Gli agenti (Claude Code Remote — routine cron)** = girano da soli, fanno il lavoro, e scrivono nel DB attraverso UN endpoint HTTP (`/api/ingest`). Non toccano il DB direttamente: passano sempre dall'endpoint (che ha la service key).

Regola d'oro del disaccoppiamento: **gli agenti non sanno niente della UI, la UI non sa niente degli agenti.** Parlano solo attraverso le tabelle del DB. Così puoi cambiare la UI senza toccare gli agenti e viceversa.

### Struttura dei branch/repo (come Rivolio, pulita)
- **`main`** del repo del TEAM = le skill degli agenti (`.claude/skills`), i docs, il `CLAUDE.md` con le regole. Gli agenti fanno `git pull origin main` e caricano la loro skill da qui.
- **branch/repo della DASHBOARD** = il codice Next.js (`mission-control/`). Separato dal team.
- **branch builder** = dove vive la sessione interattiva (tu + l'AI che costruisce).

---

## 3. IL DATABASE (schema reale, Supabase)

8 tabelle. `migrations/0001_init.sql` + `0002_messages.sql`. Adatta i nomi al business (creators/reddit_items sono specifici di Rivolio: sostituiscili con le entità di SolarBack), ma **agents / agent_runs / activity_feed / kv restano identici**: sono il cuore riusabile.

```sql
-- agents: l'anagrafica dei ruoli (una riga per agente)
create table if not exists agents (
  slug text primary key, name text not null, role text not null, tagline text,
  avatar text, status text not null default 'idle'
    check (status in ('idle','working','error','paused')),
  current_task text, last_run_at timestamptz, schedule_label text, cron text,
  today_count int not null default 0, color text, sort int not null default 100,
  updated_at timestamptz default now()
);
-- agent_runs: lo storico giri (run_start/run_finish scrivono qui)
create table if not exists agent_runs (
  id bigint generated always as identity primary key,
  agent_slug text references agents(slug) on delete cascade,
  started_at timestamptz not null default now(), finished_at timestamptz,
  status text not null default 'running' check (status in ('running','ok','error')),
  summary text, items int not null default 0
);
-- activity_feed: il flusso "cosa succede" in dashboard
create table if not exists activity_feed (
  id bigint generated always as identity primary key,
  ts timestamptz not null default now(), agent_slug text,
  kind text not null default 'info', message text not null
);
-- kv: stato libero jsonb (piani, cruscotti per-ruolo, ecc.) — la parte piu' flessibile
create table if not exists kv (key text primary key, value jsonb, updated_at timestamptz default now());
-- + tabelle di dominio (Rivolio: creators, drafts, reddit_items, messages).
--   Per SolarBack: sostituisci con le entita' del business (es. lead, progetti, preventivi...).
```

Due regole di sicurezza NON negoziabili (dallo schema Rivolio):
- **RLS attivo su tutte le tabelle.** Lettura pubblica con la **anon key** (la dashboard legge). Scrittura **solo service role** (solo l'endpoint `/api/ingest` scrive). `create policy "lettura pubblica X" on X for select using (true);`
- **Realtime**: `alter publication supabase_realtime add table agents, agent_runs, activity_feed, kv, ...;` — è questo che rende la dashboard viva.

---

## 4. L'ENDPOINT UNICO: `/api/ingest` (il ponte agenti → dashboard)

File: `src/app/api/ingest/route.ts`. Un solo endpoint, autenticato con **`Authorization: Bearer <INGEST_KEY>`** (INGEST_KEY sta nelle env, mai nel repo). Usa un client Supabase con **service role key** (bypassa RLS in scrittura).

- **GET `?digest=1`** → ritorna lo stato aggregato (agenti, ultimi giri, feed, kv, ecc.). Lo usano gli agenti per "leggere il mondo" a inizio giro, e i test.
- **POST** con `{op, ...}`. Le operazioni reali accettate:
  - `run_start` {agent, task} → crea l'agente se non esiste, segna status=working, apre un agent_run.
  - `run_finish` {agent, esito, summary, items} → chiude il run, status=idle/error, aggiorna last_run_at + today_count.
  - `heartbeat` → tiene vivo l'agente durante giri lunghi.
  - `feed` {agent, kind, message} → scrive una riga nel flusso attività.
  - `kv_set` {key, value} → scrive/aggiorna stato jsonb (piani, cruscotti).
  - `persist_asset` {url, path, content_type} → salva un asset permanente su Supabase Storage e torna l'URL pubblico. **Accetta anche data-URI base64** (verificato): utile per immagini composte lato agente.
  - `creator_upsert` / `draft_upsert` / `reddit_add` / `message_add` → operazioni di dominio (adattale al business).

Pattern chiave: **ogni giro di ogni agente inizia con `run_start` e finisce SEMPRE con `run_finish`** (anche in caso di errore o di "salto"). Così la dashboard sa sempre chi ha lavorato, quando, con che esito. Niente giri muti.

Altri endpoint utili (Rivolio): `/api/health`, `/api/decide` (approvazione di Valerio → sblocca un'azione), `/api/publish` (il backend fa l'azione esterna irreversibile che l'agente non può fare — vedi §8).

---

## 5. IL LIVE (come si aggiorna sempre) — verificato

Cuore in `src/lib/store.tsx`: un React Context (`useData()`) che:
1. Fa un **fetch iniziale** dello stato dal DB (anon key, lettura).
2. Apre un **canale Supabase Realtime** (`supabase.channel('mission-control')`) sottoscritto ai cambi delle tabelle → quando un agente scrive, la dashboard si aggiorna **all'istante**.
3. Tiene un **poll di sicurezza ogni 45s** (`setInterval(() => refetch(), 45000)`): se il realtime cade, i dati restano freschi lo stesso.

`LiveBadge.tsx` mostra l'orologio (tick 1s) e la pastiglia **Live / Sync / Demo**. La modalità "demo" usa uno snapshot statico (per far vedere la dashboard senza DB). Questa tripla (fetch + realtime + poll) è ciò che rende il cruscotto "sempre vivo e affidabile".

---

## 6. IL DESIGN SYSTEM (come è bello, e come lo reskinnare per business)

Tutto parte da `globals.css`, blocco `@theme inline`: i colori e i font sono **token CSS custom**, consumati come classi Tailwind (`bg-base`, `text-ink`, `border-line`, `text-brand-700`, `shadow-card`...). **Per cambiare l'estetica di un business basta cambiare i valori dei token**: l'intera app si re-veste.

Token Rivolio (verde chiaro), come riferimento di struttura:
```
--font-display: Space Grotesk;  --font-sans: Inter;
--color-deep:#0a3b31; --color-brand-500:#12866f; --color-brand-700:#0b5f52; --color-mint:#63e0b6;
--color-base:#f6f4ec; --color-card:#ffffff; --color-line:#e6e1d2;
--color-ink:#12211c; --color-ink-2:#44554f; --color-ink-3:#75837d;
--color-ok:#12866f; --color-warn:#b07a2a; --color-err:#c0392b;
--shadow-card / --shadow-lift / --shadow-glow;  --radius-card:16px;
```

### Palette SolarBack (dark + oro, estratta da artecai.it) — da incollare nei token
```
--font-display: Manrope;  --font-sans: Manrope;
/* fondali scuri caldi */
--color-base:#0b0b0b; --color-base-2:#0e0e0e; --color-card:#151109; --color-card-2:#1a1512;
--color-line:#2a2419; --color-line-strong:#3a3320;
/* oro brand */
--color-brand-50:#fff1c2; --color-brand-100:#f0d27a; --color-brand-200:#efc97a;
--color-brand-400:#e8b952; --color-brand-500:#d9a441; --color-brand-600:#c08828; --color-brand-700:#a06c1c;
--color-deep:#1a0e00;
/* testo su scuro */
--color-ink:#f5f2eb; --color-ink-2:#c9c3b5; --color-ink-3:#8a8378;
--color-ok:#d9a441; --color-warn:#e8b952; --color-err:#c0392b;
```
Nota: Rivolio è "light". SolarBack è "dark-luxury": inverti i ruoli (base scuro, testo chiaro) ma tieni la STESSA struttura di token, così tutti i componenti funzionano senza riscriverli.

### Componenti (in `src/components`)
- `Sidebar.tsx` — navigazione a sinistra, una voce per sezione, stato live in fondo.
- `ui.tsx` — le primitive del design system (Card, badge, ecc.): usale ovunque per coerenza.
- `AgentCard.tsx` — la card di un agente (avatar, nome, tagline, stato, ultimo giro, prossimo giro, count oggi).
- `FeedRail.tsx` — il flusso attività (activity_feed) in colonna.
- `LiveBadge.tsx` — orologio + pastiglia live.
- Avatar: un PNG per agente in `public/avatars/<slug>.png` (le "foto" dei ruoli). Per SolarBack: genera nuovi avatar on-brand (stile 3D coerente) e mettili lì.

### Pagine (una per sezione, in `src/app`)
Home `page.tsx` (Mission Control: KPI + squadra + feed), `agenti/[slug]/page.tsx` (scheda tecnica del singolo agente: tool collegati, skill, il giro passo-passo, regole, storico giri), e una pagina per ogni area di lavoro (per Rivolio: creator, bozze, contenuti, ecc.). `agentSpecs.ts` tiene le specifiche descrittive di ogni agente (cosa fa, tool, regole) che alimentano la scheda.

---

## 7. GLI AGENTI (Claude Code Remote): sessioni, skill, ruoli, routine

Ogni agente è la combinazione di 3 cose:

1. **Una SKILL** (nel repo del team, `.claude/skills/<ruolo>/SKILL.md` + `reference.md`). È il manuale operativo del ruolo: il giro passo-passo, le regole, come scrive in dashboard. Gli agenti la caricano fresca a ogni giro (`git pull origin main` → tool Skill). Contiene SEMPRE: contesto business, le leggi non negoziabili, l'ordine dei passi (run_start → lavoro → kv_set/feed → run_finish), i default sensati per non bloccarsi.

2. **Una SESSIONE OPERATIVA** (creata dalla UI di claude.ai/code, una per ruolo, es. "SOLAR STRATEGA operative"). È qui che vivono i **connettori** (Composio, Gmail, ecc.): i connettori esistono SOLO nelle sessioni create dalla UI, non nelle routine da sole. La routine si aggancia a questa sessione.

3. **Una ROUTINE (trigger cron)** che a un orario sveglia la sessione operativa con un prompt corto e blindato. Il prompt template (verificato):
   > "È scattato il giro di <RUOLO>. Ogni fire è un giro nuovo da zero. PASSO ZERO: `git pull origin main` (o clona se manca). Carica la skill `<ruolo>` col tool Skill e seguila ALLA LETTERA. Dove la skill scrive <INGEST_KEY> usa: <valore>. ESCLUSIVITÀ: esegui solo la tua skill. Chiudi sempre col run_finish."

Lezione importante (verificata sul campo): **un fire di collaudo SENZA testo extra parte DENTRO la sessione operativa (coi connettori). Un fire CON testo extra parte in una sessione orfana senza connettori.** Quindi per testare un ruolo nella sua sessione vera, fire "nudo".

### Le 2 modalità di sessione (regola ferrea)
- **Sessione builder interattiva** (tu presente): qui si fanno domande/scelte.
- **Sessioni dei ruoli** (cron, tu assente): **VIETATO fare domande popup** (nessuno le vede, il ruolo si blocca). Se manca qualcosa: (1) prende un default sensato, (2) scrive l'avviso in dashboard (feed), (3) continua e chiude col run_finish. Mai sospendere.

### Catena di dipendenze
Se i ruoli dipendono l'uno dall'altro, ognuno a inizio giro VERIFICA la dipendenza; se manca, NON lavora a vuoto: scrive "salto: manca <a monte>" nel feed e chiude (esito ok, items 0). Es. Rivolio: Trend → Stratega → Produttori → (approvazione) → Publisher → Community.

### Il cancello di approvazione (azioni verso l'esterno)
Niente viene pubblicato/inviato all'esterno senza l'OK umano. L'agente prepara la bozza, la lascia in dashboard in stato "in attesa", e va avanti. L'umano approva dalla dashboard (`/api/decide`), e SOLO allora l'azione parte. NB: il classificatore di sicurezza blocca gli agenti dal fare POST esterni irreversibili (pubblicare su un social) → per quelle azioni è il BACKEND della dashboard (`/api/publish`) a eseguirle su approvazione, non l'agente.

---

## 8. DEPLOY SU RAILWAY

1. Progetto Railway → servizio dal repo della dashboard (branch dashboard).
2. Build: `next build`. Start: `next start`. (Railway rileva Next in automatico; piano Hobby basta per iniziare.)
3. **Variabili d'ambiente** (mai nel repo):
   - `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` (lettura lato client)
   - `SUPABASE_SERVICE_ROLE_KEY` (scrittura lato server, in `/api/ingest`)
   - `INGEST_KEY` (il bearer che gli agenti usano per scrivere)
   - eventuali chiavi di dominio (per Rivolio: ZERNIO_API_KEY, KIE_API_KEY...)
4. Dominio Railway generato; la dashboard è online. Le migrazioni SQL girano su Supabase (SQL editor o CLI).

---

## 9. COLLAUDO (come si verifica che sia tutto vivo)

- **Visivo**: `scripts/shot.mjs` (Playwright) fa screenshot di ogni pagina → si guardano e si itera finché sono belle. `e2e.mjs` per il flusso.
- **Dati**: `GET /api/ingest?digest=1` → controlli che agenti/giri/feed abbiano dati veri e freschi.
- **Robustezza agenti**: fai girare ogni ruolo finché ottieni 2-3 giri puliti di fila (run_start→run_finish, niente giri muti, default che degradano con grazia).
- **Live**: apri due tab, fai scrivere un agente, verifica che l'altra tab si aggiorni senza refresh (realtime) e comunque entro 45s (poll).

---

## 10. LE REGOLE D'ORO (il `CLAUDE.md` del team — riusabile)

1. Mai inviare/pubblicare all'esterno senza approvazione umana (dalla dashboard).
2. Nelle sessioni dei ruoli: mai popup bloccanti. Default + avviso in dashboard + continua.
3. Ogni modifica al repo aggiorna anche docs + log decisioni. Niente si perde tra sessioni.
4. Copy sempre umano, mai il trattino lungo.
5. Mai inventare numeri/dati. Se non verificato: "da verificare".
6. Segreti solo in env, mai nel repo.
7. Si decide sui dati, non sulla fede.
8. Onestà: se hai sbagliato, dillo e scrivilo nel log.

---

## 11. ORDINE DI COSTRUZIONE consigliato (per l'altra sessione)

1. Supabase: crea progetto, applica `0001_init.sql` (agents/agent_runs/activity_feed/kv + tabelle di dominio SolarBack) con RLS + realtime.
2. Next.js: scaffold App Router + Tailwind v4 + token del brand SolarBack (dark+oro) + font Manrope.
3. `/api/ingest` (GET digest + POST ops) con auth Bearer INGEST_KEY e service role.
4. `store.tsx` (fetch + realtime + poll 45s) + LiveBadge + Sidebar + AgentCard + FeedRail.
5. Home + pagina agenti/[slug] + le pagine di sezione del business.
6. Avatar on-brand per ogni ruolo.
7. Deploy Railway + env.
8. Skill dei ruoli nel repo del team + sessioni operative (con connettori) + routine cron agganciate.
9. Collaudo: screenshot Playwright + digest + giri puliti + prova live.

Il team di ruoli specifici di SolarBack (nomi, cosa fa ognuno, cadenze) lo definisce chi costruisce: questo framework è agnostico ai ruoli. Basta che ogni ruolo rispetti il contratto (run_start → lavoro → kv_set/feed → run_finish) e le regole d'oro.
