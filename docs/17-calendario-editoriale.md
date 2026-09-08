# docs/17 — Calendario Editoriale · Fase Validazione (Settimane 1-2 + scaletta 3-4)

> **Cos'è:** il piano operativo dei contenuti social SolarBack per le prime 2 settimane (fase di
> validazione canale) + scaletta settimane 3-4. Copy pronto al post, prompt immagine pronti per Kie AI,
> blueprint video Veo (da attivare dopo). Strategia madre → `docs/16`. Setup profili → `docs/15`.

**Aggiornato:** 8/9/2026 · **Voce:** brand **SolarBack (noi)** su tutti i canali (il profilo LinkedIn resta "Abdellah Hmamsi").

---

## A. Setup operativo (deciso 8/9)

| Voce | Decisione |
|---|---|
| **Scheduler** | **OmniSocials** ($10/mo, integrazione MCP) → una volta collegato, io scrivo E schedulo i post direttamente. **Da collegare (accesso Valerio).** |
| **Voce copy** | **SolarBack, prima persona plurale (noi).** Nessun "io/Valerio" su LinkedIn (il nome profilo è Abdellah). |
| **Formato settimane 1-2** | Post-testo + caroselli + immagini AI. **Niente video-avatar in questa fase** (si aggiungono via Veo appena rodato il ritmo). |
| **Immagini** | **Kie AI · GPT Image 2** (`gpt-image-2-text-to-image`), 1K, **6 crediti/immagine**. |
| **Video (dopo)** | **Kie AI · Veo 3.1 Lite 1080p**, **35 crediti / 8 secondi**. HeyGen/ElevenLabs solo per i VSL lunghi (5-10 min), non per i content. |
| **Crediti Kie AI** | Saldo verificato 8/9: **9.862** (~1.640 immagini o ~280 clip da 8s). Pipeline testata e funzionante. |
| **Avatar "Valerio"** | Mascotte AI **dichiarata** (EU AI Act art. 50). Entra coi video, non nelle settimane 1-2. |
| **Pubblicazione** | Full-auto via scheduler (API ufficiali) = sicura. Engagement (commenti/DM) a volume umano assistito dall'AI. Nessun bot di massa. |

**Come genero un'immagine (ricetta Kie AI, verificata):**
1. `POST https://api.kie.ai/api/v1/jobs/createTask` — header `Authorization: Bearer $KIE_API_KEY`, body `{"model":"gpt-image-2-text-to-image","input":{"prompt":"...","aspect_ratio":"1:1","resolution":"1K","background":"auto"}}` → torna `data.taskId`.
2. Poll `GET https://api.kie.ai/api/v1/jobs/recordInfo?taskId=...` finché `state:"success"`.
3. URL immagine in `response.resultUrls[0]` (è un file temporaneo → scaricare subito).

**Orari (Italia, da tarare sui dati reali):** LinkedIn 07:30-08:30 o 12:30-13:30 nei feriali · IG 13:00 o 19:00-20:00 · FB gruppi in orario serale/pausa pranzo (quando i titolari guardano il telefono).

---

## B. Pillars (rotazione) e obiettivo di fase

**Obiettivo settimane 1-2 = VALIDARE il canale**, non fare numeri. Domanda a cui rispondiamo: *dove risponde davvero il titolare installatore FV, su LinkedIn o nei gruppi Facebook di settore?* Decisione del canale #1 a fine settimana 2 (criterio in §H).

**5 pillar** (ognuno ha uno scopo nel funnel):
1. 🔥 **Contrarian / verità scomode** → autorità, ferma lo scroll, posiziona.
2. 📊 **Educativo / how-to** → valore concreto (numeri, processi, errori), fa salvare/condividere.
3. 🛠️ **Metodo / dietro le quinte** → mostra COME lavora SolarBack, costruisce fiducia.
4. 🧭 **Visione / mercato FV** → perché esistiamo, dove va il mercato, credibilità.
5. 🎯 **Obiezione / inbound** → smonta i dubbi, invita al DM (il vero valore).

---

## C. Regole copy (VINCOLANTI — vedi skill `copywriting-italiano-umano-2026`)

