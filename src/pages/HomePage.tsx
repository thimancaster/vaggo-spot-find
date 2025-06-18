
import { useState } from 'react';
import { Search, MapPin, Car } from 'lucide-react';
import { MapView } from '../components/MapView';
import { useParkingSpots } from '../hooks/useParkingSpots';
import { useVehicles } from '../hooks/useVehicles';
import { useReservations } from '../hooks/useReservations';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { useToast } from '../hooks/use-toast';
import { BgRemovedImage } from '../components/BgRemovedImage';

interface HomePageProps {
  onNavigateToVehicles: () => void;
}

export function HomePage({ onNavigateToVehicles }: HomePageProps) {
  const [selectedSpot, setSelectedSpot] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();
  
  const { parkingSpots, loading: spotsLoading } = useParkingSpots();
  const { vehicles, loading: vehiclesLoading } = useVehicles();
  const { makeReservation } = useReservations();

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

    // Use the first vehicle for demo purposes
    await makeReservation(selectedSpot, vehicles[0].id);
  };

  if (spotsLoading || vehiclesLoading) {
    return (
      <div className="min-h-screen bg-[#081C2D] flex items-center justify-center">
        <div className="text-white text-lg">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#081C2D] pb-20 animate-fade-in">
      {/* Header */}
      <div className="text-center py-8 px-4">
        <BgRemovedImage
          src="/lovable-uploads/e9f2a366-3ff8-48f6-b007-8e124ddf7234.png"
          alt="VAGGO Logo"
          className="h-20 w-auto mx-auto mb-10"
        />
        
        {/* Search Bar */}
        <div className="relative max-w-md mx-auto mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Para onde você quer ir?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 bg-gray-800 border-gray-600 text-white placeholder-gray-400 rounded-full h-12"
          />
        </div>
      </div>

      {/* Map */}
      <div className="px-4 mb-6">
        <MapView
          parkingSpots={parkingSpots}
          onSpotSelect={setSelectedSpot}
          selectedSpot={selectedSpot}
        />
      </div>

      {/* Selected Spot Info */}
      {selectedSpot && (
        <div className="px-4 mb-6">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-600">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <MapPin className="text-[#7CFC00] w-6 h-6" />
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
            
            <Button 
              onClick={handleReservation}
              className="w-full bg-gradient-to-r from-[#7CFC00] to-lime-400 text-[#081C2D] font-bold text-lg h-12 rounded-xl transition-transform duration-200 hover:scale-105"
            >
              Reservar vaga
            </Button>
          </div>
        </div>
      )}

      {/* Manage Vehicles */}
      <div className="px-4">
        <button
          onClick={onNavigateToVehicles}
          className="w-full bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-xl p-4 transition-all duration-200 hover:scale-[1.02]"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center">
                <Car className="text-[#7CFC00] w-5 h-5" />
              </div>
              <span className="text-white font-medium">Gerenciar veículos</span>
            </div>
            <span className="text-gray-400">→</span>
          </div>
        </button>
      </div>
    </div>
  );
}
