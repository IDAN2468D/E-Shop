
import React from 'react';
import { X, ShoppingBag, Star, Check } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { setQuickViewProduct, addToast } from '../redux/uiSlice';
import { addItemToCart } from '../redux/cartSlice';
import { Link } from 'react-router-dom';

export const QuickViewModal: React.FC = () => {
  const product = useAppSelector((state) => state.ui.quickViewProduct);
  const dispatch = useAppDispatch();

  if (!product) return null;

  const handleClose = () => {
    dispatch(setQuickViewProduct(null));
  };

  const handleAddToCart = () => {
    dispatch(addItemToCart(product));
    dispatch(addToast({ message: 'המוצר נוסף לעגלה!', type: 'success' }));
    handleClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={handleClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-4xl rounded-[32px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col md:flex-row max-h-[90vh]">
        
        {/* Close Button */}
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 rounded-full hover:bg-white shadow-sm transition-colors"
        >
          <X className="h-6 w-6 text-gray-500" />
        </button>

        {/* Image Section */}
        <div className="w-full md:w-1/2 bg-gray-100 h-64 md:h-auto relative">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
          {product.oldPrice && (
            <span className="absolute top-6 left-6 bg-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
              SALE
            </span>
          )}
        </div>

        {/* Details Section */}
        <div className="w-full md:w-1/2 p-8 flex flex-col overflow-y-auto">
          <div className="mb-auto">
            <div className="flex items-start justify-between mb-2">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">{product.name}</h2>
                    <p className="text-gray-500 text-sm">{product.category}</p>
                </div>
                <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-bold text-gray-700">{product.rating}</span>
                </div>
            </div>

            <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl font-bold text-gray-900">₪{product.price}</span>
                {product.oldPrice && (
                    <span className="text-lg text-gray-400 line-through">₪{product.oldPrice}</span>
                )}
            </div>

            <p className="text-gray-600 leading-relaxed mb-8">
                {product.description}
            </p>

            {/* Mock Sizes */}
            <div className="mb-8">
                <h3 className="font-bold text-gray-900 mb-3 text-sm">מידה (הדגמה)</h3>
                <div className="flex gap-3">
                    {['S', 'M', 'L', 'XL'].map(size => (
                        <div key={size} className={`w-10 h-10 rounded-xl flex items-center justify-center border ${size === 'M' ? 'border-rose-500 bg-rose-50 text-rose-600 font-bold' : 'border-gray-200 text-gray-600'}`}>
                            {size}
                        </div>
                    ))}
                </div>
            </div>
          </div>

          <div className="space-y-3 pt-6 border-t border-gray-100">
            <button 
                onClick={handleAddToCart}
                className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-gray-800 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
                <ShoppingBag className="h-5 w-5" />
                הוסף לעגלה
            </button>
            <Link 
                to={`/product/${product.id}`}
                onClick={handleClose}
                className="block w-full text-center py-3 text-gray-500 font-medium hover:text-rose-500 transition-colors"
            >
                צפה בפרטים מלאים
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
