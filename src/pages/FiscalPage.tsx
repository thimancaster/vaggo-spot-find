import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { ArrowLeft, Search, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Navigate } from 'react-router-dom';

interface Reservation {
  id: string;
  start_time: string;
  end_time: string;
  status: string;
  parking_spot: {
    name: string;
  };
  vehicle: {
    plate: string;
  };
}

interface FiscalPageProps {
  onBack: () => void;
}

export function FiscalPage({ onBack }: FiscalPageProps) {
  const { userRole, loading } = useAuth();
  const [searchPlate, setSearchPlate] = useState('');
  const [searchResult, setSearchResult] = useState<Reservation | null>(null);
  const [searching, setSearching] = useState(false);
  const [notFound, setNotFound] = useState(false);

  // Verificar se é fiscal
  if (!loading && userRole !== 'fiscal') {
    return <Navigate to="/" replace />;
  }

  const formatPlate = (plate: string) => {
    // Remove caracteres não alfanuméricos e converte para maiúsculo
    const cleaned = plate.replace(/[^A-Z0-9]/gi, '').toUpperCase();
    
    // Formata para padrão brasileiro (ABC1234 ou ABC1D23)
    if (cleaned.length >= 7) {
      return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
    }
    return cleaned;
  };

  const handleSearch = async () => {
    if (!searchPlate.trim()) {
      toast.error('Digite uma placa para buscar');
      return;
    }

    setSearching(true);
    setSearchResult(null);
    setNotFound(false);

    try {
      // Buscar reserva ativa para a placa
      const cleanPlate = searchPlate.replace(/[^A-Z0-9]/gi, '').toUpperCase();
      
      const { data, error } = await supabase
        .from('reservations')
        .select(`
          *,
          parking_spot:parking_spots(name),
          vehicle:vehicles(plate)
        `)
        .eq('vehicle.plate', cleanPlate)
        .eq('status', 'active')
        .maybeSingle();

      if (error) {
        console.error('Error searching reservation:', error);
        toast.error('Erro ao buscar reserva');
        return;
      }

      if (data) {
        setSearchResult(data);
      } else {
        setNotFound(true);
      }
    } catch (error) {
      console.error('Error searching reservation:', error);
      toast.error('Erro ao buscar reserva');
    } finally {
      setSearching(false);
    }
  };

  const getStatusInfo = (reservation: Reservation) => {
    const now = new Date();
    const endTime = new Date(reservation.end_time);
    const isExpired = now > endTime;

    if (isExpired) {
      return {
        status: 'Vencido',
        color: 'text-red-600',
        icon: <XCircle className="w-5 h-5 text-red-600" />
      };
    } else {
      return {
        status: 'Ativo',
        color: 'text-green-600',
        icon: <CheckCircle className="w-5 h-5 text-green-600" />
      };
    }
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <h1 className="text-3xl font-bold text-foreground">Fiscalização</h1>
        </div>

        {/* Search Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Consultar Ticket de Estacionamento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="plate">Placa do Veículo</Label>
                <div className="flex gap-2">
                  <Input
                    id="plate"
                    value={searchPlate}
                    onChange={(e) => setSearchPlate(formatPlate(e.target.value))}
                    placeholder="ABC-1234"
                    maxLength={8}
                    className="font-mono text-lg"
                  />
                  <Button onClick={handleSearch} disabled={searching}>
                    {searching ? (
                      <Clock className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Search className="w-4 h-4 mr-2" />
                    )}
                    {searching ? 'Buscando...' : 'Buscar'}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search Results */}
        {searchResult && (
          <Card>
            <CardHeader>
              <CardTitle>Resultado da Consulta</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Placa</Label>
                    <p className="text-lg font-mono">{searchResult.vehicle.plate}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Local</Label>
                    <p className="text-lg">{searchResult.parking_spot.name}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Início</Label>
                    <p className="text-lg">{formatDateTime(searchResult.start_time)}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Fim</Label>
                    <p className="text-lg">{formatDateTime(searchResult.end_time)}</p>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <div className="flex items-center gap-2">
                    {getStatusInfo(searchResult).icon}
                    <span className={`text-xl font-semibold ${getStatusInfo(searchResult).color}`}>
                      {getStatusInfo(searchResult).status}
                    </span>
                  </div>
                  
                  {getStatusInfo(searchResult).status === 'Vencido' && (
                    <p className="text-sm text-muted-foreground mt-2">
                      O tempo de estacionamento expirou. Verifique se há necessidade de multa.
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Not Found Message */}
        {notFound && (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <XCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Nenhum ticket encontrado</h3>
                <p className="text-muted-foreground">
                  Não há reserva ativa para a placa {searchPlate}
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}