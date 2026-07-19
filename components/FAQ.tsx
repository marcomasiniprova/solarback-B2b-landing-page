'use client'

import { motion } from 'framer-motion'

const QUESTIONS = [
  {
    q: 'Quanto costa SOLARBACK?',
    a: "Non c'è un canone fisso e non ci sono costi mensili: paghi solo quando portiamo appuntamenti qualificati nel calendario dei tuoi commerciali. L'importo preciso lo definiamo insieme nella chiamata di valutazione, perché dipende dal volume di nuovi contratti che vuoi generare e dalla tua zona. Il nostro guadagno è allineato al tuo: lavoriamo a risultato.",
  },
  {
    q: 'Quanto tempo serve per iniziare?',
    a: "Ti attiviamo in 7 giorni. All'ottavo giorno partono le prime campagne e i primi appuntamenti cominciano a entrare nell'agenda. Niente mesi di setup come con le agenzie tradizionali.",
  },
  {
    q: 'E se non funziona?',
    a: "Definiamo insieme un obiettivo misurabile di nuovi sopralluoghi e contratti prima di partire. Se non lo raggiungiamo, continuiamo a lavorare senza costi aggiuntivi finché non lo centriamo. Tutto scritto nero su bianco prima di iniziare: il rischio è nostro, non tuo.",
  },
  {
    q: 'Devo cambiare il mio CRM?',
    a: "No. Lavoriamo con il tuo sistema attuale: consegniamo gli appuntamenti già pronti nell'agenda dei tuoi commerciali, nel formato che usi oggi. Se preferisci, possiamo inviarli anche via foglio o WhatsApp. Zero stravolgimenti per il tuo team.",
  },
  {
    q: 'Lavorate in tutta Italia?',
    a: "Sì, su tutto il territorio italiano - dal Nord al Sud. La qualificazione e la prenotazione avvengono da remoto, quindi copriamo sia le grandi città che le zone periferiche, sia il residenziale che gli impianti commerciali. Se hai commerciali su una o più regioni, strutturiamo il servizio sulla tua copertura.",
  },
  {
    q: 'Quante aziende seguite oggi?',
    a: "Lavoriamo con un numero ristretto di installatori per zona, in modo da garantire risultati reali a chi è già dentro. Siamo selettivi per scelta: pochi partner, massima attenzione. Nella chiamata di valutazione ti diciamo subito se c'è ancora spazio per la tua zona.",
  },
]

export function FAQ() {
  return (
    <section className="sb-section" id="faq" style={{ borderTop: '1px solid var(--line)' }}>
      <div className="sb-container">
        <div className="head-center">
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="eyebrow"><span className="dot" />Domande Frequenti</div>
          </motion.div>
          <motion.h2 className="sb-h2" initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.08 }}>
            Tutto Quello Che Vuoi<br />Sapere su <span className="gold-shine">SOLARBACK</span>
          </motion.h2>
        </div>

        <motion.div className="faq-list" initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.12 }}>
          {QUESTIONS.map(({ q, a }, i) => (
            <details key={i} className="faq-item">
              <summary>
                <span>{q}</span>
                <span className="faq-chevron" aria-hidden="true">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                    <path d="M2 3.5l3 3 3-3"/>
                  </svg>
                </span>
              </summary>
              <div className="faq-body">{a}</div>
            </details>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
