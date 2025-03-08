import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("App Component", () => {
  test("renders app title", () => {
    render(<App />);
    const titleElement = screen.getByText("Reonic");
    expect(titleElement).toBeInTheDocument();
  });

  test("renders simulator title", () => {
    render(<App />);
    const simulatorTitle = screen.getByText("EV Charger Simulator");
    expect(simulatorTitle).toBeInTheDocument();
  });

  test("toggles theme when theme button is clicked", async () => {
    render(<App />);
    const themeButton = screen.getByLabelText(/Switch to dark mode/i);
    const mainElement = document.documentElement;

    await userEvent.click(themeButton);
    expect(mainElement).toHaveClass("dark");

    await userEvent.click(themeButton);
    expect(mainElement).not.toHaveClass("dark");
  });
});
