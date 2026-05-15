import { Avatar, OfficialStamp, StatusPill, TierChip } from '@solon/ui';

function Scene({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <div className="flex items-baseline gap-3 mb-4 pb-2 border-b" style={{ borderColor: 'var(--hair)' }}>
        <span className="font-sans text-[13px]" style={{ color: 'var(--ink-2)' }}>{title}</span>
        {subtitle && <span className="font-mono text-[10px]" style={{ color: 'var(--ink-4)' }}>{subtitle}</span>}
      </div>
      {children}
    </div>
  );
}

export function AvatarsScreen() {
  return (
    <div className="max-w-[760px]">
      <div className="mb-10 pb-6 border-b" style={{ borderColor: 'var(--hair)' }}>
        <div className="font-mono text-[10px] uppercase tracking-[0.14em] mb-1" style={{ color: 'var(--ink-4)' }}>25 / DATA &amp; STATE</div>
        <div className="font-serif font-semibold text-[36px] leading-tight" style={{ color: 'var(--ink)' }}>Avatars · pills · stamps</div>
        <div className="font-serif italic text-[14px] mt-1" style={{ color: 'var(--ink-3)' }}>— sober initials, hairlined pills, parliamentary stamps.</div>
      </div>

      <Scene title="Scene · avatars" subtitle="initials only · role tints for verified / flagged / admin">
        <div
          className="flex items-center gap-4 flex-wrap p-4 border rounded"
          style={{ borderColor: 'var(--hair)', background: 'var(--sheet)' }}
        >
          <Avatar initials="AO" size="sm" />
          <Avatar initials="CK" size="md" />
          <Avatar initials="CS" size="lg" />
          <Avatar initials="PE" size="xl" />

          <div className="w-px h-10 mx-2" style={{ background: 'var(--hair)' }} />

          <Avatar initials="SO" size="md" variant="forest" />
          <Avatar initials="??" size="md" variant="orange" />
          <Avatar initials="JS" size="md" variant="ink" />

          <div className="w-px h-10 mx-2" style={{ background: 'var(--hair)' }} />

          <span className="font-mono text-[11px]" style={{ color: 'var(--ink-3)' }}>
            Initials only. No stock photos. Role tints used for verified/flagged/admin.
          </span>
        </div>
      </Scene>

      <Scene title="Scene · person cards" subtitle="campaign team roster extract">
        <div className="flex flex-col gap-3">
          {/* Card 1 */}
          <div
            className="grid items-center gap-3 p-4 border rounded"
            style={{
              gridTemplateColumns: '44px 1fr auto',
              borderColor: 'var(--hair)',
              background: 'var(--sheet)',
            }}
          >
            <Avatar initials="CO" size="lg" variant="forest" />
            <div>
              <div className="font-sans font-medium text-[14px]" style={{ color: 'var(--ink)' }}>Chinwe Obi</div>
              <div className="font-sans text-[12px]" style={{ color: 'var(--ink-3)' }}>Campaign Manager · Anambra Central · verified</div>
            </div>
            <StatusPill variant="ok" label="Verified" />
          </div>

          {/* Card 2 */}
          <div
            className="grid items-center gap-3 p-4 border rounded"
            style={{
              gridTemplateColumns: '44px 1fr auto',
              borderColor: 'var(--hair)',
              background: 'var(--sheet)',
            }}
          >
            <Avatar initials="EM" size="lg" />
            <div>
              <div className="font-sans font-medium text-[14px]" style={{ color: 'var(--ink)' }}>Emeka Mbachu</div>
              <div className="font-sans text-[12px]" style={{ color: 'var(--ink-3)' }}>Ward Coordinator · ward 4 · pending stipend</div>
            </div>
            <StatusPill variant="warn" label="Pending" />
          </div>

          {/* Card 3 */}
          <div
            className="grid items-center gap-3 p-4 border rounded"
            style={{
              gridTemplateColumns: '44px 1fr auto',
              borderColor: 'var(--hair)',
              background: 'var(--sheet)',
            }}
          >
            <Avatar initials="??" size="lg" variant="orange" />
            <div>
              <div className="font-sans font-medium text-[14px]" style={{ color: 'var(--ink)' }}>Anonymous agent</div>
              <div className="font-sans text-[12px]" style={{ color: 'var(--ink-3)' }}>PU 008-04-09 · selfie verification failed</div>
            </div>
            <StatusPill variant="crit" label="Blocked" />
          </div>
        </div>
      </Scene>

      <Scene title="Scene · pills & status idioms" subtitle="all pill variants + tier chips">
        <div className="border rounded p-4 flex flex-col gap-4" style={{ borderColor: 'var(--hair)', background: 'var(--sheet)' }}>
          <div className="flex flex-wrap gap-2">
            <StatusPill variant="ok" label="Verified" />
            <StatusPill variant="warn" label="Flagged" />
            <StatusPill variant="crit" label="Voided" />
            <StatusPill variant="info" label="Citizen-source" />
            <StatusPill variant="ink" label="Admin" />
            <StatusPill variant="quiet" label="Draft" />
          </div>
          <div className="h-px" style={{ background: 'var(--hair)' }} />
          <div className="flex flex-wrap gap-2">
            <TierChip tier="hold-strong" />
            <TierChip tier="hold" />
            <TierChip tier="toss" />
            <TierChip tier="opp" />
            <TierChip tier="opp-strong" />
          </div>
        </div>
      </Scene>

      <Scene title="Scene · official stamps" subtitle="rotated border stamps for audit trail">
        <div
          className="border rounded p-6 flex flex-wrap gap-8 items-center"
          style={{ borderColor: 'var(--hair)', background: 'var(--sheet)' }}
        >
          <OfficialStamp variant="verified" meta="008-04-02" />
          <OfficialStamp variant="simulation" meta="2026-05-11" />
          <OfficialStamp variant="void" meta="AUDIT #4421" />
          <OfficialStamp variant="citizen" />
        </div>
      </Scene>
    </div>
  );
}
