# 09 — Delivery / stato automazioni n8n (verifica 2026-09-05)

> Assessment fatto ispezionando direttamente n8n via MCP. **Nessuna credenziale/
> API key riportata qui** (alcune sono hardcodate nei workflow — vedi §Sicurezza).

## Verdetto in una riga
Il motore di delivery **NON è uno scheletro: è costruito sul serio e in modo
sofisticato.** Manca soprattutto **attivazione + collaudo live + pulizia dei
doppioni + verifica credenziali/servizi**. Il CEO aveva ragione: "quasi
pronte/collaudate" è corretto.

## Architettura confermata dal CEO (5/9) + i 4 workflow da collaudare
- **Alessandro = segreteria AI CONDIVISA** su Meta WhatsApp Business: un numero che
  qualifica i lead di **più partner** (non un agente per cliente). In futuro si
  aggiungono altri numeri = altri "segretari". SolarBack di fatto **affitta un
  reparto segreteria**.
- **Flusso SPEED-TO-LEAD (lead nuovi dalle ads):**
  - **M1 speed-to-lead** (intake): Meta/Facebook Lead Form → *(webhook)* → pulizia
    telefono + validazione → lookup campagna (foglio Campagne_Attive) → wait 25s →
    invio **template WhatsApp** (`conferma_requisiti_alessandro`) → append riga in
    **Lead_Attivi**. ⚠️ **Il trigger Meta/Facebook Form NON è ancora collegato**:
    oggi è un webhook grezzo `POST /webhook/lead-solecasa` (n8n.artecai.cloud) che
    si aspetta `{nome, Telefono, "Codice Campagna"}`. Questo è **l'anello mancante
    più a rischio**.
  - **M2 speed-to-lead = Alessandro** (conversazione): quando il lead risponde, il
    WhatsApp trigger di Alessandro gestisce tutta la qualifica → booking.
- **Flusso DATABASE REACTIVATION (lead vecchi):**
  - **M1 DB-react**: schedulato, manda il template `ricontatto_v1` ai lead dormienti.
  - **M2 DB-react**: risponde ai lead che rispondono. ❓ **Da chiarire:** è un
    workflow separato o è lo stesso Alessandro (il suo WhatsApp trigger cattura
    tutte le risposte in ingresso)? Nell'istanza vedo un solo "Alessandro".
- **Totale: 4 workflow da collaudare** (2 speed + 2 DB-react).

## Cosa esiste (workflow SolarBack, ~14 su 49 totali nell'istanza)
> Nota: molti degli altri 49 workflow sono di ALTRI progetti del CEO (Studio
> Virtù/PROGETTO PROF, Rivolio, ZeroBattute) — dimostrano che sa costruire n8n
> di alto livello. Tutti i SolarBack risultano `active:false` e con data
> 2026-08-05 (probabile import in blocco: la data NON riflette lo sviluppo reale).

### SOLARBACK - SERVICE (delivery)
- **M2 - AI speed to lead** — *ispezionato, di ottimo livello.* WhatsApp trigger →
  gestisce testo/audio/foto (Deepgram per i vocali, Mistral OCR per le bollette) →
  debounce 30s + buffer + lock su **Redis** (evita doppi invii) → **agente AI
  "Alessandro"** (modello DeepSeek) con memoria su **Supabase/Postgres** e tool:
  Google Calendar (disponibilità/crea/modifica/cancella), ricerca **casi studio**
  vicini (social proof), **notifica al titolare** via WhatsApp → invio risposta
  (testo o foto). **Multi-tenant**: legge Google Sheet "SolarBack Configurazione
  Clienti" (Lead_Attivi, Campagne_Attive per cliente). Questo È il cuore del servizio.
- **M1 - AI speed to lead** — probabile versione precedente/duplicato di M2.
- **ARTEC — WA Conversation Manager** — gestione conversazioni WA (non ispezionato;
  `availableInMCP:false`).
- **M1 - AI database reactivation** — *ispezionato, completo.* Schedulato lun-ven
  9:00 → legge config clienti → filtra lead dormienti (deny-list stati, quota/dì,
  normalizzazione telefono) → invia template WhatsApp "ricontatto_v1" con
  **anti-ban** (attese randomiche) → writeback stato. Multi-tenant.

### SOLARBACK - MARKETING (acquisizione lead consumer + qualifica) — da ispezionare
- **M1 - Sorgente Lead Unica** (intake lead) · **M-Router - Smistamento Canali** ·
  **M2 - Arricchimento & Qualifica** · **M3 - Classifica & Personalizza** ·
  **M0 - Sorveglianza Errori** · **Zadarma Cold Call → Deepgram → LEADS**.
