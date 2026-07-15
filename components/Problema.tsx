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
            È <span className="gold-shine">fissarle</span> come appuntamenti.
          </motion.h2>
        </div>

        <motion.div className="insight-card" initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} transition={t(0.15)}>
          <p>
            Nel lavoro con gli installatori di fotovoltaico
            vediamo sempre <span className="accent">gli stessi problemi</span>:
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
            Dal lavoro con installatori fotovoltaici in Italia
          </div>
        </motion.div>
      </div>
    </section>
  )
}
