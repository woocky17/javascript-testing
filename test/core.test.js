import { describe, test, expect } from "vitest";
import {
  getCoupons,
  calculateDiscount,
  validateUserInput,
  isPriceInRange,
  isValidUsername,
  canDrive,
} from "../src/core";

describe("getCoupons", () => {
  const coupons = getCoupons();

  test("should return an array of coupons", () => {
    expect(Array.isArray(coupons)).toBeTruthy;
    expect(coupons.length).toBeGreaterThan(0);
  });
  test("should return an array with valid coupons codes", () => {
    coupons.forEach((coupon) => {
      expect(coupon).toHaveProperty("code");
      expect(typeof coupon.code).toBe("string");
      expect(coupon.code).toBeTruthy;
    });
  });
  test("should return an array with valid coupons discount", () => {
    coupons.forEach((coupon) => {
      expect(coupon).toHaveProperty("discount");
      expect(typeof coupon.discount).toBe("number");
      expect(coupon.discount).toBeGreaterThan(0);
      expect(coupon.discount).toBeLessThan(1);
    });
  });
});

describe("calculateDiscount", () => {
  test("should return discounted price if given valid code", () => {
    expect(calculateDiscount(10, "SAVE10")).toBe(9);
    expect(calculateDiscount(10, "SAVE20")).toBe(8);
  });

  test("should handle non-numeric price", () => {
    expect(calculateDiscount("10", "SAVE10")).toMatch(/invalid/i);
  });

  test("should handle negative price", () => {
    expect(calculateDiscount(-10, "SAVE10")).toMatch(/invalid/i);
  });

  test("should handle non-string discount code", () => {
    expect(calculateDiscount(10, 10)).toMatch(/invalid/i);
  });

  test("should handle invalid discount price", () => {
    expect(calculateDiscount(10, "INVALID")).toBe(10);
  });
});

describe("validateUserInput", () => {
  test("should handle non-number age", () => {
    expect(validateUserInput("jose", 18)).toMatch(/success/i);
  });
  test("should return an error if username is less than 3 characters", () => {
    expect(validateUserInput("jo", 19)).toMatch(/invalid/i);
  });
  test("should return an error if username is longer than 255 characters", () => {
    expect(validateUserInput("A".repeat(256), 19)).toMatch(/invalid/i);
  });
  test("should return an error if username is non-string", () => {
    expect(validateUserInput(1, 19)).toMatch(/invalid/i);
  });
  test("should return an error if age is less than 18", () => {
    expect(validateUserInput("jose", 17)).toMatch(/invalid/i);
  });
  test("should return an error if age is greater than 100", () => {
    expect(validateUserInput("jose", 101)).toMatch(/invalid/i);
  });
  test("should return an error if age is non-number", () => {
    expect(validateUserInput("jose", "18")).toMatch(/invalid/i);
  });
  test("should return an error if username and age are invalid", () => {
    expect(validateUserInput("", 0)).toMatch(/invalid username/i);
    expect(validateUserInput("", 0)).toMatch(/invalid age/i);
  });
});

describe("isPriceInRange", () => {
  test("should return false when the price is outside the range", () => {
    expect(isPriceInRange(-10, 0, 100)).toBeFalsy;
    expect(isPriceInRange(200, 0, 100)).toBeFalsy;
  });

  test("should return true when the price is equal to the min or the max", () => {
    expect(isPriceInRange(0, 0, 100)).toBeTruthy;
    expect(isPriceInRange(100, 0, 100)).toBeTruthy;
  });

  test("should return true when the price is in the range", () => {
    expect(isPriceInRange(50, 0, 100)).toBeTruthy;
  });
});

describe("isValidUsername", () => {
  const minLength = 5;
  const maxLength = 15;
  test("should return flase when username is to short", () => {
    expect(isValidUsername("a".repeat(minLength - 1))).toBe(false);
  });
  test("should return flase when username is to long", () => {
    expect(isValidUsername("a".repeat(maxLength + 1))).toBe(false);
  });
  test("should return true if username is at the min or max lenght", () => {
    expect(isValidUsername("a".repeat(maxLength))).toBe(true);
    expect(isValidUsername("a".repeat(minLength))).toBe(true);
  });
  test("should return true if username is in the range", () => {
    expect(isValidUsername("a".repeat(minLength + 1))).toBe(true);
  });
  test("should return false invalid input types", () => {
    expect(isValidUsername(null)).toBe(false);
    expect(isValidUsername(undefined)).toBe(false);
    expect(isValidUsername(1)).toBe(false);
  });
});

describe("canDrive", () => {
  const US = 16;
  const UK = 17;
  test("should return false for underage in the US", () => {
    expect(canDrive(US - 1, "US")).toBe(false);
  });
  test("should return true for min age in the US", () => {
    expect(canDrive(US, "US")).toBe(true);
  });
  test("should return true for older people up to the limit of what is allowed in the US.", () => {
    expect(canDrive(US + 1, "US")).toBe(true);
  });

  test("should return false for underage in the UK", () => {
    expect(canDrive(UK - 1, "UK")).toBe(false);
  });
  test("should return true for min age in the UK", () => {
    expect(canDrive(UK, "UK")).toBe(true);
  });
  test("should return true for older people up to the limit of what is allowed in the UK.", () => {
    expect(canDrive(UK + 1, "UK")).toBe(true);
  });

  test("should return error for invalid country code", () => {
    expect(canDrive(20, "FR")).toMatch(/invalid/i);
  });
});
