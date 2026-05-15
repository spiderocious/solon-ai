import { Button } from '@solon/ui';

function CheckCircleIcon({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5">
      <circle cx="10" cy="10" r="8" />
      <path d="M6.5 10l2.5 2.5 4.5-4.5" />
    </svg>
  );
}

function InfoCircleIcon({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5">
      <circle cx="10" cy="10" r="8" />
      <path d="M10 9v5" />
      <circle cx="10" cy="6.5" r="0.5" fill={color} />
    </svg>
  );
}

function TriangleWarningIcon({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5">
      <path d="M10 3L18 17H2L10 3z" />
      <path d="M10 9v4" />
      <circle cx="10" cy="14.5" r="0.5" fill={color} />
    </svg>
  );
}

function ShoppingBagIcon({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5">
      <path d="M6 8V6a4 4 0 018 0v2" />
      <rect x="3" y="8" width="14" height="10" rx="2" />
    </svg>
  );
}

function PlayArrowIcon({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5">
      <path d="M5 4l12 6-12 6V4z" />
    </svg>
  );
}

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

export function FeedbackScreen() {
  return (
    <div className="px-8 py-10 max-w-[900px]">
      {/* Page header */}
      <div className="mb-12">
        <p className="font-mono text-[10px] uppercase tracking-widest" style={{ color: 'var(--ink-4)' }}>
          41 / OVERLAYS
        </p>
        <h1 className="font-serif font-bold text-[32px] mt-1" style={{ color: 'var(--ink)' }}>
          Toasts · banners · feedback
        </h1>
        <p className="font-sans text-[14px] mt-1" style={{ color: 'var(--ink-3)' }}>
          — compact, citation-aware, no decorative emoji.
        </p>
      </div>

      {/* Scene 1 — Banners */}
      <Scene title="Scene · banners" subtitle="left-rule stripe, 5 variants">
        <div className="space-y-3 max-w-[680px]">
          {/* 1. OK */}
          <div
            className="grid items-start gap-3 p-4 rounded-[4px]"
            style={{
              gridTemplateColumns: '24px 1fr auto',
              background: 'var(--forest-50)',
              border: '1px solid var(--forest-200)',
              borderLeft: '3px solid var(--forest-600)',
            }}
          >
            <CheckCircleIcon color="var(--forest-700)" />
            <p className="font-sans text-[13px] leading-relaxed" style={{ color: 'var(--ink)' }}>
              <strong>Form EC8A reconciled</strong> at PU 008-04-02 — two independent sources match within tolerance. The polling unit's result is now Confirmed.
            </p>
            <Button variant="quiet" size="sm">View</Button>
          </div>

          {/* 2. Warn */}
          <div
            className="grid items-start gap-3 p-4 rounded-[4px]"
            style={{
              gridTemplateColumns: '24px 1fr auto',
              background: '#FFF3E0',
              border: '1px solid #FFA000',
              borderLeft: '3px solid var(--orange)',
            }}
          >
            <InfoCircleIcon color="var(--orange)" />
            <p className="font-sans text-[13px] leading-relaxed" style={{ color: 'var(--ink)' }}>
              <strong>Spend approaching cap</strong> — your media sub-cap is at 78%. At the current ₦ 18m/day burn, you'll cross the 90% threshold in 6 days.
            </p>
            <div className="flex gap-2">
              <Button variant="quiet" size="sm">Forecast</Button>
              <Button variant="warn" size="sm">Pause spend</Button>
            </div>
          </div>

          {/* 3. Crit */}
          <div
            className="grid items-start gap-3 p-4 rounded-[4px]"
            style={{
              gridTemplateColumns: '24px 1fr auto',
              background: 'var(--crit-bg)',
              border: '1px solid var(--crit-edge)',
              borderLeft: '3px solid var(--crit)',
            }}
          >
            <TriangleWarningIcon color="var(--crit)" />
            <p className="font-sans text-[13px] leading-relaxed" style={{ color: 'var(--ink)' }}>
              <strong>Severity-5 incident · BVAS lockdown</strong> — three polling units in Idemili North have reported BVAS authentication failure. Legal team has been dispatched.
            </p>
            <Button variant="quiet" size="sm">War Room</Button>
          </div>

          {/* 4. Info */}
          <div
            className="grid items-start gap-3 p-4 rounded-[4px]"
            style={{
              gridTemplateColumns: '24px 1fr auto',
              background: '#E3F2FD',
              border: '1px solid #90CAF9',
              borderLeft: '3px solid #1565C0',
            }}
          >
            <ShoppingBagIcon color="#1565C0" />
            <p className="font-sans text-[13px] leading-relaxed" style={{ color: 'var(--ink)' }}>
              <strong>Weekly issue digest is ready</strong> — top 10 issues in Anambra Central this week, with source breakdown and suggested talking points.
            </p>
            <Button variant="quiet" size="sm">Open digest</Button>
          </div>

          {/* 5. Default */}
          <div
            className="grid items-start gap-3 p-4 rounded-[4px]"
            style={{
              gridTemplateColumns: '24px 1fr auto',
              background: 'var(--paper-2)',
              border: '1px solid var(--hair)',
              borderLeft: '3px solid var(--ink)',
            }}
          >
            <PlayArrowIcon color="var(--ink)" />
            <p className="font-sans text-[13px] leading-relaxed" style={{ color: 'var(--ink)' }}>
              <strong>Soludo–LP scenario was saved</strong> as a draft 4 minutes ago. Auto-save runs every 90 seconds.
            </p>
            <Button variant="link" size="sm">Restore</Button>
          </div>
        </div>
      </Scene>

      {/* Scene 2 — Toasts */}
      <Scene title="Scene · toasts" subtitle="dark-background stack, right-aligned">
        <div className="flex flex-col gap-3 max-w-[380px] ml-auto">
          {/* Toast 1 — saved */}
          <div
            className="rounded-[4px] px-4 py-3 min-w-[340px] flex items-start justify-between gap-3"
            style={{
              background: 'var(--ink)',
              borderLeft: '3px solid var(--forest-600)',
            }}
          >
            <div className="flex-1">
              <p className="font-sans font-medium text-[13px]" style={{ color: 'var(--paper)' }}>
                Scenario saved
              </p>
              <p className="font-sans italic text-[11px] mt-0.5" style={{ color: 'rgba(245,239,224,0.7)' }}>
                Soludo–LP coalition · +8pt youth · synced to your team
              </p>
            </div>
            <button
              className="font-sans text-[12px] shrink-0 underline underline-offset-2"
              style={{ color: 'var(--paper)' }}
            >
              Undo · 8s
            </button>
          </div>

          {/* Toast 2 — donor flagged */}
          <div
            className="rounded-[4px] px-4 py-3 min-w-[340px] flex items-start justify-between gap-3"
            style={{
              background: 'var(--ink)',
              borderLeft: '3px solid var(--orange)',
            }}
          >
            <div className="flex-1">
              <p className="font-sans font-medium text-[13px]" style={{ color: 'var(--paper)' }}>
                Donor flagged · ₦ 5m cash
              </p>
              <p className="font-sans italic text-[11px] mt-0.5" style={{ color: 'rgba(245,239,224,0.7)' }}>
                Acknowledge before this entry is accepted into the books.
              </p>
            </div>
            <button
              className="font-sans text-[12px] shrink-0 underline underline-offset-2"
              style={{ color: 'var(--paper)' }}
            >
              Open
            </button>
          </div>

          {/* Toast 3 — crit */}
          <div
            className="rounded-[4px] px-4 py-3 min-w-[340px] flex items-start justify-between gap-3"
            style={{
              background: 'var(--ink)',
              borderLeft: '3px solid var(--crit)',
            }}
          >
            <div className="flex-1">
              <p className="font-sans font-medium text-[13px]" style={{ color: 'var(--paper)' }}>
                Sev-5 incident · PU 008-05-19
              </p>
              <p className="font-sans italic text-[11px] mt-0.5" style={{ color: 'rgba(245,239,224,0.7)' }}>
                BVAS lockdown. Legal team paged.
              </p>
            </div>
            <button
              className="font-sans text-[12px] shrink-0 underline underline-offset-2"
              style={{ color: 'var(--paper)' }}
            >
              War Room
            </button>
          </div>
        </div>
      </Scene>

      {/* Scene 3 — Status bar */}
      <Scene title="Scene · status bar" subtitle="footer bar · indicators">
        <div
          className="flex items-center px-4 py-2 gap-6 rounded-[4px]"
          style={{ background: 'var(--ink)' }}
        >
          {/* Cell 1 */}
          <div className="flex items-center gap-1.5">
            <span style={{ color: '#7AA386' }}>●</span>
            <span className="font-mono text-[9px]" style={{ color: 'var(--paper)' }}>
              AGENT MOBILE: 263 / 412 ONLINE
            </span>
          </div>

          {/* Cell 2 */}
          <div className="flex items-center gap-1.5">
            <span style={{ color: 'var(--orange)' }}>●</span>
            <span className="font-mono text-[9px]" style={{ color: 'var(--paper)' }}>
              14 OPEN INCIDENTS
            </span>
          </div>

          {/* Cell 3 */}
          <span className="font-mono text-[9px]" style={{ color: 'rgba(245,239,224,0.5)' }}>
            SOLON MODEL · v 2026-05a
          </span>

          {/* Spacer */}
          <span className="flex-1" />

          <span className="font-mono text-[9px]" style={{ color: 'rgba(245,239,224,0.5)' }}>
            UPTIME 11:42:08
          </span>
          <span className="font-mono text-[9px]" style={{ color: 'rgba(245,239,224,0.5)' }}>
            FEED LATENCY 1.4s
          </span>
        </div>
      </Scene>
    </div>
  );
}
