import { useState } from 'react';

import { CopilotPrompt, FieldLabel, IssueTagPicker, NairaInput, OTPInput, PUCodeInput, SeveritySlider } from '@solon/ui';

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

export function SpecializedScreen() {
  const [puCode, setPuCode] = useState('');
  const [severity, setSeverity] = useState<1|2|3|4|5>(3);
  const [otp, setOtp] = useState('0412');
  const [tags, setTags] = useState<string[]>(['Security', 'Education', 'Manufacturing revival']);

  return (
    <div className="max-w-[760px]">
      <div className="mb-10 pb-6 border-b" style={{ borderColor: 'var(--hair)' }}>
        <div className="font-mono text-[10px] uppercase tracking-[0.14em] mb-1" style={{ color: 'var(--ink-4)' }}>14 / PRIMITIVES</div>
        <div className="font-serif font-semibold text-[36px] leading-tight" style={{ color: 'var(--ink)' }}>Specialized inputs</div>
        <div className="font-serif italic text-[14px] mt-1" style={{ color: 'var(--ink-3)' }}>— Naira, polling-unit code, issues, severity, OTP, copilot.</div>
        <div className="font-mono text-[10px] mt-3" style={{ color: 'var(--ink-4)' }}>SOLON · v 0.1</div>
      </div>

      <p className="font-serif italic text-[14px] leading-relaxed mb-8 max-w-[70ch]" style={{ color: 'var(--ink-3)' }}>
        Domain-specific inputs that earn their own shape. Each is a small instrument, not a generic field with a label slapped on it.
      </p>

      <Scene title="Naira amount" subtitle="finance · expense capture">
        <div className="grid grid-cols-2 gap-4">
          <FieldLabel label="Expense amount">
            <NairaInput defaultValue="2,450,000" />
            <div className="mt-1 font-serif italic text-[11.5px]" style={{ color: 'var(--ink-3)' }}>
              2.4% of cumulative spend · within media sub-cap
            </div>
          </FieldLabel>
          <FieldLabel label="Donor amount">
            <NairaInput defaultValue="5,000,000" />
            <div
              className="mt-1 px-2 py-1 rounded-[3px] font-mono text-[10px] uppercase tracking-[0.1em]"
              style={{ background: '#FFF3E0', color: 'var(--orange)', border: '1px solid #FFA000', display: 'inline-block' }}
            >
              ⚑ HIGH RISK — Donor screening required
            </div>
          </FieldLabel>
        </div>
      </Scene>

      <Scene title="Polling-unit code" subtitle="three-segment, mono">
        <div className="flex flex-col gap-3">
          <FieldLabel label="PU code">
            <PUCodeInput value={puCode} onChange={setPuCode} />
          </FieldLabel>
          <div className="font-serif italic text-[12px]" style={{ color: 'var(--ink-3)' }}>
            {puCode !== ''
              ? `Code: ${puCode}`
              : "e.g. 008 / 04 / 0202 — resolves to St. Mary's Primary, Onitsha North, ward 4"}
          </div>
        </div>
      </Scene>

      <Scene title="Issue tags" subtitle="platform tags, multi-select">
        <IssueTagPicker
          options={['Security', 'Education', 'Manufacturing revival', 'Healthcare', 'Fuel subsidy', 'Naira reform', 'Anti-corruption', 'Youth employment']}
          value={tags}
          onChange={setTags}
        />
        <div className="mt-3 font-mono text-[11px]" style={{ color: 'var(--ink-4)' }}>
          Selected: {tags.length > 0 ? tags.join(', ') : 'none'}
        </div>
      </Scene>

      <Scene title="Incident severity" subtitle="1–5, 4+ pages CM in real time">
        <div className="flex flex-col gap-4">
          <SeveritySlider
            value={severity}
            onChange={(v) => setSeverity(v)}
            label="Severity level"
          />
          <div className="font-serif italic text-[12px] max-w-[60ch]" style={{ color: 'var(--ink-3)' }}>
            Severity 4+ pages the campaign manager and triggers a War Room banner. Severity 5 (violence, BVAS-wide failure, large-scale vote-buying) escalates to legal dispatch.
          </div>
        </div>
      </Scene>

      <Scene title="OTP" subtitle="citizen reporter verification · 6 digits">
        <div className="flex flex-col gap-3">
          <OTPInput length={6} value={otp} onChange={setOtp} />
          <div className="font-mono text-[11px]" style={{ color: 'var(--ink-3)' }}>
            SENT TO +234 80 *** **42 · resend in 0:48
          </div>
        </div>
      </Scene>

      <Scene title="AI copilot prompt" subtitle="natural-language scenario input">
        <CopilotPrompt
          placeholder="What happens in Anambra Central if Soludo backs the LP candidate and APGA fields a weak alternative? Apply +8pt youth turnout and a moderate BVAS-failure adjustment."
          onSubmit={(_v) => { /* demo — no-op */ }}
        />
        <div className="mt-3 font-serif italic text-[12px]" style={{ color: 'var(--ink-3)' }}>
          Solon is in <strong className="not-italic font-semibold" style={{ color: 'var(--forest-700)' }}>neutral analyst</strong> mode. Voter-suppression queries will be blocked and logged.
        </div>
      </Scene>
    </div>
  );
}
