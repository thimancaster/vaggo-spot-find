
import { Car } from 'lucide-react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ className = '', showText = true, size = 'md' }: LogoProps) {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-3xl'
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {/* Light mode logo */}
      <div className="block dark:hidden">
        <img 
          src="/lovable-uploads/52dcf63e-cefd-4d43-87f9-5b0b3d9f5102.png" 
          alt="VagGo" 
          className={sizes[size]}
        />
      </div>
      
      {/* Dark mode logo */}
      <div className="hidden dark:block">
        <img 
          src="/lovable-uploads/ed908c57-d5b2-4b66-b5e8-fda335a9684f.png" 
          alt="VagGo" 
          className={sizes[size]}
        />
      </div>
      
      {showText && (
        <span className={`font-bold text-foreground ${textSizes[size]}`}>
          VAGGO
        </span>
      )}
    </div>
  );
}
