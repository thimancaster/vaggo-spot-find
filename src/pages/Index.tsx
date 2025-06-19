
import { Car, MapPin, Clock, Users } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { BottomNavigation } from '../components/BottomNavigation';

const Index = () => {
  const { profile } = useAuth();

  return (
    <div className="min-h-screen bg-[#081C2D] pb-20">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Car className="text-[#7CFC00] w-8 h-8" />
            <span className="text-white text-xl font-bold">VAGGO</span>
          </div>
          <div className="text-white">
            Olá, {profile?.name || 'Usuário'}!
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-6">
        {/* Welcome Section */}
        <div className="text-center py-6">
          <h1 className="text-2xl font-bold text-white mb-2">
            Encontre sua vaga ideal
          </h1>
          <p className="text-gray-400">
            Reserve com antecedência e estacione com segurança
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-800 rounded-xl p-4 border border-gray-600 text-center">
            <MapPin className="text-[#7CFC00] w-8 h-8 mx-auto mb-2" />
            <div className="text-white font-bold text-lg">150+</div>
            <div className="text-gray-400 text-sm">Vagas disponíveis</div>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-4 border border-gray-600 text-center">
            <Clock className="text-[#7CFC00] w-8 h-8 mx-auto mb-2" />
            <div className="text-white font-bold text-lg">24h</div>
            <div className="text-gray-400 text-sm">Reserva antecipada</div>
          </div>
        </div>

        {/* Current Plan */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-600">
          <h3 className="text-white font-semibold mb-4">Seu Plano</h3>
          <div className="flex items-center justify-between">
            <div>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                profile?.plan === 'premium' 
                  ? 'bg-[#7CFC00] text-[#081C2D]' 
                  : 'bg-gray-700 text-gray-300'
              }`}>
                {profile?.plan === 'premium' ? 'Premium' : 'Gratuito'}
              </span>
            </div>
            <Users className="text-gray-400 w-6 h-6" />
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button className="w-full bg-gradient-to-r from-[#7CFC00] to-lime-400 text-[#081C2D] font-bold py-4 rounded-xl">
            Buscar vagas próximas
          </button>
          
          <button className="w-full bg-gray-800 hover:bg-gray-700 border border-gray-600 text-white py-4 rounded-xl transition-colors">
            Minhas reservas
          </button>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Index;
