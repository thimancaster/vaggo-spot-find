
import { GoogleMapsView } from './GoogleMapsView';

interface ParkingSpot {
  id: string;
  name: string;
  lat: number;
  lng: number;
  price: number;
  available: boolean;
  spot_type: string;
}

interface MapViewProps {
  parkingSpots: ParkingSpot[];
  onSpotSelect: (spot: ParkingSpot | null) => void;
  selectedSpot: ParkingSpot | null;
}

export function MapView({ parkingSpots, onSpotSelect, selectedSpot }: MapViewProps) {
  return (
    <GoogleMapsView 
      parkingSpots={parkingSpots}
      onSpotSelect={onSpotSelect}
      selectedSpot={selectedSpot}
    />
  );
}
