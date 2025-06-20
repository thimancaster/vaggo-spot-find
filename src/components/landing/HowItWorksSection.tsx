
export function HowItWorksSection() {
  const steps = [
    {
      number: "1",
      title: "Cadastre-se",
      description: "Crie sua conta gratuita em menos de 2 minutos"
    },
    {
      number: "2",
      title: "Encontre vagas",
      description: "Busque vagas próximas ao seu destino"
    },
    {
      number: "3",
      title: "Reserve",
      description: "Escolha a vaga ideal e reserve instantaneamente"
    },
    {
      number: "4",
      title: "Estacione",
      description: "Chegue ao local e estacione com tranquilidade"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 px-4 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Como funciona</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Em apenas 4 passos simples, você está estacionado com segurança e tranquilidade.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, index) => (
            <div key={index} className="text-center relative">
              <div className="w-16 h-16 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg shadow-glow">
                {step.number}
              </div>
              <h3 className="text-foreground font-semibold text-lg mb-3">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
