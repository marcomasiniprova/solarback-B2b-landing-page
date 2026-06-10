'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export function Founder() {
  return (
    <section id="founder" className="sb-section">
      <div className="sb-container">
        <div className="head-center" style={{ marginBottom: '4rem' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="eyebrow"><span className="dot" />Il fondatore</div>
          </motion.div>
          <motion.h2 className="sb-h2" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.08 }}>
            Chi C&apos;è Dietro <span className="gold-shine">SOLARBACK</span>
          </motion.h2>
        </div>

        <motion.div
          className="founder-card"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.12, ease: 'easeOut' }}
        >
          <div className="founder-photo">
            <Image
              src="/marco-masini.png"
              alt="Marco Masini, fondatore SOLARBACK"
              width={220}
              height={220}
            />
          </div>

          <div>
            <div className="founder-tag">Founder &amp; CEO</div>
            <div className="founder-name">Marco Masini</div>
            <div className="founder-role">Fondatore SOLARBACK</div>
            <p className="founder-bio">
              SOLARBACK nasce da un&apos;osservazione semplice:{' '}
              <strong>migliaia di euro spesi in pubblicità, e poi richieste lasciate in sospeso per ore o giorni</strong>.
              Le aziende che installano pannelli non hanno bisogno di più richieste, ne ricevono già.
              Hanno bisogno di un processo chiaro per{' '}
              <span style={{ color: 'var(--gold)', fontWeight: 600 }}>trasformare quelle richieste in sopralluoghi reali</span>{' '}
              nell&apos;agenda dei commerciali. È esattamente quello che facciamo.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
