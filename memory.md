# memory.md — La memoria permanente dell'agente SolarBack

> Se un giorno perdo tutto il contesto, questo file + `CLAUDE.md` mi fanno ricapire chi è
> Valerio, come lavora, cosa stiamo facendo e dove siamo. Aggiornare a fine sessione.

---

## 1. CHI È VALERIO (il capo)
- **Valerio Alieri** — Founder & CEO di **SolarBack** (brand verticale di **artec AI**).
- Imprenditore veloce, intelligente, esperto. Vuole **qualità + velocità**.
- **Salute (importante):** dichiara **forte mal di testa, problemi di memoria e di comprensione.**
  → spiegargli tutto **chiaro, semplice, ordinato**; professionale ma anche "da principiante"
  sulle cose tecniche; ricontestualizzare sempre (non dare per scontato che ricordi).
- Contatti: `profiloprimicontent@gmail.com` (identità) · `valerio@artecai.it` / `team@artecai.it`
  · WhatsApp **+39 327 317 4931**.

## 2. COME LAVORARE CON LUI (regole vincolanti — round 1-2, poi altri)
1. **Chat prima dei file.** Non legge quasi mai i file. File solo per riferimenti veri
   (offerta, dati, config, questo file). Mai un file per risposta. Se tocco un file → 1 riga di spiegazione.
2. **Output "perfetto":** né vago né prolisso; dritto al punto MA spiega bene ciò che va spiegato.
   Punta ai RISULTATI, struttura visiva (bullet, grassetti, numeri).
3. **Recap "dove siamo" (2 righe) a inizio di OGNI risposta.**
4. **Autonomia = bias all'azione.** Procedo; mi fermo solo per bivi grossi / soldi / irreversibile.
   **Minimizzo le domande** (lo infastidiscono).
5. **Decisioni:** portarle come **2-3 opzioni con pro/contro** (meglio popup) → sceglie lui.
6. **Aggiornamenti: SOLO a lavoro finito** (non disturbarlo mentre lavoro a cose lunghe, salvo blocco).
7. **Tono:** diretto, conciso, **brutale-onesto**. Zero piaggeria/yes-man/rigidità. Mettilo in
   discussione quando sbaglia. Motivalo **solo con prove**; se va male, dirlo secco. Sono il suo mentore.
8. **DATI = SEMPRE ricerca online**, mai da memoria/training vecchio. Mai cavolate, mai false promesse.
9. **Linee rosse (evita sempre):** ① file inutili/troppi ② risposte vaghe/gonfiate
   ③ troppe domande/lentezza ④ addolcire la verità/gergo tecnico.
10. **REGOLA DISCOVERY:** a ogni suo prompt → **4 domande popup** per capirlo e allinearsi,
    e **appuntare tutto qui**. ⚠️ Tensione con #9③: farle **utili e pertinenti**, non di numero.
11. **`copertura-prompt` obbligatoria** sui prompt multi-istruzione → blocco `COPERTURA: n/tot`.
12. **TERMINOLOGIA FISSA (vedi `GLOSSARIO.md`) — usa SEMPRE questi, mai sinonimi:**
    **ICP** = i criteri (non una lista) · **Lista Target** = le aziende che sembrano in target ·
    funnel: **Contatto → Interessato → Qualificato → Partner** · cliente finale = **Partner**.
    Vietato usare in chat: "prospect/suspect/lead", "lista ICP", "cliente".
- **13. Cold call = SOLO Valerio.** È l'unico outreach che fa lui a mano; io non "faccio" chiamate, gli preparo liste e
  script. Mar→ven 10-12 e 14:30-19, lunedì mai (dettaglio `docs/05`).
- **13-bis. NIENTE priorità geografica** (deciso 8/9): la lista è NAZIONALE, tutta Italia allo stesso peso. Rimosso ovunque il "prima Lombardia/Veneto/nord". Le colonne REGIONE/PROVINCIA restano solo come dato per filtrare a mano.
- **14. MAI più citare vincoli tipo RPO/consenso WhatsApp** (mi ha detto "smettila"): i cellulari/WhatsApp dei titolari
  si chiamano tranquillamente; le email si mandano a qualsiasi azienda/titolare (B2B). L'unico limite vero: **mai B2C.**
- **15. Verificatore email fisso = Apify `blessiticus/email-verifier-pro`** (via Composio). **NO openapi.com** (troppo caro).

## 3. COS'È SOLARBACK
- Reparto acquisizione clienti esterno per **installatori fotovoltaici in Italia** (B2B PMI,
  decisore = titolare). A performance: **~99€/sopralluogo + 400€/contratto**; **le ads le paga il cliente**.
- Scala reale: 100-300 sopralluoghi/mese per partner; cliente investe ~3.000€/mese ads; 30-100 impianti/mese.
- Moat = il **sistema AI** (speed-to-lead, qualifica, CRM, reactivation), non le Meta Ads.
- ICP: aziende affamate, strutturate, growth-minded (NO artigiani/"provo gratis"). Dettaglio `docs/02`.

