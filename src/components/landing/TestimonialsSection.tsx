
import { Star } from 'lucide-react';

export function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Maria Silva',
      role: 'Empresária',
      content: 'O VAGGO mudou minha rotina! Nunca mais perco tempo procurando vaga no centro da cidade.',
      rating: 5
    },
    {
      name: 'João Santos',
      role: 'Professor',
      content: 'App fantástico! Super fácil de usar e sempre encontro vagas próximas da universidade.',
      rating: 5
    },
    {
      name: 'Ana Costa',
      role: 'Médica',
      content: 'Essencial para quem trabalha no centro. Reservo minha vaga antes mesmo de sair de casa.',
      rating: 5
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: 'rgb(var(--text-primary))' }}>
            O que nossos usuários dizem
          </h2>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: 'rgb(var(--text-secondary))' }}>
            Milhares de pessoas já descobriram a facilidade do VAGGO.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="p-6 rounded-lg border" style={{ borderColor: 'rgb(var(--border-neutral) / 0.2)' }}>
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" style={{ color: 'rgb(var(--highlight-primary))' }} />
                ))}
              </div>
              <p className="mb-4" style={{ color: 'rgb(var(--text-secondary))' }}>
                "{testimonial.content}"
              </p>
              <div>
                <div className="font-semibold" style={{ color: 'rgb(var(--text-primary))' }}>
                  {testimonial.name}
                </div>
                <div className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
                  {testimonial.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
