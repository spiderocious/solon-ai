import { Avatar, TierChip } from '@solon/ui';
import type { TierVariant } from '@solon/ui';

function Scene({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <div className="flex items-baseline gap-3 mb-4 pb-2 border-b" style={{ borderColor: 'var(--hair)' }}>
        <span className="font-sans text-[13px]" style={{ color: 'var(--ink-2)' }}>{title}</span>
        {subtitle && <span className="font-mono text-[10px]" style={{ color: 'var(--ink-4)' }}>{subtitle}</span>}
      </div>
      {children}
    </div>
  );
}

const TH_CLS = 'font-mono text-[10px] uppercase text-left px-3 py-2 border-b tracking-[0.08em]';
const TD_CLS = 'font-sans text-[13px] px-3 py-3 border-b';

type ClusterRow = {
  num: string;
  cluster: string;
  ward: string;
  issue: string;
  channel: string;
  size: string;
  turnout: string;
  turnoutColor?: string;
  tier: TierVariant;
};

const CLUSTER_ROWS: ClusterRow[] = [
  {
    num: '01',
    cluster: 'Persuadable urban youth (18–34 · low-turnout · social-first)',
    ward: 'Onitsha North · ward 4',
    issue: 'Youth employment',
    channel: 'X · Instagram · WhatsApp',
    size: '~14,200',
    turnout: '26%',
    turnoutColor: 'var(--orange)',
    tier: 'hold',
  },
  {
    num: '02',
    cluster: 'Rural party-loyal (45+ · high-turnout · radio-first)',
    ward: 'Ihiala · ward 7',
    issue: 'Cost of living',
    channel: 'Radio call-in · ward town hall',
    size: '~9,800',
    turnout: '71%',
    turnoutColor: 'var(--forest-700)',
    tier: 'hold-strong',
  },
  {
    num: '03',
    cluster: 'Market-women (trader networks · vocal · sceptical)',
    ward: 'Onitsha South',
    issue: 'Naira reform',
    channel: 'Market association · WhatsApp',
    size: '~6,400',
    turnout: '52%',
    tier: 'toss',
  },
  {
    num: '04',
    cluster: 'Civil servants (salaried, urban, ABC-issue-driven)',
    ward: 'Awka South',
    issue: 'Pension arrears',
    channel: 'Email · staff bulletin',
    size: '~4,100',
    turnout: '58%',
    tier: 'hold',
  },
  {
    num: '05',
    cluster: 'Diaspora-influenced (remittance households · LP-leaning)',
    ward: 'Aguata',
    issue: 'Diaspora bond rate',
    channel: 'Family WhatsApp · podcasts',
    size: '~2,900',
    turnout: '48%',
    tier: 'opp',
  },
];

