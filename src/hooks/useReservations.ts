
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';
import { ParkingSpot } from './useParkingSpots';
import { Vehicle } from './useVehicles';

export interface Reservation {
  id: string;
  user_id: string;
  vehicle_id: string;
  spot_id: string;
  start_time: string;
  end_time: string;
  price: number;
  duration: number;
  status: 'active' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
  // Joined data
  vehicle?: Vehicle;
  parking_spot?: ParkingSpot;
}

export function useReservations() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentReservation, setCurrentReservation] = useState<Reservation | null>(null);
  const { user } = useAuth();

  const fetchReservations = async () => {
    if (!user) {
      setReservations([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('reservations')
        .select(`
          *,
          vehicle:vehicles(*),
          parking_spot:parking_spots(*)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching reservations:', error);
        toast.error('Erro ao carregar reservas');
      } else {
        setReservations(data || []);
        
        // Find current active reservation
        const activeReservation = data?.find(r => r.status === 'active');
        setCurrentReservation(activeReservation || null);
      }
    } catch (err) {
      console.error('Reservations fetch error:', err);
      toast.error('Erro ao carregar reservas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, [user]);

  const makeReservation = async (spot: ParkingSpot, vehicleId: string, durationMinutes: number = 60) => {
    if (!user) return null;

    try {
      const startTime = new Date();
      const endTime = new Date(startTime.getTime() + durationMinutes * 60 * 1000);

      const { data, error } = await supabase
        .from('reservations')
        .insert({
          user_id: user.id,
          vehicle_id: vehicleId,
          spot_id: spot.id,
          start_time: startTime.toISOString(),
          end_time: endTime.toISOString(),
          price: spot.price,
          duration: durationMinutes,
          status: 'active'
        })
        .select(`
          *,
          vehicle:vehicles(*),
          parking_spot:parking_spots(*)
        `)
        .single();

      if (error) {
        console.error('Error making reservation:', error);
        toast.error('Erro ao fazer reserva');
        return null;
      }

      setReservations(prev => [data, ...prev]);
      setCurrentReservation(data);
      toast.success('Reserva realizada com sucesso!');
      return data;
    } catch (err) {
      console.error('Make reservation error:', err);
      toast.error('Erro ao fazer reserva');
      return null;
    }
  };

  const endReservation = async (reservationId: string) => {
    try {
      const { error } = await supabase
        .from('reservations')
        .update({ status: 'completed' })
        .eq('id', reservationId);

      if (error) {
        console.error('Error ending reservation:', error);
        toast.error('Erro ao finalizar reserva');
        return;
      }

      setReservations(prev => 
        prev.map(r => r.id === reservationId ? { ...r, status: 'completed' as const } : r)
      );
      setCurrentReservation(null);
      toast.success('Reserva finalizada com sucesso!');
    } catch (err) {
      console.error('End reservation error:', err);
      toast.error('Erro ao finalizar reserva');
    }
  };

  return {
    reservations,
    currentReservation,
    loading,
    makeReservation,
    endReservation,
    refetch: fetchReservations
  };
}
