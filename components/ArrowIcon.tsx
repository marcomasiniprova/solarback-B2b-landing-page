/**
 * Freccia usata dentro i bottoni dorati (.sb-btn .arrow).
 * Estratta perché lo stesso SVG era duplicato identico in 5 punti.
 */
export function ArrowIcon() {
  return (
    <span className="arrow">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <path
          d="M3 6h6M7 3l3 3L7 9"
          stroke="#1a0e00"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  )
}