- **MAI il trattino lungo (—) nel copy finale.** Usa punto, due punti, virgola, parentesi.
- **Hook 140-210 caratteri** (prima riga = ferma lo scroll o è morto).
- **Corpo LinkedIn 1000-2000 caratteri**, righe corte, spazi bianchi, una idea per riga.
- **CTA soft** (no "compra ora"): domanda, invito al commento, "scrivimi in DM".
- **DATI: mai inventati.** Dove serve un numero, o è verificato (con fonte) o è marcato `⚠️[dato da verificare]` e lo confermiamo prima di postare. Niente percentuali a caso.
- **Nelle CARD immagine: niente parole accentate** (GPT Image 2 sbaglia gli accenti: "VELOCITÀ"→"VELOCITA"). Riformula (es. "PIU RAPIDO" → "PRIMA DEGLI ALTRI"). Negli accenti nel testo del POST invece vanno bene.
- Zero gergo ("prospect/lead/suspect" mai in chat/copy pubblico dove suona da agenzia fredda): parla di **titolari, sopralluoghi, contratti, agenda**.

---

## D. SETTIMANA 1 — "Presenza + Verità"

> Scopo: esistere, dire cose vere e forti, capire dove c'è polso. 5 pezzi LinkedIn (core) + adattamento IG + presidio gruppi FB.

### 🔥 Giorno 1 (Lun) — LinkedIn · Contrarian · POST-TESTO + card
**HOOK:** `Il problema degli installatori fotovoltaici non sono i clienti che mancano. Sono i clienti che c'erano e non hai richiamato in tempo.`

**COPY (post):**
```
Il problema degli installatori fotovoltaici non sono i clienti che mancano.
Sono i clienti che c'erano e non hai richiamato in tempo.

Ci parliamo ogni settimana con titolari di aziende di installazione.
La frase che sentiamo di più non è "non ho richieste".

È questa: "le richieste arrivano, ma tra un cantiere e un sopralluogo le richiamo dopo due giorni".

E dopo due giorni quel cliente ha gia chiesto altri tre preventivi.

Uno studio classico di Harvard Business Review sui tempi di risposta commerciale ha misurato una cosa semplice:
chi ricontatta una richiesta entro pochi minuti ha probabilita di parlarci molto piu alte di chi la richiama dopo mezz'ora.
Dopo due giorni, il gioco è quasi sempre finito.

Per un installatore questo non è una statistica.
È il preventivo da 12.000 euro che ha firmato il concorrente perché ha risposto lui per primo.

Non ti serve "piu marketing".
Ti serve che ogni richiesta venga presa in mano subito, qualificata, e messa in agenda mentre è ancora calda.

Noi facciamo esattamente questo: siamo il reparto acquisizione esterno che tiene le richieste calde e ti riempie l'agenda di sopralluoghi. Tu installi.

Domanda onesta per chi installa: quanto tempo passa, in media, tra una richiesta e la tua prima telefonata?
```
**Asset:** card già pronta (`test-hook-card.png`, generata 8/9). Riusabile.
**CTA:** domanda finale (spinge commenti). **Orario:** 08:00.

---

### 📊 Giorno 2 (Mar) — LinkedIn + IG · Educativo · CAROSELLO (7 slide)
**HOOK (slide 1 / prima riga caption):** `Quanto ti costa DAVVERO un cliente fotovoltaico? Scomponiamolo, numero per numero.`

**Blueprint slide (testo su card grafite+oro):**
1. `QUANTO TI COSTA DAVVERO UN CLIENTE FOTOVOLTAICO?` (+ sottotitolo "Scomponiamolo")
2. `IL LEAD NON E IL COSTO. IL COSTO E TUTTO QUELLO CHE VIENE DOPO.`
3. `1. Il lead grezzo` → prezzo per contatto (⚠️[dato da verificare: costo medio lead FV Italia])
4. `2. Il tempo perso` → ore a richiamare chi non risponde / non è in target
5. `3. I sopralluoghi a vuoto` → gente che voleva solo un preventivo per la banca
6. `4. Il tasso di chiusura reale` → da 100 lead a quanti contratti?
7. `LA METRICA VERA: quanto paghi per ogni CONTRATTO firmato. Non per ogni lead.` + wordmark SolarBack

