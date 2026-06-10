'use client'

import { motion } from 'framer-motion'
import { GoldText } from './ui/GoldText'
import { Eyebrow } from './ui/Eyebrow'

const steps = [
  {
    num: '01',
    title: 'Arriva una richiesta',
    desc: 'Dal tuo sito, dalle tue pubblicità o dal passaparola online. Il contatto entra subito nel nostro sistema.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 3v8M9 7l4 4 4-4"/><path d="M4 17v3a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3"/>
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Contattiamo il cliente',
    desc: 'Scriviamo su WhatsApp entro pochi minuti, prima che il cliente si distragga o contatti qualcun altro.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 20l1.5-4A8 8 0 1 1 10.5 21H5z"/><path d="M10 14h6M10 11h4"/>
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Capiamo se è adatto',
    desc: 'Verifichiamo abitazione, consumi e interesse reale. Solo chi è davvero pronto va avanti.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 22V11l9-7 9 7v11"/><path d="M9 22v-7h8v7"/>
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Fissiamo il sopralluogo',
    desc: "L'appuntamento qualificato entra nello slot libero del commerciale. Lui arriva e parla con una persona interessata.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="5" width="18" height="17" rx="2"/><path d="M4 10h18M9 3v4M17 3v4"/><path d="M10 15l2.5 2.5L17 13"/>
      </svg>
    ),
  },
]

export function Metodo() {
  return (
    <section id="metodo" className="relative z-[1] px-6 py-36">
      <div className="max-w-[1240px] mx-auto">
        <div className="text-center mb-12">
          <motion.div className="flex justify-center mb-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <Eyebrow>Il metodo</Eyebrow>
          </motion.div>
          <motion.h2
            className="font-black leading-[1.02] tracking-[-0.025em] mb-6"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', color: 'var(--text)' }}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
          >
            Come Trasformiamo le Richieste<br />
            in <GoldText>Sopralluoghi Qualificati</GoldText>
          </motion.h2>
          <motion.p
            className="text-center mx-auto"
            style={{ color: 'var(--text-dim)', fontSize: '1.1rem', maxWidth: '640px', lineHeight: 1.65 }}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
          >
            Quattro passaggi semplici. Nessun cambiamento nel tuo modo di lavorare.
            Il sistema entra in funzione dal momento in cui la richiesta arriva.
          </motion.p>
        </div>

        <div className="grid gap-5" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
          {steps.map((step, i) => (
            <motion.div
              key={i}
              className="step-card relative border rounded-[20px] p-10 flex flex-col transition-colors duration-300 hover:border-[rgba(217,164,65,0.35)] hover:bg-[rgba(255,255,255,0.04)]"
              style={{ background: 'var(--card-bg)', borderColor: 'var(--line)' }}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: 'easeOut' }}
              whileHover={{ translateY: -4 }}
            >
              <span className="block text-[0.75rem] font-extrabold tracking-[0.2em] mb-6" style={{ color: 'var(--gold)' }}>
                PASSAGGIO {step.num}
              </span>
              <div
                className="w-[52px] h-[52px] rounded-[14px] flex items-center justify-center mb-6 border"
                style={{ background: 'rgba(217,164,65,0.08)', borderColor: 'rgba(217,164,65,0.22)', color: 'var(--gold)' }}
              >
                {step.icon}
              </div>
              <h3 className="font-bold text-[1.2rem] leading-[1.25] tracking-[-0.015em] mb-3" style={{ color: 'var(--text)' }}>
                {step.title}
              </h3>
              <p className="text-[0.95rem] leading-[1.6]" style={{ color: 'var(--text-dim)' }}>
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 980px) { #metodo .grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 540px) { #metodo .grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}
