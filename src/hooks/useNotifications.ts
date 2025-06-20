
import { useEffect } from 'react';
import { toast } from 'sonner';
import { Reservation } from './useReservations';

export function useNotifications(reservation: Reservation | null) {
  useEffect(() => {
    if (!reservation) return;

    const endTime = new Date(reservation.end_time);
    const now = new Date();
    const diff = endTime.getTime() - now.getTime();

    // Notificação 15 minutos antes do fim
    const fifteenMinutes = 15 * 60 * 1000;
    if (diff > fifteenMinutes) {
      const timeout15 = setTimeout(() => {
        toast.warning('Sua reserva expira em 15 minutos!', {
          duration: 10000,
          action: {
            label: 'Ver Reserva',
            onClick: () => console.log('Navegar para reserva'),
          },
        });
      }, diff - fifteenMinutes);

      return () => clearTimeout(timeout15);
    }

    // Notificação 5 minutos antes do fim
    const fiveMinutes = 5 * 60 * 1000;
    if (diff > fiveMinutes) {
      const timeout5 = setTimeout(() => {
        toast.error('Sua reserva expira em 5 minutos!', {
          duration: 15000,
          action: {
            label: 'Ver Reserva',
            onClick: () => console.log('Navegar para reserva'),
          },
        });
      }, diff - fiveMinutes);

      return () => clearTimeout(timeout5);
    }

    // Notificação quando expirar
    if (diff > 0) {
      const timeoutExpired = setTimeout(() => {
        toast.error('Sua reserva expirou!', {
          duration: 20000,
        });
      }, diff);

      return () => clearTimeout(timeoutExpired);
    }
  }, [reservation]);

  // Solicitar permissão para notificações do navegador
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          toast.success('Notificações ativadas!');
        }
      });
    }
  }, []);
}
