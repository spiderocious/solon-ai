'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DEMO_APP_URL } from '@/config/links';
import content from '@/content/site.json';

gsap.registerPlugin(ScrollTrigger);

const MODULE_PATHS: Record<string, string> = {
  simulator:     '/modules/simulator',
  'voter-intel': '/modules/voter-intel',
  agents:        '/modules/agents',
  finance:       '/modules/finance',
  'war-room':    '/modules/war-room',
};

const MODULE_ICONS: Record<string, React.ReactNode> = {
  simulator: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  ),
  'voter-intel': (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  agents: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
    </svg>
  ),
  finance: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  ),
  'war-room': (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
};

const modules = content.modules;
const COUNT = modules.length;

// How many px of scroll travel before we advance one step.
// ~300px ≈ one firm wheel tick on desktop, ~250px on mobile.
const STEP_PX = 300;

export function ModulesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef  = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // Crossfade: keep track of which panel is "leaving" so we can animate it out
  const prevRef    = useRef(0);
  const animating  = useRef(false);

  const goTo = useCallback((next: number) => {
    if (next === prevRef.current || animating.current) return;
    const prev = prevRef.current;
    prevRef.current = next;
    animating.current = true;
    setActive(next);

    // Animate outgoing panel up+fade, incoming panel in from below
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    const layout = isMobile ? 'mobile' : 'desktop';
    const outEl = document.querySelector<HTMLElement>(`[data-layout="${layout}"][data-panel="${prev}"]`);
    const inEl  = document.querySelector<HTMLElement>(`[data-layout="${layout}"][data-panel="${next}"]`);

    if (!outEl || !inEl) { animating.current = false; return; }

    const direction = next > prev ? 1 : -1;

    // Set incoming start position
    gsap.set(inEl, {
      opacity: 0,
      x: isMobile ? 60 * direction : 0,
      y: isMobile ? 0 : 32 * direction,
      pointerEvents: 'none',
    });

    const tl = gsap.timeline({
      onComplete: () => { animating.current = false; },
    });

    tl.to(outEl, {
      opacity: 0,
      x: isMobile ? -60 * direction : 0,
      y: isMobile ? 0 : -24 * direction,
      duration: 0.28,
      ease: 'power2.in',
      pointerEvents: 'none',
    }, 0)
    .to(inEl, {
      opacity: 1,
      x: 0,
      y: 0,
      duration: 0.32,
      ease: 'power2.out',
      pointerEvents: 'auto',
    }, 0.18); // starts before outgoing finishes — always something visible
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const sticky  = stickyRef.current;
    if (!section || !sticky) return;

    const totalScroll = STEP_PX * (COUNT - 1);

    // Set initial panel states for BOTH layouts
    (['desktop', 'mobile'] as const).forEach((layout) => {
      modules.forEach((_, i) => {
        const el = document.querySelector<HTMLElement>(`[data-layout="${layout}"][data-panel="${i}"]`);
        if (!el) return;
        gsap.set(el, {
          opacity:       i === 0 ? 1 : 0,
          x: 0,
          y: 0,
          pointerEvents: i === 0 ? 'auto' : 'none',
          position:      'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
        });
      });
    });

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: `+=${totalScroll}`,
        pin: sticky,
        pinSpacing: true,
        snap: {
          // Snap to each module step so one scroll = one module advance
          snapTo: 1 / (COUNT - 1),
          duration: { min: 0.2, max: 0.4 },
          ease: 'power1.inOut',
          delay: 0,
        },
        onUpdate: (self) => {
          const next = Math.min(COUNT - 1, Math.round(self.progress * (COUNT - 1)));
          goTo(next);
        },
      });
    }, section);

    return () => ctx.revert();
  }, [goTo]);

  return (
    <section ref={sectionRef} id="modules">
      <div ref={stickyRef} className="h-screen flex flex-col overflow-hidden" style={{ background: 'var(--paper)' }}>

        {/* Header */}
        <div className="max-w-6xl mx-auto w-full px-6 pt-14 md:pt-16 pb-5 shrink-0">
          <div className="font-mono text-[10px] uppercase tracking-[0.14em] mb-2" style={{ color: 'var(--forest-700)' }}>
            Five modules
          </div>
          <h2 className="font-serif font-semibold text-[28px] md:text-[42px] leading-tight" style={{ color: 'var(--ink)' }}>
            Everything a campaign needs.{' '}
            <span style={{ color: 'var(--ink-3)' }}>In one platform.</span>
          </h2>
        </div>

        {/* Progress bar */}
        <div className="max-w-6xl mx-auto w-full px-6 mb-5 shrink-0">
          <div className="flex gap-1.5">
            {modules.map((m, i) => (
              <div
                key={m.id}
                className="h-[3px] flex-1 rounded-full transition-all duration-300"
                style={{ background: i <= active ? 'var(--forest-600)' : 'var(--hair)' }}
              />
            ))}
          </div>
        </div>

        {/* ── Desktop layout ── */}
        <div
          className="hidden md:grid flex-1 max-w-6xl mx-auto w-full px-6 pb-8 gap-6"
          style={{ gridTemplateColumns: '220px 1fr', minHeight: 0 }}
        >
          {/* Sidebar */}
          <div className="flex flex-col gap-2 self-start pt-1">
            {modules.map((m, i) => (
              <div
                key={m.id}
                className="flex items-center gap-3 px-4 py-3 rounded-[6px] select-none transition-all duration-300"
                style={{
                  background:  active === i ? 'var(--ink)'   : 'transparent',
                  color:       active === i ? 'var(--paper)' : 'var(--ink-3)',
                  border:      active === i ? 'none'         : '1px solid var(--hair)',
                  opacity:     active === i ? 1              : 0.5,
                  transform:   active === i ? 'translateX(0)': 'translateX(-4px)',
                }}
              >
                <span>{MODULE_ICONS[m.id]}</span>
                <span className="font-sans text-[13px] font-medium">{m.label}</span>
              </div>
            ))}
          </div>

          {/* Panel stack — h-full so absolute children fill it */}
          <div className="relative h-full">
            {modules.map((m, i) => (
              <PanelCard key={m.id} mod={m} index={i} layout="desktop" />
            ))}
          </div>
        </div>

        {/* ── Mobile layout ── */}
        <div className="md:hidden flex flex-col flex-1 px-4 pb-4" style={{ minHeight: 0 }}>
          {/* Dot nav */}
          <div className="flex justify-center gap-2 pb-3 shrink-0">
            {modules.map((_, i) => (
              <div
                key={i}
                className="rounded-full transition-all duration-300"
                style={{
                  width:      active === i ? '20px' : '6px',
                  height:     '6px',
                  background: active === i ? 'var(--forest-600)' : 'var(--hair)',
                }}
              />
            ))}
          </div>

          {/* Panel stack */}
          <div className="relative flex-1 h-full">
            {modules.map((m, i) => (
              <PanelCard key={m.id} mod={m} index={i} layout="mobile" />
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div
          className="shrink-0 flex items-center justify-center gap-1.5 pb-4 transition-opacity duration-500"
          style={{ opacity: active >= COUNT - 1 ? 0 : 0.4 }}
        >
          <span className="font-mono text-[10px]" style={{ color: 'var(--ink-4)' }}>scroll to explore</span>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--ink-4)" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </div>
    </section>
  );
}

type PanelCardProps = {
  mod: (typeof modules)[number];
  index: number;
  layout: 'desktop' | 'mobile';
};

function PanelCard({ mod, index, layout }: PanelCardProps) {
  const href = `${DEMO_APP_URL}${MODULE_PATHS[mod.id] ?? ''}`;

  return (
    // opacity:0 until GSAP sets it on mount — prevents flash of all panels
    <div
      data-layout={layout}
      data-panel={index}
      style={{
        position: 'absolute',
        inset: 0,
        opacity: 0,
        willChange: 'opacity, transform',
      }}
    >
      <div
        className="h-fit rounded-[10px] p-5 md:p-8 flex flex-col overflow-y-auto"
        style={{ background: 'var(--sheet)', border: '1px solid var(--hair)' }}
      >
        <div className="font-mono text-[10px] uppercase tracking-[0.12em] mb-2" style={{ color: 'var(--forest-700)' }}>
          {mod.eyebrow}
        </div>

        <h3
          className="font-serif font-semibold text-[22px] md:text-[32px] leading-tight mb-3"
          style={{ color: 'var(--ink)' }}
        >
          {mod.headline.split('\n').map((line, i) => (
            <span key={i} className={i > 0 ? 'block' : ''}>{line}</span>
          ))}
        </h3>

        <p className="font-sans text-[13px] md:text-[15px] leading-relaxed mb-5 max-w-lg" style={{ color: 'var(--ink-3)' }}>
          {mod.description}
        </p>

        <div className="flex gap-5 md:gap-8 mb-6 flex-wrap">
          {mod.stats.map((s) => (
            <div key={s.label}>
              <div className="font-serif font-semibold text-[24px] md:text-[28px] leading-none" style={{ color: 'var(--ink)' }}>
                {s.value}
              </div>
              <div className="font-mono text-[9px] uppercase tracking-[0.1em] mt-1" style={{ color: 'var(--ink-4)' }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-auto">
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[4px] font-sans text-[13px] font-medium transition-all hover:opacity-90"
            style={{ background: 'var(--forest-700)', color: 'var(--paper)' }}
          >
            Explore {mod.label} in the demo
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
