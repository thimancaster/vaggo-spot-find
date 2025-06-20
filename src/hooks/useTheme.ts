
import { useState, useEffect } from 'react';

type Theme = 'dark' | 'light';

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    // Check for saved theme preference or default to 'dark'
    const savedTheme = localStorage.getItem('vaggo-theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    // Apply theme to document
    const root = window.document.documentElement;
    
    root.classList.remove('light', 'dark');
    
    if (theme === 'light') {
      root.classList.add('light');
    } else {
      root.classList.add('dark');
    }
    
    // Save theme preference
    localStorage.setItem('vaggo-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return { theme, toggleTheme };
};
