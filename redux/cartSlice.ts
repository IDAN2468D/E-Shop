import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, CartItem, CartState } from '../types';

const initialState: CartState = {
  cartItems: [],
  totalPrice: 0,
};

const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<Product>) => {
      const productToAdd = action.payload;
      const existingItem = state.cartItems.find(item => item.id === productToAdd.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ ...productToAdd, quantity: 1 });
      }
      state.totalPrice = calculateTotal(state.cartItems);
    },
    removeItemFromCart: (state, action: PayloadAction<number>) => {
      const idToRemove = action.payload;
      const existingItem = state.cartItems.find(item => item.id === idToRemove);
      
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.cartItems = state.cartItems.filter(item => item.id !== idToRemove);
        }
      }
      state.totalPrice = calculateTotal(state.cartItems);
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItemToCart, removeItemFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;