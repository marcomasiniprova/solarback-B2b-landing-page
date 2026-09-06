# ✅ TODO — azioni prioritarie

> Ordine = priorità. Spunta `[x]` quando fatto, sposta i completati in fondo,
> aggiorna a fine sessione. Dettaglio piano → `SPRINT-26-OTTOBRE.md`.

## 🎯 OBIETTIVO ATTUALE (aggiornato 6/9) — sostituisce "30 partner"
**≥ €200.000** e **valutazione SolarBack ≥ €1.000.000 entro il 26/10.** Multiplo
~10-15x (anchor 12x) → servono ~€67-100k EBITDA annuo/run-rate. Matematica in
`docs/11-valutazione-obiettivo.md`. (Il n° di clienti conta solo in quanto genera EBITDA.)

## 📄 FASE ATTUALE: DOCUMENTI DEL CEO (full focus)
Protocollo per OGNI documento che il CEO carica in chat (log in `docs/10-materiale-CEO.md`):
1. [ ] Leggo tutto a fondo.
2. [ ] Estraggo i punti che generano azione (offerta, ICP, messaggi, funnel, pricing, processi).
3. [ ] Dico cosa implemento subito e cosa va in TODO/arretrati.
4. [ ] Aggiorno i `docs/` giusti + il log `docs/10`.
5. [ ] Committo. Se un doc contraddice quanto scritto → lo segnalo, non sovrascrivo in silenzio.

## 🔎 In corso (ricerche di mercato — 6/9)
- [ ] Multipli di valutazione per azienda AI-native (→ affina `docs/11`).
- [ ] Stagionalità FV autunno/inverno + nicchie adiacenti (pompe di calore ecc.):
      capire se restare sul FV o affiancare/deviare (contro-stagionalità).

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
