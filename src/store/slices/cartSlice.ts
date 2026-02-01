import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { CartItem, Product } from '@/types';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

// Load cart from localStorage
const loadCartFromStorage = (): CartItem[] => {
  try {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  } catch {
    return [];
  }
};

// Save cart to localStorage
const saveCartToStorage = (items: CartItem[]) => {
  try {
    localStorage.setItem('cart', JSON.stringify(items));
  } catch {
    console.error('Failed to save cart to localStorage');
  }
};

const initialState: CartState = {
  items: loadCartFromStorage(),
  isOpen: false,
};

/**
 * Cart slice for managing shopping cart state
 * Includes add, remove, update quantity, and clear operations
 */
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    /**
     * Add product to cart or increment quantity if exists
     */
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(
        (item) => item.product.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ product: action.payload, quantity: 1 });
      }

      saveCartToStorage(state.items);
    },

    /**
     * Remove product from cart completely
     */
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        (item) => item.product.id !== action.payload
      );
      saveCartToStorage(state.items);
    },

    /**
     * Update quantity of specific product
     */
    updateQuantity: (
      state,
      action: PayloadAction<{ productId: number; quantity: number }>
    ) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find((item) => item.product.id === productId);

      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter(
            (item) => item.product.id !== productId
          );
        } else {
          item.quantity = quantity;
        }
      }

      saveCartToStorage(state.items);
    },

    /**
     * Increment product quantity by 1
     */
    incrementQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find(
        (item) => item.product.id === action.payload
      );
      if (item) {
        item.quantity += 1;
        saveCartToStorage(state.items);
      }
    },

    /**
     * Decrement product quantity by 1 (removes if quantity becomes 0)
     */
    decrementQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find(
        (item) => item.product.id === action.payload
      );
      if (item) {
        if (item.quantity <= 1) {
          state.items = state.items.filter(
            (item) => item.product.id !== action.payload
          );
        } else {
          item.quantity -= 1;
        }
        saveCartToStorage(state.items);
      }
    },

    /**
     * Clear all items from cart
     */
    clearCart: (state) => {
      state.items = [];
      saveCartToStorage(state.items);
    },

    /**
     * Toggle cart sidebar visibility
     */
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },

    /**
     * Set cart sidebar open state
     */
    setCartOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  incrementQuantity,
  decrementQuantity,
  clearCart,
  toggleCart,
  setCartOpen,
} = cartSlice.actions;

// Selectors
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectCartTotal = (state: { cart: CartState }) =>
  state.cart.items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
export const selectCartItemCount = (state: { cart: CartState }) =>
  state.cart.items.reduce((count, item) => count + item.quantity, 0);
export const selectIsCartOpen = (state: { cart: CartState }) =>
  state.cart.isOpen;

export default cartSlice.reducer;
