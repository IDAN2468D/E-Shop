import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, Minus, Plus, Heart, Share2 } from 'lucide-react';
import { Product } from '../types';
import { fetchProducts } from '../services/productService';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { addItemToCart } from '../redux/cartSlice';
import { toggleWishlist } from '../redux/wishlistSlice';
import { addToast } from '../redux/uiSlice';

const SIZES = ['XS', 'S', 'M', 'L', 'XL'];

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const wishlist = useAppSelector((state) => state.wishlist.items);
  
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState('M');

  useEffect(() => {
    const loadProduct = async () => {
      const allProducts = await fetchProducts();
      const found = allProducts.find((p) => p.id === Number(id));
      if (found) setProduct(found);
    };
    loadProduct();
  }, [id]);

  if (!product) return <div className="min-h-screen bg-white" />;

  const isLiked = wishlist.includes(product.id);

  const handleAddToCart = () => {
    dispatch(addItemToCart(product));
    dispatch(addToast({ message: 'Added to Cart', type: 'success' }));
  };

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="flex flex-col md:flex-row h-full md:h-[calc(100vh-80px)]">
        
        {/* Image Section (Half Width) */}
        <div className="w-full md:w-1/2 h-[50vh] md:h-full bg-stone-100 relative overflow-hidden">
           <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
           {product.oldPrice && (
             <div className="absolute top-8 left-8 bg-white text-stone-900 text-xs font-bold px-4 py-2 uppercase tracking-widest">
                Sale
             </div>
           )}
        </div>

        {/* Details Section (Half Width) */}
        <div className="w-full md:w-1/2 px-6 md:px-20 py-12 md:py-0 flex flex-col justify-center overflow-y-auto">
           <div className="max-w-lg mx-auto w-full space-y-8">
              
              <div>
                  <p className="text-stone-500 text-xs font-bold tracking-[0.2em] uppercase mb-4">{product.category}</p>
                  <h1 className="text-4xl md:text-5xl font-serif text-stone-900 mb-4 leading-tight">{product.name}</h1>
                  <div className="flex items-center gap-4">
                      <span className="text-2xl text-stone-900 font-medium">₪{product.price}</span>
                      {product.oldPrice && <span className="text-lg text-stone-400 line-through font-light">₪{product.oldPrice}</span>}
                  </div>
              </div>

              <div className="h-px w-full bg-stone-200"></div>

              <p className="text-stone-600 leading-loose font-light">
                  {product.description}
                  <br/>
                  Designed with attention to detail and crafted from premium materials to ensure longevity and style.
              </p>

              <div>
                  <div className="flex justify-between mb-3">
                      <span className="text-xs font-bold uppercase tracking-widest text-stone-900">Size</span>
                      <button className="text-xs text-stone-500 underline">Size Guide</button>
                  </div>
                  <div className="flex gap-3">
                      {SIZES.map(size => (
                          <button
                              key={size}
                              onClick={() => setSelectedSize(size)}
                              className={`w-12 h-12 flex items-center justify-center text-xs border transition-all
                              ${selectedSize === size ? 'border-stone-900 bg-stone-900 text-white' : 'border-stone-200 text-stone-600 hover:border-stone-900'}`}
                          >
                              {size}
                          </button>
                      ))}
                  </div>
              </div>

              <div className="flex gap-4 pt-6">
                  <button 
                      onClick={handleAddToCart}
                      className="flex-1 bg-stone-900 text-white h-14 text-sm font-bold uppercase tracking-widest hover:bg-stone-800 transition-colors"
                  >
                      Add to Bag
                  </button>
                  <button 
                      onClick={() => dispatch(toggleWishlist(product.id))}
                      className={`w-14 h-14 flex items-center justify-center border border-stone-200 hover:border-stone-900 transition-colors ${isLiked ? 'bg-stone-50' : ''}`}
                  >
                      <Heart className={`h-5 w-5 ${isLiked ? 'fill-stone-900 text-stone-900' : 'text-stone-900'}`} />
                  </button>
              </div>

              <div className="flex items-center gap-6 pt-8 text-stone-500 text-xs uppercase tracking-widest">
                   <div className="flex items-center gap-2">
                       <Share2 className="h-4 w-4" /> Share
                   </div>
                   <div className="flex items-center gap-2">
                       <Star className="h-4 w-4" /> Reviews ({product.reviews})
                   </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};