import { motion } from 'framer-motion'

const steps = [
  'Contattiamo rapidamente ogni richiesta',
  'La qualifichiamo',
  'Fissiamo il sopralluogo',
  'Consegniamo un appuntamento pronto ai tuoi commerciali',
]

export function PerditaClienti() {
  return (
    <section id="perdita" className="sb-section">
      <div className="sb-container">
        <div className="head-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="eyebrow"><span className="dot" />Il rischio nascosto</div>
          </motion.div>
          <motion.h2 className="sb-h2" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.08 }}>
            Perché gli installatori<br />perdono <span className="gold-shine">clienti</span>
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.12 }}
          style={{ maxWidth: 820, margin: '0 auto' }}
        >
          <p style={{ fontSize: '1.15rem', lineHeight: 1.7, color: 'var(--text)' }}>
            Ogni richiesta lasciata senza risposta entro pochi minuti ha ottime probabilità di trasformarsi in un contratto perso.
          </p>
          <p style={{ fontSize: '1.15rem', lineHeight: 1.7, color: 'var(--gold)', fontWeight: 600, marginTop: '0.5rem' }}>
            SOLARBACK nasce per evitare che questo accada.
          </p>

          <ul style={{ listStyle: 'none', padding: 0, margin: '2rem 0 0', display: 'grid', gap: '0.9rem' }}>
            {steps.map((s) => (
              <li key={s} style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', padding: '1rem 1.3rem', borderRadius: '14px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--line)' }}>
                <span style={{ color: 'var(--gold)', flexShrink: 0, display: 'inline-flex' }}>
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="9"/><path d="M6 11l4 4 6-7"/></svg>
                </span>
                <span style={{ color: 'var(--text)', fontWeight: 600, fontSize: '1.05rem' }}>{s}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
