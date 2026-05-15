import { Avatar, Button, OfficialStamp } from '@solon/ui';

const SUBCAP_ROWS = [
  { label: 'Media · advertising', sub: 'INEC cat. 1', cap: 1200, pct: 78, amount: '₦ 936m', warn: true },
  { label: 'Personnel · stipends', sub: 'INEC cat. 2', cap: 600, pct: 64, amount: '₦ 384m', warn: false },
  { label: 'Transport · logistics', sub: 'INEC cat. 3', cap: 800, pct: 41, amount: '₦ 328m', warn: false },
  { label: 'Materials · printing', sub: 'INEC cat. 4', cap: 400, pct: 28, amount: '₦ 112m', warn: false },
  { label: 'Convention · events', sub: 'INEC cat. 5', cap: 500, pct: 52, amount: '₦ 260m', warn: false },
  { label: 'Misc · other', sub: 'INEC cat. 6', cap: 500, pct: 10, amount: '₦ 50m', warn: false },
];

const DONORS = [
  {
    initials: 'OA', name: 'Okafor & Associates Ltd.', type: 'Corporate', method: 'Transfer', date: '14 Apr 2026', amount: '₦ 25,000,000', risk: 'ok' as const, flagged: false,
  },
  {
    initials: '??', name: 'Anonymous trust', type: 'Trust', method: 'Cash', date: '02 May 2026', amount: '₦ 4,800,000', risk: 'warn' as const, flagged: true,
  },
  {
    initials: 'CI', name: 'Chukwu Investments', type: 'Corporate', method: 'Transfer', date: '20 Mar 2026', amount: '₦ 50,000,000', risk: 'ok' as const, flagged: false,
  },
  {
    initials: 'AO', name: 'Adaeze Okonkwo', type: 'Individual', method: 'Transfer', date: '08 May 2026', amount: '₦ 2,000,000', risk: 'ok' as const, flagged: false,
  },
];

