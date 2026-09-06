# 09 — Delivery / stato automazioni n8n (verifica 2026-09-05)

> Assessment fatto ispezionando direttamente n8n via MCP. **Nessuna credenziale/
> API key riportata qui** (alcune sono hardcodate nei workflow — vedi §Sicurezza).

## Verdetto in una riga
Il motore di delivery **NON è uno scheletro: è costruito sul serio e in modo
sofisticato.** Manca soprattutto **attivazione + collaudo live + pulizia dei
doppioni + verifica credenziali/servizi**. Il CEO aveva ragione: "quasi
pronte/collaudate" è corretto.

## Architettura confermata dal CEO (5/9) + i 4 workflow da collaudare
- **Alessandro = segreteria AI CONDIVISA** su Meta WhatsApp Business: un numero che
  qualifica i lead di **più partner** (non un agente per cliente). In futuro si
  aggiungono altri numeri = altri "segretari". SolarBack di fatto **affitta un
  reparto segreteria**.
- **Flusso SPEED-TO-LEAD (lead nuovi dalle ads):**
  - **M1 speed-to-lead** (intake): Meta/Facebook Lead Form → *(webhook)* → pulizia
    telefono + validazione → lookup campagna (foglio Campagne_Attive) → wait 25s →
    invio **template WhatsApp** (`conferma_requisiti_alessandro`) → append riga in
    **Lead_Attivi**. ⚠️ **Il trigger Meta/Facebook Form NON è ancora collegato**:
    oggi è un webhook grezzo `POST /webhook/lead-solecasa` (n8n.artecai.cloud) che
    si aspetta `{nome, Telefono, "Codice Campagna"}`. Questo è **l'anello mancante
    più a rischio**.
  - **M2 speed-to-lead = Alessandro** (conversazione): quando il lead risponde, il
    WhatsApp trigger di Alessandro gestisce tutta la qualifica → booking.
- **Flusso DATABASE REACTIVATION (lead vecchi):**
  - **M1 DB-react**: schedulato, manda il template `ricontatto_v1` ai lead dormienti.
  - **M2 DB-react**: risponde ai lead che rispondono. ❓ **Da chiarire:** è un
    workflow separato o è lo stesso Alessandro (il suo WhatsApp trigger cattura
    tutte le risposte in ingresso)? Nell'istanza vedo un solo "Alessandro".
- **Totale: 4 workflow da collaudare** (2 speed + 2 DB-react).

## Cosa esiste (workflow SolarBack, ~14 su 49 totali nell'istanza)
> Nota: molti degli altri 49 workflow sono di ALTRI progetti del CEO (Studio
> Virtù/PROGETTO PROF, Rivolio, ZeroBattute) — dimostrano che sa costruire n8n
> di alto livello. Tutti i SolarBack risultano `active:false` e con data
> 2026-08-05 (probabile import in blocco: la data NON riflette lo sviluppo reale).

### SOLARBACK - SERVICE (delivery)
- **M2 - AI speed to lead** — *ispezionato, di ottimo livello.* WhatsApp trigger →
  gestisce testo/audio/foto (Deepgram per i vocali, Mistral OCR per le bollette) →
  debounce 30s + buffer + lock su **Redis** (evita doppi invii) → **agente AI
  "Alessandro"** (modello DeepSeek) con memoria su **Supabase/Postgres** e tool:
  Google Calendar (disponibilità/crea/modifica/cancella), ricerca **casi studio**
  vicini (social proof), **notifica al titolare** via WhatsApp → invio risposta
  (testo o foto). **Multi-tenant**: legge Google Sheet "SolarBack Configurazione
  Clienti" (Lead_Attivi, Campagne_Attive per cliente). Questo È il cuore del servizio.
- **M1 - AI speed to lead** — probabile versione precedente/duplicato di M2.
- **ARTEC — WA Conversation Manager** — gestione conversazioni WA (non ispezionato;
  `availableInMCP:false`).
- **M1 - AI database reactivation** — *ispezionato, completo.* Schedulato lun-ven
  9:00 → legge config clienti → filtra lead dormienti (deny-list stati, quota/dì,
  normalizzazione telefono) → invia template WhatsApp "ricontatto_v1" con
  **anti-ban** (attese randomiche) → writeback stato. Multi-tenant.

### SOLARBACK - MARKETING (acquisizione lead consumer + qualifica) — da ispezionare
- **M1 - Sorgente Lead Unica** (intake lead) · **M-Router - Smistamento Canali** ·
  **M2 - Arricchimento & Qualifica** · **M3 - Classifica & Personalizza** ·
  **M0 - Sorveglianza Errori** · **Zadarma Cold Call → Deepgram → LEADS**.
