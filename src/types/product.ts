export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  specifications: string; // e.g. "ANC, 40h Battery, Bluetooth 5.3" or newline-separated
  rating: number; // 1 to 5
  price: number;
  quantity: number;
  imageUrl: string;
  subtotal: number; // computed as price * quantity
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ProductFormData {
  name: string;
  category: string;
  description: string;
  specifications: string;
  rating: string; // string in form for input handling, converted to number
  price: string;
  quantity: string;
  imageUrl: string;
}

export interface FormErrors {
  name?: string;
  category?: string;
  description?: string;
  specifications?: string;
  rating?: string;
  price?: string;
  quantity?: string;
  imageUrl?: string;
}

export type ViewLayout = 'card' | 'table';
export type ActiveTab = 'catalog' | 'add' | 'cart';

