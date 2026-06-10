'use client'

import { motion } from 'framer-motion'
import { GoldText } from './ui/GoldText'
import { Eyebrow } from './ui/Eyebrow'

const noList = [
  'Non ricevi richieste regolari ogni mese',
  'Non hai commerciali che fanno sopralluoghi',
  'Non sei disposto a presentarti agli appuntamenti fissati',
  "Cerchi un'agenzia che ti gestisca anche la pubblicità",
]
const yesList = [
  'Ricevi già richieste ma poche diventano sopralluoghi',
  'Vuoi un processo più ordinato per seguire i contatti',
  'Hai commerciali pronti ad andare in sopralluogo',
  'Vuoi un partner che lavori a risultato, non a canone fisso',
]

const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
    <circle cx="8" cy="8" r="6.5"/>
    <path d="M5.5 5.5l5 5M10.5 5.5l-5 5"/>
  </svg>
)
const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="8" cy="8" r="6.5"/>
    <path d="M5 8l2 2 4-4.5"/>
  </svg>
)

export function Fit() {
  return (
    <section
      id="fit"
      className="relative z-[1] px-6 py-36"
      style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}
    >
      <div className="max-w-[1240px] mx-auto">
        <div className="text-center mb-12">
          <motion.div className="flex justify-center mb-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <Eyebrow>Verifica onesta</Eyebrow>
          </motion.div>
          <motion.h2
            className="font-black leading-[1.02] tracking-[-0.025em] mb-6"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', color: 'var(--text)' }}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
          >
            Non Siamo Adatti<br />a <GoldText>Tutti</GoldText>
          </motion.h2>
          <motion.p
            className="text-center mx-auto"
            style={{ color: 'var(--text-dim)', fontSize: '1.1rem', maxWidth: '640px', lineHeight: 1.65 }}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
          >
            Lavoriamo solo dove possiamo davvero portare risultati. Ecco quando
            SOLARBACK funziona, e quando è meglio cercare altrove.
          </motion.p>
        </div>

        <div className="grid gap-6 max-w-[1000px] mx-auto" style={{ gridTemplateColumns: '1fr 1fr' }}>
          {/* Non è per te */}
          <motion.div
            className="p-10 rounded-[22px] border"
            style={{ background: 'var(--card-bg)', borderColor: 'var(--line-2)' }}
            initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <h3 className="font-bold text-[1.35rem] tracking-[-0.02em] mb-6 flex items-center gap-3" style={{ color: 'var(--text)' }}>
              <span className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--text-dim)' }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 3l8 8M11 3l-8 8"/></svg>
              </span>
              Non è per te se
            </h3>
            <ul className="flex flex-col gap-4" style={{ listStyle: 'none', padding: 0 }}>
              {noList.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-[0.98rem] leading-[1.55]" style={{ color: 'var(--text-soft)' }}>
                  <span className="flex-shrink-0 mt-1" style={{ color: 'var(--text-dim)' }}><XIcon /></span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* È perfetto per te */}
          <motion.div
            className="p-10 rounded-[22px] border"
            style={{ background: 'rgba(217,164,65,0.04)', borderColor: 'rgba(217,164,65,0.3)' }}
            initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <h3 className="font-bold text-[1.35rem] tracking-[-0.02em] mb-6 flex items-center gap-3" style={{ color: 'var(--text)' }}>
              <span className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(217,164,65,0.18)', color: 'var(--gold)' }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 7.5l3 3 6-7"/></svg>
              </span>
              È perfetto per te se
            </h3>
            <ul className="flex flex-col gap-4" style={{ listStyle: 'none', padding: 0 }}>
              {yesList.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-[0.98rem] leading-[1.55]" style={{ color: 'var(--text-soft)' }}>
                  <span className="flex-shrink-0 mt-1" style={{ color: 'var(--gold)' }}><CheckIcon /></span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      <style>{`@media (max-width: 760px) { #fit .grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  )
}
