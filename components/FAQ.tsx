'use client'

import { motion } from 'framer-motion'

const QUESTIONS = [
  {
    q: "Cos'è SOLARBACK e cosa fa esattamente?",
    a: "SOLARBACK è il primo sistema di acquisizione verticale costruito esclusivamente per aziende installatrici di fotovoltaico in Italia. Non generiamo richieste: trasformiamo quelle che già ricevi in sopralluoghi qualificati nell'agenda dei tuoi commerciali. Contattiamo ogni lead entro pochi minuti via WhatsApp, verifichiamo interesse reale e disponibilità, poi fissiamo l'appuntamento direttamente.",
  },
  {
    q: "SOLARBACK è l'agenzia giusta per la mia azienda?",
    a: "SOLARBACK è adatto alle aziende che installano fotovoltaico, ricevono già richieste ogni settimana ma faticano a trasformarle in sopralluoghi, e hanno commerciali pronti a uscire. Se invece cerchi un'agenzia che gestisca anche la tua pubblicità o non hai ancora commerciali attivi, siamo onesti: non siamo il servizio giusto per te.",
  },
  {
    q: "Quanto costa SOLARBACK e come funziona il pricing?",
    a: "SOLARBACK lavora 100% a performance: paghi €99 per ogni sopralluogo effettuato e €400 di bonus per ogni contratto residenziale firmato. Zero canone fisso, zero costi mensili. Diventiamo il tuo reparto acquisizione esterno: il nostro interesse è allineato al tuo, perché guadagniamo solo quando firmi tu.",
  },
  {
    q: "Quali risultati posso aspettarmi e in quanto tempo?",
    a: "Mentre le altre agenzie impiegano mesi a diventare operative, noi ti attiviamo in 7 giorni. All’ottavo giorno iniziano già ad arrivare i primi sopralluoghi qualificati. I numeri precisi li definiamo insieme prima di partire, nero su bianco.",
  },
  {
    q: "Come funziona il processo di qualificazione?",
    a: "Ogni richiesta che arriva dal tuo sito o dalle tue pubblicità entra nel nostro sistema. Entro pochi minuti scriviamo al contatto su WhatsApp. Poi lo chiamiamo, verifichiamo: tipo di abitazione, consumo attuale, interesse concreto e disponibilità di budget. Solo chi supera questi criteri viene inserito nell'agenda del tuo commerciale.",
  },
  {
    q: "SOLARBACK opera in tutta Italia?",
    a: "Sì, SOLARBACK lavora con installatori di fotovoltaico su tutto il territorio italiano — da Lombardia, Veneto e Piemonte al Sud. La qualificazione avviene da remoto, quindi serviamo efficacemente sia le grandi città che le zone periferiche. Se hai commerciali che coprono una o più regioni, possiamo strutturare il servizio sulla tua copertura geografica.",
  },
]

export function FAQ() {
  return (
    <section className="sb-section" id="faq" style={{ borderTop: '1px solid var(--line)' }}>
      <div className="sb-container">
        <div className="head-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="eyebrow"><span className="dot" />Domande Frequenti</div>
          </motion.div>
          <motion.h2 className="sb-h2" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.08 }}>
            Tutto Quello Che Vuoi<br />Sapere su <span className="gold-shine">SOLARBACK</span>
          </motion.h2>
        </div>

        <motion.div className="faq-list" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.12 }}>
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
