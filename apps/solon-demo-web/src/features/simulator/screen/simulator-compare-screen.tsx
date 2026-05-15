import { ConfidenceBar } from '@solon/ui';
import type { ConfidenceLevel } from '@solon/ui';

const TH = 'font-mono text-[10px] uppercase text-left px-4 py-2.5 border-b tracking-[0.08em]';
const TD = 'font-sans text-[13px] px-4 py-3 border-b';

const COMPARE_DATA = [
  { id: 'sc-1', name: 'High turnout + youth surge', subtitle: 'strong mobilization · no incidents', lp: 53.4, apc: 19.8, apga: 14.7, pdp: 9.1, turnout: 71.8, confidence: 3, isBaseline: false },
  { id: 'baseline', name: 'Baseline', subtitle: 'no-shock · 2023 turnout basis', lp: 47.2, apc: 22.1, apga: 18.4, pdp: 9.8, turnout: 64.2, confidence: 4, isBaseline: true },
  { id: 'sc-3', name: 'Security shock · sev 4', subtitle: 'Onitsha incident · BVAS 14%', lp: 42.1, apc: 25.6, apga: 19.8, pdp: 10.3, turnout: 48.6, confidence: 2, isBaseline: false },
] as const;

export default function SimulatorCompareScreen() {
  const baselineLp = COMPARE_DATA.find((s) => s.isBaseline)?.lp ?? 47.2;

  return (
    <div className="p-6 md:p-8">
      <div className="mb-5">
        <h2 className="font-serif font-semibold text-[20px]" style={{ color: 'var(--ink)' }}>Scenario comparison</h2>
        <p className="font-serif italic text-[13px] mt-0.5" style={{ color: 'var(--ink-3)' }}>
          — Anambra Central · senate · 2027 · {COMPARE_DATA.length} scenarios
        </p>
      </div>

      {/* Summary table */}
      <div className="rounded-[6px] overflow-hidden border mb-6" style={{ borderColor: 'var(--hair)' }}>
        <style>{`.compare-table tbody tr:hover td { background: var(--paper-2); }`}</style>
        <table className="compare-table w-full border-collapse">
          <thead>
            <tr style={{ background: 'var(--paper-2)', borderBottom: '1px solid var(--hair)' }}>
              {['Scenario', 'LP', 'APC', 'APGA', 'PDP', 'Turnout', 'Confidence'].map((h) => (
                <th key={h} className={TH} style={{ color: 'var(--ink-3)', borderColor: 'var(--hair)' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COMPARE_DATA.map((sc) => {
              const lpDelta = sc.lp - baselineLp;
              return (
                <tr key={sc.id} style={{ background: sc.isBaseline ? 'var(--forest-50)' : undefined }}>
                  <td className={TD} style={{ borderColor: 'var(--hair)' }}>
                    <div className="font-sans font-medium text-[13px]" style={{ color: 'var(--ink)' }}>{sc.name}</div>
                    <div className="font-serif italic text-[11px] mt-0.5" style={{ color: 'var(--ink-3)' }}>{sc.subtitle}</div>
                    {sc.isBaseline && (
                      <div className="font-mono text-[9px] mt-0.5" style={{ color: 'var(--forest-700)' }}>BASELINE</div>
                    )}
                  </td>
                  <td className={TD} style={{ borderColor: 'var(--hair)' }}>
                    <span className="font-serif font-bold text-[18px]" style={{ color: 'var(--forest-700)' }}>
                      {sc.lp.toFixed(1)}%
                    </span>
                    {!sc.isBaseline && (
                      <div className="font-mono text-[10px]" style={{ color: lpDelta >= 0 ? 'var(--forest-700)' : 'var(--orange)' }}>
                        {lpDelta >= 0 ? '+' : ''}{lpDelta.toFixed(1)}
                      </div>
                    )}
                  </td>
                  <td className={TD} style={{ borderColor: 'var(--hair)', color: 'var(--ink-3)', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
                    {sc.apc.toFixed(1)}%
                  </td>
                  <td className={TD} style={{ borderColor: 'var(--hair)', color: 'var(--ink-3)', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
                    {sc.apga.toFixed(1)}%
                  </td>
                  <td className={TD} style={{ borderColor: 'var(--hair)', color: 'var(--ink-3)', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
                    {sc.pdp.toFixed(1)}%
                  </td>
                  <td className={TD} style={{ borderColor: 'var(--hair)', color: 'var(--ink-2)', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
                    {sc.turnout.toFixed(1)}%
                  </td>
                  <td className={TD} style={{ borderColor: 'var(--hair)' }}>
                    <ConfidenceBar level={sc.confidence as ConfidenceLevel} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Visual bars — 3-up */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {COMPARE_DATA.map((sc) => (
          <div
            key={sc.id}
            className="rounded-[6px] overflow-hidden"
            style={{ border: `1px solid ${sc.isBaseline ? 'var(--forest-600)' : 'var(--hair)'}`, background: 'var(--sheet)' }}
          >
            <div
              className="px-4 py-2 border-b"
              style={{ background: 'var(--paper-2)', borderColor: sc.isBaseline ? 'var(--forest-600)' : 'var(--hair)' }}
            >
              <div className="font-sans font-medium text-[13px]" style={{ color: 'var(--ink)' }}>{sc.name}</div>
              {sc.isBaseline && <div className="font-mono text-[9px]" style={{ color: 'var(--forest-700)' }}>BASELINE</div>}
            </div>
            <div className="p-4">
              {/* Stacked bar */}
              <div className="flex h-7 rounded-[3px] overflow-hidden mb-3">
                {[
                  { party: 'LP', share: sc.lp, bg: 'var(--forest-600)', color: 'white' },
                  { party: 'APC', share: sc.apc, bg: 'var(--ink)', color: 'var(--paper)' },
                  { party: 'APGA', share: sc.apga, bg: 'var(--paper-3)', color: 'var(--ink-2)' },
                  { party: 'PDP', share: sc.pdp, bg: '#FFF3E0', color: 'var(--ink-3)' },
                ].map(({ party, share, bg, color }) => (
                  <div
                    key={party}
                    className="flex items-center px-1 font-mono text-[8px] shrink-0 overflow-hidden"
                    style={{ flex: share, background: bg, color }}
                  >
                    {share > 14 ? `${party} ${share.toFixed(1)}%` : party}
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center">
                <span className="font-serif font-bold text-[20px]" style={{ color: 'var(--forest-700)' }}>
                  {sc.lp.toFixed(1)}%
                </span>
                <ConfidenceBar level={sc.confidence as ConfidenceLevel} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
