
export function StatsSection() {
  const stats = [
    { number: '10k+', label: 'Usuários Ativos' },
    { number: '500+', label: 'Vagas Disponíveis' },
    { number: '50+', label: 'Cidades Cobertas' },
    { number: '98%', label: 'Satisfação' }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl sm:text-4xl font-bold mb-2" style={{ color: 'rgb(var(--highlight-primary))' }}>
                {stat.number}
              </div>
              <div className="text-sm sm:text-base" style={{ color: 'rgb(var(--text-secondary))' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
