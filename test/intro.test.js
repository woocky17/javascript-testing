import { describe, test, expect } from "vitest";
import { max, fizzBuzz } from "../src/intro";

describe("max", () => {
  test("should return the first argument if it is greater", () => {
    expect(max(2, 1)).toBe(2);
  });
  test("should return the second argument if it is greater", () => {
    expect(max(1, 2)).toBe(2);
  });
  test("should return the first argument if arguments are equal", () => {
    expect(max(1, 1)).toBe(1);
  });
});

describe("fizzBuzz", () => {
  test("should return FizzBuzz if the remainder of the division between 5 & 3 is zero ", () => {
    expect(fizzBuzz(30)).toBe("FizzBuzz");
  });
  test("should return Fizz if the remainder of the division between 3 is zero", () => {
    expect(fizzBuzz(3)).toBe("Fizz");
  });
  test("should return Buzz if the remainder of the division between 5 is zero", () => {
    expect(fizzBuzz(5)).toBe("Buzz");
  });
  test("should return String if the remainder does not give zero in the previous divisions", () => {
    expect(fizzBuzz(1)).toBe("1");
  });
});
