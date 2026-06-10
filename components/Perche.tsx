'use client'

import { motion } from 'framer-motion'
import { GoldText } from './ui/GoldText'
import { Eyebrow } from './ui/Eyebrow'

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
    <section
      id="perche"
      className="relative z-[1] px-6 py-36"
      style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}
    >
      <div className="max-w-[1240px] mx-auto">
        <div className="text-center mb-12">
          <motion.div className="flex justify-center mb-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <Eyebrow>Perché sceglierci</Eyebrow>
          </motion.div>
          <motion.h2
            className="font-black leading-[1.02] tracking-[-0.025em]"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', color: 'var(--text)' }}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
          >
            Perché Le Aziende<br />Ci <GoldText>Scelgono</GoldText>
          </motion.h2>
        </div>

        <div className="grid gap-5 max-w-[1000px] mx-auto" style={{ gridTemplateColumns: '1fr 1fr' }}>
          {reasons.map((r, i) => (
            <motion.div
              key={i}
              className="flex items-start gap-6 p-8 rounded-[20px] border transition-colors duration-300 hover:border-[rgba(217,164,65,0.3)] hover:bg-[rgba(255,255,255,0.04)]"
              style={{ background: 'var(--card-bg)', borderColor: 'var(--line)' }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: 'easeOut' }}
            >
              <div
                className="flex-shrink-0 w-[46px] h-[46px] rounded-[12px] flex items-center justify-center border"
                style={{ background: 'rgba(217,164,65,0.08)', borderColor: 'rgba(217,164,65,0.22)', color: 'var(--gold)' }}
              >
                {r.icon}
              </div>
              <div>
                <h3 className="font-bold text-[1.1rem] tracking-[-0.01em] mb-2" style={{ color: 'var(--text)' }}>{r.title}</h3>
                <p className="text-[0.95rem] leading-[1.6]" style={{ color: 'var(--text-dim)' }}>{r.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`@media (max-width: 760px) { #perche .grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  )
}