**CAPTION (post):**
```
Quanto ti costa DAVVERO un cliente fotovoltaico?

Quasi nessun installatore lo sa, e questo è il motivo per cui tanti bruciano budget in pubblicità senza capire perché non torna.

Il costo non è il lead. Il lead è la punta.

Sotto ci sono:
il tempo che passi a richiamare chi non risponde,
i sopralluoghi fatti a chi voleva solo un preventivo per la banca,
e il tasso di chiusura vero, che nessuno calcola.

La metrica che conta è una sola: quanto paghi per ogni CONTRATTO firmato.
Non per ogni click, non per ogni lead.

Nel carosello l'abbiamo scomposta pezzo per pezzo.

Se il tuo numero non lo conosci, è il primo lavoro da fare prima di spendere un altro euro in ads.

Tu lo sai quanto ti costa un contratto chiuso?
```
**IG:** stesso carosello, caption piu corta (prime 3 righe + domanda). **Orario:** LinkedIn 12:30 / IG 19:30.

---

### 🧭 Giorno 3 (Mer) — LinkedIn · Visione/Mercato · POST-TESTO
**HOOK:** `Il mercato del fotovoltaico in Italia sta cambiando pelle. Chi aspetta gli incentivi per vendere, nel 2026 rischia di restare a secco.`

**COPY (post):**
```
Il mercato del fotovoltaico in Italia sta cambiando pelle.
Chi aspetta gli incentivi per vendere, nel 2026 rischia di restare a secco.

Per anni la domanda l'hanno spinta gli incentivi. Superbonus, detrazioni, bonus vari.
Il telefono suonava da solo. Bastava esserci.

Adesso lo scenario è diverso: ⚠️[inserire dato verificato sul quadro incentivi/detrazioni FV 2026].
E il cliente non compra piu "perché c'è il bonus".
Compra se qualcuno gli spiega bene il ritorno, e se lo fa prima del concorrente.

Questo sposta il potere.
Non vince piu chi ha il pannello piu economico.
Vince chi ha un flusso costante di richieste qualificate e le lavora in fretta.

Tradotto per un installatore: l'acquisizione clienti smette di essere qualcosa che "arriva" e diventa qualcosa che si costruisce.

Chi lo capisce adesso, mentre gli altri aspettano il prossimo bonus, si prende gli anni buoni.

Noi costruiamo questo flusso per gli installatori, a performance. Le richieste calde, i sopralluoghi in agenda.

Come sta andando il tuo 2026 rispetto agli anni del Superbonus? Meglio, uguale o piu duro?
```
**Asset:** card con la frase hook (prompt in §I). **CTA:** domanda-sondaggio. **Orario:** 08:00.
> ⚠️ **Prima di postare: verificare online lo stato reale incentivi/detrazioni FV Italia 2026** (regola 6). Non postare numeri a memoria.

---

### 🛠️ Giorno 4 (Gio) — LinkedIn · Metodo/Dietro le quinte · POST-TESTO
**HOOK:** `Come riempiamo l'agenda di sopralluoghi a un installatore, senza fargli pagare un solo lead morto.`

**COPY (post):**
```
Come riempiamo l'agenda di sopralluoghi a un installatore, senza fargli pagare un solo lead morto.

Te lo spieghiamo, perché la parola "agenzia" per molti installatori vuol dire "ho gia buttato soldi una volta".

Il modello classico è: paghi l'agenzia, paghi le ads, e speri che i lead siano buoni. Il rischio è tutto tuo.

Noi l'abbiamo ribaltato.

1. Le campagne le paghi tu, ma le gestiamo noi. Il budget resta tuo e trasparente.
2. Le richieste che arrivano le prendiamo in mano noi, subito, e le qualifichiamo.
3. Chi non è in target lo scartiamo prima che ti faccia perdere un sopralluogo.
4. Chi è in target finisce nella tua agenda, gia caldo, con l'appuntamento fissato.

E qui la parte che conta: noi guadagniamo soprattutto quando tu chiudi.
Circa 99 euro a sopralluogo utile, una quota sul contratto firmato.

Se non ti riempiamo l'agenda, non ci guadagniamo.
Il rischio non è piu solo tuo. È nostro insieme al tuo.

Questo è quello che intendiamo per reparto acquisizione esterno a performance.

Curiosita: quante delle tue richieste, oggi, finiscono davvero in un sopralluogo fatto?
```
**Asset:** card "IL RISCHIO NON E SOLO TUO" o timeline 4 step (prompt in §I). **Orario:** 12:30.