## 4. OBIETTIVO (deadline 26/10/2026)
- **≥ €200.000 cassa** nei ~50 giorni **+ valutazione ≥ €1.000.000** entro il 26/10.
- Valerio **100% quote**, **nessun acquirente** → traguardo di **patrimonio personale** (milionario sulla carta).
- Formula: valutazione = **run-rate annuo ricorrente × multiplo**. Mercato oggi 2-4x → servono
  ~€21-42k/mese ricorrenti; per 5-8x servono ricorrenza contrattuale + churn~0 + più clienti +
  stack AI trasferibile. Matematica completa `docs/11`.

## 5. BRAND & DOMINI (deciso 2026-09-06)
- **artec AI** = agenzia madre (nome flessibile: se un domani aggiunge pompe di calore ecc., nuovo
  brand verticale sotto artec AI, SENZA rinominare SolarBack).
- **SolarBack** = brand verticale FV (specifico → converte meglio nel cold outreach). **Si resta FV**:
  il FV NON è morto d'inverno (vedi `docs/12` + §7).
- **`solarback.it`** (Valerio lo compra, disponibile) = **SITO + email vera del brand** → da PROTEGGERE,
  mai cold-send da qui.
- **2 domini secondari `.it`** (es. getsolarback.it, solarbackpartners.it) = **SOLO invio cold email**,
  usa e getta, fanno redirect 301 a solarback.it. Le 6 caselle Google Workspace stanno QUI, non su solarback.it.
- Registrar: **IONOS** (di Valerio, va bene). TLD **.it** (fiducia coi target IT; deliverability ~= .com se autenticato).

## 6. STACK & TOOL
- **DB VIVO = SUPABASE (scelta CEO 8/9, al posto di Airtable).** Motivo: Airtable Free = 1.000 record/base (noi ~18k),
  Team $20-24/mese; Supabase = SQL vero, righe illimitate, **$10/mese** (nuovo progetto nell'org, costo letto dall'API).
  Progetto **`solarback`** id **`dziylyrneqeamqzatdzo`** (eu-central-1, org "Valerio - Artec AI progetti").
  Tabelle: **`aziende`** 8.498 (6.659 Lista Target + 1.839 Scarti; colonne = CSV in minuscolo + campi vivi `stato`
  Contatto→Interessato→Qualificato→Partner/Perso/Escluso, `ultimo_contatto`, `canale_ultimo`, `note_operative`) ·
  **`persone`** 5.777 (fk `id_sb`) · **`verifica_email`** 5.849 (3.895 iniziali + 1.954 dell'arricchimento; `fase1_ok`
  calcolato) · **`arricchimento_sito`** 2.674 (contatti trovati sulle home, fonte/dataset/data, `mergiato_il`) ·
  `enrich_dom2id`. Viste: `v_lista_target`, **`v_cold_email` 2.236 pronte**, **`v_cold_call` 5.788 con telefono**.
  Bucket Lista Target (8/9 sera): EMAIL_TITOLARE 647 · EMAIL_GENERICA 806 · EMAIL+MOBILE_TITOLARE 134 ·
  EMAIL+MOBILE_GENERICA 649 · SOLO_MOBILE 2.780 · SOLO_FISSO 1.335 · SOLO_SOCIAL 308. Schema `scripts/supabase_schema.sql`;
  bulk `scripts/supabase_load.py` (PostgREST, upsert idempotente) + riconciliazione `scripts/supabase_audit.py` + merge
  arricchimento `scripts/supabase_merge_enrich.py`.
  **Sicurezza:** RLS attivo senza policy + revoke ad anon/authenticated → la chiave publishable NON legge nulla; i dati
  si toccano da pannello Supabase o MCP `execute_sql`. Per un nuovo bulk: grant temporaneo → carica → revoke.
  Base Airtable "SolarBack — Lista Target" creata per sbaglio prima del cambio: VUOTA, Valerio la cancella.
- **Composio** (connettore: Apify, altri) · **Apify** (account free: $5/mese, 4 run paralleli, 100 email/run sul verifier;
  run SEMPRE async → mai `waitForFinish`, il tool MCP ha 60s di timeout) · **Instantly** (cold email) · **Airtable**
  (SOLO base "SolarBack — Operativo" per la delivery n8n, NON il DB contatti) · **n8n** self-hosted (delivery) · GitHub ·
  Netlify (sito) · Google Workspace (caselle).
- **Verificatore email FISSO (scelta CEO 7/9): Apify `blessiticus/email-verifier-pro`** — $0,85/1k email, output
  status (valid/risky/invalid/unknown) + catch-all + role-based + confidence. Si usa su OGNI nuova lista prima di Instantly.
  Policy: fase1 = valid + role-based non catch-all; catch-all esclusi (bounce atteso 7-12%).
- **Arricchimento:** sito "chi siamo" → FB about → Apify GMaps contact-details. **NO openapi.com** (scelta CEO: troppo caro).
- **Pipeline dati:** Python (`scripts/`), pandas, phonenumbers, rapidfuzz; audit riproducibile.

