'use client';

import { useRef, useEffect } from 'react';
import { DEMO_APP_URL } from '@/config/links';
import content from '@/content/v2.json';

const { cta } = content;

const HIDDEN: React.CSSProperties = {
  opacity: 0,
  transform: 'translateY(22px)',
  transition: 'opacity 0.75s cubic-bezier(0.22,1,0.36,1), transform 0.75s cubic-bezier(0.22,1,0.36,1)',
};

export function V2Cta() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const items = Array.from(section.querySelectorAll<HTMLElement>('[data-reveal]'));

    const show = (el: HTMLElement) => {
      const delay = Number(el.dataset.delay ?? 0);
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, delay);
    };

    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { show(e.target as HTMLElement); obs.unobserve(e.target); }
      });
    }, { threshold: 0.05 });

    items.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) show(el); else obs.observe(el);
    });

    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} style={{ position: 'relative', overflow: 'hidden', background: 'var(--paper-2)', padding: '120px 0' }}>
      {/* Oversized 2027 watermark */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
        pointerEvents: 'none', userSelect: 'none',
      }}>
        <span className="font-serif font-semibold" style={{ fontSize: 'clamp(160px, 28vw, 380px)', color: 'rgba(0,0,0,0.04)', letterSpacing: '-0.04em', lineHeight: 1 }}>
          2027
        </span>
      </div>

      {/* Figure — right side, multiply blend so no white box */}
      <div style={{ position: 'absolute', right: 0, bottom: 0, top: 0, width: '38%', pointerEvents: 'none', userSelect: 'none', display: 'none' }} className="md:block"
        aria-hidden>
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(to right, var(--paper-2) 0%, transparent 30%)' }} />
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(to top, var(--paper-2) 0%, transparent 20%)' }} />
        <img
          src="/v2/figure.png"
          alt=""
          style={{
            width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'bottom',
            filter: 'sepia(0.9) brightness(0.4) saturate(0.2)',
            mixBlendMode: 'multiply',
            opacity: 0.35,
          }}
        />
      </div>

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ maxWidth: '580px' }}>
          <div data-reveal data-delay="0" className="font-mono uppercase"
            style={{ ...HIDDEN, fontSize: '9px', letterSpacing: '0.22em', color: 'var(--forest-700)', marginBottom: '20px' }}>
            {cta.eyebrow}
          </div>

          <h2 data-reveal data-delay="70" className="font-serif font-semibold"
            style={{ ...HIDDEN, fontSize: 'clamp(40px, 5.5vw, 78px)', lineHeight: 1.03, color: 'var(--ink)', marginBottom: '24px' }}>
            {cta.headline_1}
            <br />
            <em style={{ color: 'var(--forest-700)', fontStyle: 'italic' }}>{cta.headline_2}</em>
          </h2>

          <p data-reveal data-delay="140" className="font-sans"
            style={{ ...HIDDEN, fontSize: '16px', lineHeight: 1.7, color: 'var(--ink-3)', marginBottom: '36px' }}>
            {cta.body}
          </p>

          <div data-reveal data-delay="210" style={{ ...HIDDEN }}>
            <a
              href={DEMO_APP_URL}
              target="_blank" rel="noopener noreferrer"
              className="font-sans font-semibold transition-all hover:opacity-90 active:scale-[0.98]"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '16px 32px', borderRadius: '4px', fontSize: '15px', background: 'var(--forest-700)', color: '#fff' }}
            >
              {cta.button}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
