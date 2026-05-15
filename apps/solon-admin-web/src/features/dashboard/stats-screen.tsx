import { useQuery } from '@tanstack/react-query';
import { adminClient } from '@shared/admin-client';
import { ADMIN_EP } from '@shared/admin-endpoints';

interface StatsResponse {
  counts: {
    sessions: number;
    leads: number;
    feedback: number;
  };
  recentLeads: Array<{
    name?: string;
    email?: string;
    phone?: string;
    role?: string;
    party?: string;
    state?: string;
    createdAt: string;
  }>;
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div
      className="rounded-[6px] border p-5"
      style={{ background: 'var(--sheet)', borderColor: 'var(--hair)' }}
    >
      <div className="font-mono text-[10px] uppercase tracking-[0.12em] mb-2" style={{ color: 'var(--ink-4)' }}>
        {label}
      </div>
      <div className="font-serif font-bold text-[36px]" style={{ color: 'var(--ink)' }}>
        {value.toLocaleString()}
      </div>
    </div>
  );
}

export function StatsScreen() {
  const { data, isLoading, isError } = useQuery<StatsResponse>({
    queryKey: ['admin-stats'],
    queryFn: () => adminClient.get<StatsResponse>(ADMIN_EP.STATS),
    refetchInterval: 30_000,
  });

  return (
    <div className="max-w-[900px]">
      <div className="mb-8">
        <div className="font-mono text-[10px] uppercase tracking-[0.14em] mb-1" style={{ color: 'var(--ink-4)' }}>
          Dashboard
        </div>
        <div className="font-serif font-bold text-[30px]" style={{ color: 'var(--ink)' }}>
          Platform stats
        </div>
      </div>

      {isError && (
        <div className="mb-6 px-4 py-3 rounded-[4px] font-sans text-[12px]" style={{ background: 'var(--orange-soft)', color: 'var(--orange)' }}>
          Failed to load stats. Check your connection or token.
        </div>
      )}

      {/* Counts */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <StatCard label="Total sessions" value={data?.counts.sessions ?? 0} />
        <StatCard label="Leads captured" value={data?.counts.leads ?? 0} />
        <StatCard label="Feedback items" value={data?.counts.feedback ?? 0} />
      </div>

      {/* Recent leads */}
      <div>
        <div className="font-mono text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: 'var(--ink-4)' }}>
          Recent leads
        </div>

        {isLoading ? (
          <div className="font-serif italic text-[13px]" style={{ color: 'var(--ink-3)' }}>Loading…</div>
        ) : !data?.recentLeads.length ? (
          <div className="font-serif italic text-[13px]" style={{ color: 'var(--ink-3)' }}>No leads yet.</div>
        ) : (
          <div
            className="rounded-[6px] border overflow-hidden"
            style={{ borderColor: 'var(--hair)' }}
          >
            <table className="w-full text-left">
              <thead>
                <tr style={{ background: 'var(--paper-2)', borderBottom: '1px solid var(--hair)' }}>
                  {['Name', 'Email', 'Role', 'Party', 'State', 'When'].map((h) => (
                    <th key={h} className="px-4 py-2.5 font-mono text-[9px] uppercase tracking-[0.08em]" style={{ color: 'var(--ink-4)' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.recentLeads.map((lead, i) => (
                  <tr
                    key={i}
                    style={{ borderBottom: '1px solid var(--hair)', background: i % 2 === 0 ? 'var(--sheet)' : 'var(--paper-2)' }}
                  >
                    <td className="px-4 py-2.5 font-sans text-[12px]" style={{ color: 'var(--ink-2)' }}>{lead.name ?? '—'}</td>
                    <td className="px-4 py-2.5 font-sans text-[12px]" style={{ color: 'var(--ink-2)' }}>{lead.email ?? '—'}</td>
                    <td className="px-4 py-2.5 font-sans text-[12px]" style={{ color: 'var(--ink-2)' }}>{lead.role ?? '—'}</td>
                    <td className="px-4 py-2.5 font-sans text-[12px]" style={{ color: 'var(--ink-2)' }}>{lead.party ?? '—'}</td>
                    <td className="px-4 py-2.5 font-sans text-[12px]" style={{ color: 'var(--ink-2)' }}>{lead.state ?? '—'}</td>
                    <td className="px-4 py-2.5 font-mono text-[10px]" style={{ color: 'var(--ink-4)' }}>
                      {new Date(lead.createdAt).toLocaleDateString('en-NG')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
