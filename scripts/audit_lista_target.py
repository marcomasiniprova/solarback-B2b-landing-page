#!/usr/bin/env python3
"""AUDIT Lista Target — riconciliazione automatica grezzo -> MASTER/SCARTI + invarianti + campioni.
Risponde a: "e' tutto corretto? nulla e' andato perso?" con controlli riproducibili (non a occhio).
Uso: python3 scripts/audit_lista_target.py   (legge private/out/*, scrive private/out/AUDIT.md + AUDIT_CAMPIONI.csv)
"""
import os, csv, json, re, random
from collections import Counter, defaultdict
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "private", "out")
csv.field_size_limit(10**8)
M = list(csv.DictReader(open(os.path.join(OUT, "LISTA_TARGET_MASTER.csv"), encoding="utf-8")))
S = list(csv.DictReader(open(os.path.join(OUT, "SCARTI.csv"), encoding="utf-8")))
L = json.load(open(os.path.join(OUT, "LOG.json")))
V = {r["email"].lower(): r for r in csv.DictReader(open(os.path.join(OUT, "verifica_email.csv")))} if os.path.exists(os.path.join(OUT, "verifica_email.csv")) else {}
rep, ok_all = [], True
def check(name, cond, detail=""):
    global ok_all
    ok_all &= bool(cond)
    rep.append(f"- {'✅' if cond else '❌'} **{name}**" + (f" — {detail}" if detail else ""))

# 1) RICONCILIAZIONE: ogni riga grezza letta deve stare in ESATTAMENTE un'azienda (MASTER o SCARTI)
sid_owner = defaultdict(list)
for tab, rows in (("MASTER", M), ("SCARTI", S)):
    for r in rows:
        for sid in [s.strip() for s in (r.get("SOURCE_IDS") or "").split("|") if s.strip()]:
            sid_owner[sid].append((tab, r["ID_SB"]))
dups = {k: v for k, v in sid_owner.items() if len(v) > 1}
per_tag = Counter(sid.split("#")[0] for sid in sid_owner)
expected = {v["tag"]: v["record_letti"] for v in L["file"].values() if isinstance(v, dict) and "record_letti" in v}
missing_by_tag = {t: expected[t] - per_tag.get(t, 0) for t in expected if expected[t] - per_tag.get(t, 0) != 0}
check("Nessuna riga grezza persa (record letti == righe presenti in MASTER+SCARTI, per file)",
      not missing_by_tag, f"letti {sum(expected.values())} · presenti {len(sid_owner)}" + (f" · DIFFERENZE: {missing_by_tag}" if missing_by_tag else ""))
check("Nessuna riga grezza assegnata a 2 aziende diverse", not dups, f"{len(dups)} doppie" if dups else "")
check("ID_SB unici tra MASTER e SCARTI", len({r['ID_SB'] for r in M+S}) == len(M)+len(S), f"{len(M)} + {len(S)} = {len(M)+len(S)}")
check("Somma MASTER+SCARTI == aziende uniche del LOG", len(M)+len(S) == L["aziende_uniche_totali"], f"{len(M)+len(S)} vs {L['aziende_uniche_totali']}")

# 2) PARTIZIONE TAB: ogni azienda MASTER in un solo BUCKET; somma bucket == MASTER
b = Counter(r["BUCKET"] for r in M)
check("Ogni riga MASTER ha un BUCKET (tab) e la somma dei tab == MASTER", sum(b.values()) == len(M) and "" not in b, dict(b))

# 3) UNICITA' CONTATTI: nessuna email/telefono ripetuto tra aziende MASTER (salvo POSSIBILE_DOPPIONE=SI)
def emails(r): return {e.strip().lower() for e in re.split(r"[;,| ]+", (r.get("EMAIL_TUTTE") or "")) if "@" in e}
def phones(r): return {m.group(1) for m in re.finditer(r"(\+\d+) \((MOBILE|FISSO)\)", r.get("TEL_TUTTI") or "")}
seen_e, seen_p, clash = {}, {}, 0
for r in M:
    for e in emails(r):
        if e in seen_e and seen_e[e] != r["ID_SB"] and r.get("POSSIBILE_DOPPIONE") != "SI": clash += 1
        seen_e.setdefault(e, r["ID_SB"])
    for p in phones(r):
        if p in seen_p and seen_p[p] != r["ID_SB"] and r.get("POSSIBILE_DOPPIONE") != "SI": clash += 1
        seen_p.setdefault(p, r["ID_SB"])
check("Contatti condivisi tra aziende MASTER sono tutti segnalati (POSSIBILE_DOPPIONE=SI)", clash == 0, f"{clash} non segnalati")
check("Possibili doppioni segnalati", True, f"{sum(1 for r in M if r.get('POSSIBILE_DOPPIONE')=='SI')} righe con flag (lasciati separati per scelta CEO)")

# 4) VERIFICA EMAIL: ogni EMAIL_1 nei tab email deve essere verificata e conforme alla policy
bad, unver, n_email = 0, 0, 0
for r in M:
    e = (r.get("EMAIL_1") or "").strip().lower()
    if not e: continue
    n_email += 1
    v = V.get(e)
    if v is None: unver += 1; continue
    okp = v["status"] == "valid" or (v["status"] == "risky" and v["is_role_based"] == "true" and v["is_catch_all"] == "false" and v["confidence"] in ("medium", "high"))
    if not okp: bad += 1
