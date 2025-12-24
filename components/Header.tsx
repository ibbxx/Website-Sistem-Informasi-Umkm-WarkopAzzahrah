
import React, { useState, useEffect } from 'react';
import CartIcon from './CartIcon';

interface HeaderProps {
  onNavigate: (id: string) => void;
  onOpenCheckout: () => void;
  onOpenHistory: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, onOpenCheckout, onOpenHistory }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'tentang-kami', label: 'Cerita' },
    { id: 'menu', label: 'Menu' },
    { id: 'promo', label: 'Promo' },
    { id: 'kontak', label: 'Kontak' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 px-4 md:px-8 ${isScrolled ? 'py-4' : 'py-8'}`}>
      <div className="container mx-auto max-w-7xl">
        <div className={`transition-all duration-700 rounded-[2rem] border border-white/10 flex justify-between items-center text-white px-8 py-3 ${isScrolled ? 'bg-stone-950/80 backdrop-blur-2xl shadow-2xl py-3 scale-[0.98]' : 'bg-transparent border-transparent'}`}>
            
            <button 
                onClick={() => onNavigate('hero')}
                className="group flex flex-col items-start"
            >
                <h1 className={`text-2xl font-black font-serif tracking-tighter transition-all duration-500 ${isScrolled ? 'text-amber-400' : 'text-white text-3xl'}`}>
                    Warkop <span className="text-amber-500 group-hover:text-amber-300 transition-colors italic">Azzahra</span>
                </h1>
                {!isScrolled && <div className="h-0.5 w-0 group-hover:w-full bg-amber-500 transition-all duration-500"></div>}
            </button>

            <div className="flex items-center space-x-2 md:space-x-8">
                <nav className="hidden md:flex space-x-10 items-center">
                    {navLinks.map((link) => (
                    <button
                        key={link.id}
                        onClick={() => onNavigate(link.id)}
                        className="relative group text-sm font-bold uppercase tracking-widest text-stone-300 hover:text-white transition-colors"
                    >
                        {link.label}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
                    </button>
                    ))}
                </nav>

                <div className="flex items-center space-x-4 md:space-x-6 pl-4 md:border-l border-white/10">
                    <button 
                        onClick={onOpenHistory} 
                        className="hidden sm:flex items-center gap-2 text-stone-300 hover:text-amber-400 transition-all text-xs font-bold uppercase tracking-wider" 
                        aria-label="Riwayat Pesanan"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </button>
                    
                    <div className="relative group">
                        <CartIcon onClick={onOpenCheckout} />
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-amber-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>

                    <button 
                        onClick={() => setIsMenuOpen(!isMenuOpen)} 
                        className="md:hidden p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                        aria-label="Toggle menu"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
            <div className="mt-4 bg-stone-950/95 backdrop-blur-3xl rounded-3xl border border-white/10 overflow-hidden shadow-[0_40px_80px_-15px_rgba(0,0,0,0.5)] animate-blur-in">
                <nav className="flex flex-col p-6 space-y-4">
                    {navLinks.map((link) => (
                    <button
                        key={link.id}
                        onClick={() => {
                        onNavigate(link.id);
                        setIsMenuOpen(false);
                        }}
                        className="w-full text-left px-6 py-4 text-xl font-bold hover:bg-white/5 hover:text-amber-400 rounded-2xl transition-all"
                    >
                        {link.label}
                    </button>
                    ))}
                    <div className="h-px w-full bg-white/10 my-2"></div>
                    <button
                        onClick={() => {
                            onOpenHistory();
                            setIsMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-6 py-4 text-stone-400 hover:text-white"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        Riwayat Pesanan
                    </button>
                </nav>
            </div>
        )}
      </div>
    </header>
  );
};

export default Header;
