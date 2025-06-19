
import { useState } from 'react';
import { Car, Shield, Clock, MapPin, Check, Star, ArrowRight, Zap, Users, Globe, Crown } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';

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
    <div className="min-h-screen bg-[#081C2D] text-white">
      {/* Navigation */}
      <nav className="border-b border-gray-700 bg-[#081C2D]/95 backdrop-blur-sm fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Car className="text-[#7CFC00] w-8 h-8" />
              <span className="text-white text-xl font-bold">VAGGO</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#benefits" className="text-gray-300 hover:text-[#7CFC00] transition-colors">Benefícios</a>
              <a href="#how-it-works" className="text-gray-300 hover:text-[#7CFC00] transition-colors">Como Funciona</a>
              <a href="#pricing" className="text-gray-300 hover:text-[#7CFC00] transition-colors">Planos</a>
              <a href="#faq" className="text-gray-300 hover:text-[#7CFC00] transition-colors">FAQ</a>
            </div>
            <Button
              onClick={onGetStarted}
              className="bg-[#7CFC00] hover:bg-[#6BD300] text-[#081C2D] font-bold"
            >
              Começar Grátis
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Nunca mais perca tempo
              <span className="text-[#7CFC00]"> procurando vaga</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-8 leading-relaxed">
              Reserve vagas de estacionamento com antecedência e tenha a garantia de um local seguro para seu veículo. Economize tempo e estresse todos os dias.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button
                onClick={onGetStarted}
                size="lg"
                className="bg-gradient-to-r from-[#7CFC00] to-lime-400 text-[#081C2D] font-bold text-lg px-8 py-4 h-auto"
              >
                Comece Grátis Agora
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-[#7CFC00] text-[#7CFC00] hover:bg-[#7CFC00] hover:text-[#081C2D] font-bold text-lg px-8 py-4 h-auto"
              >
                Ver Como Funciona
              </Button>
            </div>
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-[#7CFC00]" />
                <span>Cadastro gratuito</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-[#7CFC00]" />
                <span>Sem compromisso</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-[#7CFC00]" />
                <span>Comece em 2 minutos</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-[#7CFC00] mb-2">50k+</div>
              <div className="text-gray-400">Usuários ativos</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#7CFC00] mb-2">1M+</div>
              <div className="text-gray-400">Reservas realizadas</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#7CFC00] mb-2">500+</div>
              <div className="text-gray-400">Estacionamentos parceiros</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#7CFC00] mb-2">98%</div>
              <div className="text-gray-400">Satisfação dos usuários</div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Por que escolher o <span className="text-[#7CFC00]">VAGGO</span>?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Transforme sua experiência de estacionamento com tecnologia inteligente e praticidade incomparável.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="bg-gray-800/50 border-gray-600 text-center p-6 hover:border-[#7CFC00] transition-all duration-300 hover:transform hover:scale-105">
                <CardContent className="pt-6">
                  <benefit.icon className="text-[#7CFC00] w-12 h-12 mx-auto mb-4" />
                  <h3 className="text-white font-semibold text-lg mb-3">{benefit.title}</h3>
                  <p className="text-gray-400">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-20 px-4 bg-gray-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Como funciona</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Em apenas 4 passos simples, você está estacionado com segurança e tranquilidade.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-[#7CFC00] text-[#081C2D] rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step.number}
                </div>
                <h3 className="text-white font-semibold text-lg mb-3">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute transform translate-x-20 -translate-y-8">
                    <ArrowRight className="text-[#7CFC00] w-6 h-6" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              O que nossos usuários dizem
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Milhares de pessoas já transformaram sua rotina com o VAGGO.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-gray-800/50 border-gray-600 p-6">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="text-[#7CFC00] w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-6 italic">"{testimonial.comment}"</p>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-[#7CFC00] text-[#081C2D] rounded-full flex items-center justify-center font-bold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="text-white font-semibold">{testimonial.name}</div>
                      <div className="text-gray-400 text-sm">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 bg-gray-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Escolha seu plano
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Comece grátis e faça upgrade quando quiser mais funcionalidades.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <Card className="bg-gray-800/50 border-gray-600 p-8">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl text-white mb-2">Gratuito</CardTitle>
                <div className="text-4xl font-bold text-white mb-2">R$ 0</div>
                <CardDescription className="text-gray-400">Para sempre</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center space-x-3">
                    <Check className="text-[#7CFC00] w-5 h-5" />
                    <span className="text-gray-300">1 veículo cadastrado</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-[#7CFC00] w-5 h-5" />
                    <span className="text-gray-300">Reservas básicas</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-[#7CFC00] w-5 h-5" />
                    <span className="text-gray-300">Suporte por e-mail</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-[#7CFC00] w-5 h-5" />
                    <span className="text-gray-300">Histórico de reservas</span>
                  </li>
                </ul>
                <Button
                  onClick={onGetStarted}
                  className="w-full bg-gray-700 hover:bg-gray-600 text-white"
                >
                  Começar Grátis
                </Button>
              </CardContent>
            </Card>

            {/* Premium Plan */}
            <Card className="bg-gradient-to-br from-[#7CFC00]/10 to-lime-400/10 border-[#7CFC00] p-8 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-[#7CFC00] text-[#081C2D] px-4 py-1 rounded-full text-sm font-bold">
                  Mais Popular
                </span>
              </div>
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl text-white mb-2 flex items-center justify-center space-x-2">
                  <Crown className="text-[#7CFC00] w-6 h-6" />
                  <span>Premium</span>
                </CardTitle>
                <div className="text-4xl font-bold text-white mb-2">R$ 9,90</div>
                <CardDescription className="text-gray-400">por mês</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center space-x-3">
                    <Check className="text-[#7CFC00] w-5 h-5" />
                    <span className="text-white">Veículos ilimitados</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-[#7CFC00] w-5 h-5" />
                    <span className="text-white">Reserva antecipada (24h)</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-[#7CFC00] w-5 h-5" />
                    <span className="text-white">Suporte prioritário</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-[#7CFC00] w-5 h-5" />
                    <span className="text-white">Histórico detalhado</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-[#7CFC00] w-5 h-5" />
                    <span className="text-white">Notificações push</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-[#7CFC00] w-5 h-5" />
                    <span className="text-white">Sem anúncios</span>
                  </li>
                </ul>
                <Button
                  onClick={onGetStarted}
                  className="w-full bg-[#7CFC00] hover:bg-[#6BD300] text-[#081C2D] font-bold"
                >
                  Comece o Premium
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Perguntas Frequentes
            </h2>
            <p className="text-xl text-gray-400">
              Tire suas dúvidas sobre o VAGGO
            </p>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <Card key={index} className="bg-gray-800/50 border-gray-600">
                <CardHeader
                  className="cursor-pointer"
                  onClick={() => setFaqOpen(faqOpen === index ? null : index)}
                >
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white text-lg">{item.question}</CardTitle>
                    <ArrowRight 
                      className={`text-[#7CFC00] w-5 h-5 transition-transform ${
                        faqOpen === index ? 'transform rotate-90' : ''
                      }`} 
                    />
                  </div>
                </CardHeader>
                {faqOpen === index && (
                  <CardContent>
                    <p className="text-gray-300">{item.answer}</p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-[#7CFC00]/10 to-lime-400/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Pronto para transformar sua experiência de estacionamento?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Junte-se a milhares de usuários que já descobriram a liberdade de estacionar sem estresse.
          </p>
          <Button
            onClick={onGetStarted}
            size="lg"
            className="bg-gradient-to-r from-[#7CFC00] to-lime-400 text-[#081C2D] font-bold text-xl px-12 py-6 h-auto"
          >
            Começar Gratuitamente
            <ArrowRight className="ml-3 w-6 h-6" />
          </Button>
          <p className="text-sm text-gray-400 mt-4">
            Sem cartão de crédito • Grátis para sempre • Comece em 2 minutos
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-700 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Car className="text-[#7CFC00] w-8 h-8" />
                <span className="text-white text-xl font-bold">VAGGO</span>
              </div>
              <p className="text-gray-400">
                A solução inteligente para estacionamento urbano.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Produto</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-[#7CFC00] transition-colors">Como Funciona</a></li>
                <li><a href="#" className="hover:text-[#7CFC00] transition-colors">Planos</a></li>
                <li><a href="#" className="hover:text-[#7CFC00] transition-colors">Segurança</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Suporte</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-[#7CFC00] transition-colors">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-[#7CFC00] transition-colors">Contato</a></li>
                <li><a href="#" className="hover:text-[#7CFC00] transition-colors">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-[#7CFC00] transition-colors">Sobre</a></li>
                <li><a href="#" className="hover:text-[#7CFC00] transition-colors">Carreiras</a></li>
                <li><a href="#" className="hover:text-[#7CFC00] transition-colors">Privacidade</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 VAGGO. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
