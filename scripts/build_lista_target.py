#!/usr/bin/env python3
"""
SolarBack — costruzione della LISTA TARGET (asset #1 per l'outreach).

Input : private/raw/*.xlsx  (11 file grezzi, git-ignored)
Output: private/out/LISTA_TARGET_SOLARBACK.xlsx  (multi-tab) + CSV + LOG
Regole (scelte CEO 2026-09-06):
  - storico chiamate IGNORATO (ogni Contatto è nuovo)
  - 1 riga = 1 azienda + titolare principale; tutte le persone nel tab PERSONE
  - email NOMINATIVE nel tab principale, info@ (generiche) in tab separato
  - filtro fuori-target AGGRESSIVO: in dubbio -> SCARTI con MOTIVO (mai cancellato)
  - nessuna riga grezza viene persa: ogni riga ha un SOURCE_ID e finisce in MASTER o SCARTI
Terminologia: ICP = criteri · Lista Target = la lista · Contatto/Interessato/Qualificato/Partner.
"""
import os, re, sys, json, unicodedata, glob
from collections import defaultdict
import pandas as pd
import phonenumbers
from phonenumbers import PhoneNumberType as PT
from rapidfuzz import fuzz, process

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RAW = os.path.join(ROOT, "private", "raw")
OUT = os.path.join(ROOT, "private", "out")
os.makedirs(OUT, exist_ok=True)

# ----------------------------------------------------------------------------
# 0. Geografia italiana: sigla -> (provincia, regione)
# ----------------------------------------------------------------------------
PROV = {
 "AG":("Agrigento","Sicilia"),"AL":("Alessandria","Piemonte"),"AN":("Ancona","Marche"),"AO":("Aosta","Valle d'Aosta"),
 "AR":("Arezzo","Toscana"),"AP":("Ascoli Piceno","Marche"),"AT":("Asti","Piemonte"),"AV":("Avellino","Campania"),
 "BA":("Bari","Puglia"),"BT":("Barletta-Andria-Trani","Puglia"),"BL":("Belluno","Veneto"),"BN":("Benevento","Campania"),
 "BG":("Bergamo","Lombardia"),"BI":("Biella","Piemonte"),"BO":("Bologna","Emilia-Romagna"),"BZ":("Bolzano","Trentino-Alto Adige"),
 "BS":("Brescia","Lombardia"),"BR":("Brindisi","Puglia"),"CA":("Cagliari","Sardegna"),"CL":("Caltanissetta","Sicilia"),
 "CB":("Campobasso","Molise"),"CE":("Caserta","Campania"),"CT":("Catania","Sicilia"),"CZ":("Catanzaro","Calabria"),
 "CH":("Chieti","Abruzzo"),"CO":("Como","Lombardia"),"CS":("Cosenza","Calabria"),"CR":("Cremona","Lombardia"),
 "KR":("Crotone","Calabria"),"CN":("Cuneo","Piemonte"),"EN":("Enna","Sicilia"),"FM":("Fermo","Marche"),
 "FE":("Ferrara","Emilia-Romagna"),"FI":("Firenze","Toscana"),"FG":("Foggia","Puglia"),"FC":("Forlì-Cesena","Emilia-Romagna"),
 "FR":("Frosinone","Lazio"),"GE":("Genova","Liguria"),"GO":("Gorizia","Friuli-Venezia Giulia"),"GR":("Grosseto","Toscana"),
 "IM":("Imperia","Liguria"),"IS":("Isernia","Molise"),"AQ":("L'Aquila","Abruzzo"),"SP":("La Spezia","Liguria"),
 "LT":("Latina","Lazio"),"LE":("Lecce","Puglia"),"LC":("Lecco","Lombardia"),"LI":("Livorno","Toscana"),
 "LO":("Lodi","Lombardia"),"LU":("Lucca","Toscana"),"MC":("Macerata","Marche"),"MN":("Mantova","Lombardia"),
 "MS":("Massa-Carrara","Toscana"),"MT":("Matera","Basilicata"),"ME":("Messina","Sicilia"),"MI":("Milano","Lombardia"),
 "MO":("Modena","Emilia-Romagna"),"MB":("Monza e Brianza","Lombardia"),"NA":("Napoli","Campania"),"NO":("Novara","Piemonte"),
 "NU":("Nuoro","Sardegna"),"OR":("Oristano","Sardegna"),"PD":("Padova","Veneto"),"PA":("Palermo","Sicilia"),
 "PR":("Parma","Emilia-Romagna"),"PV":("Pavia","Lombardia"),"PG":("Perugia","Umbria"),"PU":("Pesaro e Urbino","Marche"),
 "PE":("Pescara","Abruzzo"),"PC":("Piacenza","Emilia-Romagna"),"PI":("Pisa","Toscana"),"PT":("Pistoia","Toscana"),
 "PN":("Pordenone","Friuli-Venezia Giulia"),"PZ":("Potenza","Basilicata"),"PO":("Prato","Toscana"),"RG":("Ragusa","Sicilia"),
 "RA":("Ravenna","Emilia-Romagna"),"RC":("Reggio Calabria","Calabria"),"RE":("Reggio Emilia","Emilia-Romagna"),"RI":("Rieti","Lazio"),
 "RN":("Rimini","Emilia-Romagna"),"RM":("Roma","Lazio"),"RO":("Rovigo","Veneto"),"SA":("Salerno","Campania"),
 "SS":("Sassari","Sardegna"),"SV":("Savona","Liguria"),"SI":("Siena","Toscana"),"SR":("Siracusa","Sicilia"),
 "SO":("Sondrio","Lombardia"),"SU":("Sud Sardegna","Sardegna"),"TA":("Taranto","Puglia"),"TE":("Teramo","Abruzzo"),
 "TR":("Terni","Umbria"),"TO":("Torino","Piemonte"),"TP":("Trapani","Sicilia"),"TN":("Trento","Trentino-Alto Adige"),
 "TV":("Treviso","Veneto"),"TS":("Trieste","Friuli-Venezia Giulia"),"UD":("Udine","Friuli-Venezia Giulia"),"VA":("Varese","Lombardia"),
 "VE":("Venezia","Veneto"),"VB":("Verbano-Cusio-Ossola","Piemonte"),"VC":("Vercelli","Piemonte"),"VR":("Verona","Veneto"),
 "VV":("Vibo Valentia","Calabria"),"VI":("Vicenza","Veneto"),"VT":("Viterbo","Lazio"),
}
def _n(s):
    return unicodedata.normalize("NFKD", str(s or "")).encode("ascii","ignore").decode().lower().strip()
PROV_BY_NAME = {_n(v[0]): k for k, v in PROV.items()}
PROV_BY_NAME.update({"roma capitale":"RM","reggio nell emilia":"RE","reggio nellemilia":"RE","monza":"MB","forli":"FC","forli cesena":"FC",
                     "pesaro":"PU","urbino":"PU","carbonia":"SU","iglesias":"SU","massa":"MS","carrara":"MS","barletta":"BT","andria":"BT","trani":"BT",
                     "bolzano bozen":"BZ","aquila":"AQ","l aquila":"AQ","verbania":"VB","citta metropolitana di milano":"MI",
                     "metropolitan city of milan":"MI","metropolitan city of rome":"RM","metropolitan city of turin":"TO","metropolitan city of naples":"NA",
                     "metropolitan city of bologna":"BO","metropolitan city of florence":"FI","metropolitan city of genoa":"GE","metropolitan city of venice":"VE",
                     "metropolitan city of bari":"BA","metropolitan city of palermo":"PA","metropolitan city of catania":"CT","metropolitan city of messina":"ME",
                     "metropolitan city of reggio calabria":"RC","metropolitan city of cagliari":"CA","milan":"MI","rome":"RM","turin":"TO","naples":"NA",
                     "florence":"FI","genoa":"GE","venice":"VE","padua":"PD","syracuse":"SR","mantua":"MN","leghorn":"LI"})
REGION_EN = {"lombardy":"Lombardia","piedmont":"Piemonte","emilia-romagna":"Emilia-Romagna","emilia romagna":"Emilia-Romagna","veneto":"Veneto",
             "tuscany":"Toscana","lazio":"Lazio","latium":"Lazio","campania":"Campania","sicily":"Sicilia","sicilia":"Sicilia","apulia":"Puglia","puglia":"Puglia",
             "liguria":"Liguria","marche":"Marche","abruzzo":"Abruzzo","calabria":"Calabria","sardinia":"Sardegna","sardegna":"Sardegna","umbria":"Umbria",
             "friuli-venezia giulia":"Friuli-Venezia Giulia","friuli venezia giulia":"Friuli-Venezia Giulia","trentino-alto adige":"Trentino-Alto Adige",
             "trentino-south tyrol":"Trentino-Alto Adige","trentino alto adige":"Trentino-Alto Adige","aosta valley":"Valle d'Aosta","valle d'aosta":"Valle d'Aosta",
             "basilicata":"Basilicata","molise":"Molise","lombardia":"Lombardia","piemonte":"Piemonte","toscana":"Toscana"}
REGIONI = set(REGION_EN.values())
CITY_EN = {"genoa":"Genova","padua":"Padova","milan":"Milano","rome":"Roma","turin":"Torino","naples":"Napoli","florence":"Firenze","venice":"Venezia",
           "syracuse":"Siracusa","mantua":"Mantova","leghorn":"Livorno","bolzano bozen":"Bolzano","roma capitale":"Roma"}
