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
              Reparto Commerciale da Remoto · B2B e Residenziale
            </div>
          </motion.div>

          <motion.h1 className="hero-h1" variants={item}>
            Sei un installatore di fotovoltaico?<br />
            Portiamo noi i <span className="gold-shine">nuovi contratti</span> nella tua azienda.<br />
            Sopralluoghi pronti e <span className="gold-shine">già fissati</span><br />
            nel calendario dei tuoi commerciali.
          </motion.h1>

          <motion.p className="hero-sub" variants={item}>
            Non solo gestiamo le richieste che hai gi&agrave;: noi facciamo il marketing,
            intercettiamo chi cerca il fotovoltaico e trasformiamo quel traffico in appuntamenti qualificati.
            Tu pensi agli impianti. Noi riempiamo l'agenda.
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
              { n: 'Nuovi contratti', l: 'Li portiamo noi' },
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
