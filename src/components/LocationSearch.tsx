
import { useState } from 'react';
import { Search, MapPin, Loader2 } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface LocationSearchProps {
  onLocationSelect: (location: { address: string; lat: number; lng: number }) => void;
  placeholder?: string;
}

export function LocationSearch({ onLocationSelect, placeholder = "Para onde você quer ir?" }: LocationSearchProps) {
  const [query, setQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [suggestions, setSuggestions] = useState<Array<{
    address: string;
    lat: number;
    lng: number;
  }>>([]);

  // Simulação de busca de endereços (em produção, usar API real como Google Places)
  const searchLocations = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      return;
    }

    setSearching(true);

    // Simulação de delay da API
    await new Promise(resolve => setTimeout(resolve, 500));

    // Dados mockados para demonstração
    const mockResults = [
      { address: `${searchQuery} - Centro, São Paulo, SP`, lat: -23.5505, lng: -46.6333 },
      { address: `${searchQuery} - Vila Madalena, São Paulo, SP`, lat: -23.5563, lng: -46.6925 },
      { address: `${searchQuery} - Pinheiros, São Paulo, SP`, lat: -23.5629, lng: -46.7006 },
      { address: `${searchQuery} - Ipanema, Rio de Janeiro, RJ`, lat: -22.9838, lng: -43.2057 },
      { address: `${searchQuery} - Copacabana, Rio de Janeiro, RJ`, lat: -22.9711, lng: -43.1822 },
    ];

    setSuggestions(mockResults);
    setSearching(false);
  };

  const handleSearch = (value: string) => {
    setQuery(value);
    if (value.length > 2) {
      searchLocations(value);
    } else {
      setSuggestions([]);
    }
  };

  const handleLocationSelect = (location: { address: string; lat: number; lng: number }) => {
    setQuery(location.address);
    setSuggestions([]);
    onLocationSelect(location);
  };

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-12 pr-12 bg-gray-800 border-gray-600 text-white placeholder-gray-400 rounded-full h-12"
        />
        {searching && (
          <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 animate-spin" />
        )}
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800 border border-gray-600 rounded-xl shadow-lg z-50 max-h-64 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleLocationSelect(suggestion)}
              className="w-full text-left px-4 py-3 hover:bg-gray-700 transition-colors border-b border-gray-700 last:border-b-0 first:rounded-t-xl last:rounded-b-xl"
            >
              <div className="flex items-center space-x-3">
                <MapPin className="text-[#7CFC00] w-4 h-4 flex-shrink-0" />
                <span className="text-white text-sm">{suggestion.address}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
