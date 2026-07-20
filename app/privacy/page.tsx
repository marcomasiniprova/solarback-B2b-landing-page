import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <main style={{ padding: '8rem 1.5rem 5rem', maxWidth: 820, margin: '0 auto' }}>
      <h1 style={{ fontWeight: 800, fontSize: '2.5rem', marginBottom: '2rem', color: 'var(--text)' }}>
        Privacy Policy
      </h1>
      <div style={{ color: 'var(--text-soft)', lineHeight: 1.8, fontSize: '1rem' }}>
        <p><strong>Ultimo aggiornamento:</strong> Luglio 2026</p>

        <h2 style={{ color: 'var(--text)', fontWeight: 700, fontSize: '1.3rem', margin: '2.5rem 0 1rem' }}>
          1. Titolare del trattamento
        </h2>
        <p>
          Il Titolare del trattamento dei dati è <strong>artec AI</strong> (referente: Valerio Alieri),
          raggiungibile all&apos;indirizzo email <strong>team@artecai.it</strong>. Il trattamento
          avviene nel rispetto del Regolamento (UE) 2016/679 (GDPR) e della normativa italiana
          in materia di protezione dei dati personali.
        </p>

        <h2 style={{ color: 'var(--text)', fontWeight: 700, fontSize: '1.3rem', margin: '2.5rem 0 1rem' }}>
          2. Dati raccolti
        </h2>
        <p>
          Raccogliamo i dati che l&apos;utente fornisce volontariamente compilando il modulo di
          candidatura: nome, azienda, telefono, email e le risposte alle domande del modulo.
          Tali dati sono inseriti direttamente dall&apos;interessato.
        </p>
        <p style={{ marginTop: '0.8rem' }}>
          Raccogliamo inoltre dati di navigazione in forma aggregata e anonima tramite
          Google Analytics 4 (GA4), esclusivamente previo consenso dell&apos;utente (vedi Cookie Policy).
        </p>

        <h2 style={{ color: 'var(--text)', fontWeight: 700, fontSize: '1.3rem', margin: '2.5rem 0 1rem' }}>
          3. Finalità e base giuridica
        </h2>
        <p>
          I dati del modulo sono trattati per dare seguito alla richiesta di contatto
          e per finalità commerciali connesse al servizio SOLARBACK (base giuridica:
          esecuzione di misure precontrattuali su richiesta dell&apos;interessato, art. 6(1)(b) GDPR).
          I dati di navigazione (GA4) sono trattati solo con consenso esplicito (art. 6(1)(a) GDPR).
        </p>

        <h2 style={{ color: 'var(--text)', fontWeight: 700, fontSize: '1.3rem', margin: '2.5rem 0 1rem' }}>
          4. Modalità del trattamento
        </h2>
        <p>
          I dati sono trattati con strumenti informatici e conservati su sistemi protetti.
          Possono essere trattati mediante fornitori tecnologici necessari all&apos;erogazione
          del servizio (ad esempio servizi di hosting, posta elettronica e infrastrutture
          cloud). Adottiamo misure tecniche e organizzative adeguate per prevenire accessi
          non autorizzati, perdita o diffusione dei dati.
        </p>

        <h2 style={{ color: 'var(--text)', fontWeight: 700, fontSize: '1.3rem', margin: '2.5rem 0 1rem' }}>
          5. Conservazione
        </h2>
        <p>
          I dati del modulo sono conservati per la durata delle valutazioni commerciali e,
          in caso di rapporto attivo, per tutto il periodo contrattuale, quindi per gli
          adempimenti amministrativi e fiscali previsti dalla legge. I dati di GA4 seguono
          i periodi di conservazione configurati nel rispettivo account.
        </p>

        <h2 style={{ color: 'var(--text)', fontWeight: 700, fontSize: '1.3rem', margin: '2.5rem 0 1rem' }}>
          6. Comunicazione a terzi
        </h2>
        <p>
          I dati non sono diffusi. Possono essere trattati da fornitori esterni che agiscono
          come responsabili del trattamento (es. fornitore del servizio email e, previo
          consenso, Google per GA4). Non è previsto alcun trasferimento verso Paesi terzi
          se non quello eventuale e disciplinato verso Google LLC (USA) per GA4, regolato
          dalle Clausole Contrattuali Standard adottate da Google.
        </p>

        <h2 style={{ color: 'var(--text)', fontWeight: 700, fontSize: '1.3rem', margin: '2.5rem 0 1rem' }}>
          7. Diritti dell&apos;interessato
        </h2>
        <p>
          L&apos;interessato può in qualsiasi momento richiedere accesso, rettifica,
          cancellazione, limitazione, opposizione e portabilità dei propri dati, nonché
          revocare il consenso (senza pregiudizio per il trattamento precedente), scrivendo
          a <strong>team@artecai.it</strong>. È inoltre possibile proporre reclamo
          all&apos;Autorità Garante per la protezione dei dati personali.
        </p>
      </div>
      <p style={{ marginTop: '3rem' }}>
        <Link href="/" style={{ color: 'var(--gold)' }}>← Torna alla home</Link>
      </p>
    </main>
  )
}
