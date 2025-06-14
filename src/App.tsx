
import { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BottomNavigation } from './components/BottomNavigation';
import { HomePage } from './pages/HomePage';
import { VehiclesPage } from './pages/VehiclesPage';
import { HistoryPage } from './pages/HistoryPage';
import { SupportPage } from './pages/SupportPage';
import { AccountPage } from './pages/AccountPage';
import { PlansPage } from './pages/PlansPage';
import { useVaggo } from './hooks/useVaggo';

const queryClient = new QueryClient();

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [currentView, setCurrentView] = useState('home');
  
  const {
    vehicles,
    reservations,
    user,
    mockParkingSpots,
    addVehicle,
    removeVehicle,
    makeReservation,
    upgradeToPremium
  } = useVaggo();

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentView(tab);
  };

  const handleNavigateToVehicles = () => {
    setCurrentView('vehicles');
  };

  const handleNavigateToPlans = () => {
    setCurrentView('plans');
  };

  const handleBackToHome = () => {
    setActiveTab('home');
    setCurrentView('home');
  };

  const handleBackToAccount = () => {
    setActiveTab('account');
    setCurrentView('account');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return (
          <HomePage
            parkingSpots={mockParkingSpots}
            vehicles={vehicles}
            onMakeReservation={makeReservation}
            onNavigateToVehicles={handleNavigateToVehicles}
          />
        );
      case 'vehicles':
        return (
          <VehiclesPage
            vehicles={vehicles}
            onAddVehicle={addVehicle}
            onRemoveVehicle={removeVehicle}
            onBack={handleBackToHome}
          />
        );
      case 'history':
        return <HistoryPage reservations={reservations} />;
      case 'support':
        return <SupportPage />;
      case 'account':
        return (
          <AccountPage
            user={user}
            onUpgradeToPremium={upgradeToPremium}
            onNavigateToPlans={handleNavigateToPlans}
          />
        );
      case 'plans':
        return (
          <PlansPage
            onBack={handleBackToAccount}
            onUpgradeToPremium={upgradeToPremium}
            currentPlan={user.plan}
          />
        );
      default:
        return (
          <HomePage
            parkingSpots={mockParkingSpots}
            vehicles={vehicles}
            onMakeReservation={makeReservation}
            onNavigateToVehicles={handleNavigateToVehicles}
          />
        );
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <div className="min-h-screen bg-[#081C2D] w-full">
          {renderCurrentView()}
          
          {/* Only show bottom navigation on main tabs */}
          {['home', 'history', 'support', 'account'].includes(currentView) && (
            <BottomNavigation
              activeTab={activeTab}
              onTabChange={handleTabChange}
            />
          )}
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
