
import { Crown, User, Mail, MapPin, CreditCard } from 'lucide-react';
import { User as UserType } from '../types';
import { Button } from '../components/ui/button';

interface AccountPageProps {
  user: UserType;
  onUpgradeToPremium: () => void;
  onNavigateToPlans: () => void;
}

export function AccountPage({ user, onUpgradeToPremium, onNavigateToPlans }: AccountPageProps) {
  return (
    <div className="min-h-screen bg-[#081C2D] pb-20">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-4">
        <h1 className="text-xl font-bold text-white">Minha Conta</h1>
      </div>

      <div className="p-4 space-y-6">
        {/* User Info */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-600">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-[#7CFC00] rounded-full flex items-center justify-center">
              <User className="text-[#081C2D] w-8 h-8" />
            </div>
            <div>
              <h2 className="text-white font-bold text-lg">{user.name}</h2>
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                user.plan === 'premium' 
                  ? 'bg-[#7CFC00] text-[#081C2D]' 
                  : 'bg-gray-700 text-gray-300'
              }`}>
                {user.plan === 'premium' && <Crown className="w-4 h-4 mr-1" />}
                {user.plan === 'premium' ? 'Premium' : 'Gratuito'}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Mail className="text-gray-400 w-5 h-5" />
              <span className="text-white">{user.email}</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="text-gray-400 w-5 h-5" />
              <span className="text-white">{user.city}</span>
            </div>
          </div>
        </div>

        {/* Current Plan */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-600">
          <h3 className="text-white font-semibold mb-4 flex items-center">
            <CreditCard className="w-5 h-5 mr-2 text-[#7CFC00]" />
            Plano Atual
          </h3>
          
          {user.plan === 'free' ? (
            <div>
              <div className="mb-4">
                <h4 className="text-white font-medium mb-2">Plano Gratuito</h4>
                <ul className="text-gray-400 text-sm space-y-1">
                  <li>• 1 veículo cadastrado</li>
                  <li>• Reservas básicas</li>
                  <li>• Suporte por e-mail</li>
                </ul>
              </div>
              
              <Button
                onClick={onNavigateToPlans}
                className="w-full bg-[#7CFC00] hover:bg-[#6BD300] text-[#081C2D] font-bold h-12 rounded-xl"
              >
                <Crown className="w-5 h-5 mr-2" />
                Upgrade para Premium
              </Button>
            </div>
          ) : (
            <div>
              <div className="mb-4">
                <h4 className="text-white font-medium mb-2 flex items-center">
                  <Crown className="w-4 h-4 mr-1 text-[#7CFC00]" />
                  Plano Premium
                </h4>
                <ul className="text-gray-400 text-sm space-y-1">
                  <li>• Veículos ilimitados</li>
                  <li>• Reserva antecipada</li>
                  <li>• Suporte prioritário</li>
                  <li>• Integração com TAGs (em breve)</li>
                </ul>
              </div>
              
              <div className="bg-[#7CFC00] bg-opacity-10 border border-[#7CFC00] rounded-lg p-3">
                <p className="text-[#7CFC00] text-sm font-medium">
                  ✓ Plano Premium ativo
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Account Actions */}
        <div className="space-y-3">
          <button className="w-full bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-xl p-4 text-left transition-colors">
            <span className="text-white">Editar perfil</span>
          </button>
          
          <button className="w-full bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-xl p-4 text-left transition-colors">
            <span className="text-white">Configurações de notificação</span>
          </button>
          
          <button className="w-full bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-xl p-4 text-left transition-colors">
            <span className="text-white">Termos de uso</span>
          </button>
          
          <button className="w-full bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-xl p-4 text-left transition-colors">
            <span className="text-red-400">Sair da conta</span>
          </button>
        </div>
      </div>
    </div>
  );
}
