import { describe, test, expect } from "vitest";
import { getCoupons } from "../src/core";

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
