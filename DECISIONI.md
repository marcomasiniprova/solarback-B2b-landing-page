# 🧭 DECISIONI — log delle scelte strategiche

> Registro delle decisioni prese, così non le rimettiamo in discussione ogni
> volta. Formato: data · decisione · motivazione · stato.

---

### 2026-09-05 — Branch operativo separato dal sito
- **Decisione:** `Solarback-Growth-Agents` diventa il workspace operativo
  (growth/marketing/agente), svuotato del codice del sito. `main` resta il
  codice della landing e non si tocca.
- **Perché:** il CEO vuole un ambiente pulito per lavorare su distribuzione ed
  esecuzione, separato dalla landing.
- **Stato:** ✅ fatto.

### 2026-09-05 — Ads a pagamento RIMANDATE
- **Decisione:** niente Meta/Google ads verso installatori per ora.
- **Perché:** offerta e mercato vanno validati prima in organico; a freddo senza
  case study le ads sarebbero uno spreco. Condiviso col CEO.
- **Stato:** ✅ attiva. Rivedere quando c'è validazione + case study.

### 2026-09-05 — Partenza multicanale con priorità
- **Decisione:** **cold call = canale primario cash-now**; **cold email
  (Instantly) in warmup da subito** per la spinta di metà/fine sprint;
  **LinkedIn (DM + contenuti)** in parallelo per trust/brand.
- **Perché:** la cold call è il muscolo del CEO, costo ~0, arriva al decisore e
  dà feedback immediato; la cold email scala ma serve warmup; i contenuti
  costruiscono la fiducia che manca (0 recensioni).
- **Stato:** ✅ attiva.

### 2026-09-05 — Offer-wedge "DB Reactivation": DECLASSATA (già fallita in passato)
- **Decisione:** NON usare la Database Reactivation come apri-porta principale.
- **Perché:** il CEO l'ha già provata in una precedente agenzia e ha fallito —
  gli installatori rispondevano "non ho contatti / ne ho pochi / li ricontatto
  già" (scuse). Resta al massimo un componente secondario, non il gancio.
- **Stato:** ❌ scartata come wedge principale. L'offerta d'ingresso va
  ri-progettata sulla base della ricerca di mercato (vedi sotto).

### 2026-09-05 — Round-2 risposte del CEO (parametri di fase)
- **"Cliente pagante" per il 26/10 = partner ATTIVO che genera risultati** (non
  serve un incasso specifico; conta che sia operativo e stia producendo).
- **Budget tool di acquisizione: quasi zero (max ~100 €/mese).** → stack lean,
  tool gratuiti o già posseduti (Instantly/LinkedIn tool di Valerio). Niente
  spese superflue.
- **Tempo del CEO: full, 7+ ore/giorno fino al 26/10.** → il collo di bottiglia
  NON è il suo tempo, ma l'OFFERTA e la fiducia/chiusura. Massimo volume di
  outreach/vendita sostenibile.

### 2026-09-05 — Offerta costruita su ricerca (Hormozi + mercato + competitor)
- **Decisione:** offerta v1 costruita e documentata in `docs/07-offerta.md`,
  ricerca completa in `docs/08-ricerca-mercato.md`.
- **Sostanza:**
  - **Apri-porta = Struttura B "Recupero Sopralluoghi"** (speed-to-lead sui lead
    che il cliente GIÀ riceve e perde) → aggira l'errore della DB reactivation
    (non dipende da un asset che il cliente non ha). Poi upsell a Struttura A
    (ads, budget cliente) per scalare. Contenitore = "Founding Partner"
    (prezzo bloccato a vita + esclusiva di zona + testimonianza pattuita).
  - **Differenziazione:** performance pura vs pacchetto prepagato (Edilhub), lead
    dedicati vs riciclati, trasparenza di prezzo, sistema integrato a 4 motori.
  - **Garanzia:** "8 sopralluoghi qualificati/30gg o lavoro gratis finché (cap
    60gg)" + sostituzione fuori criteri + mai pagare il no-show.
  - **Prezzo:** resta 99€/sopralluogo + 400€/contratto; niente setup fee
    nell'apri-porta (fase 2: setup + revenue share).
- **Stato:** ✅ **v2 congelata** dopo ricalibrazione CEO (round-3). Vedi sotto.

### 2026-09-05 — Ricalibrazione CEO + offerta v2 congelata (round-3)
- **Numeri VERI (non da manuale):** 100–300 sopralluoghi/mese per partner; il
  cliente investe ~3.000 €/mese in ads (100€/gg); 30–100 impianti chiusi/mese;
  valore SolarBack ~22–70k €/mese per partner. **Ragionare sempre a questa scala.**
- **ICP ricalibrato verso l'alto:** aziende affamate, con capacità reale (assorbono
  100–300 sopralluoghi/mese) e disposte a investire ≥3k/mese in ads. NO ad
  artigiani/chiusi/"provo gratis". Vedi `docs/02`.
