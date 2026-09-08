/**
 * Specifiche descrittive di ogni ruolo (alimentano la scheda /agenti/[slug]).
 * Onesto: i ruoli si definiscono e collaudano UNO ALLA VOLTA con Valerio.
 * Qui c'è la struttura e il contratto; il dettaglio operativo vive nella skill del ruolo.
 */
export type AgentSpec = {
  comeLavora: string;
  tools: { name: string; desc: string }[];
  skill: string[];
  giro: { t: string; d: string }[];
  regole: string[];
  stato: string;
};

const CONTRATTO = "Ogni giro: run_start → lavoro → kv_set/feed → run_finish (sempre, anche se salta).";
const NO_POPUP = "Mai domande bloccanti: default sensato + avviso in dashboard + continua.";
const APPROVAZIONE = "Nulla esce verso l'esterno senza approvazione dalla dashboard (finché la qualità non è provata; poi autopilot).";

export const agentSpecs: Record<string, AgentSpec> = {
  "solar-content-strategist": {
    comeLavora: "Ogni mattina legge i numeri veri (KPI, feed, cosa ha funzionato ieri) e scrive il piano contenuti del giorno: temi, angoli, hook. Lo lascia in dashboard (kv piano:oggi) per Caroselli e Video.",
    tools: [
      { name: "Mission Control API", desc: "Legge il digest, scrive piano e feed" },
      { name: "Supabase (lettura)", desc: "KPI funnel e liste, storico giri" },
      { name: "docs/16 + docs/ricerca", desc: "Strategia e ricerca 2026 con fonti" },
    ],
    skill: ["Skill dedicata solar-content-strategist (SKILL.md + reference.md)", "Pillar, hook 140-210 caratteri, voce brand SolarBack (noi)", "Decide su dati, non su fede: cita i numeri che usa"],
    giro: [
      { t: "Leggi il mondo", d: "GET /api/ingest?digest=1: KPI, giri di ieri, cosa ha performato" },
      { t: "Decidi", d: "Tema, angolo e formato del giorno per Caroselli e Video" },
      { t: "Scrivi il piano", d: "kv_set piano:oggi + una riga nel feed" },
      { t: "Chiudi", d: "run_finish con riepilogo e items" },
    ],
    regole: [APPROVAZIONE, NO_POPUP, "Mai numeri inventati: se non verificato, 'da verificare'", CONTRATTO],
    stato: "Da collaudare con Valerio (uno alla volta).",
  },
  "solar-caroselli": {
    comeLavora: "Prende il piano del giorno e produce il carosello: copy on-brand e slide secondo il design-system SolarBack (8 slide, grafite + oro, testo renderizzato con font veri, mai testo generato dentro l'AI). Lo mette in attesa di approvazione.",
    tools: [
      { name: "Design-system docs/20", desc: "Palette, griglia, template 8 slide, check anti-AI" },
      { name: "Kie AI (GPT Image 2)", desc: "Solo sfondi/atmosfere, solo dopo collaudo: 6 crediti a immagine" },
      { name: "Mission Control API", desc: "approval_add + persist_asset + feed" },
    ],
    skill: ["Skill dedicata solar-caroselli (SKILL.md + reference.md)", "Copywriting italiano umano (mai il trattino lungo)", "Check anti-AI prima di consegnare"],
    giro: [
      { t: "Dipendenza", d: "Se manca piano:oggi → 'salto: manca il piano' nel feed e chiudi (ok, 0)" },
      { t: "Scrivi", d: "Hook, 6 slide di valore, prova, CTA singola" },
      { t: "Componi", d: "Slide con font veri; sfondo AI solo se collaudato" },
      { t: "Consegna", d: "approval_add(kind=carosello) + persist_asset + run_finish" },
    ],
    regole: [APPROVAZIONE, "Kie: crediti solo dopo collaudo, mai generazioni a caso", NO_POPUP, CONTRATTO],
    stato: "Da collaudare con Valerio (uno alla volta).",
  },
  "solar-video": {
    comeLavora: "Un video short al giorno nato dal piano: hook nei primi 3 secondi, script in italiano umano, sottotitoli on-brand, avatar AI dichiarato dove serve. Generazione con Veo 3.1 Lite via Kie (35 crediti ogni 8 secondi): parte solo dopo collaudo.",
    tools: [
      { name: "Kie AI (Veo 3.1 Lite 1080p)", desc: "Image-to-video, clip da 8s, montaggio 3-6 clip" },
      { name: "docs/ricerca/2026-video-avatar", desc: "Regia, retention, disclosure EU AI Act" },
      { name: "Mission Control API", desc: "approval_add(kind=video) + persist_asset" },
    ],
    skill: ["Skill dedicata solar-video (SKILL.md + reference.md)", "Formula prompt Veo: cinematography + subject + action + context + style", "Disclosure 'Creato con AI' su ogni pubblicazione"],
    giro: [
      { t: "Dipendenza", d: "Senza piano:oggi non lavora a vuoto: salto + chiudi" },
      { t: "Script e regia", d: "3 hook, script 15-25s, prompt Veo dettagliato" },
      { t: "Genera e QA", d: "Massimo 1 rigenerazione al giorno; checklist qualità severa" },
      { t: "Consegna", d: "In attesa di approvazione, poi run_finish" },
    ],
    regole: ["Budget fisso: un video + massimo una rigenerazione al giorno", "Se il video 'sa di AI' non si propone: si riparte dalla regia", APPROVAZIONE, CONTRATTO],
    stato: "In collaudo: nessun credito Kie finché il ruolo non è validato da Valerio.",
  },
  "solar-blog": {
    comeLavora: "Un articolo SEO a settimana per titolari di aziende di installazione fotovoltaica (guide, dati di mercato verificati, casi). Bozza in dashboard; pubblicazione sul blog di solarback.it quando il sito è pronto.",
    tools: [
      { name: "Ricerca online", desc: "Dati sempre da fonti verificabili con URL" },
      { name: "Mission Control API", desc: "approval_add(kind=blog)" },
    ],
    skill: ["Skill dedicata solar-blog (da definire)", "SEO 2026 + copy italiano umano"],
    giro: [
      { t: "Tema", d: "Dal piano settimanale o dai dati di mercato" },
      { t: "Scrivi", d: "Articolo completo, fonti citate" },
      { t: "Consegna", d: "Bozza in attesa di approvazione" },
    ],
    regole: [APPROVAZIONE, "Mai numeri inventati", CONTRATTO],
    stato: "In pausa: non prioritario. Si attiva dopo gli altri ruoli.",
  },
  "solar-linkedin": {
    comeLavora: "Ruolo sempre live: ogni ora (e via webhook sulla inbox, quando collegata) contatta i titolari in target dal DB, presidia i messaggi, risponde subito, qualifica e fissa meeting. Template e volumi giornalieri approvati da Valerio una volta; pacing umano, mai bot di massa.",
    tools: [
      { name: "Unipile (LinkedIn)", desc: "Inviti, DM, inbox. Piano fisso €49/mese" },
      { name: "Supabase (persone/aziende)", desc: "Titolari in target con URL LinkedIn" },
      { name: "Mission Control API", desc: "outreach_add, meeting_add, feed" },
    ],
    skill: ["Skill dedicata solar-linkedin (da definire con Valerio)", "Template DM approvati a monte", "Qualifica: zona, volume sopralluoghi desiderato, decisore"],
    giro: [
      { t: "Inbox prima di tutto", d: "Risposte arrivate → rispondi subito, aggiorna stato" },
      { t: "Nuovi contatti", d: "Entro il volume giornaliero approvato, dal DB" },
      { t: "Meeting", d: "Quando qualificato: proponi slot, meeting_add" },
      { t: "Chiudi il giro", d: "run_finish con contati inviati/risposte/meeting" },
    ],
    regole: ["Volumi e template: decisi da Valerio, mai superati", "Pacing umano: LinkedIn ha stretto su pod e automazioni (2026)", NO_POPUP, CONTRATTO],
    stato: "Da definire con Valerio (volumi, template). Poi collaudo.",
  },
  "solar-instagram": {
    comeLavora: "Stessa missione dello squalo LinkedIn, su Instagram: DM ai titolari in target, inbox presidiata, risposte immediate, meeting fissati. Sempre live, template approvati, pacing umano.",
    tools: [
      { name: "Unipile (Instagram)", desc: "DM e inbox" },
      { name: "Supabase (persone/aziende)", desc: "Aziende con profilo Instagram" },
      { name: "Mission Control API", desc: "outreach_add, meeting_add, feed" },
    ],
    skill: ["Skill dedicata solar-instagram (da definire con Valerio)", "Template DM approvati a monte"],
    giro: [
      { t: "Inbox prima di tutto", d: "Rispondi subito a chi ha scritto" },
      { t: "Nuovi DM", d: "Entro il volume giornaliero approvato" },
      { t: "Meeting", d: "Qualifica e fissa" },
      { t: "Chiudi il giro", d: "run_finish" },
    ],
    regole: ["Volumi e template: decisi da Valerio", "Pacing umano, mai bot di massa", NO_POPUP, CONTRATTO],
    stato: "Da definire con Valerio (volumi, template). Poi collaudo.",
  },
  "solar-scout": {
    comeLavora: "Ogni mattina cerca nuove aziende e titolari in target (attori Apify del registro docs/18, con cap di spesa per giro), verifica le email, arricchisce il DB Supabase e riporta quanti contatti nuovi ha trovato.",
    tools: [
      { name: "Apify (nativo)", desc: "leads-finder, harvestapi, snipercoder, verifier: solo attori del registro" },
      { name: "Supabase (scrittura su public)", desc: "aziende, persone, verifica_email" },
      { name: "Mission Control API", desc: "feed + kv scout:ultimo + run_finish" },
    ],
    skill: ["Skill dedicata solar-scout (da definire)", "Registro attori docs/18: mai attori bocciati", "Cap di spesa per giro"],
    giro: [
      { t: "Scegli il bacino", d: "Aziende senza titolare, per priorità ICP" },
      { t: "Arricchisci", d: "Attore giusto per il caso (docs/18 §3)" },
      { t: "Verifica", d: "Email con il verifier, poi promuovi" },
      { t: "Riporta", d: "Quanti nuovi titolari/email, costo del giro" },
    ],
    regole: ["Consulta SEMPRE docs/18 prima di ogni scraping", "Cap di spesa fisso per giro", "Rate-limit: non martellare, riprogramma", CONTRATTO],
    stato: "Da collaudare (la pipeline esiste già: L2 cascade).",
  },
  "solar-data-analyst": {
    comeLavora: "Ogni sera legge tutto (DB, giri, feed, approvazioni, outreach) e chiude la giornata: KPI, funnel Contatto → Interessato → Qualificato → Partner, cosa ha funzionato, cosa no, cosa cambiare domani. Aggiorna anche i costi (crediti Kie).",
    tools: [
      { name: "Supabase (lettura)", desc: "Funnel, liste, tabelle mc" },
      { name: "Kie AI (saldo)", desc: "Legge i crediti rimasti per il pannello costi" },
      { name: "Mission Control API", desc: "kv_set analyst:ultimo + kv costi/kie + feed" },
    ],
    skill: ["Skill dedicata solar-data-analyst (da definire)", "Mai numeri inventati: solo query"],
    giro: [
      { t: "Raccogli", d: "Digest + query KPI" },
      { t: "Analizza", d: "Delta vs ieri, anomalie, errori dei giri" },
      { t: "Scrivi il report", d: "kv_set analyst:ultimo, feed" },
      { t: "Chiudi", d: "run_finish" },
    ],
    regole: ["Solo dati verificati", "Segnala in rosso i giri in errore", CONTRATTO],
    stato: "Da collaudare.",
  },
};
