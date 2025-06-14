
export interface Vehicle {
  id: string;
  plate: string;
  addedAt: Date;
}

export interface ParkingSpot {
  id: string;
  name: string;
  price: number;
  lat: number;
  lng: number;
  available: boolean;
}

export interface Reservation {
  id: string;
  spotName: string;
  vehiclePlate: string;
  startTime: Date;
  endTime: Date;
  price: number;
  duration: number; // in minutes
}

export interface User {
  id: string;
  name: string;
  email: string;
  city: string;
  plan: 'free' | 'premium';
}
