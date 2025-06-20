
import { ArrowRight, Check } from 'lucide-react';
import { Button } from '../ui/button';

interface HeroSectionProps {
  onGetStarted: () => void;
}

export function HeroSection({ onGetStarted }: HeroSectionProps) {
  return (
    <section className="pt-32 pb-20 px-4 bg-gradient-secondary">
      <div className="max-w-7xl mx-auto text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Nunca mais perca tempo
            <span className="text-gradient"> procurando vaga</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            Reserve vagas de estacionamento com antecedência e tenha a garantia de um local seguro para seu veículo. Economize tempo e estresse todos os dias.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              onClick={onGetStarted}
              size="lg"
              className="bg-gradient-primary text-accent-foreground font-bold text-lg px-8 py-4 h-auto shadow-xl hover:shadow-glow transform hover:scale-105 transition-all duration-200"
            >
              Comece Grátis Agora
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground font-bold text-lg px-8 py-4 h-auto"
            >
              Ver Como Funciona
            </Button>
          </div>
          <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-accent" />
              <span>Cadastro gratuito</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-accent" />
              <span>Sem compromisso</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-accent" />
              <span>Comece em 2 minutos</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
