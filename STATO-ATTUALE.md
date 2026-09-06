# 📍 STATO ATTUALE

> Foto della situazione in tempo reale. **Aggiornare a fine di ogni sessione.**

**Ultimo aggiornamento:** 2026-09-06 — delivery n8n completata (4 workflow su
Airtable, sicurezza, reorg estetico). Skill `copertura-prompt` installata nel repo
(`.claude/skills/`) e resa obbligatoria in CLAUDE.md. GO-LIVE checklist + note
acquisizione in `TODO.md`. **Prossima fase (in scelta col CEO):** analisi/implementazione
dei documenti SolarBack, poi asset (lista ICP + outreach engine + infra email), poi
gestionale/dashboard.

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
0 clienti, sito online e solido, delivery su n8n quasi pronta. Missione: **30
clienti paganti entro il 26/10/2026** (51 giorni). Fase: **setup + partenza
acquisizione**.

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
1. **Attivare e collaudare n8n end-to-end** (gap in `docs/09`): è ciò che rende
   la garanzia sostenibile. Priorità: attivazione+test, anello intake ads→lead,
   fix chiavi API hardcodate.
2. **Lista installatori ICP** (affamati, che già investono in ads) + **CRM/pipeline**.
3. **Script cold call** (one-liner in `docs/07` §10) → partire con l'outreach.
