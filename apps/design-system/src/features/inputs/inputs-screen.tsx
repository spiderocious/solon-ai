import { useState } from 'react';

import { FieldLabel, SearchBar, Select, Scrubber, TextInput } from '@solon/ui';

function Scene({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <div className="flex items-baseline gap-3 mb-4 pb-2 border-b" style={{ borderColor: 'var(--hair)' }}>
        <span className="font-sans text-[13px]" style={{ color: 'var(--ink-2)' }}>{title}</span>
        {subtitle && <span className="font-mono text-[10px]" style={{ color: 'var(--ink-4)' }}>{subtitle}</span>}
      </div>
      {children}
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

export function InputsScreen() {
  const [turnout, setTurnout] = useState(5);
  const [youth, setYouth] = useState(8);
  const [bvas, setBvas] = useState(3);
  const [alignment, setAlignment] = useState(8);

  return (
    <div className="max-w-[760px]">
      <div className="mb-10 pb-6 border-b" style={{ borderColor: 'var(--hair)' }}>
        <div className="font-mono text-[10px] uppercase tracking-[0.14em] mb-1" style={{ color: 'var(--ink-4)' }}>11 / PRIMITIVES</div>
        <div className="font-serif font-semibold text-[36px] leading-tight" style={{ color: 'var(--ink)' }}>Inputs</div>
        <div className="font-serif italic text-[14px] mt-1" style={{ color: 'var(--ink-3)' }}>— instrument prefix on the chrome, plain box on forms.</div>
        <div className="font-mono text-[10px] mt-3" style={{ color: 'var(--ink-4)' }}>SOLON · v 0.1</div>
      </div>

      <p className="font-serif italic text-[14px] leading-relaxed mb-8 max-w-[70ch]" style={{ color: 'var(--ink-3)' }}>
        Two input idioms. The <strong className="not-italic font-medium" style={{ color: 'var(--ink-2)' }}>instrument</strong> input — mono uppercase prefix on a paper-2 cell — is used wherever the input is part of the chrome. The <strong className="not-italic font-medium" style={{ color: 'var(--ink-2)' }}>plain</strong> input is used inside forms.
      </p>

      <Scene title="Scene · global search" subtitle="instrument bar, the ⌘K of Solon">
        <SearchBar
          prefix="SOLON ▸"
          placeholder="Race, constituency, candidate, polling-unit code, or 'simulate Anambra Central with Soludo backing LP'"
        />
      </Scene>

      <Scene title="Scene · race picker" subtitle="two instrument inputs side by side">
        <div className="grid grid-cols-2 gap-4">
          <FieldLabel label="Constituency">
            <TextInput prefix="CON ▸" defaultValue="Anambra Central" />
          </FieldLabel>
          <FieldLabel label="Office">
            <Select defaultValue="Senate">
              <option>Senate</option>
              <option>Governor</option>
              <option>House of Reps</option>
            </Select>
          </FieldLabel>
        </div>
      </Scene>

      <Scene title="Scene · candidate add form" subtitle="plain inputs, label above">
        <div className="rounded-[4px] border p-5" style={{ borderColor: 'var(--hair)' }}>
          <div className="grid grid-cols-2 gap-4">
            <FieldLabel label="Full name">
              <TextInput placeholder="e.g. Soludo, Charles" />
            </FieldLabel>
            <FieldLabel label="Party">
              <Select>
                <option>APGA</option>
                <option>APC</option>
                <option>LP</option>
                <option>PDP</option>
              </Select>
            </FieldLabel>
            <FieldLabel label="State of origin">
              <TextInput placeholder="Anambra" />
            </FieldLabel>
            <FieldLabel label="LGA of origin">
              <TextInput placeholder="Aguata" />
            </FieldLabel>
            <FieldLabel label="Age">
              <TextInput defaultValue="61" className="w-[80px] font-mono" />
            </FieldLabel>
            <FieldLabel label="Religion · ethnicity tag">
              <TextInput placeholder="Catholic · Igbo" />
            </FieldLabel>
            <div className="col-span-2">
              <FieldLabel label="Issue platform">
                <TextInput placeholder="Security · Education · Manufacturing revival" />
                <div className="mt-1 font-serif italic text-[11.5px]" style={{ color: 'var(--ink-3)' }}>
                  Comma-separated. The simulator uses these to match the candidate against issue-shock scenarios.
                </div>
              </FieldLabel>
            </div>
            <div className="col-span-2">
              <FieldLabel label="Notes">
                <textarea
                  className="w-full px-3 py-2 rounded-[4px] border font-sans text-[13px] resize-y"
                  style={{ height: 64, borderColor: 'var(--hair)', background: 'var(--sheet)', color: 'var(--ink)' }}
                  placeholder="Free notes — incumbency length, godfather affiliations, defection history…"
                />
              </FieldLabel>
            </div>
          </div>
        </div>
      </Scene>

      <Scene title="Scene · lever panel" subtitle="structural scrubbers for the simulator">
        <div className="space-y-4">
          <Scrubber
            label="Overall turnout"
            min={-10}
            max={10}
            value={turnout}
            onChange={(e) => setTurnout(Number(e.target.value))}
            valueLabel={`${turnout >= 0 ? '+' : ''}${turnout.toFixed(1)} pts`}
          />
          <Scrubber
            label="Youth turnout (18–34)"
            min={-10}
            max={10}
            value={youth}
            onChange={(e) => setYouth(Number(e.target.value))}
            valueLabel={`${youth >= 0 ? '+' : ''}${youth.toFixed(1)} pts`}
          />
          <Scrubber
            label="BVAS failure"
            min={0}
            max={20}
            value={bvas}
            onChange={(e) => setBvas(Number(e.target.value))}
            valueLabel={`+${bvas.toFixed(1)}%`}
          />
          <Scrubber
            label="Soludo–LP alignment"
            min={0}
            max={10}
            value={alignment}
            onChange={(e) => setAlignment(Number(e.target.value))}
            valueLabel={alignment >= 8 ? 'strong' : alignment >= 5 ? 'medium' : 'weak'}
          />
        </div>
      </Scene>

      <SectionBreak label="States · reference" />
      <div className="grid grid-cols-2 gap-4 p-5 rounded-[4px] border" style={{ borderColor: 'var(--hair)' }}>
        <FieldLabel label="Default">
          <TextInput prefix="CON ▸" placeholder="Anambra Central" />
        </FieldLabel>
        <FieldLabel label="Filled">
          <TextInput prefix="CON ▸" defaultValue="Anambra Central" />
        </FieldLabel>
        <FieldLabel label="Focus (click into it)">
          <TextInput prefix="CON ▸" defaultValue="Anambra Central" autoFocus />
        </FieldLabel>
        <FieldLabel label="Disabled">
          <TextInput prefix="CON ▸" defaultValue="—" disabled />
        </FieldLabel>
        <FieldLabel label="Plain · text">
          <TextInput placeholder="Full name" />
        </FieldLabel>
        <FieldLabel label="Plain · number (mono)">
          <TextInput defaultValue="1,284" className="font-mono" />
        </FieldLabel>
      </div>
    </div>
  );
}