# prefissi telefonici fissi -> sigla provincia (per ricavare la geo quando manca)
AREA = {"02":"MI","06":"RM","010":"GE","011":"TO","015":"BI","019":"SV","030":"BS","031":"CO","035":"BG","039":"MB","040":"TS","041":"VE","045":"VR","049":"PD",
 "050":"PI","051":"BO","055":"FI","059":"MO","070":"CA","071":"AN","075":"PG","079":"SS","080":"BA","081":"NA","085":"PE","089":"SA","090":"ME","091":"PA","095":"CT","099":"TA",
 "0121":"TO","0122":"TO","0123":"TO","0124":"TO","0125":"TO","0131":"AL","0141":"AT","0142":"AL","0143":"AL","0144":"AL","0161":"VC","0163":"VC","0165":"AO","0166":"AO",
 "0171":"CN","0172":"CN","0173":"CN","0174":"CN","0175":"CN","0182":"SV","0183":"IM","0184":"IM","0185":"GE","0187":"SP",
 "0321":"NO","0322":"NO","0323":"VB","0324":"VB","0331":"VA","0332":"VA","0341":"LC","0342":"SO","0343":"SO","0344":"CO","0345":"BG","0346":"BG","0362":"MB","0363":"BG",
 "0364":"BS","0365":"BS","0371":"LO","0372":"CR","0373":"CR","0374":"CR","0375":"MN","0376":"MN","0377":"LO","0382":"PV","0383":"PV","0384":"PV","0385":"PV","0386":"MN",
 "0421":"VE","0422":"TV","0423":"TV","0424":"VI","0425":"RO","0426":"RO","0427":"PN","0428":"UD","0429":"PD","0431":"UD","0432":"UD","0433":"UD","0434":"PN","0435":"BL",
 "0436":"BL","0437":"BL","0438":"TV","0439":"BL","0442":"VR","0444":"VI","0445":"VI","0461":"TN","0462":"TN","0463":"TN","0464":"TN","0465":"TN","0471":"BZ","0472":"BZ",
 "0473":"BZ","0474":"BZ","0481":"GO","0521":"PR","0522":"RE","0523":"PC","0524":"PR","0525":"PR","0532":"FE","0533":"FE","0534":"BO","0535":"MO","0536":"MO","0541":"RN",
 "0542":"BO","0543":"FC","0544":"RA","0545":"RA","0546":"RA","0547":"FC","0564":"GR","0565":"LI","0566":"GR","0571":"FI","0572":"PT","0573":"PT","0574":"PO","0575":"AR",
 "0577":"SI","0578":"SI","0583":"LU","0584":"LU","0585":"MS","0586":"LI","0587":"PI","0588":"PI","0731":"AN","0732":"AN","0733":"MC","0734":"FM","0735":"AP","0736":"AP",
 "0737":"MC","0742":"PG","0743":"PG","0744":"TR","0746":"RI","0761":"VT","0763":"TR","0765":"RI","0766":"RM","0771":"LT","0773":"LT","0774":"RM","0775":"FR","0776":"FR",
 "0781":"SU","0782":"NU","0783":"OR","0784":"NU","0785":"OR","0789":"SS","0823":"CE","0824":"BN","0825":"AV","0827":"AV","0828":"SA","0831":"BR","0832":"LE","0833":"LE",
 "0835":"MT","0836":"LE","0861":"TE","0862":"AQ","0863":"AQ","0864":"AQ","0865":"IS","0871":"CH","0872":"CH","0873":"CH","0874":"CB","0875":"CB","0881":"FG","0882":"FG",
 "0883":"BT","0884":"FG","0885":"FG","0921":"PA","0922":"AG","0923":"TP","0924":"TP","0925":"AG","0931":"SR","0932":"RG","0933":"CL","0934":"CL","0935":"EN","0941":"ME",
 "0942":"ME","0961":"CZ","0962":"KR","0963":"VV","0964":"RC","0965":"RC","0966":"RC","0967":"CZ","0968":"CZ","0971":"PZ","0972":"PZ","0973":"PZ","0974":"SA","0975":"PZ",
 "0976":"PZ","0981":"CS","0982":"CS","0983":"CS","0984":"CS","0985":"CS"}
def prov_from_landline(e164):
    if not e164 or not e164.startswith("+39"): return None
    nat = e164[3:]
    if not nat.startswith("0"): return None
    for L in (4, 3, 2):
        if nat[:L] in AREA: return AREA[nat[:L]]
    return None
CITY_JUNK = {"landline","mobile","toll_free","toll-free","voip","fisso","cellulare","italy","italia","nan","none"}
CITY_BAD = re.compile(r"(specializzat|impiant|servizio|azienda|store|negozio|fornitore|installat|ditta|s\.?r\.?l|spa\b|consulen|ingegner|elettric|http|www\.)")
GEO_PRIORITY = {"Lombardia":3, "Veneto":2, "Emilia-Romagna":2, "Piemonte":1, "Lazio":1, "Campania":1, "Puglia":1, "Toscana":1}

def geo_from_text(*texts):
    """Ritorna (sigla_prov, provincia, regione) cercando sigle/nomi provincia/regione nel testo."""
    for t in texts:
        if t is None or (isinstance(t, float) and pd.isna(t)): continue
        s = str(t)
        # sigla dopo CAP o a fine indirizzo: '92100 Agrigento AG' / 'Bergamo BG'
        m = re.search(r"\b(\d{5})\s+[A-Za-zÀ-ú' .-]+?\s+([A-Z]{2})\b", s)
        if m and m.group(2) in PROV: return (m.group(2),)+PROV[m.group(2)]
        m = re.search(r"\b([A-Z]{2})\b(?:,|\s|$)", s)
        if m and m.group(1) in PROV and re.search(r"[a-z]", s): return (m.group(1),)+PROV[m.group(1)]
        ns = _n(s)
        for token in re.split(r"[,/;|]+", ns):
            token = re.sub(r"\b(provincia|province|citta metropolitana|metropolitan city|of|di|comune)\b", " ", token)
            token = re.sub(r"\s+", " ", token).strip()
            if token in PROV_BY_NAME: k = PROV_BY_NAME[token]; return (k,)+PROV[k]
        for name, k in PROV_BY_NAME.items():
            if len(name) >= 5 and re.search(r"\b"+re.escape(name)+r"\b", ns): return (k,)+PROV[k]
    return (None, None, None)

def region_from_text(*texts):
    for t in texts:
        if t is None or (isinstance(t, float) and pd.isna(t)): continue
        ns = _n(t)
        for k, v in REGION_EN.items():
            if re.search(r"\b"+re.escape(k)+r"\b", ns): return v
    return None

# ----------------------------------------------------------------------------
# 1. Normalizzazioni: nome azienda, telefono, email, url
# ----------------------------------------------------------------------------
LEGAL = re.compile(r"\b(s\s?r\s?l\s?s?|srls?|s\s?p\s?a|spa|s\s?n\s?c|snc|s\s?a\s?s|sas|s\s?c\s?a?\s?r\s?l|scarl|s\s?c\s?s|soc(ieta)?\s+coop(erativa)?|coop|societa|"
                   r"ditta|impresa|f\s?lli|fratelli|unipersonale|in liquidazione|e\s?c|&\s?c|societa a responsabilita limitata|semplificata|a socio unico|group|holding)\b")
DI_TAIL = re.compile(r"\s+(di|de)\s+([a-z]+(\s+[a-z]+){0,2})$")
SECTOR = re.compile(r"\b(impianti|impianto|elettrici|elettrico|elettrica|fotovoltaico|fotovoltaici|fotovoltaica|solare|solar|energia|energie|energy|rinnovabili|rinnovabile|"
                    r"termoidraulica|termoidraulici|tecnologie|tecnologia|servizi|service|sistemi|soluzioni|installazioni|installazione|green|eco|power|tech|italia|italy|srl|spa)\b")

def name_key(s):
    s = _n(s)
    s = re.sub(r"[^\w\s]", " ", s)
    s = LEGAL.sub(" ", s)
    s = DI_TAIL.sub("", s)
    return re.sub(r"\s+", " ", s).strip()

def name_key_loose(s):
    k = name_key(s)
    k2 = re.sub(r"\s+", " ", SECTOR.sub(" ", k)).strip()
    return k2 if len(k2) >= 4 else k

QUERY_LIKE = re.compile(r"(,\s*\d{5}\s*,|,\s*(it|italy|italia)\s*$|^\s*(solar|heating|electric|electrical|photovoltaic|energy|renewable|hvac|plumbing)[\w &]*,\s)", re.I)
def clean_display(n):
    n = re.sub(r"\s*\|\s*[^|]{2,40}$", "", str(n)).strip()   # 'EKSIENERGIA | Treviso' -> 'EKSIENERGIA'
    n = re.sub(r"\s+", " ", n)
    return n if len(n) >= 2 else None
def _sig_tokens(s): return {t for t in s.split() if len(t) >= 5}

def owner_from_tail(s):
    m = DI_TAIL.search(re.sub(r"[^\w\s]", " ", _n(s)))
    if m:
        parts = m.group(2).split()
        if 1 <= len(parts) <= 3 and all(len(p) > 1 for p in parts):
            return " ".join(p.capitalize() for p in parts)
    return None

def _digits_from_cell(cell):
    if cell is None or (isinstance(cell, float) and pd.isna(cell)): return []
    if isinstance(cell, (int, float)):
        try: return [str(int(cell))]
        except Exception: return []
    s = str(cell)
    s = re.sub(r"(?i)\b(tel|cell|cellulare|mobile|fisso|whatsapp|wa|fax)\b[:. ]*", " ", s)
    # conto le cifre ignorando spazi/punti: '+39 329 618 7349' ha 12 cifre -> valido (prima veniva scartato)
    return [c for c in re.split(r"[/,;|]|\boppure\b|\bo\b|\s{3,}", s) if len(re.sub(r"\D", "", c)) >= 6]

def parse_phones(*cells):
    """-> lista di dict {e164, tipo} tipo in MOBILE/FISSO/VERDE/ALTRO/ESTERO/INVALIDO (dedup)."""
    out, seen = [], set()
    for cell in cells:
        for cand in _digits_from_cell(cell):
            raw = re.sub(r"[^\d+]", "", cand)
            if not raw: continue
            d = raw.lstrip("+")
            if d.startswith("0039"): d = d[4:]
            # 39xxxxxxxxx (11-12 cifre) -> +39...
            if d.startswith("39") and 11 <= len(d) <= 13 and not d.startswith("390"):
                d = "+" + d
            elif d.startswith("390") and 11 <= len(d) <= 13:
                d = "+" + d
            elif raw.startswith("+"):
                d = "+" + d
            try:
                n = phonenumbers.parse(d, "IT")
            except Exception:
                continue
            if not phonenumbers.is_valid_number(n):
                continue
            e164 = phonenumbers.format_number(n, phonenumbers.PhoneNumberFormat.E164)
            if e164 in seen: continue
            seen.add(e164)
            if n.country_code != 39:
                tipo = "ESTERO"
            else:
                t = phonenumbers.number_type(n)
                tipo = {PT.MOBILE:"MOBILE", PT.FIXED_LINE:"FISSO", PT.FIXED_LINE_OR_MOBILE:"FISSO", PT.TOLL_FREE:"VERDE",
                        PT.PREMIUM_RATE:"ALTRO", PT.SHARED_COST:"ALTRO", PT.VOIP:"ALTRO", PT.UAN:"ALTRO"}.get(t, "ALTRO")
                nat = str(n.national_number)
                if tipo == "ALTRO" and nat.startswith("3") and len(nat) in (9, 10): tipo = "MOBILE"
                if tipo == "ALTRO" and nat.startswith("0"): tipo = "FISSO"
            out.append({"e164": e164, "tipo": tipo})
    return out

