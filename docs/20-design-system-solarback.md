# docs/20 — Design System SolarBack (BRAND KIT · enforceable)

> **Cos'è:** le regole visive VINCOLANTI per ogni asset SolarBack (caroselli, card, immagini, video-cover).
> Nasce dalla ricerca 2026 (`docs/ricerca/2026-design-caroselli.md`, con fonti). Chi produce contenuti (io, la skill, l'agente
> CONTENT) segue QUESTO. Se un asset non passa il check finale (§7), non esce. Obiettivo: sembrare **agenzia vera**, mai "fatto con l'AI".

**Aggiornato:** 8/9/2026.

---

## 1. Palette (bloccata)
| Ruolo | Hex | Uso | Contrasto |
|---|---|---|---|
| Base sfondo | `#0B0B0B` grafite | fondo di tutto | — |
| Superficie/card | `#141414` → `#1A1A1A` | pannelli, profondità (MAI un solo nero piatto) | — |
| Testo corpo | `#F5F2EB` bianco caldo | tutto il testo lungo | ~17:1 su grafite ✓ AAA |
| Accento | `#D9A441` oro | SOLO headline, numeri, 1 linea, logo, CTA piena | ~8,7:1 su grafite ✓ |
| Testo secondario | `#B8B2A6` grigio caldo | didascalie, kicker | — |
| Micro-tocchi tricolore | verde `#008C45` / rosso `#CD212A` | pochissimo, solo dove serve "italianità" | — |

**VIETATI (tell da AI/dilettante):** viola/lavanda, gradienti glow, `#000` puro con `#FFF` puro (halation su mobile), **oro come corpo testo**, **oro su bianco** (sparisce, ~2:1), più di un accento, grigi freddo-bluastri accanto all'oro.

## 2. Tipografia
- **Titoli:** display/grottesco CON personalità, **40px+**. ⚠️ **Non Inter "puro"**: è la firma n.1 dell'output AI. (Manrope va bene come family di brand se il titolo ha peso/scala forti; valutare un display per le cover.)
- **Corpo:** Manrope/Inter, **min 24px**, interlinea **~1.4×**, **max 6-8 righe per slide**, max 2 frasi corte.
- **Gerarchia:** salto di scala NETTO titolo↔corpo (titolo ~2.5-3× il corpo). Un solo elemento dominante per slide (focal point).
- **Allineamento:** corpo allineato a **sinistra** (F-pattern); centrato solo per cover/statement corti.

## 3. Griglia (il "sistema", non slide sparse)
- Tela **1080×1350** (4:5, mobile-first) default; 1:1 (1080×1080) alternativa.
- **Margine interno costante ~100px** per lato. Mai testo attaccato ai bordi (su IG UI/caption mangiano i bordi).
- **Stessa posizione fissa** su OGNI slide per: logo, numero slide, kicker, titolo. Stessi font, stessi accenti, stessa griglia → è ciò che fa "brand", non 8 immagini diverse.
- **~60% spazio negativo.** Il vuoto è gerarchia, non spreco.

## 4. Template carosello (8 slide, default per LinkedIn E Instagram)
1. **Cover / Hook** — ferma lo scroll (3-8 parole, tensione/contrarian, come l'oggetto di una email) + indicatore di swipe.
2. **Problema** — agita il dolore del titolare FV, apri un open-loop.
3-6. **Valore** — 1 sola idea per slide (framework/step/dato/mini-caso). Se serve più di 2 frasi → spezza in due slide.
7. **Prova / numero-billboard** — dato grande o riepilogo take-away (aumenta i salvataggi).
8. **CTA singola** — una sola azione ("Scrivici SOPRALLUOGO"), niente 3 link. Logo.

## 5. Card singola (quote / statement / dato)
- **Numero-billboard:** un numero gigante in oro fa il lavoro da lontano ("€99 a sopralluogo", "paghi solo a risultato") + 1 riga di contesto + logo. Tanto spazio negativo.
- Deve sembrare **"una slide del carosello uscita da sola"**: stessa griglia, font, accento.

## 6. ⚙️ Come si PRODUCE un asset (workflow tecnico — corregge l'errore del test)
> **Lezione dal test 8/9:** far scrivere il testo dentro GPT Image = accenti sbagliati (VELOCITÀ→VELOCITA), kerning ballerino. **Vietato.**

**Regola d'oro:** **l'AI genera solo lo SFONDO/atmosfera; il testo si renderizza SOPRA con font veri.**
1. **Sfondo** (opzionale): Kie AI GPT Image 2 → solo scena/texture/luce dorata (tetti, pannelli, sole), **niente testo, niente persone a caso**. Oppure fondo grafite pieno.
2. **Testo + layout:** renderizzato con **font veri** sopra lo sfondo. Per un agente automatico = **template HTML/SVG → PNG** (griglia, palette, font bloccati nel template): accenti perfetti, on-brand al 100%, deterministico. Per lavoro a mano = Figma (master) → Canva Brand Kit (volume).
3. **Prompt-base sfondo Kie (con "negative"):**
   ```
   Abstract premium background for a social card, [4:5|1:1]. Deep graphite charcoal (#0B0B0B to #1A1A1A), a single warm golden light (#D9A441) grazing across [solar panels on a roof | clean geometric texture], cinematic, high-end, lots of empty negative space in the [upper|left] area for text overlay. NO text, NO letters, NO logos, NO people, NO purple, NO glow, NO neon.
   ```
4. **Style reference:** tieni una libreria di 2-3 sfondi approvati e riusali come riferimento per non far driftare lo stile.

## 7. ✅ Check anti-AI PRIMA di pubblicare (tutti SÌ o non esce)
- [ ] Font non-default (niente Inter puro come titolo)?
- [ ] Un solo accento (oro), zero viola/glow?
- [ ] Margini costanti, niente testo sui bordi?
- [ ] **Zero testo generato dentro l'immagine AI** (testo renderizzato con font veri)?
- [ ] Accenti italiani corretti (è, à, ù...)?
- [ ] Gerarchia chiara (un focal point, salto di scala netto)?
- [ ] Dove possibile, foto reali di cantieri/tetti invece di stock/clipart?
- [ ] Le slide sembrano "parenti" (stesso sistema)?

## 8. Benchmark da cui rubare pattern (non copiare)
Chris Do (cover-quote + brand fisso, 1 idea/slide) · Jack Butcher/Visualize Value (vincolo estremo, sistema iconico) · Justin Welsh (liste numerate + template rigido) · Gong (numero-billboard su dati) · Cognism ("mito vs realtà", comparazioni) · Pretty Little Marketer (slide-riepilogo finale) · Rhode/Loewe (coerenza cromatica maniacale, magazine-style = la direzione premium) · Notion (educazione + caso reale). Dettaglio e URL in `docs/ricerca/2026-design-caroselli.md §8`.

## 9. Dato citabile vs non citabile
- **Solido:** caroselli = **9× più salvataggi** dell'immagine singola (Metricool 2026, 24,3M post). Usalo per decidere il formato, NON metterlo nei post.
- **Regola:** MAI pubblicare percentuali di performance social prese dai blog. Se in un post serve un numero, deve venire dai dati del **fotovoltaico** (fonte verificabile), non dal mondo social.
