import Link from 'next/link'

export default function CookiePage() {
  return (
    <main style={{ padding: '8rem 1.5rem 5rem', maxWidth: 820, margin: '0 auto' }}>
      <h1 style={{ fontWeight: 800, fontSize: '2.5rem', marginBottom: '2rem', color: 'var(--text)' }}>Cookie Policy</h1>
      <div style={{ color: 'var(--text-soft)', lineHeight: 1.8, fontSize: '1rem' }}>
        <p><strong>Ultimo aggiornamento:</strong> Luglio 2026</p>
        <h2 style={{ color: 'var(--text)', fontWeight: 700, fontSize: '1.3rem', margin: '2rem 0 1rem' }}>1. Cosa sono i cookie</h2>
        <p>I cookie sono piccoli file di testo che il sito salva sul tuo dispositivo per migliorare l&apos;esperienza di navigazione.</p>
        <h2 style={{ color: 'var(--text)', fontWeight: 700, fontSize: '1.3rem', margin: '2rem 0 1rem' }}>2. Cookie tecnici</h2>
        <p>Questo sito utilizza cookie tecnici (es. salvataggio della preferenza tema) strettamente necessari al funzionamento.</p>
        <h2 style={{ color: 'var(--text)', fontWeight: 700, fontSize: '1.3rem', margin: '2rem 0 1rem' }}>3. Cookie di terze parti</h2>
        <p>Utilizziamo Google Analytics (GA4) per monitorare il traffico in forma aggregata. I dati sono anonimizzati. Puoi disattivare GA con il componente opt-out di Google.</p>
        <h2 style={{ color: 'var(--text)', fontWeight: 700, fontSize: '1.3rem', margin: '2rem 0 1rem' }}>4. Gestione cookie</h2>
        <p>Puoi gestire le preferenze dai settaggi del tuo browser. La disabilitazione dei cookie tecnici potrebbe compromettere alcune funzionalità del sito.</p>
      </div>
      <p style={{ marginTop: '3rem' }}><Link href="/" style={{ color: 'var(--gold)' }}>← Torna alla home</Link></p>
    </main>
  )
}
