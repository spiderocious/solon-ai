import { useState } from 'react';

import { Avatar, LivePulse, StatusPill } from '@solon/ui';

const PlaceholderIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
    <rect x="3" y="3" width="18" height="18" rx="2" />
  </svg>
);

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

function NavBadge({ label }: { label: string }) {
  return (
    <span
      className="font-mono text-[10px] px-1.5 rounded"
      style={{ background: 'var(--paper-2)', color: 'var(--ink-4)' }}
    >
      {label}
    </span>
  );
}

function CmdKbd({ label }: { label: string }) {
  return (
    <span
      className="font-mono text-[9px] px-1 py-0.5 rounded border"
      style={{ borderColor: 'var(--hair)', color: 'var(--ink-4)' }}
    >
      {label}
    </span>
  );
}

export function NavigationScreen() {
  const [_query, setQuery] = useState('what happens in anambra if soludo backs LP');

  return (
    <div className="max-w-[800px]">
      {/* Page header */}
      <div className="mb-10 pb-6 border-b" style={{ borderColor: 'var(--hair)' }}>
        <div className="font-mono text-[10px] uppercase tracking-[0.14em] mb-1" style={{ color: 'var(--ink-4)' }}>
          28 / NAVIGATION
        </div>
        <div className="font-serif font-semibold text-[36px] leading-tight" style={{ color: 'var(--ink)' }}>
          Navigation shell
        </div>
        <div className="font-serif italic text-[14px] mt-1" style={{ color: 'var(--ink-3)' }}>
          — topbar, sidebar, command palette.
        </div>
      </div>

      {/* Scene 1 — Topbar */}
      <Scene title="Scene · topbar" subtitle="brand · crumb · search · user pill">
        <div
          className="flex items-center px-4 gap-4 border"
          style={{
            height: 56,
            borderColor: 'var(--hair)',
            background: 'var(--sheet)',
          }}
        >
          {/* Brand */}
          <div className="font-serif font-bold text-[22px] flex items-center" style={{ color: 'var(--ink)' }}>
            Solon<span style={{ color: 'var(--orange)' }}>.</span>
          </div>

          {/* Crumb */}
          <span className="font-mono text-[10px] uppercase" style={{ color: 'var(--ink-3)' }}>
            SIMULATOR / ANAMBRA CENTRAL / SOLUDO SCENARIO
          </span>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Search bar */}
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded border"
            style={{ minWidth: 360, borderColor: 'var(--hair)', background: 'var(--paper-2)' }}
          >
            <span className="font-mono text-[10px]" style={{ color: 'var(--forest-700)' }}>SOLON ▸</span>
            <input
              className="flex-1 font-sans text-[13px] outline-none bg-transparent"
              placeholder="ask anything · search races, scenarios, candidates…"
              style={{ color: 'var(--ink)' }}
            />
            <span className="font-mono text-[10px]" style={{ color: 'var(--ink-4)' }}>⌘K</span>
          </div>

          <StatusPill variant="ok" label="verified" />
          <Avatar initials="CO" size="md" variant="forest" />
        </div>
      </Scene>

      {/* Scene 2 — Sidebar nav */}
      <Scene title="Scene · sidebar nav" subtitle="module groups · active state on dark ink">
        <div
          className="border py-2"
          style={{ width: 240, borderColor: 'var(--hair)', background: 'var(--sheet)' }}
        >
          {/* Module 0 */}
          <div className="font-mono text-[9px] uppercase tracking-widest px-4 py-1" style={{ color: 'var(--ink-4)' }}>
            Simulator
          </div>
          {/* Active item */}
          <div
            className="flex items-center gap-2 px-4 py-2"
            style={{ background: 'var(--ink)', color: 'var(--paper)' }}
          >
            <PlaceholderIcon />
            <span className="font-sans text-[13px] flex-1">Scenarios</span>
            <NavBadge label="12" />
          </div>
          {/* Inactive items */}
          <div className="flex items-center gap-2 px-4 py-2" style={{ color: 'var(--ink-2)' }}>
            <PlaceholderIcon />
            <span className="font-sans text-[13px]">Races</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2" style={{ color: 'var(--ink-2)' }}>
            <PlaceholderIcon />
            <span className="font-sans text-[13px]">Candidates</span>
          </div>

          {/* Module 1 */}
          <div className="font-mono text-[9px] uppercase tracking-widest px-4 py-1 mt-2" style={{ color: 'var(--ink-4)' }}>
            Voter data
          </div>
          <div className="flex items-center gap-2 px-4 py-2" style={{ color: 'var(--ink-2)' }}>
            <PlaceholderIcon />
            <span className="font-sans text-[13px]">Constituency map</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2" style={{ color: 'var(--ink-2)' }}>
            <PlaceholderIcon />
            <span className="font-sans text-[13px]">Segments</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2" style={{ color: 'var(--ink-2)' }}>
            <PlaceholderIcon />
            <span className="font-sans text-[13px] flex-1">Issue salience</span>
            <NavBadge label="6" />
          </div>

          {/* Module 2 */}
          <div className="font-mono text-[9px] uppercase tracking-widest px-4 py-1 mt-2" style={{ color: 'var(--ink-4)' }}>
            Agents
          </div>
          <div className="flex items-center gap-2 px-4 py-2" style={{ color: 'var(--ink-2)' }}>
            <PlaceholderIcon />
            <span className="font-sans text-[13px] flex-1">Roster</span>
            <NavBadge label="412" />
          </div>
          <div className="flex items-center gap-2 px-4 py-2" style={{ color: 'var(--ink-2)' }}>
            <PlaceholderIcon />
            <span className="font-sans text-[13px]">Training</span>
          </div>

          {/* Module 3 */}
          <div className="font-mono text-[9px] uppercase tracking-widest px-4 py-1 mt-2" style={{ color: 'var(--ink-4)' }}>
            Finance
          </div>
          <div className="flex items-center gap-2 px-4 py-2" style={{ color: 'var(--ink-2)' }}>
            <PlaceholderIcon />
            <span className="font-sans text-[13px] flex-1">Spend</span>
            <NavBadge label="52%" />
          </div>
          <div className="flex items-center gap-2 px-4 py-2" style={{ color: 'var(--ink-2)' }}>
            <PlaceholderIcon />
            <span className="font-sans text-[13px]">Donors</span>
          </div>

          {/* Module 4 */}
          <div className="font-mono text-[9px] uppercase tracking-widest px-4 py-1 mt-2" style={{ color: 'var(--ink-4)' }}>
            War room
          </div>
          <div className="flex items-center gap-2 px-4 py-2" style={{ color: 'var(--ink-2)' }}>
            <PlaceholderIcon />
            <span className="font-sans text-[13px] flex-1">Live</span>
            <LivePulse variant="orange" />
          </div>
        </div>
      </Scene>

      {/* Scene 3 — Command palette */}
      <Scene title="Scene · command palette" subtitle="overlay · search + grouped results">
        <div
          className="rounded-[6px] border"
          style={{
            maxWidth: 540,
            borderColor: 'var(--ink)',
            background: 'var(--sheet)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.16)',
          }}
        >
          {/* Input row */}
          <div
            className="flex items-center gap-3 px-4 py-3 border-b"
            style={{ borderColor: 'var(--hair)' }}
          >
            <span className="font-mono text-[10px]" style={{ color: 'var(--forest-700)' }}>SOLON ▸</span>
            <input
              className="flex-1 font-sans text-[14px] outline-none bg-transparent"
              value={_query}
              onChange={(e) => setQuery(e.target.value)}
              style={{ color: 'var(--ink)' }}
            />
            <span
              className="font-mono text-[9px] px-1 py-0.5 rounded border"
              style={{ borderColor: 'var(--hair)', color: 'var(--ink-4)' }}
            >
              esc
            </span>
          </div>

          {/* Group: Suggested */}
          <div className="font-mono text-[9px] uppercase px-4 py-2" style={{ color: 'var(--ink-4)' }}>
            Suggested · ask Solon
          </div>

          {/* Active option */}
          <div
            className="px-4 py-3 flex items-start justify-between gap-3"
            style={{
              background: 'var(--forest-50)',
              borderLeft: '2px solid var(--forest-600)',
            }}
          >
            <div>
              <div className="font-sans font-medium text-[13px]" style={{ color: 'var(--forest-700)' }}>
                Simulate Anambra Central with Soludo–LP coalition
              </div>
              <div className="font-sans italic text-[11px] mt-0.5" style={{ color: 'var(--ink-3)' }}>
                applies coalition weight, redistributes APGA second-pref votes
              </div>
            </div>
            <CmdKbd label="⏎ run" />
          </div>

          <div className="px-4 py-3 flex items-center justify-between border-b" style={{ borderColor: 'var(--hair)' }}>
            <span className="font-sans text-[13px]" style={{ color: 'var(--ink-2)' }}>
              Search 'Soludo' across scenarios
            </span>
            <CmdKbd label="⌘⏎" />
          </div>

          {/* Group: Recent */}
          <div className="font-mono text-[9px] uppercase px-4 py-2" style={{ color: 'var(--ink-4)' }}>
            Recent
          </div>
          <div className="px-4 py-3 flex items-center justify-between border-b" style={{ borderColor: 'var(--hair)' }}>
            <span className="font-sans text-[13px]" style={{ color: 'var(--ink-2)' }}>
              Baseline · Anambra Central · senate
            </span>
            <CmdKbd label="⌘1" />
          </div>
          <div className="px-4 py-3 flex items-center justify-between border-b" style={{ borderColor: 'var(--hair)' }}>
            <span className="font-sans text-[13px]" style={{ color: 'var(--ink-2)' }}>
              Security incident · Onitsha · sev 4
            </span>
            <CmdKbd label="⌘2" />
          </div>

          {/* Group: Navigate */}
          <div className="font-mono text-[9px] uppercase px-4 py-2" style={{ color: 'var(--ink-4)' }}>
            Navigate
          </div>
          <div className="px-4 py-3 flex items-center justify-between border-b" style={{ borderColor: 'var(--hair)' }}>
            <span className="font-sans text-[13px]" style={{ color: 'var(--ink-2)' }}>
              Open constituency map for Anambra Central
            </span>
            <CmdKbd label="g · m" />
          </div>

          {/* Footer */}
          <div
            className="flex justify-between items-center px-4 py-2.5 border-t font-mono text-[10px]"
            style={{ borderColor: 'var(--hair)', color: 'var(--ink-4)' }}
          >
            <span>↑↓ navigate · ⏎ open · ⌘K toggle</span>
            <span>SOLON refuses voter-suppression queries</span>
          </div>
        </div>
      </Scene>
    </div>
  );
}
