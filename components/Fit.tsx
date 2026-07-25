'use client'


import { motion } from 'framer-motion'
import { reveal } from '@/lib/motion'

const noList  = [
  "Cerchi un'agenzia che ti venda semplicemente dei lead.",
  'Non hai una squadra commerciale in grado di gestire i sopralluoghi.',
  'Vuoi pagare un canone fisso indipendentemente dai risultati.',
  'Cerchi un fornitore da cambiare ogni due mesi.',
]
const yesList = [
  'Vuoi aumentare i sopralluoghi, non semplicemente i contatti.',
  'Hai un team commerciale pronto a trasformare gli appuntamenti in vendite.',
  "Cerchi un partner che gestisca l'intero processo commerciale, dal primo contatto all'appuntamento.",
  'Preferisci pagare in base ai risultati ottenuti.',
]

const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
    <circle cx="8" cy="8" r="6.5"/>
    <path d="M5.5 5.5l5 5M10.5 5.5l-5 5"/>
  </svg>
)
const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="8" cy="8" r="6.5"/>
    <path d="M5 8l2 2 4-4.5"/>
  </svg>
)

export function Fit() {
  return (
    <section id="fit" className="sb-section">
      <div className="sb-container">
        <div className="head-center">
          <motion.div {...reveal()}>
            <div className="eyebrow"><span className="dot" />Verifica onesta</div>
          </motion.div>
          <motion.h2 className="sb-h2" {...reveal(0.08)}>
            Non Siamo Adatti<br />a <span className="gold-shine">Tutti</span>
          </motion.h2>
          <motion.p className="sb-lead" {...reveal(0.16)}>
            Lavoriamo solo dove possiamo davvero portare risultati. Ecco quando
            SOLARBACK funziona, e quando è meglio cercare altrove.
          </motion.p>
        </div>

        <div className="fit-grid">
          <motion.div className="fit-card no" initial={{ opacity:0, x: -24 }} whileInView={{ opacity:1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: 'easeOut' }}>
            <h3>
              <span className="fit-mark">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 3l8 8M11 3l-8 8"/></svg>
              </span>
              Non è per te se
            </h3>
            <ul className="fit-list">
              {noList.map((item, i) => (
                <li key={i}><XIcon />{item}</li>
              ))}
            </ul>
          </motion.div>

          <motion.div className="fit-card yes" initial={{ opacity:0, x: 24 }} whileInView={{ opacity:1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: 'easeOut' }}>
            <h3>
              <span className="fit-mark">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 7.5l3 3 6-7"/></svg>
              </span>
              È perfetto per te se
            </h3>
            <ul className="fit-list">
              {yesList.map((item, i) => (
                <li key={i}><CheckIcon />{item}</li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
