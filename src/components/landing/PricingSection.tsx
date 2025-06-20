
import { Check, Crown } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

interface PricingSectionProps {
  onGetStarted: () => void;
}

export function PricingSection({ onGetStarted }: PricingSectionProps) {
  return (
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
  );
}
