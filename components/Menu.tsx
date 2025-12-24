
import React, { useState, useEffect, useRef } from 'react';
import { useMenu } from '../MenuContext';
import MenuItem from './MenuItem';
import { CoffeeItem } from '../types';
import ProductDetailModal from './ProductDetailModal';

const Menu: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'best-seller' | 'new' | 'standard'>('all');
  const [selectedItem, setSelectedItem] = useState<CoffeeItem | null>(null);
  const { menuItems } = useMenu();

  const categories = [
    { id: 'all', label: 'Semua Menu' },
    { id: 'best-seller', label: 'Paling Laris' },
    { id: 'new', label: 'Terbaru' },
    { id: 'standard', label: 'Klasik' },
  ];

  // Filter Logic
  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;

    if (searchQuery.length > 0) {
        return matchesSearch;
    }
    return matchesCategory;
  });

  const handleViewDetail = (item: CoffeeItem) => setSelectedItem(item);
  const handleCloseDetail = () => setSelectedItem(null);

  return (
    <section id="menu" className="py-24 bg-[#fffaf5] min-h-screen relative">
      <div className="container mx-auto px-4 lg:px-12 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16 animate-blur-in">
            <p className="text-amber-600 font-bold tracking-[0.2em] text-xs uppercase mb-4">Our Collection</p>
            <h2 className="text-5xl md:text-7xl font-bold text-stone-900 mb-6 leading-none">
                Menu <span className="font-serif italic font-normal text-stone-600">Pilihan</span>
            </h2>
        </div>
        
        {/* Sticky Controls */}
        <div className="sticky top-24 z-40 pb-12">
             <div className="max-w-4xl mx-auto space-y-6">
                
                {/* Search Bar with Enhanced Visibility */}
                <div className="relative group shadow-2xl shadow-stone-200/50 rounded-full animate-blur-in">
                    <div className="absolute inset-0 bg-white/95 backdrop-blur-2xl rounded-full border border-stone-200 shadow-inner"></div>
                    <div className="relative flex items-center px-8 py-4">
                        <svg className="w-5 h-5 text-stone-400 group-focus-within:text-amber-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" />
                        </svg>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Cari kopi atau makanan favoritmu..."
                            className="w-full bg-transparent border-none focus:ring-0 text-stone-800 placeholder-stone-400 ml-4 font-serif-text text-lg"
                        />
                    </div>
                </div>

                {/* Category Tabs */}
                {searchQuery.length === 0 && (
                    <div className="flex flex-wrap justify-center gap-3 animate-blur-in delay-100">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id as any)}
                                className={`px-8 py-3 rounded-full text-xs font-black tracking-[0.1em] uppercase transition-all duration-500 border-2 ${
                                    activeCategory === cat.id
                                        ? 'bg-stone-900 text-white border-stone-900 shadow-xl scale-105'
                                        : 'bg-white text-stone-500 border-stone-100 hover:border-amber-400 hover:text-amber-600'
                                }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                )}
             </div>
        </div>
        
        {/* Grid Layout */}
        <div className="min-h-[400px]">
            {filteredItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredItems.map((item, index) => (
                        <MenuItem 
                            key={item.id} 
                            item={item} 
                            index={index} 
                            onViewDetail={handleViewDetail}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-32 w-full bg-white/50 rounded-[3rem] border-2 border-dashed border-stone-200 animate-blur-in">
                    <p className="text-stone-400 text-2xl font-serif italic mb-6">
                        Maaf, menu tidak ditemukan.
                    </p>
                    <button 
                        onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                        className="px-8 py-3 bg-amber-600 text-white rounded-full font-bold hover:bg-amber-700 transition-all shadow-lg"
                    >
                        Tampilkan Semua Menu
                    </button>
                </div>
            )}
        </div>
      </div>
      
      <ProductDetailModal 
        isOpen={!!selectedItem} 
        item={selectedItem} 
        onClose={handleCloseDetail} 
      />
    </section>
  );
};

export default Menu;
