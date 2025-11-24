
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ToastMessage, Product } from '../types';

interface UiState {
  toasts: ToastMessage[];
  isSidebarOpen: boolean;
  quickViewProduct: Product | null;
  searchQuery: string;
}

const initialState: UiState = {
  toasts: [],
  isSidebarOpen: false,
  quickViewProduct: null,
  searchQuery: '',
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    addToast: (state, action: PayloadAction<Omit<ToastMessage, 'id'>>) => {
      const id = Date.now().toString();
      state.toasts.push({ ...action.payload, id });
    },
    removeToast: (state, action: PayloadAction<string>) => {
      state.toasts = state.toasts.filter((t) => t.id !== action.payload);
    },
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.isSidebarOpen = action.payload;
    },
    setQuickViewProduct: (state, action: PayloadAction<Product | null>) => {
      state.quickViewProduct = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { addToast, removeToast, toggleSidebar, setSidebarOpen, setQuickViewProduct, setSearchQuery } = uiSlice.actions;
export default uiSlice.reducer;
