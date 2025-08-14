import { Button } from '@/components/ui/button';
import { Settings, Shield } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';

export function AdminNav() {
  const { userRole } = useAuth();

  if (!userRole || userRole === 'user') return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex gap-2">
      {userRole === 'admin' && (
        <Button asChild variant="outline" size="sm">
          <Link to="/admin">
            <Settings className="w-4 h-4 mr-2" />
            Admin
          </Link>
        </Button>
      )}
      {userRole === 'fiscal' && (
        <Button asChild variant="outline" size="sm">
          <Link to="/fiscal">
            <Shield className="w-4 h-4 mr-2" />
            Fiscal
          </Link>
        </Button>
      )}
    </div>
  );
}