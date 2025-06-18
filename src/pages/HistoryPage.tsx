
import { Clock, MapPin, Car, CheckCircle, XCircle } from 'lucide-react';
import { useReservations } from '../hooks/useReservations';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function HistoryPage() {
  const { reservations, loading } = useReservations();

  const formatDateTime = (dateString: string) => {
    return format(new Date(dateString), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h${mins > 0 ? ` ${mins}min` : ''}`;
    }
    return `${mins}min`;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <Clock className="w-5 h-5 text-[#7CFC00]" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Ativa';
      case 'completed':
        return 'Finalizada';
      case 'cancelled':
        return 'Cancelada';
      default:
        return 'Desconhecido';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-[#7CFC00]';
      case 'completed':
        return 'text-green-500';
      case 'cancelled':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#081C2D] flex items-center justify-center pb-20">
        <div className="text-white text-lg">Carregando histórico...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#081C2D] pb-20 animate-fade-in">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-4">
        <h1 className="text-xl font-bold text-white">Histórico de Reservas</h1>
      </div>

      <div className="p-4">
        {reservations.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-white font-semibold mb-2">Nenhuma reserva encontrada</h3>
            <p className="text-gray-400">Suas reservas aparecerão aqui após serem criadas.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {reservations.map((reservation) => (
              <div
                key={reservation.id}
                className="bg-gray-800 rounded-xl p-6 border border-gray-600"
              >
                {/* Status and Date */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(reservation.status)}
                    <span className={`font-semibold ${getStatusColor(reservation.status)}`}>
                      {getStatusText(reservation.status)}
                    </span>
                  </div>
                  <span className="text-gray-400 text-sm">
                    {formatDateTime(reservation.created_at)}
                  </span>
                </div>

                {/* Location */}
                <div className="flex items-center space-x-3 mb-3">
                  <MapPin className="text-[#7CFC00] w-5 h-5" />
                  <div>
                    <h3 className="text-white font-semibold">
                      {reservation.parking_spot?.name || 'Local não encontrado'}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {formatDateTime(reservation.start_time)} - {formatDateTime(reservation.end_time)}
                    </p>
                  </div>
                </div>

                {/* Vehicle */}
                <div className="flex items-center space-x-3 mb-3">
                  <Car className="text-blue-400 w-5 h-5" />
                  <div>
                    <span className="text-white font-medium">
                      {reservation.vehicle?.plate || 'Veículo não encontrado'}
                    </span>
                  </div>
                </div>

                {/* Duration and Price */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-600">
                  <div className="text-gray-400">
                    <span className="text-sm">Duração: </span>
                    <span className="text-white">{formatDuration(reservation.duration)}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-white font-bold text-lg">
                      R$ {reservation.price.toFixed(2)}
                    </span>
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
