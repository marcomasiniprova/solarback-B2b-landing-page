'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { GoldText } from './ui/GoldText'
import { Eyebrow } from './ui/Eyebrow'

const schema = z.object({
  name:    z.string().min(2, 'Inserisci il tuo nome'),
  company: z.string().min(2, "Inserisci il nome dell'azienda"),
  phone:   z.string().min(9, 'Inserisci un numero valido'),
  email:   z.string().email('Inserisci un\'email valida'),
  leads:   z.string().min(1, 'Seleziona un\'opzione'),
  channel: z.string().min(1, 'Seleziona un\'opzione'),
  spend:   z.string().optional(),
  when:    z.string().optional(),
  notes:   z.string().optional(),
  privacy: z.boolean().refine(v => v, 'Devi accettare i termini'),
})

type FormData = z.infer<typeof schema>

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'rgba(255,255,255,0.025)',
  border: '1px solid rgba(255,255,255,0.10)',
  borderRadius: '14px',
  padding: '1rem 1.2rem',
  color: 'var(--text)',
  fontSize: '1rem',
  fontFamily: 'inherit',
  outline: 'none',
  transition: 'border-color 0.2s, background 0.2s',
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.9rem',
  fontWeight: 600,
  color: 'var(--text)',
  marginBottom: '0.55rem',
  letterSpacing: '0.01em',
}

function RadioGroup({ name, options, value, onChange, error }: { name: string; options: { value: string; label: string }[]; value: string; onChange: (v: string) => void; error?: string }) {
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.7rem' }}>
        {options.map(opt => (
          <label key={opt.value} style={{ position: 'relative', cursor: 'pointer', display: 'block' }}>
            <input type="radio" name={name} value={opt.value} checked={value === opt.value} onChange={() => onChange(opt.value)} style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }} />
            <span style={{
              display: 'block',
              padding: '0.95rem 1.2rem',
              border: `1px solid ${value === opt.value ? 'var(--gold)' : 'rgba(255,255,255,0.10)'}`,
              borderRadius: '12px',
              background: value === opt.value ? 'rgba(217,164,65,0.08)' : 'rgba(255,255,255,0.025)',
              fontSize: '0.95rem',
              color: value === opt.value ? 'var(--text)' : 'var(--text-soft)',
              fontWeight: value === opt.value ? 600 : 400,
              textAlign: 'center',
              transition: 'all 0.2s',
              cursor: 'pointer',
            }}>
              {opt.label}
            </span>
          </label>
        ))}
      </div>
      {error && <p style={{ color: '#f87171', fontSize: '0.82rem', marginTop: '0.4rem' }}>{error}</p>}
    </div>
  )
}

