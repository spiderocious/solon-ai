import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from '../recharts/index';

export interface TurnoutGaugeProps {
  projected: number;
  target: number;
  historical?: number;
  label?: string;
  className?: string;
}

export function TurnoutGauge({ projected, target, historical, label, className }: TurnoutGaugeProps) {
  const pct = Math.min(100, Math.round(projected));
  const targetPct = Math.min(100, Math.round(target));
  const delta = projected - (historical ?? target);
  const deltaSign = delta >= 0 ? '+' : '';
  const deltaColor = delta >= 0 ? 'var(--forest-600)' : 'var(--orange)';

  return (
    <div className={`flex flex-col items-center ${className ?? ''}`}>
      {label && (
        <div className="font-mono text-[10px] uppercase tracking-[0.1em] mb-2" style={{ color: 'var(--ink-4)' }}>
          {label}
        </div>
      )}
      <div className="relative" style={{ width: 160, height: 100 }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            cx="50%"
            cy="100%"
            innerRadius={60}
            outerRadius={100}
            barSize={12}
            startAngle={180}
            endAngle={0}
            data={[
              { value: targetPct, fill: 'var(--paper-3, #D8D3C8)' },
              { value: pct, fill: 'var(--forest-600)' },
            ]}
          >
            <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
            <RadialBar background dataKey="value" cornerRadius={6} />
          </RadialBarChart>
        </ResponsiveContainer>
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center"
          style={{ lineHeight: 1 }}
        >
          <div className="font-serif font-semibold text-[28px]" style={{ color: 'var(--ink)' }}>
            {pct}%
          </div>
          {historical != null && (
            <div className="font-mono text-[10px] mt-0.5" style={{ color: deltaColor }}>
              {deltaSign}{delta.toFixed(1)} pts
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-4 mt-3">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'var(--forest-600)' }} />
          <span className="font-mono text-[10px]" style={{ color: 'var(--ink-3)' }}>projected</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'var(--paper-3, #D8D3C8)', border: '1px solid var(--hair)' }} />
          <span className="font-mono text-[10px]" style={{ color: 'var(--ink-3)' }}>target</span>
        </div>
      </div>
    </div>
  );
}