---

### 🎯 Giorno 5 (Ven) — LinkedIn · Visione/Founder (voce brand) · POST-TESTO + immagine
**HOOK:** `Abbiamo costruito SolarBack per una frase che ci ha detto un installatore: "io so montare pannelli, non so trovare clienti".`

**COPY (post):**
```
Abbiamo costruito SolarBack per una frase che ci ha detto un installatore.

"Io so montare pannelli. Non so trovare clienti. E non ho tempo per imparare a farlo."

È la verita di quasi tutte le aziende di installazione che incontriamo.
Sono bravissime sul tetto. In cantiere non le batte nessuno.

Ma l'acquisizione clienti è un mestiere diverso.
Richiede campagne, tempi di risposta, qualifica, follow up. Un reparto vero.
E un installatore non può fare il montatore, il commerciale e il markettaro nello stesso giorno.

Cosi la richiesta arriva e muore. Il concorrente risponde prima. L'agenda si svuota d'inverno.

Noi facciamo una cosa sola: siamo quel reparto, ma esterno.
L'azienda installa. Noi le riempiamo l'agenda di sopralluoghi, a performance.

Non vendiamo "marketing".
Vendiamo agende piene e rischio condiviso.

Se sei un titolare e questa frase la senti tua, questo profilo nelle prossime settimane ti servira.

Qual è la parte dell'acquisizione clienti che ti ruba piu tempo o piu energie?
```
**Asset:** immagine brand (prompt in §I: scena astratta premium, pannelli+luce oro, no volti). **Orario:** 08:00.

---

### 🔵 Presidio Facebook — Settimana 1 (ogni giorno, ~20 min)
Non post schedulati: **azioni manuali di validazione** (vedi playbook §G). Entrare in 3-4 gruppi installatori FV, osservare, rispondere con valore a 2-3 thread/giorno. Zero promozione. Serve a capire se il polso è li.

---

## E. SETTIMANA 2 — "Metodo + Proof + Inbound"

> Scopo: mostrare che il metodo funziona, smontare l'obiezione "gia provato", aprire il flusso di DM.

### 🔥 Giorno 6 (Lun) — LinkedIn · Contrarian · POST-TESTO
**HOOK:** `Smetti di comprare lead. Compra sopralluoghi. Sono due cose diverse, e una delle due ti sta svuotando il conto.`

**COPY (post):**
```
Smetti di comprare lead. Compra sopralluoghi.

Sembra la stessa cosa. Non lo è. E la differenza è quella che ti sta svuotando il conto.

Un lead è un nome e un numero. Punto.
Non sai se è in target, se ha il tetto giusto, se ha budget, se voleva davvero un impianto o solo curiosare.
Lo paghi comunque. E poi paghi due volte: in tempo, per richiamarlo.

Un sopralluogo utile è un'altra cosa.
È una persona in target, che ha risposto, che è stata qualificata, e che ti aspetta in agenda a un'ora precisa.

Il primo è un costo con la speranza dentro.
Il secondo è un appuntamento con un installazione possibile dietro.

La maggior parte delle aziende compra la prima e si lamenta che "i lead sono scarsi".
Il punto non è la qualita del lead. È che stai comprando la cosa sbagliata.

Noi ti vendiamo la seconda. Sopralluoghi utili, in agenda, a performance.

Tu oggi stai pagando per nomi o per appuntamenti?
```
**Asset:** card "COMPRA SOPRALLUOGHI, NON LEAD". **Orario:** 08:00.

---

### 📊 Giorno 7 (Mar) — LinkedIn + IG · Educativo · CAROSELLO (6 slide)
**HOOK:** `5 errori che fanno gli installatori quando provano a trovarsi i clienti da soli. Il quarto costa piu di tutti.`

