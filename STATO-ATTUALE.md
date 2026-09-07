# 📍 STATO ATTUALE

> Foto della situazione in tempo reale. **Aggiornare a fine di ogni sessione.**

**Ultimo aggiornamento:** 2026-09-07 (sera) — **Lista Target costruita, verificata e collaudata**:
27.132 righe grezze → 8.498 aziende → **6.659 in lista** (+1.839 scarti motivati); **3.895 email verificate** con
Apify email-verifier-pro (policy fase1: 2.584 usabili, 1.452 in lista come EMAIL_1); audit di riconciliazione
TUTTO OK (`private/out/AUDIT.md`). `main` ripulito (solo sito). Regole CEO registrate (cold call = solo Valerio,
orari, B2B-only, verifier fisso, no openapi). **In attesa:** repo privato (poi commit asset), script cold call, domini.

**Aggiornamento precedente:** 2026-09-06 (sera) — chiarita la **matematica della
valutazione €1M** (run-rate ricorrente × multiplo; NON cash collected) e **corretto
l'errore "acquirente"**: NON esiste, il €1M è patrimonio personale (`docs/11`).
Completata la **ricerca infrastruttura cold email** (`docs/13`: costi, DNS, Instantly,
timeline) e la **dimensione del mercato ICP** (`docs/02`: ~12k installatori reali,
~3-5k ICP raggiungibili). **Cambio di sequenza del CEO:** parte SUBITO l'infra email
(prima dei documenti, che non sono ancora arrivati). In attesa delle sue decisioni
(domini, Instantly Growth, geo) → popup posto.

