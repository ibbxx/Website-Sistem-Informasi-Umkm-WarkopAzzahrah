
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CoffeeItem, CartItem } from './types';
import { useMenu } from './MenuContext';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CoffeeItem, quantity: number) => void;
  updateQuantity: (itemId: number, quantity: number) => void;
  removeFromCart: (itemId: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { menuItems } = useMenu();

  const addToCart = (item: CoffeeItem, quantity: number) => {
    const menuItemInStock = menuItems.find(menuItem => menuItem.id === item.id);
    const availableStock = menuItemInStock ? menuItemInStock.stock : 0;

    if (availableStock <= 0) return;

    setCartItems(prevItems => {
      const existingItem = prevItems.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        const newQuantity = Math.min(availableStock, existingItem.quantity + quantity);
        return prevItems.map(cartItem =>
          cartItem.id === item.id ? { ...cartItem, quantity: newQuantity } : cartItem
        );
      } else {
        const newQuantity = Math.min(availableStock, quantity);
        const updatedItemForCart = { ...item, stock: availableStock };
        return [...prevItems, { ...updatedItemForCart, quantity: newQuantity }];
      }
    });
  };

  const updateQuantity = (itemId: number, quantity: number) => {
    const menuItemInStock = menuItems.find(menuItem => menuItem.id === itemId);
    const availableStock = menuItemInStock ? menuItemInStock.stock : 0;

    setCartItems(prevItems =>
      prevItems.map(item => {
        if (item.id === itemId) {
            const newQuantity = Math.max(0, Math.min(availableStock, quantity));
            return { ...item, quantity: newQuantity, stock: availableStock };
        }
        return item;
      }).filter(item => item.quantity > 0)
    );
  };

  const removeFromCart = (itemId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, updateQuantity, removeFromCart, clearCart, getTotalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
