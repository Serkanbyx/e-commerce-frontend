import { describe, it, expect } from 'vitest';
import { checkoutSchema, formatCardNumber, formatExpiryDate } from './validations';

const validData = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  phone: '+1 555 123 4567',
  address: '123 Main St',
  city: 'New York',
  zipCode: '10001',
  country: 'US',
  cardNumber: '4242 4242 4242 4242',
  cardExpiry: '12/30',
  cardCvc: '123',
};

describe('formatCardNumber', () => {
  it('groups digits into blocks of four', () => {
    expect(formatCardNumber('4242424242424242')).toBe('4242 4242 4242 4242');
  });

  it('strips non-digit characters', () => {
    expect(formatCardNumber('4242-4242')).toBe('4242 4242');
  });
});

describe('formatExpiryDate', () => {
  it('inserts a slash after the month', () => {
    expect(formatExpiryDate('1230')).toBe('12/30');
  });

  it('keeps a single segment when only the month is typed', () => {
    expect(formatExpiryDate('1')).toBe('1');
  });
});

describe('checkoutSchema', () => {
  it('accepts a fully valid payload', () => {
    const result = checkoutSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('rejects an invalid email', () => {
    const result = checkoutSchema.safeParse({ ...validData, email: 'bad' });
    expect(result.success).toBe(false);
  });

  it('rejects an invalid expiry date', () => {
    const result = checkoutSchema.safeParse({ ...validData, cardExpiry: '13/30' });
    expect(result.success).toBe(false);
  });
});
