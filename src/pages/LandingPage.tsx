
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
  return (
    <div className="min-h-screen bg-background text-foreground w-full transition-colors duration-300">
      <Navigation onGetStarted={onGetStarted} />
      <HeroSection onGetStarted={onGetStarted} />
      <StatsSection />
      <BenefitsSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <PricingSection onGetStarted={onGetStarted} />
      <FAQSection />
      <FinalCTA onGetStarted={onGetStarted} />
      <Footer />
    </div>
  );
}
