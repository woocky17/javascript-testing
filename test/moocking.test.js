import { vi, test, expect, describe } from "vitest";
import {
  getPriceInCurrency,
  getShippingInfo,
  renderPage,
  signUp,
  submitOrder,
} from "../src/mocking";
import { getExchangeRate } from "../src/libs/currency";
import { getShippingQuote } from "../src/libs/shipping";
import { trackPageView } from "../src/libs/analytics";
import { charge } from "../src/libs/payment";
import { sendEmail } from "../src/libs/email";

vi.mock("../src/libs/currency");
vi.mock("../src/libs/shipping");
vi.mock("../src/libs/analytics");
vi.mock("../src/libs/payment");
vi.mock("../src/libs/email", async (importOriginal) => {
  const originalModule = await importOriginal();
  return { ...originalModule, sendEmail: vi.fn() };
});

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

describe("getPriceInCurrency", () => {
  test("should return price in targer currency", () => {
    vi.mocked(getExchangeRate).mockReturnValue(156.84);

    const price = getPriceInCurrency(10, "YEN");
    expect(price).toBe(1568.4);
  });
});

describe("getShippingInfo", () => {
  test("should return Shipping Unavailable if quote cannot be fetched", () => {
    vi.mocked(getShippingQuote).mockReturnValue().mockReturnValue(null);

    const result = getShippingInfo("Australia");
    expect(result).toMatch(/unavailable/i);
  });

  test("should return a shipping quote of the destination ", () => {
    vi.mocked(getShippingQuote).mockReturnValue({ cost: 30, estimatedDays: 5 });

    const result = getShippingInfo("Australia");

    expect(result).toMatch("$30");
    expect(result).toMatch(/5 days/i);
    expect(result).toMatch(/shipping cost: \$30 \(5 days\)/i);
  });
});

describe("renderPage", () => {
  test("should return correct content", async () => {
    const result = await renderPage();

    expect(result).toMatch(/content/i);
  });

  test("should call analytics", async () => {
    await renderPage();

    expect(trackPageView).toHaveBeenCalled("/home");
  });
});

describe("sumitOrder", () => {
  const order = { totalAmount: 15 };
  const creditCard = { creditCardNumber: 1234 };
  test("should charge the customer", async () => {
    vi.mocked(charge).mockResolvedValue({ status: "success" });

    await submitOrder(order, creditCard);

    expect(charge).toHaveBeenCalledWith(creditCard, order.totalAmount);
  });

  test("should return success when payment is succesful", async () => {
    vi.mocked(charge).mockResolvedValue({ status: "success" });

    const result = await submitOrder(order, creditCard);

    expect(result).toEqual({ success: true });
  });
  test("should return failed when payment is wrong", async () => {
    vi.mocked(charge).mockResolvedValue({ status: "failed" });

    const result = await submitOrder(order, creditCard);

    expect(result).toEqual({ success: false, error: "payment_error" });
  });
});

describe("signUp", () => {
  const email = "david@gmail.com";
  test("should return false if email is not valid", async () => {
    const result = await signUp("a");

    expect(result).toBe(false);
  });
  test("should return true if email is valid", async () => {
    const result = await signUp(email);

    expect(result).toBe(true);
  });
  test("should send the welcome email if email is valid", async () => {
    const result = await signUp(email);

    expect(sendEmail).toHaveBeenCalled();
    const args = vi.mocked(sendEmail).mock.calls[0];
    expect(args[0]).toBe(email);
    expect(args[1]).toMatch(/welcome/i);
  });
});
