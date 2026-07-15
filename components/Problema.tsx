'use client'

import { motion } from 'framer-motion'

const problems = [
  'Richiamano i contatti troppo tardi',
  'Non fanno follow-up ai lead',
  'Non hanno un processo commerciale',
  'I commerciali seguono i lead quando hanno tempo',
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
            Il problema non è solo generare richieste.<br />
            È <span className="gold-shine">trasformarle in sopralluoghi e contratti</span>.
          </motion.h2>
        </div>

        <motion.div className="insight-card" initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} transition={t(0.15)}>
          <p>
            Ogni richiesta lasciata senza risposta entro pochi minuti è
            un'opportunità che rischia di finire a un concorrente. Molte aziende
            investono migliaia di euro in marketing, ma poi perdono clienti perché
            non hanno un processo che li segua fino in fondo.
          </p>
          <ul className="problem-list">
            {problems.map((p, i) => (
              <li key={i}><span className="dash" />{p}</li>
            ))}
          </ul>
          <p className="resolve">
            SOLARBACK nasce per <span className="gold-shine">eliminare queste perdite</span> e
            trasformare più richieste in sopralluoghi.
          </p>
          <div className="insight-footer">
            Dal lavoro con installatori fotovoltaici in Italia
          </div>
        </motion.div>
      </div>
    </section>
  )
}
