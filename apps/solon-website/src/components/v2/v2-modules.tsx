'use client';

import { useRef, useEffect } from 'react';
import { DEMO_APP_URL } from '@/config/links';
import content from '@/content/v2.json';

const { modules } = content;

const HIDDEN: React.CSSProperties = {
  opacity: 0,
  transform: 'translateY(26px)',
  transition: 'opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)',
};

export function V2Modules() {
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
    }, { threshold: 0.04, rootMargin: '0px 0px -20px 0px' });

    items.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) show(el);
      else obs.observe(el);
    });

    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="modules" style={{ background: 'var(--paper)', padding: '96px 0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '20px', marginBottom: '52px', flexWrap: 'wrap' }}>
          <div>
            <div data-reveal data-delay="0" className="font-mono uppercase" style={{ ...HIDDEN, fontSize: '9px', letterSpacing: '0.22em', color: 'var(--forest-700)', marginBottom: '14px' }}>
              Five modules
            </div>
            <h2 data-reveal data-delay="60" className="font-serif font-semibold" style={{ ...HIDDEN, fontSize: 'clamp(28px, 3.6vw, 48px)', lineHeight: 1.1, color: 'var(--ink)' }}>
              Everything a campaign needs.{' '}
              <span style={{ color: 'var(--ink-3)' }}>In one platform.</span>
            </h2>
          </div>
          <a
            data-reveal data-delay="120"
            href={DEMO_APP_URL} target="_blank" rel="noopener noreferrer"
            className="font-sans font-medium transition-opacity hover:opacity-60"
            style={{ ...HIDDEN, display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '4px', fontSize: '13px', border: '1px solid var(--hair)', color: 'var(--ink-3)', flexShrink: 0 }}
          >
            Open all modules
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" /></svg>
          </a>
        </div>

        {/* Cards grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))', gap: '16px' }}>
          {modules.map((m, i) => (
            <a
              key={m.id}
              href={`${DEMO_APP_URL}${m.path}`}
              target="_blank" rel="noopener noreferrer"
              data-reveal
              data-delay={180 + i * 60}
              className="group"
              style={{
                ...HIDDEN,
                display: 'block', padding: '28px', borderRadius: '6px',
                background: 'var(--sheet)', border: '1px solid var(--hair)',
                transition: HIDDEN.transition + ', border-color 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = 'rgba(21,128,61,0.3)';
                el.style.boxShadow = '0 6px 28px rgba(21,128,61,0.09), 0 1px 4px rgba(0,0,0,0.04)';
                el.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = 'var(--hair)';
                el.style.boxShadow = 'none';
                el.style.transform = 'translateY(0)';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '28px' }}>
                <span className="font-mono" style={{ fontSize: '10px', letterSpacing: '0.14em', color: 'var(--forest-700)' }}>{m.number}</span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  style={{ color: 'var(--ink-4)' }}>
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </div>
              <div className="font-mono uppercase" style={{ fontSize: '8px', letterSpacing: '0.18em', color: 'var(--ink-4)', marginBottom: '10px' }}>{m.eyebrow}</div>
              <h3 className="font-serif font-semibold" style={{ fontSize: '20px', lineHeight: 1.25, color: 'var(--ink)', marginBottom: '14px' }}>
                {m.headline.split('\n').map((line, j) => (
                  <span key={j} style={{ display: j > 0 ? 'block' : 'inline' }}>{line}</span>
                ))}
              </h3>
              <p className="font-sans" style={{ fontSize: '13px', lineHeight: 1.7, color: 'var(--ink-3)', marginBottom: '24px' }}>{m.body}</p>
              <div style={{ display: 'flex', gap: '24px', paddingTop: '20px', borderTop: '1px solid var(--hair)' }}>
                {m.stats.map((s) => (
                  <div key={s.label}>
                    <div className="font-serif font-semibold" style={{ fontSize: '20px', lineHeight: 1, color: 'var(--ink)' }}>{s.value}</div>
                    <div className="font-mono uppercase" style={{ fontSize: '8px', letterSpacing: '0.1em', color: 'var(--ink-4)', marginTop: '4px' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
