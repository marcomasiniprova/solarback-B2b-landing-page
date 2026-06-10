'use client'

import { motion } from 'framer-motion'

const items = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
    label: 'Turbopack — Caricamento < 1s',
    desc: 'Il sito usa Next.js con Turbopack: il codice viene compresso e ottimizzato in automatico. Google misura la velocità e ti posiziona più in alto nei risultati di ricerca.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    ),
    label: 'Server Action — Dati Protetti',
    desc: 'Quando un cliente si candida, i dati vengono verificati in tempo reale sul server e spediti via Resend senza far ricaricare la pagina — sicuro, professionale, senza intoppi.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    label: 'GEO-Targeting — Headline Dinamica',
    desc: 'Tramite middleware Edge, rileviamo la regione italiana del visitatore e personalizziamo il titolo della pagina in tempo reale: "Installa in Lombardia? Ecco il sistema per te."',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
    label: 'AIO & Schema Markup — Visibile alle AI',
    desc: 'Dati strutturati JSON-LD su ogni pagina: Perplexity, Gemini e ChatGPT leggono la categoria del servizio e raccomandano SOLARBACK quando qualcuno cerca "lead generation fotovoltaico Italia".',
  },
]

export function TechVantaggi() {
  return (
    <section
      className="relative z-[1] px-6 py-24"
      style={{ background: 'var(--bg)', borderTop: '1px solid var(--line)' }}
    >
      <div className="max-w-[1240px] mx-auto">

        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span
            className="inline-flex items-center gap-2 text-[0.7rem] font-bold tracking-[0.22em] uppercase px-4 py-2 rounded-full border mb-6"
            style={{ color: 'var(--gold)', borderColor: 'rgba(217,164,65,0.25)', background: 'rgba(217,164,65,0.04)' }}
          >
            Tecnologia 2026
          </span>
          <h2
            className="font-black leading-[1.05] tracking-[-0.025em]"
            style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)', color: 'var(--text)' }}
          >
            Costruito con la tecnologia più avanzata del mercato
          </h2>
        </motion.div>

        <div className="tech-grid">
          {items.map((item, i) => (
            <motion.div
              key={i}
              className="flex flex-col gap-4 p-7 rounded-[18px] border"
              style={{
                background: 'rgba(255,255,255,0.018)',
                borderColor: 'rgba(255,255,255,0.08)',
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.07, ease: 'easeOut' }}
            >
              <div
                className="w-[44px] h-[44px] rounded-[12px] flex items-center justify-center border flex-shrink-0"
                style={{ background: 'rgba(217,164,65,0.07)', borderColor: 'rgba(217,164,65,0.2)', color: 'var(--gold)' }}
              >
                {item.icon}
              </div>
              <div>
                <p className="font-bold text-[0.95rem] mb-2 tracking-[-0.01em]" style={{ color: 'var(--text)' }}>{item.label}</p>
                <p className="text-[0.87rem] leading-[1.65]" style={{ color: 'var(--text-dim)' }}>{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .tech-grid {
          display: grid;
          gap: 1.25rem;
          grid-template-columns: repeat(4, 1fr);
        }
        @media (max-width: 1100px) { .tech-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px)  { .tech-grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  )
}
