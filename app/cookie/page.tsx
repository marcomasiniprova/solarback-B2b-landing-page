import Link from 'next/link'

export default function CookiePage() {
  return (
    <main style={{ padding: '8rem 1.5rem 5rem', maxWidth: 820, margin: '0 auto' }}>
      <h1 style={{ fontWeight: 800, fontSize: '2.5rem', marginBottom: '2rem', color: 'var(--text)' }}>
        Cookie Policy
      </h1>
      <div style={{ color: 'var(--text-soft)', lineHeight: 1.8, fontSize: '1rem' }}>
        <p><strong>Ultimo aggiornamento:</strong> Luglio 2026</p>

        <h2 style={{ color: 'var(--text)', fontWeight: 700, fontSize: '1.3rem', margin: '2.5rem 0 1rem' }}>
          1. Cosa sono i cookie
        </h2>
        <p>
          I cookie sono piccoli file di testo che il sito salva sul dispositivo dell&apos;utente
          per svolgere funzioni tecniche o raccogliere informazioni statistiche. Possono essere
          &quot;tecnici&quot; (necessari) o di &quot;terze parti&quot; (installati da servizi esterni).
        </p>

        <h2 style={{ color: 'var(--text)', fontWeight: 700, fontSize: '1.3rem', margin: '2.5rem 0 1rem' }}>
          2. Cookie tecnici
        </h2>
        <p>
          Utilizziamo cookie tecnici strettamente necessari al funzionamento del sito
          (es. preferenze di consenso). Non richiedono consenso e non raccolgono dati
          personali a fini di profilazione.
        </p>

        <h2 style={{ color: 'var(--text)', fontWeight: 700, fontSize: '1.3rem', margin: '2.5rem 0 1rem' }}>
          3. Strumenti di analisi
        </h2>
        <p>
          Con il tuo consenso, il sito può utilizzare strumenti di analisi forniti da terze
          parti per comprendere in forma aggregata e anonima come viene utilizzato. Tali
          strumenti sono attivati <strong>solo dopo che hai accettato</strong> i cookie dal
          banner: fino a quel momento nessun dato viene trasmesso. I dati sono trattati secondo
          le modalità descritte dal fornitore e in conformità alla configurazione adottata dal
          Titolare. Puoi revocare il consenso in qualsiasi momento cancellando la preferenza
          dal tuo browser.
        </p>

        <h2 style={{ color: 'var(--text)', fontWeight: 700, fontSize: '1.3rem', margin: '2.5rem 0 1rem' }}>
          4. Gestione del consenso
        </h2>
        <p>
          Al primo accesso viene mostrato un banner che permette di <strong>Accettare</strong>
          o <strong>Rifiutare</strong> i cookie di GA4. La tua scelta viene memorizzata
          localmente sul dispositivo. Puoi modificarla in qualsiasi momento eliminando i
          dati di navigazione del sito dal tuo browser.
        </p>

        <h2 style={{ color: 'var(--text)', fontWeight: 700, fontSize: '1.3rem', margin: '2.5rem 0 1rem' }}>
          5. Disabilitazione dai browser
        </h2>
        <p>
          Puoi gestire o disabilitare i cookie dalle impostazioni del tuo browser. La
          disabilitazione dei cookie tecnici potrebbe compromettere alcune funzionalità del sito.
        </p>
      </div>
      <p style={{ marginTop: '3rem' }}>
        <Link href="/" style={{ color: 'var(--gold)' }}>← Torna alla home</Link>
      </p>
    </main>
  )
}
