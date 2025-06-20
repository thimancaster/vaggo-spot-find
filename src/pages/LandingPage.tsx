
import { useState } from 'react';
import { Navigation } from '../components/landing/Navigation';
import { HeroSection } from '../components/landing/HeroSection';
import { StatsSection } from '../components/landing/StatsSection';
import { BenefitsSection } from '../components/landing/BenefitsSection';
import { HowItWorksSection } from '../components/landing/HowItWorksSection';
import { TestimonialsSection } from '../components/landing/TestimonialsSection';
import { PricingSection } from '../components/landing/PricingSection';
import { FAQSection } from '../components/landing/FAQSection';
import { FinalCTA } from '../components/landing/FinalCTA';
import { Footer } from '../components/landing/Footer';

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-main text-main w-full" style={{ backgroundColor: 'rgb(var(--background-main))', color: 'rgb(var(--text-primary))' }}>
      <Navigation onGetStarted={onGetStarted} />
      <HeroSection onGetStarted={onGetStarted} />
      <StatsSection />
      <BenefitsSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <PricingSection onGetStarted={onGetStarted} />
      <FAQSection faqOpen={faqOpen} setFaqOpen={setFaqOpen} />
      <FinalCTA onGetStarted={onGetStarted} />
      <Footer />
    </div>
  );
}
