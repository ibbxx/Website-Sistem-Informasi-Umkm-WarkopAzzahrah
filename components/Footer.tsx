
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-900 text-stone-400 pt-16 pb-8 border-t border-stone-800">
      <div className="container mx-auto px-6">
        
        {/* Main Footer Content - Centered */}
        <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-4xl font-bold text-white font-serif mb-6">Warkop <span className="text-amber-500 italic">Azzahra</span></h2>
            <p className="max-w-2xl text-stone-500 leading-relaxed mb-8 text-lg">
                Menghadirkan cita rasa kopi Nusantara terbaik sejak 2023. Kami berdedikasi untuk menyajikan pengalaman minum kopi yang autentik dan hangat.
            </p>
            
            {/* Social Icons */}
            <div className="flex space-x-6">
                <a href="#" className="w-12 h-12 rounded-full bg-stone-800 flex items-center justify-center text-stone-300 hover:bg-amber-500 hover:text-white transition-all duration-300 hover:-translate-y-1 shadow-lg" aria-label="Instagram">
                    <span className="font-bold">IG</span>
                </a>
                <a href="#" className="w-12 h-12 rounded-full bg-stone-800 flex items-center justify-center text-stone-300 hover:bg-amber-500 hover:text-white transition-all duration-300 hover:-translate-y-1 shadow-lg" aria-label="Facebook">
                    <span className="font-bold">FB</span>
                </a>
                <a href="#" className="w-12 h-12 rounded-full bg-stone-800 flex items-center justify-center text-stone-300 hover:bg-amber-500 hover:text-white transition-all duration-300 hover:-translate-y-1 shadow-lg" aria-label="Twitter">
                    <span className="font-bold">TW</span>
                </a>
            </div>
        </div>

        <div className="border-t border-stone-800 pt-8 text-center flex flex-col md:flex-row justify-between items-center text-sm">
            <p>&copy; {new Date().getFullYear()} Warkop Azzahra. All Rights Reserved.</p>
            <p className="mt-2 md:mt-0 flex items-center gap-1">
                Dibuat dengan <span className="text-red-500">❤️</span> & Kopi.
            </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