- ⚠️ Da verificare: **come entrano i lead dalle Meta Ads** fino al foglio
  "Lead_Attivi" che alimenta lo speed-to-lead (l'anello ads→lead→sheet→AI).

### Altri
- **SOLARBACK - Anti No-Show v2** (promemoria appuntamenti) · **analizzatore di
  BACINO** · **ARTEC Solar - Webhook Handler (risultati chiamate)**.

## Gap da chiudere PRIMA di garantire volumi (100-300/mese)
1. **Attivare + collaudo end-to-end live** con un numero WhatsApp reale (tutti
   `active:false` ora).
2. **Pulire i doppioni** (M1 vs M2 speed-to-lead, ecc.): scegliere il canonico,
   archiviare il resto → evitare confusione in produzione.
3. **Verificare credenziali/servizi live:** WhatsApp Business API (+ template
   approvati tipo `ricontatto_v1`), Deepgram, Mistral, DeepSeek, Redis, Supabase,
   Google Sheets/Calendar (`artecagenzia@gmail.com`).
4. **Verificare l'anello di intake** ads→lead→"Lead_Attivi"→speed-to-lead.
5. **Scala:** con più partner servono più numeri/limiti WhatsApp; l'architettura
   (multi-tenant + Redis + Supabase) regge, ma i limiti WA API vanno pianificati.

## 🏗️ Decisioni architetturali (5/9) — intake multi-tenant & inbound

### Intake Meta multi-partner: NO a "un workflow per partner"
Problema del CEO: il nodo nativo **n8n Facebook Lead Ads Trigger = una pagina per
trigger** → implicherebbe un workflow per ogni partner (non scala a 30+).
**Raccomandazione: UN solo intake multi-tenant** alimentato dal **Leggen Webhook
a livello di APP Meta** (non dal trigger per-pagina):
- Una Meta app iscritta al campo `leadgen`. Ogni pagina partner collegata fa il
  POST allo **stesso** webhook con `page_id` + `form_id` + `leadgen_id`.
- Il workflow recupera i campi del lead via Graph API e **instrada per
  `page_id`/`form_id` → foglio Campagne_Attive** (già la logica di lookup esistente).
- **Onboarding partner = collega la sua pagina all'app + 1 riga di config.** Zero
  nuovi workflow. `Codice Campagna` diventa il `form_id` (automatico da Meta).
- Il webhook grezzo attuale (`lead-solecasa`) è già il 90% di questo schema: va
  solo cambiata la sorgente (webhook Meta) e il routing per page/form id.
- ⏳ La parte LIVE Meta si accende al **primo partner** (serve la SUA pagina), ma
  l'intake multi-tenant si costruisce ora e si "flippa" all'onboarding.

### Vincolo WhatsApp: un numero = UN webhook inbound
Un numero WhatsApp consegna TUTTI i messaggi in arrivo a **un solo** webhook (e
più numeri sotto la stessa WABA colpiscono lo stesso webhook dell'app). Quindi
**non si possono avere due workflow WhatsApp-trigger attivi sullo stesso numero**
→ un "M2 DB-react" separato con trigger proprio **andrebbe in conflitto con
Alessandro**. Due strade:
- **(A) Cervello inbound unico (consigliato):** Alessandro è l'unico handler in
  ingresso; guarda il numero nel foglio e **ramifica** (lead da ads → flusso ads;
  lead da DB-react → flusso DB-react; stessi tool di booking). Scala a più partner
  E più "segretari" (ramifica per `phone_number_id` per caricare persona/config).
  La logica "M2 DB-react" vive come **branch/sub-workflow** dentro Alessandro.
- **(B) Numero dedicato** per la DB-react (altra "segretaria") — più numeri da
  gestire, ma separazione netta. → da confermare col CEO.

### Piano di collaudo (senza partner, WhatsApp già live)
Validiamo ~95% ORA con un **lead simulato**: riga di config di TEST + POST al
webhook col numero personale di Valerio come "lead" → verifica template →
Alessandro qualifica → prenota su Calendar → notifica titolare. Idem DB-react
(numero come lead dormiente → M1 → risposta). L'unico pezzo non provabile fino al
partner #1 = l'auto-feed live Meta→webhook (che pre-costruiamo).

## 🔴 Sicurezza (da sistemare)
Alcuni nodi HTTP hanno **API key hardcodate in chiaro** (Deepgram, Mistral) dentro
il workflow. Rischio: finiscono negli export/backup e sono visibili a chiunque
apra il workflow. **Azione:** spostarle nelle *Credentials* di n8n e **ruotare le
chiavi** esposte. (Le chiavi NON sono riportate in questo repo.)

## Implicazione strategica
La garanzia dell'offerta (`docs/07`) è **credibile**: la macchina per erogarla
esiste ed è ben fatta. Ma la garanzia regge solo dopo **attivazione + collaudo**.
Quindi: prima di chiudere partner con garanzie forti, chiudere i gap 1-4 sopra
(soprattutto 1 e 4). È un lavoro di **giorni**, non di settimane.
