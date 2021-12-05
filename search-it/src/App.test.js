import { render, fireEvent, act } from "@testing-library/react";

import App from "./App";

jest.mock("./services/fetchImages", () => ({
  fetchImages: () =>
    Promise.resolve([
      "https://images.unsplash.com/photo1",
      "https://images.unsplash.com/photo2",
      "https://images.unsplash.com/photo3",
    ]),
}));

async function wait(time = 0) {
  await new Promise((resolve) => setTimeout(resolve, time));
}

describe("Tests for Search It App", () => {
  it("rendered search bar", () => {
    const { getByTestId } = render(<App />);
    const input = getByTestId("input");
    expect(input).toBeTruthy();
  });
  it("rendered company logo", () => {
    const { getByTestId } = render(<App />);
    const img = getByTestId("logo");
    expect(img).toBeTruthy();
  });
  it("rendered searched images", async () => {
    const { getByTestId } = render(<App />);
    const input = getByTestId("input");

    await act(async () => {
      fireEvent.change(input, { target: { value: "searchVal" } });
      await wait(500);
    });

    expect(getByTestId("https://images.unsplash.com/photo1")).toBeDefined();
  });
});
