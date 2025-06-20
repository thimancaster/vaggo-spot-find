
import { Star } from 'lucide-react';
import { Card, CardContent } from '../ui/card';

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Maria Silva",
      role: "Empresária",
      comment: "O VAGGO mudou minha rotina! Nunca mais cheguei atrasada aos compromissos.",
      rating: 5,
      avatar: "MS"
    },
    {
      name: "João Santos",
      role: "Motorista de App",
      comment: "Como trabalho dirigindo, o VAGGO me economiza horas por dia. Indispensável!",
      rating: 5,
      avatar: "JS"
    },
    {
      name: "Ana Costa",
      role: "Estudante",
      comment: "Super prático para ir à universidade. O plano gratuito já resolve muito!",
      rating: 5,
      avatar: "AC"
    }
  ];

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            O que nossos usuários dizem
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Milhares de pessoas já transformaram sua rotina com o VAGGO.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 shadow-lg hover:shadow-glow transition-all duration-300">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="text-accent w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 italic">"{testimonial.comment}"</p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-accent text-accent-foreground rounded-full flex items-center justify-center font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="text-foreground font-semibold">{testimonial.name}</div>
                    <div className="text-muted-foreground text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
