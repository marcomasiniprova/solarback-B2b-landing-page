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
              Partner Selezionati · Pochi per Zona
            </div>
          </motion.div>

          <motion.h1 className="hero-h1" variants={item}>
            Installi fotovoltaico?<br />
            Generiamo richieste qualificate e le<br />
            trasformiamo in <span className="gold-shine">appuntamenti per i tuoi commerciali</span>.
          </motion.h1>

          <motion.p className="hero-sub" variants={item}>
            <strong>Seguiamo ogni richiesta</strong> fino all'appuntamento, così i tuoi commerciali
            parlano solo con <strong>persone realmente interessate</strong>.
          </motion.p>

          <motion.div className="hero-cta-row" variants={item}>
            <a href="#candidatura" className="sb-btn xl">
              Candidati Ora
              <span className="arrow">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M3 6h6M7 3l3 3L7 9" stroke="#1a0e00" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </a>
            <a href="#metodo" className="sb-btn ghost lg">Scopri il Metodo</a>
          </motion.div>

          <motion.div className="hero-stats" variants={item}>
            {[
              { n: '7 giorni', l: 'Sei operativo' },
              { n: '100%', l: 'A risultato' },
              { n: 'Italia', l: 'Copertura nazionale' },
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
