import { describe, it, expect } from 'vitest';
import {
  formatPrice,
  truncateText,
  calculateOrderSummary,
  isValidEmail,
  formatPhoneNumber,
  FREE_SHIPPING_THRESHOLD,
  SHIPPING_FEE,
} from './utils';

describe('formatPrice', () => {
  it('formats a number as USD currency', () => {
    expect(formatPrice(19.99)).toBe('$19.99');
  });

  it('respects a custom currency code', () => {
    expect(formatPrice(10, 'EUR')).toBe('€10.00');
  });
});

describe('truncateText', () => {
  it('returns the text unchanged when shorter than the limit', () => {
    expect(truncateText('hello', 10)).toBe('hello');
  });

  it('truncates and appends an ellipsis when longer than the limit', () => {
    expect(truncateText('hello world', 5)).toBe('hello...');
  });
});

describe('calculateOrderSummary', () => {
  it('charges shipping below the free-shipping threshold', () => {
    const { shipping, tax, total } = calculateOrderSummary(50);
    expect(shipping).toBe(SHIPPING_FEE);
    expect(tax).toBeCloseTo(4);
    expect(total).toBeCloseTo(50 + SHIPPING_FEE + 4);
  });

  it('offers free shipping exactly at the threshold', () => {
    const { shipping } = calculateOrderSummary(FREE_SHIPPING_THRESHOLD);
    expect(shipping).toBe(0);
  });

  it('offers free shipping above the threshold', () => {
    const { shipping } = calculateOrderSummary(150);
    expect(shipping).toBe(0);
  });
});

describe('isValidEmail', () => {
  it('accepts a well-formed address', () => {
    expect(isValidEmail('john@example.com')).toBe(true);
  });

  it('rejects a malformed address', () => {
    expect(isValidEmail('not-an-email')).toBe(false);
  });
});

describe('formatPhoneNumber', () => {
  it('formats a 10-digit number', () => {
    expect(formatPhoneNumber('5551234567')).toBe('(555) 123-4567');
  });

  it('returns the input unchanged when it cannot be parsed', () => {
    expect(formatPhoneNumber('123')).toBe('123');
  });
});
