
import { Search, MapPin, CreditCard } from 'lucide-react';

export function HowItWorksSection() {
  const steps = [
    {
      icon: Search,
      title: 'Busque',
      description: 'Digite seu destino e veja todas as vagas disponíveis na região.'
    },
    {
      icon: MapPin,
      title: 'Reserve',
      description: 'Escolha a vaga ideal e reserve com antecedência.'
    },
    {
      icon: CreditCard,
      title: 'Pague',
      description: 'Faça o pagamento seguro pelo app e estacione sem preocupações.'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: 'rgb(var(--text-primary))' }}>
            Como funciona
          </h2>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: 'rgb(var(--text-secondary))' }}>
            Em apenas 3 passos simples você encontra e reserva sua vaga.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="relative mb-6">
                <div className="w-20 h-20 rounded-full mx-auto flex items-center justify-center border-2" style={{ borderColor: 'rgb(var(--highlight-primary))' }}>
                  <step.icon className="w-10 h-10" style={{ color: 'rgb(var(--highlight-primary))' }} />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{ backgroundColor: 'rgb(var(--highlight-primary))', color: 'rgb(var(--text-on-highlight))' }}>
                  {index + 1}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: 'rgb(var(--text-primary))' }}>
                {step.title}
              </h3>
              <p style={{ color: 'rgb(var(--text-secondary))' }}>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
