'use client'

import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowIcon } from '@/components/ArrowIcon'

const schema = z.object({
  name:    z.string().min(2, 'Inserisci il tuo nome'),
  company: z.string().min(2, "Inserisci il nome dell'azienda"),
  phone:   z.string().min(9, 'Inserisci un numero valido'),
  email:   z.string().email("Inserisci un'email valida"),
  salesTeam: z.string().min(1, "Seleziona un'opzione"),
  installs: z.string().min(1, "Seleziona un'opzione"),
  channels: z.string().min(1, "Seleziona un'opzione"),
  marketingSpend: z.string().min(1, "Seleziona un'opzione"),
  goal12:   z.string().min(1, "Seleziona un'opzione"),
  revenueGoal: z.string().min(1, "Seleziona un'opzione"),
  privacy: z.boolean().refine(v => v, 'Devi accettare i termini'),
  website: z.string().optional(),
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
            <input
              type="radio" name={name} value={opt.value}
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
            />
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

  // Istante in cui il form è stato montato: serve a calcolare quanto tempo
  // l'utente ha impiegato a compilarlo (anti-bot lato server).
  // Va preso al mount, NON al submit, altrimenti misurerebbe solo la latenza
  // di rete e bloccherebbe ogni utente reale.
  const mountedAt = useRef<number>(Date.now())

  const { register, handleSubmit, watch, setValue, formState: { errors } } =
    useForm<FormData>({ resolver: zodResolver(schema) })

  const salesTeamVal      = watch('salesTeam')      || ''
  const installsVal       = watch('installs')       || ''
  const channelsVal       = watch('channels')       || ''
  const marketingSpendVal = watch('marketingSpend') || ''
  const goal12Val         = watch('goal12')         || ''
  const revenueGoalVal    = watch('revenueGoal')    || ''

  const onSubmit = async (data: FormData) => {
    setSending(true)
    setServerError('')
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, _elapsed: Date.now() - mountedAt.current }),
      })
      if (!res.ok) {
        // Se il server manda un messaggio utile (es. rate limit) lo mostriamo,
        // altrimenti ricadiamo su un messaggio generico.
        const payload = await res.json().catch(() => null)
        setServerError(
          res.status === 429 && payload?.error
            ? payload.error
            : "Errore nell'invio. Riprova o scrivici a team@artecai.it"
        )
        return
      }
      setSubmitted(true)
    } catch {
      setServerError("Errore nell'invio. Riprova o scrivici a team@artecai.it")
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="candidatura">
      <div className="sb-container">
        <div className="form-wrap">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="eyebrow" style={{ marginBottom: '1.5rem' }}>
              <span className="dot" />Candidatura Partner
            </div>
          </motion.div>
          <motion.h2
            className="form-h1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08 }}
          >
            Verifica Se Possiamo<br /><span className="gold-shine">Aiutarti</span>
          </motion.h2>
          <motion.p
            className="form-sub"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.16 }}
          >
            Compila il form. Il nostro team è attivo adesso e ti contatterà a momenti.
          </motion.p>

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="ok"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  padding: '2.5rem 2rem',
                  border: '1px solid rgba(217,164,65,0.4)',
                  background: 'rgba(217,164,65,0.06)',
                  borderRadius: '20px',
                  textAlign: 'center',
                }}
              >
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none"
                  stroke="var(--gold)" strokeWidth="2" strokeLinecap="round"
                  strokeLinejoin="round" style={{ margin: '0 auto 1rem' }}>
                  <circle cx="24" cy="24" r="20"/>
                  <path d="M15 24l6 6 12-14"/>
                </svg>
                <h3 style={{ fontWeight: 800, fontSize: '1.5rem',
                  marginBottom: '0.7rem', color: 'var(--text)' }}>
                  Richiesta ricevuta!
                </h3>
                <p style={{ color: 'var(--text-soft)' }}>
                  Stiamo già analizzando la tua richiesta. Ti contatteremo a
                  momenti al numero che ci hai lasciato.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form" className="form-card"
                onSubmit={handleSubmit(onSubmit)} noValidate
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              >
                <div className="form-block">

                  <div className="form-row">
                    <label htmlFor="f-name">
                      Nome e Cognome <span className="req">*</span>
                    </label>
                    <input className="input" id="f-name" {...register('name')}
                      type="text" placeholder="Mario Rossi" />
                    {errors.name && (
                      <p className="form-error">{errors.name.message}</p>
                    )}
                  </div>

                  <div className="form-row">
                    <label htmlFor="f-company">
                      Azienda <span className="req">*</span>
                    </label>
                    <input className="input" id="f-company"
                      {...register('company')} type="text"
                      placeholder="Energia Solare Srl" />
                    {errors.company && (
                      <p className="form-error">{errors.company.message}</p>
                    )}
                  </div>

                  <div className="form-row phone">
                    <label htmlFor="f-phone">
                      Telefono <span className="req">*</span>
                    </label>
                    <span className="flag" aria-hidden="true">
                      <span className="g"/><span className="w"/><span className="r"/>
                    </span>
                    <input className="input" id="f-phone" {...register('phone')}
                      type="tel" placeholder="333 333 3333" />
                    {errors.phone && (
                      <p className="form-error">{errors.phone.message}</p>
                    )}
                  </div>

                  <div className="form-row">
                    <label htmlFor="f-email">
                      Email <span className="req">*</span>
                    </label>
                    <input className="input" id="f-email" {...register('email')}
                      type="email" placeholder="info@tuaazienda.it" />
                    {errors.email && (
                      <p className="form-error">{errors.email.message}</p>
                    )}
                  </div>

                  <div className="form-row">
                    <label>
                      Quanti commerciali effettuano sopralluoghi?
                      <span className="req"> *</span>
                    </label>
                    <RadioGroup name="salesTeam" value={salesTeamVal}
                      onChange={v => setValue('salesTeam', v, { shouldValidate: true })}
                      options={[
                        { value: '0', label: 'Nessuno' },
                        { value: '1', label: '1' },
                        { value: '2-3', label: '2-3' },
                        { value: '4-6', label: '4-6' },
                        { value: '7+', label: '7+' },
                      ]}
                      error={errors.salesTeam?.message} />
                  </div>

                  <div className="form-row">
                    <label>
                      Quante installazioni completate mediamente al mese?
                      <span className="req"> *</span>
                    </label>
                    <RadioGroup name="installs" value={installsVal}
                      onChange={v => setValue('installs', v, { shouldValidate: true })}
                      options={[
                        { value: '<10', label: 'Meno di 10' },
                        { value: '10-20', label: '10-20' },
                        { value: '21-40', label: '21-40' },
                        { value: '41-80', label: '41-80' },
                        { value: '80+', label: 'Oltre 80' },
                      ]}
                      error={errors.installs?.message} />
                  </div>

                  <div className="form-row">
                    <label>
                      Come arrivano oggi le richieste?
                      <span className="req"> *</span>
                    </label>
                    <RadioGroup name="channels" value={channelsVal}
                      onChange={v => setValue('channels', v, { shouldValidate: true })}
                      options={[
                        { value: 'passaparola', label: 'Passaparola' },
                        { value: 'meta', label: 'Meta Ads' },
                        { value: 'google', label: 'Google Ads' },
                        { value: 'portali', label: 'Portali' },
                        { value: 'multi', label: 'Più canali' },
                      ]}
                      error={errors.channels?.message} />
                  </div>

                  <div className="form-row">
                    <label>
                      Quanto investite oggi in pubblicità?
                      <span className="req"> *</span>
                    </label>
                    <RadioGroup name="marketingSpend" value={marketingSpendVal}
                      onChange={v => setValue('marketingSpend', v, { shouldValidate: true })}
                      options={[
                        { value: '0', label: 'Non investiamo' },
                        { value: '<1k', label: 'Fino a 1.000 €' },
                        { value: '1k-3k', label: '1.000-3.000 €' },
                        { value: '3k-10k', label: '3.000-10.000 €' },
                        { value: '10k+', label: 'Oltre 10.000 €' },
                      ]}
                      error={errors.marketingSpend?.message} />
                  </div>

                  <div className="form-row">
                    <label>
                      Qual è il vostro obiettivo nei prossimi 12 mesi?
                      <span className="req"> *</span>
                    </label>
                    <RadioGroup name="goal12" value={goal12Val}
                      onChange={v => setValue('goal12', v, { shouldValidate: true })}
                      options={[
                        { value: 'sopralluoghi', label: 'Aumentare i sopralluoghi' },
                        { value: 'contratti', label: 'Aumentare i contratti' },
                        { value: 'zone', label: 'Espandere nuove zone' },
                        { value: 'fatturato', label: 'Crescere il fatturato' },
                        { value: 'efficienza', label: 'Rendere più efficiente il commerciale' },
                      ]}
                      error={errors.goal12?.message} />
                  </div>

                  <div className="form-row">
                    <label>
                      Qual è il vostro obiettivo di fatturato?
                      <span className="req"> *</span>
                    </label>
                    <RadioGroup name="revenueGoal" value={revenueGoalVal}
                      onChange={v => setValue('revenueGoal', v, { shouldValidate: true })}
                      options={[
                        { value: '<500k', label: 'Sotto 500.000 €' },
                        { value: '500k-1m', label: '500.000 - 1M €' },
                        { value: '1m-3m', label: '1M - 3M €' },
                        { value: '3m-5m', label: '3M - 5M €' },
                        { value: '5m+', label: 'Oltre 5M €' },
                      ]}
                      error={errors.revenueGoal?.message} />
                  </div>
                </div>

                <label className="form-check">
                  <input {...register('privacy')} type="checkbox" />
                  <span>
                    Ho letto e accetto i termini e condizioni di questa pagina.
                    Fornendo il mio numero di telefono, accetto di essere
                    contattato da SOLARBACK.
                  </span>
                </label>

                <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}>
                  <label>
                    Non compilare questo campo
                    <input {...register('website')} type="text" tabIndex={-1} autoComplete="off" />
                  </label>
                </div>
                {errors.privacy && (
                  <p className="form-error" style={{ marginTop: '-1rem', marginBottom: '1rem' }}>
                    {errors.privacy.message}
                  </p>
                )}

                {serverError && (
                  <p className="form-error" style={{ textAlign: 'center', marginBottom: '1rem' }}>
                    {serverError}
                  </p>
                )}

                <motion.button
                  type="submit"
                  disabled={sending}
                  className="sb-btn xl form-submit"
                  style={{ opacity: sending ? 0.7 : 1 }}
                  whileHover={!sending ? { translateY: -1, filter: 'brightness(1.05)' } : {}}
                  transition={{ duration: 0.2 }}
                >
                  {sending ? 'Invio in corso...' : 'Prenota una chiamata'}
                  {!sending && (
                    <ArrowIcon />
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
