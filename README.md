# SOLARBACK — Landing Page

Landing page per SOLARBACK, il sistema esterno di acquisizione clienti per installatori di fotovoltaico in Italia.

## Tech Stack

- **Next.js 16** — App Router + Turbopack
- **React 19**
- **Tailwind CSS v4** — utility-first styling
- **Framer Motion** — animazioni
- **Resend** — invio email candidatura
- **Zod** — validazione form (client + server)

## Getting Started

```bash
npm install
npm run dev
```

## Deploy

Automatico su Netlify via `@netlify/plugin-nextjs`.

## Environment

```bash
# OBBLIGATORIA — senza questa il form di candidatura non invia email
RESEND_API_KEY=re_xxxxx

# OPZIONALE — mittente delle email di candidatura.
# Default: "SOLARBACK <onboarding@resend.dev>" (mittente di test Resend,
# funziona senza verificare un dominio). Una volta verificato artecai.it
# su Resend, impostare qui: SOLARBACK <noreply@artecai.it>
RESEND_FROM=
```

Le candidature vengono recapitate a `valerio@artecai.it`.

Google Search Console è verificato a livello di **dominio** (record DNS), quindi
non serve alcun meta tag di verifica nel codice.
