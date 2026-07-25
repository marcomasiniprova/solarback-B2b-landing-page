import Link from 'next/link'
import type { ReactNode } from 'react'

/**
 * Layout condiviso delle pagine legali (privacy, cookie, termini).
 * Server component: nessun hook, nessun JS lato client.
 */
export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string
  updated: string
  children: ReactNode
}) {
  return (
    <main className="legal-page">
      <h1 className="legal-h1">{title}</h1>
      <div className="legal-body">
        <p>
          <strong>Ultimo aggiornamento:</strong> {updated}
        </p>
        {children}
      </div>
      <p className="legal-back">
        <Link href="/">← Torna alla home</Link>
      </p>
    </main>
  )
}

/** Sezione con titolo, usata dentro <LegalPage>. */
export function LegalSection({
  heading,
  children,
}: {
  heading: string
  children: ReactNode
}) {
  return (
    <>
      <h2 className="legal-h2">{heading}</h2>
      {children}
    </>
  )
}
