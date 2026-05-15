import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from '../recharts/index';

export interface TallySnapshot {
  time: string;
  lp: number;
  apc: number;
  pdp: number;
  reported: number;
}

export interface TallyTickerProps {
  snapshots: TallySnapshot[];
  totalPUs: number;
  className?: string;
}

export function TallyTicker({ snapshots, totalPUs, className }: TallyTickerProps) {
  const latest = snapshots[snapshots.length - 1];

  return (
    <div className={className}>
      {latest && (
        <div className="flex items-center gap-6 mb-3">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.1em] mb-0.5" style={{ color: 'var(--ink-4)' }}>LP</div>
            <div className="font-serif font-semibold text-[22px]" style={{ color: 'var(--forest-600)' }}>{latest.lp.toFixed(1)}%</div>
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.1em] mb-0.5" style={{ color: 'var(--ink-4)' }}>APC</div>
            <div className="font-serif font-semibold text-[22px]" style={{ color: 'var(--ink)' }}>{latest.apc.toFixed(1)}%</div>
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.1em] mb-0.5" style={{ color: 'var(--ink-4)' }}>PDP</div>
            <div className="font-serif font-semibold text-[22px]" style={{ color: 'var(--orange)' }}>{latest.pdp.toFixed(1)}%</div>
          </div>
          <div className="ml-auto text-right">
            <div className="font-mono text-[10px] uppercase tracking-[0.1em] mb-0.5" style={{ color: 'var(--ink-4)' }}>Reported</div>
            <div className="font-serif font-semibold text-[18px]" style={{ color: 'var(--ink-2)' }}>
              {latest.reported}<span className="text-[13px] font-normal"> / {totalPUs}</span>
            </div>
          </div>
        </div>
      )}

      <ResponsiveContainer width="100%" height={160}>
        <AreaChart data={snapshots} margin={{ top: 4, right: 8, left: 0, bottom: 4 }}>
          <defs>
            <linearGradient id="lpGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--forest-600)" stopOpacity={0.18} />
              <stop offset="95%" stopColor="var(--forest-600)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--hair)" vertical={false} />
          <XAxis
            dataKey="time"
            tick={{ fontFamily: 'var(--font-mono)', fontSize: 9, fill: 'var(--ink-4)' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fontFamily: 'var(--font-mono)', fontSize: 9, fill: 'var(--ink-4)' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${v}%`}
            width={32}
          />
          <Tooltip
            contentStyle={{ fontFamily: 'var(--font-mono)', fontSize: 10, border: '1px solid var(--hair)', borderRadius: 4, background: 'var(--paper)' }}
            formatter={(v: unknown, name: unknown) => [`${(v as number).toFixed(1)}%`, String(name).toUpperCase()] as [string, string]}
          />
          <Area type="monotone" dataKey="lp" stroke="var(--forest-600)" strokeWidth={2} fill="url(#lpGrad)" dot={false} />
          <Area type="monotone" dataKey="apc" stroke="var(--ink)" strokeWidth={1.4} strokeDasharray="4 3" fill="none" dot={false} />
          <Area type="monotone" dataKey="pdp" stroke="var(--orange)" strokeWidth={1.4} strokeDasharray="4 3" fill="none" dot={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
