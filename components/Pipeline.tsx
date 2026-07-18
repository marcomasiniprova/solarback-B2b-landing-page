'use client'

import { motion } from 'framer-motion'

const ladder = ['Crescita prevedibile', 'Più contratti', 'Più sopralluoghi', 'Più richieste', 'Marketing attivo']

export function Pipeline() {
  return (
    <section id="pipeline" className="sb-section">
      <div className="sb-container">
        <div className="head-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="eyebrow"><span className="dot" />La certezza</div>
          </motion.div>
          <motion.h2 className="sb-h2" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.08 }}>
            Una pipeline prevedibile.<br />
            Non <span className="gold-shine">mesi pieni e mesi vuoti</span>.
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.12 }}
          style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}
        >
          <p style={{ color: 'var(--text-soft)', fontSize: '1.1rem', lineHeight: 1.7 }}>
            Non dipendere solo dal passaparola. Non sperare che il telefono squilli.
            SOLARBACK &egrave; il tuo reparto commerciale da remoto: lavora ogni giorno per generare
            nuove opportunit&agrave; commerciali e trasformarle in sopralluoghi e contratti, sia B2B che residenziale.
          </p>

          <div style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
            {ladder.map((step, i) => (
              <div key={step}>
                <div style={{
                  padding: '0.8rem 1.6rem',
                  borderRadius: '999px',
                  fontWeight: i === 0 ? 800 : 600,
                  fontSize: i === 0 ? '1.15rem' : '1rem',
                  color: i === 0 ? 'var(--gold)' : 'var(--text)',
                  background: i === 0 ? 'rgba(217,164,65,0.10)' : 'rgba(255,255,255,0.03)',
                  border: i === 0 ? '1px solid rgba(217,164,65,0.35)' : '1px solid var(--line)',
                }}>{step}</div>
                {i < ladder.length - 1 && <div style={{ textAlign: 'center', color: 'var(--text-dim)', padding: '0.35rem 0' }}>↓</div>}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
