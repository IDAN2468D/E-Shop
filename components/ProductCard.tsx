import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, Plus } from 'lucide-react';
import { Product } from '../types';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { toggleWishlist } from '../redux/wishlistSlice';
import { setQuickViewProduct, addToast } from '../redux/uiSlice';
import { addItemToCart } from '../redux/cartSlice';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  const wishlist = useAppSelector((state) => state.wishlist.items);
  const isLiked = wishlist.includes(product.id);

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleWishlist(product.id));
    if (!isLiked) dispatch(addToast({ message: 'Added to Wishlist', type: 'success' }));
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(setQuickViewProduct(product));
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addItemToCart(product));
    dispatch(addToast({ message: 'Added to Cart', type: 'success' }));
  };

  return (
    <div className="group cursor-pointer">
      <Link to={`/product/${product.id}`} className="block">
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-stone-100 mb-4">
          <img 
            src={product.image} 
            alt={product.name} 
            className="h-full w-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
          />
          
          {/* Overlay Actions */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 flex flex-col justify-between p-4 opacity-0 group-hover:opacity-100">
            <div className="flex justify-end">
               <button 
                onClick={handleToggleWishlist}
                className="p-2 bg-white rounded-none hover:bg-stone-100 transition-colors shadow-sm"
              >
                <Heart className={`h-4 w-4 ${isLiked ? 'fill-stone-900 text-stone-900' : 'text-stone-900'}`} />
              </button>
            </div>

            <div className="flex gap-2 justify-center translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <button 
                    onClick={handleQuickView}
                    className="flex-1 bg-white text-stone-900 py-3 text-xs font-bold tracking-widest uppercase hover:bg-stone-900 hover:text-white transition-colors"
                >
                    Quick View
                </button>
                <button 
                    onClick={handleAddToCart}
                    className="flex-1 bg-stone-900 text-white py-3 text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-stone-900 transition-colors"
                >
                    Add to Cart
                </button>
            </div>
          </div>

          {product.oldPrice && (
            <span className="absolute top-0 left-0 bg-stone-900 text-white text-[10px] font-medium px-3 py-1 tracking-widest">
              SALE
            </span>
          )}
        </div>

        {/* Info */}
        <div className="text-center space-y-1">
          <p className="text-[10px] text-stone-500 uppercase tracking-widest">{product.category}</p>
          <h3 className="text-stone-900 font-serif text-lg leading-tight group-hover:underline decoration-stone-400 underline-offset-4 decoration-1 transition-all">{product.name}</h3>
          <div className="flex justify-center items-baseline gap-3 text-sm">
             <span className="font-medium text-stone-900">₪{product.price}</span>
             {product.oldPrice && (
               <span className="text-stone-400 line-through text-xs">₪{product.oldPrice}</span>
             )}
          </div>
        </div>
      </Link>
    </div>
  );
};