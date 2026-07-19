import Link from 'next/link'

export default function TerminiPage() {
  return (
    <main style={{ padding: '8rem 1.5rem 5rem', maxWidth: 820, margin: '0 auto' }}>
      <h1 style={{ fontWeight: 800, fontSize: '2.5rem', marginBottom: '2rem', color: 'var(--text)' }}>Termini e Condizioni</h1>
      <div style={{ color: 'var(--text-soft)', lineHeight: 1.8, fontSize: '1rem' }}>
        <p><strong>Ultimo aggiornamento:</strong> Luglio 2026</p>
        <h2 style={{ color: 'var(--text)', fontWeight: 700, fontSize: '1.3rem', margin: '2rem 0 1rem' }}>1. Oggetto</h2>
        <p>SOLARBACK è un servizio di acquisizione contatti qualificati per installatori di fotovoltaico, offerto da artec AI (Valerio Alieri).</p>
        <h2 style={{ color: 'var(--text)', fontWeight: 700, fontSize: '1.3rem', margin: '2rem 0 1rem' }}>2. Richiesta di contatto</h2>
        <p>Compilando il modulo di candidatura, l&apos;utente richiede di essere ricontattato dal team SOLARBACK per una valutazione commerciale. Non sussiste alcun obbligo di attivazione del servizio.</p>
        <h2 style={{ color: 'var(--text)', fontWeight: 700, fontSize: '1.3rem', margin: '2rem 0 1rem' }}>3. Responsabilità</h2>
        <p>SOLARBACK si impegna a qualificare i contatti secondo i criteri concordati, ma non garantisce la conclusione di contratti tra il partner e il cliente finale.</p>
        <h2 style={{ color: 'var(--text)', fontWeight: 700, fontSize: '1.3rem', margin: '2rem 0 1rem' }}>4. Modifiche</h2>
        <p>Ci riserviamo il diritto di modificare questi termini in qualsiasi momento. Le modifiche saranno pubblicate su questa pagina.</p>
        <h2 style={{ color: 'var(--text)', fontWeight: 700, fontSize: '1.3rem', margin: '2rem 0 1rem' }}>5. Contatti</h2>
        <p>Per qualsiasi domanda, scrivi a team@artecai.it.</p>
      </div>
      <p style={{ marginTop: '3rem' }}><Link href="/" style={{ color: 'var(--gold)' }}>← Torna alla home</Link></p>
    </main>
  )
}
