
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

export interface Vehicle {
  id: string;
  plate: string;
  created_at: string;
  updated_at: string;
  user_id: string;
}

export function useVehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchVehicles = async () => {
    if (!user) {
      setVehicles([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching vehicles:', error);
        toast.error('Erro ao carregar veículos');
      } else {
        setVehicles(data || []);
      }
    } catch (err) {
      console.error('Vehicles fetch error:', err);
      toast.error('Erro ao carregar veículos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, [user]);

  const addVehicle = async (plate: string) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('vehicles')
        .insert({
          plate: plate.toUpperCase(),
          user_id: user.id
        })
        .select()
        .single();

      if (error) {
        console.error('Error adding vehicle:', error);
        toast.error('Erro ao adicionar veículo');
        return;
      }

      setVehicles(prev => [data, ...prev]);
      toast.success('Veículo adicionado com sucesso!');
    } catch (err) {
      console.error('Add vehicle error:', err);
      toast.error('Erro ao adicionar veículo');
    }
  };

  const removeVehicle = async (id: string) => {
    try {
      const { error } = await supabase
        .from('vehicles')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error removing vehicle:', error);
        toast.error('Erro ao remover veículo');
        return;
      }

      setVehicles(prev => prev.filter(v => v.id !== id));
      toast.success('Veículo removido com sucesso!');
    } catch (err) {
      console.error('Remove vehicle error:', err);
      toast.error('Erro ao remover veículo');
    }
  };

  return {
    vehicles,
    loading,
    addVehicle,
    removeVehicle,
    refetch: fetchVehicles
  };
}
