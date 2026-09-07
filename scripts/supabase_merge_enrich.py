#!/usr/bin/env python3
"""
supabase_merge_enrich.py — MERGE dell'arricchimento dal sito (tabella arricchimento_sito) dentro aziende. Idempotente.

Regole (Valerio 8/9): email NOMINATIVE del titolare > generiche (info@…); prendere ANCHE cellulari/WhatsApp/fissi;
in mancanza del preferito, il migliore disponibile. Ogni email entra solo se verificata (verifica_email.fase1_ok).
- email proprie = dominio dell'email == dominio del sito (o etichetta contenuta), oppure freemail (gmail/libero/…):
  candidate per email_1/2/3 · email di terzi (altro dominio) o presenti su ≥3 siti diversi → email_sospette (mai usate)
- non in policy (catch-all/unknown/invalid/risky non role-based) → email_scartate_verifica
- telefoni: da phones (certi) mobile+fisso; da phonesUncertain/whatsapps SOLO cellulari (evita P.IVA scambiate per fissi)
- si riempiono solo i campi VUOTI (email_1 se manca, mobile_1/2, fisso_1/2); email_tutte/tel_tutti si estendono
- ri-bucket (solo Lista Target): 2_EMAIL+MOBILE_* > 1_EMAIL_* > 3_SOLO_MOBILE > 4_SOLO_FISSO > 5_SOLO_SOCIAL
Uso: SUPABASE_URL=… SUPABASE_KEY=… python3 scripts/supabase_merge_enrich.py [--dry-run] [--force]
Prerequisito: grant temporaneo ad anon su aziende/arricchimento_sito/verifica_email (poi revoke). Output: asset/MERGE_ARRICCHIMENTO.md
"""
import argparse
import os
import re
import sys
from collections import Counter, defaultdict
from datetime import datetime, timezone

sys.path.insert(0, os.path.dirname(__file__))
import supabase_common as sc  # noqa: E402

FREEMAIL = {"gmail.com", "libero.it", "yahoo.it", "yahoo.com", "hotmail.com", "hotmail.it", "outlook.com", "outlook.it",
            "tiscali.it", "virgilio.it", "alice.it", "tin.it", "live.com", "live.it", "icloud.com", "msn.com", "inwind.it",
            "email.it", "fastwebnet.it", "aruba.it", "iol.it", "vodafone.it", "me.com", "pec.it", "protonmail.com", "proton.me"}
PLACEHOLDER = re.compile(r"^(example|test|email|mail|mymail|utente|user|yourname|name|info|contact|support|office|plumbing|"
                         r"demo|sample|hello|admin|noreply|no-reply|callie|leroux|engitech|pbminfo|green)@"
                         r"(example|domain|dominio|email|mail|yoursite|yourdomain|mysite|website|somemail|mailservice|"
                         r"demo|test-italy|sentry|wixpress|envato|calendly|qodeinteractive|freehtml5|oceanthemes|user|energy|"
                         r"beratung)\.")
JUNK_DOM = {"example.com", "domain.com", "dominio.com", "email.com", "yoursite.com", "yourdomain.com", "mysite.com",
            "website.com", "somemail.com", "mailservice.com", "demo.com", "test-italy.com", "envato.com", "calendly.com",
            "qodeinteractive.com", "freehtml5.co", "oceanthemes.net", "user.com", "energy.com", "beratung.com",
            "sentry.io", "sentry.wixpress.com", "sentry-next.wixpress.com", "tineco.com", "iberdrola.it", "enercon.de",
            "meteocontrol.com", "eberspaecher.com", "gabetti.it", "bigmat.it", "rossato.store", "farinawines.com",
            "zafferanoitalia.com", "birracastello.it", "sabatellifood.it", "monzacamper.it", "dadollsoloeventi.com"}
GEN = re.compile(r"^(info|contact|contatt|sales|vendit|amministr|ammin|commercial|commeric|segreter|assistenz|preventiv|"
                 r"uffici|ordini|acquist|shop|eshop|noreply|no-reply|privacy|posta|mail|email|staff|hello|ciao|lavoraconnoi|"
                 r"candidature|selezione|recruiting|hr$|marketing|servizio|clienti|customercare|help|support|direzione|"
                 r"presidenza|tecnic|ufficiotecnico|magazzino|backoffice|gestione|documenti|control|call|web|webmaster|"
                 r"whistleblowing|investor|monitoring|network|noc|postmaster|team|service|automazione|progettazione|"
                 r"consulen|comunicazione|richieste|energia|fotovoltaico|rinnovabili|impianti|reclami|dm$|pr$|export)")
