import { useState } from 'react';
import { cn } from '../../utils/cn.js';

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export interface DateRangePickerProps {
  value?: DateRange;
  onChange?: (range: DateRange) => void;
  className?: string;
}

const PRESETS = [
  { label: 'Today',           days: 0 },
  { label: 'Last 7 days',     days: 7 },
  { label: 'Last 30 days',    days: 30 },
  { label: 'This quarter',    days: 90 },
  { label: 'Campaign to date',days: 180 },
  { label: 'Custom range',    days: -1 },
];

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];

interface CalendarGridProps {
  year: number;
  month: number;
  range: DateRange;
  onDayClick: (date: Date) => void;
}

function CalendarGrid({ year, month, range, onDayClick }: CalendarGridProps) {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const cells: (number | null)[] = Array(firstDay).fill(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  function isInRange(d: number) {
    if (!range.start || !range.end || d === null) return false;
    const date = new Date(year, month, d);
    return date > range.start && date < range.end;
  }

  function isStart(d: number) {
    if (!range.start) return false;
    const s = range.start;
    return s.getFullYear() === year && s.getMonth() === month && s.getDate() === d;
  }

  function isEnd(d: number) {
    if (!range.end) return false;
    const e = range.end;
    return e.getFullYear() === year && e.getMonth() === month && e.getDate() === d;
  }

  const rows: (number | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) rows.push(cells.slice(i, i + 7));

  return (
    <div>
      <div className="grid grid-cols-7 mb-1">
        {DAYS.map((d) => (
          <div key={d} className="text-center font-mono text-[10px] uppercase py-1" style={{ color: 'var(--ink-4)' }}>
            {d}
          </div>
        ))}
      </div>
      {rows.map((row, ri) => (
        <div key={ri} className="grid grid-cols-7">
          {row.map((d, ci) => {
            if (d === null) return <div key={ci} />;
            const selected = isStart(d) || isEnd(d);
            const inRange = isInRange(d);
            return (
              <button
                key={ci}
                onClick={() => onDayClick(new Date(year, month, d))}
                className={cn(
                  'h-8 w-full font-mono text-[12px] text-center transition-colors',
                  selected && 'rounded-[3px] font-medium text-white',
                  inRange && 'text-[var(--forest-800)]',
                  !selected && !inRange && 'hover:bg-[var(--paper-2)]',
                )}
                style={{
                  background: selected ? 'var(--forest-600)' : inRange ? 'var(--forest-50)' : undefined,
                  color: selected ? 'white' : undefined,
                }}
              >
                {d}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export function DateRangePicker({ value, onChange, className }: DateRangePickerProps) {
  const today = new Date();
  const [activePreset, setActivePreset] = useState<number>(1);
  const [range, setRange] = useState<DateRange>(value ?? { start: null, end: null });
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [picking, setPicking] = useState<'start' | 'end'>('start');

  function applyPreset(idx: number, days: number) {
    setActivePreset(idx);
    if (days < 0) return;
    if (days === 0) {
      const r: DateRange = { start: today, end: today };
      setRange(r);
      onChange?.(r);
    } else {
      const start = new Date(today);
      start.setDate(today.getDate() - days);
      const r: DateRange = { start, end: today };
      setRange(r);
      onChange?.(r);
    }
  }

  function handleDayClick(date: Date) {
    if (picking === 'start') {
      const r: DateRange = { start: date, end: null };
      setRange(r);
      setPicking('end');
    } else {
      const r: DateRange = range.start && date < range.start
        ? { start: date, end: range.start }
        : { start: range.start, end: date };
      setRange(r);
      onChange?.(r);
      setPicking('start');
    }
  }

  function prevMonth() {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  }

  function nextMonth() {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  }

  function fmt(d: Date | null) {
    if (!d) return '—';
    return d.toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  return (
    <div className={cn('flex rounded-[4px] border overflow-hidden', className)} style={{ borderColor: 'var(--hair)' }}>
      {/* Presets */}
      <div className="w-[160px] shrink-0 border-r py-2" style={{ borderColor: 'var(--hair)', background: 'var(--paper-2)' }}>
        {PRESETS.map((p, i) => (
          <button
            key={p.label}
            onClick={() => applyPreset(i, p.days)}
            className={cn(
              'w-full text-left px-4 py-2 font-sans text-[13px] transition-colors',
              activePreset === i
                ? 'font-medium'
                : 'hover:bg-[var(--paper-3)]',
            )}
            style={{ color: activePreset === i ? 'var(--forest-600)' : 'var(--ink-2)' }}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Calendar */}
      <div className="flex-1 flex flex-col">
        <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ borderColor: 'var(--hair)' }}>
          <button onClick={prevMonth} className="p-1 rounded hover:bg-[var(--paper-2)]" style={{ color: 'var(--ink-3)' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <div className="flex-1 text-center font-mono text-[11px] uppercase tracking-[0.1em]" style={{ color: 'var(--ink-2)' }}>
            {MONTH_NAMES[viewMonth]} {viewYear}
          </div>
          <button onClick={nextMonth} className="p-1 rounded hover:bg-[var(--paper-2)]" style={{ color: 'var(--ink-3)' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
        <div className="px-4 py-3 flex-1">
          <CalendarGrid year={viewYear} month={viewMonth} range={range} onDayClick={handleDayClick} />
        </div>
        <div className="flex items-center justify-between px-4 py-3 border-t" style={{ borderColor: 'var(--hair)', background: 'var(--paper-2)' }}>
          <div className="font-mono text-[11px]" style={{ color: 'var(--ink-3)' }}>
            {fmt(range.start)} → {fmt(range.end)}
          </div>
          <button
            className="font-sans text-[12px] px-3 py-1 rounded-[3px]"
            style={{ background: 'var(--forest-600)', color: 'white' }}
            onClick={() => range.start && range.end && onChange?.(range)}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
