interface SwatchDef {
  label: string;
  value: string;
  bg: string;
  dark: boolean;
  textColor?: string;
}

function Swatch({ label, value, bg, dark, textColor }: SwatchDef) {
  const headColor = textColor ?? (dark ? '#F5EFE0' : '#1A1714');
  const valColor  = textColor ?? (dark ? 'rgba(245,239,224,0.6)' : '#6B6555');
  return (
    <div
      className="h-[88px] rounded-[4px] flex flex-col justify-end p-3 border"
      style={{ background: bg, borderColor: 'var(--hair)' }}
    >
      <span className="font-sans font-medium text-[11px] leading-tight" style={{ color: headColor }}>{label}</span>
      <span className="font-mono text-[9.5px] leading-tight mt-0.5" style={{ color: valColor }}>{value}</span>
    </div>
  );
}

function SwatchRow({ swatches }: { swatches: SwatchDef[] }) {
  return (
    <div className="grid grid-cols-5 gap-2 mb-3">
      {swatches.map((s) => <Swatch key={s.label} {...s} />)}
    </div>
  );
}

function SectionBreak({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-5 mt-8">
      <span className="font-mono text-[10px] uppercase tracking-[0.14em] shrink-0" style={{ color: 'var(--ink-4)' }}>{label}</span>
      <div className="flex-1 h-px" style={{ background: 'var(--hair)' }} />
    </div>
  );
}

