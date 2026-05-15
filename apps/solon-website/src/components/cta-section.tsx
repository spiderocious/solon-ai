import { DEMO_APP_URL } from '@/config/links';
import content from '@/content/site.json';

const cta = content.cta;

export function CtaSection() {
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="font-mono text-[10px] uppercase tracking-[0.14em] mb-4" style={{ color: 'var(--forest-700)' }}>
          Try it now
        </div>
        <h2 className="font-serif font-semibold text-[38px] md:text-[52px] leading-[1.07] tracking-tight mb-5" style={{ color: 'var(--ink)' }}>
          {cta.headline.split('\n').map((line, i) => (
            <span key={i} className={i > 0 ? 'block' : ''}>{line}</span>
          ))}
        </h2>
        <p className="font-sans text-[16px] md:text-[17px] leading-relaxed mb-8 max-w-md mx-auto" style={{ color: 'var(--ink-3)' }}>
          {cta.body}
        </p>
        <a
          href={DEMO_APP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-[4px] font-sans text-[15px] font-semibold transition-all hover:opacity-90 active:scale-[0.98]"
          style={{ background: 'var(--ink)', color: 'var(--paper)' }}
        >
          {cta.button}
        </a>
      </div>
    </section>
  );
}
