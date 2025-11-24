import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ArrowRight } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { removeItemFromCart, clearCart } from '../redux/cartSlice';
import { addToast } from '../redux/uiSlice';

export const Cart: React.FC = () => {
  const { cartItems, totalPrice } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const handleCheckout = () => {
    dispatch(clearCart());
    dispatch(addToast({ message: 'ההזמנה התקבלה בהצלחה!', type: 'success' }));
  };

  const handleRemove = (id: number) => {
      dispatch(removeItemFromCart(id));
      dispatch(addToast({ message: 'פריט הוסר מהעגלה', type: 'info' }));
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
        {/* Header */}
        <div className="sticky top-0 bg-gray-50/95 backdrop-blur z-20 px-6 py-6 flex items-center gap-4">
            <Link to="/" className="p-2 rounded-full bg-white hover:bg-gray-100 transition-colors">
                <ArrowRight className="h-5 w-5 text-gray-600" />
            </Link>
            <h1 className="text-xl font-bold text-gray-900">העגלה שלי</h1>
        </div>

      <div className="container mx-auto px-6">
        {cartItems.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Trash2 className="h-10 w-10 text-rose-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">העגלה ריקה</h2>
            <p className="text-gray-500 mb-8">הגיע הזמן להתחיל בשופינג!</p>
            <Link
              to="/"
              className="inline-block bg-rose-500 text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-rose-200"
            >
              למעבר לקטלוג
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-3xl shadow-sm flex gap-4 animate-in slide-in-from-bottom-5 duration-500">
                <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-1 py-1 flex flex-col justify-between">
                    <div>
                        <h3 className="font-bold text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-500">{item.category}</p>
                    </div>
                    <div className="flex justify-between items-end">
                         <div className="flex items-center gap-2 text-sm text-gray-500">
                             <div className={`w-4 h-4 rounded-full ${item.selectedColor === 'Blue' ? 'bg-slate-400' : 'bg-gray-400'}`}></div>
                             <span>{item.selectedSize || 'M'}</span>
                         </div>
                        <span className="font-bold text-gray-900 text-lg">₪{item.price}</span>
                    </div>
                </div>

                <div className="flex flex-col justify-between items-end">
                    <button 
                        onClick={() => handleRemove(item.id)}
                        className="p-2 text-gray-400 hover:text-rose-500 transition-colors"
                    >
                        <Trash2 className="h-5 w-5" />
                    </button>
                    <div className="bg-gray-100 px-3 py-1 rounded-lg text-sm font-medium text-gray-600">
                        x{item.quantity}
                    </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Summary */}
      {cartItems.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[40px] shadow-[0_-10px_40px_rgba(0,0,0,0.05)] p-8 z-30">
              <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-500">
                      <span>סכום ביניים</span>
                      <span>₪{totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                      <span>משלוח</span>
                      <span>₪0.00</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold text-gray-900 pt-3 border-t border-gray-100">
                      <span>סה"כ לתשלום</span>
                      <span>₪{totalPrice.toFixed(2)}</span>
                  </div>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full bg-rose-500 text-white font-bold py-4 rounded-2xl shadow-lg shadow-rose-200 hover:bg-rose-600 transition-colors active:scale-95"
              >
                לתשלום
              </button>
          </div>
      )}
    </div>
  );
};
