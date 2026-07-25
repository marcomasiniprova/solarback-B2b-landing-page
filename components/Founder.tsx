'use client'


import { motion } from 'framer-motion'
import Image from 'next/image'

export function Founder() {
  return (
    <section id="founder" className="sb-section">
      <div className="sb-container">
        <div className="head-center" style={{ marginBottom: '4rem' }}>
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="eyebrow"><span className="dot" />Il fondatore</div>
          </motion.div>
          <motion.h2 className="sb-h2" initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.08 }}>
            Chi c&apos;è Dietro <span className="gold-shine">SOLARBACK</span>
          </motion.h2>
        </div>

        <motion.div
          className="founder-card"
          initial={{ opacity:0, y: 32 }}
          whileInView={{ opacity:1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.12, ease: 'easeOut' }}
        >
          <div className="founder-photo">
            <Image
              src="/valerio-alieri.webp"
              alt="Valerio Alieri, fondatore SOLARBACK"
              width={220}
              height={220}
            />
          </div>

          <div>
            <div className="founder-tag">Founder &amp; CEO</div>
            <div className="founder-name">Valerio Alieri</div>
            <div className="founder-role">Fondatore SOLARBACK</div>
            <p className="founder-bio">
              SOLARBACK nasce da un&apos;idea semplice: le aziende che installano fotovoltaico
              non hanno bisogno di più richieste, ma di un sistema che le trasformi in
              sopralluoghi e impianti. Noi siamo quel sistema: gestiamo il marketing,
              intercettiamo i clienti e portiamo l&apos;appuntamento pronto, così i tuoi commerciali chiudono.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
