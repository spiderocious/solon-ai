function SectionBreak({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-5 mt-8">
      <span className="font-mono text-[10px] uppercase tracking-[0.14em] shrink-0" style={{ color: 'var(--ink-4)' }}>{label}</span>
      <div className="flex-1 h-px" style={{ background: 'var(--hair)' }} />
    </div>
  );
}

export function TypeScreen() {
  return (
    <div className="max-w-[760px]">
      <div className="mb-10 pb-6 border-b" style={{ borderColor: 'var(--hair)' }}>
        <div className="font-mono text-[10px] uppercase tracking-[0.14em] mb-1" style={{ color: 'var(--ink-4)' }}>02 / FOUNDATION</div>
        <div className="font-serif font-semibold text-[36px] leading-tight" style={{ color: 'var(--ink)' }}>Type</div>
        <div className="font-serif italic text-[14px] mt-1" style={{ color: 'var(--ink-3)' }}>— three families, two jobs each, one semantic rule.</div>
        <div className="font-mono text-[10px] mt-3" style={{ color: 'var(--ink-4)' }}>SOLON · v 0.1</div>
      </div>

      <p className="font-serif italic text-[14px] leading-relaxed mb-8 max-w-[70ch]" style={{ color: 'var(--ink-3)' }}>
        Fraunces carries the thinking: section titles, masthead, projection numbers, the AI copilot&apos;s voice. Inter carries the chrome: buttons, inputs, labels, table cells. JetBrains Mono carries record: vote counts, polling-unit IDs, INEC cap percentages, dates, anything that&apos;s a fact.
      </p>

      <SectionBreak label="Display · Fraunces" />
      <div className="space-y-4 mb-2">
        {([
          { meta: '72 / 600', style: { fontSize: 72, lineHeight: 1, fontWeight: 600 }, text: 'Order paper' },
          { meta: '48 / 600', style: { fontSize: 48, lineHeight: 1, fontWeight: 600 }, text: 'Anambra Central' },
          { meta: '30 / 600', style: { fontSize: 30, lineHeight: 1.1, fontWeight: 600 }, text: 'Scenario builder' },
          { meta: '22 / 500 · it.', style: { fontSize: 22, lineHeight: 1.2, fontWeight: 500, fontStyle: 'italic' }, text: '"Soludo carries this one."' },
          { meta: '16 / 500 · body', style: { fontSize: 16, lineHeight: 1.6, fontWeight: 500 }, text: "The model attributes Labour Party's six-point lift in Anambra Central to a turnout rebound in the 18–34 cohort and to APGA's weakened ground game." },
        ] as Array<{ meta: string; style: React.CSSProperties; text: string }>).map(({ meta, style, text }) => (
          <div key={meta} className="flex items-baseline gap-6 pb-4 border-b" style={{ borderColor: 'var(--hair)' }}>
            <span className="font-mono text-[10px] w-[96px] shrink-0" style={{ color: 'var(--ink-4)' }}>{meta}</span>
            <div className="font-serif" style={{ ...style, color: 'var(--ink)' }}>{text}</div>
          </div>
        ))}
      </div>

      <SectionBreak label="Chrome · Inter" />
      <div className="space-y-4 mb-2">
        {([
          { meta: '18 / 600', style: { fontSize: 18, fontWeight: 600 }, text: 'Polling units · ward 4' },
          { meta: '14 / 500', style: { fontSize: 14, fontWeight: 500 }, text: 'Apply lever · re-run scenario' },
          { meta: '13 / 400', style: { fontSize: 13, fontWeight: 400 }, text: 'Labour Party (LP), All Progressives Congress (APC), Peoples Democratic Party (PDP), All Progressives Grand Alliance (APGA)' },
          { meta: '11 / 500 · oc.', style: { fontSize: 11, fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase' as const }, text: 'Confidence · medium · n=412 PU' },
        ] as Array<{ meta: string; style: React.CSSProperties; text: string }>).map(({ meta, style, text }) => (
          <div key={meta} className="flex items-baseline gap-6 pb-4 border-b" style={{ borderColor: 'var(--hair)' }}>
            <span className="font-mono text-[10px] w-[96px] shrink-0" style={{ color: 'var(--ink-4)' }}>{meta}</span>
            <div className="font-sans" style={{ ...style, color: 'var(--ink)' }}>{text}</div>
          </div>
        ))}
      </div>

      <SectionBreak label="Record · JetBrains Mono" />
      <div className="space-y-4 mb-2">
        <div className="flex items-baseline gap-6 pb-4 border-b" style={{ borderColor: 'var(--hair)' }}>
          <span className="font-mono text-[10px] w-[96px] shrink-0" style={{ color: 'var(--ink-4)' }}>44 / 500</span>
          <div className="font-mono font-medium" style={{ fontSize: 44, color: 'var(--ink)', fontVariantNumeric: 'tabular-nums' }}>
            1,284,096<span className="text-[16px] ml-2" style={{ color: 'var(--ink-3)' }}>votes</span>
          </div>
        </div>
        <div className="flex items-baseline gap-6 pb-4 border-b" style={{ borderColor: 'var(--hair)' }}>
          <span className="font-mono text-[10px] w-[96px] shrink-0" style={{ color: 'var(--ink-4)' }}>22 / 500</span>
          <div className="font-mono font-medium" style={{ fontSize: 22, color: 'var(--ink)', fontVariantNumeric: 'tabular-nums' }}>₦ 142,308,500</div>
        </div>
        <div className="flex items-baseline gap-6 pb-4 border-b" style={{ borderColor: 'var(--hair)' }}>
          <span className="font-mono text-[10px] w-[96px] shrink-0" style={{ color: 'var(--ink-4)' }}>11 / 500</span>
          <div className="font-mono" style={{ fontSize: 11, color: 'var(--ink-3)', fontVariantNumeric: 'tabular-nums' }}>PU 008-04-02 · LGA-008 · WARD-04</div>
        </div>
      </div>

      <SectionBreak label="The semantic split — MONO is fact, SERIF is projection" />
      <div className="grid grid-cols-2 gap-6 mb-10">
        <div className="p-5 rounded-[4px] border" style={{ borderColor: 'var(--hair)' }}>
          <div className="font-mono text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: 'var(--ink-4)' }}>Fact (mono)</div>
          <div className="font-mono font-medium" style={{ fontSize: 36, color: 'var(--ink)', fontVariantNumeric: 'tabular-nums' }}>
            1,284<span className="text-[13px] ml-1.5" style={{ color: 'var(--ink-3)' }}>accredited</span>
          </div>
          <div className="font-sans text-[12px] leading-relaxed mt-3" style={{ color: 'var(--ink-3)' }}>
            A counted, signed number from Form EC8A. It either matches the polling unit register or it doesn&apos;t.
          </div>
        </div>
        <div className="p-5 rounded-[4px] border" style={{ borderColor: 'var(--hair)' }}>
          <div className="font-mono text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: 'var(--ink-4)' }}>Projection (serif)</div>
          <div className="font-serif font-semibold" style={{ fontSize: 36, color: 'var(--ink)' }}>
            47.2%<span className="text-[16px] font-normal ml-1.5" style={{ color: 'var(--ink-3)' }}>± 3.1</span>
          </div>
          <div className="font-sans text-[12px] leading-relaxed mt-3" style={{ color: 'var(--ink-3)' }}>
            A modelled estimate from Solon. Carries a confidence band; reads in Fraunces so you know at a glance it&apos;s a projection, not a count.
          </div>
        </div>
      </div>

      <SectionBreak label="Variable-axis behaviour" />
      <div className="grid grid-cols-2 gap-6">
        <div>
          <div className="font-sans font-semibold text-[12px] mb-4" style={{ color: 'var(--ink-2)' }}>Fraunces · optical-size axis</div>
          <div className="space-y-2">
            {([
              { opsz: 9,   size: 13 },
              { opsz: 36,  size: 22 },
              { opsz: 96,  size: 40 },
              { opsz: 144, size: 56 },
            ] as Array<{opsz: number; size: number}>).map(({ opsz, size }) => (
              <div key={opsz} className="font-serif leading-tight" style={{ fontSize: size, fontVariationSettings: `'opsz' ${opsz}`, color: 'var(--ink)' }}>
                {opsz} · Order paper
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="font-sans font-semibold text-[12px] mb-4" style={{ color: 'var(--ink-2)' }}>Inter · weight axis</div>
          <div className="space-y-2">
            {([300, 400, 500, 600, 700] as number[]).map((w) => (
              <div key={w} className="font-sans text-[14px]" style={{ fontWeight: w, color: 'var(--ink)' }}>
                {w} — Inter {w === 300 ? 'Light' : w === 400 ? 'Regular' : w === 500 ? 'Medium' : w === 600 ? 'Semibold' : 'Bold'}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
