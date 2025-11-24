
import React from 'react';
import { Package, MapPin, CreditCard, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';

export const Profile: React.FC = () => {
  const { user } = useAppSelector(state => state.auth);
  
  // Mock recent orders for preview
  const orders = [
    { id: '#4829', date: '10/10/2023', status: 'נמסר', total: '₪249.90', items: 2 },
    { id: '#4810', date: '25/09/2023', status: 'בדרך', total: '₪129.90', items: 1 },
  ];

  if (!user) {
      return (
          <div className="min-h-screen bg-white flex items-center justify-center p-6">
              <div className="text-center">
                  <h2 className="text-2xl font-serif mb-4">אינך מחובר</h2>
                  <Link to="/login" className="bg-stone-900 text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest">
                      התחבר לחשבון
                  </Link>
              </div>
          </div>
      )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white pb-8 rounded-b-[40px] shadow-sm">
        <div className="container mx-auto px-6 pt-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">הפרופיל שלי</h1>
          
          <div className="flex items-center gap-4 mb-6">
             <div className="w-20 h-20 rounded-full bg-gray-200 p-1 border-2 border-rose-100">
                 <img 
                    src={user.avatar || "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80"} 
                    alt="User" 
                    className="w-full h-full object-cover rounded-full"
                 />
             </div>
             <div>
                 <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
                 <p className="text-gray-500">{user.email}</p>
             </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-gray-100 transition-colors">
                  <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center text-rose-500">
                      <MapPin className="h-5 w-5" />
                  </div>
                  <span className="font-medium text-gray-700">כתובות</span>
              </div>
              <div className="bg-gray-50 p-4 rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-gray-100 transition-colors">
                  <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center text-rose-500">
                      <CreditCard className="h-5 w-5" />
                  </div>
                  <span className="font-medium text-gray-700">אמצעי תשלום</span>
              </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 mt-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-900">ההזמנות שלי</h3>
            <Link to="/orders" className="text-sm text-rose-500 font-bold hover:text-rose-600 transition-colors">
                לכל ההזמנות
            </Link>
          </div>
          
          <div className="space-y-4">
              {orders.map(order => (
                  <div key={order.id} className="bg-white p-4 rounded-2xl shadow-sm flex items-center justify-between">
                      <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-500">
                              <Package className="h-6 w-6" />
                          </div>
                          <div>
                              <p className="font-bold text-gray-900">הזמנה {order.id}</p>
                              <p className="text-xs text-gray-500">{order.date} • {order.items} פריטים</p>
                          </div>
                      </div>
                      <div className="text-left">
                          <p className="font-bold text-rose-500">{order.total}</p>
                          <p className={`text-xs font-medium ${order.status === 'נמסר' ? 'text-green-500' : 'text-orange-500'}`}>{order.status}</p>
                      </div>
                  </div>
              ))}
          </div>
      </div>
    </div>
  );
};
