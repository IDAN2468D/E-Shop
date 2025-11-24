
import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Cart } from './pages/Cart';
import { ProductDetail } from './pages/ProductDetail';
import { Profile } from './pages/Profile';
import { Settings } from './pages/Settings';
import { Wishlist } from './pages/Wishlist';
import { Categories } from './pages/Categories';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { ForgotPassword } from './pages/ForgotPassword';
import { OrderHistory } from './pages/OrderHistory';
import { ToastContainer } from './components/ToastContainer';
import { Sidebar } from './components/Sidebar';
import { SmartAgentChat } from './components/SmartAgentChat';
import { QuickViewModal } from './components/QuickViewModal';
import { BottomNavigation } from './components/BottomNavigation';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-white text-stone-900 font-sans selection:bg-rose-100 selection:text-rose-900">
        <Navbar />
        <Sidebar />
        
        {/* Main Content Area - No default padding to allow Hero sections to be full width */}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/orders" element={<OrderHistory />} />
          </Routes>
        </main>

        <SmartAgentChat />
        <QuickViewModal />
        <ToastContainer />
        <BottomNavigation />
      </div>
    </HashRouter>
  );
};

export default App;