**Blueprint slide:**
1. `5 ERRORI QUANDO PROVI A FARTI I CLIENTI DA SOLO` (+ "il 4 costa piu di tutti")
2. `ERRORE 1 · Rispondere tardi. La richiesta calda diventa fredda in poche ore.`
3. `ERRORE 2 · Trattare tutti uguali. Senza qualifica, riempi l'agenda di gente che non compra.`
4. `ERRORE 3 · Affidarsi solo al passaparola. Va benissimo, ma non lo controlli e d'inverno si spegne.`
5. `ERRORE 4 · Nessun follow up. Chi ha detto "ci penso" spesso comprava. Nessuno lo richiama.`
6. `ERRORE 5 · Non misurare. Se non sai il costo per contratto, stai guidando bendato.` + wordmark

**CAPTION:**
```
5 errori che fanno gli installatori quando provano a trovarsi i clienti da soli.

Non perché siano imprenditori scarsi. Al contrario.
È che l'acquisizione clienti è un mestiere a parte, e chi installa non ha ne il tempo ne gli strumenti per farlo bene mentre è su un tetto.

Il quarto errore, quello sul follow up, è quello che costa di piu.
Perché non è un cliente che non c'era. È un cliente che avevi in mano e hai lasciato andare.

Li abbiamo messi tutti e cinque nel carosello.

Quanti ne stai facendo, in questo momento, senza accorgertene?
```
**Orario:** LinkedIn 12:30 / IG 19:30.

---

### 🛠️ Giorno 8 (Mer) — LinkedIn · Proof/Processo · CAROSELLO timeline (6 slide)
**HOOK:** `Cosa succede nei primi 7 giorni quando un installatore inizia a lavorare con noi. Giorno per giorno.`

**Blueprint slide (timeline):**
1. `I PRIMI 7 GIORNI CON SOLARBACK` (+ "cosa succede davvero")
2. `GIORNO 1-2 · Studiamo la tua zona, i tuoi margini, il tuo cliente ideale. Impostiamo le campagne.`
3. `GIORNO 3 · Partono le richieste. Le prendiamo in mano noi, in tempo reale.`
4. `GIORNO 4-5 · Qualifica. Scartiamo chi non è in target prima che ti faccia perdere tempo.`
5. `GIORNO 6-7 · I primi sopralluoghi utili entrano nella tua agenda. Gia caldi, gia fissati.`
6. `TU: installi. NOI: riempiamo l'agenda. A performance.` + wordmark

**CAPTION:**
```
Cosa succede nei primi 7 giorni quando un installatore inizia a lavorare con noi.

Lo scriviamo giorno per giorno perché "agenzia" spesso vuol dire "non ho idea di cosa stiano facendo con i miei soldi".

Da noi è trasparente e veloce.
Giorni 1 e 2 studio e impostazione. Giorno 3 partono le richieste. Giorni 4 e 5 qualifica seria. Giorni 6 e 7 i primi sopralluoghi in agenda.

Nessuna magia. Un reparto acquisizione che lavora, mentre tu resti in cantiere.

Il carosello ha la timeline completa.

Se dovessi avere 3 sopralluoghi utili in piu la prossima settimana, la tua squadra riuscirebbe a gestirli?
```
**Orario:** 12:30.

---

### 🎯 Giorno 9 (Gio) — LinkedIn · Obiezione · POST-TESTO
**HOOK:** `"Ho gia provato un'agenzia e ho buttato soldi." Ce lo dicono in tanti. Ed è quasi sempre vero. Ecco cosa era diverso.`

**COPY (post):**
```
"Ho gia provato un'agenzia e ho buttato soldi."

Ce lo dicono in tanti, ai primi minuti di conversazione.
Ed è quasi sempre vero. Non lo neghiamo. Diciamo cosa era diverso.

Nel modello classico l'agenzia si fa pagare a monte.
Fee mensile, piu ads, a prescindere dal risultato.
Se i lead sono spazzatura, l'agenzia ha gia incassato. Il rischio è tutto tuo.

Cosi hai pagato per una promessa, non per un risultato.

Noi lavoriamo al contrario.
Il grosso di quello che guadagniamo arriva quando tu porti a casa qualcosa: circa 99 euro a sopralluogo utile, una quota sul contratto firmato.
Se non ti riempiamo l'agenda, non ci guadagniamo.

Non ti chiediamo di fidarti perché siamo simpatici.
Ti chiediamo di guardare dove sta il rischio. Nel modello vecchio era tutto tuo. Qui è nostro insieme al tuo.

È l'unico motivo per cui ha senso riprovarci dopo esserci gia bruciati una volta.

Quando ti sei bruciato, il problema era la qualita dei contatti o il fatto che pagavi comunque?
```
**Asset:** card "IL RISCHIO E NOSTRO INSIEME AL TUO". **Orario:** 08:00.

