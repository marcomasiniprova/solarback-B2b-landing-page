# 04 — Funnel & asset attuali (sito, form, stack)

> Inventario di ciò che esiste già, così non si ricostruisce nulla da zero.

## Sito / landing — `artecai.it`
- **Stack:** Next.js 16 (App Router, Turbopack) · React 19 · Tailwind v4 ·
  Framer Motion · deploy **Netlify** (`@netlify/plugin-nextjs`).
- **Codice:** sul branch **`main`** (non su questo branch).
- **SEO/AEO:** metadata completi, JSON-LD (Organization, Brand, WebSite,
  ProfessionalService, Service, FAQPage), `robots.ts`, `sitemap.ts`, `llms.txt`.
  Google Search Console verificato a livello dominio (DNS).
- **Analytics:** GA4 `G-VT411CNHWJ`. Evento conversione `generate_lead` al submit
  del form (da marcare come "evento chiave" nella UI di GA4).
- **Struttura pagina:** Hero → Problema → Metodo (4 step) → Dentro SolarBack →
  Differenza → Perché → Fit → Garanzia → Founder → FAQ → Form candidatura → Footer.
- **Pagine legali:** `/privacy`, `/cookie`, `/termini`.

## Form di candidatura partner (il funnel inbound)
Campi raccolti (ottima base di pre-qualifica / partner scoring):
1. Nome e cognome · 2. Azienda · 3. Telefono · 4. Email
5. **Commerciali che fanno sopralluoghi:** 0 / 1 / 2-3 / 4-6 / 7+
6. **Installazioni/mese:** <10 / 10-20 / 21-40 / 41-80 / 80+
7. **Come arrivano le richieste oggi:** passaparola / Meta / Google / portali / multi
8. **Budget pubblicità oggi:** 0 / <1k / 1k-3k / 3k-10k / 10k+
9. **Obiettivo 12 mesi:** sopralluoghi / contratti / zone / fatturato / efficienza
10. **Obiettivo di fatturato:** <500k / 500k-1M / 1M-3M / 3M-5M / 5M+
+ consenso privacy · honeypot anti-bot · anti-bot temporale.

**Dove vanno i lead:** POST `/api/submit` → email via **Resend** a
`valerio@artecai.it` (mittente attuale sandbox `onboarding@resend.dev` finché non
si verifica un dominio su Resend). Rate limit best-effort per IP, validazione
Zod, XSS-escape.
> ⚠️ Oggi i lead inbound arrivano SOLO via email. **Manca un CRM**: da collegare
> (Airtable/Notion) per non perdere lead e per tracciare la pipeline/KPI.

## Delivery — automazioni n8n (self-hosted)
- Presenti workflow di **AI Speed-to-Lead** e **agente AI su WhatsApp** che
  risponde/accompagna il lead fino al sopralluogo. "Quasi costruiti/collaudati";
  **manca ancora qualcosa** per il servizio completo.
- **TODO:** censire i workflow, testarli end-to-end, elencare cosa manca, rendere
  il delivery **ripetibile in ≤7 giorni** per un nuovo partner. (Valerio ha
  invitato a controllare direttamente su n8n.)

## Contatti / identità
- Brand: **SolarBack** · azienda: **artec AI** · dominio: `artecai.it`
- Founder: **Valerio Alieri** (Founder & CEO)
- Email: `team@artecai.it` / `valerio@artecai.it` · Tel/WhatsApp **+39 327 317 4931**
- LinkedIn: profilo **aziendale SolarBack** esistente.

## Tool & MCP disponibili in questo ambiente
n8n · Airtable · Notion · Supabase · Resend · Composio · GitHub · Netlify ·
Railway · Dropbox · Sentry. + **Instantly AI** (fuori MCP, cold email) + software di **LinkedIn DM automation**.
**Apify (via Composio)** = scraping + **verificatore email FISSO `blessiticus/email-verifier-pro`** ($0,85/1k; piano
free: 100 email/run, 4 run paralleli, run async). **NO openapi.com** per l'arricchimento (troppo caro, scelta CEO 7/9).
Lista Target: `scripts/build_lista_target.py` + `scripts/audit_lista_target.py` (output in `private/out/`).

## Gap del funnel (da chiudere)
1. **CRM/pipeline** assente → crearlo.
2. **Delivery n8n** da completare/collaudare.
3. **Motore di acquisizione partner** (outbound) non attivo → è il focus dello sprint.
4. **Prova sociale** (case study/recensioni) = 0 → generarla coi primi partner.
5. Dominio email dedicato per invii a freddo (non bruciare artecai.it).
