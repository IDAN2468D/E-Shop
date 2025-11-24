export interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  description: string;
  category: string;
  rating: number;
  reviews: number;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface CartState {
  cartItems: CartItem[];
  totalPrice: number;
}

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}
