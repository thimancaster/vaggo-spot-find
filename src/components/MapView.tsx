
import { useState } from 'react';
import { ParkingSpot } from '../types';

interface MapViewProps {
  parkingSpots: ParkingSpot[];
  onSpotSelect: (spot: ParkingSpot) => void;
  selectedSpot: ParkingSpot | null;
}

export function MapView({ parkingSpots, onSpotSelect, selectedSpot }: MapViewProps) {
  return (
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

      {/* Parking spots */}
      {parkingSpots.map((spot, index) => (
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
          </div>
        </button>
      ))}

      {/* Central location marker */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="relative">
          <div className="w-12 h-12 bg-[#7CFC00] rounded-full flex items-center justify-center shadow-lg">
            <div className="w-4 h-4 bg-[#081C2D] rounded-full"></div>
          </div>
          <div className="absolute -top-2 -left-2 w-16 h-16 border-2 border-[#7CFC00] rounded-full animate-ping opacity-30"></div>
        </div>
      </div>
    </div>
  );
}
