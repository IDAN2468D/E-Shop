
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Menu, Heart, Search, User as UserIcon, X } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { toggleSidebar, setSearchQuery } from '../redux/uiSlice';

export const Navbar: React.FC = () => {
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  
  const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const isHome = location.pathname === '/';
  
  // Don't show navbar on auth pages
  const isAuthPage = ['/login', '/register', '/forgot-password'].includes(location.pathname);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSearch = () => {
    if (isSearchOpen) {
      dispatch(setSearchQuery('')); // Clear search on close
    }
    setIsSearchOpen(!isSearchOpen);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
    if (!isHome) {
      navigate('/');
    }
  };

  if (isAuthPage) return null;

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 border-b border-transparent
      ${scrolled || !isHome ? 'bg-white/95 backdrop-blur-md py-4 border-stone-100 shadow-sm' : 'bg-transparent py-6'}
      `}
    >
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex justify-between items-center relative">
          
          {/* Left: Menu & Search */}
          <div className="flex items-center gap-4 z-10">
            <button 
              onClick={() => dispatch(toggleSidebar())}
              className={`p-1 hover:text-stone-600 transition-colors ${isHome && !scrolled && !isSearchOpen ? 'text-white' : 'text-stone-900'}`}
            >
              <Menu className="h-6 w-6 stroke-[1.5]" />
            </button>
            <button 
              onClick={toggleSearch}
              className={`hidden md:block p-1 hover:text-stone-600 transition-colors ${isHome && !scrolled && !isSearchOpen ? 'text-white' : 'text-stone-900'}`}
            >
              {isSearchOpen ? <X className="h-5 w-5 stroke-[1.5]" /> : <Search className="h-5 w-5 stroke-[1.5]" />}
            </button>
          </div>

          {/* Center: Logo or Search Input */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md px-16 text-center">
            {isSearchOpen ? (
              <div className="animate-in fade-in zoom-in-95 duration-200">
                <input 
                  type="text" 
                  placeholder="חפש מוצרים..." 
                  autoFocus
                  onChange={handleSearchChange}
                  className="w-full bg-stone-100/90 backdrop-blur border-none rounded-full px-6 py-2 text-sm text-stone-900 placeholder:text-stone-500 focus:ring-2 focus:ring-stone-900 outline-none shadow-inner"
                />
              </div>
            ) : (
              <Link to="/" className={`text-2xl md:text-3xl font-serif font-bold tracking-widest uppercase transition-colors whitespace-nowrap ${isHome && !scrolled ? 'text-white' : 'text-stone-900'}`}>
                E-Shop<span className="text-[10px] align-top ml-1 font-sans font-light opacity-70">IL</span>
              </Link>
            )}
          </div>
          
          {/* Right: Actions */}
          <div className="flex items-center gap-4 md:gap-6 z-10">
            <Link to="/wishlist" className={`relative group transition-colors ${isHome && !scrolled && !isSearchOpen ? 'text-white' : 'text-stone-900'}`}>
              <Heart className={`h-6 w-6 stroke-[1.5] ${wishlistItems.length > 0 ? 'fill-current' : ''}`} />
            </Link>

            <Link to="/cart" className={`relative group transition-colors ${isHome && !scrolled && !isSearchOpen ? 'text-white' : 'text-stone-900'}`}>
              <ShoppingBag className="h-6 w-6 stroke-[1.5]" />
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-stone-900 text-white text-[10px] font-medium h-4 w-4 flex items-center justify-center rounded-full">
                  {itemCount}
                </span>
              )}
            </Link>
            
            {isAuthenticated && user ? (
              <Link to="/profile" className="hidden md:block w-8 h-8 rounded-full overflow-hidden border border-stone-200">
                  <img src={user.avatar || "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80"} alt="User" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
              </Link>
            ) : (
               <Link to="/login" className={`hidden md:block transition-colors ${isHome && !scrolled && !isSearchOpen ? 'text-white' : 'text-stone-900'}`}>
                 <UserIcon className="h-6 w-6 stroke-[1.5]" />
               </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
