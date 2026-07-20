'use client'

import { motion } from 'framer-motion'

const problems = [
  { title: 'Richieste discontinue', desc: 'Il flusso di nuove opportunità arriva a singhiozzo, senza costanza settimanale.' },
  { title: 'Sopralluoghi poco qualificati', desc: 'Pochi appuntamenti realmente interessati e pronti a procedere.' },
  { title: 'Commerciali fermi', desc: 'Giornate poco produttive quando l\'agenda resta vuota.' },
  { title: 'Crescita imprevedibile', desc: 'Alcuni mesi pieni, altri quasi vuoti: impossibile pianificare.' },
]

const fadeUp = { hidden: { opacity:0, y: 28 }, show: { opacity:1, y: 0 } }
const t = (d = 0) => ({ duration: 0.8, ease: 'easeOut' as const, delay: d })

export function Problema() {
  return (
    <section id="problema" className="sb-section">
      <div className="sb-container">
        <div className="head-center">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} transition={t()}>
            <div className="eyebrow"><span className="dot" />Il contesto di mercato</div>
          </motion.div>
          <motion.h2 className="sb-h2" initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} transition={t(0.08)}>
            Perché oggi molti installatori<br />
            crescono <span className="gold-shine">meno del previsto</span>
          </motion.h2>
          <motion.p className="sb-lead" initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} transition={t(0.16)}>
            Non basta lavorare bene. Per crescere servono nuove opportunità
            commerciali ogni settimana.
          </motion.p>
        </div>

        <motion.div className="insight-card" initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} transition={t(0.15)}>
          <p>
            Molte aziende dipendono ancora dal passaparola o da campagne
            pubblicitarie gestite senza continuità. Il risultato è semplice:
            alcuni mesi l'agenda è piena, altri è quasi vuota.
          </p>
          <p style={{ marginTop: '1rem' }}>
            Nel frattempo i commerciali restano senza appuntamenti oppure
            lavorano con contatti poco interessati.
          </p>
          <ul className="problem-list">
            {problems.map((p, i) => (
              <li key={i}>
                <span className="problem-bullet">{String(i + 1).padStart(2, '0')}</span>
                <div className="problem-body">
                  <strong>{p.title}</strong>
                  <span>{p.desc}</span>
                </div>
              </li>
            ))}
          </ul>
          <p className="resolve">
            È proprio questo il problema che <span className="gold-shine">SOLARBACK risolve</span>.
          </p>
          <div className="insight-footer">
            Dal lavoro con installatori fotovoltaici in Italia
          </div>
        </motion.div>
      </div>
    </section>
  )
}
