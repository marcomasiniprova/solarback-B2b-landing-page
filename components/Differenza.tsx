'use client'


import { motion } from 'framer-motion'

const agencySteps = ['Pubblicità', 'Lead', 'Fine.']
const solarbackSteps = ['Marketing', 'Richiesta', 'Contatto', 'Qualificazione', 'Sopralluogo']

export function Differenza() {
  return (
    <section id="differenza" className="sb-section">
      <div className="sb-container">
        <div className="head-center">
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="eyebrow"><span className="dot" />Perché siamo diversi</div>
          </motion.div>
          <motion.h2 className="sb-h2" initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.08 }}>
            Le agenzie si fermano al lead.<br />
            <span className="gold-shine">Noi arriviamo al sopralluogo.</span>
          </motion.h2>
        </div>

        <div className="diff-grid">
          <div className="diff-box agency">
            <h3>Le agenzie marketing si fermano qui</h3>
            {agencySteps.map((s, i) => (
              <div key={s}>
                <div className="diff-step agency-step">{s}</div>
                {i < agencySteps.length - 1 && <div className="diff-arrow">↓</div>}
              </div>
            ))}
          </div>

          <div className="diff-box solarback">
            <h3>SOLARBACK arriva fino al sopralluogo</h3>
            {solarbackSteps.map((s, i) => (
              <div key={s}>
                <div className="diff-step solarback-step">{s}</div>
                {i < solarbackSteps.length - 1 && <div className="diff-arrow">↓</div>}
              </div>
            ))}
          </div>
        </div>

        <p className="diff-outro">
          SOLARBACK non è un'agenzia che genera lead:{' '}
          <strong>diventiamo il tuo sistema esterno di acquisizione clienti, fino all'appuntamento. La vendita la fa il tuo commerciale.</strong>
        </p>
      </div>
    </section>
  )
}
