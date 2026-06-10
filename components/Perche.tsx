'use client'

import { motion } from 'framer-motion'

const reasons = [
  {
    title: 'Non perdi più una richiesta',
    desc: 'Ogni richiesta riceve una risposta. Niente più contatti dimenticati o persi nella casella email.',
    icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="9"/><path d="M6 11l4 4 6-7"/></svg>,
  },
  {
    title: 'Il commerciale non insegue nessuno',
    desc: "Lui apre l'agenda, trova l'appuntamento già fissato e va. Smette di rincorrere chi non risponde.",
    icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="9"/><path d="M11 6v5l3 2"/></svg>,
  },
  {
    title: 'Continui a usare i tuoi strumenti',
    desc: "Non devi cambiare gestionale, formare il personale o imparare nulla di nuovo. Lavoriamo intorno al tuo processo.",
    icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="6" width="16" height="12" rx="2"/><path d="M3 10h16M7 14h2"/></svg>,
  },
  {
    title: 'Paghi solo a risultato',
    desc: 'Niente canoni fissi. Niente costi mensili. Paghi soltanto quando ti portiamo sopralluoghi qualificati in agenda.',
    icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M11 2v18"/><path d="M15 6h-6a2 2 0 0 0 0 4h4a2 2 0 0 1 0 4H8"/></svg>,
  },
]

export function Perche() {
  return (
    <section id="perche" className="sb-section">
      <div className="sb-container">
        <div className="head-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="eyebrow"><span className="dot" />Perché sceglierci</div>
          </motion.div>
          <motion.h2 className="sb-h2" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.08 }}>
            Perché Le Aziende<br />Ci <span className="gold-shine">Scelgono</span>
          </motion.h2>
        </div>

        <div className="why-grid">
          {reasons.map((r, i) => (
            <motion.div
              key={i}
              className="why-row"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: 'easeOut' }}
            >
              <div className="why-icon">{r.icon}</div>
              <div>
                <h3>{r.title}</h3>
                <p>{r.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
