import { OfficialStamp } from '@solon/ui';

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="font-mono text-[10px] uppercase tracking-widest mb-3"
      style={{ color: 'var(--ink-4)' }}
    >
      {children}
    </p>
  );
}

function TableHead({ cols }: { cols: string[] }) {
  return (
    <thead>
      <tr style={{ borderBottom: '1px solid var(--ink)' }}>
        {cols.map((col) => (
          <th
            key={col}
            className="font-mono text-[10px] uppercase px-3 py-2 text-left"
            style={{ color: 'var(--ink-3)' }}
          >
            {col}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export function ExportScreen() {
  return (
    <div className="px-8 py-10">
      {/* Page header */}
      <div className="mb-12">
        <p className="font-mono text-[10px] uppercase tracking-widest" style={{ color: 'var(--ink-4)' }}>
          43 / SCREENS
        </p>
        <h1 className="font-serif font-bold text-[32px] mt-1" style={{ color: 'var(--ink)' }}>
          INEC export sheet
        </h1>
        <p className="font-sans text-[14px] mt-1" style={{ color: 'var(--ink-3)' }}>
          — compliance return document format.
        </p>
      </div>

      {/* Document card */}
      <div
        className="rounded-[4px] p-12 max-w-[880px]"
        style={{
          background: 'var(--sheet)',
          border: '1px solid var(--ink)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        }}
      >
        {/* Document header */}
        <div
          className="pb-6 mb-6 flex justify-between items-start"
          style={{
            borderBottom: '3px double var(--ink)',
          }}
        >
          <div>
            <p className="font-serif font-bold text-[38px] leading-none" style={{ color: 'var(--ink)' }}>
              Solon<span style={{ color: 'var(--orange)' }}>.</span>
            </p>
            <p className="font-serif italic text-[14px] mt-1" style={{ color: 'var(--ink-3)' }}>
              INEC compliance return · senate, Anambra Central
            </p>
          </div>
          <div className="text-right space-y-0.5">
            {[
              'Filing draft',
              'Candidate: Charles C. Soludo (LP)',
              'Period: 25 Feb — 11 May 2026',
              'Statutory cap: ₦ 4,000,000,000',
              'Generated: 2026-05-11 14:08 WAT',
            ].map((line) => (
              <p key={line} className="font-mono text-[10px]" style={{ color: 'var(--ink-3)' }}>
                {line}
              </p>
            ))}
          </div>
        </div>

        {/* Lede paragraph with drop cap */}
        <p
          className="font-serif italic text-[14px] mb-8 max-w-[72ch]"
          style={{ color: 'var(--ink-2)', lineHeight: 1.7 }}
        >
          <span
            style={{
              float: 'left',
              fontSize: 48,
              lineHeight: 1,
              marginRight: 4,
              color: 'var(--forest-600)',
              fontFamily: 'Fraunces, Georgia, serif',
              fontWeight: 600,
            }}
          >
            T
          </span>
          his statement of expenditure is prepared by the candidate's campaign in accordance with § 88–90 of the Electoral Act, 2022, and is filed with the Independent National Electoral Commission under the obligations attaching to the seat sought. The figures below reflect <strong>actual disbursements</strong> across the reporting period; the disclosures section that follows describes the model, source data, and confidence limits applicable to any projected figures.
        </p>

        {/* § 01 — Statement of expenditure */}
        <div className="mb-10">
          <SectionHeading>§ 01 · Statement of expenditure by INEC category</SectionHeading>
          <table className="w-full" style={{ borderCollapse: 'collapse' }}>
            <TableHead cols={['Category', 'Sub-cap', 'Spent', '% sub-cap', 'Headroom']} />
            <tbody>
              {[
                { cat: 'Media · advertising', subcap: '₦ 1,200,000,000', spent: '936,000,000', pct: '78%', orange: true, headroom: '264,000,000' },
                { cat: 'Personnel · stipends', subcap: '600,000,000', spent: '384,000,000', pct: '64%', orange: false, headroom: '216,000,000' },
                { cat: 'Transport · logistics', subcap: '800,000,000', spent: '328,000,000', pct: '41%', orange: false, headroom: '472,000,000' },
                { cat: 'Materials · printing', subcap: '400,000,000', spent: '112,000,000', pct: '28%', orange: false, headroom: '288,000,000' },
                { cat: 'Convention · events', subcap: '500,000,000', spent: '260,000,000', pct: '52%', orange: false, headroom: '240,000,000' },
                { cat: 'Miscellaneous', subcap: '500,000,000', spent: '50,000,000', pct: '10%', orange: false, headroom: '450,000,000' },
              ].map((row) => (
                <tr
                  key={row.cat}
                  className="hover:bg-[var(--paper-2)] transition-colors"
                  style={{ borderBottom: '1px solid var(--hair)' }}
                >
                  <td className="font-sans text-[13px] px-3 py-2" style={{ color: 'var(--ink)' }}>{row.cat}</td>
                  <td className="font-mono text-[12px] px-3 py-2" style={{ color: 'var(--ink-2)' }}>{row.subcap}</td>
                  <td className="font-mono text-[12px] px-3 py-2" style={{ color: 'var(--ink)' }}>{row.spent}</td>
                  <td
                    className="font-mono text-[12px] px-3 py-2 font-medium"
                    style={{ color: row.orange ? 'var(--orange)' : 'var(--ink)' }}
                  >
                    {row.pct}
                  </td>
                  <td className="font-mono text-[12px] px-3 py-2" style={{ color: 'var(--ink-2)' }}>{row.headroom}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr style={{ borderTop: '2px solid var(--ink)' }}>
                <td className="font-sans font-bold text-[13px] px-3 py-2" style={{ color: 'var(--ink)' }}>
                  Total · against ₦ 4.0bn statutory cap
                </td>
                <td className="font-mono text-[12px] px-3 py-2" style={{ color: 'var(--ink-2)' }}>—</td>
                <td className="font-mono font-bold text-[12px] px-3 py-2" style={{ color: 'var(--ink)' }}>2,070,000,000</td>
                <td className="font-mono font-bold text-[12px] px-3 py-2" style={{ color: 'var(--ink)' }}>52%</td>
                <td className="font-mono text-[12px] px-3 py-2" style={{ color: 'var(--ink-2)' }}>1,930,000,000</td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* § 02 — Donor register */}
        <div className="mb-10">
          <SectionHeading>§ 02 · Donor register period summary</SectionHeading>
          <table className="w-full" style={{ borderCollapse: 'collapse' }}>
            <TableHead cols={['Donor type', 'Count', 'Total received', 'High-risk flagged']} />
            <tbody>
              {[
                { type: 'Individual', count: '22', total: '14,650,000', flagged: '1', flagOrange: true },
                { type: 'Corporate', count: '5', total: '9,200,000', flagged: '0', flagOrange: false },
                { type: 'Affiliated body', count: '1', total: '600,000', flagged: '0', flagOrange: false },
              ].map((row) => (
                <tr
                  key={row.type}
                  className="hover:bg-[var(--paper-2)] transition-colors"
                  style={{ borderBottom: '1px solid var(--hair)' }}
                >
                  <td className="font-sans text-[13px] px-3 py-2" style={{ color: 'var(--ink)' }}>{row.type}</td>
                  <td className="font-mono text-[12px] px-3 py-2" style={{ color: 'var(--ink)' }}>{row.count}</td>
                  <td className="font-mono text-[12px] px-3 py-2" style={{ color: 'var(--ink)' }}>{row.total}</td>
                  <td
                    className="font-mono text-[12px] px-3 py-2 font-medium"
                    style={{ color: row.flagOrange ? 'var(--orange)' : 'var(--ink)' }}
                  >
                    {row.flagged}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr style={{ borderTop: '2px solid var(--ink)' }}>
                <td className="font-sans font-bold text-[13px] px-3 py-2" style={{ color: 'var(--ink)' }}>Total</td>
                <td className="font-mono font-bold text-[12px] px-3 py-2" style={{ color: 'var(--ink)' }}>28</td>
                <td className="font-mono font-bold text-[12px] px-3 py-2" style={{ color: 'var(--ink)' }}>24,450,000</td>
                <td className="font-mono font-bold text-[12px] px-3 py-2" style={{ color: 'var(--orange)' }}>1</td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* § 03 — Anomaly resolutions */}
        <div className="mb-10">
          <SectionHeading>§ 03 · Anomaly resolutions</SectionHeading>
          <table className="w-full" style={{ borderCollapse: 'collapse' }}>
            <TableHead cols={['Anomaly', 'Status', 'Resolved by', 'Date']} />
            <tbody>
              {[
                {
                  anomaly: 'Duplicate invoice — vendor VND-0412',
                  status: 'Action taken · invoices voided',
                  by: 'Finance Officer @F.Okeke',
                  date: '2026-05-09',
                },
                {
                  anomaly: 'Stipend claim diverges from peers',
                  status: 'Under review',
                  by: 'Campaign Manager @C.Obi',
                  date: '2026-05-07',
                },
                {
                  anomaly: 'Single-use high-value vendor (₦ 4.2m)',
                  status: 'Dismissed · documentation verified',
                  by: 'Finance Officer @F.Okeke',
                  date: '2026-05-05',
                },
              ].map((row) => (
                <tr
                  key={row.anomaly}
                  className="hover:bg-[var(--paper-2)] transition-colors"
                  style={{ borderBottom: '1px solid var(--hair)' }}
                >
                  <td className="font-sans text-[13px] px-3 py-2" style={{ color: 'var(--ink)' }}>{row.anomaly}</td>
                  <td className="font-sans text-[12px] px-3 py-2" style={{ color: 'var(--ink-2)' }}>{row.status}</td>
                  <td className="font-mono text-[11px] px-3 py-2" style={{ color: 'var(--ink-3)' }}>{row.by}</td>
                  <td className="font-mono text-[11px] px-3 py-2" style={{ color: 'var(--ink-3)' }}>{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* § 04 — Mandatory disclosures */}
        <div className="mb-10">
          <SectionHeading>§ 04 · Mandatory disclosures</SectionHeading>
          <div className="grid grid-cols-2 gap-6">
            {[
              '<strong>§ 04 · Mandatory disclosures.</strong> The figures in this statement are drawn from the campaign\'s own ledger system, reviewed by the campaign Finance Officer and Campaign Manager, and signed for submission. Projections, where present, are clearly labelled and distinguished from actual disbursements.',
              '<strong>Confidence and limits.</strong> Projected figures are generated by Solon model v 2026-05a, with a stated confidence band. Projections are not predictions.',
              '<strong>Voter data note.</strong> No individually identifiable voter data was used in the preparation of this statement.',
              '<strong>Audit log.</strong> Every action in the audit log is retained under NDPR-aligned retention and accessible to the candidate\'s representatives and INEC on lawful request.',
            ].map((text, i) => (
              <p
                key={i}
                className="font-serif italic text-[12px]"
                style={{ color: 'var(--ink-3)', lineHeight: 1.7 }}
                dangerouslySetInnerHTML={{ __html: text }}
              />
            ))}
          </div>
        </div>

        {/* Signature block */}
        <div
          className="flex items-start justify-between mt-8 pt-6"
          style={{ borderTop: '1px solid var(--ink)' }}
        >
          <div>
            <p className="font-serif text-[20px]" style={{ color: 'var(--ink)' }}>Chinwe Obi</p>
            <p className="font-mono text-[10px] mt-1" style={{ color: 'var(--ink-3)' }}>Campaign Manager · sig. on file</p>
          </div>

          <OfficialStamp variant="verified" meta="SOLON-VERIFIED · 2026-05-11" />

          <div className="text-right">
            <p className="font-serif text-[20px]" style={{ color: 'var(--ink)' }}>Funmi Okeke</p>
            <p className="font-mono text-[10px] mt-1" style={{ color: 'var(--ink-3)' }}>Finance Officer · sig. on file</p>
          </div>
        </div>

        {/* Document footer */}
        <div
          className="flex justify-between mt-8 pt-4"
          style={{ borderTop: '1px solid var(--hair)' }}
        >
          <span className="font-mono text-[10px]" style={{ color: 'var(--ink-4)' }}>
            Solon platform · solon.ng · NDPR-aligned
          </span>
          <span className="font-mono text-[10px]" style={{ color: 'var(--ink-4)' }}>
            Page 1 of 8 · INEC FORM CE-01R · v 2026.1
          </span>
        </div>
      </div>
    </div>
  );
}
