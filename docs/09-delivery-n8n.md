# 09 — Delivery / stato automazioni n8n (verifica 2026-09-05)

> Assessment fatto ispezionando direttamente n8n via MCP. **Nessuna credenziale/
> API key riportata qui** (alcune sono hardcodate nei workflow — vedi §Sicurezza).

## Verdetto in una riga
Il motore di delivery **NON è uno scheletro: è costruito sul serio e in modo
sofisticato.** Manca soprattutto **attivazione + collaudo live + pulizia dei
doppioni + verifica credenziali/servizi**. Il CEO aveva ragione: "quasi
pronte/collaudate" è corretto.

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
