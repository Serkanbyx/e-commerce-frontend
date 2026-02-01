import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppDispatch } from '@/store/hooks';
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from '@/store/slices/cartSlice';
import { formatPrice, truncateText } from '@/lib/utils';
import type { CartItem as CartItemType } from '@/types';

interface CartItemProps {
  item: CartItemType;
}

/**
 * Individual cart item component with quantity controls
 */
export function CartItem({ item }: CartItemProps) {
  const dispatch = useAppDispatch();
  const { product, quantity } = item;

  const handleRemove = () => {
    dispatch(removeFromCart(product.id));
  };

  const handleIncrement = () => {
    dispatch(incrementQuantity(product.id));
  };

  const handleDecrement = () => {
    dispatch(decrementQuantity(product.id));
  };

  const itemTotal = product.price * quantity;

  return (
    <div className="flex gap-4 border-b py-4 last:border-b-0">
      {/* Product Image */}
      <Link
        to={`/product/${product.id}`}
        className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border bg-white"
      >
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-contain p-2"
        />
      </Link>

      {/* Product Details */}
      <div className="flex flex-1 flex-col">
        <div className="flex justify-between">
          <div className="flex-1">
            <Link
              to={`/product/${product.id}`}
              className="text-sm font-medium hover:text-primary"
            >
              {truncateText(product.title, 50)}
            </Link>
            <p className="mt-1 text-sm text-muted-foreground capitalize">
              {product.category}
            </p>
          </div>

          {/* Remove Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleRemove}
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
            aria-label="Remove item"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-auto flex items-center justify-between pt-2">
          {/* Quantity Controls */}
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={handleDecrement}
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-8 text-center text-sm font-medium">
              {quantity}
            </span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={handleIncrement}
              aria-label="Increase quantity"
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          {/* Price */}
          <div className="text-right">
            <p className="text-sm font-medium">{formatPrice(itemTotal)}</p>
            {quantity > 1 && (
              <p className="text-xs text-muted-foreground">
                {formatPrice(product.price)} each
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