EMAIL_RE = re.compile(r"[A-Za-z0-9._%+\-']+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}")
ROLE_LOCAL = {"info","amministrazione","commerciale","vendite","ufficio","segreteria","contabilita","preventivi","assistenza","contact","contatti","sales",
              "admin","hello","mail","posta","direzione","ufficiotecnico","tecnico","ordini","acquisti","marketing","noreply","no-reply","postmaster","webmaster",
              "email","privacy","support","supporto","clienti","customer","service","servizio","team","staff","office","reception","segreteria","segr","amministrazione",
              "amm","fatturazione","contabilita","ufficio.commerciale","commerciale1","preventivo","richieste","richiesta","infoline","lavoraconnoi","hr","export","import"}
FREE_DOM = {"gmail.com","googlemail.com","libero.it","virgilio.it","alice.it","tin.it","tiscali.it","tiscalinet.it","email.it","hotmail.it","hotmail.com","outlook.it",
            "outlook.com","live.it","live.com","yahoo.it","yahoo.com","icloud.com","fastwebnet.it","aruba.it","inwind.it","iol.it","katamail.com","msn.com","me.com",
            "protonmail.com","proton.me","pec.it","poste.it","teletu.it","vodafone.it","supereva.it","infinito.it","jumpy.it","tim.it","telecom.it"}
PEC_RE = re.compile(r"(^pec[.@]|@pec\.|legalmail|arubapec|postecert|\.pec\.|sicurezzapostale|mypec|pecimprese|@cert\.|\.cert\.|pecmail|pec-)")
DISPOSABLE = {"mailinator.com","guerrillamail.com","10minutemail.com","tempmail.com","yopmail.com","trashmail.com","sharklasers.com"}
GENERIC_WEB_DOM = {"facebook.com","instagram.com","linkedin.com","google.com","goo.gl","maps.google.com","business.site","wixsite.com","wordpress.com","blogspot.com",
                   "sites.google.com","youtube.com","twitter.com","x.com","pagine gialle","paginegialle.it","subito.it","yelp.com","tiktok.com","whatsapp.com","wa.me",
                   "pagineg ialle.it","virgilio.it","libero.it","gmail.com","apify.com","outscraper.com","google.it","facebook.it","linktr.ee","bit.ly","t.me",
                   # directory / aggregatori usati come "sito" da molte aziende diverse -> mai chiave di fusione
                   "habitissimo.it","instapro.it","preventivi.it","edilportale.com","pronto.it","quotalo.it","cylex.it","cylex-italia.it","misterimprese.it",
                   "paginebianche.it","tuttocitta.it","kompass.com","europages.it","europages.com","infobel.com","hotfrog.it","foursquare.com","trustpilot.com",
                   "solareb2b.it","fotovoltaicosulweb.it","infoimpianti.it","edilnet.it","houzz.it","aziende.it","italiaonline.it","registroimprese.it",
                   "gse.it","enel.it","eniplenitude.com","plenitude.it","sorgenia.it","edison.it","a2a.it","engie.it","eon-energia.com","ufficiocamerale.it",
                   "linkedin.it","google.co.uk","goo.gl","maps.app.goo.gl","business.google.com","sites.google.com","wix.com","weebly.com","jimdo.com","altervista.org"}

def classify_email(e):
    """-> dict {email, dominio, tipo} tipo in NOMINATIVA_AZIENDALE / GENERICA / FREEMAIL / PEC / USA_GETTA / INVALIDA."""
    if e is None or (isinstance(e, float) and pd.isna(e)): return None
    s = str(e).strip().lower()
    m = EMAIL_RE.search(s)
    if not m: return None
    s = m.group(0).strip(".'")
    local, dom = s.rsplit("@", 1)
    if dom in DISPOSABLE: tipo = "USA_GETTA"
    elif PEC_RE.search(s): tipo = "PEC"
    elif local.split("+")[0] in ROLE_LOCAL or re.match(r"^(info|contact|contatt|sales|vendit|amministr|commercial|segreter|assistenz|preventiv|uffici)", local): tipo = "GENERICA"
    elif dom in FREE_DOM: tipo = "FREEMAIL"
    else: tipo = "NOMINATIVA_AZIENDALE"
    return {"email": s, "dominio": dom, "tipo": tipo}

def is_nominativa(em):
    """Email che arriva a UNA persona (titolare): nominativa aziendale o freemail personale."""
    return em["tipo"] in ("NOMINATIVA_AZIENDALE", "FREEMAIL")

def domain_key(u):
    if u is None or (isinstance(u, float) and pd.isna(u)): return None
    s = str(u).strip().lower()
    if "@" in s and " " not in s: s = s.split("@", 1)[1]
    s = re.sub(r"^(https?://)?(www\.)?", "", s).split("/")[0].split("?")[0].strip()
    if not s or "." not in s or " " in s: return None
    if any(s == g or s.endswith("." + g) for g in GENERIC_WEB_DOM): return None
    return s

def classify_url(u):
    if u is None or (isinstance(u, float) and pd.isna(u)): return (None, None)
    s = str(u).strip()
    if not re.search(r"\.[a-z]{2,}", s.lower()) or " " in s.strip(): return (None, None)
    low = s.lower()
    if "linkedin.com/in/" in low: return ("LINKEDIN_PERSONA", s)
    if "linkedin.com/company" in low or "linkedin.com/school" in low: return ("LINKEDIN_AZIENDA", s)
    if "facebook.com" in low or "fb.com" in low or "fb.me" in low: return ("FACEBOOK", s)
    if "instagram.com" in low: return ("INSTAGRAM", s)
    if "twitter.com" in low or "x.com/" in low: return ("X", s)
    if "youtube.com" in low or "youtu.be" in low: return ("YOUTUBE", s)
    if "google.com/maps" in low or "goo.gl/maps" in low or "maps.app" in low: return ("GMAPS", s)
    if re.match(r"^(https?://)?[\w.-]+\.[a-z]{2,}(/.*)?$", low): return ("SITO", s)
    return (None, None)

def nz(x):
    return None if x is None or (isinstance(x, float) and pd.isna(x)) or str(x).strip().lower() in ("", "nan", "none", "null") else x

def to_num(x):
    x = nz(x)
    if x is None: return None
    try:
        v = float(str(x).replace(",", ".").split()[0])
        return v
    except Exception: return None

# ----------------------------------------------------------------------------
# 2. Record grezzo unificato
# ----------------------------------------------------------------------------
def rec(**kw):
    base = dict(source=None, source_row=None, azienda=None, persone=[], emails=[], phones=[], sito=None, li_azienda=None, fb=None, ig=None,
                indirizzo=None, citta=None, prov=None, provincia=None, regione=None, cap=None, paese=None, categoria=None, categorie=None,
                rating=None, recensioni=None, place_id=None, cid=None, chiuso=False, note=None, tipo_scraper=None)
    base.update(kw)
    return base

def add_urls(r, *urls):
    for u in urls:
        kind, val = classify_url(u)
        if kind == "SITO" and not r["sito"]: r["sito"] = val
        elif kind == "LINKEDIN_AZIENDA" and not r["li_azienda"]: r["li_azienda"] = val
        elif kind == "FACEBOOK" and not r["fb"]: r["fb"] = val
        elif kind == "INSTAGRAM" and not r["ig"]: r["ig"] = val
        elif kind == "LINKEDIN_PERSONA":
            r["persone"].append({"nome": None, "cognome": None, "titolo": None, "email": None, "linkedin": val})

def add_emails(r, *cells):
    for c in cells:
        c = nz(c)
        if c is None: continue
        for m in EMAIL_RE.findall(str(c)):
            em = classify_email(m)
            if em and em["email"] not in [x["email"] for x in r["emails"]]: r["emails"].append(em)

def add_phones(r, *cells):
    for p in parse_phones(*cells):
        if p["e164"] not in [x["e164"] for x in r["phones"]]: r["phones"].append(p)

def add_geo(r, *texts):
    if not r["prov"]:
        k, p, reg = geo_from_text(*texts)
        if k: r["prov"], r["provincia"], r["regione"] = k, p, reg
    if not r["regione"]:
        r["regione"] = region_from_text(*texts)
    if not r["cap"]:
        for t in texts:
            t = nz(t)
            if t is None: continue
            m = re.search(r"\b(\d{5})\b", str(t))
            if m: r["cap"] = m.group(1); break

def add_person(r, nome=None, cognome=None, titolo=None, email=None, linkedin=None, full=None):
    nome, cognome, titolo, full = nz(nome), nz(cognome), nz(titolo), nz(full)
    if full and not nome:
        parts = str(full).split()
        nome, cognome = parts[0], " ".join(parts[1:]) or None
    if not (nome or email or linkedin): return
    # nomi-persona spazzatura (es. 'Materiale Elettrico', 'Info Commerciale', 'Team Solar') -> tolgo il nome, tengo email/linkedin
    BAD_PERSON = re.compile(r"(materiale|elettric|impiant|energ|solar|srl|spa|team|info|ufficio|commercial|amministraz|vendite|sales|support|assistenza|\d)")
    full_chk = _n(f"{nome or ''} {cognome or ''}")
    if nome and BAD_PERSON.search(full_chk): nome, cognome = None, None
    if not (nome or email or linkedin): return
    em = classify_email(email) if nz(email) else None
    r["persone"].append({"nome": str(nome).strip().title() if nome else None, "cognome": str(cognome).strip().title() if cognome else None,
                         "titolo": str(titolo).strip() if titolo else None, "email": em["email"] if em else None, "linkedin": nz(linkedin)})
    if em: add_emails(r, em["email"])

# ----------------------------------------------------------------------------
# 3. Loader per ogni file
# ----------------------------------------------------------------------------
def load_gse(path, tag):
    df = pd.read_excel(path); out = []
    name_col = "NOME" if "NOME" in df.columns else "DENOMINAZIONE"
    for i, row in df.iterrows():
        az = nz(row.get(name_col))
        if az is None: continue
        r = rec(source=tag, source_row=int(i)+2, azienda=str(az).strip(), tipo_scraper="GSE")
        add_phones(r, row.get("TELEFONO"))
        add_geo(r, row.get("CONTESTO GEOGRAFICO"))
        r["paese"] = "IT"
        out.append(r)
    return out

