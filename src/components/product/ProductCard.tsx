import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAppDispatch } from '@/store/hooks';
import { addToCart } from '@/store/slices/cartSlice';
import { formatPrice, truncateText } from '@/lib/utils';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

/**
 * Product card component for displaying product in grid
 */
export function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart(product));
  };

  return (
    <Link to={`/product/${product.id}`}>
      <Card className="group h-full overflow-hidden transition-all duration-300 hover:shadow-lg">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden bg-white p-4">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          {/* Category Badge */}
          <Badge
            variant="secondary"
            className="absolute left-2 top-2 capitalize"
          >
            {product.category}
          </Badge>
        </div>

        <CardContent className="p-4">
          {/* Title */}
          <h3 className="mb-2 line-clamp-2 min-h-[2.5rem] text-sm font-medium leading-tight">
            {truncateText(product.title, 50)}
          </h3>

          {/* Rating */}
          <div className="mb-2 flex items-center space-x-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3.5 w-3.5 ${
                    i < Math.round(product.rating.rate)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'fill-muted text-muted'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              ({product.rating.count})
            </span>
          </div>

          {/* Price */}
          <p className="text-lg font-bold text-primary">
            {formatPrice(product.price)}
          </p>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <Button
            onClick={handleAddToCart}
            className="w-full"
            size="sm"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
