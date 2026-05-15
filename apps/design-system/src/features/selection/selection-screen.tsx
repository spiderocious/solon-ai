import { useState } from 'react';

import { Checkbox, Radio, RadioCard, SegmentControl, Toggle } from '@solon/ui';

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

const PARTY_OPTIONS = [
  { value: 'LP',   label: 'LP',   sublabel: 'Labour Party',                        meta: 'model: 47.2%' },
  { value: 'APC',  label: 'APC',  sublabel: 'All Progressives Congress',            meta: 'model: 22.1%' },
  { value: 'APGA', label: 'APGA', sublabel: 'All Progressives Grand Alliance',      meta: 'model: 18.4%' },
  { value: 'PDP',  label: 'PDP',  sublabel: 'Peoples Democratic Party',             meta: 'model: 9.8%' },
];

const PU_TIER_OPTIONS = [
  { value: 'all',       label: 'All PU' },
  { value: 'hold-s',    label: 'Strong hold' },
  { value: 'hold-l',    label: 'Lean hold' },
  { value: 'toss',      label: 'Toss-up' },
  { value: 'opp-l',     label: 'Lean opp.' },
  { value: 'opp-s',     label: 'Strong opp.' },
];

const LANG_OPTIONS = ['English', 'Hausa', 'Yoruba', 'Igbo', 'Pidgin'];

export function SelectionScreen() {
  const [party, setParty] = useState('LP');
  const [tier, setTier] = useState('all');
  const [lang, setLang] = useState('English');
  const [checks, setChecks] = useState({ withdrawal: true, bvas: true, second: false, delimitation: false });
  const [baseline, setBaseline] = useState(true);
  const [confidence, setConfidence] = useState(false);

  return (
    <div className="max-w-[760px]">
      <div className="mb-10 pb-6 border-b" style={{ borderColor: 'var(--hair)' }}>
        <div className="font-mono text-[10px] uppercase tracking-[0.14em] mb-1" style={{ color: 'var(--ink-4)' }}>12 / PRIMITIVES</div>
        <div className="font-serif font-semibold text-[36px] leading-tight" style={{ color: 'var(--ink)' }}>Selection</div>
        <div className="font-serif italic text-[14px] mt-1" style={{ color: 'var(--ink-3)' }}>— checkboxes, radios, toggles, segments, party-card.</div>
        <div className="font-mono text-[10px] mt-3" style={{ color: 'var(--ink-4)' }}>SOLON · v 0.1</div>
      </div>

      <Scene title="Scene · scenario filter" subtitle="checkboxes inside a lever panel">
        <div className="space-y-3">
          <Checkbox
            label="Include candidate withdrawal modelling"
            checked={checks.withdrawal}
            onChange={(e) => setChecks((c) => ({ ...c, withdrawal: e.target.checked }))}
          />
          <Checkbox
            label="Apply BVAS-failure adjustment"
            checked={checks.bvas}
            onChange={(e) => setChecks((c) => ({ ...c, bvas: e.target.checked }))}
          />
          <Checkbox
            label="Re-distribute second-preference votes"
            checked={checks.second}
            onChange={(e) => setChecks((c) => ({ ...c, second: e.target.checked }))}
          />
          <Checkbox
            label="Apply pending ward delimitation"
            checked={checks.delimitation}
            onChange={(e) => setChecks((c) => ({ ...c, delimitation: e.target.checked }))}
          />
        </div>
      </Scene>

      <Scene title="Scene · party selection" subtitle="card-radio for the candidate the user follows">
        <div className="grid grid-cols-4 gap-3">
          {PARTY_OPTIONS.map((opt) => (
            <RadioCard
              key={opt.value}
              value={opt.value}
              label={opt.label}
              sublabel={opt.sublabel}
              meta={opt.meta}
              checked={party === opt.value}
              onChange={setParty}
            />
          ))}
        </div>
      </Scene>

      <Scene title="Scene · output filter" subtitle="segment + toggles in the constituency map header">
        <div className="flex flex-wrap gap-6 items-center">
          <SegmentControl options={PU_TIER_OPTIONS} value={tier} onChange={setTier} />
          <Toggle
            label="Show 2023 baseline overlay"
            checked={baseline}
            onChange={(e) => setBaseline(e.target.checked)}
          />
          <Toggle
            label="Show confidence-band shading"
            checked={confidence}
            onChange={(e) => setConfidence(e.target.checked)}
          />
        </div>
      </Scene>

      <Scene title="Scene · language choice" subtitle="radio group for message generation">
        <div className="flex flex-wrap gap-6">
          {LANG_OPTIONS.map((l) => (
            <Radio
              key={l}
              label={l}
              name="lang"
              value={l}
              checked={lang === l}
              onChange={() => setLang(l)}
            />
          ))}
        </div>
      </Scene>
    </div>
  );
}