---

### 🎯 Giorno 10 (Ven) — LinkedIn · Inbound/CTA · POST-TESTO
**HOOK:** `Se stai leggendo con l'agenda dei prossimi mesi ancora mezza vuota, questo post è per te. Poi torniamo a lavorare.`

**COPY (post):**
```
Se stai leggendo con l'agenda dei prossimi mesi ancora mezza vuota, questo post è per te.
Poi torniamo tutti a lavorare.

In queste due settimane abbiamo detto cose semplici e scomode.
Che il problema non sono i clienti che mancano, ma quelli che non richiami in tempo.
Che compri lead quando dovresti comprare sopralluoghi.
Che le agenzie ti hanno bruciato perché incassavano comunque.

Se qualcosa di tutto questo ti è suonato familiare, la prossima mossa è banale.

Scrivici in DM una riga: la tua zona e quanti sopralluoghi utili vorresti in piu al mese.
Ti diciamo con onesta se possiamo aiutarti o no. Senza giri, senza call da un'ora per venderti fumo.

Se non è il momento, va bene lo stesso. Continua a seguirci: qui diciamo come funziona davvero l'acquisizione clienti per chi installa.

Ma se l'agenda mezza vuota ti preoccupa gia adesso, tra tre mesi sara tardi.

Zona e numero di sopralluoghi desiderati. Una riga in DM. Al resto pensiamo noi.
```
**Asset:** card "SCRIVICI: ZONA + SOPRALLUOGHI. AL RESTO PENSIAMO NOI." **Orario:** 12:30.

---

## F. Scaletta Settimane 3-4 (da rifinire col feedback reale)

> Dopo la decisione sul canale #1 (fine settimana 2, §H), si raddoppia sul canale che risponde. Qui solo le direzioni, il copy pieno lo scrivo quando abbiamo i dati.

