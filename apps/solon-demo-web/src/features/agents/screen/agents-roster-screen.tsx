import { useState } from 'react';
import { SearchBar, SkeletonCard, StatusPill } from '@solon/ui';
import { useAgentsRoster } from '../api/use-agents-roster';
import { ErrorState } from '@shared/components/error-state';

const TH_CLS = 'font-mono text-[10px] uppercase text-left px-3 py-2 border-b tracking-[0.08em]';
const TD_CLS = 'font-sans text-[13px] px-3 py-3 border-b';

export default function AgentsRosterScreen() {
  const { data, isLoading, isError, refetch } = useAgentsRoster();
  const [search, setSearch] = useState('');

  if (isLoading) {
    return (
      <div className="p-6 grid grid-cols-1 gap-4">
        {Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    );
  }

  if (isError || !data) {
    return <ErrorState message="Could not load agent roster." onRetry={() => void refetch()} />;
  }

  const agents = data.filter(
    (a) => !search || a.name.toLowerCase().includes(search.toLowerCase()) || a.lga.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="p-5 md:p-8">
      <div className="mb-5 flex items-start justify-between flex-wrap gap-3">
        <div>
          <h2 className="font-serif font-semibold text-[20px]" style={{ color: 'var(--ink)' }}>Agent roster</h2>
          <p className="font-serif italic text-[13px] mt-0.5" style={{ color: 'var(--ink-3)' }}>
            — nationwide · {data.length} agents registered
          </p>
        </div>
        <div className="w-full sm:w-[280px]">
          <SearchBar
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name or LGA…"
          />
        </div>
      </div>

      <div className="rounded-[6px] overflow-hidden border" style={{ borderColor: 'var(--hair)' }}>
        <style>{`.roster-table tbody tr:hover td { background: var(--paper-2); }`}</style>
        <div className="overflow-x-auto">
          <table className="roster-table w-full border-collapse">
            <thead>
              <tr style={{ background: 'var(--paper-2)' }}>
                {['Agent', 'LGA', 'PU code', 'Verified', 'Election ready'].map((h) => (
                  <th key={h} className={TH_CLS} style={{ color: 'var(--ink-3)', borderColor: 'var(--hair)' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {agents.map((agent) => (
                <tr key={agent.id}>
                  <td className={TD_CLS} style={{ borderColor: 'var(--hair)' }}>
                    <div className="font-sans font-medium text-[13px]" style={{ color: 'var(--ink)' }}>{agent.name}</div>
                    <div className="font-mono text-[10px]" style={{ color: 'var(--ink-4)' }}>{agent.phone}</div>
                  </td>
                  <td className={TD_CLS} style={{ borderColor: 'var(--hair)', color: 'var(--ink-3)' }}>{agent.lga}</td>
                  <td className={TD_CLS} style={{ borderColor: 'var(--hair)' }}>
                    <div className="font-mono text-[11px]" style={{ color: 'var(--ink-4)' }}>{agent.pu}</div>
                  </td>
                  <td className={TD_CLS} style={{ borderColor: 'var(--hair)' }}>
                    <StatusPill variant={agent.verified ? 'ok' : 'warn'} label={agent.verified ? 'Verified' : 'Pending'} />
                  </td>
                  <td className={TD_CLS} style={{ borderColor: 'var(--hair)' }}>
                    <StatusPill variant={agent.election_ready ? 'ok' : 'quiet'} label={agent.election_ready ? 'Ready' : 'Not ready'} />
                  </td>
                </tr>
              ))}
              {agents.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-3 py-6 text-center font-serif italic text-[13px]" style={{ color: 'var(--ink-4)' }}>
                    No agents match "{search}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
