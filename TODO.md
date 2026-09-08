# ✅ TODO — azioni prioritarie

> Ordine = priorità. Spunta `[x]` quando fatto, sposta i completati in fondo,
> aggiorna a fine sessione. Dettaglio piano → `SPRINT-26-OTTOBRE.md`.

## 🎯 OBIETTIVO ATTUALE (aggiornato 6/9) — sostituisce "30 partner"
**≥ €200.000** cassa e **valutazione SolarBack ≥ €1.000.000 entro il 26/10.**
**Valutazione = run-rate annuo ricorrente × multiplo** (NON cash collected). Multiplo
di mercato oggi **2-4x** (micro-agenzia, fondatore solo); **5-8x** con ricorrenza
contrattuale + churn0 osservato + clienti diversificati + stack AI trasferibile.
→ €20-40k/mese ricorrenti = €1M a 2-5x. **NESSUN acquirente** (era un errore): €1M =
patrimonio personale, CEO al 100%. Matematica in `docs/11`. (I clienti contano in
quanto generano run-rate RICORRENTE.)

## 🔴 ADESSO (8/9 sera) — DB vivo su Supabase, si chiude l'arricchimento, poi outreach
- [x] Lista Target costruita (6.659 aziende) + **tutte le 3.895 email verificate** (Apify verifier) + audit TUTTO OK.
- [x] **DB VIVO = Supabase** progetto `solarback` (8/9): 8.498 aziende + 5.777 persone + 3.895 verifiche migrate,
      audit cella per cella 0 differenze (`asset/AUDIT_SUPABASE.md`), RLS blindato. Vecchi CSV/XLSX eliminati (ordine CEO).
- [x] Script cold call salvato (`docs/05-script-cold-call.md`). Geo → tutta Italia ovunque. Stack tool → `docs/14`.
- [x] Arricchimento nazionale 2.674 domini (home-only, $5): dataset Apify `N3kvzIbboJMnpGPJL` (2.228 email, 680 cellulari, 327 WhatsApp).
- [x] **Verifica + merge arricchimento (8/9 sera):** 1.954 email verificate (960 in policy) → 1.818 aziende aggiornate su
      Supabase: +784 email_1, +706 cellulari, +350 fissi, +262 PEC; bucket ricalcolati. Report `asset/MERGE_ARRICCHIMENTO.md`.
- [x] **Offerta:** già finalizzata (`docs/07` v2). **LinkedIn company page** (voce brand, senza faccia): scritta `docs/15`, pronta da pubblicare.
- [ ] **Scraping TITOLARI a CASCATA (deciso 9/9, crediti ok, ~1.000-3.000 titolari):** L1 `microworlds/leads-finder` (email+cellulare da dominio)
      → se manca L2 `harvestapi/linkedin-company-employees` (via LinkedIn azienda) → se manca L3 `dev_fusion/Linkedin-Profile-Scraper` (email+telefono da profilo).
      Solo aziende in **Lista Target** (ICP già filtrato, niente elettricisti/artigiani), ruoli Owner/Titolare/CEO/Amministratore. Poi ri-verifica → merge Supabase. Input perfetto per ogni attore.
- [x] **Scraping titolari L1 (leads-finder, Tier A+B+C, dopo ricarica):** 331 lead utili (101 decisori) su 169 aziende → `leads_titolari`; 194 email verificate; **102 aziende** con titolare nominativo promosso a email_1; 331 persone caricate. Cellulari ~0 (Apollo). DB riblindato.
- [x] **Titolari round 2 (8/9):** resto Tier C su leads-finder (1.600 domini/score, cap $4 → 1.100 lead, ma budget mangiato da ~14 grandi aziende off-target: solo **42 lead puliti**) + **cascata L2** `harvestapi/linkedin-company-employees` (Full+email, seniority Owner/CXO/VP/Director) sui **143 A/B**: attore accetta **max ~20 aziende/run** e LinkedIn **throttla** i run concorrenti → completati ~52 aziende (test+b0+b3), **11 lead L2** (owner/CEO/founder). Tot round: 53 staging → 49 verificate (37 valid) → **26 aziende** con decisore nominativo promosso, +48 persone.
- [ ] **Titolari round 2 — RESTO L2 (BLOCCATO SU CREDITO):** batch A/B rimasti (~90 az.: b1,b2,b4,b5,b6) + **483 Tier C** con `linkedin_azienda`. **Non eseguibile ora:** nativo Apify FREE = "free user run limit exceeded"; Composio-Apify vuoto ($0.002). **Valerio: ricarica un account Apify** (nativo o Composio, ~$4-5) → poi finisco (A/B ~$0,6 + Tier C ~$2,8). Batch pronti in scratchpad `l2_batches.json`.
- [ ] **Io (prossimo):** guida Instantly + Composio Gmail/Sheets (chiavi nel pannello) → warmup → campagna 1 da `v_cold_email`.
- [ ] Prossimi asset Social&Trust: casi studio (al primo risultato reale) · coerenza sito solarback.it.
- [ ] **Valerio: repo → PRIVATO** (promesso per il 9/9)  ⟵ **PROMEMORIA** (nel repo NON ci sono contatti; solo script/conteggi).
- [x] Base Airtable "SolarBack — Lista Target" verificata VUOTA (0 record) e lasciata morta: non l'ho eliminata io, non serve toccarla.
- **NOTE VINCOLANTI 8/9:** Supabase `solarback` = DB vivo **+ backend dashboard CEO** (cruscotto da costruire) · Apify ora via **connettore nativo** (`mcp__Apify__*`), NON più via Composio.
- [ ] Valerio: cold call dalla vista `v_cold_call` di Supabase (mar→ven 10-12, 14:30-19); esiti in `stato`/`note_operative`.
- [ ] **Valerio (PROMEMORIA da non perdere): compra `solarback.it` → collega alla LANDING PAGE → collega all'EMAIL PRINCIPALE aziendale.** (Dominio primario da proteggere.)
- [ ] Valerio (deciso 7/9): 2 domini secondari cold-email (Cloudflare/IONOS) + Google Workspace caselle.
- [ ] Instantly (DOPO il merge, scelta CEO 8/9): key nel pannello "Credenziali API" (host `api.instantly.ai`) → DNS + warmup 14gg → campagna 1 con le 1.452 email (Tier A+B, tutta Italia).
- [ ] Io: collaudo Instantly con 20-30 email della fase1 → misurare bounce; se < 2% valutare fase2 (catch-all).

