# docs/19 — AI Team & Mission Control · AS-BUILT (8/9/2026, aggiornato a notte tarda)

> **Cos'è:** il team di agenti AI di SolarBack e la dashboard **Mission Control** che li mostra. Costruito seguendo
> alla lettera la guida Rivolio (`docs/21`), vestito dark + oro. Qui c'è com'è fatto DAVVERO, non un piano.

**Dashboard live:** `https://mission-control-production-d22b.up.railway.app`
**Repo:** cartella `mission-control/` (branch di lavoro `Solarback-Growth-Agents`; Railway deploya dal branch `mission-control`, root dir `mission-control`).

---

## 1. Architettura a 3 pezzi (disaccoppiati)
| Pezzo | Dove | Cosa |
|---|---|---|
| **Fonte di verità** | Supabase progetto `solarback`, **schema dedicato `mc`** | `agents`, `agent_runs`, `activity_feed`, `kv`, `approvals`, `assets`, `outreach_msgs`, `meetings` + viste `kpi_funnel`/`kpi_liste` (leggono `public` solo in aggregato: nessun dato personale esposto). RLS: lettura pubblica (anon), scrittura SOLO service role. Tutte le tabelle in `supabase_realtime`. Bucket Storage pubblico `mc-assets`. **`public` (aziende/persone/verifica_email) resta intatto e separato.** |
| **Dashboard** | Next.js 16 + Tailwind v4 + framer-motion + lucide + supabase-js, su **Railway** | Legge lo stato via `/api/snapshot` (same-origin) + canale **Realtime** sullo schema `mc` + poll di sicurezza 45s. Nessuna logica agenti nella UI. Pagine: Mission Control (KPI, costi, squadra per reparto, feed), `agenti/[slug]` (scheda: come lavora, tool, skill, giro, regole, storico), Approvazioni, Contenuti, Outreach, Scout, Blog, Analisi. |
| **Agenti** | Routine cron (Claude Code Remote) agganciate a **sessioni operative** create da Valerio (coi connettori) | Scrivono SOLO via `POST /api/ingest` (Bearer `INGEST_KEY`): `run_start` → lavoro → `kv_set`/`feed`/`approval_add`/... → `run_finish` SEMPRE. Contratto completo in `.claude/skills/solar-ruolo-template/reference.md`. |

