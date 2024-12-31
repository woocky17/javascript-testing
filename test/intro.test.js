import { describe, test, expect } from "vitest";
import {
  max,
  fizzBuzz,
  calculateAverage,
  calculateFactorial,
} from "../src/intro";

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

describe("calculateAverage", () => {
  test("should return NaN if given an empty array", () => {
    expect(calculateAverage([])).toBe(NaN);
  });
  test("should calculate the average of an array with a single element", () => {
    expect(calculateAverage([1])).toBe(1);
  });
  test("should calculate the average of an array with two element", () => {
    expect(calculateAverage([1, 2])).toBe(1.5);
  });
  test("should calculate the average of an array with three element", () => {
    expect(calculateAverage([1, 2, 3])).toBe(2);
  });
});

describe("calculateFactorial", () => {
  test("should return 1 if argument is 0", () => {
    expect(calculateFactorial(0)).toBe(1);
  });
  test("should return 1 if argument is 1", () => {
    expect(calculateFactorial(1)).toBe(1);
  });
  test("should return 2 if argument is 2", () => {
    expect(calculateFactorial(2)).toBe(2);
  });
  test("should return 6 if argument is 3", () => {
    expect(calculateFactorial(3)).toBe(6);
  });
  test("should return 24 if argument is 4", () => {
    expect(calculateFactorial(4)).toBe(24);
  });
  test("should return undefined if argument is negative", () => {
    expect(calculateFactorial(-3)).toBeUndefined;
  });
});
