'use client'

import { motion } from 'framer-motion'
import { GoldText } from './ui/GoldText'
import { Eyebrow } from './ui/Eyebrow'
import { Button } from './ui/Button'

export function Garanzia() {
  return (
    <section id="garanzia" className="relative z-[1] px-6 section-spacing">
      <div className="max-w-[1240px] mx-auto">
        <motion.div
          className="max-w-[920px] mx-auto relative overflow-hidden text-center rounded-[28px] border"
          style={{
            padding: '5rem 3rem',
            borderColor: 'var(--line-2)',
            background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(217,164,65,0.12) 0%, transparent 70%), var(--bg-2)',
          }}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Top border glow */}
          <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg, transparent 20%, var(--gold) 50%, transparent 80%)' }} />

          <div
            className="w-[78px] h-[78px] rounded-full mx-auto mb-7 flex items-center justify-center border"
            style={{
              background: 'radial-gradient(circle at 30% 30%, rgba(217,164,65,0.3) 0%, rgba(217,164,65,0.06) 60%, transparent 100%)',
              borderColor: 'rgba(217,164,65,0.5)',
              color: 'var(--gold)',
            }}
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 3l11 4v9c0 7-5 12-11 13-6-1-11-6-11-13V7l11-4z"/>
              <path d="M11 16l4 4 7-8"/>
            </svg>
          </div>

          <div className="flex justify-center mb-6">
            <Eyebrow>La nostra promessa</Eyebrow>
          </div>

          <h2
            className="font-black leading-[1.05] tracking-[-0.025em] mb-6"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', color: 'var(--text)' }}
          >
            O Portiamo Risultati.<br />O <GoldText>Lavoriamo Gratis</GoldText>.
          </h2>

          <p className="mx-auto mb-10 leading-[1.65]" style={{ color: 'var(--text-soft)', fontSize: '1.1rem', maxWidth: '600px' }}>
            Definiamo insieme l'obiettivo prima di partire. Se non lo raggiungiamo
            nei tempi e nei numeri concordati,{' '}
            <strong style={{ color: 'var(--gold)', fontWeight: 700 }}>
              continuiamo a lavorare senza costi aggiuntivi finché non lo raggiungiamo
            </strong>.
            Tutto scritto, nero su bianco, prima di firmare.
          </p>

          <div className="flex justify-center">
            <Button href="#candidatura" size="lg">Candidati Ora</Button>
          </div>
        </motion.div>
      </div>

      <style>{`@media (max-width: 600px) { #garanzia .max-w-\\[920px\\] { padding: 3rem 1.5rem !important; } }`}</style>
    </section>
  )
}
