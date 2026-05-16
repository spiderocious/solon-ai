import content from '@/content/v2.json';

const items = content.ticker;
const doubled = [...items, ...items];

export function V2Ticker() {
  return (
    <div
      className="relative overflow-hidden py-3.5"
      style={{
        background: 'var(--ink)',
        borderTop: '1px solid rgba(0,0,0,0.12)',
        borderBottom: '1px solid rgba(0,0,0,0.12)',
      }}
    >
      {/* Left fade */}
      <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, var(--ink), transparent)' }} />
      {/* Right fade */}
      <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, var(--ink), transparent)' }} />

      <div className="flex gap-0 v2-ticker-track">
        {doubled.map((item, i) => (
          <div key={i} className="flex items-center gap-0 shrink-0">
            <span
              className="font-mono text-[10px] uppercase tracking-[0.16em] whitespace-nowrap px-7"
              style={{ color: 'rgba(245,239,224,0.55)' }}
            >
              {item}
            </span>
            <span
              className="w-1 h-1 rounded-full shrink-0"
              style={{ background: 'var(--forest-600)' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
