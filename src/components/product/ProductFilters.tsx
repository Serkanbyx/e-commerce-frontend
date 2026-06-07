import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, X, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  setFilters,
  setSortBy,
  resetFilters,
  selectFilters,
  selectSortBy,
  selectCategories,
  fetchCategories,
} from '@/store/slices/productSlice';
import { cn, debounce } from '@/lib/utils';
import type { SortOption } from '@/types';

/**
 * Product filters component with category, price range, and sorting
 */
export function ProductFilters() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectFilters);
  const sortBy = useAppSelector(selectSortBy);
  const categories = useAppSelector(selectCategories);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [localMinPrice, setLocalMinPrice] = useState(filters.minPrice.toString());
  const [localMaxPrice, setLocalMaxPrice] = useState(filters.maxPrice.toString());

  // Fetch categories on mount
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Sync URL params with filters
  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      dispatch(setFilters({ category }));
    }
  }, [searchParams, dispatch]);

  // Debounced price filter update (memoized so the timer is stable across renders)
  const debouncedPriceUpdate = useMemo(
    () =>
      debounce((minPrice: number, maxPrice: number) => {
        dispatch(setFilters({ minPrice, maxPrice }));
      }, 500),
    [dispatch]
  );

  const handleMinPriceChange = (value: string) => {
    setLocalMinPrice(value);
    const numValue = parseFloat(value) || 0;
    debouncedPriceUpdate(numValue, parseFloat(localMaxPrice) || 1000);
  };

  const handleMaxPriceChange = (value: string) => {
    setLocalMaxPrice(value);
    const numValue = parseFloat(value) || 1000;
    debouncedPriceUpdate(parseFloat(localMinPrice) || 0, numValue);
  };

  const handleCategoryChange = (value: string) => {
    dispatch(setFilters({ category: value }));
    if (value === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', value);
    }
    setSearchParams(searchParams);
  };

  const handleSortChange = (value: string) => {
    dispatch(setSortBy(value as SortOption));
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
    setLocalMinPrice('0');
    setLocalMaxPrice('1000');
    setSearchParams({});
  };

  const hasActiveFilters =
    filters.category !== 'all' ||
    filters.minPrice > 0 ||
    filters.maxPrice < 1000 ||
    filters.search !== '' ||
    sortBy !== 'default';

  return (
    <div className="mb-6 space-y-4">
      {/* Mobile Filter Toggle */}
      <div className="flex items-center justify-between lg:hidden">
        <Button
          variant="outline"
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          className="flex items-center space-x-2"
        >
          <SlidersHorizontal className="h-4 w-4" />
          <span>Filters</span>
          {hasActiveFilters && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
              !
            </span>
          )}
        </Button>

        {/* Sort - Always Visible */}
        <Select value={sortBy} onValueChange={handleSortChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
            <SelectItem value="rating">Best Rating</SelectItem>
            <SelectItem value="name">Name: A to Z</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Filter Panel */}
      <div
        className={cn(
          'rounded-lg border bg-card p-4 transition-all duration-300',
          'lg:block',
          isFiltersOpen ? 'block' : 'hidden'
        )}
      >
        <div className="flex flex-wrap items-end gap-4">
          {/* Category Filter */}
          <div className="w-full space-y-2 sm:w-auto">
            <Label htmlFor="category" className="flex items-center space-x-1">
              <Filter className="h-3.5 w-3.5" />
              <span>Category</span>
            </Label>
            <Select value={filters.category} onValueChange={handleCategoryChange}>
              <SelectTrigger id="category" className="w-full sm:w-[180px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category} className="capitalize">
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Price Range */}
          <div className="flex w-full items-end space-x-2 sm:w-auto">
            <div className="space-y-2">
              <Label htmlFor="minPrice">Min Price</Label>
              <Input
                id="minPrice"
                type="number"
                min="0"
                value={localMinPrice}
                onChange={(e) => handleMinPriceChange(e.target.value)}
                className="w-24"
                placeholder="0"
              />
            </div>
            <span className="pb-2 text-muted-foreground">-</span>
            <div className="space-y-2">
              <Label htmlFor="maxPrice">Max Price</Label>
              <Input
                id="maxPrice"
                type="number"
                min="0"
                value={localMaxPrice}
                onChange={(e) => handleMaxPriceChange(e.target.value)}
                className="w-24"
                placeholder="1000"
              />
            </div>
          </div>

          {/* Sort - Desktop */}
          <div className="hidden w-full space-y-2 sm:w-auto lg:block">
            <Label htmlFor="sort">Sort By</Label>
            <Select value={sortBy} onValueChange={handleSortChange}>
              <SelectTrigger id="sort" className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="rating">Best Rating</SelectItem>
                <SelectItem value="name">Name: A to Z</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Reset Button */}
          {hasActiveFilters && (
            <Button
              variant="ghost"
              onClick={handleResetFilters}
              className="flex items-center space-x-1"
            >
              <X className="h-4 w-4" />
              <span>Reset</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
