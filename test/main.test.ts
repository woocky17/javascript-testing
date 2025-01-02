import { test, expect, describe } from 'vitest';
import { calculateDiscount } from '../src/main';
describe('calculateDiscount', () => {
  test('should return discounted price if given valid code', () => {
    expect(calculateDiscount(10, 'SAVE10')).toBe(9);
    expect(calculateDiscount(10, 'SAVE20')).toBe(8);
  });

  test('should handle negative price', () => {
    expect(calculateDiscount(-10, 'SAVE10')).toMatch(/invalid/i);
  });

  test('should handle invalid discount price', () => {
    expect(calculateDiscount(10, 'INVALID')).toBe(10);
  });
});
