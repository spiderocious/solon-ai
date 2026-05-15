'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { DEMO_APP_URL } from '@/config/links';
import content from '@/content/site.json';

const nav = content.nav;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(245,239,224,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0,0,0,0.08)' : '1px solid transparent',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 group">
          <span
            className="font-serif font-semibold text-[20px] tracking-tight"
            style={{ color: 'var(--ink)' }}
          >
            {nav.brand}
          </span>
          <span
            className="font-mono text-[9px] uppercase tracking-[0.14em] hidden sm:block"
            style={{ color: 'var(--ink-4)' }}
          >
            {nav.tagline}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-sans text-[13px] transition-colors hover:opacity-100"
              style={{ color: 'var(--ink-3)' }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <a
            href={DEMO_APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-[4px] font-sans text-[13px] font-medium transition-all duration-150 hover:opacity-90 active:scale-[0.98]"
            style={{ background: 'var(--ink)', color: 'var(--paper)' }}
          >
            {nav.cta}
          </a>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-1"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <span className="block w-5 h-px transition-all" style={{ background: 'var(--ink)', transform: menuOpen ? 'translateY(5px) rotate(45deg)' : 'none' }} />
            <span className="block w-5 h-px transition-all" style={{ background: 'var(--ink)', opacity: menuOpen ? 0 : 1 }} />
            <span className="block w-5 h-px transition-all" style={{ background: 'var(--ink)', transform: menuOpen ? 'translateY(-5px) rotate(-45deg)' : 'none' }} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className="md:hidden overflow-hidden transition-all duration-200"
        style={{ maxHeight: menuOpen ? '200px' : '0', borderBottom: menuOpen ? '1px solid rgba(0,0,0,0.08)' : 'none' }}
      >
        <div
          className="px-6 pb-4 pt-2 flex flex-col gap-3"
          style={{ background: 'rgba(245,239,224,0.97)' }}
        >
          {nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-sans text-[14px]"
              style={{ color: 'var(--ink-2)' }}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href={DEMO_APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-[14px] font-medium py-2 px-4 rounded-[4px] text-center"
            style={{ background: 'var(--ink)', color: 'var(--paper)' }}
            onClick={() => setMenuOpen(false)}
          >
            {nav.cta}
          </a>
        </div>
      </div>
    </header>
  );
}
