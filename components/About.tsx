
import React, { useEffect, useState, useRef } from 'react';

const About: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const processes = [
    {
      id: 1,
      step: "01",
      title: "Penyortiran Manual",
      description: "Hanya biji kopi terbaik yang lolos seleksi ketat tim ahli kami.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      )
    },
    {
      id: 2,
      step: "02",
      title: "Roasting Presisi",
      description: "Proses sangrai batch kecil untuk mengunci karakter rasa Nusantara.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      id: 3,
      step: "03",
      title: "Sajian Sepenuh Hati",
      description: "Setiap cangkir adalah karya seni yang diseduh oleh barista kami.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    }
  ];

  return (
    <section id="tentang-kami" ref={sectionRef} className="relative py-32 bg-[#fffaf5] overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
          <div className="absolute top-40 -left-20 w-96 h-96 bg-amber-100/40 rounded-full blur-[120px] animate-float-gentle"></div>
          <div className="absolute bottom-40 -right-20 w-80 h-80 bg-stone-200/40 rounded-full blur-[100px] animate-float-gentle delay-700"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-px bg-stone-200/30"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Story Section - Editorial Grid */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 mb-32">
          
          {/* Asymmetrical Image Composition - Resized & Repositioned */}
          <div className="lg:w-[40%] relative w-full h-[400px] md:h-[500px]">
             {/* Main Image */}
             <div className={`absolute top-0 left-0 w-[85%] h-[90%] rounded-[2.5rem] overflow-hidden shadow-2xl z-10 ${isVisible ? 'animate-blur-in' : 'opacity-0'}`}>
                <img 
                    src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200&auto=format&fit=crop" 
                    alt="Barista at work" 
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-[2s]"
                />
             </div>
             
             {/* Secondary Detail Image */}
             <div className={`absolute bottom-4 right-4 w-[55%] h-[50%] rounded-[2rem] overflow-hidden shadow-2xl z-20 border-8 border-[#fffaf5] ${isVisible ? 'animate-blur-in delay-500' : 'opacity-0'}`}>
                <img 
                    src="https://images.unsplash.com/photo-1559056191-4917a1191317?q=80&w=1200&auto=format&fit=crop" 
                    alt="Coffee roasting" 
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-[2s]"
                />
             </div>

             {/* Floating Badge - Smaller for balance */}
             <div className="absolute -top-4 -right-4 z-30 animate-bounce-slow">
                <div className="w-24 h-24 rounded-full bg-amber-500 flex items-center justify-center border-4 border-white shadow-xl rotate-12">
                    <p className="text-white font-black text-center text-[9px] leading-tight uppercase tracking-tighter">
                        Terbaik<br/>Lokal
                    </p>
                </div>
             </div>
          </div>

          {/* Text Content - Expanded Width */}
          <div className="lg:w-[60%]">
            {/* Tagline removed as per request */}
            
            <h2 className={`text-5xl md:text-7xl font-bold text-stone-900 mb-8 font-display leading-[1] ${isVisible ? 'animate-blur-in' : 'opacity-0'}`}>
              Seni Dalam <br/> <span className="text-amber-600 italic font-serif-text">Setiap Tetes.</span>
            </h2>
            
            <div className={`space-y-6 text-stone-600 text-lg md:text-xl font-serif-text leading-relaxed ${isVisible ? 'animate-blur-in delay-200' : 'opacity-0'}`}>
               <p>
                 Warkop Azzahra bukan sekadar tempat berkumpul; ini adalah perayaan rasa. Kami percaya bahwa setiap biji kopi memiliki jiwa yang harus dihormati.
               </p>
               <p className="italic border-l-4 border-amber-500 pl-6 py-2 bg-stone-100/50 rounded-r-2xl text-stone-700">
                 "Kami tidak hanya menyajikan kopi, kami menyajikan waktu luang yang bermakna dan kehangatan yang tulus."
               </p>
               <p>
                 Dari pegunungan Gayo hingga Toraja, kami membawa keajaiban alam Indonesia langsung ke dalam cangkir Anda.
               </p>
            </div>
          </div>
        </div>

        {/* Process Cards - Enhanced UI */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {processes.map((proc, idx) => (
                <div 
                    key={proc.id} 
                    className={`group relative bg-white border border-stone-200 p-10 rounded-[2.5rem] transition-all duration-500 hover:-translate-y-4 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] ${isVisible ? 'animate-blur-in' : 'opacity-0'}`}
                    style={{ animationDelay: `${idx * 200}ms` }}
                >
                    <div className="absolute top-8 right-10 text-6xl font-black text-stone-50 group-hover:text-amber-50 transition-colors pointer-events-none">
                        {proc.step}
                    </div>
                    
                    <div className="w-14 h-14 bg-stone-950 text-white rounded-2xl flex items-center justify-center mb-8 group-hover:bg-amber-500 group-hover:scale-110 transition-all duration-500 shadow-xl shadow-stone-950/20">
                        {proc.icon}
                    </div>
                    
                    <h4 className="text-2xl font-bold text-stone-900 mb-4 font-serif">{proc.title}</h4>
                    <p className="text-stone-500 leading-relaxed text-sm group-hover:text-stone-700 transition-colors">
                        {proc.description}
                    </p>

                    <div className="mt-8 w-8 h-1 bg-stone-100 group-hover:w-full group-hover:bg-amber-300 transition-all duration-700"></div>
                </div>
            ))}
        </div>

      </div>

      <style>{`
        @keyframes bounce-slow {
            0%, 100% { transform: translateY(0) rotate(12deg); }
            50% { transform: translateY(-15px) rotate(15deg); }
        }
        .animate-bounce-slow {
            animation: bounce-slow 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default About;
