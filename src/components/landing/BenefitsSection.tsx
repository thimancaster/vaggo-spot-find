
import { MapPin, Shield, Clock, Zap } from 'lucide-react';
import { Card, CardContent } from '../ui/card';

export function BenefitsSection() {
  const benefits = [
    {
      icon: MapPin,
      title: "Vagas Garantidas",
      description: "Reserve sua vaga com antecedência e nunca mais perca tempo procurando estacionamento"
    },
    {
      icon: Shield,
      title: "100% Seguro",
      description: "Todas as vagas são verificadas e monitoradas para garantir sua segurança"
    },
    {
      icon: Clock,
      title: "Economia de Tempo",
      description: "Chegue direto ao seu destino sem dar voltas procurando onde estacionar"
    },
    {
      icon: Zap,
      title: "Instantâneo",
      description: "Reserve em segundos através do app e pague de forma automática"
    }
  ];

  return (
    <section id="benefits" className="py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Por que escolher o <span className="text-gradient">VAGGO</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transforme sua experiência de estacionamento com tecnologia inteligente e praticidade incomparável.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index} className="text-center p-6 hover:border-accent transition-all duration-300 hover:transform hover:scale-105 shadow-lg hover:shadow-glow">
              <CardContent className="pt-6">
                <benefit.icon className="text-accent w-12 h-12 mx-auto mb-4" />
                <h3 className="text-foreground font-semibold text-lg mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