PEC_TOK = {"pec", "legalmail", "postecert", "sicurezzapostale", "arubapec", "pecaruba", "mypec", "pecdotcom", "ticertifica",
           "postcert", "cert", "mailsicura", "securpec", "sirbopec", "ultracert", "servercertificato", "assicurata", "e-mailcert"}


def is_pec(e):
    toks = set(re.split(r"[.@\-]", e.lower()))
    dom = e.split("@")[-1].lower()
    return bool(toks & PEC_TOK) or dom.endswith("pec.it")


def label(dom):
    dom = re.sub(r"^www\.", "", (dom or "").lower()).split("/")[0]
    parts = dom.split(".")
    if len(parts) >= 3 and parts[-2] in ("co", "com", "org", "net"):
        return parts[-3]
    return parts[-2] if len(parts) >= 2 else dom


def own_email(e, site_dom):
    ed = e.split("@")[-1].lower()
    le, ls = label(ed), label(site_dom)
    return ed == re.sub(r"^www\.", "", site_dom.lower()) or le == ls or (len(le) >= 5 and le in ls) or (len(ls) >= 5 and ls in le)


NAMES = set()  # nomi propri visti in persone.nome (riempito in main) — per riconoscere fabio@ / angelorossi@
COMPANY_WORDS = {"energy", "energia", "energie", "solar", "solare", "impianti", "impianto", "info", "srl", "snc", "sas", "spa",
                 "group", "gruppo", "service", "servizi", "tech", "green", "power", "clima", "elettrica", "elettrico", "casa",
                 "sistemi", "system", "italia", "web", "mail", "studio", "tecnica", "tecnico", "fotovoltaico", "rinnovabili"}


def kind(e):
    """GEN = casella generica/aziendale · NOM = persona (titolare). Regola CEO: nominative > generiche."""
    loc, dom = e.lower().split("@")
    if GEN.match(loc):
        return "GEN"
    lab = label(dom)
    if loc == lab or (len(loc) >= 5 and (loc in lab or lab in loc)):
        return "GEN"  # nomeazienda@nomeazienda.it
    m = re.match(r"^([a-z]+)[._]([a-z]+)$", loc)
    if m:
        a, b = m.groups()
        if a in COMPANY_WORDS or b in COMPANY_WORDS:
            return "GEN"
        return "NOM"  # nome.cognome / n.cognome
    if re.match(r"^[a-z]+$", loc):
        if loc in NAMES:
            return "NOM"  # fabio@
        if any(loc.startswith(n) and len(loc) >= len(n) + 3 for n in NAMES if len(n) >= 4):
            return "NOM"  # angelorossi@
        return "GEN"
    return "GEN"


