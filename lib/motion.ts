/**
 * Preset di animazione condivisi (framer-motion).
 *
 * Lo stesso blocco di 4 prop (initial/whileInView/viewport/transition) era
 * ripetuto inline 22 volte nelle intestazioni di sezione (eyebrow, h2, lead).
 * Centralizzarlo mantiene le animazioni coerenti e rende una modifica
 * globale una sola riga.
 *
 * I valori replicano esattamente quelli che erano inline, ease incluso
 * (assente), quindi la resa visiva è identica a prima.
 *
 * Uso:  <motion.h2 className="sb-h2" {...reveal(0.08)}>
 */
export function reveal(delay = 0) {
  return {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true } as const,
    transition: { duration: 0.6, delay },
  }
}
