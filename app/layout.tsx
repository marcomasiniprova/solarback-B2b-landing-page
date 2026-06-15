import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import './globals.css'

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'SOLARBACK — Sopralluoghi Qualificati per Installatori Fotovoltaico | artecai.it',
  description: 'SOLARBACK by artec AI trasforma le richieste in sopralluoghi qualificati per installatori di fotovoltaico in Italia. Prova gratuita 14 giorni. Zero canone fisso. Garanzia scritta.',
  keywords: [
    'solarback', 'SOLARBACK', 'solarback.it',
    'artec ai', 'artecai', 'artecai.it', 'artec agenzia',
    'sopralluoghi qualificati fotovoltaico',
    'lead generation fotovoltaico Italia',
    'acquisizione clienti pannelli solari',
    'gestione richieste fotovoltaico',
    'appuntamenti qualificati installatori',
    'AI lead generation fotovoltaico',
    'sistema AI qualificazione lead solare',
    'Marco Masini solarback',
    'Marco Masini artec ai',
  ],
  authors: [{ name: 'Marco Masini — artec AI', url: 'https://artecai.it' }],
  creator: 'artec AI',
  publisher: 'artec AI',
  metadataBase: new URL('https://artecai.it'),
  alternates: { canonical: 'https://artecai.it' },
  openGraph: {
    title: 'SOLARBACK — Sopralluoghi Qualificati per Installatori Fotovoltaico',
    description: 'Il primo sistema AI di acquisizione verticale per aziende installatrici di fotovoltaico in Italia. Prova gratuita 14 giorni, poi decidi tu.',
    type: 'website',
    locale: 'it_IT',
    url: 'https://artecai.it',
    siteName: 'SOLARBACK by artec AI',
    images: [{ url: '/solarback-logo.png', width: 1200, height: 630, alt: 'SOLARBACK — Sopralluoghi Qualificati Fotovoltaico' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SOLARBACK by artec AI — Sopralluoghi Qualificati Fotovoltaico',
    description: 'Sistema AI che trasforma le richieste in sopralluoghi qualificati. Prova gratuita 14 giorni.',
    images: ['/solarback-logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  verification: {
    google: '2zwYT0CnjYZYqkWuLPx8evCyvD7ZhjffVfa62pkGb3pU',
  },
  category: 'business',
  classification: 'Lead Generation, Fotovoltaico, B2B, AI Marketing',
  other: {
    'article:author': 'Marco Masini — artec AI',
    'og:locale:alternate': 'it_IT',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://artecai.it/#organization',
      name: 'artec AI',
      alternateName: ['artecai', 'artec agenzia'],
      url: 'https://artecai.it',
      logo: 'https://artecai.it/solarback-logo.png',
      telephone: '+393273174931',
      email: 'info@solarback.it',
      founder: { '@type': 'Person', name: 'Marco Masini', jobTitle: 'Founder & CEO', url: 'https://artecai.it' },
      areaServed: { '@type': 'Country', name: 'Italy' },
      knowsAbout: ['fotovoltaico', 'energia rinnovabile', 'lead generation B2B', 'acquisizione clienti', 'intelligenza artificiale', 'AI marketing'],
      sameAs: ['https://artecai.it'],
    },
    {
      '@type': 'Brand',
      '@id': 'https://artecai.it/#solarback',
      name: 'SOLARBACK',
      url: 'https://artecai.it',
      logo: 'https://artecai.it/solarback-logo.png',
      description: 'SOLARBACK è il brand di artec AI dedicato all\'acquisizione di sopralluoghi qualificati per installatori di fotovoltaico in Italia.',
      brand: { '@id': 'https://artecai.it/#organization' },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://artecai.it/#website',
      url: 'https://artecai.it',
      name: 'SOLARBACK by artec AI',
      publisher: { '@id': 'https://artecai.it/#organization' },
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://artecai.it/?q={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'ProfessionalService',
      '@id': 'https://artecai.it/#service',
      name: 'SOLARBACK — Acquisizione Sopralluoghi Qualificati per Fotovoltaico',
      description: 'Sistema AI verticale di acquisizione e qualificazione contatti per aziende installatrici di fotovoltaico in Italia. Prova gratuita 14 giorni, poi decidi tu.',
      url: 'https://artecai.it',
      provider: { '@id': 'https://artecai.it/#organization' },
      serviceType: 'Lead Generation e Appointment Setting per Fotovoltaico con AI',
      areaServed: { '@type': 'Country', name: 'Italy' },
      offers: {
        '@type': 'Offer',
        name: 'Prova Gratuita 14 Giorni SOLARBACK',
        description: '14 giorni completamente gratuiti e risk free: zero costi, zero impegni. Poi decidi se continuare.',
        priceCurrency: 'EUR',
        price: '0',
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
