'use client'


import { motion } from 'framer-motion'

const steps = [
  {
    num: '01',
    title: 'Troviamo nuovi clienti',
    desc: "Ogni giorno attiviamo campagne di marketing per intercettare proprietari realmente interessati a installare un impianto fotovoltaico nella tua zona.",
    icon: <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M13 3v8M9 7l4 4 4-4"/><path d="M4 17v3a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3"/></svg>,
  },
  {
    num: '02',
    title: 'Gestiamo il primo contatto',
    desc: 'Il nostro sistema ricontatta rapidamente ogni nuova richiesta, raccoglie le informazioni necessarie e mantiene alta l\'attenzione del potenziale cliente.',
    icon: <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 20l1.5-4A8 8 0 1 1 10.5 21H5z"/><path d="M10 14h6M10 11h4"/></svg>,
  },
  {
    num: '03',
    title: 'Qualifichiamo il contatto',
    desc: 'Verifichiamo che il cliente abbia le caratteristiche giuste per un sopralluogo e raccogliamo tutte le informazioni utili al commerciale.',
    icon: <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22V11l9-7 9 7v11"/><path d="M9 22v-7h8v7"/></svg>,
  },
  {
    num: '04',
    title: 'Organizziamo il sopralluogo',
    desc: "Coordiniamo disponibilità, agenda e conferma dell'appuntamento così il tuo commerciale trova già un sopralluogo qualificato nel calendario.",
    icon: <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="5" width="18" height="17" rx="2"/><path d="M4 10h18M9 3v4M17 3v4"/><path d="M10 15l2.5 2.5L17 13"/></svg>,
  },
]

export function Metodo() {
  return (
    <section id="metodo" className="sb-section">
      <div className="sb-container">
        <div className="head-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="eyebrow"><span className="dot" />Il metodo</div>
          </motion.div>
          <motion.h2 className="sb-h2" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.08 }}>
            Come funziona il nostro<br />
            <span className="gold-shine">reparto commerciale esterno</span>
          </motion.h2>
          <motion.p className="sb-lead" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.16 }}>
            Quattro passaggi. Noi ci occupiamo ogni giorno di trovare nuovi clienti,
            gestire il processo commerciale e riempire il calendario dei tuoi commerciali.
          </motion.p>
        </div>

        <div className="flow">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              className="step"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: i * 0.09, ease: 'easeOut' }}
            >
              <span className="step-num">PASSAGGIO {s.num}</span>
              <div className="step-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="sb-lead"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ maxWidth: 820, margin: '3rem auto 0', textAlign: 'center' }}
        >
          Tu continui a installare impianti. Noi ci occupiamo ogni giorno di trovare
          nuovi clienti, gestire il processo commerciale e riempire il calendario
          dei tuoi commerciali.
        </motion.p>
      </div>
    </section>
  )
}