def norm_phone(p):
    d = re.sub(r"\D", "", p or "")
    d = d[2:] if d.startswith("0039") else d
    d = d[2:] if d.startswith("39") and len(d) > 10 else d
    if re.match(r"^(\d)\1{5,}$", d):
        return None
    if len(d) == 10 and d[0] == "3":
        return ("MOBILE", "+39" + d)
    if 6 <= len(d) <= 11 and d[0] == "0":
        return ("FISSO", "+39" + d)
    return None


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--force", action="store_true", help="rifai il merge anche per righe già mergiate")
    a = ap.parse_args()

    enr = sc.fetch_all("arricchimento_sito", "dominio")
    ver = {r["email"]: r for r in sc.fetch_all("verifica_email", "email")}
    az = {r["id_sb"]: r for r in sc.fetch_all("aziende", "id_sb")}
    NAMES.update(n.strip().lower() for r in sc.fetch_all("persone", "id_p", select="id_p,nome") for n in [(r.get("nome") or "")] if len(n.strip()) >= 3)
    NAMES.update(n.strip().lower() for r in az.values() for n in [(r.get("titolare_nome") or "")] if len(n.strip()) >= 3)
    print(f"arricchimento {len(enr)} · verifiche {len(ver)} · aziende {len(az)} · nomi propri {len(NAMES)}")

    # email di terzi = presenti su ≥3 domini diversi
    dom_per_email = defaultdict(set)
    for r in enr:
        for e in r["emails"]:
            dom_per_email[e.lower()].add(r["dominio"])
    terzi = {e for e, ds in dom_per_email.items() if len(ds) >= 3}

    stats = Counter()
    bucket_prima, bucket_dopo = Counter(), Counter()
    updates, merged_doms = [], []
    for r in enr:
        if not r["id_sb"] or (r.get("mergiato_il") and not a.force):
            continue
        z = az.get(r["id_sb"])
        if not z:
            continue
        upd = {}
        tutte = [x for x in (z.get("email_tutte") or "").split(" | ") if x]
        sosp = [x for x in (z.get("email_sospette") or "").split(" | ") if x]
        scart = [x for x in (z.get("email_scartate_verifica") or "").split(" | ") if x]
        tel = [x for x in (z.get("tel_tutti") or "").split(" | ") if x]
        known_tel = {t.split(" ")[0] for t in tel}
        known_emails = {x.lower() for x in tutte} | {x.split(" ")[0].lower() for x in scart} | {x.lower() for x in sosp}

        cands = []
        for e in sorted({x.strip().lower() for x in r["emails"] if "@" in x}):
            if e in known_emails:
                continue
            if not re.match(r"^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$", e) or e.split("@")[1] in JUNK_DOM or PLACEHOLDER.match(e):
                stats["email_junk"] += 1
                continue
            if is_pec(e):
                if not z.get("pec"):
                    upd["pec"] = e
                    stats["pec_aggiunte"] += 1
                continue
            dom = e.split("@")[1]
            free = dom in FREEMAIL
            if e in terzi or (not free and not own_email(e, r["dominio"])):
                sosp.append(e)
                stats["email_terzi_sospette"] += 1
                continue
            v = ver.get(e)
            if not v:
                scart.append(f"{e} (non verificata)")
                stats["email_non_verificate"] += 1
                continue
            tutte.append(e)
            if not v.get("fase1_ok"):
                scart.append(f"{e} ({v.get('status')}{'/catch-all' if v.get('is_catch_all') else ''})")
                stats["email_fuori_policy"] += 1
                continue
            k = kind(e)
            tipo = "FREEMAIL" if free else ("GENERICA" if k == "GEN" else "NOMINATIVA_AZIENDALE")
            persona = (k != "GEN")
            rank = (0 if tipo == "NOMINATIVA_AZIENDALE" else 1 if (free and persona) else 2 if tipo == "GENERICA" else 3,
                    0 if v["status"] == "valid" else 1, 0 if v["confidence"] == "high" else 1, e)
            cands.append((rank, e, tipo, persona, v))
        cands.sort()
        if cands and not z.get("email_1"):
            rank, e, tipo, persona, v = cands[0]
            upd.update({"email_1": e, "email_1_tipo": tipo, "email_1_verifica": v["status"], "email_1_confidenza": v["confidence"],
                        "email_1_catchall": "SI" if v["is_catch_all"] else "NO"})
            stats[f"email_1_aggiunta_{tipo}"] += 1
            rest = [c[1] for c in cands[1:]]
            if rest and not z.get("email_2"):
                upd["email_2"] = rest[0]
            if len(rest) > 1 and not z.get("email_3"):
                upd["email_3"] = rest[1]
        elif cands:
            stats["email_trovate_ma_email_1_gia_presente"] += 1

        # telefoni
        for src, only_mobile in ((r["phones"], False), (r["phones_uncertain"], True), (r["whatsapps"], True)):
            for p in src:
                np_ = norm_phone(p)
                if not np_ or np_[1] in known_tel:
                    continue
                t, num = np_
                if only_mobile and t != "MOBILE":
                    continue
                known_tel.add(num)
                tel.append(f"{num} ({t})")
                if t == "MOBILE":
                    for f in ("mobile_1", "mobile_2"):
                        if not z.get(f) and f not in upd:
                            upd[f] = num
                            stats["cellulari_aggiunti"] += 1
                            break
                else:
                    for f in ("fisso_1", "fisso_2"):
                        if not z.get(f) and f not in upd:
                            upd[f] = num
                            stats["fissi_aggiunti"] += 1
                            break
        if r["whatsapps"] or upd.get("mobile_1"):
            if z.get("ha_whatsapp") != "SI":
                upd["ha_whatsapp"] = "SI"

        # testi cumulativi (solo se cambiati)
        for col, lst in (("email_tutte", tutte), ("email_sospette", sosp), ("email_scartate_verifica", scart), ("tel_tutti", tel)):
            new = " | ".join(dict.fromkeys(lst)) or None
            if new != (z.get(col) or None):
                upd[col] = new

        # ri-bucket (solo Lista Target)
        if z["lista"] == "Lista Target":
            m = {**z, **upd}
            has_email = bool(m.get("email_1"))
            nomin = has_email and (m.get("email_1_tipo") == "NOMINATIVA_AZIENDALE" or (m.get("email_1_tipo") == "FREEMAIL" and kind(m["email_1"]) != "GEN"))
            has_mob, has_fix = bool(m.get("mobile_1")), bool(m.get("fisso_1"))
            if has_email and has_mob:
                b = "2_EMAIL+MOBILE_TITOLARE" if nomin else "2_EMAIL+MOBILE_GENERICA"
            elif has_email:
                b = "1_EMAIL_TITOLARE" if nomin else "1_EMAIL_GENERICA"
            elif has_mob:
                b = "3_SOLO_MOBILE"
            elif has_fix:
                b = "4_SOLO_FISSO"
            else:
                b = "5_SOLO_SOCIAL"
            bucket_prima[z["bucket"]] += 1
            bucket_dopo[b] += 1
            if b != z["bucket"]:
                upd["bucket"] = b
                stats["bucket_cambiati"] += 1
        if upd:
            upd["id_sb"] = z["id_sb"]
            updates.append((z, upd))
            stats["aziende_aggiornate"] += 1
        merged_doms.append(r["dominio"])

    print("STATISTICHE:", dict(stats))
    print("bucket prima:", dict(bucket_prima))
    print("bucket dopo :", dict(bucket_dopo))
    if a.dry_run:
        print("DRY RUN: nessuna scrittura.")
        return
    # PostgREST vuole le stesse chiavi in tutte le righe del batch: completo le mancanti col valore attuale (nessun cambio)
    # (lista/stato sono NOT NULL: l'upsert li vuole sempre presenti)
    keys = sorted(set().union(*[set(u) for _, u in updates]) | {"lista", "stato"}) if updates else []
    rows = [{k: u.get(k, z.get(k)) for k in keys} for z, u in updates]
    for i in range(0, len(rows), 200):
        sc.rest("POST", "aziende", body=rows[i:i + 200], params={"on_conflict": "id_sb"},
                headers={"Prefer": "resolution=merge-duplicates,return=minimal"})
    now = datetime.now(timezone.utc).isoformat()
    for i in range(0, len(merged_doms), 500):
        sc.rest("POST", "arricchimento_sito", body=[{"dominio": d, "mergiato_il": now} for d in merged_doms[i:i + 500]],
                params={"on_conflict": "dominio"}, headers={"Prefer": "resolution=merge-duplicates,return=minimal"})
    rep = ["# MERGE arricchimento sito → aziende (Supabase)", f"Data: {now[:10]} · domini processati: {len(merged_doms)}", "",
           "| voce | n |", "|---|---|"] + [f"| {k} | {v} |" for k, v in sorted(stats.items())] + \
          ["", "Bucket (solo Lista Target, aziende toccate dal merge):", "", "| bucket | prima | dopo |", "|---|---|---|"] + \
          [f"| {b} | {bucket_prima.get(b, 0)} | {bucket_dopo.get(b, 0)} |" for b in sorted(set(bucket_prima) | set(bucket_dopo))]
    with open(os.path.join(sc.ROOT, "asset", "MERGE_ARRICCHIMENTO.md"), "w", encoding="utf-8") as f:
        f.write("\n".join(rep) + "\n")
    print("scritte", len(updates), "aziende ·", len(merged_doms), "domini marcati mergiati · report asset/MERGE_ARRICCHIMENTO.md")


if __name__ == "__main__":
    main()
