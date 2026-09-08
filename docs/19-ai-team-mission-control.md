# docs/19 — AI Team & Mission Control (architettura) · DA VALIDARE

> **Cos'è:** il progetto del **team di agenti AI** di SolarBack (ognuno un ruolo, con skill + documenti + tool propri,
> risvegliato ogni giorno da una routine) e della **dashboard mission-control su Railway** dove Valerio vede tutti gli
> agenti lavorare e i loro output, senza mai entrare nelle singole sessioni.
> **Stato:** BOZZA da validare. Non si costruisce nulla (sessioni, routine, Railway) finché Valerio non approva (regola 10).

**Ultimo aggiornamento:** 8/9/2026.

---

## 0. La visione (parole di Valerio, 8/9)
Non subagenti usa-e-getta, ma **veri agenti AI = sessioni persistenti**, ognuna con una **routine** che la fa partire
(es. ogni mattina alle 8). Ogni agente è un **ruolo del team marketing** con la sua **skill**, i suoi **documenti.md** e
i suoi **tool**. Esempi: **SOLARBACK-VIDEO** (ogni mattina genera video con Kie AI per le 3 piattaforme),
**SOLARBACK-LINKEDIN-OUTREACHER** (ogni giorno trova contatti e fa outreach via Unipile). Sopra tutti, una **dashboard
mission-control su Railway**: gli agenti la aggiornano ogni giorno col loro output; Valerio guarda solo la dashboard.

---

## 1. Principio architetturale (perché fatto così)
I container delle sessioni remote sono **effimeri** (riciclati dopo inattività). Quindi la "testa" di un agente NON può
vivere solo dentro la sessione. Separiamo tre livelli:

| Livello | Dove vive | Contiene |
|---|---|---|
| 🧠 **Cervello** (chi sei, come lavori) | **Repo Git** (`skill` + `docs/ruoli/<ruolo>.md`) | ruolo, istruzioni, skill, tool, regole, prompt |
| 💾 **Memoria + Output** (cosa hai fatto) | **Supabase** (tabelle agenti/run/output) | log giornalieri, asset prodotti, stato, KPI |
| 🖥️ **Vista** (mission control) | **Railway** (web app) | dashboard che LEGGE Supabase e mostra tutto |

Così, anche se il container di un agente viene riciclato, alla riattivazione la sessione **ri-clona il repo** (riprende
skill+docs del ruolo) e **rilegge il suo stato da Supabase**. Niente si perde. La dashboard non "guarda dentro" le sessioni:
legge Supabase, che gli agenti aggiornano.

---

