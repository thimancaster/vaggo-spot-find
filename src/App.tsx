
import { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider, useAuth } from './hooks/useAuth';
import { AuthPage } from './pages/AuthPage';
import { BottomNavigation } from './components/BottomNavigation';
import { HomePage } from './pages/HomePage';
import { VehiclesPage } from './pages/VehiclesPage';
import { HistoryPage } from './pages/HistoryPage';
import { SupportPage } from './pages/SupportPage';
import { AccountPage } from './pages/AccountPage';
import { PlansPage } from './pages/PlansPage';

const queryClient = new QueryClient();

function AppContent() {
  const { user, profile, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('home');
  const [currentView, setCurrentView] = useState('home');
  const [showAuth, setShowAuth] = useState(false);

  // Show loading screen while checking auth status
  if (loading) {
    return (
      <div className="min-h-screen bg-[#081C2D] flex items-center justify-center">
        <div className="text-white text-lg">Carregando...</div>
      </div>
    );
  }

  // Show auth page if not authenticated or if explicitly requested
  if (!user || showAuth) {
    return <AuthPage onBack={() => setShowAuth(false)} />;
  }

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
            onNavigateToVehicles={handleNavigateToVehicles}
          />
        );
      case 'vehicles':
        return (
          <VehiclesPage
            onBack={handleBackToHome}
          />
        );
      case 'history':
        return <HistoryPage />;
      case 'support':
        return <SupportPage />;
      case 'account':
        return (
          <AccountPage
            user={profile}
            onUpgradeToPremium={() => {}}
            onNavigateToPlans={handleNavigateToPlans}
          />
        );
      case 'plans':
        return (
          <PlansPage
            onBack={handleBackToAccount}
            onUpgradeToPremium={() => {}}
            currentPlan={profile?.plan || 'free'}
          />
        );
      default:
        return (
          <HomePage
            onNavigateToVehicles={handleNavigateToVehicles}
          />
        );
    }
  };

  return (
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
  );
}

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <AppContent />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
