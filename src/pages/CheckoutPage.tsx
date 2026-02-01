import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CheckoutForm } from '@/components/checkout/CheckoutForm';
import { CartSummary } from '@/components/cart/CartSummary';
import { useAppSelector } from '@/store/hooks';
import { selectCartItems } from '@/store/slices/cartSlice';

/**
 * Checkout page with form and order summary
 */
export function CheckoutPage() {
  const cartItems = useAppSelector(selectCartItems);

  // Redirect to cart if empty
  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="mb-2 text-2xl font-bold">Your Cart is Empty</h1>
          <p className="mb-6 text-muted-foreground">
            Add some items to your cart before checking out.
          </p>
          <Link to="/">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link to="/cart">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Cart
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Checkout</h1>
        <p className="text-muted-foreground">
          Complete your order by providing your details below.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <CheckoutForm />
        </div>

        {/* Order Summary */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <CartSummary />

          {/* Cart Items Preview */}
          <div className="mt-4 rounded-lg border bg-card p-4">
            <h3 className="mb-3 font-semibold">Order Items</h3>
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div key={item.product.id} className="flex items-center space-x-3">
                  <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded border bg-white">
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      className="h-full w-full object-contain p-1"
                    />
                  </div>
                  <div className="flex-1 truncate">
                    <p className="truncate text-sm">{item.product.title}</p>
                    <p className="text-xs text-muted-foreground">
                      Qty: {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
