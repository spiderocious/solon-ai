'use client';

import { useRef, useEffect } from 'react';
import content from '@/content/v2.json';

const { how_it_works: hiw } = content;

const HIDDEN: React.CSSProperties = {
  opacity: 0,
  transform: 'translateY(26px)',
  transition: 'opacity 0.75s cubic-bezier(0.22,1,0.36,1), transform 0.75s cubic-bezier(0.22,1,0.36,1)',
};

export function V2HowItWorks() {
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
        if (e.isIntersecting) {
          show(e.target as HTMLElement);
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -30px 0px' });

    items.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        show(el);
      } else {
        obs.observe(el);
      }
    });

    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      style={{ background: 'var(--paper-2)', padding: '96px 0' }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        {/* Header */}
        <div style={{ marginBottom: '64px' }}>
          <div
            data-reveal
            data-delay="0"
            className="font-mono uppercase"
            style={{ ...HIDDEN, fontSize: '9px', letterSpacing: '0.22em', color: 'var(--forest-700)', marginBottom: '16px' }}
          >
            {hiw.eyebrow}
          </div>
          <h2
            data-reveal
            data-delay="70"
            className="font-serif font-semibold"
            style={{ ...HIDDEN, fontSize: 'clamp(34px, 4.5vw, 58px)', lineHeight: 1.05, color: 'var(--ink)', maxWidth: '680px' }}
          >
            {hiw.headline.split('\n').map((line, i) => (
              <span key={i} style={{ display: i > 0 ? 'block' : 'inline' }}>
                {i === 1 ? <em style={{ color: 'var(--forest-700)', fontStyle: 'italic' }}>{line}</em> : line}
              </span>
            ))}
          </h2>
        </div>

        {/* Steps */}
        <div className="v2-steps-grid" style={{ display: 'grid', gap: '0', borderTop: '1px solid var(--hair)' }}>
          {hiw.steps.map((step, i) => (
            <div
              key={step.number}
              data-reveal
              data-delay={i * 100}
              className="v2-step-item"
              style={{
                ...HIDDEN,
                padding: '20px',
                display: 'flex', flexDirection: 'column', gap: '16px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <span className="font-mono" style={{ fontSize: '11px', letterSpacing: '0.16em', color: 'var(--forest-700)' }}>{step.number}</span>
                <div style={{ height: '1px', width: '36px', background: 'var(--hair)' }} />
              </div>
              <div className="font-mono uppercase" style={{ fontSize: '8px', letterSpacing: '0.18em', color: 'var(--ink-4)' }}>{step.label}</div>
              <h3 className="font-serif font-semibold" style={{ fontSize: 'clamp(19px, 1.8vw, 23px)', lineHeight: 1.25, color: 'var(--ink)' }}>
                {step.headline}
              </h3>
              <p className="font-sans" style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--ink-3)' }}>{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
