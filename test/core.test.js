import { describe, test, expect } from "vitest";
import { getCoupons, calculateDiscount, validateUserInput } from "../src/core";

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
