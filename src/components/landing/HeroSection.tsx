
import { Car, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';

interface HeroSectionProps {
  onGetStarted: () => void;
}

export function HeroSection({ onGetStarted }: HeroSectionProps) {
  return (
    <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <div className="mb-8">
          <Car className="w-16 h-16 mx-auto mb-4" style={{ color: 'rgb(var(--highlight-primary))' }} />
        </div>
        <h1 className="text-4xl sm:text-6xl font-bold mb-6" style={{ color: 'rgb(var(--text-primary))' }}>
          Encontre vagas de estacionamento
          <span className="block" style={{ color: 'rgb(var(--highlight-primary))' }}>
            em segundos
          </span>
        </h1>
        <p className="text-xl mb-8 max-w-3xl mx-auto" style={{ color: 'rgb(var(--text-secondary))' }}>
          O VAGGO conecta você às melhores vagas de estacionamento disponíveis na sua região. 
          Reserve, pague e estacione sem complicações.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={onGetStarted}
            size="lg"
            className="text-lg px-8 py-4"
            style={{ 
              backgroundColor: 'rgb(var(--highlight-primary))', 
              color: 'rgb(var(--text-on-highlight))' 
            }}
          >
            Começar Grátis
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
