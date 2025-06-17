
import { Crown, User, Mail, MapPin, CreditCard, LogOut } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useAuth } from '../hooks/useAuth';

interface AccountPageProps {
  user: any;
  onUpgradeToPremium: () => void;
  onNavigateToPlans: () => void;
}

export function AccountPage({ onUpgradeToPremium, onNavigateToPlans }: AccountPageProps) {
  const { profile, signOut, updateProfile } = useAuth();

  if (!profile) {
    return (
      <div className="min-h-screen bg-[#081C2D] pb-20 flex items-center justify-center">
        <div className="text-white">Carregando perfil...</div>
      </div>
    );
  }

  const handleUpgradeToPremium = async () => {
    await updateProfile({ plan: 'premium' });
    onUpgradeToPremium();
  };

  return (
    <div className="min-h-screen bg-[#081C2D] pb-20 animate-fade-in">
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
              <h2 className="text-white font-bold text-lg">{profile.name}</h2>
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                profile.plan === 'premium' 
                  ? 'bg-[#7CFC00] text-[#081C2D]' 
                  : 'bg-gray-700 text-gray-300'
              }`}>
                {profile.plan === 'premium' && <Crown className="w-4 h-4 mr-1" />}
                {profile.plan === 'premium' ? 'Premium' : 'Gratuito'}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Mail className="text-gray-400 w-5 h-5" />
              <span className="text-white">{profile.email}</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="text-gray-400 w-5 h-5" />
              <span className="text-white">{profile.city}</span>
            </div>
          </div>
        </div>

        {/* Current Plan */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-600">
          <h3 className="text-white font-semibold mb-4 flex items-center">
            <CreditCard className="w-5 h-5 mr-2 text-[#7CFC00]" />
            Plano Atual
          </h3>
          
          {profile.plan === 'free' ? (
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
                className="w-full bg-gradient-to-r from-[#7CFC00] to-lime-400 text-[#081C2D] font-bold h-12 rounded-xl transition-transform duration-200 hover:scale-105"
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
          
          <Button
            onClick={signOut}
            variant="outline"
            className="w-full bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-xl p-4 text-red-400 hover:text-red-300"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sair da conta
          </Button>
        </div>
      </div>
    </div>
  );
}
