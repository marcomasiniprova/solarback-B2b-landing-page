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
- **Non più il numero di partner.** Obiettivo: **≥ €200.000** di cassa e soprattutto
  **valutazione SolarBack ≥ €1.000.000 entro il 26/10**. Serve profitto annuo (run-rate)
  × multiplo ≥ €1M; margine ~95% → profitto ≈ fatturato; CEO al 100% delle quote.
- **CORREZIONE (stesso giorno):** **NON c'è nessun acquirente.** Un mio doc precedente
  parlava di "un acquirente reale che compra a €1M" — **errato, ritrattato dal CEO**
  ("non c'è nessun acquirente, nessuno comprerà SolarBack"). Il **€1M è un traguardo di
  PATRIMONIO PERSONALE**: diventare milionario possedendo il 100% di un'azienda che
  *vale* ≥ €1M. Nessuna vendita, nessuna due diligence di un compratore.
- **Implicazione:** senza transazione, la valutazione è una **STIMA**. Per dire
  credibilmente "valgo €1M" servono numeri che un compratore/investitore razionale
  *pagherebbe* €1M. Quindi ottimizziamo per una stima **difendibile**.
- **La formula (chiarita al CEO):** Valutazione = **run-rate annuo (fatturato mensile
  ricorrente × 12) × multiplo**. NON il cash collected una-tantum; NON un fatturato
  annuo non ancora fatto. Es.: €10k/mese ricorrenti → €120k run-rate → si moltiplica 120k.
- **Multiplo (grounded su comps di mercato):** micro-agenzia oggi → **2–4x** (fondatore
  solo, <3 mesi, concentrazione). 10–15x è da azienda cresciuta/prodotto SaaS, non regge
  oggi. **€8–10k/mese fa €1M solo a 10x**; a 2–4x servono ~€21–42k/mese ricorrenti.
  → **2 strade:** (A) run-rate €250–500k a 2–4x; (B) alzare il multiplo a 5–8x
  (ricorrenza contrattuale + churn~0 osservato + clienti diversificati + stack AI
  trasferibile) → run-rate €125–200k. Dettaglio e griglia in `docs/11`.
- **Nota di ruolo:** il CEO ha chiesto di non demotivare **e** di non vendere false
  promesse → do il numero di mercato (2–4x) + la roadmap concreta per €1M, senza gonfiare.

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

### 2026-09-06 (sera) — Cambio sequenza: INFRA COLD EMAIL prima dei documenti
- **Decisione CEO:** anche se aveva scelto "documenti prima", ora vuole **settare
  subito l'infrastruttura cold email** (i documenti non sono ancora arrivati in chat).
  Parte l'infra email; i documenti restano parcheggiati e si riprendono quando li carica.
- **Vincoli CEO:** NO domini pre-warmed, NO reseller domini/inbox di Instantly (vincolato
  al trial). → strada **Google Workspace + config DNS manuale**. Piano: **2 domini × 3
  inbox = 6 caselle**, warmup 14gg. Budget: rientra nel "max ~100 €/mese" (~€80-95/mese).
- **Ricerca (docs/13):** piano validato e conservativo. Costo ~€80-95/mese; upfront
  ~€110-130. DNS non difficile (~2,5-3h/2 domini; critico il DKIM). Prima cold ~gg 16-17.
- **Instantly:** free trial limitato a 2 caselle → setup vero su **Growth ($47/mese)**.
  API su tutti i piani a pagamento; **connettore Composio (~115 azioni)**: con la API key
  piloto io campagne/warmup/lead. **OAuth caselle = click umano** di Valerio (non delegabile).
- **Mercato (docs/02):** ~12k installatori PV reali; **ICP raggiungibile ~3-5k, riciclabile**.
  Il "1.500" del CEO vale solo per il Tier-1 stretto. A 100/gg NON si esaurisce il mercato
  (sequenze 3-5 touch + re-contact ogni 90gg). Collo di bottiglia = qualità lista + offerta.
  Geo di partenza: **Lombardia → Veneto → Emilia-Romagna**.

### 2026-09-06 (sera) — Infra email: cosa il CEO ha DAVVERO detto vs mie raccomandazioni
> ⚠️ Correzione integrità: una versione precedente aveva registrato come "✅ scelte CEO"
> cose che Valerio NON aveva deciso. Sotto la verità.

**Confermato da Valerio (sue parole):**
- ✅ Strada **Google Workspace + config DNS manuale** (no scorciatoie).
- ✅ **2 domini × 3 inbox = 6 caselle**, warmup 14gg su Instantly.
- ✅ **NO domini pre-warmed, NO reseller domini/inbox di Instantly** (vincolato al trial).
- ✅ Domini presi storicamente su **IONOS** (suo pannello di fiducia) — chiede se è un problema.
- ✅ "**Procedi**" a montare la prima infra cold email.

**Mie RACCOMANDAZIONI (in attesa di conferma in chat, NON ancora scelte da lui):**
- 🔲 **Instantly Growth ($47/mese)** invece del trial (il trial regge solo 2 caselle, lui ne
  vuole 6). Da confermare quando vuole passare a pagamento.
