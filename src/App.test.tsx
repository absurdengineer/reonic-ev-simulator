import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

test("renders title text", () => {
  render(<App />);
  const textElement = screen.getByText(/title/i);
  expect(textElement).toBeInTheDocument();
});
