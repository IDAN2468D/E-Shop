
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { loginStart, loginSuccess, loginFailure } from '../redux/authSlice';
import { addToast } from '../redux/uiSlice';
import { ArrowRight, Loader2 } from 'lucide-react';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading } = useAppSelector(state => state.auth);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock Validation
    if (!email || !password) {
      dispatch(addToast({ message: 'אנא מלא את כל השדות', type: 'error' }));
      return;
    }

    dispatch(loginStart());

    // Simulate API Call
    setTimeout(() => {
      // Success simulation
      if (email.includes('@')) {
        dispatch(loginSuccess({
          id: '1',
          name: 'דנה כהן', // Mock Name
          email: email,
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80'
        }));
        dispatch(addToast({ message: 'התחברת בהצלחה', type: 'success' }));
        navigate('/');
      } else {
        dispatch(loginFailure('כתובת אימייל לא תקינה'));
        dispatch(addToast({ message: 'פרטי התחברות שגויים', type: 'error' }));
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Side - Image (Hidden on mobile) */}
      <div className="hidden lg:block w-1/2 relative bg-stone-100 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1000&q=80" 
          alt="Fashion Model" 
          className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
        />
        <div className="absolute inset-0 bg-black/20 flex items-end p-12">
          <div className="text-white">
             <h2 className="text-4xl font-serif mb-4">Welcome Back</h2>
             <p className="text-sm tracking-widest uppercase opacity-80">Discover the new collection</p>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-20">
        <div className="max-w-md w-full space-y-12 animate-in slide-in-from-right-10 duration-700">
          
          <div className="text-center lg:text-left">
            <Link to="/" className="inline-block text-2xl font-serif font-bold tracking-widest uppercase mb-12">
              E-Shop<span className="text-[10px] align-top ml-1 font-sans font-light opacity-70">IL</span>
            </Link>
            <h1 className="text-3xl md:text-4xl font-serif text-stone-900 mb-2">התחברות לחשבון</h1>
            <p className="text-stone-500">הכנס את פרטיך כדי לגשת להזמנות ולמועדפים</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
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

              <div className="relative group">
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder=" "
                  className="peer w-full bg-transparent border-b border-stone-300 py-3 text-stone-900 focus:outline-none focus:border-stone-900 transition-colors"
                />
                <label className="absolute right-0 top-3 text-stone-400 text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-stone-900 peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-stone-900 pointer-events-none">
                  סיסמה
                </label>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 border-stone-300 rounded text-stone-900 focus:ring-stone-900" />
                    <span className="text-stone-500 group-hover:text-stone-900 transition-colors">זכור אותי</span>
                </label>
                <Link to="/forgot-password" className="text-stone-500 hover:text-stone-900 underline underline-offset-4 decoration-stone-300 hover:decoration-stone-900 transition-all">
                    שכחתי סיסמה
                </Link>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-stone-900 text-white h-14 text-sm font-bold uppercase tracking-widest hover:bg-stone-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'התחבר'}
              {!loading && <ArrowRight className="h-4 w-4" />}
            </button>
          </form>

          <div className="text-center text-sm text-stone-500">
            אין לך חשבון עדיין?{' '}
            <Link to="/register" className="text-stone-900 font-bold hover:underline underline-offset-4">
              הרשם עכשיו
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
