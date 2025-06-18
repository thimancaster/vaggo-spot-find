
import { useState } from 'react';
import { Plus, ArrowLeft } from 'lucide-react';
import { VehicleCard } from '../components/VehicleCard';
import { useVehicles } from '../hooks/useVehicles';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useToast } from '../hooks/use-toast';

interface VehiclesPageProps {
  onBack: () => void;
}

export function VehiclesPage({ onBack }: VehiclesPageProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newPlate, setNewPlate] = useState('');
  const { toast } = useToast();
  const { vehicles, loading, addVehicle, removeVehicle } = useVehicles();

  const validatePlate = (plate: string) => {
    // Brazilian license plate format (ABC1234 or ABC1D23)
    const oldFormat = /^[A-Z]{3}[0-9]{4}$/;
    const newFormat = /^[A-Z]{3}[0-9][A-Z][0-9]{2}$/;
    const cleanPlate = plate.replace(/[^A-Z0-9]/g, '').toUpperCase();
    
    return oldFormat.test(cleanPlate) || newFormat.test(cleanPlate);
  };

  const handleAddVehicle = async () => {
    const cleanPlate = newPlate.replace(/[^A-Z0-9]/g, '').toUpperCase();
    
    if (!validatePlate(cleanPlate)) {
      toast({
        title: "Placa inválida",
        description: "Por favor, insira uma placa válida (ex: ABC1234 ou ABC1D23).",
        variant: "destructive"
      });
      return;
    }

    if (vehicles.some(v => v.plate === cleanPlate)) {
      toast({
        title: "Veículo já cadastrado",
        description: "Esta placa já está cadastrada.",
        variant: "destructive"
      });
      return;
    }

    await addVehicle(cleanPlate);
    setNewPlate('');
    setIsAdding(false);
  };

  const formatPlate = (plate: string) => {
    const clean = plate.replace(/[^A-Z0-9]/g, '').toUpperCase();
    if (clean.length <= 3) return clean;
    if (clean.length <= 7) {
      return clean.slice(0, 3) + '-' + clean.slice(3);
    }
    return clean.slice(0, 3) + '-' + clean.slice(3, 7);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#081C2D] flex items-center justify-center">
        <div className="text-white text-lg">Carregando veículos...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#081C2D] pb-20 animate-fade-in">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="flex items-center space-x-3">
          <button
            onClick={onBack}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold text-white">Gerenciar Veículos</h1>
        </div>
      </div>

      <div className="p-4">
        {/* Add Vehicle Button */}
        {!isAdding && (
          <Button
            onClick={() => setIsAdding(true)}
            className="w-full bg-gradient-to-r from-[#7CFC00] to-lime-400 text-[#081C2D] font-bold mb-6 h-12 rounded-xl transition-transform duration-200 hover:scale-105"
          >
            <Plus className="w-5 h-5 mr-2" />
            Adicionar Veículo
          </Button>
        )}

        {/* Add Vehicle Form */}
        {isAdding && (
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-600 mb-6">
            <h3 className="text-white font-semibold mb-4">Adicionar novo veículo</h3>
            <div className="space-y-4">
              <Input
                type="text"
                placeholder="Digite a placa (ex: ABC1234)"
                value={formatPlate(newPlate)}
                onChange={(e) => setNewPlate(e.target.value)}
                className="bg-gray-700 border-gray-500 text-white placeholder-gray-400"
                maxLength={8}
              />
              <div className="flex space-x-3">
                <Button
                  onClick={handleAddVehicle}
                  className="flex-1 bg-[#7CFC00] hover:bg-[#6BD300] text-[#081C2D] font-bold"
                >
                  Adicionar
                </Button>
                <Button
                  onClick={() => {
                    setIsAdding(false);
                    setNewPlate('');
                  }}
                  variant="outline"
                  className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  Cancelar
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Vehicles List */}
        {vehicles.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🚗</span>
            </div>
            <h3 className="text-white font-semibold mb-2">Nenhum veículo cadastrado</h3>
            <p className="text-gray-400">Adicione seu primeiro veículo para começar a usar o VAGGO.</p>
          </div>
        ) : (
          <div className="space-y-3">
            <h3 className="text-white font-semibold mb-3">Meus Veículos ({vehicles.length})</h3>
            {vehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                onRemove={removeVehicle}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
