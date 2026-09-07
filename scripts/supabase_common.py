#!/usr/bin/env python3
"""
supabase_common.py — funzioni condivise da supabase_load.py / supabase_audit.py.

DB VIVO SolarBack = progetto Supabase (Postgres). Tabelle: aziende, persone, verifica_email (schema in supabase_schema.sql).
Accesso dati via PostgREST (HTTPS): SUPABASE_URL=https://<ref>.supabase.co  SUPABASE_KEY=<publishable/anon key>
NB: il caricamento richiede RLS disattivato sulle 3 tabelle (poi si riattiva: vedi supabase_load.py).
Sorgenti CSV (git-ignored): private/out/
"""
import csv
import json
import os
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
OUT = os.path.join(ROOT, "private", "out")
SRC = {
    "master": os.path.join(OUT, "LISTA_TARGET_MASTER.csv"),
    "scarti": os.path.join(OUT, "SCARTI.csv"),
    "persone": os.path.join(OUT, "PERSONE.csv"),
    "verifica": os.path.join(OUT, "verifica_email.csv"),
}
INT_COLS = {"icp_score", "n_recensioni", "n_persone", "n_righe_fuse"}
FLOAT_COLS = {"rating_google"}
ARRAY_COLS = {"fonti"}

URL = os.environ.get("SUPABASE_URL", "").rstrip("/")
KEY = os.environ.get("SUPABASE_KEY", "")
_last = 0.0


def read_csv(path):
    with open(path, newline="", encoding="utf-8") as f:
        return list(csv.DictReader(f))


def _num(v, as_int):
    v = (v or "").strip()
    if v == "":
        return None
    x = float(v)
    return int(x) if as_int else x


def az_row(row, lista):
    """riga CSV (MASTER o SCARTI) → dict colonne DB (minuscolo). '' → None."""
    d = {}
    for k, v in row.items():
        c = k.lower()
        if c in INT_COLS:
            d[c] = _num(v, True)
        elif c in FLOAT_COLS:
            d[c] = _num(v, False)
        elif c in ARRAY_COLS:
            d[c] = [t for t in (v or "").split(", ") if t]
        else:
            d[c] = v if (v or "") != "" else None
    d.setdefault("condivide_contatto_con", None)
    d.setdefault("possibile_doppione", None)
    d["lista"] = lista
    d["stato"] = "Contatto" if lista == "Lista Target" else "Escluso"
    return d


def persona_row(row):
    return {k.lower(): (v if (v or "") != "" else None) for k, v in row.items()}


def verifica_row(row):
    return {
        "email": row["email"],
        "status": row["status"] or None,
        "confidence": row["confidence"] or None,
        "is_catch_all": row["is_catch_all"] == "true",
        "is_role_based": row["is_role_based"] == "true",
        "is_free_provider": row["is_free_provider"] == "true",
    }


def expected_aziende():
    return [az_row(r, "Lista Target") for r in read_csv(SRC["master"])] + [az_row(r, "Scarti") for r in read_csv(SRC["scarti"])]


def rest(method, table, body=None, params=None, headers=None, tries=8):
    """Chiamata PostgREST con retry. Ritorna (status, json|None, headers)."""
    global _last
    if not URL or not KEY:
        raise SystemExit("mancano SUPABASE_URL / SUPABASE_KEY")
    url = f"{URL}/rest/v1/{table}"
    if params:
        url += "?" + urllib.parse.urlencode(params)
    data = json.dumps(body).encode() if body is not None else None
    hdr = {"apikey": KEY, "Authorization": f"Bearer {KEY}", "Content-Type": "application/json"}
    hdr.update(headers or {})
    for i in range(tries):
        wait = 0.05 - (time.time() - _last)
        if wait > 0:
            time.sleep(wait)
        _last = time.time()
        try:
            req = urllib.request.Request(url, data=data, method=method, headers=hdr)
            with urllib.request.urlopen(req, timeout=120) as resp:
                raw = resp.read().decode()
                return resp.status, (json.loads(raw) if raw else None), dict(resp.headers)
        except urllib.error.HTTPError as e:
            msg = e.read().decode(errors="replace")
            if e.code in (429, 502, 503, 504):
                time.sleep(3 * (i + 1))
                continue
            raise SystemExit(f"HTTP {e.code} {method} {url}\n{msg[:2000]}")
        except (urllib.error.URLError, TimeoutError, ConnectionError) as e:
            print(f"  rete: {e} — ritento", file=sys.stderr)
            time.sleep(3 * (i + 1))
    raise SystemExit("troppi tentativi falliti")


def fetch_all(table, order, select="*", page=1000):
    """Scarica tutti i record (paginazione Range)."""
    out, start = [], 0
    while True:
        st, rows, _ = rest("GET", table, params={"select": select, "order": order},
                           headers={"Range": f"{start}-{start + page - 1}", "Range-Unit": "items"})
        out.extend(rows or [])
        if not rows or len(rows) < page:
            return out
        start += page
