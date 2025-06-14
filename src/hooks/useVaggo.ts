
import { useState } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { Vehicle, Reservation, User, ParkingSpot } from '../types';

export function useVaggo() {
  const [vehicles, setVehicles] = useLocalStorage<Vehicle[]>('vaggo-vehicles', []);
  const [reservations, setReservations] = useLocalStorage<Reservation[]>('vaggo-reservations', []);
  const [user, setUser] = useLocalStorage<User>('vaggo-user', {
    id: '1',
    name: 'Usuário Demo',
    email: 'demo@vaggo.com',
    city: 'São Paulo',
    plan: 'free'
  });

  const [currentReservation, setCurrentReservation] = useState<Reservation | null>(null);

  const mockParkingSpots: ParkingSpot[] = [
    { id: '1', name: 'Zona Azul', price: 8.00, lat: -23.550520, lng: -46.633308, available: true },
    { id: '2', name: 'Shopping Center', price: 12.00, lat: -23.549000, lng: -46.634000, available: true },
    { id: '3', name: 'Centro Histórico', price: 6.50, lat: -23.551000, lng: -46.632000, available: true },
    { id: '4', name: 'Estação Metro', price: 10.00, lat: -23.552000, lng: -46.635000, available: true },
    { id: '5', name: 'Área Comercial', price: 9.00, lat: -23.548500, lng: -46.631500, available: true },
  ];

  const addVehicle = (plate: string) => {
    const newVehicle: Vehicle = {
      id: Date.now().toString(),
      plate: plate.toUpperCase(),
      addedAt: new Date()
    };
    setVehicles([...vehicles, newVehicle]);
  };

  const removeVehicle = (id: string) => {
    setVehicles(vehicles.filter(v => v.id !== id));
  };

  const makeReservation = (spot: ParkingSpot, vehiclePlate: string) => {
    const startTime = new Date();
    const endTime = new Date(startTime.getTime() + 60 * 60 * 1000); // 1 hour later
    
    const reservation: Reservation = {
      id: Date.now().toString(),
      spotName: spot.name,
      vehiclePlate,
      startTime,
      endTime,
      price: spot.price,
      duration: 60
    };

    setReservations([reservation, ...reservations]);
    setCurrentReservation(reservation);
    
    return reservation;
  };

  const upgradeToPremium = () => {
    setUser({ ...user, plan: 'premium' });
  };

  return {
    vehicles,
    reservations,
    user,
    currentReservation,
    mockParkingSpots,
    addVehicle,
    removeVehicle,
    makeReservation,
    upgradeToPremium,
    setCurrentReservation
  };
}
