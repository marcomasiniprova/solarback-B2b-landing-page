import Link from 'next/link'

export default function TerminiPage() {
  return (
    <main style={{ padding: '8rem 1.5rem 5rem', maxWidth: 820, margin: '0 auto' }}>
      <h1 style={{ fontWeight: 800, fontSize: '2.5rem', marginBottom: '2rem', color: 'var(--text)' }}>
        Termini e Condizioni
      </h1>
      <div style={{ color: 'var(--text-soft)', lineHeight: 1.8, fontSize: '1rem' }}>
        <p><strong>Ultimo aggiornamento:</strong> Luglio 2026</p>

        <h2 style={{ color: 'var(--text)', fontWeight: 700, fontSize: '1.3rem', margin: '2.5rem 0 1rem' }}>
          1. Oggetto
        </h2>
        <p>
          Le presenti condizioni disciplinano il servizio <strong>SOLARBACK</strong>, erogato da
          artec AI (Valerio Alieri): un reparto commerciale esterno che, per le aziende
          installatrici di fotovoltaico, gestisce l&apos;acquisizione e la qualificazione delle
          richieste e l&apos;organizzazione degli appuntamenti per i commerciali del cliente.
        </p>

        <h2 style={{ color: 'var(--text)', fontWeight: 700, fontSize: '1.3rem', margin: '2.5rem 0 1rem' }}>
          2. Richiesta di contatto
        </h2>
        <p>
          Compilando il modulo di candidatura l&apos;utente richiede di essere ricontattato dal
          team SOLARBACK per una valutazione commerciale. La candidatura non comporta alcun
          obbligo di attivazione del servizio né alcun costo. L&apos;attivazione avviene solo
          previo accordo scritto tra le parti.
        </p>

        <h2 style={{ color: 'var(--text)', fontWeight: 700, fontSize: '1.3rem', margin: '2.5rem 0 1rem' }}>
          3. Modalità del servizio
        </h2>
        <p>
          SOLARBACK gestisce il primo contatto, la qualificazione delle richieste e la
          pianificazione degli appuntamenti secondo i criteri condivisi con il cliente. Il
          servizio si basa sull&apos;impegno a qualificare i contatti secondo tali criteri; non
          costituisce garanzia di conclusione di contratti tra il cliente e l&apos;utente finale.
        </p>

        <h2 style={{ color: 'var(--text)', fontWeight: 700, fontSize: '1.3rem', margin: '2.5rem 0 1rem' }}>
          4. Esclusione di garanzie
        </h2>
        <p>
          Salvo quanto diversamente concordato per iscritto, il servizio è fornito senza
          garanzie di risultato circa il numero di appuntamenti o di contratti conclusi,
          che dipendono da molteplici fattori esterni al controllo di SOLARBACK.
        </p>

        <h2 style={{ color: 'var(--text)', fontWeight: 700, fontSize: '1.3rem', margin: '2.5rem 0 1rem' }}>
          5. Modifiche
        </h2>
        <p>
          Ci riserviamo il diritto di modificare le presenti condizioni in qualsiasi momento.
          Le modifiche saranno pubblicate su questa pagina e si intendono accettate con
          l&apos;uso continuato del sito.
        </p>

        <h2 style={{ color: 'var(--text)', fontWeight: 700, fontSize: '1.3rem', margin: '2.5rem 0 1rem' }}>
          6. Contatti
        </h2>
        <p>
          Per qualsiasi informazione scrivi a <strong>team@artecai.it</strong>.
        </p>
      </div>
      <p style={{ marginTop: '3rem' }}>
        <Link href="/" style={{ color: 'var(--gold)' }}>← Torna alla home</Link>
      </p>
    </main>
  )
}
