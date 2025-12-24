
import React, { useState, useRef, useEffect } from 'react';
import { CoffeeItem } from '../types';
import { useCart } from '../CartContext';

interface MenuItemProps {
  item: CoffeeItem;
  index?: number;
  onViewDetail?: (item: CoffeeItem) => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ item, index = 0, onViewDetail }) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { addToCart } = useCart();
  const elementRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!elementRef.current) return;
    const rect = elementRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    elementRef.current.style.setProperty('--mouse-x', `${x}px`);
    elementRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: '100px' }
    );
    
    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, []);

  const handleIncrease = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuantity(p => p + 1);
  };
  
  const handleDecrease = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuantity(p => (p > 1 ? p - 1 : 1));
  };

  const formatCurrency = (amount: number) => 
    new Intl.NumberFormat('id-ID', { 
        style: 'currency', 
        currency: 'IDR', 
        minimumFractionDigits: 0 
    }).format(amount);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAdding(true);
    
    setTimeout(() => {
        addToCart(item, quantity);
        setIsAdding(false);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    }, 400);
  };

  const animationDelay = `${(index % 6) * 100}ms`;

  return (
    <div 
        ref={elementRef}
        onMouseMove={handleMouseMove}
        onClick={() => onViewDetail && onViewDetail(item)}
        className={`group relative bg-white rounded-[2rem] p-4 w-full cursor-pointer border border-stone-200
                   overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
                   hover:-translate-y-3 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.12)]
                   ${isVisible ? 'animate-blur-in' : 'opacity-0'}`}
        style={{ 
            animationDelay: isVisible ? animationDelay : '0ms', 
            animationFillMode: 'forwards',
            willChange: 'transform, opacity'
        }}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 spotlight-card pointer-events-none z-0"></div>

      <div className="relative aspect-square w-full rounded-[1.5rem] overflow-hidden mb-4 bg-stone-50 z-10 shadow-inner">
        <img 
            src={item.imageUrl} 
            alt={item.name} 
            className="w-full h-full object-cover transition-transform duration-[3s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110" 
            loading="lazy"
        />
        
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-20">
            {item.category === 'best-seller' && (
                <span className="bg-amber-500 text-white text-[8px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                    HOT
                </span>
            )}
            {item.category === 'new' && (
                <span className="bg-stone-900 text-white text-[8px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                    NEW
                </span>
            )}
        </div>
      </div>
      
      <div className="relative z-20 space-y-1">
        <h3 className="text-xl font-bold text-stone-900 transition-colors duration-500 line-clamp-2 min-h-[3rem] flex items-center leading-snug">
            {item.name}
        </h3>
        
        <div className="flex items-center justify-between mb-4">
            <p className="text-lg font-black text-amber-600 font-serif-text">
                {formatCurrency(item.price)}
            </p>
        </div>
        
        <div className="flex items-center justify-between gap-3 pt-3 border-t border-stone-100">
            <div 
                className="flex items-center bg-stone-50 border border-stone-200 rounded-full p-0.5"
                onClick={e => e.stopPropagation()}
            >
                <button 
                    onClick={handleDecrease} 
                    className="w-8 h-8 flex items-center justify-center text-stone-400 hover:text-stone-900 hover:bg-white rounded-full transition-all"
                >
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M20 12H4" /></svg>
                </button>
                <span className="w-8 text-center text-xs font-black text-stone-800">{quantity}</span>
                <button 
                    onClick={handleIncrease} 
                    className="w-8 h-8 flex items-center justify-center text-stone-400 hover:text-stone-900 hover:bg-white rounded-full transition-all"
                >
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" /></svg>
                </button>
            </div>

             <button
                onClick={handleAddToCart}
                disabled={added || isAdding}
                className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg transition-all duration-500 transform ${
                    added 
                    ? 'bg-green-500 text-white scale-110' 
                    : isAdding
                    ? 'bg-stone-400 text-white animate-pulse'
                    : 'bg-stone-950 text-white hover:bg-amber-600 hover:rotate-6 active:scale-90'
                }`}
                aria-label="Tambah ke keranjang"
             >
                {added ? (
                    <svg className="w-6 h-6 animate-blur-in" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                ) : isAdding ? (
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                ) : (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
                )}
             </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
