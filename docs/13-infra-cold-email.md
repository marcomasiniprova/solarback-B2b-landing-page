# 13 — Infrastruttura Cold Email B2B (setup, costi, timeline)

> Obiettivo: motore cold email outbound per SolarBack. ~100 email/gg personalizzate.
> Piattaforma di invio = **Instantly AI**. Domini + caselle = **di proprietà di Valerio**
> (NO domini pre-warmed, NO reseller domini/inbox di Instantly: vincolo CEO).
> Piano CEO: **2 domini × 3 inbox = 6 caselle**, warmup 14 giorni.
> Ricerca 2025-2026 (fonti in fondo). **Sessione 2026-09-06.**

## TL;DR (i numeri che contano)
- Il piano **è giusto e conservativo**: 6 inbox × ~17 email/gg = 100/gg → **sotto** i limiti
  di sicurezza (le 6 inbox reggono 120-180/gg). Hai margine, non tirare troppo all'inizio.
- **Costo realistico a regime: ~€80-95/mese.** Upfront per partire su billing mensile:
  **~€110-130.** (Annuale prepagato: ~€945 per l'anno → ~€78/mese effettivi.)
- **Prima email cold sicura: ~giorno 16-17** (il warmup di 14 gg è il vincolo).
- La config manuale SPF/DKIM/DMARC **NON è difficile, è "fiddly"**: ~afternoon di lavoro
  (2,5-3h per 2 domini). L'unico punto delicato è il **DKIM**.

## 0. RUNBOOK — cosa fare OGGI (Giorno 1)
> ⚠️ Queste sono **raccomandazioni dell'agente da confermare col CEO**, NON scelte già prese:
> **Instantly Growth · geo Lombardia→Veneto→Emilia · lista scraping+CSV · domini .it**.
> Confermato dal CEO: GWS + DNS manuale, 2 domini × 3 inbox, no pre-warmed/reseller, registrar
> IONOS. Segui gli step in ordine; i record DNS sono pronti: sostituisci `TUODOMINIO.it`.

**A) Compra 2 domini** (su **IONOS**, il registrar di Valerio — va benissimo: è solo
registrar/DNS, l'email resta Google; nessun impatto sulla deliverability. Cloudflare sarebbe
solo un filo più comodo/economico, non vale cambiare). Consigliato **.it** (fiducia coi
target IT; deliverability ~identica al .com se autenticato). Candidati (variazione del brand,
**NON** il dominio primario di SolarBack):
`getsolarback.it` · `solarbackpartners.it` · `solarback-agency.it` · `provasolarback.it` ·
`scelgosolarback.it` · `solarbackenergia.it`. **Prendine 2.**
→ Imposta **redirect 301** dei 2 domini cold verso il sito reale di SolarBack.

**B) Crea 2 Google Workspace** (1 per dominio), **3 utenti/caselle ciascuno**. Nomi umani,
es. `valerio@`, `commerciale@`, `partner@`. Business Starter, ~€6,90/utente/mese (+IVA).

**C) DNS per OGNI dominio** (nel pannello del registrar). Copia-incolla:
```
# MX (ricevere risposte)
Tipo MX    Host @              Valore smtp.google.com                 Priorità 1
# SPF (un solo record TXT!)
Tipo TXT   Host @              Valore v=spf1 include:_spf.google.com ~all
# DMARC (parti in monitor)
Tipo TXT   Host _dmarc         Valore v=DMARC1; p=none; rua=mailto:dmarc@TUODOMINIO.it; adkim=r; aspf=r; pct=100
# DKIM: NON inventarlo. Generalo in Google Admin (step D) e incolla il valore che ti dà Google:
Tipo TXT   Host google._domainkey   Valore v=DKIM1; k=rsa; p=<CHIAVE-LUNGA-DA-GOOGLE>
# Tracking domain (il target lo dà Instantly nelle sue impostazioni)
Tipo CNAME Host track          Valore <target-da-Instantly>
```

**D) DKIM in Google Admin Console** (per ogni dominio): Apps → Google Workspace → Gmail →
Authenticate email → **Generate new record (2048-bit)** → copia host+valore nel DNS (step C)
→ ⚠️ **torna in Admin e clicca "Start authentication".** (Senza questo click il DKIM è spento.)

