'use client'

import { motion } from 'framer-motion'

const agencySteps = ['Pubblicità', 'Lead', 'Fine.']
const solarbackSteps = ['Marketing', 'Richiesta', 'Contatto', 'Qualificazione', 'Sopralluogo', 'Commerciale del cliente', 'Contratto']

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

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginTop: '1rem' }}>
          {/* Box AGENZIE: bordo grigio visibile in ENTRAMBI i temi.
              Nel tema chiaro il grigio chiaro spariva: uso un bordo scuro
              e uno sfondo leggero ma visibile, così i due blocchi
              (sinistra grigio / destra oro) sono coerenti. */}
          <div style={{ border: '1.5px solid rgba(120,120,120,0.45)', borderRadius: '20px', padding: '2rem', background: 'rgba(128,128,128,0.10)', boxShadow: '0 8px 30px rgba(0,0,0,0.18)' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', color: 'var(--text)', fontWeight: 700 }}>Le agenzie marketing si fermano qui</h3>
            {agencySteps.map((s, i) => (
              <div key={s}>
                <div style={{ padding: '1rem 1.3rem', borderRadius: '12px', background: 'rgba(128,128,128,0.12)', border: '1px solid rgba(120,120,120,0.35)', color: 'var(--text)', fontWeight: 600, fontSize: '1.05rem' }}>{s}</div>
                {i < agencySteps.length - 1 && <div style={{ textAlign: 'center', color: 'var(--text-dim)', padding: '0.5rem 0', fontSize: '1.1rem' }}>↓</div>}
              </div>
            ))}
          </div>

          {/* Box SOLARBACK: bordo oro ben visibile, sfondo oro tenue */}
          <div style={{ border: '1.5px solid rgba(217,164,65,0.55)', borderRadius: '20px', padding: '2rem', background: 'rgba(217,164,65,0.07)', boxShadow: '0 8px 30px rgba(217,164,65,0.12)' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', color: 'var(--gold)', fontWeight: 800 }}>SOLARBACK arriva fino al sopralluogo</h3>
            {solarbackSteps.map((s, i) => (
              <div key={s}>
                <div style={{ padding: '1rem 1.3rem', borderRadius: '12px', background: 'rgba(217,164,65,0.12)', border: '1px solid rgba(217,164,65,0.3)', color: 'var(--text)', fontWeight: 700, fontSize: '1.05rem' }}>{s}</div>
                {i < solarbackSteps.length - 1 && <div style={{ textAlign: 'center', color: 'var(--gold)', padding: '0.5rem 0', fontSize: '1.1rem' }}>↓</div>}
              </div>
            ))}
          </div>
        </div>

        <p style={{ textAlign: 'center', marginTop: '2.5rem', fontSize: '1.1rem', color: 'var(--text-soft)', maxWidth: 760, margin: '2.5rem auto 0', lineHeight: 1.6 }}>
          SOLARBACK non è un'agenzia che genera lead:{' '}
          <span style={{ color: 'var(--gold)', fontWeight: 600 }}>diventiamo il tuo sistema esterno di acquisizione clienti, fino all'appuntamento. La vendita la fa il tuo commerciale.</span>
        </p>
      </div>
    </section>
  )
}
