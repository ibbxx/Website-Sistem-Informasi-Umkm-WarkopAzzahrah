
import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Menu from './components/Menu';
import Promotions from './components/Promotions';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { CartProvider } from './CartContext';
import { MenuProvider } from './MenuContext';
import CheckoutModal from './components/CheckoutModal';
import OrderHistoryModal from './components/OrderHistoryModal';

const App: React.FC = () => {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <MenuProvider>
      <CartProvider>
        <div className="bg-paper-pattern text-stone-800 font-sans min-h-screen">
          <Header 
            onNavigate={handleScrollTo} 
            onOpenCheckout={() => setIsCheckoutOpen(true)}
            onOpenHistory={() => setIsHistoryOpen(true)} 
          />
          <main>
            <Hero onNavigate={handleScrollTo} />
            <About />
            <Menu />
            <Promotions onNavigate={handleScrollTo}/>
            <Contact />
          </main>
          <Footer />
          <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
          <OrderHistoryModal isOpen={isHistoryOpen} onClose={() => setIsHistoryOpen(false)} />
        </div>
      </CartProvider>
    </MenuProvider>
  );
};

export default App;