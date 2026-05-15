import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from '../recharts/index';

export interface SpendingCategory {
  name: string;
  amount: number;
  color?: string;
}

export interface SpendingBreakdownProps {
  categories: SpendingCategory[];
  totalBudget?: number;
  className?: string;
}

const DEFAULT_COLORS = [
  'var(--forest-600)',
  'var(--forest-400, #4ade80)',
  'var(--ink)',
  'var(--paper-3, #D8D3C8)',
  'var(--orange)',
  'var(--crit, #ef4444)',
];

export function SpendingBreakdown({ categories, totalBudget, className }: SpendingBreakdownProps) {
  const total = categories.reduce((s, c) => s + c.amount, 0);

  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={categories}
            dataKey="amount"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={52}
            outerRadius={84}
            paddingAngle={2}
          >
            {categories.map((c, i) => (
              <Cell key={c.name} fill={c.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ fontFamily: 'var(--font-mono)', fontSize: 11, border: '1px solid var(--hair)', borderRadius: 4, background: 'var(--paper)' }}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            formatter={((v: unknown, name: unknown) => [
              new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format((v as number) / 100),
              name as string,
            ]) as any}
          />
          <Legend
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink-3)' }}
          />
        </PieChart>
      </ResponsiveContainer>
      {totalBudget != null && (
        <div className="mt-2 font-mono text-[10px] text-center" style={{ color: 'var(--ink-4)' }}>
          {((total / totalBudget) * 100).toFixed(0)}% of total budget spent
        </div>
      )}
    </div>
  );
}
