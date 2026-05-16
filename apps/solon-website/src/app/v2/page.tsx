import type { Metadata } from 'next';
import { V2Navbar } from '@/components/v2/v2-navbar';
import { V2Hero } from '@/components/v2/v2-hero';
import { V2Ticker } from '@/components/v2/v2-ticker';
import { V2HowItWorks } from '@/components/v2/v2-how-it-works';
import { V2TextureBreak } from '@/components/v2/v2-texture-break';
import { V2Modules } from '@/components/v2/v2-modules';
import { V2WarRoom } from '@/components/v2/v2-war-room';
import { V2Cta } from '@/components/v2/v2-cta';
import { V2Footer } from '@/components/v2/v2-footer';
import content from '@/content/v2.json';

export const metadata: Metadata = {
  title: content.meta.title,
  description: content.meta.description,
};

export default function V2Page() {
  return (
    <main style={{ background: 'var(--paper)' }}>
      <V2Navbar />
      <V2Hero />
      <V2Ticker />
      <V2HowItWorks />
      <V2TextureBreak />
      <V2Modules />
      <V2WarRoom />
      <V2Cta />
      <V2Footer />
    </main>
  );
}