export function TablesScreen() {
  return (
    <div className="max-w-[920px]">
      {/* Page header */}
      <div className="mb-10 pb-6 border-b" style={{ borderColor: 'var(--hair)' }}>
        <div className="font-mono text-[10px] uppercase tracking-[0.14em] mb-1" style={{ color: 'var(--ink-4)' }}>
          20 / DATA & STATE
        </div>
        <div className="font-serif font-semibold text-[36px] leading-tight" style={{ color: 'var(--ink)' }}>
          Tables
        </div>
        <div className="font-serif italic text-[14px] mt-1" style={{ color: 'var(--ink-3)' }}>
          — records below, projections in serif, flagged rows take a left rule.
        </div>
      </div>

      {/* Scene 1 — cluster table */}
      <Scene title="Scene · cluster table" subtitle="voter segmentation · persuadability model">
        <style>{`
          .cluster-table tbody tr:hover td { background: var(--paper-2); }
        `}</style>
        <div className="overflow-x-auto">
          <table className="cluster-table w-full border-collapse">
            <thead>
              <tr>
                {['#', 'Cluster', 'Dominant ward', 'Top issue', 'Outreach channel', 'Size', "Turnout '23", 'Priority'].map(
                  (h, i) => (
                    <th
                      key={h}
                      className={TH_CLS}
                      style={{
                        color: 'var(--ink-3)',
                        borderColor: 'var(--hair)',
                        textAlign: i === 5 || i === 6 ? 'right' : 'left',
                      }}
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {CLUSTER_ROWS.map((row) => (
                <tr key={row.num}>
                  <td className={TD_CLS} style={{ borderColor: 'var(--hair)', color: 'var(--ink-3)', fontFamily: 'var(--font-mono, monospace)', fontSize: '11px' }}>
                    {row.num}
                  </td>
                  <td className={TD_CLS} style={{ borderColor: 'var(--hair)', color: 'var(--ink)', maxWidth: '260px' }}>
                    {row.cluster}
                  </td>
                  <td className={TD_CLS} style={{ borderColor: 'var(--hair)', color: 'var(--ink-2)', whiteSpace: 'nowrap' }}>
                    {row.ward}
                  </td>
                  <td className={TD_CLS} style={{ borderColor: 'var(--hair)', color: 'var(--ink-2)', whiteSpace: 'nowrap' }}>
                    {row.issue}
                  </td>
                  <td className={TD_CLS} style={{ borderColor: 'var(--hair)', color: 'var(--ink-2)' }}>
                    {row.channel}
                  </td>
                  <td className={TD_CLS} style={{ borderColor: 'var(--hair)', color: 'var(--ink-2)', textAlign: 'right', fontFamily: 'var(--font-mono, monospace)', fontSize: '12px' }}>
                    {row.size}
                  </td>
                  <td className={TD_CLS} style={{ borderColor: 'var(--hair)', textAlign: 'right', fontFamily: 'var(--font-mono, monospace)', fontSize: '12px', color: row.turnoutColor ?? 'var(--ink-2)' }}>
                    {row.turnout}
                  </td>
                  <td className={TD_CLS} style={{ borderColor: 'var(--hair)' }}>
                    <TierChip tier={row.tier} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Scene>

      {/* Scene 2 — donor register */}
      <Scene title="Scene · donor register" subtitle="campaign finance · risk-flagged entries">
        <style>{`
          .donor-table tbody tr:not(.flagged):hover td { background: var(--paper-2); }
        `}</style>
        <div className="overflow-x-auto">
          <table className="donor-table w-full border-collapse">
            <thead>
              <tr>
                {['Donor', 'Type', 'LGA', 'Method', 'Date', 'Amount', 'Risk'].map((h) => (
                  <th key={h} className={TH_CLS} style={{ color: 'var(--ink-3)', borderColor: 'var(--hair)' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Row 1 */}
              <tr>
                <td className={TD_CLS} style={{ borderColor: 'var(--hair)' }}>
                  <div className="flex items-center gap-2">
                    <Avatar initials="EO" size="sm" variant="forest" />
                    <div>
                      <div className="font-sans text-[13px]" style={{ color: 'var(--ink)' }}>Eze Okonkwo</div>
                      <div className="font-mono text-[10px]" style={{ color: 'var(--ink-4)' }}>Individual · diaspora · UK</div>
                    </div>
                  </div>
                </td>
                <td className={TD_CLS} style={{ borderColor: 'var(--hair)', color: 'var(--ink-2)' }}>Individual</td>
                <td className={TD_CLS} style={{ borderColor: 'var(--hair)', color: 'var(--ink-3)' }}>—</td>
                <td className={TD_CLS} style={{ borderColor: 'var(--hair)', color: 'var(--ink-2)' }}>Wire (Zenith)</td>
                <td className={TD_CLS} style={{ borderColor: 'var(--hair)', color: 'var(--ink-2)', fontFamily: 'var(--font-mono, monospace)', fontSize: '12px' }}>Apr 12</td>
                <td className={TD_CLS} style={{ borderColor: 'var(--hair)', color: 'var(--ink)', fontFamily: 'var(--font-mono, monospace)', fontSize: '12px' }}>₦ 850,000</td>
                <td className={TD_CLS} style={{ borderColor: 'var(--hair)' }}><TierChip tier="hold" /></td>
              </tr>
              {/* Row 2 */}
              <tr>
                <td className={TD_CLS} style={{ borderColor: 'var(--hair)' }}>
                  <div className="flex items-center gap-2">
                    <Avatar initials="CM" size="sm" />
                    <div>
                      <div className="font-sans text-[13px]" style={{ color: 'var(--ink)' }}>Chinatu Manufacturing Ltd</div>
                      <div className="font-mono text-[10px]" style={{ color: 'var(--ink-4)' }}>Corporate</div>
                    </div>
                  </div>
                </td>
                <td className={TD_CLS} style={{ borderColor: 'var(--hair)', color: 'var(--ink-2)' }}>Corporate</td>
                <td className={TD_CLS} style={{ borderColor: 'var(--hair)', color: 'var(--ink-2)' }}>Anambra E.</td>
                <td className={TD_CLS} style={{ borderColor: 'var(--hair)', color: 'var(--ink-2)' }}>Cheque</td>
                <td className={TD_CLS} style={{ borderColor: 'var(--hair)', color: 'var(--ink-2)', fontFamily: 'var(--font-mono, monospace)', fontSize: '12px' }}>Apr 22</td>
                <td className={TD_CLS} style={{ borderColor: 'var(--hair)', color: 'var(--ink)', fontFamily: 'var(--font-mono, monospace)', fontSize: '12px' }}>₦ 2,400,000</td>
                <td className={TD_CLS} style={{ borderColor: 'var(--hair)' }}><TierChip tier="hold" /></td>
              </tr>
              {/* Row 3 — FLAGGED */}
              <tr className="flagged" style={{ borderLeft: '3px solid var(--orange)' }}>
                <td className={TD_CLS} style={{ borderColor: 'var(--hair)', background: '#FFF3E0', borderLeft: '3px solid var(--orange)' }}>
                  <div className="flex items-center gap-2">
                    <Avatar initials="??" size="sm" variant="orange" />
                    <div>
                      <div className="font-sans text-[13px]" style={{ color: 'var(--ink)' }}>Anonymous trust</div>
                      <div className="font-mono text-[10px]" style={{ color: 'var(--ink-4)' }}>Cash · agent-deposited</div>
                    </div>
                  </div>
                </td>
                <td className={TD_CLS} style={{ borderColor: 'var(--hair)', background: '#FFF3E0', color: 'var(--ink-2)' }}>Individual</td>
                <td className={TD_CLS} style={{ borderColor: 'var(--hair)', background: '#FFF3E0', color: 'var(--ink-2)' }}>Onitsha N.</td>
                <td className={TD_CLS} style={{ borderColor: 'var(--hair)', background: '#FFF3E0', color: 'var(--ink-2)' }}>Cash · agent</td>
                <td className={TD_CLS} style={{ borderColor: 'var(--hair)', background: '#FFF3E0', color: 'var(--ink-2)', fontFamily: 'var(--font-mono, monospace)', fontSize: '12px' }}>May 02</td>
                <td className={TD_CLS} style={{ borderColor: 'var(--hair)', background: '#FFF3E0', color: 'var(--ink)', fontFamily: 'var(--font-mono, monospace)', fontSize: '12px', fontWeight: 600 }}>₦ 5,000,000</td>
                <td className={TD_CLS} style={{ borderColor: 'var(--hair)', background: '#FFF3E0' }}><TierChip tier="toss" /></td>
              </tr>
              {/* Row 4 */}
              <tr>
                <td className={TD_CLS} style={{ borderColor: 'var(--hair)' }}>
                  <div className="flex items-center gap-2">
                    <Avatar initials="NU" size="sm" />
                    <div>
                      <div className="font-sans text-[13px]" style={{ color: 'var(--ink)' }}>Nigerian Union of Teachers — Anambra</div>
                      <div className="font-mono text-[10px]" style={{ color: 'var(--ink-4)' }}>Affiliated body</div>
                    </div>
                  </div>
                </td>
                <td className={TD_CLS} style={{ borderColor: 'var(--hair)', color: 'var(--ink-2)' }}>Corporate</td>
                <td className={TD_CLS} style={{ borderColor: 'var(--hair)', color: 'var(--ink-2)' }}>Multiple</td>
                <td className={TD_CLS} style={{ borderColor: 'var(--hair)', color: 'var(--ink-2)' }}>Transfer (Access)</td>
                <td className={TD_CLS} style={{ borderColor: 'var(--hair)', color: 'var(--ink-2)', fontFamily: 'var(--font-mono, monospace)', fontSize: '12px' }}>May 05</td>
                <td className={TD_CLS} style={{ borderColor: 'var(--hair)', color: 'var(--ink)', fontFamily: 'var(--font-mono, monospace)', fontSize: '12px' }}>₦ 600,000</td>
                <td className={TD_CLS} style={{ borderColor: 'var(--hair)' }}><TierChip tier="hold" /></td>
              </tr>
              {/* Row 5 */}
              <tr>
                <td className={TD_CLS} style={{ borderColor: 'var(--hair)' }}>
                  <div className="flex items-center gap-2">
                    <Avatar initials="JI" size="sm" />
                    <div>
                      <div className="font-sans text-[13px]" style={{ color: 'var(--ink)' }}>Joseph Ibe</div>
                      <div className="font-mono text-[10px]" style={{ color: 'var(--ink-4)' }}>Individual</div>
                    </div>
                  </div>
                </td>
                <td className={TD_CLS} style={{ borderColor: 'var(--hair)', color: 'var(--ink-2)' }}>Individual</td>
                <td className={TD_CLS} style={{ borderColor: 'var(--hair)', color: 'var(--ink-2)' }}>Aguata</td>
                <td className={TD_CLS} style={{ borderColor: 'var(--hair)', color: 'var(--ink-2)' }}>Wire</td>
                <td className={TD_CLS} style={{ borderColor: 'var(--hair)', color: 'var(--ink-2)', fontFamily: 'var(--font-mono, monospace)', fontSize: '12px' }}>May 09</td>
                <td className={TD_CLS} style={{ borderColor: 'var(--hair)', color: 'var(--ink)', fontFamily: 'var(--font-mono, monospace)', fontSize: '12px' }}>₦ 250,000</td>
                <td className={TD_CLS} style={{ borderColor: 'var(--hair)' }}><TierChip tier="hold" /></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-3 font-mono text-[10px]" style={{ color: 'var(--ink-4)' }}>
          Totals tracked against INEC statutory cap of ₦ 4 billion (Senate seat). · Total: ₦ 9,100,000
        </div>
      </Scene>
    </div>
  );
}
