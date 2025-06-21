
import { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { useGeolocation } from '../hooks/useGeolocation';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { toast } from 'sonner';

interface ParkingSpot {
  id: string;
  name: string;
  lat: number;
  lng: number;
  price: number;
  available: boolean;
}

interface GoogleMapsViewProps {
  parkingSpots: ParkingSpot[];
  onSpotSelect: (spot: ParkingSpot | null) => void;
  selectedSpot: ParkingSpot | null;
}

export function GoogleMapsView({ parkingSpots, onSpotSelect, selectedSpot }: GoogleMapsViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [apiKey, setApiKey] = useState('');
  const [mapLoaded, setMapLoaded] = useState(false);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const { latitude, longitude, loading: locationLoading } = useGeolocation();

  const loadGoogleMaps = async () => {
    if (!apiKey.trim()) {
      toast.error('Por favor, insira sua chave da API do Google Maps');
      return;
    }

    try {
      const loader = new Loader({
        apiKey: apiKey,
        version: 'weekly',
        libraries: ['places']
      });

      await loader.load();
      setMapLoaded(true);
      toast.success('Google Maps carregado com sucesso!');
    } catch (error) {
      console.error('Erro ao carregar Google Maps:', error);
      toast.error('Erro ao carregar Google Maps. Verifique sua chave da API.');
    }
  };

  useEffect(() => {
    if (!mapLoaded || !mapRef.current) return;

    // Usar localização do usuário ou São Paulo como fallback
    const center = {
      lat: latitude || -23.5505,
      lng: longitude || -46.6333
    };

    const googleMap = new google.maps.Map(mapRef.current, {
      zoom: 15,
      center: center,
      styles: [
        {
          "featureType": "all",
          "elementType": "geometry.fill",
          "stylers": [{"color": "#242f3e"}]
        },
        {
          "featureType": "all",
          "elementType": "labels.text.fill",
          "stylers": [{"color": "#746855"}]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [{"color": "#17263c"}]
        }
      ]
    });

    setMap(googleMap);

    // Adicionar marcador da localização do usuário
    if (latitude && longitude) {
      new google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map: googleMap,
        title: 'Sua localização',
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: '#7CFC00',
          fillOpacity: 1,
          strokeWeight: 2,
          strokeColor: '#ffffff',
        }
      });
    }
  }, [mapLoaded, latitude, longitude]);

  useEffect(() => {
    if (!map || !parkingSpots.length) return;

    // Limpar marcadores existentes
    markers.forEach(marker => marker.setMap(null));

    // Criar novos marcadores para as vagas
    const newMarkers = parkingSpots.map(spot => {
      const marker = new google.maps.Marker({
        position: { lat: spot.lat, lng: spot.lng },
        map: map,
        title: spot.name,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 12,
          fillColor: spot.available ? '#7CFC00' : '#ff4444',
          fillOpacity: 1,
          strokeWeight: 2,
          strokeColor: '#ffffff',
        }
      });

      // Adicionar click listener
      marker.addListener('click', () => {
        onSpotSelect(spot);
        
        // Criar info window
        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div style="color: #333; padding: 8px;">
              <h3 style="margin: 0 0 8px 0; font-size: 16px;">${spot.name}</h3>
              <p style="margin: 0; font-size: 14px;">R$ ${spot.price.toFixed(2)}/hora</p>
              <p style="margin: 4px 0 0 0; font-size: 12px; color: ${spot.available ? '#22c55e' : '#ef4444'};">
                ${spot.available ? 'Disponível' : 'Ocupada'}
              </p>
            </div>
          `
        });

        infoWindow.open(map, marker);
      });

      return marker;
    });

    setMarkers(newMarkers);
  }, [map, parkingSpots, onSpotSelect]);

  if (!mapLoaded) {
    return (
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-600">
        <h3 className="text-white font-semibold mb-4">Configurar Google Maps</h3>
        <p className="text-gray-400 text-sm mb-4">
          Para usar o mapa interativo, insira sua chave da API do Google Maps:
        </p>
        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Cole sua Google Maps API Key aqui"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="bg-gray-700 border-gray-600 text-white"
          />
          <Button
            onClick={loadGoogleMaps}
            className="w-full bg-[#7CFC00] text-[#081C2D] font-semibold"
          >
            Carregar Mapa
          </Button>
          <p className="text-gray-500 text-xs">
            Obtenha sua chave gratuita em:{' '}
            <a 
              href="https://developers.google.com/maps/documentation/javascript/get-api-key" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#7CFC00] hover:underline"
            >
              Google Cloud Console
            </a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div 
        ref={mapRef} 
        className="w-full h-64 bg-gray-800 rounded-xl border border-gray-600"
        style={{ minHeight: '300px' }}
      />
      {locationLoading && (
        <div className="absolute top-4 left-4 bg-gray-800 text-white px-3 py-1 rounded-lg text-sm">
          Obtendo sua localização...
        </div>
      )}
      <div className="absolute bottom-4 left-4 bg-gray-800 text-white px-3 py-1 rounded-lg text-sm">
        {parkingSpots.length} vagas disponíveis
      </div>
    </div>
  );
}