## 6-bis. PROFILO VALERIO (round-3, 2026-09-06)
- **Esperienza:** mix discreto — ha **già avuto un'agenzia / venduto servizi simili** + sa
  vendere (cold call), ma il lato **agenzia/marketing/tech è in parte nuovo** → non spiegargli le
  basi di vendita, MA spiega bene tech/marketing/automazioni.
- **Budget reale 50 giorni:** **€150-400/mese** se serve per partire (aggiorna il vecchio "max
  ~100€/mese", che valeva solo per i tool). L'infra (~€100-130/mese) ci sta comoda.
- **Team:** **solo Valerio + AI.** Niente Marco (la skill che lo cita NON riflette la realtà).
- **Collo di bottiglia #1 (sua auto-diagnosi):** **trovare/contattare i lead giusti** (liste +
  outreach). → è la priorità operativa: lista ICP + motore di outreach.
- **KPI:** vuole una **dashboard vera** (cruscotto live) da aprire quando vuole (Airtable/custom).
- **DEVE approvare SEMPRE (il resto lo faccio io):** ① spese sopra soglia ② scrivere/contattare
  a suo nome (email/msg reali a prospect) ③ cambiare offerta/prezzi ④ pubblicare contenuti pubblici.
- **Tempo:** full, **7+ ore/giorno, tutti i giorni** fino al 26/10 → risponde in giornata.

## 6-ter. ASSET LISTA TARGET (✅ costruita, verificata, collaudata — e dall'8/9 VIVE SU SUPABASE)
- **Dove vive (8/9):** **Supabase, progetto `solarback`** (vedi §6) — unica fonte di verità. Migrazione 8/9 sera:
  riconciliazione cella per cella CSV↔DB = **588.634 celle confrontate, 0 differenze** (`asset/AUDIT_SUPABASE.md`).
  Dopo l'audit, su ordine del CEO, **eliminati** MASTER/SCARTI/PERSONE/verifica CSV, xlsx, zip e file di lavoro
  (`private/out/` contiene solo `enrich_dom2id_full.json`, mappa dominio→id_sb per il merge). Il CEO ha il suo zip di
  backup in chat. `private/raw/` (i suoi 11 file originali) e `verify_chunks/` restano finché non li cancella lui o
  finché il container non si spegne (git-ignored, mai nel repo).
- **Fonti (storia):** 11 file di Valerio (GSE, Outscraper, Apify GMaps/leads/people, Foglio5, FB, Ads Library). Pipeline
  riproducibile `scripts/build_lista_target.py` + audit `scripts/audit_lista_target.py` (servono i raw: oggi non più
  in locale → da qui in poi si aggiorna il DB, non si ricostruisce da zero). `asset/LOG.json` + `asset/AUDIT.md` = numeri.
  Il repo è ancora PUBBLICO → nel repo NON ci sono contatti (solo script e conteggi).
- **Numeri (7/9 sera):** 27.132 righe grezze → 8.498 aziende uniche → **6.659 Lista Target** + 1.839 SCARTI (con motivo).
  Tab: EMAIL_TITOLARE 631 · EMAIL_GENERICA 443 · EMAIL+MOBILE_TITOLARE 106 · EMAIL+MOBILE_GENERICA 272 · SOLO_MOBILE 2.754 ·
  SOLO_FISSO 1.817 · SOLO_SOCIAL 636. **Email pronte per Instantly 1.452** (737 al titolare, 715 generiche/freemail) ·
  mobile 3.132 · FB_ADS attive 608 · Tier A 156 / B 1.061 / C 5.442 (senza bias geografico) · PERSONE 5.777 · 608 possibili
  doppioni (flag `POSSIBILE_DOPPIONE`, lasciati separati per scelta CEO).
- **Verifica email (fatta 7/9):** tutte le 3.895 email → Apify `blessiticus/email-verifier-pro` via Composio (39 run × 100,
  ~$3,4). Esito: 1.841 valid · 1.742 risky (970 catch-all, 770 role-based) · 123 invalid · 189 unknown.
  **Policy fase1 (scelta CEO dopo ricerca):** in lista solo valid + risky role-based NON catch-all = 2.584 email usabili;
  catch-all/unknown/invalid ESCLUSE (colonna `EMAIL_SCARTATE_VERIFICA`; 773 aziende hanno perso l'email e sono scese nei
  tab telefono). Fase2 (aggiungere catch-all) solo se il bounce della fase1 resta < 2%.
- **Audit automatico (`AUDIT.md`): TUTTO OK.** Riconciliazione righe grezze → aziende: 19.898 lette = 19.898 presenti
  (nessuna persa, nessuna assegnata due volte); tab = partizione; contatti condivisi tutti flaggati; email tutte verificate
  e in policy; PEC mai come EMAIL_1; mobili tutti +393. L'audit ha trovato e ho corretto: 3 "cellulari" +39434… (fissi
  senza lo 0), 61 email di terzi presenti su ≥3 aziende (sportelli, web agency → `EMAIL_SOSPETTE`), freemail aziendali
  (es. nomeazienda@libero.it) spostate nel tab GENERICA. Campioni per controllo a mano: `AUDIT_CAMPIONI.csv` (100 righe).
