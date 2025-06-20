
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';

interface FinalCTAProps {
  onGetStarted: () => void;
}

export function FinalCTA({ onGetStarted }: FinalCTAProps) {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-accent/20 to-accent/10 border-t border-border">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Pronto para transformar sua experiência de estacionamento?
        </h2>
        <p className="text-xl text-muted-foreground mb-8">
          Junte-se a milhares de usuários que já descobriram a liberdade de estacionar sem estresse.
        </p>
        <Button
          onClick={onGetStarted}
          size="lg"
          className="bg-gradient-primary text-accent-foreground font-bold text-xl px-12 py-6 h-auto shadow-xl hover:shadow-glow transform hover:scale-105 transition-all duration-200"
        >
          Começar Gratuitamente
          <ArrowRight className="ml-3 w-6 h-6" />
        </Button>
        <p className="text-sm text-muted-foreground mt-4">
          Sem cartão de crédito • Grátis para sempre • Comece em 2 minutos
        </p>
      </div>
    </section>
  );
}
