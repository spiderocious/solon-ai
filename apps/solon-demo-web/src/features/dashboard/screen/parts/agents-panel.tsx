import { StatCard } from './stat-card';

interface AgentsPanelProps {
  readonly agentsCoverage: number;
  readonly agentsTotal: number;
  readonly agentsActive: number;
}

export function AgentsPanel({ agentsCoverage, agentsTotal, agentsActive }: AgentsPanelProps) {
  const inactive = agentsTotal - agentsActive;
  const coverageColor = agentsCoverage >= 80
    ? 'var(--forest-600)'
    : agentsCoverage >= 60
      ? 'var(--ink-2)'
      : 'var(--orange)';

  return (
    <StatCard label="Agent network">
      {/* Coverage number */}
      <div className="flex items-baseline gap-2 mb-3">
        <span className="font-serif font-bold text-[40px] leading-none" style={{ color: coverageColor }}>
          {agentsCoverage}%
        </span>
        <span className="font-sans text-[12px] mb-1" style={{ color: 'var(--ink-3)' }}>PU coverage</span>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 rounded-full overflow-hidden mb-4" style={{ background: 'var(--hair)' }}>
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${agentsCoverage}%`, background: coverageColor }}
        />
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: 'Total', value: agentsTotal, color: 'var(--ink-2)' },
          { label: 'Active', value: agentsActive, color: 'var(--forest-700)' },
          { label: 'Inactive', value: inactive, color: inactive > 20 ? 'var(--orange)' : 'var(--ink-3)' },
        ].map(({ label, value, color }) => (
          <div key={label} className="text-center">
            <div className="font-serif font-semibold text-[22px]" style={{ color }}>{value}</div>
            <div className="font-mono text-[9px] uppercase" style={{ color: 'var(--ink-4)' }}>{label}</div>
          </div>
        ))}
      </div>
    </StatCard>
  );
}
