
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { Toaster } from './components/ui/sonner';
import Index from './pages/Index';
import { AuthPage } from './pages/AuthPage';
import { WelcomePage } from './pages/WelcomePage';
import { AccountPage } from './pages/AccountPage';
import { VehiclesPage } from './pages/VehiclesPage';
import { HistoryPage } from './pages/HistoryPage';
import { PlansPage } from './pages/PlansPage';
import { SupportPage } from './pages/SupportPage';
import NotFound from './pages/NotFound';
import './App.css';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-[#081C2D] flex items-center justify-center">
        <div className="text-white text-lg">Carregando...</div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  return <>{children}</>;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-[#081C2D] flex items-center justify-center">
        <div className="text-white text-lg">Carregando...</div>
      </div>
    );
  }
  
  if (user) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
}

function AppRoutes() {
  const navigate = useNavigate();
  const { profile, updateProfile } = useAuth();

  const handleLogin = () => {
    navigate('/auth');
  };

  const handleUpgradeToPremium = () => {
    updateProfile({ plan: 'premium' });
  };

  const handleNavigateToPlans = () => {
    navigate('/plans');
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Routes>
      <Route 
        path="/auth" 
        element={
          <PublicRoute>
            <AuthPage />
          </PublicRoute>
        } 
      />
      <Route 
        path="/welcome" 
        element={
          <PublicRoute>
            <WelcomePage onLogin={handleLogin} />
          </PublicRoute>
        } 
      />
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <Index />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/account" 
        element={
          <ProtectedRoute>
            <AccountPage 
              user={profile}
              onUpgradeToPremium={handleUpgradeToPremium}
              onNavigateToPlans={handleNavigateToPlans}
            />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/vehicles" 
        element={
          <ProtectedRoute>
            <VehiclesPage onBack={handleBack} />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/history" 
        element={
          <ProtectedRoute>
            <HistoryPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/plans" 
        element={
          <ProtectedRoute>
            <PlansPage 
              onBack={handleBack}
              onUpgradeToPremium={handleUpgradeToPremium}
              currentPlan={profile?.plan || 'free'}
            />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/support" 
        element={
          <ProtectedRoute>
            <SupportPage />
          </ProtectedRoute>
        } 
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <AppRoutes />
          <Toaster />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
