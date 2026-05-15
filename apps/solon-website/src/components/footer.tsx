import { EXTERNAL_LINKS } from '@/config/links';
import content from '@/content/site.json';

const footer = content.footer;

export function Footer() {
  return (
    <footer
      className="border-t py-10"
      style={{ borderColor: 'var(--hair)' }}
    >
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
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
        <div className="flex items-center gap-5">
          <a
            href={EXTERNAL_LINKS.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-[12px] hover:opacity-70 transition-opacity"
            style={{ color: 'var(--ink-3)' }}
          >
            Demo app
          </a>
          <a
            href={EXTERNAL_LINKS.contact}
            className="font-sans text-[12px] hover:opacity-70 transition-opacity"
            style={{ color: 'var(--ink-3)' }}
          >
            Contact
          </a>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 mt-6 pt-6 border-t" style={{ borderColor: 'var(--hair)' }}>
        <p className="font-mono text-[10px]" style={{ color: 'var(--ink-4)' }}>
          {footer.legal}
        </p>
      </div>
    </footer>
  );
}
