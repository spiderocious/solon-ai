import { useState } from 'react';
import { SearchBar, SkeletonCard, StatusPill } from '@solon/ui';
import { useAgentsRoster } from '../api/use-agents-roster';
import type { AgentStatus } from '@shared/types/mock-data.types';

const TH_CLS = 'font-mono text-[10px] uppercase text-left px-3 py-2 border-b tracking-[0.08em]';
const TD_CLS = 'font-sans text-[13px] px-3 py-3 border-b';

const STATUS_PILL: Record<AgentStatus, { variant: 'ok' | 'warn' | 'alert' | 'neutral'; label: string }> = {
  active: { variant: 'ok', label: 'Active' },
  deployed: { variant: 'ok', label: 'Deployed' },
  pending: { variant: 'warn', label: 'Pending' },
  inactive: { variant: 'neutral', label: 'Inactive' },
};

export default function AgentsRosterScreen() {
  const { data, isLoading } = useAgentsRoster();
  const [search, setSearch] = useState('');

  const agents = (data ?? []).filter(
    (a) => !search || a.name.toLowerCase().includes(search.toLowerCase()) || a.lga.toLowerCase().includes(search.toLowerCase()),
  );

  if (isLoading && !data) {
    return (
      <div className="p-6 grid grid-cols-1 gap-4">
        {Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    );
  }

  return (
    <div className="p-5 md:p-8">
      <div className="mb-5 flex items-start justify-between flex-wrap gap-3">
        <div>
          <h2 className="font-serif font-semibold text-[20px]" style={{ color: 'var(--ink)' }}>Agent roster</h2>
          <p className="font-serif italic text-[13px] mt-0.5" style={{ color: 'var(--ink-3)' }}>
            — Anambra Central · {data?.length ?? 0} agents registered
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
                {['Agent', 'LGA', 'Ward / PU code', 'PUs covered', 'Status', 'Last check-in'].map((h, i) => (
                  <th
                    key={h}
                    className={TH_CLS}
                    style={{ color: 'var(--ink-3)', borderColor: 'var(--hair)', textAlign: i === 3 ? 'right' : 'left' }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {agents.map((agent) => {
                const pill = STATUS_PILL[agent.status] ?? STATUS_PILL.inactive;
                return (
                  <tr key={agent.id}>
                    <td className={TD_CLS} style={{ borderColor: 'var(--hair)' }}>
                      <div className="font-sans font-medium text-[13px]" style={{ color: 'var(--ink)' }}>{agent.name}</div>
                      <div className="font-mono text-[10px]" style={{ color: 'var(--ink-4)' }}>{agent.phone}</div>
                    </td>
                    <td className={TD_CLS} style={{ borderColor: 'var(--hair)', color: 'var(--ink-3)' }}>
                      {agent.lga}
                    </td>
                    <td className={TD_CLS} style={{ borderColor: 'var(--hair)' }}>
                      <div className="font-sans text-[12px]" style={{ color: 'var(--ink-3)' }}>{agent.ward}</div>
                      <div className="font-mono text-[10px]" style={{ color: 'var(--ink-4)' }}>{agent.pu}</div>
                    </td>
                    <td className={TD_CLS} style={{ borderColor: 'var(--hair)', textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--ink-2)' }}>
                      {agent.pusCovered}
                    </td>
                    <td className={TD_CLS} style={{ borderColor: 'var(--hair)' }}>
                      <StatusPill variant={pill.variant} label={pill.label} />
                    </td>
                    <td className={TD_CLS} style={{ borderColor: 'var(--hair)', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-4)' }}>
                      {agent.lastCheckIn
                        ? new Date(agent.lastCheckIn).toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit' })
                        : '—'}
                    </td>
                  </tr>
                );
              })}
              {agents.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-3 py-6 text-center font-serif italic text-[13px]" style={{ color: 'var(--ink-4)' }}>
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
