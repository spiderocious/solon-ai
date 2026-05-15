import { OfficialStamp } from '@solon/ui';
import { SolonLogo } from '@ui/SolonLogo';
import { formatPct } from '@shared/helpers/format-pct';

const CANDIDATES = [
  { party: 'LP', candidate: 'Ifeanyi Okonkwo', share: 47.2, votes: 91_840, partyBg: 'var(--forest-600)', partyText: 'white', leading: true },
  { party: 'APC', candidate: 'Uchenna Nwosu', share: 22.1, votes: 43_040, partyBg: 'var(--ink)', partyText: 'var(--paper)', leading: false },
  { party: 'APGA', candidate: 'Emeka Eze', share: 18.4, votes: 35_824, partyBg: 'var(--paper-3)', partyText: 'var(--ink-2)', leading: false },
  { party: 'PDP', candidate: 'Adaeze Obi', share: 9.8, votes: 19_088, partyBg: 'var(--orange-soft)', partyText: 'var(--orange)', leading: false },
];

const PUS_REPORTING = 4;
const TOTAL_PUS = 412;
const REPORTING_PCT = ((PUS_REPORTING / TOTAL_PUS) * 100).toFixed(1);

export default function WarRoomPublicScreen() {
  return (
    <div className="p-5 md:p-8 flex flex-col gap-6 max-w-[720px]">
      {/* Results card */}
      <div className="rounded-[6px] overflow-hidden" style={{ border: '1px solid var(--ink)', background: 'var(--sheet)' }}>
        {/* Card header */}
        <div className="px-6 py-4 border-b flex items-center justify-between flex-wrap gap-3" style={{ borderColor: 'var(--ink)', background: 'var(--paper-2)' }}>
          <SolonLogo size="md" />
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.12em]" style={{ color: 'var(--ink-4)' }}>
              Public Results View
            </span>
            <OfficialStamp variant="simulation" meta="LIVE" />
          </div>
        </div>

        {/* Card body */}
        <div className="p-6">
          <h1 className="font-serif font-semibold text-[24px] md:text-[28px]" style={{ color: 'var(--ink)' }}>
            Anambra Central Senate
          </h1>
          <p className="font-serif italic text-[13px] mt-0.5 mb-6" style={{ color: 'var(--ink-3)' }}>
            — 2027 General Election · 20 February 2027
          </p>

          {/* Stacked full bar */}
          <div className="flex h-8 rounded-[3px] overflow-hidden mb-5">
            {CANDIDATES.map((c) => (
              <div
                key={c.party}
                className="flex items-center justify-center font-mono text-[10px] font-semibold shrink-0 overflow-hidden"
                style={{ flex: c.share, background: c.partyBg, color: c.partyText }}
              >
                {c.share > 12 ? `${c.party} ${c.share}%` : c.party}
              </div>
            ))}
          </div>

          {/* Candidate rows */}
          <div className="space-y-3">
            {CANDIDATES.map((c) => (
              <div key={c.party} className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-[4px] shrink-0 flex items-center justify-center font-mono text-[11px] font-bold"
                  style={{ background: c.partyBg, color: c.partyText }}
                >
                  {c.party}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-sans text-[13px] font-medium" style={{ color: 'var(--ink)' }}>{c.candidate}</div>
                  <div className="w-full h-1.5 rounded-full overflow-hidden mt-1" style={{ background: 'var(--hair)' }}>
                    <div className="h-full rounded-full" style={{ width: `${c.share}%`, background: c.partyBg }} />
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div
                    className="font-serif font-bold text-[20px]"
                    style={{ color: c.leading ? 'var(--forest-700)' : 'var(--ink-3)' }}
                  >
                    {formatPct(c.share)}
                  </div>
                  <div className="font-mono text-[10px]" style={{ color: 'var(--ink-4)' }}>
                    {c.votes.toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Card footer */}
        <div
          className="border-t px-6 py-3 flex items-center justify-between flex-wrap gap-2"
          style={{ borderColor: 'var(--hair)', background: 'var(--paper-2)' }}
        >
          <div className="font-mono text-[10px]" style={{ color: 'var(--ink-4)' }}>
            {PUS_REPORTING} of {TOTAL_PUS} PUs reporting · {REPORTING_PCT}% counted
          </div>
          <div className="font-mono text-[10px]" style={{ color: 'var(--forest-600)' }}>
            Powered by Solon Intelligence
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div
        className="rounded-[4px] px-4 py-3"
        style={{ background: 'var(--paper-2)', border: '1px solid var(--hair)' }}
      >
        <p className="font-serif italic text-[12px]" style={{ color: 'var(--ink-3)' }}>
          Results are preliminary and subject to formal INEC collation. This public view is generated by Solon Intelligence for transparency purposes only. Official results will be published by INEC.
        </p>
      </div>
    </div>
  );
}
