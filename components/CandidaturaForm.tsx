'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'

const schema = z.object({
  name:    z.string().min(2, 'Inserisci il tuo nome'),
  company: z.string().min(2, "Inserisci il nome dell'azienda"),
  phone:   z.string().min(9, 'Inserisci un numero valido'),
  email:   z.string().email("Inserisci un'email valida"),
  leads:   z.string().min(1, "Seleziona un'opzione"),
  channel: z.string().min(1, "Seleziona un'opzione"),
  spend:   z.string().optional(),
  when:    z.string().optional(),
  notes:   z.string().optional(),
  privacy: z.boolean().refine(v => v, 'Devi accettare i termini'),
})
type FormData = z.infer<typeof schema>

function RadioGroup({ name, options, value, onChange, error }: {
  name: string; options: { value: string; label: string }[];
  value: string; onChange: (v: string) => void; error?: string
}) {
  return (
    <div>
      <div className="form-radio-group">
        {options.map(opt => (
          <label key={opt.value} className="form-radio">
            <input type="radio" name={name} value={opt.value} checked={value === opt.value} onChange={() => onChange(opt.value)} />
            <span>{opt.label}</span>
          </label>
        ))}
      </div>
      {error && <p className="form-error">{error}</p>}
    </div>
  )
}

export function CandidaturaForm() {
  const [submitted, setSubmitted]     = useState(false)
  const [sending, setSending]         = useState(false)
  const [serverError, setServerError] = useState('')

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) })

  const leadsVal   = watch('leads')   || ''
  const channelVal = watch('channel') || ''

  const onSubmit = async (data: FormData) => {
    setSending(true); setServerError('')
    try {
      const res = await fetch('/api/submit', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
      if (!res.ok) throw new Error()
      setSubmitted(true)
    } catch {
      setServerError("Errore nell'invio. Riprova o scrivici a info@solarback.it")
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="candidatura">
      <div className="sb-container">
        <div className="form-wrap">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="eyebrow" style={{ marginBottom: '1.5rem' }}><span className="dot" />Candidatura Gratuita</div>
          </motion.div>
          <motion.h2 className="form-h1" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.08 }}>
            Verifica Se Possiamo<br /><span className="gold-shine">Aiutarti</span>
          </motion.h2>
          <motion.p className="form-sub" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.16 }}>
            Ti basta compilare il form qui sotto. Ti ricontattiamo entro 24 ore.
          </motion.p>

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div key="ok" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                style={{ padding: '2.5rem 2rem', border: '1px solid rgba(217,164,65,0.4)', background: 'rgba(217,164,65,0.06)', borderRadius: '20px', textAlign: 'center' }}>
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto 1rem' }}>
                  <circle cx="24" cy="24" r="20"/><path d="M15 24l6 6 12-14"/>
                </svg>
                <h3 style={{ fontWeight: 800, fontSize: '1.5rem', marginBottom: '0.7rem', color: 'var(--text)' }}>Richiesta ricevuta!</h3>
                <p style={{ color: 'var(--text-soft)' }}>Ti ricontattiamo entro 24 ore al numero che ci hai lasciato.</p>
              </motion.div>
            ) : (
              <motion.form key="form" className="form-card" onSubmit={handleSubmit(onSubmit)} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

                <div className="form-row">
                  <label htmlFor="f-name">Nome Completo <span className="req">*</span></label>
                  <input className="input" id="f-name" {...register('name')} type="text" placeholder="Mario Rossi" />
                  {errors.name && <p className="form-error">{errors.name.message}</p>}
                </div>

                <div className="form-row">
                  <label htmlFor="f-company">Nome della tua azienda e provincia <span className="req">*</span></label>
                  <input className="input" id="f-company" {...register('company')} type="text" placeholder="Energia Solare Srl, Milano" />
                  {errors.company && <p className="form-error">{errors.company.message}</p>}
                </div>

                <div className="form-row phone">
                  <label htmlFor="f-phone">Numero di Telefono <span className="req">*</span></label>
                  <span className="flag" aria-hidden="true"><span className="g"/><span className="w"/><span className="r"/></span>
                  <input className="input" id="f-phone" {...register('phone')} type="tel" placeholder="333 333 3333" />
                  {errors.phone && <p className="form-error">{errors.phone.message}</p>}
                </div>

                <div className="form-row">
                  <label htmlFor="f-email">Email <span className="req">*</span></label>
                  <input className="input" id="f-email" {...register('email')} type="email" placeholder="info@tuaazienda.it" />
                  {errors.email && <p className="form-error">{errors.email.message}</p>}
                </div>

                <div className="form-row">
                  <label>Quante richieste ricevi ogni mese? <span className="req">*</span></label>
                  <RadioGroup name="leads" value={leadsVal} onChange={v => setValue('leads', v, { shouldValidate: true })}
                    options={[{ value: '0-30', label: 'Meno di 30' }, { value: '30-100', label: 'Tra 30 e 100' }, { value: '100-300', label: 'Tra 100 e 300' }, { value: '300+', label: 'Più di 300' }]}
                    error={errors.leads?.message} />
                </div>

                <div className="form-row">
                  <label>Come ricevi oggi le richieste? <span className="req">*</span></label>
                  <RadioGroup name="channel" value={channelVal} onChange={v => setValue('channel', v, { shouldValidate: true })}
                    options={[{ value: 'phone', label: 'Telefono' }, { value: 'whatsapp', label: 'WhatsApp' }, { value: 'form', label: 'Form sul sito' }, { value: 'multi', label: 'Più canali insieme' }]}
                    error={errors.channel?.message} />
                </div>

                <div className="form-row">
                  <label htmlFor="f-spend">Quanto investi al mese in pubblicità?</label>
                  <select id="f-spend" {...register('spend')}>
                    <option value="">Seleziona un&apos;opzione</option>
                    <option value="<1k">Meno di 1.000 €</option>
                    <option value="1k-3k">Tra 1.000 e 3.000 €</option>
                    <option value="3k-7k">Tra 3.000 e 7.000 €</option>
                    <option value="7k+">Più di 7.000 €</option>
                    <option value="0">Non investo in pubblicità</option>
                  </select>
                </div>

                <div className="form-row">
                  <label htmlFor="f-when">Quando ti chiameremmo?</label>
                  <select id="f-when" {...register('when')}>
                    <option value="">Seleziona un&apos;opzione</option>
                    <option value="asap">Il prima possibile</option>
                    <option value="morning">Mattina (9:00 – 13:00)</option>
                    <option value="afternoon">Pomeriggio (14:00 – 18:00)</option>
                    <option value="evening">Sera dopo le 18:00</option>
                  </select>
                </div>

                <div className="form-row">
                  <label htmlFor="f-notes">Vuoi aggiungere qualcosa? (opzionale)</label>
                  <textarea id="f-notes" {...register('notes')} rows={3} placeholder="Raccontaci brevemente la tua situazione" />
                </div>

                <label className="form-check">
                  <input {...register('privacy')} type="checkbox" />
                  <span>Ho letto e accetto i termini e condizioni di questa pagina. Fornendo il mio numero di telefono, accetto di essere contattato da SOLARBACK.</span>
                </label>
                {errors.privacy && <p className="form-error" style={{ marginTop: '-1rem', marginBottom: '1rem' }}>{errors.privacy.message}</p>}

                {serverError && <p className="form-error" style={{ textAlign: 'center', marginBottom: '1rem' }}>{serverError}</p>}

                <motion.button
                  type="submit"
                  disabled={sending}
                  className="sb-btn xl form-submit"
                  style={{ opacity: sending ? 0.7 : 1 }}
                  whileHover={!sending ? { translateY: -1, filter: 'brightness(1.05)' } : {}}
                  transition={{ duration: 0.2 }}
                >
                  {sending ? 'Invio in corso...' : 'Invia La Tua Richiesta'}
                  {!sending && (
                    <span className="arrow">
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
      </div>
    </section>
  )
}
