
import { ArrowLeft, Crown, Check, Zap } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useToast } from '../hooks/use-toast';

interface PlansPageProps {
  onBack: () => void;
  onUpgradeToPremium: () => void;
  currentPlan: 'free' | 'premium';
}

export function PlansPage({ onBack, onUpgradeToPremium, currentPlan }: PlansPageProps) {
  const { toast } = useToast();

  const handleUpgrade = () => {
    onUpgradeToPremium();
    toast({
      title: "Upgrade realizado!",
      description: "Bem-vindo ao VAGGO Premium! Aproveite todos os benefícios.",
    });
  };

  const freeFeatures = [
    '1 veículo cadastrado',
    'Reservas básicas',
    'Suporte por e-mail',
    'Histórico de reservas'
  ];

  const premiumFeatures = [
    'Veículos ilimitados',
    'Reserva antecipada',
    'Suporte prioritário',
    'Histórico detalhado',
    'Integração com TAGs (em breve)',
    'Notificações push',
    'Sem anúncios'
  ];

  return (
    <div className="min-h-screen bg-[#081C2D] pb-20">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="flex items-center space-x-3">
          <button
            onClick={onBack}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold text-white">Assine o VAGGO Premium</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Premium Highlight */}
        <div className="text-center py-6">
          <div className="w-20 h-20 bg-[#7CFC00] rounded-full flex items-center justify-center mx-auto mb-4">
            <Crown className="text-[#081C2D] w-10 h-10" />
          </div>
          <h2 className="text-white font-bold text-2xl mb-2">Desbloqueie todo o potencial</h2>
          <p className="text-gray-400">Aproveite recursos exclusivos e uma experiência premium</p>
        </div>

        {/* Free Plan */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-600">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-white font-bold text-lg">Plano Gratuito</h3>
              <p className="text-gray-400">Para uso básico</p>
            </div>
            <div className="text-right">
              <span className="text-white font-bold text-2xl">R$ 0</span>
              <p className="text-gray-400 text-sm">sempre grátis</p>
            </div>
          </div>
          
          <ul className="space-y-3 mb-6">
            {freeFeatures.map((feature, index) => (
              <li key={index} className="flex items-center space-x-3">
                <Check className="text-gray-400 w-5 h-5 flex-shrink-0" />
                <span className="text-gray-300">{feature}</span>
              </li>
            ))}
          </ul>

          {currentPlan === 'free' && (
            <div className="bg-gray-700 rounded-lg p-3">
              <p className="text-gray-300 text-sm font-medium text-center">Plano atual</p>
            </div>
          )}
        </div>

        {/* Premium Plan */}
        <div className="bg-gradient-to-br from-[#7CFC00] to-[#6BD300] rounded-xl p-1">
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="flex items-center space-x-2">
                  <Crown className="text-[#7CFC00] w-6 h-6" />
                  <h3 className="text-white font-bold text-lg">Plano Premium</h3>
                </div>
                <p className="text-gray-400">Experiência completa</p>
              </div>
              <div className="text-right">
                <span className="text-white font-bold text-2xl">R$ 9,90</span>
                <p className="text-gray-400 text-sm">por mês</p>
              </div>
            </div>
            
            <ul className="space-y-3 mb-6">
              {premiumFeatures.map((feature, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <Check className="text-[#7CFC00] w-5 h-5 flex-shrink-0" />
                  <span className="text-white">{feature}</span>
                </li>
              ))}
            </ul>

            {currentPlan === 'premium' ? (
              <div className="bg-[#7CFC00] bg-opacity-10 border border-[#7CFC00] rounded-lg p-3">
                <p className="text-[#7CFC00] text-sm font-medium text-center">
                  ✓ Plano Premium ativo
                </p>
              </div>
            ) : (
              <Button
                onClick={handleUpgrade}
                className="w-full bg-[#7CFC00] hover:bg-[#6BD300] text-[#081C2D] font-bold h-12 rounded-xl"
              >
                <Zap className="w-5 h-5 mr-2" />
                Assinar agora
              </Button>
            )}
          </div>
        </div>

        {/* Benefits highlight */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-600">
          <h3 className="text-white font-semibold mb-4">Por que escolher o Premium?</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-[#7CFC00] rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-gray-300">
                <strong className="text-white">Sem limitações:</strong> Cadastre quantos veículos quiser
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-[#7CFC00] rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-gray-300">
                <strong className="text-white">Reserva antecipada:</strong> Garanta sua vaga com até 24h de antecedência
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-[#7CFC00] rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-gray-300">
                <strong className="text-white">Suporte prioritário:</strong> Atendimento rápido e personalizado
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
