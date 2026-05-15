import { SkeletonCard, TierChip } from '@solon/ui';
import type { TierVariant } from '@solon/ui';
import { formatNumber } from '@shared/helpers/format-number';
import { useVoterClusters } from '../api/use-voter-clusters';

const TH_CLS = 'font-mono text-[10px] uppercase text-left px-3 py-2 border-b tracking-[0.08em]';
const TD_CLS = 'font-sans text-[13px] px-3 py-3 border-b';

const AFFINITY_TIER: Record<string, TierVariant> = {
  strong: 'hold-strong',
  leaning: 'hold',
  swing: 'toss',
  opposed: 'opp-strong',
};

export default function VoterIntelClustersScreen() {
  const { data, isLoading } = useVoterClusters();
  const clusters = data ?? [];

  if (isLoading && !data) {
    return (
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    );
  }

  return (
    <div className="p-5 md:p-8">
      <div className="mb-5">
        <h2 className="font-serif font-semibold text-[20px]" style={{ color: 'var(--ink)' }}>Voter clusters</h2>
        <p className="font-serif italic text-[13px] mt-0.5" style={{ color: 'var(--ink-3)' }}>
          — Anambra Central · persuadability model · {clusters.length} segments
        </p>
      </div>

      <div className="rounded-[6px] overflow-hidden border mb-6" style={{ borderColor: 'var(--hair)' }}>
        <style>{`.cluster-table tbody tr:hover td { background: var(--paper-2); }`}</style>
        <div className="overflow-x-auto">
          <table className="cluster-table w-full border-collapse">
            <thead>
              <tr style={{ background: 'var(--paper-2)' }}>
                {['#', 'Cluster', 'Age range', 'Top issues', 'Size', 'LP affinity'].map((h, i) => (
                  <th
                    key={h}
                    className={TH_CLS}
                    style={{ color: 'var(--ink-3)', borderColor: 'var(--hair)', textAlign: i === 4 ? 'right' : 'left' }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {clusters.map((c, idx) => (
                <tr key={c.id}>
                  <td className={TD_CLS} style={{ borderColor: 'var(--hair)', color: 'var(--forest-600)', fontFamily: 'var(--font-mono)', fontSize: 12, width: 32 }}>
                    {String(idx + 1).padStart(2, '0')}
                  </td>
                  <td className={TD_CLS} style={{ borderColor: 'var(--hair)' }}>
                    <div className="font-sans font-medium text-[13px]" style={{ color: 'var(--ink)' }}>{c.name}</div>
                    <div className="font-serif italic text-[11px] mt-0.5" style={{ color: 'var(--ink-3)' }}>{c.description}</div>
                  </td>
                  <td className={TD_CLS} style={{ borderColor: 'var(--hair)', color: 'var(--ink-3)', fontFamily: 'var(--font-mono)', fontSize: 11, whiteSpace: 'nowrap' }}>
                    {c.ageRange}
                  </td>
                  <td className={TD_CLS} style={{ borderColor: 'var(--hair)' }}>
                    <div className="flex flex-wrap gap-1">
                      {c.topIssues.map((issue) => (
                        <span
                          key={issue}
                          className="px-2 py-0.5 font-mono text-[10px] rounded-[3px]"
                          style={{ background: 'var(--paper-2)', color: 'var(--ink-3)', border: '1px solid var(--hair)' }}
                        >
                          {issue}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className={TD_CLS} style={{ borderColor: 'var(--hair)', textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: 12, whiteSpace: 'nowrap', color: 'var(--ink-2)' }}>
                    {formatNumber(c.size, true)}
                  </td>
                  <td className={TD_CLS} style={{ borderColor: 'var(--hair)' }}>
                    <TierChip tier={AFFINITY_TIER[c.lpAffinity] ?? 'toss'} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="font-serif italic text-[12px]" style={{ color: 'var(--ink-4)' }}>
        Affinity tiers map to LP persuadability model · Solon Intelligence · Anambra Central 2027
      </p>
    </div>
  );
}
