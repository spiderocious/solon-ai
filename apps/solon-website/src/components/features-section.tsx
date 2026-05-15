import content from '@/content/site.json';

const ICONS: Record<string, React.ReactNode> = {
  brain: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
    </svg>
  ),
  shield: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  map: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
      <line x1="9" y1="3" x2="9" y2="18" />
      <line x1="15" y1="6" x2="15" y2="21" />
    </svg>
  ),
  bolt: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  lock: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  chart: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  ),
};

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 md:py-28" style={{ background: 'var(--paper-2)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <div className="font-mono text-[10px] uppercase tracking-[0.14em] mb-3" style={{ color: 'var(--forest-700)' }}>
            Built for this
          </div>
          <h2 className="font-serif font-semibold text-[36px] md:text-[44px] leading-tight" style={{ color: 'var(--ink)' }}>
            Not a generic CRM.<br />
            <span style={{ color: 'var(--ink-3)' }}>A campaign operating system.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {content.features.map((f) => (
            <div
              key={f.icon}
              className="rounded-[8px] p-6"
              style={{ background: 'var(--sheet)', border: '1px solid var(--hair)' }}
            >
              <div
                className="w-9 h-9 rounded-[6px] flex items-center justify-center mb-4"
                style={{ background: 'var(--forest-50)', color: 'var(--forest-700)' }}
              >
                {ICONS[f.icon]}
              </div>
              <h3 className="font-serif font-semibold text-[17px] mb-2" style={{ color: 'var(--ink)' }}>
                {f.headline}
              </h3>
              <p className="font-sans text-[13px] leading-relaxed" style={{ color: 'var(--ink-3)' }}>
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
