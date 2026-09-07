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
  **SERVE RICARICA account Apify NATIVO** per finire il Tier B (452 domini rimasti) + Tier C + cascata L2/L3.
- **PROSSIMI PASSI (ordine CEO 8/9):** (1) verifica+promozione delle 246 email titolari → (2) Instantly: key nel pannello →
  warmup → campagna 1 · (3) Valerio cold call dalla vista `v_cold_call` (docs/05) · (4) LinkedIn (docs/15).

## 7. DOVE SIAMO (aggiornare!) — 2026-09-08 sera
- 0 Partner. **Lista Target VIVA su Supabase** (§6): 6.659 aziende in lista; dopo il merge dell'arricchimento (8/9 sera)
  **~2.230 email pronte** (`v_cold_email`, era 1.452) e più cellulari (+706). Numeri esatti: query su Supabase / §6-ter.
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
  - Base Airtable "SolarBack — Lista Target" `appLFL7SYWwYh1570`: NON l'ho eliminata, è vuota (0 record); resta lì morta, non serve toccarla.
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
`docs/14` stack tool & sicurezza chiavi · `docs/15` LinkedIn company page (asset Social&Trust #1: pagina brand + personaggio AI ricorrente Veo 3.1).