def load_foglio5(path, tag):
    df = pd.read_excel(path); out = []
    named = [c for c in df.columns if not str(c).startswith("Unnamed")]
    for i, row in df.iterrows():
        az = nz(row.get("NOME AZIENDA"))
        if az is None: continue
        if QUERY_LIKE.search(str(az)):
            # riga SFALSATA: 'NOME AZIENDA' contiene la stringa di ricerca, il nome vero è slittato nella colonna TIPO
            t = nz(row.get("TIPO")); t = str(t).strip() if t is not None else ""
            ok = t and t.upper() not in ("FISSO","MOBILE","TOLL-FREE") and not re.search(r"\d{5,}", t) and "@" not in t and not QUERY_LIKE.search(t) and len(t) >= 3
            az = t if ok else f"(nome illeggibile) {tag}#{int(i)+2}"
        r = rec(source=tag, source_row=int(i)+2, azienda=str(az).strip(), tipo_scraper="FOGLIO5")
        cells = [row.get(c) for c in named]
        for c in cells:
            c = nz(c)
            if c is None: continue
            s = str(c)
            if EMAIL_RE.search(s): add_emails(r, s)
            elif re.search(r"https?://|www\.|\.(it|com|eu|net|org)\b", s.lower()) and " " not in s.strip(): add_urls(r, s)
            elif re.search(r"\d{6,}", s) or isinstance(c, (int, float)): add_phones(r, c)
        add_phones(r, row.get("TEL"), row.get("TELEFONO 1"), row.get("TELEFONO 2"))
        add_emails(r, row.get("EMAIL 1"), row.get("EMAIL 2"))
        add_urls(r, row.get("SITO WEB"), row.get("INSTAGRAM"), row.get("LINKEDIN"))
        r["citta"] = nz(row.get("CITTÀ")); add_geo(r, row.get("REGIONE"), row.get("CITTÀ"))
        rt = to_num(row.get("RATING")); r["rating"] = rt if rt is not None and rt <= 5 else None
        rv = to_num(row.get("RECENSIONI")); r["recensioni"] = int(rv) if rv is not None else None
        tipo = nz(row.get("TIPO")); r["categoria"] = tipo if tipo and tipo not in ("FISSO","MOBILE","TOLL-FREE") else None
        fb = nz(row.get("FB ADS")); r["note"] = "FB ADS: SI" if str(fb).strip().upper() == "SI" else None
        r["paese"] = "IT"
        out.append(r)
    # blocco Outscraper incollato a destra (header nella riga 0 delle colonne Unnamed)
    un = [c for c in df.columns if str(c).startswith("Unnamed")]
    hdr = {c: nz(df.loc[0, c]) for c in un}
    hdr = {c: str(v).strip() for c, v in hdr.items() if v is not None and re.match(r"^[a-z_.\d]+$", str(v).strip())}
    if "email" in hdr.values() or "company_name" in hdr.values():
        blk = df.loc[1:, list(hdr.keys())].rename(columns=hdr)
        for i, row in blk.iterrows():
            az = nz(row.get("company_name")) or nz(row.get("website_title"))
            dom = nz(row.get("domain"))
            if az is None and dom is None and nz(row.get("email")) is None: continue
            r = rec(source=tag+"|blocco_outscraper", source_row=int(i)+2, azienda=str(az).strip() if az else (dom or "?"), tipo_scraper="OUTSCRAPER")
            add_emails(r, row.get("email"))
            if str(nz(row.get("email.emails_validator.status")) or "").upper() == "INVALID" and r["emails"]:
                r["emails"][-1]["tipo"] = "INVALIDA"
            add_phones(r, row.get("company_phone"), row.get("company_phones"), row.get("contact_phone"), row.get("contact_phones"))
            add_urls(r, row.get("company_linkedin"), row.get("company_facebook"), row.get("company_instagram"), row.get("contact_linkedin"))
            if dom and not r["sito"]: r["sito"] = "https://" + str(dom)
            add_person(r, row.get("first_name"), row.get("last_name"), row.get("title"), None, row.get("contact_linkedin"), row.get("full_name"))
            r["cap"] = nz(row.get("postal_code")); add_geo(r, row.get("state_code"))
            rt = to_num(row.get("rating")); r["rating"] = rt if rt is not None and rt <= 5 else None
            rv = to_num(row.get("reviews")); r["recensioni"] = int(rv) if rv is not None else None
            r["place_id"] = nz(row.get("place_id")); r["cid"] = nz(row.get("cid"))
            r["chiuso"] = str(nz(row.get("business_status")) or "").upper() in ("CLOSED_PERMANENTLY","CLOSED")
            cc = nz(row.get("country_code")); r["paese"] = str(cc).upper() if cc else None
            out.append(r)
    return out

def load_people(path, tag):
    df = pd.read_excel(path); out = []
    for i, row in df.iterrows():
        org = nz(row.get("organization_name"))
        if org is None: continue
        r = rec(source=tag, source_row=int(i)+2, azienda=str(org).strip(), tipo_scraper="PEOPLE")
        add_urls(r, row.get("organization_website_url"), row.get("organization_linkedin_url"))
        dom = nz(row.get("organization_primary_domain"))
        if dom and not r["sito"]: r["sito"] = "https://" + str(dom)
        add_person(r, row.get("first_name"), row.get("last_name"), row.get("title"), row.get("email"), row.get("linkedin_url"))
        r["citta"] = nz(row.get("city")); add_geo(r, row.get("sanitized_address"), row.get("city"), row.get("state"))
        r["cap"] = nz(row.get("postal_code")) and str(row.get("postal_code")).split(".")[0].zfill(5)
        fy = to_num(row.get("organization_founded_year")); r["note"] = f"fondata {int(fy)}" if fy else None
        cc = nz(row.get("country")); r["paese"] = "IT" if cc and _n(cc) in ("italy","italia") else (str(cc).upper()[:2] if cc else None)
        if str(nz(row.get("domain_is_catchall"))).lower() == "true": r["note"] = (r["note"] or "") + " catch-all"
        out.append(r)
    return out

def load_gmaps_apify(path, tag):
    df = pd.read_excel(path); out = []
    cats = [c for c in df.columns if re.match(r"categories/\d+", str(c))]
    for i, row in df.iterrows():
        az = nz(row.get("title"))
        if az is None: continue
        r = rec(source=tag, source_row=int(i)+2, azienda=str(az).strip(), tipo_scraper="GMAPS")
        add_phones(r, row.get("phone"), row.get("phoneUnformatted"))
        add_urls(r, row.get("website"))
        r["indirizzo"] = nz(row.get("address")); r["citta"] = nz(row.get("city"))
        add_geo(r, row.get("address"), row.get("state"), row.get("city"))
        pc = nz(row.get("postalCode")); r["cap"] = str(pc).split(".")[0].zfill(5) if pc else r["cap"]
        r["categoria"] = nz(row.get("categoryName"))
        r["categorie"] = "; ".join(str(nz(row.get(c))) for c in cats if nz(row.get(c)))
        rt = to_num(row.get("totalScore")) or to_num(row.get("rating")); r["rating"] = rt if rt is not None and rt <= 5 else None
        rv = to_num(row.get("reviewsCount")) or to_num(row.get("ratingCount")); r["recensioni"] = int(rv) if rv is not None else None
        r["place_id"] = nz(row.get("placeId")); r["cid"] = nz(row.get("cid"))
        r["chiuso"] = str(nz(row.get("permanentlyClosed"))).lower() == "true"
        cc = nz(row.get("countryCode")); r["paese"] = str(cc).upper() if cc else None
        out.append(r)
    return out

def load_gmaps_simple(path, tag):
    df = pd.read_excel(path); out = []
    for i, row in df.iterrows():
        az = nz(row.get("company"))
        if az is None: continue
        r = rec(source=tag, source_row=int(i)+2, azienda=str(az).strip(), tipo_scraper="GMAPS")
        add_phones(r, row.get("phone")); add_urls(r, row.get("website"))
        r["citta"] = nz(row.get("city")); add_geo(r, row.get("city"))
        rt = to_num(row.get("rating")); r["rating"] = rt if rt is not None and rt <= 5 else None
        r["paese"] = "IT"
        out.append(r)
    return out

def load_outscraper(path, tag):
    df = pd.read_excel(path); out = []
    for i, row in df.iterrows():
        az = nz(row.get("name")) or nz(row.get("company_name"))
        if az is None: continue
        r = rec(source=tag, source_row=int(i)+2, azienda=str(az).strip(), tipo_scraper="OUTSCRAPER")
        add_phones(r, row.get("phone"), row.get("company_phone"), row.get("company_phones"), row.get("contact_phone"), row.get("contact_phones"))
        add_emails(r, row.get("email"))
        if str(nz(row.get("email.emails_validator.status")) or "").upper() == "INVALID" and r["emails"]:
            r["emails"][-1]["tipo"] = "INVALIDA"
        add_urls(r, row.get("website"), row.get("company_linkedin"), row.get("company_facebook"), row.get("company_instagram"), row.get("contact_linkedin"))
        add_person(r, row.get("first_name"), row.get("last_name"), row.get("title"), None, row.get("contact_linkedin"), row.get("full_name"))
        r["indirizzo"] = nz(row.get("address")); r["citta"] = nz(row.get("city"))
        add_geo(r, row.get("address"), row.get("state"), row.get("city"), row.get("county"))
        pc = nz(row.get("postal_code")); r["cap"] = str(pc).split(".")[0].zfill(5) if pc else None
        r["categoria"] = nz(row.get("category")); r["categorie"] = nz(row.get("subtypes"))
        rt = to_num(row.get("rating")); r["rating"] = rt if rt is not None and rt <= 5 else None
        rv = to_num(row.get("reviews")); r["recensioni"] = int(rv) if rv is not None else None
        r["place_id"] = nz(row.get("place_id")); r["cid"] = nz(row.get("cid"))
        r["chiuso"] = str(nz(row.get("business_status")) or "").upper() in ("CLOSED_PERMANENTLY","CLOSED")
        cc = nz(row.get("country_code")); r["paese"] = str(cc).upper() if cc else None
        out.append(r)
    return out

FOREIGN = re.compile(r"\b(germany|deutschland|spain|espana|france|austria|switzerland|schweiz|suisse|belgium|netherlands|portugal|poland|romania|croatia|slovenia|greece|"
                     r"united kingdom|england|ireland|usa|united states|canada|brazil|mexico|india|turkey|hungary|czech|slovakia|serbia|albania|malta|tunisia|morocco|egypt|"
                     r"south africa|australia|dubai|uae|bulgaria|ukraine|russia|sweden|norway|denmark|finland|luxembourg|monaco|san marino|vatican)\b")
ITALIAN_HINT = re.compile(r"\b(fotovoltaic|impiant|energia|srl|s\.r\.l|snc|sas|spa|preventiv|risparmi|installazion|italia|italy|pannell|solare|via |piazza |corso )")