Endpoint: `/api/ingest` (GET digest, POST ops) · `/api/snapshot` (stato pubblico) · `/api/decide` (approvazione di Valerio, PIN) · `/api/health` · `/api/publish` (501 finché il Publisher/OmniSocials non è collegato: le azioni esterne irreversibili le fa il backend su approvazione, non l'agente).

## 2. La squadra (8 ruoli, decisi da Valerio, nome `SOLAR - RUOLO`, ognuno riporta a lui)
| Ruolo | Reparto | Tipo | Cadenza (IT) | Stato |
|---|---|---|---|---|
| SOLAR - CONTENT STRATEGIST | Contenuti | daily | 07:30 | ✅ collaudato 8/9 · routine ON |
| SOLAR - CAROSELLI | Contenuti | daily | 08:00 | ✅ collaudato 8/9 (solo testo, 0 Kie) · routine OFF fino a OK |
| SOLAR - VIDEO | Contenuti | daily | 08:30 | ✅ collaudato 8/9 (script + shot list, 0 Kie) · routine OFF fino a OK |
| SOLAR - BLOG | Contenuti | daily | lun 09:00 | in pausa (nessuna sessione) |
| SOLAR - LINKEDIN DM OUTREACH | Outreach | **live** | ogni ora 08-20 (+ webhook inbox) | ✅ collaudato 8/9 in modalità sicura (template + lista proposti) · routine OFF · Unipile da collegare |
| SOLAR - INSTAGRAM DM OUTREACH | Outreach | **live** | ogni ora 08-20 (+ webhook inbox) | ✅ collaudato 8/9 in modalità sicura · primo DM da correggere · routine OFF · Unipile da collegare |
| SOLAR - SCOUT | Dati | daily | 07:00 | ✅ collaudato 8/9 (cap 0,50 $, 3 titolari promossi) · routine ON |
| SOLAR - DATA ANALYST | Dati | daily | 20:00 | ✅ collaudato 8/9 · routine ON |

Due classi: **"una task al giorno"** (Video, Caroselli, Strategist, Scout, Blog, Analyst) e **"sempre live"** (gli squali: LinkedIn + Instagram, mandano messaggi, presidiano inbox, rispondono subito, fissano meeting qualificati).

## 3. Regole d'oro (replicate dal CLAUDE.md del team Rivolio)
1. Mai inviare/pubblicare all'esterno senza approvazione umana dalla dashboard (finché la qualità non è provata; poi autopilot; DM outreach con template+volumi approvati a monte).
2. Nelle sessioni dei ruoli: mai popup bloccanti. Default + avviso in dashboard + continua.
3. Ogni modifica al repo aggiorna docs + log decisioni.
4. Copy umano, mai il trattino lungo.
5. Mai inventare numeri: "da verificare".
6. Segreti solo in env, mai nel repo.
7. Si decide sui dati.
8. Onestà: se hai sbagliato, dillo e scrivilo.
9. **Kie AI = prudenza**: crediti solo dopo collaudo del ruolo.

## 4. Stato del collaudo (8/9 notte, onesto)
- ✅ Build `next build` a zero errori TypeScript, lint pulito. Deploy Railway ok, `/api/health` ok (`storage_write: true`).
- ✅ Scrittura agenti: funzione DB `mc.ingest(key, op, payload)` (security definer, chiave in `mc.config`) chiamata da `/api/ingest`. E2E live ok.
- ✅ **7 sessioni operative (Valerio) + 7 routine (io) cablate. Collaudo con fire nudo, un ruolo alla volta: 7/7 giri puliti**, ognuno con run_start → feed → bozze/kv → run_finish, visibile in dashboard (anello oro mentre lavora).
- ✅ Modalità sicura rispettata: 0 crediti Kie, 0 inviti/DM inviati. Unipile non collegato → gli squali saltano la inbox e lo scrivono nel feed.
- ✅ Dashboard allineata alla guida Rivolio (sidebar, card, font, ordine, avatar 3D Fluent Emoji, anello oro). Screenshot Playwright ok su server locale.
- ⏳ In attesa di Valerio: 7 bozze da decidere in Approvazioni (PIN), cap Scout a regime, accensione routine spente, Unipile.
- ⚠️ Da correggere: primo DM del Template Instagram v1 (vende subito).
- ⏳ Prova "live in due tab" (realtime) dal browser di Valerio (qui il websocket è bloccato dal proxy).

## 5. Come si attiva un ruolo (runbook)
1. Valerio crea la **sessione operativa** dalla UI (una per ruolo) e ci collega i connettori.
2. Io scrivo la **skill** del ruolo da `.claude/skills/solar-ruolo-template/` con Valerio.
3. Io creo la **routine cron** agganciata alla sessione col prompt template (in `reference.md`).
4. **Collaudo**: fire nudo → 2-3 giri puliti → Valerio approva la qualità → routine attiva. Un ruolo alla volta.

## 6. Env su Railway (mai nel repo)
`NEXT_PUBLIC_SUPABASE_URL` ✅ · `NEXT_PUBLIC_SUPABASE_ANON_KEY` ✅ · `INGEST_KEY` ✅ · `DECIDE_PIN` ✅ · `SUPABASE_SERVICE_ROLE_KEY` ✅ (inserita da Valerio l'8/9; serve solo per lo Storage, la scrittura passa dalla funzione DB).

## 7. Costi (dichiarati da Valerio, mostrati in dashboard)
Unipile €49 fisso · OmniSocials ~$10 · Railway ~$5 · Supabase $10 · Kie ~$50 crediti/mese · Claude abbonamento (da verificare). ~€100-120/mese. Solo Kie è a consumo.
