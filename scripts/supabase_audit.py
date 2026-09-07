#!/usr/bin/env python3
"""
supabase_audit.py — riconciliazione CSV ↔ Supabase, cella per cella. Zero perdita dati o exit 1.

Controlli:
  1. conteggi: aziende = MASTER+SCARTI · persone = PERSONE · verifica_email = verifica_email.csv
  2. chiavi: ogni id_sb / id_p / email del CSV esiste UNA volta sul DB; nessuna riga extra
  3. celle: ogni colonna di ogni riga uguale al CSV (stessa conversione del loader)
  4. fase1_ok = 2584 (policy fase1) · fk persone→aziende garantita dallo schema
Output: asset/AUDIT_SUPABASE.md (solo numeri, niente contatti).
Uso: SUPABASE_URL=… SUPABASE_KEY=… python3 scripts/supabase_audit.py   (RLS deve essere ancora disattivato)
"""
import os
import sys
from collections import Counter, defaultdict

sys.path.insert(0, os.path.dirname(__file__))
import supabase_common as sc  # noqa: E402


def norm(v):
    if v is None or v == "" or v == []:
        return None
    if isinstance(v, list):
        return tuple(sorted(str(x) for x in v))
    if isinstance(v, bool):
        return v
    if isinstance(v, (int, float)):
        return round(float(v), 6)
    return str(v)


def compare(label, expected, got, ignore=()):
    lines, ok = [], True
    ek, gk = set(expected), set(got)
    missing, extra = ek - gk, gk - ek
    lines.append(f"- **{label}**: CSV {len(expected)} · DB {len(got)} · mancanti {len(missing)} · extra {len(extra)}")
    if missing or extra:
        ok = False
        lines.append(f"  ⚠️ mancanti (es.): {sorted(missing)[:5]} · extra (es.): {sorted(extra)[:5]}")
    diff, ex, cells = Counter(), defaultdict(list), 0
    for k in ek & gk:
        e, g = expected[k], got[k]
        for c, ev in e.items():
            if c in ignore:
                continue
            cells += 1
            if norm(ev) != norm(g.get(c)):
                diff[c] += 1
                if len(ex[c]) < 3:
                    ex[c].append((k, str(ev)[:50], str(g.get(c))[:50]))
    lines.append(f"  celle confrontate: {cells} · diverse: {sum(diff.values())}")
    if diff:
        ok = False
        for c, n in diff.most_common():
            lines.append(f"  ⚠️ {c}: {n} — es. {ex[c]}")
    return lines, ok


def main():
    rep, all_ok = ["# AUDIT Supabase ↔ CSV — Lista Target SolarBack", ""], True

    exp = {r["id_sb"]: r for r in sc.expected_aziende()}
    db = sc.fetch_all("aziende", "id_sb")
    dup = [k for k, n in Counter(r["id_sb"] for r in db).items() if n > 1]
    got = {r["id_sb"]: r for r in db}
    lines, ok = compare("aziende", exp, got)
    if dup:
        ok = False
        lines.append(f"  ⚠️ id_sb duplicati: {dup[:10]}")
    rep += lines
    all_ok &= ok

    exp = {r["id_p"]: r for r in (sc.persona_row(x) for x in sc.read_csv(sc.SRC["persone"]))}
    db = sc.fetch_all("persone", "id_p")
    got = {r["id_p"]: r for r in db}
    lines, ok = compare("persone", exp, got)
    rep += lines
    all_ok &= ok

    exp = {r["email"]: r for r in (sc.verifica_row(x) for x in sc.read_csv(sc.SRC["verifica"]))}
    db = sc.fetch_all("verifica_email", "email")
    got = {r["email"]: r for r in db}
    lines, ok = compare("verifica_email", exp, got)
    f1 = sum(1 for r in db if r.get("fase1_ok"))
    lines.append(f"  fase1_ok = true: {f1} (atteso 2584)")
    if f1 != 2584:
        ok = False
    rep += lines
    all_ok &= ok

    rep += ["", "## ESITO: " + ("✅ TUTTO OK — nessuna perdita di dati" if all_ok else "❌ DIFFERENZE — NON cancellare i CSV")]
    txt = "\n".join(rep)
    print(txt)
    with open(os.path.join(sc.ROOT, "asset", "AUDIT_SUPABASE.md"), "w", encoding="utf-8") as f:
        f.write(txt + "\n")
    sys.exit(0 if all_ok else 1)


if __name__ == "__main__":
    main()
