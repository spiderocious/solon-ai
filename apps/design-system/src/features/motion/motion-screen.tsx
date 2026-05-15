import { useEffect, useRef, useState } from 'react';


function TickCounter() {
  const [count, setCount] = useState(412);
  const [delta, setDelta] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const inc = Math.floor(Math.random() * 5) + 1;
      setCount((c) => c + inc);
      setDelta(inc);
      if (timerRef.current !== null) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setDelta(null), 4000);
    }, 3000);
    return () => {
      clearInterval(interval);
      if (timerRef.current !== null) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div className="flex items-baseline gap-3">
      <span className="font-mono font-medium text-[32px]" style={{ color: 'var(--ink)', fontVariantNumeric: 'tabular-nums' }}>{count}</span>
      {delta !== null && (
        <span
          className="font-mono text-[11px] px-2 py-0.5 rounded-[2px] transition-opacity duration-[4000ms]"
          style={{ background: 'var(--forest-50)', color: 'var(--forest-600)' }}
        >
          +{delta} PU last 60s
        </span>
      )}
    </div>
  );
}

export function MotionScreen() {
  return (
    <div className="max-w-[760px]">
      <div className="mb-10 pb-6 border-b" style={{ borderColor: 'var(--hair)' }}>
        <div className="font-mono text-[10px] uppercase tracking-[0.14em] mb-1" style={{ color: 'var(--ink-4)' }}>04 / FOUNDATION</div>
        <div className="font-serif font-semibold text-[36px] leading-tight" style={{ color: 'var(--ink)' }}>Motion</div>
        <div className="font-serif italic text-[14px] mt-1" style={{ color: 'var(--ink-3)' }}>— paper, not springs.</div>
        <div className="font-mono text-[10px] mt-3" style={{ color: 'var(--ink-4)' }}>SOLON · v 0.1</div>
      </div>

      <p className="font-serif italic text-[14px] leading-relaxed mb-8 max-w-[70ch]" style={{ color: 'var(--ink-3)' }}>
        Solon moves slowly and rarely. Easing is one curve only —{' '}
        <span className="font-mono not-italic text-[12px]" style={{ color: 'var(--ink)' }}>cubic-bezier(0.2, 0.6, 0.2, 1)</span>.
        {' '}Three durations: 120ms for instant feedback, 200ms for paper lifts, 320ms for modal entries. The War Room values <em>tick</em> rather than animate — one-frame increments, no easing on numbers. A spring would feel wrong on an order paper.
      </p>

      {/* 120ms feedback */}
      <div className="flex gap-6 pb-8 border-b mb-6" style={{ borderColor: 'var(--hair)' }}>
        <div className="w-[120px] shrink-0">
          <div className="font-mono text-[10px] uppercase tracking-[0.12em] mb-1" style={{ color: 'var(--ink-4)' }}>120ms · feedback</div>
        </div>
        <div className="flex-1">
          <button
            className="h-[34px] px-4 text-[13px] font-sans font-medium rounded-[4px] transition-colors duration-[120ms]"
            style={{ background: 'var(--forest-600)', color: 'var(--paper)' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--forest-700)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--forest-600)'; }}
          >
            Run scenario
          </button>
          <p className="font-sans text-[12px] leading-relaxed mt-3 max-w-[55ch]" style={{ color: 'var(--ink-3)' }}>
            Hover and press on every interactive element. Background colour cross-fades; nothing translates or scales.
          </p>
        </div>
      </div>

      {/* 200ms paper lift */}
      <div className="flex gap-6 pb-8 border-b mb-6" style={{ borderColor: 'var(--hair)' }}>
        <div className="w-[120px] shrink-0">
          <div className="font-mono text-[10px] uppercase tracking-[0.12em] mb-1" style={{ color: 'var(--ink-4)' }}>200ms · paper lift</div>
        </div>
        <div className="flex-1">
          <div
            className="inline-block p-4 rounded-[4px] border cursor-pointer transition-all duration-200"
            style={{ borderColor: 'var(--hair)', background: 'var(--sheet)' }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLDivElement;
              el.style.transform = 'translateY(-2px)';
              el.style.boxShadow = '0 4px 12px rgba(26,23,20,0.12)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLDivElement;
              el.style.transform = '';
              el.style.boxShadow = '';
            }}
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.12em] mb-1" style={{ color: 'var(--ink-4)' }}>Polling unit</div>
            <div className="font-serif font-semibold text-[16px]" style={{ color: 'var(--ink)' }}>St. Mary&apos;s Primary</div>
            <div className="font-mono text-[11px] mt-1" style={{ color: 'var(--ink-3)' }}>PU 008-04-02</div>
          </div>
          <p className="font-sans text-[12px] leading-relaxed mt-3 max-w-[55ch]" style={{ color: 'var(--ink-3)' }}>
            Cards lift 2px and gain a popover shadow on hover. The lift never bounces. Used on the polling-unit list, the constituency map drill-in card, and the scenario tile.
          </p>
        </div>
      </div>

      {/* 200ms scrubber */}
      <div className="flex gap-6 pb-8 border-b mb-6" style={{ borderColor: 'var(--hair)' }}>
        <div className="w-[120px] shrink-0">
          <div className="font-mono text-[10px] uppercase tracking-[0.12em] mb-1" style={{ color: 'var(--ink-4)' }}>200ms · scrubber</div>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <span className="font-sans text-[13px]" style={{ color: 'var(--ink-2)' }}>Turnout</span>
            <input
              type="range"
              min={-5}
              max={5}
              defaultValue={2}
              className="flex-1"
              style={{ accentColor: 'var(--forest-600)' }}
            />
            <span className="font-mono text-[13px] w-[60px]" style={{ color: 'var(--ink)', fontVariantNumeric: 'tabular-nums' }}>±2.4 pts</span>
          </div>
          <p className="font-sans text-[12px] leading-relaxed mt-3 max-w-[55ch]" style={{ color: 'var(--ink-3)' }}>
            Lever scrubbers — turnout, demographic shift, alliance — slide with linear easing. The bar fills behind the knob in the same 200ms.
          </p>
        </div>
      </div>

      {/* tick */}
      <div className="flex gap-6 pb-8 border-b mb-6" style={{ borderColor: 'var(--hair)' }}>
        <div className="w-[120px] shrink-0">
          <div className="font-mono text-[10px] uppercase tracking-[0.12em] mb-1" style={{ color: 'var(--ink-4)' }}>tick · no easing</div>
        </div>
        <div className="flex-1">
          <TickCounter />
          <p className="font-sans text-[12px] leading-relaxed mt-3 max-w-[55ch]" style={{ color: 'var(--ink-3)' }}>
            War Room counts step. The tally rolls one-frame at a time; the delta chip appears full-opacity, holds for 4s, fades. Numbers never tween between values.
          </p>
        </div>
      </div>

      {/* 320ms modal */}
      <div className="flex gap-6 pb-8 border-b mb-6" style={{ borderColor: 'var(--hair)' }}>
        <div className="w-[120px] shrink-0">
          <div className="font-mono text-[10px] uppercase tracking-[0.12em] mb-1" style={{ color: 'var(--ink-4)' }}>320ms · modal</div>
        </div>
        <div className="flex-1">
          <div
            className="inline-block p-4 rounded-[6px] border cursor-pointer transition-all duration-[320ms]"
            style={{ borderColor: 'var(--hair)', background: 'var(--sheet)', boxShadow: '0 8px 24px rgba(26,23,20,0.14)' }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLDivElement;
              el.style.opacity = '1';
              el.style.transform = 'scale(1)';
            }}
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.12em] mb-1" style={{ color: 'var(--ink-4)' }}>Confirm</div>
            <div className="font-serif text-[15px]" style={{ color: 'var(--ink)' }}>Withdraw candidate</div>
          </div>
          <p className="font-sans text-[12px] leading-relaxed mt-3 max-w-[55ch]" style={{ color: 'var(--ink-3)' }}>
            Modals scale from 0.98 to 1.0 and fade in over 320ms. The backdrop fades to a 40% ink tint over the same duration.
          </p>
        </div>
      </div>

      {/* never */}
      <div className="flex gap-6 pb-2">
        <div className="w-[120px] shrink-0">
          <div className="font-mono text-[10px] uppercase tracking-[0.12em] mb-1" style={{ color: 'var(--ink-4)' }}>never</div>
        </div>
        <div className="flex-1">
          <div className="font-serif italic text-[14px]" style={{ color: 'var(--ink-3)' }}>No springs. No parallax. No skeleton shimmer.</div>
          <p className="font-sans text-[12px] leading-relaxed mt-3 max-w-[55ch]" style={{ color: 'var(--ink-3)' }}>
            Springs feel cheap on an order paper. Parallax breaks the document metaphor. Skeleton shimmer is replaced by faint pulse-on-rule.
          </p>
        </div>
      </div>
    </div>
  );
}
