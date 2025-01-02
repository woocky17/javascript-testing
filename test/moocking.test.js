import { vi, test, expect, describe } from "vitest";

describe("test suite", () => {
  test("test case 1", () => {
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

  test("test case 2", () => {
    const sendText = vi.fn();
    sendText.mockReturnValue("ok");

    const result = sendText("message");

    expect(sendText).toHaveBeenCalledWith("message");
    expect(result).toBe("ok");
  });
});
