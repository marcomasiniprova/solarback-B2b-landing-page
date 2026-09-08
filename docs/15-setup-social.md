# 15 — SETUP SOCIAL SolarBack (LinkedIn + Instagram + Facebook)

> **Sostituisce** la vecchia "LinkedIn company page". Documento-madre per allestire e presentare i 3 profili
> social di SolarBack in modo coerente, professionale e "da agenzia vera". FASE ATTUALE = **solo SETUP profili**
> (la strategia contenuti/organic è separata). Fonti: ricerca online 2025-2026 (4 agenti: LinkedIn, IG, FB, brand)
> + posizionamento `docs/03` + offerta `docs/07`. Copy scritto con skill `copywriting-italiano-umano-2026`.
> **Deciso con Valerio (popup 8/9):** LinkedIn = profilo personale "aged" come VOLTO/founder · IG e FB = BRAND SolarBack ·
> FB = ri-brand della Pagina "Artec Soluzioni Italia" · volto = **avatar AI "Valerio"** (video Veo).

---

## 0. Decisioni chiave (leggi prima)

| Piattaforma | Cosa usiamo | Foto profilo | Chi la compila |
|---|---|---|---|
| **LinkedIn** | Profilo personale **aged** = "Valerio, volto/founder di SolarBack" | **Avatar AI "Valerio"** (faccia) | **Io via Unipile API** (quando colleghi l'account LinkedIn) |
| **Instagram** | Account **brand** @solarback.italia (Business) | **Logo SolarBack** | **Tu** (l'API non lo fa) |
| **Facebook** | **Pagina** SolarBack (ri-brand della Pagina Artec) | **Logo SolarBack** | **Tu** (l'API non lo fa) |

**Coerenza (identico ovunque):** logo, palette, tagline, posizionamento, e **lo stesso volto "Valerio"** nei video.
**Si adatta per piattaforma:** il tono (LinkedIn sobrio/autorevole · IG visivo · FB community-locale) e la quantità di emoji.

### ⚖️ Vincolo legale (IMPORTANTE, EU AI Act art. 50, in vigore dal 2/8/2026)
Il volto "Valerio" è generato in AI. La legge europea impone di **dichiarare** i contenuti AI che una persona potrebbe
scambiare per reali. Quindi "Valerio" va presentato in modo pulito come **"volto digitale di SolarBack"**, senza spacciarlo
per una persona fisica. Non serve un bollino su ogni post: basta una dicitura onesta nei profili (vedi copy sotto). Col
pubblico maturo e diffidente verso l'AI questo **aumenta** la fiducia invece di ridurla, ed è in linea con la regola "mai
false promesse".

---

## 1. Il mercato (a chi parliamo, e come lo vuole)

- **Lettore medio:** titolare/decisore di un'azienda installatrice fotovoltaica in Italia, **35-50 anni**, concreto,
  poco social-nativo, vive più su **Facebook + WhatsApp** che su LinkedIn.
- **Stato d'animo:** scettico. Ha già visto agenzie che promettono "lead" e portano perditempo. Diffida della fuffa e
  dell'AI mascherata.
- **Cosa teme:** buttare altri soldi in marketing che non porta clienti veri; legarsi a un fornitore con canone fisso.
- **Cosa desidera davvero:** l'agenda dei commerciali piena di appuntamenti veri, senza rincorrere nessuno.
- **Cosa lo attrae (segnali di fiducia):** numeri concreti, "appuntamenti in agenda" (non "lead"), prova sociale di altri
  installatori, risposta veloce, trasparenza, pagamento a risultato.
- **Cosa lo respinge (red flag):** tono guru, emoji-hype (🚀💰🔥), promesse vaghe, gergo inglese, contratti lock-in,
  "tutto fumo zero prova", contenuto palesemente AI non dichiarato.
- **Insight competitor (ricerca):** le agenzie FV italiane (adsolar.it, 7eyes.it, oxaleads…) sono tutte **corporate-anonime,
  nessuno mette una faccia**. Il nostro asse differenziante è proprio **un volto + prova reale blindata**. Vincono con
  "numeri + appuntamenti non lead + esclusiva di zona": teniamo questi tre.

---

## 2. Sistema visivo (palette, font, logo)

### Palette — allineata a `artecai.it` (dark + oro premium)
Analisi diretta del CSS di artecai.it. Teniamo questa per far sì che sito e social sembrino la stessa azienda.

| Ruolo | HEX | Uso |
|---|---|---|
| Sfondo nero/grafite | `#0B0B0B` | base scura, sfondi banner/loghi |
| Sfondo 2 | `#0E0E0E` / `#121212` | sezioni, card scure |
| **Oro (firma)** | `#D9A441` | accento, CTA, numeri chiave, dettagli logo |
| Oro chiaro | `#EFC97A` | riflessi, gradienti |
| Gradiente oro | `#FFF1C2 → #F0D27A → #D9A441 → #A06C1C` | testo/elementi "premium" |
| Testo bianco caldo | `#F5F2EB` | testo su fondo scuro |
| Tricolore (solo micro-accenti "made in Italy") | verde `#008C45` · rosso `#CD212A` | dettagli minimi, mai dominanti |

Regola: **fondo scuro + oro + bianco caldo**. Il verde/rosso solo come tocco italiano piccolissimo, mai protagonisti
(il verde "eco" dominante è bruciato dal greenwashing: evitarlo come colore principale).

### Tipografia (Google Fonts, gratis, leggibili per 35-50)
- **Default (consigliata):** titoli **Manrope** 800 · testo **Inter** 400/500. Pulita, numeri perfetti per i KPI.
- Alternativa premium/umana: titoli **Fraunces** (serif) · testo **Work Sans** (aggiunge "gravitas" e mano umana,
  utile visto che il volto è AI).
- Max 2 font. Titoli 700-800, testo 400-500. Niente font condensati nei testi lunghi.

### Logo / Marchio
- **Wordmark-led:** il nome "SolarBack" scritto bene è il cuore. Simbolo semplice a fianco/sopra.
- Il "Back" = **ritorno / risultati che tornano** (ROI). Direzioni simbolo: un **arco di ritorno** (che parte e rientra),
  oppure la **"O" di Solar trattata come sole minimale** (una forma geometrica, niente raggi da clipart).
- **Vietato** il look clipart del settore: sole con raggetti, pannello disegnato, gradienti 3D.
- **Monogramma "SB"** in quadrato/cerchio per foto profilo e favicon (funziona a 1:1).
- 1-2 colori: grafite + oro. Endorsement madre facoltativo: "by artec AI" piccolo sotto il wordmark.
- I prompt per generarlo sono nella **sezione 6**.

---

## 3. LINKEDIN — profilo personale "aged" come volto/founder

> Obiettivo: il profilo deve sembrare **una landing page di SolarBack**. Autorevole, professionale, converte.
> Lo compilo **io via Unipile** (headline/about/esperienza/URL dove l'API lo consente); foto, banner e nome
> potresti doverli mettere tu a mano (vedi nota esecuzione in fondo). Tono LinkedIn: sobrio, autorevole, numeri e metodo.
> Emoji: **0-3, funzionali** (▪️ ✅ →), mai faccine né 🚀💰🔥.

> ⚠️ **Nome dell'account aged:** oggi è "Abdellah Hmamsi". Cambiarlo in "Valerio ..." su un account aged è delicato
> (LinkedIn può chiedere verifica). Da fare **con calma, dal dispositivo/IP abituale dell'account**, una volta sola.
> Valuta se tenere un nome credibile e coerente. (Ne parliamo prima di toccarlo.)

### Parametri, uno per uno
- **Nome + Cognome:** il nome del volto ("Valerio" + cognome coerente). → da decidere insieme prima di cambiarlo.
- **Headline (max ~220 char):** è la riga che si legge ovunque. Vende il risultato, non il ruolo.
  - Opzione A: `Aiuto gli installatori fotovoltaici a riempire l'agenda di sopralluoghi qualificati. Si paga a risultato. | Founder SolarBack`
  - Opzione B: `Founder @ SolarBack ▪️ Portiamo sopralluoghi fotovoltaici già qualificati in agenda ai tuoi commerciali ▪️ Paghi solo a risultato`
  - Opzione C: `Riempio l'agenda degli installatori fotovoltaici di appuntamenti veri. Niente liste da rincorrere: paghi a risultato. | SolarBack`
- **Foto profilo:** avatar "Valerio" (vedi prompt sez. 6). Volto, luce morbida, sguardo in camera, leggero sorriso,
  sfondo neutro. Quadrata ≥400×400 (meglio 800×800).
- **Immagine di copertina / banner (1584×396):** landing page. Layout a 3 zone (dettaglio + prompt in sez. 6).
- **Info / Riepilogo (About, max ~2.600 char):** prima riga = gancio (si vede prima del "vedi altro"). Bozza:
  > Gli installatori fotovoltaici bravi hanno tutti lo stesso problema: sanno montare impianti, non riempire l'agenda.
  >
  > Io mi occupo di una cosa sola, e la faccio bene: porto **sopralluoghi qualificati in agenda** ai commerciali degli
  > installatori. Non vendo liste di contatti da rincorrere. Non vendo pubblicità da sperare. Costruisco il reparto
  > acquisizione clienti esterno e lo collego direttamente all'agenda del tuo commerciale.
  >
  > Come lavoriamo in SolarBack:
  > ✅ Si paga solo a risultato. Nessun canone fisso: paghi il sopralluogo quando è stato fatto davvero.
  > ✅ Arriviamo al sopralluogo, non al lead. Le agenzie si fermano al contatto. Noi lo qualifichiamo e te lo mettiamo in agenda.
  > ✅ Un partner per zona. Pochi installatori, in esclusiva sulla loro area.
  >
  > Operativi in 7 giorni. Un obiettivo scritto prima di partire: se non lo raggiungiamo, si continua senza costi aggiuntivi. Il rischio è nostro.
  >
  > Tu pensi agli impianti. All'agenda pensiamo noi.
  >
  > 📩 Scrivimi qui o su WhatsApp +39 327 317 4931.
  > (Valerio è il volto digitale di SolarBack.)
- **Esperienza:** "Founder" @ SolarBack (crea la pagina/azienda o voce testuale), descrizione breve col posizionamento.
- **In evidenza (Featured):** link a artecai.it (titolo neutro "Scopri SolarBack") + eventuale lead magnet / calendly.
- **URL personalizzato:** linkedin.com/in/valerio-solarback (o simile coerente).
- **Sezione Servizi / "Disponibile per":** consulenza acquisizione clienti FV.
- **Competenze:** Lead generation, Advertising, Sales, Fotovoltaico, Cold email.
- **Lingua profilo:** Italiano.
- (Dettagli fini + tricks: rifiniti con la ricerca LinkedIn dedicata, vedi §7.)

---

## 4. INSTAGRAM — @solarback.italia (account BRAND)

> Tono IG: visivo, umano, dietro le quinte. Emoji: **3-5** per caption, funzionali. Foto profilo = **logo**.
> Lo compili **tu** (l'API non modifica il profilo IG).

### Parametri, uno per uno
- **Tipo account:** **Professionale → Business** (NON Creator). Business dà pulsanti azione, categoria, insight, più link.
  Si cambia quando vuoi senza perdere follower.
- **Categoria:** **Agenzia di marketing** (alternativa: Consulente aziendale). NON "energia/solare" (non siamo installatori).
- **Nome (campo indicizzato, max 30 char):** metti brand + keyword che l'installatore cerca.
  - Consigliato: `SolarBack | Sopralluoghi FV` (27)
  - Alt: `SolarBack | Acquisizione FV` (27)
- **Username:** oggi @solarback.italia (ok). Se libero, meglio **@solarback** o **@solarback.it** (combacia col dominio,
  più pulito da dire a voce). Cambiare handle IG è facile e non perde follower: vale la pena provare.
- **Bio (max ESATTO 150 char, contano spazi/emoji/a-capo):** 3 opzioni pronte:
  - **A (consigliata):**
    ```
    Sopralluoghi fotovoltaici qualificati in agenda ai tuoi commerciali.
    Paghi solo a risultato.
    👇 Candidati: pochi partner per zona
    ```
  - **B:**
    ```
    Il reparto acquisizione clienti degli installatori fotovoltaici.
    Zero perditempo, paghi a contratto.
    ✅ Selezione partner aperta
    ```
  - **C (riga unica):**
    ```
    Portiamo sopralluoghi FV qualificati in agenda agli installatori. Paghi a risultato. Scrivici 👇
    ```
- **Foto profilo:** **logo/monogramma SolarBack** (non l'avatar: è un account brand). Carica 1080×1080 PNG, marchio
  centrato, alto contrasto, leggibile in un cerchietto piccolo (niente wordmark lungo).
- **Link in bio:** usa i **link nativi IG (fino a 5)**, non Linktree. Primo link = artecai.it con **titolo neutro**
  "Candidati come partner" (così il dominio "artecai" stona meno). Secondo link = `wa.me/393273174931`.
- **Contatti (pulsanti):** WhatsApp **+39 327 317 4931** + Email **info@artecai.it**. ("Prenota" nativo salta per ora:
  Calendly non è supportato; usiamo WhatsApp.)
- **Story Highlights (6, copertine coerenti):** `Come funziona` · `Risultati` · `Partner` · `Chi siamo` · `FAQ` · `Candidati`.
  Copertine: sfondo grafite, icona a linea singola oro/bianca, stile minimale.
- **Griglia:** prima di ogni outreach, prepara **6-9 post pilastro** coerenti (formato 4:5, 1080×1350) e **fissa 3 post**
  in alto (Chi siamo · Il metodo · Un risultato). Un profilo a 0 post sembra fake.

---

## 5. FACEBOOK — Pagina SolarBack (ri-brand della Pagina "Artec Soluzioni Italia")

> Per il tuo target 35-50 **Facebook è il canale più forte** (ci vivono, con WhatsApp). Usiamo la **PAGINA** (non il
> profilo personale). Ri-brandizziamo quella esistente = teniamo storia, follower e **pixel delle Meta Ads**.
> Il tuo profilo personale "Valerio Alieri" resta **admin** e supporta (condivide, commenta come persona). Lo compili **tu**.
> Tono FB: community/locale, più conversazionale. Emoji: **1-3**.

### Parametri, uno per uno
- **Ri-brand nome Pagina:** da "Artec Soluzioni Italia" → **SolarBack**. (Meta Business Suite → Impostazioni → Info →
  Nome → invia a revisione.) **NON perdi** follower/post/recensioni/pixel. Limiti: nome cambiabile ~1 volta / 60 giorni,
  revisione fino a ~3 giorni. **Prima** aggiorna foto+cover coerenti, POI invia il cambio nome (Meta vede un brand coerente
  e approva più facile). Non cambiare nome+username+categoria nello stesso minuto: spalma su 1-2 giorni.
- **Username/@handle:** **@solarback** (se libero) → **@solarback.it** → @solarback.italia. Si sblocca con Pagina ≥30 giorni
  e ≥25 follower. È di fatto **irreversibile**: scegli definitivo. Tienilo uguale a IG.
- **Categorie (fino a 3):** 1) **Agenzia di marketing** · 2) **Servizio di generazione contatti** · 3) **Consulente aziendale**.
- **Bio breve (~101 char):**
  ```
  Sopralluoghi qualificati in agenda per installatori fotovoltaici. Paghi a risultato. 📍Italia
  ```
- **Descrizione "Informazioni" (~250 char):**
  ```
  SolarBack è il reparto acquisizione clienti esterno per installatori fotovoltaici in Italia.
  Ti portiamo in agenda sopralluoghi con clienti che vogliono davvero il fotovoltaico.
  Niente liste fredde: paghi a risultato. Scrivici su WhatsApp 👇
  ```
- **"Ulteriori informazioni" (estesa):**
  ```
  Sei un installatore fotovoltaico e il problema non è installare, è avere abbastanza clienti giusti?
  SolarBack è il reparto marketing e vendite esterno che riempie la tua agenda di sopralluoghi qualificati:
  appuntamenti con proprietari di casa e aziende realmente interessati, filtrati prima che arrivino a te.
  Come funziona: gestiamo noi la pubblicità e la qualifica dei contatti. Tu ricevi solo persone pronte al sopralluogo.
  Modello a performance: paghi in base ai risultati.
  📲 WhatsApp +39 327 317 4931  ·  🌐 artecai.it  ·  ✉️ info@artecai.it
  ```
- **Foto profilo:** **logo SolarBack** (stesso file di IG). Carica ≥500×500, si vede in cerchio: marchio centrato.
- **Copertina:** carica **1640×624 px** (si vede 820×312 desktop / 640×360 mobile). **Lascia libero l'angolo in basso a
  sinistra** (lì vanno foto profilo + nome su mobile). Contenuto critico nella fascia centrale ~640px. Prompt in §6.
- **Pulsante CTA:** **"Invia messaggio su WhatsApp"** → +39 327 317 4931 (con messaggio precompilato, es.
  "Ciao, sono un installatore FV e voglio più sopralluoghi"). È il canale del tuo target.
- **Sezione Servizi:** "Sopralluoghi qualificati in agenda" · "Campagne a tuo nome (le paghi tu, le gestiamo noi)" ·
  "Qualifica e filtro contatti" · "Modello a performance".
- **Recensioni:** **spente** finché non hai 3-5 recensioni vere di partner. Poi accendile (prova sociale potente).
- **Post fissato:** 1 post "manifesto" (cos'è SolarBack + come funziona + CTA).

---

## 6. PROMPT AI per le immagini (da vero designer)

> Genera con ChatGPT Image / Midjourney / Veo (per l'avatar animato). Palette: grafite `#0B0B0B` + oro `#D9A441` +
> bianco caldo `#F5F2EB`. Testo nelle immagini in **italiano**. Genera più varianti e scegli.

### 6.1 — Logo / Marchio SolarBack (simbolo + wordmark)
```
Minimalist premium B2B logo for a company named "SolarBack". Wordmark-led: the word "SolarBack" in a bold, clean
geometric sans-serif (Manrope ExtraBold style), letter "S" and "B" capitalized. Beside or above the wordmark, a simple
abstract mark that suggests a "return / boomerang arc" (a clean arc that departs and comes back) OR the letter "O"
rendered as a minimal geometric sun (a single circle with a subtle gap, NO cartoon sun rays). Two colors only: warm
gold #D9A441 mark on a deep charcoal #0B0B0B background, wordmark in warm off-white #F5F2EB. Flat vector, high contrast,
lots of negative space, timeless, corporate, premium. NOT clipart, no gradients, no 3D, no solar panel illustration,
no photo. Also output a square monogram version "SB" in a rounded square for profile pictures and favicon.
Deliver on transparent background and on charcoal background. 4 variations.
```

### 6.2 — Foto profilo avatar "Valerio" (LinkedIn + video)
```
Photorealistic professional headshot of a European/Italian man, around 38-45 years old, trustworthy and approachable,
short neat hair, light stubble, wearing a dark quality sweater or a smart shirt (no tie, entrepreneur look). Soft key
light from upper-left, clean neutral studio background in dark graphite (#0B0B0B to #1A1A1A) with a subtle warm gold rim
light. Genuine subtle smile, direct eye contact with the camera, natural realistic skin texture (visible pores, NO
over-retouch, NO plastic skin, NO heavy filter). Shot at 85mm, shallow depth of field. Head-and-shoulders, centered,
framed to read well inside a circle crop. Consistent recurring character (same face every time). Ultra-realistic,
editorial corporate portrait. Square 1:1.
```
> Nota: genera una **face reference** e riusala sempre uguale (stesso volto su LinkedIn, video, ecc.). È il "volto
> digitale di SolarBack": coerenza assoluta.

### 6.3 — Banner LinkedIn (1584 × 396)
```
LinkedIn profile banner, 1584x396 px, premium B2B, dark theme. Background: deep charcoal #0B0B0B with a very subtle
warm gold radial glow on the right. Three-zone layout:
LEFT third: keep almost empty/darker (a profile photo overlaps here) — at most a small gold "SB" monogram top-left.
CENTER: large headline in warm off-white #F5F2EB, bold geometric sans-serif: "Sopralluoghi fotovoltaici qualificati.
In agenda ai tuoi commerciali." Below, a smaller line in gold #D9A441: "Paghi solo a risultato."
RIGHT: a small proof/CTA block in a thin gold-outlined pill: "Un partner per zona · Candidati". 
High contrast, text legible on mobile, ample spacing, no clutter, no stock solar-panel photo. Flat, elegant, corporate.
Text in Italian exactly as written.
```

### 6.4 — Copertina Facebook (1640 × 624)
```
Facebook page cover, 1640x624 px, premium B2B dark theme, warm gold accents (#D9A441) on charcoal (#0B0B0B), off-white
text (#F5F2EB). Keep the BOTTOM-LEFT corner clear (profile picture and page name overlap there on mobile). Keep all
critical content within the central ~640px-wide safe zone. Headline: "Sopralluoghi qualificati in agenda. Paghi a
risultato." Subline: "Per installatori fotovoltaici in Italia — SolarBack". A small gold arrow/CTA pointing down toward
the page button: "Scrivici su WhatsApp". Clean, high contrast, legible on mobile, no clutter, Italian text.
```

### 6.5 — Foto profilo brand (logo) per IG/FB
Usa l'output monogramma "SB" del prompt 6.1 (grafite + oro), 1080×1080 PNG, marchio centrato al 60-65% del cerchio.

---

## 7. Esecuzione + cosa manca

- **LinkedIn via Unipile:** il canale API **funziona** (host su 443 con `?port=`). Ma su Unipile ora c'è solo un account
  Instagram di test. **Per farti il profilo LinkedIn devi collegare a Unipile l'account LinkedIn aged.** Poi compilo io
  i campi che l'API espone (headline, about, esperienza, URL). Foto/banner/nome potresti doverli caricare tu a mano se
  l'API non li espone: lo verifico appena l'account è collegato.
- **Instagram + Facebook:** li configuri **tu** seguendo le schede sopra (l'API non modifica questi profili). Ti guido
  passo-passo quando vuoi.
- **Immagini:** genera con i prompt §6, poi mandami i file/URL: per LinkedIn provo a caricarli via Unipile; per IG/FB li
  carichi tu.
- **Da chiudere per il 100% di trust:** comprare **solarback.it** + email **info@solarback.it** → così spariscono i
  riferimenti "artec" e il brand è coerente al 100% (unico vero punto debole attuale).

## 8. TODO collegati
- [ ] Valerio: collega l'account LinkedIn aged a Unipile → poi compilo io il profilo.
- [ ] Valerio: genera le immagini coi prompt §6 (logo, avatar, banner, cover) e me le manda.
- [ ] Valerio: IG → Business + categoria + nome + bio + foto + link + highlights (scheda §4).
- [ ] Valerio: FB → ri-brand Pagina + username + bio + foto/cover + CTA WhatsApp (scheda §5).
- [ ] Valerio: compra solarback.it + email dedicata (toglie il mismatch artec).
- [ ] Prossima fase (separata): strategia contenuti/organic + calendario video con l'avatar.
