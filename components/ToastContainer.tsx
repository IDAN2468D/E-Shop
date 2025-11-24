import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { removeToast } from '../redux/uiSlice';
import { CheckCircle, XCircle, Info } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const toasts = useAppSelector((state) => state.ui.toasts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    toasts.forEach((toast) => {
      const timer = setTimeout(() => {
        dispatch(removeToast(toast.id));
      }, 3000);
      return () => clearTimeout(timer);
    });
  }, [toasts, dispatch]);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 flex flex-col gap-2 w-full max-w-sm px-4 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`
            pointer-events-auto flex items-center p-4 rounded-2xl shadow-xl transform transition-all duration-300 animate-in slide-in-from-bottom-5 fade-in
            ${toast.type === 'success' ? 'bg-gray-800 text-white' : ''}
            ${toast.type === 'error' ? 'bg-red-500 text-white' : ''}
            ${toast.type === 'info' ? 'bg-blue-500 text-white' : ''}
          `}
        >
          {toast.type === 'success' && <CheckCircle className="h-5 w-5 ml-3 text-green-400" />}
          {toast.type === 'error' && <XCircle className="h-5 w-5 ml-3 text-white" />}
          {toast.type === 'info' && <Info className="h-5 w-5 ml-3 text-white" />}
          <p className="font-medium text-sm">{toast.message}</p>
        </div>
      ))}
    </div>
  );
};
