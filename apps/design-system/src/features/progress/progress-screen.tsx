import { ConfidenceBar } from '@solon/ui';

function Scene({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <div className="flex items-baseline gap-3 mb-4 pb-2 border-b" style={{ borderColor: 'var(--hair)' }}>
        <span className="font-sans text-[13px]" style={{ color: 'var(--ink-2)' }}>{title}</span>
        {subtitle && <span className="font-mono text-[10px]" style={{ color: 'var(--ink-4)' }}>{subtitle}</span>}
      </div>
      {children}
    </div>
  );
}

type BarLineProps = {
  name: string;
  sub: string;
  pct: number;
  warn?: boolean;
  value: string;
};

function BarLine({ name, sub, pct, warn, value }: BarLineProps) {
  const fillColor = warn ? 'var(--orange)' : 'var(--forest-600)';
  return (
    <div className="grid items-center gap-x-3" style={{ gridTemplateColumns: '180px 1fr 100px' }}>
      <div className="flex flex-col gap-0.5 min-w-0">
        <span className="font-sans text-[13px] truncate" style={{ color: 'var(--ink-2)' }}>{name}</span>
        <span className="font-mono text-[10px]" style={{ color: 'var(--ink-4)' }}>{sub}</span>
      </div>
      <div className="relative h-2 rounded-full" style={{ background: 'var(--hair)' }}>
        <div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ width: `${pct}%`, background: fillColor }}
        />
        {/* Cap marker at 75% */}
        <div
          className="absolute inset-y-0"
          style={{ left: '75%', width: '2px', background: 'var(--ink-3)', transform: 'translateX(-50%)' }}
        />
      </div>
      <span className="font-mono text-[11px] text-right" style={{ color: warn ? 'var(--orange)' : 'var(--ink-2)' }}>
        {value}
      </span>
    </div>
  );
}

const CIRCUMFERENCE = 2 * Math.PI * 36; // ≈ 226.2

type DonutProps = {
  pct: number;
  color: string;
  label: string;
  trackColor?: string;
};

function Donut({ pct, color, label, trackColor }: DonutProps) {
  const offset = CIRCUMFERENCE * (1 - pct / 100);
  return (
    <div className="flex flex-col items-center gap-2">
      <svg width={88} height={88} style={{ transform: 'rotate(-90deg)' }}>
        <circle
          cx={44}
          cy={44}
          r={36}
          fill="none"
          stroke={trackColor ?? 'var(--hair)'}
          strokeWidth={10}
        />
        <circle
          cx={44}
          cy={44}
          r={36}
          fill="none"
          stroke={color}
          strokeWidth={10}
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className="flex flex-col items-center" style={{ marginTop: '-4px' }}>
        <span className="font-mono text-[18px] font-semibold" style={{ color: 'var(--ink)' }}>{pct}%</span>
        <span className="font-mono text-[10px] text-center max-w-[80px]" style={{ color: 'var(--ink-3)' }}>{label}</span>
      </div>
    </div>
  );
}

export function ProgressScreen() {
  return (
    <div className="max-w-[760px]">
      {/* Page header */}
      <div className="mb-10 pb-6 border-b" style={{ borderColor: 'var(--hair)' }}>
        <div className="font-mono text-[10px] uppercase tracking-[0.14em] mb-1" style={{ color: 'var(--ink-4)' }}>
          23 / DATA & STATE
        </div>
        <div className="font-serif font-semibold text-[36px] leading-tight" style={{ color: 'var(--ink)' }}>
          Progress & confidence
        </div>
        <div className="font-serif italic text-[14px] mt-1" style={{ color: 'var(--ink-3)' }}>
          — linear bars, donuts, segment gauge.
        </div>
      </div>

      {/* Scene 1 — INEC compliance */}
      <Scene title="Scene · INEC compliance · spend vs cap">
        <div className="flex flex-col gap-4">
          <BarLine
            name="Total spend"
            sub="vs ₦ 4.0bn statutory cap"
            pct={52}
            value="₦ 2.07bn · 52%"
          />
          <BarLine
            name="Media"
            sub="vs ₦ 1.2bn sub-cap"
            pct={78}
            warn
            value="₦ 936m · 78%"
          />
          <BarLine
            name="Transport · logistics"
            sub="vs ₦ 800m"
            pct={41}
            value="₦ 328m · 41%"
          />
          <BarLine
            name="Personnel · stipends"
            sub="vs ₦ 600m"
            pct={64}
            value="₦ 384m · 64%"
          />
          <BarLine
            name="Materials"
            sub="vs ₦ 400m"
            pct={28}
            value="₦ 112m · 28%"
          />
        </div>
        <div className="mt-4 flex items-center gap-2 font-mono text-[10px]" style={{ color: 'var(--ink-4)' }}>
          <div className="w-px h-3" style={{ background: 'var(--ink-3)' }} />
          Cap marker at 75% of each sub-budget
        </div>
      </Scene>

      {/* Scene 2 — election-day coverage donuts */}
      <Scene title="Scene · election-day coverage donuts">
        <div className="flex gap-8 flex-wrap">
          <Donut pct={78} color="var(--forest-600)" label="Agents verified" />
          <Donut pct={64} color="var(--forest-600)" label="PU staffed" />
          <Donut pct={38} color="var(--orange)" label="Form EC8A submitted" />
          <Donut pct={22} color="var(--forest-700)" trackColor="#14342A" label="Reconciled" />
        </div>
      </Scene>

      {/* Scene 3 — model confidence gauge */}
      <Scene title="Scene · model confidence gauge · per projection">
        <div className="flex flex-col gap-4">
          {/* Card 1 */}
          <div className="p-4 rounded-[6px] border" style={{ borderColor: 'var(--hair)' }}>
            <div className="font-mono text-[10px] uppercase tracking-[0.1em] mb-2" style={{ color: 'var(--ink-4)' }}>
              Anambra Central · senate · baseline
            </div>
            <p className="font-serif text-[13px] leading-relaxed mb-3" style={{ color: 'var(--ink-3)' }}>
              Confidence is medium-high — model has dense 2023 PU coverage and a robust radio-call-in corpus.
            </p>
            <ConfidenceBar level={4} label="Medium-high · n=412 PU" />
          </div>

          {/* Card 2 */}
          <div className="p-4 rounded-[6px] border" style={{ borderColor: 'var(--hair)' }}>
            <div className="font-mono text-[10px] uppercase tracking-[0.1em] mb-2" style={{ color: 'var(--ink-4)' }}>
              Lagos East · senate · baseline
            </div>
            <p className="font-serif text-[13px] leading-relaxed mb-3" style={{ color: 'var(--ink-3)' }}>
              Confidence is medium — limited polling-unit-level voter rolls; LP–APC swing is structurally noisy.
            </p>
            <ConfidenceBar level={3} label="Medium · n=584 PU" />
          </div>

          {/* Card 3 — flagged */}
          <div className="p-4 rounded-[6px] border" style={{ borderColor: 'var(--orange)', background: '#FFF3E0' }}>
            <div className="font-mono text-[10px] uppercase tracking-[0.1em] mb-2" style={{ color: 'var(--orange)' }}>
              Zamfara North · senate · Soludo-equivalent scenario
            </div>
            <p className="font-serif text-[13px] leading-relaxed mb-3" style={{ color: 'var(--orange)' }}>
              Low confidence. You're asking the model to apply a Soludo-coalition pattern outside its trained context
              (south-east); flagged for caution.
            </p>
            <ConfidenceBar level={1} warn label="Low · do not export" />
          </div>
        </div>
      </Scene>
    </div>
  );
}
