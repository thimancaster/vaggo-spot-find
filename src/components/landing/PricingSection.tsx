
import { Check } from 'lucide-react';
import { Button } from '../ui/button';

interface PricingSectionProps {
  onGetStarted: () => void;
}

export function PricingSection({ onGetStarted }: PricingSectionProps) {
  const plans = [
    {
      name: 'Gratuito',
      price: 'R$ 0',
      period: '/mês',
      features: [
        '3 reservas por mês',
        'Busca básica de vagas',
        'Suporte por email'
      ],
      popular: false
    },
    {
      name: 'Premium',
      price: 'R$ 19,90',
      period: '/mês',
      features: [
        'Reservas ilimitadas',
        'Busca avançada com filtros',
        'Notificações em tempo real',
        'Suporte prioritário',
        'Histórico detalhado'
      ],
      popular: true
    },
    {
      name: 'Empresarial',
      price: 'R$ 49,90',
      period: '/mês',
      features: [
        'Todas as funcionalidades Premium',
        'Gestão de múltiplos veículos',
        'Relatórios de uso',
        'API para integração',
        'Suporte dedicado'
      ],
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: 'rgb(var(--text-primary))' }}>
            Escolha seu plano
          </h2>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: 'rgb(var(--text-secondary))' }}>
            Comece grátis e evolua conforme suas necessidades.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`p-8 rounded-lg border-2 relative ${plan.popular ? 'border-highlight' : 'border-neutral/20'}`}
              style={{ 
                borderColor: plan.popular ? 'rgb(var(--highlight-primary))' : 'rgb(var(--border-neutral) / 0.2)' 
              }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="px-4 py-2 rounded-full text-sm font-bold" style={{ backgroundColor: 'rgb(var(--highlight-primary))', color: 'rgb(var(--text-on-highlight))' }}>
                    Mais Popular
                  </span>
                </div>
              )}
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2" style={{ color: 'rgb(var(--text-primary))' }}>
                  {plan.name}
                </h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold" style={{ color: 'rgb(var(--text-primary))' }}>
                    {plan.price}
                  </span>
                  <span style={{ color: 'rgb(var(--text-secondary))' }}>
                    {plan.period}
                  </span>
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <Check className="w-5 h-5 mr-3" style={{ color: 'rgb(var(--highlight-primary))' }} />
                    <span style={{ color: 'rgb(var(--text-secondary))' }}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <Button
                onClick={onGetStarted}
                className={`w-full ${plan.popular ? 'bg-highlight text-on-highlight' : 'border'}`}
                variant={plan.popular ? 'default' : 'outline'}
                style={plan.popular ? { 
                  backgroundColor: 'rgb(var(--highlight-primary))', 
                  color: 'rgb(var(--text-on-highlight))' 
                } : { 
                  borderColor: 'rgb(var(--border-neutral) / 0.2)', 
                  color: 'rgb(var(--text-primary))' 
                }}
              >
                {plan.name === 'Gratuito' ? 'Começar Grátis' : 'Assinar Agora'}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
