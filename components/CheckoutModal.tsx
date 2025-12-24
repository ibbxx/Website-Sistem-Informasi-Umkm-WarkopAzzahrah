
import React, { useState, useEffect } from 'react';
import { useCart } from '../CartContext';
import { useMenu } from '../MenuContext';
import { OrderHistoryItem } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();
  const { updateStock } = useMenu();
  const [customerName, setCustomerName] = useState('');
  const [orderType, setOrderType] = useState<'pickup' | 'pickup-later'>('pickup');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'qris'>('cash');
  const [error, setError] = useState('');

  const finalTotalPrice = getTotalPrice();
  // Nomor WhatsApp tujuan (Format internasional tanpa +)
  const phoneNumber = "6287777347983"; 

  useEffect(() => {
    if (!isOpen) {
        setCustomerName('');
        setError('');
        setOrderType('pickup');
        setPaymentMethod('cash');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const saveOrderToHistory = () => {
    const newOrder: OrderHistoryItem = {
      id: Date.now().toString(),
      customerName: customerName.trim(),
      items: cartItems,
      totalPrice: finalTotalPrice,
      date: new Date().toISOString(),
      orderType: orderType,
      paymentMethod: paymentMethod,
    };

    try {
      const existingHistoryString = localStorage.getItem('warkopAzzahraOrderHistory');
      const existingHistory: OrderHistoryItem[] = existingHistoryString ? JSON.parse(existingHistoryString) : [];
      const updatedHistory = [newOrder, ...existingHistory];
      localStorage.setItem('warkopAzzahraOrderHistory', JSON.stringify(updatedHistory));
    } catch (error) {
      console.error("Failed to save order history:", error);
    }
  };

  const handleCheckoutWhatsApp = () => {
    if (!customerName.trim()) {
      setError('Nama tidak boleh kosong.');
      return;
    }
    setError('');
    
    // 1. Update Stok Lokal
    updateStock(cartItems);
    
    // 2. Simpan ke Riwayat
    saveOrderToHistory();

    // 3. Format Pesan WhatsApp
    const orderTypeLabel = orderType === 'pickup' ? 'Ambil di Tempat' : 'Ambil Nanti';
    const paymentLabel = paymentMethod === 'qris' ? 'QRIS (Sudah Bayar)' : 'Tunai (Bayar di Kasir)';
    const itemsList = cartItems.map(item => 
        `- ${item.name} (${item.quantity}x) : ${formatCurrency(item.price * item.quantity)}`
    ).join('%0A');

    const message = `*Halo Warkop Azzahra, Saya mau pesan!* ☕%0A%0A` +
                    `👤 *Nama:* ${customerName}%0A` +
                    `📦 *Metode:* ${orderTypeLabel}%0A` +
                    `💳 *Pembayaran:* ${paymentLabel}%0A%0A` +
                    `*Rincian Pesanan:*%0A${itemsList}%0A%0A` +
                    `💰 *Total: ${formatCurrency(finalTotalPrice)}*%0A%0A` +
                    (paymentMethod === 'qris' ? `_Saya telah melampirkan bukti bayar QRIS setelah pesan ini._%0A%0A` : '') +
                    `Mohon diproses ya, Terima kasih!`;

    // 4. Redirect ke WhatsApp
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');

    // 5. Bersihkan Keranjang & Tutup Modal
    clearCart();
    onClose();
  };
  
  const handleRemoveItem = (itemId: number) => {
    if (window.confirm('Anda yakin ingin menghapus item ini dari keranjang?')) {
      removeFromCart(itemId);
    }
  };

  const isConfirmDisabled = !customerName.trim();

  function formatCurrency(amount: number) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  }

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex justify-center items-center p-4" 
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col animate-blur-in overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-8 border-b border-stone-100">
          <div>
            <h2 className="text-3xl font-bold text-stone-900 font-serif">Konfirmasi Pesanan</h2>
            <p className="text-stone-400 text-sm mt-1">Selesaikan pesanan Anda di bawah ini.</p>
          </div>
          <button onClick={onClose} className="p-2 bg-stone-100 text-stone-500 hover:text-stone-800 rounded-full transition-all" aria-label="Tutup">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="flex-grow overflow-y-auto p-8">
          {cartItems.length === 0 ? (
            <div className="text-center py-20">
                <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-4">
                     <svg className="w-10 h-10 text-stone-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                </div>
                <p className="text-stone-400 font-serif italic text-lg">Keranjang belanja Anda masih kosong.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center gap-6 p-4 bg-stone-50 rounded-3xl border border-stone-100">
                  <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-2xl flex-shrink-0 shadow-md" />
                  <div className="flex-grow">
                    <h3 className="font-bold text-stone-900 text-lg">{item.name}</h3>
                    <p className="text-stone-500 font-serif-text">{formatCurrency(item.price)}</p>
                  </div>
                  <div className="flex items-center bg-white border border-stone-200 rounded-full p-1 shadow-sm">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center text-stone-400 hover:text-stone-900 hover:bg-stone-50 rounded-full transition-all">-</button>
                    <span className="w-8 text-center text-sm font-bold text-stone-800">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center text-stone-400 hover:text-stone-900 hover:bg-stone-50 rounded-full transition-all">+</button>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-bold text-stone-900">{formatCurrency(item.price * item.quantity)}</p>
                    <button onClick={() => handleRemoveItem(item.id)} className="text-xs text-red-400 hover:text-red-600 font-bold uppercase tracking-widest mt-1">Hapus</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {cartItems.length > 0 && (
          <div className="p-8 border-t border-stone-100 bg-stone-50/50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Section Kiri: Nama & Tipe */}
                <div className="space-y-6">
                    <div>
                        <label className="block text-xs font-black text-stone-400 uppercase tracking-[0.2em] mb-3">Informasi Pelanggan</label>
                        <input 
                            type="text" 
                            value={customerName} 
                            onChange={(e) => setCustomerName(e.target.value)} 
                            placeholder="Tulis nama Anda di sini..." 
                            className="w-full px-6 py-4 bg-white border border-stone-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all text-stone-900" 
                            required 
                        />
                        {error && <p className="text-red-500 text-[10px] font-bold mt-2 ml-4 uppercase tracking-wider animate-pulse">⚠️ {error}</p>}
                    </div>

                    <div>
                        <label className="block text-xs font-black text-stone-400 uppercase tracking-[0.2em] mb-3">Metode Pengambilan</label>
                        <div className="flex gap-3">
                            <button 
                                onClick={() => setOrderType('pickup')}
                                className={`flex-1 py-3 px-4 rounded-2xl font-bold text-sm transition-all border ${orderType === 'pickup' ? 'bg-stone-950 text-white border-stone-950 shadow-lg' : 'bg-white text-stone-500 border-stone-200 hover:border-stone-400'}`}
                            >
                                Ambil Langsung
                            </button>
                            <button 
                                onClick={() => setOrderType('pickup-later')}
                                className={`flex-1 py-3 px-4 rounded-2xl font-bold text-sm transition-all border ${orderType === 'pickup-later' ? 'bg-stone-950 text-white border-stone-950 shadow-lg' : 'bg-white text-stone-500 border-stone-200 hover:border-stone-400'}`}
                            >
                                Ambil Nanti
                            </button>
                        </div>
                    </div>
                </div>

                {/* Section Kanan: Pembayaran */}
                <div className="space-y-6">
                    <div>
                        <label className="block text-xs font-black text-stone-400 uppercase tracking-[0.2em] mb-3">Metode Pembayaran</label>
                        <div className="flex gap-3 mb-4">
                            <button 
                                onClick={() => setPaymentMethod('cash')}
                                className={`flex-1 py-3 px-4 rounded-2xl font-bold text-sm transition-all border flex items-center justify-center gap-2 ${paymentMethod === 'cash' ? 'bg-amber-500 text-stone-950 border-amber-500 shadow-lg' : 'bg-white text-stone-500 border-stone-200 hover:border-stone-400'}`}
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                Tunai
                            </button>
                            <button 
                                onClick={() => setPaymentMethod('qris')}
                                className={`flex-1 py-3 px-4 rounded-2xl font-bold text-sm transition-all border flex items-center justify-center gap-2 ${paymentMethod === 'qris' ? 'bg-blue-600 text-white border-blue-600 shadow-lg' : 'bg-white text-stone-500 border-stone-200 hover:border-stone-400'}`}
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" /></svg>
                                QRIS
                            </button>
                        </div>

                        {paymentMethod === 'qris' && (
                            <div className="bg-white p-6 rounded-3xl border border-blue-100 shadow-inner flex flex-col items-center animate-blur-in">
                                <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-4">Scan QRIS Warkop Azzahra</p>
                                <div className="w-48 h-48 bg-stone-50 rounded-2xl flex items-center justify-center overflow-hidden border-4 border-stone-50 shadow-xl mb-4">
                                    {/* Placeholder QR Code - SIlakan ganti dengan URL Gambar QRIS Asli Anda */}
                                    <img 
                                        src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=Warkop-Azzahra-Sample-Payment" 
                                        alt="QRIS Warkop Azzahra" 
                                        className="w-full h-full"
                                    />
                                </div>
                                <p className="text-[10px] text-stone-400 text-center leading-relaxed">
                                    Silakan scan dan bayar <span className="font-bold text-stone-900">{formatCurrency(finalTotalPrice)}</span>. Lampirkan bukti transfer di WhatsApp.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-stone-100">
                <div className="text-center md:text-left">
                    <p className="text-stone-400 text-xs uppercase font-black tracking-widest">Total Pembayaran</p>
                    <p className="text-4xl font-black text-stone-900 font-serif">{formatCurrency(finalTotalPrice)}</p>
                </div>

                <button
                    onClick={handleCheckoutWhatsApp}
                    disabled={isConfirmDisabled}
                    className={`w-full md:w-auto px-12 py-5 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-4 shadow-2xl active:scale-95 ${
                        paymentMethod === 'qris' 
                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200' 
                        : 'bg-green-600 hover:bg-green-700 text-white shadow-green-200'
                    } disabled:bg-stone-200 disabled:text-stone-400 disabled:cursor-not-allowed disabled:shadow-none`}
                >
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    Kirim Pesanan ke WhatsApp
                </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutModal;
