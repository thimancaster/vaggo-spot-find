
import { useState } from 'react';
import { Car, Wallet, CreditCard } from 'lucide-react';
import { MapView } from '../components/MapView';
import { ActiveReservation } from '../components/ActiveReservation';
import { LocationSearch } from '../components/LocationSearch';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { useParkingSpots } from '../hooks/useParkingSpots';
import { useVehicles } from '../hooks/useVehicles';
import { useReservations } from '../hooks/useReservations';
import { useWallet } from '../hooks/useWallet';
import { Button } from '../components/ui/button';
import { useToast } from '../hooks/use-toast';
import { BgRemovedImage } from '../components/BgRemovedImage';

interface HomePageProps {
  onNavigateToVehicles: () => void;
}

export function HomePage({ onNavigateToVehicles }: HomePageProps) {
  const [selectedSpot, setSelectedSpot] = useState<any>(null);
  const [searchLocation, setSearchLocation] = useState<{address: string; lat: number; lng: number} | null>(null);
  const [reservationLoading, setReservationLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'wallet'>('stripe');
  const { toast } = useToast();
  
  const { parkingSpots, loading: spotsLoading } = useParkingSpots();
  const { vehicles, loading: vehiclesLoading } = useVehicles();
  const { currentReservation, makeReservation, endReservation } = useReservations();
  const { wallet, payWithWallet } = useWallet();

  const handleLocationSelect = (location: { address: string; lat: number; lng: number }) => {
    setSearchLocation(location);
    toast({
      title: "Localização selecionada",
      description: `Buscando vagas próximas a ${location.address}`,
    });
  };

  const handleReservation = async () => {
    if (!selectedSpot) {
      toast({
        title: "Selecione uma vaga",
        description: "Por favor, selecione uma vaga no mapa antes de reservar.",
        variant: "destructive"
      });
      return;
    }

    if (vehicles.length === 0) {
      toast({
        title: "Adicione um veículo",
        description: "Você precisa adicionar um veículo antes de fazer uma reserva.",
        variant: "destructive"
      });
      return;
    }

    if (currentReservation) {
      toast({
        title: "Reserva ativa",
        description: "Você já possui uma reserva ativa. Finalize-a antes de fazer uma nova.",
        variant: "destructive"
      });
      return;
    }

    setReservationLoading(true);
    try {
      if (paymentMethod === 'wallet') {
        // Pay with wallet balance
        const result = await payWithWallet(
          selectedSpot.id,
          vehicles[0].id,
          1, // 1 hour duration
          selectedSpot.price
        );
        
        if (result) {
          setSelectedSpot(null);
          toast({
            title: "Reserva confirmada!",
            description: `Vaga reservada em ${selectedSpot.name} usando saldo da carteira`,
          });
        }
      } else {
        // Pay with Stripe
        const reservation = await makeReservation(selectedSpot, vehicles[0].id);
        if (reservation) {
          setSelectedSpot(null);
          toast({
            title: "Reserva confirmada!",
            description: `Vaga reservada em ${selectedSpot.name}`,
          });
        }
      }
    } finally {
      setReservationLoading(false);
    }
  };

  const handleEndReservation = async () => {
    if (currentReservation) {
      await endReservation(currentReservation.id);
      toast({
        title: "Reserva finalizada",
        description: "Sua reserva foi finalizada com sucesso.",
      });
    }
  };

  if (spotsLoading || vehiclesLoading) {
    return <LoadingSpinner message="Carregando vagas disponíveis..." fullScreen />;
  }

  return (
    <div className="min-h-screen bg-[#081C2D] pb-20 animate-fade-in">
      {/* Header */}
      <div className="text-center py-8 px-4">
        <BgRemovedImage
          src="/lovable-uploads/e9f2a366-3ff8-48f6-b007-8e124ddf7234.png"
          alt="VagGo Logo"
          className="h-20 w-auto mx-auto mb-10"
        />
        
        {/* Enhanced Search Bar */}
        <div className="max-w-md mx-auto mb-6">
          <LocationSearch
            onLocationSelect={handleLocationSelect}
            placeholder="Para onde você quer ir?"
          />
          {searchLocation && (
            <p className="text-gray-400 text-sm mt-2">
              📍 {searchLocation.address}
            </p>
          )}
        </div>
      </div>

      <div className="px-4">
        {/* Active Reservation with Enhanced Timer */}
        {currentReservation && (
          <ActiveReservation
            reservation={currentReservation}
            onEndReservation={handleEndReservation}
          />
        )}

        {/* Enhanced Map with Geolocation */}
        <div className="mb-6">
          <MapView
            parkingSpots={parkingSpots}
            onSpotSelect={setSelectedSpot}
            selectedSpot={selectedSpot}
          />
        </div>

        {/* Enhanced Selected Spot Info */}
        {selectedSpot && !currentReservation && (
          <div className="mb-6">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-600">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[#7CFC00] rounded-full flex items-center justify-center">
                    <span className="text-[#081C2D] font-bold">P</span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">{selectedSpot.name}</h3>
                    <p className="text-gray-400">Disponível agora</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold text-xl">R$ {selectedSpot.price.toFixed(2)}</p>
                  <p className="text-gray-400 text-sm">por hora</p>
                </div>
              </div>
              
              {/* Reservation Info */}
              <div className="bg-gray-700 rounded-lg p-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Duração:</span>
                  <span className="text-white">1 hora</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Veículo:</span>
                  <span className="text-white">
                    {vehicles.length > 0 ? vehicles[0].plate : 'Nenhum veículo'}
                  </span>
                </div>
              </div>
              
              {/* Payment Method Selection */}
              <div className="mb-4">
                <p className="text-gray-300 text-sm mb-3">Escolha a forma de pagamento:</p>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant={paymentMethod === 'stripe' ? 'default' : 'outline'}
                    onClick={() => setPaymentMethod('stripe')}
                    className="flex flex-col items-center p-3 h-auto"
                  >
                    <CreditCard className="h-4 w-4 mb-1" />
                    <span className="text-xs">Cartão</span>
                  </Button>
                  <Button
                    variant={paymentMethod === 'wallet' ? 'default' : 'outline'}
                    onClick={() => setPaymentMethod('wallet')}
                    disabled={!wallet || wallet.balance < selectedSpot.price}
                    className="flex flex-col items-center p-3 h-auto"
                  >
                    <Wallet className="h-4 w-4 mb-1" />
                    <span className="text-xs">
                      Carteira (R$ {wallet?.balance?.toFixed(2) || '0,00'})
                    </span>
                  </Button>
                </div>
                {paymentMethod === 'wallet' && wallet && wallet.balance < selectedSpot.price && (
                  <p className="text-red-400 text-xs mt-2">
                    Saldo insuficiente. Adicione créditos na sua carteira.
                  </p>
                )}
              </div>
              
              <Button 
                onClick={handleReservation}
                disabled={vehicles.length === 0 || reservationLoading || (paymentMethod === 'wallet' && (!wallet || wallet.balance < selectedSpot.price))}
                className="w-full bg-gradient-to-r from-[#7CFC00] to-lime-400 text-[#081C2D] font-bold text-lg h-12 rounded-xl transition-transform duration-200 hover:scale-105"
              >
                {reservationLoading ? 'Reservando...' : 
                 vehicles.length === 0 ? 'Adicione um veículo primeiro' : 
                 paymentMethod === 'wallet' ? `Pagar com Carteira (R$ ${selectedSpot.price.toFixed(2)})` :
                 'Reservar com Cartão'}
              </Button>
            </div>
          </div>
        )}

        {/* Enhanced Manage Vehicles */}
        <div>
          <button
            onClick={onNavigateToVehicles}
            className="w-full bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-xl p-4 transition-all duration-200 hover:scale-[1.02]"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center">
                  <Car className="text-[#7CFC00] w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="text-white font-medium block">Gerenciar veículos</span>
                  <span className="text-gray-400 text-sm">
                    {vehicles.length === 0 ? 'Nenhum veículo cadastrado' : `${vehicles.length} veículo(s) cadastrado(s)`}
                  </span>
                </div>
              </div>
              <span className="text-gray-400">→</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
