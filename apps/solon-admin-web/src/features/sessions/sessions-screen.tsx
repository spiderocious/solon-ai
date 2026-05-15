import { useQuery } from '@tanstack/react-query';
import { adminClient } from '@shared/admin-client';
import { ADMIN_EP } from '@shared/admin-endpoints';

interface SessionRow {
  sessionId: string;
  leadId?: string;
  pageTrail: string[];
  createdAt: string;
}

export function SessionsScreen() {
  const { data, isLoading, isError } = useQuery<SessionRow[]>({
    queryKey: ['admin-sessions'],
    queryFn: () => adminClient.get<SessionRow[]>(ADMIN_EP.SESSIONS),
    refetchInterval: 30_000,
  });

  return (
    <div className="max-w-[1000px]">
      <div className="mb-8">
        <div className="font-mono text-[10px] uppercase tracking-[0.14em] mb-1" style={{ color: 'var(--ink-4)' }}>Sessions</div>
        <div className="font-serif font-bold text-[30px]" style={{ color: 'var(--ink)' }}>Demo sessions</div>
        <div className="font-serif italic text-[13px] mt-1" style={{ color: 'var(--ink-3)' }}>
          — most recent 50 · auto-refreshes every 30s
        </div>
      </div>

      {isError && (
        <div className="mb-6 px-4 py-3 rounded-[4px] font-sans text-[12px]" style={{ background: 'var(--orange-soft)', color: 'var(--orange)' }}>
          Failed to load sessions.
        </div>
      )}

      {isLoading ? (
        <div className="font-serif italic text-[13px]" style={{ color: 'var(--ink-3)' }}>Loading…</div>
      ) : !data?.length ? (
        <div className="font-serif italic text-[13px]" style={{ color: 'var(--ink-3)' }}>No sessions yet.</div>
      ) : (
        <div className="rounded-[6px] border overflow-hidden" style={{ borderColor: 'var(--hair)' }}>
          <table className="w-full text-left">
            <thead>
              <tr style={{ background: 'var(--paper-2)', borderBottom: '1px solid var(--hair)' }}>
                {['Session ID', 'Lead', 'Pages visited', 'Started'].map((h) => (
                  <th key={h} className="px-4 py-2.5 font-mono text-[9px] uppercase tracking-[0.08em]" style={{ color: 'var(--ink-4)' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((s, i) => (
                <tr
                  key={s.sessionId}
                  style={{ borderBottom: '1px solid var(--hair)', background: i % 2 === 0 ? 'var(--sheet)' : 'var(--paper-2)' }}
                >
                  <td className="px-4 py-2.5 font-mono text-[11px]" style={{ color: 'var(--ink-2)' }}>
                    {s.sessionId.slice(0, 16)}…
                  </td>
                  <td className="px-4 py-2.5 font-mono text-[10px]" style={{ color: s.leadId ? 'var(--forest-700)' : 'var(--ink-4)' }}>
                    {s.leadId ? s.leadId.slice(0, 12) + '…' : 'anonymous'}
                  </td>
                  <td className="px-4 py-2.5 font-sans text-[12px]" style={{ color: 'var(--ink-2)' }}>
                    <span className="font-mono text-[11px] mr-1.5" style={{ color: 'var(--ink-4)' }}>
                      {s.pageTrail.length}
                    </span>
                    <span style={{ color: 'var(--ink-3)' }}>
                      {s.pageTrail.slice(-2).join(' → ')}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 font-mono text-[10px]" style={{ color: 'var(--ink-4)' }}>
                    {new Date(s.createdAt).toLocaleString('en-NG', { dateStyle: 'short', timeStyle: 'short' })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
