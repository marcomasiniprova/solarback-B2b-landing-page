import type { Metadata } from 'next'
import { LegalPage, LegalSection } from '@/components/LegalPage'

export const metadata: Metadata = {
  title: 'Privacy Policy | SOLARBACK by artec AI',
  description:
    'Informativa privacy di SOLARBACK by artec AI: quali dati raccogliamo tramite il modulo di candidatura e la navigazione, con quali finalità e come esercitare i tuoi diritti.',
  alternates: { canonical: 'https://artecai.it/privacy' },
}

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="Luglio 2026">
      <LegalSection heading="1. Titolare del trattamento">
        <p>
          Il Titolare del trattamento dei dati è <strong>artec AI</strong> (referente:
          Valerio Alieri), raggiungibile all&apos;indirizzo email{' '}
          <strong>team@artecai.it</strong>. Il trattamento avviene nel rispetto del
          Regolamento (UE) 2016/679 (GDPR) e della normativa italiana in materia di
          protezione dei dati personali.
        </p>
      </LegalSection>

      <LegalSection heading="2. Dati raccolti">
        <p>
          Raccogliamo i dati che l&apos;utente fornisce volontariamente compilando il
          modulo di candidatura: nome, azienda, telefono, email e le risposte alle
          domande del modulo. Tali dati sono inseriti direttamente dall&apos;interessato.
        </p>
        <p>
          Raccogliamo inoltre dati statistici di navigazione in forma aggregata tramite
          Google Analytics 4 (GA4), attivo durante la navigazione del sito. Si tratta di
          dati utilizzati per finalità statistiche sull&apos;utilizzo del sito, non per
          profilazione pubblicitaria. Maggiori dettagli nella{' '}
          <strong>Cookie Policy</strong>.
        </p>
      </LegalSection>

      <LegalSection heading="3. Finalità e base giuridica">
        <p>
          I dati del modulo sono trattati per dare seguito alla richiesta di contatto e
          per finalità commerciali connesse al servizio SOLARBACK (base giuridica:
          esecuzione di misure precontrattuali su richiesta dell&apos;interessato,
          art. 6(1)(b) GDPR).
        </p>
        <p>
          I dati statistici di navigazione raccolti tramite GA4 sono trattati sulla base
          del legittimo interesse del Titolare a comprendere in forma aggregata
          l&apos;utilizzo del sito e a migliorarne il funzionamento (art. 6(1)(f) GDPR).
          L&apos;utente può opporsi a questa raccolta in qualsiasi momento configurando il
          proprio browser per bloccare i cookie, utilizzando modalità di navigazione
          anonima, oppure installando il componente aggiuntivo di disattivazione di
          Google Analytics.
        </p>
      </LegalSection>

      <LegalSection heading="4. Modalità del trattamento">
        <p>
          I dati sono trattati con strumenti informatici e conservati su sistemi
          protetti. Possono essere trattati mediante fornitori tecnologici necessari
          all&apos;erogazione del servizio (ad esempio servizi di hosting, posta
          elettronica e infrastrutture cloud). Adottiamo misure tecniche e organizzative
          adeguate per prevenire accessi non autorizzati, perdita o diffusione dei dati.
        </p>
      </LegalSection>

      <LegalSection heading="5. Conservazione">
        <p>
          I dati del modulo sono conservati per la durata delle valutazioni commerciali
          e, in caso di rapporto attivo, per tutto il periodo contrattuale, quindi per
          gli adempimenti amministrativi e fiscali previsti dalla legge. I dati di GA4
          seguono i periodi di conservazione configurati nel rispettivo account.
        </p>
      </LegalSection>

      <LegalSection heading="6. Comunicazione a terzi">
        <p>
          I dati non sono diffusi. Possono essere trattati da fornitori esterni che
          agiscono come responsabili del trattamento, tra cui il fornitore del servizio
          di posta elettronica utilizzato per recapitare le candidature e Google LLC per
          il servizio Google Analytics. L&apos;eventuale trasferimento di dati verso gli
          Stati Uniti connesso a Google Analytics è disciplinato dalle garanzie adottate
          da Google, incluse le Clausole Contrattuali Standard.
        </p>
      </LegalSection>

      <LegalSection heading="7. Diritti dell'interessato">
        <p>
          L&apos;interessato può in qualsiasi momento richiedere accesso, rettifica,
          cancellazione, limitazione, opposizione e portabilità dei propri dati,
          scrivendo a <strong>team@artecai.it</strong>. È inoltre possibile proporre
          reclamo all&apos;Autorità Garante per la protezione dei dati personali.
        </p>
      </LegalSection>
    </LegalPage>
  )
}
