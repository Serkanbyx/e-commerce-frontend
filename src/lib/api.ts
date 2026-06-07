import type { Product } from '@/types';

/**
 * Base URL for the product API.
 * Can be overridden with the VITE_API_BASE_URL environment variable.
 */
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? 'https://fakestoreapi.com';

/**
 * Typed wrapper around fetch that throws on non-2xx responses
 * and parses the JSON body.
 */
async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, init);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return (await response.json()) as T;
}

/**
 * Product API client. Centralizes all product-related endpoints
 * so components and slices stay decoupled from the transport layer.
 */
export const productApi = {
  getAll: () => request<Product[]>('/products'),
  getById: (id: number) => request<Product>(`/products/${id}`),
  getCategories: () => request<string[]>('/products/categories'),
};
