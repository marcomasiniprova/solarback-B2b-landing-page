# reference.md · SOLAR - VIDEO
Contratto: `.claude/skills/solar-ruolo-template/reference.md`. MC = `https://mission-control-production-d22b.up.railway.app`.
## Formula prompt Veo 3.1 (un momento per clip, 8s)
`[cinematography: inquadratura, lente, movimento] + [subject] + [action, una sola] + [context/ambiente italiano reale: tetto, cantiere, ufficio di un installatore] + [style: cinematic, luce calda, palette grafite+oro nei grafici on-screen]`. Audio/voce a parte (voce clonata quando sarà attiva). NO testo generato dentro il video (sottotitoli aggiunti dopo).
## Struttura short 15-25s
0-3s hook (parlato + testo grande) · 3-15s una idea, 2-3 frasi, b-roll · ultimi 3-5s CTA soft + brand + "Creato con AI".
## Payload `approval_add` (kind `video`)
```json
{ "testo": "<leggibile>", "hook": "...", "script": "...", "on_screen": ["..."], "shot_list": [{"clip":1,"durata":8,"prompt_veo":"...","broll":"..."}], "caption": "...", "disclosure": "Creato con AI", "formati": ["9:16","4:5"], "modalita": "sicura (nessuna generazione)" }
```
## Kie (quando attivo): Veo 3.1 Lite 1080p = 35 crediti / 8s. Endpoint `POST https://api.kie.ai/api/v1/jobs/createTask`, poll `GET /api/v1/jobs/recordInfo?taskId=`. Stringa modello da verificare su docs.kie.ai al primo uso.
