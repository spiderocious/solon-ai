function SectionBreak({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-5 mt-8">
      <span className="font-mono text-[10px] uppercase tracking-[0.14em] shrink-0" style={{ color: 'var(--ink-4)' }}>{label}</span>
      <div className="flex-1 h-px" style={{ background: 'var(--hair)' }} />
    </div>
  );
}

const SPACING = [
  { px: 4,  label: '4 px · 1u' },
  { px: 8,  label: '8 px · 2u' },
  { px: 12, label: '12 px · 3u' },
  { px: 16, label: '16 px · 4u' },
  { px: 24, label: '24 px · 6u' },
  { px: 32, label: '32 px · 8u' },
  { px: 48, label: '48 px · 12u' },
  { px: 64, label: '64 px · 16u · gutter' },
];

const RADII = [
  { r: '0px',  label: '0 · rules · hairlines' },
  { r: '2px',  label: '2 · stamps · footnote chips' },
  { r: '4px',  label: '4 · buttons · inputs · sheets' },
  { r: '6px',  label: '6 · modal frames only' },
];

const LINES = [
  { label: 'Hair · 1px hair',   height: '1px', bg: 'var(--hair)',       note: 'Table divider · sheet edge' },
  { label: 'Rule · 1px ink',    height: '1px', bg: 'var(--ink)',        note: 'Section underline · stamp' },
  { label: 'Double · 3px ink',  height: '3px', bg: 'var(--ink)',        note: 'Masthead only' },
  { label: 'Forest · 2px',      height: '2px', bg: 'var(--forest-600)', note: 'AI copilot top stripe' },
  { label: 'Orange · 2px',      height: '2px', bg: 'var(--orange)',     note: 'Warn banner top stripe' },
];

const EDITORIAL_ROWS = [
  { name: "St. Mary's Primary, Onitsha North", count: '1,284' },
  { name: 'Onitsha Town Hall, ward 4',         count: '2,041' },
  { name: 'Nkpor Civic Centre, ward 5',        count: '896' },
];

const INSTRUMENT_ROWS = [
  { code: 'PU 008-04-02 · St. Mary\'s', count: '1,284' },
  { code: 'PU 008-04-09 · Onitsha Hall', count: '2,041' },
  { code: 'PU 008-05-11 · Nkpor',       count: '896' },
  { code: 'PU 008-05-12 · Nkpor 2',     count: '1,114' },
  { code: 'PU 008-05-13 · Iyiowa',       count: '722' },
];

export function GeometryScreen() {
  return (
    <div className="max-w-[760px]">
      <div className="mb-10 pb-6 border-b" style={{ borderColor: 'var(--hair)' }}>
        <div className="font-mono text-[10px] uppercase tracking-[0.14em] mb-1" style={{ color: 'var(--ink-4)' }}>03 / FOUNDATION</div>
        <div className="font-serif font-semibold text-[36px] leading-tight" style={{ color: 'var(--ink)' }}>Spacing & geometry</div>
        <div className="font-serif italic text-[14px] mt-1" style={{ color: 'var(--ink-3)' }}>— 4-pixel grid, 4-pixel corners, hairlines first.</div>
        <div className="font-mono text-[10px] mt-3" style={{ color: 'var(--ink-4)' }}>SOLON · v 0.1</div>
      </div>

      <p className="font-serif italic text-[14px] leading-relaxed mb-8 max-w-[70ch]" style={{ color: 'var(--ink-3)' }}>
        Solon&apos;s grid is 4px. Controls and sheets carry a single softening — a 4-pixel corner — borrowed from the editorial-warm variant. Everything else is sharp. We draw lines, not shadows; shadows live only on popovers and modals.
      </p>

      <SectionBreak label="Spacing step" />
      <div className="space-y-3 mb-2">
        {SPACING.map(({ px, label }) => (
          <div key={px} className="flex items-center gap-4">
            <span className="font-mono text-[10px] w-[140px] shrink-0" style={{ color: 'var(--ink-4)' }}>{label}</span>
            <div className="rounded-[2px]" style={{ width: px, height: 10, background: 'var(--forest-600)' }} />
          </div>
        ))}
      </div>

      <SectionBreak label="Corner radius" />
      <div className="flex flex-wrap gap-4 mb-2">
        {RADII.map(({ r, label }) => (
          <div
            key={r}
            className="flex items-center justify-center text-center px-5 py-4 border text-[11px] font-sans"
            style={{ borderRadius: r, borderColor: 'var(--ink)', color: 'var(--ink-2)', minWidth: 140 }}
          >
            {label}
          </div>
        ))}
      </div>

      <SectionBreak label="Line weights" />
      <div className="space-y-4 mb-2">
        {LINES.map(({ label, height, bg, note }) => (
          <div key={label} className="flex items-center gap-4">
            <span className="font-mono text-[10px] w-[140px] shrink-0" style={{ color: 'var(--ink-4)' }}>{label}</span>
            <div className="flex-1 flex flex-col gap-1">
              <div style={{ height, background: bg }} />
              <span className="font-mono text-[10px]" style={{ color: 'var(--ink-3)' }}>{note}</span>
            </div>
          </div>
        ))}
      </div>

      <SectionBreak label="Density" />
      <p className="font-serif italic text-[13.5px] leading-relaxed mb-5 max-w-[70ch]" style={{ color: 'var(--ink-3)' }}>
        Two densities: <strong className="not-italic font-medium" style={{ color: 'var(--ink-2)' }}>editorial</strong> for the Simulator, briefing pages, and exports — wide gutters, more whitespace. <strong className="not-italic font-medium" style={{ color: 'var(--ink-2)' }}>Instrument</strong> for the War Room and the constituency map — rows tightened to 36px, mono-prefix inputs. Both share the same tokens; only the gutter and the row height change.
      </p>
      <div className="grid grid-cols-2 gap-5">
        <div className="rounded-[4px] p-5 border" style={{ borderColor: 'var(--hair)' }}>
          <div className="font-mono text-[10px] uppercase tracking-[0.12em] mb-3" style={{ color: 'var(--ink-4)' }}>Editorial · 20/24 px row · 24 px gutter</div>
          {EDITORIAL_ROWS.map(({ name, count }) => (
            <div key={name} className="flex justify-between py-[14px] border-t" style={{ borderColor: 'var(--hair)' }}>
              <span className="font-sans text-[13px]" style={{ color: 'var(--ink)' }}>{name}</span>
              <span className="font-mono text-[13px]" style={{ color: 'var(--ink)', fontVariantNumeric: 'tabular-nums' }}>{count}</span>
            </div>
          ))}
        </div>
        <div className="rounded-[4px] p-5 border" style={{ borderColor: 'var(--hair)' }}>
          <div className="font-mono text-[10px] uppercase tracking-[0.12em] mb-3" style={{ color: 'var(--ink-4)' }}>Instrument · 12 px row · 12 px gutter</div>
          {INSTRUMENT_ROWS.map(({ code, count }) => (
            <div key={code} className="flex justify-between py-[7px] border-t" style={{ borderColor: 'var(--hair)' }}>
              <span className="font-mono text-[11px]" style={{ color: 'var(--ink-2)' }}>{code}</span>
              <span className="font-mono text-[12px]" style={{ color: 'var(--ink)', fontVariantNumeric: 'tabular-nums' }}>{count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