- **Round-3 (4 decisioni):**
  1. ✅ Apri-porta = **motore completo diretto** (no pilotino; il budget ads filtra).
  2. ✅ Garanzia = **floor prudente scritto (~50/mese) + target dichiarato 100–300**
     (under-promise/over-deliver per proteggere il primo partner).
  3. ✅ **Nessun filtro economico extra**: basta il budget ads ~3k/mese.
  4. ✅ Scarsità = **esclusiva di zona, 1 partner per area** (compatibile con 30+).
- **Stato:** ✅ offerta v2 in `docs/07-offerta.md`. Rischio chiave = capacità di
  delivery (n8n deve reggere il volume) → verifica n8n prioritaria.

### 2026-09-05 — Architettura delivery n8n (dopo ispezione + scelte CEO)
- **Priorità:** delivery production-ready PRIMA, partendo dall'anello intake.
- **Intake Meta = MULTI-TENANT** (leadgen webhook a livello di app Meta, routing per
  page/form id → Campagne_Attive). **NO a un workflow per partner.** Si accende al
  primo partner (serve la sua pagina); si pre-costruisce ora.
- **DB-react M2 = numero WhatsApp DEDICATO** (scelta CEO): seconda segreteria su
  numero separato → evita il conflitto "un numero = un webhook".
- **Alessandro = segreteria condivisa multi-partner** (un numero, ramifica per
  config); si aggiungeranno altri numeri/segretari.
- **Primo passo operativo:** mappare i fogli + **collaudo end-to-end simulato**
  (WhatsApp è live + template approvati) col numero di Valerio come lead di test.
- **Regola confermata:** fare domande e proporre PRIMA di modificare i workflow;
  le modifiche gravi si fanno solo dopo OK del CEO.
- **Stato:** 🟡 data model ricostruito (`docs/09`); in attesa da Valerio: numero
  WhatsApp test + OK ad attivare per il collaudo (+ opz. re-auth Composio Sheets).

---

### 2026-09-06 — NUOVO OBIETTIVO (sostituisce "30 partner entro il 26/10")
- **Non più il numero di partner.** Obiettivo: **≥ €200.000** e soprattutto
  **valutazione SolarBack ≥ €1.000.000 entro il 26/10**. Serve EBITDA (run-rate) ×
  multiplo ≥ €1M; margine ~95% → EBITDA ≈ fatturato; CEO al 100% delle quote.
- **CONTESTO chiave:** c'è un **acquirente reale** che compra se SolarBack vale
  €1M entro il 26/10. **€200k = cassa incassata nei ~50 giorni.**
- **Multiplo (grounded su comps di mercato):** un acquirente oggi valuta come
  micro-agenzia → **2–4x SDE/EBITDA** (fondatore solo, <3 mesi, concentrazione).
  10–15x è da "azienda cresciuta"/prodotto SaaS, non regge oggi in due diligence.
  → **2 strade per €1M:** (A) run-rate €250–500k a 2–4x; (B) alzare il multiplo a
  5–8x (ricorrenza contrattuale + churn~0 osservato + clienti diversificati + stack
  AI trasferibile + 2° operatore) → run-rate €125–200k. Dettaglio in `docs/11`.
- **Nota di ruolo:** il CEO ha chiesto di non demotivare; ho dato il numero *giusto*
  (di mercato) + la roadmap per €1M, perché l'acquirente è reale e ci sarà DD vera.
- **Leva decisiva:** capire il METODO/multiplo del suo acquirente (domanda in docs/06).

### 2026-09-06 — Sequenza di lavoro (scelta CEO)
- **1° FULL FOCUS SUI DOCUMENTI** del CEO (li carica in chat): analisi +
  implementazione per concretizzare SolarBack. Niente altro in parallelo finché
  non li abbiamo assorbiti. Log in `docs/10-materiale-CEO.md`.
- **2° Dashboard/gestionale CUSTOM** (non solo Airtable) — scelta CEO "custom";
  interpretata come priorità SUBITO DOPO i documenti (non in parallelo, per non
  spezzare il focus). ⚠️ da confermare.
- **3° Asset acquisizione**: lista ICP + outreach engine.
- **4° Infrastruttura cold email**: Google Workspace + domini + SPF/DKIM/DMARC +
  warmup Instantly (per ~100-150 email/gg AI). Dopo i documenti (scelta CEO).
- **Skill `copertura-prompt`**: installata nel repo, obbligatoria su ogni prompt
  multi-istruzione (regola in CLAUDE.md §0-bis).

## ⚠️ Decisioni ANCORA da prendere (vedi docs/06-domande-aperte.md)
- Struttura finale dell'offerta + offerta pilota "founding partner" (in ricerca).
- Numero-target reale: 30 entro il 26/10 vs. filosofia "pochi partner/anno" del
  documento strategico — come li conciliamo.
- Residenziale vs. commerciale come focus dei primi partner.
- Focus geografico iniziale (tutta Italia vs. una zona per partire).
- Come gestire l'attrito "il cliente paga le ads" nell'offerta a freddo.
