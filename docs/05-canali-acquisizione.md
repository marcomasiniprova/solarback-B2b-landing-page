# 05 — Canali di acquisizione partner

> Come SolarBack acquisisce i PROPRI clienti (installatori). Diverso dal delivery
> (come SolarBack porta lead consumer AGLI installatori). Priorità e razionale in
> `SPRINT-26-OTTOBRE.md`. Decisioni in `DECISIONI.md`.

## Principio
Il collo di bottiglia storico non è il top-of-funnel ma la **chiusura** (0/5) e
la **fiducia** (0 recensioni). Quindi ogni canale deve: (a) arrivare al
**titolare**, (b) portare un'offerta **a rischio zero**, (c) produrre in fretta
**risultati** che diventano prova sociale.

---

## 🥇 Cold call (canale primario, cash-now) — LA FA SOLO VALERIO
- **Chi:** Valerio in persona. È l'unico outreach manuale suo; l'agente prepara liste, script e tracker, non chiama.
- **Quando (suo processo, 7/9):** **martedì → venerdì, 10:00-12:00 e 14:30-19:00. Lunedì MAI.**
- **Lista:** tab `3_SOLO_MOBILE` e `2_EMAIL+MOBILE_*` della Lista Target (cellulare/WhatsApp del titolare), Tier A → B,
  **tutta Italia** (nessuna priorità geografica). Cellulari e WhatsApp dei titolari si chiamano tranquillamente (B2B).
- **Flusso:** chiama → **non risponde → richiama (follow-up)** → risponde → **script** → **interessato → qualifica in
  chiamata** (commerciali? installazioni/mese? DB vecchi lead?) → **meeting fissato sul calendario**.
- **Script (testo completo + revisione):** `docs/05-script-cold-call.md` (trascrizione fedele, 08/09/2026; PDF originale
  `docs/05-script-cold-call.pdf`). Già usato sul campo, meeting rate 10-20%. Da raffinare: togliere parole, più controllo
  della chiamata, far arrivare il cliente alla conclusione (vedi REVISIONE nel file). Flusso di riferimento: Struttura consigliata: apertura + permesso ("30 secondi?")
  → gancio wedge (*"riattivo i tuoi vecchi contatti e ti fisso sopralluoghi; paghi solo quelli effettuati, zero ads"*)
  → 2-3 domande di qualifica → meeting (non vendere in cold call).
- **KPI:** tentativi/dì · titolari raggiunti · qualificati in call · meeting fissati/fatti. Storico: ~10-20% meeting sui
  titolari raggiunti. Tracker: DB vivo Supabase (tabella `aziende`: `stato`, `ultimo_contatto`, `canale_ultimo`, `note_operative`; vista `v_cold_call`).

## 🥈 Cold email B2B — Instantly AI (costruisci ORA, raccogli a metà sprint)
- **Perché:** scalabile e low-cost, ma serve **warmup domini/inbox (~2–3 sett.)**
  → va avviato subito per rendere nella spinta finale.
- **Setup:** dominio secondario dedicato (non `artecai.it`) · più inbox · warmup ·
  liste arricchite via Instantly · sequenza 3–5 step.
- **Angolo:** stesso wedge (DB reactivation / sopralluoghi a rischio zero),
  personalizzazione per azienda/zona.
- **KPI:** inviate · aperture · risposte · meeting.

## 🥉 LinkedIn — DM automation + contenuti (trust & pipeline parallela)
- **Perché:** costruisce **autorità/brand** (manca prova sociale) e contatta i
  titolari in modo diretto. Valerio ha un tool di DM automation "no-ban" e un
  profilo aziendale SolarBack.
- **Due binari:**
  - **Outbound DM** ai titolari target (connection + messaggio con wedge).
  - **Contenuti** (founder story, dietro le quinte, risultati appena arrivano) →
    esiste anche una skill dedicata: `solarback-content-engine`.
- **KPI:** connessioni · risposte · meeting · (engagement/follower per il brand).

## ❌ Ads a pagamento (RIMANDATE)
- Meta/Google verso installatori: **non ora**. Prima validare offerta/mercato in
  organico e avere case study. Poi si scala a pagamento. (Deciso col CEO 5/9.)

---

## Sequenza operativa consigliata (Settimana 0)
1. Costruisci **lista v1** (150–300 installatori Fascia A/B) → `private/`.
2. Prepara **script cold call** + **sequenza email** + **messaggi LinkedIn**.
3. Avvia **warmup Instantly** (parte il timer dei ~2–3 sett.).
4. **Parti con le cold call** ogni giorno + logga nel CRM.
5. Pubblica il **primo contenuto LinkedIn**.

## Nota su liste e dati
Le liste con i contatti dei titolari sono dati riservati → cartella `private/` (git-ignored) finché il repo non è
privato. Regole CEO: **solo B2B** (aziende e titolari), **mai consumatori**; email e cellulari dei titolari si usano
liberamente. Prima di Instantly: **verifica sempre** con il verifier fisso (`docs/04`) e usa solo valid + role-based
non catch-all.