export function FinanceScreen() {
  return (
    <div className="max-w-[960px]">
      {/* Page header */}
      <div className="mb-10 pb-6 border-b" style={{ borderColor: 'var(--hair)' }}>
        <div className="font-mono text-[10px] uppercase tracking-[0.14em] mb-1" style={{ color: 'var(--ink-4)' }}>
          33 / SCREENS
        </div>
        <div className="font-serif font-semibold text-[36px] leading-tight" style={{ color: 'var(--ink)' }}>
          Finance &amp; compliance
        </div>
        <div className="font-serif italic text-[14px] mt-1" style={{ color: 'var(--ink-3)' }}>
          — spend vs cap, subcap usage, anomaly feed, donor register.
        </div>
      </div>

      {/* Statement header */}
      <div
        className="flex justify-between pb-6 mb-6 border-b"
        style={{ borderColor: 'var(--ink)' }}
      >
        <div>
          <h1 className="font-serif font-bold text-[28px]" style={{ color: 'var(--ink)' }}>
            Statement of campaign expenditure
          </h1>
          <div className="font-serif italic text-[12px] mt-1 max-w-[55ch]" style={{ color: 'var(--ink-3)' }}>
            — under INEC notice of election § 88 of the Electoral Act, statutory spending cap applies from 25 February 2026.
          </div>
        </div>
        <div className="font-mono text-[11px] text-right" style={{ color: 'var(--ink-3)' }}>
          <div>Anambra Central · Senate</div>
          <div>Filed by: Chinwe Obi (Campaign Manager)</div>
          <div>Period: 25 Feb — 11 May 2026</div>
          <div>
            Next return due: <span className="font-medium" style={{ color: 'var(--forest-700)' }}>10 Jul 2026</span>
          </div>
        </div>
      </div>

      {/* Top grid */}
      <div className="grid gap-4 mb-6" style={{ gridTemplateColumns: '2fr 1fr 1fr' }}>
        {/* INEC Cap card */}
        <div className="border rounded p-4" style={{ borderColor: 'var(--ink)' }}>
          <div className="font-mono text-[10px]" style={{ color: 'var(--ink-3)' }}>
            INEC STATUTORY CAP · SENATE · ₦ 4,000,000,000
          </div>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="font-serif font-bold text-[32px]" style={{ color: 'var(--forest-700)' }}>
              ₦ 2.07bn
            </span>
            <span className="text-[16px]" style={{ color: 'var(--ink-3)' }}>
              of ₦ 4.00bn cap · 52%
            </span>
          </div>
          {/* Progress bar */}
          <div className="h-2 rounded mt-2 relative" style={{ background: 'var(--hair)' }}>
            <div
              className="absolute left-0 top-0 h-full rounded"
              style={{ width: '52%', background: 'var(--forest-600)' }}
            />
            {/* Cap marker at 75% */}
            <div
              className="absolute top-0 h-full w-px"
              style={{ left: '75%', background: 'var(--crit)' }}
            />
          </div>
          <div className="font-mono text-[10px] mt-2" style={{ color: 'var(--ink-4)' }}>
            Burn rate ₦ 26m/day · Projected final ₦ 3.72bn · Headroom ₦ 1.93bn
          </div>
        </div>

        {/* Open anomalies */}
        <div
          className="border rounded p-4"
          style={{ borderColor: 'var(--orange)', background: '#FFF3E0' }}
        >
          <div className="font-mono text-[10px] uppercase" style={{ color: 'var(--orange)' }}>
            Open anomalies
          </div>
          <div className="font-serif font-bold text-[28px]" style={{ color: 'var(--orange)' }}>3</div>
          <div className="font-sans text-[12px] mt-1" style={{ color: 'var(--ink-3)' }}>
            Two duplicate invoices and one peer-divergent stipend claim.
          </div>
        </div>

        {/* High-risk donors */}
        <div
          className="border rounded p-4"
          style={{ borderColor: 'var(--orange)', background: '#FFF3E0' }}
        >
          <div className="font-mono text-[10px] uppercase" style={{ color: 'var(--orange)' }}>
            High-risk donors
          </div>
          <div className="font-serif font-bold text-[28px]" style={{ color: 'var(--orange)' }}>1</div>
          <div className="font-sans text-[12px]" style={{ color: 'var(--ink-3)' }}>
            A cash entry near the statutory individual cap was flagged on 02 May 2026.
          </div>
        </div>
      </div>

      {/* Mid grid */}
      <div className="grid gap-4 mb-6" style={{ gridTemplateColumns: '1.4fr 1fr' }}>
        {/* Sub-cap usage */}
        <div className="border rounded p-4" style={{ borderColor: 'var(--hair)' }}>
          <div className="flex items-baseline gap-2 mb-4">
            <h3 className="font-sans font-medium text-[14px]" style={{ color: 'var(--ink)' }}>
              Spend by INEC category
            </h3>
            <span className="font-serif italic text-[12px]" style={{ color: 'var(--ink-3)' }}>
              — marker at 75% triggers a CM alert.
            </span>
          </div>

          {/* Subcap rows */}
          <div
            className="grid gap-2 font-mono text-[10px] pb-2 mb-2"
            style={{ gridTemplateColumns: '180px 1fr 90px 50px', color: 'var(--ink-4)' }}
          >
            <span>Category</span>
            <span>Track</span>
            <span>Amount</span>
            <span>%</span>
          </div>

          {SUBCAP_ROWS.map(({ label, sub, pct, amount, warn }) => (
            <div
              key={label}
              className="grid gap-2 items-center py-2 border-b"
              style={{ gridTemplateColumns: '180px 1fr 90px 50px', borderColor: 'var(--hair)' }}
            >
              <div>
                <div className="font-sans text-[13px]" style={{ color: 'var(--ink)' }}>{label}</div>
                <div className="font-mono text-[10px]" style={{ color: 'var(--ink-4)' }}>{sub}</div>
              </div>
              <div className="relative h-1.5 rounded" style={{ background: 'var(--hair)' }}>
                <div
                  className="absolute left-0 top-0 h-full rounded"
                  style={{ width: `${pct}%`, background: warn ? 'var(--orange)' : 'var(--forest-600)' }}
                />
                {/* 75% marker */}
                <div
                  className="absolute top-0 h-full w-px"
                  style={{ left: '75%', background: 'var(--crit)', opacity: 0.4 }}
                />
              </div>
              <span className="font-mono text-[11px]" style={{ color: 'var(--ink)' }}>{amount}</span>
              <span className="font-mono text-[11px]" style={{ color: warn ? 'var(--orange)' : 'var(--ink)' }}>
                {pct}%{warn ? ' ⚑' : ''}
              </span>
            </div>
          ))}
        </div>

        {/* Anomaly feed */}
        <div className="border rounded p-4" style={{ borderColor: 'var(--hair)' }}>
          <h3 className="font-sans font-medium text-[14px] mb-3" style={{ color: 'var(--ink)' }}>
            Anomaly feed
          </h3>

          {/* Anomaly 1 */}
          <div
            className="px-3 py-2 rounded mb-2"
            style={{ borderLeft: '2px solid var(--orange)', background: '#FFF3E0' }}
          >
            <div className="font-sans font-medium text-[13px]" style={{ color: 'var(--ink)' }}>
              Duplicate invoice — vendor #VND-0412
            </div>
            <div className="font-sans text-[12px] mt-0.5" style={{ color: 'var(--ink-2)' }}>
              Two invoices, identical line items, from a vendor with no prior history.
            </div>
            <div className="flex gap-2 mt-2">
              <Button variant="quiet" size="sm">Dismiss</Button>
              <Button variant="warn" size="sm">Action taken</Button>
            </div>
          </div>

          {/* Anomaly 2 */}
          <div
            className="px-3 py-2 rounded mb-2"
            style={{ borderLeft: '2px solid var(--orange)', background: '#FFF3E0' }}
          >
            <div className="font-sans font-medium text-[13px]" style={{ color: 'var(--ink)' }}>
              Stipend claim diverges from peers
            </div>
            <div className="font-sans text-[12px] mt-0.5" style={{ color: 'var(--ink-2)' }}>
              Coordinator @EMbachu claimed 3.2× the median.
            </div>
            <div className="flex gap-2 mt-2">
              <Button variant="quiet" size="sm">Dismiss</Button>
              <Button variant="warn" size="sm">Action taken</Button>
            </div>
          </div>

          {/* Anomaly 3 */}
          <div
            className="px-3 py-2 rounded"
            style={{ borderLeft: '2px solid var(--hair)' }}
          >
            <div className="font-sans font-medium text-[13px]" style={{ color: 'var(--ink)' }}>
              Single-use high-value vendor
            </div>
            <div className="font-sans text-[12px] mt-0.5" style={{ color: 'var(--ink-2)' }}>
              ₦ 4.2m for 'logistics services'.
            </div>
            <div className="flex gap-2 mt-2">
              <Button variant="primary" size="sm">Investigated · OK</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Donor register table */}
      <div className="border rounded overflow-hidden mb-6" style={{ borderColor: 'var(--hair)' }}>
        <h3
          className="font-sans font-medium text-[14px] p-4 border-b"
          style={{ borderColor: 'var(--hair)', color: 'var(--ink)' }}
        >
          Donor register
        </h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--hair)', background: 'var(--paper-2)' }}>
              {['Donor', 'Type', 'Method', 'Date', 'Amount', 'Risk', ''].map((col) => (
                <th
                  key={col}
                  className="font-mono text-[10px] uppercase text-left px-4 py-2"
                  style={{ color: 'var(--ink-3)' }}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DONORS.map(({ initials, name, type, method, date, amount, flagged }) => (
              <tr
                key={name}
                style={{
                  borderBottom: '1px solid var(--hair)',
                  background: flagged ? '#FFF3E0' : undefined,
                  borderLeft: flagged ? '3px solid var(--orange)' : undefined,
                }}
              >
                <td className="px-4 py-2">
                  <div className="flex items-center gap-2">
                    <Avatar
                      initials={initials}
                      size="sm"
                      variant={flagged ? 'orange' : undefined}
                    />
                    <span className="font-sans text-[13px]" style={{ color: 'var(--ink)' }}>{name}</span>
                  </div>
                </td>
                <td className="px-4 py-2 font-sans text-[12px]" style={{ color: 'var(--ink-2)' }}>{type}</td>
                <td className="px-4 py-2 font-sans text-[12px]" style={{ color: 'var(--ink-2)' }}>{method}</td>
                <td className="px-4 py-2 font-mono text-[11px]" style={{ color: 'var(--ink-3)' }}>{date}</td>
                <td className="px-4 py-2 font-mono font-semibold text-[12px]" style={{ color: flagged ? 'var(--orange)' : 'var(--ink)' }}>{amount}</td>
                <td className="px-4 py-2">
                  {flagged ? (
                    <span
                      className="font-mono text-[9px] px-1.5 py-0.5 rounded"
                      style={{ background: 'var(--orange)', color: 'white' }}
                    >
                      HIGH RISK
                    </span>
                  ) : (
                    <span
                      className="font-mono text-[9px] px-1.5 py-0.5 rounded"
                      style={{ background: 'var(--forest-50)', color: 'var(--forest-700)' }}
                    >
                      OK
                    </span>
                  )}
                </td>
                <td className="px-4 py-2">
                  {flagged && (
                    <Button variant="warn" size="sm">Review</Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Signature block */}
      <div
        className="flex items-start justify-between pt-6 mt-6 border-t"
        style={{ borderColor: 'var(--ink)' }}
      >
        <div>
          <div className="font-serif text-[18px]" style={{ color: 'var(--ink)' }}>Chinwe Obi</div>
          <div className="font-mono text-[10px]" style={{ color: 'var(--ink-3)' }}>Campaign Manager · sig. on file</div>
        </div>
        <OfficialStamp variant="verified" meta="2026-05-11" />
        <div>
          <div className="font-serif text-[18px]" style={{ color: 'var(--ink)' }}>Funmi Okeke</div>
          <div className="font-mono text-[10px]" style={{ color: 'var(--ink-3)' }}>Finance Officer · sig. on file</div>
        </div>
        <OfficialStamp variant="simulation" meta="DRAFT" />
      </div>
    </div>
  );
}
