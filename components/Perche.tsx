'use client'


import { motion } from 'framer-motion'
import { reveal } from '@/lib/motion'

const reasons = [
  {
    title: 'Portiamo nuovi clienti, non solo richieste',
    desc: 'Gestiamo il marketing e intercettiamo chi cerca il fotovoltaico. Le nuove opportunità entrano nella tua azienda ogni giorno.',
    icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="9"/><path d="M6 11l4 4 6-7"/></svg>,
  },
  {
    title: 'Lavoriamo sia impianti commerciali che residenziale',
    desc: 'Gestiamo installatori, aziende ed energetiche: lo stesso sistema esterno di acquisizione per tutti i tipi di impianto.',
    icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="9"/><path d="M11 6v5l3 2"/></svg>,
  },
  {
    title: 'Il commerciale non insegue nessuno',
    desc: "Lui apre l'agenda e trova l'appuntamento già fissato: più tempo per vendere, meno tempo a rincorrere chi non risponde.",
    icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="9"/><path d="M11 6v5l3 2"/></svg>,
  },
  {
    title: 'Paghi solo a risultato',
    desc: 'Niente canoni fissi. Niente costi mensili. Paghi soltanto quando portiamo appuntamenti qualificati in agenda.',
    icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M11 2v18"/><path d="M15 6h-6a2 2 0 0 0 0 4h4a2 2 0 0 1 0 4H8"/></svg>,
  },
]

export function Perche() {
  return (
    <section id="perche" className="sb-section">
      <div className="sb-container">
        <div className="head-center">
          <motion.div {...reveal()}>
            <div className="eyebrow"><span className="dot" />Perché sceglierci</div>
          </motion.div>
          <motion.h2 className="sb-h2" {...reveal(0.08)}>
            Perché Le Aziende<br />Ci <span className="gold-shine">Scelgono</span>
          </motion.h2>
          <motion.p className="sb-lead" {...reveal(0.16)}>
            Noi siamo il tuo sistema esterno di acquisizione clienti: portiamo sopralluoghi qualificati, tu chiudi.
          </motion.p>
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
