# docs/18 — Attori Apify · Registro dei migliori (DA CONSULTARE SEMPRE)

> **REGOLA:** ogni volta che si parla di scraping / arricchimento su Apify, **leggere PRIMA questo file**.
> Qui stanno solo gli attori **buoni, testati e allineati** al nostro scopo (trovare titolari installatori FV: email + telefono).
> Gli attori inutili/difettosi/fasulli/non-allineati vanno nel **Cimitero** (§4) così non li riusiamo per sbaglio.
> Aggiornare **man mano** che se ne provano di nuovi. Costi = pay-per-event (paghi il risultato, non il tempo).

**Ultimo aggiornamento:** 8/9/2026 · dati costo/rating verificati dallo Store Apify in questa data.

---

## 1. I migliori (usare questi)

| # | Attore | Cosa dà | Come (input) | Costo | Rating | Stato |
|---|---|---|---|---|---|---|
| ⭐1 | **microworlds/leads-finder** | email **+ cellulare** del titolare | per **dominio** filtrando ruolo Owner/Titolare/CEO | **$0,003/lead** | — | ✅ usato, ottimo |
| 2 | **harvestapi/linkedin-company-employees** | titolare **+ email** | via **URL LinkedIn azienda** (filtro seniority) | **~$0,012** /profilo+email | — | ✅ usato |
| 3 | **snipercoder/bulk-linkedin-email-finder** | **solo email** (+ nome/titolo/azienda) | da **URL/ID LinkedIn persona** | **$0,001/email** (fino a $0,0006 tier alti) | 4,86 (11) | 🟡 da provare noi |
| ➕ | **blessiticus/email-verifier-pro** | **verifica SMTP** delle email | CSV/lista email | **$0,00085/email** ($0,85/1k) | 5,0 (7) | ✅ nostro verifier standard |

> ➕ = non era nei 3 che mi hai dato, ma lo usiamo davvero e funziona (è il verifier con cui abbiamo prodotto valid/risky/unknown). Lo tengo qui perché è il migliore per quel compito. Se non lo vuoi, lo sposto.

---

## 2. Schede dettagliate (input reali + trappole imparate sul campo)

### ⭐ microworlds/leads-finder — LA #1 di Valerio
- **ID:** `microworlds/leads-finder`
- **A cosa serve:** dato un dominio aziendale, trova i contatti dei decisori (email **e cellulare**). È il nostro cavallo per l'arricchimento a partire dai siti aziendali del DB.
- **Input chiave:** `company_domains` (lista di domini) + filtro ruolo (Owner/Titolare/CEO/Founder).
- **Costo:** pay-per-event, **$0,003 per lead** restituito.
- **⚠️ TRAPPOLA (imparata sul campo):** su grandi aziende off-target (es. bricocenter, unoenergy, CBRE) **mangia budget** restituendo tanti lead inutili. → **Filtrare i domini a monte** (solo installatori veri) e mettere sempre un **cap di spesa per run** (es. $4). Nel round L2 un cap senza filtro ha reso solo ~42 lead puliti su budget bruciato da ~14 aziende grosse.
- **Quando usarlo:** hai i **domini** delle aziende e vuoi il contatto del titolare. Primo step della catena.

### harvestapi/linkedin-company-employees
- **ID:** `harvestapi/linkedin-company-employees`
- **A cosa serve:** dato l'**URL LinkedIn dell'azienda**, elenca i dipendenti filtrando per seniority (per beccare il titolare/decisore) con email.
- **Input chiave:** `companies` = URL LinkedIn azienda · `seniorityLevelIds` = `["320","310","300","220"]` (Owner/CXO/Director/…) · modalità con email search (piano "Full + email").
- **Costo:** **~$0,012** per profilo+email ($12/1k).
- **⚠️ TRAPPOLE:** (a) in modalità `all_at_once` **max ~20 aziende per run**; (b) il **FREE tier ha run-limit + rate-limit giornaliero** → se lanci troppo, i run tornano 0 in pochi secondi: serve **cooldown** (riprendere dopo/il giorno dopo).
- **Quando usarlo:** cascata L2 — hai l'URL LinkedIn dell'azienda ma non il titolare. Secondo step quando leads-finder non ha reso il decisore.

### snipercoder/bulk-linkedin-email-finder — 🟡 da testare
- **ID:** `ddgw2oGFaH645BFAq` (`snipercoder/bulk-linkedin-email-finder`)
- **A cosa serve:** date le **URL/ID LinkedIn di persone**, restituisce l'email (+ nome, titolo, azienda). Il più economico dei tre.
- **Input chiave:** `linkedin_url_or_ids` (un URL o ID per riga) **oppure** `csv_file` (header `linkedin_url_or_id`).
- **Costo:** **$0,001/email** (FREE tier; scende a $0,0006 sui tier alti).
- **⚠️ TRAPPOLA (dichiarata dall'autore):** **input sopra 100 falliscono** → spezzare in batch da ≤100.
- **Quando usarlo:** hai già le **URL dei profili persona** (es. dai dipendenti trovati) e vuoi solo l'email, spendendo pochissimo. Terzo step / alternativa economica.
- **Stato:** rating alto (4,86) ma **non ancora provato da noi** → primo giro su un batch piccolo per validarne la resa reale prima di fidarsi.

### ➕ blessiticus/email-verifier-pro — il nostro verifier
- **ID:** `rzWN5rWOZelwVxehV` (`blessiticus/email-verifier-pro`)
- **A cosa serve:** verifica SMTP reale delle email raccolte (valid/risky/invalid/unknown) + flag disposable, role-based, catch-all, free-provider, confidence. **No API key.**
- **Costo:** **$0,00085/email** ($0,85/1k) + micro-costo di avvio.
- **Quando usarlo:** **sempre**, dopo aver raccolto email dai tre sopra, prima di caricarle in campagna. È il filtro che alimenta `verifica_email.fase1_ok`.

---

## 3. Catena consigliata (case per caso)
1. **Ho i domini** → `leads-finder` (email+cell titolare). Se rende il decisore → verifica → carica.
2. **leads-finder non ha reso il titolare, ho l'URL LinkedIn azienda** → `harvestapi/linkedin-company-employees` (filtro seniority) → ottieni persone+email.
3. **Ho le URL dei profili persona ma non l'email** → `snipercoder/bulk-linkedin-email-finder` (economico, batch ≤100).
4. **Ho email non verificate (da qualsiasi step)** → `blessiticus/email-verifier-pro` → tieni valid + risky-buone (`fase1_ok`).

---

## 4. 🪦 Cimitero (NON riusare — provati e bocciati)
> Vuoto per ora. Quando un attore si rivela inutile/difettoso/fasullo/non-allineato, spostarlo qui con **1 riga sul perché**, così non lo ripaghiamo per sbaglio.

- _(nessuno ancora bocciato formalmente)_

---

## 5. Note operative
- **Connettore:** usare il connettore nativo **`mcp__Apify__*`** (direttiva CEO), non Apify via Composio.
- **Verifica costi/schema al primo uso** di un attore nuovo (i prezzi sullo Store cambiano). Mai inventare parametri: leggere l'input schema con `fetch-actor-details`.
- **Cap di spesa per run** sempre impostato sugli attori pay-per-event, per non bruciare budget su output off-target.
