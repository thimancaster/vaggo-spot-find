
import { Clock, MapPin, Car } from 'lucide-react';
import { Reservation } from '../types';

interface HistoryPageProps {
  reservations: Reservation[];
}

export function HistoryPage({ reservations }: HistoryPageProps) {
  const formatDateTime = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins > 0 ? `${mins}min` : ''}`;
    }
    return `${mins}min`;
  };

  return (
    <div className="min-h-screen bg-[#081C2D] pb-20">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-4">
        <h1 className="text-xl font-bold text-white">Histórico</h1>
      </div>

      <div className="p-4">
        {reservations.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="text-gray-400 w-8 h-8" />
            </div>
            <h3 className="text-white font-semibold mb-2">Nenhuma reserva encontrada</h3>
            <p className="text-gray-400">Suas reservas aparecerão aqui após o uso.</p>
          </div>
        ) : (
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Reservas Recentes</h3>
            {reservations.map((reservation) => (
              <div key={reservation.id} className="bg-gray-800 rounded-xl p-6 border border-gray-600">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-[#7CFC00] rounded-lg flex items-center justify-center">
                      <MapPin className="text-[#081C2D] w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">{reservation.spotName}</h4>
                      <p className="text-gray-400 text-sm">{formatDateTime(reservation.startTime)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[#7CFC00] font-bold">R$ {reservation.price.toFixed(2)}</p>
                    <p className="text-gray-400 text-sm">{formatDuration(reservation.duration)}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 text-gray-400 text-sm">
                  <Car className="w-4 h-4" />
                  <span>Veículo: {reservation.vehiclePlate}</span>
                </div>
                
                <div className="mt-3 pt-3 border-t border-gray-700">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Entrada:</span>
                    <span className="text-white">{formatDateTime(reservation.startTime)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Saída:</span>
                    <span className="text-white">{formatDateTime(reservation.endTime)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
