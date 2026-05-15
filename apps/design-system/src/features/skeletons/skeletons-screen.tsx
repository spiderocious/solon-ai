import { Button, SkeletonCard } from '@solon/ui';

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

export function SkeletonsScreen() {
  return (
    <div className="max-w-[760px]">
      <div className="mb-10 pb-6 border-b" style={{ borderColor: 'var(--hair)' }}>
        <div className="font-mono text-[10px] uppercase tracking-[0.14em] mb-1" style={{ color: 'var(--ink-4)' }}>24 / DATA &amp; STATE</div>
        <div className="font-serif font-semibold text-[36px] leading-tight" style={{ color: 'var(--ink)' }}>Skeletons &amp; empty</div>
        <div className="font-serif italic text-[14px] mt-1" style={{ color: 'var(--ink-3)' }}>— paper-tinted skeletons; empty states with one figure and one action.</div>
      </div>

      <Scene title="Scene · skeleton loading" subtitle="cards pulse while data loads">
        <div className="grid grid-cols-2 gap-4">
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </Scene>

      <Scene title="Scene · empty state · no scenarios" subtitle="default empty, primary action lives on right">
        <div
          className="border p-8 rounded text-center max-w-sm mx-auto"
          style={{ borderColor: 'var(--hair)' }}
        >
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto mb-3"
          >
            <path
              d="M7 18a11 11 0 0 1 18.6-7.9M29 18a11 11 0 0 1-18.6 7.9"
              stroke="var(--ink-3)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path d="M25.6 10.1l3.7-.4-.4 3.7" stroke="var(--ink-3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10.4 25.9l-3.7.4.4-3.7" stroke="var(--ink-3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="18" cy="18" r="3" stroke="var(--ink-3)" strokeWidth="1.5" />
          </svg>
          <h3 className="font-sans font-medium text-[16px]" style={{ color: 'var(--ink)' }}>No scenarios saved yet</h3>
          <p className="font-sans text-[13px] mt-2 leading-relaxed" style={{ color: 'var(--ink-3)' }}>
            Run a scenario from the builder and save it here. Saved scenarios can be compared side by side or exported as a PDF brief.
          </p>
          <div className="flex items-center justify-center mt-4 gap-2">
            <Button variant="secondary">Open builder</Button>
            <Button variant="primary">Run baseline scenario</Button>
          </div>
        </div>
      </Scene>

      <Scene title="Scene · empty state · search no results" subtitle="contextual empty with fuzzy match hint">
        <div
          className="border p-8 rounded text-center max-w-sm mx-auto"
          style={{ borderColor: 'var(--hair)' }}
        >
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto mb-3"
          >
            <circle cx="15.5" cy="15.5" r="8.5" stroke="var(--ink-3)" strokeWidth="1.5" />
            <path d="M22 22l7 7" stroke="var(--ink-3)" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <h3 className="font-sans font-medium text-[16px]" style={{ color: 'var(--ink)' }}>
            Nothing matched <em className="font-serif italic">Anambra North</em>
          </h3>
          <p className="font-sans text-[13px] mt-2 leading-relaxed" style={{ color: 'var(--ink-3)' }}>
            There is no constituency named that. The closest matches are{' '}
            <strong style={{ color: 'var(--ink-2)' }}>Anambra Central, Anambra East, Anambra West.</strong>
          </p>
          <div className="flex items-center justify-center mt-4">
            <Button variant="quiet">Clear search</Button>
          </div>
        </div>
      </Scene>

      <Scene title="Scene · empty state · model refused" subtitle="orange guardrail variant">
        <div
          className="border p-8 rounded text-center max-w-sm mx-auto"
          style={{ borderColor: 'var(--orange)', background: '#FFF3E0' }}
        >
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto mb-3"
          >
            <circle cx="18" cy="18" r="14" stroke="var(--orange)" strokeWidth="1.5" />
            <path d="M18 11v8" stroke="var(--orange)" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="18" cy="23.5" r="1" fill="var(--orange)" />
          </svg>
          <h3 className="font-sans font-medium text-[16px]" style={{ color: '#BF360C' }}>Solon refused this query</h3>
          <p className="font-sans text-[13px] mt-2 leading-relaxed" style={{ color: '#BF360C' }}>
            This scenario asked the model to suppress turnout in opposition wards. That kind of question is blocked under Solon's{' '}
            <strong>ethical guardrails</strong> and has been logged for audit. The query is not run.
          </p>
          <div className="flex items-center justify-center mt-4">
            <Button variant="quiet">Edit scenario</Button>
          </div>
        </div>
      </Scene>
    </div>
  );
}
