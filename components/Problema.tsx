'use client'

import { motion } from 'framer-motion'

const problems = [
  'Richieste richiamate dopo ore o giorni',
  'Contatti che spariscono senza ricevere una risposta',
  'Commerciali che seguono i contatti solo quando hanno tempo',
  "Appuntamenti che saltano all'ultimo momento",
  'Nessun processo chiaro per il follow-up',
]

const fadeUp = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0 } }
const t = (d = 0) => ({ duration: 0.8, ease: 'easeOut' as const, delay: d })

export function Problema() {
  return (
    <section id="problema" className="sb-section">
      <div className="sb-container">
        <div className="head-center">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} transition={t()}>
            <div className="eyebrow"><span className="dot" />Il problema</div>
          </motion.div>
          <motion.h2 className="sb-h2" initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} transition={t(0.08)}>
            Il problema non è generare richieste.<br />
            È <span className="gold-shine">trasformarle</span> in sopralluoghi.
          </motion.h2>
        </div>

        <motion.div className="insight-card" initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} transition={t(0.15)}>
          <p>
            Dopo aver contattato oltre{' '}
            <span className="accent">100 aziende del settore</span>{' '}
            abbiamo visto sempre gli stessi problemi:
          </p>
          <ul className="problem-list">
            {problems.map((p, i) => (
              <li key={i}><span className="dash" />{p}</li>
            ))}
          </ul>
          <p className="resolve">
            SOLARBACK nasce per <span className="gold-shine">risolvere esattamente questo</span>.
          </p>
          <div className="insight-footer">
            Da una ricerca interna su 100+ aziende fotovoltaiche italiane
          </div>
        </motion.div>
      </div>
    </section>
  )
}
