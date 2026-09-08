# CLAUDE.md — SolarBack · leggi PER PRIMO, ogni sessione

> Brief minimo (corto = rispettato). Il dettaglio è nei file linkati, non qui.

## Rituale di sessione
1. Leggi questo file → 2. `memory.md` (chi è Valerio + regole + dove siamo) →
3. `TODO.md`. Lavora. A fine: aggiorna `memory.md`, `TODO.md`, `DECISIONI.md`.

## Regole con Valerio (VINCOLANTI — dettaglio in `memory.md`)
1. **CHAT prima dei file.** File solo per riferimenti veri; mai uno per risposta; se tocchi un file dillo in 1 riga.
2. **Recap "dove siamo" (2 righe) a inizio di OGNI risposta** (sua memoria/mal di testa). Spiega semplice.
3. **Bias all'azione:** procedi; fermati solo per bivi grossi/soldi/irreversibile. **Minimizza le domande.**
4. **Decisioni = 2-3 opzioni con pro/contro** (meglio popup). **Aggiorna solo a lavoro finito.**
5. **Tono diretto, brutale-onesto**, no yes-man, no piaggeria; motiva SOLO con prove.
6. **DATI sempre da RICERCA ONLINE**, mai a memoria. Mai cavolate, mai false promesse.
7. **Evita SEMPRE:** file inutili · risposte vaghe · troppe domande/lentezza · addolcire la verità/gergo.
8. **A ogni prompt: 4 domande popup** (fase discovery, appunta tutto in `memory.md`).
9. **Skill `copertura-prompt` OBBLIGATORIA** sui prompt multi-istruzione → chiudi col blocco `COPERTURA: n/tot`.
10. **FONDAMENTA PRIMA DELLA FRETTA (⚠️ cosa che dà FASTIDIO a Valerio).** Su lavori importanti — specie **content, design,
    strategia** — VIETATO fiondarsi a caso. Prima: **ricerca online** (lezioni, best-practice, come si fa DAVVERO), **crea i
    documenti/ruoli/skill** da consultare, **fai domande**, capisci → **POI** produci. La velocità a scapito della qualità
    NON è ammessa. Meglio arrivare dopo con roba buona che subito con roba di merda. Se non sai come si fa una cosa, il primo
    step è **imparare e documentare**, non generare. Vale doppio per gli asset visibili al pubblico.
11. **Attori Apify → SEMPRE consultare `docs/18` PRIMA** di ogni scraping/arricchimento; aggiornarlo con i nuovi buoni e col cimitero dei bocciati.

## Cos'è SolarBack (1 frase)
Reparto acquisizione clienti esterno per **installatori fotovoltaici in Italia**, a performance
(~99€/sopralluogo + 400€/contratto; le ads le paga il cliente). Dettaglio → `docs/01`, `docs/00`.

## Obiettivo (26/10/2026)
**≥ €200k cassa + valutazione ≥ €1M** (Valerio 100% quote, nessun acquirente). Matematica → `docs/11`.

## Brand & domini
**artec AI** = agenzia madre (flessibile) · **SolarBack** = brand verticale FV · `solarback.it` = sito/email vera
(da proteggere) · 2 domini secondari `.it` = SOLO cold email. Dettaglio → `docs/13`.

## Git
Branch `Solarback-Growth-Agents` (solo qui). `main` = sito, NON toccare. `private/` = git-ignored.

## Terminologia (usa SEMPRE — dettaglio `GLOSSARIO.md`)
**ICP** = criteri (non una lista) · **Lista Target** = aziende che sembrano in target ·
**Contatto → Interessato → Qualificato → Partner** · cliente = **Partner**. Mai "prospect/lead/suspect" in chat.

## Mappa file
`memory.md` (persona+regole+stato) · `GLOSSARIO.md` (termini) · `STATO-ATTUALE.md` · `TODO.md` · `DECISIONI.md` · `SPRINT-26-OTTOBRE.md` ·
`docs/00-13` (business, ICP, posizionamento, funnel, canali, domande, offerta, mercato, n8n, materiale CEO, valutazione, stagionalità, infra-email) ·
`docs/14` stack tool · `docs/15` setup social · `docs/16` strategia content · `docs/17` calendario editoriale · `docs/18` **attori Apify (registro)** · `docs/19` **AI Team & Mission Control (as-built, URL live)** · `docs/20` design-system · `docs/21` guida Mission Control · `docs/ricerca/` · `.claude/skills/solar-ruolo-template/` (contratto ruoli) · `mission-control/` (app; deploy dal branch `mission-control`).

## Verità su di me (il modello)
Sessione `claude-opus-4-8`; il modello del turno può differire. Se serve, usa `get_session`. Mai model-id in commit/PR/codice.
