
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Send, X, Bot, ShoppingBag, ChevronLeft, Trash2, Plus } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { toggleChat, addMessage, setTyping, clearChat } from '../redux/chatSlice';
import { addItemToCart } from '../redux/cartSlice';
import { addToast } from '../redux/uiSlice';
import { getSmartAgentResponse } from '../services/aiService';
import { Product } from '../types';

const QUICK_PROMPTS = [
  "🎁 רעיון למתנה",
  "👗 לוק לערב",
  "🏃 נעלי ספורט",
  "🏠 עיצוב לסלון"
];

export const SmartAgentChat: React.FC = () => {
  const { isOpen, messages, isTyping } = useAppSelector((state) => state.chat);
  const dispatch = useAppDispatch();
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (textOverride?: string) => {
    const textToSend = textOverride || inputValue;
    if (!textToSend.trim()) return;

    setInputValue('');
    
    // 1. Add User Message
    dispatch(addMessage({ text: textToSend, sender: 'user' }));
    dispatch(setTyping(true));

    // 2. Get AI Response (Text + Products)
    const { text, products } = await getSmartAgentResponse(textToSend);
    
    dispatch(setTyping(false));
    
    // 3. Add Bot Message with Data
    dispatch(addMessage({ 
      text: text, 
      sender: 'bot',
      recommendedProducts: products 
    }));
  };

  const handleAddToCartFromChat = (e: React.MouseEvent, product: Product) => {
    e.preventDefault(); // Prevent navigation to product page
    e.stopPropagation();
    dispatch(addItemToCart(product));
    dispatch(addToast({ message: 'המוצר נוסף לעגלה!', type: 'success' }));
  };

  const MiniProductCard: React.FC<{ product: Product }> = ({ product }) => (
    <Link to={`/product/${product.id}`} className="block bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow min-w-[140px] max-w-[140px] snap-center group relative">
      <div className="h-24 w-full bg-gray-100 relative">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        
        {/* Price Tag */}
        <div className="absolute top-1 right-1 bg-white/90 px-1.5 py-0.5 rounded text-[10px] font-bold shadow-sm">
            ₪{product.price}
        </div>

        {/* Add to Cart Button (Overlay) */}
        <button 
            onClick={(e) => handleAddToCartFromChat(e, product)}
            className="absolute bottom-1 left-1 p-1.5 bg-rose-500 text-white rounded-full shadow-md hover:bg-rose-600 hover:scale-105 transition-all active:scale-95 z-10"
            title="הוסף לעגלה"
        >
            <Plus className="h-3 w-3" />
        </button>
      </div>
      
      <div className="p-2">
        <p className="text-xs font-bold text-gray-800 truncate">{product.name}</p>
        <div className="flex items-center justify-between text-[10px] text-gray-500 mt-1">
            <span className="flex items-center gap-0.5">
                לפרטים <ChevronLeft className="h-3 w-3" />
            </span>
        </div>
      </div>
    </Link>
  );

  if (!isOpen) {
    return (
      <button
        onClick={() => dispatch(toggleChat())}
        className="fixed bottom-24 md:bottom-6 left-6 z-40 bg-gray-900 text-white p-4 rounded-full shadow-lg shadow-gray-400 hover:scale-110 transition-transform duration-300 group"
      >
        <Sparkles className="h-6 w-6 group-hover:animate-spin" />
        <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs font-bold px-2 py-0.5 rounded-full animate-bounce">
          AI
        </span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-24 md:bottom-6 left-6 z-50 w-[320px] md:w-[380px] bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300 h-[600px] max-h-[60vh] md:max-h-[80vh]">
      
      {/* Header */}
      <div className="bg-gray-900 p-4 flex items-center justify-between text-white shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-tr from-rose-400 to-purple-500 rounded-full flex items-center justify-center relative">
            <Bot className="h-6 w-6 text-white" />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-gray-900 rounded-full"></span>
          </div>
          <div>
            <h3 className="font-bold text-sm">StyleMatch AI</h3>
            <p className="text-xs text-gray-300">הסטייליסטית שלך מחוברת</p>
          </div>
        </div>
        <div className="flex gap-2">
            <button 
                onClick={() => dispatch(clearChat())}
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
                title="נקה שיחה"
            >
            <Trash2 className="h-4 w-4" />
            </button>
            <button 
            onClick={() => dispatch(toggleChat())}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
            <X className="h-5 w-5" />
            </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 bg-gray-50 p-4 overflow-y-auto">
        <div className="space-y-6">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
              
              {/* Text Bubble */}
              <div
                className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  msg.sender === 'user'
                    ? 'bg-rose-500 text-white rounded-br-none'
                    : 'bg-white text-gray-800 rounded-bl-none border border-gray-100'
                }`}
              >
                {msg.text}
              </div>

              {/* Product Cards Carousel (Only for Bot) */}
              {msg.recommendedProducts && msg.recommendedProducts.length > 0 && (
                <div className="mt-3 w-full overflow-x-auto pb-2 scrollbar-hide">
                    <div className="flex gap-2 px-1">
                        {msg.recommendedProducts.map(p => (
                            <MiniProductCard key={p.id} product={p} />
                        ))}
                    </div>
                </div>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white p-3 rounded-2xl rounded-bl-none shadow-sm border border-gray-100 flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Quick Prompts & Input Area */}
      <div className="bg-white border-t border-gray-100 shrink-0">
        
        {/* Quick Chips */}
        <div className="px-4 pt-3 pb-1 flex gap-2 overflow-x-auto scrollbar-hide">
            {QUICK_PROMPTS.map((prompt, idx) => (
                <button 
                    key={idx}
                    onClick={() => handleSendMessage(prompt)}
                    className="whitespace-nowrap px-3 py-1.5 bg-gray-100 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 border border-transparent rounded-full text-xs font-medium text-gray-600 transition-all"
                >
                    {prompt}
                </button>
            ))}
        </div>

        <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="p-4 pt-2">
            <div className="relative flex items-center">
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="תשאלי אותי כל דבר..."
                className="w-full bg-gray-100 text-gray-800 pl-4 pr-12 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 text-sm transition-all"
            />
            <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="absolute right-2 p-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 disabled:opacity-50 disabled:hover:bg-rose-500 transition-colors"
            >
                <Send className="h-4 w-4" />
            </button>
            </div>
        </form>
      </div>
    </div>
  );
};
