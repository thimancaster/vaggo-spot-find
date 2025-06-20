
export function StatsSection() {
  return (
    <section className="py-16 px-4 bg-card border-y border-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-accent mb-2">50k+</div>
            <div className="text-muted-foreground font-medium">Usuários ativos</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-accent mb-2">1M+</div>
            <div className="text-muted-foreground font-medium">Reservas realizadas</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-accent mb-2">500+</div>
            <div className="text-muted-foreground font-medium">Estacionamentos parceiros</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-accent mb-2">98%</div>
            <div className="text-muted-foreground font-medium">Satisfação dos usuários</div>
          </div>
        </div>
      </div>
    </section>
  );
}
