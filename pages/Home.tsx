
import React, { useEffect, useState } from 'react';
import { Search, Filter, ArrowRight, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { fetchProducts, CATEGORIES } from '../services/productService';
import { ProductCard } from '../components/ProductCard';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';

export const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const searchQuery = useAppSelector((state) => state.ui.searchQuery);
  
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await fetchProducts();
      setProducts(data);
      setLoading(false);
    };
    loadData();
  }, []);

  const filteredProducts = products.filter(
    p => {
      const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    }
  );

  const scrollToProducts = () => {
    const section = document.getElementById('product-grid');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-stone-900">
      
      {/* Hero Section */}
      <div className="relative h-[85vh] w-full overflow-hidden">
        <img 
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=90" 
            alt="Luxury Collection" 
            className="w-full h-full object-cover object-[center_30%]"
        />
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-6">
            <p className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">New Collection 2024</p>
            <h1 className="text-5xl md:text-8xl font-serif mb-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">Timeless Elegance</h1>
            <button 
              onClick={scrollToProducts}
              className="bg-white text-stone-900 px-10 py-4 text-sm font-bold tracking-widest uppercase hover:bg-stone-900 hover:text-white transition-colors duration-300 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500"
            >
                Discover Now
            </button>
        </div>
      </div>

      {/* Categories Strip - Minimalist */}
      <div className="border-b border-stone-100 sticky top-0 bg-white/95 backdrop-blur z-20">
        <div className="container mx-auto overflow-x-auto scrollbar-hide">
            <div className="flex justify-center md:justify-center min-w-max px-6">
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`
                            px-6 py-6 text-xs font-bold tracking-widest uppercase transition-all border-b-2
                            ${activeCategory === cat.id ? 'border-stone-900 text-stone-900' : 'border-transparent text-stone-400 hover:text-stone-600'}
                        `}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 py-16">
        
        {/* Editorial Section */}
        {!searchQuery && (
          <div className="flex flex-col md:flex-row items-center gap-12 mb-24">
              <div className="w-full md:w-1/2 aspect-[4/5] relative group overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80" alt="Featured" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute bottom-8 left-8 text-white">
                      <h3 className="text-3xl font-serif mb-2">The Leather Edit</h3>
                      <Link to="/" className="text-sm font-bold uppercase tracking-widest border-b border-white pb-1 hover:text-stone-200 hover:border-stone-200">Shop Bags</Link>
                  </div>
              </div>
              <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
                  <h2 className="text-4xl font-serif text-stone-900">Curated for You</h2>
                  <p className="text-stone-500 leading-relaxed max-w-md mx-auto md:mx-0">
                      Explore our selection of handcrafted essentials. From Italian leather to sustainable fabrics, quality is at the heart of everything we do.
                  </p>
                  <div className="pt-4">
                      <Link to="/categories" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest border-b border-stone-900 pb-1 hover:text-stone-600 hover:border-stone-600 transition-colors">
                          Read the Journal <ArrowRight className="h-4 w-4" />
                      </Link>
                  </div>
              </div>
          </div>
        )}

        {/* Product Grid */}
        <div id="product-grid" className="mb-24">
            <div className="flex justify-between items-end mb-12">
                <h3 className="text-3xl font-serif">
                     {searchQuery ? `Search results for "${searchQuery}"` : (activeCategory === 'all' ? 'Latest Arrivals' : CATEGORIES.find(c => c.id === activeCategory)?.label)}
                </h3>
                <button 
                  onClick={() => { setActiveCategory('all'); }}
                  className="text-xs font-bold uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-colors"
                >
                  View All
                </button>
            </div>

            {loading ? (
                <div className="h-96 flex items-center justify-center">
                    <div className="w-1 h-16 bg-stone-200 overflow-hidden">
                        <div className="w-full h-full bg-stone-900 animate-pulse"></div>
                    </div>
                </div>
            ) : filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-12">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20">
                  <p className="text-stone-500 text-lg">No products found.</p>
                  <button onClick={() => { setActiveCategory('all'); }} className="mt-4 text-stone-900 underline">Clear filters</button>
                </div>
            )}
        </div>

        {/* Newsletter */}
        <div className="bg-stone-100 py-20 px-6 text-center">
             <h3 className="text-3xl font-serif mb-4">Join the Club</h3>
             <p className="text-stone-500 mb-8 max-w-md mx-auto text-sm">Sign up for exclusive access to new collections and member-only events.</p>
             <div className="max-w-md mx-auto flex border-b border-stone-300 focus-within:border-stone-900 transition-colors">
                 <input type="email" placeholder="Your Email Address" className="flex-1 bg-transparent py-3 outline-none text-stone-900 placeholder:text-stone-400" />
                 <button className="text-xs font-bold uppercase tracking-widest text-stone-900 hover:text-stone-600">Subscribe</button>
             </div>
        </div>

      </div>
    </div>
  );
};
