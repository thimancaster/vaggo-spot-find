
import { useState, useEffect, useCallback } from 'react';
import { Reservation } from './useReservations';

interface TimeRemaining {
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
  expired: boolean;
}

export function useReservationTimer(reservation: Reservation | null) {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    hours: 0,
    minutes: 0,
    seconds: 0,
    total: 0,
    expired: false,
  });

  const calculateTimeRemaining = useCallback(() => {
    if (!reservation) {
      return {
        hours: 0,
        minutes: 0,
        seconds: 0,
        total: 0,
        expired: false,
      };
    }

    const endTime = new Date(reservation.end_time);
    const now = new Date();
    const diff = endTime.getTime() - now.getTime();

    if (diff <= 0) {
      return {
        hours: 0,
        minutes: 0,
        seconds: 0,
        total: 0,
        expired: true,
      };
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return {
      hours,
      minutes,
      seconds,
      total: diff,
      expired: false,
    };
  }, [reservation]);

  useEffect(() => {
    const updateTimer = () => {
      setTimeRemaining(calculateTimeRemaining());
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [calculateTimeRemaining]);

  const formatTimeDisplay = () => {
    if (timeRemaining.expired) return 'Expirado';
    
    if (timeRemaining.hours > 0) {
      return `${timeRemaining.hours}h ${timeRemaining.minutes}min ${timeRemaining.seconds}s`;
    }
    
    if (timeRemaining.minutes > 0) {
      return `${timeRemaining.minutes}min ${timeRemaining.seconds}s`;
    }
    
    return `${timeRemaining.seconds}s`;
  };

  return {
    timeRemaining,
    formatTimeDisplay,
  };
}
