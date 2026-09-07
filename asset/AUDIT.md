# AUDIT Lista Target — TUTTO OK

Righe grezze lette: 19898 · aziende uniche: 8498 · MASTER: 6659 · SCARTI: 1839

- ✅ **Nessuna riga grezza persa (record letti == righe presenti in MASTER+SCARTI, per file)** — letti 19898 · presenti 19898
- ✅ **Nessuna riga grezza assegnata a 2 aziende diverse**
- ✅ **ID_SB unici tra MASTER e SCARTI** — 6659 + 1839 = 8498
- ✅ **Somma MASTER+SCARTI == aziende uniche del LOG** — 8498 vs 8498
- ✅ **Ogni riga MASTER ha un BUCKET (tab) e la somma dei tab == MASTER** — {'1_EMAIL_GENERICA': 443, '1_EMAIL_TITOLARE': 631, '2_EMAIL+MOBILE_GENERICA': 272, '2_EMAIL+MOBILE_TITOLARE': 106, '3_SOLO_MOBILE': 2754, '4_SOLO_FISSO': 1817, '5_SOLO_SOCIAL': 636}
- ✅ **Contatti condivisi tra aziende MASTER sono tutti segnalati (POSSIBILE_DOPPIONE=SI)** — 0 non segnalati
- ✅ **Possibili doppioni segnalati** — 608 righe con flag (lasciati separati per scelta CEO)
- ✅ **Tutte le EMAIL_1 in MASTER sono verificate dal verifier** — 1452 email, 0 non verificate
- ✅ **Tutte le EMAIL_1 rispettano la policy fase1 (valid, oppure risky role-based NON catch-all)** — 0 fuori policy
- ℹ️ Verifier: 3895 email verificate → {'valid': 1841, 'risky': 1742, 'invalid': 123, 'unknown': 189}
- ✅ **Ogni SCARTO ha un MOTIVO_SCARTO** — 1839 scarti
- ✅ **Nessuna PEC usata come EMAIL_1**
- ✅ **MOBILE_1 sono tutti mobili italiani (+393…)**
- ✅ **FISSO_1 non sono mobili**
- ✅ **Contenuto di ogni riga coerente col suo tab (email/mobile/fisso/social, titolare vs generica)** — 0 incoerenze

Campioni per controllo manuale: AUDIT_CAMPIONI.csv (100 righe)