- **Regole applicate:** storico chiamate ignorato · 1 riga = 1 azienda + titolare · filtro aggressivo (in dubbio → SCARTI) ·
  fusione solo tra nomi compatibili + valvola max 3 nomi/cluster · Excel minimal (header bold, filtri, freeze).
- **Limiti onesti:** ~30% senza provincia · 72 PEC (mai cold) · rumore residuo possibile (Valerio segnala, io rifinisco) ·
  l'audit prova la coerenza interna, NON che un'azienda sia davvero in target (lo dice solo la call).
- **⚠️ PROMEMORIA REPO (deciso 8/9):** Valerio rende il repo **PRIVATO DOMANI** (Settings→General→Danger zone→Change
  visibility). Su sua richiesta esplicita l'asset coi contatti è GIÀ committato sul ramo pubblico ORA (se ne assume il
  rischio; io l'ho segnalato). Appena è privato: ok, resta com'è.
- **ARRICCHIMENTO (deciso 8/9, attore fisso):** Apify **`vdrmota/contact-info-scraper`** (Contact Details Scraper),
  pricing **$0,002/pagina** (add-on OFF). **USARE maxDepth=0 (solo home)**: a profondità 1 il crawler si mangia il budget
  sui primi siti (lezione appresa). Poi ri-verifica le email trovate col verifier fisso. Tutta Italia, 2.674 domini con sito.
  **TEST 100 siti (7/9): resa 70% email · 51% cellulare nuovo · 85% almeno un contatto; costo ~$0,0015/sito.**
  → **run nazionale completo stimato ~$5-6** (crawl ~$4 + ri-verifica ~$1,6) → ~1.870 email + ~1.360 cellulari recuperati.
  NO openapi. NB: le run girano sull'account Apify id 3SPijJU… (il verifier girava su 9bQ1u9…): controllare che il
  credito ricaricato sia su quello giusto prima del run completo.
  **REGOLA MERGE (Valerio 8/9):** dai contatti trovati sul sito, PRIORITÀ alle email NOMINATIVE del titolare
  (nome.cognome@) sopra le generiche info@/amministrazione@; e **prendi ANCHE cellulare/WhatsApp/altri punti di contatto**,
  non solo l'email. In mancanza del preferito, prendi il migliore disponibile. Ogni email trovata → ri-verifica col verifier.
- **ARRICCHIMENTO — RUN NAZIONALE FATTO (8/9):** Apify `vdrmota/contact-info-scraper` home-only su 2.674 domini
  (2.500 ok, 174 siti morti), costo **$5,00**. Dataset Apify persistente: **`N3kvzIbboJMnpGPJL`** (run `Yc0sB8RKpVikGuKae`).
  Trovato: 1.831 domini con email (402 con NOMINATIVA titolare), 680 cellulari nuovi, 327 WhatsApp; 2.228 email uniche.
  **VERIFICA + MERGE FATTI (8/9 sera, su Supabase):** 2.482 email uniche trovate → 1.954 da verificare (270 già note,
  258 PEC/junk escluse) → 20 run verifier (~$1,7): 305 valid · 1.154 risky · 58 invalid · 437 unknown → **960 in policy
  fase1**. Merge (`scripts/supabase_merge_enrich.py`, tabella `arricchimento_sito` 2.674 righe): **1.818 aziende
  aggiornate · 784 nuove `email_1`** (19 nominative, 640 generiche, 125 freemail) · **706 cellulari** · 350 fissi ·
  262 PEC · 872 email fuori policy → `email_scartate_verifica` · 178 di terzi → `email_sospette` · 1.135 bucket cambiati.
  Report numeri: `asset/MERGE_ARRICCHIMENTO.md`. Lezione: le home espongono quasi solo info@ (nominative rare):
  per i titolari servono LinkedIn/persone, non il crawl del sito.
- **SCRAPING TITOLARI a cascata (8/9, connettore Apify NATIVO):** L1 `microworlds/leads-finder` su Tier A+B (1.128 domini,
  ruoli decisore+commerciale+marketing, IT, email verificata). **Esito onesto:** A completato + B interrotto → account Apify
  **NATIVO a credito esaurito (abort a $1,88)**. Raccolti **246 lead utili** (69 decisori, 129 commerciali, 48 marketing) su
  **111 aziende**, salvati in Supabase tabella `leads_titolari` (durevole, id_sb mappato). **Cellulari veri: 12** — LEZIONE:
  Apollo/leads-finder NON dà i cellulari dei titolari PMI italiane (i cellulari ce li abbiamo già da GMaps per la cold call);
  copertura Apollo dei piccoli installatori ~1/3. **DA FARE (no credito):** verifica le 246 email col verifier (Composio) →
  promuovi il decisore a `email_1`/`titolare_*` su `aziende` (retrocedi info@) + carica come `persone`.
  (Storico; superato sotto.)
