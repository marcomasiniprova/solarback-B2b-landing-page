import type { Metadata } from 'next'
import { LegalPage, LegalSection } from '@/components/LegalPage'

export const metadata: Metadata = {
  title: 'Cookie Policy | SOLARBACK by artec AI',
  description:
    'Cookie Policy di SOLARBACK by artec AI: quali cookie e strumenti di analisi utilizza il sito e come gestirli dal tuo browser.',
  alternates: { canonical: 'https://artecai.it/cookie' },
}

export default function CookiePage() {
  return (
    <LegalPage title="Cookie Policy" updated="Luglio 2026">
      <LegalSection heading="1. Cosa sono i cookie">
        <p>
          I cookie sono piccoli file di testo che il sito salva sul dispositivo
          dell&apos;utente per svolgere funzioni tecniche o raccogliere informazioni
          statistiche. Possono essere &laquo;tecnici&raquo; (necessari al funzionamento)
          oppure installati da servizi di terze parti.
        </p>
      </LegalSection>

      <LegalSection heading="2. Cookie tecnici">
        <p>
          Utilizziamo cookie tecnici strettamente necessari al funzionamento del sito.
          Non richiedono consenso e non raccolgono dati personali a fini di profilazione.
        </p>
      </LegalSection>

      <LegalSection heading="3. Strumenti di analisi">
        <p>
          Il sito utilizza <strong>Google Analytics 4</strong> per comprendere in forma
          aggregata come viene utilizzato. Lo strumento è attivo durante la navigazione e
          raccoglie dati statistici (pagine visitate, durata della visita, tipo di
          dispositivo, provenienza geografica approssimativa). Non utilizziamo questi
          dati per profilazione pubblicitaria né per remarketing.
        </p>
      </LegalSection>

      <LegalSection heading="4. Come disattivare la raccolta statistica">
        <p>
          Puoi opporti alla raccolta dei dati statistici in qualsiasi momento:
        </p>
        <ul className="legal-list">
          <li>
            configurando il tuo browser per bloccare i cookie di terze parti
            (Chrome, Safari, Firefox ed Edge lo consentono dalle impostazioni sulla
            privacy);
          </li>
          <li>navigando in modalità anonima o privata;</li>
          <li>
            installando il componente aggiuntivo del browser per la disattivazione di
            Google Analytics, disponibile sul sito di Google.
          </li>
        </ul>
        <p>
          La disabilitazione dei cookie tecnici potrebbe compromettere alcune
          funzionalità del sito.
        </p>
      </LegalSection>

      <LegalSection heading="5. Ulteriori informazioni">
        <p>
          Per sapere quali dati trattiamo, con quali finalità e come esercitare i tuoi
          diritti, consulta la nostra <strong>Privacy Policy</strong>. Per qualsiasi
          richiesta puoi scriverci a <strong>team@artecai.it</strong>.
        </p>
      </LegalSection>
    </LegalPage>
  )
}
