import { useState } from 'react';

import { Button } from '@solon/ui';

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

function SectionBreak({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-5 mt-8">
      <span className="font-mono text-[10px] uppercase tracking-[0.14em] shrink-0" style={{ color: 'var(--ink-4)' }}>{label}</span>
      <div className="flex-1 h-px" style={{ background: 'var(--hair)' }} />
    </div>
  );
}

export function ButtonsScreen() {
  const [confirmValue, setConfirmValue] = useState('');
  const canVoid = confirmValue === 'VOID';

  return (
    <div className="max-w-[760px]">
      <div className="mb-10 pb-6 border-b" style={{ borderColor: 'var(--hair)' }}>
        <div className="font-mono text-[10px] uppercase tracking-[0.14em] mb-1" style={{ color: 'var(--ink-4)' }}>10 / PRIMITIVES</div>
        <div className="font-serif font-semibold text-[36px] leading-tight" style={{ color: 'var(--ink)' }}>Buttons</div>
        <div className="font-serif italic text-[14px] mt-1" style={{ color: 'var(--ink-3)' }}>— rendered in scenes.</div>
        <div className="font-mono text-[10px] mt-3" style={{ color: 'var(--ink-4)' }}>SOLON · v 0.1</div>
      </div>

      <p className="font-serif italic text-[14px] leading-relaxed mb-8 max-w-[70ch]" style={{ color: 'var(--ink-3)' }}>
        Five button intents, drawn in the places they live. Primary is forest, secondary is hairline-ink, quiet is text-only, warn (orange) sits beside actions that need attention, critical (oxblood) is reserved for irreversible — and never appears without a confirmation pattern.
      </p>

      <Scene title="Scene · scenario modal foot" subtitle="primary, secondary, quiet">
        <div className="rounded-[6px] border overflow-hidden" style={{ borderColor: 'var(--hair)' }}>
          <div className="p-6">
            <div className="font-serif font-semibold text-[18px] mb-2" style={{ color: 'var(--ink)' }}>Save scenario</div>
            <p className="font-sans text-[13px] leading-relaxed mb-4" style={{ color: 'var(--ink-2)' }}>
              Give this scenario a name. It will be filed under <strong>Anambra Central · Senate</strong> and accessible to your strategist team.
            </p>
            <input
              className="w-full h-[34px] px-3 rounded-[4px] border font-sans text-[13px]"
              placeholder="Soludo endorsement · base case"
              style={{ borderColor: 'var(--hair)', background: 'var(--sheet)', color: 'var(--ink)' }}
            />
          </div>
          <div className="flex items-center gap-2 px-6 py-4 border-t" style={{ borderColor: 'var(--hair)', background: 'var(--paper-2)' }}>
            <Button variant="quiet">Cancel</Button>
            <Button variant="secondary">Save &amp; close</Button>
            <Button variant="primary">Save &amp; re-run</Button>
          </div>
        </div>
      </Scene>

      <Scene title="Scene · constituency toolbar" subtitle="primary action paired with quiet siblings">
        <div className="flex items-center gap-2 px-4 py-3 rounded-[4px] border" style={{ borderColor: 'var(--hair)', background: 'var(--sheet)' }}>
          <span className="font-mono text-[10px] tracking-[0.12em]" style={{ color: 'var(--ink-4)' }}>ANAMBRA CENTRAL · SENATE · BASELINE</span>
          <div className="flex-1" />
          <Button variant="quiet" size="sm">Filter</Button>
          <Button variant="quiet" size="sm">Compare</Button>
          <Button variant="quiet" size="sm">Export</Button>
          <div className="w-px h-[20px] mx-1" style={{ background: 'var(--hair)' }} />
          <Button variant="secondary" size="sm">Save scenario</Button>
          <Button variant="primary" size="sm">Re-run</Button>
        </div>
      </Scene>

      <Scene title="Scene · candidate row with inline action" subtitle="link button + warn for withdraw">
        <div className="flex items-center gap-4 px-4 py-3 rounded-[4px] border" style={{ borderColor: 'var(--hair)', background: 'var(--sheet)' }}>
          <div className="flex-1">
            <div className="font-sans font-medium text-[14px]" style={{ color: 'var(--ink)' }}>Soludo, Charles — APGA</div>
            <div className="font-sans text-[12px] mt-0.5" style={{ color: 'var(--ink-3)' }}>Incumbent governor · prior backer of LP coalition · ethnoreligious: Igbo Christian</div>
          </div>
          <Button variant="link">Edit attributes</Button>
          <Button variant="warn" size="sm">Withdraw</Button>
        </div>
      </Scene>

      <Scene title="Scene · irreversible" subtitle="critical idiom — type-to-confirm">
        <div className="p-5 rounded-[4px] border-2" style={{ borderColor: 'var(--crit)', background: 'var(--crit-bg)' }}>
          <div className="font-sans font-semibold text-[15px] mb-2" style={{ color: 'var(--ink)' }}>Void this polling-unit result</div>
          <p className="font-sans text-[13px] leading-relaxed mb-4" style={{ color: 'var(--ink-2)' }}>
            Voiding a polling-unit submission removes it from the live War Room tally and writes an audit entry signed by your account. This action is reported in the public export. To proceed, type the word <strong>VOID</strong> in the field below.
          </p>
          <div className="flex items-center gap-3">
            <input
              className="h-[34px] px-3 rounded-[4px] border font-mono text-[13px] w-[200px]"
              placeholder="type VOID to confirm"
              value={confirmValue}
              onChange={(e) => setConfirmValue(e.target.value)}
              style={{ borderColor: 'var(--crit)', background: 'var(--sheet)', color: 'var(--ink)' }}
            />
            <Button variant="quiet">Cancel</Button>
            <Button variant="crit" disabled={!canVoid}>Void result</Button>
          </div>
        </div>
      </Scene>

      <SectionBreak label="Reference grid · all intents, all sizes" />
      <div className="space-y-4">
        {([
          { label: 'Primary',   variant: 'primary'   as const, note: '28 · 34 · 42 px' },
          { label: 'Secondary', variant: 'secondary' as const, note: 'hairline ink' },
          { label: 'Quiet',     variant: 'quiet'     as const, note: 'text only' },
          { label: 'Warn',      variant: 'warn'      as const, note: 'hairline orange' },
          { label: 'Critical',  variant: 'crit'      as const, note: 'oxblood fill' },
        ]).map(({ label, variant, note }) => (
          <div key={label} className="flex items-center gap-6 py-3 border-b" style={{ borderColor: 'var(--hair)' }}>
            <span className="font-sans text-[12px] w-[80px] shrink-0" style={{ color: 'var(--ink-2)' }}>{label}</span>
            <Button variant={variant} size="sm">{label === 'Warn' ? 'Withdraw' : label === 'Critical' ? 'Void' : 'Save'}</Button>
            <Button variant={variant} size="md">{label === 'Warn' ? 'Withdraw' : label === 'Critical' ? 'Void' : 'Save'}</Button>
            <Button variant={variant} size="lg">{label === 'Warn' ? 'Withdraw candidate' : label === 'Critical' ? 'Void result' : 'Save & re-run'}</Button>
            <span className="font-mono text-[10px]" style={{ color: 'var(--ink-4)' }}>{note}</span>
          </div>
        ))}
        <div className="flex items-center gap-6 py-3">
          <span className="font-sans text-[12px] w-[80px] shrink-0" style={{ color: 'var(--ink-2)' }}>Link</span>
          <Button variant="link" size="sm">Edit</Button>
          <Button variant="link" size="md">Edit attributes</Button>
          <span className="font-mono text-[10px]" style={{ color: 'var(--ink-4)' }}>underlined forest</span>
        </div>
      </div>
    </div>
  );
}