## 2. Anatomia di un agente-ruolo
Ogni ruolo del team = questi 5 pezzi:
1. **Sessione persistente** (creata una volta con `create_session` nell'environment remoto).
2. **Routine** (`create_trigger`) che ogni giorno all'ora X **risveglia** quella sessione con un prompt di lavoro ("fai il tuo giro di oggi").
3. **Skill** dedicata (riutilizzabile, es. `carosello-onbrand-solarback`, `copy-linkedin-solarback`, `video-short-solarback`).
4. **Documento di ruolo** `docs/ruoli/<ruolo>.md` (identità, obiettivi, input, output atteso, regole, quali tool, come scrive su Supabase).
5. **Tool** assegnati (es. Kie AI, OmniSocials, Unipile, Supabase, Apify).

**Ciclo giornaliero di un agente:** routine lo sveglia → ri-clona repo + legge stato da Supabase → fa il lavoro (genera/pubblica/outreach)
→ scrive output + log su Supabase → (se serve approvazione) mette l'asset in stato `bozza` → fine. La dashboard mostra tutto.

---

## 3. Roster iniziale — TEAM MARKETING (proposta)
> Si parte con pochi e si scala. Ogni ruolo va attivato solo quando la sua skill+doc esistono (regola 10).

| Agente | Quando | Cosa fa | Skill | Tool | Output su dashboard |
|---|---|---|---|---|---|
| **SOLARBACK-CONTENT** | ogni mattina | genera i post-testo + caroselli del giorno (copy on-brand + immagini GPT Image 2) | copy-linkedin + carosello-onbrand | Kie AI, Supabase | bozze post/caroselli del giorno |
| **SOLARBACK-VIDEO** | ogni mattina | genera 1 video short (Veo 3.1 Lite) adattato alle 3 piattaforme | video-short-solarback | Kie AI, Supabase | video del giorno + script |
| **SOLARBACK-PUBLISHER** | dopo approvazione | schedula/pubblica gli asset approvati sulle 3 piattaforme | — | OmniSocials, Supabase | cosa è schedulato/pubblicato e quando |
| **SOLARBACK-OUTREACHER** | ogni giorno | trova nuovi contatti target + outreach LinkedIn a volume umano | outreach-linkedin | Unipile, Supabase, Apify | nuovi contatti + inviti/messaggi inviati |
| **SOLARBACK-ENGAGEMENT** | 1-2 volte/giorno | risponde a commenti/DM (bozze AI, volume umano) dalla inbox | engagement-social | OmniSocials, Supabase | conversazioni gestite / DM caldi |
| **SOLARBACK-MISSION-CONTROL** | ogni sera | aggrega gli output di tutti, calcola i KPI del giorno, chiude la giornata sulla dashboard | — | Supabase | riepilogo giornaliero + KPI funnel |

> Priorità di build suggerita: **CONTENT → PUBLISHER → (dashboard) → VIDEO → OUTREACHER → ENGAGEMENT → MISSION-CONTROL.**

---

## 4. Dashboard mission-control (Railway)
**Cosa vede Valerio (una pagina sola):**
- **Griglia agenti:** una card per agente (nome, ruolo, ultimo run, stato ✅/⚠️/❌, output di oggi in sintesi).
- **Feed output del giorno:** post/caroselli/video prodotti (anteprima), outreach fatti, conversazioni gestite.
- **Funnel & KPI:** Contatti → Interessati → Qualificati → Partner · sopralluoghi · contratti · cassa (dai dati Supabase reali).
- **Alert:** se un agente non ha girato o è andato in errore, si vede subito rosso.

**Schema Supabase proposto (nuove tabelle, da creare dopo OK):**
- `agenti` (id, nome, ruolo, descrizione, orario, attivo, ultimo_run_at, stato)
- `agent_runs` (id, agente_id, run_at, esito, sintesi, dettagli jsonb, durata_sec)
- `agent_output` (id, agente_id, run_id, tipo [post|carosello|video|outreach|engagement], piattaforma, contenuto/url, stato [bozza|approvato|schedulato|pubblicato], created_at)
- `kpi_giornaliero` (data, contatti, interessati, qualificati, partner, sopralluoghi, contratti, cassa_eur)

**Come si aggiorna:** gli agenti scrivono su Supabase a fine giro (service-role). La dashboard su Railway è una web app
che legge Supabase in sola lettura (chiave anon + RLS) e la mostra. Deploy su Railway; l'URL è il tuo mission-control.

---

## 5. Qualità & human-in-the-loop (per non ripetere l'errore)
All'inizio **quality gate obbligatorio**: gli agenti CONTENT/VIDEO producono in stato `bozza`; **Valerio approva dalla
dashboard** (o in chat) prima che PUBLISHER schedali. Solo quando la qualità è provata e costante, si dà più autonomia.
Questo evita di pubblicare roba brutta in automatico e rispetta la regola 10 (fondamenta e qualità prima della fretta).

---

## 6. Costi & rischi (onesto, niente false promesse)
- **Token/compute:** N agenti che girano ogni giorno consumano token (ogni sessione fa lavoro vero). Va tenuto d'occhio: si parte con pochi agenti e si misura.
- **Servizi ricorrenti:** OmniSocials ~$10/mo · Railway hosting ~$5-20/mo · Kie AI a consumo (immagini 6cr, video 35cr/8s) · Unipile (piano) · eventuale voce (ElevenLabs) per i video con parlato.
- **Affidabilità:** container effimeri, rate-limit API (già visto con HarvestAPI), fallimenti di generazione → mitigati dal design (stato su Supabase, errori visibili in rosso sulla dashboard, retry).
- **Conformità:** avatar AI dichiarato (EU AI Act art. 50); engagement a volume umano (nessun bot di massa).

---

## 7. Piano di build a fasi
- **FASE 0 — Fondamenta (IN CORSO):** ricerca 2026 sulle 4 aree (design caroselli, copywriting, algoritmi, video/avatar) + benchmark → consolido in `docs/` + creo le **skill** + il **design-system SolarBack** (`docs/ruoli/` e brand kit). *Nessun agente attivato finché le skill non esistono.*
- **FASE 1 — Pilota 1 agente:** costruisco SOLARBACK-CONTENT end-to-end (skill+doc+sessione+routine) e lo faccio girare 1 volta a mano → tu giudichi la qualità. Gate di approvazione attivo.
- **FASE 2 — Dashboard:** schema Supabase + web app su Railway che legge lo stato. Da qui vedi l'agente lavorare.
- **FASE 3 — Publisher + scheduling:** colleghi OmniSocials, l'agente schedula gli asset approvati.
- **FASE 4 — Scala team:** aggiungo VIDEO, OUTREACHER, ENGAGEMENT, MISSION-CONTROL uno alla volta, ognuno validato.

---

## 8. Decisioni aperte (da confermare prima di costruire — bivi grossi/soldi)
1. **OK a Railway per la dashboard?** (alternativa: la dashboard è un Artifact/pagina, più semplice ma meno "mission control h24"). Railway = come hai chiesto.
2. **Quality gate iniziale sì/no:** confermi che all'inizio gli agenti producono BOZZE e tu approvi, prima del full-auto? (consigliato sì).
3. **Con quale agente parte la Fase 1** (consiglio CONTENT, il cuore).
4. **Budget mensile che accetti** per servizi ricorrenti (OmniSocials + Railway + Kie a consumo + Unipile): serve un tetto per non sorprese.
5. **Orari di run** di ciascun agente (default: content/video 08:00, publisher dopo tua approvazione, outreach 09:30, engagement 13:00 e 18:00, mission-control 20:00).
