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
 * Checkout form data
 */
export interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;
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

/**
 * Pagination state
 */
export interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
}

/**
 * API response for products
 */
export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

/**
 * Order summary
 */
export interface OrderSummary {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}
