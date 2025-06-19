import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Car, MapPin, Clock, Users } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { BottomNavigation } from '../components/BottomNavigation';
import { HomePage } from './HomePage';

const Index = () => {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('home');

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    
    // Navigate to the appropriate page based on the selected tab
    switch (tab) {
      case 'home':
        navigate('/');
        break;
      case 'history':
        navigate('/history');
        break;
      case 'support':
        navigate('/support');
        break;
      case 'account':
        navigate('/account');
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-[#081C2D]">
      <HomePage onNavigateToVehicles={() => navigate('/vehicles')} />
      <BottomNavigation activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
};

export default Index;
