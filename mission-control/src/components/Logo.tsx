export function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <circle cx="32" cy="32" r="30" fill="#151109" stroke="#d9a441" strokeWidth="2" />
      <path d="M18 40 A14 14 0 0 1 46 40" stroke="#d9a441" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      <path d="M32 14 V22 M14 32 H20 M44 32 H50 M19.3 19.3 L23.5 23.5 M44.7 19.3 L40.5 23.5" stroke="#efc97a" strokeWidth="3" strokeLinecap="round" />
      <path d="M22 46 H42" stroke="#d9a441" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  );
}
