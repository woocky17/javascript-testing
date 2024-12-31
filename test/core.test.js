import { describe, test, expect } from "vitest";
import { getCoupons, calculateDiscount } from "../src/core";

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
