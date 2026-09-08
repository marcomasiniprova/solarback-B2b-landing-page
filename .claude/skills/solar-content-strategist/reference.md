# reference.md · SOLAR - CONTENT STRATEGIST
Contratto Mission Control: `.claude/skills/solar-ruolo-template/reference.md` (op, chiavi, esempi curl).
MC = `https://mission-control-production-d22b.up.railway.app` · `Authorization: Bearer <INGEST_KEY>`.

## Formato `piano:oggi` (kv)
```json
{
  "data": "2026-09-09",
  "tema": "Il problema non sono i clienti che mancano, ma quelli che non richiami in tempo",
  "angolo": "contrarian",
  "pillar": "verità scomode",
  "hook": ["Non hai un problema di clienti. Hai un problema di velocità.", "Ci ha chiamato un installatore con 40 richieste ferme.", "Un preventivo richiamato dopo 2 giorni è quasi sempre perso"],
  "formati": ["carosello", "video"],
  "cta": "Domanda finale: quanto passa tra una richiesta e la tua prima telefonata?",
  "note_caroselli": "8 slide: cover hook contrarian, problema, 4 slide valore (tempo, qualifica, agenda, rischio), numero-billboard SOLO se verificato, CTA singola",
  "note_video": "15-25s, hook parlato nei primi 3s, b-roll tetti/pannelli, sottotitoli, disclosure AI",
  "perche_oggi": "Primo giorno: nessuno storico; parto dal pezzo 1 del calendario docs/17. Bozze in attesa: 0.",
  "fonte_calendario": "docs/17 · Settimana 1 · Giorno 1"
}
```
## Bozza in Approvazioni (`approval_add`)
`kind: "other"`, `title: "Piano contenuti del 09/09"`, `payload: { "testo": "<piano in italiano leggibile, 10-15 righe>" }`.
## kv `strategist:usati`
`{ "usati": ["docs/17 W1 G1", "docs/17 W1 G2"] }` — aggiungi il pezzo usato oggi.
## Regole copy da ricordare (dalla ricerca 2026)
- Hook: storia (2,60%) e contrarian (2,31%) battono la domanda (2,16%) — dati AuthoredUp su 310K post. Hook 0-40 caratteri vince.
- LinkedIn: 800-1.000 caratteri, un'idea per paragrafo, link nel primo commento (-18,8% reach se nel post).
- Mai il trattino lungo. Mai percentuali social nei post. Numeri solo dal fotovoltaico con fonte.
