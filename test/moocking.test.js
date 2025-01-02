import { vi, test, expect, describe } from "vitest";

describe("test suite", () => {
  test("test case", () => {
    const greet = vi.fn();

    // greet.mockReturnValue("Hello");
    // console.log(greet());

    //* Devuelve una promesa
    // greet.mockResolvedValue("Hello");
    // greet().then((result) => console.log(result));

    greet.mockImplementation((name) => "Hello " + name);
    console.log(greet("David"));

    expect(greet).toHaveBeenCalled("David");
  });
});
