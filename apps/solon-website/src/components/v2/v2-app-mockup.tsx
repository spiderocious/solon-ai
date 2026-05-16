'use client';

import { useState, useEffect, useRef } from 'react';
import { DEMO_APP_URL } from '@/config/links';

const SCREENS = ['Dashboard', 'Simulator', 'Voter Intel', 'Agents', 'Finance', 'War Room'] as const;
type Screen = typeof SCREENS[number];

const ROUTES: Record<Screen, string> = {
  Dashboard:  '/modules/dashboard',
  Simulator:  '/modules/simulator/baseline',
  'Voter Intel': '/modules/voter-intel',
  Agents:     '/modules/agents',
  Finance:    '/modules/finance/dashboard',
  'War Room': '/modules/war-room/live',
};

const NAV_GROUPS = [
  { label: 'Overview',      items: ['Dashboard'] as Screen[] },
  { label: 'Intelligence',  items: ['Simulator', 'Voter Intel'] as Screen[] },
  { label: 'Operations',    items: ['Agents', 'Finance'] as Screen[] },
  { label: 'War Room',      items: ['War Room'] as Screen[] },
];

/* ─── Individual screen panels ─────────────────────────────────────── */

function DashboardPanel() {
  const candidates = [
    { party: 'AFP', share: 31.4, colour: '#15803d' },
    { party: 'APC', share: 28.7, colour: '#7c2d12' },
    { party: 'PDP', share: 22.1, colour: '#991b1b' },
    { party: 'LP',  share: 12.8, colour: '#b45309' },
    { party: '…',   share: 5.0,  colour: '#9a9da8' },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Vote share */}
      <div style={{ padding: '16px', background: 'var(--sheet)', borderRadius: '6px', border: '1px solid var(--hair)' }}>
        <div style={{ fontSize: '9px', fontFamily: 'monospace', color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px' }}>AFP baseline projection</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '12px' }}>
          <span style={{ fontSize: '40px', fontFamily: 'Georgia, serif', fontWeight: 700, color: '#15803d', lineHeight: 1 }}>31.4%</span>
          <span style={{ fontSize: '11px', fontFamily: 'monospace', color: 'var(--ink-3)' }}>± 2.1pts</span>
        </div>
        <div style={{ display: 'flex', height: '20px', borderRadius: '4px', overflow: 'hidden', marginBottom: '8px' }}>
          {candidates.map((c) => (
            <div key={c.party} style={{ flex: c.share, background: c.colour, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {c.share > 9 && <span style={{ fontSize: '8px', color: '#fff', fontFamily: 'monospace', fontWeight: 700 }}>{c.party} {c.share}%</span>}
            </div>
          ))}
        </div>
        <div style={{ fontSize: '9px', fontFamily: 'monospace', color: 'var(--ink-4)' }}>high confidence · no-shock model</div>
      </div>

      {/* Two mini cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <div style={{ padding: '14px', background: 'var(--sheet)', borderRadius: '6px', border: '1px solid var(--hair)' }}>
          <div style={{ fontSize: '9px', fontFamily: 'monospace', color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>Agent network</div>
          <div style={{ fontSize: '28px', fontFamily: 'Georgia, serif', fontWeight: 700, color: 'var(--forest-700)', lineHeight: 1, marginBottom: '6px' }}>1,148</div>
          <div style={{ height: '4px', background: 'var(--hair)', borderRadius: '99px', overflow: 'hidden', marginBottom: '6px' }}>
            <div style={{ height: '100%', width: '92%', background: 'var(--forest-600)', borderRadius: '99px' }} />
          </div>
          <div style={{ fontSize: '9px', fontFamily: 'monospace', color: 'var(--ink-4)' }}>92% election ready</div>
        </div>
        <div style={{ padding: '14px', background: 'var(--sheet)', borderRadius: '6px', border: '1px solid var(--hair)' }}>
          <div style={{ fontSize: '9px', fontFamily: 'monospace', color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>Campaign spend</div>
          <div style={{ fontSize: '22px', fontFamily: 'Georgia, serif', fontWeight: 700, color: 'var(--forest-700)', lineHeight: 1, marginBottom: '6px' }}>₦3.2B</div>
          <div style={{ height: '4px', background: 'var(--hair)', borderRadius: '99px', overflow: 'hidden', marginBottom: '6px', position: 'relative' }}>
            <div style={{ height: '100%', width: '64%', background: 'var(--forest-600)', borderRadius: '99px' }} />
            <div style={{ position: 'absolute', top: 0, bottom: 0, left: '75%', width: '1px', background: '#dc2626' }} />
          </div>
          <div style={{ fontSize: '9px', fontFamily: 'monospace', color: 'var(--ink-4)' }}>of ₦5B cap · 18d to deadline</div>
        </div>
      </div>
    </div>
  );
}

function SimulatorPanel() {
  const candidates = [
    { name: 'Alhaji Musa Bello', party: 'AFP', share: 31.4, colour: '#15803d' },
    { name: 'Bola Tinubu',       party: 'APC', share: 28.7, colour: '#7c2d12' },
    { name: 'Atiku Abubakar',    party: 'PDP', share: 22.1, colour: '#991b1b' },
    { name: 'Peter Obi',         party: 'LP',  share: 12.8, colour: '#b45309' },
    { name: 'Others',            party: '…',   share:  5.0, colour: '#9a9da8' },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ padding: '16px', background: 'var(--sheet)', borderRadius: '6px', border: '1px solid var(--ink)', }}>
        <div style={{ fontSize: '9px', fontFamily: 'monospace', color: 'var(--ink-4)', marginBottom: '6px' }}>Projected vote share · no-shock model</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '12px' }}>
          <span style={{ fontSize: '44px', fontFamily: 'Georgia, serif', fontWeight: 700, color: '#15803d', lineHeight: 1 }}>31.4%</span>
          <span style={{ fontSize: '11px', fontFamily: 'monospace', color: 'var(--ink-3)' }}>AFP · Bello · ±2.1pts</span>
        </div>
        <div style={{ display: 'flex', height: '24px', borderRadius: '4px', overflow: 'hidden' }}>
          {candidates.map((c) => (
            <div key={c.party} style={{ flex: c.share, background: c.colour, display: 'flex', alignItems: 'center', paddingLeft: '6px' }}>
              {c.share > 8 && <span style={{ fontSize: '8px', color: '#fff', fontFamily: 'monospace', fontWeight: 700, whiteSpace: 'nowrap' }}>{c.party} {c.share}%</span>}
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {candidates.map((c) => (
          <div key={c.party} style={{ display: 'grid', alignItems: 'center', gap: '10px', gridTemplateColumns: '120px 1fr 44px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: c.colour, flexShrink: 0 }} />
              <span style={{ fontSize: '11px', fontFamily: 'system-ui', color: 'var(--ink-2)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.name}</span>
            </div>
            <div style={{ height: '5px', background: 'var(--hair)', borderRadius: '99px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${c.share * 2.8}%`, background: c.colour, borderRadius: '99px' }} />
            </div>
            <span style={{ fontSize: '11px', fontFamily: 'monospace', color: 'var(--ink-2)', textAlign: 'right' }}>{c.share}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function VoterIntelPanel() {
  const clusters = [
    { id: '01', name: 'Northern Swing Voters',  size: '14.2M', reach: 38, channel: 'Voice + WhatsApp' },
    { id: '02', name: 'Southern Urban Youth',    size: '11.8M', reach: 22, channel: 'WhatsApp' },
    { id: '03', name: 'Female Heads of Household', size: '9.4M', reach: 17, channel: 'SMS + Radio' },
    { id: '04', name: 'Middle Belt Undecided',   size: '7.1M', reach: 44, channel: 'Direct outreach' },
    { id: '05', name: 'Lagos Metro Professionals', size: '5.3M', reach: 29, channel: 'Digital' },
  ];
  return (
    <div>
      <div style={{ fontSize: '9px', fontFamily: 'monospace', color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px' }}>Voter clusters · 93M registered · 7 segments</div>
      <div style={{ border: '1px solid var(--hair)', borderRadius: '6px', overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '28px 1fr 56px 48px', background: 'var(--paper-2)', padding: '6px 10px', borderBottom: '1px solid var(--hair)', gap: '8px' }}>
          {['#', 'Cluster', 'Size', 'AFP reach'].map((h) => (
            <div key={h} style={{ fontSize: '8px', fontFamily: 'monospace', color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{h}</div>
          ))}
        </div>
        {clusters.map((c) => (
          <div key={c.id} style={{ display: 'grid', gridTemplateColumns: '28px 1fr 56px 48px', padding: '8px 10px', borderBottom: '1px solid var(--hair)', gap: '8px', alignItems: 'center', background: 'var(--sheet)' }}>
            <span style={{ fontSize: '9px', fontFamily: 'monospace', color: 'var(--forest-600)' }}>{c.id}</span>
            <div>
              <div style={{ fontSize: '11px', fontFamily: 'system-ui', color: 'var(--ink)', fontWeight: 500 }}>{c.name}</div>
              <div style={{ fontSize: '9px', fontFamily: 'monospace', color: 'var(--ink-4)', marginTop: '1px' }}>{c.channel}</div>
            </div>
            <span style={{ fontSize: '10px', fontFamily: 'monospace', color: 'var(--ink-3)' }}>{c.size}</span>
            <span style={{ fontSize: '11px', fontFamily: 'monospace', fontWeight: 600, color: c.reach >= 35 ? 'var(--forest-700)' : c.reach >= 20 ? 'var(--orange)' : 'var(--crit)' }}>{c.reach}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AgentsPanel() {
  const states = [
    { name: 'Lagos',   ready: 94, total: 210 },
    { name: 'Kano',    ready: 88, total: 185 },
    { name: 'Rivers',  ready: 91, total: 143 },
    { name: 'Kaduna',  ready: 76, total: 127 },
    { name: 'Oyo',     ready: 83, total: 112 },
    { name: 'Borno',   ready: 61, total: 98  },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
        {[['1,240', 'Total agents'], ['1,148', 'Election ready'], ['92%', 'Readiness']].map(([v, l]) => (
          <div key={l} style={{ padding: '12px', background: 'var(--sheet)', border: '1px solid var(--hair)', borderRadius: '6px', textAlign: 'center' }}>
            <div style={{ fontSize: '22px', fontFamily: 'Georgia, serif', fontWeight: 700, color: 'var(--forest-700)', lineHeight: 1 }}>{v}</div>
            <div style={{ fontSize: '8px', fontFamily: 'monospace', color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '4px' }}>{l}</div>
          </div>
        ))}
      </div>
      <div style={{ fontSize: '9px', fontFamily: 'monospace', color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Coverage by state</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {states.map((s) => (
          <div key={s.name} style={{ display: 'grid', alignItems: 'center', gap: '8px', gridTemplateColumns: '64px 1fr 36px' }}>
            <span style={{ fontSize: '11px', fontFamily: 'system-ui', color: 'var(--ink-2)' }}>{s.name}</span>
            <div style={{ height: '5px', background: 'var(--hair)', borderRadius: '99px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${s.ready}%`, background: s.ready >= 80 ? 'var(--forest-600)' : s.ready >= 70 ? 'var(--orange)' : 'var(--crit)', borderRadius: '99px' }} />
            </div>
            <span style={{ fontSize: '10px', fontFamily: 'monospace', color: 'var(--ink-3)', textAlign: 'right' }}>{s.ready}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function FinancePanel() {
  const categories = [
    { name: 'Media & Advertising', spent: 890, cap: 1200 },
    { name: 'Ground operations',   spent: 640, cap: 900  },
    { name: 'Rallies & events',    spent: 520, cap: 750  },
    { name: 'Research & polling',  spent: 310, cap: 400  },
    { name: 'Staff & logistics',   spent: 840, cap: 1100 },
  ];
  const totalSpent = 3200, totalCap = 5000;
  const pct = (totalSpent / totalCap) * 100;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <div style={{ padding: '14px', background: 'var(--sheet)', border: '1px solid var(--hair)', borderRadius: '6px' }}>
        <div style={{ fontSize: '9px', fontFamily: 'monospace', color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>Total campaign spend vs INEC cap</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '10px' }}>
          <span style={{ fontSize: '32px', fontFamily: 'Georgia, serif', fontWeight: 700, color: 'var(--forest-700)', lineHeight: 1 }}>₦3.2B</span>
          <span style={{ fontSize: '11px', fontFamily: 'Georgia, serif', fontStyle: 'italic', color: 'var(--ink-3)' }}>of ₦5B cap · {pct.toFixed(0)}%</span>
        </div>
        <div style={{ height: '8px', background: 'var(--hair)', borderRadius: '99px', overflow: 'hidden', position: 'relative' }}>
          <div style={{ height: '100%', width: `${pct}%`, background: 'var(--forest-600)', borderRadius: '99px' }} />
          <div style={{ position: 'absolute', top: 0, bottom: 0, left: '75%', width: '2px', background: '#dc2626', opacity: 0.6 }} />
        </div>
        <div style={{ fontSize: '9px', fontFamily: 'monospace', color: 'var(--ink-4)', marginTop: '6px' }}>0 compliance violations · next INEC deadline in 18d</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
        {categories.map((c) => {
          const p = (c.spent / c.cap) * 100;
          return (
            <div key={c.name} style={{ display: 'grid', alignItems: 'center', gap: '8px', gridTemplateColumns: '1fr 80px 48px' }}>
              <span style={{ fontSize: '11px', fontFamily: 'system-ui', color: 'var(--ink-2)' }}>{c.name}</span>
              <div style={{ height: '4px', background: 'var(--hair)', borderRadius: '99px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${p}%`, background: p > 80 ? 'var(--orange)' : 'var(--forest-600)', borderRadius: '99px' }} />
              </div>
              <span style={{ fontSize: '9px', fontFamily: 'monospace', color: 'var(--ink-3)', textAlign: 'right' }}>₦{c.spent}M</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function WarRoomPanel() {
  const zones = [
    { name: 'North-West', reporting: 94, total: 100 },
    { name: 'North-East', reporting: 87, total: 100 },
    { name: 'North-Central', reporting: 91, total: 100 },
    { name: 'South-West',  reporting: 96, total: 100 },
    { name: 'South-East',  reporting: 89, total: 100 },
    { name: 'South-South', reporting: 82, total: 100 },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {/* Live header */}
      <div style={{ padding: '12px 14px', background: 'var(--ink)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: '9px', fontFamily: 'monospace', color: 'rgba(245,239,224,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '3px' }}>Live tally · 16 Jan 2027</div>
          <div style={{ fontSize: '13px', fontFamily: 'system-ui', color: 'var(--paper)', fontWeight: 500 }}>176,847 polling units reporting</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#ea580c' }} />
          <span style={{ fontSize: '10px', fontFamily: 'monospace', color: '#fb923c' }}>LIVE</span>
        </div>
      </div>
      {/* Zone grid */}
      <div style={{ fontSize: '9px', fontFamily: 'monospace', color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Reporting by geo-zone</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
        {zones.map((z) => (
          <div key={z.name} style={{ padding: '10px 12px', background: 'var(--sheet)', border: '1px solid var(--hair)', borderRadius: '6px' }}>
            <div style={{ fontSize: '10px', fontFamily: 'system-ui', color: 'var(--ink-2)', fontWeight: 500, marginBottom: '5px' }}>{z.name}</div>
            <div style={{ height: '4px', background: 'var(--hair)', borderRadius: '99px', overflow: 'hidden', marginBottom: '4px' }}>
              <div style={{ height: '100%', width: `${z.reporting}%`, background: z.reporting >= 90 ? 'var(--forest-600)' : 'var(--orange)', borderRadius: '99px' }} />
            </div>
            <div style={{ fontSize: '9px', fontFamily: 'monospace', color: 'var(--ink-4)' }}>{z.reporting}% reporting</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const PANELS: Record<Screen, React.ReactNode> = {
  Dashboard:    <DashboardPanel />,
  Simulator:    <SimulatorPanel />,
  'Voter Intel': <VoterIntelPanel />,
  Agents:       <AgentsPanel />,
  Finance:      <FinancePanel />,
  'War Room':   <WarRoomPanel />,
};

const SCREEN_LABELS: Record<Screen, string> = {
  Dashboard:    'Campaign overview',
  Simulator:    'Election simulator',
  'Voter Intel': 'Voter intelligence',
  Agents:       'Agent network',
  Finance:      'Finance & compliance',
  'War Room':   'Election day command',
};

/* ─── Main component ────────────────────────────────────────────────── */

export function V2AppMockup() {
  const [active, setActive] = useState<Screen>('Dashboard');
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isHovered) {
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }
    timerRef.current = setTimeout(() => {
      setActive((cur) => {
        const idx = SCREENS.indexOf(cur);
        return SCREENS[(idx + 1) % SCREENS.length] ?? 'Dashboard';
      });
    }, 3000);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [active, isHovered]);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--paper)',
        borderRadius: '10px',
        overflow: 'hidden',
        border: '1px solid var(--hair)',
        boxShadow: '0 32px 80px rgba(0,0,0,0.14), 0 4px 16px rgba(0,0,0,0.06)',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      {/* Window chrome bar */}
      <div style={{ height: '32px', background: 'var(--paper-2)', borderBottom: '1px solid var(--hair)', display: 'flex', alignItems: 'center', padding: '0 12px', gap: '6px', flexShrink: 0 }}>
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#fc625d' }} />
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#fdbc40' }} />
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#35cd4b' }} />
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <div style={{ fontSize: '10px', fontFamily: 'monospace', color: 'var(--ink-4)', background: 'var(--sheet)', padding: '2px 12px', borderRadius: '4px', border: '1px solid var(--hair)' }}>
            solon.ng/modules/{active.toLowerCase().replace(' ', '-')}
          </div>
        </div>
      </div>

      {/* App body */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Sidebar */}
        <div style={{ width: '148px', flexShrink: 0, borderRight: '1px solid var(--hair)', background: 'var(--sheet)', display: 'flex', flexDirection: 'column', padding: '10px 0', overflowY: 'auto' }}>
          <div style={{ padding: '4px 12px 10px', borderBottom: '1px solid var(--hair)', marginBottom: '8px' }}>
            <span style={{ fontFamily: 'Georgia, serif', fontWeight: 600, fontSize: '14px', color: 'var(--ink)' }}>solon</span>
            <span style={{ color: 'var(--forest-600)', fontFamily: 'Georgia, serif' }}>.</span>
          </div>
          {NAV_GROUPS.map((group) => (
            <div key={group.label} style={{ marginBottom: '4px' }}>
              <div style={{ fontSize: '8px', fontFamily: 'monospace', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-4)', padding: '6px 12px 3px' }}>
                {group.label}
              </div>
              {group.items.map((item) => (
                <button
                  key={item}
                  onClick={() => setActive(item)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '6px', width: '100%',
                    padding: '6px 12px', fontSize: '12px', textAlign: 'left', cursor: 'pointer',
                    background: active === item ? 'var(--ink)' : 'transparent',
                    color: active === item ? 'var(--paper)' : 'var(--ink-2)',
                    border: 'none', transition: 'background 0.15s',
                  }}
                >
                  {item}
                  {item === 'War Room' && (
                    <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#ea580c', flexShrink: 0, marginLeft: 'auto' }} />
                  )}
                </button>
              ))}
            </div>
          ))}
        </div>

        {/* Main panel */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Panel header */}
          <div style={{ padding: '12px 16px 10px', borderBottom: '1px solid var(--hair)', background: 'var(--paper)', flexShrink: 0 }}>
            <div style={{ fontSize: '9px', fontFamily: 'monospace', color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2px' }}>
              {active}
            </div>
            <div style={{ fontSize: '15px', fontFamily: 'Georgia, serif', fontWeight: 600, color: 'var(--ink)' }}>
              {SCREEN_LABELS[active]}
            </div>
          </div>

          {/* Panel content */}
          <div style={{ flex: 1, overflow: 'hidden', padding: '14px 16px' }}>
            {PANELS[active]}
          </div>

          {/* Footer CTA */}
          <div style={{ padding: '10px 16px', borderTop: '1px solid var(--hair)', background: 'var(--paper-2)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
            <span style={{ fontSize: '10px', fontFamily: 'monospace', color: 'var(--ink-4)' }}>
              Want the full experience?
            </span>
            <a
              href={`${DEMO_APP_URL}${ROUTES[active]}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: '11px', fontFamily: 'system-ui', fontWeight: 600,
                color: 'var(--forest-700)', display: 'inline-flex', alignItems: 'center', gap: '4px',
                textDecoration: 'none',
              }}
            >
              Open {active} →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
