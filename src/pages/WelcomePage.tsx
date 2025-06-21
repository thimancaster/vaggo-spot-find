
import { Car, Shield, Clock, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WelcomePageProps {
  onLogin: () => void;
}

export function WelcomePage({ onLogin }: WelcomePageProps) {
  return (
    <div className="min-h-screen bg-[#081C2D] text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <Car className="text-[#7CFC00] w-8 h-8" />
          <span className="text-white text-xl font-bold">VagGo</span>
        </div>
        <Button
          onClick={onLogin}
          variant="outline"
          className="border-[#7CFC00] text-[#7CFC00] hover:bg-[#7CFC00] hover:text-[#081C2D]"
        >
          Entrar
        </Button>
      </div>

      {/* Hero Section */}
      <div className="px-4 py-12 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Encontre vagas de estacionamento
          <span className="text-[#7CFC00]"> facilmente</span>
        </h1>
        <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
          Reserve vagas de estacionamento com antecedência e tenha a garantia de um local seguro para seu veículo.
        </p>
        
        <Button
          onClick={onLogin}
          className="bg-gradient-to-r from-[#7CFC00] to-lime-400 text-[#081C2D] font-bold text-lg px-8 py-4 rounded-xl h-auto"
        >
          Começar agora
        </Button>
      </div>

      {/* Features */}
      <div className="px-4 py-12">
        <h2 className="text-2xl font-bold text-center mb-8">Por que escolher o VagGo?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-600 text-center">
            <Shield className="text-[#7CFC00] w-12 h-12 mx-auto mb-4" />
            <h3 className="text-white font-semibold mb-2">Seguro e Confiável</h3>
            <p className="text-gray-400 text-sm">
              Vagas verificadas e monitoradas para sua segurança
            </p>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-600 text-center">
            <Clock className="text-[#7CFC00] w-12 h-12 mx-auto mb-4" />
            <h3 className="text-white font-semibold mb-2">Reserva Antecipada</h3>
            <p className="text-gray-400 text-sm">
              Reserve com antecedência e evite surpresas
            </p>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-600 text-center">
            <Crown className="text-[#7CFC00] w-12 h-12 mx-auto mb-4" />
            <h3 className="text-white font-semibold mb-2">Planos Flexíveis</h3>
            <p className="text-gray-400 text-sm">
              Escolha o plano que melhor se adapta às suas necessidades
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="px-4 py-12 bg-gray-800 mt-12">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Pronto para começar?</h2>
          <p className="text-gray-400 mb-6">
            Junte-se a milhares de usuários que já encontraram a solução perfeita para estacionamento.
          </p>
          <Button
            onClick={onLogin}
            className="bg-gradient-to-r from-[#7CFC00] to-lime-400 text-[#081C2D] font-bold text-lg px-8 py-4 rounded-xl h-auto"
          >
            Criar conta grátis
          </Button>
        </div>
      </div>
    </div>
  );
}
