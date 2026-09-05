# 07 — L'OFFERTA SolarBack (v1, costruita su ricerca)

> Costruita il 2026-09-05 con 3 ricerche parallele: teardown competitor, pain di
> mercato (VOC + economia), framework offerte B2B (Hormozi $100M Offers).
> Framework: `offer-creation`. Stato: **v1, da validare col CEO** (vedi §12).

---

## 0. Il principio che governa tutto
- **Il rischio di SolarBack è TEMPO, non CASSA** (le ads le paga il cliente).
  → possiamo offrire garanzie forti *a patto di controllare la fonte lead*.
- **La DB Reactivation è fallita perché dipendeva da un input che il cliente non
  aveva** (DB vuoto). Regola d'oro: **mai garantire su un input che non
  controlliamo** (né la DB del cliente, né la chiusura del suo commerciale).

## 1. Il varco di posizionamento (differenziazione vs mercato)
Dalla ricerca competitor: *"sopralluoghi/appuntamenti in agenda"* lo dicono TUTTI
(Edilhub, Adsolar, Trein, Clientium…) → **è il minimo, non differenzia.** I 5
varchi reali dove SolarBack vince:
1. **Performance pura vs pacchetto prepagato.** Edilhub/MF Digital (il competitor
   più aggressivo) vende **pacchetti prepagati** ("30 sopralluoghi garantiti in 30
   giorni") → rischio a monte sull'installatore. Noi: **paghi solo il sopralluogo
   già effettuato.** Messaggio: *"Loro ti fanno prepagare e sperare. Noi ci fai
   pagare solo quando il sopralluogo è già successo."*
2. **Lead dedicati vs riciclati.** I loro sopralluoghi vengono da un **portale
   comparatore** → il cliente arriva "già bruciato con 3-5 preventivi". Noi
   generiamo **domanda dedicata e non condivisa** per singolo partner.
3. **Trasparenza di prezzo come arma.** 8 competitor su 10 non pubblicano prezzi.
   Noi diciamo apertamente 99€/400€ → atto di fiducia che nessuno fa.
4. **Proof verificabile + garanzia sulla conversione reale** (nessuno ce l'ha).
5. **Sistema integrato "reparto commerciale esterno"** (Ads + Cold Email +
   Speed-to-Lead AI + Reactivation) — il mercato è frammentato in specialisti;
   nessuno comunica il sistema completo.

## 2. ICP (a chi diciamo di sì)
> **Titolare di azienda installatrice di fotovoltaico residenziale in Italia,
> 5–20 persone, 6–10 tecnici, 2–5 commerciali, fatturato ~700k–3M, che HA un
> flusso di richieste ma ne trasforma troppo poche in sopralluoghi/contratti, e
> vuole crescere.** (Dettaglio e scoring → `02-icp-partner-scoring.md`.)

## 3. Dream Outcome (cosa vuole davvero)
Non "lead" né "marketing". Vuole: **agenda piena di sopralluoghi + più contratti
firmati, senza assumere e gestire commerciali.** Da comunicare in euro suoi:
*"8 sopralluoghi qualificati/mese → al 30% di chiusura sono ~2-3 impianti in più
al mese"* (contratto medio residenziale ~12.000€ → fonte ricerca VOC).

**Il conto che chiude la vendita** (dalla ricerca economica):
- Un commerciale interno costa **35–60k€/anno FISSI** e può non performare.
- Un'agenda vuota vale **~-36.000€/mese** (3 contratti persi × ~12k).
- SolarBack a performance = una **frazione** di quel costo, e solo a risultato.
- *(Numeri di settore = stime plausibili, non bilanci certificati. Usare come
  ordine di grandezza in vendita.)*

## 4. L'architettura dell'offerta — 3 strutture + sequenza
Tre "forme" della stessa offerta, usate in sequenza per lo sprint dei 51 giorni.

### 🟢 STRUTTURA B — "Recupero Sopralluoghi" (APRI-PORTA, attrito minimo)
- **Cosa:** NON tocchiamo ads né DB vecchio. Attacchiamo l'**AI Speed-to-Lead +
  qualifica** sui lead che il cliente **già riceve e non converte** (form sito,
  portali, lead comprati non richiamati in tempo, WhatsApp non gestiti).
- **Perché batte la DB Reactivation:** quella chiedeva "hai vecchi contatti?" →
  "no/pochi". Questa chiede *"quanti lead ti arrivano ogni mese che non richiami
  entro 5 minuti?"* → **tutti** ne hanno (falla universale del settore, VOC).
- **Zero nuovo esborso, zero dipendenza da asset che non ha, valore ovvio.**
- **Incasso SolarBack:** 99€/sopralluogo effettuato (+400€/contratto). Costo per
  SolarBack ~0 (n8n già pronto) → puro margine, volume limitato dai suoi lead.
- **Ruolo:** il **primo sì rapido** + la prima dimostrazione della macchina.

### 🔵 STRUTTURA A — "Sprint Sopralluoghi 30 giorni" (SCALA il volume)
- **Cosa:** campagna Meta dedicata + speed-to-lead + qualifica + prenotazione.
  Il cliente mette un **budget ads minimo concordato** (es. 600–1.000€ / 30gg).
- **Incasso:** 99€/sopralluogo effettuato + 400€/contratto.
- **Ruolo:** una volta guadagnata la fiducia con B, si **scala** con A (fonte lead
  fresca e controllata da noi). ⚠️ Nota: le ads verso il *consumatore* le paga il
  cliente — coerente con "ads verso installatori (nostre) rimandate".

### 🟡 STRUTTURA C — "Founding Partner" (CONTENITORE commerciale)
Impacchetta B (o A) dentro uno status "fondatore":
- **Prezzo bloccato a vita** (99€/400€ anche quando alzeremo i prezzi).
- **Esclusiva di zona** (un solo installatore partner per area).
- **Accesso diretto al founder** + posti limitati.
- **In cambio:** il partner si impegna a dare **testimonianza video + accesso ai
  numeri** quando l'obiettivo è centrato (baratto esplicito → così i primi partner
  producono il case study, che è il vero output strategico).

**➡️ SEQUENZA CONSIGLIATA (cold call → chiusura):**
apri con **B** (attrito minimo, "recupero i lead che già perdi", niente budget
ads da discutere subito) → dentro il framing **C** (Founding Partner, esclusiva
di zona, posti limitati) → dimostrata la macchina, **upsell ad A** (ads, budget
cliente) per scalare i volumi. Aggira sia il muro della DB reactivation sia la
trappola del "gratis".

## 5. Offer Stack (valore percepito alto, costo per noi ~0)
| Deliverable (già disponibile / costo ~0) | Valore ancorato |
|---|---|
| Setup campagna Meta + creatività FV (in Struttura A) | ~1.500 € |
| AI Speed-to-Lead <30s (n8n già pronto) | ~2.000 €/mese |
| Qualifica AI su criteri concordati | ~1.000 €/mese |
| Prenotazione automatica in agenda | ~800 €/mese |
| Dashboard KPI + report settimanale | ~500 €/mese |
| Script di chiusura per il suo commerciale (bonus) | ~500 € |
| Esclusiva di zona + prezzo bloccato a vita (founding) | (impagabile) |
| Garanzia sopralluoghi + sostituzione fuori criteri | (il rischio è nostro) |

→ Valore percepito impilato **8.000–10.000 €**; prezzo reale **paghi solo 99€ a
sopralluogo**. Il delta genera il "sì". I bonus a costo zero per noi (script,
dashboard, report) sono i più efficienti.

## 6. La Garanzia (la leva #1 con 0 case study)
**Combinazione consigliata:** performance condizionata + qualità/sostituzione +
"lavoro gratis finché" *cappata*. Formulazione:

> *"Nei primi 30 giorni ti porto almeno **8 sopralluoghi qualificati** in agenda.
> Paghi solo quelli **effettivamente svolti**, 99€ l'uno. Ogni appuntamento fuori
> dai criteri concordati **non lo paghi e te lo sostituisco**. Se non arrivo a 8
> entro 30 giorni, **continuo a lavorare senza compenso finché non ci arrivo**
> (max 60 giorni, a parità del budget/flusso lead concordato)."*

È credibile (numeri specifici), **non ci fa fallire** (cassa a rischio zero, cap
temporale, criteri scritti) e ribalta il rischio in modo visibile.
⚠️ **Mai addebitare il no-show** (nel settore si paga solo l'appuntamento svolto —
VOC). Il nostro "99€ a sopralluogo *effettuato*" è già allineato.

## 7. Criteri di "sopralluogo qualificato" (da fissare per iscritto)
Bozza da concordare col partner PRIMA di partire (protegge lui e noi):
- Decisore presente all'appuntamento (proprietario/titolare).
- Immobile di proprietà / titolo a decidere.
- Interesse reale a valutare un impianto (non solo curiosità/prezzo).
- Zona coperta dal commerciale del partner.
- Finestra temporale definita (data/ora confermata).
- (Opz.) consumi/bolletta o requisito minimo concordato.
> Senza criteri scritti si litiga su ogni fattura da 99€. Questa è anche la
> nostra "garanzia qualità".

## 8. Pricing
- **Performance pura (fase attuale):** 99€/sopralluogo effettuato + 400€/contratto
  residenziale. Grandi impianti: % concordata.
- **Founding Partner:** prezzo bloccato a vita + esclusiva di zona + posti limitati.
- **Nessun setup fee nell'apri-porta** (abbassa l'attrito, valida l'offerta).
  Il setup fee (150–200€) e il revenue share 5–10% sono **fase 2**, dopo i case
  study (vedi `01-business-model-economia.md` → evoluzione pricing).

## 9. Naming (per pilota/materiali)
- Contenitore: **"Programma Founding Partner SolarBack"**
- Promessa dentro: **"Agenda Piena FV — almeno 8 sopralluoghi in 30 giorni"**
- Alternative: "Reparto Sopralluoghi Chiavi in Mano" · "Sopralluoghi Garantiti,
  Paghi Solo a Risultato".

## 10. La one-liner da cold call (e varianti)
**Principale (apri con Struttura B):**
> *"Recupero i sopralluoghi dai lead che oggi stai già perdendo — quelli che non
> richiami entro 5 minuti — e te li porto qualificati in agenda. Paghi solo 99€
> a sopralluogo effettivamente svolto. Esclusiva sulla tua zona, sei uno dei miei
> primi partner fondatori con prezzo bloccato a vita. E se non ti porto almeno 8
> sopralluoghi in 30 giorni, lavoro gratis finché non ci arrivo."*

**Gancio "beat-your-number" (se conosci il suo dato):**
> *"Quanti sopralluoghi fai oggi al mese? Te ne porto di più — o non mi paghi."*

## 11. Gestione obiezioni (mappata ai pain reali — VOC)
- *"Anche voi lead riciclati?"* → No: con la Struttura B lavoro **i TUOI lead**
  (nessuno li condivide); con le ads sono **dedicate a te**, non un portale.
- *"Ho già buttato soldi in agenzie che promettono in 6 mesi."* → Zero canone,
  zero setup: **paghi solo il sopralluogo svolto**. Operativi in 7 giorni.
- *"E se non si presenta (no-show)?"* → Non lo paghi. Paghi solo gli svolti.
- *"E se sparite dopo che pago?"* (memoria truffe settore) → Non paghi nulla in
  anticipo; paghi *dopo* che il sopralluogo è avvenuto. Il rischio è nostro.
- *"Non ho vecchi contatti da riattivare."* → Non servono: lavoro i lead **nuovi**
  che già ti arrivano e perdi. (← aggira l'obiezione che affossò la DB react.)

## 12. ⚠️ Decisioni da confermare col CEO (round-3)
1. **Apri-porta = Struttura B ("Recupero Sopralluoghi")** al posto della DB
   reactivation: confermi?
2. **"Founding Partner": tetto rigido (es. 5) o coorte a scaglioni?** L'esclusiva
   di zona è compatibile con molti partner (1 per zona) → per l'obiettivo 30 la
   scarsità va usata come leva di chiusura, non come cap rigido a 5.
3. **Setup fee nell'apri-porta: 0 (consigliato) o piccolo deposito convertibile**
   (es. 300€ che diventano credito sui primi sopralluoghi, come filtro anti-curiosi)?
4. **Livello di garanzia:** sei a tuo agio con "8 sopralluoghi/30gg + lavoro gratis
   finché (cap 60gg)"? Alzare/abbassare la soglia?
5. **Focus:** residenziale (pricing chiaro) come primo segmento e una zona pilota
   per fare densità, o tutta Italia da subito?
