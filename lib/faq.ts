/**
 * Unica fonte di verità per le FAQ.
 *
 * Usata sia da components/FAQ.tsx (contenuto visibile in pagina) sia da
 * app/layout.tsx (structured data JSON-LD FAQPage). Tenerle in un solo posto
 * garantisce che i dati strutturati corrispondano sempre a ciò che l'utente
 * vede: Google penalizza il markup FAQPage che non riflette il contenuto
 * visibile della pagina.
 *
 * ⚠️ Modifica le FAQ SOLO qui: entrambi i consumatori si aggiornano insieme.
 */
export type FaqEntry = {
  q: string
  a: string
}

export const FAQ_ENTRIES: FaqEntry[] = [
  {
    q: 'Quanto costa SOLARBACK?',
    a: "Non c'è un canone fisso e non ci sono costi mensili: paghi solo quando portiamo appuntamenti qualificati nel calendario dei tuoi commerciali. L'importo preciso lo definiamo insieme nella chiamata di valutazione, perché dipende dal volume di nuovi contratti che vuoi generare e dalla tua zona. Il nostro guadagno è allineato al tuo: lavoriamo a risultato.",
  },
  {
    q: 'Quanto tempo serve per iniziare?',
    a: "Ti attiviamo in 7 giorni. All'ottavo giorno partono le prime campagne e i primi appuntamenti cominciano a entrare nell'agenda. Niente mesi di setup come con le agenzie tradizionali.",
  },
  {
    q: 'E se non funziona?',
    a: 'Definiamo insieme un obiettivo misurabile di nuovi sopralluoghi e contratti prima di partire. Se non lo raggiungiamo, continuiamo a lavorare senza costi aggiuntivi finché non lo centriamo. Tutto scritto nero su bianco prima di iniziare: il rischio è nostro, non tuo.',
  },
  {
    q: 'Devo cambiare il mio CRM?',
    a: "No. Lavoriamo con il tuo sistema attuale: consegniamo gli appuntamenti già pronti nell'agenda dei tuoi commerciali, nel formato che usi oggi. Se preferisci, possiamo inviarli anche via foglio o WhatsApp. Zero stravolgimenti per il tuo team.",
  },
  {
    q: 'Lavorate in tutta Italia?',
    a: 'Sì, su tutto il territorio italiano - dal Nord al Sud. La qualificazione e la prenotazione avvengono da remoto, quindi copriamo sia le grandi città che le zone periferiche, sia il residenziale che gli impianti commerciali. Se hai commerciali su una o più regioni, strutturiamo il servizio sulla tua copertura.',
  },
  {
    q: 'Quante aziende seguite oggi?',
    a: "Lavoriamo con un numero ristretto di installatori per zona, in modo da garantire risultati reali a chi è già dentro. Siamo selettivi per scelta: pochi partner, massima attenzione. Nella chiamata di valutazione ti diciamo subito se c'è ancora spazio per la tua zona.",
  },
]

/** Genera il nodo JSON-LD FAQPage dalle stesse FAQ mostrate in pagina. */
export function buildFaqJsonLd() {
  return {
    '@type': 'FAQPage',
    mainEntity: FAQ_ENTRIES.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: a,
      },
    })),
  }
}
