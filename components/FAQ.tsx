'use client'

import { motion } from 'framer-motion'
import { FAQ_ENTRIES } from '@/lib/faq'

export function FAQ() {
  return (
    <section className="sb-section" id="faq" style={{ borderTop: '1px solid var(--line)' }}>
      <div className="sb-container">
        <div className="head-center">
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="eyebrow"><span className="dot" />Domande Frequenti</div>
          </motion.div>
          <motion.h2 className="sb-h2" initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.08 }}>
            Tutto Quello Che Vuoi<br />Sapere su <span className="gold-shine">SOLARBACK</span>
          </motion.h2>
        </div>

        <motion.div className="faq-list" initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.12 }}>
          {FAQ_ENTRIES.map(({ q, a }, i) => (
            <details key={i} className="faq-item">
              <summary>
                <span>{q}</span>
                <span className="faq-chevron" aria-hidden="true">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                    <path d="M2 3.5l3 3 3-3"/>
                  </svg>
                </span>
              </summary>
              <div className="faq-body">{a}</div>
            </details>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
