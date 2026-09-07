#!/usr/bin/env python3
"""
supabase_load.py — carica (UPSERT idempotente, rilanciabile senza doppioni) la Lista Target nel DB vivo Supabase.

Ordine: aziende (pk id_sb) → persone (pk id_p, fk id_sb) → verifica_email (pk email). Batch da 500 righe via PostgREST.
Prerequisiti: schema applicato (supabase_schema.sql) e RLS DISATTIVATO sulle 3 tabelle durante il carico
(alter table … disable row level security) — a fine carico si riattiva (enable) senza policy: la chiave publishable
non legge più nulla; scrive/legge solo il pannello/MCP (service role).
Uso:
  SUPABASE_URL=https://<ref>.supabase.co SUPABASE_KEY=<publishable> python3 scripts/supabase_load.py [--only aziende|persone|verifica] [--limit N]
"""
import argparse
import os
import sys
import time

sys.path.insert(0, os.path.dirname(__file__))
import supabase_common as sc  # noqa: E402

BATCH = 500


def upsert(table, rows, pk, label):
    t0 = time.time()
    n = (len(rows) + BATCH - 1) // BATCH
    for i in range(0, len(rows), BATCH):
        sc.rest("POST", table, body=rows[i:i + BATCH], params={"on_conflict": pk},
                headers={"Prefer": "resolution=merge-duplicates,return=minimal"})
        k = i // BATCH + 1
        if k % 5 == 0 or k == n:
            print(f"  [{label}] {k}/{n} batch · {min(i + BATCH, len(rows))}/{len(rows)} righe · {time.time() - t0:.0f}s", flush=True)


def count(table):
    st, _, h = sc.rest("GET", table, params={"select": "count"}, headers={"Prefer": "count=exact", "Range": "0-0"})
    return h.get("Content-Range", "?").split("/")[-1]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--only", choices=["aziende", "persone", "verifica"])
    ap.add_argument("--limit", type=int, default=0)
    a = ap.parse_args()
    lim = (lambda xs: xs[:a.limit] if a.limit else xs)

    if a.only in (None, "aziende"):
        rows = lim(sc.expected_aziende())
        print(f"aziende: {len(rows)} righe da caricare")
        upsert("aziende", rows, "id_sb", "aziende")
        print("  aziende su DB:", count("aziende"))
    if a.only in (None, "persone"):
        rows = lim([sc.persona_row(r) for r in sc.read_csv(sc.SRC["persone"])])
        print(f"persone: {len(rows)} righe da caricare")
        upsert("persone", rows, "id_p", "persone")
        print("  persone su DB:", count("persone"))
    if a.only in (None, "verifica"):
        rows = lim([sc.verifica_row(r) for r in sc.read_csv(sc.SRC["verifica"])])
        print(f"verifica_email: {len(rows)} righe da caricare")
        upsert("verifica_email", rows, "email", "verifica")
        print("  verifica_email su DB:", count("verifica_email"))
    print("FINE caricamento → ora: python3 scripts/supabase_audit.py")


if __name__ == "__main__":
    main()
