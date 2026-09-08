# reference.md · Contratto tecnico con Mission Control (per TUTTI i ruoli)

## Dove
- Dashboard: `https://mission-control-production-d22b.up.railway.app`
- Endpoint unico per scrivere: `POST /api/ingest` · Header `Authorization: Bearer <INGEST_KEY>` · `Content-Type: application/json`
- Per leggere il mondo a inizio giro: `GET /api/ingest?digest=1` (stessa auth) → agenti, ultimi giri, feed, kv, bozze in attesa, meeting, KPI.
- Stato pubblico senza auth: `GET /api/snapshot`.

## Operazioni (`op`)
| op | campi | effetto |
|---|---|---|
| `run_start` | `agent`, `task` | apre un giro, stato ruolo = working. Torna `run_id`. |
| `heartbeat` | `agent`, `task?` | tiene vivo il ruolo nei giri lunghi (ogni ~5 min). |
| `run_finish` | `agent`, `run_id?`, `esito` (`ok`\|`error`), `summary`, `items` | chiude il giro, aggiorna ultimo giro e "prodotto oggi". **Obbligatorio.** |
| `feed` | `agent?`, `kind` (`info`\|`ok`\|`error`\|`run`\|`system`), `message` | una riga nel flusso "Cosa succede". |
| `kv_set` | `key`, `value` (json) | stato libero del ruolo (vedi chiavi sotto). |
| `approval_add` | `agent`, `kind` (`post`\|`carosello`\|`video`\|`blog`\|`dm_template`\|`other`), `title`, `payload` | bozza in attesa dell'OK di Valerio. `payload.testo` e `payload.url` vengono mostrati. |
| `outreach_add` | `agent`, `channel` (`linkedin`\|`instagram`\|`email`\|`whatsapp`), `contact_ref`, `contact_name`, `contact_url`, `direction` (`out`\|`in`), `message`, `status` | log messaggi in/out. |
| `meeting_add` | `agent`, `channel`, `contact_name`, `contact_ref`, `when_at` (ISO), `status` (`proposed`\|`confirmed`\|`done`\|`cancelled`), `notes` | meeting fissato. |
| `agent_update` | `agent` + campi (`status`, `schedule_label`, `cron`, `tagline`, ...) | aggiorna la scheda del ruolo. |
| `persist_asset` | `agent`, `kind`, `path` (es. `caroselli/2026-09-09/slide-1.png`), `url` (http o data-URI base64), `content_type` | salva su Storage pubblico, torna `url`. |

Esempio:
```bash
curl -s -X POST "$MC/api/ingest" -H "Authorization: Bearer $INGEST_KEY" -H "content-type: application/json" \
  -d '{"op":"run_start","agent":"solar-caroselli","task":"Carosello del giorno"}'
# ... lavoro ...
curl -s -X POST "$MC/api/ingest" -H "Authorization: Bearer $INGEST_KEY" -H "content-type: application/json" \
  -d '{"op":"run_finish","agent":"solar-caroselli","run_id":123,"esito":"ok","summary":"1 carosello in attesa di OK","items":1}'
```

## Chiavi `kv` convenzionali
- `piano:oggi` → `{data, tema, angolo, hook[], formati[], note}` (scrive CONTENT STRATEGIST, leggono CAROSELLI/VIDEO)
- `scout:ultimo` → `{quando, nuovi_titolari, nuove_email, costo_usd, attore, note}`
- `analyst:ultimo` → `{data, sintesi, cosa_ha_funzionato[], cosa_no[], domani[]}`
- `kie` → `{saldo, usati_mese, pezzi_mese, eur_per_credito, aggiornato}` (DATA ANALYST)
- `costi` → `{fissi:[{voce,note,eur_mese}], nota}` (opzionale, sovrascrive i default)

## Slug dei ruoli
`solar-content-strategist` · `solar-caroselli` · `solar-video` · `solar-blog` · `solar-linkedin` · `solar-instagram` · `solar-scout` · `solar-data-analyst`

## Orari (cron in UTC; in dashboard sono mostrati in ora italiana)
Scout `0 5 * * *` · Content Strategist `30 5 * * *` · Caroselli `0 6 * * *` · Video `30 6 * * *` · LinkedIn `0 6-18 * * *` (ogni ora) · Instagram `30 6-18 * * *` · Blog `0 7 * * 1` · Data Analyst `0 18 * * *`. (Estate: UTC+2.)

## Prompt della routine (template verificato, dalla guida)
> È scattato il giro di SOLAR - <RUOLO>. Ogni fire è un giro nuovo da zero. PASSO ZERO: `git pull origin Solarback-Growth-Agents` (o clona se manca). Carica la skill `solar-<ruolo>` col tool Skill e seguila ALLA LETTERA. Dove la skill scrive <INGEST_KEY> usa: <valore>. Dashboard: https://mission-control-production-d22b.up.railway.app . ESCLUSIVITÀ: esegui solo la tua skill. Niente domande: default + avviso in dashboard. Chiudi sempre col run_finish.

Nota verificata sul campo: un fire di collaudo **senza testo extra** parte dentro la sessione operativa (coi connettori); un fire **con testo extra** parte in una sessione orfana senza connettori.

## Come si attiva un ruolo (runbook)
1. **Valerio** crea la sessione operativa dalla UI di claude.ai/code (es. "SOLAR CAROSELLI operative") e ci collega i connettori del ruolo.
2. **Io** scrivo la skill `.claude/skills/solar-<ruolo>/` (SKILL.md + reference.md) partendo da questo template, con Valerio.
3. **Io** creo la routine cron agganciata a quella sessione (`persistent_session_id`) col prompt sopra.
4. **Collaudo:** fire nudo → 2-3 giri puliti → Valerio approva la qualità → routine attiva.
