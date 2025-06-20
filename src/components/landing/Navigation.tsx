
import { Button } from '../ui/button';
import { Logo } from '../Logo';
import { ThemeToggle } from '../ThemeToggle';

interface NavigationProps {
  onGetStarted: () => void;
}

export function Navigation({ onGetStarted }: NavigationProps) {
  return (
    <nav className="border-b border-border bg-background/95 backdrop-blur-sm fixed w-full z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Logo size="md" />
          <div className="hidden md:flex items-center space-x-8">
            <a href="#benefits" className="text-muted-foreground hover:text-accent transition-colors font-medium">Benefícios</a>
            <a href="#how-it-works" className="text-muted-foreground hover:text-accent transition-colors font-medium">Como Funciona</a>
            <a href="#pricing" className="text-muted-foreground hover:text-accent transition-colors font-medium">Planos</a>
            <a href="#faq" className="text-muted-foreground hover:text-accent transition-colors font-medium">FAQ</a>
          </div>
          <div className="flex items-center space-x-3">
            <ThemeToggle />
            <Button
              onClick={onGetStarted}
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold shadow-lg"
            >
              Começar Grátis
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
