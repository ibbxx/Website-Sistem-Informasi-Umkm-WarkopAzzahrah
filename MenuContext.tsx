
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CoffeeItem, CartItem } from './types';
import { MENU_ITEMS } from './constants';

interface MenuContextType {
  menuItems: CoffeeItem[];
  updateStock: (purchasedItems: CartItem[]) => void;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [menuItems, setMenuItems] = useState<CoffeeItem[]>(MENU_ITEMS);

  const updateStock = (purchasedItems: CartItem[]) => {
    setMenuItems(prevMenuItems => {
      const updatedMenuItems = [...prevMenuItems];
      purchasedItems.forEach(purchasedItem => {
        const itemIndex = updatedMenuItems.findIndex(menuItem => menuItem.id === purchasedItem.id);
        if (itemIndex !== -1) {
          updatedMenuItems[itemIndex] = {
            ...updatedMenuItems[itemIndex],
            stock: Math.max(0, updatedMenuItems[itemIndex].stock - purchasedItem.quantity),
          };
        }
      });
      return updatedMenuItems;
    });
  };

  return (
    <MenuContext.Provider value={{ menuItems, updateStock }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};
