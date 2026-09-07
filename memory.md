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
- Sito: Next.js su Netlify (`artecai.it` oggi). Form → Resend → `valerio@artecai.it`. GA4 `G-VT411CNHWJ`.
- Delivery: **n8n** self-hosted (speed-to-lead + agente WhatsApp "Alessandro"). CRM: **Airtable** (base `app3DAWI67LKIGLXO`).
- Acquisizione: **Instantly AI** (cold email; free trial → serve **Growth $47** per 6 caselle), LinkedIn, cold call.
- MCP disponibili: n8n, Airtable, Composio (ha connettore **Instantly**), Notion, Supabase, Resend, GitHub, Netlify, Railway, Dropbox, Sentry.

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

## 6-ter. ASSET LISTA ICP (in costruzione — priorità #1)
- Valerio carica **~5000 lead** in **file sparsi** (scrape provincia-per-provincia via **Apify**,
  tutte le 107 province; + **email personali di titolari** già raccolte in passato).
- **Mio compito:** consolidare tutti i file → **deduplica** → **arricchimento** (email/titolare
  mancanti) → **UN CSV pulito e ordinato** = lista target ICP. Salvare in **`private/`** (git-ignored,
  contiene contatti reali). Filtrare sull'ICP (docs/02): via micro/artigiani, tieni strutturati.
- **Formato file:** MISTI (export Apify, screenshot, PDF, testo) → normalizzo io.
- **Campi presenti:** nome azienda + sito · email aziendale (info@) · **email personale titolare**
  (oro per il cold) · telefono + città/provincia.
- **Qualità:** c'è rumore (elettricisti/generici) → **filtro io** per tenere solo installatori FV strutturati.
- **Apify: NON ora** (scelta CEO) — prima consolidare e vedere cosa manca, poi eventuale arricchimento.
- **Stato: ✅ COSTRUITA (2026-09-07).** Script riproducibile `scripts/build_lista_target.py` (30s a rilanciare).
  Output in `private/out/` (git-ignored): `LISTA_TARGET_SOLARBACK.xlsx` (multi-tab) + CSV + `LOG.json`. Inviato a Valerio in chat.
- **Numeri:** 27.132 righe grezze → 8.498 aziende uniche → **6.668 in Lista Target** + 1.830 SCARTI (con motivo,
  recuperabili). Tab: EMAIL_TITOLARE **1.004** · EMAIL_GENERICA 551 · EMAIL+MOBILE_TITOLARE 267 · EMAIL+MOBILE_GENERICA
  299 · SOLO_MOBILE 2.569 · SOLO_FISSO 1.582 · SOLO_SOCIAL 396. Email totali 2.121 (1.271 nominative) · mobile 3.135 ·
  FB_ADS_ATTIVE 610 · Tier A 507 / B 1.711 / C 4.450 · Lombardia 837. PERSONE: 5.777.
- **Scelte applicate:** storico chiamate ignorato · 1 riga = 1 azienda + titolare · nominative vs info@ in tab separati ·
  filtro aggressivo (in dubbio → SCARTI). Regola dedup: fusione solo tra nomi compatibili + valvola (max 3 nomi/cluster).
- **Limiti onesti:** email NON ancora verificate (→ verificare PRIMA di Instantly: MillionVerifier ~$39/10k o verifier
  Instantly); 549 "possibili doppioni" segnalati (colonna CONDIVIDE_CONTATTO_CON) non fusi per prudenza; ~30% senza
  provincia; 72 PEC (mai per cold); rumore residuo possibile (regole) → Valerio segnala, io rifinisco.
- **PROSSIMI PASSI:** (1) verifica email tab 1_EMAIL_TITOLARE (Tier A+B, Lombardia-first) → Instantly dopo warmup;
  (2) arricchimento SOLO Tier A/B senza titolare/email: sito "chi siamo" → FB about → openapi.com Stakeholders (€0,095/az.)
  → Apify GMaps contact-details; (3) RPO (Registro Opposizioni) OBBLIGATORIO prima di qualsiasi cold call (~€2/1000);
  (4) WhatsApp solo dopo consenso (call/risposta); (5) LinkedIn DM solo Tier A (max 100 inviti/sett.).
- ⚠️ I file lead grezzi sono su `main` (contatti reali): se il repo è pubblico = esposizione GDPR → proporre rimozione.

## 7. DOVE SIAMO (aggiornare!) — 2026-09-06
- 0 clienti. Sto montando la **1ª infrastruttura cold email** (setup in `docs/13`).
- **PROSSIMA MOSSA (scelta CEO): costruire la lista ICP** dai suoi ~5000 lead → vedi §6-ter. ⏸️ aspetto i file.
- **In attesa da Valerio:** (a) **carica i file lead** (priorità); (b) comprare `solarback.it` + 2 domini
  secondari su IONOS; (c) aprire Google Workspace (6 caselle); (d) decidere se pagare Instantly Growth ora.
- Ricerca fatta: infra email (costi ~€80-95/mese), mercato (ICP ~3-5k, `docs/02`), valutazione (`docs/11`),
  stagionalità FV (`docs/12`).
- FV 2026: gen-lug +13% (3,7 GW), 86% residenziale con accumulo → domanda più stabile tutto l'anno. **Niche valida.**

## 8. PUNTATORI
`CLAUDE.md` (costituzione) · `TODO.md` · `DECISIONI.md` · `STATO-ATTUALE.md` · `SPRINT-26-OTTOBRE.md` ·
`docs/01` business · `docs/02` ICP · `docs/07` offerta · `docs/08` mercato · `docs/09` n8n · `docs/11`
valutazione · `docs/12` stagionalità · `docs/13` infra cold email.
