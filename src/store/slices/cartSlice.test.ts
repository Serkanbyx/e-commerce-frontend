import { describe, it, expect, beforeEach } from 'vitest';
import cartReducer, {
  addToCart,
  removeFromCart,
  updateQuantity,
  incrementQuantity,
  decrementQuantity,
  clearCart,
  selectCartTotal,
  selectCartItemCount,
} from './cartSlice';
import type { Product } from '@/types';

const product: Product = {
  id: 1,
  title: 'Test Product',
  price: 10,
  description: 'A product used in tests',
  category: 'electronics',
  image: 'https://example.com/image.png',
  rating: { rate: 4.5, count: 100 },
};

const initialState = { items: [], isOpen: false };

beforeEach(() => {
  localStorage.clear();
});

describe('cartSlice reducer', () => {
  it('adds a new product with quantity 1', () => {
    const state = cartReducer(initialState, addToCart(product));
    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(1);
  });

  it('increments quantity when adding an existing product', () => {
    let state = cartReducer(initialState, addToCart(product));
    state = cartReducer(state, addToCart(product));
    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(2);
  });

  it('removes a product entirely', () => {
    const populated = cartReducer(initialState, addToCart(product));
    const state = cartReducer(populated, removeFromCart(product.id));
    expect(state.items).toHaveLength(0);
  });

  it('updates quantity to a specific value', () => {
    const populated = cartReducer(initialState, addToCart(product));
    const state = cartReducer(
      populated,
      updateQuantity({ productId: product.id, quantity: 5 })
    );
    expect(state.items[0].quantity).toBe(5);
  });

  it('removes the item when updated quantity is zero or less', () => {
    const populated = cartReducer(initialState, addToCart(product));
    const state = cartReducer(
      populated,
      updateQuantity({ productId: product.id, quantity: 0 })
    );
    expect(state.items).toHaveLength(0);
  });

  it('removes the item when decrementing from quantity 1', () => {
    const populated = cartReducer(initialState, addToCart(product));
    const state = cartReducer(populated, decrementQuantity(product.id));
    expect(state.items).toHaveLength(0);
  });

  it('increments quantity by one', () => {
    const populated = cartReducer(initialState, addToCart(product));
    const state = cartReducer(populated, incrementQuantity(product.id));
    expect(state.items[0].quantity).toBe(2);
  });

  it('clears the cart', () => {
    const populated = cartReducer(initialState, addToCart(product));
    const state = cartReducer(populated, clearCart());
    expect(state.items).toHaveLength(0);
  });
});

describe('cart selectors', () => {
  it('computes the total price', () => {
    let state = cartReducer(initialState, addToCart(product));
    state = cartReducer(state, incrementQuantity(product.id));
    expect(selectCartTotal({ cart: state })).toBe(20);
  });

  it('computes the total item count', () => {
    let state = cartReducer(initialState, addToCart(product));
    state = cartReducer(state, incrementQuantity(product.id));
    expect(selectCartItemCount({ cart: state })).toBe(2);
  });
});
