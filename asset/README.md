# asset/ — Lista Target SolarBack (numeri e audit; i dati vivono su Supabase)

**Dall'8/9/2026 la Lista Target NON è più un file: è il DB vivo su Supabase**, progetto `solarback`
(id `dziylyrneqeamqzatdzo`, eu-central-1). Tabelle `aziende` (8.498 = 6.659 Lista Target + 1.839 Scarti), `persone`
(5.777), `verifica_email` (3.895); viste `v_lista_target`, `v_cold_email` (1.452 email pronte), `v_cold_call` (5.511
con telefono). Schema: `scripts/supabase_schema.sql`. Carico/riconciliazione: `scripts/supabase_load.py` +
`scripts/supabase_audit.py`.

Lista **nazionale** (tutta Italia, nessuna priorità geografica), generata da `scripts/build_lista_target.py`
(policy `VERIF_POLICY=fase1`), verificata da `scripts/audit_lista_target.py`, migrata cella per cella su Supabase
(`AUDIT_SUPABASE.md`: 588.634 celle confrontate, 0 differenze). I CSV/XLSX locali sono stati eliminati su ordine del CEO
dopo l'audit: nessun contatto in questo repo.

File qui (SENZA dati personali):
- `LOG.json` — numeri, fonti e regole di fusione della pipeline.
- `AUDIT.md` — riconciliazione righe grezze → lista (solo conteggi/controlli).
- `AUDIT_SUPABASE.md` — riconciliazione CSV → Supabase (solo conteggi).
- `MERGE_ARRICCHIMENTO.md` — esito del merge dell'arricchimento dal sito (8/9): +784 email, +706 cellulari, bucket ricalcolati.
- `enrich_urls.txt` — i 2.674 siti pubblici usati per l'arricchimento (input dell'attore Apify).

Numeri (07-08/09/2026): 27.132 righe grezze → 8.498 aziende → 6.659 in lista (+1.839 scarti). 1.452 email pronte
(policy fase1), 3.132 cellulari. Audit: TUTTO OK.
