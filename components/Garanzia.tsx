import { motion } from 'framer-motion'

export function Garanzia() {
  return (
    <section id="garanzia">
      <div className="sb-container">
        <motion.div
          className="guarantee"
          initial={{ opacity:0, y:32 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="guarantee-seal">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 3l11 4v9c0 7-5 12-11 13-6-1-11-6-11-13V7l11-4z"/>
              <path d="M11 16l4 4 7-8"/>
            </svg>
          </div>

          <div className="eyebrow" style={{ marginBottom: '1.5rem' }}>
            <span className="dot" />La nostra promessa
          </div>

          <h2>
            Un obiettivo misurabile.<br />
            O <span className="gold-shine">lavoriamo gratis</span>.
          </h2>

          <p>
            Definiamo insieme un obiettivo misurabile di nuovi sopralluoghi e contratti prima di partire. Se non lo
            raggiungiamo,{' '}
            <strong>
              continuiamo a lavorare senza costi aggiuntivi finché non lo centriamo
            </strong>.
            Tutto scritto, nero su bianco, prima di iniziare.
          </p>

          <a href="#candidatura" className="sb-btn lg">
            Prenota una chiamata
            <span className="arrow">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M3 6h6M7 3l3 3L7 9" stroke="#1a0e00" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
