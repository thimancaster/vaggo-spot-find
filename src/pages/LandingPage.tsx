
import { useState } from 'react';
import { Car, Shield, Clock, MapPin, Check, Star, ArrowRight, Zap, Users, Globe, Crown } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Logo } from '../components/Logo';
import { ThemeToggle } from '../components/ThemeToggle';

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

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

  const faqItems = [
    {
      question: "Como funciona o VAGGO?",
      answer: "É simples! Você abre o app, procura vagas próximas ao seu destino, reserva a vaga desejada e se dirige ao local. O pagamento é automático."
    },
    {
      question: "É seguro deixar meu carro nas vagas do VAGGO?",
      answer: "Sim! Todas as vagas são verificadas e muitas possuem câmeras de segurança. Além disso, trabalhamos apenas com estacionamentos licenciados."
    },
    {
      question: "Posso cancelar uma reserva?",
      answer: "Sim, você pode cancelar gratuitamente até 15 minutos antes do horário reservado."
    },
    {
      question: "Qual a diferença entre o plano gratuito e premium?",
      answer: "O plano gratuito permite 1 veículo e reservas básicas. O Premium oferece veículos ilimitados, reserva antecipada, suporte prioritário e mais benefícios."
    },
    {
      question: "O VAGGO está disponível em quais cidades?",
      answer: "Atualmente estamos nas principais capitais do Brasil, com expansão constante para novas cidades."
    }
  ];

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
    <div className="min-h-screen bg-background text-foreground w-full transition-colors duration-300">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/95 backdrop-blur-sm fixed w-full z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Logo size="md" />
            <div className="hidden md:flex items-center space-x-8">
              <a href="#benefits" className="text-muted-foreground hover:text-accent transition-colors font-medium">Benefícios</a>
              <a href="#how-it-works" className="text-muted-foreground hover:text-accent transition-colors font-medium">Como Funciona</a>
              <a href="#pricing" className="text-muted-foreground hover:text-accent transition-colors font-medium">Planos</a>
              <a href="#faq" className="text-muted-foreground hover:text-accent transition-colors font-medium">FAQ</a>
            </div>
            <div className="flex items-center space-x-3">
              <ThemeToggle />
              <Button
                onClick={onGetStarted}
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold shadow-lg"
              >
                Começar Grátis
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
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

      {/* Stats Section */}
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

      {/* Benefits Section */}
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

      {/* How it Works */}
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

      {/* Testimonials */}
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

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Escolha seu plano
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comece grátis e faça upgrade quando quiser mais funcionalidades.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <Card className="p-8 shadow-lg">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl mb-2">Gratuito</CardTitle>
                <div className="text-4xl font-bold mb-2">R$ 0</div>
                <CardDescription>Para sempre</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center space-x-3">
                    <Check className="text-accent w-5 h-5" />
                    <span className="text-muted-foreground">1 veículo cadastrado</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-accent w-5 h-5" />
                    <span className="text-muted-foreground">Reservas básicas</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-accent w-5 h-5" />
                    <span className="text-muted-foreground">Suporte por e-mail</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-accent w-5 h-5" />
                    <span className="text-muted-foreground">Histórico de reservas</span>
                  </li>
                </ul>
                <Button
                  onClick={onGetStarted}
                  className="w-full bg-muted hover:bg-muted/80 text-muted-foreground"
                >
                  Começar Grátis
                </Button>
              </CardContent>
            </Card>

            {/* Premium Plan */}
            <Card className="bg-gradient-to-br from-accent/20 to-accent/10 border-2 border-accent p-8 relative shadow-xl shadow-glow">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-bold">
                  Mais Popular
                </span>
              </div>
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl mb-2 flex items-center justify-center space-x-2">
                  <Crown className="text-accent w-6 h-6" />
                  <span>Premium</span>
                </CardTitle>
                <div className="text-4xl font-bold mb-2">R$ 9,90</div>
                <CardDescription>por mês</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center space-x-3">
                    <Check className="text-accent w-5 h-5" />
                    <span>Veículos ilimitados</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-accent w-5 h-5" />
                    <span>Reserva antecipada (24h)</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-accent w-5 h-5" />
                    <span>Suporte prioritário</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-accent w-5 h-5" />
                    <span>Histórico detalhado</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-accent w-5 h-5" />
                    <span>Notificações push</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-accent w-5 h-5" />
                    <span>Sem anúncios</span>
                  </li>
                </ul>
                <Button
                  onClick={onGetStarted}
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold shadow-lg"
                >
                  Comece o Premium
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Perguntas Frequentes
            </h2>
            <p className="text-xl text-muted-foreground">
              Tire suas dúvidas sobre o VAGGO
            </p>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <Card key={index} className="shadow-lg">
                <CardHeader
                  className="cursor-pointer hover:bg-secondary/50 transition-colors"
                  onClick={() => setFaqOpen(faqOpen === index ? null : index)}
                >
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{item.question}</CardTitle>
                    <ArrowRight 
                      className={`text-accent w-5 h-5 transition-transform ${
                        faqOpen === index ? 'transform rotate-90' : ''
                      }`} 
                    />
                  </div>
                </CardHeader>
                {faqOpen === index && (
                  <CardContent>
                    <p className="text-muted-foreground">{item.answer}</p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-accent/20 to-accent/10 border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Pronto para transformar sua experiência de estacionamento?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Junte-se a milhares de usuários que já descobriram a liberdade de estacionar sem estresse.
          </p>
          <Button
            onClick={onGetStarted}
            size="lg"
            className="bg-gradient-primary text-accent-foreground font-bold text-xl px-12 py-6 h-auto shadow-xl hover:shadow-glow transform hover:scale-105 transition-all duration-200"
          >
            Começar Gratuitamente
            <ArrowRight className="ml-3 w-6 h-6" />
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            Sem cartão de crédito • Grátis para sempre • Comece em 2 minutos
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4 bg-card">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Logo size="md" className="mb-4" />
              <p className="text-muted-foreground">
                A solução inteligente para estacionamento urbano.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Produto</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-accent transition-colors">Como Funciona</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Planos</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Segurança</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Suporte</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-accent transition-colors">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Contato</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-accent transition-colors">Sobre</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Carreiras</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Privacidade</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 VAGGO. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
