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
RESEND_API_KEY=re_xxxxx
GSC_VERIFICATION=  # (opzionale) codice Google Search Console
RESEND_FROM=SOLARBACK <noreply@artecai.it>  # (opzionale) default: noreply@artecai.it
```