def load_facebook(path, tag):
    df = pd.read_excel(path); out = []
    for i, row in df.iterrows():
        az = nz(row.get("title"))
        if az is None: continue
        r = rec(source=tag, source_row=int(i)+2, azienda=str(az).strip(), tipo_scraper="FACEBOOK")
        add_emails(r, row.get("email")); add_phones(r, row.get("phone"))
        add_urls(r, row.get("website"), row.get("Unnamed: 15"), row.get("pageUrl"), row.get("Unnamed: 16"))
        r["indirizzo"] = nz(row.get("address")); add_geo(r, row.get("address"), az)
        cats = [nz(row.get(c)) for c in ("categories/1","categories/2","categories/3") if nz(row.get(c))]
        r["categoria"] = cats[0] if cats else None; r["categorie"] = "; ".join(cats)
        info = " ".join(str(nz(row.get(c)) or "") for c in ("info/0","info/1","info/2"))
        addr = str(r["indirizzo"] or "")
        if FOREIGN.search(_n(addr)) or FOREIGN.search(_n(info)): r["paese"] = "EST"
        elif any(p["tipo"] != "ESTERO" for p in r["phones"]) or r["prov"] or ITALIAN_HINT.search(_n(addr+" "+info+" "+str(az))): r["paese"] = "IT"
        else: r["paese"] = None
        if any(p["tipo"] == "ESTERO" for p in r["phones"]) and not r["prov"]: r["paese"] = "EST"
        rt = nz(row.get("rating")); m = re.search(r"(\d+(?:\.\d+)?)", str(rt)) if rt else None
        r["rating"] = float(m.group(1)) if m and float(m.group(1)) <= 5 else None
        lk = to_num(row.get("likes")); r["note"] = f"fb likes {int(lk)}" if lk else None
        out.append(r)
    return out

def load_ads_library(path):
    """-> dict name_key -> page_name originale (per il segnale FB_ADS_ATTIVE)."""
    df = pd.read_excel(path); m = {}
    for x in df["page_name"].dropna().astype(str):
        k = name_key(x)
        if k and k not in m: m[k] = x.strip()
    return m

# ----------------------------------------------------------------------------
# 4. Fuori target (aggressivo)
# ----------------------------------------------------------------------------
BIG_BRANDS = re.compile(r"\b(gse|gestore dei servizi energetici|eni|plenitude|enel|sorgenia|edison|a2a|iren|hera|acea|engie|e\s?on|eon|deloitte|accenture|kpmg|pwc|ey|"
                        r"unicredit|intesa|banca|bnl|poste italiane|postepay|tesla|sunpower|leroy merlin|ikea|bricoman|obi|amazon|mediaworld|unieuro|euronics|expert|trony|"
                        r"vodafone|tim|wind|fastweb|iliad|terna|snam|italgas|agsm|dolomiti energia|alperia|estra|illumia|wekiwi|octopus|pulsee|nen|axpo|repower|"
                        r"e\.on|shell|q8|total|bp|esso|ip|tamoil|conad|coop|esselunga|lidl|eurospin|carrefour|md|pam|despar|bonus regione|italia solare|anie|"
                        r"confindustria|confartigianato|cna|regione|comune di|provincia di|ministero|agenzia delle entrate|inps|inail|camera di commercio|"
                        r"universita|politecnico|liceo|istituto|scuola|ospedale|asl|farmacia|parrocchia|chiesa|caritas|onlus|fondazione|ordine degli|collegio dei|"
                        r"otovo|sunrun|enerbrain|edilhub|mf digital|trein|clientium|glassdoor|indeed|infojobs|subito|immobiliare|idealista|casa\.it|booking|airbnb)\b")
BAD_CATEGORY = re.compile(r"(ristorant|pizzeri|bar\b|caff|hotel|albergo|b&b|bed and breakfast|agriturismo|abbigliament|calzatur|gioiell|parrucch|estetic|palestra|"
                          r"scuola di musica|scuola|music|asilo|universit|ospedal|clinic|farmac|veterinar|dentist|medic|avvocat|notai|commercialist|assicura|banca|"
                          r"immobiliar|immobili\b|real estate|agenzia immobiliare|supermercat|alimentar|macelleri|panific|pasticc|gelateri|tabacch|edicol|libreri|cartoler|autofficin|carrozzer|"
                          r"concessionari|autonoleggi|taxi|trasport|logistic|spedizion|ingrosso|grossist|wholesale|distributor|distribut|fornitore di attrezzature|"
                          r"fornitore di impianti solari per acqua|fornitura di energia|azienda fornitrice di energia|utility|concessionario di utility|"
                          r"produttore|manufacturer|fabbrica|associazion|ente|consorzio|cooperativa sociale|onlus|fondazion|chiesa|parrocchi|comune|municipio|"
                          r"agenzia di marketing|web agency|agenzia pubblicitaria|consulente|consulenz|consulting|studio di consulenza|studio tecnico|ingegner|architett|geometr|"
                          r"vacanz|viaggi|travel|tour operator|resort|villaggio|crocier|agenzia viaggi|noleggio|rent a car|"
                          r"formazione|corsi|coaching|software|informatic|telecomunicazion|call center|centro commerciale|negozio di|store|shop|museo|teatro|cinema|"
                          r"parco|giardin|vivai|florovivaist|agricol|allevament|azienda agricola|cantina|vinicol|oleific|caseific)")
GOOD_CATEGORY = re.compile(r"(fotovoltaic|solare|solar|energia solare|energie rinnovabili|energia rinnovabile|impianti elettrici|impianto elettrico|elettricist|"
                           r"installatore|installazione impianti|impiantist|termoidraul|idraulic|climatizz|condizionament|pompe di calore|pompa di calore|"
                           r"efficientamento|efficienza energetica|risparmio energetico|energy|energia|rinnovabil|accumulo|batterie|colonnin|ricarica|eolic|"
                           r"impianti tecnologici|impianti tecnici|impresa edile|edilizia|ristrutturazion|costruzion)")
GENERIC_ELECTRICIAN = re.compile(r"^(elettricista|electrician|impianti elettrici|elettricisti)$")
# produttori / grossisti / brand: NON sono installatori. Scarto se il brand è il soggetto del nome (inizio nome) o è un punto vendita/assistenza.
BRAND_MAKERS = re.compile(r"\b(sonepar|rexel|comet|marchiol|elettroveneta|sacchi|gewiss|bticino|vimar|legrand|hager|finder|lovato|abb|schneider|siemens|bosch|"
                          r"chint|huawei|sungrow|fronius|sma|solaredge|enphase|growatt|goodwe|longi|jinko|trina|canadian solar|ja solar|q cells|qcells|hanwha|"
                          r"tesla|byd|pylontech|varta|sonnen|zcs|azzurro|fimer|zucchetti|senec|e3dc|kostal|solax|deye|victron|amra|chauvin arnoux|graded|"
                          r"vaillant|viessmann|daikin|mitsubishi|immergas|ariston|baxi|riello|ferroli|beretta|junkers|hoval|samsung|lg\b|panasonic|italtherm|unical|"
                          r"sime|lamborghini calor|olimpia splendid|haier|hisense|toshiba|carrier|clivet|aermec|rhoss|emmeti|giacomini|caleffi|cordivari|"
                          r"sunpower|maxeon|meyer burger|rec solar|solarwatt|axitec|peimar|futurasun|vp solar|coenergia|energy team|elmec|wurth|würth|"
                          r"leroy merlin|bricoman|brico|obi|ikea|amazon|mediaworld|unieuro|euronics|expert|trony|comet)\b")
POS_ASSISTENZA = re.compile(r"(store|flagship|distributor|distribut|grossist|ingrosso|wholesale|assistenza|centro assistenza|rivenditor|concessionar|dealer|showroom|"
                            r"punto vendita|service partner|partner ufficiale|magazzino)")

def scarta(g):
    """Ritorna il MOTIVO di scarto (fuori target / spazzatura) oppure None. Aggressivo: in dubbio -> scarto."""
    nk = g["name_key"]; nm = _n(g["azienda"]); cat = _n(g.get("categoria") or ""); cats = _n(g.get("categorie") or "")
    allcat = cat + " ; " + cats
    if not nk or len(nk) < 2: return "nome azienda mancante/illeggibile"
    if nm.startswith("(nome illeggibile)"): return "nome azienda illeggibile (riga sfalsata / stringa di ricerca dello scraper)"
    if g.get("chiuso"): return "attività chiusa (Google)"
    if g.get("paese") == "EST": return "azienda estera"
    if g.get("paese") is None and not g.get("prov") and not any(p["tipo"] != "ESTERO" for p in g["phones"]) and not any(e["dominio"].endswith(".it") for e in g["emails"]):
        return "paese non determinabile (nessun segnale Italia)"
    if BIG_BRANDS.search(" " + nm + " "): return "big brand / multinazionale / ente / non installatore"
    bm = BRAND_MAKERS.search(" " + nm + " ")
    if bm and (re.match(r"^\W*" + re.escape(bm.group(1)) + r"\b", nm) or POS_ASSISTENZA.search(nm)):
        return f"produttore/distributore/punto vendita di brand ({bm.group(1)}), non installatore"
    if POS_ASSISTENZA.search(nm) and re.search(r"distribut|grossist|ingrosso|wholesale|magazzino", nm): return "grossista / distributore"
    if re.search(r"\b(s\s?p\s?a|spa)\b", nm) and (g.get("recensioni") or 0) > 300: return "troppo grande (S.p.A. con >300 recensioni)"
    if BAD_CATEGORY.search(allcat) and not GOOD_CATEGORY.search(allcat): return f"categoria fuori target: {cat or cats[:60]}"
    if BAD_CATEGORY.search(" " + nm + " ") and not GOOD_CATEGORY.search(nm + " " + allcat): return "nome indica attività fuori target"
    if allcat.strip(" ;") and GENERIC_ELECTRICIAN.match(cat.strip()) and not re.search(r"fotovoltaic|solar|energ|rinnovabil", nm + " " + cats): return "elettricista generico (nessun segnale FV)"
    if not allcat.strip(" ;") and g["tipo_scraper"] in ("GMAPS","OUTSCRAPER","FACEBOOK") and not GOOD_CATEGORY.search(nm): return "nessuna categoria e nome non indica FV/energia"
    # spazzatura: nessun dato di contatto E nessun sito
    return None

