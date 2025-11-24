
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Package, Truck, CheckCircle, Clock } from 'lucide-react';

export const OrderHistory: React.FC = () => {
  // Mock Data
  const orders = [
    {
      id: '#4829',
      date: '10/10/2023',
      status: 'Delivered',
      total: '₪249.90',
      items: [
        { name: 'מעיל חורף אלגנטי', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=150&q=80' },
        { name: 'צעיף קשמיר', image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=150&q=80' }
      ]
    },
    {
      id: '#4810',
      date: '25/09/2023',
      status: 'Shipped',
      total: '₪129.90',
      items: [
        { name: 'סריג אקרילי ורוד', image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=150&q=80' }
      ]
    },
    {
      id: '#4750',
      date: '15/08/2023',
      status: 'Processing',
      total: '₪450.00',
      items: [
        { name: 'תיק עור יוקרתי', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=150&q=80' }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Delivered': return 'text-green-600 bg-green-50';
      case 'Shipped': return 'text-blue-600 bg-blue-50';
      case 'Processing': return 'text-orange-600 bg-orange-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'Delivered': return <CheckCircle className="h-4 w-4" />;
      case 'Shipped': return <Truck className="h-4 w-4" />;
      case 'Processing': return <Clock className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="container mx-auto px-6 pt-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
             <Link to="/profile" className="p-2 rounded-full bg-white shadow-sm hover:bg-gray-100 transition-colors">
                <ArrowRight className="h-5 w-5 text-gray-600" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">ההזמנות שלי</h1>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-6 border-b border-gray-100 pb-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-bold text-lg text-stone-900">הזמנה {order.id}</h3>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold flex items-center gap-1 ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{order.date}</p>
                </div>
                <div className="text-left">
                  <p className="font-bold text-xl text-stone-900">{order.total}</p>
                </div>
              </div>

              {/* Items */}
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex-shrink-0 w-20 space-y-2">
                    <div className="h-24 w-20 bg-gray-100 rounded-xl overflow-hidden relative">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/5"></div>
                    </div>
                  </div>
                ))}
                {order.items.length > 3 && (
                   <div className="flex-shrink-0 w-20 h-24 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 font-bold text-sm">
                     +{order.items.length - 3}
                   </div>
                )}
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end gap-3">
                 <button className="text-sm font-bold text-gray-500 hover:text-stone-900 transition-colors">עזרה</button>
                 <button className="bg-stone-900 text-white px-6 py-2 rounded-lg text-sm font-bold uppercase tracking-widest hover:bg-stone-800 transition-colors">
                   פרטי הזמנה
                 </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
