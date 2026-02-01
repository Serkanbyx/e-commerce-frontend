import { useEffect } from 'react';
import { ProductGrid } from '@/components/product/ProductGrid';
import { ProductFilters } from '@/components/product/ProductFilters';
import { Pagination } from '@/components/product/Pagination';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  fetchProducts,
  selectPaginatedProducts,
  selectLoading,
  selectError,
  selectProducts,
} from '@/store/slices/productSlice';

/**
 * Home page with product listing, filters, and pagination
 */
export function HomePage() {
  const dispatch = useAppDispatch();
  const paginatedProducts = useAppSelector(selectPaginatedProducts);
  const allFilteredProducts = useAppSelector(selectProducts);
  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Welcome to <span className="text-primary">ShopHub</span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Discover amazing products at unbeatable prices. From electronics to
          fashion, we have everything you need.
        </p>
      </section>

      {/* Filters */}
      <ProductFilters />

      {/* Error State */}
      {error && (
        <div className="mb-6 rounded-lg border border-destructive bg-destructive/10 p-4 text-center">
          <p className="text-destructive">{error}</p>
          <button
            onClick={() => dispatch(fetchProducts())}
            className="mt-2 text-sm underline hover:no-underline"
          >
            Try again
          </button>
        </div>
      )}

      {/* Results Count */}
      {!loading && allFilteredProducts.length > 0 && (
        <p className="mb-4 text-sm text-muted-foreground">
          Showing {paginatedProducts.length} of {allFilteredProducts.length}{' '}
          products
        </p>
      )}

      {/* Product Grid */}
      <ProductGrid products={paginatedProducts} loading={loading} />

      {/* Pagination */}
      <Pagination />
    </div>
  );
}
