import { describe, test, expect, beforeEach } from 'vitest';
import {
  getCoupons,
  calculateDiscount,
  validateUserInput,
  isPriceInRange,
  isValidUsername,
  canDrive,
  fetchData,
  Stack,
} from '../src/core';

describe('getCoupons', () => {
  const coupons = getCoupons();

  test('should return an array of coupons', () => {
    expect(Array.isArray(coupons)).toBeTruthy;
    expect(coupons.length).toBeGreaterThan(0);
  });
  test('should return an array with valid coupons codes', () => {
    coupons.forEach((coupon) => {
      expect(coupon).toHaveProperty('code');
      expect(typeof coupon.code).toBe('string');
      expect(coupon.code).toBeTruthy;
    });
  });
  test('should return an array with valid coupons discount', () => {
    coupons.forEach((coupon) => {
      expect(coupon).toHaveProperty('discount');
      expect(typeof coupon.discount).toBe('number');
      expect(coupon.discount).toBeGreaterThan(0);
      expect(coupon.discount).toBeLessThan(1);
    });
  });
});

describe('calculateDiscount', () => {
  test('should return discounted price if given valid code', () => {
    expect(calculateDiscount(10, 'SAVE10')).toBe(9);
    expect(calculateDiscount(10, 'SAVE20')).toBe(8);
  });

  test('should handle non-numeric price', () => {
    expect(calculateDiscount('10', 'SAVE10')).toMatch(/invalid/i);
  });

  test('should handle negative price', () => {
    expect(calculateDiscount(-10, 'SAVE10')).toMatch(/invalid/i);
  });

  test('should handle non-string discount code', () => {
    expect(calculateDiscount(10, 10)).toMatch(/invalid/i);
  });

  test('should handle invalid discount price', () => {
    expect(calculateDiscount(10, 'INVALID')).toBe(10);
  });
});

describe('validateUserInput', () => {
  test('should handle non-number age', () => {
    expect(validateUserInput('jose', 18)).toMatch(/success/i);
  });
  test('should return an error if username is less than 3 characters', () => {
    expect(validateUserInput('jo', 19)).toMatch(/invalid/i);
  });
  test('should return an error if username is longer than 255 characters', () => {
    expect(validateUserInput('A'.repeat(256), 19)).toMatch(/invalid/i);
  });
  test('should return an error if username is non-string', () => {
    expect(validateUserInput(1, 19)).toMatch(/invalid/i);
  });
  test('should return an error if age is less than 18', () => {
    expect(validateUserInput('jose', 17)).toMatch(/invalid/i);
  });
  test('should return an error if age is greater than 100', () => {
    expect(validateUserInput('jose', 101)).toMatch(/invalid/i);
  });
  test('should return an error if age is non-number', () => {
    expect(validateUserInput('jose', '18')).toMatch(/invalid/i);
  });
  test('should return an error if username and age are invalid', () => {
    expect(validateUserInput('', 0)).toMatch(/invalid username/i);
    expect(validateUserInput('', 0)).toMatch(/invalid age/i);
  });
});

describe('isPriceInRange', () => {
  test.each([
    { scenario: 'price < min', price: -10, result: false },
    { scenario: 'price > max', price: 200, result: false },
    { scenario: 'price = min', price: 0, result: true },
    { scenario: 'price = max', price: 100, result: true },
    { scenario: 'price between min and max', price: 50, result: true },
  ])('should return $result when $scenario', ({ price, result }) => {
    expect(isPriceInRange(price, 0, 100)).toBe(result);
  });
});

describe('isValidUsername', () => {
  const minLength = 5;
  const maxLength = 15;
  test('should return flase when username is to short', () => {
    expect(isValidUsername('a'.repeat(minLength - 1))).toBe(false);
  });
  test('should return flase when username is to long', () => {
    expect(isValidUsername('a'.repeat(maxLength + 1))).toBe(false);
  });
  test('should return true if username is at the min or max lenght', () => {
    expect(isValidUsername('a'.repeat(maxLength))).toBe(true);
    expect(isValidUsername('a'.repeat(minLength))).toBe(true);
  });
  test('should return true if username is in the range', () => {
    expect(isValidUsername('a'.repeat(minLength + 1))).toBe(true);
  });
  test('should return false invalid input types', () => {
    expect(isValidUsername(null)).toBe(false);
    expect(isValidUsername(undefined)).toBe(false);
    expect(isValidUsername(1)).toBe(false);
  });
});

describe('canDrive', () => {
  const US = 16;
  const UK = 17;

  test.each([
    { age: US - 1, country: 'US', result: false },
    { age: US, country: 'US', result: true },
    { age: US + 1, country: 'US', result: true },
    { age: UK - 1, country: 'UK', result: false },
    { age: UK, country: 'UK', result: true },
    { age: UK + 1, country: 'UK', result: true },
  ])('should return $result for $age, $country', ({ age, country, result }) => {
    expect(canDrive(age, country)).toBe(result);
    expect(canDrive(age, country)).toBe(result);
    expect(canDrive(age, country)).toBe(result);
    expect(canDrive(age, country)).toBe(result);
    expect(canDrive(age, country)).toBe(result);
    expect(canDrive(age, country)).toBe(result);
  });

  test('should return error for invalid country code', () => {
    expect(canDrive(20, 'FR')).toMatch(/invalid/i);
  });
});

describe('fetchData', () => {
  test('should return a promise that will resolve to an array of numbers', async () => {
    try {
      await fetchData();
    } catch (error) {
      expect(error).toHaveProperty('reason');
      expect(error.reason).toMatch(/fail/i);
    }
    // expect(Array.isArray(result)).toBe(true);
    // expect(result.length).toBeGreaterThan(0);

    // fetchData().then((result) => {});
  });
});

describe('Stack', () => {
  let stack;

  beforeEach(() => {
    stack = new Stack();
  });

  test('push should add an item to the stack', () => {
    stack.push(1);

    expect(stack.size()).toBe(1);
  });

  test('pop should remove and return the top item from the stack', () => {
    stack.push(1);
    stack.push(2);

    expect(stack.pop()).toBe(2);
    expect(stack.size()).toBe(1);
  });

  test('pop should throw an error if stack is empty', () => {
    expect(() => stack.pop()).toThrow(/empty/i);
  });

  test('peek should return the top item from stack without removing it', () => {
    stack.push(1);
    stack.push(2);

    expect(stack.peek()).toBe(2);
    expect(stack.size()).toBe(2);
  });

  test('peek should throw an error if stack is empty', () => {
    expect(() => stack.peek()).toThrow(/empty/i);
  });

  test('isEmpty should return true if stack is empty', () => {
    expect(stack.isEmpty()).toBe(true);
  });
  test('isEmpty should return false if stack is not empty', () => {
    stack.push(1);
    expect(stack.isEmpty()).toBe(false);
  });

  test('size should return the number of items in the stack', () => {
    stack.push(1);
    expect(stack.size()).toBe(1);
  });

  test('clear should remove all items from the stack', () => {
    stack.push(1);
    stack.push(2);

    stack.clear();

    expect(stack.isEmpty()).toBe(true);
  });
});
