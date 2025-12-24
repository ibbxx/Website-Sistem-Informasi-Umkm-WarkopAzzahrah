
import React from 'react';
import { CoffeeItem } from '../types';
import { useCart } from '../CartContext';

interface ProductDetailModalProps {
  item: CoffeeItem | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ item, isOpen, onClose }) => {
  const { addToCart } = useCart();
  const [added, setAdded] = React.useState(false);

  if (!isOpen || !item) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleAddToCart = () => {
    addToCart(item, 1);
    setAdded(true);
    setTimeout(() => {
        setAdded(false);
        onClose();
    }, 1000);
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 z-[110] flex justify-center items-center p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row animate-fade-in"
        onClick={e => e.stopPropagation()}
      >
        {/* Image Section */}
        <div className="w-full md:w-1/2 h-64 md:h-auto relative">
            <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
            <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${item.type === 'food' ? 'bg-orange-100 text-orange-800' : 'bg-stone-100 text-stone-800'}`}>
                    {item.type === 'food' ? 'Makanan' : 'Minuman'}
                </span>
            </div>
        </div>

        {/* Content Section */}
        <div className="w-full md:w-1/2 p-8 flex flex-col overflow-y-auto">
            <div className="flex justify-between items-start mb-2">
                <h2 className="text-3xl font-bold text-stone-800 font-serif">{item.name}</h2>
                <button onClick={onClose} className="text-stone-400 hover:text-stone-800 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <p className="text-2xl font-bold text-amber-600 mb-6">{formatCurrency(item.price)}</p>

            <div className="prose prose-stone mb-8 flex-grow">
                <h4 className="text-lg font-semibold text-stone-900 mb-2">Deskripsi</h4>
                <p className="text-stone-600 mb-4 leading-relaxed">{item.description}</p>
                
                <h4 className="text-lg font-semibold text-stone-900 mb-2">Detail & Rasa</h4>
                <p className="text-stone-600 leading-relaxed text-sm">{item.details}</p>
            </div>

            <div className="mt-auto border-t border-stone-100 pt-6">
                <button
                    onClick={handleAddToCart}
                    disabled={added}
                    className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 transform active:scale-95 ${
                        added
                            ? 'bg-green-600 text-white'
                            : 'bg-stone-900 text-white hover:bg-amber-600 shadow-lg hover:shadow-xl'
                    }`}
                >
                    {added ? 'Berhasil Ditambahkan' : '+ Tambah ke Keranjang'}
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
