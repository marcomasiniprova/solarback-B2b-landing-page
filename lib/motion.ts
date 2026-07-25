/**
 * Preset di animazione condivisi (framer-motion).
 *
 * Lo stesso blocco initial/whileInView/viewport/transition era ripetuto
 * inline oltre 20 volte nei componenti. Centralizzarlo mantiene le
 * animazioni coerenti e rende una modifica globale una sola riga.
 */

/** Entrata "fade + sali" quando l'elemento entra nel viewport. */
export function fadeUp(delay = 0, distance = 20) {
  return {
    initial: { opacity: 0, y: distance },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true } as const,
    transition: { duration: 0.6, delay, ease: 'easeOut' as const },
  }
}

/** Variante più marcata, per card e blocchi grandi. */
export function fadeUpCard(delay = 0) {
  return {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-40px' } as const,
    transition: { duration: 0.7, delay, ease: 'easeOut' as const },
  }
}
