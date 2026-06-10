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
          name: 'Cos\'è SOLARBACK?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'SOLARBACK è il primo sistema di acquisizione verticale costruito per aziende installatrici di fotovoltaico in Italia. Gestiamo ogni richiesta fino al sopralluogo qualificato.',
          },
        },
        {
          '@type': 'Question',
          name: 'Quanto costa SOLARBACK?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'SOLARBACK lavora a performance: paghi solo quando portiamo sopralluoghi qualificati in agenda. Nessun canone fisso, nessun costo mensile.',
          },
        },
        {
          '@type': 'Question',
          name: 'SOLARBACK funziona per la mia zona?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'SOLARBACK opera su tutto il territorio italiano, da Nord a Sud. Lavoriamo con installatori di fotovoltaico in Lombardia, Veneto, Piemonte, Lazio, Campania e tutte le altre regioni.',
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
