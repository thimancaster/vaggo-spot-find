
import { useState } from 'react';
import { MapPin, Clock, Car, StopCircle } from 'lucide-react';
import { Reservation } from '../hooks/useReservations';
import { Button } from './ui/button';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface ActiveReservationProps {
  reservation: Reservation;
  onEndReservation: () => void;
}

export function ActiveReservation({ reservation, onEndReservation }: ActiveReservationProps) {
  const [timeRemaining, setTimeRemaining] = useState('');

  const formatTime = (dateString: string) => {
    return format(new Date(dateString), 'HH:mm', { locale: ptBR });
  };

  const calculateTimeRemaining = () => {
    const endTime = new Date(reservation.end_time);
    const now = new Date();
    const diff = endTime.getTime() - now.getTime();
    
    if (diff <= 0) return 'Expirado';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return `${hours}h ${minutes}min`;
    }
    return `${minutes}min`;
  };

  // Update time remaining every minute
  React.useEffect(() => {
    const updateTime = () => {
      setTimeRemaining(calculateTimeRemaining());
    };
    
    updateTime();
    const interval = setInterval(updateTime, 60000);
    
    return () => clearInterval(interval);
  }, [reservation.end_time]);

  return (
    <div className="bg-gradient-to-r from-[#7CFC00]/10 to-lime-400/10 rounded-xl p-6 border border-[#7CFC00]/30 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-[#7CFC00] rounded-full animate-pulse" />
          <span className="text-[#7CFC00] font-bold">RESERVA ATIVA</span>
        </div>
        <span className="text-white font-bold">{timeRemaining}</span>
      </div>

      {/* Location */}
      <div className="flex items-center space-x-3 mb-3">
        <MapPin className="text-[#7CFC00] w-5 h-5" />
        <div>
          <h3 className="text-white font-semibold text-lg">
            {reservation.parking_spot?.name || 'Local'}
          </h3>
          <p className="text-gray-400">
            {formatTime(reservation.start_time)} - {formatTime(reservation.end_time)}
          </p>
        </div>
      </div>

      {/* Vehicle */}
      <div className="flex items-center space-x-3 mb-4">
        <Car className="text-blue-400 w-5 h-5" />
        <span className="text-white font-medium">
          {reservation.vehicle?.plate || 'Veículo'}
        </span>
      </div>

      {/* Price */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-gray-400">Total pago:</span>
        <span className="text-white font-bold text-xl">
          R$ {reservation.price.toFixed(2)}
        </span>
      </div>

      {/* End Reservation Button */}
      <Button
        onClick={onEndReservation}
        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold h-12 rounded-xl transition-all duration-200"
      >
        <StopCircle className="w-5 h-5 mr-2" />
        Finalizar Reserva
      </Button>
    </div>
  );
}
