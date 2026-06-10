import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import './globals.css'

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'SOLARBACK — Sopralluoghi Qualificati per Installatori Fotovoltaico | solarback.it',
  description: 'SOLARBACK trasforma le richieste in sopralluoghi qualificati per installatori di fotovoltaico in Italia. Paghi solo a risultato. Zero canone fisso. Garanzia scritta.',
  keywords: [
    'solarback', 'SOLARBACK', 'solarback.it',
    'sopralluoghi qualificati fotovoltaico',
    'lead generation fotovoltaico Italia',
    'acquisizione clienti pannelli solari',
    'gestione richieste fotovoltaico',
    'appuntamenti qualificati installatori',
    'Marco Masini solarback',
  ],
  authors: [{ name: 'Marco Masini', url: 'https://solarback.it' }],
  creator: 'SOLARBACK',
  publisher: 'SOLARBACK',
  metadataBase: new URL('https://solarback.it'),
  alternates: { canonical: 'https://solarback.it' },
  openGraph: {
    title: 'SOLARBACK — Sopralluoghi Qualificati per Installatori Fotovoltaico',
    description: 'Il primo sistema di acquisizione verticale per aziende installatrici di fotovoltaico in Italia. Paghi solo quando portiamo sopralluoghi qualificati in agenda.',
    type: 'website',
    locale: 'it_IT',
    url: 'https://solarback.it',
    siteName: 'SOLARBACK',
    images: [{ url: '/solarback-logo.png', width: 1200, height: 630, alt: 'SOLARBACK — Sopralluoghi Qualificati Fotovoltaico' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SOLARBACK — Sopralluoghi Qualificati Fotovoltaico',
    description: 'Trasformiamo le richieste in sopralluoghi qualificati. Paghi solo a risultato.',
    images: ['/solarback-logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://solarback.it/#organization',
      name: 'SOLARBACK',
      url: 'https://solarback.it',
      logo: 'https://solarback.it/solarback-logo.png',
      telephone: '+393273174931',
      email: 'info@solarback.it',
      founder: { '@type': 'Person', name: 'Marco Masini', jobTitle: 'Founder & CEO' },
      areaServed: { '@type': 'Country', name: 'Italy' },
      knowsAbout: ['fotovoltaico', 'energia rinnovabile', 'lead generation B2B', 'acquisizione clienti'],
      sameAs: ['https://solarback.it'],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://solarback.it/#website',
      url: 'https://solarback.it',
      name: 'SOLARBACK',
      publisher: { '@id': 'https://solarback.it/#organization' },
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://solarback.it/?q={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'ProfessionalService',
      '@id': 'https://solarback.it/#service',
      name: 'SOLARBACK — Acquisizione Sopralluoghi Qualificati',
      description: 'Sistema verticale di acquisizione e qualificazione contatti per aziende installatrici di fotovoltaico in Italia. Gestione richieste, follow-up WhatsApp, fissazione sopralluoghi qualificati.',
      url: 'https://solarback.it',
      provider: { '@id': 'https://solarback.it/#organization' },
      serviceType: 'Lead Generation e Appointment Setting per Fotovoltaico',
      areaServed: { '@type': 'Country', name: 'Italy' },
      offers: {
        '@type': 'Offer',
        name: 'Sopralluoghi Qualificati a Performance',
        description: 'Paghi solo quando portiamo sopralluoghi qualificati in agenda. Zero canone fisso, garanzia scritta.',
        priceCurrency: 'EUR',
        availability: 'https://schema.org/LimitedAvailability',
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: "Cos'è SOLARBACK e cosa fa esattamente?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: "SOLARBACK è il primo sistema di acquisizione verticale costruito esclusivamente per aziende installatrici di fotovoltaico in Italia. Non generiamo richieste: trasformiamo quelle che già ricevi in sopralluoghi qualificati nell'agenda dei tuoi commerciali. Contattiamo ogni lead entro pochi minuti via WhatsApp, verifichiamo interesse reale e disponibilità, poi fissiamo l'appuntamento direttamente.",
          },
        },
        {
          '@type': 'Question',
          name: "SOLARBACK è l'agenzia giusta per la mia azienda?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: "SOLARBACK è adatto alle aziende che installano fotovoltaico, ricevono già richieste ogni settimana ma faticano a trasformarle in sopralluoghi, e hanno commerciali pronti a uscire. Se invece cerchi un'agenzia che gestisca anche la tua pubblicità o non hai ancora commerciali attivi, siamo onesti: non siamo il servizio giusto per te.",
          },
        },
        {
          '@type': 'Question',
          name: 'Quanto costa il servizio SOLARBACK?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'SOLARBACK lavora esclusivamente a performance: paghi solo quando ti portiamo sopralluoghi qualificati in agenda. Nessun canone fisso, nessun costo mensile, nessun contratto pluriennale. Il rischio è nostro: se non portiamo risultati nei numeri e nei tempi concordati, continuiamo a lavorare senza costi aggiuntivi finché non li raggiungiamo.',
          },
        },
        {
          '@type': 'Question',
          name: 'Quali risultati posso aspettarmi e in quanto tempo?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Nella maggior parte dei casi attiviamo il sistema entro 48 ore dalla firma. I primi sopralluoghi qualificati arrivano già nella prima settimana. I numeri esatti dipendono dal volume di richieste che ricevi e dalla tua zona operativa — definiamo insieme l\'obiettivo preciso prima di partire, nero su bianco.',
          },
        },
        {
          '@type': 'Question',
          name: 'Come funziona il processo di qualificazione?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Ogni richiesta che arriva dal tuo sito o dalle tue pubblicità entra nel nostro sistema. Entro pochi minuti scriviamo al contatto su WhatsApp. Poi lo chiamiamo, verifichiamo: tipo di abitazione, consumo attuale, interesse concreto e disponibilità di budget. Solo chi supera questi criteri viene inserito nell'agenda del tuo commerciale.",
          },
        },
        {
          '@type': 'Question',
          name: 'SOLARBACK opera in tutta Italia?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sì, SOLARBACK lavora con installatori di fotovoltaico su tutto il territorio italiano — da Lombardia, Veneto e Piemonte al Sud. La qualificazione avviene da remoto, quindi serviamo efficacemente sia le grandi città che le zone periferiche. Se hai commerciali che coprono una o più regioni, possiamo strutturare il servizio sulla tua copertura geografica.',
          },
        },
      ],
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={manrope.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
