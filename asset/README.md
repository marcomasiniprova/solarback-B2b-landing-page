# asset/ — Lista Target SolarBack

Lista **nazionale** (tutta Italia, nessuna priorità geografica). Generata da `scripts/build_lista_target.py`
(policy `VERIF_POLICY=fase1`) e verificata da `scripts/audit_lista_target.py`.

⚠️ **I file coi contatti reali (xlsx, MASTER/SCARTI/PERSONE.csv, verifica_email.csv, AUDIT_CAMPIONI.csv) NON sono
in questo repo finché è pubblico** — contengono nomi, telefoni ed email di persone e la piattaforma blocca (giustamente)
la pubblicazione di dati personali su un repo pubblico. Sono consegnati al CEO via zip e vivono in `private/out/`
(non versionato). **Appena il repo è PRIVATO** si aggiungono qui con un comando.

Qui sotto restano solo i file SENZA dati personali:
- `LOG.json` — numeri, fonti e regole di fusione.
- `AUDIT.md` — esito della riconciliazione automatica (nessun contatto, solo conteggi/controlli).

Numeri (07-08/09/2026): 27.132 righe grezze → 8.498 aziende → 6.659 in lista (+1.839 scarti). 1.452 email pronte
(policy fase1), 3.132 cellulari. Audit: TUTTO OK.
