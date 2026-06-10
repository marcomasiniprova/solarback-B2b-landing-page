'use client'

import { useEffect, useState } from 'react'
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

function readGeoCookie(): string | null {
  if (typeof document === 'undefined') return null
  const m = document.cookie.match(/(?:^|;\s*)geo_region=([^;]*)/)
  return m ? decodeURIComponent(m[1]) : null
}

export function Hero() {
  const [region, setRegion] = useState<string | null>(null)

  useEffect(() => {
    setRegion(readGeoCookie())
  }, [])

  return (
    <section
      id="hero"
      className="relative flex items-center justify-center text-center overflow-hidden"
      style={{ minHeight: '100vh', padding: 'clamp(9rem, 18vw, 13rem) 1.5rem clamp(5rem, 10vw, 8rem)' }}
    >
      <div className="relative z-[1] w-full" style={{ maxWidth: '1060px', margin: '0 auto' }}>
        <motion.div variants={container} initial="hidden" animate="show">

          {/* Badge */}
          <motion.div variants={item} className="flex justify-center mb-10">
            <span
              className="inline-flex items-center gap-[0.6rem] text-[0.72rem] font-bold tracking-[0.22em] uppercase px-[1.2rem] py-[0.6rem] rounded-full border"
              style={{
                color: 'var(--gold)',
                borderColor: 'rgba(217,164,65,0.3)',
                background: 'rgba(217,164,65,0.04)',
              }}
            >
              <span
                className="w-[7px] h-[7px] rounded-full dot-pulse flex-shrink-0"
                style={{ background: 'var(--gold)', boxShadow: '0 0 10px var(--gold)' }}
              />
              Solo 5 Aziende Questo Mese
            </span>
          </motion.div>

          {/* Headline — geo-personalised when available */}
          <motion.h1
            variants={item}
            className="font-black leading-[0.97] tracking-[-0.03em] mb-10"
            style={{ fontSize: 'clamp(2.6rem, 7.5vw, 5.8rem)', color: 'var(--text)' }}
          >
            {region ? (
              <>
                Generiamo Sopralluoghi<br />
                Qualificati per Installatori<br />
                di Fotovoltaico in <GoldText>{region}</GoldText>
              </>
            ) : (
              <>
                Ogni Settimana Ricevi Richieste<br />
                Che Non Diventano<br />
                Mai <GoldText>Sopralluoghi</GoldText>?
              </>
            )}
          </motion.h1>

          {/* Sub */}
          <motion.p
            variants={item}
            className="mx-auto mb-14 leading-[1.6]"
            style={{
              fontSize: 'clamp(1.05rem, 1.8vw, 1.3rem)',
              color: 'var(--text-soft)',
              maxWidth: '680px',
            }}
          >
            <strong style={{ color: 'var(--text)', fontWeight: 600 }}>Seguiamo ogni richiesta</strong>{' '}
            fino al sopralluogo, così i tuoi commerciali parlano solo con{' '}
            <strong style={{ color: 'var(--text)', fontWeight: 600 }}>persone realmente interessate</strong>.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={item}
            className="flex items-center justify-center gap-4 flex-wrap"
          >
            <Button href="#candidatura" size="xl">Candidati Ora</Button>
            <Button href="#metodo" variant="ghost" size="lg">Scopri il Metodo</Button>
          </motion.div>

          {/* Social proof strip */}
          <motion.div
            variants={item}
            className="flex items-center justify-center gap-10 flex-wrap mt-16"
            style={{ opacity: 0.55 }}
          >
            {[
              { n: '100+', label: 'Aziende analizzate' },
              { n: '48h',  label: 'Attivazione media' },
              { n: '0 €',  label: 'Fisso mensile' },
            ].map(({ n, label }) => (
              <div key={label} className="text-center">
                <div className="font-extrabold text-[1.35rem] leading-none tracking-tight" style={{ color: 'var(--text)' }}>{n}</div>
                <div className="text-[0.75rem] tracking-[0.12em] uppercase font-medium mt-1" style={{ color: 'var(--text-dim)' }}>{label}</div>
              </div>
            ))}
          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}
