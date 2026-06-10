'use client'

import { motion } from 'framer-motion'

const items = [
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
    label: 'Turbopack — Caricamento < 1s',
    desc: 'Next.js con Turbopack comprime e ottimizza il codice in automatico. Google misura la velocità e ti posiziona più in alto.',
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
    label: 'Server Action — Dati Protetti',
    desc: 'La candidatura viene verificata sul server in tempo reale e inviata via Resend in modo sicuro, senza ricaricare la pagina.',
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
    label: 'GEO-Targeting — Headline Dinamica',
    desc: 'Il middleware Edge rileva la regione italiana del visitatore e personalizza il titolo della pagina in tempo reale.',
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
    label: 'AIO & Schema Markup — Visibile alle AI',
    desc: 'JSON-LD su ogni pagina: Perplexity, Gemini e ChatGPT leggono il servizio e raccomandano SOLARBACK nelle loro risposte.',
  },
]

export function TechVantaggi() {
  return (
    <section className="sb-section tight" style={{ borderTop: '1px solid var(--line)' }}>
      <div className="sb-container">
        <div className="head-center" style={{ marginBottom: '2.5rem' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="eyebrow">Tecnologia 2026</div>
          </motion.div>
          <motion.h2 className="sb-h2" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)', marginTop: '1.5rem' }}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.08 }}>
            Costruito con la tecnologia più avanzata del mercato
          </motion.h2>
        </div>

        <div className="tech-grid">
          {items.map((item, i) => (
            <motion.div
              key={i}
              className="tech-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.07, ease: 'easeOut' }}
            >
              <div className="tech-icon">{item.icon}</div>
              <div>
                <p>{item.label}</p>
                <p>{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
