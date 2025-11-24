
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Home, User, Settings, ShoppingBag, Heart, LogOut, LogIn } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { setSidebarOpen, addToast } from '../redux/uiSlice';
import { logout } from '../redux/authSlice';

export const Sidebar: React.FC = () => {
  const isOpen = useAppSelector((state) => state.ui.isSidebarOpen);
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const location = useLocation();

  const closeSidebar = () => dispatch(setSidebarOpen(false));
  
  const handleLogout = () => {
    dispatch(logout());
    dispatch(addToast({ message: 'התנתקת בהצלחה', type: 'info' }));
    closeSidebar();
  };

  const menuItems = [
    { icon: Home, label: 'דף הבית', path: '/' },
    { icon: User, label: 'הפרופיל שלי', path: '/profile', protected: true },
    { icon: Heart, label: 'המועדפים שלי', path: '/wishlist' },
    { icon: ShoppingBag, label: 'העגלה שלי', path: '/cart' },
    { icon: Settings, label: 'הגדרות', path: '/settings' },
  ];

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={closeSidebar}
      />

      {/* Sidebar Panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-[280px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="p-6 h-full flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">תפריט</h2>
            <button 
              onClick={closeSidebar}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="h-6 w-6 text-gray-500" />
            </button>
          </div>

          {/* User Info */}
          {isAuthenticated && user ? (
            <div className="flex items-center gap-4 mb-8 p-4 bg-rose-50 rounded-2xl">
                <img 
                src={user.avatar || "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80"} 
                alt="User" 
                className="w-12 h-12 rounded-full object-cover border-2 border-white"
                />
                <div>
                <p className="font-bold text-gray-800">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
                </div>
            </div>
          ) : (
             <div className="mb-8 p-4 bg-gray-50 rounded-2xl">
                 <p className="text-sm text-gray-600 mb-3">התחבר כדי לראות את ההזמנות שלך ולשמור פריטים</p>
                 <Link 
                    to="/login"
                    onClick={closeSidebar}
                    className="block w-full text-center bg-stone-900 text-white py-2 rounded-lg text-sm font-bold uppercase tracking-widest"
                 >
                     התחבר / הירשם
                 </Link>
             </div>
          )}

          {/* Navigation Links */}
          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => {
              if (item.protected && !isAuthenticated) return null;
              
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeSidebar}
                  className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-200 ${
                    isActive 
                      ? 'bg-rose-500 text-white shadow-md shadow-rose-200' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="pt-6 border-t border-gray-100">
            {isAuthenticated ? (
                <button 
                    onClick={handleLogout}
                    className="flex items-center gap-4 p-4 w-full text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                >
                <LogOut className="h-5 w-5" />
                <span className="font-medium">התנתק</span>
                </button>
            ) : (
                 <Link 
                    to="/login"
                    onClick={closeSidebar}
                    className="flex items-center gap-4 p-4 w-full text-stone-900 hover:bg-stone-50 rounded-xl transition-colors"
                 >
                    <LogIn className="h-5 w-5" />
                    <span className="font-medium">התחברות</span>
                 </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
