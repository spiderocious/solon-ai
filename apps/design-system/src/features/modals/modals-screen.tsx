import { useState } from 'react';
import { Button } from '@solon/ui';

function Scene({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-16">
      <div className="mb-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em]" style={{ color: 'var(--ink-3)' }}>
          {title}
        </p>
        <p className="font-sans text-[13px] mt-1" style={{ color: 'var(--ink-3)' }}>
          {subtitle}
        </p>
      </div>
      {children}
    </div>
  );
}

export function ModalsScreen() {
  const [confirmValue, setConfirmValue] = useState('');

  return (
    <div className="px-8 py-10 max-w-[900px]">
      {/* Page header */}
      <div className="mb-12">
        <p className="font-mono text-[10px] uppercase tracking-widest" style={{ color: 'var(--ink-4)' }}>
          40 / OVERLAYS
        </p>
        <h1 className="font-serif font-bold text-[32px] mt-1" style={{ color: 'var(--ink)' }}>
          Modals
        </h1>
        <p className="font-sans text-[14px] mt-1" style={{ color: 'var(--ink-3)' }}>
          — routine confirmation, model-blocked, critical irreversible.
        </p>
      </div>

      {/* Scene 1 — Save scenario */}
      <Scene title="Scene 1 — Save scenario" subtitle="routine · primary action lives on the right">
        <div
          className="rounded-[6px] overflow-hidden max-w-[540px] p-0"
          style={{
            border: '1px solid var(--ink)',
            background: 'var(--sheet)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
          }}
        >
          {/* Header */}
          <div className="px-6 py-5" style={{ borderBottom: '1px solid var(--hair)' }}>
            <p className="font-mono text-[10px] uppercase tracking-widest" style={{ color: 'var(--ink-3)' }}>
              SAVE TO ANAMBRA CENTRAL · SENATE
            </p>
            <h2 className="font-sans font-semibold text-[18px] mt-1" style={{ color: 'var(--ink)' }}>
              Save this scenario
            </h2>
            <p className="font-sans text-[13px] mt-2 leading-relaxed" style={{ color: 'var(--ink-2)' }}>
              Saved scenarios appear in the left rail and can be compared four at a time. Anyone on your strategist team can open them.
            </p>
          </div>

          {/* Body */}
          <div className="px-6 py-4 space-y-3">
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-wider mb-1" style={{ color: 'var(--ink-3)' }}>
                NAME
              </label>
              <input
                className="w-full font-sans text-[13px] px-3 py-2 rounded"
                style={{ border: '1px solid var(--hair)', color: 'var(--ink)', background: 'var(--sheet)' }}
                defaultValue="Soludo–LP coalition · +8pt youth"
                readOnly
              />
            </div>
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-wider mb-1" style={{ color: 'var(--ink-3)' }}>
                NOTES (OPTIONAL)
              </label>
              <textarea
                className="w-full font-sans text-[13px] px-3 py-2 rounded h-16 resize-none"
                style={{ border: '1px solid var(--hair)', color: 'var(--ink)', background: 'var(--sheet)' }}
                placeholder="Optional context for your team…"
              />
            </div>
          </div>

          {/* Footer */}
          <div
            className="px-6 py-4 flex items-center gap-2"
            style={{ background: 'var(--paper-2)', borderTop: '1px solid var(--hair)' }}
          >
            <Button variant="quiet">Cancel</Button>
            <Button variant="secondary">Save &amp; close</Button>
            <Button variant="primary">Save &amp; re-run</Button>
          </div>
        </div>
      </Scene>

      {/* Scene 2 — Solon refused this query */}
      <Scene title="Scene 2 — Solon refused this query" subtitle="model-blocked · orange, not red">
        <div
          className="rounded-[6px] overflow-hidden max-w-[540px] p-0"
          style={{
            border: '1px solid var(--orange)',
            borderTop: '4px solid var(--orange)',
            background: 'var(--sheet)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
          }}
        >
          {/* Header */}
          <div className="px-6 py-5">
            <p className="font-mono text-[10px] uppercase tracking-widest" style={{ color: '#BF360C' }}>
              QUERY BLOCKED · LOGGED FOR AUDIT
            </p>
            <h2 className="font-sans font-semibold text-[18px] mt-1" style={{ color: '#BF360C' }}>
              This scenario is not allowed
            </h2>
            <p className="font-sans text-[13px] mt-2 leading-relaxed" style={{ color: 'var(--ink-2)' }}>
              You asked Solon to model how turnout in opposition wards could be depressed. Voter-suppression scenarios are blocked under Solon's ethical guardrails. The query is not run, and this attempt is logged against the audit record for your account.
            </p>
            <p className="font-sans italic text-[12px] mt-2" style={{ color: 'var(--ink-3)' }}>
              If you believe this was triggered in error, contact Solon platform admin.
            </p>
          </div>

          {/* Footer */}
          <div
            className="px-6 py-4 flex gap-2"
            style={{ background: 'var(--paper-2)', borderTop: '1px solid var(--hair)' }}
          >
            <Button variant="quiet">Read policy</Button>
            <Button variant="secondary">Edit scenario</Button>
          </div>
        </div>
      </Scene>

      {/* Scene 3 — Void a polling-unit result */}
      <Scene title="Scene 3 — Void a polling-unit result" subtitle="critical · irreversible · type-to-confirm">
        <div
          className="rounded-[6px] overflow-hidden max-w-[540px] p-0"
          style={{
            border: '2px solid var(--crit)',
            borderTop: '4px solid var(--crit)',
            background: 'var(--sheet)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
          }}
        >
          {/* Header */}
          <div className="px-6 py-5">
            <p className="font-mono text-[10px] uppercase tracking-widest" style={{ color: 'var(--crit)' }}>
              CRITICAL · IRREVERSIBLE
            </p>
            <h2 className="font-sans font-semibold text-[18px] mt-1" style={{ color: 'var(--crit)' }}>
              Void result · PU 008-04-09
            </h2>
            <p className="font-sans text-[13px] mt-2" style={{ color: 'var(--ink-2)' }}>
              Voiding a polling-unit submission has the following effects:
            </p>
            <div
              className="rounded p-3 mt-2 space-y-1"
              style={{
                background: 'var(--crit-bg)',
                border: '1px solid var(--crit-edge)',
              }}
            >
              {[
                'The vote tally for this PU is removed from the live War Room.',
                'The audit entry is signed with your account and the current timestamp.',
                'If public mode is enabled, the void is visible to the public feed.',
                'A formal notification is sent to the campaign manager and the platform admin.',
              ].map((item, i) => (
                <p key={i} className="font-mono text-[10px]" style={{ color: 'var(--crit)' }}>
                  {i + 1}. {item}
                </p>
              ))}
            </div>
            <p className="font-sans text-[13px] mt-3" style={{ color: 'var(--ink)' }}>
              To proceed, type the word <strong>VOID</strong> below.
            </p>
          </div>

          {/* Body */}
          <div className="px-6 py-4">
            <input
              className="w-full font-mono text-[13px] px-3 py-2 rounded"
              style={{ border: '1px solid var(--crit-edge)', color: 'var(--ink)', background: 'var(--sheet)' }}
              placeholder="type VOID to confirm"
              value={confirmValue}
              onChange={(e) => setConfirmValue(e.target.value)}
            />
            <p className="font-mono text-[9px] mt-1" style={{ color: 'var(--ink-4)' }}>
              case sensitive
            </p>
          </div>

          {/* Footer */}
          <div
            className="px-6 py-4 flex gap-2"
            style={{ background: 'var(--crit-bg)', borderTop: '1px solid var(--crit-edge)' }}
          >
            <Button variant="quiet">Cancel</Button>
            <Button variant="crit" disabled={confirmValue !== 'VOID'}>
              Void result
            </Button>
          </div>
        </div>
      </Scene>

      {/* Scene 4 — Convert aspirant → candidate */}
      <Scene title="Scene 4 — Convert aspirant → candidate" subtitle="routine but consequential">
        <div
          className="rounded-[6px] overflow-hidden max-w-[540px] p-0"
          style={{
            border: '1px solid var(--ink)',
            background: 'var(--sheet)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
          }}
        >
          {/* Header */}
          <div className="px-6 py-5" style={{ borderBottom: '1px solid var(--hair)' }}>
            <p className="font-mono text-[10px] uppercase tracking-widest" style={{ color: 'var(--ink-3)' }}>
              UPGRADE · MODULE 1 ACCESS
            </p>
            <h2 className="font-sans font-semibold text-[18px] mt-1" style={{ color: 'var(--ink)' }}>
              Become a verified candidate
            </h2>
            <p className="font-sans text-[13px] mt-2 leading-relaxed" style={{ color: 'var(--ink-2)' }}>
              You'll be asked to complete candidate verification next — INEC receipt or valid NIN required. You'll gain access to polling-unit-level voter data, the Module 2 agent roster, the Module 3 finance ledger, and the Module 4 War Room.
            </p>
          </div>

          {/* Footer */}
          <div
            className="px-6 py-4 flex gap-2"
            style={{ background: 'var(--paper-2)', borderTop: '1px solid var(--hair)' }}
          >
            <Button variant="quiet">Not yet</Button>
            <Button variant="primary">Begin verification</Button>
          </div>
        </div>
      </Scene>
    </div>
  );
}
