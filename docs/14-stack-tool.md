# 14 — Stack Tool SolarBack + come collegarli (sicuro)

> Come colleghiamo i tool alla sessione cloud di Claude Code (giro sui computer di Anthropic, in cloud).
> Deciso l'8/9/2026. **Regola d'oro sotto: le chiavi NON vanno mai in un file .env nel repo.**

## ⛔ REGOLA D'ORO SICUREZZA (verificata online + dai tuoi screenshot)
1. **MAI mettere API key/segreti in un file `.env` nel repo.** Il repo è pubblico (finché non lo rendi privato) →
   leak immediato; e Claude Code carica automaticamente i file `.env` in memoria senza avvisare. Vietato.
2. **MAI mettere segreti nel riquadro "Variabili d'ambiente"** del pannello ambiente cloud: lo dice l'app stessa
   ("visibili a chiunque utilizzi questo ambiente — non aggiungere segreti o credenziali"). Lì solo config non-segreta
   (es. `NODE_ENV=production`).
3. **✅ USARE il pannello "Credenziali API"** (secondo screenshot): "Aggiungi credenziale". Il **proxy** di Anthropic
   allega la chiave alle richieste verso gli host che indichi; **il valore non è mai visibile dopo il salvataggio e non
   arriva mai alla sessione** come variabile o file. Io chiamo l'host, il proxy mette l'auth, io non vedo la chiave.
   Per ogni credenziale: **Nome** · **Tipo** (di solito Bearer) · **Siti web consentiti** (l'host dell'API, es.
   `api.instantly.ai`) · **Header** (`Authorization: Bearer <chiave>`).
4. **✅ Dove esiste un connettore/MCP, meglio quello** (login OAuth, nessuna chiave in chiaro). Molti tuoi tool sono
   GIÀ collegati così nella mia sessione (vedi tabella).
5. Fonte: [Claude Code Docs — Configure cloud environments](https://code.claude.com/docs/en/cloud-environments) ·
   [.env leakage nei coding agent (knostic)](https://www.knostic.ai/blog/claude-loads-secrets-without-permission).

## Stato dei tool (mappatura del tuo stack)

| Tool | A cosa serve (SolarBack) | Come si collega | Stato |
|---|---|---|---|
| **Composio** (Apify, Sheets, Airtable, Gmail, WABA, Telegram) | hub che fa da ponte a molti tool; già usato per Apify e verifica email | **MCP Composio (OAuth per app)** — NON serve .env | ✅ già collegato in sessione |
| **Apify** | scraping liste + verifica email + arricchimento | via **Composio** (o API credential `api.apify.com`) | ✅ già usato |
| **GitHub** | repo, branch, asset | **MCP GitHub** | ✅ già collegato |
| **n8n** (self-hosted) | delivery: speed-to-lead, booking, WhatsApp | **MCP n8n** (+ eventuale API key n8n) | ✅ MCP presente |
| **Airtable** | **DB/CRM vivo** dei contatti e della pipeline | **MCP Airtable** / via Composio | ✅ MCP presente |
| **Supabase** | DB SQL se serve scala | **MCP Supabase** | ✅ MCP presente |
| **Netlify** | sito (deploy) | **MCP Netlify** | ✅ MCP presente |
| **Railway** | hosting servizi/n8n | **MCP Railway** | ✅ MCP presente |
| **Resend** | email transazionali | **MCP Resend** | ✅ MCP presente |
| **Notion** | doc/knowledge | **MCP Notion** | ✅ MCP presente |
| **Gmail / WhatsApp (WABA) / Telegram** | comunicazione, notifiche, outreach | **connessioni Composio (OAuth)** | ⏳ da autorizzare in Composio |
| **Google Calendar** | booking sopralluoghi/meeting | **connettore/credenziale in n8n o Composio (OAuth)** | ⏳ da collegare |
| **Instantly AI** | cold email a volume (motore acquisizione) | **Credenziale API** → host `api.instantly.ai` (Bearer). Serve piano a pagamento per l'API | ⏳ da collegare |
| **Unipile** | LinkedIn/messaging automation (DM, multi-inbox) | **Credenziale API** → host del tuo DSN Unipile (`*.unipile.com`) | ⏳ da collegare |
| **HeyGen** | video avatar (contenuti/outreach video) | **Credenziale API** → host `api.heygen.com` | ⏳ da collegare |
| **KIE** | generazione media AI (immagini/video) | **Credenziale API** → host `api.kie.ai` (confermare) | ⏳ da collegare |
| **YT Transcriber** (tua piattaforma) | trascrive YouTube/mp4 (contenuti, ricerca) | **Credenziale API** → host della tua piattaforma | ⏳ da collegare |
| **Omnisocials / Zernio** | gestione social / pubblicazione | **Credenziale API** → host da confermare | ⏳ da collegare |
| *(futuro)* conto bancario, altri | — | quasi sempre **connettore/OAuth** o credenziale API, mai .env | 🔜 |

> Legenda: ✅ già collegato nella mia sessione · ⏳ da collegare (azione tua nel pannello, guido io) · 🔜 più avanti.

## Chi fa cosa
- **Io NON posso vedere né inserire le chiavi** (per sicurezza). Le aggiungi **tu** nel pannello "Credenziali API"
  (o autorizzi il connettore/OAuth). Io ti do, per ogni tool, l'**host esatto** da mettere in "Siti web consentiti" e
  l'header. Poi io uso il tool: il proxy autentica al posto mio.
- Per i tool **già MCP** (tabella ✅) non devi fare nulla: li uso già.
- Ordine consigliato di collegamento (per lo sprint acquisizione): **Instantly → Composio (Gmail/Sheets/WABA) →
  Google Calendar → n8n**, poi i tool contenuti (HeyGen/KIE/YT/Unipile/Omnisocials).

## Nota "database vivo"
Il DB dei contatti NON è un file fermo: ogni nuovo dato (arricchimento, risposte, esiti call) lo aggiorna. Oggi vive
come CSV/xlsx in `private/out`; il passo naturale per renderlo davvero "vivo" e query-abile è portarlo in **Airtable**
(via Composio/MCP) — così ci scrivo e aggiorno stato dei Contatti/Interessati/Qualificati/Partner in tempo reale.