check("Tutte le EMAIL_1 in MASTER sono verificate dal verifier", unver == 0, f"{n_email} email, {unver} non verificate")
check("Tutte le EMAIL_1 rispettano la policy fase1 (valid, oppure risky role-based NON catch-all)", bad == 0, f"{bad} fuori policy")
vs = Counter(v["status"] for v in V.values())
rep.append(f"- ℹ️ Verifier: {len(V)} email verificate → {dict(vs)}")

# 5) SCARTI: tutti con motivo
check("Ogni SCARTO ha un MOTIVO_SCARTO", all((r.get("MOTIVO_SCARTO") or "").strip() for r in S), f"{len(S)} scarti")
# 6) PEC mai come EMAIL_1
def is_pec(e):
    d = (e or "").split("@")[-1].lower()
    toks = re.split(r"[.\-]", d)
    return any(t == "pec" or t.endswith("pec") or t.startswith("pec") or t in ("legalmail", "postacertificata", "sicurezzapostale") for t in toks)
check("Nessuna PEC usata come EMAIL_1", not any(is_pec(r.get("EMAIL_1")) for r in M))
# 7) Telefoni: MOBILE_1 e' un mobile italiano (+393), FISSO_1 non lo e'
check("MOBILE_1 sono tutti mobili italiani (+393…)", all((r.get("MOBILE_1") or "+393").startswith("+393") for r in M))
check("FISSO_1 non sono mobili", not any((r.get("FISSO_1") or "").startswith("+393") for r in M))
# 8) Tab coerenti col contenuto
def has(r, k): return bool((r.get(k) or "").strip())
inc = 0
for r in M:
    bk = r["BUCKET"]; nom = r.get("EMAIL_1_TIPO") == "NOMINATIVA_AZIENDALE"
    if bk.startswith("1_") and not (has(r, "EMAIL_1") and not has(r, "MOBILE_1")): inc += 1
    if bk.startswith("2_") and not (has(r, "EMAIL_1") and has(r, "MOBILE_1")): inc += 1
    if bk.startswith("3_") and not (not has(r, "EMAIL_1") and has(r, "MOBILE_1")): inc += 1
    if bk.startswith("4_") and not (not has(r, "EMAIL_1") and not has(r, "MOBILE_1") and has(r, "FISSO_1")): inc += 1
    if bk.startswith("5_") and (has(r, "EMAIL_1") or has(r, "MOBILE_1") or has(r, "FISSO_1")): inc += 1
    if "TITOLARE" in bk and r.get("EMAIL_1_TIPO") not in ("NOMINATIVA_AZIENDALE", "FREEMAIL"): inc += 1
    if "GENERICA" in bk and r.get("EMAIL_1_TIPO") not in ("GENERICA", "FREEMAIL"): inc += 1
check("Contenuto di ogni riga coerente col suo tab (email/mobile/fisso/social, titolare vs generica)", inc == 0, f"{inc} incoerenze")

# 9) CAMPIONI STRATIFICATI per controllo manuale (10 per tab + 15 scarti + 15 doppioni)
random.seed(7)
samp = []
def row(tab, r, note): return {"TAB": tab, "ID_SB": r["ID_SB"], "AZIENDA": r["AZIENDA"], "EMAIL_1": r.get("EMAIL_1"), "MOBILE_1": r.get("MOBILE_1"), "FISSO_1": r.get("FISSO_1"), "CITTA": r.get("CITTA"), "FONTI": r.get("FONTI"), "NOTE": note}
for bk in sorted(b):
    rows = [r for r in M if r["BUCKET"] == bk]
    for r in random.sample(rows, min(10, len(rows))): samp.append(row(bk, r, r.get("NOTE")))
for r in random.sample(S, min(15, len(S))): samp.append(row("6_SCARTI", r, r.get("MOTIVO_SCARTO")))
dd = [r for r in M if r.get("POSSIBILE_DOPPIONE") == "SI"]
for r in random.sample(dd, min(15, len(dd))): samp.append(row("DOPPIONE?", r, r.get("CONDIVIDE_CONTATTO_CON")))
with open(os.path.join(OUT, "AUDIT_CAMPIONI.csv"), "w", newline="", encoding="utf-8") as f:
    w = csv.DictWriter(f, fieldnames=list(samp[0].keys())); w.writeheader(); w.writerows(samp)

hdr = f"# AUDIT Lista Target — {'TUTTO OK' if ok_all else 'CI SONO PROBLEMI'}\n\nRighe grezze lette: {sum(expected.values())} · aziende uniche: {len(M)+len(S)} · MASTER: {len(M)} · SCARTI: {len(S)}\n\n"
open(os.path.join(OUT, "AUDIT.md"), "w", encoding="utf-8").write(hdr + "\n".join(rep) + f"\n\nCampioni per controllo manuale: AUDIT_CAMPIONI.csv ({len(samp)} righe)\n")
print(hdr + "\n".join(rep)); print(f"\ncampioni: {len(samp)} → private/out/AUDIT_CAMPIONI.csv")
