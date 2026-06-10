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
    <section
      id="metodo"
      className="relative z-[1] px-6"
      style={{
        paddingTop: 'clamp(5rem, 10vw, 9rem)',
        paddingBottom: 'clamp(5rem, 10vw, 9rem)',
      }}
    >
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>

        <div className="text-center" style={{ marginBottom: 'clamp(3rem, 6vw, 5rem)' }}>
          <motion.div
            className="flex justify-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Eyebrow>Il metodo</Eyebrow>
          </motion.div>
          <motion.h2
            className="font-black leading-[1.02] tracking-[-0.025em] mb-5"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', color: 'var(--text)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Come Trasformiamo le Richieste<br />
            in <GoldText>Sopralluoghi Qualificati</GoldText>
          </motion.h2>
          <motion.p
            className="mx-auto"
            style={{ color: 'var(--text-dim)', fontSize: 'clamp(1rem, 1.5vw, 1.15rem)', maxWidth: '600px', lineHeight: 1.65 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Quattro passaggi semplici. Nessun cambiamento nel tuo modo di lavorare.
            Il sistema entra in funzione dal momento in cui la richiesta arriva.
          </motion.p>
        </div>

        <div className="metodo-grid">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              className="step-card relative flex flex-col gap-5 rounded-[22px] border"
              style={{
                padding: 'clamp(1.8rem, 3vw, 2.5rem)',
                background: 'var(--card-bg)',
                borderColor: 'var(--line)',
              }}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: i * 0.09, ease: 'easeOut' }}
            >
              <div className="flex items-start justify-between gap-4">
                <div
                  className="w-[52px] h-[52px] rounded-[14px] flex items-center justify-center border flex-shrink-0"
                  style={{ background: 'rgba(217,164,65,0.07)', borderColor: 'rgba(217,164,65,0.2)', color: 'var(--gold)' }}
                >
                  {s.icon}
                </div>
                <span
                  className="font-black text-[2.6rem] leading-none tracking-tight select-none"
                  style={{ color: 'rgba(255,255,255,0.04)' }}
                >
                  {s.num}
                </span>
              </div>

              <div>
                <div className="text-[0.68rem] font-bold tracking-[0.2em] uppercase mb-3" style={{ color: 'var(--gold)' }}>
                  PASSAGGIO {s.num}
                </div>
                <h3
                  className="font-bold leading-[1.2] tracking-[-0.01em] mb-3"
                  style={{ fontSize: 'clamp(1rem, 1.4vw, 1.18rem)', color: 'var(--text)' }}
                >
                  {s.title}
                </h3>
                <p
                  className="leading-[1.65]"
                  style={{ fontSize: 'clamp(0.88rem, 1.1vw, 0.96rem)', color: 'var(--text-soft)' }}
                >
                  {s.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .metodo-grid {
          display: grid;
          gap: clamp(0.9rem, 1.8vw, 1.4rem);
          grid-template-columns: repeat(4, 1fr);
        }
        @media (max-width: 1060px) {
          .metodo-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 580px) {
          .metodo-grid { grid-template-columns: 1fr; }
        }
        @media (min-width: 1061px) {
          .step-card:not(:last-child)::after {
            content: '';
            position: absolute;
            top: 50%; right: -1rem;
            width: 0.5rem; height: 2px;
            background: rgba(217,164,65,0.35);
            transform: translateY(-50%);
            z-index: 1;
          }
          .step-card:not(:last-child)::before {
            content: '';
            position: absolute;
            top: 50%; right: -1.2rem;
            width: 7px; height: 7px;
            border-right: 1.8px solid var(--gold);
            border-top: 1.8px solid var(--gold);
            transform: translateY(-50%) rotate(45deg);
            z-index: 1;
          }
        }
      `}</style>
    </section>
  )
}
