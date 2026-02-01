import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { Product, ProductFilters, SortOption } from '@/types';

interface ProductState {
  items: Product[];
  filteredItems: Product[];
  categories: string[];
  selectedProduct: Product | null;
  filters: ProductFilters;
  sortBy: SortOption;
  currentPage: number;
  itemsPerPage: number;
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  items: [],
  filteredItems: [],
  categories: [],
  selectedProduct: null,
  filters: {
    category: 'all',
    minPrice: 0,
    maxPrice: 1000,
    search: '',
  },
  sortBy: 'default',
  currentPage: 1,
  itemsPerPage: 8,
  loading: false,
  error: null,
};

/**
 * Fetch all products from FakeStore API
 */
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data: Product[] = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to fetch products'
      );
    }
  }
);

/**
 * Fetch single product by ID
 */
export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }
      const data: Product = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to fetch product'
      );
    }
  }
);

/**
 * Fetch all categories
 */
export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        'https://fakestoreapi.com/products/categories'
      );
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data: string[] = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to fetch categories'
      );
    }
  }
);

/**
 * Apply filters and sorting to products
 */
const applyFiltersAndSort = (
  items: Product[],
  filters: ProductFilters,
  sortBy: SortOption
): Product[] => {
  let filtered = [...items];

  // Apply category filter
  if (filters.category && filters.category !== 'all') {
    filtered = filtered.filter((item) => item.category === filters.category);
  }

  // Apply price range filter
  filtered = filtered.filter(
    (item) => item.price >= filters.minPrice && item.price <= filters.maxPrice
  );

  // Apply search filter
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(
      (item) =>
        item.title.toLowerCase().includes(searchLower) ||
        item.description.toLowerCase().includes(searchLower)
    );
  }

  // Apply sorting
  switch (sortBy) {
    case 'price-asc':
      filtered.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      filtered.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      filtered.sort((a, b) => b.rating.rate - a.rating.rate);
      break;
    case 'name':
      filtered.sort((a, b) => a.title.localeCompare(b.title));
      break;
    default:
      // Keep original order
      break;
  }

  return filtered;
};

/**
 * Product slice for managing product state
 */
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    /**
     * Set filter values
     */
    setFilters: (state, action: PayloadAction<Partial<ProductFilters>>) => {
      state.filters = { ...state.filters, ...action.payload };
      state.filteredItems = applyFiltersAndSort(
        state.items,
        state.filters,
        state.sortBy
      );
      state.currentPage = 1; // Reset to first page when filters change
    },

    /**
     * Set sort option
     */
    setSortBy: (state, action: PayloadAction<SortOption>) => {
      state.sortBy = action.payload;
      state.filteredItems = applyFiltersAndSort(
        state.items,
        state.filters,
        state.sortBy
      );
    },

    /**
     * Set current page for pagination
     */
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },

    /**
     * Set items per page
     */
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload;
      state.currentPage = 1; // Reset to first page
    },

    /**
     * Clear selected product
     */
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },

    /**
     * Reset all filters to default
     */
    resetFilters: (state) => {
      state.filters = initialState.filters;
      state.sortBy = initialState.sortBy;
      state.filteredItems = applyFiltersAndSort(
        state.items,
        state.filters,
        state.sortBy
      );
      state.currentPage = 1;
    },
  },
  extraReducers: (builder) => {
    // Fetch products
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.filteredItems = applyFiltersAndSort(
          action.payload,
          state.filters,
          state.sortBy
        );
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch product by ID
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch categories
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setFilters,
  setSortBy,
  setCurrentPage,
  setItemsPerPage,
  clearSelectedProduct,
  resetFilters,
} = productSlice.actions;

// Selectors
export const selectProducts = (state: { products: ProductState }) =>
  state.products.filteredItems;
export const selectAllProducts = (state: { products: ProductState }) =>
  state.products.items;
export const selectCategories = (state: { products: ProductState }) =>
  state.products.categories;
export const selectSelectedProduct = (state: { products: ProductState }) =>
  state.products.selectedProduct;
export const selectFilters = (state: { products: ProductState }) =>
  state.products.filters;
export const selectSortBy = (state: { products: ProductState }) =>
  state.products.sortBy;
export const selectCurrentPage = (state: { products: ProductState }) =>
  state.products.currentPage;
export const selectItemsPerPage = (state: { products: ProductState }) =>
  state.products.itemsPerPage;
export const selectLoading = (state: { products: ProductState }) =>
  state.products.loading;
export const selectError = (state: { products: ProductState }) =>
  state.products.error;

// Paginated products selector
export const selectPaginatedProducts = (state: { products: ProductState }) => {
  const { filteredItems, currentPage, itemsPerPage } = state.products;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return filteredItems.slice(startIndex, endIndex);
};

export const selectTotalPages = (state: { products: ProductState }) => {
  const { filteredItems, itemsPerPage } = state.products;
  return Math.ceil(filteredItems.length / itemsPerPage);
};

export default productSlice.reducer;
