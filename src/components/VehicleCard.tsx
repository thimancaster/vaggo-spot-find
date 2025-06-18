
import { Trash2 } from 'lucide-react';
import { Vehicle } from '../hooks/useVehicles';

interface VehicleCardProps {
  vehicle: Vehicle;
  onRemove: (id: string) => void;
  onSelect?: (vehicle: Vehicle) => void;
  selected?: boolean;
}

export function VehicleCard({ vehicle, onRemove, onSelect, selected }: VehicleCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <div 
      className={`bg-gray-800 rounded-lg p-4 border transition-all duration-200 ${
        selected ? 'border-[#7CFC00] bg-gray-700' : 'border-gray-600'
      } ${onSelect ? 'cursor-pointer hover:border-gray-500 hover:scale-[1.03]' : ''}`}
      onClick={() => onSelect?.(vehicle)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-[#7CFC00] rounded-lg flex items-center justify-center">
            <span className="text-[#081C2D] font-bold text-sm">🚗</span>
          </div>
          <div>
            <p className="text-white font-semibold">{vehicle.plate}</p>
            <p className="text-gray-400 text-sm">
              Adicionado em {formatDate(vehicle.created_at)}
            </p>
          </div>
        </div>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove(vehicle.id);
          }}
          className="text-red-400 hover:text-red-300 p-2 rounded-lg hover:bg-gray-700 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