- ⚠️ Da verificare: **come entrano i lead dalle Meta Ads** fino al foglio
  "Lead_Attivi" che alimenta lo speed-to-lead (l'anello ads→lead→sheet→AI).

### Altri
- **SOLARBACK - Anti No-Show v2** (promemoria appuntamenti) · **analizzatore di
  BACINO** · **ARTEC Solar - Webhook Handler (risultati chiamate)**.

## Gap da chiudere PRIMA di garantire volumi (100-300/mese)
1. **Attivare + collaudo end-to-end live** con un numero WhatsApp reale (tutti
   `active:false` ora).
2. **Pulire i doppioni** (M1 vs M2 speed-to-lead, ecc.): scegliere il canonico,
   archiviare il resto → evitare confusione in produzione.
3. **Verificare credenziali/servizi live:** WhatsApp Business API (+ template
   approvati tipo `ricontatto_v1`), Deepgram, Mistral, DeepSeek, Redis, Supabase,
   Google Sheets/Calendar (`artecagenzia@gmail.com`).
4. **Verificare l'anello di intake** ads→lead→"Lead_Attivi"→speed-to-lead.
5. **Scala:** con più partner servono più numeri/limiti WhatsApp; l'architettura
   (multi-tenant + Redis + Supabase) regge, ma i limiti WA API vanno pianificati.

## 🏗️ Decisioni architetturali (5/9) — intake multi-tenant & inbound

### Intake Meta multi-partner: NO a "un workflow per partner"
Problema del CEO: il nodo nativo **n8n Facebook Lead Ads Trigger = una pagina per
trigger** → implicherebbe un workflow per ogni partner (non scala a 30+).
**Raccomandazione: UN solo intake multi-tenant** alimentato dal **Leggen Webhook
a livello di APP Meta** (non dal trigger per-pagina):
- Una Meta app iscritta al campo `leadgen`. Ogni pagina partner collegata fa il
  POST allo **stesso** webhook con `page_id` + `form_id` + `leadgen_id`.
- Il workflow recupera i campi del lead via Graph API e **instrada per
  `page_id`/`form_id` → foglio Campagne_Attive** (già la logica di lookup esistente).
- **Onboarding partner = collega la sua pagina all'app + 1 riga di config.** Zero
  nuovi workflow. `Codice Campagna` diventa il `form_id` (automatico da Meta).
- Il webhook grezzo attuale (`lead-solecasa`) è già il 90% di questo schema: va
  solo cambiata la sorgente (webhook Meta) e il routing per page/form id.
- ⏳ La parte LIVE Meta si accende al **primo partner** (serve la SUA pagina), ma
  l'intake multi-tenant si costruisce ora e si "flippa" all'onboarding.

### Vincolo WhatsApp: un numero = UN webhook inbound
Un numero WhatsApp consegna TUTTI i messaggi in arrivo a **un solo** webhook (e
più numeri sotto la stessa WABA colpiscono lo stesso webhook dell'app). Quindi
**non si possono avere due workflow WhatsApp-trigger attivi sullo stesso numero**
→ un "M2 DB-react" separato con trigger proprio **andrebbe in conflitto con
Alessandro**. Due strade:
- **(A) Cervello inbound unico (consigliato):** Alessandro è l'unico handler in
  ingresso; guarda il numero nel foglio e **ramifica** (lead da ads → flusso ads;
  lead da DB-react → flusso DB-react; stessi tool di booking). Scala a più partner
  E più "segretari" (ramifica per `phone_number_id` per caricare persona/config).
  La logica "M2 DB-react" vive come **branch/sub-workflow** dentro Alessandro.
- **(B) Numero dedicato** per la DB-react (altra "segretaria") — più numeri da
  gestire, ma separazione netta. → da confermare col CEO.

### Piano di collaudo (senza partner, WhatsApp già live)
Validiamo ~95% ORA con un **lead simulato**: riga di config di TEST + POST al
webhook col numero personale di Valerio come "lead" → verifica template →
Alessandro qualifica → prenota su Calendar → notifica titolare. Idem DB-react
(numero come lead dormiente → M1 → risposta). L'unico pezzo non provabile fino al
partner #1 = l'auto-feed live Meta→webhook (che pre-costruiamo).

## 📊 Data model (ricostruito dai workflow) + onboarding per partner
> Lettura diretta dei fogli via Composio bloccata da scope insufficiente (403) —
> link di ri-autorizzazione generato per Valerio. Sotto: modello ricostruito dai
> nodi (da confermare sui fogli veri quando l'accesso è a posto).

**Foglio "SolarBack - Configurazione Clienti"** (`1nJFPyuMC…`):
- Tab **Campagne_Attive** (config per partner/campagna): `ID_Chiave_Form`,
  `Nome_Azienda`, `Nome_Pagina_FB`, `Offerta_Ads`, `Zona_Competenza`,
  `Telefono_Titolare` (per la notifica titolare).
- Tab **Lead_Attivi** (lead live): `Nome`, `Telefono`, `ID_del_Form_cliente`,
  `Nome_Azienda`, `Nome_Pagina_FB`, `Offerta_Ads`, `Stato_Invio_primo msg`,
  `ora di submit`, `data di submit`.

**Foglio "ARTEC - M1 Clienti Config (Database Reactivation)"** (`1iEhQU5…`, Foglio1):
`cliente_id`, `nome_cliente`, `attivo` (SI/NO), `quota_giornaliera`, `waba_phone_id`,
`waba_nome`, `template`, `ragione_sociale`, `settore_prodotto`, `spreadsheet_id`,
`gid`. → ogni cliente punta al proprio foglio di lead dormienti (`ID Lead`, `Nome`,
`Telefono`, `Stato`, `Ultimo Contatto`, `Note Sistema M1`).

**Foglio "SolarBack - Social Proof"** (`14FiYek…`, tab "casi studio"): usato da
Alessandro per il social proof; include almeno città/zona, risultato e `Link immagine`.

### Checklist onboarding di UN partner (bozza)
1. **Campagne_Attive**: 1 riga (azienda, pagina FB, offerta ads, zona, tel titolare,
   ID_Chiave_Form = `form_id` della sua Meta Lead Form).
2. **Intake Meta**: collega la sua pagina FB all'app Meta (leadgen webhook).
3. **Speed-to-lead**: nessun nuovo workflow (multi-tenant).
4. **DB-react** (se attivo): riga in config DB-react + il suo foglio lead dormienti
   + (decisione CEO) **numero WhatsApp dedicato** per la segreteria DB-react.
5. **Social Proof**: aggiungi eventuali casi studio della sua zona.

## 🧪 Piano di collaudo (cosa serve da Valerio)
1. **Numero WhatsApp di Valerio** da usare come "lead" di test.
2. **OK ad attivare in modo controllato** i 2 workflow service per il test
   (speed-to-lead intake + Alessandro), poi ri-disattivare.
3. (Opz.) **ri-autorizzare Composio** (lettura Sheets) per verificare i fogli veri.
4. Per la DB-react: un **secondo numero WhatsApp** (segreteria dedicata) — se non
   c'è ancora, si collauda dopo, con numero di test.
Sequenza test: creo riga config di TEST → POST al webhook col numero di Valerio →
verifico template `conferma_requisiti_alessandro` → rispondo → Alessandro qualifica
→ prenota su Calendar → notifica titolare → cleanup.

## 🔧 Collaudo a livello di nodi — interventi (2026-09-05)
> Fatto via MCP con `update_workflow` (ops granulari) + storico versioni come rete
> di sicurezza. Test end-to-end rimandato (Valerio senza telefono) → collaudo
> strutturale/validatore.

**M1 speed-to-lead (`6Kik…`)** ✅ layout riorganizzato (flusso lineare
sinistra→destra, ramo NoOp sotto). Nessuna modifica funzionale.

**M2 speed-to-lead / Alessandro (`IN43…`)**:
- ✅ **Sicurezza:** chiavi **Deepgram** e **Mistral** tolte dai nodi HTTP (erano
  hardcodate in chiaro) → ora usano credenziali n8n (`ZB Deepgram` httpHeaderAuth;
  `Mistral AI` predefinedCredentialType). Chiavi rimosse dal JSON del workflow.
  🔴 **DA FARE (Valerio):** RUOTARE comunque le 2 chiavi lato Deepgram/Mistral
  (erano esposte, cambiarle invalida quelle vecchie).
- ✅ **Difetto risolto:** il tool **"Crea Appuntamento"** (Google Calendar) non
  aveva `resource`/`operation` espliciti (girava sui default) → resi espliciti
  (`event`/`create`). Il validatore ora non lo segnala più.
- ⚠️ Warning cosmetico residuo: `headerParameters` vuoto sui 2 nodi HTTP (innocuo
  a runtime; sistemabile in UI togliendo la riga header vuota).
- ⏳ Layout: riorganizzazione estetica dei 40 nodi ancora da fare.

## ⚠️ Blocco credenziali Google (da verificare con Valerio)
Tra le 18 credenziali n8n **non compare nessuna credenziale Google** (Sheets /
Calendar), ma i workflow usano nodi Google Sheets e Google Calendar
(`artecagenzia@gmail.com`). O la credenziale è in un altro progetto/istanza, o
manca. **Senza credenziale Google, speed-to-lead e DB-react non girano.** Da
sistemare prima del collaudo live.

## 🏗️ M2 Database Reactivation — spec di build (prossimo step)
Da costruire (decisioni CEO): **clone di Alessandro** con: persona/prompt adattati
al contesto "lead vecchio riattivato" (non nuovo), **config partner unificata**
(stessa "Configurazione Clienti"), **numero WhatsApp dedicato** (trigger + cred da
collegare dopo). Stessi tool (calendar, qualifica, notifica titolare, social
proof), stesso sistema buffer/lock Redis. È l'unico pezzo mancante dei 4.

## 🗄️ Migrazione Google Sheets → Airtable (2026-09-06)
Decisione CEO: sostituire TUTTI i nodi Google Sheets con Airtable (risolve anche il
buco della credenziale Google per i Fogli). Fatto:
- **Base Airtable creata:** "SolarBack — Operativo" — `app3DAWI67LKIGLXO`
  (credenziale n8n usata: `Airtable - Valerio Alieri`, id `NYTtV3vWLqXxfcty`).
- **Tabelle** (nomi campi identici ai vecchi fogli → espressioni invariate):
  - Campagne_Attive `tblZHgseG0MJbhCTK` (config partner per gli Alessandro)
  - Lead_Attivi `tblYyKlr4lgqjnXhq` (lead ads)
  - Clienti_Config_DBReact `tblJdBNWVMad9eRlx` (config sender DB-react; arricchita
    con Nome_Azienda/Offerta_Ads/Zona_Competenza/Telefono_Titolare per la conversazione)
  - Lead_Dormienti `tblo6UugmpnEsOj00` (lead vecchi, unificati con `cliente_id`)
  - Casi_Studio `tblo2HmOoS2AQq4V2` (social proof)
- **Workflow migrati (Sheets→Airtable, 0 warning):**
  - ✅ M1 speed-to-lead (intake): Get row → Campagne_Attive; Append → Lead_Attivi.
  - ✅ M2 speed-to-lead (Alessandro): Get Lead → Lead_Attivi; Get Config →
    Campagne_Attive; Cerca Casi Studio (tool) → Casi_Studio.
  - ✅ M1 DB-react: Leggi CLIENTI_CONFIG → Clienti_Config_DBReact; Leggi Lead
    Dormienti → Lead_Dormienti (filtro `cliente_id`); Writeback ×2 → upsert su
    match `ID Lead`.
- ✅ **M2 - Database Reactivation** (`LlS1T24dRdXtZiNF`, ex duplicato): MCP
  attivato da Valerio → adattato. Nodi ad Airtable per il contesto DB-react
  (Get Lead → Lead_Dormienti by Telefono; Get Config → Clienti_Config_DBReact by
  cliente_id; Casi Studio → Casi_Studio), **prompt riscritto** per il ricontatto
  di lead vecchi, rinominato. ⏳ Resta da collegare il **trigger WhatsApp sul
  numero dedicato** (credenziale del secondo numero, quando disponibile).
- 📋 **Dati NON migrati:** tabelle VUOTE (solo struttura). Composio Sheets dà 403
  **anche dopo due ri-auth** (2026-09-06) → NON è l'autorizzazione utente, è la
  **config degli scope dell'app Google Sheets in Composio** (manca Sheets-read).
  Il link di ri-auth NON risolve. Per i dati serve: (a) abilitare lo scope
  Sheets-read nella dashboard Composio, oppure (b) **export CSV** dei 3 fogli →
  import in Airtable. Dati reali ~0 (0 clienti) → probabilmente nulla da migrare.
  Struttura verificata SOLO contro i riferimenti dei workflow.
- ✅ **Layout estetico** riorganizzato su tutti e 4 i workflow (corsie, flusso
  leggibile sinistra→destra, sub-nodi agente sotto, cleanup a destra).

## ⚠️ Nota: il Calendar resta Google
La migrazione riguarda i FOGLI. Il **booking usa Google Calendar** (Get-Availability,
Crea/Modifica/Cancella Appuntamento su `artecagenzia@gmail.com`) → serve ancora una
**credenziale Google Calendar** in n8n (o si valuta un booking alternativo). Il
buco "credenziale Google" ora riguarda solo il Calendar, non più i Fogli.

## 🔴 Sicurezza (da sistemare)
Alcuni nodi HTTP hanno **API key hardcodate in chiaro** (Deepgram, Mistral) dentro
il workflow. Rischio: finiscono negli export/backup e sono visibili a chiunque
apra il workflow. **Azione:** spostarle nelle *Credentials* di n8n e **ruotare le
chiavi** esposte. (Le chiavi NON sono riportate in questo repo.)

## Implicazione strategica
La garanzia dell'offerta (`docs/07`) è **credibile**: la macchina per erogarla
esiste ed è ben fatta. Ma la garanzia regge solo dopo **attivazione + collaudo**.
Quindi: prima di chiudere partner con garanzie forti, chiudere i gap 1-4 sopra
(soprattutto 1 e 4). È un lavoro di **giorni**, non di settimane.