## 🚀 FASE ATTUALE (scelta CEO 6/9): INFRA COLD EMAIL — parte ora
Piano completo in `docs/13-infra-cold-email.md`. **In attesa decisioni CEO (popup posto):**
domini, Instantly Growth ora sì/no. (Geo: TUTTA ITALIA, deciso 8/9 — niente priorità regionale.)
Azioni CEO (una tantum) → poi io piloto via Composio:
- [ ] Comprare **2 domini** (variazione brand, mai il primario) — registrar Cloudflare.
- [ ] Creare **2 Google Workspace** (3 utenti/caselle l'uno) — ~€50/mese incl. IVA.
- [ ] DNS per dominio: **MX + SPF + DKIM (+"Start authentication") + DMARC(p=none) + CNAME tracking**.
- [ ] Sottoscrivere **Instantly Growth** ($47/mese) + generare **API key** → passarmela.
- [ ] Collegare le **6 caselle a Instantly via OAuth** (~15 min, guido io).
- [ ] Io: accendo warmup (14gg) + creo campagne/sequenze + carico lead + analytics.

## 📄 FASE PARCHEGGIATA: DOCUMENTI DEL CEO (quando li carica in chat)
Il CEO aveva scelto "documenti prima", poi ha dato priorità all'infra email. I documenti
non sono ancora arrivati. Protocollo per OGNI documento (log in `docs/10-materiale-CEO.md`):
1. [ ] Leggo tutto a fondo. 2. [ ] Estraggo i punti azionabili. 3. [ ] Dico cosa implemento
subito e cosa va in TODO. 4. [ ] Aggiorno i `docs/` + log `docs/10`. 5. [ ] Committo (se un
doc contraddice, lo segnalo, non sovrascrivo in silenzio).

## 🔎 Ricerche di mercato — FATTE (6/9)
- [x] Multipli di valutazione (→ `docs/11`: 2-4x oggi, 5-8x con le leve; formula run-rate).
- [x] Stagionalità FV + nicchie (→ `docs/12`: FV non morto, resto FV + hook fiscale).
- [x] Infrastruttura cold email: costi/DNS/Instantly/timeline (→ `docs/13`).
- [x] Dimensione mercato ICP: ~12k installatori reali, ~3-5k raggiungibili (→ `docs/02`).

## 🚦 GO-LIVE DELIVERY — checklist da NON mancare (n8n pronto, manca solo questo)
1. [ ] **Credenziale Google Calendar** in n8n (`artecagenzia@gmail.com`) — il booking
   la usa ancora (Airtable ha sostituito solo i Fogli).
2. [ ] **Numero WhatsApp dedicato** per M2 Database Reactivation → poi collego il trigger.
3. [ ] **(Opz.) CSV dei 3 fogli** se contengono dati veri → import in Airtable
   (Composio Sheets bloccato da scope app).
4. [ ] **Collaudo end-to-end** quando Valerio ha un telefono: attiviamo i workflow +
   simuliamo un lead (template → Alessandro qualifica → prenota → notifica titolare)
   per ads-path e DB-react-path. Solo dopo questo si va live.

## 📌 Note operative acquisizione (da tenere a mente)
- **Cold email:** Valerio farà **~100-150 email/giorno ultra-personalizzate (AI)**
  con **Instantly AI**.
- **Infrastruttura email da settare (con l'agente):** Google Workspace + domini
  secondari + **SPF / DKIM / DMARC** + warmup su Instantly, PRIMA di andare a volume
  (warmup ~2-3 settimane → va avviato presto per la deadline 26/10).
- **Prima di:** ICP list building e setup Instantly, il CEO ha **molti documenti**
  da farci analizzare e implementare per concretizzare SolarBack.

## 🔴 ADESSO (Settimana 0 — questa settimana)

- [x] **Verifica automazioni n8n** → fatta, `docs/09` (il motore è ben costruito).
- [x] **Sicurezza n8n**: chiavi Deepgram/Mistral spostate su credenziali (M2 speed).
- [x] **Fix difetto**: "Crea Appuntamento" resource/operation espliciti (M2 speed).
- [x] **Reorg layout**: M1 speed-to-lead (intake) riorganizzato.
- [x] **Migrazione Sheets → Airtable** dei 3 workflow originali (base "SolarBack —
      Operativo" `app3DAWI67LKIGLXO`, 5 tabelle). Vedi `docs/09`.
- [x] 🔴 **Valerio: ruotate le chiavi Deepgram e Mistral** (fatto).
- [x] **Adattato M2 Database Reactivation** (Airtable + prompt lead riattivati).
- [ ] 🔴 **Valerio: credenziale Google Calendar** in n8n (il booking usa ancora
      Google Calendar; i Fogli non servono più).
- [ ] 🔴 **Valerio: numero WhatsApp dedicato** per il trigger di M2 DB-react
      (poi collego la credenziale del trigger).
- [ ] **Dati fogli → Airtable**: Composio Sheets dà 403 anche dopo ri-auth →
      è la config scope dell'app Composio, non l'auth. Serve **export CSV** dei 3
      fogli (o abilitare lo scope Sheets-read nella dashboard Composio). Dati reali ~0.
- [x] **Reorg layout estetico** di tutti e 4 i workflow (corsie, flusso leggibile).
- [ ] **Collaudo end-to-end** appena Valerio ha un telefono/numero di test.
- [ ] **Lista installatori ICP v1** (150–300): aziende affamate, che **già
      investono in ads**, strutturate (più squadre/commerciali). Titolare +
      tel/WhatsApp diretto + email + città. → `private/`.
- [ ] **CRM/pipeline partner** (Airtable o Notion): stati + KPI acquisizione/delivery.
- [ ] **Script cold call** completo (base: one-liner `docs/07` §10) + sequenza email.
- [ ] **Setup Instantly** (domini + warmup) per la spinta email di metà sprint.
- [ ] **Primo contenuto LinkedIn** (autorità/founder) + chiarire ruolo Marco.
- [ ] **ICP + lista installatori v1** (150–300 aziende Fascia A/B): nome azienda,
      titolare, telefono/WhatsApp diretto, email, città, segnali di qualifica.
      Salvare in `private/`.
- [ ] **Script cold call** (apertura → gancio wedge → qualifica → fissa meeting).
- [ ] **CRM/pipeline partner** (Airtable o Notion): stati + KPI acquisizione.
- [ ] **Setup Instantly**: domini + inbox in warmup (parte ora, matura a metà sprint).
- [ ] **Sequenza cold email** (3–5 step) con offerta wedge.
- [ ] **Messaggi LinkedIn** (connection + DM) + **primo post** founder/autorità.

## 🟡 PROSSIMO (Settimana 1–2)

- [ ] Cold call ad alto volume ogni giorno + logging nel CRM.
- [ ] Chiudere **1–3 founding partner** con il wedge a rischio zero.
- [ ] Metterli in delivery su n8n → **primi sopralluoghi reali**.
- [ ] Raccogliere numeri/screenshot per **primo case study**.

## 🟢 DOPO (Settimana 3+)

- [ ] Pubblicare case study/prova sociale su tutti i canali.
- [ ] Instantly a regime + volume cold call con leva risultati.
- [ ] Upsell pacchetto completo + spinta finale ai 30.

## Sistema/repo (manutenzione agente)
- [ ] Man mano che arrivano dati reali, aggiornare `STATO-ATTUALE.md` e i `docs/`.

---

### ✔️ Fatto
- [x] 2026-09-05 — Analisi completa business + sito + funnel.
- [x] 2026-09-05 — Pulizia branch `Solarback-Growth-Agents` + setup sistema
      operativo del repo (CLAUDE.md, docs, sprint, todo, decisioni).
- [x] 2026-09-05 — Round-1 + round-2 domande al CEO.
- [x] 2026-09-05 — Ricerca (competitor + VOC + framework) → `docs/08`.
- [x] 2026-09-05 — Offerta costruita e **v2 congelata** (round-3, numeri reali) → `docs/07`.