**E) Verifica** (dopo 1-48h di propagazione): controlla SPF/DKIM/DMARC su **MXToolbox**.

**F) Instantly:** sottoscrivi **Growth ($47/mese)** → **Settings → Integrations → API →
genera API key** (poi me la passi, così piloto io). Imposta il **tracking domain** custom.

**G) Collega le 6 caselle a Instantly via OAuth** (~15 min, ti guido: §7). NON delegabile all'API.

**H) Tocca a me:** accendo il **warmup** su tutte e 6 (14gg), preparo campagne+sequenze, e —
in parallelo, già in corso — costruisco la **lista Tier-1 Lombardia**. A warmup finito (~gg 16)
partiamo a volume basso e rampiamo.

---

## 1. Google Workspace — prezzo e la "trappola alias"
- **Business Starter, Italia 2026:** €6,90/utente/mese (flexible, disdici quando vuoi)
  oppure **€69/utente/anno = €5,75/mese** (impegno 12 mesi, -16%). **IVA 22% esclusa** →
  reale ≈ €8,42/utente/mese flexible, €7,02 annuale.
- **3 inbox di invio = 3 utenti pagati.** Non c'è scorciatoia: ogni casella di invio reale
  = 1 utente a pagamento. **6 inbox = 6 utenti.**
- ⚠️ **Gli alias NON sono inbox separate.** Un alias inoltra e invia *dalla stessa*
  mailbox: userebbe una sola reputazione → distrugge la strategia multi-inbox. Per il cold
  servono **caselle indipendenti** (reputazione, warmup, limiti separati) = 1 utente ciascuna.
