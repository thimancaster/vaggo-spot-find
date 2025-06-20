
import { Clock, MapPin, CreditCard, Shield } from 'lucide-react';

export function BenefitsSection() {
  const benefits = [
    {
      icon: Clock,
      title: 'Economize Tempo',
      description: 'Encontre vagas disponíveis em tempo real e reserve antecipadamente.'
    },
    {
      icon: MapPin,
      title: 'Localização Inteligente',
      description: 'GPS integrado mostra as vagas mais próximas da sua localização.'
    },
    {
      icon: CreditCard,
      title: 'Pagamento Fácil',
      description: 'Pague diretamente pelo app com segurança e praticidade.'
    },
    {
      icon: Shield,
      title: 'Totalmente Seguro',
      description: 'Vagas verificadas e pagamentos protegidos por criptografia.'
    }
  ];

  return (
    <section id="benefits" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: 'rgb(var(--text-primary))' }}>
            Por que escolher o VAGGO?
          </h2>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: 'rgb(var(--text-secondary))' }}>
            Desenvolvido para tornar sua experiência de estacionamento mais simples e eficiente.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center p-6 rounded-lg border" style={{ borderColor: 'rgb(var(--border-neutral) / 0.2)' }}>
              <benefit.icon className="w-12 h-12 mx-auto mb-4" style={{ color: 'rgb(var(--highlight-primary))' }} />
              <h3 className="text-xl font-semibold mb-3" style={{ color: 'rgb(var(--text-primary))' }}>
                {benefit.title}
              </h3>
              <p style={{ color: 'rgb(var(--text-secondary))' }}>
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
