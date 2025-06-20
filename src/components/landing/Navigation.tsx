
import { Car } from 'lucide-react';
import { Button } from '../ui/button';
import { ThemeToggle } from '../ThemeToggle';

interface NavigationProps {
  onGetStarted: () => void;
}

export function Navigation({ onGetStarted }: NavigationProps) {
  return (
    <nav className="border-b border-neutral/20 bg-main/98 backdrop-blur-sm fixed w-full z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <Car className="text-highlight w-8 h-8" style={{ color: 'rgb(var(--highlight-primary))' }} />
            <span className="text-main text-xl font-bold" style={{ color: 'rgb(var(--text-primary))' }}>VAGGO</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#benefits" className="text-secondary hover:text-highlight transition-colors font-medium" style={{ color: 'rgb(var(--text-secondary))' }}>Benefícios</a>
            <a href="#how-it-works" className="text-secondary hover:text-highlight transition-colors font-medium" style={{ color: 'rgb(var(--text-secondary))' }}>Como Funciona</a>
            <a href="#pricing" className="text-secondary hover:text-highlight transition-colors font-medium" style={{ color: 'rgb(var(--text-secondary))' }}>Planos</a>
            <a href="#faq" className="text-secondary hover:text-highlight transition-colors font-medium" style={{ color: 'rgb(var(--text-secondary))' }}>FAQ</a>
          </div>
          <div className="flex items-center space-x-3">
            <ThemeToggle />
            <Button
              onClick={onGetStarted}
              className="bg-highlight hover:bg-highlight/90 text-on-highlight font-bold shadow-lg border-0"
              style={{ 
                backgroundColor: 'rgb(var(--highlight-primary))', 
                color: 'rgb(var(--text-on-highlight))' 
              }}
            >
              Começar Grátis
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
