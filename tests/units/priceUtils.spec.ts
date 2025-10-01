import { test, expect } from '@playwright/test';
import { parsePrice, toCurrency } from '../../helpers/priceUtils';

test.describe('priceUtils', () => {
  test('parsePrice should convert "$1,200.00" to 1200.00', () => {
    expect(parsePrice('$1,200.00')).toBe(1200);
  });

  test('parsePrice should convert "€999.99" to 999.99', () => {
    expect(parsePrice('€999.99')).toBe(999.99);
  });

  test('parsePrice should handle values without symbols ("1500.75")', () => {
    expect(parsePrice('1500.75')).toBe(1500.75);
  });

  test('parsePrice should return 0 for invalid input', () => {
    expect(parsePrice('')).toBe(0);
    expect(parsePrice('abc')).toBe(0);
  });

  test('toCurrency should format 1200 to "$1,200.00"', () => {
    expect(toCurrency(1200)).toBe('$1,200.00');
  });

  test('toCurrency should format 999.5 to "$999.50"', () => {
    expect(toCurrency(999.5)).toBe('$999.50');
  });

  test('toCurrency should format large numbers with commas', () => {
    expect(toCurrency(1234567.89)).toBe('$1,234,567.89');
  });
});