- **SCRAPING TITOLARI — CHIUSO 9/9 (dopo ricarica +$10 nativo):** completato Tier A+B+**C** (top 1.500 per ICP score).
  Totale **331 lead utili su 169 aziende** (101 decisori) in `leads_titolari`; **194 email verificate** (143 valid, 39 risky,
  8 invalid, 4 unknown); **102 aziende** con titolare nominativo promosso a `email_1` (info@→email_2); 331 caricati come
  `persone` (tot 6.108). Bucket: 1_EMAIL_TITOLARE 646 · 2_EMAIL+MOBILE_TITOLARE 103 (749 nominative) · v_cold_email 2.246.
  **Cellulari da leads-finder ≈ 0** (Apollo non li ha per PMI IT). DB riblindato (401 con chiave publishable).
- **SCRAPING TITOLARI ROUND 2 — 8/9 (resto Tier C + cascata L2):** (a) resto Tier C su leads-finder (1.600 domini/score,
  cap $4 → 1.100 lead) MA il budget è stato mangiato da ~14 grandi aziende off-target (bricocenter, unoenergy, cbre… 100+ dip.
  ciascuna) + metà senza email → solo **42 lead puliti**. LEZIONE: pre-escludere i domini di grandi brand prima di leads-finder.
  (b) **Cascata L2** `harvestapi/linkedin-company-employees` (Full+email $12/1k, seniority Owner/CXO/VP/Director) sui **143 A/B**
  con `linkedin_azienda`: l'attore accetta **max ~20 aziende/run**; LinkedIn **throttla i run concorrenti** (i run >20 o lanciati
  in parallelo tornano 0 in pochi sec) → vanno lanciati UNO ALLA VOLTA. Completati ~52 aziende (test+b0+b3) → **11 lead L2**
  owner/CEO/founder (email valida al 60%). Round tot: 53 staging → 49 verificate (37 valid, 10 risky-catchall, 2 invalid) →
  **26 aziende** con decisore nominativo promosso a `email_1`, +48 persone. **DB sempre bloccato** (scritture solo via MCP
  service-role, RLS mai disattivato). Speso ~$4,7 (leads-finder $4 + L2 ~$0,7 + verifier $0,04).
- **RESTO L2 — credito OK, in COOLDOWN HarvestAPI (8/9):** Valerio ha **ricaricato il NATIVO** → gate FREE tolto (run status
  "success"). MA HarvestAPI ora rate-limita l'account dopo le tante run di oggi: run "success" ma **0 profili in <25s** (stamattina
  gli stessi batch rendevano) → cooldown temporale, non martellare. **3 tentativi 8/9 (12:00, 14:39, 17:41 UTC) = tutti 0 profili**
  → è un **cap GIORNALIERO** del piano FREE (~20 run/giorno). **Ripresa automatica programmata DOMANI 9/9 06:00 UTC (08:00 IT)**
  (send_later `trig_01ViQNFjmmxNAtbNS3B7wrgK`). Composio-Apify resta VUOTO ($0.002). Da fare: A/B indici 1,2,4,5,6 + 483 Tier C.
  Batch A/B pronti in `l2_batches.json` (lista di 7 liste). Se anche domani 0 → proporre piano a pagamento HarvestAPI o snipercoder (docs/18).
