
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight } from 'lucide-react';
import { useAppSelector } from '../redux/hooks';
import { Product } from '../types';
import { fetchProducts } from '../services/productService';
import { ProductCard } from '../components/ProductCard';

export const Wishlist: React.FC = () => {
  const wishlistIds = useAppSelector((state) => state.wishlist.items);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const wishlistProducts = products.filter(p => wishlistIds.includes(p.id));

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="container mx-auto px-6 pt-6">
        <div className="flex items-center gap-4 mb-8">
             <Link to="/" className="p-2 rounded-full bg-white shadow-sm hover:bg-gray-100 transition-colors">
                <ArrowRight className="h-5 w-5 text-gray-600" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">המועדפים שלי</h1>
        </div>

        {loading ? (
             <div className="text-center py-20 text-gray-400">טוען...</div>
        ) : wishlistProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-24 h-24 bg-rose-50 rounded-full flex items-center justify-center mb-6">
                <Heart className="h-10 w-10 text-rose-500" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">רשימת המשאלות ריקה</h2>
            <p className="text-gray-500 mb-8 text-center max-w-xs">שמרי את הפריטים שאת הכי אוהבת כדי לחזור אליהם מאוחר יותר.</p>
            <Link
              to="/"
              className="bg-rose-500 text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-rose-200 hover:bg-rose-600 transition-colors"
            >
              התחילי לקנות
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {wishlistProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
