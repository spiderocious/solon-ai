'use client';

import { useState, useEffect } from 'react';
import { DEMO_APP_URL } from '@/config/links';
import content from '@/content/v2.json';

const { nav } = content;

export function V2Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(245,239,224,0.94)' : 'transparent',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0,0,0,0.07)' : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Brand */}
        <a href="/v2" className="flex items-center gap-2.5">
          <span className="font-serif font-semibold text-[19px] tracking-tight" style={{ color: 'var(--ink)' }}>
            {nav.brand}
          </span>
          <span className="font-mono text-[8px] uppercase tracking-[0.18em] hidden sm:block" style={{ color: 'var(--ink-4)' }}>
            Political Intelligence
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-sans text-[13px] transition-opacity hover:opacity-100"
              style={{ color: 'var(--ink-3)' }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA + hamburger */}
        <div className="flex items-center gap-3">
          <a
            href={DEMO_APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-[4px] font-sans text-[13px] font-medium transition-all hover:opacity-90 active:scale-[0.98]"
            style={{ background: 'var(--forest-700)', color: '#fff' }}
          >
            {nav.cta}
          </a>
          <button
            className="md:hidden flex flex-col gap-[5px] p-1"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <span className="block w-5 h-px transition-all duration-200" style={{ background: 'var(--ink)', transform: open ? 'translateY(6px) rotate(45deg)' : 'none' }} />
            <span className="block w-5 h-px transition-all duration-200" style={{ background: 'var(--ink)', opacity: open ? 0 : 1 }} />
            <span className="block w-5 h-px transition-all duration-200" style={{ background: 'var(--ink)', transform: open ? 'translateY(-6px) rotate(-45deg)' : 'none' }} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className="md:hidden overflow-hidden transition-all duration-200"
        style={{ maxHeight: open ? '220px' : '0', borderBottom: open ? '1px solid rgba(0,0,0,0.07)' : 'none' }}
      >
        <div className="px-6 pb-5 pt-2 flex flex-col gap-3.5" style={{ background: 'rgba(245,239,224,0.98)' }}>
          {nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-sans text-[14px]"
              style={{ color: 'var(--ink-2)' }}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href={DEMO_APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-[14px] font-medium py-2.5 px-4 rounded-[4px] text-center"
            style={{background: 'var(--forest-700)', color: '#fff'}}
            onClick={() => setOpen(false)}
          >
            {nav.cta}
          </a>
        </div>
      </div>
    </header>
  );
}
