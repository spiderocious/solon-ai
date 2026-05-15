import { useState } from 'react';

import { Avatar } from '@solon/ui';

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

function Tooltip({ label, tip }: { label: string; tip: string }) {
  const [show, setShow] = useState(false);
  return (
    <span className="relative inline-block">
      <span
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        className="font-serif underline decoration-dotted cursor-help"
        style={{ textDecorationColor: 'var(--forest-300)' }}
      >
        {label}
      </span>
      {show && (
        <span
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded-[3px] font-mono text-[10px] whitespace-nowrap z-10"
          style={{ background: 'var(--ink)', color: 'var(--paper)' }}
        >
          {tip}
        </span>
      )}
    </span>
  );
}

interface CitationData {
  num: number;
  title: string;
  body: string;
  meta: string;
}

function CitationHovercard({ num, title, body, meta }: CitationData) {
  const [show, setShow] = useState(false);
  return (
    <span className="relative inline-block">
      <sup
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        className="font-mono text-[10px] cursor-help"
        style={{ color: 'var(--forest-600)' }}
      >
        [{num}]
      </sup>
      {show && (
        <span
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 block rounded-[4px] p-4 z-10"
          style={{
            width: '360px',
            border: '1px solid var(--ink)',
            background: 'var(--sheet)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
          }}
        >
          <span className="block font-mono text-[10px]" style={{ color: 'var(--forest-700)' }}>Source [{num}]</span>
          <span className="block font-sans font-medium text-[13px] mt-1" style={{ color: 'var(--ink)' }}>{title}</span>
          <span className="block font-sans text-[12px] mt-2 leading-relaxed" style={{ color: 'var(--ink-2)' }}>{body}</span>
          <span className="block font-mono text-[10px] mt-2" style={{ color: 'var(--ink-4)' }}>{meta}</span>
        </span>
      )}
    </span>
  );
}

function PersonHovercard() {
  const [show, setShow] = useState(false);
  return (
    <span className="relative inline-block">
      <span
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        className="cursor-pointer"
      >
        <Avatar initials="CO" size="lg" variant="forest" />
      </span>
      {show && (
        <span
          className="absolute top-full left-0 mt-2 block rounded-[4px] p-4 z-10"
          style={{
            width: '320px',
            border: '1px solid var(--ink)',
            background: 'var(--sheet)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
          }}
        >
          <span className="grid gap-3 items-center" style={{ gridTemplateColumns: '44px 1fr' }}>
            <Avatar initials="CO" size="lg" variant="forest" />
            <span className="block">
              <span className="block font-sans font-medium text-[14px]" style={{ color: 'var(--ink)' }}>Chinwe Obi</span>
              <span className="block font-sans text-[12px]" style={{ color: 'var(--ink-3)' }}>Campaign Manager · Anambra Central</span>
            </span>
          </span>
          <span
            className="grid mt-4 pt-3 border-t"
            style={{ gridTemplateColumns: 'repeat(3, 1fr)', borderColor: 'var(--hair)' }}
          >
            {[
              { value: '412', label: 'Reports filed' },
              { value: '98%', label: 'Verified rate' },
              { value: '2026-02', label: 'Active since' },
            ].map(({ value, label }) => (
              <span key={label} className="block text-center">
                <span className="block font-sans font-semibold text-[15px]" style={{ color: 'var(--ink)' }}>{value}</span>
                <span className="block font-mono text-[10px] uppercase mt-0.5" style={{ color: 'var(--ink-3)' }}>{label}</span>
              </span>
            ))}
          </span>
        </span>
      )}
    </span>
  );
}

export function TooltipsScreen() {
  return (
    <div className="max-w-[760px]">
      <div className="mb-10 pb-6 border-b" style={{ borderColor: 'var(--hair)' }}>
        <div className="font-mono text-[10px] uppercase tracking-[0.14em] mb-1" style={{ color: 'var(--ink-4)' }}>27 / DATA &amp; STATE</div>
        <div className="font-serif font-semibold text-[36px] leading-tight" style={{ color: 'var(--ink)' }}>Tooltips · hovercards</div>
        <div className="font-serif italic text-[14px] mt-1" style={{ color: 'var(--ink-3)' }}>— mono on ink for labels; full citation card for sources.</div>
      </div>

      <Scene title="Scene · tooltip short labels" subtitle="dotted underline trigger, ink pill popover">
        <p className="font-serif text-[15px] leading-relaxed max-w-[65ch]" style={{ color: 'var(--ink-2)' }}>
          The model attributes Labour Party's six-point lift in{' '}
          <Tooltip label="Anambra Central" tip="Senatorial district · 412 PU" />{' '}
          to a turnout rebound in the{' '}
          <Tooltip label="18–34 cohort" tip="Youth · cohort A" />{' '}
          and to{' '}
          <Tooltip label="APGA" tip="All Progressives Grand Alliance" />
          's weakened ground game following the Soludo signal.
        </p>
      </Scene>

      <Scene title="Scene · hovercard citation source" subtitle="source card on citation marks">
        <p className="font-serif text-[15px] leading-relaxed max-w-[65ch]" style={{ color: 'var(--ink-2)' }}>
          The model attributes Labour Party's six-point lift in Anambra Central to a turnout rebound in the 18–34 cohort
          <CitationHovercard
            num={1}
            title="INEC senate turnout tables · 2023"
            body="PU-level accredited-voter counts for the Anambra Central senatorial district, reconciled against the BVAS audit file released by INEC in March 2023. Coverage: 412 / 412 polling units."
            meta="n=412 PU · updated 2023-03-14 · open dataset"
          />{' '}
          and to APGA's weakened ground game following the Soludo signal
          <CitationHovercard
            num={2}
            title="Radio call-in transcripts · Apr–May 2026"
            body="Aggregated transcripts from Anambra-broadcast morning programs, transcribed in Igbo and translated. Subset filtered to political-discourse segments; n=1,148 calls."
            meta="n=1,148 · updated daily · internal corpus"
          />
          .
        </p>
      </Scene>

      <Scene title="Scene · person hovercard" subtitle="avatar + name + role + stats on hover">
        <div className="flex items-center gap-4">
          <PersonHovercard />
          <span className="font-mono text-[11px]" style={{ color: 'var(--ink-3)' }}>Hover avatar to reveal person card</span>
        </div>
      </Scene>
    </div>
  );
}
