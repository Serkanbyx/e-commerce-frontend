import { z } from 'zod';

/**
 * Checkout form validation schema using Zod
 */
export const checkoutSchema = z.object({
  // Personal Information
  firstName: z
    .string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters'),
  lastName: z
    .string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters'),
  email: z
    .string()
    .email('Please enter a valid email address'),
  phone: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .regex(/^[\d\s\-+()]+$/, 'Please enter a valid phone number'),

  // Shipping Address
  address: z
    .string()
    .min(5, 'Address must be at least 5 characters')
    .max(100, 'Address must be less than 100 characters'),
  city: z
    .string()
    .min(2, 'City must be at least 2 characters')
    .max(50, 'City must be less than 50 characters'),
  zipCode: z
    .string()
    .min(5, 'ZIP code must be at least 5 characters')
    .max(10, 'ZIP code must be less than 10 characters'),
  country: z
    .string()
    .min(2, 'Please select a country'),

  // Payment Information
  cardNumber: z
    .string()
    .regex(/^[\d\s]+$/, 'Card number must contain only digits')
    .transform((val) => val.replace(/\s/g, ''))
    .refine((val) => val.length >= 13 && val.length <= 19, {
      message: 'Please enter a valid card number',
    }),
  cardExpiry: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, 'Please enter a valid expiry date (MM/YY)'),
  cardCvc: z
    .string()
    .regex(/^[0-9]{3,4}$/, 'CVC must be 3 or 4 digits'),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;

/**
 * Helper to format card number with spaces
 */
export function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, '');
  const groups = digits.match(/.{1,4}/g);
  return groups ? groups.join(' ') : '';
}

/**
 * Helper to format expiry date
 */
export function formatExpiryDate(value: string): string {
  const digits = value.replace(/\D/g, '');
  if (digits.length >= 2) {
    return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
  }
  return digits;
}
