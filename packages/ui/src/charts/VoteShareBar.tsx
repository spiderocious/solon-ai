import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LabelList } from '../recharts/index';
import { ConfidenceBar } from '../display/confidence-bar/index.js';
import type { ConfidenceLevel } from '../display/confidence-bar/index.js';

export interface VoteShareEntry {
  party: string;
  share: number;
  color?: string;
}

export interface VoteShareBarProps {
  entries: VoteShareEntry[];
  title?: string;
  subtitle?: string;
  confidence?: number;
  margin?: string;
  className?: string;
}

const PARTY_COLORS: Record<string, string> = {
  LP: 'var(--forest-600)',
  APC: 'var(--ink)',
  APGA: 'var(--paper-3, #D8D3C8)',
  PDP: '#FFF3E0',
  DEFAULT: 'var(--paper-2)',
};

export function VoteShareBar({ entries, title, subtitle, confidence, className }: VoteShareBarProps) {
  return (
    <div className={className}>
      {title && (
        <h3 className="font-serif italic text-[18px] mb-1" style={{ color: 'var(--ink)' }}>
          {title}
          {subtitle && (
            <span className="font-serif not-italic text-[14px] ml-2" style={{ color: 'var(--ink-3)' }}>
              — {subtitle}
            </span>
          )}
        </h3>
      )}

      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={entries} layout="vertical" margin={{ top: 4, right: 48, left: 0, bottom: 4 }}>
          <XAxis type="number" domain={[0, 100]} hide />
          <YAxis
            type="category"
            dataKey="party"
            width={44}
            tick={{ fontFamily: 'var(--font-mono)', fontSize: 11, fill: 'var(--ink-3)' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            cursor={{ fill: 'var(--paper-2)' }}
            contentStyle={{ fontFamily: 'var(--font-mono)', fontSize: 11, border: '1px solid var(--hair)', borderRadius: 4, background: 'var(--paper)' }}
            formatter={(v: unknown) => [`${(v as number).toFixed(1)}%`, 'share'] as [string, string]}
          />
          <Bar dataKey="share" radius={[0, 3, 3, 0]} maxBarSize={32}>
            {entries.map((e) => (
              <Cell key={e.party} fill={e.color ?? PARTY_COLORS[e.party] ?? PARTY_COLORS.DEFAULT} />
            ))}
            <LabelList
              dataKey="share"
              position="right"
              formatter={(v: unknown) => `${(v as number).toFixed(1)}%`}
              style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fill: 'var(--ink-3)' }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {confidence != null && (
        <div className="flex items-center gap-3 mt-2">
          <span className="font-sans text-[11px]" style={{ color: 'var(--ink-4)' }}>Confidence:</span>
          <ConfidenceBar level={confidence as ConfidenceLevel} />
        </div>
      )}
    </div>
  );
}
