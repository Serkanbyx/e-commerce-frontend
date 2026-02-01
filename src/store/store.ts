import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import productReducer from './slices/productSlice';

/**
 * Redux store configuration
 * Combines cart and product slices for state management
 */
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productReducer,
  },
});

// Infer types from store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