- 🔲 **Geo di partenza Lombardia → Veneto → Emilia** (dalla ricerca: max densità ICP).
- 🔲 **Lista via scraping + CSV** (no Lead Database Instantly, si risparmia).
- 🔲 **TLD .it** (lui lo preferisce per fiducia; deliverability quasi identica al .com se
  autenticato — vedi risposta in chat). Da confermare.
- 🔲 **IONOS va bene** come registrar (non compromette nulla; è solo registrar/DNS, l'email
  resta Google). Cloudflare marginale, non vale rompere il suo flusso.

**Aperto da Valerio (in chat):** qual è il **dominio primario di SolarBack** (non ne ha mai
preso uno; il sito è su `artecai.it`). Serve per: (a) identità brand, (b) target del redirect
301 dei domini cold.

### 2026-09-06 — Brand, nicchia e architettura domini
- **Nicchia: si RESTA sul fotovoltaico.** Ricerca (docs/12 + dati gen-lug 2026: +13%, 3,7 GW, 86%
  residenziale con accumulo): il FV **non è morto d'inverno**, domanda più stabile tutto l'anno,
  picco connessioni nov-dic per scadenza fiscale. Nessun pivot ora.
- **Naming risolto (leva chiave):** **artec AI = agenzia madre** (nome flessibile) · **SolarBack =
  brand verticale FV** (specifico → converte di più nel cold). Se un domani si aggiunge una nicchia
  (es. pompe di calore), nuovo brand verticale sotto artec AI → **SolarBack non si rinomina.** Così
  Valerio ha specificità ORA + flessibilità DOPO, senza rischio rebranding.
- **Domini:** `solarback.it` (disponibile, Valerio lo compra) = **sito + email vera del brand**, da
  proteggere. **2 domini secondari `.it`** = SOLO cold email (redirect a solarback.it). Registrar IONOS.
- **CLAUDE.md ristrutturato:** tagliato da 140 → ~40 righe (best practice: corto = rispettato); il
  dettaglio persona/regole/stato spostato in **`memory.md`** (nuovo, memoria permanente).
- **Regola CEO:** a ogni prompt → 4 domande popup (fase discovery), appuntare tutto in memory.md.

### 2026-09-07 — Lista Target, verifica email, regole outreach (scelte CEO in chat)
- ✅ **`main` = solo sito** (Netlify). Ripulito: rimosso il commit coi file lead; "mai più bancone di lavoro".
- ✅ **Repo da rendere PRIVATO** (lo fa Valerio) e SOLO DOPO l'asset va nel ramo (`asset/`). Vecchi file grezzi eliminati
  dal repo (backup locale `private/raw/`).
- ✅ **Excel minimal** (header bold, filtri, freeze; niente colori). **Doppioni lasciati separati con flag.**
- ✅ **Verificatore email PER SEMPRE = Apify `blessiticus/email-verifier-pro`** (via Composio, $0,85/1k). Verificate
  tutte le 3.895 email. **Policy fase1:** valid + risky role-based non catch-all (2.584); catch-all esclusi perché la
  ricerca dice bounce atteso 7-12% (soglie Google/Outlook: bounce < 2%, spam < 0,1%). Fase2 (catch-all) solo se il
  bounce misurato resta < 2%.
- ✅ **NO openapi.com** per l'arricchimento (troppo caro). Arricchimento Tier A/B con sito/FB/Apify.
- ✅ **Cold call = solo Valerio**, mar→ven 10-12 e 14:30-19, lunedì mai; flusso chiama → richiama → script → qualifica
  in call → meeting a calendario. Script suo, da salvare in `docs/05` quando lo condivide.
- ✅ **Cellulari/WhatsApp dei titolari si chiamano; email a qualsiasi azienda/titolare (B2B). Mai B2C.** L'agente non
  cita più vincoli tipo RPO/consenso.
- ✅ **Popup 7/9 sera:** repo → privato subito (poi asset in `asset/`) · script cold call incollato da lui · compra ora domini +
  Workspace · arricchimento Tier A/B approvato (sito → FB → Apify GMaps, dentro il free tier Apify).
- ✅ **Affidabilità = audit automatico** (`scripts/audit_lista_target.py`, riconciliazione grezzo→lista + invarianti +
  campioni), non controllo manuale riga per riga. Esito 7/9: TUTTO OK dopo 3 correzioni trovate dall'audit.

## ⚠️ Decisioni ANCORA da prendere (vedi docs/06-domande-aperte.md)
- Struttura finale dell'offerta + offerta pilota "founding partner" (in ricerca).
- Numero-target reale: 30 entro il 26/10 vs. filosofia "pochi partner/anno" del
  documento strategico — come li conciliamo.
- Residenziale vs. commerciale come focus dei primi partner.
- Focus geografico iniziale (tutta Italia vs. una zona per partire).
- Come gestire l'attrito "il cliente paga le ads" nell'offerta a freddo.
