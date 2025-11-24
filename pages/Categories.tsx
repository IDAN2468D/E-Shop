
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES } from '../services/productService';

export const Categories: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="container mx-auto px-6 pt-6">
        <div className="flex items-center gap-4 mb-8">
             <Link to="/" className="p-2 rounded-full bg-white shadow-sm hover:bg-gray-100 transition-colors">
                <ArrowRight className="h-5 w-5 text-gray-600" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">קטגוריות</h1>
        </div>

        <div className="grid grid-cols-2 gap-4">
            {CATEGORIES.filter(c => c.id !== 'all').map((cat) => (
                <Link to="/" key={cat.id} className="group relative h-40 rounded-3xl overflow-hidden shadow-sm">
                    <img src={cat.image} alt={cat.label} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                        <span className="text-white font-bold text-lg border-2 border-white/50 px-4 py-1 rounded-full backdrop-blur-sm">
                            {cat.label}
                        </span>
                    </div>
                </Link>
            ))}
        </div>
      </div>
    </div>
  );
};
