import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <main style={{ padding: '8rem 1.5rem 5rem', maxWidth: 820, margin: '0 auto' }}>
      <h1 style={{ fontWeight: 800, fontSize: '2.5rem', marginBottom: '2rem', color: 'var(--text)' }}>Privacy Policy</h1>
      <div style={{ color: 'var(--text-soft)', lineHeight: 1.8, fontSize: '1rem' }}>
        <p><strong>Ultimo aggiornamento:</strong> Luglio 2026</p>
        <h2 style={{ color: 'var(--text)', fontWeight: 700, fontSize: '1.3rem', margin: '2rem 0 1rem' }}>1. Titolare del trattamento</h2>
        <p>Valerio Alieri — artec AI, team@artecai.it. I dati sono trattati nel rispetto del Regolamento UE 2016/679 (GDPR).</p>
        <h2 style={{ color: 'var(--text)', fontWeight: 700, fontSize: '1.3rem', margin: '2rem 0 1rem' }}>2. Dati raccolti</h2>
        <p>Raccogliamo nome, azienda, telefono, email e risposte al modulo di candidatura. Questi dati sono forniti volontariamente dall&apos;utente.</p>
        <h2 style={{ color: 'var(--text)', fontWeight: 700, fontSize: '1.3rem', margin: '2rem 0 1rem' }}>3. Finalità del trattamento</h2>
        <p>I dati sono utilizzati esclusivamente per contattare l&apos;utente in seguito alla sua richiesta di candidatura e per finalità commerciali connesse al servizio SOLARBACK.</p>
        <h2 style={{ color: 'var(--text)', fontWeight: 700, fontSize: '1.3rem', margin: '2rem 0 1rem' }}>4. Conservazione</h2>
        <p>I dati sono conservati per la durata del rapporto commerciale e successivamente per finalità amministrative e fiscali secondo i termini di legge.</p>
        <h2 style={{ color: 'var(--text)', fontWeight: 700, fontSize: '1.3rem', margin: '2rem 0 1rem' }}>5. Diritti dell&apos;interessato</h2>
        <p>Puoi richiedere accesso, rettifica, cancellazione o portabilità dei tuoi dati scrivendo a team@artecai.it.</p>
      </div>
      <p style={{ marginTop: '3rem' }}><Link href="/" style={{ color: 'var(--gold)' }}>← Torna alla home</Link></p>
    </main>
  )
}
