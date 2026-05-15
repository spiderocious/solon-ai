import { Button, TierChip } from '@solon/ui';

function Scene({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <div className="flex items-baseline gap-3 mb-4 pb-2 border-b" style={{ borderColor: 'var(--hair)' }}>
        <span className="font-sans text-[13px]" style={{ color: 'var(--ink-2)' }}>{title}</span>
        {subtitle && <span className="font-mono text-[10px]" style={{ color: 'var(--ink-4)' }}>{subtitle}</span>}
      </div>
      {children}
    </div>
  );
}

const scenarios = [
  {
    saved: 'SAVED · MAY 11',
    confLabel: 'HIGH CONF.',
    confColor: 'var(--forest-700)',
    title: 'Baseline',
    subtitle: '— Anambra Central · senate',
    body: 'No-shock projection using INEC 2023 turnout, current candidate set, no coalition adjustment.',
    projLabel: 'LP projection',
    pct: '47.2%',
    pctColor: 'var(--forest-700)',
    margin: '± 3.1',
  },
  {
    saved: 'SAVED · MAY 11',
    confLabel: 'MED CONF.',
    confColor: 'var(--ink-3)',
    title: 'Soludo backs LP',
    subtitle: '— +8pt youth turnout',
    body: 'Coalition signal applied at strong weight; youth-turnout adjusted +8pt; APGA candidate weakened.',
    projLabel: 'LP projection',
    pct: '53.4%',
    pctColor: 'var(--forest-700)',
    margin: '± 3.8',
  },
  {
    saved: 'SAVED · MAY 11',
    confLabel: 'LOW CONF.',
    confColor: 'var(--orange)',
    title: 'Security incident · Onitsha',
    subtitle: '— severity 4 shock',
    body: 'Shock applied with 14-day decay; localised turnout suppression in Onitsha N. and S.; redistribution model active.',
    projLabel: 'LP projection',
    pct: '42.1%',
    pctColor: 'var(--orange)',
    margin: '± 5.4',
  },
] as const;