# ----------------------------------------------------------------------------
# 5. Ingestione
# ----------------------------------------------------------------------------
FILES = {
    "DATABASE COLD CALLS (DEFINITIVO NUOVO).xlsx": ("GSE_DB_COLD_CALLS", load_gse),
    "SOLARBACK — BACINO LEAD (SEGMENTATO).xlsx": ("GSE_BACINO", load_gse),
    "LEAD FOGLIO 5.xlsx": ("FOGLIO5", load_foglio5),
    "dataset_leads-finder_2026-07-09_13-21-34-059.xlsx": ("APIFY_LEADS_FINDER", load_people),
    "PEOPLEB2BPERSONALACTOR.APIFY.xlsx": ("APIFY_PEOPLE_B2B", load_people),
    "dataset_google-maps-scraper_2026-07-05_18-49-36-098.xlsx": ("APIFY_GMAPS", load_gmaps_apify),
    "google maps 3497.xlsx": ("GMAPS_3497", load_gmaps_simple),
    "foglio lead 3.xlsx": ("OUTSCRAPER_F3", load_outscraper),
    "foglio lead 4.xlsx": ("FACEBOOK_F4", load_facebook),
}
ADS_FILE = "dataset_facebook-ads-library-scraper_2026-07-08_14-57-39-377.xlsx"
EXCLUDED_FILES = {"ARTEC AI SOLARBACK (3).xlsx": "log meeting (4 righe): NON è una lista, sono già Interessati/Qualificati"}

log = {"file": {}, "righe_grezze_totali": 0}
records = []
for fname, (tag, loader) in FILES.items():
    p = os.path.join(RAW, fname)
    if not os.path.exists(p):
        log["file"][fname] = {"errore": "file non trovato"}; continue
    rs = loader(p, tag)
    n_raw = int(pd.read_excel(p).shape[0])
    log["file"][fname] = {"tag": tag, "righe_grezze": n_raw, "record_letti": len(rs)}
    log["righe_grezze_totali"] += n_raw
    records.extend(rs)
ads_keys = load_ads_library(os.path.join(RAW, ADS_FILE))
log["file"][ADS_FILE] = {"tag": "META_ADS_LIBRARY", "righe_grezze": len(pd.read_excel(os.path.join(RAW, ADS_FILE))), "uso": "solo SEGNALE FB_ADS_ATTIVE (nessun contatto)"}
log["righe_grezze_totali"] += log["file"][ADS_FILE]["righe_grezze"]
for f, why in EXCLUDED_FILES.items():
    p = os.path.join(RAW, f)
    log["file"][f] = {"tag": "ESCLUSO", "righe_grezze": int(pd.read_excel(p).shape[0]) if os.path.exists(p) else 0, "uso": why}
    if os.path.exists(p): log["righe_grezze_totali"] += log["file"][f]["righe_grezze"]

for idx, r in enumerate(records):
    r["source_id"] = f"{r['source']}#{r['source_row']}"
    # nomi che sono stringhe di ricerca (query dello scraper) -> illeggibili e UNICI (mai usati per fondere)
    if r["azienda"] and QUERY_LIKE.search(str(r["azienda"])) and not str(r["azienda"]).startswith("(nome illeggibile)"):
        r["azienda"] = f"(nome illeggibile) {r['source_id']}"
    # rete di sicurezza: se mancano telefoni/email, li cerco nelle celle di testo (righe sfalsate)
    if not r["phones"]: add_phones(r, r["categoria"], r["citta"], r["indirizzo"], r["categorie"])
    if not r["emails"]: add_emails(r, r["categoria"], r["citta"], r["indirizzo"], r["categorie"], r["note"])
    for fld in ("categoria", "citta"):
        v = r.get(fld)
        if v and (len(re.sub(r"\D", "", str(v))) >= 6 or "@" in str(v) or re.search(r"https?://|www\.", str(v))): r[fld] = None
    c = r.get("citta")
    if c:
        cs = str(c).strip()
        if _n(cs) in CITY_JUNK or len(cs) > 35 or CITY_BAD.search(_n(cs)) or re.search(r"\d", cs): r["citta"] = None
        else: r["citta"] = CITY_EN.get(_n(cs), cs)
    r["name_key"] = name_key(r["azienda"])
    r["name_loose"] = name_key_loose(r["azienda"])
    r["domain_key"] = domain_key(r["sito"]) or next((domain_key(e["dominio"]) for e in r["emails"] if e["tipo"] in ("NOMINATIVA_AZIENDALE","GENERICA") and domain_key(e["dominio"])), None)
    r["idx"] = idx
print(f"Record grezzi letti: {len(records)}  (righe grezze totali nei file: {log['righe_grezze_totali']})")

# ----------------------------------------------------------------------------
# 6. Deduplica: union-find su chiavi esatte + fuzzy per provincia
# ----------------------------------------------------------------------------
parent = list(range(len(records)))
def find(x):
    while parent[x] != x:
        parent[x] = parent[parent[x]]; x = parent[x]
    return x
def union(a, b, rule, mlog):
    ra, rb = find(a), find(b)
    if ra != rb:
        parent[rb] = ra; mlog.append((records[a]["source_id"], records[b]["source_id"], rule))

merge_log = []
def compat(i, j):
    """Due righe possono essere la stessa azienda solo se i NOMI sono compatibili (evita le fusioni a catena)."""
    na, nb = records[i]["name_loose"], records[j]["name_loose"]
    if na.startswith("nome illeggibile") or nb.startswith("nome illeggibile"): return False
    if not na or not nb or na == "?" or nb == "?": return True
    if na == nb or na in nb or nb in na: return True
    if _sig_tokens(na) & _sig_tokens(nb): return True          # condividono almeno una parola distintiva (>=5 lettere)
    return fuzz.token_set_ratio(na, nb) >= 55

def link_by(keyfunc, rule, strong=False, max_names=8):
    """strong=True: la chiave identifica l'azienda da sola (place_id, nome esatto). Altrimenti unione solo a coppie compatibili."""
    buckets = defaultdict(list)
    for r in records:
        for k in keyfunc(r):
            if k: buckets[k].append(r["idx"])
    for k, ids in buckets.items():
        if len(ids) < 2: continue
        distinct = {records[i]["name_loose"] for i in ids}
        if strong or len(distinct) == 1:
            for i in ids[1:]: union(ids[0], i, rule, merge_log)
            continue
        if len(distinct) > max_names: continue  # chiave "hub" (numero/dominio condiviso da molte aziende diverse) -> ignorata
        for x in range(len(ids)):
            for y in range(x+1, len(ids)):
                if find(ids[x]) != find(ids[y]) and compat(ids[x], ids[y]): union(ids[x], ids[y], rule, merge_log)

link_by(lambda r: [r["place_id"]] if r["place_id"] else [], "place_id", strong=True)
link_by(lambda r: [str(r["cid"])] if r["cid"] else [], "cid", strong=True)
_ok_name = lambda r: r["name_key"] and not r["name_loose"].startswith("nome illeggibile")
link_by(lambda r: [r["name_key"] + "|" + (r["prov"] or "")] if _ok_name(r) and r["prov"] and len(r["name_loose"]) >= 4 else [], "nome esatto+provincia", strong=True)
link_by(lambda r: [r["name_key"]] if _ok_name(r) and len(r["name_key"]) >= 12 and len(r["name_loose"]) >= 6 else [], "nome esatto lungo", strong=True)
link_by(lambda r: [r["domain_key"]] if r["domain_key"] else [], "dominio sito")
link_by(lambda r: [e["email"] for e in r["emails"] if e["tipo"] in ("NOMINATIVA_AZIENDALE","GENERICA")], "email aziendale")
link_by(lambda r: [e["email"] for e in r["emails"] if e["tipo"] == "FREEMAIL"], "email freemail", max_names=3)
link_by(lambda r: [p["e164"] for p in r["phones"] if p["tipo"] in ("MOBILE","FISSO")], "telefono", max_names=4)

# fuzzy per blocco provincia (token_sort = più severo del token_set)
by_prov = defaultdict(list)
for r in records:
    if r["prov"] and r["name_loose"]: by_prov[r["prov"]].append(r["idx"])
fuzzy_pairs = 0
for prov, ids in by_prov.items():
    names = [records[i]["name_loose"] for i in ids]
    for a_pos, a in enumerate(ids):
        if len(names[a_pos]) < 6: continue
        matches = process.extract(names[a_pos], names[a_pos+1:], scorer=fuzz.token_sort_ratio, score_cutoff=88, limit=5)
        for _, score, rel in matches:
            b = ids[a_pos+1+rel]
            if len(names[a_pos+1+rel]) < 6 or find(a) == find(b): continue
            ra, rb = records[a], records[b]
            second = (ra["citta"] and rb["citta"] and _n(ra["citta"]) == _n(rb["citta"])) or (ra["cap"] and rb["cap"] and ra["cap"] == rb["cap"]) \
                     or bool({p["e164"][-7:] for p in ra["phones"]} & {p["e164"][-7:] for p in rb["phones"]}) \
                     or (ra["domain_key"] and ra["domain_key"] == rb["domain_key"])
            if score >= 94 or (score >= 88 and second):
                union(a, b, f"fuzzy {int(score)} ({'+2a chiave' if second else 'stessa prov'})", merge_log); fuzzy_pairs += 1
log["fusioni_fuzzy"] = fuzzy_pairs

clusters = defaultdict(list)
for r in records: clusters[find(r["idx"])].append(r)
# VALVOLA DI SICUREZZA: un cluster con troppi nomi diversi = fusione sbagliata -> lo spezzo per (place_id o nome)
split_n = 0
for key in list(clusters.keys()):
    rs = clusters[key]
    if len({r["name_loose"] for r in rs}) > 3:
        del clusters[key]
        sub = defaultdict(list)
        for r in rs: sub[r["place_id"] or r["name_key"]].append(r)
        for k, v in sub.items(): clusters[f"{key}|{k}"] = v
        split_n += 1
log["cluster_spezzati_valvola"] = split_n
max_names = max(len({r["name_loose"] for r in rs}) for rs in clusters.values())
log["max_nomi_diversi_in_un_cluster"] = max_names
print(f"Cluster (aziende uniche candidate): {len(clusters)}  · fusioni totali: {len(merge_log)}  · fuzzy: {fuzzy_pairs}  · spezzati: {split_n}  · max nomi/cluster: {max_names}")

# ----------------------------------------------------------------------------
# 7. Golden record per cluster
# ----------------------------------------------------------------------------
SRC_PRIO = {"GSE":5, "FOGLIO5":4, "GMAPS":3, "OUTSCRAPER":3, "FACEBOOK":2, "PEOPLE":1}
TITLE_PRIO = [(r"\b(titolare|owner|proprietar|founder|fondator|co-founder|cofounder)\b", 10), (r"\b(ceo|amministratore|amm\.? del|managing director|md|presidente|president|chairman|legale rappresentante|legal representative)\b", 9),
              (r"\b(socio|partner|direttore generale|general manager|dg|coo|cto|cfo)\b", 7), (r"\b(direttore|director|responsabile|head|manager)\b", 5), (r"\b(commerciale|sales|vendite|account)\b", 4)]
