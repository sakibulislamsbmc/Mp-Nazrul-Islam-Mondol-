import React from 'react';
import { Home, Building2, HeartHandshake, Phone, ShieldCheck, Search } from 'lucide-react';
import { useApp, PageId } from '../../context/AppContext';

export const MobileBottomNav: React.FC = () => {
  const { activePage, setActivePage } = useApp();

  const navItems: { id: PageId; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'home', label: 'হোম', icon: Home },
    { id: 'parliamentary', label: 'কার্যক্রম', icon: Building2 },
    { id: 'services', label: 'জনসেবা', icon: HeartHandshake },
    { id: 'tracking', label: 'ট্র্যাকিং', icon: Search },
    { id: 'contact', label: 'যোগাযোগ', icon: Phone },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden px-3 pb-2 pt-1">
      <div className="bg-white/95 backdrop-blur-xl border border-[#006B3F]/20 rounded-2xl shadow-xl flex items-center justify-around py-1.5 px-2 max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all duration-150 min-w-[58px] ${
                isActive 
                  ? 'text-[#006B3F] font-bold scale-105' 
                  : 'text-gray-600 hover:text-emerald-800 font-medium'
              }`}
            >
              <div className={`p-1 rounded-lg ${isActive ? 'bg-emerald-100/80 text-[#006B3F]' : ''}`}>
                <item.icon className="w-5 h-5" />
              </div>
              <span className={`text-[11px] leading-tight mt-0.5 ${isActive ? 'text-[#006B3F] font-bold' : ''}`}>
                {item.label}
              </span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#E32636] mt-0.5"></span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
