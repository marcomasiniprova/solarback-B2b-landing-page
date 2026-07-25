import type { Metadata } from 'next'
import { LegalPage, LegalSection } from '@/components/LegalPage'

export const metadata: Metadata = {
  title: 'Termini e Condizioni | SOLARBACK by artec AI',
  description:
    'Termini e condizioni del servizio SOLARBACK by artec AI: oggetto del servizio, modalità della candidatura, garanzie e legge applicabile.',
  alternates: { canonical: 'https://artecai.it/termini' },
}

export default function TerminiPage() {
  return (
    <LegalPage title="Termini e Condizioni" updated="Luglio 2026">
      <LegalSection heading="1. Oggetto">
        <p>
          Le presenti condizioni disciplinano il servizio <strong>SOLARBACK</strong>,
          erogato da artec AI (Valerio Alieri): un reparto esterno dedicato
          all&apos;acquisizione di nuovi clienti e all&apos;organizzazione di appuntamenti
          commerciali qualificati per le aziende installatrici di impianti fotovoltaici.
        </p>
      </LegalSection>

      <LegalSection heading="2. Richiesta di contatto">
        <p>
          Compilando il modulo di candidatura l&apos;utente richiede di essere
          ricontattato dal team SOLARBACK per una valutazione commerciale. La candidatura
          non comporta alcun obbligo di attivazione del servizio né alcun costo.
          L&apos;attivazione avviene solo previo accordo scritto tra le parti.
        </p>
      </LegalSection>

      <LegalSection heading="3. Modalità del servizio">
        <p>
          SOLARBACK gestisce il primo contatto, la qualificazione delle richieste e la
          pianificazione degli appuntamenti secondo i criteri condivisi con il cliente. Il
          servizio si basa sull&apos;impegno a qualificare i contatti secondo tali criteri;
          non costituisce garanzia di conclusione di contratti tra il cliente e
          l&apos;utente finale.
        </p>
      </LegalSection>

      <LegalSection heading="4. Esclusione di garanzie">
        <p>
          Salvo quanto diversamente concordato per iscritto, il servizio è fornito senza
          garanzie di risultato circa il numero di appuntamenti o di contratti conclusi,
          che dipendono da molteplici fattori esterni al controllo di SOLARBACK.
        </p>
      </LegalSection>

      <LegalSection heading="5. Modifiche">
        <p>
          Ci riserviamo il diritto di modificare le presenti condizioni in qualsiasi
          momento. Le modifiche saranno pubblicate su questa pagina e si intendono
          accettate con l&apos;uso continuato del sito.
        </p>
      </LegalSection>

      <LegalSection heading="6. Proprietà intellettuale">
        <p>
          Tutti i contenuti presenti sul sito, inclusi testi, loghi, marchi, elementi
          grafici, documentazione e materiali informativi, sono di proprietà del Titolare
          o dei rispettivi aventi diritto e sono protetti dalla normativa applicabile in
          materia di proprietà intellettuale. È vietata qualsiasi riproduzione,
          distribuzione o utilizzo non autorizzato.
        </p>
      </LegalSection>

      <LegalSection heading="7. Contatti">
        <p>
          Per qualsiasi informazione scrivi a <strong>team@artecai.it</strong>.
        </p>
      </LegalSection>

      <LegalSection heading="8. Legge applicabile">
        <p>
          Le presenti condizioni sono disciplinate dalla legge italiana. Per ogni
          controversia sarà competente il foro previsto dalla normativa applicabile.
        </p>
      </LegalSection>
    </LegalPage>
  )
}