export function CardsScreen() {
  return (
    <div className="max-w-[860px]">
      <div className="mb-10 pb-6 border-b" style={{ borderColor: 'var(--hair)' }}>
        <div className="font-mono text-[10px] uppercase tracking-[0.14em] mb-1" style={{ color: 'var(--ink-4)' }}>26 / DATA &amp; STATE</div>
        <div className="font-serif font-semibold text-[36px] leading-tight" style={{ color: 'var(--ink)' }}>Cards</div>
        <div className="font-serif italic text-[14px] mt-1" style={{ color: 'var(--ink-3)' }}>— scenario card, PU drill-in, briefing.</div>
      </div>

      <Scene title="Scene · saved scenarios" subtitle="3-up grid gallery">
        <div className="grid grid-cols-3 gap-4">
          {scenarios.map((s) => (
            <div
              key={s.title}
              className="rounded-[6px] overflow-hidden"
              style={{ border: '1px solid var(--hair)', background: 'var(--sheet)' }}
            >
              {/* Card header */}
              <div
                className="px-4 py-2 flex justify-between border-b"
                style={{ background: 'var(--paper-2)', borderColor: 'var(--hair)' }}
              >
                <span className="font-mono text-[10px]" style={{ color: 'var(--ink-3)' }}>{s.saved}</span>
                <span className="font-mono text-[10px]" style={{ color: s.confColor }}>{s.confLabel}</span>
              </div>

              {/* Card body */}
              <div className="p-4">
                <h3 className="font-sans font-semibold text-[15px]" style={{ color: 'var(--ink)' }}>{s.title}</h3>
                <p className="font-serif italic text-[12px] mt-0.5" style={{ color: 'var(--ink-3)' }}>{s.subtitle}</p>
                <p className="font-sans text-[12px] mt-2 leading-relaxed" style={{ color: 'var(--ink-3)' }}>{s.body}</p>
              </div>

              {/* Card footer */}
              <div
                className="border-t px-4 py-3 flex justify-between items-baseline"
                style={{ borderColor: 'var(--hair)' }}
              >
                <span className="font-sans text-[11px]" style={{ color: 'var(--ink-3)' }}>{s.projLabel}</span>
                <span className="font-serif font-bold text-[22px]" style={{ color: s.pctColor }}>{s.pct}</span>
                <span className="font-serif italic text-[11px]" style={{ color: 'var(--ink-3)' }}>{s.margin}</span>
              </div>
            </div>
          ))}
        </div>
      </Scene>

      <Scene title="Scene · PU drill-in card" subtitle="polling unit intelligence card + AI briefing card">
        <div className="grid grid-cols-2 gap-4">
          {/* Left: PU intelligence card */}
          <div
            className="rounded-[6px] overflow-hidden"
            style={{ border: '1px solid var(--ink)' }}
          >
            {/* Header */}
            <div
              className="px-4 py-3 border-b"
              style={{ background: 'var(--paper-2)', borderColor: 'var(--ink)' }}
            >
              <h4 className="font-sans font-semibold text-[14px]" style={{ color: 'var(--ink)' }}>St. Mary's Primary</h4>
              <p className="font-mono text-[10px] mt-0.5" style={{ color: 'var(--ink-3)' }}>
                Onitsha North · ward 4 / PU 008-04-02 · LGA-008
              </p>
            </div>

            {/* Body */}
            <div className="p-4 space-y-2">
              <dl className="grid grid-cols-2 gap-1">
                <dt className="font-mono text-[10px] uppercase" style={{ color: 'var(--ink-4)' }}>Registered voters</dt>
                <dd className="font-sans text-[13px]" style={{ color: 'var(--ink-2)' }}>1,284</dd>

                <dt className="font-mono text-[10px] uppercase" style={{ color: 'var(--ink-4)' }}>2023 turnout</dt>
                <dd className="font-sans text-[13px]" style={{ color: 'var(--ink-2)' }}>412 · 32%</dd>

                <dt className="font-mono text-[10px] uppercase" style={{ color: 'var(--ink-4)' }}>2023 result</dt>
                <dd className="font-sans text-[13px]" style={{ color: 'var(--ink-2)' }}>LP · 51.3%</dd>

                <dt className="font-mono text-[10px] uppercase" style={{ color: 'var(--ink-4)' }}>2027 projection</dt>
                <dd className="font-serif text-[14px] font-bold" style={{ color: 'var(--forest-700)' }}>LP 52.1% ± 2.4</dd>
              </dl>

              <div className="mt-2">
                <TierChip tier="hold-strong" />
              </div>

              <div className="pt-2 border-t" style={{ borderColor: 'var(--hair)' }}>
                <p className="font-mono text-[10px] uppercase mb-1" style={{ color: 'var(--ink-3)' }}>Top drivers</p>
                <ol className="font-sans text-[12px] space-y-0.5 list-decimal list-inside" style={{ color: 'var(--ink-2)' }}>
                  <li>Incumbent advantage +14.8 pt</li>
                  <li>2023 turnout pattern +6.2 pt</li>
                  <li>Ethnoreligious composition +3.4 pt</li>
                </ol>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t px-4 py-3 flex gap-2" style={{ borderColor: 'var(--hair)' }}>
              <Button variant="quiet" size="sm">Add to watchlist</Button>
              <Button variant="quiet" size="sm">View on map</Button>
              <Button variant="secondary" size="sm">Run scenario</Button>
            </div>
          </div>

          {/* Right: AI briefing card */}
          <div
            className="rounded-[6px] overflow-hidden"
            style={{
              border: '1px solid var(--ink)',
              borderTop: '3px solid var(--forest-600)',
            }}
          >
            {/* Header */}
            <div
              className="px-4 py-3 flex justify-between items-center border-b"
              style={{ background: 'var(--paper-2)', borderColor: 'var(--ink)' }}
            >
              <div className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1" y="1" width="12" height="3.5" rx="1" stroke="var(--forest-600)" strokeWidth="1.2" />
                  <rect x="1" y="5.5" width="12" height="3.5" rx="1" stroke="var(--forest-600)" strokeWidth="1.2" />
                  <rect x="1" y="10" width="12" height="3" rx="1" stroke="var(--forest-600)" strokeWidth="1.2" />
                </svg>
                <span className="font-mono text-[10px] uppercase tracking-[0.12em]" style={{ color: 'var(--forest-700)' }}>SOLON · ANALYST</span>
              </div>
              <span className="font-mono text-[10px]" style={{ color: 'var(--ink-4)' }}>2026-05-11 · 14:08</span>
            </div>

            {/* Body */}
            <div className="p-4 font-serif text-[13.5px] leading-relaxed" style={{ color: 'var(--ink-2)' }}>
              <span
                className="float-left mr-1 leading-none font-serif"
                style={{ fontSize: '32px', color: 'var(--forest-600)', lineHeight: 1 }}
              >
                S
              </span>
              t. Mary's holds robustly for Labour because the model reads three reinforcing signals here: incumbent advantage from the 2023 cycle[1], a stable ward-4 turnout pattern across the last two senate races[2], and ethnoreligious composition that has been a structural LP advantage in Onitsha North since 2019[3]. The 2.4-point confidence band is tight — short of a wide-scope shock, this PU is unlikely to flip.
            </div>

            {/* Footer */}
            <div className="px-4 pb-4 font-serif italic text-[11px]" style={{ color: 'var(--ink-3)' }}>
              Sources [1] INEC senate result tables... [2] PU-level turnout... [3] Composition model.
            </div>
          </div>
        </div>
      </Scene>
    </div>
  );
}