> **FATTO 6/9:** tutti e 4 i workflow su **Airtable** (base "SolarBack —
> Operativo" `app3DAWI67LKIGLXO`, 5 tabelle) — incluso il 4°, **M2 - Database
> Reactivation** (prompt riscritto per lead riattivati). Chiavi Deepgram/Mistral
> ruotate da Valerio; MCP attivato sul duplicato.
> **RESTA DA FARE:** (1) **dati** dei fogli non migrati — Composio lettura ancora
> 403: completare ri-auth o export CSV (ma dati reali ~0); (2) credenziale
> **Google Calendar** in n8n (il booking la usa ancora); (3) **numero WhatsApp
> dedicato** per il trigger di M2 DB-react; (4) reorg estetico Alessandro/DB-react;
> (5) collaudo end-to-end quando c'è un telefono. Dettagli in `docs/09`.

---

## In una riga
Delivery n8n pronta (4 workflow su Airtable). **Obiettivo (6/9):** non più "30
partner" ma **≥ €200k cassa + valutazione SolarBack ≥ €1M entro il 26/10**.
**Valutazione = run-rate annuo ricorrente × multiplo** (NON cash collected):
€20-40k/mese ricorrenti a 2-5x → ≥ €1M. Multiplo di mercato oggi 2-4x; 5-8x con
ricorrenza+churn0+diversificazione+stack trasferibile. **NESSUN acquirente** (era un
mio errore): €1M = patrimonio personale, CEO al 100%. Fase attuale: **setup infra
cold email** (scelta CEO, parte ora).

## Cosa c'è già (asset esistenti) ✅
- **Landing page** `artecai.it` live: copy forte, SEO/JSON-LD, GA4, form di
  candidatura partner (10 campi di qualifica) → email a `valerio@artecai.it` via
  Resend. Anche `llms.txt` presente.
- **Offerta** definita: pay-per-result (99 €/sopralluogo + 400 €/contratto), il
  cliente paga le ads, garanzia "obiettivo o lavoriamo gratis".
- **Delivery n8n** (self-hosted): workflow speed-to-lead + agente AI WhatsApp,
  "quasi costruiti/collaudati" — **da verificare e completare** (manca qualcosa
  per avere il servizio completo).
- **Canali/tool pronti da attivare:** Instantly AI (cold email + liste), software
  LinkedIn DM automation, profilo LinkedIn aziendale SolarBack, esperienza di
  cold call di Valerio.
- **Brand/founder:** Valerio Alieri come volto (foto, bio sul sito).

## Cosa manca (i buchi da chiudere) ❌
- **Clienti: 0.** **Recensioni/case study: 0.** → serve trust e i primi risultati.
- **Motore di acquisizione partner NON attivo** (nessun outreach sistematico in
  corso). Storico: ~100–200 cold call → ~5 meeting → 0 chiusure.
- **Nessun CRM/tracker** per pipeline partner e KPI (da creare).
- **Delivery da chiudere** al 100% e da rendere ripetibile in <7 giorni.
- **Definizione operativa di "cliente pagante"** (per la condizione del 26/10)
  ancora da fissare con Valerio → vedi `docs/06-domande-aperte.md`.

## Parametri di fase (round-2 col CEO, 5/9)
- **"Cliente pagante" = partner attivo che genera risultati** (non serve incasso
  specifico) → è questo che fa scattare la condizione dei 30 entro il 26/10.
- **Budget tool acquisizione ~0 (max 100 €/mese)** → stack lean, tool free/già
  posseduti (Instantly + tool LinkedIn di Valerio).
- **Valerio full-time 7+ ore/giorno** → il collo di bottiglia NON è il suo tempo,
  ma **l'offerta** e la **fiducia/chiusura**.

## Decisioni chiave già prese (vedi DECISIONI.md)
- ❌ **Ads a pagamento: rimandate.** Prima validare offerta/mercato in organico.
- ❌ **DB Reactivation come apri-porta: scartata** (già fallita in passato).
- ✅ **Partenza multicanale** con priorità: **cold call cash-now** + **cold email
  (Instantly) in warmup** + **LinkedIn/contenuti** per trust.
- 🟡 **Offerta in ricerca/costruzione** (Hormozi + mercato + competitor) prima di
  partire con l'outreach: il CEO vuole un'offerta che il mercato vuole davvero.

## Rischi aperti
- Deadline aggressiva: 30 partner attivi in 51 giorni da zero → serve un'offerta
  irrinunciabile + chiusura efficace.
- Attrito "il cliente paga le ads" nella vendita a freddo senza case study.
- Chiusura debole (0/5 storico): offerta e script di vendita da affilare.
- Deficit di fiducia (0 recensioni/case study).

## Numeri VERI (ricalibrati dal CEO, 5/9) — ragionare a QUESTA scala
- **100–300 sopralluoghi qualificati/mese** per partner · cliente investe
  **~3.000 €/mese in ads** (100€/gg) · **30–100 impianti chiusi/mese** ·
  valore SolarBack **~22–70k €/mese** per partner.
- **ICP:** aziende affamate, con capacità reale e disposte a investire. NO ai
  piccoli/chiusi/"provo gratis".

## In corso adesso
- ✅ **Ricerca completata** (competitor + VOC + framework) → `docs/08`.
- ✅ **Offerta v2 CONGELATA** (numeri reali) → `docs/07-offerta.md`: motore
  completo diretto · garanzia floor ~50/mese + target 100–300 · esclusiva di zona ·
  99€/400€ · nessun setup fee ora.
- ✅ **Delivery n8n verificato** → `docs/09`. Il motore È costruito sul serio
  (speed-to-lead multimodale con agente AI "Alessandro", booking calendar, social
  proof, notifica titolare, multi-tenant; + DB reactivation con anti-ban). NON è
  uno scheletro. Ma è tutto **inattivo**: manca attivazione + collaudo live +
  pulizia doppioni + verifica credenziali/intake + fix chiavi hardcodate.

## Prossime 3 mosse (dettaglio in TODO.md)
1. **Infra cold email** (`docs/13`): Valerio compra 2 domini + 6 caselle Google
   Workspace + Instantly Growth, fa DNS (SPF/DKIM/DMARC), collega le caselle via
   OAuth, genera API key → io piloto campagne/warmup/lead via Composio. In attesa
   delle sue decisioni (popup: domini, Instantly ora, geo, come fare la lista).
2. **Lista installatori ICP** (~3-5k raggiungibili, `docs/02`) — tutta Italia (nessuna priorità geografica);
   scraping (Google Maps/LinkedIn/ENF) + enrichment → CSV. **Lista costruita, nazionale.**
3. **Copy cold email** (personalizzato, umano) + sequenze 3-5 touch, durante i 14gg
   di warmup. In parallelo: attivare/collaudare n8n (`docs/09`) per reggere gli appuntamenti.