- **Architettura consigliata:** 2 Workspace SEPARATI (3 utenti l'uno, 1 per dominio),
  non 1 Workspace con dominio secondario. Stesso costo, ma isola il rischio: se Google
  sospende un Workspace per "outbound sales", l'altro dominio continua a inviare.
- Alternative: **Microsoft 365** (prezzo simile, buona delivery) ok come mix; **Zoho**
  (~€1/utente) SOLO come backup — da Zoho il cold finisce spesso in spam. → **Resto su
  Google** per queste 6 caselle: il premio di deliverability vale a questa scala.

## 2. Domini
- **.com** = scelta migliore per deliverability, rinnovo ~€8-15/anno (Cloudflare/NameSilo/
  Spaceship i più economici e con DNS comodo). **.it** ~€7-12/anno (ok per brand italiano,
  rassicura i prospect IT, filtri lo fidano un filo meno del .com). **.co = da evitare**
  (rinnovo ~€25-30).
- **Best practice:**
  1. **Mai fare cold dal dominio brand primario** (se si brucia, va giù anche il sito/email reali).
  2. **Variazione riconoscibile del brand**, non stringhe a caso. Es. per `solarback.it` →
     `getsolarback.com`, `solarback-partners.com`, `trysolarback.com`, `solarbackhq.com`.
     TLD strani (.xyz/.top/.click) = segnale spam.
  3. **Redirect 301** del dominio cold → sito principale (un dominio cold "vuoto" sembra spam).
  4. **1 dominio = 1 scopo** (i domini cold separati dal dominio del sito).
- **3 inbox/dominio è SICURO** (è lo standard consigliato; alcuni spingono a 5). Il piano
  del CEO è corretto, non aggressivo.

## 3. Autenticazione DNS manuale (SPF/DKIM/DMARC/MX/tracking)
**Davvero difficile? NO.** È copia-incolla di ~4-5 record nel pannello DNS, per dominio.
Spaventa il gergo, non la difficoltà. L'unico step error-prone è il **DKIM**.

- **SPF** = lista pubblica di CHI può inviare a nome del tuo dominio.
- **DKIM** = firma crittografica su ogni email (prova che è tua e non manomessa). Il più forte.
- **DMARC** = la policy che dice al destinatario cosa fare se SPF/DKIM falliscono + dove
  mandare i report. È ciò che Google/Yahoo dal feb 2024 **pretendono**.

**Perché obbligatorio ora:** da feb 2024 Google+Yahoo+Microsoft richiedono SPF+DKIM+DMARC
a tutti; spam-complaint < 0,30% (target ≤0,10%), bounce < 2%, unsubscribe 1-click per bulk.
Niente autenticazione = spam o rifiuto diretto.

**Passi per dominio (nel pannello DNS del registrar, DKIM nella Admin Console Google):**
1. **MX** (per ricevere le risposte): `MX`, host `@`, valore `smtp.google.com`, priorità `1`.
2. **SPF** (un solo record TXT per dominio):
   `TXT  @  v=spf1 include:_spf.google.com ~all` (usa `~all`, poi `-all` a regime).
3. **DKIM** (occhio ai 2 passi):
   - Admin Console → Apps → Gmail → Authenticate email → **Generate new record** (2048-bit).
   - In DNS: `TXT  google._domainkey  v=DKIM1; k=rsa; p=<chiave-lunga>`.
   - ⚠️ **Torna in Admin Console e clicca "Start authentication".** Saltare questo click è
     il motivo #1 per cui il DKIM non funziona in silenzio.
4. **DMARC** (parti in monitor): `TXT  _dmarc  v=DMARC1; p=none; rua=mailto:dmarc@dominio; adkim=r; aspf=r; pct=100`.
   Tieni `p=none` per le prime settimane; MAI `p=reject` subito.
5. **Tracking domain custom** (CNAME): `CNAME  track  <target che dà Instantly>` → poi
   incolla `track.getsolarback.com` nelle impostazioni Instantly e verifica. Uno per dominio.
   (Serve a NON usare il tracker condiviso di Instantly, che porta la cattiva reputazione altrui.)

**Ordine/tempi:** SPF+DKIM prima, lascia autenticare ≥48h, poi DMARC. Propagazione 1-48h
(<1h su Cloudflare). Verifica con MXToolbox / checker Google.
**Tempo founder non tecnico (2 domini):** ~1,5-2h il primo, ~30-40min il secondo → **~2,5-3h**.

**Errori che uccidono la deliverability:** dimenticare "Start authentication" del DKIM;
2 record SPF (ne va 1 solo); DMARC `p=reject` troppo presto; inviare cold prima di 48h da
SPF/DKIM; usare il dominio brand primario; niente tracking domain; saltare/accelerare il
warmup (raddoppiare i volumi giorno su giorno = flag); niente redirect del dominio cold.

## 4. Warmup
- **Come funziona:** il tool invia piccoli volumi di email "seed" tra inbox reali che si
  aprono/rispondono/tolgono da spam a vicenda → fabbrica i segnali di engagement che
  Gmail/Outlook usano per dare reputazione, PRIMA di inviare cold.
- **Perché 14 gg minimo:** a 14 gg hai 2 settimane di storia pulita = baseline minima.
  Partire cold a giorno 5-7 → ~40-50% inbox vs 70-85% con warmup pieno. **Warmup sempre ON**
  anche durante le campagne.
- **Volume sicuro post-warmup:** ~**20-30/inbox/gg** (i prudenti stanno a 20). Le 6 inbox:
  conservativo 120/gg, standard 150/gg, tetto sicuro 180/gg. Il target **100/gg = ~17/inbox
  → comodo, sotto i limiti**, con spazio per crescere.
- **Instantly include il warmup illimitato** in tutti i piani Outreach, gratis. Non serve
  un tool di warmup separato.

## 5. Costo — shopping list (2026, EUR)
| Voce | Q.tà | Prezzo | Mensile (flexible) | Annuale (impegno) |
|---|---|---|---|---|
| Google Workspace Business Starter | 6 utenti | €6,90/mese o €69/anno | €41,40 (+IVA = **€50,51**) | €414/anno (+IVA ≈ **€42/mese**) |
| Instantly — piano Growth (5k email/mese, inbox illimitate, warmup incluso) | 1 | $47/mese o $37,60/mese annuale | ~**€43/mese** | ~**€35/mese** (~€415/anno) |
| Domini (2 × .com, o .com+.it) | 2 | ~€8-15/anno l'uno | ~€2/mese | **€16-30/anno** |

- **Mensile a regime: ≈ €80-95/mese.**
- **Upfront per partire (billing mensile): ≈ €110-130.**
- **Annuale prepagato (sconti): ≈ €945 per l'anno → ~€78/mese effettivi.**
- **Consiglio:** parti **mensile** (niente vincoli sulla prima campagna); passa ad annuale
  DOPO che la prima campagna ha funzionato, per prendere gli sconti 16-20%.

## 6. Timeline (compro domini oggi = Giorno 1 → prima cold ~Giorno 16-17)
| Giorno | Azione |
|---|---|
| **1 (oggi)** | Compra 2 domini (variazione brand). Crea 2 Workspace (3 utenti l'uno). Redirect 301 domini cold → sito. In DNS: MX, SPF, DMARC(`p=none`). In Admin: genera DKIM 2048 + record + **Start authentication**. Aggiungi CNAME tracking. |
| **1-2** | Propagazione DNS (1-48h). **Verifica** tutti i record (MXToolbox/Google). DKIM su "authenticating". |
| **2-3** | Foto profilo, nome reale, firma pulita sulle 6 caselle. Collega le 6 inbox a Instantly; imposta il tracking domain in Instantly; **warmup ON** su tutte e 6. |
| **3-16 (warmup 14 gg)** | Warmup automatico (2-3/inbox/gg → 15-20/inbox/gg). **NON inviare cold.** Sfrutta la finestra: costruisci la **lista lead**, scrivi + A/B il **copy**, imposta le sequenze. Manda qualche email vera a contatti "caldi" da ogni casella. |
| **~16-17** | SPF/DKIM live da >48h. **Parti cold a volume BASSO: 10-15/inbox/gg (~60-90/gg totali).** Warmup resta ON. |
| **17-24** | Rampa graduale (mai raddoppiare gg su gg) → ~17-20/inbox/gg = target 100/gg entro ~gg 22-24. Monitora spam-complaint (<0,10%) e bounce (<2%). |
| **Ongoing** | Warmup sempre ON. Solo a delivery stabile, stringi DMARC a `p=quarantine`. Aggiungi domini/inbox per scalare oltre 150-180/gg. |

## Flag onesti per l'operatore
- **100/gg è conservativo**, non aggressivo — non farti tentare dall'over-send iniziale.
- **Google può sospendere Workspace "outbound sales"** senza preavviso → 2 Workspace separati
  contengono il danno; il dominio brand primario resta fuori del tutto.
- **DKIM "Start authentication" + regola SPF-record-unico** = le cause #1 di setup falliti.

## 7. Instantly — free trial, API, connettore (ricerca 2026)
**Bottom line:** sul **free trial NON si fa il setup di produzione**: il trial è limitato a
**2 caselle** (tu ne vuoi 6). Per le 6 inbox serve **Growth ($47/mese)**. L'agente (io) può
fare quasi tutto via API/Composio, **tranne** collegare le caselle Google (OAuth = click umano).

### Piani e prezzi (USD, modulo Email Outreach)
| Piano | $/mese | $/mese annuale | Email/mese | Contatti caricabili | Inbox | Warmup |
|---|---|---|---|---|---|---|
| **Growth** | **$47** | $37,60 | 5.000 | 1.000 | illimitate | incluso illimitato |
| Hypergrowth | $97 | $77,60 | 100k+ | 25.000 | illimitate | incluso |
| Light Speed | $358 | $286 | 500k+ | 100.000+ | illimitate | incluso |

- **Ti basta GROWTH** per ~100 email/gg (~3.000/mese, dentro il tetto 5.000; inbox illimitate).
- ⚠️ **Due cose che potrebbero spingerti a Hypergrowth prima:** (1) Growth carica solo **1.000
  contatti** attivi (nel cold si bruciano in fretta → liste grosse = Hypergrowth 25k); (2) i
  **webhook real-time** (per far entrare risposte/appuntamenti LIVE in n8n) secondo più fonti
  richiedono **Hypergrowth** — la pagina prezzi dice "tutti i piani": **da verificare in-app**.
- ⚠️ **Costo nascosto:** il **Lead Database** di Instantly (per trovare le liste) è un
  abbonamento SEPARATO ($47-197/mese). Se carichi le liste da **CSV/da fuori**, lo eviti.

### Free trial (14 giorni)
- **Carta NON richiesta**, **non si auto-converte** (fonte ufficiale). Vecchie recensioni che
  parlano di addebito automatico = datate/errate.
- **Limiti trial:** **max 2 caselle**, 250 lead/campagna, **1.000 email totali**, 100 crediti.
- **Warmup sul trial: SÌ** (colleghi le caselle e accendi il warmup) ma solo **2 caselle** →
  il warmup vero (6 caselle, 2-4 settimane) **sfora il trial** → va fatto su Growth.

### API (il cuore della tua domanda)
- **API V2** ufficiale (la V1 è deprecata dal 19/1/2026). Auth = Bearer token. Chiave in
  **Settings → Integrations → API**.
- **Disponibile su TUTTI i piani a pagamento (già Growth).** Sul **free trial: non
  documentato** — la chiave forse si genera e funziona *entro* i limiti del trial, ma il tetto
  di **2 caselle rende il trial inadatto** al setup vero. → **La risposta onesta alla tua
  domanda: sul free trial non ti conviene darmi il connettore per il setup di produzione;
  meglio farlo su Growth.**
- **L'API PUÒ:** creare/gestire campagne, caricare lead in bulk, **accendere il warmup**,
  leggere analytics. **L'API NON PUÒ:** collegare una casella Google via **OAuth** (richiede
  il consenso nel browser + fiducia app nella Google Admin Console = **click umano**).

### Connettore in questo ambiente
- **Composio ha il toolkit Instantly (~115 azioni)** — verificato: campagne, lead bulk,
  enable/disable warmup, analytics, inbox placement, gestione API key. Auth = **la tua API
  key**. Quindi: **appena hai Growth + una API key, me la passi e piloto tutto io** (campagne,
  lead, sequenze, warmup), tranne l'OAuth delle inbox.

### Collegare le caselle Google → Instantly (manuale, ~15 min)
1. In **Instantly**: Email Accounts → Add New → Connect existing → Google → **OAuth** → copia
   il **Client ID**.
2. In **Google Admin Console**: Security → API Controls → Manage App Access → Configure new app
   → incolla il **Client ID** → seleziona "Instantly OAuth Email v1" → scope **All users** →
   access **Trusted** → Finish.
3. Torna in Instantly → Login → scegli l'account → Allow.
> OAuth è il metodo giusto (Google da mar/mag 2025 ha ristretto IMAP/basic-auth; le "app
> password" sono in dismissione e sconsigliate per il cold).

### Deliverability secondo Instantly
- **Max 30 email cold/gg per inbox.** Parti a **10-15/gg**, +10-20% finché bounce ≤1%.
- Warmup **≥2 settimane** (caselle nuove), **4 settimane** se il **dominio è nuovo**. Sempre ON.
- Soglie: hard bounce <1%, bounce totale <2% (sopra 2% danneggi, sopra 5% rischi blacklist).

### Divisione dei compiti (umano ↔ agente)
- **Tu, una tantum:** compri domini+Workspace, fai DNS (SPF/DKIM/DMARC), **colleghi le 6
  caselle via OAuth**, sottoscrivi Growth, generi la API key.
- **Io, via API/Composio:** accendo warmup su tutte, creo campagne/sequenze, carico lead,
  leggo analytics, collego a n8n.

## Fonti
Google pricing/EUR (Medha Cloud, EmailToolTester), 101domain (user vs alias), EmailBison
(Google vs M365, secondary domains), devdarren, emailchaser (Zoho), LeadsMonky/Namecheap/
webhostmost (domini), ScaledMail/PuzzleInbox/Maildeck (inbox per dominio), MailReach/DMARCLY/
Google Knowledge/Salesforge (SPF/DKIM/DMARC/tracking), PowerDMARC (requisiti Google/Yahoo),
Mailivery/TenX/EmailBison (warmup), howmanycoldemailsperday/Topo/Woodpecker (limiti+Instantly),
Landbase/coldemailkit (prezzi Instantly). Elenco URL completo nel report della ricerca.
