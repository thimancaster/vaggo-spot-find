
import { useState } from 'react';
import { User, History, MessageCircle, Wallet } from 'lucide-react';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  const tabs = [
    { id: 'home', icon: '🏠', label: 'Home' },
    { id: 'wallet', icon: Wallet, label: 'Carteira' },
    { id: 'history', icon: History, label: 'Histórico' },
    { id: 'support', icon: MessageCircle, label: 'Suporte' },
    { id: 'account', icon: User, label: 'Conta' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#081C2D] border-t border-gray-700 px-2 py-2 safe-area-pb">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {tabs.map((tab) => {
          const IconComponent = typeof tab.icon === 'string' ? null : tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors min-w-[60px] ${
                isActive 
                  ? 'text-[#7CFC00]' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {typeof tab.icon === 'string' ? (
                <span className="text-xl mb-1">{tab.icon}</span>
              ) : (
                <IconComponent className="w-5 h-5 mb-1" />
              )}
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
