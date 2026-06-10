'use client'

import { motion } from 'framer-motion'
import { GoldText } from './ui/GoldText'
import { Button } from './ui/Button'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}
const item = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' as const } },
}

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex items-center justify-center text-center overflow-hidden"
      style={{ minHeight: '100vh', padding: '11rem 1.5rem 6rem' }}
    >
      <div className="relative z-[1] max-w-[1100px] mx-auto">
        <motion.div variants={container} initial="hidden" animate="show">

          <motion.div variants={item} className="flex justify-center mb-10">
            <span
              className="inline-flex items-center gap-[0.6rem] text-[0.74rem] font-semibold tracking-[0.22em] uppercase px-[1.2rem] py-[0.55rem] rounded-full border"
              style={{ color: 'var(--gold)', borderColor: 'rgba(217,164,65,0.3)', background: 'rgba(217,164,65,0.04)' }}
            >
              <span className="w-[7px] h-[7px] rounded-full dot-pulse" style={{ background: 'var(--gold)', boxShadow: '0 0 10px var(--gold)' }} />
              Solo 5 Aziende Questo Mese
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="font-black leading-[0.98] tracking-[-0.025em] mb-10"
            style={{ fontSize: 'clamp(2.4rem, 7vw, 5.6rem)', color: 'var(--text)' }}
          >
            Ogni Settimana Ricevi Richieste<br />
            Che Non Diventano<br />
            Mai <GoldText>Sopralluoghi</GoldText>?
          </motion.h1>

          <motion.p
            variants={item}
            className="mx-auto mb-12 leading-[1.55]"
            style={{ fontSize: 'clamp(1.1rem, 1.7vw, 1.35rem)', color: 'var(--text-soft)', maxWidth: '720px' }}
          >
            <strong style={{ color: 'var(--text)', fontWeight: 600 }}>Seguiamo ogni richiesta</strong>{' '}
            fino al sopralluogo, così i tuoi commerciali parlano solo con{' '}
            <strong style={{ color: 'var(--text)', fontWeight: 600 }}>persone realmente interessate</strong>.
          </motion.p>

          <motion.div variants={item} className="flex items-center justify-center gap-4 flex-wrap">
            <Button href="#candidatura" size="xl">Candidati Ora</Button>
            <Button href="#metodo" variant="ghost" size="lg">Scopri il Metodo</Button>
          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}
