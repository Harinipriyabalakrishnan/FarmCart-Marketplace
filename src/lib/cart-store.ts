import { create } from 'zustand';
import type { Product } from './mock-data';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  addToCart: (product, quantity = 1) => {
    set((state) => {
      const existing = state.items.find((i) => i.product.id === product.id);
      if (existing) {
        return { items: state.items.map((i) => i.product.id === product.id ? { ...i, quantity: i.quantity + quantity } : i) };
      }
      return { items: [...state.items, { product, quantity }] };
    });
  },
  removeFromCart: (productId) => set((state) => ({ items: state.items.filter((i) => i.product.id !== productId) })),
  updateQuantity: (productId, quantity) => set((state) => ({
    items: quantity <= 0 ? state.items.filter((i) => i.product.id !== productId) : state.items.map((i) => i.product.id === productId ? { ...i, quantity } : i),
  })),
  clearCart: () => set({ items: [] }),
  totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
  totalPrice: () => get().items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
}));
