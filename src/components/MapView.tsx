
import { useState } from 'react';
import { ParkingSpot } from '../types';
import { useGeolocation } from '../hooks/useGeolocation';
import { MapPin, Navigation, Loader2 } from 'lucide-react';
import { Button } from './ui/button';

interface MapViewProps {
  parkingSpots: ParkingSpot[];
  onSpotSelect: (spot: ParkingSpot) => void;
  selectedSpot: ParkingSpot | null;
}

export function MapView({ parkingSpots, onSpotSelect, selectedSpot }: MapViewProps) {
  const { latitude, longitude, loading: locationLoading, getCurrentLocation } = useGeolocation();
  const [mapCenter, setMapCenter] = useState({ lat: -23.5505, lng: -46.6333 }); // São Paulo default

  // Calcular distância aproximada (em km)
  const calculateDistance = (spot: ParkingSpot) => {
    if (!latitude || !longitude) return null;
    
    const R = 6371; // Raio da Terra em km
    const dLat = (spot.lat - latitude) * Math.PI / 180;
    const dLng = (spot.lng - longitude) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(latitude * Math.PI / 180) * Math.cos(spot.lat * Math.PI / 180) * 
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    
    return distance < 1 ? Math.round(distance * 1000) + 'm' : distance.toFixed(1) + 'km';
  };

  return (
    <div className="space-y-4">
      {/* Location Controls */}
      <div className="flex items-center justify-between bg-gray-800 rounded-xl p-4 border border-gray-600">
        <div className="flex items-center space-x-3">
          <MapPin className="text-[#7CFC00] w-5 h-5" />
          <div>
            <p className="text-white font-medium">Sua Localização</p>
            <p className="text-gray-400 text-sm">
              {locationLoading ? 'Obtendo localização...' : 
               latitude && longitude ? 'Localização obtida' : 'Localização não disponível'}
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={getCurrentLocation}
          disabled={locationLoading}
          className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
        >
          {locationLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Navigation className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* Map Container */}
      <div className="relative w-full h-64 bg-gradient-to-br from-[#0A2540] to-[#081C2D] rounded-xl overflow-hidden border border-gray-700">
        {/* Grid pattern to simulate map */}
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%" className="w-full h-full">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#374151" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* User location marker */}
        {latitude && longitude && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
              <div className="absolute -top-2 -left-2 w-16 h-16 border-2 border-blue-500 rounded-full animate-ping opacity-30"></div>
            </div>
          </div>
        )}

        {/* Parking spots */}
        {parkingSpots.map((spot, index) => {
          const distance = calculateDistance(spot);
          return (
            <button
              key={spot.id}
              onClick={() => onSpotSelect(spot)}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ${
                selectedSpot?.id === spot.id ? 'scale-125 z-10' : 'hover:scale-110'
              }`}
              style={{
                left: `${20 + (index % 3) * 30}%`,
                top: `${25 + Math.floor(index / 3) * 35}%`,
              }}
            >
              <div className="relative">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                  selectedSpot?.id === spot.id ? 'bg-[#7CFC00]' : 'bg-green-500'
                }`}>
                  P
                </div>
                {selectedSpot?.id === spot.id && (
                  <div className="absolute -top-1 -left-1 w-10 h-10 border-2 border-[#7CFC00] rounded-full animate-pulse"></div>
                )}
                {distance && (
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                    {distance}
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Spots List with Distances */}
      {latitude && longitude && (
        <div className="space-y-2">
          <h3 className="text-white font-semibold">Vagas Próximas</h3>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {parkingSpots
              .map(spot => ({ ...spot, distance: calculateDistance(spot) }))
              .sort((a, b) => {
                if (!a.distance || !b.distance) return 0;
                const aNum = parseFloat(a.distance.replace(/[^\d.]/g, ''));
                const bNum = parseFloat(b.distance.replace(/[^\d.]/g, ''));
                return aNum - bNum;
              })
              .slice(0, 3)
              .map(spot => (
                <button
                  key={spot.id}
                  onClick={() => onSpotSelect(spot)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    selectedSpot?.id === spot.id 
                      ? 'bg-[#7CFC00]/20 border border-[#7CFC00]' 
                      : 'bg-gray-800 hover:bg-gray-700 border border-gray-600'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-white font-medium">{spot.name}</p>
                      <p className="text-gray-400 text-sm">R$ {spot.price.toFixed(2)}/hora</p>
                    </div>
                    {spot.distance && (
                      <span className="text-[#7CFC00] font-bold text-sm">{spot.distance}</span>
                    )}
                  </div>
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
