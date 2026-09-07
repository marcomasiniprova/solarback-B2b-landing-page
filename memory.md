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
- **Composio** (connettore: Apify, altri) · **Apify** (account free: $5/mese, 4 run paralleli, 100 email/run sul verifier;
  run SEMPRE async → mai `waitForFinish`, il tool MCP ha 60s di timeout) · **Instantly** (cold email) · **Airtable**
  (CRM/operativo) · **n8n** self-hosted (delivery) · GitHub · Netlify (sito) · Google Workspace (caselle).
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

## 6-ter. ASSET LISTA TARGET (✅ costruita, verificata e collaudata — 2026-09-07)
- **Fonti:** 11 file di Valerio (GSE, Outscraper, Apify GMaps/leads/people, Foglio5, FB, Ads Library) → backup locale
  `private/raw/` (git-ignored). Script riproducibile `scripts/build_lista_target.py` (~1 min) + audit
  `scripts/audit_lista_target.py`. Output `private/out/` (git-ignored, contatti reali): `LISTA_TARGET_SOLARBACK.xlsx`
  (tab per canale) + CSV + `LOG.json` + `verifica_email.csv` + `AUDIT.md`. Inviato a Valerio in chat (xlsx + zip backup).
  **Il repo è PUBBLICO → l'asset NON si committa finché Valerio non lo rende privato** (poi va in `asset/` sul ramo).
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
- **ARRICCHIMENTO (deciso 8/9):** attore fisso **Apify `vdrmota/contact-info-scraper` / Contact Details Scraper**
  (~$0,0045 per contatto TROVATO, si paga solo sui hit) sui siti delle aziende senza email; poi ri-verifica col verifier
  fisso; **tutta Italia**, tutte le 2.738 con sito (prima A+B, poi C), **test 100 siti prima di scalare**. NO openapi.
- **PROSSIMI PASSI:** (1) repo privato → resta com'è (già committato) · (2) Instantly: warmup 14gg → campagna 1 con le 1.452 email
  (Tier A+B, **tutta Italia**) · (3) arricchimento di TUTTE le aziende senza email ma con sito (2.738, nazionale): Apify Contact Details Scraper (sito "chi siamo"/contatti) → ri-verifica → aggiorna DB
  GMaps contact-details (**NO openapi.com: troppo caro, scelta CEO**) · (4) Valerio parte con le cold call sui tab con
  cellulare (suo processo in `docs/05`) · (5) LinkedIn DM solo Tier A.

## 7. DOVE SIAMO (aggiornare!) — 2026-09-07 sera
- 0 Partner. **Lista Target PRONTA e collaudata** (§6-ter): 6.659 aziende, 1.452 email verificate, 3.132 cellulari.
- `main` ripulito (solo sito, mai più bancone di lavoro); tutto il lavoro sul ramo `Solarback-Growth-Agents`.
- **In attesa da Valerio:** (a) **repo → PRIVATO** (Settings → General → Danger zone → Change visibility) così committo
  l'asset; (b) **script cold call** da salvare in `docs/05`; (c) `solarback.it` + 2 domini secondari su IONOS; (d) Google
  Workspace (6 caselle); (e) Instantly Growth sì/no.
- **Risposte popup 7/9 sera:** repo → lo mette privato lui ORA, poi io committo `asset/` (SOLO dopo aver verificato
  su GitHub che è privato) · script cold call → me lo incolla al prossimo messaggio · compra ORA domini + Workspace
  (~€80-95/mese) · arricchimento Tier A/B: SÌ (sito → FB → Apify GMaps).
- **Prossima mossa mia:** (1) verificare repo privato → commit `asset/`; (2) salvare lo script in docs/05; (3) appena ha i
  domini → DNS/warmup Instantly → campagna 1; (4) arricchimento nazionale (test 100 siti → poi scale).

## 8. PUNTATORI
`CLAUDE.md` (costituzione) · `TODO.md` · `DECISIONI.md` · `STATO-ATTUALE.md` · `SPRINT-26-OTTOBRE.md` ·
`docs/01` business · `docs/02` ICP · `docs/07` offerta · `docs/08` mercato · `docs/09` n8n · `docs/11`
valutazione · `docs/12` stagionalità · `docs/13` infra cold email.
