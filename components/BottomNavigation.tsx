
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, LayoutGrid, Heart, User } from 'lucide-react';

export const BottomNavigation: React.FC = () => {
  const location = useLocation();
  
  // Hide bottom nav on product detail page to give space for "Add to Cart" button
  // Also hide on chat if we wanted, but let's keep it simple.
  // We hide it on Cart as well usually, but for now let's just hide on product details.
  if (location.pathname.startsWith('/product/')) {
    return null;
  }

  const navItems = [
    { icon: Home, label: 'בית', path: '/' },
    { icon: LayoutGrid, label: 'קטגוריות', path: '/categories' },
    { icon: Heart, label: 'מועדפים', path: '/wishlist' },
    { icon: User, label: 'פרופיל', path: '/profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-3 pb-5 z-30 md:hidden shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
      <div className="flex justify-between items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex flex-col items-center gap-1 transition-all duration-300
                ${isActive ? 'text-rose-500 scale-110' : 'text-gray-400 hover:text-gray-600'}
              `}
            >
              <Icon className="h-6 w-6" strokeWidth={2.5} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};
