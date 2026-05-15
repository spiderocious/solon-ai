import { Navbar } from '@components/navbar';
import { Hero } from '@components/hero';
import { ModulesSection } from '@components/modules-section';
import { FeaturesSection } from '@components/features-section';
import { LiveDemoSection } from '@components/live-demo-section';
import { CtaSection } from '@components/cta-section';
import { Footer } from '@components/footer';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ModulesSection />
        <FeaturesSection />
        <LiveDemoSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
