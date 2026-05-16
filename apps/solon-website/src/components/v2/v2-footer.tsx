import { DEMO_APP_URL } from '@/config/links';
import content from '@/content/v2.json';

const { footer } = content;

export function V2Footer() {
  return (
    <footer className="border-t py-12" style={{ background: 'var(--paper)', borderColor: 'var(--hair)' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          {/* Brand */}
          <div>
            <div className="font-serif font-semibold text-[18px]" style={{ color: 'var(--ink)' }}>
              {footer.brand}
            </div>
            <p className="font-serif italic text-[12px] mt-0.5" style={{ color: 'var(--ink-3)' }}>
              {footer.tagline}
            </p>
          </div>

          {/* Links */}
          <nav className="flex items-center gap-6">
            {footer.links.map((link) => (
              <a
                key={link.label}
                href={link.href === '__DEMO__' ? DEMO_APP_URL : link.href}
                target={link.href === '__DEMO__' || link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href === '__DEMO__' || link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="font-sans text-[12px] hover:opacity-70 transition-opacity"
                style={{ color: 'var(--ink-3)' }}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-8 pt-6 border-t" style={{ borderColor: 'var(--hair)' }}>
          <p className="font-mono text-[10px]" style={{ color: 'var(--ink-4)' }}>
            {footer.legal}
          </p>
        </div>
      </div>
    </footer>
  );
}
