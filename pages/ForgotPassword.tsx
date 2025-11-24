
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../redux/hooks';
import { addToast } from '../redux/uiSlice';
import { ArrowLeft, Loader2 } from 'lucide-react';

export const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    // Simulate API Call
    setTimeout(() => {
        setLoading(false);
        dispatch(addToast({ message: 'נשלח מייל לאיפוס סיסמה לכתובת זו', type: 'success' }));
        navigate('/login');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6">
      <div className="max-w-md w-full animate-in zoom-in-95 duration-500">
        <div className="text-center mb-12">
             <h2 className="text-2xl font-serif text-stone-900 mb-2">איפוס סיסמה</h2>
             <p className="text-stone-500">הכנס את כתובת האימייל שלך ונשלח לך קישור לאיפוס</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="relative group">
            <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder=" "
                className="peer w-full bg-transparent border-b border-stone-300 py-3 text-stone-900 focus:outline-none focus:border-stone-900 transition-colors"
            />
            <label className="absolute right-0 top-3 text-stone-400 text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-stone-900 peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-stone-900 pointer-events-none">
                כתובת אימייל
            </label>
            </div>

            <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-stone-900 text-white h-14 text-sm font-bold uppercase tracking-widest hover:bg-stone-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
            >
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'שלח קישור'}
            </button>
        </form>

        <div className="text-center mt-8">
            <Link to="/login" className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-stone-900 transition-colors">
                <ArrowLeft className="h-4 w-4" /> חזרה להתחברות
            </Link>
        </div>
      </div>
    </div>
  );
};
