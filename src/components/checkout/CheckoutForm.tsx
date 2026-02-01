import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreditCard, User, MapPin, Loader2, CheckCircle } from 'lucide-react';
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearCart, selectCartItemCount } from '@/store/slices/cartSlice';
import {
  checkoutSchema,
  type CheckoutFormData,
  formatCardNumber,
  formatExpiryDate,
} from '@/lib/validations';
import { cn } from '@/lib/utils';

const countries = [
  { value: 'US', label: 'United States' },
  { value: 'CA', label: 'Canada' },
  { value: 'GB', label: 'United Kingdom' },
  { value: 'DE', label: 'Germany' },
  { value: 'FR', label: 'France' },
  { value: 'TR', label: 'Turkey' },
];

/**
 * Checkout form component with validation
 */
export function CheckoutForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const itemCount = useAppSelector(selectCartItemCount);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      zipCode: '',
      country: '',
      cardNumber: '',
      cardExpiry: '',
      cardCvc: '',
    },
  });

  const watchCardNumber = watch('cardNumber');
  const watchCardExpiry = watch('cardExpiry');

  const onSubmit = async (data: CheckoutFormData) => {
    if (itemCount === 0) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log('Order submitted:', data);

    setIsSuccess(true);
    dispatch(clearCart());

    // Redirect to home after success
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setValue('cardNumber', formatted);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value);
    setValue('cardExpiry', formatted);
  };

  if (isSuccess) {
    return (
      <Card className="mx-auto max-w-md">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <div className="mb-4 rounded-full bg-green-100 p-3">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h2 className="mb-2 text-2xl font-bold">Order Confirmed!</h2>
          <p className="text-muted-foreground">
            Thank you for your purchase. You will receive a confirmation email
            shortly.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            Redirecting to home page...
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>Personal Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              {...register('firstName')}
              placeholder="John"
              className={cn(errors.firstName && 'border-destructive')}
            />
            {errors.firstName && (
              <p className="text-sm text-destructive">{errors.firstName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              {...register('lastName')}
              placeholder="Doe"
              className={cn(errors.lastName && 'border-destructive')}
            />
            {errors.lastName && (
              <p className="text-sm text-destructive">{errors.lastName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...register('email')}
              placeholder="john@example.com"
              className={cn(errors.email && 'border-destructive')}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="tel"
              {...register('phone')}
              placeholder="+1 (555) 123-4567"
              className={cn(errors.phone && 'border-destructive')}
            />
            {errors.phone && (
              <p className="text-sm text-destructive">{errors.phone.message}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Shipping Address */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="h-5 w-5" />
            <span>Shipping Address</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="address">Street Address</Label>
            <Input
              id="address"
              {...register('address')}
              placeholder="123 Main St"
              className={cn(errors.address && 'border-destructive')}
            />
            {errors.address && (
              <p className="text-sm text-destructive">{errors.address.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              {...register('city')}
              placeholder="New York"
              className={cn(errors.city && 'border-destructive')}
            />
            {errors.city && (
              <p className="text-sm text-destructive">{errors.city.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="zipCode">ZIP Code</Label>
            <Input
              id="zipCode"
              {...register('zipCode')}
              placeholder="10001"
              className={cn(errors.zipCode && 'border-destructive')}
            />
            {errors.zipCode && (
              <p className="text-sm text-destructive">{errors.zipCode.message}</p>
            )}
          </div>

          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="country">Country</Label>
            <Select
              onValueChange={(value) => setValue('country', value)}
              defaultValue=""
            >
              <SelectTrigger
                className={cn(errors.country && 'border-destructive')}
              >
                <SelectValue placeholder="Select a country" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country.value} value={country.value}>
                    {country.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.country && (
              <p className="text-sm text-destructive">{errors.country.message}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Payment Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CreditCard className="h-5 w-5" />
            <span>Payment Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input
              id="cardNumber"
              value={watchCardNumber}
              onChange={handleCardNumberChange}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              className={cn(errors.cardNumber && 'border-destructive')}
            />
            {errors.cardNumber && (
              <p className="text-sm text-destructive">{errors.cardNumber.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="cardExpiry">Expiry Date</Label>
            <Input
              id="cardExpiry"
              value={watchCardExpiry}
              onChange={handleExpiryChange}
              placeholder="MM/YY"
              maxLength={5}
              className={cn(errors.cardExpiry && 'border-destructive')}
            />
            {errors.cardExpiry && (
              <p className="text-sm text-destructive">{errors.cardExpiry.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="cardCvc">CVC</Label>
            <Input
              id="cardCvc"
              {...register('cardCvc')}
              placeholder="123"
              maxLength={4}
              className={cn(errors.cardCvc && 'border-destructive')}
            />
            {errors.cardCvc && (
              <p className="text-sm text-destructive">{errors.cardCvc.message}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={isSubmitting || itemCount === 0}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          'Complete Order'
        )}
      </Button>

      {itemCount === 0 && (
        <p className="text-center text-sm text-muted-foreground">
          Your cart is empty. Add items to proceed with checkout.
        </p>
      )}
    </form>
  );
}
