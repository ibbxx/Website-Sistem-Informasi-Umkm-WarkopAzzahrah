
import React, { useState, useEffect } from 'react';
import { OrderHistoryItem } from '../types';

interface OrderHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const OrderHistoryModal: React.FC<OrderHistoryModalProps> = ({ isOpen, onClose }) => {
  const [history, setHistory] = useState<OrderHistoryItem[]>([]);

  useEffect(() => {
    if (isOpen) {
      try {
        const storedHistory = localStorage.getItem('warkopAzzahraOrderHistory');
        if (storedHistory) {
          setHistory(JSON.parse(storedHistory));
        }
      } catch (error) {
        console.error("Failed to load order history:", error);
        setHistory([]);
      }
    }
  }, [isOpen]);

  const handleClearHistory = () => {
    if (window.confirm('Apakah Anda yakin ingin menghapus semua riwayat pesanan?')) {
      localStorage.removeItem('warkopAzzahraOrderHistory');
      setHistory([]);
    }
  };
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('id-ID', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex justify-center items-center p-4" 
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col animate-blur-in overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-8 border-b border-stone-100">
          <div>
            <h2 className="text-3xl font-bold text-stone-900 font-serif">Riwayat Pesanan</h2>
            <p className="text-stone-400 text-sm mt-1">Daftar pesanan Anda sebelumnya di perangkat ini.</p>
          </div>
          <button onClick={onClose} className="p-2 bg-stone-100 text-stone-500 hover:text-stone-800 rounded-full transition-all" aria-label="Tutup">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="flex-grow overflow-y-auto p-8 space-y-8 bg-stone-50/30">
          {history.length === 0 ? (
             <div className="text-center py-20">
                <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
                     <svg className="w-10 h-10 text-stone-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <p className="text-stone-400 font-serif italic text-lg">Belum ada riwayat pesanan.</p>
            </div>
          ) : (
            history.map(order => (
              <div key={order.id} className="bg-white p-8 rounded-[2rem] border border-stone-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                        <p className="font-black text-xl text-stone-900">{order.customerName}</p>
                        <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${order.orderType === 'pickup-later' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                            {order.orderType === 'pickup-later' ? 'Ambil Nanti' : 'Ambil Langsung'}
                        </span>
                        <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${order.paymentMethod === 'qris' ? 'bg-indigo-100 text-indigo-800' : 'bg-amber-100 text-amber-800'}`}>
                            {order.paymentMethod === 'qris' ? 'QRIS' : 'Tunai'}
                        </span>
                    </div>
                    <p className="text-xs text-stone-400 font-bold uppercase tracking-widest">{formatDate(order.date)}</p>
                  </div>
                  <p className="font-black text-2xl text-stone-950">{formatCurrency(order.totalPrice)}</p>
                </div>
                
                <div className="space-y-3 pt-6 border-t border-dashed border-stone-200">
                  {order.items.map(item => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-lg bg-stone-100 flex items-center justify-center text-[10px] font-black text-stone-500">{item.quantity}x</span>
                        <span className="text-stone-700 font-medium">{item.name}</span>
                      </div>
                      <span className="text-stone-400 text-sm">{formatCurrency(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
        
        {history.length > 0 && (
          <div className="p-8 border-t border-stone-100 bg-white text-right">
            <button
                onClick={handleClearHistory}
                className="text-red-400 hover:text-red-600 font-black text-xs uppercase tracking-[0.2em] px-6 py-3 hover:bg-red-50 rounded-2xl transition-all"
            >
                Bersihkan Semua Riwayat
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistoryModal;
