'use client'

import { motion } from 'framer-motion'

const problems = [
  'Non fanno abbastanza marketing per trovare nuovi clienti',
  'Richiamano i contatti troppo tardi',
  'Non gestiscono i follow-up sui lead',
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
            Il problema non è solo gestire le richieste.<br />
            È <span className="gold-shine">portarne di nuove e chiuderle in impianti</span>.
          </motion.h2>
        </div>

        <motion.div className="insight-card" initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} transition={t(0.15)}>
          <p>
            Molte aziende installatrici investono migliaia di euro e poi restano ferme: non hanno chi fa il marketing ogni giorno né un reparto che segua i contatti fino in fondo. Così i contratti finiscono dai concorrenti.
          </p>
          <ul className="problem-list">
            {problems.map((p, i) => (
              <li key={i}><span className="dash" />{p}</li>
            ))}
          </ul>
          <p className="resolve">
            SOLARBACK nasce per <span className="gold-shine">eliminare queste perdite</span> e
            portare più sopralluoghi e impianti nella tua azienda.
          </p>
          <div className="insight-footer">
            Dal lavoro con installatori fotovoltaici in Italia
          </div>
        </motion.div>
      </div>
    </section>
  )
}
