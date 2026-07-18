'use client'

import { motion } from 'framer-motion'

const agencySteps = ['Pubblicità', 'Lead', 'Fine.']
const solarbackSteps = ['Marketing attivo', 'Richiesta', 'Contatto', 'Qualificazione', 'Appuntamento', 'Contratto']

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
            <span className="gold-shine">Noi portiamo il contratto.</span>
          </motion.h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '1rem' }}>
          <div style={{ border: '1px solid var(--line-2)', borderRadius: '20px', padding: '2rem', background: 'var(--card-bg)' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', color: 'var(--text-dim)' }}>Le agenzie marketing si fermano qui</h3>
            {agencySteps.map((s, i) => (
              <div key={s}>
                <div style={{ padding: '0.9rem 1.2rem', borderRadius: '12px', background: 'rgba(255,255,255,0.03)', color: 'var(--text-soft)', fontWeight: 600 }}>{s}</div>
                {i < agencySteps.length - 1 && <div style={{ textAlign: 'center', color: 'var(--text-dim)', padding: '0.4rem 0' }}>↓</div>}
              </div>
            ))}
          </div>

          <div style={{ border: '1px solid rgba(217,164,65,0.35)', borderRadius: '20px', padding: '2rem', background: 'rgba(217,164,65,0.04)' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', color: 'var(--gold)' }}>SOLARBACK segue tutto il processo</h3>
            {solarbackSteps.map((s, i) => (
              <div key={s}>
                <div style={{ padding: '0.9rem 1.2rem', borderRadius: '12px', background: 'rgba(217,164,65,0.08)', color: 'var(--text)', fontWeight: 700 }}>{s}</div>
                {i < solarbackSteps.length - 1 && <div style={{ textAlign: 'center', color: 'var(--gold)', padding: '0.4rem 0' }}>↓</div>}
              </div>
            ))}
          </div>
        </div>

        <p style={{ textAlign: 'center', marginTop: '2.5rem', fontSize: '1.1rem', color: 'var(--text-soft)', maxWidth: 760, margin: '2.5rem auto 0', lineHeight: 1.6 }}>
          SOLARBACK non è un'agenzia che genera lead:{' '}
          <span style={{ color: 'var(--gold)', fontWeight: 600 }}>diventiamo il tuo reparto commerciale da remoto e chiudiamo il contratto</span>.
        </p>
      </div>
    </section>
  )
}
