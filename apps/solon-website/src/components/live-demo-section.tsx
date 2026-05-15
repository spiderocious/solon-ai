'use client';

import { OfficialStamp, StatusPill, LivePulse } from '@solon/ui';
import { DEMO_APP_URL } from '@/config/links';

const INCIDENTS = [
  { zone: 'SW · Lagos Mainland', type: 'BVAS malfunction', severity: 'warn' as const, time: '08:34' },
  { zone: 'NW · Kano Municipal', type: 'Accreditation delay', severity: 'warn' as const, time: '09:12' },
  { zone: 'SS · Rivers North-East', type: 'Security disruption', severity: 'crit' as const, time: '10:05' },
];

const FINANCE_CATS = [
  { label: 'Media & advertising', pct: 34, spent: '₦1.7B' },
  { label: 'Field operations', pct: 28, spent: '₦1.4B' },
  { label: 'Events & rallies', pct: 18, spent: '₦0.9B' },
  { label: 'Digital outreach', pct: 12, spent: '₦0.6B' },
  { label: 'Admin & overhead', pct: 8, spent: '₦0.4B' },
];

export function LiveDemoSection() {
  return (
    <section id="live" className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <div className="font-mono text-[10px] uppercase tracking-[0.14em] mb-3" style={{ color: 'var(--forest-700)' }}>
            Live components
          </div>
          <h2 className="font-serif font-semibold text-[36px] md:text-[44px] leading-tight" style={{ color: 'var(--ink)' }}>
            This is what your team<br />
            <span style={{ color: 'var(--ink-3)' }}>sees on election day.</span>
          </h2>
          <p className="font-sans text-[15px] mt-4 max-w-lg" style={{ color: 'var(--ink-3)' }}>
            These aren't screenshots. They're real components from the app — running live, right here.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Incident feed */}
          <DemoCard
            title="Incident feed"
            subtitle="war room · election day"
            live
          >
            <div className="space-y-2">
              {INCIDENTS.map((inc, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between px-3 py-2.5 rounded-[4px]"
                  style={{
                    background: inc.severity === 'crit' ? '#FEF2F2' : 'var(--orange-soft)',
                    border: `1px solid ${inc.severity === 'crit' ? 'var(--crit)' : 'var(--orange)'}`,
                  }}
                >
                  <div>
                    <div className="font-mono text-[9px] uppercase" style={{ color: 'var(--ink-4)' }}>{inc.zone}</div>
                    <div className="font-sans text-[12px]" style={{ color: 'var(--ink-2)' }}>{inc.type}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusPill
                      variant={inc.severity === 'crit' ? 'crit' : 'warn'}
                      label={inc.severity === 'crit' ? 'Critical' : 'Warning'}
                    />
                    <span className="font-mono text-[10px]" style={{ color: 'var(--ink-4)' }}>{inc.time}</span>
                  </div>
                </div>
              ))}
            </div>
            <div
              className="mt-3 px-3 py-2 rounded-[4px] font-mono text-[10px]"
              style={{ background: 'var(--forest-50)', color: 'var(--forest-700)', border: '1px solid var(--forest-200)' }}
            >
              AI Copilot: 3 incidents detected. Lagos + Rivers require immediate agent dispatch.
            </div>
          </DemoCard>

          {/* Finance spend */}
          <DemoCard
            title="Spend tracker"
            subtitle="finance · INEC compliance"
          >
            <div className="mb-4">
              <div className="flex items-baseline gap-2">
                <span className="font-serif font-bold text-[28px]" style={{ color: 'var(--forest-700)' }}>₦5.0B</span>
                <span className="font-serif italic text-[13px]" style={{ color: 'var(--ink-3)' }}>of ₦5B cap · 100%</span>
              </div>
              <div className="h-2 rounded mt-2 overflow-hidden" style={{ background: 'var(--hair)' }}>
                <div className="h-full rounded" style={{ width: '100%', background: 'var(--orange)' }} />
              </div>
              <div className="font-mono text-[9px] mt-1.5" style={{ color: 'var(--orange)' }}>
                ⚠ Cap limit reached — final INEC report due in 14 days
              </div>
            </div>
            <div className="space-y-2">
              {FINANCE_CATS.map((cat) => (
                <div key={cat.label} className="grid items-center gap-2" style={{ gridTemplateColumns: '1fr 48px 52px' }}>
                  <span className="font-sans text-[11px] truncate" style={{ color: 'var(--ink-3)' }}>{cat.label}</span>
                  <div className="w-full h-1.5 rounded overflow-hidden" style={{ background: 'var(--hair)' }}>
                    <div className="h-full rounded" style={{ width: `${cat.pct}%`, background: 'var(--forest-600)' }} />
                  </div>
                  <span className="font-mono text-[10px] text-right" style={{ color: 'var(--ink-4)' }}>{cat.spent}</span>
                </div>
              ))}
            </div>
          </DemoCard>

          {/* Official stamp + agent status */}
          <DemoCard
            title="Agent verification"
            subtitle="ground operations"
          >
            <div className="flex gap-4 items-start">
              <div className="shrink-0">
                <OfficialStamp variant="verified" />
              </div>
              <div>
                <div className="font-serif font-semibold text-[16px]" style={{ color: 'var(--ink)' }}>
                  Adaeze Okonkwo
                </div>
                <div className="font-mono text-[10px] mt-0.5" style={{ color: 'var(--ink-4)' }}>
                  LGA REP · Enugu East · VER-2027-004821
                </div>
                <div className="flex gap-2 mt-2 flex-wrap">
                  <StatusPill variant="ok" label="Election ready" />
                  <StatusPill variant="ok" label="BVAS trained" />
                  <StatusPill variant="ok" label="Verified" />
                </div>
              </div>
            </div>
            <div
              className="mt-4 grid grid-cols-3 gap-3 pt-4"
              style={{ borderTop: '1px solid var(--hair)' }}
            >
              {[
                { label: 'LGAs covered', value: '774' },
                { label: 'Agents ready', value: '1,143' },
                { label: 'Pending', value: '97' },
              ].map(({ label, value }) => (
                <div key={label} className="text-center">
                  <div className="font-serif font-semibold text-[20px]" style={{ color: 'var(--ink-2)' }}>{value}</div>
                  <div className="font-mono text-[9px] uppercase" style={{ color: 'var(--ink-4)' }}>{label}</div>
                </div>
              ))}
            </div>
          </DemoCard>

          {/* Copilot chat preview */}
          <DemoCard
            title="AI Copilot"
            subtitle="simulator · war room"
          >
            <div className="space-y-3">
              <ChatBubble role="user">
                AFP path to 50%+1 in the South West?
              </ChatBubble>
              <ChatBubble role="assistant">
                Under the current baseline, AFP sits at 44% in the South West. To cross 50%+1, the model projects AFP needs to convert approximately 180,000 swing-segment voters — primarily in Lagos Mainland and Ibadan North. Increasing youth turnout by 6pts achieves this with 71% probability.
              </ChatBubble>
              <ChatBubble role="user">
                What if BVAS fails in 10% of PUs?
              </ChatBubble>
              <ChatBubble role="assistant">
                Simulating 17,600 PU BVAS failures distributed by historical fault rates… AFP lead narrows by 1.8pts nationally, falling to 36.6%. The scenario remains within AFP's winning threshold. High-risk LGAs: Kano Municipal, Onitsha North, Port Harcourt City.
              </ChatBubble>
            </div>
          </DemoCard>
        </div>

        {/* Open demo CTA */}
        <div className="mt-10 flex justify-center">
          <a
            href={DEMO_APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-[4px] font-sans text-[15px] font-semibold transition-all hover:opacity-90 active:scale-[0.98]"
            style={{ background: 'var(--ink)', color: 'var(--paper)' }}
          >
            Open the full app
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

function DemoCard({
  title,
  subtitle,
  live,
  children,
}: {
  title: string;
  subtitle: string;
  live?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[8px] overflow-hidden" style={{ background: 'var(--sheet)', border: '1px solid var(--hair)' }}>
      <div
        className="px-4 py-2.5 border-b flex items-center justify-between"
        style={{ background: 'var(--paper-2)', borderColor: 'var(--hair)' }}
      >
        <div>
          <span className="font-sans font-medium text-[13px]" style={{ color: 'var(--ink)' }}>{title}</span>
          <span className="font-mono text-[9px] ml-2" style={{ color: 'var(--ink-4)' }}>— {subtitle}</span>
        </div>
        {live && (
          <div className="flex items-center gap-1.5">
            <LivePulse variant="orange" />
            <span className="font-mono text-[9px]" style={{ color: 'var(--ink-4)' }}>live</span>
          </div>
        )}
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

function ChatBubble({ role, children }: { role: 'user' | 'assistant'; children: React.ReactNode }) {
  if (role === 'user') {
    return (
      <div className="flex justify-end">
        <div
          className="max-w-[85%] px-3 py-2 font-sans italic text-[12px]"
          style={{ borderLeft: '2px solid var(--ink)', color: 'var(--ink-2)' }}
        >
          {children}
        </div>
      </div>
    );
  }
  return (
    <div className="flex justify-start">
      <div
        className="max-w-[90%] rounded-[4px] px-4 py-3"
        style={{ background: 'var(--paper-2)', borderTop: '2px solid var(--forest-600)', border: '1px solid var(--hair)', borderTopColor: 'var(--forest-600)' }}
      >
        <div className="font-mono text-[8px] uppercase mb-1" style={{ color: 'var(--forest-700)' }}>Solon · analysis</div>
        <p className="font-serif text-[12px] leading-relaxed" style={{ color: 'var(--ink-2)' }}>{children}</p>
      </div>
    </div>
  );
}