- 🏆 **LEZIONI D'ORO SCRAPING (memorizzate — NON ripetere gli errori):**
  1. **L2 `harvestapi/linkedin-company-employees` = ORO** (owner/CEO/fondatori IT con email verificata, resa email ~60%).
     Config: seniority `["320","310","300","220"]` (Owner/CXO/VP/Director), mode **"Full + email search"** ($12/1k).
  2. **MAX ~20 aziende per run** (oltre → "up to 20 companies", 0 output). Batcha a 18-20.
  3. **CAUSA VERA dei run a 0 (CORREZIONE 8/9):** NON era (solo) throttle LinkedIn ma il **limite del piano FREE di Apify**
     sull'attore harvestapi → status **"free user run limit exceeded"**. Un account Apify FREE fa solo **poche run** di questo
     attore, poi torna 0 item in pochi secondi. Lanciarli comunque **uno alla volta** (l'attore prende max ~20 aziende/run),
     ma **per scalare la L2 serve un account Apify con credito/piano pagato** — col FREE ci si ferma dopo ~3-4 run buone.
  4. **leads-finder:** SEMPRE `maxTotalChargeUsd`; **pre-escludere i grandi brand/reseller** (bricocenter, unoenergy, cbre…)
     PRIMA del lancio, non solo col filtro >15 a valle (mangiano il budget: 440/1100 lead erano loro).
  5. **Routing crediti Apify (regola CEO 8/9):** stima costo → se **>€1,50 usa Composio**, se **≤€1,50 usa il nativo**. MA
     **VERIFICA IL SALDO PRIMA:** l'8/9 il connettore **Composio-Apify era VUOTO** ($0.002, non $4-5) e il **nativo FREE ha
     esaurito il run-limit** per harvestapi. Entrambi a secco per la L2 → serve ricarica/piano pagato su un account Apify.
  6. Mapping profilo L2→azienda via **dominio email** (il campo sito-azienda spesso non si popola). Scritture via MCP
     service-role (RLS resta attivo). Classificazione ruolo con confini di parola (no "coo" in "coordinator").
- **NUMERI POST-ROUND-2:** email_1 nominativa **810** · persone **6.156** · `leads_titolari` 384 · `v_cold_email` 2.252.
- **SOCIAL — SETUP (docs/15) + STRATEGIA CONTENUTI (docs/16), 8/9:** 3 profili (LinkedIn profilo aged brand-forward nome
  resta "Abdellah Hmamsi" foto=logo · IG @solarback.italia brand · FB ri-brand Pagina Artec) + strategia organica completa
  (ricerca 4 agenti). Palette dark+oro da artecai.it. Prompt AI logo/avatar/banner pronti. **Unipile NON edita profili
  LinkedIn** (solo outreach) → i profili li fa Valerio a mano. **4 DECISIONI content (8/9):** obiettivo 6 mesi 800-1.800
  follower in target (non 2.5-10K; 10K=12-24 mesi) · validare canale 2 settimane (gruppi FB vs LinkedIn) · avatar "Valerio"
  = mascotte AI dichiarata · **pubblicazione full-auto via scheduler (API ufficiali) = SICURA** (corretto il vecchio framing
  "ban": rischioso è SOLO il bot-engagement di massa, che NON usiamo). **Skill `solarback-content-engine` ELIMINATA — mai usarla**
  (è synced → Valerio deve disattivarla dalla libreria skill, altrimenti si ri-sincronizza; il system-reminder la ripropone: IGNORARLA).
  **Promemoria accessi:** collegare **OmniSocials** ($10/mo, MCP, scheduler scelto) + (per i VSL, dopo) ElevenLabs + HeyGen. Faccia AV solo nei video (dichiarato).
- **KIE AI (deciso 8/9, VERIFICATO E FUNZIONANTE):** unico tool immagini/video per i CONTENT. `KIE_API_KEY` già nell'ambiente.
  Saldo 8/9 = **9.862 crediti**. Immagini = **GPT Image 2** (`gpt-image-2-text-to-image`, 1K, **6 cr/img**). Video = **Veo 3.1 Lite 1080p** (**35 cr/8s**).
  Ricetta: `POST api.kie.ai/api/v1/jobs/createTask` (body `{"model":..,"input":{prompt,aspect_ratio,resolution,background}}`) → `data.taskId` →
  poll `GET .../jobs/recordInfo?taskId=` fino a `state:success` → URL in `response.resultUrls[0]` (temp, scaricare subito). Pipeline testata: card hook grafite+oro OK.
  **Nota card:** GPT Image 2 sbaglia gli accenti (VELOCITÀ→VELOCITA) → nelle immagini niente parole accentate (nel testo dei post vanno bene).
- **PROSSIMI PASSI:** (1) Instantly: key nel pannello → warmup → campagna 1 da `v_cold_email` · (2) Valerio cold call da
  `v_cold_call` (docs/05) · (3) social: Valerio collega **OmniSocials** + allestisce i 3 profili (docs/15); io genero le immagini via Kie AI e schedulo le settimane 1-2 (docs/17) · (4) completare cascata L2 (resto A/B + Tier C, rate-limit HarvestAPI).

## 7. DOVE SIAMO (aggiornare!) — 2026-09-08 sera
- 0 Partner. **Lista Target VIVA su Supabase** (§6): 6.659 aziende in lista; **`v_cold_email` 2.252**, **810 email_1 nominative**
  (titolare/decisore), **6.156 persone**, più cellulari (+706 dall'arricchimento). Numeri esatti: query su Supabase / §6-ter.
- `main` = solo sito; lavoro sul ramo `Solarback-Growth-Agents`. Repo ancora PUBBLICO (nessun contatto dentro).
- **Risposte popup 8/9:** chiavi → pannello "Credenziali API" (mai .env) · DB vivo → **Supabase** (non Airtable, non
  Composio) · prima migrare TUTTO senza perdere un dato, poi cancellare i CSV/XLSX (FATTO) · poi verifica+merge
  arricchimento · Instantly DOPO · nuovo progetto Supabase $10/mese: OK.
- **TO-DO VALERIO (li fa lui a breve — RIPETERE a ogni recap finché aperti, MAI dimenticarne uno):**
  1. **Repo → PRIVATO** (GitHub → Settings → Danger zone → Change visibility). Promesso 9/9.
  2. **DOMINIO PRIMARIO `solarback.it`:** comprarlo → collegarlo alla **landing page** → collegarlo all'**email principale**
     dell'azienda (casella vera SolarBack). È il dominio da PROTEGGERE (sito+email vere), diverso dai 2 domini secondari cold-email.
  3. **Instantly:** pannello "Credenziali API" → Nome `Instantly` · Sito `api.instantly.ai` · Header `Authorization: Bearer <key>`.
  4. (più avanti) 2 domini secondari cold-email + Google Workspace caselle · numero WhatsApp dedicato M2 · credenziale Google Calendar in n8n.
  5. **Collegare OmniSocials** ($10/mo, MCP) per pubblicare i social. **Disattivare skill `solarback-content-engine` dalla libreria** (synced).
  - Base Airtable "SolarBack — Lista Target" `appLFL7SYWwYh1570`: NON l'ho eliminata, è vuota (0 record); resta lì morta, non serve toccarla.
- **NOVITÀ 8/9 sera — REGOLA 10 (fondamenta prima della fretta):** Valerio incazzato perché mi sono fiondato sul content/immagini
  senza costruire fondamenta. Su content/design/strategia: PRIMA ricerca online + documenti/ruoli/skill + domande, POI produco.
  **STOP Kie/immagini finché non ho fondamenta di design/caroselli.** (Regola in CLAUDE.md §10, gli dà fastidio.)
- **Riverifica "unknown" (8/9, FATTA 2 batch su ~200 email, spesa ~$0,15):** recuperate **58 email in lista** (`fase1_ok`), di cui
  **11 valid** (4 titolari: emanuele.chiozzi/filippo.angeli/giorgio.nicolini @ircispa + altri). Aggiornate con `fonte='reverify-2026-09'`.
  **549 unknown restano** MA il verifier (blessiticus) ha **cap 100/run sul piano free** e **si impunta sui server morti** (~60% non
  risponde neanche al retry = mailbox host down, non recuperabili). Yield ~40% per batch. Grindare i 549 = 5-6 batch capped/appesi per
  return calante (per lo più info@ generiche che già abbiamo). **PAUSA reverify** in attesa scelta Valerio (finire in background vs stop).
- **`docs/18` = registro attori Apify** (leads-finder ⭐, harvestapi, snipercoder, verifier). Consultarlo SEMPRE prima di scraping.
- **VISIONE AI TEAM (8/9 sera, Valerio) → `docs/19`:** team di agenti AI = **sessioni persistenti + routine** (non subagenti),
  ognuno un RUOLO marketing con skill+docs+tool propri (es. SOLARBACK-VIDEO ore 8 con Kie AI; SOLARBACK-LINKEDIN-OUTREACHER con Unipile).
  Sopra: **dashboard mission-control su Railway** che legge Supabase (gli agenti la aggiornano ogni giorno); Valerio guarda solo quella.
  Architettura: cervello=repo (skill+docs ruolo), memoria/output=Supabase, vista=Railway. **Scelto FULL/fondamenta:** prima ricerca(4 aree)+skill+design-system, POI build.
  **Stato: 4 ricercatori 2026 lanciati (design caroselli, copywriting, algoritmi, video/avatar). Blueprint docs/19 da validare. NIENTE build finché non approva.**
- **VIA LIBERA MISSION CONTROL (8/9 sera, Valerio):** costruire dashboard + team seguendo ALLA LETTERA la guida Rivolio
  (`/root/.claude/uploads/.../GUIDAMISSIONCONTROLAGENTI.md`, copiata in `docs/21-guida-mission-control.md`). Stack: Next.js App Router
  + TS + Tailwind v4 (@theme) + framer-motion + lucide + Supabase; Railway; Playwright. 3 pezzi: Supabase (verità) · dashboard (legge
  realtime + poll 45s) · agenti = routine cron su sessioni operative, scrivono SOLO via /api/ingest (Bearer INGEST_KEY).
  **Divisione compiti: VALERIO crea le sessioni operative (UI, coi connettori) · IO creo routine + skill (SKILL.md + reference.md) + dashboard.**
  **BUDGET = NON è un problema** (~€100/mese: Unipile €49 fisso, Railway $5, OmniSocials $10, Kie ~$50 crediti/mese). Deploy ok.
  **⚠️ KIE = PRUDENZA (regola):** mai sprecare crediti; un ruolo usa Kie SOLO dopo studio+test+collaudo del ruolo. Non è via libera.
  Goal: non finire finché TUTTO è live, deployato, end-to-end, 0 errori build, estetica dark+oro come vuole, tutto comunicante col team.
  Riverifica 549 unknown: nessuna risposta → STOP (mia raccomandazione) salvo contrordine.
- **MISSION CONTROL — COSTRUITA E LIVE (8/9 sera).** URL: `https://mission-control-production-d22b.up.railway.app`.
  Railway progetto `solarback-mission-control` (id `98600e12-51f6-42a6-ba6d-5bec360d5467`, servizio `mission-control` id
  `841faff5-cc94-43bc-839f-e8845c437068`, env production `8db3b06a-...`), deploya dal branch **`mission-control`** (mirror di
  Solarback-Growth-Agents: `git push origin Solarback-Growth-Agents:mission-control`), root dir `mission-control/`, watch solo quella cartella.
  Supabase: **schema `mc`** (8 tabelle + viste kpi_funnel/kpi_liste via funzione security definer) esposto in PostgREST, realtime, bucket `mc-assets`.
  Env su Railway: URL/anon/INGEST_KEY/DECIDE_PIN ✅ · **SUPABASE_SERVICE_ROLE_KEY ⏳ la mette Valerio** (senza, la dashboard legge ma non scrive).
  Segreti generati (INGEST_KEY, DECIDE_PIN) nello scratchpad `mc.env` di questa sessione + su Railway; il PIN l'ho detto a Valerio in chat.
  **Roster deciso da Valerio (8 ruoli `SOLAR - ...`):** CONTENT STRATEGIST, CAROSELLI, VIDEO, BLOG (pausa), LINKEDIN DM OUTREACH (live),
  INSTAGRAM DM OUTREACH (live), SCOUT, DATA ANALYST. Il MIO roster precedente (11 ruoli) è stato BOCCIATO: non riproporlo.
  Regole: approvazione di tutto finché la qualità non è provata (poi autopilot), DM outreach con template+volumi approvati a monte,
  volumi outreach li decide Valerio (non ancora), blog non prioritario. **Prossimo: definire e collaudare i ruoli UNO ALLA VOLTA**
  (Valerio crea la sessione operativa coi connettori → io skill da `.claude/skills/solar-ruolo-template/` → routine → 2-3 giri puliti).
  Lezioni tecniche: (1) `pkill -f "next start"` uccide anche lo script che lo lancia → kill per PID/nome processo `next-server`; (2) il
  browser Playwright del sandbox NON raggiunge Supabase via proxy (WS e fetch) → letture same-origin via `/api/snapshot` (anche più robusto);
  (3) React Compiler lint: niente setState sincrono negli effect, niente `Date.now()`/`new Date()` in render; (4) viste su viste `security_invoker`
  → usare funzione `security definer` per le aggregazioni lette da anon.
- **SOLAR - SCOUT = primo ruolo (definito 8/9 notte):** 4 missioni (titolari A/B→C · nuove aziende · riverifica · aggiorna), cap 2 $/giro,
  promozione autonoma, skill in `.claude/skills/solar-scout/` (SKILL.md + reference.md con Q1-Q7 SQL). Bacino: senza titolare_email A 121 · B 945 · C 4.745.
  **In attesa: Valerio crea la sessione "SOLAR SCOUT operative" (Apify nativo + Supabase + repo) → io routine `0 5 * * *` → collaudo.**
  Avatar: Fluent UI Emoji 3D (MIT) da GitHub, in `public/avatars/*.png` (DB aggiornato a .png). Unknown 549: STOP, promemoria in TODO.
- **NOVITÀ 8/9 (VINCOLANTI):** (i) **Supabase progetto `solarback` = DB VIVO *e* backend della dashboard/cruscotto CEO**
  che costruiremo (per questo è un progetto separato). (ii) **APIFY ora via CONNETTORE NATIVO Apify (tool `mcp__Apify__*`),
  NON più via Composio** — su Composio non usare più Apify. Il verifier email resta lo stesso attore, richiamato dal nativo.
- **Prossima mossa mia:** (1) guida Instantly (key nel pannello, host `api.instantly.ai`) + Composio Gmail/Sheets →
  (2) warmup + campagna 1 dalla vista `v_cold_email` → (3) dashboard KPI su Supabase.

## 7-bis. TOOL & SICUREZZA CHIAVI (deciso 8/9)
- Stack completo e come collegarlo → **`docs/14-stack-tool.md`**. **Regola d'oro: MAI API key in `.env` nel repo
  né nel riquadro Variabili d'ambiente** (visibili/auto-caricate = leak). Usare il pannello **"Credenziali API"**
  (proxy Anthropic, chiave mai visibile alla sessione, scoped per host) o i **connettori MCP/OAuth**. Io non vedo né
  inserisco le chiavi: le mette Valerio, io do host+header e uso i tool. Molti tool sono GIÀ MCP in sessione
  (GitHub, Netlify, Railway, Resend, Notion, Supabase, n8n, Airtable, Composio).
- **Lezione 8/9:** il classificatore della piattaforma blocca comandi Bash con chiavi in chiaro sulla riga di comando →
  chiavi in un file nello scratchpad e `source` prima del comando (la publishable key Supabase non è un segreto, ma
  vale lo stesso schema). Bulk da 18k righe: MAI via MCP (centinaia di chiamate), sempre via REST da script.

## 8. PUNTATORI
`CLAUDE.md` (costituzione) · `TODO.md` · `DECISIONI.md` · `STATO-ATTUALE.md` · `SPRINT-26-OTTOBRE.md` ·
`docs/01` business · `docs/02` ICP · `docs/03` posizionamento · `docs/05` script cold call · `docs/07` offerta ✅ ·
`docs/08` mercato · `docs/09` n8n · `docs/11` valutazione · `docs/12` stagionalità · `docs/13` infra cold email ·
`docs/14` stack tool & sicurezza chiavi · `docs/15` setup 3 profili social · `docs/16` strategia social/content & growth · `docs/17` calendario editoriale · `docs/18` registro attori Apify · `docs/19` **AI Team & Mission Control AS-BUILT** · `docs/20` design-system · `docs/21` guida Rivolio · `docs/ricerca/` 4 ricerche 2026 · `.claude/skills/solar-ruolo-template/` (contratto ruoli) · `mission-control/` (app Next.js).