export function PaletteScreen() {
  return (
    <div className="max-w-[760px]">
      <div className="mb-10 pb-6 border-b" style={{ borderColor: 'var(--hair)' }}>
        <div className="font-mono text-[10px] uppercase tracking-[0.14em] mb-1" style={{ color: 'var(--ink-4)' }}>01 / FOUNDATION</div>
        <div className="font-serif font-semibold text-[36px] leading-tight" style={{ color: 'var(--ink)' }}>Palette</div>
        <div className="font-serif italic text-[14px] mt-1" style={{ color: 'var(--ink-3)' }}>— cream paper, forest ink, orange reserved.</div>
        <div className="font-mono text-[10px] mt-3" style={{ color: 'var(--ink-4)' }}>SOLON · v 0.1</div>
      </div>

      <p className="font-serif italic text-[14px] leading-relaxed mb-8 max-w-[68ch]" style={{ color: 'var(--ink-3)' }}>
        Solon runs on a single canvas — a cream order-paper warmer than office white, with a near-black warm ink. Forest green is the one interactive accent: links, primary CTAs, focus, charted hold-tier rows. Burnt orange is reserved for warnings; oxblood is reserved for irreversible critical. Nothing else is allowed to colour the chrome.
      </p>

      <SectionBreak label="Paper · ink" />
      <SwatchRow swatches={[
        { label: 'Sheet',   value: '#FBF6E7',           bg: '#FBF6E7', dark: false },
        { label: 'Paper',   value: '#F5EFE0 · canvas',  bg: '#F5EFE0', dark: false },
        { label: 'Paper 2', value: '#EFE7D2',           bg: '#EFE7D2', dark: false },
        { label: 'Paper 3', value: '#E6DCC1',           bg: '#E6DCC1', dark: false },
        { label: 'Hair',    value: '#C9BE9F',           bg: '#C9BE9F', dark: false },
      ]} />
      <SwatchRow swatches={[
        { label: 'Ink',   value: '#1A1714 · type',     bg: '#1A1714', dark: true },
        { label: 'Ink 2', value: '#3C362C · body',      bg: '#3C362C', dark: true },
        { label: 'Ink 3', value: '#6B6555 · secondary', bg: '#F5EFE0', dark: false, textColor: '#6B6555' },
        { label: 'Ink 4', value: '#9A937F · tertiary',  bg: '#F5EFE0', dark: false, textColor: '#9A937F' },
        { label: '—',     value: 'type stack',          bg: '#F5EFE0', dark: false },
      ]} />

      <SectionBreak label="Forest · the one accent" />
      <SwatchRow swatches={[
        { label: '50',  value: '#EAF1EC', bg: '#EAF1EC', dark: false },
        { label: '100', value: '#D2E0D6', bg: '#D2E0D6', dark: false },
        { label: '200', value: '#A8C2B0', bg: '#A8C2B0', dark: false },
        { label: '300', value: '#7AA386', bg: '#7AA386', dark: false },
        { label: '400', value: '#4F8460', bg: '#4F8460', dark: true },
      ]} />
      <SwatchRow swatches={[
        { label: '500', value: '#2D5A3D · brand 2',      bg: '#2D5A3D', dark: true },
        { label: '600', value: '#1B4332 · CTA · PRIMARY', bg: '#1B4332', dark: true },
        { label: '700', value: '#14342A · hover',         bg: '#14342A', dark: true },
        { label: '800', value: '#0D2A1E',                bg: '#0D2A1E', dark: true },
        { label: '900', value: '#061A12',                bg: '#061A12', dark: true },
      ]} />

      <SectionBreak label="Reserved · warn · critical" />
      <div className="grid grid-cols-4 gap-3 mb-8">
        {([
          { label: 'Orange',      value: '#C7522A · WARN only',        bg: '#C7522A', dark: true },
          { label: 'Orange soft', value: '#F4DDD0',                     bg: '#F4DDD0', dark: false },
          { label: 'Crit',        value: '#8B1A1A · IRREVERSIBLE only', bg: '#8B1A1A', dark: true },
          { label: 'Crit bg',     value: '#F6E1DE',                     bg: '#F6E1DE', dark: false },
        ] as SwatchDef[]).map((s) => <Swatch key={s.label} {...s} />)}
      </div>

      <SectionBreak label="Rules of use" />
      <div className="space-y-4 mb-10">
        {[
          { head: 'Forest',         body: "Every interactive element. Primary buttons, links, focus rings, the active state on a polling-unit tier (hold), the AI copilot's first letter, charted lines for the candidate the user follows." },
          { head: 'Orange',         body: 'Warnings. Toss-up tier on the polling-unit list, severity 3–4 incidents in the War Room, spend that crossed 75% of its INEC sub-cap, donor risk flagged high. Never used as a CTA or as decoration.' },
          { head: 'Oxblood / Crit', body: 'Irreversible. Candidate withdrawal, ballot void, account suspension, severity-5 election-day incidents. Triggers a confirmation pattern that requires the user to type a literal token (CONFIRM / VOID). Reserved so it keeps its meaning.' },
          { head: 'Greys',          body: 'Cool slate is banned. Every neutral here is warm, sat on top of the cream paper. If a surface looks blue-cold next to the paper, the wrong neutral is in the slot.' },
        ].map(({ head, body }) => (
          <div key={head} className="pb-4 border-b" style={{ borderColor: 'var(--hair)' }}>
            <div className="font-sans font-semibold text-[13px] mb-1" style={{ color: 'var(--ink)' }}>{head}</div>
            <div className="font-sans text-[13px] leading-relaxed" style={{ color: 'var(--ink-2)' }}>{body}</div>
          </div>
        ))}
      </div>

      <SectionBreak label="Forest in use" />
      <div className="flex flex-wrap gap-6">
        {([
          { label: 'Primary button', bg: 'var(--forest-600)', fg: 'var(--paper)', border: undefined,             text: 'Run scenario' },
          { label: 'Secondary',      bg: 'var(--paper)',      fg: 'var(--forest-600)', border: 'var(--forest-600)', text: 'Save draft' },
          { label: 'Warn',           bg: 'var(--orange)',     fg: 'var(--paper)', border: undefined,             text: 'Withdraw candidate' },
          { label: 'Critical',       bg: 'var(--crit)',       fg: 'var(--paper)', border: undefined,             text: 'Void result' },
        ]).map(({ label, bg, fg, border, text }) => (
          <div key={label} className="flex flex-col items-start gap-2">
            <div className="font-mono text-[10px] uppercase tracking-[0.12em]" style={{ color: 'var(--ink-4)' }}>{label}</div>
            <button
              className="h-[34px] px-4 text-[13px] font-sans font-medium rounded-[4px] transition-colors cursor-default"
              style={{ background: bg, color: fg, border: border ? `1px solid ${border}` : 'none' }}
            >
              {text}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
