
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';

interface FinalCTAProps {
  onGetStarted: () => void;
}

export function FinalCTA({ onGetStarted }: FinalCTAProps) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={{ color: 'rgb(var(--text-primary))' }}>
          Pronto para nunca mais perder tempo procurando vaga?
        </h2>
        <p className="text-xl mb-8" style={{ color: 'rgb(var(--text-secondary))' }}>
          Junte-se a milhares de usuários que já descobriram a facilidade do VAGGO.
        </p>
        <Button
          onClick={onGetStarted}
          size="lg"
          className="text-lg px-8 py-4"
          style={{ 
            backgroundColor: 'rgb(var(--highlight-primary))', 
            color: 'rgb(var(--text-on-highlight))' 
          }}
        >
          Começar Grátis Agora
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </div>
    </section>
  );
}
