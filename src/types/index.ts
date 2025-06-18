
// Re-export types from hooks for backward compatibility
export type { Vehicle } from '../hooks/useVehicles';
export type { ParkingSpot } from '../hooks/useParkingSpots';
export type { Reservation } from '../hooks/useReservations';

export interface User {
  id: string;
  name: string;
  email: string;
  city: string;
  plan: 'free' | 'premium';
}
