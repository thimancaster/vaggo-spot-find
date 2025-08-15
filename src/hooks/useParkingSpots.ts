
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface ParkingSpot {
  id: string;
  name: string;
  price: number;
  lat: number;
  lng: number;
  available: boolean;
  spot_type: string;
  created_at: string;
  updated_at: string;
}

export function useParkingSpots() {
  const [parkingSpots, setParkingSpots] = useState<ParkingSpot[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchParkingSpots = async () => {
    try {
      const { data, error } = await supabase
        .from('parking_spots')
        .select('*')
        .eq('available', true)
        .order('name');

      if (error) {
        console.error('Error fetching parking spots:', error);
        toast.error('Erro ao carregar vagas');
      } else {
        setParkingSpots(data || []);
      }
    } catch (err) {
      console.error('Parking spots fetch error:', err);
      toast.error('Erro ao carregar vagas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParkingSpots();
  }, []);

  return {
    parkingSpots,
    loading,
    refetch: fetchParkingSpots
  };
}
