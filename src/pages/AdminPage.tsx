import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { ArrowLeft, Plus, Edit, Trash2, Users, MapPin, Car } from 'lucide-react';
import { Navigate } from 'react-router-dom';

interface ParkingSpot {
  id: string;
  name: string;
  lat: number;
  lng: number;
  price: number;
  available: boolean;
}

interface AdminPageProps {
  onBack: () => void;
}

export function AdminPage({ onBack }: AdminPageProps) {
  const { userRole, loading } = useAuth();
  const [parkingSpots, setParkingSpots] = useState<ParkingSpot[]>([]);
  const [stats, setStats] = useState({ users: 0, spots: 0, activeReservations: 0 });
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingSpot, setEditingSpot] = useState<ParkingSpot | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    lat: '',
    lng: '',
    price: ''
  });

  // Verificar se é admin
  if (!loading && userRole !== 'admin') {
    return <Navigate to="/" replace />;
  }

  useEffect(() => {
    if (userRole === 'admin') {
      loadParkingSpots();
      loadStats();
    }
  }, [userRole]);

  const loadParkingSpots = async () => {
    try {
      const { data, error } = await supabase
        .from('parking_spots')
        .select('*')
        .order('name');

      if (error) {
        console.error('Error loading parking spots:', error);
        toast.error('Erro ao carregar vagas');
        return;
      }

      setParkingSpots(data || []);
    } catch (error) {
      console.error('Error loading parking spots:', error);
      toast.error('Erro ao carregar vagas');
    }
  };

  const loadStats = async () => {
    try {
      const [profilesResult, spotsResult, reservationsResult] = await Promise.all([
        supabase.from('profiles').select('id', { count: 'exact', head: true }),
        supabase.from('parking_spots').select('id', { count: 'exact', head: true }),
        supabase.from('reservations').select('id', { count: 'exact', head: true }).eq('status', 'active')
      ]);

      setStats({
        users: profilesResult.count || 0,
        spots: spotsResult.count || 0,
        activeReservations: reservationsResult.count || 0
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.lat || !formData.lng || !formData.price) {
      toast.error('Preencha todos os campos');
      return;
    }

    try {
      if (editingSpot) {
        // Update
        const { error } = await supabase
          .from('parking_spots')
          .update({
            name: formData.name,
            lat: parseFloat(formData.lat),
            lng: parseFloat(formData.lng),
            price: parseFloat(formData.price)
          })
          .eq('id', editingSpot.id);

        if (error) {
          console.error('Error updating spot:', error);
          toast.error('Erro ao atualizar vaga');
          return;
        }

        toast.success('Vaga atualizada com sucesso');
      } else {
        // Create
        const { error } = await supabase
          .from('parking_spots')
          .insert({
            name: formData.name,
            lat: parseFloat(formData.lat),
            lng: parseFloat(formData.lng),
            price: parseFloat(formData.price),
            available: true
          });

        if (error) {
          console.error('Error creating spot:', error);
          toast.error('Erro ao criar vaga');
          return;
        }

        toast.success('Vaga criada com sucesso');
      }

      resetForm();
      loadParkingSpots();
      loadStats();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Erro ao salvar vaga');
    }
  };

  const handleEdit = (spot: ParkingSpot) => {
    setEditingSpot(spot);
    setFormData({
      name: spot.name,
      lat: spot.lat.toString(),
      lng: spot.lng.toString(),
      price: spot.price.toString()
    });
    setShowAddForm(true);
  };

  const handleDelete = async (spotId: string) => {
    if (!confirm('Tem certeza que deseja excluir esta vaga?')) return;

    try {
      const { error } = await supabase
        .from('parking_spots')
        .delete()
        .eq('id', spotId);

      if (error) {
        console.error('Error deleting spot:', error);
        toast.error('Erro ao excluir vaga');
        return;
      }

      toast.success('Vaga excluída com sucesso');
      loadParkingSpots();
      loadStats();
    } catch (error) {
      console.error('Error deleting spot:', error);
      toast.error('Erro ao excluir vaga');
    }
  };

  const resetForm = () => {
    setFormData({ name: '', lat: '', lng: '', price: '' });
    setShowAddForm(false);
    setEditingSpot(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-foreground text-lg">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            <h1 className="text-3xl font-bold text-foreground">Administração</h1>
          </div>
          <Button onClick={() => setShowAddForm(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Nova Vaga
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Usuários Cadastrados</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.users}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Vagas Cadastradas</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.spots}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Reservas Ativas</CardTitle>
              <Car className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeReservations}</div>
            </CardContent>
          </Card>
        </div>

        {/* Add/Edit Form */}
        {showAddForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{editingSpot ? 'Editar Vaga' : 'Nova Vaga'}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Nome da Vaga</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ex: Vaga Centro - A1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="price">Preço (R$/hora)</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="Ex: 5.00"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lat">Latitude</Label>
                    <Input
                      id="lat"
                      type="number"
                      step="any"
                      value={formData.lat}
                      onChange={(e) => setFormData({ ...formData, lat: e.target.value })}
                      placeholder="Ex: -23.5505"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lng">Longitude</Label>
                    <Input
                      id="lng"
                      type="number"
                      step="any"
                      value={formData.lng}
                      onChange={(e) => setFormData({ ...formData, lng: e.target.value })}
                      placeholder="Ex: -46.6333"
                      required
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button type="submit">
                    {editingSpot ? 'Atualizar' : 'Criar'} Vaga
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancelar
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Parking Spots List */}
        <Card>
          <CardHeader>
            <CardTitle>Vagas Cadastradas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {parkingSpots.map((spot) => (
                <div key={spot.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">{spot.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Lat: {spot.lat}, Lng: {spot.lng} | R$ {spot.price.toFixed(2)}/hora
                    </p>
                    <span className={`text-xs px-2 py-1 rounded ${
                      spot.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {spot.available ? 'Disponível' : 'Ocupada'}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(spot)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(spot.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
              {parkingSpots.length === 0 && (
                <p className="text-center text-muted-foreground py-8">
                  Nenhuma vaga cadastrada ainda.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}