'use client';

import { useEffect, useRef } from 'react';
import { DEMO_APP_URL } from '@/config/links';
import content from '@/content/site.json';
import { LiveWidgetReel } from './live-widget-reel';

const hero = content.hero;

export function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = headlineRef.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    const timer = setTimeout(() => {
      el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent)',
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="max-w-3xl">
          {/* Headline */}
          <h1
            ref={headlineRef}
            className="font-serif font-semibold text-[44px] sm:text-[56px] md:text-[68px] leading-[1.07] tracking-tight"
            style={{ color: 'var(--ink)' }}
          >
            {hero.headline.split('\n').map((line, i) => (
              <span key={i} className={i > 0 ? 'block' : ''}>
                {i === 1 ? (
                  <span style={{ color: 'var(--forest-700)' }}>{line}</span>
                ) : (
                  line
                )}
              </span>
            ))}
          </h1>

          {/* Sub */}
          <p
            className="font-sans text-[16px] md:text-[18px] leading-relaxed mt-5 max-w-xl"
            style={{ color: 'var(--ink-3)' }}
          >
            {hero.subheadline}
          </p>

          {/* CTAs */}
          <div className="flex items-center gap-3 mt-8 flex-wrap">
            <a
              href={DEMO_APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-[4px] font-sans text-[14px] font-semibold transition-all duration-150 hover:opacity-90 active:scale-[0.98]"
              style={{ background: 'var(--ink)', color: 'var(--paper)' }}
            >
              {hero.cta_primary}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="#modules"
              className="inline-flex items-center gap-1.5 px-4 py-3 font-sans text-[14px] transition-colors hover:opacity-70"
              style={{ color: 'var(--ink-3)' }}
            >
              {hero.cta_secondary}
            </a>
          </div>
        </div>

        {/* Live widget reel */}
        <div className="mt-14 md:mt-16">
          <LiveWidgetReel />
        </div>
      </div>
    </section>
  );
}
