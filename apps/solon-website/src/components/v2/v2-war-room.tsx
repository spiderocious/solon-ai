'use client';

import { useRef, useEffect } from 'react';
import { DEMO_APP_URL } from '@/config/links';
import content from '@/content/v2.json';

const { war_room: wr } = content;

const HIDDEN: React.CSSProperties = {
  opacity: 0,
  transform: 'translateY(22px)',
  transition: 'opacity 0.75s cubic-bezier(0.22,1,0.36,1), transform 0.75s cubic-bezier(0.22,1,0.36,1)',
};

export function V2WarRoom() {
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
    <section ref={sectionRef} id="war-room" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Image — bright enough to see, dark enough for text */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <img
          src="/v2/war-room.png"
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.62) saturate(0.9)' }}
        />
        {/* Left-heavy dark gradient so text is legible */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, rgba(10,7,4,0.88) 0%, rgba(10,7,4,0.7) 45%, rgba(10,7,4,0.3) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,7,4,0.4) 0%, transparent 25%, transparent 72%, rgba(10,7,4,0.6) 100%)' }} />
      </div>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1280px', margin: '0 auto', padding: '160px 24px' }}>
        <div style={{ maxWidth: '560px' }}>
          <div data-reveal data-delay="0" className="font-mono uppercase"
            style={{ ...HIDDEN, fontSize: '9px', letterSpacing: '0.22em', color: '#4ade80', marginBottom: '20px' }}>
            {wr.eyebrow}
          </div>

          <h2 data-reveal data-delay="80" className="font-serif font-semibold"
            style={{ ...HIDDEN, fontSize: 'clamp(36px, 5vw, 68px)', lineHeight: 1.03, color: '#fff', marginBottom: '24px' }}>
            {wr.headline.split('\n').map((line, i) => (
              <span key={i} style={{ display: i > 0 ? 'block' : 'inline' }}>{line}</span>
            ))}
          </h2>

          <p data-reveal data-delay="160" className="font-sans"
            style={{ ...HIDDEN, fontSize: '16px', lineHeight: 1.7, color: 'rgba(245,239,224,0.65)', marginBottom: '40px' }}>
            {wr.body}
          </p>

          <div data-reveal data-delay="240"
            style={{ ...HIDDEN, display: 'flex', flexWrap: 'wrap', gap: '36px', paddingBottom: '36px', marginBottom: '36px', borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
            {wr.stats.map((s) => (
              <div key={s.label}>
                <div className="font-serif font-semibold" style={{ fontSize: '32px', lineHeight: 1, color: '#fff' }}>{s.value}</div>
                <div className="font-mono uppercase" style={{ fontSize: '8px', letterSpacing: '0.12em', color: 'rgba(245,239,224,0.42)', marginTop: '6px' }}>{s.label}</div>
              </div>
            ))}
          </div>

          <div data-reveal data-delay="320" style={{ ...HIDDEN }}>
            <a
              href={`${DEMO_APP_URL}/modules/war-room`}
              target="_blank" rel="noopener noreferrer"
              className="font-sans font-semibold transition-all hover:opacity-90 active:scale-[0.98]"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 28px', borderRadius: '4px', fontSize: '14px', background: 'var(--forest-600)', color: '#fff' }}
            >
              {wr.cta}
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" /></svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