export function CandidaturaForm() {
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [serverError, setServerError] = useState('')

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) })

  const leadsVal = watch('leads') || ''
  const channelVal = watch('channel') || ''

  const onSubmit = async (data: FormData) => {
    setSending(true)
    setServerError('')
    try {
      const res = await fetch('/api/submit', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
      if (!res.ok) throw new Error()
      setSubmitted(true)
    } catch {
      setServerError('Errore nell\'invio. Riprova o scrivici direttamente a info@solarback.it')
    } finally {
      setSending(false)
    }
  }

  const selectStyle: React.CSSProperties = {
    ...inputStyle,
    appearance: 'none',
    WebkitAppearance: 'none',
    paddingRight: '3rem',
    backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='14' height='8' viewBox='0 0 14 8' fill='none'><path d='M1 1l6 6 6-6' stroke='%23D9A441' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'/></svg>")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 1.2rem center',
    cursor: 'pointer',
  }

  return (
    <section id="candidatura" className="relative z-[1] px-6 section-spacing text-center">
      <div className="max-w-[760px] mx-auto">
        <motion.div className="flex justify-center mb-6" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <Eyebrow>Candidatura Gratuita</Eyebrow>
        </motion.div>
        <motion.h2
          className="font-black leading-[1.02] tracking-[-0.03em] mb-4"
          style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4rem)', color: 'var(--text)' }}
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
        >
          Verifica Se Possiamo<br /><GoldText>Aiutarti</GoldText>
        </motion.h2>
        <motion.p className="mb-14" style={{ color: 'var(--text-dim)', fontSize: '1.1rem' }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
          Ti basta compilare il form qui sotto. Ti ricontattiamo entro 24 ore.
        </motion.p>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-10 rounded-[20px] border text-center"
              style={{ borderColor: 'rgba(217,164,65,0.4)', background: 'rgba(217,164,65,0.06)' }}
            >
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto 1rem' }}>
                <circle cx="24" cy="24" r="20"/>
                <path d="M15 24l6 6 12-14"/>
              </svg>
              <h3 className="font-extrabold text-[1.5rem] mb-3" style={{ color: 'var(--text)' }}>Richiesta ricevuta!</h3>
              <p style={{ color: 'var(--text-soft)' }}>Ti ricontattiamo entro 24 ore al numero che ci hai lasciato.</p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              style={{ textAlign: 'left' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {/* Nome */}
              <div style={{ marginBottom: '1.6rem' }}>
                <label style={labelStyle}>Nome Completo <span style={{ color: 'var(--gold)' }}>*</span></label>
                <input {...register('name')} type="text" placeholder="Mario Rossi" style={inputStyle} onFocus={e => { e.target.style.borderColor = 'rgba(217,164,65,0.55)'; e.target.style.background = 'rgba(255,255,255,0.05)' }} onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.10)'; e.target.style.background = 'rgba(255,255,255,0.025)' }} />
                {errors.name && <p style={{ color: '#f87171', fontSize: '0.82rem', marginTop: '0.4rem' }}>{errors.name.message}</p>}
              </div>

              {/* Azienda */}
              <div style={{ marginBottom: '1.6rem' }}>
                <label style={labelStyle}>Nome della tua azienda e provincia <span style={{ color: 'var(--gold)' }}>*</span></label>
                <input {...register('company')} type="text" placeholder="Energia Solare Srl, Milano" style={inputStyle} onFocus={e => { e.target.style.borderColor = 'rgba(217,164,65,0.55)'; e.target.style.background = 'rgba(255,255,255,0.05)' }} onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.10)'; e.target.style.background = 'rgba(255,255,255,0.025)' }} />
                {errors.company && <p style={{ color: '#f87171', fontSize: '0.82rem', marginTop: '0.4rem' }}>{errors.company.message}</p>}
              </div>

              {/* Telefono */}
              <div style={{ marginBottom: '1.6rem', position: 'relative' }}>
                <label style={labelStyle}>Numero di Telefono <span style={{ color: 'var(--gold)' }}>*</span></label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', width: '28px', height: '20px', borderRadius: '4px', overflow: 'hidden', display: 'flex', boxShadow: '0 0 0 1px rgba(255,255,255,0.08)', pointerEvents: 'none', zIndex: 1 }}>
                    <span style={{ flex: 1, background: '#008C45' }} />
                    <span style={{ flex: 1, background: '#F4F5F0' }} />
                    <span style={{ flex: 1, background: '#CD212A' }} />
                  </span>
                  <input {...register('phone')} type="tel" placeholder="333 333 3333" style={{ ...inputStyle, paddingLeft: '4rem' }} onFocus={e => { e.target.style.borderColor = 'rgba(217,164,65,0.55)'; e.target.style.background = 'rgba(255,255,255,0.05)' }} onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.10)'; e.target.style.background = 'rgba(255,255,255,0.025)' }} />
                </div>
                {errors.phone && <p style={{ color: '#f87171', fontSize: '0.82rem', marginTop: '0.4rem' }}>{errors.phone.message}</p>}
              </div>

              {/* Email */}
              <div style={{ marginBottom: '1.6rem' }}>
                <label style={labelStyle}>Email <span style={{ color: 'var(--gold)' }}>*</span></label>
                <input {...register('email')} type="email" placeholder="info@tuaazienda.it" style={inputStyle} onFocus={e => { e.target.style.borderColor = 'rgba(217,164,65,0.55)'; e.target.style.background = 'rgba(255,255,255,0.05)' }} onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.10)'; e.target.style.background = 'rgba(255,255,255,0.025)' }} />
                {errors.email && <p style={{ color: '#f87171', fontSize: '0.82rem', marginTop: '0.4rem' }}>{errors.email.message}</p>}
              </div>

              {/* Richieste mensili */}
              <div style={{ marginBottom: '1.6rem' }}>
                <label style={labelStyle}>Quante richieste ricevi ogni mese? <span style={{ color: 'var(--gold)' }}>*</span></label>
                <RadioGroup
                  name="leads"
                  value={leadsVal}
                  onChange={v => setValue('leads', v, { shouldValidate: true })}
                  options={[{ value: '0-30', label: 'Meno di 30' }, { value: '30-100', label: 'Tra 30 e 100' }, { value: '100-300', label: 'Tra 100 e 300' }, { value: '300+', label: 'Più di 300' }]}
                  error={errors.leads?.message}
                />
              </div>

              {/* Canale */}
              <div style={{ marginBottom: '1.6rem' }}>
                <label style={labelStyle}>Come ricevi oggi le richieste? <span style={{ color: 'var(--gold)' }}>*</span></label>
                <RadioGroup
                  name="channel"
                  value={channelVal}
                  onChange={v => setValue('channel', v, { shouldValidate: true })}
                  options={[{ value: 'phone', label: 'Telefono' }, { value: 'whatsapp', label: 'WhatsApp' }, { value: 'form', label: 'Form sul sito' }, { value: 'multi', label: 'Più canali insieme' }]}
                  error={errors.channel?.message}
                />
              </div>

              {/* Budget */}
              <div style={{ marginBottom: '1.6rem' }}>
                <label style={labelStyle}>Quanto investi al mese in pubblicità?</label>
                <select {...register('spend')} style={selectStyle} onFocus={e => { e.target.style.borderColor = 'rgba(217,164,65,0.55)'; e.target.style.background = 'rgba(255,255,255,0.05)' }} onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.10)'; e.target.style.background = 'rgba(255,255,255,0.025)' }}>
                  <option value="">Seleziona un'opzione</option>
                  <option value="<1k">Meno di 1.000 €</option>
                  <option value="1k-3k">Tra 1.000 e 3.000 €</option>
                  <option value="3k-7k">Tra 3.000 e 7.000 €</option>
                  <option value="7k+">Più di 7.000 €</option>
                  <option value="0">Non investo in pubblicità</option>
                </select>
              </div>

              {/* Orario */}
              <div style={{ marginBottom: '1.6rem' }}>
                <label style={labelStyle}>Quando ti chiameremmo?</label>
                <select {...register('when')} style={selectStyle} onFocus={e => { e.target.style.borderColor = 'rgba(217,164,65,0.55)'; e.target.style.background = 'rgba(255,255,255,0.05)' }} onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.10)'; e.target.style.background = 'rgba(255,255,255,0.025)' }}>
                  <option value="">Seleziona un'opzione</option>
                  <option value="asap">Il prima possibile</option>
                  <option value="morning">Mattina (9:00 - 13:00)</option>
                  <option value="afternoon">Pomeriggio (14:00 - 18:00)</option>
                  <option value="evening">Sera dopo le 18:00</option>
                </select>
              </div>

              {/* Note */}
              <div style={{ marginBottom: '1.6rem' }}>
                <label style={labelStyle}>Vuoi aggiungere qualcosa? (opzionale)</label>
                <textarea {...register('notes')} rows={3} placeholder="Raccontaci brevemente la tua situazione" style={{ ...inputStyle, resize: 'vertical' }} onFocus={e => { e.target.style.borderColor = 'rgba(217,164,65,0.55)'; e.target.style.background = 'rgba(255,255,255,0.05)' }} onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.10)'; e.target.style.background = 'rgba(255,255,255,0.025)' }} />
              </div>

              {/* Privacy */}
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem', margin: '1.8rem 0', cursor: 'pointer', fontSize: '0.88rem', color: 'var(--text-dim)', lineHeight: 1.55 }}>
                <input {...register('privacy')} type="checkbox" style={{ width: '18px', height: '18px', marginTop: '2px', accentColor: 'var(--gold)', flexShrink: 0 }} />
                <span>Ho letto e accetto i termini e condizioni di questa pagina. Fornendo il mio numero di telefono, accetto di essere contattato da SOLARBACK.</span>
              </label>
              {errors.privacy && <p style={{ color: '#f87171', fontSize: '0.82rem', marginTop: '-1rem', marginBottom: '1rem' }}>{errors.privacy.message}</p>}

              {serverError && <p style={{ color: '#f87171', fontSize: '0.88rem', marginBottom: '1rem', textAlign: 'center' }}>{serverError}</p>}

              <motion.button
                type="submit"
                disabled={sending}
                className="w-full flex items-center justify-center gap-[0.65rem] font-extrabold text-[1.15rem] px-[2.4rem] py-5 rounded-full border cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #e8b952 0%, #c08828 100%)',
                  color: '#1a0e00',
                  border: '1px solid rgba(255,228,155,0.45)',
                  boxShadow: '0 1px 0 rgba(255,255,255,0.25) inset, 0 14px 40px -10px rgba(217,164,65,0.6)',
                  opacity: sending ? 0.7 : 1,
                }}
                whileHover={!sending ? { translateY: -1, filter: 'brightness(1.05)' } : {}}
                transition={{ duration: 0.2 }}
              >
                {sending ? 'Invio in corso...' : 'Invia La Tua Richiesta'}
                {!sending && (
                  <span className="w-[22px] h-[22px] rounded-full inline-flex items-center justify-center" style={{ background: 'rgba(26,14,0,0.18)' }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M3 6h6M7 3l3 3L7 9" stroke="#1a0e00" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                )}
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
