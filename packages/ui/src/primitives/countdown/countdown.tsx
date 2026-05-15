import { useEffect, useState } from 'react';
import { cn } from '../../utils/cn.js';

export interface CountdownProps {
  target: Date;
  label?: string;
  className?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
}

function calcTimeLeft(target: Date): TimeLeft {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  const seconds = Math.floor(diff / 1000) % 60;
  const minutes = Math.floor(diff / (1000 * 60)) % 60;
  const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  return { days, hours, minutes, seconds, expired: false };
}

function pad(n: number, digits = 2) {
  return String(n).padStart(digits, '0');
}

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="font-mono font-medium tabular-nums leading-none" style={{ fontSize: 64, color: 'var(--paper)' }}>
        {pad(value)}
      </div>
      <div className="font-mono text-[10px] uppercase tracking-[0.16em]" style={{ color: 'var(--ink-4)' }}>
        {label}
      </div>
    </div>
  );
}

export function Countdown({ target, label, className }: CountdownProps) {
  const [time, setTime] = useState<TimeLeft>(() => calcTimeLeft(target));

  useEffect(() => {
    const id = setInterval(() => setTime(calcTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  return (
    <div
      className={cn('rounded-[6px] px-10 py-8 flex flex-col items-center gap-6', className)}
      style={{ background: 'var(--ink)' }}
    >
      {label && (
        <div className="font-mono text-[10px] uppercase tracking-[0.16em]" style={{ color: 'var(--ink-4)' }}>
          {label}
        </div>
      )}
      {time.expired ? (
        <div className="font-mono text-[20px] uppercase tracking-[0.12em]" style={{ color: 'var(--paper)' }}>
          Election day
        </div>
      ) : (
        <div className="flex items-end gap-6">
          <Unit value={time.days} label="Days" />
          <div className="font-mono text-[40px] pb-7 leading-none" style={{ color: 'var(--ink-3)' }}>:</div>
          <Unit value={time.hours} label="Hours" />
          <div className="font-mono text-[40px] pb-7 leading-none" style={{ color: 'var(--ink-3)' }}>:</div>
          <Unit value={time.minutes} label="Min" />
          <div className="font-mono text-[40px] pb-7 leading-none" style={{ color: 'var(--ink-3)' }}>:</div>
          <Unit value={time.seconds} label="Sec" />
        </div>
      )}
    </div>
  );
}