**Settimana 3 — "Prova e specificita" (raddoppia sul canale vincente):**
- Contrarian su un mito specifico del settore (es. "il preventivo piu basso vince" → falso).
- Educativo: mini-guida "come qualificare una richiesta FV in 4 domande" (carosello).
- Proof: primo elemento di riprova reale appena disponibile (screenshot agenda anonimizzato / numero sopralluoghi / testimonianza). ⚠️ solo dati veri.
- Metodo: "cosa NON facciamo" (niente lead condivisi, niente vincoli lunghi) → differenziazione.
- Inbound: seconda CTA DM con angolo diverso (stagionalita: prepara l'inverno adesso).
- **Primo test video Veo** (blueprint §I): 1 clip 8s, hook parlato + testo, avatar dichiarato.

**Settimana 4 — "Autorita e sistema":**
- Visione: dove va il mercato FV 2026-2027 (⚠️ da ricerca), SolarBack come infrastruttura.
- Educativo: "quanto deve stare in agenda un installatore per essere sano" (numeri).
- Case/mini-storia: percorso di un installatore tipo (anche anonimo/generico se non c'è ancora il reale).
- Obiezione: "perché a performance e non a fee" (approfondimento del modello).
- Inbound + recap: il meglio delle 4 settimane + CTA forte.
- **Secondo video Veo** + primo esperimento di riuso cross-piattaforma (clip → reel IG → snippet FB).

---

## G. Playbook presidio gruppi Facebook (validazione, settimane 1-2)

Serve a rispondere alla domanda: **il titolare installatore è piu su LinkedIn o nei gruppi FB?**

1. **Entrare in 3-4 gruppi** installatori/fotovoltaico/energie rinnovabili Italia (cercare "fotovoltaico installatori", "energie rinnovabili professionisti", "elettricisti fotovoltaico"). ⚠️ trovare i nomi reali online prima di partire.
2. **Prima settimana: solo ascolto + valore.** Zero promozione (bannano e ti bruci). Rispondere a 2-3 thread/giorno con risposte utili e concrete, firmate SolarBack in modo sobrio.
3. **Misurare:** quanti titolari veri postano/commentano? Di cosa si lamentano? Che linguaggio usano? (appuntare in `memory.md`).
4. **Confronto:** a fine 2 settimane, mettere fianco a fianco engagement/risposte da LinkedIn vs qualita conversazioni nei gruppi FB.

---

## H. Tracking & criterio decisione canale #1 (fine settimana 2)

**Cosa misurare** (foglio semplice, aggiornato ogni fine giornata):
| Metrica | LinkedIn | Gruppi FB |
|---|---|---|
| Post/interventi pubblicati | | |
| Reazioni + commenti da profili in target (titolari/tecnici FV) | | |
| Conversazioni/DM avviate con persone in target | | |
| Qualita conversazione (1-5, quanto suona da vero titolare) | | |

**Criterio di decisione (onesto, niente innamoramenti):**
- Vince il canale che al netto del tempo speso porta **piu conversazioni con titolari veri in target**, non piu vanity metrics.
- Se LinkedIn genera pochi ma buoni contatti e FB genera tanto rumore ma nessun titolare, **il canale #1 è LinkedIn**.
- Se nei gruppi FB rispondono titolari veri e su LinkedIn è deserto, **si sposta il baricentro su FB** (e LinkedIn resta di presidio-autorita).
- **Decisione scritta in `DECISIONI.md` a fine settimana 2**, con i numeri a supporto.

---

## I. Libreria asset — prompt immagine Kie-ready + blueprint video Veo

### Card testuale (quote/hook) — template GPT Image 2 (6 cr)
Sostituisci solo `TESTO` (3 righe max, **senza accenti**) e `SOTTORIGA`:
```
Premium minimalist social media quote card, 1:1. Deep graphite charcoal background (#0B0B0B to #121212 subtle gradient). Bold sans-serif typography in warm off-white (#F5F2EB), large, perfectly legible, Italian text on up to three lines reading exactly: TESTO. A single elegant thin gold accent line (#D9A441) under the text. Small refined gold wordmark bottom-left reading exactly: SolarBack. High-end brand aesthetic like Apple, Nvidia, Tesla keynote slides. No clipart, no icons, no stock imagery, no people. Clean, lots of negative space, sophisticated, corporate premium.
```
Input: `{"aspect_ratio":"1:1","resolution":"1K","background":"auto"}`. Per carosello LinkedIn usare `4:5`.

### Immagine "scena" astratta di brand (no volti, per post visione/founder)
```
Abstract premium editorial image, 4:5. Dark graphite environment with a single warm golden light source (#D9A441) grazing across clean solar panel surfaces, extreme close-up, cinematic, high-end product photography style. Deep shadows, warm off-white highlights (#F5F2EB). No people, no faces, no text, no logos. Sophisticated corporate mood, like a premium brand campaign. Minimalist, lots of negative space.
```
Input: `{"aspect_ratio":"4:5","resolution":"2K"}` (2K per i post-visione = piu impatto).

### Blueprint video Veo 3.1 Lite (da attivare settimane 3-4) — 8s, 35 cr
Modello: `veo3.1-lite` (verificare stringa esatta su docs.kie.ai prima del primo run). Struttura clip hook:
```
8-second cinematic vertical clip (9:16). A confident spokesperson (declared AI avatar) in a modern minimalist studio, graphite and gold branding, speaks one strong Italian line to camera: "[HOOK]". Warm cinematic lighting, shallow depth of field, premium brand look. On-screen bold caption of the same line, warm off-white on graphite, gold underline. SolarBack gold wordmark lower-third.
```
> Nota: la stringa modello Veo e i campi (duration/resolution/aspect) vanno confermati su `docs.kie.ai/market/veo/...` al primo utilizzo. HeyGen/ElevenLabs restano riservati ai VSL lunghi (5-10 min), non ai content.

---

## J. Cosa serve da Valerio per partire (accessi)
1. **Collegare OmniSocials** (account $10/mo + integrazione MCP alla sessione) → poi schedulo io.
2. Confermare i **3 profili pronti** (LinkedIn/IG/FB come da `docs/15`) e collegabili allo scheduler.
3. Verde su **quali dati verificare** prima di postare i pezzi marcati ⚠️ (incentivi FV 2026, costo lead, ecc.).
