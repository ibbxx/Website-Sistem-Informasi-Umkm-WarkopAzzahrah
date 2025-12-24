
import React, { useEffect, useRef, useState } from 'react';

interface HeroProps {
  onNavigate: (id: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
        if (!containerRef.current) return;
        // Interpolasi posisi mouse untuk pergerakan yang lebih lambat dan halus
        const x = (e.clientX / window.innerWidth) * 2 - 1;
        const y = (e.clientY / window.innerHeight) * 2 - 1;
        setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section 
      id="hero" 
      ref={containerRef}
      className="relative h-screen flex items-center justify-center overflow-hidden bg-[#990a0a]"
    >
      {/* Dynamic Background with Ultra-Smooth Parallax */}
      <div 
        className="absolute inset-0 z-0 overflow-hidden"
        style={{
            transform: `translate(${mousePos.x * -15}px, ${mousePos.y * -15}px) scale(1.15)`,
            transition: 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        <div 
            className="w-full h-full bg-cover bg-center animate-ken-burns"
            style={{ 
                backgroundImage: "url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1920&auto=format&fit=crop')",
            }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#7a0808]/90 via-[#990a0a]/50 to-[#4d0505]/95"></div>
        <div className="absolute inset-0 bg-red-900/10 mix-blend-overlay animate-breathe"></div>
      </div>

      {/* Dynamic Steam/Smoke with Floating Motion */}
      <div className="absolute bottom-0 left-0 right-0 h-2/3 pointer-events-none z-10 opacity-20">
         <div className="absolute -bottom-20 left-1/4 w-[600px] h-[600px] bg-white/5 rounded-full blur-[140px] animate-soft-breathe"></div>
         <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[120px] animate-soft-breathe" style={{ animationDelay: '1.5s' }}></div>
      </div>
      
      <div className="relative z-20 container mx-auto px-6 text-center">
        <div className="max-w-5xl mx-auto">
            {/* Tagline removed as per request */}
            
            {/* Title with Parallax Shift */}
            <h1 className="text-7xl md:text-[10rem] font-bold text-white mb-8 tracking-tighter leading-[0.9] select-none">
              <span className="block animate-blur-in delay-200 opacity-0" style={{ transform: `translateX(${mousePos.x * 10}px)`, transition: 'transform 1.4s cubic-bezier(0.16, 1, 0.3, 1)', animationFillMode: 'forwards' }}>
                Seduhan
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-300 to-white font-handwriting italic pr-6 animate-blur-in delay-300 opacity-0" style={{ transform: `translateX(${mousePos.x * -10}px)`, transition: 'transform 1.6s cubic-bezier(0.16, 1, 0.3, 1)', animationFillMode: 'forwards' }}>
                Sempurna
              </span>
            </h1>
            
            {/* Description Reveal */}
            <div className="mt-10 mb-16 max-w-2xl mx-auto animate-blur-in delay-500 opacity-0" style={{animationFillMode: 'forwards'}}>
                 <p className="text-xl md:text-3xl text-white/70 font-serif-text font-light leading-relaxed italic">
                "Cita rasa legendaris Nusantara, kini hadir dalam kemewahan visual yang memanjakan mata."
                </p>
            </div>

            {/* CTA Buttons with Magnetic Feel */}
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center animate-blur-in delay-700 opacity-0" style={{animationFillMode: 'forwards'}}>
                <button
                onClick={() => onNavigate('menu')}
                className="group relative px-14 py-6 bg-white text-[#990a0a] rounded-full font-black text-xl overflow-hidden transition-all duration-700 hover:scale-110 hover:shadow-[0_0_50px_rgba(255,255,255,0.3)] active:scale-95"
                >
                    <span className="relative z-10 flex items-center gap-3">
                        Pesan Sekarang
                        <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </span>
                    <div className="absolute inset-0 bg-amber-50 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700"></div>
                </button>
                
                <button
                onClick={() => onNavigate('promo')}
                className="group px-12 py-6 text-white border-2 border-white/20 backdrop-blur-md rounded-full hover:bg-white/10 transition-all duration-700 font-bold text-xl hover:border-amber-400/50 hover:scale-105 active:scale-95"
                >
                    Lihat Katalog Promo
                </button>
            </div>
        </div>
      </div>

      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-4 z-20 opacity-40 hover:opacity-100 transition-opacity duration-700 cursor-pointer">
          <div className="w-[2px] h-12 bg-gradient-to-b from-amber-400 to-transparent animate-bounce"></div>
      </div>

      <style>{`
        .vertical-text {
            writing-mode: vertical-rl;
            text-orientation: mixed;
        }
      `}</style>
    </section>
  );
};

export default Hero;
