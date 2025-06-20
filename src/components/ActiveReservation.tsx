
import React from 'react';
import { MapPin, Clock, Car, StopCircle, AlertTriangle } from 'lucide-react';
import { Reservation } from '../hooks/useReservations';
import { useReservationTimer } from '../hooks/useReservationTimer';
import { useNotifications } from '../hooks/useNotifications';
import { Button } from './ui/button';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface ActiveReservationProps {
  reservation: Reservation;
  onEndReservation: () => void;
}

export function ActiveReservation({ reservation, onEndReservation }: ActiveReservationProps) {
  const { timeRemaining, formatTimeDisplay } = useReservationTimer(reservation);
  useNotifications(reservation);

  const formatTime = (dateString: string) => {
    return format(new Date(dateString), 'HH:mm', { locale: ptBR });
  };

  const getTimerColor = () => {
    if (timeRemaining.expired) return 'text-red-400';
    if (timeRemaining.total < 5 * 60 * 1000) return 'text-red-400'; // < 5 min
    if (timeRemaining.total < 15 * 60 * 1000) return 'text-yellow-400'; // < 15 min
    return 'text-[#7CFC00]';
  };

  const getStatusColor = () => {
    if (timeRemaining.expired) return 'from-red-600/10 to-red-400/10 border-red-400/30';
    if (timeRemaining.total < 5 * 60 * 1000) return 'from-red-600/10 to-red-400/10 border-red-400/30';
    if (timeRemaining.total < 15 * 60 * 1000) return 'from-yellow-600/10 to-yellow-400/10 border-yellow-400/30';
    return 'from-[#7CFC00]/10 to-lime-400/10 border-[#7CFC00]/30';
  };

  return (
    <div className={`bg-gradient-to-r ${getStatusColor()} rounded-xl p-6 border mb-6`}>
      {/* Header with status */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          {timeRemaining.expired ? (
            <AlertTriangle className="w-3 h-3 text-red-400" />
          ) : (
            <div className="w-3 h-3 bg-[#7CFC00] rounded-full animate-pulse" />
          )}
          <span className={`font-bold ${timeRemaining.expired ? 'text-red-400' : 'text-[#7CFC00]'}`}>
            {timeRemaining.expired ? 'RESERVA EXPIRADA' : 'RESERVA ATIVA'}
          </span>
        </div>
        <div className="text-right">
          <span className={`font-bold text-lg ${getTimerColor()}`}>
            {formatTimeDisplay()}
          </span>
          {timeRemaining.total < 15 * 60 * 1000 && !timeRemaining.expired && (
            <p className="text-yellow-400 text-xs">Expira em breve!</p>
          )}
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-4">
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-1000 ${
              timeRemaining.expired ? 'bg-red-400' :
              timeRemaining.total < 5 * 60 * 1000 ? 'bg-red-400' :
              timeRemaining.total < 15 * 60 * 1000 ? 'bg-yellow-400' :
              'bg-[#7CFC00]'
            }`}
            style={{ 
              width: timeRemaining.expired ? '100%' : 
                     `${Math.max(0, (timeRemaining.total / (reservation.duration * 60 * 1000)) * 100)}%` 
            }}
          />
        </div>
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

      {/* Action Button */}
      <Button
        onClick={onEndReservation}
        className={`w-full font-bold h-12 rounded-xl transition-all duration-200 ${
          timeRemaining.expired 
            ? 'bg-red-600 hover:bg-red-700 text-white'
            : 'bg-red-600 hover:bg-red-700 text-white'
        }`}
      >
        <StopCircle className="w-5 h-5 mr-2" />
        {timeRemaining.expired ? 'Finalizar Reserva Expirada' : 'Finalizar Reserva'}
      </Button>

      {/* Extension option (for future implementation) */}
      {!timeRemaining.expired && timeRemaining.total < 15 * 60 * 1000 && (
        <Button
          variant="outline"
          className="w-full mt-2 border-[#7CFC00] text-[#7CFC00] hover:bg-[#7CFC00] hover:text-[#081C2D]"
          onClick={() => console.log('Extend reservation')}
        >
          <Clock className="w-4 h-4 mr-2" />
          Estender Reserva (+30min)
        </Button>
      )}
    </div>
  );
}
