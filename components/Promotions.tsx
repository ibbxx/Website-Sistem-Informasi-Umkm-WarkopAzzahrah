
import React, { useRef, useEffect, useState } from 'react';
import { PROMOTIONS_LIST } from '../constants';

interface PromotionsProps {
    onNavigate: (id: string) => void;
}

const Promotions: React.FC<PromotionsProps> = ({ onNavigate }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="promo" ref={sectionRef} className="bg-stone-950 py-32 relative overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
         <div className="absolute -top-[20%] left-[20%] w-[800px] h-[800px] bg-amber-900/10 rounded-full blur-[150px] animate-float-gentle"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center mb-20 animate-blur-in">
            <span className="text-amber-500 font-bold tracking-[0.4em] text-xs uppercase mb-4 block">Limited Offers</span>
            <h2 className="text-5xl md:text-7xl font-bold font-serif text-white leading-tight">
                Curated <span className="italic text-stone-600">Promotions</span>
            </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {PROMOTIONS_LIST.map((promo, index) => (
            <div 
                key={promo.id} 
                className={`group relative h-[450px] rounded-[2rem] overflow-hidden cursor-pointer shadow-2xl ${isVisible ? 'animate-blur-in' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 200}ms` }}
                onClick={() => onNavigate('menu')}
            >
                {/* 1. Ken Burns Image Background */}
                <div className="absolute inset-0 overflow-hidden">
                    <img 
                        src={promo.imageUrl} 
                        alt={promo.title} 
                        className="w-full h-full object-cover animate-ken-burns opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                    />
                </div>

                {/* 2. Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90"></div>

                {/* 3. Glass Content Panel */}
                <div className="absolute inset-x-6 bottom-6 bg-white/10 backdrop-blur-md border border-white/10 p-8 rounded-3xl transform transition-transform duration-500 group-hover:translate-y-[-10px]">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-3xl font-bold font-serif text-white group-hover:text-amber-200 transition-colors">
                            {promo.title}
                        </h3>
                        <span className="bg-amber-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                            Promo
                        </span>
                    </div>
                    
                    <p className="text-stone-300 text-base leading-relaxed mb-6 line-clamp-2 group-hover:line-clamp-none transition-all">
                        {promo.description}
                    </p>
                    
                    <div className="flex items-center gap-3">
                        <span className="text-xs text-white/60 uppercase tracking-widest font-bold border-b border-white/20 pb-1 group-hover:border-amber-400 group-hover:text-amber-400 transition-all">
                            Claim Offer
                        </span>
                        <svg className="w-4 h-4 text-white/60 group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </div>
                </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Promotions;
