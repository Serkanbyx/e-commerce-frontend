import { Link } from 'react-router-dom';
import { ShoppingBag, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppSelector } from '@/store/hooks';
import { selectCartTotal, selectCartItemCount } from '@/store/slices/cartSlice';
import { formatPrice, calculateOrderSummary } from '@/lib/utils';

/**
 * Cart summary component showing totals and checkout button
 */
export function CartSummary() {
  const subtotal = useAppSelector(selectCartTotal);
  const itemCount = useAppSelector(selectCartItemCount);
  const { shipping, tax, total } = calculateOrderSummary(subtotal);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <ShoppingBag className="h-5 w-5" />
          <span>Order Summary</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Item count */}
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Items ({itemCount})</span>
          <span>{formatPrice(subtotal)}</span>
        </div>

        {/* Shipping */}
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Shipping</span>
          <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
        </div>

        {/* Free shipping notice */}
        {subtotal > 0 && subtotal < 100 && (
          <div className="flex items-center space-x-2 rounded-md bg-muted p-3 text-sm">
            <Truck className="h-4 w-4 text-muted-foreground" />
            <span>
              Add {formatPrice(100 - subtotal)} more for free shipping!
            </span>
          </div>
        )}

        {/* Tax */}
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Estimated Tax (8%)</span>
          <span>{formatPrice(tax)}</span>
        </div>

        {/* Divider */}
        <div className="border-t pt-4">
          <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Link to="/checkout" className="w-full">
          <Button className="w-full" size="lg" disabled={itemCount === 0}>
            Proceed to Checkout
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
