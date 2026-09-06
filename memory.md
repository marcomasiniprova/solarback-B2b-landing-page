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

## 7. DOVE SIAMO (aggiornare!) — 2026-09-06
- 0 clienti. Sto montando la **1ª infrastruttura cold email** (setup in `docs/13`).
- **In attesa da Valerio:** (a) comprare `solarback.it` + 2 domini secondari su IONOS; (b) aprire Google
  Workspace (6 caselle); (c) decidere se pagare Instantly Growth ora; (d) caricare i suoi DOCUMENTI in chat.
- Ricerca fatta: infra email (costi ~€80-95/mese), mercato (ICP ~3-5k, `docs/02`), valutazione (`docs/11`),
  stagionalità FV (`docs/12`).
- FV 2026: gen-lug +13% (3,7 GW), 86% residenziale con accumulo → domanda più stabile tutto l'anno. **Niche valida.**

## 8. PUNTATORI
`CLAUDE.md` (costituzione) · `TODO.md` · `DECISIONI.md` · `STATO-ATTUALE.md` · `SPRINT-26-OTTOBRE.md` ·
`docs/01` business · `docs/02` ICP · `docs/07` offerta · `docs/08` mercato · `docs/09` n8n · `docs/11`
valutazione · `docs/12` stagionalità · `docs/13` infra cold email.
