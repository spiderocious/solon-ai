import { Button } from '@solon/ui';

function CameraIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="var(--ink-3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 10a2 2 0 012-2h2l2-3h8l2 3h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V10z" />
      <circle cx="16" cy="17" r="4" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="var(--forest-600)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="16" cy="16" r="13" />
      <path d="M10 16l4 4 8-8" />
    </svg>
  );
}

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        width: 280,
        borderRadius: 24,
        background: 'var(--ink)',
        padding: '12px 8px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.24)',
      }}
    >
      {children}
    </div>
  );
}

function StatusBar({ step: _step }: { step: string }) {
  return (
    <div className="flex justify-between px-2 mb-1">
      <span className="font-mono text-[9px]" style={{ color: 'rgba(245,239,224,0.5)' }}>11:42</span>
      <span className="font-mono text-[9px]" style={{ color: 'rgba(245,239,224,0.5)' }}>2G ⚪</span>
    </div>
  );
}

function PhoneContent({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="rounded-[16px] p-4 mt-1 flex flex-col"
      style={{ background: 'var(--sheet)', height: 520 }}
    >
      {children}
    </div>
  );
}

export function CitizenScreen() {
  return (
    <div className="px-8 py-10">
      {/* Page header */}
      <div className="mb-12">
        <p className="font-mono text-[10px] uppercase tracking-widest" style={{ color: 'var(--ink-4)' }}>
          42 / OVERLAYS
        </p>
        <h1 className="font-serif font-bold text-[32px] mt-1" style={{ color: 'var(--ink)' }}>
          Citizen reporter
        </h1>
        <p className="font-sans text-[14px] mt-1" style={{ color: 'var(--ink-3)' }}>
          — mobile flow — phone-only, 2G-friendly, no full account required.
        </p>
      </div>

      {/* Phone frames */}
      <div className="flex flex-wrap gap-8 justify-center">

        {/* Phone 1 — Step 1: Pick PU */}
        <PhoneFrame>
          <StatusBar step="1" />
          <PhoneContent>
            <div className="flex items-baseline justify-between">
              <span className="font-serif font-bold text-[18px]" style={{ color: 'var(--ink)' }}>Solon.</span>
              <span className="font-mono text-[9px]" style={{ color: 'var(--ink-4)' }}>REPORT · STEP 1 OF 3</span>
            </div>

            <h3 className="font-sans font-medium text-[15px] mt-3" style={{ color: 'var(--ink)' }}>
              Where are you reporting from?
            </h3>
            <p className="font-sans text-[12px] mt-1" style={{ color: 'var(--ink-3)' }}>
              We've found polling units near you. Choose the one whose result you want to share.
            </p>

            {/* Search input */}
            <div
              className="flex items-center mt-3 px-2 py-1.5 rounded"
              style={{ border: '1px solid var(--hair)' }}
            >
              <span className="font-mono text-[10px] mr-2 shrink-0" style={{ color: 'var(--ink-3)' }}>PU ▸</span>
              <input
                className="font-sans text-[12px] flex-1 outline-none bg-transparent"
                placeholder="Search PU…"
                style={{ color: 'var(--ink)' }}
              />
            </div>

            {/* PU list */}
            <div className="mt-2 space-y-1">
              {/* Active */}
              <div
                className="px-3 py-2 rounded"
                style={{ background: 'var(--forest-50)', border: '1px solid var(--forest-200)' }}
              >
                <p className="font-mono text-[9px]" style={{ color: 'var(--ink-4)' }}>008-04-02</p>
                <p className="font-sans font-medium text-[13px]" style={{ color: 'var(--ink)' }}>St. Mary's Primary</p>
                <p className="font-sans text-[11px]" style={{ color: 'var(--ink-3)' }}>Onitsha North · ward 4 · 120m away</p>
              </div>
              {/* Inactive */}
              {[
                { code: '008-04-09', name: 'Onitsha Town Hall', meta: 'Onitsha North · ward 4 · 480m away' },
                { code: '008-04-11', name: 'Niger Bridge Yard', meta: 'Onitsha North · ward 4 · 720m away' },
                { code: '008-05-11', name: 'Nkpor Civic Centre', meta: 'Nkpor · ward 5 · 1.4km away' },
              ].map((pu) => (
                <div
                  key={pu.code}
                  className="px-3 py-2 rounded"
                  style={{ background: 'var(--sheet)', border: '1px solid var(--hair)' }}
                >
                  <p className="font-mono text-[9px]" style={{ color: 'var(--ink-4)' }}>{pu.code}</p>
                  <p className="font-sans font-medium text-[13px]" style={{ color: 'var(--ink)' }}>{pu.name}</p>
                  <p className="font-sans text-[11px]" style={{ color: 'var(--ink-3)' }}>{pu.meta}</p>
                </div>
              ))}
            </div>

            <div className="mt-auto">
              <Button variant="primary" className="w-full rounded-[8px] py-3">
                Continue · St. Mary's Primary
              </Button>
            </div>
          </PhoneContent>
        </PhoneFrame>

        {/* Phone 2 — Step 2: Capture */}
        <PhoneFrame>
          <StatusBar step="2" />
          <PhoneContent>
            <div className="flex items-baseline justify-between">
              <span className="font-serif font-bold text-[18px]" style={{ color: 'var(--ink)' }}>Solon.</span>
              <span className="font-mono text-[9px]" style={{ color: 'var(--ink-4)' }}>REPORT · STEP 2 OF 3</span>
            </div>

            <h3 className="font-sans font-medium text-[15px] mt-3" style={{ color: 'var(--ink)' }}>
              Take a photo of the result sheet
            </h3>
            <p className="font-sans text-[12px] mt-1" style={{ color: 'var(--ink-3)' }}>
              Photograph Form EC8A so the whole sheet is visible — including the signatures at the bottom.
            </p>

            {/* Photo frame */}
            <div
              className="flex flex-col items-center justify-center gap-2 mt-3 rounded-[12px]"
              style={{
                border: '2px dashed var(--hair)',
                background: 'var(--paper-2)',
                height: 176,
              }}
            >
              <CameraIcon />
              <p className="font-sans font-medium text-[14px]" style={{ color: 'var(--ink-2)' }}>Tap to open camera</p>
              <p className="font-sans text-[11px]" style={{ color: 'var(--ink-3)' }}>Hold the sheet flat.</p>
            </div>

            {/* Check list */}
            <div
              className="rounded p-3 mt-3 space-y-1.5"
              style={{ background: 'var(--forest-50)', border: '1px solid var(--forest-200)' }}
            >
              {[
                'Numbers will reconcile against other reports.',
                'The image is geotagged to confirm you\'re at this PU.',
                'Your phone number stays hidden from the public feed.',
              ].map((item, i) => (
                <p key={i} className="font-sans text-[12px]" style={{ color: 'var(--forest-700)' }}>
                  ✓ {item}
                </p>
              ))}
            </div>

            <div className="flex gap-2 mt-auto">
              <Button variant="secondary" className="flex-1">Back</Button>
              <Button variant="primary" style={{ flex: 2 }}>Take photo</Button>
            </div>
          </PhoneContent>
        </PhoneFrame>

        {/* Phone 3 — Complete */}
        <PhoneFrame>
          <StatusBar step="3" />
          <PhoneContent>
            <div className="flex items-baseline justify-between">
              <span className="font-serif font-bold text-[18px]" style={{ color: 'var(--ink)' }}>Solon.</span>
              <span className="font-mono text-[9px]" style={{ color: 'var(--ink-4)' }}>COMPLETE</span>
            </div>

            {/* Sent card */}
            <div
              className="rounded-[8px] p-4 text-center mt-4"
              style={{ border: '1px solid var(--ink)' }}
            >
              <div className="flex justify-center">
                <CheckCircleIcon />
              </div>
              <p className="font-sans font-semibold text-[15px] mt-2" style={{ color: 'var(--ink)' }}>
                Report submitted
              </p>
              <p className="font-serif italic text-[13px] mt-2" style={{ color: 'var(--ink-3)' }}>
                Solon is reading the sheet. Your report joins one already submitted from this PU.
              </p>

              {/* Trust block */}
              <div
                className="rounded p-3 mt-4"
                style={{ background: 'var(--paper-2)' }}
              >
                <p className="font-mono text-[9px] uppercase" style={{ color: 'var(--ink-3)' }}>TRUST SCORE</p>
                <p className="font-serif font-bold text-[20px]" style={{ color: 'var(--forest-700)' }}>High</p>
                <p className="font-serif italic text-[11px] mt-1" style={{ color: 'var(--ink-3)' }}>
                  Your phone has verified reports before, the geotag matches, and the photo is sharp enough to read.
                </p>
              </div>
            </div>

            {/* Next card */}
            <div
              className="rounded p-3 mt-3 font-sans font-medium text-[12px]"
              style={{ background: 'var(--paper-2)', color: 'var(--ink-2)' }}
            >
              See an incident? Tap below to report violence, vote-buying, BVAS failure, or anything urgent — in any Nigerian language.
            </div>

            <div className="flex gap-2 mt-3">
              <Button variant="secondary" className="flex-1">Done</Button>
              <Button variant="warn" style={{ flex: 1.4 }}>Report incident</Button>
            </div>
          </PhoneContent>
        </PhoneFrame>
      </div>

      {/* Caption */}
      <p
        className="font-serif italic text-[13px] max-w-[65ch] mx-auto text-center mt-8"
        style={{ color: 'var(--ink-3)' }}
      >
        Why the desk feels so different from this. The desk is a parliamentary order paper read in daylight by a small team. The phone is a working pen carried by a citizen in a crowd. Same stance — Fraunces on the header, mono on the codes, forest for action, orange for warn — but the gesture is bigger, the buttons are full-width, and the chrome leans on the few things a thumb can do.
      </p>
    </div>
  );
}