def title_score(t):
    t = _n(t or "")
    for rx, sc in TITLE_PRIO:
        if re.search(rx, t): return sc
    return 2 if t else 1

def best(vals, prio=None):
    vals = [v for v in vals if nz(v) is not None]
    if not vals: return None
    if prio: vals = sorted(vals, key=lambda v: -prio(v))
    return vals[0]

golden = []
for cid_, rs in clusters.items():
    rs_sorted = sorted(rs, key=lambda r: (-SRC_PRIO.get(r["tipo_scraper"], 0), len(r["azienda"] or "")))
    # nome canonico: scarto stringhe "query" e suffissi '| Città', preferisco fonti prioritarie, casing normale, e il più CORTO (≥6) tra i candidati
    names = [r["azienda"] for r in rs_sorted]
    cands = [clean_display(n) for n in names if n and n != "?" and not QUERY_LIKE.search(str(n))]
    cands = [c for c in cands if c] or [n for n in names if n]
    top = cands[:4]
    nice = [n for n in top if not n.isupper() and len(n) >= 4] or top
    azienda = min(nice, key=lambda n: (len(n) < 6, len(n)))
    emails, seen = [], set()
    for r in rs_sorted:
        for e in r["emails"]:
            if e["email"] not in seen: seen.add(e["email"]); emails.append(e)
    phones, seen = [], set()
    for r in rs_sorted:
        for p in r["phones"]:
            if p["e164"] not in seen: seen.add(p["e164"]); phones.append(p)
    persone = []
    for r in rs_sorted:
        for p in r["persone"]:
            if not any((p["email"] and p["email"] == q["email"]) or (p["linkedin"] and p["linkedin"] == q["linkedin"]) or
                       (p["nome"] and q["nome"] and p["cognome"] and q["cognome"] and _n(p["nome"])==_n(q["nome"]) and _n(p["cognome"])==_n(q["cognome"])) for q in persone):
                persone.append(dict(p))
    tail = best([owner_from_tail(r["azienda"]) for r in rs])
    if tail and not any(p["nome"] for p in persone):
        # nella ragione sociale italiana l'ordine è spesso COGNOME Nome: tengo il nome completo senza spezzarlo
        persone.append({"nome": tail, "cognome": None, "titolo": "Titolare (da ragione sociale)", "email": None, "linkedin": None})
    # titolare principale
    tit = None
    if persone:
        tit = sorted(persone, key=lambda p: (-title_score(p["titolo"]), 0 if p["email"] else 1, 0 if p["nome"] else 1))[0]
    g = dict(
        azienda=azienda, name_key=name_key(azienda), azienda_alias="; ".join(sorted({n for n in names if n != azienda})[:4]) or None,
        emails=emails, phones=phones, persone=persone, titolare=tit,
        sito=best([r["sito"] for r in rs_sorted]), li_azienda=best([r["li_azienda"] for r in rs_sorted]),
        fb=best([r["fb"] for r in rs_sorted]), ig=best([r["ig"] for r in rs_sorted]),
        indirizzo=best([r["indirizzo"] for r in rs_sorted]), citta=best([r["citta"] for r in rs_sorted]),
        prov=best([r["prov"] for r in rs_sorted]), provincia=best([r["provincia"] for r in rs_sorted]), regione=best([r["regione"] for r in rs_sorted]),
        cap=best([r["cap"] for r in rs_sorted]), paese=best([r["paese"] for r in rs_sorted if r["paese"] in ("IT","EST")]) or best([r["paese"] for r in rs_sorted]),
        categoria=best([r["categoria"] for r in rs_sorted]), categorie="; ".join(sorted({c for r in rs for c in str(r["categorie"] or "").split("; ") if c}))[:300] or None,
        rating=best([r["rating"] for r in rs_sorted]), recensioni=max([r["recensioni"] or 0 for r in rs]) or None,
        place_id=best([r["place_id"] for r in rs]), cid=best([r["cid"] for r in rs]), chiuso=any(r["chiuso"] for r in rs),
        note="; ".join(sorted({str(r["note"]) for r in rs if r["note"]})) or None,
        fonti=sorted({r["source"].split("|")[0] for r in rs}), source_ids=[r["source_id"] for r in rs], n_fonti_righe=len(rs),
        tipo_scraper=rs_sorted[0]["tipo_scraper"],
    )
    g["geo_da_prefisso"] = False
    if not g["prov"]:
        for p in g["phones"]:
            if p["tipo"] == "FISSO":
                k = prov_from_landline(p["e164"])
                if k: g["prov"], g["provincia"], g["regione"], g["geo_da_prefisso"] = k, PROV[k][0], PROV[k][1], True; break
    if g["prov"] and not g["regione"]: g["regione"] = PROV[g["prov"]][1]
    if g["prov"] and not g["provincia"]: g["provincia"] = PROV[g["prov"]][0]
    if not g["paese"] and (g["prov"] or any(p["tipo"] in ("MOBILE","FISSO","VERDE") for p in g["phones"])): g["paese"] = "IT"
    golden.append(g)

# segnale Meta Ads: match esatto sul name_key, oppure fuzzy SEVERO (token_sort ≥ 93, nome ≥ 8 caratteri). Salvo la pagina trovata.
ads_map = ads_keys; ads_list = list(ads_map.keys())
for g in golden:
    hit = ads_map.get(g["name_key"])
    if not hit and len(g["name_key"]) >= 8:
        m = process.extractOne(g["name_key"], ads_list, scorer=fuzz.token_sort_ratio, score_cutoff=93)
        # accetto il fuzzy solo se entrambi i nomi hanno >=2 parole (evita 'energeia' ~ 'energia') oppure se è quasi identico
        # accetto solo se entrambi hanno >=2 parole E almeno una parola DISTINTIVA (non 'solar/energia/impianti'), oppure quasi identici
        distintivo = len(name_key_loose(g["azienda"])) >= 5 and len(name_key_loose(m[0])) >= 5 if m else False
        if m and (((len(g["name_key"].split()) >= 2 and len(m[0].split()) >= 2) and distintivo) or m[1] >= 97): hit = ads_map[m[0]]
    if not hit and "FB ADS: SI" in (g["note"] or ""): hit = "(segnato SI in FOGLIO5)"
    g["fb_ads"] = bool(hit); g["fb_ads_pagina"] = hit

# ----------------------------------------------------------------------------
# 8. Classificazione: scarto, contatti, tier, bucket
# ----------------------------------------------------------------------------
def pick(g):
    mob = [p["e164"] for p in g["phones"] if p["tipo"] == "MOBILE"]
    fis = [p["e164"] for p in g["phones"] if p["tipo"] == "FISSO"]
    ver = [p["e164"] for p in g["phones"] if p["tipo"] == "VERDE"]
    valid = [e for e in g["emails"] if e["tipo"] not in ("INVALIDA","USA_GETTA","PEC")]
    nomin = [e for e in valid if is_nominativa(e)]
    gener = [e for e in valid if e["tipo"] == "GENERICA"]
    pec = [e["email"] for e in g["emails"] if e["tipo"] == "PEC"]
    # coerenza email-azienda: nominativa aziendale il cui dominio non c'entra con sito/nome -> sospetta (in coda)
    dk = domain_key(g["sito"])
    def coerente(e):
        if e["tipo"] != "NOMINATIVA_AZIENDALE": return True
        ed = domain_key(e["dominio"])
        if not ed: return True
        if dk and (ed == dk or ed.split(".")[0] == dk.split(".")[0]): return True
        if not dk: return True
        return False
    nomin = sorted(nomin, key=lambda e: (0 if coerente(e) else 1, 0 if e["tipo"] == "NOMINATIVA_AZIENDALE" else 1))
    tit = g["titolare"]
    tit_email = tit["email"] if tit and tit.get("email") else None
    if tit_email and tit_email in [e["email"] for e in nomin]:
        nomin = [e for e in nomin if e["email"] == tit_email] + [e for e in nomin if e["email"] != tit_email]
    return dict(mobile=mob, fisso=fis, verde=ver, nomin=nomin, gener=gener, pec=pec, sospette=[e["email"] for e in nomin if not coerente(e)])

rows_master, rows_scarti, rows_persone = [], [], []
sb = 0
def tier(g, c):
    s = 0
    if g["sito"]: s += 1
    rv = g["recensioni"] or 0
    s += 2 if rv >= 20 else (1 if rv >= 5 else 0)
    if (g["rating"] or 0) >= 4.5 and rv >= 5: s += 1
    if g["fb_ads"]: s += 3
    if c["mobile"]: s += 1
    if c["nomin"]: s += 1
    if re.search(r"fotovoltaic|solar", _n((g["categoria"] or "") + " " + g["azienda"])): s += 1
    s += min(GEO_PRIORITY.get(g["regione"] or "", 0), 2)
    return ("A" if s >= 7 else "B" if s >= 4 else "C"), s

