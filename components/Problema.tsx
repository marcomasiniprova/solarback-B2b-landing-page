'use client'

import { motion } from 'framer-motion'
import { GoldText } from './ui/GoldText'
import { Eyebrow } from './ui/Eyebrow'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0 },
}

const fadeTransition = { duration: 0.8, ease: 'easeOut' as const }

const problems = [
  'Richieste richiamate dopo ore o giorni',
  'Contatti che spariscono senza ricevere una risposta',
  'Commerciali che seguono i contatti solo quando hanno tempo',
  'Appuntamenti che saltano all\'ultimo momento',
  'Nessun processo chiaro per il follow-up',
]

export function Problema() {
  return (
    <section
      id="problema"
      className="relative z-[1] px-6 section-spacing"
      style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}
    >
      <div className="max-w-[1240px] mx-auto">
        <div className="text-center mb-10">
          <motion.div className="flex justify-center mb-8" initial="hidden" whileInView="show" viewport={{ once: true, margin: '-50px' }} variants={fadeUp} transition={fadeTransition}>
            <Eyebrow>Il problema</Eyebrow>
          </motion.div>
          <motion.h2
            className="font-black leading-[1.02] tracking-[-0.025em] text-center mb-6"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', color: 'var(--text)' }}
            initial="hidden" whileInView="show" viewport={{ once: true, margin: '-50px' }} variants={fadeUp}
          >
            Il problema non è generare richieste.<br />
            È <GoldText>trasformarle</GoldText> in sopralluoghi.
          </motion.h2>
        </div>

        <motion.div
          className="max-w-[760px] mx-auto relative"
          style={{
            padding: '3.5rem 3rem',
            border: '1px solid var(--line-2)',
            borderRadius: '24px',
            background: 'linear-gradient(180deg, rgba(217,164,65,0.04) 0%, transparent 100%)',
          }}
          initial="hidden" whileInView="show" viewport={{ once: true, margin: '-50px' }} variants={fadeUp}
        >
          {/* Top line accent */}
          <div className="absolute top-[-1px] left-6 right-6 h-[1.5px]" style={{ background: 'linear-gradient(90deg, transparent 0%, var(--gold) 50%, transparent 100%)' }} />

          <p className="mb-8" style={{ fontSize: '1.15rem', color: 'var(--text-soft)', fontWeight: 400 }}>
            Dopo aver contattato oltre{' '}
            <span style={{ color: 'var(--gold)', fontWeight: 700 }}>100 aziende del settore</span>{' '}
            abbiamo visto sempre gli stessi problemi:
          </p>

          <ul className="flex flex-col gap-4" style={{ listStyle: 'none', padding: 0 }}>
            {problems.map((p, i) => (
              <li key={i} className="flex items-start gap-5" style={{ color: 'var(--text)', fontSize: '1.08rem', lineHeight: 1.5, fontWeight: 500 }}>
                <span className="flex-shrink-0 mt-[0.85rem] h-[2px] w-6 rounded-full opacity-85" style={{ background: 'var(--gold)' }} />
                {p}
              </li>
            ))}
          </ul>

          <p className="mt-9" style={{ fontSize: '1.2rem', color: 'var(--text)', fontWeight: 600 }}>
            SOLARBACK nasce per <GoldText>risolvere esattamente questo</GoldText>.
          </p>

          <div className="mt-6 pt-6 inline-block text-[0.82rem] tracking-[0.16em] uppercase font-medium" style={{ color: 'var(--text-dim)', borderTop: '1px solid var(--line)' }}>
            Da una ricerca interna su 100+ aziende fotovoltaiche italiane
          </div>
        </motion.div>
      </div>
    </section>
  )
}
