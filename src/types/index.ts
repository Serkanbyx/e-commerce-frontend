/**
 * Product type from API
 */
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

/**
 * Cart item with quantity
 */
export interface CartItem {
  product: Product;
  quantity: number;
}

/**
 * Sort options for product list
 */
export type SortOption = 'default' | 'price-asc' | 'price-desc' | 'rating' | 'name';

/**
 * Filter state for products
 */
export interface ProductFilters {
  category: string;
  minPrice: number;
  maxPrice: number;
  search: string;
}