for g in sorted(golden, key=lambda g: (g["regione"] or "zz", g["provincia"] or "zz", g["azienda"].lower())):
    c = pick(g)
    motivo = scarta(g)
    has_email = bool(c["nomin"] or c["gener"])
    has_social = bool(g["li_azienda"] or g["fb"] or g["ig"] or any(p["linkedin"] for p in g["persone"]))
    if motivo is None and not has_email and not c["mobile"] and not c["fisso"] and not has_social:
        motivo = "0 dati di contatto (né email, né telefono, né social)" if not g["sito"] else "solo sito web, nessun contatto diretto"
    if motivo is None and not has_email and not c["mobile"] and not c["fisso"] and has_social and not g["sito"] and not g["prov"]:
        motivo = "solo social senza geo né sito (incompleto)"
    if motivo is None:
        if c["nomin"] or c["gener"]:
            base = "1_EMAIL" if not c["mobile"] else "2_EMAIL+MOBILE"
            bucket = base + ("_TITOLARE" if c["nomin"] else "_GENERICA")
        elif c["mobile"]: bucket = "3_SOLO_MOBILE"
        elif c["fisso"]: bucket = "4_SOLO_FISSO"
        else: bucket = "5_SOLO_SOCIAL"
    else:
        bucket = "6_SCARTI"
    t, score = tier(g, c) if motivo is None else (None, None)
    sb += 1
    id_sb = f"SB-{sb:05d}"
    tit = g["titolare"] or {}
    row = {
        "ID_SB": id_sb, "BUCKET": bucket, "ICP_TIER": t, "ICP_SCORE": score, "AZIENDA": g["azienda"], "ALIAS_NOMI": g["azienda_alias"],
        "TITOLARE_NOME": tit.get("nome"), "TITOLARE_COGNOME": tit.get("cognome"), "TITOLARE_RUOLO": tit.get("titolo"),
        "TITOLARE_EMAIL": tit.get("email"), "TITOLARE_LINKEDIN": tit.get("linkedin"),
        "EMAIL_1": c["nomin"][0]["email"] if c["nomin"] else (c["gener"][0]["email"] if c["gener"] else None),
        "EMAIL_1_TIPO": c["nomin"][0]["tipo"] if c["nomin"] else (c["gener"][0]["tipo"] if c["gener"] else None),
        "EMAIL_2": (c["nomin"][1:] + c["gener"])[0]["email"] if (c["nomin"][1:] + c["gener"]) else None,
        "EMAIL_3": (c["nomin"][1:] + c["gener"])[1]["email"] if len(c["nomin"][1:] + c["gener"]) > 1 else None,
        "EMAIL_TUTTE": " | ".join(e["email"] for e in c["nomin"] + c["gener"]) or None,
        "EMAIL_SOSPETTE": " | ".join(c["sospette"]) or None, "PEC": " | ".join(c["pec"]) or None,
        "MOBILE_1": c["mobile"][0] if c["mobile"] else None, "MOBILE_2": c["mobile"][1] if len(c["mobile"]) > 1 else None,
        "FISSO_1": c["fisso"][0] if c["fisso"] else None, "FISSO_2": c["fisso"][1] if len(c["fisso"]) > 1 else None,
        "NUMERO_VERDE": c["verde"][0] if c["verde"] else None, "TEL_TUTTI": " | ".join(p["e164"] + f" ({p['tipo']})" for p in g["phones"]) or None,
        "HA_WHATSAPP": "SI" if c["mobile"] else "NO",
        "CITTA": g["citta"], "PROVINCIA": g["provincia"], "SIGLA": g["prov"], "REGIONE": g["regione"], "CAP": g["cap"], "INDIRIZZO": g["indirizzo"], "PAESE": g["paese"],
        "SITO": g["sito"], "LINKEDIN_AZIENDA": g["li_azienda"], "FACEBOOK": g["fb"], "INSTAGRAM": g["ig"],
        "CATEGORIA": g["categoria"], "CATEGORIE_TUTTE": g["categorie"], "RATING_GOOGLE": g["rating"], "N_RECENSIONI": g["recensioni"],
        "FB_ADS_ATTIVE": "SI" if g["fb_ads"] else "NO", "FB_ADS_PAGINA": g.get("fb_ads_pagina"), "GEO_PRIORITA": GEO_PRIORITY.get(g["regione"] or "", 0),
        "GEO_DA_PREFISSO": "SI" if g.get("geo_da_prefisso") else "NO",
        "N_PERSONE": len(g["persone"]), "FONTI": ", ".join(g["fonti"]), "N_RIGHE_FUSE": g["n_fonti_righe"], "SOURCE_IDS": " | ".join(g["source_ids"]),
        "NOTE": g["note"], "MOTIVO_SCARTO": motivo,
    }
    (rows_scarti if motivo else rows_master).append(row)
    for p in g["persone"]:
        rows_persone.append({"ID_P": None, "ID_SB": id_sb, "AZIENDA": g["azienda"], "NOME": p["nome"], "COGNOME": p["cognome"], "RUOLO": p["titolo"],
                             "EMAIL": p["email"], "EMAIL_TIPO": (classify_email(p["email"]) or {}).get("tipo") if p["email"] else None,
                             "LINKEDIN": p["linkedin"], "E_TITOLARE_PRINCIPALE": "SI" if tit and p is g["titolare"] else "NO",
                             "AZIENDA_IN": "MASTER" if not motivo else "SCARTI", "PROVINCIA": g["provincia"], "REGIONE": g["regione"]})
for i, p in enumerate(rows_persone, 1): p["ID_P"] = f"P-{i:05d}"

master = pd.DataFrame(rows_master); scarti = pd.DataFrame(rows_scarti); persone = pd.DataFrame(rows_persone)
# contatti CONDIVISI tra aziende diverse (non fuse per prudenza): segnalo con chi, così non li contatti due volte
share = defaultdict(set)
for col in ("MOBILE_1", "MOBILE_2", "FISSO_1", "FISSO_2", "EMAIL_1", "EMAIL_2"):
    for val, grp in master.groupby(col)["ID_SB"]:
        if val and len(grp) > 1:
            for i in grp: share[i] |= (set(grp) - {i})
master["CONDIVIDE_CONTATTO_CON"] = master["ID_SB"].map(lambda i: ", ".join(sorted(share[i])) if i in share else None)
master["POSSIBILE_DOPPIONE"] = master["CONDIVIDE_CONTATTO_CON"].map(lambda v: "SI" if (v is not None and not (isinstance(v, float) and pd.isna(v)) and str(v).strip()) else "NO")
log["possibili_doppioni_segnalati"] = int((master["POSSIBILE_DOPPIONE"] == "SI").sum())
# ordinamento: tier A prima, poi geo priorità, poi recensioni
master["_t"] = master["ICP_TIER"].map({"A":0,"B":1,"C":2})
master = master.sort_values(["BUCKET","_t","GEO_PRIORITA","N_RECENSIONI"], ascending=[True,True,False,False]).drop(columns="_t")

# ----------------------------------------------------------------------------
# 9. Export
# ----------------------------------------------------------------------------
TABS = ["1_EMAIL_TITOLARE","1_EMAIL_GENERICA","2_EMAIL+MOBILE_TITOLARE","2_EMAIL+MOBILE_GENERICA","3_SOLO_MOBILE","4_SOLO_FISSO","5_SOLO_SOCIAL"]
counts = {t: int((master["BUCKET"] == t).sum()) for t in TABS}
counts["6_SCARTI"] = len(scarti)
log.update({"aziende_uniche_totali": len(golden), "in_master": len(master), "in_scarti": len(scarti), "persone": len(persone), "per_tab": counts,
            "fusioni_totali": len(merge_log), "regole_fusione": dict(pd.Series([m[2].split(" (")[0] for m in merge_log]).value_counts()),
            "motivi_scarto": dict(scarti["MOTIVO_SCARTO"].value_counts()) if len(scarti) else {},
            "tier": dict(master["ICP_TIER"].value_counts()) if len(master) else {}, "regioni_master": dict(master["REGIONE"].value_counts().head(12)) if len(master) else {},
            "fb_ads_attive_in_master": int((master["FB_ADS_ATTIVE"] == "SI").sum()) if len(master) else 0,
            "email_nominative_in_master": int(master["EMAIL_1_TIPO"].isin(["NOMINATIVA_AZIENDALE","FREEMAIL"]).sum()) if len(master) else 0,
            "con_mobile_in_master": int((master["HA_WHATSAPP"] == "SI").sum()) if len(master) else 0})

xlsx = os.path.join(OUT, "LISTA_TARGET_SOLARBACK.xlsx")
with pd.ExcelWriter(xlsx, engine="openpyxl") as w:
    readme = pd.DataFrame({"LISTA TARGET SOLARBACK — come leggerla": [
        "1 riga = 1 azienda (Contatto). ID_SB = identificativo unico. Tab per tipo di contatto disponibile.",
        "1_EMAIL_TITOLARE = email nominativa (persona) e NESSUN mobile (può avere fisso) -> campagna email Instantly, priorità.",
        "1_EMAIL_GENERICA = solo email generiche (info@...) e nessun mobile -> campagna email separata.",
        "2_EMAIL+MOBILE_* = email + cellulare (WhatsApp) -> email + cold call.",
        "3_SOLO_MOBILE = solo cellulare -> cold call / WhatsApp (dopo consenso).  4_SOLO_FISSO = solo fisso -> chiamata mattina.",
        "5_SOLO_SOCIAL = solo LinkedIn/Facebook/Instagram -> DM da profilo personale.  6_SCARTI = fuori target/spazzatura, con MOTIVO (recuperabili).",
        "PERSONE = tutti i titolari/contatti persona trovati, collegati all'ID_SB. MASTER = tutto insieme.",
        "ICP_TIER A/B/C = punteggio su segnali pubblici (ads attive, recensioni, rating, sito, mobile, email nominativa, geo). Parti dalla A.",
        "FB_ADS_ATTIVE = SI se la pagina compare nella Meta Ads Library per 'fotovoltaico' (investe già in marketing = segnale ICP forte).",
        "EMAIL_1_TIPO: NOMINATIVA_AZIENDALE (nome@azienda) · FREEMAIL (gmail/libero del titolare) · GENERICA (info@). PEC mai per cold email (Garante).",
        "EMAIL_SOSPETTE = email nominativa con dominio incoerente con l'azienda (probabile errore dello scraper): verificare prima di usarla.",
        "Storico chiamate precedente IGNORATO per scelta CEO: ogni Contatto è nuovo.",
        f"Generato: {pd.Timestamp.now():%Y-%m-%d %H:%M}. Righe grezze in ingresso: {log['righe_grezze_totali']}. Aziende uniche: {len(golden)}. In MASTER: {len(master)}. In SCARTI: {len(scarti)}.",
    ]})
    readme.to_excel(w, sheet_name="LEGGIMI", index=False)
    master.to_excel(w, sheet_name="MASTER", index=False)
    for t in TABS:
        master[master["BUCKET"] == t].to_excel(w, sheet_name=t, index=False)
    scarti.to_excel(w, sheet_name="6_SCARTI", index=False)
    persone.to_excel(w, sheet_name="PERSONE", index=False)
    pd.DataFrame(merge_log, columns=["SOURCE_ID_A","SOURCE_ID_B","REGOLA"]).to_excel(w, sheet_name="LOG_FUSIONI", index=False)
    # formattazione leggera
    for ws in w.book.worksheets:
        ws.freeze_panes = "B2"
        for cell in ws[1]:
            cell.font = cell.font.copy(bold=True)
        for col in ws.columns:
            width = min(max(10, max((len(str(c.value)) if c.value is not None else 0) for c in col[:200]) + 2), 45)
            ws.column_dimensions[col[0].column_letter].width = width
master.to_csv(os.path.join(OUT, "LISTA_TARGET_MASTER.csv"), index=False)
scarti.to_csv(os.path.join(OUT, "SCARTI.csv"), index=False)
persone.to_csv(os.path.join(OUT, "PERSONE.csv"), index=False)
with open(os.path.join(OUT, "LOG.json"), "w") as f: json.dump(log, f, ensure_ascii=False, indent=2, default=str)
print(json.dumps(log, ensure_ascii=False, indent=1, default=str))
print("\nOUTPUT:", xlsx)
