'use client'

import { motion } from 'framer-motion'

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
    <section id="hero">
      <div className="hero-content">
        <motion.div variants={container} initial="hidden" animate="show">

          <motion.div variants={item}>
            <div className="hero-tag">
              <span className="dot" />
              Reparto Acquisizione Clienti Esterno
            </div>
          </motion.div>

          <motion.h1 className="hero-h1" variants={item}>
            Installi fotovoltaico?<br />
            Portiamo persone realmente interessate<br />
            al fotovoltaico <span className="gold-shine">davanti ai tuoi commerciali</span>.
          </motion.h1>

          <motion.p className="hero-sub" variants={item}>
            Tu pensi agli impianti. Noi ci occupiamo di trovare i clienti
            e portarli fino all'appuntamento. Generiamo richieste qualificate
            e le trasformiamo in sopralluoghi pronti.
          </motion.p>

          <motion.p className="hero-sub" variants={item} style={{ color: 'var(--gold)', fontWeight: 600, marginTop: '0.4rem' }}>
            Paghi solo a risultato.
          </motion.p>

          <motion.div className="hero-cta-row" variants={item}>
            <a href="#candidatura" className="sb-btn xl">
              Prenota una chiamata
              <span className="arrow">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M3 6h6M7 3l3 3L7 9" stroke="#1a0e00" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </a>
          </motion.div>

          <motion.div className="hero-stats" variants={item}>
            {[
              { n: 'Sopralluoghi pronti', l: 'Li portiamo noi' },
              { n: '7 giorni', l: 'Sei operativo' },
              { n: 'Zero', l: 'Canone fisso' },
            ].map(({ n, l }) => (
              <div key={l} style={{ textAlign: 'center' }}>
                <div className="hero-stat-n">{n}</div>
                <div className="hero-stat-l">{l}</div>
              </div>
            ))}
          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}
