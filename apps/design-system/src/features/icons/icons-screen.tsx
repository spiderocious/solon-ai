import type { ReactNode } from 'react';

function SectionBreak({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-5 mt-8">
      <span className="font-mono text-[10px] uppercase tracking-[0.14em] shrink-0" style={{ color: 'var(--ink-4)' }}>{label}</span>
      <div className="flex-1 h-px" style={{ background: 'var(--hair)' }} />
    </div>
  );
}

interface IconDef { name: string; path: ReactNode }

const ICONS: IconDef[] = [
  { name: 'check',       path: <path d="M3 12l3-3 3 3 9-9"/> },
  { name: 'close',       path: <><path d="M5 5l14 14M19 5L5 19"/></> },
  { name: 'add',         path: <path d="M5 12h14M12 5v14"/> },
  { name: 'search',      path: <><circle cx="11" cy="11" r="6"/><path d="M16 16l4 4"/></> },
  { name: 'filter',      path: <path d="M4 6h16M4 12h10M4 18h16"/> },
  { name: 'time',        path: <><circle cx="12" cy="12" r="9"/><path d="M12 7v6l4 2"/></> },
  { name: 'mail',        path: <><path d="M4 6l12 8-12 8z"/><path d="M4 6h16v12H4z"/></> },
  { name: 'play',        path: <path d="M6 4l12 8-12 8z"/> },
  { name: 'office',      path: <path d="M4 20h16M6 20V10l6-6 6 6v10M10 20v-6h4v6"/> },
  { name: 'flag',        path: <><path d="M12 3l3 3v6l-3 3-3-3V6z"/><path d="M3 21h18"/><path d="M7 21l5-3 5 3"/></> },
  { name: 'alert',       path: <><circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 17v.5"/></> },
  { name: 'verified',    path: <><circle cx="12" cy="12" r="9"/><path d="M9 12l2 2 4-4"/></> },
  { name: 'date',        path: <><rect x="3" y="5" width="18" height="14" rx="1"/><path d="M3 9h18M8 5V3M16 5V3"/></> },
  { name: 'download',    path: <><path d="M12 3v14M6 11l6 6 6-6"/><path d="M5 21h14"/></> },
  { name: 'archive',     path: <path d="M5 7h14v12H5zM9 7V5h6v2"/> },
  { name: 'person',      path: <><circle cx="12" cy="9" r="3"/><path d="M5 21c0-4 3-7 7-7s7 3 7 7"/></> },
  { name: 'ballot',      path: <><path d="M3 6h18l-2 12H5z"/><path d="M9 6V4h6v2"/></> },
  { name: 'polling unit',path: <><path d="M3 21V11l9-7 9 7v10"/><path d="M9 21v-7h6v7"/></> },
  { name: 'map pin',     path: <><circle cx="12" cy="10" r="7"/><path d="M5 22l4-4M19 22l-4-4"/></> },
  { name: 'scenario',    path: <><path d="M3 4l9 8-9 8z"/><path d="M14 4v16"/><path d="M14 4l7 8-7 8"/></> },
  { name: 'national',    path: <><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18"/></> },
  { name: 'party',       path: <><path d="M4 20V8l8-5 8 5v12"/><path d="M9 20v-6h6v6"/></> },
  { name: 'report',      path: <><path d="M4 6h16v12H4z"/><path d="M4 10h16M9 14h6"/></> },
  { name: 'monitor',     path: <><path d="M3 12c2-4 6-7 9-7s7 3 9 7c-2 4-6 7-9 7s-7-3-9-7z"/><circle cx="12" cy="12" r="3"/></> },
];

function Icon({ paths, stroke = 'var(--ink)', size = 22 }: { paths: ReactNode; stroke?: string; size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke={stroke}
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths}
    </svg>
  );
}

export function IconsScreen() {
  return (
    <div className="max-w-[760px]">
      <div className="mb-10 pb-6 border-b" style={{ borderColor: 'var(--hair)' }}>
        <div className="font-mono text-[10px] uppercase tracking-[0.14em] mb-1" style={{ color: 'var(--ink-4)' }}>05 / FOUNDATION</div>
        <div className="font-serif font-semibold text-[36px] leading-tight" style={{ color: 'var(--ink)' }}>Iconography</div>
        <div className="font-serif italic text-[14px] mt-1" style={{ color: 'var(--ink-3)' }}>— single-stroke line, 1.4px, 22px on a 24-grid.</div>
        <div className="font-mono text-[10px] mt-3" style={{ color: 'var(--ink-4)' }}>SOLON · v 0.1</div>
      </div>

      <p className="font-serif italic text-[14px] leading-relaxed mb-8 max-w-[70ch]" style={{ color: 'var(--ink-3)' }}>
        Icons are single-stroke linework, drawn at 1.4px on a 24px grid. They never carry fills. The check, the cross, the alert, and the verified-stamp are the only glyphs that ever receive colour — and only when paired with a state.
      </p>

      <SectionBreak label="Set" />
      <div className="grid grid-cols-6 gap-2 mb-2">
        {ICONS.map(({ name, path }) => (
          <div
            key={name}
            className="flex flex-col items-center gap-2 py-4 px-2 rounded-[4px] border"
            style={{ borderColor: 'var(--hair)' }}
          >
            <Icon paths={path} />
            <span className="font-mono text-[9px] text-center leading-tight" style={{ color: 'var(--ink-4)' }}>{name}</span>
          </div>
        ))}
      </div>

      <SectionBreak label="When icons take colour" />
      <div className="grid grid-cols-2 gap-5">
        <div className="p-5 rounded-[4px] border" style={{ borderColor: 'var(--hair)' }}>
          <div className="font-sans font-semibold text-[12px] mb-4" style={{ color: 'var(--ink)' }}>Forest · signed / verified / hold</div>
          {[
            { paths: <><circle cx="12" cy="12" r="9"/><path d="M9 12l2 2 4-4"/></>, text: 'Agent verified — selfie + geotag matched.' },
            { paths: <path d="M3 12l3-3 3 3 9-9"/>,                                text: 'Form EC8A reconciled across two sources.' },
            { paths: <><path d="M12 3l3 3v6l-3 3-3-3V6z"/></>,                    text: 'Polling unit marked as Lean hold.' },
          ].map(({ paths, text }) => (
            <div key={text} className="flex items-start gap-3 mb-3">
              <span className="shrink-0 mt-0.5"><Icon paths={paths} stroke="var(--forest-600)" size={18} /></span>
              <span className="font-sans text-[12px] leading-relaxed" style={{ color: 'var(--ink-2)' }}>{text}</span>
            </div>
          ))}
        </div>
        <div className="p-5 rounded-[4px] border" style={{ borderColor: 'var(--hair)' }}>
          <div className="font-sans font-semibold text-[12px] mb-4" style={{ color: 'var(--ink)' }}>Orange · warn / toss-up / flagged</div>
          {[
            { paths: <><circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 17v.5"/></>, text: 'Severity-3 incident reported at PU 008-04-09.' },
            { paths: <path d="M3 6h18l-2 12H5z"/>,                                     text: 'Donor screening flagged a round-number cash entry.' },
            { paths: <path d="M4 6h16M4 12h10M4 18h16"/>,                              text: 'Spend approaching 75% of INEC sub-cap.' },
          ].map(({ paths, text }) => (
            <div key={text} className="flex items-start gap-3 mb-3">
              <span className="shrink-0 mt-0.5"><Icon paths={paths} stroke="var(--orange)" size={18} /></span>
              <span className="font-sans text-[12px] leading-relaxed" style={{ color: 'var(--ink-2)' }}>{text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
