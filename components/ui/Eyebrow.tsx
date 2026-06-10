export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-2 text-[0.72rem] font-semibold tracking-[0.22em] uppercase px-4 py-[0.45rem] rounded-full border"
      style={{
        color: 'var(--gold)',
        borderColor: 'rgba(217,164,65,0.25)',
        background: 'rgba(217,164,65,0.04)',
      }}
    >
      <span
        className="w-[6px] h-[6px] rounded-full dot-pulse"
        style={{ background: 'var(--gold)', boxShadow: '0 0 8px var(--gold)' }}
      />
      {children}
    </span>
  )
}
