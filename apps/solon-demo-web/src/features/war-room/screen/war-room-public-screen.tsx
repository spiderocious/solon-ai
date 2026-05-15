import { SolonLogo } from '@ui/SolonLogo';
import { formatPct } from '@shared/helpers/format-pct';

export default function WarRoomPublicScreen() {
  return (
    <div className="flex flex-col gap-6 max-w-[640px]">
      <div
        className="rounded-2xl p-8"
        style={{ background: 'var(--paper)', border: '1px solid var(--hair)' }}
      >
        <div className="flex items-center justify-between mb-6">
          <SolonLogo size="md" />
          <div className="font-mono text-[10px] uppercase tracking-[0.12em]" style={{ color: 'var(--ink-4)' }}>
            Public Results View
          </div>
        </div>

        <h1 className="font-serif font-semibold text-[28px] mb-1" style={{ color: 'var(--ink)' }}>
          Anambra Central Senate
        </h1>
        <div className="font-sans text-[13px] mb-8" style={{ color: 'var(--ink-3)' }}>
          2027 General Election · Live results
        </div>

        <div className="flex flex-col gap-3">
          {[
            { party: 'LP', candidate: 'Ifeanyi Okonkwo', share: 47.2, votes: 91_840, color: 'var(--forest-600)', leading: true },
            { party: 'APC', candidate: 'Uchenna Nwosu', share: 22.1, votes: 43_040, color: 'var(--ink)', leading: false },
            { party: 'APGA', candidate: 'Emeka Eze', share: 18.4, votes: 35_824, color: 'var(--paper-3, #D8D3C8)', leading: false },
            { party: 'PDP', candidate: 'Adaeze Obi', share: 9.8, votes: 19_088, color: '#FFF3E0', leading: false },
          ].map((c) => (
            <div key={c.party} className="flex items-center gap-3">
              <div className="w-12 font-mono text-[11px] font-medium" style={{ color: 'var(--ink-3)' }}>{c.party}</div>
              <div className="flex-1 relative">
                <div className="w-full rounded-full overflow-hidden" style={{ height: '28px', background: 'var(--paper-2)' }}>
                  <div
                    className="h-full rounded-full flex items-center px-3 font-mono text-[11px]"
                    style={{
                      width: `${c.share}%`,
                      background: c.color,
                      color: c.leading ? 'white' : 'var(--ink-2)',
                      border: '1px solid var(--hair)',
                    }}
                  >
                    {c.candidate}
                  </div>
                </div>
              </div>
              <div className="text-right w-24">
                <div className="font-serif font-semibold text-[18px]" style={{ color: c.leading ? 'var(--forest-600)' : 'var(--ink-3)' }}>
                  {formatPct(c.share)}
                </div>
                <div className="font-mono text-[10px]" style={{ color: 'var(--ink-4)' }}>
                  {c.votes.toLocaleString()} votes
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t flex items-center justify-between" style={{ borderColor: 'var(--hair)' }}>
          <div className="font-mono text-[10px]" style={{ color: 'var(--ink-4)' }}>
            4 of 412 PUs reporting · 1.9% counted
          </div>
          <div className="font-mono text-[10px]" style={{ color: 'var(--forest-600)' }}>
            Powered by Solon Intelligence
          </div>
        </div>
      </div>
    </div>
  );
}
