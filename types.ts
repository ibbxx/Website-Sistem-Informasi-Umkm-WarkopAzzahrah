
export interface CoffeeItem {
  id: number;
  name: string;
  description: string;
  details: string;
  price: number;
  imageUrl: string;
  category: 'best-seller' | 'new' | 'standard';
  type: 'beverage' | 'food';
  stock: number;
}

export interface Promotion {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
}

export interface CartItem extends CoffeeItem {
  quantity: number;
}

export interface OrderHistoryItem {
  id: string;
  customerName: string;
  items: CartItem[];
  totalPrice: number;
  date: string;
  orderType: 'pickup' | 'pickup-later';
  paymentMethod: 'cash' | 'qris';
}
