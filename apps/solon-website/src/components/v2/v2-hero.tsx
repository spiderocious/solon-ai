'use client';

import { useEffect, useRef } from 'react';
import { DEMO_APP_URL } from '@/config/links';
import content from '@/content/v2.json';
import { V2AppMockup } from './v2-app-mockup';

const { hero } = content;

export function V2Hero() {
  const metaRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLHeadingElement>(null);
  const subRef  = useRef<HTMLParagraphElement>(null);
  const ctaRef  = useRef<HTMLDivElement>(null);
  const mockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const textEls = [metaRef.current, headRef.current, subRef.current, ctaRef.current];
    textEls.forEach((el, i) => {
      if (!el) return;
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      setTimeout(() => {
        if (!el) return;
        el.style.transition = 'opacity 0.85s cubic-bezier(0.22,1,0.36,1), transform 0.85s cubic-bezier(0.22,1,0.36,1)';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 80 + i * 110);
    });

    // mockup fades in later
    const m = mockRef.current;
    if (m) {
      m.style.opacity = '0';
      m.style.transform = 'translateY(32px) scale(0.98)';
      setTimeout(() => {
        m.style.transition = 'opacity 1.1s cubic-bezier(0.22,1,0.36,1), transform 1.1s cubic-bezier(0.22,1,0.36,1)';
        m.style.opacity = '1';
        m.style.transform = 'translateY(0) scale(1)';
      }, 420);
    }
  }, []);

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: 'var(--paper)', minHeight: '100svh' }}
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 20%, transparent 100%)',
        }}
      />

      {/* Two-column layout */}
      <div
        className="relative"
        style={{
          zIndex: 10,
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px',
          paddingTop: '130px',
          paddingBottom: '80px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '48px',
          alignItems: 'center',
          minHeight: '100svh',
          boxSizing: 'border-box',
        }}
      >
        {/* Left — copy */}
        <div>
          {/* Eyebrow */}
          <div ref={metaRef} className="flex items-center gap-4" style={{ marginBottom: '36px' }}>
            <span className="font-mono uppercase" style={{ fontSize: '9px', letterSpacing: '0.22em', color: 'var(--forest-700)' }}>
              {hero.eyebrow}
            </span>
            <div style={{ height: '1px', width: '56px', background: 'var(--hair)' }} />
          </div>

          {/* Headline */}
          <h1
            ref={headRef}
            className="font-serif font-semibold"
            style={{
              fontSize: 'clamp(44px, 5.5vw, 80px)',
              lineHeight: 1.03,
              letterSpacing: '-0.01em',
              color: 'var(--ink)',
            }}
          >
            {hero.headline_1}{' '}
            <em style={{ color: 'var(--forest-700)', fontStyle: 'italic' }}>{hero.headline_italic}</em>
            <br />
            {hero.headline_2}
          </h1>

          {/* Sub */}
          <p
            ref={subRef}
            className="font-sans"
            style={{ fontSize: '16px', lineHeight: 1.65, color: 'var(--ink-3)', maxWidth: '420px', marginTop: '24px' }}
          >
            {hero.subheadline}
          </p>

          {/* CTAs */}
          <div ref={ctaRef} style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '36px', flexWrap: 'wrap' }}>
            <a
              href={DEMO_APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans font-semibold transition-all hover:opacity-90 active:scale-[0.98]"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '13px 26px', borderRadius: '4px', fontSize: '14px', background: 'var(--forest-700)', color: '#fff' }}
            >
              {hero.cta_primary}
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </a>
            <a
              href="#how-it-works"
              className="font-sans"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: 'var(--ink-3)' }}
            >
              {hero.cta_secondary}
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12l7 7 7-7" /></svg>
            </a>
          </div>

          {/* Stats strip */}
          <div style={{ display: 'flex', gap: '32px', marginTop: '56px', paddingTop: '24px', borderTop: '1px solid var(--hair)' }}>
            {[
              { v: '93M', l: 'Registered voters' },
              { v: '176k+', l: 'Polling units' },
              { v: '36+FCT', l: 'States covered' },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-serif font-semibold" style={{ fontSize: '26px', lineHeight: 1, color: 'var(--ink)' }}>{s.v}</div>
                <div className="font-mono uppercase" style={{ fontSize: '8px', letterSpacing: '0.14em', color: 'var(--ink-4)', marginTop: '5px' }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — app mockup */}
        <div
          ref={mockRef}
          className="hidden md:block"
          style={{ height: '520px', position: 'relative' }}
        >
          {/* Slight tilt + shadow treatment */}
          <div style={{
            position: 'absolute', inset: 0,
            transform: 'perspective(1200px) rotateY(-4deg) rotateX(2deg)',
            transformOrigin: 'left center',
          }}>
            <V2AppMockup />
          </div>
          {/* Right edge fade so it bleeds into page */}
          <div
            style={{
              position: 'absolute', right: 0, top: 0, bottom: 0, width: '80px', zIndex: 20,
              background: 'linear-gradient(to right, transparent, var(--paper))',
              pointerEvents: 'none',
            }}
          />
          {/* Bottom edge fade — stops above the footer bar so CTA text stays readable */}
          <div
            style={{
              position: 'absolute', bottom: '38px', left: 0, right: 0, height: '60px', zIndex: 20,
              background: 'linear-gradient(to bottom, transparent, var(--paper))',
              pointerEvents: 'none',
            }}
          />
        </div>
      </div>

      {/* Bottom fade into ticker */}
      <div className="absolute bottom-0 inset-x-0 h-16 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent, var(--paper))' }} />
    </section>
  );
}
