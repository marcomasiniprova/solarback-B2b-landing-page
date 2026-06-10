'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { GoldText } from './ui/GoldText'
import { Eyebrow } from './ui/Eyebrow'

export function Founder() {
  return (
    <section
      id="founder"
      className="relative z-[1] px-6 section-spacing"
      style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}
    >
      <div className="max-w-[1240px] mx-auto">
        <div className="text-center mb-16">
          <motion.div className="flex justify-center mb-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <Eyebrow>Il fondatore</Eyebrow>
          </motion.div>
          <motion.h2
            className="font-black leading-[1.02] tracking-[-0.025em]"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', color: 'var(--text)' }}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
          >
            Chi C'è Dietro <GoldText>SOLARBACK</GoldText>
          </motion.h2>
        </div>

        <motion.div
          className="grid items-center gap-12 max-w-[880px] mx-auto"
          style={{ gridTemplateColumns: 'auto 1fr' }}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
        >
          <div
            className="relative flex-shrink-0 rounded-full overflow-hidden border-2 flex items-center justify-center"
            style={{
              width: 220, height: 220,
              borderColor: 'rgba(217,164,65,0.4)',
              background: 'linear-gradient(135deg, #1a1208 0%, #0a0a0a 100%)',
              boxShadow: '0 30px 80px -20px rgba(217,164,65,0.18), 0 0 0 8px rgba(217,164,65,0.04)',
            }}
          >
            <Image
              src="/marco-masini.png"
              alt="Marco Masini, fondatore SOLARBACK"
              width={220}
              height={220}
              className="w-full h-full object-cover block"
              style={{ filter: 'grayscale(0.05) contrast(1.05)' }}
            />
          </div>

          <div>
            <div className="text-[0.72rem] font-bold tracking-[0.22em] uppercase mb-3" style={{ color: 'var(--gold)' }}>Founder &amp; CEO</div>
            <div className="font-extrabold text-[2rem] leading-[1.05] tracking-[-0.02em] mb-1" style={{ color: 'var(--text)' }}>Marco Masini</div>
            <div className="text-[0.95rem] mb-5" style={{ color: 'var(--text-dim)' }}>Fondatore SOLARBACK</div>
            <p className="text-[1rem] leading-[1.7]" style={{ color: 'var(--text-soft)', maxWidth: '560px' }}>
              SOLARBACK nasce da un'osservazione semplice:{' '}
              <strong style={{ color: 'var(--text)', fontWeight: 600 }}>migliaia di euro spesi in pubblicità, e poi richieste lasciate in sospeso per ore o giorni</strong>.
              Le aziende che installano pannelli non hanno bisogno di più richieste, ne ricevono già.
              Hanno bisogno di un processo chiaro per{' '}
              <span style={{ color: 'var(--gold)', fontWeight: 600 }}>trasformare quelle richieste in sopralluoghi reali</span>{' '}
              nell'agenda dei commerciali. È esattamente quello che facciamo.
            </p>
          </div>
        </motion.div>
      </div>

      <style>{`@media (max-width: 680px) { #founder .grid { grid-template-columns: 1fr !important; gap: 1.5rem; text-align: center; } }`}</style>
    </section>
  )
}
